// Builds _site as a redirect to the merged page on quran.ilmualam.com. GitHub Pages cannot send a 301, so every URL
// answers with a canonical link, an instant meta refresh and location.replace (Google treats this as a permanent
// redirect), and sw.js replaces the old offline worker: it clears this app's caches, unregisters itself and reloads
// open tabs, so installed copies of the old PWA reach the new page too. The old dataset URL keeps working.
import {readFile,writeFile,mkdir,copyFile,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const site=path.join(root,'_site');
const TARGET='https://quran.ilmualam.com/nama-bayi-islam/';
const page=(robots)=>`<!doctype html>
<html lang="ms">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nama Bayi Islam telah berpindah</title>
<meta name="robots" content="${robots}">
<link rel="canonical" href="${TARGET}">
<meta http-equiv="refresh" content="0; url=${TARGET}">
<script>location.replace(${JSON.stringify(TARGET)}+location.search)</script>
<style>body{font:16px/1.6 system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 16px;color:#0c3808;background:#fff}a{color:#14632b;font-weight:700}@media(prefers-color-scheme:dark){body{background:#071d12;color:#e8fff0}a{color:#6fdc93}}</style>
</head>
<body>
<h1>Penjana Nama Bayi Islam telah berpindah</h1>
<p>Semua nama, penjana nama penuh dan senarai pendek kini di <a href="${TARGET}">quran.ilmualam.com/nama-bayi-islam/</a>.</p>
</body>
</html>
`;
const sw=`'use strict';
// Retires the old name.ilmualam.com app: delete its caches, unregister, and reload open tabs onto the redirect.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  await Promise.all((await caches.keys()).filter(key=>key.startsWith('ilmu-name-')).map(key=>caches.delete(key)));
  await self.registration.unregister();
  for(const client of await self.clients.matchAll({type:'window'}))client.navigate(${JSON.stringify(TARGET)});
})()));
`;
await rm(site,{recursive:true,force:true});
await mkdir(path.join(site,'asset/data'),{recursive:true});
await writeFile(path.join(site,'index.html'),page('noindex,follow'));
await writeFile(path.join(site,'404.html'),page('noindex,follow'));
await writeFile(path.join(site,'sw.js'),sw);
await writeFile(path.join(site,'robots.txt'),'User-agent: *\nAllow: /\n');
await writeFile(path.join(site,'llms.txt'),`# Generator Nama Bayi Islam (berpindah)\n\n> Moved to ${TARGET}\n\n- [Nama Bayi Islam](${TARGET}): name generator, search, checker and shortlist.\n- [Name data (JSON)](https://quran.ilmualam.com/assets/data/nama-bayi.json)\n`);
for(const name of ['CNAME','.nojekyll','LICENSE','asset/data/names-full.json'])await copyFile(path.join(root,name),path.join(site,name));
const html=await readFile(path.join(site,'index.html'),'utf8');
assert.match(html,new RegExp(`<link rel="canonical" href="${TARGET}">`));
assert.match(html,/http-equiv="refresh" content="0; url=https:\/\/quran\.ilmualam\.com\/nama-bayi-islam\/"/);
new vm.Script(sw);
assert.equal((await readFile(path.join(site,'CNAME'),'utf8')).trim(),'name.ilmualam.com');
console.log('Built redirect site in _site ->',TARGET);
