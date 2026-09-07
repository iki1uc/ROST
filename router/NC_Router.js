
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🌀 MASTER‑BRAIN · ORIGINAL · STAND‑DER‑DINGE</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background: #05070e;
            color: #c0d0d0;
            font-family: 'Segoe UI', 'Consolas', monospace;
            overflow: hidden;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }

        #master {
            display: flex;
            flex: 1;
            height: 100vh;
            overflow: hidden;
        }

        /* ─── NAV ─── */
        #nav {
            width: 260px;
            min-width: 220px;
            background: rgba(6, 8, 16, 0.92);
            backdrop-filter: blur(12px);
            border-right: 1px solid rgba(120, 220, 150, 0.08);
            padding: 14px 12px;
            overflow-y: auto;
            z-index: 10;
            display: flex;
            flex-direction: column;
        }
        #nav .brand {
            font-size: 16px;
            font-weight: 300;
            letter-spacing: 3px;
            background: linear-gradient(135deg, #7ee0a0, #d8f0c0, #b388ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(120, 220, 150, 0.06);
            margin-bottom: 10px;
        }
        .nav-section {
            margin-bottom: 10px;
        }
        .nav-section .head {
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #4a6a5a;
            padding-bottom: 4px;
            border-bottom: 1px solid rgba(120, 220, 150, 0.04);
            margin-bottom: 6px;
        }
        .nav-item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            color: #8aa8a0;
            cursor: pointer;
            border-left: 2px solid transparent;
            transition: 0.2s;
        }
        .nav-item:hover {
            background: rgba(120, 220, 150, 0.04);
            color: #d0e8e0;
            border-left-color: #7ee0a0;
        }
        .nav-item .icon {
            font-size: 13px;
            width: 18px;
            text-align: center;
        }

        /* ─── STAGE (3D) ─── */
        #stage {
            flex: 1;
            position: relative;
            overflow: hidden;
            background: #05070e;
        }
        #stage canvas {
            display: block;
            width: 100%;
            height: 100%;
        }

        /* ─── MASTER‑RESPO OVERLAY ─── */
        #masterRespo {
            position: absolute;
            top: 14px;
            left: 18px;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(8px);
            border-radius: 12px;
            padding: 8px 16px;
            font-size: 10px;
            color: #8aa8a0;
            border: 1px solid rgba(179, 136, 255, 0.15);
            z-index: 15;
            line-height: 1.6;
            min-width: 180px;
            pointer-events: none;
        }
        #masterRespo .gold {
            color: #f0d080;
        }
        #masterRespo .val {
            color: #a0e0b0;
            font-weight: bold;
        }
        #masterRespo .title {
            color: #b388ff;
            font-weight: 600;
            letter-spacing: 1px;
            font-size: 11px;
        }

        /* ─── STATUS ─── */
        #status {
            position: absolute;
            top: 14px;
            right: 18px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            border-radius: 12px;
            padding: 8px 16px;
            font-size: 10px;
            color: #6a8a7a;
            border: 1px solid rgba(120, 220, 150, 0.06);
            pointer-events: none;
            z-index: 15;
            line-height: 1.6;
            text-align: right;
            min-width: 120px;
        }
        #status .val {
            color: #a0e0b0;
            font-weight: bold;
        }
        #status .gold {
            color: #f0d080;
        }

        /* ─── KOMMANDOZEILE ─── */
        #cmdBar {
            position: absolute;
            bottom: 16px;
            left: 18px;
            right: 18px;
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(6px);
            border-radius: 12px;
            padding: 8px 16px;
            font-size: 10.5px;
            color: #5a7a6a;
            border: 1px solid rgba(120, 220, 150, 0.05);
            display: flex;
            gap: 10px;
            align-items: center;
            flex-wrap: wrap;
            z-index: 20;
            pointer-events: auto;
        }
        #cmdBar input {
            flex: 1;
            min-width: 120px;
            background: rgba(20, 28, 20, 0.6);
            border: 1px solid rgba(120, 220, 150, 0.12);
            border-radius: 8px;
            padding: 4px 12px;
            color: #d0e8e0;
            font-family: inherit;
            font-size: 10.5px;
        }
        #cmdBar button {
            background: rgba(20, 28, 20, 0.6);
            border: 1px solid rgba(120, 220, 150, 0.15);
            border-radius: 8px;
            padding: 4px 14px;
            color: #c0d8c8;
            font-family: inherit;
            font-size: 10.5px;
            cursor: pointer;
            transition: 0.2s;
        }
        #cmdBar button:hover {
            border-color: #7ee0a0;
            color: #fff;
        }
        #cmdOut {
            color: #8cf0d0;
            font-weight: 500;
        }

        /* ─── PLUGIN‑LEISTE (rechts) ─── */
        #pluginPanel {
            width: 220px;
            min-width: 180px;
            background: rgba(6, 8, 16, 0.92);
            backdrop-filter: blur(12px);
            border-left: 1px solid rgba(120, 220, 150, 0.08);
            padding: 12px 10px;
            overflow-y: auto;
            z-index: 10;
            display: flex;
            flex-direction: column;
        }
        #pluginPanel .head {
            font-size: 11px;
            font-weight: 600;
            color: #f0d080;
            border-bottom: 1px solid rgba(255, 215, 0, 0.06);
            padding-bottom: 6px;
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #pluginPanel .head small {
            font-size: 9px;
            color: #5a7a6a;
            font-weight: 400;
        }
        .plugin-item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 3px 6px;
            border-radius: 6px;
            margin-bottom: 2px;
            background: rgba(0, 0, 0, 0.2);
            border-left: 2px solid rgba(120, 220, 150, 0.05);
            transition: 0.2s;
            cursor: pointer;
            font-size: 10px;
        }
        .plugin-item:hover {
            background: rgba(120, 220, 150, 0.04);
        }
        .plugin-item .status {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            flex-shrink: 0;
            background: #2a3a3a;
            transition: 0.3s;
        }
        .plugin-item .status.on {
            background: #8cf0d0;
            box-shadow: 0 0 8px #8cf0d0;
        }
        .plugin-item .name {
            color: #b0c8c0;
            flex: 1;
        }
        .plugin-item .toggle {
            font-size: 8px;
            background: rgba(20, 28, 20, 0.4);
            border: 1px solid rgba(120, 220, 150, 0.1);
            border-radius: 8px;
            padding: 0 6px;
            color: #8aa8a0;
            cursor: pointer;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
            #nav {
                width: 0;
                min-width: 0;
                padding: 0;
                overflow: hidden;
                border: none;
            }
            #pluginPanel {
                width: 0;
                min-width: 0;
                padding: 0;
                overflow: hidden;
                border: none;
            }
            #masterRespo {
                top: 14px;
                left: 14px;
                font-size: 9px;
                padding: 6px 12px;
                min-width: 140px;
            }
            #status {
                right: 14px;
                font-size: 9px;
                padding: 6px 12px;
            }
        }
    </style>
