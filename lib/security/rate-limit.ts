import "server-only";

type RateLimitEntry = {
  timestamps: number[];
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  allowed: boolean;
};

const stores = new Map<string, RateLimitEntry>();

function pruneExpired(
  timestamps: number[],
  now: number,
  windowMs: number,
): number[] {
  const cutoff = now - windowMs;

  return timestamps.filter(
    (timestamp) => timestamp > cutoff,
  );
}

function cleanupStore(
  now: number,
  windowMs: number,
): void {
  for (const [key, entry] of stores.entries()) {
    const activeTimestamps = pruneExpired(
      entry.timestamps,
      now,
      windowMs,
    );

    if (activeTimestamps.length === 0) {
      stores.delete(key);
      continue;
    }

    stores.set(key, {
      timestamps: activeTimestamps,
    });
  }
}

function checkAndRecord(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();

  const existing = stores.get(key);

  const timestamps = pruneExpired(
    existing?.timestamps ?? [],
    now,
    options.windowMs,
  );

  if (timestamps.length >= options.limit) {
    stores.set(key, {
      timestamps,
    });

    return {
      allowed: false,
    };
  }

  timestamps.push(now);

  stores.set(key, {
    timestamps,
  });

  return {
    allowed: true,
  };
}

export function checkLoginRateLimit(
  ip: string,
  email: string,
): RateLimitResult {
  const normalizedEmail = email
    .trim()
    .toLowerCase();

  const windowMs = 15 * 60 * 1000;

  cleanupStore(Date.now(), windowMs);

  const ipResult = checkAndRecord(
    `login:ip:${ip}`,
    {
      limit: 20,
      windowMs,
    },
  );

  if (!ipResult.allowed) {
    return {
      allowed: false,
    };
  }

  const emailResult = checkAndRecord(
    `login:email:${normalizedEmail}`,
    {
      limit: 10,
      windowMs,
    },
  );

  if (!emailResult.allowed) {
    return {
      allowed: false,
    };
  }

  return {
    allowed: true,
  };
}

export function clearLoginRateLimit(
  email: string,
): void {
  const normalizedEmail = email
    .trim()
    .toLowerCase();

  stores.delete(
    `login:email:${normalizedEmail}`,
  );
}