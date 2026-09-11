// tests/unit/rate-limit.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { checkLoginRateLimit, clearLoginRateLimit } from '@/lib/security/rate-limit';

describe('Rate Limiter', () => {
  const WINDOW_MS = 15 * 60 * 1000; // 15 menit

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('memblokir setelah 10 request berturut-turut untuk email yang sama', () => {
    const ip = '192.168.1.100';
    const email = 'admin-test@bimbelys.local';

    // 10 percobaan pertama diizinkan
    for (let i = 0; i < 10; i++) {
      const result = checkLoginRateLimit(ip, email);
      expect(result.allowed).toBe(true);
    }

    // Percobaan ke-11 diblokir (setara dengan script 'seq 1 12' kamu)
    const blockedResult = checkLoginRateLimit(ip, email);
    expect(blockedResult.allowed).toBe(false);
  });

  it('memblokir setelah 20 request dari IP yang sama, meskipun email berbeda', () => {
    const ip = '192.168.1.101';

    // 20 percobaan dengan email berbeda diizinkan
    for (let i = 1; i <= 20; i++) {
      const email = `admin-test-${i}@bimbelys.local`;
      const result = checkLoginRateLimit(ip, email);
      expect(result.allowed).toBe(true);
    }

    // Percobaan ke-21 diblokir (setara dengan script 'seq 1 22' kamu)
    const blockedResult = checkLoginRateLimit(ip, 'admin-test-21@bimbelys.local');
    expect(blockedResult.allowed).toBe(false);
  });

  it('menormalisasi spasi dan huruf kapital pada email', () => {
    const ip = '192.168.1.102';
    
    // Kombinasi kapitalisasi dan spasi harus dihitung sebagai 1 entitas email yang sama (10 kali)
    for (let i = 0; i < 5; i++) {
      checkLoginRateLimit(ip, 'ADMIN@bimbelys.local');
      checkLoginRateLimit(ip, ' admin@bimbelys.local ');
    }

    // Percobaan ke-11 dengan penulisan berbeda tetap diblokir
    const blockedResult = checkLoginRateLimit(ip, 'admin@bimbelys.local');
    expect(blockedResult.allowed).toBe(false);
  });

  it('mereset kuota setelah 15 menit berlalu', () => {
    const ip = '192.168.1.103';
    const email = 'reset@bimbelys.local';

    // Penuhi kuota email
    for (let i = 0; i < 10; i++) {
      checkLoginRateLimit(ip, email);
    }
    expect(checkLoginRateLimit(ip, email).allowed).toBe(false);

    // Majukan waktu 15 menit + 1 detik
    vi.advanceTimersByTime(WINDOW_MS + 1000);

    // Otomatis terhapus dari store karena fungsi `pruneExpired` berjalan
    const newResult = checkLoginRateLimit(ip, email);
    expect(newResult.allowed).toBe(true);
  });

  it('memulihkan kuota email jika clearLoginRateLimit dipanggil', () => {
    const ip = '192.168.1.104';
    const email = 'clear@bimbelys.local';

    // Penuhi kuota email
    for (let i = 0; i < 10; i++) {
      checkLoginRateLimit(ip, email);
    }
    expect(checkLoginRateLimit(ip, email).allowed).toBe(false);

    // Bersihkan limit spesifik untuk email tersebut
    clearLoginRateLimit(email);

    // IP belum limit (baru 11 kali dari batas 20), email sudah direset
    expect(checkLoginRateLimit(ip, email).allowed).toBe(true);
  });
});