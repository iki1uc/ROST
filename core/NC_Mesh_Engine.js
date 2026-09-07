<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🌀 HOLOGRAMM‑BEWEIS · ORIGINAL · 120° · MOVE · ATTACK</title>
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
        }
        #stage {
            width: 100vw;
            height: 100vh;
            position: relative;
        }
        canvas {
            display: block;
            width: 100%;
            height: 100%;
        }

        #ui {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(6, 8, 16, 0.8);
            backdrop-filter: blur(8px);
            border-radius: 20px;
            border: 1px solid rgba(120, 220, 150, 0.15);
            padding: 10px 18px;
            display: flex;
            flex-wrap: wrap;
            gap: 6px 12px;
            align-items: center;
            justify-content: center;
            z-index: 10;
            max-width: 95vw;
            pointer-events: auto;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }
        #ui button {
            background: rgba(20, 28, 20, 0.5);
            border: 1px solid rgba(120, 220, 150, 0.2);
            border-radius: 10px;
            padding: 5px 14px;
            color: #c0d8c8;
            font-family: inherit;
            font-size: 11px;
            cursor: pointer;
            transition: 0.2s;
        }
        #ui button:hover {
            border-color: #7ee0a0;
            background: rgba(80, 180, 110, 0.15);
            color: #fff;
        }
        #ui button.active {
            border-color: #f0d080;
            color: #f0d080;
        }
        #ui button.lock {
            border-color: #ff6b6b;
            color: #ff6b6b;
        }
        #ui .sep {
            width: 1px;
            height: 24px;
            background: rgba(120, 220, 150, 0.1);
        }

        #status {
            position: absolute;
            top: 16px;
            right: 20px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            border-radius: 12px;
            padding: 8px 16px;
            font-size: 10px;
            color: #6a8a7a;
            border: 1px solid rgba(120, 220, 150, 0.06);
            pointer-events: none;
            z-index: 10;
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
        #status .purple {
            color: #b388ff;
        }

        #masterRespo {
            position: absolute;
            top: 16px;
            left: 20px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            border-radius: 12px;
            padding: 8px 16px;
            font-size: 10px;
            color: #8aa8a0;
            border: 1px solid rgba(179, 136, 255, 0.12);
            pointer-events: none;
            z-index: 10;
            line-height: 1.6;
            min-width: 150px;
        }
        #masterRespo .title {
            color: #b388ff;
            font-weight: 600;
            letter-spacing: 1px;
            font-size: 11px;
        }

        #log {
            position: absolute;
            bottom: 90px;
            left: 20px;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            border-radius: 10px;
            padding: 6px 12px;
            font-size: 9px;
            color: #5a7a6a;
            max-height: 80px;
            overflow-y: auto;
            border: 1px solid rgba(120, 220, 150, 0.06);
            pointer-events: none;
            z-index: 10;
            width: 240px;
            line-height: 1.4;
        }
        #log .entry {
            border-bottom: 1px solid rgba(100, 180, 150, 0.03);
            padding: 1px 0;
        }
        #log .time {
            color: #2a3a3a;
        }
        #log .msg {
            color: #8aa8a0;
        }
    </style>
