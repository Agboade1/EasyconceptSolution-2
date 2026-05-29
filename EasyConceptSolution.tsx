import { useState, useEffect, useRef } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, stroke = "currentColor", fill = "none", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const Icons = {
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M18 6L6 18M6 6l12 12",
  arrow: "M5 12h14M12 5l7 7-7 7",
  arrowDown: "M12 5v14M5 12l7 7 7-7",
  check: "M20 6L9 17l-5-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  thermometer: "M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z",
  cpu: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 1-1.72 1M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  mapPin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  calendar: "M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  briefcase: "M20 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  plus: "M12 5v14M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.962-1.401A9.944 9.944 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z",
  chart: "M18 20V10 M12 20V4 M6 20v-6",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #050d1a;
    --navy2: #0a1628;
    --navy3: #0f1f3d;
    --blue: #1a3a6b;
    --mid: #1e4a8a;
    --orange: #ff6b00;
    --orange2: #ff8c00;
    --white: #f0f4ff;
    --grey: #8899bb;
    --dark-grey: #2a3a55;
    --success: #00c896;
    --glow: rgba(255, 107, 0, 0.3);
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Rajdhani', sans-serif;
    --font-mono: 'Share Tech Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--navy);
    color: var(--white);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::selection { background: var(--orange); color: var(--navy); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--navy2); }
  ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 2px; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes counterUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideRight {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes glitch {
    0%, 100% { clip-path: inset(0 0 100% 0); }
    20% { clip-path: inset(30% 0 50% 0); transform: translate(-3px); }
    40% { clip-path: inset(60% 0 20% 0); transform: translate(3px); }
    60% { clip-path: inset(10% 0 70% 0); transform: translate(-3px); }
    80% { clip-path: inset(80% 0 5% 0); transform: translate(3px); }
  }

  /* Nav */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px;
    background: rgba(5, 13, 26, 0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 107, 0, 0.2);
    transition: all 0.3s;
  }
  .nav.scrolled {
    background: rgba(5, 13, 26, 0.98);
    border-bottom-color: rgba(255, 107, 0, 0.5);
    box-shadow: 0 4px 40px rgba(0,0,0,0.5);
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 24px;
    letter-spacing: 2px;
    cursor: pointer;
  }
  .nav-logo span { color: var(--orange); }
  .nav-links { display: flex; gap: 4px; }
  .nav-link {
    padding: 8px 14px;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--grey);
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute; bottom: 4px; left: 50%; right: 50%;
    height: 1px; background: var(--orange);
    transition: all 0.2s;
  }
  .nav-link:hover, .nav-link.active { color: var(--white); }
  .nav-link:hover::after, .nav-link.active::after { left: 14px; right: 14px; }
  .nav-cta {
    padding: 8px 20px;
    background: var(--orange);
    color: var(--navy) !important;
    border-radius: 3px;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }
  .nav-cta:hover { background: var(--orange2); transform: translateY(-1px); box-shadow: 0 6px 20px var(--glow); }
  .mobile-menu-btn { display: none; cursor: pointer; color: var(--white); }

  /* Hero */
  .hero {
    min-height: 100vh;
    position: relative;
    display: flex; align-items: center;
    overflow: hidden;
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy2) 50%, var(--navy3) 100%);
  }
  .hero-bg {
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 20% 50%, rgba(255,107,0,0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(26,58,107,0.3) 0%, transparent 50%),
      linear-gradient(rgba(10,22,40,0.4) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10,22,40,0.4) 1px, transparent 1px);
    background-size: auto, auto, 60px 60px, 60px 60px;
  }
  .hero-scan {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,107,0,0.4), transparent);
    animation: scan 4s linear infinite;
    pointer-events: none;
  }
  .hero-content {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto; padding: 100px 40px 60px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px;
    background: rgba(255,107,0,0.1);
    border: 1px solid rgba(255,107,0,0.3);
    border-radius: 2px;
    font-family: var(--font-mono);
    font-size: 11px; letter-spacing: 2px; color: var(--orange);
    margin-bottom: 20px;
    animation: fadeUp 0.6s ease both;
  }
  .hero-dot { width: 6px; height: 6px; background: var(--orange); border-radius: 50%; animation: pulse 1.5s ease infinite; }
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(52px, 7vw, 88px);
    line-height: 0.95;
    letter-spacing: 2px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title .line-orange { color: var(--orange); display: block; }
  .hero-subtitle {
    font-size: 18px; font-weight: 300; color: var(--grey);
    line-height: 1.7; margin: 24px 0 36px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-subtitle strong { color: var(--white); font-weight: 600; }
  .hero-actions {
    display: flex; gap: 16px; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 28px;
    background: var(--orange);
    color: var(--navy);
    font-family: var(--font-body); font-weight: 700; font-size: 14px;
    letter-spacing: 1.5px; text-transform: uppercase;
    border: none; border-radius: 3px; cursor: pointer;
    transition: all 0.25s;
  }
  .btn-primary:hover { background: var(--orange2); transform: translateY(-2px); box-shadow: 0 8px 30px var(--glow); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 13px 28px;
    background: transparent;
    color: var(--white);
    font-family: var(--font-body); font-weight: 600; font-size: 14px;
    letter-spacing: 1.5px; text-transform: uppercase;
    border: 1px solid var(--dark-grey); border-radius: 3px; cursor: pointer;
    transition: all 0.25s;
  }
  .btn-secondary:hover { border-color: var(--orange); color: var(--orange); transform: translateY(-2px); }

  .hero-stats {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
    background: var(--dark-grey);
    border: 1px solid var(--dark-grey); border-radius: 4px;
    margin-top: 48px; overflow: hidden;
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .hero-stat {
    background: var(--navy2); padding: 20px;
    text-align: center;
  }
  .hero-stat-num {
    font-family: var(--font-display);
    font-size: 36px; color: var(--orange); letter-spacing: 1px;
  }
  .hero-stat-label { font-size: 11px; letter-spacing: 2px; color: var(--grey); text-transform: uppercase; }

  .hero-visual {
    position: relative; animation: fadeIn 1s 0.3s ease both;
  }
  .hero-card {
    background: var(--navy2);
    border: 1px solid var(--dark-grey);
    border-radius: 8px; overflow: hidden;
    animation: float 6s ease infinite;
  }
  .hero-card-header {
    background: var(--navy3);
    padding: 12px 16px;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid var(--dark-grey);
  }
  .hc-dot { width: 10px; height: 10px; border-radius: 50%; }
  .hero-card-body { padding: 24px; }
  .hc-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .hc-row:last-child { border-bottom: none; }
  .hc-label { font-family: var(--font-mono); font-size: 12px; color: var(--grey); }
  .hc-value { font-size: 13px; font-weight: 600; }
  .hc-status { display: flex; align-items: center; gap: 6px; }
  .hc-dot-sm { width: 6px; height: 6px; border-radius: 50%; background: var(--success); animation: pulse 1.5s ease infinite; }
  .hc-bar { width: 80px; height: 4px; background: var(--dark-grey); border-radius: 2px; overflow: hidden; }
  .hc-bar-fill { height: 100%; background: var(--orange); border-radius: 2px; }
  .hero-badge {
    position: absolute; top: -16px; right: -16px;
    background: var(--orange);
    color: var(--navy);
    width: 72px; height: 72px; border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: var(--font-display); line-height: 1;
  }
  .hero-badge-num { font-size: 26px; }
  .hero-badge-txt { font-size: 9px; letter-spacing: 1px; }

  /* Section commons */
  section { padding: 100px 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  .section-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 3px;
    color: var(--orange); text-transform: uppercase; margin-bottom: 16px;
  }
  .section-tag::before { content: '//'; margin-right: 4px; opacity: 0.5; }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 56px);
    line-height: 1; letter-spacing: 2px; margin-bottom: 20px;
  }
  .section-title span { color: var(--orange); }
  .section-desc { font-size: 17px; color: var(--grey); line-height: 1.8; max-width: 600px; }
  .divider { width: 60px; height: 3px; background: var(--orange); margin: 20px 0; }

  /* Services */
  .services-bg { background: var(--navy2); }
  .services-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1px; background: var(--dark-grey);
    border: 1px solid var(--dark-grey); margin-top: 60px;
    border-radius: 4px; overflow: hidden;
  }
  .service-card {
    background: var(--navy2); padding: 32px;
    cursor: pointer; transition: all 0.25s;
    position: relative; overflow: hidden;
  }
  .service-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: var(--orange);
    transform: scaleY(0); transform-origin: bottom;
    transition: transform 0.25s;
  }
  .service-card:hover { background: var(--navy3); transform: translateY(-2px); }
  .service-card:hover::before { transform: scaleY(1); }
  .service-icon {
    width: 48px; height: 48px;
    background: rgba(255,107,0,0.1);
    border: 1px solid rgba(255,107,0,0.2);
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    color: var(--orange); margin-bottom: 20px;
    transition: all 0.25s;
  }
  .service-card:hover .service-icon { background: rgba(255,107,0,0.2); border-color: var(--orange); }
  .service-name { font-family: var(--font-display); font-size: 22px; letter-spacing: 1px; margin-bottom: 10px; }
  .service-desc { font-size: 14px; color: var(--grey); line-height: 1.7; }

  /* About */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .about-visual {
    position: relative;
    background: var(--navy2);
    border: 1px solid var(--dark-grey);
    border-radius: 6px; overflow: hidden;
    padding: 40px;
  }
  .about-tech-stack { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .tech-badge {
    padding: 6px 12px;
    background: rgba(255,107,0,0.08);
    border: 1px solid rgba(255,107,0,0.2);
    border-radius: 3px;
    font-family: var(--font-mono); font-size: 11px; color: var(--orange);
    letter-spacing: 1px;
  }
  .about-list { list-style: none; margin: 24px 0; }
  .about-list li {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 15px; color: var(--grey);
  }
  .about-list li:last-child { border-bottom: none; }
  .about-list li span { color: var(--orange); flex-shrink: 0; margin-top: 2px; }
  .timeline { position: relative; padding-left: 24px; }
  .timeline::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 2px; background: var(--dark-grey);
  }
  .timeline-item { position: relative; padding: 0 0 28px 20px; }
  .timeline-item::before {
    content: ''; position: absolute; left: -5px; top: 4px;
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--orange); border: 2px solid var(--navy2);
  }
  .timeline-year { font-family: var(--font-mono); font-size: 11px; color: var(--orange); letter-spacing: 2px; margin-bottom: 4px; }
  .timeline-company { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
  .timeline-role { font-size: 13px; color: var(--grey); }

  /* Experience */
  .exp-bg { background: var(--navy2); }
  .exp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; margin-top: 60px; }
  .exp-card {
    background: var(--navy);
    border: 1px solid var(--dark-grey);
    border-radius: 6px; padding: 28px;
    transition: all 0.25s;
    position: relative; overflow: hidden;
  }
  .exp-card::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--orange), transparent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .exp-card:hover { border-color: rgba(255,107,0,0.3); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .exp-card:hover::after { transform: scaleX(1); }
  .exp-number { font-family: var(--font-display); font-size: 56px; color: rgba(255,107,0,0.1); line-height: 1; margin-bottom: -10px; }
  .exp-title { font-family: var(--font-display); font-size: 22px; letter-spacing: 1px; margin-bottom: 12px; }
  .exp-client { font-family: var(--font-mono); font-size: 11px; color: var(--orange); letter-spacing: 2px; margin-bottom: 16px; text-transform: uppercase; }
  .exp-desc { font-size: 14px; color: var(--grey); line-height: 1.7; }
  .exp-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px; }
  .exp-tag { padding: 4px 10px; background: var(--dark-grey); border-radius: 2px; font-size: 11px; color: var(--grey); font-family: var(--font-mono); }

  /* Booking */
  .booking-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 60px; }
  .booking-form {
    background: var(--navy2);
    border: 1px solid var(--dark-grey);
    border-radius: 6px; padding: 40px;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { margin-bottom: 20px; }
  .form-label { display: block; font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; color: var(--grey); text-transform: uppercase; margin-bottom: 8px; }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 12px 16px;
    background: var(--navy);
    border: 1px solid var(--dark-grey);
    border-radius: 3px; color: var(--white);
    font-family: var(--font-body); font-size: 15px;
    transition: border-color 0.2s;
    outline: none;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--orange); }
  .form-textarea { resize: vertical; min-height: 100px; }
  .form-select option { background: var(--navy); }
  .booking-info { padding: 20px 0; }
  .booking-info-item {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 20px 0; border-bottom: 1px solid var(--dark-grey);
  }
  .booking-info-item:last-child { border-bottom: none; }
  .booking-info-icon {
    width: 44px; height: 44px; flex-shrink: 0;
    background: rgba(255,107,0,0.1); border: 1px solid rgba(255,107,0,0.2);
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
    color: var(--orange);
  }
  .booking-info-text h4 { font-weight: 700; margin-bottom: 4px; }
  .booking-info-text p { font-size: 14px; color: var(--grey); }

  /* Contact */
  .contact-bg { background: var(--navy2); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 60px; margin-top: 60px; }
  .contact-card {
    background: var(--navy);
    border: 1px solid var(--dark-grey);
    border-radius: 6px; padding: 28px;
    margin-bottom: 16px; display: flex; align-items: center; gap: 20px;
    transition: all 0.25s; cursor: pointer;
  }
  .contact-card:hover { border-color: var(--orange); transform: translateX(4px); }
  .contact-card-icon {
    width: 52px; height: 52px; flex-shrink: 0;
    background: rgba(255,107,0,0.1); border: 1px solid rgba(255,107,0,0.2);
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    color: var(--orange); font-size: 22px;
  }
  .contact-card-text h4 { font-weight: 700; margin-bottom: 4px; font-size: 16px; }
  .contact-card-text p { font-size: 14px; color: var(--grey); }

  /* Blog */
  .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; margin-top: 60px; }
  .blog-card {
    background: var(--navy2); border: 1px solid var(--dark-grey); border-radius: 6px;
    overflow: hidden; transition: all 0.25s; cursor: pointer;
  }
  .blog-card:hover { border-color: rgba(255,107,0,0.4); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .blog-img {
    height: 180px; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 60px; letter-spacing: 2px; color: rgba(255,255,255,0.05);
    position: relative; overflow: hidden;
  }
  .blog-img-overlay { position: absolute; inset: 0; }
  .blog-body { padding: 24px; }
  .blog-tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px; color: var(--orange); text-transform: uppercase; margin-bottom: 12px; }
  .blog-title { font-family: var(--font-display); font-size: 22px; letter-spacing: 1px; margin-bottom: 12px; line-height: 1.2; }
  .blog-desc { font-size: 14px; color: var(--grey); line-height: 1.7; margin-bottom: 20px; }
  .blog-meta { display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; color: var(--dark-grey); }
  .blog-read { color: var(--orange); cursor: pointer; }

  /* Dashboard */
  .dash-layout { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
  .dash-sidebar {
    background: var(--navy2);
    border-right: 1px solid var(--dark-grey);
    padding: 80px 0 20px; position: fixed; top: 0; left: 0;
    width: 220px; height: 100vh; z-index: 50;
    display: flex; flex-direction: column;
  }
  .dash-logo { padding: 0 24px 30px; border-bottom: 1px solid var(--dark-grey); margin-bottom: 20px; }
  .dash-logo-txt { font-family: var(--font-display); font-size: 18px; letter-spacing: 2px; }
  .dash-logo-role { font-family: var(--font-mono); font-size: 10px; color: var(--orange); letter-spacing: 2px; margin-top: 2px; }
  .dash-nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 24px; font-size: 14px; font-weight: 600;
    color: var(--grey); cursor: pointer; transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .dash-nav-item:hover, .dash-nav-item.active { color: var(--white); background: rgba(255,107,0,0.08); border-left: 2px solid var(--orange); padding-left: 22px; }
  .dash-main { margin-left: 220px; padding: 80px 0 0; min-height: 100vh; }
  .dash-content { padding: 40px; }
  .dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; }
  .dash-title { font-family: var(--font-display); font-size: 36px; letter-spacing: 2px; }
  .dash-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
  .dash-card {
    background: var(--navy2); border: 1px solid var(--dark-grey);
    border-radius: 6px; padding: 24px;
    position: relative; overflow: hidden;
  }
  .dash-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--orange);
  }
  .dash-card-val { font-family: var(--font-display); font-size: 40px; color: var(--orange); line-height: 1; }
  .dash-card-label { font-size: 13px; color: var(--grey); margin-top: 8px; letter-spacing: 0.5px; }
  .dash-card-delta { position: absolute; top: 20px; right: 20px; font-family: var(--font-mono); font-size: 11px; color: var(--success); }
  .dash-table-wrap { background: var(--navy2); border: 1px solid var(--dark-grey); border-radius: 6px; overflow: hidden; }
  .dash-table { width: 100%; border-collapse: collapse; }
  .dash-table th { text-align: left; padding: 14px 20px; background: var(--navy3); font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; color: var(--grey); text-transform: uppercase; }
  .dash-table td { padding: 14px 20px; border-bottom: 1px solid var(--dark-grey); font-size: 14px; }
  .dash-table tr:last-child td { border-bottom: none; }
  .dash-table tr:hover td { background: rgba(255,255,255,0.02); }
  .status-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 1px; text-transform: uppercase; }
  .status-pending { background: rgba(255,107,0,0.15); color: var(--orange); }
  .status-confirmed { background: rgba(0,200,150,0.15); color: var(--success); }
  .status-completed { background: rgba(26,58,107,0.4); color: var(--grey); }
  .dash-action-btn {
    padding: 6px 14px; border: 1px solid var(--dark-grey); border-radius: 3px;
    background: transparent; color: var(--grey); font-size: 12px; cursor: pointer;
    transition: all 0.2s; margin-right: 6px;
  }
  .dash-action-btn:hover { border-color: var(--orange); color: var(--orange); }

  /* Certifications */
  .cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; margin-top: 60px; }
  .cert-card {
    background: var(--navy2); border: 1px solid var(--dark-grey); border-radius: 6px; padding: 28px;
    display: flex; align-items: flex-start; gap: 16px; transition: all 0.25s;
  }
  .cert-card:hover { border-color: rgba(255,107,0,0.4); transform: translateY(-2px); }
  .cert-icon {
    width: 46px; height: 46px; flex-shrink: 0;
    background: rgba(255,107,0,0.1); border: 1px solid rgba(255,107,0,0.2);
    border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--orange);
  }
  .cert-name { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
  .cert-issuer { font-family: var(--font-mono); font-size: 11px; color: var(--orange); letter-spacing: 1px; margin-bottom: 6px; }
  .cert-year { font-size: 13px; color: var(--grey); }

  /* Footer */
  footer {
    background: var(--navy2); border-top: 1px solid var(--dark-grey);
    padding: 60px 0 30px;
  }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 50px; }
  .footer-brand-name { font-family: var(--font-display); font-size: 28px; letter-spacing: 2px; margin-bottom: 12px; }
  .footer-brand-name span { color: var(--orange); }
  .footer-desc { font-size: 14px; color: var(--grey); line-height: 1.7; margin-bottom: 20px; }
  .footer-social { display: flex; gap: 12px; }
  .social-btn {
    width: 36px; height: 36px; border-radius: 4px;
    border: 1px solid var(--dark-grey); color: var(--grey);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
  }
  .social-btn:hover { border-color: var(--orange); color: var(--orange); transform: translateY(-2px); }
  .footer-col h4 { font-weight: 700; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid var(--dark-grey); }
  .footer-link { display: block; font-size: 14px; color: var(--grey); padding: 6px 0; cursor: pointer; transition: color 0.2s; }
  .footer-link:hover { color: var(--orange); }
  .footer-bottom { display: flex; align-items: center; justify-content: space-between; padding-top: 30px; border-top: 1px solid var(--dark-grey); }
  .footer-copy { font-family: var(--font-mono); font-size: 12px; color: var(--grey); }
  .footer-legal { display: flex; gap: 20px; }

  /* WhatsApp float */
  .wa-float {
    position: fixed; bottom: 24px; right: 24px; z-index: 999;
    width: 56px; height: 56px; border-radius: 50%;
    background: #25d366;
    display: flex; align-items: center; justify-content: center;
    color: white; cursor: pointer;
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
    transition: all 0.2s;
    animation: float 3s ease infinite;
  }
  .wa-float:hover { transform: scale(1.1); box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6); }

  /* Auth modal */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.2s ease;
  }
  .modal {
    background: var(--navy2); border: 1px solid var(--dark-grey);
    border-radius: 8px; padding: 40px; width: 420px; max-width: calc(100vw - 40px);
    animation: fadeUp 0.3s ease;
  }
  .modal-title { font-family: var(--font-display); font-size: 32px; letter-spacing: 2px; margin-bottom: 8px; }
  .modal-sub { font-size: 14px; color: var(--grey); margin-bottom: 30px; }
  .modal-close { float: right; cursor: pointer; color: var(--grey); margin-top: -30px; }
  .tab-row { display: flex; gap: 0; margin-bottom: 28px; border-bottom: 1px solid var(--dark-grey); }
  .tab { padding: 10px 20px; font-weight: 600; font-size: 14px; color: var(--grey); cursor: pointer; transition: all 0.2s; border-bottom: 2px solid transparent; }
  .tab.active { color: var(--orange); border-bottom-color: var(--orange); }

  /* Toast */
  .toast {
    position: fixed; bottom: 90px; right: 24px; z-index: 300;
    background: var(--navy3); border: 1px solid var(--success); border-radius: 6px;
    padding: 14px 20px; display: flex; align-items: center; gap: 12px;
    font-size: 14px; min-width: 260px;
    animation: fadeUp 0.3s ease;
  }
  .toast-icon { color: var(--success); }

  /* Mobile */
  .mobile-nav {
    position: fixed; inset: 0; z-index: 90;
    background: var(--navy2);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px; animation: fadeIn 0.2s ease;
  }
  .mobile-nav-link {
    font-family: var(--font-display); font-size: 32px; letter-spacing: 3px;
    cursor: pointer; color: var(--grey);
    transition: color 0.2s; padding: 8px 0;
  }
  .mobile-nav-link:hover { color: var(--orange); }

  /* Responsive */
  @media (max-width: 1024px) {
    .hero-content { grid-template-columns: 1fr; gap: 40px; }
    .hero-visual { display: none; }
    .about-grid, .booking-grid, .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .dash-cards { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .mobile-menu-btn { display: flex; }
    .container { padding: 0 20px; }
    section { padding: 70px 0; }
    .footer-grid { grid-template-columns: 1fr; gap: 30px; }
    .dash-sidebar { display: none; }
    .dash-main { margin-left: 0; }
    .dash-cards { grid-template-columns: repeat(2, 1fr); }
    .form-row { grid-template-columns: 1fr; }
    .hero-stats { grid-template-columns: 1fr 1fr 1fr; }
    .hero-stat-num { font-size: 28px; }
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "wrench", name: "Industrial Mechanical Maintenance", desc: "Comprehensive mechanical maintenance for industrial plants, ensuring maximum uptime and operational efficiency." },
  { icon: "zap", name: "Power Plant Operational Support", desc: "Expert operations support for Siemens, Wärtsilä, and CAT power generation systems." },
  { icon: "settings", name: "Generator Maintenance", desc: "CAT & Wärtsilä W20V34DF engine maintenance, overhaul planning, and performance optimization." },
  { icon: "thermometer", name: "HVAC Installation & Servicing", desc: "Full-spectrum HVAC services for industrial and commercial facilities — installation, commissioning, and troubleshooting." },
  { icon: "cpu", name: "SCADA Monitoring Support", desc: "Real-time SCADA and Siemens PCS7 monitoring, configuration, and operational support." },
  { icon: "activity", name: "Preventive Maintenance", desc: "Scheduled PM programs designed to eliminate unplanned downtime and extend equipment lifecycle." },
  { icon: "shield", name: "Corrective Maintenance", desc: "Rapid-response corrective maintenance to restore plant operations and minimize production loss." },
  { icon: "eye", name: "Equipment Diagnostics", desc: "Advanced diagnostics and condition monitoring to identify faults before they cause failures." },
  { icon: "zap", name: "Plant Startup & Shutdown", desc: "Safe and efficient plant startup and shutdown procedures following OEM and industrial best practices." },
  { icon: "wrench", name: "Industrial Troubleshooting", desc: "Systematic fault diagnosis and troubleshooting for complex industrial systems and processes." },
  { icon: "briefcase", name: "Engineering Consultancy", desc: "Technical consultancy for energy, oil & gas, and manufacturing sectors — strategy, audits, and recommendations." },
  { icon: "activity", name: "Oil & Gas Maintenance Support", desc: "Specialized maintenance services for upstream and downstream oil & gas facility operations." },
];

