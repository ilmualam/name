import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const css=(await readFile(path.join(root,'asset/css/baby-name.min.css'),'utf8')).trim();
let html=await readFile(path.join(root,'asset/index.html'),'utf8');
html=html.replace(/<style id="app-styles">[\s\S]*?<\/style>/,'<style id="app-styles">'+css+'</style>');
await writeFile(path.join(root,'asset/index.html'),html);
await writeFile(path.join(root,'index.html'),html);
const precache=['/','/offline.html','/manifest.webmanifest','/asset/js/app.js','/asset/pwa/client.js','/asset/data/names-full.json','/asset/icons/favicon-96x96.png','/asset/pwa/icons/icon-192.png','/asset/pwa/icons/icon-512.png','/asset/pwa/icons/icon-maskable-512.png','/asset/pwa/icons/apple-touch-icon.png'];
const template=await readFile(path.join(root,'asset/pwa/sw.template.js'),'utf8');
const hash=createHash('sha256').update(template).update(html);
for(const name of precache.filter(name=>name!=='/'))hash.update(await readFile(path.join(root,name)));
const version=hash.digest('hex').slice(0,16);
await writeFile(path.join(root,'sw.js'),template.replace('__VERSION__',version).replace('__PRECACHE__',JSON.stringify(precache)));
const files=['LICENSE','index.html','404.html','robots.txt','sitemap.xml','llms.txt','CNAME','.nojekyll','asset/index.html','asset/js/app.js','asset/css/baby-name.min.css','asset/data/names-full.json','asset/icons/favicon-96x96.png','asset/icons/social.png','manifest.webmanifest','sw.js','offline.html','asset/pwa/client.js','asset/pwa/icons/icon-192.png','asset/pwa/icons/icon-512.png','asset/pwa/icons/icon-maskable-512.png','asset/pwa/icons/apple-touch-icon.png'];
for(const name of files){const target=path.join(root,'_site',name);await mkdir(path.dirname(target),{recursive:true});await copyFile(path.join(root,name),target);}
console.log('Built root index and GitHub Pages artifact in _site.');
