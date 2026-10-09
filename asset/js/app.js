(function () {
'use strict';

// ── CONSTANTS ────────────────────────────────────────────────────────────────
// JSON schema: [name, arabic, meaning, gender, source, syllables, themes]
const IDX = { NAME:0, ARABIC:1, MEANING:2, GENDER:3, SOURCE:4, SYLLABLES:5, THEMES:6 };

const SOURCE_LABEL = {
    quran:   '📖 Al-Quran',
    nabi:    '🌟 Para Nabi',
    sahabat: '⭐ Sahabat',
    hadith:  '📜 Hadith',
    umum:    '✨ Umum'
};

const SOURCE_TAG = {
    quran:   'nbx-tag-quran',
    nabi:    'nbx-tag-nabi',
    sahabat: 'nbx-tag-sahabat',
    hadith:  'nbx-tag-hadith',
    umum:    'nbx-tag-umum'
};

const THEME_LABEL = {
    cahaya:     'Cahaya',
    kekuatan:   'Kekuatan',
    keberkatan: 'Keberkatan',
    ilmu:       'Ilmu',
    kemuliaan:  'Kemuliaan',
    keindahan:  'Keindahan'
};

const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const GENDER_ICON = { L:'👦', P:'👧', U:'✨' };

// ── STATE ────────────────────────────────────────────────────────────────────
const S = {
    all:      [],
    filtered: [],
    gender:   'L',
    search:   '',
    huruf:    '',
    source:   '',
    syllables:'',
    theme:    '',
    page:     1,
    perPage:  20,
    saved:    [],
    combined: null,
    timer:    null
};

// ── LOAD DATA ────────────────────────────────────────────────────────────────
async function nbxInit() {
    try {
        const res = await fetch('/asset/data/names-full.json');
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();

        S.all = json.names;
        try { const raw=JSON.parse(localStorage.getItem('ilmu-name-shortlist')||'[]'); S.saved=Array.isArray(raw)?[...new Set(raw)].filter(name=>S.all.some(n=>n[0]===name)).slice(0,10):[]; } catch {}
        document.getElementById('statSaved').textContent=S.saved.length;
        nbxUpdateShortlist();

        const total = (json.meta && json.meta.total) || S.all.length;
        document.getElementById('statTotal').textContent = S.all.length.toLocaleString('en-US');

        nbxPopulateHuruf();
        nbxPrepareCombiner();
        nbxFilter();

        document.getElementById('nbxLoading').style.display  = 'none';
        document.getElementById('nbxGridWrap').style.display = '';
    } catch (err) {
        document.getElementById('nbxLoading').style.display='block';
        document.getElementById('nbxLoading').innerHTML =
            '<div style="color:#e53935;padding:20px">⚠️ Gagal memuatkan data.<br>Sila muat semula halaman.</div>';
    }
}

// ── POPULATE DROPDOWNS ───────────────────────────────────────────────────────
function nbxPopulateHuruf() {
    const sel = document.getElementById('nbxHuruf');
    const letters = [...new Set(S.all.map(n => n[IDX.NAME][0].toUpperCase()))].sort();
    letters.forEach(l => {
        const opt = document.createElement('option');
        opt.value = l;
        opt.textContent = 'Huruf ' + l;
        sel.appendChild(opt);
    });
}

function nbxPrepareCombiner() {
    ['nbxCombine1','nbxCombine2'].forEach((id,i) => {
        const sel=document.getElementById(id);
        sel.innerHTML='<option value="">'+(i===0?'— Nama Pertama —':'— Nama Kedua —')+'</option>';
    });
    S.combined=null;
    document.getElementById('nbxCombineResult').classList.remove('show');
    const ready=()=>{nbxPopulateCombiner(); ['nbxCombine1','nbxCombine2'].forEach(id=>document.getElementById(id).removeEventListener('focus',ready));};
    ['nbxCombine1','nbxCombine2'].forEach(id=>{ const el=document.getElementById(id); if(el._prepare)el.removeEventListener('focus',el._prepare); el._prepare=ready; el.addEventListener('focus',ready); });
}

function nbxPopulateCombiner() {
    const gender = (S.gender === 'ALL') ? null : S.gender;
    const names = S.all.filter(n => !gender || n[IDX.GENDER] === gender || n[IDX.GENDER] === 'U');

    ['nbxCombine1', 'nbxCombine2'].forEach((id, i) => {
        const sel = document.getElementById(id);
        const prev = sel.value;
        sel.innerHTML = `<option value="">${i === 0 ? '— Nama Pertama —' : '— Nama Kedua —'}</option>`;
        const options=document.createDocumentFragment();
        names.forEach(n => {
            const opt = document.createElement('option');
            opt.value = n[IDX.NAME];
            opt.textContent = n[IDX.NAME];
            options.appendChild(opt);
        });
        sel.appendChild(options);
        if (prev) sel.value = prev;
    });
}

// ── FILTER LOGIC ─────────────────────────────────────────────────────────────
function nbxFilter() {
    S.search   = document.getElementById('nbxSearch').value.toLowerCase().trim();
    S.huruf    = document.getElementById('nbxHuruf').value;
    S.source   = document.getElementById('nbxSumber').value;
    S.syllables= document.getElementById('nbxSuku').value;
    S.page     = 1;

    S.filtered = S.all.filter(n => {
        const name     = n[IDX.NAME];
        const arabic   = n[IDX.ARABIC];
        const meaning  = n[IDX.MEANING];
        const gender   = n[IDX.GENDER];
        const source   = n[IDX.SOURCE];
        const syllables= n[IDX.SYLLABLES];
        const themes   = n[IDX.THEMES] || [];

        if (S.gender !== 'ALL' && gender !== S.gender) return false;
        if (S.huruf  && name[0].toUpperCase() !== S.huruf) return false;
        if (S.source && source !== S.source) return false;
        if (S.syllables) {
            const syl = parseInt(S.syllables, 10);
            if (syl === 4 ? syllables < 4 : syllables !== syl) return false;
        }
        if (S.theme && !themes.includes(S.theme)) return false;
        if (S.search) {
            const q = S.search;
            if (!name.toLowerCase().includes(q) &&
                !meaning.toLowerCase().includes(q) &&
                !arabic.includes(q)) return false;
        }
        return true;
    });

    document.getElementById('nbxCount').textContent      = S.filtered.length.toLocaleString();
    document.getElementById('statFiltered').textContent  = S.filtered.length.toLocaleString();
    nbxRenderGrid();
    nbxRenderPagination();
    document.querySelectorAll(".nbx-gender-tab,.nbx-chip").forEach(el=>el.setAttribute("aria-pressed",String(el.classList.contains("active"))));
}

window.nbxOnSearch = function () {
    clearTimeout(S.timer);
    S.timer = setTimeout(nbxFilter, 250);
};

window.nbxSetGender = function (g) {
    S.gender = g;
    document.querySelectorAll('.nbx-gender-tab').forEach(t =>
        t.classList.toggle('active', t.dataset.gender === g));
    nbxPrepareCombiner();
    nbxFilter();
};

window.nbxSetTheme = function (el, theme) {
    S.theme = theme;
    document.querySelectorAll('.nbx-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    nbxFilter();
};

window.nbxClearFilters = function () {
    S.search = S.huruf = S.source = S.syllables = S.theme = '';
    document.getElementById('nbxSearch').value = '';
    document.getElementById('nbxHuruf').value  = '';
    document.getElementById('nbxSumber').value = '';
    document.getElementById('nbxSuku').value   = '';
    document.querySelectorAll('.nbx-chip').forEach((c, i) =>
        c.classList.toggle('active', i === 0));
    nbxFilter();
};

// ── RENDER GRID ──────────────────────────────────────────────────────────────
function nbxRenderGrid() {
    const grid = document.getElementById('nbxGrid');
    const { filtered, page, perPage, saved } = S;
    const start = (page - 1) * perPage;
    const slice = filtered.slice(start, start + perPage);

    if (slice.length === 0) {
        grid.innerHTML = `<div class="nbx-empty" style="grid-column:1/-1">
            <div class="nbx-empty-icon">🔍</div>
            <div class="nbx-empty-title">Tiada nama dijumpai</div>
            <div class="nbx-empty-sub">Cuba ubah kata carian atau tetapkan semula penapis</div>
        </div>`;
        return;
    }

    grid.innerHTML = slice.map((n, localIdx) => {
        const name      = esc(n[IDX.NAME]);
        const arabic    = esc(n[IDX.ARABIC]);
        const meaning   = esc(n[IDX.MEANING]);
        const gender    = n[IDX.GENDER];
        const source    = n[IDX.SOURCE];
        const themes    = n[IDX.THEMES] || [];

        const isSaved    = saved.includes(n[IDX.NAME]);
        const tagClass   = SOURCE_TAG[source]  || 'nbx-tag-umum';
        const tagLabel   = SOURCE_LABEL[source] || '✨ Umum';
        const icon       = GENDER_ICON[gender]  || '✨';
        const globalIdx  = start + localIdx;

        const themeTag = themes.slice(0, 1)
            .map(t => `<span class="nbx-tag nbx-tag-umum">${THEME_LABEL[t] || t}</span>`)
            .join('');

        return `<div class="nbx-card${isSaved ? ' saved' : ''}" id="nbxCard_${globalIdx}">
            <div class="nbx-card-arabic" lang="ar" dir="rtl">${arabic}</div>
            <h3 class="nbx-card-name">${name} ${icon}</h3>
            <div class="nbx-card-meaning">${meaning}</div>
            <div class="nbx-card-tags">
                <span class="nbx-tag ${tagClass}">${tagLabel}</span>
                ${themeTag}
            </div>
            <div class="nbx-card-actions">
                <button class="nbx-btn-copy" aria-label="Salin ${name}" onclick="nbxCopy(${globalIdx},this)">📋 Salin</button>
                <button class="nbx-btn-wa"   aria-label="WA: Kongsi ${name} melalui WhatsApp" onclick="nbxWA(${globalIdx})">📤 WA</button>
                <button class="nbx-btn-save${isSaved ? ' saved' : ''}"
                        aria-label="${isSaved ? 'Keluarkan' : 'Simpan'} ${name}" aria-pressed="${isSaved}" onclick="nbxToggleSave(${globalIdx})"
                        title="${isSaved ? 'Keluarkan dari senarai' : 'Simpan ke senarai'}">⭐</button>
            </div>
        </div>`;
    }).join('');
}

// ── PAGINATION ───────────────────────────────────────────────────────────────
function nbxRenderPagination() {
    const { filtered, page, perPage } = S;
    const totalPages = Math.ceil(filtered.length / perPage);
    const pg = document.getElementById('nbxPagination');
    if (totalPages <= 1) { pg.innerHTML = ''; return; }

    const s = Math.max(1, page - 2);
    const e = Math.min(totalPages, page + 2);
    let html = `<button class="nbx-page-btn" aria-label="Halaman sebelumnya" onclick="nbxGoPage(${page - 1})" ${page === 1 ? 'disabled' : ''}>‹</button>`;

    if (s > 1) {
        html += `<button class="nbx-page-btn" onclick="nbxGoPage(1)">1</button>`;
        if (s > 2) html += `<span class="nbx-page-info">…</span>`;
    }
    for (let i = s; i <= e; i++) {
        html += `<button class="nbx-page-btn${i === page ? ' active' : ''}" aria-label="Halaman ${i}" ${i===page?'aria-current="page"':''} onclick="nbxGoPage(${i})">${i}</button>`;
    }
    if (e < totalPages) {
        if (e < totalPages - 1) html += `<span class="nbx-page-info">…</span>`;
        html += `<button class="nbx-page-btn" onclick="nbxGoPage(${totalPages})">${totalPages}</button>`;
    }
    html += `<button class="nbx-page-btn" aria-label="Halaman seterusnya" onclick="nbxGoPage(${page + 1})" ${page === totalPages ? 'disabled' : ''}>›</button>`;
    html += `<span class="nbx-page-info">Halaman ${page} / ${totalPages}</span>`;
    pg.innerHTML = html;
}

window.nbxGoPage = function (p) {
    const totalPages = Math.ceil(S.filtered.length / S.perPage);
    if (p < 1 || p > totalPages) return;
    S.page = p;
    nbxRenderGrid();
    nbxRenderPagination();
    document.querySelectorAll(".nbx-gender-tab,.nbx-chip").forEach(el=>el.setAttribute("aria-pressed",String(el.classList.contains("active"))));
    document.getElementById('nbxGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ── COPY & SHARE ─────────────────────────────────────────────────────────────
window.nbxCopy = function (idx, btn) {
    const n = S.filtered[idx];
    if (!n) return;
    const text = `${n[IDX.NAME]}\nMaksud: ${n[IDX.MEANING]}`;
    const orig = btn.innerHTML;

    navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = '✅ Disalin!';
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.innerHTML = '✅ Disalin!';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
    });
};

window.nbxWA = function (idx) {
    const n = S.filtered[idx];
    if (!n) return;
    const msg = `🌙 *Nama Bayi Islam*\n\n*${n[IDX.NAME]}*\nArabic: ${n[IDX.ARABIC]}\nMaksud: ${n[IDX.MEANING]}\n\n_Sumber: IlmuAlam.com_`;
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
};

// ── SAVE / SHORTLIST ─────────────────────────────────────────────────────────
window.nbxToggleSave = function (idx) {
    const n = S.filtered[idx];
    if (!n) return;
    const name = n[IDX.NAME];
    const pos  = S.saved.indexOf(name);

    if (pos === -1) {
        if (S.saved.length >= 10) { alert('Maksimum 10 nama dalam senarai pendek.'); return; }
        S.saved.push(name);
    } else {
        S.saved.splice(pos, 1);
    }

    document.getElementById('statSaved').textContent = S.saved.length;
    try {localStorage.setItem('ilmu-name-shortlist',JSON.stringify(S.saved));}catch{}
    nbxUpdateShortlist();
    nbxRenderGrid();
};

function nbxUpdateShortlist() {
    const container  = document.getElementById('nbxShortlistNames');
    const emptyMsg   = document.getElementById('nbxShortlistEmpty');
    const shareBtn   = document.getElementById('nbxShareAllBtn');

    if (S.saved.length === 0) {
        emptyMsg.style.display = '';
        shareBtn.style.display = 'none';
        container.innerHTML = '';
        container.appendChild(emptyMsg);
        return;
    }

    emptyMsg.style.display = 'none';
    shareBtn.style.display = '';
    container.replaceChildren(emptyMsg);
    S.saved.forEach(name=>{
        const pill=document.createElement('div');pill.className='nbx-shortlist-pill';pill.append(document.createTextNode(name));
        const remove=document.createElement('button');remove.type='button';remove.className='nbx-shortlist-remove';remove.textContent='✕';remove.setAttribute('aria-label','Keluarkan '+name);remove.addEventListener('click',()=>nbxRemoveSaved(name));pill.append(remove);container.append(pill);
    });
}

window.nbxRemoveSaved = function (name) {
    const pos = S.saved.indexOf(name);
    if (pos !== -1) S.saved.splice(pos, 1);
    document.getElementById('statSaved').textContent = S.saved.length;
    try {localStorage.setItem('ilmu-name-shortlist',JSON.stringify(S.saved));}catch{}
    nbxUpdateShortlist();
    nbxRenderGrid();
};

window.nbxShareAll = function () {
    if (!S.saved.length) return;
    const lines = S.saved.map(name => {
        const entry = S.all.find(n => n[IDX.NAME] === name);
        return entry ? `• *${name}* — ${entry[IDX.MEANING]}` : `• ${name}`;
    }).join('\n');
    const msg = `🌙 *Senarai Nama Bayi Islam Pilihan*\n\n${lines}\n\n_Dicari di IlmuAlam.com_`;
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
};

// ── NAME COMBINER ────────────────────────────────────────────────────────────
window.nbxCombineNames = function () {
    const n1 = document.getElementById('nbxCombine1').value;
    const n2 = document.getElementById('nbxCombine2').value;
    if (!n1 || !n2)    { alert('Sila pilih dua nama untuk digabungkan.'); return; }
    if (n1 === n2)     { alert('Sila pilih dua nama yang berbeza.'); return; }

    const e1 = S.all.find(n => n[IDX.NAME] === n1);
    const e2 = S.all.find(n => n[IDX.NAME] === n2);
    if (!e1 || !e2) return;

    S.combined = {
        name:    `${n1} ${n2}`,
        arabic:  `${e1[IDX.ARABIC]} ${e2[IDX.ARABIC]}`,
        meaning: `${e1[IDX.MEANING]} dan ${e2[IDX.MEANING].charAt(0).toLowerCase() + e2[IDX.MEANING].slice(1)}`
    };

    document.getElementById('nbxCombineName').textContent    = S.combined.name;
    document.getElementById('nbxCombineArabic').textContent  = S.combined.arabic;
    document.getElementById('nbxCombineMeaning').textContent = '📖 ' + S.combined.meaning;
    document.getElementById('nbxCombineResult').classList.add('show');
};

window.nbxCopyCombined = function () {
    const r = S.combined;
    if (!r) return;
    const text = `${r.name}\nArabic: ${r.arabic}\nMaksud: ${r.meaning}`;
    const btn  = document.querySelector('.nbx-combine-copy');
    navigator.clipboard.writeText(text).then(() => { btn.textContent='Disalin!'; setTimeout(()=>btn.textContent='Salin Nama',2000); }).catch(()=>alert('Tidak dapat menyalin. Sila pilih teks nama dan salin secara manual.')); return;
    const orig = btn.textContent;
    btn.textContent = '✅ Disalin!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
};

window.nbxWACombined = function () {
    const r = S.combined;
    if (!r) return;
    const msg = `🌙 *Nama Bayi Islam Pilihan*\n\n*${r.name}*\nArabic: ${r.arabic}\nMaksud: ${r.meaning}\n\n_Dicari di IlmuAlam.com_`;
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
};

window.nbxFilter=nbxFilter;

// ── BOOT ─────────────────────────────────────────────────────────────────────
function scheduleInit(){
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
        if('requestIdleCallback' in window) requestIdleCallback(nbxInit,{timeout:1000});
        else setTimeout(nbxInit,0);
    }));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scheduleInit,{once:true});else scheduleInit();
})();