const EXPERIENCE = [
  { number: "01", company: "BUA OBU CEMENT", project: "147MW Power Plant Maintenance", role: "Power Plant Operator / Mechanical Engineer", desc: "Managed operations and preventive maintenance of 147MW gas power plant. Handled Wärtsilä W20V34DF engine maintenance and SCADA monitoring.", tags: ["Wärtsilä", "SCADA", "Siemens PCS7", "147MW"] },
  { number: "02", company: "KS ENERGY (POWER AFRICA)", project: "Gas Power Generation Operations", role: "Plant Operator", desc: "Operated and maintained CAT gas generator systems for Power Africa initiative. Conducted routine inspections and corrective maintenance.", tags: ["CAT Generators", "Power Africa", "Operations"] },
  { number: "03", company: "RITE FOODS LIMITED", project: "Industrial HVAC & Utilities", role: "Mechanical Maintenance Engineer", desc: "Managed HVAC systems, refrigeration, and utility equipment for large-scale food production facility.", tags: ["HVAC", "Refrigeration", "Utilities", "PM"] },
  { number: "04", company: "GKM ENGINEERING", project: "Siemens Power Systems", role: "Field Service Engineer", desc: "Field service and commissioning of Siemens turbine and power systems. Startup and shutdown procedures.", tags: ["Siemens", "Turbines", "Commissioning"] },
  { number: "05", company: "AJAOKUTA STEEL COMPANY", project: "Heavy Industrial Maintenance", role: "Mechanical Maintenance Engineer", desc: "Preventive and corrective maintenance for heavy industrial equipment in one of Africa's largest steel complexes.", tags: ["Heavy Industry", "Steel", "PM/CM"] },
  { number: "06", company: "CCECC NIGERIA", project: "Civil & Engineering Projects", role: "Site Engineer", desc: "Engineering support for civil infrastructure projects including mechanical systems installation and commissioning.", tags: ["Civil Engineering", "Commissioning"] },
];

