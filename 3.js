<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌀 STAGE · NC‑Commander · Dashboard · Koordinator</title>
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
            background: #05070e;
            color: #c0d0d0;
            font-family: 'Segoe UI', 'Consolas', monospace;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* ─── MASTER LAYOUT ─────────────────────────────────── */
        #master {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            padding: 16px 20px 20px;
            max-width: 1400px;
            margin: 0 auto;
        }

        /* ─── HEADER / COMMANDER ───────────────────────────── */
        #commander {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            padding: 12px 20px;
            background: rgba(6, 8, 16, 0.7);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            border: 1px solid rgba(120, 220, 150, 0.08);
            margin-bottom: 18px;
        }
        #commander .brand {
            font-size: 22px;
            font-weight: 300;
            letter-spacing: 3px;
            background: linear-gradient(135deg, #7ee0a0, #d8f0c0, #b388ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        #commander .brand small {
            font-size: 11px;
            -webkit-text-fill-color: #4a5a6a;
            letter-spacing: 1px;
        }
        .commander-status {
            display: flex;
            gap: 18px;
            font-size: 11px;
            color: #6a8a7a;
            flex-wrap: wrap;
        }
        .commander-status .led {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 4px;
        }
        .led.green { background: #8cf0d0; box-shadow: 0 0 8px #8cf0d0; }
        .led.gold { background: #f0d080; box-shadow: 0 0 8px #f0d080; }
        .led.purple { background: #b388ff; box-shadow: 0 0 8px #b388ff; }
        .led.off { background: #2a3a3a; }

        /* ─── 8 RICHTUNGEN (SPINNWEBE) ─────────────────────── */
        #directions {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding: 8px 16px;
            background: rgba(0, 0, 0, 0.25);
            border-radius: 12px;
            border: 1px solid rgba(120, 220, 150, 0.04);
            margin-bottom: 16px;
            justify-content: center;
        }
        .dir-item {
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 11px;
            letter-spacing: 1px;
            color: #5a7a6a;
            background: rgba(20, 28, 20, 0.3);
            border: 1px solid rgba(120, 220, 150, 0.04);
            transition: 0.2s;
        }
        .dir-item.active {
            color: #f0d080;
            border-color: rgba(240, 208, 128, 0.2);
            background: rgba(240, 208, 128, 0.04);
        }
        .dir-item .sym { color: #7ee0a0; margin-right: 4px; }

        /* ─── 9×9 RESPO HINTERGRUND ────────────────────────── */
        #respoBg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.04;
            pointer-events: none;
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            grid-template-rows: repeat(9, 1fr);
            gap: 2px;
        }
        #respoBg div {
            background: rgba(120, 220, 150, 0.03);
            border-radius: 2px;
            transition: background 0.5s;
        }

        /* ─── MODUL‑GRID ────────────────────────────────────── */
        #grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 14px;
            margin-top: 6px;
        }
        .modul-card {
            background: rgba(10, 14, 22, 0.7);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(120, 220, 150, 0.06);
            border-radius: 16px;
            padding: 18px 16px 14px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(.2,.9,.25,1.05);
            text-decoration: none;
            color: #c0d0d0;
            position: relative;
            overflow: hidden;
        }
        .modul-card:hover {
            transform: translateY(-4px);
            border-color: rgba(120, 220, 150, 0.2);
            box-shadow: 0 12px 40px rgba(0,0,0,0.5);
            background: rgba(16, 22, 34, 0.8);
        }
        .modul-card.plugin {
            border-color: rgba(179, 136, 255, 0.25);
            background: rgba(24, 14, 34, 0.7);
        }
        .modul-card.plugin:hover { border-color: rgba(179, 136, 255, 0.5); }
        .modul-card .icon {
            font-size: 28px;
            display: block;
            margin-bottom: 8px;
        }
        .modul-card .name {
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 0.5px;
            color: #d0e8e0;
        }
        .modul-card .desc {
            font-size: 10.5px;
            color: #6a8a7a;
            margin-top: 4px;
        }
        .modul-card .badge {
            position: absolute;
            top: 10px;
            right: 12px;
            font-size: 8px;
            background: rgba(120, 220, 150, 0.06);
            padding: 2px 10px;
            border-radius: 10px;
            color: #4a7a6a;
            letter-spacing: 0.5px;
        }
        .modul-card.plugin .badge {
            background: rgba(179, 136, 255, 0.1);
            color: #b388ff;
        }
        .modul-card .status-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 4px;
        }
        .modul-card .status-dot.on { background: #8cf0d0; box-shadow: 0 0 6px #8cf0d0; }
        .modul-card .status-dot.plugin-on { background: #b388ff; box-shadow: 0 0 6px #b388ff; }

        /* ─── KOMMANDOZEILE ────────────────────────────────── */
        #cmdLine {
            margin-top: 18px;
            display: flex;
            gap: 10px;
            align-items: center;
            padding: 10px 18px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 14px;
            border: 1px solid rgba(120, 220, 150, 0.04);
            flex-wrap: wrap;
        }
        #cmdLine .prompt { color: #5a7a6a; font-size: 11px; }
        #cmdLine input {
            flex: 1;
            min-width: 120px;
            background: rgba(20, 28, 20, 0.4);
            border: 1px solid rgba(120, 220, 150, 0.08);
            border-radius: 8px;
            padding: 6px 14px;
            color: #d0e8e0;
            font-family: inherit;
            font-size: 11px;
        }
        #cmdLine input::placeholder { color: #4a5a5a; }
        #cmdLine button {
            background: rgba(20, 28, 20, 0.4);
            border: 1px solid rgba(120, 220, 150, 0.12);
            border-radius: 8px;
            padding: 6px 16px;
            color: #c0d8c8;
            font-family: inherit;
            font-size: 11px;
            cursor: pointer;
            transition: 0.2s;
        }
        #cmdLine button:hover { border-color: #7ee0a0; color: #fff; }
        #cmdLine #cmdOut { color: #8cf0d0; font-size: 11px; margin-left: auto; }

        /* ─── FOOTER ────────────────────────────────────────── */
        footer {
            margin-top: 20px;
            padding: 10px 16px;
            font-size: 9px;
            color: #3a4a4a;
            text-align: center;
            border-top: 1px solid rgba(120, 220, 150, 0.03);
        }
        footer .gold { color: #f0d080; }

        /* ─── RESPONSIVE ────────────────────────────────────── */
        @media (max-width: 700px) {
            #grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
            #commander .brand { font-size: 17px; }
            .modul-card { padding: 14px 12px 10px; }
            .modul-card .icon { font-size: 22px; }
            .modul-card .name { font-size: 13px; }
            #cmdLine { flex-direction: column; align-items: stretch; }
            #cmdLine #cmdOut { margin-left: 0; }
        }
    </style>
</head>
<body>

<!-- 9×9 RESPO HINTERGRUND -->
<div id="respoBg"></div>

<div id="master">

    <!-- COMMANDER HEADER -->
    <header id="commander">
        <div class="brand">
            🌀 STAGE
            <small>NC‑Commander · Koordinator</small>
        </div>
        <div class="commander-status">
            <span><span class="led green"></span> NC‑LIVE</span>
            <span><span class="led gold"></span> ROUTING</span>
            <span><span class="led purple"></span> KOOP</span>
            <span id="clockDisplay" style="color:#5a7a6a;">–</span>
        </div>
    </header>

    <!-- 8 RICHTUNGEN (SPINNWEBE) -->
    <div id="directions">
        <span class="dir-item active"><span class="sym">●</span> S · Sonne</span>
        <span class="dir-item"><span class="sym">○</span> H · Engine</span>
        <span class="dir-item"><span class="sym">◆</span> B · Matrix</span>
        <span class="dir-item"><span class="sym">△</span> T · Triangle</span>
        <span class="dir-item"><span class="sym">◉</span> O · Orbit</span>
        <span class="dir-item"><span class="sym">▣</span> D · DS9</span>
        <span class="dir-item"><span class="sym">⚙</span> t · Helper</span>
        <span class="dir-item"><span class="sym">🧠</span> sys · System</span>
    </div>

    <!-- MODUL-GRID -->
    <div id="grid">

        <!-- NEU: BRAIN als Plugin-Kachel, optisch abgesetzt (violett) -->
        <a class="modul-card plugin" href="./BRAIN/index.html">
            <span class="badge">PLUGIN</span>
            <span class="icon">🧠</span>
            <div class="name">BRAIN</div>
            <div class="desc">ROOT · NC‑Suite · Respo‑Mesh · Dreieck‑Screens</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot plugin-on"></span> Plugin aktiv</span>
        </a>

        <!-- Module aus dem Repository -->
        <a class="modul-card" href="./BOERSE/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">📈</span>
            <div class="name">BOERSE</div>
            <div class="desc">Börsen‑Daten · Stage</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./DOM/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">🏛</span>
            <div class="name">DOM</div>
            <div class="desc">Dom‑Struktur · NC‑Raum</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./EOS/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">🌌</span>
            <div class="name">EOS</div>
            <div class="desc">Ende‑of‑System · Orbit</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./EVO/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">🔮</span>
            <div class="name">EVO</div>
            <div class="desc">Evolution · Axiom‑Map</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./MARKT/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">🏪</span>
            <div class="name">MARKT</div>
            <div class="desc">Markt‑Platz · RESPO</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./respo/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">🌀</span>
            <div class="name">RESPO</div>
            <div class="desc">9×9‑Mesh · Live‑Daten</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./tool48/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">🛠</span>
            <div class="name">TOOL48</div>
            <div class="desc">48‑Tools · Werkzeugkasten</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./funktion/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">⚙️</span>
            <div class="name">FUNKTION</div>
            <div class="desc">Funktions‑Achse · VEC</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./etage-8-orbit-viewer/index.html">
            <span class="badge">VIEWER</span>
            <span class="icon">👁</span>
            <div class="name">ORBIT‑VIEWER</div>
            <div class="desc">8‑Etagen‑Orbit · 3D</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <!-- Weitere Ordner aus der Liste (b, h, t) -->
        <a class="modul-card" href="./b/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">📐</span>
            <div class="name">Breite (b)</div>
            <div class="desc">Breiten‑Achse · HDF</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./h/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">↗</span>
            <div class="name">Hoch (h)</div>
            <div class="desc">Hoch‑Achse · Vektor</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>

        <a class="modul-card" href="./t/index.html">
            <span class="badge">STAGE</span>
            <span class="icon">↕</span>
            <div class="name">Tiefe (t)</div>
            <div class="desc">Tiefen‑Achse · NC</div>
            <span style="font-size:9px;color:#4a6a5a;"><span class="status-dot on"></span> aktiv</span>
        </a>
    </div>

    <!-- KOMMANDOZEILE (HDF-Resolver / NC-Router) -->
    <div id="cmdLine">
        <span class="prompt">⚡ NC‑ROUTER</span>
        <input id="cmdInput" placeholder="Modul oder Befehl… z.B. BRAIN, BOERSE, DOM, EVO">
        <button id="cmdBtn">▶ NAVIGIEREN</button>
        <span id="cmdOut">🧭 Warte auf Befehl</span>
    </div>

    <footer>
        <span class="gold">✦</span> STAGE · NC‑Commander · Koordinator für alle Module
        <span class="gold">✦</span> 8 Richtungen · 9×9 RESPO · Spinnwebe
    </footer>
</div>

<script>
"use strict";

// ================================================================
//  STAGE · NC‑Commander · Dashboard · Koordinator
//  Führt zu allen index.html in den Ordnern.
//  NEU: BRAIN als Plugin-Modul in Grid + Kommandozeile + Tasten-0.
// ================================================================

// ─── 9×9 RESPO HINTERGRUND ──────────────────────────────────────
const bg = document.getElementById('respoBg');
for (let i = 0; i < 81; i++) {
    const cell = document.createElement('div');
    cell.dataset.idx = i;
    bg.appendChild(cell);
}

function animateRespoBg() {
    const now = performance.now() * 0.001;
    const cells = bg.querySelectorAll('div');
    cells.forEach((cell, i) => {
        const val = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(i * 0.2 + now * 0.3 + Math.sin(i * 0.05 + now * 0.2)));
        const alpha = 0.02 + val * 0.08;
        cell.style.background = `rgba(120, 220, 150, ${alpha})`;
    });
    requestAnimationFrame(animateRespoBg);
}
animateRespoBg();

