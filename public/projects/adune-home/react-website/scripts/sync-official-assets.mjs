/**
 * ADUNÉ original-asset synchronizer.
 * Downloads publicly accessible images directly from https://adunehome.com only.
 * Usage: npm run sync:assets
 * Images are copied to public/assets/original, with exact source URLs in the manifest.
 * This script requires internet access from the computer on which it runs.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.join(directory, 'public/assets/original');
const brandDestination = path.join(directory, '..', 'brand-identity', 'official-source-assets');
await fs.mkdir(destination, {recursive:true});
await fs.mkdir(brandDestination, {recursive:true});

const site = 'https://adunehome.com';
const products = [
 {slot:'heart-tray.jpg', path:'/product/minis-collection-the-heart-tray/', words:['heart','tray']},
 {slot:'ritual-tray.jpg', path:'/product/minis-collection-the-ritual-tray/', words:['ritual','tray']},
 {slot:'palm-chair.jpg', path:'/product/adune-palm-chair/', words:['palm','chair']},
 {slot:'fringe-placemat.jpg', path:'/product/the-fringe-placemat/', words:['fringe','placemat']},
 {slot:'haven-tissue-box.jpg', path:'/product/haven-tissue-storage-box/', words:['haven','tissue']},
 {slot:'lap-desk.jpg', path:'/product/adune-lap-desk/', words:['lap','desk']},
 {slot:'coasters.jpg', path:'/product/adune-coaster-set/', words:['coaster']},
 {slot:'base-set.jpg', path:'/product/adune-base-set/', words:['base','set']},
];
const manifest = {};
const records = [];
const pending = [];
const deferred = new Set();

async function request(url){
 const ctrl = new AbortController(); const tm = setTimeout(()=>ctrl.abort(),25000);
 try {
  const res=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; BrandDesignResearch/1.0)','Accept':'text/html,image/avif,image/webp,image/*,*/*'},redirect:'follow',signal:ctrl.signal});
  if (!res.ok) throw Error(`HTTP ${res.status} for ${url}`);
  return res;
 } finally { clearTimeout(tm); }
}
function normalize(s){
 if(!s)return '';
 s=s.replaceAll('&amp;','&').replaceAll('&#038;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"').replaceAll('\\/','/').replaceAll('&lt;','<').replaceAll('&gt;','>');
 try{const u=new URL(s,site);return u.origin===site?u.toString():'';}catch{return '';}
}
function allImageCandidates(html){
 const out=[];
 function push(v,weight=0){const url=normalize(v);if(!url)return;if(!/\/wp-content\/uploads\//.test(url) && !/\.(?:png|jpe?g|webp|avif|svg)(?:\?|$)/i.test(url)) return; if(/dummy|placeholder|woocommerce-placeholder|transparent|pixel|spinner/i.test(url))return;out.push({url,weight});}
 for(const m of html.matchAll(/<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/gi))push(m[1],100);
 for(const m of html.matchAll(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/gi))push(m[1],100);
 for(const m of html.matchAll(/<img\b[^>]*>/gi)){
  const el=m[0]; let weight=0;
  if(/custom-logo|site-logo|logo-image|brand-logo/i.test(el)) weight=200;
  if(/woocommerce-product-gallery__image|wp-post-image|attachment-woocommerce_single/i.test(el))weight=140;
  for (const attr of ['data-large_image','data-src','data-lazy-src','src','data-orig-file','data-srcset','srcset']){
   let a=new RegExp('\\b'+attr+'\\s*=\\s*["\']([^"\']+)["\']','i').exec(el);
   if(a){let first=attr.endsWith('srcset')?a[1].split(',').at(-1).trim().split(/\s+/)[0]:a[1];push(first,weight+(attr==='data-large_image'?35:0));}
  }
 }
 // WordPress slider and JS-based gallery images often appear only in escaped JSON.
 for(const m of html.matchAll(/https?:\\?\/\\?\/adunehome\.com\\?\/wp-content\\?\/uploads\\?\/[^\s"'<>\\]+(?:jpe?g|png|webp|avif|svg)/gi))push(m[0].replaceAll('\\',''),35);
 const uniq=new Map();for(const o of out)if(!uniq.has(o.url)||uniq.get(o.url).weight<o.weight)uniq.set(o.url,o);
 return [...uniq.values()].sort((a,b)=>b.weight-a.weight);
}
function extension(contentType, bytes){
 const t=(contentType||'').toLowerCase();
 if(t.includes('svg'))return 'svg'; if(t.includes('png'))return 'png';if(t.includes('webp'))return 'webp';if(t.includes('avif'))return 'avif';if(t.includes('jpeg')||t.includes('jpg'))return 'jpg';
 if(bytes.slice(0,4).toString()==='RIFF')return 'webp';if(bytes[0]===0xff&&bytes[1]===0xd8)return 'jpg';if(bytes[0]===0x89&&bytes[1]===0x50)return 'png';if(bytes.subarray(0,180).toString().includes('<svg'))return 'svg';return '';
}
async function download(slot,url,note){
 const response=await request(url);const buffer=Buffer.from(await response.arrayBuffer());
 const ext=extension(response.headers.get('content-type'),buffer);
 if(!ext||buffer.length<1500)throw Error('Invalid image or very small file: '+url);
 const name=slot.replace(/\.[a-z]+$/i,'')+'.'+ext;
 await fs.writeFile(path.join(destination,name),buffer);
 await fs.copyFile(path.join(destination,name),path.join(brandDestination,name));
 manifest[slot]=name; records.push({slot,file:name,url:response.url,bytes:buffer.length,verified_at:new Date().toISOString(),note});
 console.log('Saved',name,'('+Math.round(buffer.length/1024)+'KB)',response.url);
 return name;
}
async function htmlAt(pathname){try{return await (await request(site+pathname)).text();}catch(err){console.warn('Could not open',pathname,err.message);return '';}}

console.log('Accessing official website',site);
const home=await htmlAt('/');
if(!home){console.error('The original site was unreachable. No sample or third-party imagery will be substituted.'); process.exitCode=1;}
const homeImages=allImageCandidates(home);
const logoMarkup=home.match(/<img\b[^>]*(?:custom-logo|site-logo|site-branding|logo)[^>]*>/i)?.[0]||'';
const logoCandidates=allImageCandidates(logoMarkup);
const overallLogo=logoCandidates[0]||homeImages.find(x=>/logo|icon|brand|adune-?home/i.test(x.url));
if(overallLogo){try{await download('brand-logo',overallLogo.url,'Original logo from official header');}catch(e){console.warn('Logo was not saved:',e.message);}}
const iconRef=home.match(/<link\b[^>]*rel=["'][^"']*(?:shortcut icon|icon)[^"']*["'][^>]*href=["']([^"']+)["']/i)?.[1];
if(iconRef){try{await download('brand-symbol',normalize(iconRef),'Site icon from official favicon tag');}catch(e){console.warn('Site icon not saved:',e.message);}}
// Highest-confidence hero image. Avoid revslider dummy placeholders.
const homeHero=homeImages.find(x=>x.weight>=100 && !/logo|icon|favicon/i.test(x.url))||homeImages.find(x=>!/(logo|icon|favicon|background-pattern)/i.test(x.url));
if(homeHero){try{await download('hero.jpg',homeHero.url,'Image from original homepage');}catch(e){console.warn(e.message);}}
for(const p of products){
 let html=await htmlAt(p.path);
 if(!html){ // Search the native WooCommerce shop link for a matching product page URL.
   const match=(home+'\n'+await htmlAt('/shop/')).match(new RegExp('href=["\']([^"\']*\/product\/[^"\']*'+p.words[0]+'[^"\']*)["\']','i'));
   if(match)html=await htmlAt(new URL(match[1],site).pathname);
 }
 const candidates=allImageCandidates(html);
 const best=candidates.find(x=>x.weight>=100)||candidates.find(x=>p.words.some(word=>x.url.toLowerCase().includes(word)))||candidates[0];
 if(!best){pending.push(p.slot);console.warn('No matching image found for',p.slot);continue;}
 try{await download(p.slot,best.url,`Original product media, ${p.path}`);}catch(err){pending.push(p.slot);console.warn('Unable to save',p.slot,err.message)}
}
const aliases={'living.jpg':['palm-chair.jpg','haven-tissue-box.jpg'], 'dining.jpg':['fringe-placemat.jpg','base-set.jpg'], 'decor.jpg':['heart-tray.jpg','ritual-tray.jpg'], 'story.jpg':['hero.jpg','base-set.jpg'], 'craft.jpg':['base-set.jpg','fringe-placemat.jpg'], 'materials.jpg':['fringe-placemat.jpg','coasters.jpg'], 'art.jpg':['heart-tray.jpg','ritual-tray.jpg'], 'bedroom.jpg':['lap-desk.jpg']};
for(const [alias,candidates] of Object.entries(aliases)){
 const match=candidates.find(c=>manifest[c]);if(match)manifest[alias]=manifest[match];else pending.push(alias);
}
// Backstop: use an original source photo as the hero, NEVER a stock image.
if(!manifest['hero.jpg'])for(const slot of ['palm-chair.jpg','base-set.jpg','heart-tray.jpg'])if(manifest[slot]){manifest['hero.jpg']=manifest[slot];break;}
const js='// Generated by scripts/sync-official-assets.mjs\nwindow.ADUNE_ORIGINAL_MEDIA = '+JSON.stringify(manifest,null,2)+';\n';
await fs.writeFile(path.join(destination,'manifest.js'),js);
await fs.writeFile(path.join(brandDestination,'source-manifest.json'),JSON.stringify({source:site,products,records,unfilled_slots:[...new Set(pending)],updated:new Date().toISOString()},null,2));
console.log('\nOriginal image files downloaded:',records.length,'; still missing:',[...new Set(pending)].join(', ')||'none');
console.log('Website media manifest:',path.join(destination,'manifest.js'));