const BLOG_POSTS = [
  { tag: "Power Systems", title: "Optimizing Wärtsilä W20V34DF Engine Performance", desc: "Key preventive maintenance strategies for extending engine lifecycle and maximizing power output in African climate conditions.", date: "MAR 2025", read: "6 MIN", bg: "#0a1628" },
  { tag: "HVAC", title: "Industrial HVAC Commissioning: Best Practices for Nigeria", desc: "A field engineer's guide to commissioning HVAC systems in tropical climates — challenges, solutions, and lessons learned.", date: "FEB 2025", read: "8 MIN", bg: "#0f1f3d" },
  { tag: "SCADA", title: "Siemens PCS7 SCADA: Monitoring Strategies for Power Plants", desc: "Practical insights into configuring and optimizing PCS7 for real-time plant monitoring and alarm management.", date: "JAN 2025", read: "5 MIN", bg: "#0a1628" },
];

const CERTS = [
  { name: "Power Plant Operations", issuer: "Siemens Training Centre", year: "2022" },
  { name: "Wärtsilä Engine Maintenance", issuer: "Wärtsilä Technical Academy", year: "2021" },
  { name: "CAT Generator Service", issuer: "Caterpillar Authorized Training", year: "2020" },
  { name: "Siemens PCS7 SCADA", issuer: "Siemens Industry", year: "2022" },
  { name: "Industrial HVAC Systems", issuer: "ASHRAE Certified Program", year: "2019" },
  { name: "Preventive Maintenance Mgmt", issuer: "SMRP Certification Body", year: "2021" },
  { name: "Oil & Gas Safety", issuer: "OPITO Nigeria", year: "2020" },
  { name: "Mechanical Engineering", issuer: "University of Technology", year: "2018" },
];

