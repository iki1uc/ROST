<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>⚡ Kompetenz-Messstation · Hardware · Wetter · Diagnose</title>
<style>
  * { box-sizing: border-box; margin:0; padding:0; }
  body {
    background:#06070e; color:#e0e8f0; font-family:'Consolas','Segoe UI',monospace;
    min-height:100vh; display:flex; align-items:center; justify-content:center; padding:16px;
  }
  .container {
    max-width:1400px; width:100%; background:rgba(12,16,28,0.7); backdrop-filter:blur(4px);
    border-radius:28px; border:1px solid rgba(255,200,120,0.15); padding:24px 28px 32px;
    box-shadow:0 20px 60px rgba(0,0,0,0.8);
  }
  header {
    display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;
    margin-bottom:20px; border-bottom:1px solid rgba(255,200,120,0.08); padding-bottom:12px;
  }
  header h1 {
    font-size:26px; font-weight:300; letter-spacing:3px;
    background:linear-gradient(135deg, #ffb35a, #ffe3a8); -webkit-background-clip:text;
    -webkit-text-fill-color:transparent; background-clip:text;
  }
  header .badge {
    background:rgba(255,200,120,0.08); border:1px solid rgba(255,200,120,0.15);
    border-radius:100px; padding:4px 18px; font-size:12px; color:#c0a06a;
  }
  .status-row {
    display:flex; flex-wrap:wrap; gap:12px 24px;
    background:rgba(0,0,0,0.3); border-radius:12px; padding:10px 16px;
    margin-bottom:16px; font-size:13px; border:1px solid rgba(255,200,120,0.06);
  }
  .status-row .item { display:flex; align-items:center; gap:6px; }
  .status-row .label { color:#7a8a9a; }
  .status-row .value { color:#ffcf8c; font-weight:bold; }
  .status-row .value.good { color:#8cf0a0; }
  .status-row .value.err { color:#ff6b6b; }

  .grid-2 {
    display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;
  }
  @media (max-width:800px){ .grid-2 { grid-template-columns:1fr; } }
  .panel {
    background:rgba(20,16,10,0.4); border:1px solid rgba(255,200,120,0.06);
    border-radius:16px; padding:14px 18px; backdrop-filter:blur(2px);
  }
  .panel h2 {
    font-size:14px; color:#ffd9a0; border-bottom:1px solid rgba(255,200,120,0.08);
    padding-bottom:6px; margin-bottom:10px; letter-spacing:1px;
  }
  .hw-row {
    display:flex; justify-content:space-between; padding:4px 0; font-size:12px;
    border-bottom:1px solid rgba(255,255,255,0.03);
  }
  .hw-row .label { color:#9a8a7a; }
  .hw-row .val { font-weight:bold; }
  .hw-row .val.green { color:#8cf0a0; }
  .hw-row .val.yellow { color:#f5d080; }
  .hw-row .val.red { color:#ff6b6b; }

  canvas {
    display:block; width:100%; aspect-ratio:16/9; background:#000;
    border-radius:16px; border:1px solid rgba(255,200,120,0.08);
    margin-bottom:16px; box-shadow:inset 0 0 60px rgba(80,40,0,0.2);
  }

  .control-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(80px,1fr));
    gap:8px; margin-bottom:14px;
  }
  .btn {
    background:rgba(30,24,16,0.6); border:1px solid rgba(255,200,120,0.12);
    border-radius:10px; padding:8px 4px; color:#d8c0a0; font-family:inherit;
    font-size:12px; cursor:pointer; transition:all 0.25s; text-align:center;
  }
  .btn:hover { border-color:#ffb35a; background:rgba(200,130,40,0.12); color:#fff; transform:translateY(-2px); }
  .btn.primary { border-color:#ffb35a; color:#ffb35a; }
  .btn.primary:hover { background:rgba(200,130,40,0.18); }
  .btn.warn { border-color:#f0d080; color:#f0d080; }
  .btn.danger { border-color:#ff6b6b; color:#ff6b6b; }

  .log-box {
    background:rgba(0,0,0,0.4); border-radius:12px; padding:10px 14px;
    font-size:12px; color:#8a9aaa; height:110px; overflow-y:auto;
    border:1px solid rgba(255,200,120,0.04); line-height:1.6; margin-top:6px;
  }
  .log-box::-webkit-scrollbar { width:3px; }
  .log-box::-webkit-scrollbar-thumb { background:#3a2a1a; border-radius:4px; }

  .footer {
    text-align:center; color:#3a4a5a; font-size:10px; margin-top:16px;
    border-top:1px solid rgba(255,200,120,0.04); padding-top:10px;
  }
</style>
</head>
<body>
<div class="container">

<header>
  <h1>⚡ Kompetenz‑Messstation</h1>
  <span class="badge">● Hardware · Wetter · Diagnose</span>
</header>

<!-- STATUS -->
<div class="status-row" id="statusRow">
  <span class="item"><span class="label">STATE</span> <span class="value" id="stateDisplay">AKTIV</span></span>
  <span class="item"><span class="label">READY</span> <span class="value" id="readyDisplay">81/81</span></span>
  <span class="item"><span class="label">ABWEICHUNG</span> <span class="value" id="errorsDisplay">0</span></span>
  <span class="item"><span class="label">KOMPETENZ</span> <span class="value good" id="truthDisplay">100%</span></span>
  <span class="item"><span class="label">WETTER</span> <span class="value" id="weatherState">sonnig</span></span>
</div>

<!-- CANVAS (Wasser / Hardware‑Visualisierung) -->
<canvas id="mainCanvas" width="800" height="450"></canvas>

<!-- HARDWARE + WETTER PANELS -->
<div class="grid-2">
  <div class="panel">
    <h2>🖥️ Hardware‑Simulation</h2>
    <div class="hw-row"><span class="label">CPU‑Last</span><span class="val green" id="cpuLoad">0%</span></div>
    <div class="hw-row"><span class="label">GPU‑Temp</span><span class="val yellow" id="gpuTemp">0°C</span></div>
    <div class="hw-row"><span class="label">RAM‑Auslastung</span><span class="val" id="ramLoad">0%</span></div>
    <div class="hw-row"><span class="label">ROM‑Status</span><span class="val green" id="romStatus">OK</span></div>
    <div class="hw-row"><span class="label">THUNDERBOLT</span><span class="val" id="tbStatus">verbunden</span></div>
  </div>
  <div class="panel">
    <h2>🌦️ Wetter‑Analyse</h2>
    <div class="hw-row"><span class="label">Temperatur</span><span class="val" id="tempVal">0°C</span></div>
    <div class="hw-row"><span class="label">Luftdruck</span><span class="val" id="pressVal">0 hPa</span></div>
    <div class="hw-row"><span class="label">Luftfeuchtigkeit</span><span class="val" id="humidVal">0%</span></div>
    <div class="hw-row"><span class="label">Windgeschw.</span><span class="val" id="windVal">0 km/h</span></div>
    <div class="hw-row"><span class="label">Prognose</span><span class="val" id="forecastVal">stabil</span></div>
  </div>
</div>

<!-- STEUERUNG -->
<div class="control-grid">
  <button class="btn primary" id="btnMiss">🎯 MISS</button>
  <button class="btn primary" id="btnFasil">⚖️ FASIL</button>
  <button class="btn primary" id="btnFix">🔧 FIX</button>
  <button class="btn primary" id="btnFit">📐 FIT</button>
  <button class="btn warn" id="btnRecall">⏪ RECALL</button>
  <button class="btn danger" id="btnRefinal">⚡ REFINAL</button>
  <button class="btn" id="btnReset">⟲ RESET</button>
  <button class="btn" id="btnPause">⏸ PAUSE</button>
</div>

<!-- LOG -->
<div class="log-box" id="logBox">[init] Kompetenz‑Messstation gestartet …</div>

<div class="footer">⚖️ iki1uc · QUEAST‑kompatibel · Pipeline 3/6 · Hardware / Wetter</div>
</div>

<script>
"use strict";

// ================================================================
//  KOMPETENZ-MESSSTATION
//  Simulation von Hardware (CPU, GPU, RAM, ROM, TB) +
//  Wetterdaten (Temp, Druck, Feuchte, Wind) +
//  Diagnose-Engine mit Systemmeldungen
//  Visualisierung: Edel-Wasser v4 + Status-Overlay
// ================================================================

// ─── CANVAS ──────────────────────────────────────────────────────
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

// ─── STATE ──────────────────────────────────────────────────────
const TOTAL_SLOTS = 81;
const COLS = 9, ROWS = 9;
const CELL_W = W / COLS, CELL_H = H / ROWS;
const TOLERANCE = 0.15;

let slots = [];
let running = true;
let time = 0;
let logEntries = [];

// ─── Hardware‑Simulationswerte ─────────────────────────────────
let hw = {
  cpu: 0.3,        // 0..1
  gpu: 50,         // °C
  ram: 0.4,        // 0..1
  rom: 0,          // Fehlerzähler
  tb: true,
};

// ─── Wetter‑Simulationswerte ──────────────────────────────────
let weather = {
  temp: 18,        // °C
  pressure: 1013,  // hPa
  humidity: 60,    // %
  wind: 5,         // km/h
};

// ─── INIT SLOTS ────────────────────────────────────────────────
function initSlots() {
  slots = [];
  for (let i = 0; i < TOTAL_SLOTS; i++) {
    const v = Math.sin(i * 0.2 + 0.5);
    slots.push({
      value: v,
      truth: 0,
      pulse: 0,
      drift: 0,
      angle: (i * 37) % 360,
      targetValue: v,
      deviation: Math.abs(v),
      score: 1 - Math.min(Math.abs(v), 1)
    });
  }
}
initSlots();

function computeDeviationAndScore(s) {
  s.deviation = Math.abs(s.value - s.truth);
  s.score = Math.max(0, 1 - Math.min(s.deviation, 1));
}

// ─── STATUS UI ──────────────────────────────────────────────────
function updateStatus() {
  for (const s of slots) computeDeviationAndScore(s);
  const ready = slots.filter(s => s.deviation <= TOLERANCE).length;
  const errors = TOTAL_SLOTS - ready;
  const avgScore = slots.reduce((sum, s) => sum + s.score, 0) / TOTAL_SLOTS;
  const truthPercent = Math.round(avgScore * 100);

  document.getElementById('readyDisplay').textContent = `${ready}/${TOTAL_SLOTS}`;
  document.getElementById('errorsDisplay').textContent = errors;
  document.getElementById('errorsDisplay').className = errors === 0 ? 'value good' : 'value err';
  document.getElementById('stateDisplay').textContent = errors === 0 ? 'VOLL AKTIV' : 'ABWEICHEND';
  const truthEl = document.getElementById('truthDisplay');
  truthEl.textContent = `${truthPercent}%`;
  truthEl.className = truthPercent >= 80 ? 'value good' : (truthPercent >= 40 ? 'value' : 'value err');

  // Hardware‑Update
  document.getElementById('cpuLoad').textContent = Math.round(hw.cpu * 100) + '%';
  document.getElementById('cpuLoad').className = 'val ' + (hw.cpu < 0.7 ? 'green' : hw.cpu < 0.9 ? 'yellow' : 'red');
  document.getElementById('gpuTemp').textContent = Math.round(hw.gpu) + '°C';
  document.getElementById('gpuTemp').className = 'val ' + (hw.gpu < 70 ? 'green' : hw.gpu < 85 ? 'yellow' : 'red');
  document.getElementById('ramLoad').textContent = Math.round(hw.ram * 100) + '%';
  document.getElementById('ramLoad').className = 'val ' + (hw.ram < 0.7 ? 'green' : hw.ram < 0.9 ? 'yellow' : 'red');
  document.getElementById('romStatus').textContent = hw.rom > 0 ? 'FEHLER ' + hw.rom : 'OK';
  document.getElementById('romStatus').className = 'val ' + (hw.rom === 0 ? 'green' : 'red');
  document.getElementById('tbStatus').textContent = hw.tb ? 'verbunden' : 'getrennt';
  document.getElementById('tbStatus').className = 'val ' + (hw.tb ? 'green' : 'red');

  // Wetter‑Update
  document.getElementById('tempVal').textContent = Math.round(weather.temp) + '°C';
  document.getElementById('pressVal').textContent = Math.round(weather.pressure) + ' hPa';
  document.getElementById('humidVal').textContent = Math.round(weather.humidity) + '%';
  document.getElementById('windVal').textContent = Math.round(weather.wind) + ' km/h';

  // Wetterzustand (einfache Klassifikation)
  let wstate = 'stabil';
  if (weather.temp > 28) wstate = 'heiß';
  else if (weather.temp < 5) wstate = 'kalt';
  else if (weather.humidity > 80) wstate = 'feucht';
  else if (weather.wind > 30) wstate = 'stürmisch';
  else if (weather.pressure < 1000) wstate = 'tiefdruck';
  document.getElementById('weatherState').textContent = wstate;
}

// ─── LOG ──────────────────────────────────────────────────────
function log(msg) {
  const box = document.getElementById('logBox');
  const timeStr = new Date().toLocaleTimeString();
  const entry = document.createElement('div');
  entry.textContent = `[${timeStr}] ${msg}`;
  box.appendChild(entry);
  box.scrollTop = box.scrollHeight;
  if (box.children.length > 60) box.removeChild(box.firstChild);
  logEntries.push(msg);
}

// ─── MESS‑ / DIAGNOSEFUNKTIONEN ──────────────────────────────
function doMiss() {
  let sumDev = 0;
  for (const s of slots) { computeDeviationAndScore(s); sumDev += s.deviation; }
  const avgDev = sumDev / TOTAL_SLOTS;
  log(`🎯 MISS → Messung: Ø Abweichung ${avgDev.toFixed(3)}`);
  // Hardware‑Fehler erkennen
  if (hw.cpu > 0.9) log('⚠️ CPU‑Last kritisch!');
  if (hw.gpu > 85) log('⚠️ GPU‑Überhitzung!');
  if (hw.ram > 0.9) log('⚠️ RAM‑Engpass!');
  if (hw.rom > 3) log('❌ ROM‑Fehler häufen sich!');
  updateStatus();
}

function doFasil() {
  const avg = slots.reduce((sum, s) => sum + s.value, 0) / TOTAL_SLOTS;
  for (const s of slots) {
    s.value = s.value * 0.6 + avg * 0.4;
    s.targetValue = s.value;
    s.pulse *= 0.8; s.drift *= 0.8;
  }
  log('⚖️ FASIL → System kalibriert');
  updateStatus();
}

function doFix() {
  let fixed = 0;
  for (const s of slots) {
    if (s.value > 1.5 || s.value < -1.5) {
      s.value = Math.sign(s.value) * 1.2; fixed++;
    }
    s.pulse = Math.min(Math.max(s.pulse, -1), 1);
    s.drift = Math.min(Math.max(s.drift, -1), 1);
    s.angle = ((s.angle % 360) + 360) % 360;
  }
  log(`🔧 FIX → ${fixed} Ausreißer korrigiert`);
  if (hw.rom > 0) { hw.rom = Math.max(0, hw.rom - 1); log('🔄 ROM‑Fehler reduziert'); }
  updateStatus();
}

function doFit() {
  for (let i = 0; i < TOTAL_SLOTS; i++) {
    const s = slots[i];
    const phase = i * 0.2 + time * 0.0003;
    s.targetValue = Math.sin(phase) * 0.9;
    s.value = s.value * 0.5 + s.targetValue * 0.5;
    s.pulse = Math.sin(time/120 + i*0.1) * 0.6;
    s.drift = Math.cos(time/240 + i*0.05) * 0.5;
    s.angle = (time/10 + i*4) % 360;
  }
  log('📐 FIT → Referenzkurve angelegt');
  updateStatus();
}

function doRecall() {
  initSlots();
  hw.cpu = 0.3; hw.gpu = 50; hw.ram = 0.4; hw.rom = 0; hw.tb = true;
  weather.temp = 18; weather.pressure = 1013; weather.humidity = 60; weather.wind = 5;
  log('⏪ RECALL → Ausgangszustand wiederhergestellt');
  updateStatus();
}

function doRefinal() {
  for (const s of slots) {
    s.value = Math.sin(s.angle * Math.PI / 180) * 0.5;
    s.targetValue = s.value;
    s.pulse = 0; s.drift = 0;
    s.angle = (s.angle + 10) % 360;
  }
  hw.cpu = 0.2; hw.gpu = 45; hw.ram = 0.3; hw.rom = 0;
  weather.temp = 20; weather.pressure = 1015; weather.humidity = 55; weather.wind = 8;
  log('⚡ REFINAL → vollständige Neukalibrierung');
  updateStatus();
}

// ─── RENDER: EDEL‑WASSER v4 (Hardware‑ & Wetter‑Visualisierung) ──
function drawWaterEdelV4() {
  ctx.clearRect(0, 0, W, H);

  // Hintergrund
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#04050a");
  bg.addColorStop(1, "#0a0a12");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Holo‑Glow
  const glow = ctx.createRadialGradient(W/2, H/2, 40, W/2, H/2, H);
  glow.addColorStop(0, "rgba(255,200,120,0.20)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const mirrorY = H / 2;

  // OBERER TEIL – Messwerte → Wasserfarbe
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const idx = r * COLS + c;
      const s = slots[idx];
      computeDeviationAndScore(s);
      const x = c * CELL_W;
      const y = r * CELL_H;
      const score = s.score;
      const gold = Math.round(120 + score * 135);
      const red  = Math.round(80  + score * 100);
      const alpha = 0.30 + score * 0.35;
      ctx.fillStyle = `rgba(${gold}, ${red}, 40, ${alpha})`;
      ctx.fillRect(x, y, CELL_W, CELL_H);
    }
  }

  // Spiegel-Linie
  ctx.fillStyle = "rgba(255,200,120,0.15)";
  ctx.fillRect(0, mirrorY - 1, W, 2);

  // UNTERER TEIL – Spiegelung + Wellen (Kopplung an CPU/GPU)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const idx = r * COLS + c;
      const s = slots[idx];
      const score = s.score;
      const x = c * CELL_W;
      const y = mirrorY + (ROWS - r - 1) * CELL_H;
      const wave = Math.sin(time * 0.002 + x * 0.03 + r * 0.2) * (4 + (score + hw.cpu * 0.3) * 8);
      const gold = Math.round(120 + score * 135);
      const red  = Math.round(80  + score * 100);
      const alpha = 0.20 + score * 0.30;
      ctx.fillStyle = `rgba(${gold}, ${red}, 40, ${alpha})`;
      ctx.fillRect(x, y + wave, CELL_W, CELL_H);
      const fade = (r / ROWS) * 0.45;
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(x, y, CELL_W, CELL_H);
    }
  }

  // Pipeline‑3 Scan‑Linien (mit CPU/GPU‑Modulation)
  for (let i = 0; i < 14; i++) {
    const y = (i / 14) * H;
    const waveOffset = Math.sin(i * 0.4 + time * 0.0006 + hw.gpu * 0.02) * 6;
    ctx.beginPath();
    ctx.moveTo(0, y + waveOffset);
    for (let x = 0; x < W; x += 4) {
      const val = Math.sin(x * 0.02 + i * 0.3 + time * 0.0009 + hw.cpu * 0.5) * 3 + waveOffset;
      ctx.lineTo(x, y + val);
    }
    ctx.strokeStyle = `rgba(255,200,120,${0.03 + (i / 14) * 0.06})`;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }

  // Pipeline‑6 Truth‑Overlay mit Wetterdaten
  ctx.fillStyle = "rgba(255,200,120,0.12)";
  ctx.font = "18px Consolas";
  ctx.textAlign = "center";
  ctx.fillText(
    `⚡ KOMPETENZ · HW${Math.round(hw.cpu*100)}% · ${Math.round(weather.temp)}°C · ${Math.round(weather.humidity)}%`,
    W/2, 12
  );
}

// ─── UPDATE SLOTS & HW/WETTER ──────────────────────────────────
function updateSlots() {
  for (const s of slots) {
    s.value += (s.targetValue - s.value) * 0.008;
    s.pulse += Math.sin(time * 0.001 + s.angle * 0.01) * 0.001;
    s.drift += Math.cos(time * 0.002 + s.angle * 0.02) * 0.001;
    s.pulse = Math.min(Math.max(s.pulse, -1), 1);
    s.drift = Math.min(Math.max(s.drift, -1), 1);
    s.angle = (s.angle + 0.02) % 360;
  }

  // Hardware‑Dynamik (simulierte Last)
  hw.cpu = 0.2 + 0.5 * (0.5 + 0.5 * Math.sin(time * 0.0004)) + 0.2 * Math.random();
  hw.cpu = Math.min(1, Math.max(0, hw.cpu));
  hw.gpu = 45 + 15 * (0.5 + 0.5 * Math.sin(time * 0.0003 + 1.2)) + 5 * Math.random();
  hw.gpu = Math.min(95, Math.max(30, hw.gpu));
  hw.ram = 0.3 + 0.4 * (0.5 + 0.5 * Math.sin(time * 0.0005 + 0.7)) + 0.15 * Math.random();
  hw.ram = Math.min(1, Math.max(0, hw.ram));
  // ROM‑Fehler zufällig (selten)
  if (Math.random() < 0.001) hw.rom = Math.min(5, hw.rom + 1);
  if (hw.rom > 0 && Math.random() < 0.01) hw.rom = Math.max(0, hw.rom - 1);

  // Wetter‑Dynamik (Sinusschwingungen + Rauschen)
  weather.temp = 16 + 6 * Math.sin(time * 0.0001 + 0.5) + 2 * Math.sin(time * 0.00005 + 2.1) + 0.5 * Math.random();
  weather.temp = Math.min(35, Math.max(-5, weather.temp));
  weather.pressure = 1013 + 8 * Math.sin(time * 0.00008 + 1.3) + 2 * Math.random();
  weather.pressure = Math.min(1030, Math.max(980, weather.pressure));
  weather.humidity = 55 + 20 * Math.sin(time * 0.00012 + 0.8) + 5 * Math.random();
  weather.humidity = Math.min(95, Math.max(20, weather.humidity));
  weather.wind = 8 + 12 * Math.sin(time * 0.00015 + 0.3) + 3 * Math.random();
  weather.wind = Math.min(60, Math.max(0, weather.wind));
}

// ─── LOOP ──────────────────────────────────────────────────────
function loop() {
  if (running) {
    time += 16;
    updateSlots();
    drawWaterEdelV4();
    if (Math.floor(time / 2000) % 2 === 0) updateStatus();
  }
  requestAnimationFrame(loop);
}

// ─── PAUSE ──────────────────────────────────────────────────────
document.getElementById('btnPause').addEventListener('click', () => {
  running = !running;
  document.getElementById('btnPause').textContent = running ? '⏸ PAUSE' : '▶ START';
  log(running ? '▶ Fortgesetzt' : '⏸ Pausiert');
});

// ─── BUTTONS ────────────────────────────────────────────────────
document.getElementById('btnMiss').addEventListener('click', doMiss);
document.getElementById('btnFasil').addEventListener('click', doFasil);
document.getElementById('btnFix').addEventListener('click', doFix);
document.getElementById('btnFit').addEventListener('click', doFit);
document.getElementById('btnRecall').addEventListener('click', doRecall);
document.getElementById('btnRefinal').addEventListener('click', doRefinal);
document.getElementById('btnReset').addEventListener('click', () => {
  initSlots();
  hw.cpu = 0.3; hw.gpu = 50; hw.ram = 0.4; hw.rom = 0; hw.tb = true;
  weather.temp = 18; weather.pressure = 1013; weather.humidity = 60; weather.wind = 5;
  log('⟲ RESET → System neu gestartet');
  updateStatus();
});

// ─── TASTATUR ──────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === ' ') { e.preventDefault(); document.getElementById('btnPause').click(); }
  if (e.key === 'm') doMiss();
  if (e.key === 'f') doFasil();
  if (e.key === 'x') doFix();
  if (e.key === 't') doFit();
  if (e.key === 'r') doRecall();
  if (e.key === 'R') doRefinal();
});

// ─── INIT ──────────────────────────────────────────────────────
log('⚡ Kompetenz‑Messstation initialisiert');
log('🖥️ Hardware‑Simulation (CPU/GPU/RAM/ROM/TB) aktiv');
log('🌦️ Wetter‑Analyse (Temp/Druck/Feuchte/Wind) aktiv');
log('⌨️  Leertaste=Pause  m=MISS  f=FASIL  x=FIX  t=FIT  r=RECALL  R=REFINAL');
updateStatus();
loop();

</script>
</body>
</html>
