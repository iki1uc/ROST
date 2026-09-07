<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>📂 RESPO‑VIEWER · echter GitHub‑Datei‑Explorer</title>
<style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#05070e; color:#c0d0d0; font-family:'Segoe UI','Consolas',monospace; min-height:100vh; padding:16px; }
    .container { max-width:1400px; margin:0 auto; background:rgba(10,14,22,0.7); backdrop-filter:blur(4px);
        border-radius:24px; border:1px solid rgba(120,220,150,0.08); padding:20px 24px 28px; box-shadow:0 20px 60px rgba(0,0,0,0.8); }
    header { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;
        border-bottom:1px solid rgba(120,220,150,0.06); padding-bottom:12px; margin-bottom:14px; }
    header h1 { font-size:20px; font-weight:300; letter-spacing:2px;
        background:linear-gradient(135deg,#7ee0a0,#d8f0c0,#b388ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    header .badge { font-size:11px; color:#a0d0a8; background:rgba(120,220,150,0.08); border:1px solid rgba(120,220,150,0.15);
        padding:4px 14px; border-radius:100px; }

    .repo-bar { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px; align-items:center; }
    .repo-bar input { background:rgba(20,28,20,0.5); border:1px solid rgba(120,220,150,0.1); border-radius:8px;
        padding:6px 12px; color:#d0e8e0; font-family:inherit; font-size:11.5px; }
    .repo-bar input#ownerInput { width:110px; }
    .repo-bar input#repoInput { width:140px; }
    .repo-bar button { background:rgba(20,28,20,0.5); border:1px solid rgba(120,220,150,0.15); border-radius:8px;
        padding:6px 16px; color:#c0d8c8; font-family:inherit; font-size:11.5px; cursor:pointer; }
    .repo-bar button:hover { border-color:#7ee0a0; color:#fff; }

    .breadcrumb { font-size:11px; color:#5a7a6a; background:rgba(0,0,0,0.3); padding:5px 14px; border-radius:20px;
        border:1px solid rgba(120,220,150,0.06); margin-bottom:12px; display:inline-flex; gap:4px; flex-wrap:wrap; }
    .breadcrumb span { cursor:pointer; }
    .breadcrumb span:hover { color:#7ee0a0; }
    .breadcrumb .sep { color:#3a4a4a; cursor:default; }

    .main-layout { display:grid; grid-template-columns:1fr 1fr; gap:20px; min-height:60vh; }
    @media (max-width:900px) { .main-layout { grid-template-columns:1fr; } }

    .panel { background:rgba(0,0,0,0.2); border-radius:16px; border:1px solid rgba(120,220,150,0.04);
        padding:14px 16px; overflow:hidden; display:flex; flex-direction:column; }
    .panel h2 { font-size:12px; color:#f0d080; letter-spacing:1.5px; border-bottom:1px solid rgba(255,215,0,0.04);
        padding-bottom:6px; margin-bottom:10px; display:flex; justify-content:space-between; }
    .panel h2 .count { font-size:10px; color:#5a7a6a; font-weight:400; }

    .file-list { overflow-y:auto; flex:1; max-height:500px; padding-right:4px; }
    .file-item { display:flex; align-items:center; gap:8px; padding:5px 8px; border-radius:6px; cursor:pointer;
        font-size:12px; color:#8aa8a0; border-left:2px solid transparent; }
    .file-item:hover { background:rgba(120,220,150,0.04); color:#d0e8e0; border-left-color:#7ee0a0; }
    .file-item.active { background:rgba(120,220,150,0.06); border-left-color:#f0d080; color:#f0d080; }
    .file-item .icon { font-size:15px; width:22px; text-align:center; }
    .file-item .name { flex:1; word-break:break-word; }
    .file-item .size { font-size:9px; color:#4a5a5a; }
    .folder-item { color:#b388ff; font-weight:500; }
    .folder-item .icon { color:#b388ff; }

    .content-view { background:rgba(0,0,0,0.3); border-radius:10px; padding:10px 12px; font-size:11px;
        font-family:'Consolas',monospace; color:#8ab0c0; white-space:pre-wrap; word-break:break-all;
        overflow-y:auto; flex:1; max-height:500px; border:1px solid rgba(120,220,150,0.04); line-height:1.5; }
    .content-view .empty, .content-view .error { color:#4a5a5a; font-style:italic; }
    .content-view .error { color:#ff8a8a; }

    .search-bar { display:flex; gap:8px; margin-bottom:10px; }
    .search-bar input { flex:1; background:rgba(20,28,20,0.4); border:1px solid rgba(120,220,150,0.08); border-radius:8px;
        padding:4px 12px; color:#d0e8e0; font-family:inherit; font-size:11px; }
    .search-bar button { background:rgba(20,28,20,0.4); border:1px solid rgba(120,220,150,0.12); border-radius:8px;
        padding:4px 14px; color:#c0d8c8; font-family:inherit; font-size:11px; cursor:pointer; }

    footer { margin-top:16px; padding:8px 12px; font-size:9px; color:#3a4a4a; text-align:center;
        border-top:1px solid rgba(120,220,150,0.02); }

    .badge-type { font-size:7px; background:rgba(120,220,150,0.06); padding:1px 8px; border-radius:10px; color:#4a7a6a; }
    .badge-type.js { color:#f0d080; }
    .badge-type.html { color:#8cf0d0; }
    .badge-type.md { color:#6a8a7a; }
    .status-line { font-size:10.5px; color:#6a8a7a; margin-bottom:8px; }
    .status-line.err { color:#ff8a8a; }
</style>
</head>
<body>

<div class="container">
    <header>
        <h1>📂 RESPO‑VIEWER · echter GitHub‑Explorer</h1>
        <span class="badge" id="rateBadge">● live via GitHub API</span>
    </header>

    <div class="repo-bar">
        <span style="font-size:11px;color:#5a7a6a;">Repo:</span>
        <input id="ownerInput" value="iki1uc" placeholder="Owner">
        <input id="repoInput" value="MAINBOARD" placeholder="Repo">
        <button id="loadBtn">⬇ Repo laden</button>
        <span class="status-line" id="statusLine"></span>
    </div>

    <div class="breadcrumb" id="breadcrumb"></div>

    <div class="main-layout">
        <div class="panel">
            <h2>📁 INHALT <span class="count" id="fileCount">0</span></h2>
            <div class="search-bar">
                <input id="searchInput" placeholder="🔎 Datei/Ordner filtern…">
                <button id="searchBtn">🔍</button>
            </div>
            <div class="file-list" id="fileList"></div>
        </div>

        <div class="panel">
            <h2>📄 VORSCHAU <span class="count" id="previewName">—</span></h2>
            <div class="content-view" id="contentView"><span class="empty">📂 Klicke eine Datei an, um ihren echten Inhalt zu laden.</span></div>
        </div>
    </div>

    <footer>⚡ RESPO‑VIEWER · liest echt über die GitHub REST API (contents-Endpoint) · kein simulierter Zustand</footer>
</div>

<script>
"use strict";
// ================================================================
//  RESPO-VIEWER — echter Datei-Explorer über die GitHub REST API.
//  Kein hardcodiertes FILE_SYSTEM mehr: jede Liste und jeder
//  Dateiinhalt kommt live von api.github.com. Für öffentliche
//  Repos ohne Login nutzbar (CORS-frei, ~60 Requests/Stunde Limit).
// ================================================================

let owner = 'iki1uc';
let repo = 'MAINBOARD';
let currentPath = ''; // '' = Repo-Root
let currentItems = [];
let searchTerm = '';

function setStatus(msg, isError = false) {
    const el = document.getElementById('statusLine');
    el.textContent = msg;
    el.className = 'status-line' + (isError ? ' err' : '');
}

function updateBreadcrumb() {
    const bc = document.getElementById('breadcrumb');
    const parts = currentPath ? currentPath.split('/') : [];
    let html = `<span data-path="">${repo}</span>`;
    let acc = '';
    parts.forEach(p => {
        acc = acc ? acc + '/' + p : p;
        html += `<span class="sep">/</span><span data-path="${acc}">${p}</span>`;
    });
    bc.innerHTML = html;
    bc.querySelectorAll('span[data-path]').forEach(el => {
        el.addEventListener('click', () => loadPath(el.dataset.path));
    });
}

async function loadPath(path) {
    currentPath = path;
    updateBreadcrumb();
    setStatus('⏳ lade …');
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g,'/')}`;
    try {
        const res = await fetch(url);
        if (res.status === 403) { setStatus('❌ GitHub-API-Limit erreicht (60/Std ohne Login) — kurz warten', true); return; }
        if (!res.ok) { setStatus(`❌ ${res.status}: Pfad nicht gefunden`, true); return; }
        const data = await res.json();
        currentItems = Array.isArray(data) ? data : [data];
        // Ordner zuerst, dann Dateien, jeweils alphabetisch
        currentItems.sort((a, b) => {
            if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
            return a.name.localeCompare(b.name);
        });
        setStatus(`✅ ${currentItems.length} Einträge geladen`);
        renderFileList();
        renderContent(null, null);
    } catch (err) {
        setStatus(`❌ Netzwerkfehler: ${err.message}`, true);
    }
}

function getBadge(name) {
    const ext = name.split('.').pop().toLowerCase();
    const map = { js: 'JS', html: 'HTML', md: 'MD', json: 'JSON' };
    const label = map[ext] || ext.toUpperCase();
    return `<span class="badge-type ${ext}">${label}</span>`;
}

function humanSize(bytes) {
    if (bytes === undefined || bytes === null) return '';
    if (bytes < 1024) return bytes + ' B';
    return (bytes / 1024).toFixed(1) + ' KB';
}

function renderFileList() {
    const list = document.getElementById('fileList');
    const items = currentItems.filter(i => !searchTerm || i.name.toLowerCase().includes(searchTerm.toLowerCase()));
    list.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'file-item' + (item.type === 'dir' ? ' folder-item' : '');
        const icon = item.type === 'dir' ? '📁' : '📄';
        div.innerHTML = `<span class="icon">${icon}</span><span class="name">${item.name}</span>
            ${item.type === 'file' ? `<span class="size">${humanSize(item.size)}</span>${getBadge(item.name)}` : ''}`;
        if (item.type === 'dir') {
            div.addEventListener('click', () => loadPath(item.path));
        } else {
            div.addEventListener('click', () => {
                document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
                div.classList.add('active');
                renderContent(item.name, item.download_url);
            });
        }
        list.appendChild(div);
    });
    document.getElementById('fileCount').textContent = items.length;
}

async function renderContent(fileName, downloadUrl) {
    const view = document.getElementById('contentView');
    const previewName = document.getElementById('previewName');
    if (!fileName) {
        previewName.textContent = '—';
        view.innerHTML = `<span class="empty">📂 Klicke eine Datei an, um ihren echten Inhalt zu laden.</span>`;
        return;
    }
    previewName.textContent = fileName;
    view.innerHTML = `<span class="empty">⏳ lade echten Inhalt …</span>`;
    try {
        const res = await fetch(downloadUrl);
        if (!res.ok) { view.innerHTML = `<span class="error">❌ Konnte ${fileName} nicht laden (${res.status})</span>`; return; }
        const text = await res.text();
        view.textContent = text; // textContent = kein HTML-Escaping nötig, zeigt Rohtext sicher an
    } catch (err) {
        view.innerHTML = `<span class="error">❌ Netzwerkfehler beim Laden von ${fileName}</span>`;
    }
}

// ─── EVENTS ──────────────────────────────────────────────────────
document.getElementById('loadBtn').addEventListener('click', () => {
    owner = document.getElementById('ownerInput').value.trim() || 'iki1uc';
    repo = document.getElementById('repoInput').value.trim() || 'MAINBOARD';
    loadPath('');
});
document.getElementById('searchBtn').addEventListener('click', () => {
    searchTerm = document.getElementById('searchInput').value.trim();
    renderFileList();
});
document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { searchTerm = e.target.value.trim(); renderFileList(); }
});

// ─── INIT: sofort das echte Repo laden ─────────────────────────
loadPath('');
</script>
</body>
</html>