const MOCK_BOOKINGS = [
  { id: "BK-2501", client: "Dangote Refinery", service: "Preventive Maintenance", date: "Jun 05, 2025", status: "confirmed" },
  { id: "BK-2502", client: "Transcorp Power", service: "SCADA Monitoring Support", date: "Jun 08, 2025", status: "pending" },
  { id: "BK-2503", client: "Total Energies NG", service: "Generator Maintenance", date: "May 28, 2025", status: "completed" },
  { id: "BK-2504", client: "Lafarge Africa", service: "HVAC Installation", date: "Jun 12, 2025", status: "pending" },
  { id: "BK-2505", client: "Julius Berger", service: "Engineering Consultancy", date: "May 20, 2025", status: "completed" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register'
  const [authTab, setAuthTab] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toast, setToast] = useState(null);
  const [dashTab, setDashTab] = useState("overview");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", message: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "", name: "" });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const nav = (p) => { setPage(p); setMobileOpen(false); window.scrollTo(0, 0); };

  const handleBook = (e) => {
    e.preventDefault();
    showToast("✓ Booking request submitted! We'll confirm within 24 hours.");
    setForm({ name: "", email: "", phone: "", service: "", date: "", message: "" });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (loginForm.email === "admin@easyconcept.com" && loginForm.password === "admin123") {
      setLoggedIn(true); setIsAdmin(true); setAuthModal(null); nav("admin");
      showToast("✓ Welcome back, Administrator.");
    } else {
      setLoggedIn(true); setIsAdmin(false); setAuthModal(null); nav("client");
      showToast("✓ Welcome to your dashboard.");
    }
    setLoginForm({ email: "", password: "", name: "" });
  };

  const NAV_LINKS = ["home", "about", "services", "experience", "certifications", "booking", "contact", "blog"];

  return (
    <>
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => nav("home")}>
          EASY<span>CONCEPT</span>SOLUTION
        </div>
        <div className="nav-links">
          {NAV_LINKS.map(p => (
            <span key={p} className={`nav-link${page === p ? " active" : ""}`} onClick={() => nav(p)}>
              {p === "home" ? "Home" : p === "certifications" ? "Certifications" : p.charAt(0).toUpperCase() + p.slice(1)}
            </span>
          ))}
          {loggedIn
            ? <span className="nav-cta" onClick={() => nav(isAdmin ? "admin" : "client")}>Dashboard</span>
            : <span className="nav-cta" onClick={() => { setAuthModal(true); setAuthTab("login"); }}>Client Login</span>
          }
        </div>
        <div className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon d={mobileOpen ? Icons.close : Icons.menu} size={24} />
        </div>
      </nav>

      {/* ── MOBILE NAV ── */}
      {mobileOpen && (
        <div className="mobile-nav" onClick={() => setMobileOpen(false)}>
          {NAV_LINKS.map(p => (
            <div key={p} className="mobile-nav-link" onClick={() => nav(p)}>
              {p === "certifications" ? "CERTIFICATIONS" : p.toUpperCase()}
            </div>
          ))}
        </div>
      )}

      {/* ── PAGES ── */}
      {page === "home" && <HomePage nav={nav} />}
      {page === "about" && <AboutPage />}
      {page === "services" && <ServicesPage nav={nav} />}
      {page === "experience" && <ExperiencePage />}
      {page === "certifications" && <CertificationsPage />}
      {page === "booking" && <BookingPage form={form} setForm={setForm} handleBook={handleBook} />}
      {page === "contact" && <ContactPage handleBook={handleBook} />}
      {page === "blog" && <BlogPage />}
      {page === "admin" && <AdminDashboard dashTab={dashTab} setDashTab={setDashTab} nav={nav} setLoggedIn={setLoggedIn} />}
      {page === "client" && <ClientDashboard nav={nav} setLoggedIn={setLoggedIn} />}

      {/* ── FOOTER ── */}
      {!["admin", "client"].includes(page) && <Footer nav={nav} />}

      {/* ── WHATSAPP ── */}
      <div className="wa-float" title="Chat on WhatsApp" onClick={() => window.open("https://wa.me/2348068930669", "_blank")}>
        <Icon d={Icons.whatsapp} size={26} fill="white" stroke="none" />
      </div>

      {/* ── AUTH MODAL ── */}
      {authModal && (
        <div className="modal-overlay" onClick={() => setAuthModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setAuthModal(null)}><Icon d={Icons.close} size={20} /></span>
            <div className="modal-title">ECS <span style={{ color: "var(--orange)" }}>Portal</span></div>
            <div className="modal-sub">Access your engineering services dashboard</div>
            <div className="tab-row">
              <div className={`tab${authTab === "login" ? " active" : ""}`} onClick={() => setAuthTab("login")}>Sign In</div>
              <div className={`tab${authTab === "register" ? " active" : ""}`} onClick={() => setAuthTab("register")}>Register</div>
            </div>
            <form onSubmit={handleAuth}>
              {authTab === "register" && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Your full name" value={loginForm.name} onChange={e => setLoginForm({ ...loginForm, name: e.target.value })} />
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="your@email.com" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" placeholder="••••••••" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} required />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {authTab === "login" ? "Sign In to Portal" : "Create Account"}
              </button>
              <p style={{ marginTop: 16, fontSize: 12, color: "var(--grey)", textAlign: "center" }}>
                Demo: admin@easyconcept.com / admin123 (admin) &nbsp;|&nbsp; any other (client)
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className="toast">
          <span className="toast-icon"><Icon d={Icons.check} size={18} /></span>
          {toast}
        </div>
      )}
    </>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ nav }) {
  return (
    <main style={{ paddingTop: 0 }}>
      {/* Hero */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-scan" />
        <div className="hero-content">
          <div>
            <div className="hero-tag">
              <div className="hero-dot" />
              INDUSTRIAL ENGINEERING SERVICES — NIGERIA
            </div>
            <h1 className="hero-title">
              PRECISION
              <span className="line-orange">ENGINEERING</span>
              SOLUTIONS
            </h1>
            <p className="hero-subtitle">
              Expert <strong>power plant operations</strong>, mechanical maintenance, HVAC, and <strong>SCADA support</strong> for industrial facilities across Nigeria and West Africa.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => nav("booking")}>
                Book a Service <Icon d={Icons.arrow} size={16} />
              </button>
              <button className="btn-secondary" onClick={() => nav("services")}>
                Our Services <Icon d={Icons.arrowDown} size={16} />
              </button>
            </div>
            <div className="hero-stats">
              {[["7+", "YEARS EXP"], ["12+", "SERVICES"], ["6+", "COMPANIES"]].map(([n, l]) => (
                <div key={l} className="hero-stat">
                  <div className="hero-stat-num">{n}</div>
                  <div className="hero-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-badge">
              <div className="hero-badge-num">24</div>
              <div className="hero-badge-txt">HRS/7</div>
            </div>
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hc-dot" style={{ background: "#ff5f56" }} />
                <div className="hc-dot" style={{ background: "#ffbd2e" }} />
                <div className="hc-dot" style={{ background: "#27c93f" }} />
                <span style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--grey)" }}>plant_status.monitor</span>
              </div>
              <div className="hero-card-body">
                {[
                  ["SYSTEM", <span className="hc-status"><span className="hc-dot-sm" />ONLINE</span>],
                  ["PLANT TYPE", "147MW GAS"],
                  ["ENGINE", "Wärtsilä W20V34DF"],
                  ["LOAD", <><div className="hc-bar"><div className="hc-bar-fill" style={{ width: "78%" }} /></div>&nbsp;<span style={{ fontSize: 11 }}>78%</span></>],
                  ["SCADA", "Siemens PCS7"],
                  ["UPTIME", <span style={{ color: "var(--success)" }}>99.7%</span>],
                ].map(([k, v], i) => (
                  <div key={i} className="hc-row">
                    <span className="hc-label">{k}</span>
                    <span className="hc-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services preview */}
      <section style={{ background: "var(--navy2)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 60 }}>
            <div>
              <div className="section-tag">Core Services</div>
              <h2 className="section-title">WHAT WE <span>DO BEST</span></h2>
            </div>
            <button className="btn-secondary" onClick={() => nav("services")}>All Services <Icon d={Icons.arrow} size={14} /></button>
          </div>
          <div className="services-grid">
            {SERVICES.slice(0, 6).map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon"><Icon d={Icons[s.icon]} size={22} /></div>
                <div className="service-name">{s.name}</div>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "var(--dark-grey)", border: "1px solid var(--dark-grey)", borderRadius: 4, overflow: "hidden" }}>
            {[
              { n: 7, s: "+", l: "Years of Experience" },
              { n: 6, s: "+", l: "Companies Served" },
              { n: 147, s: "MW", l: "Largest Plant Maintained" },
              { n: 99, s: "%", l: "Client Satisfaction" },
            ].map(({ n, s, l }, i) => (
              <div key={i} style={{ background: "var(--navy2)", padding: "40px 30px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 54, color: "var(--orange)", lineHeight: 1 }}>
                  <Counter target={n} suffix={s} />
                </div>
                <div style={{ fontSize: 13, color: "var(--grey)", marginTop: 8, letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "var(--navy2)" }}>
        <div className="container">
          <div style={{ background: "linear-gradient(135deg, var(--navy3), var(--blue))", border: "1px solid rgba(255,107,0,0.3)", borderRadius: 8, padding: "60px 50px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 50%, rgba(255,107,0,0.08), transparent 60%)" }} />
            <div className="section-tag" style={{ justifyContent: "center" }}>Ready to Work Together</div>
            <h2 className="section-title" style={{ fontSize: 48, marginBottom: 16 }}>NEED INDUSTRIAL <span>MAINTENANCE SUPPORT?</span></h2>
            <p style={{ fontSize: 17, color: "var(--grey)", marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
              From emergency corrective maintenance to long-term PM contracts — EasyConceptSolution delivers expert field engineering services across Nigeria.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => nav("booking")}>Schedule a Service <Icon d={Icons.calendar} size={16} /></button>
              <button className="btn-secondary" onClick={() => window.open("https://wa.me/2348068930669", "_blank")}>
                <Icon d={Icons.whatsapp} size={16} fill="currentColor" stroke="none" /> WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <main style={{ paddingTop: 64 }}>
      <section>
        <div className="container">
          <div className="section-tag">Who We Are</div>
          <h1 className="section-title">ABOUT <span>EASYCONCEPT</span></h1>
          <div className="divider" />
          <div className="about-grid">
            <div>
              <p style={{ fontSize: 17, color: "var(--grey)", lineHeight: 1.8, marginBottom: 24 }}>
                EasyConceptSolution is a Nigeria-based professional engineering and industrial maintenance services firm founded by <strong style={{ color: "var(--white)" }}>Agboade Iyanu-Oluwa Ezekiel</strong>, a Mechanical Engineer and Power Plant Operator with over 7 years of hands-on experience.
              </p>
              <p style={{ fontSize: 17, color: "var(--grey)", lineHeight: 1.8, marginBottom: 32 }}>
                We specialize in power plant operations, industrial maintenance, HVAC systems, generator servicing (CAT & Wärtsilä), and SCADA-based monitoring — delivering engineering excellence to energy companies, oil & gas facilities, manufacturing industries, and commercial buildings.
              </p>
              <ul className="about-list">
                {[
                  "Trusted by major industrial companies across Nigeria",
                  "Hands-on experience with 147MW gas power plants",
                  "Certified in Siemens PCS7, Wärtsilä, and CAT systems",
                  "24/7 emergency maintenance response capability",
                  "ISO-aligned preventive maintenance programs",
                ].map((item, i) => (
                  <li key={i}><span><Icon d={Icons.check} size={14} /></span>{item}</li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => window.open("#", "_blank")}>
                  <Icon d={Icons.download} size={16} /> Download CV
                </button>
                <button className="btn-secondary" onClick={() => window.open("#", "_blank")}>
                  <Icon d={Icons.file} size={16} /> Company Profile
                </button>
              </div>
            </div>
            <div>
              <div className="about-visual">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", letterSpacing: 3, marginBottom: 20 }}>// FOUNDER PROFILE</div>
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blue)", border: "2px solid var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 26, color: "var(--orange)" }}>AE</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>Agboade Iyanu-Oluwa Ezekiel</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", letterSpacing: 1 }}>Founder & Lead Engineer</div>
                  </div>
                </div>
                <div className="about-tech-stack">
                  {["Siemens PCS7", "Wärtsilä W20V34DF", "CAT Gas Gen", "HVAC Systems", "SCADA", "PLC", "Siemens Turbines", "PM/CM"].map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--dark-grey)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--grey)", letterSpacing: 2, marginBottom: 16 }}>// WORK HISTORY</div>
                  <div className="timeline">
                    {[
                      ["2022–Present", "BUA Obu Power Plant", "Power Plant Operator"],
                      ["2020–2022", "KS Energy (Power Africa)", "Plant Operator"],
                      ["2019–2020", "Rite Foods Limited", "Mechanical Maintenance Engr"],
                      ["2018–2019", "GKM Engineering", "Field Service Engineer"],
                    ].map(([yr, co, role]) => (
                      <div key={co} className="timeline-item">
                        <div className="timeline-year">{yr}</div>
                        <div className="timeline-company">{co}</div>
                        <div className="timeline-role">{role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ nav }) {
  return (
    <main style={{ paddingTop: 64 }}>
      <section className="services-bg">
        <div className="container">
          <div className="section-tag">What We Offer</div>
          <h1 className="section-title">OUR <span>SERVICES</span></h1>
          <p className="section-desc">Comprehensive industrial maintenance and engineering services for power plants, oil & gas facilities, manufacturing industries, and commercial buildings across Nigeria.</p>
          <div className="services-grid" style={{ marginTop: 60 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon"><Icon d={Icons[s.icon]} size={22} /></div>
                <div className="service-name">{s.name}</div>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 60, textAlign: "center" }}>
            <p style={{ color: "var(--grey)", marginBottom: 24, fontSize: 16 }}>Need a customized maintenance solution?</p>
            <button className="btn-primary" onClick={() => nav("booking")}>Request a Custom Quote <Icon d={Icons.arrow} size={16} /></button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── EXPERIENCE PAGE ──────────────────────────────────────────────────────────
function ExperiencePage() {
  return (
    <main style={{ paddingTop: 64 }}>
      <section className="exp-bg">
        <div className="container">
          <div className="section-tag">Track Record</div>
          <h1 className="section-title">EXPERIENCE & <span>PROJECTS</span></h1>
          <p className="section-desc">Real-world engineering experience across Nigeria's most demanding industrial environments.</p>
          <div className="exp-grid">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="exp-card">
                <div className="exp-number">{e.number}</div>
                <div className="exp-client">{e.company}</div>
                <div className="exp-title">{e.project}</div>
                <div style={{ fontSize: 13, color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-mono)" }}>{e.role}</div>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-tags">
                  {e.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── CERTIFICATIONS PAGE ──────────────────────────────────────────────────────
function CertificationsPage() {
  return (
    <main style={{ paddingTop: 64 }}>
      <section>
        <div className="container">
          <div className="section-tag">Credentials</div>
          <h1 className="section-title">CERTIFICATIONS & <span>TRAINING</span></h1>
          <p className="section-desc">Professionally certified across Siemens, Wärtsilä, Caterpillar, and internationally recognized engineering standards.</p>
          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <div key={i} className="cert-card">
                <div className="cert-icon"><Icon d={Icons.shield} size={22} /></div>
                <div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer">{c.issuer}</div>
                  <div className="cert-year">Issued: {c.year}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 60, background: "var(--navy2)", border: "1px solid var(--dark-grey)", borderRadius: 6, padding: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div className="section-tag">Professional Memberships</div>
              <p style={{ color: "var(--grey)", marginTop: 8 }}>Member of recognized engineering bodies and industrial maintenance organizations.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["NSE", "COREN", "SMRP", "ASHRAE"].map(b => (
                <div key={b} style={{ padding: "10px 20px", background: "var(--navy3)", border: "1px solid var(--dark-grey)", borderRadius: 4, fontFamily: "var(--font-display)", letterSpacing: 2, fontSize: 18 }}>{b}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── BOOKING PAGE ─────────────────────────────────────────────────────────────
function BookingPage({ form, setForm, handleBook }) {
  return (
    <main style={{ paddingTop: 64 }}>
      <section>
        <div className="container">
          <div className="section-tag">Schedule a Service</div>
          <h1 className="section-title">BOOK A <span>CONSULTATION</span></h1>
          <p className="section-desc">Fill out the form below to request a service appointment, consultation, or maintenance quote. We respond within 24 hours.</p>
          <div className="booking-grid">
            <div className="booking-form">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: 1, marginBottom: 28 }}>SERVICE REQUEST FORM</h3>
              <form onSubmit={handleBook}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" placeholder="John Adeyemi" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" placeholder="john@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp *</label>
                    <input className="form-input" placeholder="+234 800 0000 0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Service Required *</label>
                  <select className="form-select" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} required>
                    <option value="">— Select a service —</option>
                    {SERVICES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    <option value="custom">Custom / Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Project Details</label>
                  <textarea className="form-textarea" placeholder="Describe your facility, equipment, and the issue or service needed..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Submit Service Request <Icon d={Icons.arrow} size={16} />
                </button>
              </form>
            </div>
            <div className="booking-info">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: 1, marginBottom: 8 }}>WHY CHOOSE US</h3>
              <div className="divider" />
              {[
                { icon: "zap", title: "24/7 Emergency Response", desc: "Available round-the-clock for critical maintenance emergencies." },
                { icon: "shield", title: "Certified Engineers", desc: "OEM-certified technicians for Siemens, Wärtsilä, and Caterpillar systems." },
                { icon: "activity", title: "Proven Track Record", desc: "7+ years maintaining Nigeria's most demanding industrial facilities." },
                { icon: "calendar", title: "Fast Confirmation", desc: "Service bookings confirmed within 24 hours with detailed scope of work." },
              ].map((item, i) => (
                <div key={i} className="booking-info-item">
                  <div className="booking-info-icon"><Icon d={Icons[item.icon]} size={20} /></div>
                  <div className="booking-info-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 32, padding: 24, background: "var(--navy2)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: 6 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", letterSpacing: 2, marginBottom: 12 }}>// QUICK CONTACT</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="mailto:Ezekielakin@gmail.com" style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--grey)", textDecoration: "none", fontSize: 14 }}>
                    <Icon d={Icons.mail} size={16} color="var(--orange)" /> Ezekielakin@gmail.com
                  </a>
                  <a href="tel:+2348068930669" style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--grey)", textDecoration: "none", fontSize: 14 }}>
                    <Icon d={Icons.phone} size={16} color="var(--orange)" /> +234 806 893 0669
                  </a>
                  <span style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--grey)", fontSize: 14 }}>
                    <Icon d={Icons.mapPin} size={16} color="var(--orange)" /> Nigeria (Nationwide)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ handleBook }) {
  const [msg, setMsg] = useState({ name: "", email: "", subject: "", body: "" });
  return (
    <main style={{ paddingTop: 64 }}>
      <section className="contact-bg">
        <div className="container">
          <div className="section-tag">Get In Touch</div>
          <h1 className="section-title">CONTACT <span>US</span></h1>
          <div className="contact-grid">
            <div>
              <p style={{ fontSize: 16, color: "var(--grey)", lineHeight: 1.8, marginBottom: 32 }}>
                Ready to discuss your industrial maintenance needs? Contact us through any of the channels below.
              </p>
              {[
                { icon: "mail", title: "Email", desc: "Ezekielakin@gmail.com", action: () => window.location.href = "mailto:Ezekielakin@gmail.com" },
                { icon: "phone", title: "Phone / Call", desc: "+234 806 893 0669", action: () => window.location.href = "tel:+2348068930669" },
                { icon: "whatsapp", title: "WhatsApp", desc: "Chat with us instantly", action: () => window.open("https://wa.me/2348068930669", "_blank") },
                { icon: "mapPin", title: "Location", desc: "Nigeria (Nationwide Coverage)", action: null },
              ].map((c, i) => (
                <div key={i} className="contact-card" onClick={c.action || undefined}>
                  <div className="contact-card-icon">
                    <Icon d={Icons[c.icon]} size={22} fill={c.icon === "whatsapp" ? "currentColor" : "none"} stroke={c.icon === "whatsapp" ? "none" : "currentColor"} />
                  </div>
                  <div className="contact-card-text">
                    <h4>{c.title}</h4>
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="booking-form">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: 1, marginBottom: 28 }}>SEND A MESSAGE</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleBook(e); setMsg({ name: "", email: "", subject: "", body: "" }); }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="form-input" placeholder="Your Name" value={msg.name} onChange={e => setMsg({ ...msg, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="your@email.com" value={msg.email} onChange={e => setMsg({ ...msg, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" placeholder="Service inquiry, consultation request..." value={msg.subject} onChange={e => setMsg({ ...msg, subject: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" style={{ minHeight: 140 }} placeholder="Describe your project or inquiry..." value={msg.body} onChange={e => setMsg({ ...msg, body: e.target.value })} required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Send Message <Icon d={Icons.arrow} size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── BLOG PAGE ────────────────────────────────────────────────────────────────
function BlogPage() {
  const [active, setActive] = useState(null);
  return (
    <main style={{ paddingTop: 64 }}>
      <section>
        <div className="container">
          <div className="section-tag">Engineering Insights</div>
          <h1 className="section-title">BLOG & <span>KNOWLEDGE</span></h1>
          <p className="section-desc">Technical articles on industrial maintenance, power systems, and engineering best practices from the field.</p>
          <div className="blog-grid">
            {BLOG_POSTS.map((b, i) => (
              <div key={i} className="blog-card" onClick={() => setActive(i)}>
                <div className="blog-img" style={{ background: `linear-gradient(135deg, ${b.bg}, var(--navy3))` }}>
                  <div className="blog-img-overlay" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))" }} />
                  <span style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-display)", fontSize: 40, color: "rgba(255,107,0,0.3)" }}>{b.tag.split(" ")[0].toUpperCase()}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-tag">{b.tag}</div>
                  <div className="blog-title">{b.title}</div>
                  <p className="blog-desc">{b.desc}</p>
                  <div className="blog-meta">
                    <span>{b.date}</span>
                    <span className="blog-read">{b.read} READ →</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Placeholder */}
            <div className="blog-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, padding: 40, border: "1px dashed var(--dark-grey)" }}>
              <div style={{ color: "var(--dark-grey)", fontFamily: "var(--font-display)", fontSize: 36, letterSpacing: 2 }}>MORE COMING</div>
              <p style={{ color: "var(--grey)", fontSize: 13, textAlign: "center" }}>New technical articles published monthly</p>
            </div>
          </div>
        </div>
      </section>
      {active !== null && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div className="modal" style={{ width: 560 }} onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setActive(null)}><Icon d={Icons.close} size={20} /></span>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)", letterSpacing: 3, marginBottom: 12 }}>{BLOG_POSTS[active].tag}</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 1, marginBottom: 16, lineHeight: 1.2 }}>{BLOG_POSTS[active].title}</h2>
            <p style={{ color: "var(--grey)", fontSize: 15, lineHeight: 1.8 }}>{BLOG_POSTS[active].desc}</p>
            <p style={{ color: "var(--grey)", fontSize: 14, lineHeight: 1.8, marginTop: 16 }}>Full article coming soon. Subscribe to our newsletter for updates on new technical insights from the field.</p>
          </div>
        </div>
      )}
    </main>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminDashboard({ dashTab, setDashTab, nav, setLoggedIn }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: "grid" },
    { id: "bookings", label: "Bookings", icon: "calendar" },
    { id: "services", label: "Services", icon: "wrench" },
    { id: "blog", label: "Blog Posts", icon: "file" },
    { id: "messages", label: "Messages", icon: "mail" },
  ];
  return (
    <div className="dash-layout" style={{ paddingTop: 0 }}>
      <div className="dash-sidebar">
        <div className="dash-logo">
          <div className="dash-logo-txt">ECS <span style={{ color: "var(--orange)" }}>Admin</span></div>
          <div className="dash-logo-role">Administrator Panel</div>
        </div>
        {tabs.map(t => (
          <div key={t.id} className={`dash-nav-item${dashTab === t.id ? " active" : ""}`} onClick={() => setDashTab(t.id)}>
            <Icon d={Icons[t.icon]} size={16} /> {t.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div className="dash-nav-item" onClick={() => nav("home")}><Icon d={Icons.eye} size={16} /> View Site</div>
        <div className="dash-nav-item" onClick={() => { setLoggedIn(false); nav("home"); }}><Icon d={Icons.logout} size={16} /> Sign Out</div>
      </div>
      <div className="dash-main">
        <div className="dash-content">
          {dashTab === "overview" && (
            <>
              <div className="dash-header">
                <div className="dash-title">DASHBOARD</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--grey)" }}>Last updated: just now</div>
              </div>
              <div className="dash-cards">
                {[["12", "Total Bookings", "+3"], ["4", "Pending", "new"], ["8", "Completed", "✓"], ["₦2.4M", "Revenue Est.", "+12%"]].map(([v, l, d]) => (
                  <div key={l} className="dash-card">
                    <div className="dash-card-val">{v}</div>
                    <div className="dash-card-label">{l}</div>
                    <div className="dash-card-delta">{d}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 1, marginBottom: 20 }}>RECENT BOOKINGS</div>
              <BookingsTable />
            </>
          )}
          {dashTab === "bookings" && (
            <>
              <div className="dash-header">
                <div className="dash-title">BOOKINGS</div>
                <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}><Icon d={Icons.plus} size={14} /> New Booking</button>
              </div>
              <BookingsTable />
            </>
          )}
          {dashTab === "services" && (
            <>
              <div className="dash-header">
                <div className="dash-title">SERVICES</div>
                <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}><Icon d={Icons.plus} size={14} /> Add Service</button>
              </div>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead><tr><th>#</th><th>Service Name</th><th>Category</th><th>Actions</th></tr></thead>
                  <tbody>
                    {SERVICES.map((s, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "var(--font-mono)", color: "var(--grey)", fontSize: 12 }}>{String(i + 1).padStart(2, "0")}</td>
                        <td>{s.name}</td>
                        <td><span className="status-badge status-confirmed">Active</span></td>
                        <td>
                          <button className="dash-action-btn"><Icon d={Icons.edit} size={12} /> Edit</button>
                          <button className="dash-action-btn"><Icon d={Icons.trash} size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {dashTab === "blog" && (
            <>
              <div className="dash-header">
                <div className="dash-title">BLOG POSTS</div>
                <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}><Icon d={Icons.plus} size={14} /> New Post</button>
              </div>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {BLOG_POSTS.map((b, i) => (
                      <tr key={i}>
                        <td>{b.title}</td>
                        <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)" }}>{b.tag}</td>
                        <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--grey)" }}>{b.date}</td>
                        <td><span className="status-badge status-confirmed">Published</span></td>
                        <td>
                          <button className="dash-action-btn"><Icon d={Icons.edit} size={12} /> Edit</button>
                          <button className="dash-action-btn"><Icon d={Icons.trash} size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {dashTab === "messages" && (
            <><div className="dash-header"><div className="dash-title">MESSAGES</div></div>
              <div style={{ color: "var(--grey)", textAlign: "center", padding: "80px 0" }}>
                <Icon d={Icons.mail} size={40} />
                <p style={{ marginTop: 16, fontSize: 16 }}>0 unread messages</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BookingsTable() {
  return (
    <div className="dash-table-wrap">
      <table className="dash-table">
        <thead>
          <tr><th>Booking ID</th><th>Client</th><th>Service</th><th>Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {MOCK_BOOKINGS.map((b, i) => (
            <tr key={i}>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)" }}>{b.id}</td>
              <td style={{ fontWeight: 600 }}>{b.client}</td>
              <td style={{ color: "var(--grey)", fontSize: 14 }}>{b.service}</td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--grey)" }}>{b.date}</td>
              <td><span className={`status-badge status-${b.status}`}>{b.status}</span></td>
              <td>
                <button className="dash-action-btn"><Icon d={Icons.eye} size={12} /></button>
                <button className="dash-action-btn"><Icon d={Icons.edit} size={12} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── CLIENT DASHBOARD ─────────────────────────────────────────────────────────
function ClientDashboard({ nav, setLoggedIn }) {
  const [tab, setTab] = useState("overview");
  return (
    <div className="dash-layout" style={{ paddingTop: 0 }}>
      <div className="dash-sidebar">
        <div className="dash-logo">
          <div className="dash-logo-txt">ECS <span style={{ color: "var(--orange)" }}>Portal</span></div>
          <div className="dash-logo-role">Client Dashboard</div>
        </div>
        {[
          { id: "overview", icon: "grid", label: "Overview" },
          { id: "bookings", icon: "calendar", label: "My Bookings" },
          { id: "messages", icon: "mail", label: "Messages" },
          { id: "profile", icon: "user", label: "Profile" },
        ].map(t => (
          <div key={t.id} className={`dash-nav-item${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
            <Icon d={Icons[t.icon]} size={16} /> {t.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div className="dash-nav-item" onClick={() => nav("booking")}><Icon d={Icons.plus} size={16} /> New Booking</div>
        <div className="dash-nav-item" onClick={() => { setLoggedIn(false); nav("home"); }}><Icon d={Icons.logout} size={16} /> Sign Out</div>
      </div>
      <div className="dash-main">
        <div className="dash-content">
          <div className="dash-header">
            <div className="dash-title">{tab === "overview" ? "MY DASHBOARD" : tab.toUpperCase()}</div>
          </div>
          {tab === "overview" && (
            <>
              <div className="dash-cards" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
                {[["2", "Bookings"], ["1", "Pending"], ["1", "Completed"]].map(([v, l]) => (
                  <div key={l} className="dash-card"><div className="dash-card-val">{v}</div><div className="dash-card-label">{l}</div></div>
                ))}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 1, marginBottom: 20 }}>RECENT BOOKINGS</div>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead><tr><th>Booking</th><th>Service</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {MOCK_BOOKINGS.slice(0, 2).map((b, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)" }}>{b.id}</td>
                        <td>{b.service}</td>
                        <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--grey)" }}>{b.date}</td>
                        <td><span className={`status-badge status-${b.status}`}>{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {tab === "bookings" && (
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead><tr><th>Booking</th><th>Service</th><th>Date</th><th>Status</th><th>Invoice</th></tr></thead>
                <tbody>
                  {MOCK_BOOKINGS.slice(0, 2).map((b, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)" }}>{b.id}</td>
                      <td>{b.service}</td>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--grey)" }}>{b.date}</td>
                      <td><span className={`status-badge status-${b.status}`}>{b.status}</span></td>
                      <td><button className="dash-action-btn"><Icon d={Icons.download} size={12} /> PDF</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab !== "overview" && tab !== "bookings" && (
            <div style={{ color: "var(--grey)", textAlign: "center", padding: "80px 0" }}>
              <Icon d={Icons[tab === "messages" ? "mail" : "user"]} size={40} />
              <p style={{ marginTop: 16 }}>No {tab} data yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ nav }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">EASY<span>CONCEPT</span>SOLUTION</div>
            <p className="footer-desc">Professional industrial maintenance and engineering services. Powering Nigeria's industries with expertise, precision, and reliability.</p>
            <div className="footer-social">
              {["linkedin", "twitter", "facebook"].map(s => (
                <div key={s} className="social-btn" title={s}>
                  <Icon d={s === "linkedin" ? "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" : s === "twitter" ? "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" : "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"} size={15} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4>Services</h4>
            {["Mechanical Maintenance", "Power Plant Support", "Generator Services", "HVAC Systems", "SCADA Monitoring"].map(s => (
              <span key={s} className="footer-link" onClick={() => nav("services")}>{s}</span>
            ))}
          </div>
          <div>
            <h4>Company</h4>
            {[["About Us", "about"], ["Experience", "experience"], ["Certifications", "certifications"], ["Blog", "blog"], ["Contact", "contact"]].map(([l, p]) => (
              <span key={p} className="footer-link" onClick={() => nav(p)}>{l}</span>
            ))}
          </div>
          <div>
            <h4>Contact</h4>
            <span className="footer-link"><Icon d={Icons.mail} size={13} style={{ marginRight: 6 }} /> Ezekielakin@gmail.com</span>
            <span className="footer-link"><Icon d={Icons.phone} size={13} /> +234 806 893 0669</span>
            <span className="footer-link"><Icon d={Icons.mapPin} size={13} /> Nigeria (Nationwide)</span>
            <div style={{ marginTop: 20 }}>
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 13 }} onClick={() => nav("booking")}>
                Book a Service
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 EasyConceptSolution — All Rights Reserved</div>
          <div className="footer-legal">
            <span className="footer-link" style={{ fontSize: 12 }}>Privacy Policy</span>
            <span className="footer-link" style={{ fontSize: 12 }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