// ─── UHR ──────────────────────────────────────────────────────────
function updateClock() {
    const now = new Date();
    document.getElementById('clockDisplay').textContent =
        now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
updateClock();
setInterval(updateClock, 1000);

// ─── KOMMANDOZEILE (NC-Router) ──────────────────────────────────
const cmdInput = document.getElementById('cmdInput');
const cmdBtn = document.getElementById('cmdBtn');
const cmdOut = document.getElementById('cmdOut');

const moduleMap = {
    'brain': './BRAIN/index.html',
    'boerse': './BOERSE/index.html',
    'börse': './BOERSE/index.html',
    'dom': './DOM/index.html',
    'eos': './EOS/index.html',
    'evo': './EVO/index.html',
    'markt': './MARKT/index.html',
    'respo': './respo/index.html',
    'tool48': './tool48/index.html',
    'tool': './tool48/index.html',
    'funktion': './funktion/index.html',
    'orbit': './etage-8-orbit-viewer/index.html',
    'viewer': './etage-8-orbit-viewer/index.html',
    'breite': './b/index.html',
    'b': './b/index.html',
    'hoch': './h/index.html',
    'h': './h/index.html',
    'tiefe': './t/index.html',
    't': './t/index.html'
};

function navigateModule(target) {
    const key = target.toLowerCase().trim();
    const path = moduleMap[key];
    if (path) {
        cmdOut.textContent = `🧭 Navigiere zu ${key.toUpperCase()} …`;
        setTimeout(() => { window.location.href = path; }, 400);
    } else {
        cmdOut.textContent = `❌ Modul "${target}" nicht gefunden. Verfügbar: BRAIN, BOERSE, DOM, EOS, EVO, MARKT, RESPO, TOOL48, FUNKTION, ORBIT, BREITE, HOCH, TIEFE`;
    }
}

cmdBtn.addEventListener('click', () => {
    const val = cmdInput.value.trim();
    if (val) navigateModule(val);
});

cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = cmdInput.value.trim();
        if (val) navigateModule(val);
    }
});

