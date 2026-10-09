(()=>{
 'use strict';
 if(!('serviceWorker'in navigator)||!isSecureContext)return;
 const install=document.getElementById('pwaInstall'),notice=document.getElementById('pwaNotice'),text=document.getElementById('pwaMessage'),update=document.getElementById('pwaUpdate'),close=document.getElementById('pwaClose');
 let prompt,registration,reload=false,lastCheck=0;
 const standalone=matchMedia('(display-mode: standalone)');
 function show(message,canUpdate=false){text.textContent=message;update.hidden=!canUpdate;notice.hidden=false;}
 function hide(){notice.hidden=true;}
 function visibility(){install.hidden=standalone.matches||navigator.standalone===true;}
 function status(){
   if(registration?.waiting)show('Versi baharu tersedia. Kemas kini selepas selesai memilih nama.',true);
   else if(!navigator.onLine)show('Anda luar talian. Carian dan gabungan nama berfungsi apabila cache aplikasi siap. WhatsApp memerlukan internet.');
   else hide();
 }
 function offer(worker=registration?.waiting){if(worker&&navigator.serviceWorker.controller)show('Versi baharu tersedia. Kemas kini selepas selesai memilih nama.',true);}
 close.addEventListener('click',hide);
 update.addEventListener('click',()=>{if(!registration?.waiting)return;reload=true;update.disabled=true;registration.waiting.postMessage({type:'SKIP_WAITING'});});
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reload){reload=false;location.reload();}else status();});
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;visibility();});
 install.addEventListener('click',async()=>{
   if(!prompt){show('Pilih Pasang aplikasi atau Tambah ke Skrin Utama dalam menu pelayar. Pada iPhone atau iPad, gunakan menu Kongsi. Pilihan bergantung pada pelayar.');return;}
   const current=prompt;prompt=null;install.disabled=true;
   try{await current.prompt();await current.userChoice;}catch{show('Pemasangan belum tersedia. Cuba menu pelayar.');}finally{install.disabled=false;}
 });
 window.addEventListener('appinstalled',()=>{prompt=null;install.hidden=true;hide();});
 standalone.addEventListener('change',visibility);
 window.addEventListener('online',status);window.addEventListener('offline',status);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&navigator.onLine&&registration&&Date.now()-lastCheck>3600000){lastCheck=Date.now();registration.update().catch(()=>{});}});
 async function register(){try{
   registration=await navigator.serviceWorker.register('/sw.js',{scope:'/',updateViaCache:'none'});lastCheck=Date.now();offer();
   registration.addEventListener('updatefound',()=>{const worker=registration.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed')offer(worker);});});
 }catch(error){console.warn('Cache luar talian belum tersedia.',error);}}
 function schedule(){if('requestIdleCallback'in window)requestIdleCallback(register,{timeout:2000});else setTimeout(register,0);}
 visibility();status();if(document.readyState==='complete')schedule();else window.addEventListener('load',schedule,{once:true});
})();
