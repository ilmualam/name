import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>readFile(path.join(root,name),'utf8');
const h=await read('index.html');
assert.equal(h,await read('asset/index.html'));
assert.equal((h.match(/<h1\b/g)||[]).length,1);
assert.match(h,/<html lang="ms">/);assert.match(h,/<main id="main">/);
assert.match(h,/<link rel="canonical" href="https:\/\/name\.ilmualam\.com\/">/);
assert.match(h,/<meta property="og:url" content="https:\/\/name\.ilmualam\.com\/">/);
assert.doesNotMatch(h,/aggregateRating|reviewCount|fonts\.googleapis|blogger\.googleusercontent|<div[^>]*onclick|<span[^>]*onclick/);
const graph=JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
assert.ok(graph.some(n=>n['@type']==='WebApplication'));
for(const q of graph.find(n=>n['@type']==='FAQPage').mainEntity){assert.ok(h.includes(q.name));assert.ok(h.includes(q.acceptedAnswer.text));}
const data=JSON.parse(await read('asset/data/names-full.json'));assert.equal(data.names.length,3254);assert.equal(new Set(data.names.map(n=>n[0])).size,3176);
assert.equal(data.meta.total,data.names.length);
new vm.Script(await read('asset/js/app.js'));
for(const match of h.matchAll(/(?:href|src)="(\/[^"#]+)"/g)){await readFile(path.join(root,match[1]));}
const social=await readFile(path.join(root,'asset/icons/social.png'));assert.equal(social.readUInt32BE(16),1200);assert.equal(social.readUInt32BE(20),630);
assert.match(await read('robots.txt'),/Sitemap: https:\/\/name\.ilmualam\.com\/sitemap.xml/);
assert.match(await read('sitemap.xml'),/<loc>https:\/\/name\.ilmualam\.com\/<\/loc>/);
assert.match(await read('llms.txt'),/3,254 rows; 3,176 distinct/);
assert.equal((await read('CNAME')).trim(),'name.ilmualam.com');
assert.match(await read('404.html'),/noindex,follow/);
console.log('Validated URLs, metadata, schema/FAQ consistency, dataset counts, JS syntax, local assets, social dimensions and crawl files.');

const manifest=JSON.parse(await read('manifest.webmanifest'));assert.equal(manifest.id,'/');assert.equal(manifest.scope,'/');assert.equal(manifest.start_url,'/');assert.equal(manifest.display,'standalone');
for(const icon of manifest.icons){const data=await readFile(path.join(root,icon.src));const size=Number(icon.sizes.split('x')[0]);assert.equal(data.readUInt32BE(16),size);assert.equal(data.readUInt32BE(20),size);}
assert.ok(manifest.icons.some(icon=>icon.purpose==='maskable'));
const worker=await read('sw.js');assert.doesNotMatch(worker,/__VERSION__|__PRECACHE__/);new vm.Script(worker);new vm.Script(await read('asset/pwa/client.js'));
for(const url of JSON.parse(worker.match(/const PRECACHE=(\[[^;]+\]);/)[1]))await readFile(path.join(root,url==='/'?'index.html':url));
assert.match(await read('offline.html'),/noindex,follow/);
console.log('Validated PWA manifest, icon sizes, worker/client syntax and complete offline precache.');
