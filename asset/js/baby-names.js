//<![CDATA[
// Konfigurasi utama
const ILMU_BNG_DOMAIN   = "https://www.ilmualam.com";
const ILMU_BNG_DATA_URL = "https://www.ilmualam.com/data/islamic-baby-names.json"; 
// ^^^ Sini fail JSON 3000 nama (boleh mula test dengan 20 dulu)
const ILMU_BNG_COPYRIGHT = "© IlmuAlam – Islamic Baby Name Generator";

const ILMU_BNG_FAV_KEY = "ilmu_babyname_favorites";
let BABY_DATA = [];
let CURRENT_MODE = "search"; // 'search' atau 'favorites'

// escape helper
function ilmuBngEscape(str){
  return String(str || "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

// favorites helpers
function ilmuBngGetFav(){
  try{
    const raw = localStorage.getItem(ILMU_BNG_FAV_KEY);
    if(!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch(e){
    return [];
  }
}
function ilmuBngSaveFav(list){
  try{
    localStorage.setItem(ILMU_BNG_FAV_KEY, JSON.stringify(list));
  } catch(e){}
}
function ilmuBngIsFav(name){
  return ilmuBngGetFav().includes(name);
}
function ilmuBngToggleFav(name){
  const favs = ilmuBngGetFav();
  const idx = favs.indexOf(name);
  if(idx === -1){ favs.push(name); }
  else { favs.splice(idx,1); }
  ilmuBngSaveFav(favs);
}

// render
function ilmuBngRender(list){
  const box   = document.getElementById("bn-results");
  const state = document.getElementById("bn-status");
  if(!box || !state) return;

  if(!list || !list.length){
    box.innerHTML = "<p>Tiada nama ditemui. Cuba huruf atau maksud yang lain.</p>";
    state.textContent = CURRENT_MODE === "favorites"
      ? "Belum ada nama dalam senarai kegemaran."
      : "Tiada hasil untuk carian semasa.";
    return;
  }

  const favs = ilmuBngGetFav();

  const html = list.map(function(n){
    const isFav = favs.includes(n.name);
    const genderLabel = n.gender === "male" ? "Lelaki" : "Perempuan";
    return `
      <article class="ilmu-bng-card">
        <header class="ilmu-bng-card-header">
          <div>
            <div class="ilmu-bng-name">${ilmuBngEscape(n.name)}</div>
            <span class="ilmu-bng-gender-tag">${genderLabel}</span>
          </div>
          <button type="button"
            class="ilmu-bng-fav-btn ${isFav ? "is-active" : ""}"
            data-name="${ilmuBngEscape(n.name)}">
            <span>${isFav ? "♥" : "♡"}</span> <span>${isFav ? "Kegemaran" : "Simpan"}</span>
          </button>
        </header>
        <div class="ilmu-bng-meaning">${ilmuBngEscape(n.meaning)}</div>
        <div class="ilmu-bng-meta">
          <span>Akar: ${ilmuBngEscape(n.root || "-")}</span> ·
          <span>Asal: ${ilmuBngEscape(n.origin || "Arabic")}</span><br>
          <span>Rujukan: ${ilmuBngEscape(n.quran || "-")}</span><br>
          <span>Personaliti: ${ilmuBngEscape(n.personality || "-")}</span>
        </div>
      </article>
    `;
  }).join("") + `<div style="display:none;">${ILMU_BNG_COPYRIGHT}</div>`;

  box.innerHTML = html;

  state.textContent = CURRENT_MODE === "favorites"
    ? "Menunjukkan nama kegemaran anda."
    : "Menunjukkan hasil carian nama bayi Islam.";
}

// filter
function ilmuBngFilter(){
  const qInput = document.getElementById("bn-search");
  const gSelect = document.getElementById("bn-gender");
  if(!qInput || !gSelect) return;

  CURRENT_MODE = "search";

  const q = qInput.value.trim().toLowerCase();
  const gender = gSelect.value;

  const filtered = BABY_DATA.filter(function(n){
    const matchGender = (gender === "all" || n.gender === gender);
    const nm = (n.name || "").toLowerCase();
    const meaning = (n.meaning || "").toLowerCase();
    return matchGender && (nm.includes(q) || meaning.includes(q));
  });

  ilmuBngRender(filtered);
}

// random
function ilmuBngRandom(){
  if(!BABY_DATA.length) return;
  CURRENT_MODE = "search";
  const n = BABY_DATA[Math.floor(Math.random() * BABY_DATA.length)];
  ilmuBngRender([n]);
}

// favorites view
function ilmuBngShowFavorites(){
  CURRENT_MODE = "favorites";
  const favs = ilmuBngGetFav();
  if(!favs.length){
    ilmuBngRender([]);
    return;
  }
  const list = BABY_DATA.filter(function(n){ return favs.includes(n.name); });
  ilmuBngRender(list);
}

// load JSON
async function ilmuBngLoadData(){
  const state = document.getElementById("bn-status");
  try{
    if(state) state.textContent = "Memuatkan ribuan nama bayi Islam dari IlmuAlam…";
    const res = await fetch(ILMU_BNG_DATA_URL, {cache:"force-cache"});
    if(!res.ok) throw new Error("Gagal memuatkan data nama");
    const data = await res.json();
    BABY_DATA = Array.isArray(data) ? data : [];
    if(!BABY_DATA.length) throw new Error("Tiada data ditemui");
    // Papar sample awal
    ilmuBngRender(BABY_DATA.slice(0, 12));
    if(state) state.textContent = "Data nama bayi Islam berjaya dimuatkan.";
  } catch(e){
    console.error("IlmuAlam BabyName error:", e);
    if(state) state.textContent = "Maaf, data nama bayi tidak dapat dimuatkan buat masa ini.";
  }
}

// event binding
function ilmuBngBindEvents(){
  const qInput  = document.getElementById("bn-search");
  const gSelect = document.getElementById("bn-gender");
  const randBtn = document.getElementById("bn-random");
  const favBtn  = document.getElementById("bn-show-fav");
  const results = document.getElementById("bn-results");

  if(qInput)  qInput.addEventListener("input", ilmuBngFilter);
  if(gSelect) gSelect.addEventListener("change", ilmuBngFilter);
  if(randBtn) randBtn.addEventListener("click", ilmuBngRandom);
  if(favBtn)  favBtn.addEventListener("click", ilmuBngShowFavorites);

  if(results){
    results.addEventListener("click", function(e){
      const btn = e.target.closest(".ilmu-bng-fav-btn");
      if(!btn) return;
      const name = btn.getAttribute("data-name");
      if(!name) return;
      ilmuBngToggleFav(name);
      if(CURRENT_MODE === "favorites"){
        ilmuBngShowFavorites();
      } else {
        ilmuBngFilter();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function(){
  ilmuBngBindEvents();
  ilmuBngLoadData();
});

//]]>
