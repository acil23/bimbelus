const floating3DOrbs = [
  // Large & Medium 3D Translucent Glossy Bubbles/Spheres ("Bulat-bulat" 3D)
  { left: "6%", top: "16%", size: 54, variant: "blue", anim: "orb-float-a", dur: "9s", delay: "0s" },
  { left: "88%", top: "14%", size: 68, variant: "gold", anim: "orb-float-b", dur: "11s", delay: "-2s" },
  { left: "14%", top: "48%", size: 38, variant: "glass", anim: "orb-float-c", dur: "8s", delay: "-1.5s" },
  { left: "91%", top: "44%", size: 58, variant: "gold", anim: "orb-float-a", dur: "10s", delay: "-3s" },
  { left: "4%", top: "76%", size: 64, variant: "blue", anim: "orb-float-b", dur: "12s", delay: "-4s" },
  { left: "84%", top: "72%", size: 46, variant: "glass", anim: "orb-float-c", dur: "8.5s", delay: "-2.5s" },
  { left: "46%", top: "11%", size: 28, variant: "blue", anim: "orb-float-c", dur: "7.5s", delay: "-1s" },
  { left: "52%", top: "58%", size: 34, variant: "gold", anim: "orb-float-a", dur: "9.5s", delay: "-3.5s" },
  { left: "24%", top: "84%", size: 42, variant: "glass", anim: "orb-float-b", dur: "10.5s", delay: "-0.8s" },
  { left: "74%", top: "88%", size: 50, variant: "blue", anim: "orb-float-a", dur: "9s", delay: "-4.2s" },
];

const bokehParticles = [
  { left: "5%", top: "12%", size: 10, dur: "5.5s", delay: "0s", gold: false },
  { left: "9%", top: "26%", size: 14, dur: "6.5s", delay: "-1.5s", gold: true },
  { left: "16%", top: "10%", size: 8, dur: "5s", delay: "-1s", gold: false },
  { left: "7%", top: "42%", size: 12, dur: "6s", delay: "-3s", gold: true },
  { left: "13%", top: "64%", size: 9, dur: "5.8s", delay: "-2s", gold: false },
  { left: "6%", top: "82%", size: 16, dur: "7s", delay: "-4s", gold: true },
  { left: "18%", top: "88%", size: 10, dur: "5.2s", delay: "-2.5s", gold: false },

  { left: "28%", top: "20%", size: 9, dur: "6.2s", delay: "-1.2s", gold: false },
  { left: "35%", top: "38%", size: 13, dur: "6.8s", delay: "-3.2s", gold: true },
  { left: "22%", top: "55%", size: 10, dur: "5.4s", delay: "-0.8s", gold: false },
  { left: "42%", top: "70%", size: 12, dur: "6.4s", delay: "-3.8s", gold: true },
  { left: "32%", top: "84%", size: 8, dur: "5.6s", delay: "-1.8s", gold: false },

  { left: "86%", top: "10%", size: 14, dur: "5.8s", delay: "-0.5s", gold: true },
  { left: "93%", top: "22%", size: 10, dur: "5.1s", delay: "-2.2s", gold: false },
  { left: "82%", top: "30%", size: 18, dur: "6.9s", delay: "-1.1s", gold: true },
  { left: "95%", top: "35%", size: 12, dur: "5.9s", delay: "-3.4s", gold: true },
  { left: "90%", top: "46%", size: 20, dur: "7.2s", delay: "-2.7s", gold: true },
  { left: "85%", top: "52%", size: 10, dur: "5.5s", delay: "-4.1s", gold: false },
  { left: "94%", top: "58%", size: 15, dur: "6.6s", delay: "-1.4s", gold: true },
  { left: "81%", top: "66%", size: 11, dur: "5.7s", delay: "-3.1s", gold: true },
  { left: "92%", top: "76%", size: 14, dur: "6.3s", delay: "-0.9s", gold: false },
  { left: "87%", top: "86%", size: 17, dur: "6.1s", delay: "-2.9s", gold: true },
  { left: "75%", top: "92%", size: 9, dur: "5.3s", delay: "-1.7s", gold: false },
  { left: "60%", top: "45%", size: 11, dur: "6s", delay: "-3.3s", gold: true },
];

export function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      {/* Soft Silver-Blue & Diagonal Periwinkle Light Ribbons */}
      <div className="ambient-wave ambient-wave--1" />
      <div className="ambient-wave ambient-wave--2" />

      {/* Large Moving Color Blobs (Sky Blue, Warm Golden Glow on Right, Soft Periwinkle) */}
      <div className="ambient-blob ambient-blob--sky-1" />
      <div className="ambient-blob ambient-blob--gold-right" />
      <div className="ambient-blob ambient-blob--sky-2" />
      <div className="ambient-blob ambient-blob--gold-bottom" />

      {/* 3D Translucent Floating Spheres ("Bulat-bulat" 3D Beranimasi) */}
      <div className="ambient-orbs-layer">
        {floating3DOrbs.map((orb, idx) => (
          <span
            key={idx}
            className={`bg-3d-orb bg-3d-orb--${orb.variant} ${orb.anim}`}
            style={{
              left: orb.left,
              top: orb.top,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              animationDuration: orb.dur,
              animationDelay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* Floating & Twinkling Bokeh Sparkle Particles */}
      <div className="ambient-bokeh-layer">
        {bokehParticles.map((p, idx) => (
          <span
            key={idx}
            className={`bokeh-dot ${p.gold ? "bokeh-dot--gold" : "bokeh-dot--white"}`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