</head>
<body>

    <div id="stage">
        <canvas id="canvas"></canvas>

        <div id="masterRespo">
            <div class="title">⚡ MASTER‑RESPO</div>
            <div>Respo: <span class="val" id="mrRespo">0%</span></div>
            <div>Gear: <span class="gold" id="mrGear">0</span></div>
            <div>Zeit: <span class="gold" id="mrTime">0.0s</span></div>
            <div>Kraft: <span class="val" id="mrKraft">0</span></div>
        </div>

        <div id="status">
            <div>🌀 MODUL <span class="val" id="stModul">ATTACK</span></div>
            <div>⚡ RESPO <span class="val" id="stRespo">0%</span></div>
            <div>⏱ TICK <span class="gold" id="stTick">0</span></div>
            <div>🔒 <span class="purple" id="stLock">frei</span></div>
        </div>

        <div id="log"></div>

        <div id="ui">
            <button id="btnPose1">🔺 Offen</button>
            <button id="btnPose2" class="active">💎 Diamant</button>
            <button id="btnPose3">⚡ Kill‑Bill</button>
            <button id="btnPose4">🌀 360°</button>
            <span class="sep"></span>
            <button id="btnHold">✋ HALTEN</button>
            <button id="btnMove">🔄 BEWEGEN</button>
            <button class="lock" id="btnFix">🔒 FIXIEREN</button>
            <span class="sep"></span>
            <button id="btnAttack">🔥 ATTACK</button>
            <button id="btnReset">⟲ RESET</button>
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
        //  HOLOGRAMM‑BEWEIS · ORIGINAL · 120° · MOVE · ATTACK
        //  Atomar verhaltensorientiert – 120°-Screens, Respo-9×9, Orbit,
        //  Halten/Bewegen/Fixieren, Kill-Bill-Move & Attack-Posen.
        //  Korrigierte Geometrie: keine "verkehrten" Screens mehr.
        // ================================================================

        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

        // ─── LOG ──────────────────────────────────────────────────────────
        const logBox = document.getElementById('log');
        function log(msg) {
            const t = new Date().toLocaleTimeString();
            const e = document.createElement('div');
            e.className = 'entry';
            e.innerHTML = `<span class="time">[${t}]</span> <span class="msg">${msg}</span>`;
            logBox.appendChild(e);
            logBox.scrollTop = logBox.scrollHeight;
            if (logBox.children.length > 30) logBox.removeChild(logBox.firstChild);
        }

        // ─── THREE.JS SETUP ─────────────────────────────────────────────
        const canvas = document.getElementById('canvas');
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

        // ─── LIGHTS ──────────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0x222244, 0.6));
        const dLight = new THREE.DirectionalLight(0xffeedd, 2.2);
        dLight.position.set(6, 10, 8);
        dLight.castShadow = true;
        scene.add(dLight);
        scene.add(new THREE.DirectionalLight(0x4488ff, 0.5).position.set(-4, 2, -4));
        scene.add(new THREE.DirectionalLight(0x88ddff, 0.3).position.set(0, -2, 5));

        // ─── BODEN / GITTER ─────────────────────────────────────────────
        const gridHelper = new THREE.GridHelper(5.5, 11, 0x44aa77, 0x226644);
        gridHelper.position.y = -0.65;
        scene.add(gridHelper);

        // ─── RESPO‑MESH (9×9) ──────────────────────────────────────────
        const RESPO_SIZE = 9;
        const TOTAL = 81;
        const respoPositions = new Float32Array(TOTAL * 3);
        const respoValues = new Float32Array(TOTAL);
        const respoMeshes = [];

        for (let r = 0; r < RESPO_SIZE; r++) {
            for (let c = 0; c < RESPO_SIZE; c++) {
                const idx = r * RESPO_SIZE + c;
                const x = (c / (RESPO_SIZE - 1) - 0.5) * 4.2;
                const z = (r / (RESPO_SIZE - 1) - 0.5) * 4.2;
                respoPositions[idx * 3] = x;
                respoPositions[idx * 3 + 1] = -0.3;
                respoPositions[idx * 3 + 2] = z;
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

        // ─── DREIECK‑SCREENS (120°-Symmetrie, korrigiert) ──────────────
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
            mesh.receiveShadow = true;
            group.add(mesh);

            const edges = new THREE.EdgesGeometry(geo);
            const lineMat = new THREE.LineBasicMaterial({ color: 0x88ddbb, transparent: true, opacity: 0.25 });
            const line = new THREE.LineSegments(edges, lineMat);
            group.add(line);

            // KORREKT: rotateY(angle) dann translateZ(radius) – das ist die richtige Reihenfolge für 120°-Symmetrie
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
            return { group, mesh };
        }

        const screens = [
            createMirror(0x0088ff, 'BOERSE', 0),
            createMirror(0xff44aa, 'DOM', 120),
            createMirror(0x88ddff, 'EVO', 240)
        ];

        // ─── POSEN (Szenarien) ──────────────────────────────────────────
        const POSES = {
            offen: {
                left: { rotY: 30, rotX: 2, posZ: 40 },
                right: { rotY: -30, rotX: 2, posZ: 40 },
                front: { rotY: 0, rotX: 8, posZ: 100 }
            },
            diamant: {
                left: { rotY: 12, rotX: 2, posZ: 80 },
                right: { rotY: -12, rotX: 2, posZ: 80 },
                front: { rotY: 0, rotX: 13, posZ: 140 }
            },
            killbill: {
                left: { rotY: 40, rotX: -10, posZ: 10 },
                right: { rotY: -40, rotX: -10, posZ: 10 },
                front: { rotY: 0, rotX: 4, posZ: 170 }
            },
            '360': {
                left: { rotY: 20, rotX: 0, posZ: 120 },
                right: { rotY: -20, rotX: 0, posZ: 120 },
                front: { rotY: 0, rotX: 5, posZ: 200 }
            }
        };

        let currentPose = 'diamant';
        let locked = false;

        function applyPose(poseName) {
            if (locked) { log('🔒 Fixiert – erst BEWEGEN klicken'); return; }
            const p = POSES[poseName];
            if (!p) return;
            const groups = mirrorGroup.children;
            // left: index 0, right: index 1, front: index 2
            if (groups[0]) {
                groups[0].position.z = p.left.posZ / 100;
                groups[0].rotation.y = p.left.rotY * Math.PI / 180;
                groups[0].rotation.x = p.left.rotX * Math.PI / 180;
            }
            if (groups[1]) {
                groups[1].position.z = p.right.posZ / 100;
                groups[1].rotation.y = p.right.rotY * Math.PI / 180;
                groups[1].rotation.x = p.right.rotX * Math.PI / 180;
            }
            if (groups[2]) {
                groups[2].position.z = p.front.posZ / 100;
                groups[2].rotation.y = p.front.rotY * Math.PI / 180;
                groups[2].rotation.x = p.front.rotX * Math.PI / 180;
            }
            currentPose = poseName;
            document.getElementById('stModul').textContent = poseName.toUpperCase();
            log(`🌀 Pose: ${poseName}`);
        }

        // ─── ATTACK / MOVE ──────────────────────────────────────────────
        let attackActive = false;
        let attackTime = 0;

        function triggerAttack() {
            if (locked) { log('🔒 Fixiert – Attack blockiert'); return; }
            attackActive = true;
            attackTime = 0;
            log('🔥 ATTACK aktiviert!');
            // Respo-Werte auf Schock setzen
            for (const entry of respoMeshes) {
                entry.target = 0.1 + 0.8 * Math.random();
            }
            // Pose kurz extrem verändern (Kill-Bill + Extra)
            applyPose('killbill');
            setTimeout(() => {
                if (currentPose !== 'killbill') applyPose(currentPose);
                else applyPose('diamant');
            }, 600);
        }

        // ─── UI BUTTONS ──────────────────────────────────────────────────
        document.getElementById('btnPose1').addEventListener('click', () => applyPose('offen'));
        document.getElementById('btnPose2').addEventListener('click', () => applyPose('diamant'));
        document.getElementById('btnPose3').addEventListener('click', () => applyPose('killbill'));
        document.getElementById('btnPose4').addEventListener('click', () => applyPose('360'));

        document.getElementById('btnHold').addEventListener('click', () => log('✋ HALTEN → aktuelle Pose fixiert'));
        document.getElementById('btnMove').addEventListener('click', () => {
            locked = false;
            document.getElementById('stLock').textContent = 'frei';
            log('🔄 BEWEGEN → frei');
        });
        document.getElementById('btnFix').addEventListener('click', () => {
            locked = true;
            document.getElementById('stLock').textContent = 'fixiert';
            log('🔒 FIXIEREN → gesperrt');
        });

        document.getElementById('btnAttack').addEventListener('click', triggerAttack);
        document.getElementById('btnReset').addEventListener('click', () => {
            locked = false;
            document.getElementById('stLock').textContent = 'frei';
            applyPose('diamant');
            for (const entry of respoMeshes) {
                entry.target = 0.5 + 0.4 * Math.sin(entry.idx * 0.15);
                entry.value = entry.target;
            }
            attackActive = false;
            log('⟲ RESET');
        });

        // ─── STATUS UI ──────────────────────────────────────────────────
        const stRespo = document.getElementById('stRespo');
        const stTick = document.getElementById('stTick');
        const mrRespo = document.getElementById('mrRespo');
        const mrGear = document.getElementById('mrGear');
        const mrTime = document.getElementById('mrTime');
        const mrKraft = document.getElementById('mrKraft');
        let tick = 0;
        let elapsed = 0;

        // ─── UPDATE LOOP ──────────────────────────────────────────────────
        function updateRespo() {
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
        }

        function animate() {
            requestAnimationFrame(animate);
            tick++;
            elapsed += 16;
            stTick.textContent = tick;
            mrGear.textContent = tick % 12;
            mrTime.textContent = (elapsed / 1000).toFixed(1) + 's';
            mrKraft.textContent = Math.round(30 + 20 * Math.sin(tick * 0.02));

            if (attackActive) {
                attackTime++;
                if (attackTime < 30) {
                    for (const entry of respoMeshes) {
                        entry.target += (0.2 * Math.sin(attackTime * 0.2 + entry.idx) - entry.target) * 0.05;
                    }
                } else {
                    attackActive = false;
                    for (const entry of respoMeshes) {
                        entry.target = 0.5 + 0.4 * Math.sin(entry.idx * 0.15 + tick * 0.01);
                    }
                    log('⚡ Attack abgeklungen');
                }
            }

            updateRespo();
            controls.update();
            renderer.render(scene, camera);
        }

        // ─── RESIZE ──────────────────────────────────────────────────────
        function resize() {
            const w = canvas.parentElement.clientWidth;
            const h = canvas.parentElement.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        window.addEventListener('resize', resize);
        resize();

        // ─── INIT ────────────────────────────────────────────────────────
        applyPose('diamant');
        log('🌀 HOLOGRAMM‑BEWEIS · ORIGINAL geladen');
        log('🖱️ Maus ziehen = Orbit · Buttons steuern Pose & Attack');
        log('⌨️  a=Attack  1-4=Posen  r=Reset');
        animate();

        // ─── TASTATUR ────────────────────────────────────────────────────
        document.addEventListener('keydown', (e) => {
            if (e.key === 'a' || e.key === 'A') triggerAttack();
            if (e.key === '1') applyPose('offen');
            if (e.key === '2') applyPose('diamant');
            if (e.key === '3') applyPose('killbill');
            if (e.key === '4') applyPose('360');
            if (e.key === 'r' || e.key === 'R') document.getElementById('btnReset').click();
            if (e.key === 'f' || e.key === 'F') document.getElementById('btnFix').click();
            if (e.key === 'm' || e.key === 'M') document.getElementById('btnMove').click();
        });
    </script>

</body>
</html>
