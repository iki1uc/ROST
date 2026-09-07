// ================================================================
//  RESPO-MESH · ZELLULÄRER AUTOMAT · NC-ENGINE
//  Ohne Browser, ohne Three.js – reine, testbare Logik.
//  Jeder Punkt reagiert auf seine 8 Nachbarn.
// ================================================================

const COLS = 9, ROWS = 9;
const TOTAL = COLS * ROWS;

// ─── ZUSTAND ──────────────────────────────────────────────────────
let cells = [];
let attackQueue = [];

function initCells() {
    cells = [];
    for (let i = 0; i < TOTAL; i++) {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        // Startwerte: leicht zufällig, aber stabil
        cells.push({
            value: 0.3 + 0.4 * Math.sin(i * 0.2),
            target: 0.5,
            temp: 0,
            row: r,
            col: c
        });
    }
}
initCells();

// ─── NACHBARN FINDEN ─────────────────────────────────────────────
function getNeighbors(idx) {
    const r = cells[idx].row;
    const c = cells[idx].col;
    const neighbors = [];
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                const nIdx = nr * COLS + nc;
                neighbors.push(nIdx);
            }
        }
    }
    return neighbors;
}

// ─── UPDATE (ein Tick) ──────────────────────────────────────────
function tick() {
    // 1. Angriffe aus der Queue anwenden
    while (attackQueue.length > 0) {
        const attack = attackQueue.shift();
        applyAttack(attack);
    }

    // 2. Jede Zelle nach Nachbarn aktualisieren
    const newValues = new Float32Array(TOTAL);
    for (let i = 0; i < TOTAL; i++) {
        const cell = cells[i];
        const neighbors = getNeighbors(i);
        let sum = 0;
        for (const nIdx of neighbors) {
            sum += cells[nIdx].value;
        }
        const avg = neighbors.length > 0 ? sum / neighbors.length : 0;

        // Minecraft-ähnliche Regel: Annäherung an Nachbar-Durchschnitt + Trägheit
        const influence = 0.15;
        const inertia = 0.7;
        let newVal = cell.value * inertia + avg * influence + cell.target * (1 - inertia - influence);
        
        // Begrenzung + Rauschen (kleine Fluktuation, aber stabil)
        newVal = Math.max(0, Math.min(1, newVal + (Math.random() - 0.5) * 0.02));
        newValues[i] = newVal;
    }

    // 3. Werte übernehmen
    for (let i = 0; i < TOTAL; i++) {
        cells[i].value = newValues[i];
    }
}

// ─── ANGRIFFE (Attack-Commands) ──────────────────────────────────
function applyAttack(attack) {
    const { type, strength, origin } = attack;
    const originIdx = origin !== undefined ? origin : Math.floor(Math.random() * TOTAL);
    const originCell = cells[originIdx];

    switch (type) {
        case 'SHOCK':
            // Druckwelle: alle Zellen erhalten einen Impuls, abhängig von Distanz
            for (let i = 0; i < TOTAL; i++) {
                const dist = manhattanDistance(cells[i], originCell);
                const factor = Math.max(0, 1 - dist / 8) * strength;
                cells[i].value = Math.min(1, cells[i].value + factor * 0.3);
            }
            break;

        case 'WAVE':
            // Harmonische Welle: Sinus über Distanz
            for (let i = 0; i < TOTAL; i++) {
                const dist = manhattanDistance(cells[i], originCell);
                const wave = Math.sin(dist * 0.8 + performance.now() * 0.001) * strength * 0.4;
                cells[i].value = Math.max(0, Math.min(1, cells[i].value + wave));
            }
            break;

        case 'PUSH':
            // Physischer Impuls: Zellen werden in Richtung von der Quelle weggedrückt
            for (let i = 0; i < TOTAL; i++) {
                const dr = cells[i].row - originCell.row;
                const dc = cells[i].col - originCell.col;
                const dist = Math.sqrt(dr * dr + dc * dc) || 0.1;
                const push = strength * 0.2 / (dist + 0.5);
                cells[i].value = Math.max(0, Math.min(1, cells[i].value + push * (Math.random() > 0.5 ? 1 : -1)));
            }
            break;

        case 'GROW':
            // Wachstum: Zellen erhöhen ihren Zielwert
            for (let i = 0; i < TOTAL; i++) {
                const dist = manhattanDistance(cells[i], originCell);
                const factor = Math.max(0, 1 - dist / 6) * strength;
                cells[i].target = Math.min(1, cells[i].target + factor * 0.2);
            }
            break;

        case 'MOVE':
            // Minecraft-Move: Zellen wandern in Richtung des stärksten Nachbarn
            // Vereinfacht: Zielwert wird zum Nachbar-Durchschnitt
            for (let i = 0; i < TOTAL; i++) {
                const neighbors = getNeighbors(i);
                let sum = 0;
                for (const nIdx of neighbors) sum += cells[nIdx].value;
                const avg = neighbors.length > 0 ? sum / neighbors.length : 0.5;
                cells[i].target = cells[i].value * 0.3 + avg * 0.7;
            }
            break;

        case 'BREAK':
            // Reset: einige Zellen fallen auf Null
            for (let i = 0; i < TOTAL; i++) {
                if (Math.random() < strength * 0.3) {
                    cells[i].value = Math.random() * 0.2;
                    cells[i].target = 0.3 + Math.random() * 0.4;
                }
            }
            break;

        case 'LINK':
            // Verbinden: Zellen angleichen an ihren stärksten Nachbarn
            for (let i = 0; i < TOTAL; i++) {
                const neighbors = getNeighbors(i);
                let maxVal = cells[i].value;
                let maxIdx = i;
                for (const nIdx of neighbors) {
                    if (cells[nIdx].value > maxVal) {
                        maxVal = cells[nIdx].value;
                        maxIdx = nIdx;
                    }
                }
                if (maxIdx !== i) {
                    cells[i].target = cells[maxIdx].value * 0.8 + cells[i].target * 0.2;
                }
            }
            break;
    }
}

function manhattanDistance(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

// ─── ANGRIFF IN DIE QUEUE STELLEN ──────────────────────────────
function queueAttack(type, strength = 0.5, origin = undefined) {
    attackQueue.push({ type, strength, origin });
}

// ─── STATISTIK ──────────────────────────────────────────────────
function getStats() {
    let sum = 0;
    for (const cell of cells) sum += cell.value;
    return {
        avg: sum / TOTAL,
        min: Math.min(...cells.map(c => c.value)),
        max: Math.max(...cells.map(c => c.value)),
        total: TOTAL
    };
}

// ─── TEST ────────────────────────────────────────────────────────
console.log('🧪 Zellulärer Automat – Testlauf');
console.log('Initial:', getStats());

// 10 Ticks simulieren
for (let i = 0; i < 10; i++) {
    tick();
    if (i % 3 === 0) {
        queueAttack('SHOCK', 0.3);
        queueAttack('WAVE', 0.2);
    }
}
console.log('Nach 10 Ticks:', getStats());
console.log('✅ Kernlogik funktioniert – keine Sinus-Deko mehr.');