</head>
<body>

    <div id="master">
        <!-- NAV -->
        <div id="nav">
            <div class="brand">🌀 BRAIN</div>
            <div class="nav-section">
                <div class="head">📦 MODULE</div>
                <div class="nav-item" data-target="boerse"><span class="icon">📈</span> BOERSE</div>
                <div class="nav-item" data-target="dom"><span class="icon">🏛</span> DOM</div>
                <div class="nav-item" data-target="eos"><span class="icon">🌌</span> EOS</div>
                <div class="nav-item" data-target="evo"><span class="icon">🔮</span> EVO</div>
                <div class="nav-item" data-target="markt"><span class="icon">🏪</span> MARKT</div>
                <div class="nav-item" data-target="respo"><span class="icon">🌀</span> RESPO</div>
                <div class="nav-item" data-target="tool48"><span class="icon">🛠</span> TOOL48</div>
                <div class="nav-item" data-target="holo"><span class="icon">🔺</span> HOLO</div>
                <div class="nav-item" data-target="rawator"><span class="icon">⚙</span> RAWATOR</div>
            </div>
            <div class="nav-section" style="margin-top:auto;border-top:1px solid rgba(120,220,150,0.04);padding-top:10px;">
                <div class="nav-item" id="navReset"><span class="icon">⟲</span> RESET</div>
            </div>
        </div>

        <!-- STAGE -->
        <div id="stage">
            <canvas id="canvas"></canvas>

            <!-- MASTER-RESPO -->
            <div id="masterRespo">
                <div class="title">⚡ MASTER‑RESPO · STAND</div>
                <div>🧠 Module: <span class="val" id="mrModules">0</span></div>
                <div>🌀 Respo: <span class="val" id="mrRespo">0%</span></div>
                <div>⏱ Zeit: <span class="gold" id="mrTime">0.0s</span></div>
                <div>⚙️ Gear: <span class="gold" id="mrGear">0</span></div>
                <div>🔷 Kraft: <span class="val" id="mrKraft">0</span></div>
                <div>📐 Raum: <span class="val" id="mrSpace">0</span></div>
            </div>

            <!-- STATUS -->
            <div id="status">
                <div>🌀 MODUL <span class="val" id="stModul">ROOT</span></div>
                <div>⚡ RESPO <span class="val" id="stRespo">–</span></div>
                <div>⏱ TICK <span class="gold" id="stTick">0</span></div>
            </div>

            <!-- KOMMANDOZEILE -->
            <div id="cmdBar">
                <span style="color:#6a8a7a;">⚙️ HDF‑RESOLVE:</span>
                <input id="cmdInput" placeholder="#SLIDE / #HDFRESPO / #ID" value="#SLIDE" />
                <button id="cmdBtn">RESOLVE</button>
                <span id="cmdOut"></span>
            </div>
        </div>

        <!-- PLUGIN‑PANEL -->
        <div id="pluginPanel">
            <div class="head">🧩 PLUGINS <small id="pluginCount">0</small></div>
            <div id="pluginList"></div>
        </div>
    </div>

    <script type="importmap">
        {
            "imports": {
                "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
                "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
            }
        }
    </script>

    <script type="module">
        // ================================================================
        //  MASTER-BRAIN · ORIGINAL · STAND-DER-DINGE
        //  Vereint: Adaptive Navigation + Hologramm + Plugin-Manager +
        //  Master-Respo + 13 BRAIN-Dateien als aktive Module
        // ================================================================

        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

        // ─── DOM REFS ──────────────────────────────────────────────────
        const canvas = document.getElementById('canvas');
        const stModul = document.getElementById('stModul');
        const stRespo = document.getElementById('stRespo');
        const stTick = document.getElementById('stTick');
        const cmdOut = document.getElementById('cmdOut');

        const mrModules = document.getElementById('mrModules');
        const mrRespo = document.getElementById('mrRespo');
        const mrTime = document.getElementById('mrTime');
        const mrGear = document.getElementById('mrGear');
        const mrKraft = document.getElementById('mrKraft');
        const mrSpace = document.getElementById('mrSpace');

        // ─── THREE.JS SETUP ──────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x05070e);
        scene.fog = new THREE.Fog(0x05070e, 8, 18);

        const camera = new THREE.PerspectiveCamera(38, canvas.clientWidth / canvas.clientHeight, 0.1, 30);
        camera.position.set(5, 3.5, 7);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.target.set(0, 0.3, 0);
        controls.minDistance = 3;
        controls.maxDistance = 16;
        controls.update();

        // ─── LIGHTS ──────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0x222244, 0.6));
        const dLight = new THREE.DirectionalLight(0xffeedd, 2.2);
        dLight.position.set(6, 10, 8);
        dLight.castShadow = true;
        scene.add(dLight);
        scene.add(new THREE.DirectionalLight(0x4488ff, 0.5).position.set(-4, 2, -4));
        scene.add(new THREE.DirectionalLight(0x88ddff, 0.3).position.set(0, -2, 5));

        // ─── BODEN / GITTER ──────────────────────────────────────────
        const gridHelper = new THREE.GridHelper(5.5, 11, 0x44aa77, 0x226644);
        gridHelper.position.y = -0.65;
        scene.add(gridHelper);

        // ─── RESPO‑MESH (9×9) ──────────────────────────────────────
        const RESPO_SIZE = 9;
        const TOTAL = 81;
        const respoMeshes = [];
        const respoValues = new Float32Array(TOTAL);

        for (let r = 0; r < RESPO_SIZE; r++) {
            for (let c = 0; c < RESPO_SIZE; c++) {
                const idx = r * RESPO_SIZE + c;
                const x = (c / (RESPO_SIZE - 1) - 0.5) * 4.2;
                const z = (r / (RESPO_SIZE - 1) - 0.5) * 4.2;
                respoValues[idx] = 0.5 + 0.4 * Math.sin(idx * 0.15);
                const geo = new THREE.SphereGeometry(0.12, 8, 8);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x44aa77,
                    emissive: 0x226644,
                    emissiveIntensity: 0.3,
                    roughness: 0.2,
                    metalness: 0.6,
                });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set(x, -0.3 + respoValues[idx] * 0.5, z);
                mesh.castShadow = true;
                scene.add(mesh);
                respoMeshes.push({ mesh, idx, x, z, value: respoValues[idx], target: respoValues[idx] });
            }
        }

        // ─── DREIECK‑SCREENS (120°-Symmetrie) ──────────────────────
        const mirrorGroup = new THREE.Group();
        scene.add(mirrorGroup);

        function createMirror(color, label, angleDeg) {
            const group = new THREE.Group();
            const geo = new THREE.PlaneGeometry(1.6, 2.2);
            const mat = new THREE.MeshStandardMaterial({
                color,
                emissive: color,
                emissiveIntensity: 0.06,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.3,
                roughness: 0.1,
                metalness: 0.85,
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.castShadow = true;
            group.add(mesh);

            const edges = new THREE.EdgesGeometry(geo);
            const lineMat = new THREE.LineBasicMaterial({ color: 0x88ddbb, transparent: true, opacity: 0.25 });
            const line = new THREE.LineSegments(edges, lineMat);
            group.add(line);

            const angleRad = angleDeg * Math.PI / 180;
            group.position.set(Math.sin(angleRad) * 1.4, 0, Math.cos(angleRad) * 1.4);
            group.rotation.y = -angleRad;
            group.rotation.x = 0.05;

            // Label als Sprite
            const c = document.createElement('canvas');
            c.width = 128;
            c.height = 48;
            const ctx = c.getContext('2d');
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fillRect(0, 0, 128, 48);
            ctx.font = 'bold 18px Consolas';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#88ddbb';
            ctx.fillText(label, 64, 24);
            const tex = new THREE.CanvasTexture(c);
            const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(0.5, 0.18, 1);
            sprite.position.z = 0.01;
            group.add(sprite);

            mirrorGroup.add(group);
            return group;
        }

        const screenConfigs = [
            { color: 0x0088ff, label: 'BOERSE', angle: 0 },
            { color: 0xff44aa, label: 'DOM', angle: 120 },
            { color: 0x88ddff, label: 'EVO', angle: 240 },
        ];
        screenConfigs.forEach(cfg => createMirror(cfg.color, cfg.label, cfg.angle));

        // ─── PLUGIN‑DEFINITION (die 13 BRAIN-Dateien) ──────────────
        const PLUGIN_NAMES = [
            'NC_figur.js', 'NC_kraft.js', 'NC_space.js', 'NC_time.js',
            'OS_CORE.js', 'axiom.map.js', 'coord.js', 'dreieck.js',
            'resolver.js', 'respo.js', 'router.js', 'vec.js', 'index.html'
        ];

        const plugins = PLUGIN_NAMES.map(name => ({
            id: name,
            name: name.replace('.js', ''),
            active: false
        }));

        // ─── PLUGIN‑MANAGER UI ──────────────────────────────────────
        const pluginList = document.getElementById('pluginList');
        const pluginCount = document.getElementById('pluginCount');

        function renderPlugins() {
            pluginList.innerHTML = '';
            let activeCount = 0;
            plugins.forEach(p => {
                if (p.active) activeCount++;
                const div = document.createElement('div');
                div.className = 'plugin-item';
                div.innerHTML = `
                    <span class="status ${p.active ? 'on' : 'off'}"></span>
                    <span class="name">${p.name}</span>
                    <span class="toggle">${p.active ? '✕' : '+'}</span>
                `;
                div.querySelector('.toggle').addEventListener('click', (e) => {
                    e.stopPropagation();
                    p.active = !p.active;
                    renderPlugins();
                    updateSceneForPlugins();
                });
                pluginList.appendChild(div);
            });
            pluginCount.textContent = `${activeCount}/${plugins.length}`;
            mrModules.textContent = activeCount;
        }
        renderPlugins();

        // ─── PLUGIN‑EFFEKTE AUF DIE SZENE ──────────────────────────
        function updateSceneForPlugins() {
            const active = plugins.filter(p => p.active).length;
            const factor = 1 + (active / plugins.length) * 0.6;

            // Spiegel-Glow
            mirrorGroup.children.forEach(group => {
                const mesh = group.children[0];
                if (mesh && mesh.isMesh) {
                    mesh.material.emissiveIntensity = 0.06 + (active / plugins.length) * 0.35;
                }
            });

            // Respo-Targets
            respoMeshes.forEach(entry => {
                const base = 0.5 + 0.4 * Math.sin(entry.idx * 0.15);
                entry.target = Math.min(1, base * factor);
            });

            // Master-Respo Update
            const avg = respoMeshes.reduce((s, e) => s + e.value, 0) / TOTAL;
            mrRespo.textContent = Math.round(avg * 100) + '%';
        }

        // ─── MASTER‑RESPO LOOP ──────────────────────────────────────
        let tick = 0;
        let elapsed = 0;
        let kraftVal = 50;
        let spaceVal = 0;

        function updateMasterRespo() {
            const avg = respoMeshes.reduce((s, e) => s + e.value, 0) / TOTAL;
            mrRespo.textContent = Math.round(avg * 100) + '%';
            mrTime.textContent = (elapsed / 1000).toFixed(1) + 's';
            mrGear.textContent = tick % 12;
            mrKraft.textContent = Math.round(kraftVal);
            mrSpace.textContent = (spaceVal % 360).toFixed(0) + '°';
        }

        // ─── NAVIGATION ──────────────────────────────────────────────
        const moduleMap = {
            boerse: 'BOERSE',
            dom: 'DOM',
            eos: 'EOS',
            evo: 'EVO',
            markt: 'MARKT',
            respo: 'RESPO',
            tool48: 'TOOL48',
            holo: 'HOLO',
            rawator: 'RAWATOR'
        };

        document.querySelectorAll('.nav-item[data-target]').forEach(item => {
            item.addEventListener('click', () => {
                const target = item.dataset.target;
                stModul.textContent = moduleMap[target] || target.toUpperCase();
                cmdOut.textContent = `📂 Modul: ${moduleMap[target] || target.toUpperCase()}`;
                document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            });
        });

        document.getElementById('navReset').addEventListener('click', () => {
            plugins.forEach(p => p.active = false);
            renderPlugins();
            updateSceneForPlugins();
            stModul.textContent = 'ROOT';
            cmdOut.textContent = '⟲ Reset';
        });

        // ─── HDF‑RESOLVER ────────────────────────────────────────────
        const HDF = {
            roms: { d: 'D-Basis', e: 'E-Basis', i: 'I-Basis', n: 'N-Basis', o: 'O-Basis', r: 'R-Basis',
                s: 'S-Basis', u: 'U-Basis', w: 'W-Basis' },
            resolve(cmd) {
                const key = cmd.trim().toLowerCase().replace('#', '');
                if (this.roms[key]) return { rom: key, value: this.roms[key] };
                if (cmd === '#SLIDE') return { rom: 'SLIDE', value: 'SLIDE.hdf' };
                if (cmd === '#HDFRESPO') return { rom: 'HDFRESPO', value: 'HDFRESPO.hdf' };
                if (cmd === '#ID') return { rom: 'ID', value: 'ID.hdf' };
                return null;
            }
        };
        document.getElementById('cmdBtn').addEventListener('click', () => {
            const input = document.getElementById('cmdInput').value.trim();
            const result = HDF.resolve(input);
            if (result) {
                cmdOut.textContent = `✅ ${result.rom} → ${result.value}`;
            } else {
                cmdOut.textContent = `❌ "${input}" nicht gefunden`;
            }
        });

        // ─── ANIMATION LOOP ──────────────────────────────────────────
        function animate() {
            requestAnimationFrame(animate);
            tick++;
            elapsed += 16;
            stTick.textContent = tick;

            // Kraft & Raum simulieren
            kraftVal = 30 + 20 * Math.sin(tick * 0.02);
            spaceVal = tick * 0.3;

            // Respo-Update
            let sum = 0;
            for (const entry of respoMeshes) {
                entry.value += (entry.target - entry.value) * 0.05;
                const score = Math.max(0, 1 - Math.abs(entry.value - 0.5) * 2);
                sum += score;
                const y = -0.3 + entry.value * 0.6;
                entry.mesh.position.set(entry.x, y, entry.z);
                const r = 0.2 + 0.6 * score;
                const g = 0.5 + 0.4 * score;
                const b = 0.8 - 0.5 * score;
                entry.mesh.material.color.setRGB(r, g, b);
                entry.mesh.scale.setScalar(0.5 + score);
            }
            const avg = sum / TOTAL;
            stRespo.textContent = Math.round(avg * 100) + '%';
            mrRespo.textContent = Math.round(avg * 100) + '%';

            // Master-Respo aktualisieren
            updateMasterRespo();

            controls.update();
            renderer.render(scene, camera);
        }

        // ─── RESIZE ──────────────────────────────────────────────────
        function resize() {
            const w = canvas.parentElement.clientWidth;
            const h = canvas.parentElement.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        window.addEventListener('resize', resize);
        resize();

        // ─── INIT ──────────────────────────────────────────────────
        updateSceneForPlugins();
        cmdOut.textContent = '🌀 MASTER-BRAIN · ORIGINAL · STAND-DER-DINGE';
        animate();

        // ─── TASTATUR ──────────────────────────────────────────────
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                document.getElementById('navReset').click();
            }
            if (e.key === 's' || e.key === 'S') {
                document.getElementById('cmdBtn').click();
            }
        });

        console.log('🌀 MASTER-BRAIN · ORIGINAL · STAND-DER-DINGE geladen');
        console.log('📦 13 BRAIN-Dateien als Plugins · Master-Respo live');
    </script>

</body>
</html>
