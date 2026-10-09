'use strict';
const PREFIX='ilmu-name-';
const CACHE=PREFIX+'__VERSION__';
const PRECACHE=__PRECACHE__;
const ASSETS=new Set(PRECACHE);
const APP_PATHS=new Set(['/','/index.html','/asset/index.html']);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(PRECACHE.map(url=>new Request(url,{cache:'reload'}))))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  await Promise.all((await caches.keys()).filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING')event.waitUntil(self.skipWaiting());
});
async function cached(request,key){
  const cache=await caches.open(CACHE);
  const saved=await cache.match(key);
  if(saved)return saved;
  // Do not add arbitrary URLs or mix newly deployed files into this release.
  return fetch(request);
}
async function navigation(request){
  let timer;
  try{return await Promise.race([fetch(request),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Timeout')),3500);})]);}
  catch{
    const page=await (await caches.open(CACHE)).match('/offline.html');
    return new Response(page?await page.text():'Luar talian',{status:503,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
  }finally{clearTimeout(timer);}
}
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin||url.pathname==='/sw.js')return;
  if(request.mode==='navigate'){
    event.respondWith(APP_PATHS.has(url.pathname)?cached(request,'/'):navigation(request));
  }else if(!url.search&&ASSETS.has(url.pathname))event.respondWith(cached(request,url.pathname));
});
