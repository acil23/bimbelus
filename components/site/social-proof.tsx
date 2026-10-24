"use client";

import { Counter } from "@/components/animations/counter";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export function SocialProof({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;

  return (
    <section className="social-proof">
      <div className="container">
        <ScrollReveal>
          <div className="social-proof-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="social-proof-item">
                <Counter value={stat.value} suffix={stat.suffix} className="social-proof-value" />
                <span className="social-proof-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