// ─── TASTATUR: 0-9 für schnelle Navigation (0 = BRAIN, neu) ─────
document.addEventListener('keydown', (e) => {
    const map = {
        '0': 'brain',
        '1': 'boerse',
        '2': 'dom',
        '3': 'eos',
        '4': 'evo',
        '5': 'markt',
        '6': 'respo',
        '7': 'tool48',
        '8': 'funktion',
        '9': 'orbit'
    };
    if (e.key in map) {
        e.preventDefault();
        const target = map[e.key];
        cmdInput.value = target;
        navigateModule(target);
    }
});

// ─── DIREKTIONS-NAVIGATION (8 Richtungen klickbar) ──────────────
document.querySelectorAll('.dir-item').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
        document.querySelectorAll('.dir-item').forEach(d => d.classList.remove('active'));
        el.classList.add('active');
        const label = el.textContent.trim().split('·')[0].trim();
        cmdOut.textContent = `🧭 Richtung: ${label} aktiviert (Spinnwebe)`;
    });
});

// ─── INIT ──────────────────────────────────────────────────────────
console.log('🌀 STAGE · NC‑Commander · Koordinator geladen');
console.log('📦 Module: BRAIN, BOERSE, DOM, EOS, EVO, MARKT, RESPO, TOOL48, FUNKTION, ORBIT, BREITE, HOCH, TIEFE');
console.log('⌨️  Tasten 0-9 für schnelle Navigation (0 = BRAIN)');
</script>
</body>
</html>
