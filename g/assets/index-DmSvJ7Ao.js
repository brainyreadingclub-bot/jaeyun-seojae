(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`jaeyun-seojae-g`,t=`kv`;function n(){return new Promise((n,r)=>{let i=indexedDB.open(e,1);i.onupgradeneeded=()=>i.result.createObjectStore(t),i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}async function r(e,r){let i=await n();return new Promise((n,a)=>{let o=i.transaction(t,e),s=r(o.objectStore(t));o.oncomplete=()=>{i.close(),n(s.result)},o.onerror=o.onabort=()=>a(o.error)})}var i=e=>r(`readonly`,t=>t.get(e)),a=(e,t)=>r(`readwrite`,n=>n.put(t,e)),o=e=>r(`readwrite`,t=>t.delete(e));async function s(e){if(!e.length)return;let r=await n();await new Promise((n,i)=>{let a=r.transaction(t,`readwrite`),o=a.objectStore(t);for(let[t,n]of e)o.put(n,t);a.oncomplete=()=>{r.close(),n()},a.onerror=a.onabort=()=>{r.close(),i(a.error??Error(`저장하지 못했어요`))}})}var c=()=>r(`readonly`,e=>e.getAllKeys()),l={fontSize:17,lineHeight:1.8,font:`sans`,theme:`system`,showPages:!1},u=(e,t)=>a(`p:`+e,t),d=(e,t)=>a(`c:`+e,t),f=async()=>({...l,...await i(`prefs`)??{}}),p=e=>a(`prefs`,e);async function m(){let e={};for(let t of await c())typeof t==`string`&&t.startsWith(`p:`)&&(e[t.slice(2)]=await i(t));return e}async function h(){let e={};for(let t of await c())if(typeof t==`string`&&t.startsWith(`c:`)){let n=await i(t);Object.keys(n).length&&(e[t.slice(2)]=n)}return e}async function g(){let e=await m(),t={};for(let e of await c())if(typeof e==`string`&&e.startsWith(`c:`)){let n=await i(e);Object.keys(n).length&&(t[e.slice(2)]=n)}return{app:`jaeyun-seojae`,v:1,cv:2,exportedAt:new Date().toISOString(),prefs:await f(),progress:e,checks:t}}var _=e=>{throw Error(e)},v=e=>typeof e==`object`&&!!e&&!Array.isArray(e),y=(e,t,n)=>Math.min(n,Math.max(t,e));async function b(e,r,i=!1){if(!v(e)||e.app!==`jaeyun-seojae`||e.v!==1)return _(`이 앱에서 내보낸 백업 파일이 아니에요. 「백업 내보내기」로 만든 .json 파일을 골라 주세요.`);let a=e.progress??{},o=e.checks??{};if(!v(a)||!v(o))return _(`백업 파일의 진도·체크 형식이 올바르지 않아요. 파일이 깨졌을 수 있어요.`);let s=e=>e.replace(/:deep$/,``),c=e=>!r||r.has(s(e)),u=[],d=0,f=0,p=0,m=new Set,h=Object.keys(a),g=Object.keys(o);if(h.length>2e3||g.length>2e3)return _(`백업 파일이 너무 커서 가져올 수 없어요.`);for(let e of h){let t=a[e];if(!/^[\w.-]{1,120}(:deep)?$/.test(e)||!v(t))return _(`백업 파일의 진도 형식이 올바르지 않아요. 파일이 깨졌을 수 있어요.`);let{pct:n,block:r,off:i,done:o,t:l}=t;if(typeof n!=`number`||!Number.isFinite(n)||typeof r!=`number`||!Number.isInteger(r)||r<0||r>1e5||i!==void 0&&(typeof i!=`number`||!Number.isFinite(i))||o!==void 0&&typeof o!=`boolean`||l!==void 0&&(typeof l!=`number`||!Number.isFinite(l)))return _(`백업 파일의 진도 값이 올바르지 않아요. 파일이 깨졌을 수 있어요.`);c(e)?(u.push([`p:`+e,{pct:y(n,0,1),block:r,off:y(typeof i==`number`?i:0,0,1),done:o===!0,t:typeof l==`number`?l:Date.now()}]),m.add(s(e)),d++):p++}for(let e of g){let t=o[e];if(!/^[\w.-]{1,120}$/.test(e)||!v(t))return _(`백업 파일의 체크 형식이 올바르지 않아요. 파일이 깨졌을 수 있어요.`);let n={};for(let[e,r]of Object.entries(t)){if(!/^[0-9a-z]{1,16}$/.test(e)||r!==1&&r!==2)return _(`백업 파일의 체크 값이 올바르지 않아요. 파일이 깨졌을 수 있어요.`);n[e]=r}c(e)?(u.push([`c:`+e,n]),m.add(e),f+=Object.keys(n).length):p++}let b=e.prefs;if(b!==void 0){if(!v(b))return _(`백업 파일의 글자 설정 형식이 올바르지 않아요.`);if(b.fontSize!==void 0&&(typeof b.fontSize!=`number`||!Number.isFinite(b.fontSize))||b.lineHeight!==void 0&&(typeof b.lineHeight!=`number`||!Number.isFinite(b.lineHeight)))return _(`백업 파일의 글자 설정 값이 올바르지 않아요.`);u.push([`prefs`,{...l,fontSize:y(typeof b.fontSize==`number`?b.fontSize:l.fontSize,12,32),lineHeight:y(typeof b.lineHeight==`number`?b.lineHeight:l.lineHeight,1.3,2.4),font:b.font===`serif`?`serif`:`sans`,theme:b.theme===`light`||b.theme===`dark`?b.theme:`system`,showPages:b.showPages===!0}])}if(i)return{progress:d,books:m.size,checks:f,skipped:p};if(u.length){let e=await n();await new Promise((n,r)=>{let i=e.transaction(t,`readwrite`),a=i.objectStore(t);for(let[e,t]of u)a.put(t,e);i.oncomplete=()=>{e.close(),n()},i.onerror=i.onabort=()=>{e.close(),r(i.error??Error(`저장하지 못했어요`))}})}return{progress:d,books:m.size,checks:f,skipped:p}}var x=`[–—~-]`,S=RegExp(`^(.*?)\\s*\\bpp?\\.\\s?(\\d+)(?:\\s*${x}\\s*(\\d+))?$`),C=/\(([^()]*)\)/g,w=RegExp(`^(.*?)\\s*\\((pp?\\.\\s?\\d+(?:\\s*${x}\\s*\\d+)?)\\)\\s*$`),T=`\0`;function E(e){let t=e.map(([e,t])=>[e,t]).sort((e,t)=>e[0]-t[0]||e[1]-t[1]),n=[];for(let e of t){let t=n[n.length-1];t&&e[0]<=t[1]+1?t[1]=Math.max(t[1],e[1]):n.push(e)}return n}function D(e){let t=E(e);return t.length?`p.`+t.map(([e,t])=>e===t?String(e):`${e}–${t}`).join(`, `):``}function O(e){let t=[],n=!1,r=e.replace(C,(e,r)=>{if(!/\bpp?\./.test(r))return e;let i=r.split(/\s*[,;，]\s*/),a=[],o=[];for(let e of i){let t=e.trim().match(S);if(!t){a.push(e.trim());continue}let n=parseInt(t[2],10),r=t[3]===void 0?n:parseInt(t[3],10);r<n?a.push(e.trim()):(o.push([n,r]),t[1].trim()&&a.push(t[1].trim()))}return o.length?(t.push(...o),n=!0,a.length?`(${a.join(`, `)})`:T):e});return n?{text:r.replace(/(\s*)\u0000(\s*)/g,(e,t,n,r,i)=>{let a=i[r+e.length],o=r===0;return a===void 0||/[.,;:!?)\]」』”’"'。、…]/.test(a)||o?``:t||n?` `:``}).replace(/ {2,}/g,` `).trim(),ranges:E(t)}:{text:e,ranges:[]}}function k(e){let t=e.match(w);return!t||!t[1].trim()?{title:e,range:null}:{title:t[1].trim(),range:t[2].replace(/\s+/g,``).replace(/^pp\./,`p.`)}}function A(e){let t=e.replace(/\r\n?/g,`
`).split(`
`),n=[],r=[],i=()=>{r.length&&n.push({t:`p`,text:r.join(` `)}),r=[]};for(let e=0;e<t.length;e++){let a=t[e],o=a.trim(),s;if(!o)i();else if(s=o.match(/^(#{1,6})\s+(.*)$/))i(),n.push({t:`h`,level:s[1].length,text:s[2].replace(/\s+#+\s*$/,``)});else if(/^(-{3,}|\*{3,}|_{3,})$/.test(o))i(),n.push({t:`hr`});else if(o.startsWith(`>`)){i();let r=[],a=[];for(;e<t.length&&t[e].trim().startsWith(`>`);e++){let n=t[e].trim().replace(/^>\s?/,``).trim();n?a.push(n):(a.length&&r.push(a.join(` `)),a=[])}e--,a.length&&r.push(a.join(` `)),n.push({t:`quote`,paras:r})}else if(s=a.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/)){i();let r=/\d/.test(s[2]),a=[];for(;e<t.length;e++){let n=t[e].match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);if(n)a.push({text:n[3].trim(),depth:Math.min(2,Math.floor(n[1].replace(/\t/g,`  `).length/2))});else if(t[e].trim()&&/^\s{2,}\S/.test(t[e])&&a.length)a[a.length-1].text+=` `+t[e].trim();else break}e--,n.push({t:`ul`,items:a,ordered:r})}else r.push(o)}return i(),n}function j(e){let t=document.createDocumentFragment(),n=/(\*\*[^*]+?\*\*|__[^_]+?__|`[^`]+`|\*[^*\s][^*]*?\*|_[^_\s][^_]*?_)/g,r=0,i;for(;i=n.exec(e);){i.index>r&&t.append(e.slice(r,i.index));let n=i[0],a;n.startsWith(`**`)||n.startsWith(`__`)?(a=document.createElement(`strong`),a.append(j(n.slice(2,-2)))):n.startsWith("`")?(a=document.createElement(`code`),a.textContent=n.slice(1,-1)):(a=document.createElement(`em`),a.append(j(n.slice(1,-1)))),t.append(a),r=i.index+n.length}return r<e.length&&t.append(e.slice(r)),t}function M(e){let t=0x811c9dc5;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0).toString(36)}var N={id:`2026-11-27T22:26:44`,hashes:{"1klarka":`my2huw`,"1ywjn2j":`ai2o1j`,hwt2a5:`1nydye0`,w62jed:`1kbqnsp`,"125y2bz":`vnkhor`},blocks:{"1dshqce":{summary:[[[0],[0]],[[1],[0]],[[2],[0]],[[],[]],[[3],[0]],[[4],[0]],[[5],[0]],[[6],[0]],[[7],[0]],[[8],[0]],[[9],[0]],[[10],[0]],[[11],[0]],[[12],[0]],[[13],[0]],[[14],[0]],[[15,16],[0,.4388]],[[17],[0]],[[18,19],[0,.4477]],[[20,21,22],[0,.3001,.6345]],[[23],[0]],[[24,25],[0,.502]],[[26,27],[0,.4514]],[[28],[0]],[[29],[0]],[[30],[0]],[[31],[0]],[[32],[0]],[[33],[0]],[[34,35],[0,.4884]],[[36],[0]],[[39,42],[0,.2082]],[[43],[0]],[[44],[0]],[[45],[0]],[[46],[0]],[[47],[0]]],deep:[[[],[]],[[0],[0]],[[1],[0]],[[2,3],[0,.5549]],[[4,5],[0,.559]],[[6],[0]],[[7],[0]],[[8],[0]],[[9],[0]],[[10],[0]],[[11],[0]],[[12],[0]],[[13,14],[0,.4525]],[[15],[0]],[[16,17],[0,.5256]],[[18],[0]],[[19],[0]],[[20,21],[0,.5855]],[[22],[0]],[[23,24],[0,.5135]],[[25],[0]],[[26],[0]],[[27],[0]],[[28,29,30],[0,.3562,.6795]],[[31],[0]],[[32],[0]],[[33,34],[0,.4747]],[[35,36],[0,.5322]],[[37,38,39],[0,.3251,.6139]],[[40],[0]],[[41],[0]],[[42],[0]],[[43],[0]],[[44],[0]],[[45,46],[0,.4857]],[[47],[0]],[[48],[0]],[[49,50],[0,.4265]],[[51],[0]],[[52],[0]],[[53],[0]],[[54],[0]],[[55],[0]],[[56],[0]],[[57],[0]],[[58],[0]],[[59],[0]],[[60],[0]],[[61],[0]],[[62],[0]],[[63],[0]],[[64,65],[0,.5]],[[66],[0]],[[67,68,69],[0,.3806,.6179]],[[70],[0]],[[71],[0]],[[72,73],[0,.5256]],[[74],[0]],[[75],[0]],[[76,77],[0,.5042]],[[78],[0]],[[79,80],[0,.5421]],[[81],[0]],[[82],[0]],[[83],[0]],[[84,85],[0,.5267]],[[86],[0]],[[87],[0]],[[88],[0]],[[89],[0]],[[90,91],[0,.499]],[[92],[0]],[[93],[0]],[[94],[0]],[[95],[0]],[[96],[0]],[[97],[0]],[[98],[0]],[[99],[0]],[[100],[0]],[[101],[0]],[[102],[0]]]},vf59kt:{summary:[[[0],[0]],[[1],[0]],[[2],[0]],[[3],[0]],[[4],[0]],[[5],[0]],[[6],[0]],[[7],[0]],[[8],[0]],[[9],[0]],[[10],[0]],[[11],[0]],[[12],[0]],[[13,14],[0,.5365]],[[15],[0]],[[16],[0]],[[17],[0]],[[18,19],[0,.5102]],[[20],[0]],[[21],[0]],[[22],[0]],[[23],[0]],[[24,25],[0,.4705]],[[26],[0]],[[27,28],[0,.5161]],[[29,30],[0,.5345]],[[31],[0]],[[32],[0]],[[33],[0]],[[36,39],[0,.1298]],[[40],[0]],[[41],[0]],[[42],[0]],[[43],[0]]],deep:[[[],[]],[[0],[0]],[[1],[0]],[[2],[0]],[[3],[0]],[[4],[0]],[[5],[0]],[[6],[0]],[[7],[0]],[[8],[0]],[[9],[0]],[[10],[0]],[[11],[0]],[[12],[0]],[[13],[0]],[[14],[0]],[[15],[0]],[[16],[0]],[[17,18],[0,.4754]],[[19],[0]],[[20],[0]],[[21],[0]],[[22],[0]],[[23],[0]],[[24],[0]],[[25],[0]],[[26],[0]],[[27],[0]],[[28],[0]],[[29],[0]],[[30,31],[0,.5297]],[[32,33],[0,.515]],[[34],[0]],[[35],[0]],[[36],[0]],[[37],[0]],[[38],[0]],[[39],[0]],[[40],[0]],[[41],[0]],[[42],[0]],[[43],[0]],[[44],[0]],[[45],[0]],[[46],[0]],[[47],[0]],[[48],[0]],[[49],[0]],[[50],[0]],[[51],[0]],[[52],[0]],[[53,54],[0,.5237]],[[55],[0]],[[56],[0]],[[57],[0]],[[58],[0]],[[59],[0]],[[60],[0]],[[61],[0]],[[62,63],[0,.4914]],[[64],[0]],[[65],[0]],[[66],[0]],[[67],[0]],[[68,69],[0,.4955]],[[70,71],[0,.5464]],[[72],[0]],[[73],[0]],[[74,75],[0,.5182]],[[76],[0]],[[77],[0]],[[78],[0]],[[79],[0]],[[80],[0]],[[81],[0]],[[82],[0]],[[83],[0]],[[84],[0]],[[85,86],[0,.4467]],[[87],[0]],[[88],[0]],[[89],[0]],[[90],[0]],[[91],[0]],[[92,93],[0,.5]],[[94,95],[0,.5982]],[[96],[0]],[[97],[0]],[[98],[0]],[[99],[0]],[[100,101],[0,.5193]],[[102],[0]],[[103],[0]],[[104],[0]],[[105],[0]],[[106],[0]],[[107],[0]],[[108],[0]],[[109],[0]],[[110],[0]],[[111],[0]]]},"1v0oykg":{summary:[[[0],[0]],[[1],[0]],[[2],[0]],[[3],[0]],[[4],[0]],[[5],[0]],[[6],[0]],[[7],[0]],[[8],[0]],[[9],[0]],[[10],[0]],[[11],[0]],[[12],[0]],[[13],[0]],[[14],[0]],[[15],[0]],[[16],[0]],[[17],[0]],[[18],[0]],[[19],[0]],[[20],[0]],[[21],[0]],[[22],[0]],[[23],[0]],[[24],[0]],[[25],[0]],[[26,27],[0,.5124]],[[28],[0]],[[29],[0]],[[30],[0]],[[31],[0]],[[32,33],[0,.4815]],[[34],[0]],[[35],[0]],[[36],[0]],[[37],[0]],[[40,43],[0,.1441]],[[44],[0]],[[45],[0]],[[46],[0]],[[47],[0]]],deep:[[[],[]],[[0],[0]],[[1],[0]],[[2],[0]],[[3],[0]],[[4],[0]],[[5],[0]],[[6],[0]],[[7],[0]],[[8],[0]],[[9],[0]],[[10],[0]],[[11,12],[0,.4437]],[[13],[0]],[[14],[0]],[[15],[0]],[[16],[0]],[[17],[0]],[[18],[0]],[[19],[0]],[[20],[0]],[[21],[0]],[[22],[0]],[[23,24],[0,.5036]],[[25],[0]],[[26],[0]],[[27],[0]],[[28,29],[0,.5189]],[[30],[0]],[[31,32],[0,.5308]],[[33],[0]],[[34],[0]],[[35],[0]],[[36],[0]],[[37,38],[0,.5347]],[[39],[0]],[[40],[0]],[[41],[0]],[[42],[0]],[[43],[0]],[[44],[0]],[[45],[0]],[[46,47],[0,.5324]],[[48],[0]],[[49],[0]],[[50],[0]],[[51],[0]],[[52],[0]],[[53],[0]],[[54,55],[0,.3908]],[[56,57],[0,.4934]],[[58],[0]],[[59],[0]],[[60],[0]],[[61],[0]],[[62],[0]],[[63],[0]],[[64],[0]],[[65],[0]],[[66],[0]],[[67],[0]],[[68],[0]],[[69,70],[0,.4955]],[[71,72],[0,.5472]],[[73],[0]],[[74],[0]],[[75],[0]],[[76],[0]],[[77],[0]],[[78,79],[0,.4955]],[[80],[0]],[[81,82],[0,.5493]],[[83,84],[0,.466]],[[85],[0]],[[86],[0]],[[87,88],[0,.4824]],[[89,90],[0,.4502]],[[91,92],[0,.5137]],[[93],[0]],[[94],[0]],[[95],[0]],[[96],[0]],[[97,98],[0,.457]],[[99,100,101],[0,.3245,.7065]],[[102],[0]],[[103],[0]],[[104],[0]],[[105,106],[0,.4018]],[[107],[0]],[[108],[0]],[[109],[0]],[[110],[0]],[[111],[0]],[[112],[0]],[[113,114],[0,.5092]],[[115],[0]],[[116],[0]],[[117],[0]],[[118,119],[0,.5332]],[[120],[0]],[[121],[0]],[[122],[0]],[[123],[0]],[[124],[0]],[[125,126],[0,.5854]],[[127],[0]],[[128],[0]],[[129],[0]],[[130],[0]],[[131],[0]],[[132],[0]]]},"1f8a4w":{summary:[[[0],[0]],[[1],[0]],[[2],[0]],[[3],[0]],[[4],[0]],[[5,6],[0,.4688]],[[7],[0]],[[8],[0]],[[9],[0]],[[10],[0]],[[11],[0]],[[12],[0]],[[13],[0]],[[14],[0]],[[15],[0]],[[16],[0]],[[17,18],[0,.4938]],[[19],[0]],[[20],[0]],[[21,22,23],[0,.2754,.6707]],[[24],[0]],[[25,26],[0,.5233]],[[27],[0]],[[28],[0]],[[29,30],[0,.4647]],[[31],[0]],[[32,33],[0,.4724]],[[34],[0]],[[37,40],[0,.2092]],[[41],[0]],[[42],[0]],[[43],[0]],[[44],[0]]],deep:[[[],[]],[[0],[0]],[[1],[0]],[[2],[0]],[[3],[0]],[[4],[0]],[[5],[0]],[[6],[0]],[[7],[0]],[[8],[0]],[[9],[0]],[[10],[0]],[[11,12],[0,.5142]],[[13],[0]],[[14],[0]],[[15],[0]],[[16],[0]],[[17],[0]],[[18],[0]],[[19],[0]],[[20],[0]],[[21],[0]],[[22],[0]],[[23],[0]],[[24],[0]],[[25],[0]],[[26],[0]],[[27],[0]],[[28],[0]],[[29],[0]],[[30],[0]],[[31],[0]],[[32],[0]],[[33,34],[0,.5037]],[[35],[0]],[[36],[0]],[[37],[0]],[[38],[0]],[[39],[0]],[[40],[0]],[[41,42],[0,.5303]],[[43],[0]],[[44],[0]],[[45,46],[0,.4758]],[[47],[0]],[[48],[0]],[[49,50],[0,.5819]],[[51],[0]],[[52],[0]],[[53],[0]],[[54],[0]],[[55,56],[0,.5138]],[[57],[0]],[[58],[0]],[[59],[0]],[[60],[0]],[[61],[0]],[[62],[0]],[[63,64],[0,.5974]],[[65],[0]],[[66],[0]],[[67],[0]],[[68,69],[0,.5136]],[[70],[0]],[[71],[0]],[[72],[0]],[[73],[0]],[[74,75],[0,.5086]],[[76],[0]],[[77],[0]],[[78,79],[0,.5583]],[[80,81],[0,.4922]],[[82],[0]],[[83],[0]],[[84],[0]],[[85],[0]],[[86],[0]],[[87],[0]],[[88],[0]],[[89],[0]],[[90],[0]],[[91],[0]],[[92],[0]],[[93],[0]],[[94],[0]],[[95],[0]],[[96],[0]],[[97],[0]],[[98,99],[0,.447]],[[100],[0]],[[101],[0]],[[102,103],[0,.4751]],[[104],[0]],[[105],[0]],[[106],[0]],[[107,108],[0,.4805]],[[109],[0]],[[110],[0]],[[111],[0]],[[112],[0]],[[113],[0]],[[114],[0]],[[115],[0]],[[116],[0]],[[117,118],[0,.4846]],[[119],[0]],[[120,121],[0,.478]],[[122],[0]],[[123],[0]],[[124],[0]],[[125],[0]],[[126],[0]],[[127],[0]],[[128],[0]],[[129],[0]],[[130],[0]],[[131],[0]],[[132],[0]],[[133],[0]],[[134],[0]],[[135],[0]],[[136],[0]]]},dkh8cb:{summary:[[[0],[0]],[[1],[0]],[[2],[0]],[[3],[0]],[[4],[0]],[[5],[0]],[[6],[0]],[[7],[0]],[[8],[0]],[[9],[0]],[[10],[0]],[[11,12],[0,.4897]],[[13,14],[0,.4834]],[[15],[0]],[[16,17,18],[0,.3314,.6294]],[[19],[0]],[[20,21],[0,.5499]],[[22],[0]],[[23],[0]],[[24],[0]],[[25,26],[0,.5931]],[[27],[0]],[[28],[0]],[[29],[0]],[[30],[0]],[[31,32],[0,.528]],[[33],[0]],[[34,35],[0,.5011]],[[36],[0]],[[37],[0]],[[38],[0]],[[39],[0]],[[42,45],[0,.2622]],[[46],[0]],[[47],[0]],[[48],[0]],[[49],[0]]],deep:[[[],[]],[[0],[0]],[[1],[0]],[[2],[0]],[[3],[0]],[[4],[0]],[[5],[0]],[[6],[0]],[[7],[0]],[[8],[0]],[[9,10,11],[0,.3652,.7084]],[[12],[0]],[[13],[0]],[[14],[0]],[[15],[0]],[[16],[0]],[[17],[0]],[[18,19],[0,.4792]],[[20,21],[0,.4856]],[[22],[0]],[[23],[0]],[[24],[0]],[[25],[0]],[[26],[0]],[[27],[0]],[[28],[0]],[[29,30],[0,.521]],[[31],[0]],[[32,33],[0,.5256]],[[34],[0]],[[35],[0]],[[36],[0]],[[37],[0]],[[38],[0]],[[39],[0]],[[40],[0]],[[41],[0]],[[42],[0]],[[43],[0]],[[44],[0]],[[45,46],[0,.5022]],[[47],[0]],[[48],[0]],[[49],[0]],[[50],[0]],[[51],[0]],[[52],[0]],[[53],[0]],[[54],[0]],[[55],[0]],[[56,57],[0,.5083]],[[58],[0]],[[59],[0]],[[60],[0]],[[61],[0]],[[62],[0]],[[63],[0]],[[64],[0]],[[65],[0]],[[66],[0]],[[67],[0]],[[68],[0]],[[69],[0]],[[70,71],[0,.43]],[[72],[0]],[[73],[0]],[[74],[0]],[[75],[0]],[[76],[0]],[[77],[0]],[[78],[0]],[[79],[0]],[[80],[0]],[[81],[0]],[[82],[0]],[[83],[0]],[[84],[0]],[[85],[0]],[[86],[0]],[[87],[0]],[[88],[0]],[[89],[0]]]}}},P=N.blocks,F=N.hashes;function I(e,t){let n=e.endsWith(`:deep`),r=P[M(n?e.slice(0,-5):e)]?.[n?`deep`:`summary`];if(!r||!Number.isInteger(t.block)||t.block<0||t.block>=r.length)return t;let i=t.block,a=t.off,o=r[i];if(!o||!o[0].length){let e=i-1;for(;e>=0&&(!r[e]||!r[e][0].length);)e--;if(e<0)return{...t,block:0,off:0};let n=r[e][0];return{...t,block:n[n.length-1],off:0}}let[s,c]=o,l=0;for(let e=0;e<s.length;e++)c[e]<=a+1e-9&&(l=e);let u=c[l],d=l+1<s.length?c[l+1]:1;return a=d>u?Math.min(1,Math.max(0,(a-u)/(d-u))):0,i=s[l],{...t,block:i,off:a}}function L(e){let t={};for(let[n,r]of Object.entries(e)){let e=F[n]??n;t[e]=t[e]===2||r===2?2:r}return t}async function R(){let e=`flag:migrated-cv2`;if(await i(e))return;let t=[],n=await m();for(let[e,r]of Object.entries(n)){let n=I(e,r);n!==r&&t.push([`p:`+e,n])}let r=await h();for(let[e,n]of Object.entries(r)){let r=L(n);JSON.stringify(r)!==JSON.stringify(n)&&t.push([`c:`+e,r])}t.push([e,!0]),await s(t)}async function z(e,t){await b(e,t,!0);let n=e;if(n&&typeof n==`object`&&!Array.isArray(n)&&n.cv!==2){let t={};if(n.progress&&typeof n.progress==`object`&&!Array.isArray(n.progress))for(let[e,r]of Object.entries(n.progress)){let n=r;t[e]=n&&typeof n==`object`&&typeof n.block==`number`?I(e,n):r}let r={};if(n.checks&&typeof n.checks==`object`&&!Array.isArray(n.checks))for(let[e,t]of Object.entries(n.checks))r[e]=t&&typeof t==`object`&&!Array.isArray(t)?L(t):t;e={...e,progress:n.progress===void 0?void 0:t,checks:n.checks===void 0?void 0:r}}return b(e,t)}var B=6e5,V=new Uint8Array([66,65,68,49]),H=class extends Error{constructor(){super(`BAD_KEY`),this.name=`BadKeyError`}},U=class extends Error{constructor(){super(`BAD_BLOB`),this.name=`BadBlobError`}};function W(e){let t=e instanceof Uint8Array?e:new Uint8Array(e);if(t.length<48)throw new U;for(let e=0;e<4;e++)if(t[e]!==V[e])throw new U;return{salt:Uint8Array.from(t.subarray(4,20)),iv:Uint8Array.from(t.subarray(20,32)),ct:Uint8Array.from(t.subarray(32))}}var G=e=>Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``);async function K(e,t){let n=new TextEncoder,r=await crypto.subtle.importKey(`raw`,n.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:t,iterations:B,hash:`SHA-256`},r,{name:`AES-GCM`,length:256},!1,[`decrypt`])}async function q(e,t){let{iv:n,ct:r}=W(e),i;try{i=await crypto.subtle.decrypt({name:`AES-GCM`,iv:n,additionalData:V},t,r)}catch{throw new H}let a=new Uint8Array(i);return a[0]===31&&a[1]===139&&(a=await J(a)),JSON.parse(new TextDecoder().decode(a))}async function J(e){let t=new Blob([e]).stream().pipeThrough(new DecompressionStream(`gzip`));return new Uint8Array(await new Response(t).arrayBuffer())}var Y=80,X={core:`핵심판`,deep:`깊게판`};function Z(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Q(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`)}),new class{key=null;payload=null;view=`loading`;activeTab=`shelf`;activeSlug=null;activeEdition=`core`;prefs={...l};progressMap={};checksMap={};showOnboarding=!1;hintReaderShow=!1;hintApplyShow=!1;pendingMoreExpanded=!1;applyMoreExpanded=!1;tocOpen=!1;settingsOpen=!1;guideOpen=!1;lockConfirmOpen=!1;readerSettingsOpen=!1;lockError=null;loadErrorMsg=null;importResultMsg=null;importResultIsError=!1;toastMsg=null;toastTestId=`toast`;toastTimer=null;scrollSaveTimeout=null;currentBlockIdx=0;currentOff=0;liveBlockIdx=0;liveOff=0;isRestoringScroll=!1;restoredScrollTop=0;tocPreviousBlockIdx=null;tocPreviousOff=null;shelfScrollTop=0;doingScrollTop=0;renderedViewKey=``;saveQueueMap={};modalDepth=0;modalReturnFocus=[];listenersBound=!1;linkKey=null;queuedPassphrase=null;mediaQueryDark=null;applyObserver=null;unlockInProgress=!1;sectionUpdateRaf=null;constructor(){this.setupListeners(),this.init()}setupListeners(){this.listenersBound||(this.listenersBound=!0,this.setupOfflineListener(),this.setupGlobalKeyListener(),this.setupSystemThemeListener(),window.addEventListener(`popstate`,e=>this.handlePopState(e)),window.addEventListener(`hashchange`,()=>this.handleHashChange()),window.addEventListener(`resize`,()=>this.handleResize()))}async init(){this.prefs=await f(),this.applyPrefsToDOM();let e=this.getHashKeyFromUrl();if(e&&(history.replaceState(null,``,window.location.pathname+window.location.search),this.linkKey=e),this.linkKey){await this.attemptUnlockWithPassphrase(this.linkKey);return}let t=await i(`key`);t&&t.key&&(await this.attemptUnlockWithStoredKey(t.key)||this.view===`load-error`)||(this.view=`lock`,history.replaceState({view:`lock`},``),this.render(),setTimeout(()=>{document.querySelector(`[data-testid="lock-input"]`)?.focus()},50))}commitProgress(e,t){let n=this.progressMap[e],r={...n??{pct:0,block:0,off:0,done:!1,t:0},...t,t:t.t??Date.now()};return this.progressMap[e]=r,this.serializeSave(`progress:${e}`,async()=>{await u(e,this.progressMap[e]??r)}).then(()=>void 0,t=>{throw this.progressMap[e]===r&&(n?this.progressMap[e]=n:delete this.progressMap[e]),t})}serializeSave(e,t){let n=(this.saveQueueMap[e]||Promise.resolve()).then(t,t);return this.saveQueueMap[e]=n,n}setupSystemThemeListener(){`matchMedia`in window&&(this.mediaQueryDark=window.matchMedia(`(prefers-color-scheme: dark)`),this.mediaQueryDark.addEventListener(`change`,()=>{this.prefs.theme===`system`&&this.applyPrefsToDOM()}))}setupGlobalKeyListener(){window.addEventListener(`keydown`,e=>{e.key===`Tab`?this.handleModalTab(e):e.key===`Escape`&&(this.lockConfirmOpen||this.guideOpen||this.settingsOpen||this.readerSettingsOpen||this.tocOpen&&window.innerWidth<880)&&history.back()})}setupOfflineListener(){let e=()=>{let e=document.querySelector(`[data-testid="offline-indicator"]`);navigator.onLine?e&&e.remove():e||(e=document.createElement(`div`),e.className=`offline-indicator`,e.setAttribute(`data-testid`,`offline-indicator`),e.textContent=`오프라인 상태입니다 (저장된 내용으로 읽는 중)`,document.body.prepend(e))};window.addEventListener(`online`,e),window.addEventListener(`offline`,e),e()}getHashKeyFromUrl(){let e=window.location.hash;if(e&&e.includes(`key=`)){let t=e.match(/key=([^&]+)/);if(t&&t[1])return decodeURIComponent(t[1])}return null}async handleHashChange(){let e=this.getHashKeyFromUrl();e&&(history.replaceState(null,``,window.location.pathname+window.location.search),this.linkKey=e,await this.attemptUnlockWithPassphrase(e))}runQueuedPassphrase(){let e=this.queuedPassphrase;this.queuedPassphrase=null,e&&this.attemptUnlockWithPassphrase(e)}async attemptUnlockWithPassphrase(e){if(this.unlockInProgress)return this.queuedPassphrase=e,!1;this.unlockInProgress=!0,this.view=`loading`,this.lockError=null,this.loadErrorMsg=null,this.render();try{let t=await fetch(`./data.enc`,{cache:`no-cache`});if(!t.ok)throw Error(`NETWORK_ERROR`);let n=await t.arrayBuffer(),r=W(n),o=await K(e,r.salt),s=await q(n,o);return await a(`key`,{key:o,salt:G(r.salt)}),this.key=o,this.payload=s,await R(),await this.loadUserData(),await i(`flag:welcome`)||(this.showOnboarding=!0),this.view=`main`,this.unlockInProgress=!1,this.linkKey=null,history.replaceState({view:`main`,tab:`shelf`},``),this.render(),this.runQueuedPassphrase(),!0}catch(e){return this.unlockInProgress=!1,e instanceof H?(this.linkKey=null,this.lockError=`열쇠가 올바르지 않습니다. 다시 확인하고 입력해 주세요.`,this.view=`lock`):(this.loadErrorMsg=`연결 상태를 확인하고 다시 시도해 주세요.`,this.view=`load-error`),this.render(),this.view===`lock`&&setTimeout(()=>{document.querySelector(`[data-testid="lock-input"]`)?.focus()},50),this.runQueuedPassphrase(),!1}}async attemptUnlockWithStoredKey(e){if(this.unlockInProgress)return!1;this.unlockInProgress=!0,this.view=`loading`,this.render();try{let t=await fetch(`./data.enc`,{cache:`no-cache`});if(!t.ok)throw Error(`NETWORK_ERROR`);let n=await q(await t.arrayBuffer(),e);return this.key=e,this.payload=n,await R(),await this.loadUserData(),await i(`flag:welcome`)||(this.showOnboarding=!0),this.view=`main`,this.unlockInProgress=!1,history.replaceState({view:`main`,tab:`shelf`},``),this.render(),this.runQueuedPassphrase(),!0}catch(e){return this.unlockInProgress=!1,e instanceof H?(await o(`key`),this.lockError=`저장된 열쇠가 새 데이터와 맞지 않습니다. 열쇠를 다시 입력해 주세요.`,this.view=`lock`,this.render(),setTimeout(()=>{document.querySelector(`[data-testid="lock-input"]`)?.focus()},50)):(this.loadErrorMsg=`연결 상태를 확인하고 다시 시도해 주세요.`,this.view=`load-error`,this.render()),this.runQueuedPassphrase(),!1}}async loadUserData(){this.progressMap=await m(),this.checksMap=await h(),this.prefs=await f(),this.applyPrefsToDOM()}applyPrefsToDOM(){let e=document.documentElement;if(e.style.setProperty(`--reader-font-size`,`${this.prefs.fontSize}px`),e.style.setProperty(`--reader-line-height`,`${this.prefs.lineHeight}`),e.setAttribute(`data-font`,this.prefs.font),this.prefs.theme===`system`){e.removeAttribute(`data-theme`);let t=window.matchMedia(`(prefers-color-scheme: dark)`).matches;this.updateMetaThemeColor(t?`#121211`:`#FAF8F6`)}else e.setAttribute(`data-theme`,this.prefs.theme),this.updateMetaThemeColor(this.prefs.theme===`dark`?`#121211`:`#FAF8F6`)}updateMetaThemeColor(e){let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,e)}getFontSizeLabel(e){return e<=15?`작게`:e>=20?`크게`:`보통`}getLineHeightLabel(e){return e<=1.5?`좁게`:e>=2?`넉넉하게`:`보통`}flushPendingScrollSave(){if(this.scrollSaveTimeout!==null){window.clearTimeout(this.scrollSaveTimeout),this.scrollSaveTimeout=null;let e=document.querySelector(`.reader-body-wrapper`);if(e&&this.activeSlug&&!this.isRestoringScroll){let t=this.activeEdition===`core`?this.activeSlug:`${this.activeSlug}:deep`;return this.saveCurrentReadingProgress(e,t)}}return Promise.resolve()}async waitForSaves(){await Promise.allSettled(Object.values(this.saveQueueMap))}restoreScrollToBlock(e,t,n,r=Y){let i=e.querySelector(`[data-block="${t}"]`);if(!i)return;let a=e.getBoundingClientRect(),o=i.getBoundingClientRect(),s=o.top-(a.top+r)+n*o.height;e.scrollTop+=s}handlePopState(e){if(this.lockConfirmOpen){this.lockConfirmOpen=!1,this.renderModalsOnly();return}if(this.guideOpen){this.guideOpen=!1,this.renderModalsOnly();return}if(this.settingsOpen){this.settingsOpen=!1,this.renderModalsOnly(),this.restoreMainScrollTop();return}if(this.readerSettingsOpen){this.readerSettingsOpen=!1,this.renderModalsOnly();return}if(this.tocOpen&&window.innerWidth<880){this.tocOpen=!1,this.render();return}if(this.view===`loading`||this.view===`load-error`||this.view===`lock`)return;let t=e.state;if(t&&t.cover){history.back();return}if(t&&t.view===`reader`&&t.slug){let e=t.ed===`deep`?`deep`:`core`;if(this.view===`reader`&&this.activeSlug===t.slug&&this.activeEdition===e)return;this.view===`reader`&&this.flushPendingScrollSave(),this.activeSlug=t.slug,this.activeEdition=e,this.view=`reader`,this.tocOpen=!1,this.tocPreviousBlockIdx=null,this.tocPreviousOff=null,this.render();return}let n=t&&t.tab===`doing`?`doing`:`shelf`;this.view===`reader`?(this.flushPendingScrollSave(),this.view=`main`,this.activeSlug=null,this.tocOpen=!1,this.tocPreviousBlockIdx=null,this.tocPreviousOff=null,this.activeTab=n,this.render()):this.activeTab!==n&&(this.saveMainScrollTop(),this.activeTab=n,this.render())}pushCoverState(){history.pushState({cover:!0},``)}handleResize(){this.restoreLiveAnchor()}restoreLiveAnchor(){if(this.view===`reader`&&this.activeSlug){let e=document.querySelector(`.reader-body-wrapper`);e&&this.liveBlockIdx>=0&&(this.scrollSaveTimeout!==null&&(window.clearTimeout(this.scrollSaveTimeout),this.scrollSaveTimeout=null),this.isRestoringScroll=!0,this.restoreScrollToBlock(e,this.liveBlockIdx,this.liveOff),this.restoredScrollTop=e.scrollTop,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.isRestoringScroll=!1})}))}}getContinuingBook(){if(!this.payload)return null;let e=null,t=`core`,n=-1;for(let r of this.payload.books){if(!r.has_summary)continue;let i=this.progressMap[r.slug],a=this.progressMap[`${r.slug}:deep`];if((i?.done??!1)||(a?.done??!1))continue;let o=i&&(i.pct>0||i.block>0||i.off>0),s=a&&(a.pct>0||a.block>0||a.off>0);o&&i.t>n&&(n=i.t,e=r,t=`core`),s&&a.t>n&&(n=a.t,e=r,t=`deep`)}return e?{book:e,edition:t}:null}getBookStatus(e){if(!e.has_summary)return{state:`pending`,text:`요약 대기`,activeEdition:`core`};let t=this.progressMap[e.slug],n=this.progressMap[`${e.slug}:deep`];if((t?.done??!1)||(n?.done??!1))return{state:`done`,text:`다 읽음`,activeEdition:`core`};let r=t&&(t.pct>0||t.block>0||t.off>0)?t.t:-1,i=n&&(n.pct>0||n.block>0||n.off>0)?n.t:-1;if(r<0&&i<0)return{state:`unread`,text:`안 읽음`,activeEdition:`core`};let a=i>r?`deep`:`core`,o=a===`deep`?n:t,s=A(a===`deep`&&e.deep?e.deep:e.summary),c=`시작 부분`;if(o)for(let e=0;e<=Math.min(o.block,s.length-1);e++){let t=s[e];t&&t.t===`h`&&t.level===2&&(c=k(t.text).title)}return{state:`reading`,text:`읽는 중 · ${X[a]} · ${c}`,sectionName:c,activeEdition:a,editionLabel:X[a]}}getActionItemsForBook(e){if(!e.has_summary||!e.summary)return[];let t=A(e.summary),n=[],r=!1;return t.forEach((e,t)=>{e.t===`h`&&e.level===2?r=e.text.includes(`적용`):e.t===`h`&&e.level===2&&r&&(r=!1),r&&e.t===`ul`&&e.items.forEach(e=>{n.push({blockIndex:t,hash:M(e.text),itemText:e.text})})}),n}getAllDoingItems(){if(!this.payload)return[];let e=[];for(let t of this.payload.books){if(!t.has_summary)continue;let n=this.getActionItemsForBook(t),r=this.checksMap[t.slug]||{};for(let i of n)r[i.hash]===1&&e.push({bookSlug:t.slug,bookTitle:t.title_ko,itemText:i.itemText,hash:i.hash,blockIndex:i.blockIndex})}return e}async openBook(e,t=`core`,n){this.saveMainScrollTop(),this.activeSlug=e,this.activeEdition=t,this.view=`reader`,this.tocOpen=!1,this.tocPreviousBlockIdx=null,this.tocPreviousOff=null;let r=t===`core`?e:`${e}:deep`;if(this.progressMap[r]&&this.commitProgress(r,{}).catch(()=>{}),await i(`flag:hint-reader`)?this.hintReaderShow=!1:(this.hintReaderShow=!0,await a(`flag:hint-reader`,!0)),history.pushState({view:`reader`,slug:e,ed:t},``),this.render(),n){let t=e;setTimeout(()=>{if(this.view!==`reader`||this.activeSlug!==t)return;this.applyMoreExpanded=!0;let e=document.querySelector(`.apply-more-container`);if(e){e.removeAttribute(`hidden`);let t=document.querySelector(`[data-testid="apply-more"]`);t&&t.setAttribute(`aria-expanded`,`true`)}let r=document.querySelector(`.reader-body-wrapper`);if(r){let e=r.querySelector(`[data-testid="apply-item"][data-hash="${n}"]`);if(e){r.scrollTop=e.offsetTop-60,e.classList.add(`item-highlight`),e.focus();let t=()=>e.classList.remove(`item-highlight`);window.setTimeout(t,2600),e.addEventListener(`blur`,t,{once:!0})}}},80)}}showToast(e,t=`toast`){this.toastMsg=e,this.toastTestId=t,this.toastTimer!==null&&window.clearTimeout(this.toastTimer),this.renderToast(),this.toastTimer=window.setTimeout(()=>{this.toastMsg=null,this.toastTimer=null,this.renderToast()},3e3)}renderToast(){let e=document.querySelector(`.toast`);this.toastMsg?(e||(e=document.createElement(`div`),e.className=`toast`,e.setAttribute(`role`,`status`),document.body.appendChild(e)),e.setAttribute(`data-testid`,this.toastTestId),e.textContent=this.toastMsg):e&&e.remove()}async updateActionState(e,t,n){let r=this.checksMap[e]?.[t],i={...this.checksMap[e]||{}};n===0?delete i[t]:i[t]=n,this.checksMap[e]=i;try{if(await this.serializeSave(`checks:${e}`,async()=>{await d(e,this.checksMap[e]||{})}),this.renderedViewKey=``,n===0?this.showToast(`원래대로 되돌렸습니다.`):n===1?this.showToast(`「해보는 중」에 담았습니다. '지금 해보는 중' 탭에서 확인해보세요.`):n===2&&this.showToast(`「해봤어요」로 완료 처리했습니다.`),this.activeTab===`doing`)this.render();else{let r=document.querySelector(`[data-testid="apply-item"][data-hash="${t}"]`);if(r){r.setAttribute(`data-state`,String(n));let i=r.querySelector(`.apply-item-actions`);i&&(i.innerHTML=this.renderApplyButtonsHTML(n),this.bindApplyItemButtons(r,e,t))}}}catch{let i={...this.checksMap[e]||{}};(i[t]??0)===n&&(r?i[t]=r:delete i[t],this.checksMap[e]=i),this.showToast(`저장하지 못했어요. 다시 눌러 주세요.`,`toast`)}}async toggleMarkDone(){if(!this.activeSlug)return;this.flushPendingScrollSave();let e=this.activeEdition===`core`?this.activeSlug:`${this.activeSlug}:deep`,t=!(this.progressMap[e]?.done??!1);try{await this.commitProgress(e,{done:t}),this.showToast(t?`다 읽음으로 표시했습니다.`:`다 읽음 표시를 해제했습니다.`)}catch{this.showToast(`저장하지 못했어요. 다시 눌러 주세요.`)}this.renderedViewKey=``,this.render()}async updatePref(e,t){let n=this.prefs[e];this.prefs={...this.prefs,[e]:t};try{await this.serializeSave(`prefs`,async()=>{await p(this.prefs)});let t=this.view===`reader`?document.querySelector(`.reader-body-wrapper`):null;t&&this.updateLiveScrollPosition(t),this.applyPrefsToDOM(),this.afterPrefChange(e)}catch{this.prefs[e]===t&&(this.prefs={...this.prefs,[e]:n}),this.applyPrefsToDOM(),this.showToast(`저장하지 못했어요. 다시 눌러 주세요.`)}}afterPrefChange(e){this.renderedViewKey=this.computeViewKey(),this.view===`reader`&&(e===`showPages`&&this.repopulateReaderBody(),e!==`theme`&&this.restoreLiveAnchor()),(this.settingsOpen||this.readerSettingsOpen)&&this.renderModalsOnly()}repopulateReaderBody(){let e=document.querySelector(`[data-testid="reader-body"]`);e&&(e.querySelectorAll(`p[data-block], [data-li], [data-quote-p], .apply-item-content`).forEach(e=>e.replaceChildren()),this.populateReaderBodyContent(!1))}async handleExport(){let e=await g(),t=JSON.stringify(e,null,2),n=new Blob([t],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`jaeyun-seojae-backup-${new Date().toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(r)}async handleImportFile(e){try{let t=await e.text(),n=await z(JSON.parse(t),new Set(this.payload?.books.map(e=>e.slug)||[]));await this.loadUserData(),this.renderedViewKey=``;let r=`복원 완료: 읽던 자리 ${n.books}권(${n.progress}곳), 실천 항목 ${n.checks}건을 불러왔습니다.`;n.skipped>0&&(r+=` (${n.skipped}건 제외됨)`),this.importResultMsg=r,this.importResultIsError=!1}catch(e){this.importResultMsg=`가져오기 실패: ${e.message}`,this.importResultIsError=!0}this.render()}async confirmLockApp(){try{await this.flushPendingScrollSave()}catch{}await this.waitForSaves(),await o(`key`),this.key=null,this.payload=null,this.view=`lock`,this.lockConfirmOpen=!1,this.settingsOpen=!1,this.guideOpen=!1,this.readerSettingsOpen=!1,this.tocOpen=!1,this.activeSlug=null,this.activeTab=`shelf`,this.showOnboarding=!1,this.lockError=null,history.replaceState({view:`lock`},``),this.render()}saveMainScrollTop(){if(this.view===`main`){let e=document.querySelector(`.shelf-container`);e&&(this.shelfScrollTop=e.scrollTop);let t=document.querySelector(`.doing-container`);t&&(this.doingScrollTop=t.scrollTop)}}restoreMainScrollTop(){if(this.view===`main`){let e=()=>{let e=document.querySelector(`.shelf-container`);e&&this.shelfScrollTop>0&&(e.scrollTop=this.shelfScrollTop);let t=document.querySelector(`.doing-container`);t&&this.doingScrollTop>0&&(t.scrollTop=this.doingScrollTop)};e(),requestAnimationFrame(e)}}topOverlay(){let e=document.getElementById(`modal-layer`);if(!e)return null;let t=e.querySelectorAll(`.modal-overlay`);return t.length?t[t.length-1]:null}focusablesIn(e){return Array.from(e.querySelectorAll(`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`)).filter(e=>!e.disabled&&!e.hasAttribute(`hidden`)&&!e.closest(`[inert]`))}handleModalTab(e){let t=this.topOverlay();if(!t)return;let n=this.focusablesIn(t);if(n.length===0){e.preventDefault(),t.focus();return}let r=n[0],i=n[n.length-1],a=document.activeElement;!a||!t.contains(a)?(e.preventDefault(),(e.shiftKey?i:r).focus()):e.shiftKey&&a===r?(e.preventDefault(),i.focus()):!e.shiftKey&&a===i&&(e.preventDefault(),r.focus())}findByTestId(e,t){return e.querySelector(`[data-testid="${t}"]`)}syncModalFocus(e,t,n,r){let i=document.getElementById(`modal-layer`),a=i?Array.from(i.querySelectorAll(`.modal-overlay`)):[],o=a.length;a.forEach((e,t)=>{t<o-1&&(e.setAttribute(`inert`,``),e.setAttribute(`aria-hidden`,`true`))});let s=a[o-1]||null;if(o>e){for(let i=e;i<o;i++)this.modalReturnFocus.push(n?r:t);if(s){let e=this.focusablesIn(s)[0];e?e.focus():s.focus()}}else if(o<e){let t=null;for(let n=o;n<e;n++)t=this.modalReturnFocus.pop()??null;this.modalReturnFocus.length=Math.min(this.modalReturnFocus.length,o);let n=null;typeof t==`string`?n=s&&this.findByTestId(s,t)||this.findByTestId(document,t):t&&document.contains(t)&&(n=t),n||=document.querySelector(`[data-testid="settings-open"], [data-testid="reader-settings"]`),n?.focus()}else if(o>0&&s){if(n&&r){let e=this.findByTestId(s,r);e&&e.focus()}else s.contains(document.activeElement)||this.focusablesIn(s)[0]?.focus()}this.modalDepth=o}renderModalsOnly(){let e=document.getElementById(`modal-layer`);if(!e){this.render();return}let t=document.activeElement,n=t?.getAttribute(`data-testid`)??null,r=!!t&&e.contains(t),i=this.modalDepth,a=e.querySelector(`.modal-overlay:last-child .modal-body`)?.scrollTop??0;if(e.innerHTML=`
      ${this.settingsOpen?this.renderSettingsModal():``}
      ${this.guideOpen?this.renderGuideModal():``}
      ${this.lockConfirmOpen?this.renderLockConfirmModal():``}
      ${this.readerSettingsOpen?this.renderReaderSettingsPanel():``}
    `,this.bindSettingsEvents(),this.syncModalFocus(i,t,r,n),a>0){let t=e.querySelector(`.modal-overlay:last-child .modal-body`);t&&(t.scrollTop=a)}}computeViewKey(){let e=this.activeSlug?this.progressMap[this.activeEdition===`core`?this.activeSlug:`${this.activeSlug}:deep`]?.done??!1:!1;return`${this.view}_${this.activeTab}_${this.activeSlug}_${this.activeEdition}_${this.pendingMoreExpanded}_${this.applyMoreExpanded}_${this.tocOpen}_${this.prefs.showPages}_${this.prefs.fontSize}_${this.prefs.lineHeight}_${this.prefs.font}_${this.prefs.theme}_${this.showOnboarding}_${this.hintReaderShow}_${this.hintApplyShow}_${this.tocPreviousBlockIdx!==null}_${e}_${JSON.stringify(this.checksMap).length}_${JSON.stringify(this.progressMap).length}`}render(){let e=document.getElementById(`app`);if(!e)return;if((this.view===`loading`||this.view===`load-error`||this.view===`lock`)&&(this.modalDepth=0,this.modalReturnFocus=[]),this.view===`loading`){this.renderedViewKey=`loading`,e.innerHTML=`
        <div class="loading-view" data-testid="loading">
          <div class="loading-text">여는 중...</div>
        </div>
      `;return}if(this.view===`load-error`){this.renderedViewKey=`load-error`,e.innerHTML=`
        <div class="load-error-view">
          <div class="load-error-card" data-testid="load-error">
            <h2 class="load-error-title">서재를 열 수 없습니다</h2>
            <p class="load-error-desc">${Q(this.loadErrorMsg||`연결 상태를 확인하고 다시 시도해 주세요.`)}</p>
            <button class="action-btn" data-testid="retry">다시 시도</button>
          </div>
        </div>
      `,e.querySelector(`[data-testid="retry"]`)?.addEventListener(`click`,()=>{this.init()});return}if(this.view===`lock`){this.renderedViewKey=`lock`,e.innerHTML=this.renderLockView(),this.bindLockEvents();return}let t=this.computeViewKey(),n=document.activeElement,r=n?.getAttribute(`data-testid`),i=document.getElementById(`modal-layer`),a=!!n&&!!i&&i.contains(n),o=this.modalDepth;this.renderedViewKey===t?this.renderModalsOnly():(this.renderedViewKey=t,this.view===`main`?(e.innerHTML=`
        <div id="main-root" style="width:100%;height:100%;display:flex;flex-direction:column;">
          ${this.renderHeader()}
          ${this.renderMainBody()}
        </div>
        <div id="modal-layer">
          ${this.settingsOpen?this.renderSettingsModal():``}
          ${this.guideOpen?this.renderGuideModal():``}
          ${this.lockConfirmOpen?this.renderLockConfirmModal():``}
        </div>
      `,this.bindMainEvents(),this.restoreMainScrollTop(),this.syncModalFocus(o,n,a,r??null),r&&!a&&this.modalDepth===0&&e.querySelector(`[data-testid="${r}"]`)?.focus()):this.view===`reader`&&this.activeSlug&&(e.innerHTML=`
        <div id="main-root" style="width:100%;height:100%;display:flex;flex-direction:column;">
          ${this.renderReaderView()}
        </div>
        <div id="modal-layer">
          ${this.settingsOpen?this.renderSettingsModal():``}
          ${this.guideOpen?this.renderGuideModal():``}
          ${this.lockConfirmOpen?this.renderLockConfirmModal():``}
          ${this.readerSettingsOpen?this.renderReaderSettingsPanel():``}
        </div>
      `,this.bindReaderEvents(),this.syncModalFocus(o,n,a,r??null),r&&!a&&this.modalDepth===0&&e.querySelector(`[data-testid="${r}"]`)?.focus()))}renderLockView(){return`
      <div class="lock-view">
        <div class="lock-card">
          <h1 class="lock-title">재윤 서재</h1>
          <p class="lock-subtitle">하루 한 권 읽고 하나 해 보는 개인 독서 공간<br/>처음 받은 열쇠 링크를 다시 열거나 받은 열쇠를 입력해 주세요.</p>
          <form class="lock-form" id="lock-form">
            <div class="lock-field">
              <label class="lock-label" for="lock-input-field">서재 열쇠</label>
              <input id="lock-input-field" type="password" class="lock-input" data-testid="lock-input" placeholder="열쇠 입력" ${this.lockError?`aria-describedby="lock-error-text"`:``} required autofocus />
            </div>
            <button type="submit" class="lock-submit" data-testid="lock-submit">서재 열기</button>
          </form>
          ${this.lockError?`<div id="lock-error-text" class="lock-error" data-testid="lock-error" role="alert">${Q(this.lockError)}</div>`:``}
        </div>
      </div>
    `}bindLockEvents(){let e=document.getElementById(`lock-form`);e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=e.querySelector(`[data-testid="lock-input"]`);n&&n.value.trim()&&await this.attemptUnlockWithPassphrase(n.value.trim())})}renderHeader(){return`
      <header class="app-header">
        <div class="brand-title">재윤 서재</div>
        <div class="header-actions">
          <button class="icon-btn" data-testid="settings-open" aria-label="서재 설정 열기">⚙️</button>
        </div>
      </header>
    `}renderMainBody(){let e=this.getAllDoingItems();return`
      <div class="app-body">
        <div class="tab-bar" role="tablist">
          <button class="tab-btn" data-testid="tab-shelf" role="tab" aria-selected="${this.activeTab===`shelf`}">책장</button>
          <button class="tab-btn" data-testid="tab-doing" role="tab" aria-selected="${this.activeTab===`doing`}">지금 해보는 중</button>
        </div>
        ${this.activeTab===`shelf`?this.renderShelf():this.renderDoingList(e)}
      </div>
    `}renderShelf(){if(!this.payload)return``;let e=this.getContinuingBook(),t=[],n=[];this.payload.books.forEach(e=>{e.has_summary?t.push(e):n.push(e)}),t.sort((e,t)=>{let n=this.getBookStatus(e).state,r=this.getBookStatus(t).state,i={reading:1,unread:2,done:3,pending:4};return i[n]===i[r]?e.rank-t.rank:i[n]-i[r]});let r={};n.forEach(e=>{r[e.area]||(r[e.area]=[]),r[e.area].push(e)});let i=Object.keys(r).sort();return`
      <div class="shelf-container" data-testid="shelf">
        <div class="shelf-wrapper">
          ${this.showOnboarding?this.renderOnboardingCard():``}
          ${e?this.renderContinueCard(e):``}

          <div class="books-grid">
            ${t.map(e=>this.renderBookCardHTML(e)).join(``)}
          </div>

          <div class="pending-section">
            <button class="pending-toggle" data-testid="pending-toggle" aria-expanded="${this.pendingMoreExpanded}">
              ${this.pendingMoreExpanded?`요약 대기 중인 책 접기`:`요약 대기 중인 책 보기`}
            </button>
            ${this.pendingMoreExpanded?`
              <div class="pending-list-wrapper">
                ${i.map(e=>`
                  <div class="pending-area-group" data-area="${Z(e)}">
                    <h4 class="pending-area-title" data-testid="area" data-area="${Z(e)}">${Q(e)}</h4>
                    <div class="books-grid">
                      ${r[e].sort((e,t)=>e.rank-t.rank).map(e=>this.renderBookCardHTML(e)).join(``)}
                    </div>
                  </div>
                `).join(``)}
              </div>
            `:``}
          </div>
        </div>
      </div>
    `}renderContinueCard(e){let t=this.getBookStatus(e.book),n=t.state===`reading`?`${X[e.edition]} · ${t.sectionName||`시작 부분`}`:X[e.edition];return`
      <button class="continue-card" data-testid="continue" data-slug="${Z(e.book.slug)}" aria-label="${Z(`이어서 읽기: ${e.book.title_ko}, ${n}`)}">
        <span class="continue-text">
          <span class="continue-label">이어서 읽기</span>
          <span class="continue-title">${Q(e.book.title_ko)}</span>
          <span class="continue-where" data-testid="continue-where">${Q(n)}</span>
        </span>
        <span class="continue-go" aria-hidden="true">열기 →</span>
      </button>
    `}renderOnboardingCard(){return`
      <div class="onboarding-card" data-testid="onboarding">
        <button class="onboarding-close-btn" data-testid="onboarding-close" aria-label="안내 닫기">✕</button>
        <h2 class="onboarding-title">재윤 서재에 오신 것을 환영합니다</h2>
        <ol class="onboarding-list">
          <li>재윤에 맞춰 다시 쓴 책 요약을 하루 한 권 읽고 하나 실천해보는 공간입니다.</li>
          <li>읽을 수 있는 핵심 요약 도서가 책장 상단에 먼저 배치되어 있습니다.</li>
          <li>핵심판(약 1만 자)과 깊게판(2만~3만 자) 중 원하는 길이를 골라 읽으세요.</li>
          <li>적용 구역에서 하나 골라 「이걸 해보기」를 누르면 「지금 해보는 중」 탭에 모이고, 마치면 「해봤어요」로 바꿉니다. 안 해도 표시나 불이익은 없습니다.</li>
          <li>읽던 자리는 자동으로 저장됩니다. 오프라인 읽기는 한 번 연결해 저장된 뒤부터 되고, 크롬 메뉴의 「홈 화면에 추가」로 앱처럼 열 수 있습니다.</li>
        </ol>
        <div class="onboarding-actions">
          <button class="action-btn" data-testid="onboarding-start">지금 읽기 시작하기</button>
        </div>
      </div>
    `}renderBookCardHTML(e){let t=this.getBookStatus(e),n=e.why?O(e.why).text:``;return`
      <button class="book-card" data-testid="book-card" data-slug="${Z(e.slug)}" data-state="${t.state}" data-area="${Z(e.area)}">
        <div class="book-header">
          <h3 class="book-title">${Q(e.title_ko)}</h3>
          <div class="book-author">${Q(e.author)}</div>
        </div>
        ${n?`
          <div class="book-why-label">읽는 이유</div>
          <div class="book-why" data-testid="book-why">${Q(n)}</div>
        `:``}
        <div class="book-footer">
          <span class="book-area-badge">${Q(e.area)}</span>
          <span class="book-status-badge" data-testid="book-status">${Q(t.text)}</span>
          ${t.state===`pending`?``:`<span class="book-open-hint" aria-hidden="true">열기 ›</span>`}
        </div>
      </button>
    `}renderDoingList(e){let t=this.getContinuingBook(),n=t?t.book:this.payload?.books.find(e=>e.has_summary);return`
      <div class="doing-container">
        <div class="doing-wrapper" data-testid="doing-list">
          ${e.length===0?`
            <div class="doing-empty" data-testid="doing-empty">
              <span>아직 해보는 중인 것이 없어요.<br/>읽다가 마음에 드는 걸 「이걸 해보기」로 담아 보세요.</span>
              ${n?`
                <button class="action-btn" id="go-apply-from-empty" data-slug="${Z(n.slug)}">
                  ${Q(n.title_ko)} 적용 구역으로 이동
                </button>
              `:``}
            </div>
          `:e.map(e=>`
            <div class="doing-item-card">
              <button class="doing-item-btn" data-testid="doing-item" data-slug="${Z(e.bookSlug)}" data-hash="${Z(e.hash)}">
                <span class="doing-item-book">${Q(e.bookTitle)}</span>
                <span class="doing-item-text" data-doing-text="${Z(e.hash)}"></span>
                <span class="doing-item-more" aria-hidden="true">책에서 보기 ›</span>
              </button>
              <button class="doing-done-btn" data-testid="doing-done" data-slug="${Z(e.bookSlug)}" data-hash="${Z(e.hash)}">해봤어요</button>
            </div>
          `).join(``)}
        </div>
      </div>
    `}getCurrentSectionIndex(e){let t=-1;for(let n=0;n<e.length;n++){let r=e[n];r&&r.t===`h`&&(r.level===2||r.level===3)&&n<=this.liveBlockIdx&&(t=n)}return t}renderReaderView(){if(!this.payload||!this.activeSlug)return``;let e=this.payload.books.find(e=>e.slug===this.activeSlug);if(!e)return``;let t=this.activeEdition===`deep`,n=A(t?e.deep||``:e.summary),r=t?`${e.slug}:deep`:e.slug,i=this.progressMap[r]?.done??!1,o=!1;!t&&e.has_summary&&(o=n.some(e=>e.t===`h`&&e.level===2&&e.text.includes(`적용`)));let s=this.getBookStatus(e),c=this.getCurrentSectionIndex(n),l=!1,u=!1,d=!1;return`
      <div class="reader-view" data-testid="reader">
        <header class="reader-header">
          <div class="reader-nav-left">
            <button class="icon-btn" data-testid="back" aria-label="책장으로 돌아가기">←</button>
            <h1 class="reader-title" data-testid="reader-title">${Q(e.title_ko)}</h1>
            <div class="version-toggle">
              <button class="ver-btn ${t?``:`active`}" data-testid="ver-core" aria-label="핵심판 읽기" aria-pressed="${!t}">핵심</button>
              ${e.deep?`<button class="ver-btn ${t?`active`:``}" data-testid="ver-deep" aria-label="깊게판 읽기" aria-pressed="${t}">깊게</button>`:``}
            </div>
          </div>
          <div class="reader-actions">
            ${o?`<button class="reader-btn-text" data-testid="apply-jump" aria-label="적용 구역으로 이동">적용</button>`:``}
            <button class="reader-btn-text" data-testid="toc-open" aria-label="목차 열기" aria-expanded="${this.tocOpen}" aria-controls="toc-drawer">목차</button>
            <button class="reader-btn-text mark-done-btn" data-testid="mark-done" aria-label="다 읽음 표시 전환" aria-pressed="${i}">
              ${i?`✓완료`:`완료`}
            </button>
            <button class="reader-btn-text" data-testid="reader-settings" aria-label="본문 설정 열기">설정</button>
          </div>
        </header>

        <div class="reader-section" data-testid="reader-section">
          ${Q(s.sectionName||`시작 부분`)}
        </div>

        <div class="reader-main ${this.tocOpen?`wide-with-toc`:``}">
          <div class="reader-body-wrapper">
            <main class="reader-body" data-testid="reader-body">
              ${this.hintReaderShow?`
                <div class="hint-banner" data-testid="hint" data-hint="reader">
                  <span>핵심판과 깊게판을 골라 읽을 수 있고, 읽던 자리는 자동으로 저장됩니다. 「목차」로 구역을 바로 옮겨 갈 수 있어요.</span>
                  <button class="hint-close-btn" data-testid="hint-close">확인</button>
                </div>
              `:``}

              ${n.map((n,r)=>{if(n.t===`h`&&n.level===2&&(l=!t&&n.text.includes(`적용`)),l&&n.t===`ul`){let t=!u;u=!0;let i=this.hintApplyShow&&!d;return i&&(d=!0,this.hintApplyShow=!1,a(`flag:hint-apply`,!0)),`
                    ${i?`
                      <div class="hint-banner" data-testid="hint" data-hint="apply">
                        <span>실천할 항목 하나를 고르고 「이걸 해보기」를 눌러보세요. 고른 항목은 「지금 해보는 중」 탭에 모입니다.</span>
                        <button class="hint-close-btn" data-testid="hint-close">확인</button>
                      </div>
                    `:``}
                    <div class="apply-section-block" data-block="${r}">
                      ${t?`
                        ${n.items.map(t=>this.renderApplyItemHTML(e.slug,t.text,!0)).join(``)}
                      `:`
                        <button class="apply-more" data-testid="apply-more" aria-expanded="${this.applyMoreExpanded}">
                          ${this.applyMoreExpanded?`다른 적용 거리 접기`:`다른 적용 거리 더보기`}
                        </button>
                        <div class="apply-more-container" ${this.applyMoreExpanded?``:`hidden`}>
                          ${n.items.map(t=>this.renderApplyItemHTML(e.slug,t.text,!1)).join(``)}
                        </div>
                      `}
                    </div>
                  `}return this.renderBlockHTML(n,r)}).join(``)}

              <div class="reader-end-actions">
                <button class="mark-done-end-btn" data-testid="mark-done-end">
                  ${i?`✓ 다 읽음 표시 됨 (눌러서 해제)`:`다 읽음으로 표시`}
                </button>
                <div class="end-action-group">
                  ${o?`<button class="end-action-btn" data-testid="end-apply">적용 하나 골라 보기</button>`:``}
                  ${e.deep?`
                    <button class="end-action-btn" data-testid="end-deep">
                      ${t?`핵심판 적용하기로`:`깊게판으로 더 읽기`}
                    </button>
                  `:``}
                </div>
              </div>
            </main>
          </div>

          ${this.tocPreviousBlockIdx===null?``:`
            <button class="toc-back-floating-btn" data-testid="toc-back" aria-label="이전 위치로 돌아가기">
              ← 이전 위치로
            </button>
          `}

          <aside id="toc-drawer" class="toc-drawer ${this.tocOpen?`open`:``}" ${window.innerWidth>=880?`data-testid="toc-open"`:``} ${this.tocOpen?``:`hidden inert`}>
            <div class="toc-header">
              <span>목차</span>
              <button class="icon-btn" data-testid="toc-close" aria-label="목차 닫기">✕</button>
            </div>
            ${this.tocPreviousBlockIdx===null?``:`
              <button class="toc-back-btn" data-testid="toc-back">이전 위치로 돌아가기</button>
            `}
            <div class="toc-list">
              ${n.map((e,t)=>{if(e.t===`h`&&(e.level===2||e.level===3)){let{title:n,range:r}=k(e.text),i=t===c;return`
                    <button class="toc-item level-${e.level}" data-testid="toc-item" data-block="${t}" ${i?`aria-current="true"`:``}>
                      <span>${Q(n)}</span>
                      ${r?`<span class="page-range" data-testid="page-range">${Q(r)}</span>`:``}
                    </button>
                  `}return``}).join(``)}
            </div>
          </aside>
        </div>
      </div>
    `}renderApplyItemHTML(e,t,n){let r=M(t),i=this.checksMap[e]?.[r]||0;return`
      <div class="apply-item" data-testid="apply-item" data-hash="${Z(r)}" data-state="${i}" ${n?`data-featured="true"`:``} tabindex="-1">
        ${n?`<div class="apply-featured-tag">먼저 해볼 하나</div>`:``}
        <div class="apply-item-content"></div>
        <div class="apply-item-actions">
          ${this.renderApplyButtonsHTML(i)}
        </div>
      </div>
    `}renderApplyButtonsHTML(e){return e===0?`<button class="apply-btn apply-start-btn" data-testid="apply-start">이걸 해보기</button>`:e===1?`
        <span class="book-status-badge" style="background:var(--accent-bg);color:var(--accent-text);">해보는 중</span>
        <button class="apply-btn apply-done-btn" data-testid="apply-done">해봤어요</button>
        <button class="apply-btn apply-undo-btn" data-testid="apply-undo">되돌리기</button>
      `:`
      <span class="book-status-badge" style="background:var(--done-badge-bg);color:var(--done-badge-text);">해봤어요</span>
      <button class="apply-btn apply-undo-btn" data-testid="apply-undo">되돌리기</button>
    `}renderBlockHTML(e,t){if(e.t===`h`){let n=e.level===3?`h3`:`h2`,{title:r,range:i}=k(e.text);return`
        <${n} data-block="${t}">
          <span>${Q(r)}</span>
          ${i?`<span class="page-range" data-testid="page-range">${Q(i)}</span>`:``}
        </${n}>
      `}if(e.t===`p`)return`<p data-block="${t}"></p>`;if(e.t===`quote`)return`<blockquote data-block="${t}">${e.paras.map((e,t)=>`<p data-quote-p="${t}"></p>`).join(``)}</blockquote>`;if(e.t===`hr`)return`<hr data-block="${t}" />`;if(e.t===`ul`){let n=e.ordered?`ol`:`ul`;return`<${n} data-block="${t}">${e.items.map((e,t)=>`<li data-li="${t}"></li>`).join(``)}</${n}>`}return``}renderReaderSettingsPanel(){return`
      <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="reader-settings-title" data-testid="reader-settings-dialog">
        <div class="modal-card reader-settings-card">
          <div class="modal-header">
            <span id="reader-settings-title">본문 설정</span>
            <button class="icon-btn" data-testid="settings-close" aria-label="닫기">✕</button>
          </div>
          <div class="modal-body reader-settings-body">
            <div class="setting-section">
              <button class="toggle-switch-btn" data-testid="pages-toggle" role="switch" aria-checked="${this.prefs.showPages}">
                <span>쪽 번호 보기</span>
                <span>${this.prefs.showPages?`켜짐`:`꺼짐`}</span>
              </button>
              <p class="lock-subtitle" style="text-align:left;margin-top:4px;font-size:0.75rem;">쪽 번호는 서재 PDF 기준이라 종이책과 다를 수 있어요.</p>
            </div>
            <div class="setting-grid-2">
              <div class="setting-section">
                <div class="setting-label">글자 크기</div>
                <div class="setting-row">
                  <button class="step-btn" data-testid="fs-down" aria-label="글자 크기 줄이기">-</button>
                  <span>${this.getFontSizeLabel(this.prefs.fontSize)}</span>
                  <button class="step-btn" data-testid="fs-up" aria-label="글자 크기 키우기">+</button>
                </div>
              </div>
              <div class="setting-section">
                <div class="setting-label">줄 간격</div>
                <div class="setting-row">
                  <button class="step-btn" data-testid="lh-down" aria-label="줄 간격 줄이기">-</button>
                  <span>${this.getLineHeightLabel(this.prefs.lineHeight)}</span>
                  <button class="step-btn" data-testid="lh-up" aria-label="줄 간격 키우기">+</button>
                </div>
              </div>
            </div>
            <div class="setting-grid-2">
              <div class="setting-section">
                <div class="setting-label">글꼴</div>
                <div class="btn-group">
                  <button class="setting-btn" data-testid="font-sans" aria-pressed="${this.prefs.font===`sans`}">고딕</button>
                  <button class="setting-btn" data-testid="font-serif" aria-pressed="${this.prefs.font===`serif`}">명조</button>
                </div>
              </div>
              <div class="setting-section">
                <div class="setting-label">테마</div>
                <div class="btn-group">
                  <button class="setting-btn" data-testid="theme-system" aria-pressed="${this.prefs.theme===`system`}">시스템</button>
                  <button class="setting-btn" data-testid="theme-light" aria-pressed="${this.prefs.theme===`light`}">라이트</button>
                  <button class="setting-btn" data-testid="theme-dark" aria-pressed="${this.prefs.theme===`dark`}">다크</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}renderSettingsModal(){return`
      <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div class="modal-card">
          <div class="modal-header">
            <span id="settings-title">서재 설정</span>
            <button class="icon-btn" data-testid="settings-close" aria-label="닫기">✕</button>
          </div>
          <div class="modal-body">
            ${this.renderSettingsContentHTML()}

            <div class="setting-section">
              <div class="setting-label">안내</div>
              <button class="action-btn" data-testid="guide-open">이 앱 사용법</button>
            </div>

            <div class="setting-section">
              <div class="setting-label">데이터 백업과 복원</div>
              <p class="lock-subtitle" style="text-align:left;margin-bottom:8px;">진도와 실천 기록은 이 기기에만 저장됩니다.</p>
              <div class="backup-actions">
                <button class="action-btn" data-testid="export">백업 파일 내보내기</button>
                <button class="action-btn" id="import-trigger">파일에서 가져오기</button>
                <input type="file" class="hidden-file-input" data-testid="import-file" accept=".json,application/json" />
                ${this.importResultMsg?`
                  <div class="import-result ${this.importResultIsError?`error`:`success`}" data-testid="import-result">
                    ${Q(this.importResultMsg)}
                  </div>
                `:``}
              </div>
            </div>

            <div class="setting-section">
              <div class="setting-label">보안</div>
              <button class="action-btn danger" data-testid="lock-app">서재 잠그기</button>
            </div>
          </div>
        </div>
      </div>
    `}renderSettingsContentHTML(){return`
      <div class="setting-section">
        <div class="setting-label">쪽 번호</div>
        <button class="toggle-switch-btn" data-testid="pages-toggle" role="switch" aria-checked="${this.prefs.showPages}">
          <span>쪽 번호 보기</span>
          <span>${this.prefs.showPages?`켜짐`:`꺼짐`}</span>
        </button>
        <p class="lock-subtitle" style="text-align:left;margin-top:4px;font-size:0.75rem;">쪽 번호는 서재 PDF 기준이라 종이책과 다를 수 있어요.</p>
      </div>

      <div class="setting-section">
        <div class="setting-label">글자 크기</div>
        <div class="setting-row">
          <button class="step-btn" data-testid="fs-down" aria-label="글자 크기 줄이기">-</button>
          <span>${this.getFontSizeLabel(this.prefs.fontSize)}</span>
          <button class="step-btn" data-testid="fs-up" aria-label="글자 크기 키우기">+</button>
        </div>
      </div>

      <div class="setting-section">
        <div class="setting-label">줄 간격</div>
        <div class="setting-row">
          <button class="step-btn" data-testid="lh-down" aria-label="줄 간격 줄이기">-</button>
          <span>${this.getLineHeightLabel(this.prefs.lineHeight)}</span>
          <button class="step-btn" data-testid="lh-up" aria-label="줄 간격 키우기">+</button>
        </div>
      </div>

      <div class="setting-section">
        <div class="setting-label">글꼴</div>
        <div class="btn-group">
          <button class="setting-btn" data-testid="font-sans" aria-pressed="${this.prefs.font===`sans`}">고딕</button>
          <button class="setting-btn" data-testid="font-serif" aria-pressed="${this.prefs.font===`serif`}">명조</button>
        </div>
      </div>

      <div class="setting-section">
        <div class="setting-label">테마</div>
        <div class="btn-group">
          <button class="setting-btn" data-testid="theme-system" aria-pressed="${this.prefs.theme===`system`}">시스템</button>
          <button class="setting-btn" data-testid="theme-light" aria-pressed="${this.prefs.theme===`light`}">라이트</button>
          <button class="setting-btn" data-testid="theme-dark" aria-pressed="${this.prefs.theme===`dark`}">다크</button>
        </div>
      </div>
    `}renderGuideModal(){return`
      <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="guide-title" data-testid="guide">
        <div class="modal-card">
          <div class="modal-header">
            <span id="guide-title">이 앱 사용법</span>
            <button class="icon-btn" data-testid="guide-close" aria-label="닫기">✕</button>
          </div>
          <div class="modal-body">
            <div class="setting-section">
              <div class="setting-label">하루 한 권 읽는 법</div>
              <p class="lock-subtitle" style="text-align:left;line-height:1.6;">
                재윤에 맞춰 다시 쓴 책 요약을 하루 한 권 읽고 하나 실천해보는 공간입니다.
              </p>
            </div>
            <div class="setting-section">
              <div class="setting-label">핵심판과 깊게판 분량 차이</div>
              <p class="lock-subtitle" style="text-align:left;line-height:1.6;">
                핵심판(약 1만 자)은 전체 내용을 한눈에 파악하며 실천 항목을 확인하고, 깊게판(2만~3만 자)은 장별 심도 깊은 본문을 제공합니다.
              </p>
            </div>
            <div class="setting-section">
              <div class="setting-label">적용 및 실천 흐름</div>
              <p class="lock-subtitle" style="text-align:left;line-height:1.6;">
                적용 구역에서 「이걸 해보기」를 누르면 '지금 해보는 중' 탭에 저장됩니다. 실천을 마친 뒤 「해봤어요」로 변경하거나 언제든 되돌릴 수 있으며, 안 해도 불이익이 없습니다.
              </p>
            </div>
            <div class="setting-section">
              <div class="setting-label">쪽 번호 보기의 뜻</div>
              <p class="lock-subtitle" style="text-align:left;line-height:1.6;">
                쪽수는 서재 PDF 기준이라 종이책과 다를 수 있어요.
              </p>
            </div>
            <div class="setting-section">
              <div class="setting-label">오프라인 및 홈 화면 추가</div>
              <p class="lock-subtitle" style="text-align:left;line-height:1.6;">
                첫 연결과 초기 저장이 있어야 오프라인에서 읽기가 가능합니다. 크롬 브라우저 메뉴(⋮)에서 '홈 화면에 추가'를 눌러 설치할 수 있습니다.
              </p>
            </div>
            <div class="setting-section">
              <div class="setting-label">데이터 백업의 필요성</div>
              <p class="lock-subtitle" style="text-align:left;line-height:1.6;">
                독서 진도와 실천 기록은 이 폰에만 저장됩니다. 주기적으로 백업 파일을 내보내 보관하세요.
              </p>
            </div>
            <div class="setting-section">
              <div class="setting-label">서재 잠그기 결과</div>
              <p class="lock-subtitle" style="text-align:left;line-height:1.6;">
                서재를 잠그면 저장된 열쇠가 지워지므로 다시 열하려면 열쇠 링크가 필요합니다.
              </p>
            </div>
            <button class="action-btn" data-testid="guide-replay">처음 안내 다시 보기</button>
          </div>
        </div>
      </div>
    `}renderLockConfirmModal(){return`
      <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="lock-confirm-title">
        <div class="modal-card">
          <div class="modal-header">
            <span id="lock-confirm-title">서재 잠그기</span>
            <button class="icon-btn" data-testid="lock-cancel" aria-label="취소">✕</button>
          </div>
          <div class="modal-body">
            <p class="lock-subtitle" style="text-align:left;line-height:1.6;">
              서재를 잠그면 이 기기에서 저장된 열쇠가 지워집니다.<br/>다시 열려면 처음 받은 열쇠 링크나 열쇠가 필요합니다.
            </p>
            <div class="backup-actions">
              <button class="action-btn danger" data-testid="lock-confirm">잠그기</button>
              <button class="action-btn" data-testid="lock-cancel">취소</button>
            </div>
          </div>
        </div>
      </div>
    `}bindMainEvents(){let e=document.querySelector(`.shelf-container`);e?.addEventListener(`scroll`,()=>{this.shelfScrollTop=e.scrollTop});let t=document.querySelector(`.doing-container`);t?.addEventListener(`scroll`,()=>{this.doingScrollTop=t.scrollTop});let n=document.querySelector(`[data-testid="tab-shelf"]`),r=document.querySelector(`[data-testid="tab-doing"]`);n?.addEventListener(`click`,()=>{this.activeTab!==`shelf`&&(this.saveMainScrollTop(),this.activeTab=`shelf`,this.render(),history.state&&history.state.view===`main`&&history.state.tab===`doing`?history.back():history.replaceState({view:`main`,tab:`shelf`},``))}),r?.addEventListener(`click`,()=>{this.activeTab!==`doing`&&(this.saveMainScrollTop(),this.activeTab=`doing`,history.pushState({view:`main`,tab:`doing`},``),this.render())}),document.querySelector(`[data-testid="settings-open"]`)?.addEventListener(`click`,()=>{this.saveMainScrollTop(),this.importResultMsg=null,this.importResultIsError=!1,this.settingsOpen=!0,this.pushCoverState(),this.renderModalsOnly()}),document.querySelector(`[data-testid="onboarding-start"]`)?.addEventListener(`click`,async()=>{await a(`flag:welcome`,!0),this.showOnboarding=!1;let e=this.getContinuingBook(),t=this.payload?.books.find(e=>e.has_summary),n=e?e.book:t;n?this.openBook(n.slug,e?e.edition:`core`):this.render()}),document.querySelector(`[data-testid="onboarding-close"]`)?.addEventListener(`click`,async()=>{await a(`flag:welcome`,!0),this.showOnboarding=!1,this.render()});let i=document.querySelector(`[data-testid="continue"]`);i?.addEventListener(`click`,()=>{let e=i.getAttribute(`data-slug`);if(e){let t=this.getContinuingBook();this.openBook(e,t?t.edition:`core`)}}),document.querySelector(`[data-testid="pending-toggle"]`)?.addEventListener(`click`,()=>{this.saveMainScrollTop(),this.pendingMoreExpanded=!this.pendingMoreExpanded,this.render()}),document.querySelectorAll(`[data-testid="book-card"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-slug`);if(e.getAttribute(`data-state`)===`pending`)this.showToast(`요약 준비 중입니다.`,`pending-note`);else if(t){let e=this.payload?.books.find(e=>e.slug===t);if(e){let n=this.getBookStatus(e);this.openBook(t,n.activeEdition)}}})}),document.querySelectorAll(`[data-testid="doing-item"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-slug`),n=e.getAttribute(`data-hash`);t&&n&&this.openBook(t,`core`,n)})}),document.querySelectorAll(`[data-testid="doing-done"]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-slug`),r=e.getAttribute(`data-hash`);n&&r&&this.updateActionState(n,r,2)})});let o=document.getElementById(`go-apply-from-empty`);if(o?.addEventListener(`click`,()=>{let e=o.getAttribute(`data-slug`);e&&(this.openBook(e,`core`),setTimeout(()=>{document.querySelector(`[data-testid="apply-jump"]`)?.click()},100))}),this.activeTab===`doing`){let e=this.getAllDoingItems();document.querySelectorAll(`[data-testid="doing-item"]`).forEach((t,n)=>{let r=t.querySelector(`.doing-item-text`);if(r&&e[n]){let t=O(e[n].itemText).text;r.appendChild(j(t))}})}this.bindSettingsEvents()}bindReaderEvents(){document.querySelector(`[data-testid="back"]`)?.addEventListener(`click`,()=>{history.back()}),document.querySelector(`[data-testid="ver-core"]`)?.addEventListener(`click`,()=>{if(this.activeEdition!==`core`&&this.activeSlug){this.flushPendingScrollSave(),this.activeEdition=`core`;let e=this.activeSlug;this.progressMap[e]&&this.commitProgress(e,{}).catch(()=>{}),this.tocPreviousBlockIdx=null,this.tocPreviousOff=null,history.replaceState({view:`reader`,slug:this.activeSlug,ed:`core`},``),this.render()}}),document.querySelector(`[data-testid="ver-deep"]`)?.addEventListener(`click`,()=>{if(this.activeEdition!==`deep`&&this.activeSlug){this.flushPendingScrollSave(),this.activeEdition=`deep`;let e=`${this.activeSlug}:deep`;this.progressMap[e]&&this.commitProgress(e,{}).catch(()=>{}),this.tocPreviousBlockIdx=null,this.tocPreviousOff=null,history.replaceState({view:`reader`,slug:this.activeSlug,ed:`deep`},``),this.render()}}),document.querySelector(`[data-testid="toc-open"]`)?.addEventListener(`click`,()=>{this.tocOpen=!this.tocOpen,this.tocOpen&&window.innerWidth<880&&this.pushCoverState(),this.render()}),document.querySelector(`[data-testid="toc-close"]`)?.addEventListener(`click`,()=>{window.innerWidth<880?history.back():(this.tocOpen=!1,this.render())});let e=()=>{if(this.tocPreviousBlockIdx!==null&&this.activeSlug&&document.querySelector(`.reader-body-wrapper`)){let e=this.tocPreviousBlockIdx,t=this.tocPreviousOff||0,n=this.activeEdition===`core`?this.activeSlug:`${this.activeSlug}:deep`;this.liveBlockIdx=e,this.liveOff=t,this.tocPreviousBlockIdx=null,this.tocPreviousOff=null,this.commitProgress(n,{block:e,off:t}).catch(()=>{}),this.render()}};document.querySelectorAll(`[data-testid="toc-back"]`).forEach(t=>t.addEventListener(`click`,e)),document.querySelector(`[data-testid="mark-done"]`)?.addEventListener(`click`,()=>this.toggleMarkDone()),document.querySelector(`[data-testid="mark-done-end"]`)?.addEventListener(`click`,()=>this.toggleMarkDone()),document.querySelector(`[data-testid="reader-settings"]`)?.addEventListener(`click`,()=>{this.readerSettingsOpen=!0,this.pushCoverState(),this.renderModalsOnly()}),document.querySelector(`[data-testid="apply-jump"]`)?.addEventListener(`click`,async()=>{this.tocOpen&&window.innerWidth<880&&history.back();let e=document.querySelector(`.reader-body-wrapper`);if(e){let t=e.querySelectorAll(`h2`);for(let n of Array.from(t))if(n.textContent?.includes(`적용`)){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();e.scrollTop+=r.top-(t.top+30);break}}await i(`flag:hint-apply`)||(this.hintApplyShow=!0),this.render()});let t=document.querySelector(`[data-testid="apply-more"]`);t?.addEventListener(`click`,()=>{this.applyMoreExpanded=!this.applyMoreExpanded;let e=document.querySelector(`.apply-more-container`);e&&(this.applyMoreExpanded?e.removeAttribute(`hidden`):e.setAttribute(`hidden`,``)),t.setAttribute(`aria-expanded`,String(this.applyMoreExpanded)),t.textContent=this.applyMoreExpanded?`다른 적용 거리 접기`:`다른 적용 거리 더보기`}),document.querySelector(`[data-testid="end-apply"]`)?.addEventListener(`click`,()=>{document.querySelector(`[data-testid="apply-jump"]`)?.click()}),document.querySelector(`[data-testid="end-deep"]`)?.addEventListener(`click`,()=>{this.activeEdition===`deep`?(this.flushPendingScrollSave(),this.activeEdition=`core`,this.tocPreviousBlockIdx=null,this.tocPreviousOff=null,history.replaceState({view:`reader`,slug:this.activeSlug,ed:`core`},``),this.render(),setTimeout(()=>{document.querySelector(`[data-testid="apply-jump"]`)?.click()},50)):document.querySelector(`[data-testid="ver-deep"]`)?.click()}),document.querySelectorAll(`[data-testid="toc-item"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-block`)||`0`,10);if(document.querySelector(`.reader-body-wrapper`)){let e=this.liveBlockIdx,n=this.liveOff;this.tocPreviousBlockIdx=e,this.tocPreviousOff=n;let r=this.activeEdition===`core`?this.activeSlug:`${this.activeSlug}:deep`;this.liveBlockIdx=t,this.liveOff=0,this.currentBlockIdx=t,this.currentOff=0,this.commitProgress(r,{block:t,off:0}).catch(()=>{}),this.tocOpen&&window.innerWidth<880?history.back():this.render(),requestAnimationFrame(()=>{let e=document.querySelector(`.reader-body-wrapper`);e&&this.restoreScrollToBlock(e,t,0,40)})}})}),document.querySelectorAll(`[data-testid="hint-close"]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.closest(`[data-testid="hint"]`),n=t?.getAttribute(`data-hint`);n===`reader`?(await a(`flag:hint-reader`,!0),this.hintReaderShow=!1):n===`apply`&&(await a(`flag:hint-apply`,!0),this.hintApplyShow=!1),t?.remove()})}),this.populateReaderBodyContent(),this.setupScrollSync(),this.setupApplyIntersectionObserver(),this.bindSettingsEvents()}setupApplyIntersectionObserver(){this.applyObserver&&=(this.applyObserver.disconnect(),null);let e=document.querySelector(`.apply-section-block`);e&&(this.applyObserver=new IntersectionObserver(async e=>{for(let t of e)t.isIntersecting&&(!await i(`flag:hint-apply`)&&!this.hintApplyShow&&(this.hintApplyShow=!0,this.render()),this.applyObserver&&=(this.applyObserver.disconnect(),null))},{threshold:.1}),this.applyObserver.observe(e))}populateReaderBodyContent(e=!0){if(!this.payload||!this.activeSlug)return;let t=document.querySelector(`[data-testid="reader-body"]`);if(!t)return;let n=this.payload.books.find(e=>e.slug===this.activeSlug);if(!n)return;let r=this.activeEdition===`deep`,i=A(r?n.deep||``:n.summary),a=!1;i.forEach((i,o)=>{let s=t.querySelector(`[data-block="${o}"]`);if(s){if(i.t===`h`&&i.level===2&&(a=!r&&i.text.includes(`적용`)),a&&i.t===`ul`)s.querySelectorAll(`[data-testid="apply-item"]`).forEach((t,r)=>{let a=i.items[r]?.text||``,o=t.querySelector(`.apply-item-content`);if(o){let{text:e,ranges:t}=O(a);if(o.appendChild(j(e)),this.prefs.showPages&&t.length>0){let e=document.createElement(`span`);e.className=`page-ref`,e.setAttribute(`data-testid`,`page-ref`),e.textContent=D(t),o.appendChild(e)}}e&&this.bindApplyItemButtons(t,n.slug,M(a))});else if(i.t===`p`){let{text:e,ranges:t}=O(i.text);if(s.appendChild(j(e)),this.prefs.showPages&&t.length>0){let e=document.createElement(`span`);e.className=`page-ref`,e.setAttribute(`data-testid`,`page-ref`),e.textContent=D(t),s.appendChild(e)}}else i.t===`quote`?s.querySelectorAll(`[data-quote-p]`).forEach((e,t)=>{if(i.paras[t]){let{text:n,ranges:r}=O(i.paras[t]);if(e.appendChild(j(n)),this.prefs.showPages&&r.length>0){let t=document.createElement(`span`);t.className=`page-ref`,t.setAttribute(`data-testid`,`page-ref`),t.textContent=D(r),e.appendChild(t)}}}):i.t===`ul`&&s.querySelectorAll(`[data-li]`).forEach((e,t)=>{if(i.items[t]){let{text:n,ranges:r}=O(i.items[t].text);if(e.appendChild(j(n)),this.prefs.showPages&&r.length>0){let t=document.createElement(`span`);t.className=`page-ref`,t.setAttribute(`data-testid`,`page-ref`),t.textContent=D(r),e.appendChild(t)}}})}})}bindApplyItemButtons(e,t,n){let r=e.querySelector(`[data-testid="apply-start"]`),i=e.querySelector(`[data-testid="apply-done"]`),a=e.querySelector(`[data-testid="apply-undo"]`);r?.addEventListener(`click`,e=>{e.stopPropagation(),this.updateActionState(t,n,1)}),i?.addEventListener(`click`,e=>{e.stopPropagation(),this.updateActionState(t,n,2)}),a?.addEventListener(`click`,e=>{e.stopPropagation(),this.updateActionState(t,n,0)})}setupScrollSync(){if(!this.activeSlug)return;let e=document.querySelector(`.reader-body-wrapper`);if(!e)return;this.scrollSaveTimeout!==null&&(window.clearTimeout(this.scrollSaveTimeout),this.scrollSaveTimeout=null);let t=this.activeEdition===`core`?this.activeSlug:`${this.activeSlug}:deep`,n=this.progressMap[t];this.isRestoringScroll=!0,n?(this.currentBlockIdx=n.block,this.currentOff=n.off||0,this.liveBlockIdx=n.block,this.liveOff=n.off||0,this.restoreScrollToBlock(e,n.block,n.off||0)):(this.currentBlockIdx=0,this.currentOff=0,this.liveBlockIdx=0,this.liveOff=0),this.restoredScrollTop=e.scrollTop,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.isRestoringScroll=!1})}),e.addEventListener(`scroll`,()=>{if(this.updateLiveScrollPosition(e),this.hintReaderShow&&!this.isRestoringScroll&&e.scrollTop>40&&(this.hintReaderShow=!1),this.sectionUpdateRaf===null&&(this.sectionUpdateRaf=requestAnimationFrame(()=>{this.sectionUpdateRaf=null,this.updateDynamicReaderSection(e)})),this.isRestoringScroll){if(Math.abs(e.scrollTop-this.restoredScrollTop)<=1)return;this.isRestoringScroll=!1}this.scrollSaveTimeout!==null&&window.clearTimeout(this.scrollSaveTimeout),this.scrollSaveTimeout=window.setTimeout(()=>{this.scrollSaveTimeout=null,this.saveCurrentReadingProgress(e,t)},150)})}updateDynamicReaderSection(e){if(!this.payload||!this.activeSlug)return;let t=this.payload.books.find(e=>e.slug===this.activeSlug);if(!t)return;let n=A(this.activeEdition===`deep`?t.deep||``:t.summary),r=`시작 부분`;for(let e=0;e<=Math.min(this.liveBlockIdx,n.length-1);e++){let t=n[e];t&&t.t===`h`&&t.level===2&&(r=k(t.text).title)}let i=document.querySelector(`[data-testid="reader-section"]`);i&&i.textContent!==r&&(i.textContent=r)}updateLiveScrollPosition(e){let t=e.querySelectorAll(`[data-block]`);if(t.length===0)return;let n=e.getBoundingClientRect().top+Y,r=0,i=0;for(let e=0;e<t.length;e++){let a=t[e].getBoundingClientRect();if(a.top<=n){r=parseInt(t[e].getAttribute(`data-block`)||`0`,10);let o=a.height||1;i=Math.max(0,Math.min(1,(n-a.top)/o))}else break}this.liveBlockIdx=r,this.liveOff=i}saveCurrentReadingProgress(e,t){this.updateLiveScrollPosition(e),this.currentBlockIdx=this.liveBlockIdx,this.currentOff=this.liveOff;let n=e.scrollHeight-e.clientHeight,r=n>0?Math.min(1,Math.max(0,e.scrollTop/n)):0;return this.commitProgress(t,{pct:r,block:this.currentBlockIdx,off:this.currentOff}).catch(()=>void 0)}bindSettingsEvents(){document.querySelectorAll(`[data-testid="settings-close"]`).forEach(e=>e.addEventListener(`click`,()=>{history.back()})),document.querySelectorAll(`[data-testid="pages-toggle"]`).forEach(e=>e.addEventListener(`click`,()=>{this.updatePref(`showPages`,!this.prefs.showPages)}));let e=document.querySelectorAll(`[data-testid="fs-down"]`),t=document.querySelectorAll(`[data-testid="fs-up"]`);e.forEach(e=>e.addEventListener(`click`,()=>this.updatePref(`fontSize`,Math.max(13,this.prefs.fontSize-1)))),t.forEach(e=>e.addEventListener(`click`,()=>this.updatePref(`fontSize`,Math.min(26,this.prefs.fontSize+1))));let n=document.querySelectorAll(`[data-testid="lh-down"]`),r=document.querySelectorAll(`[data-testid="lh-up"]`);n.forEach(e=>e.addEventListener(`click`,()=>this.updatePref(`lineHeight`,Number(Math.max(1.3,this.prefs.lineHeight-.1).toFixed(1))))),r.forEach(e=>e.addEventListener(`click`,()=>this.updatePref(`lineHeight`,Number(Math.min(2.4,this.prefs.lineHeight+.1).toFixed(1)))));let i=document.querySelectorAll(`[data-testid="font-sans"]`),a=document.querySelectorAll(`[data-testid="font-serif"]`);i.forEach(e=>e.addEventListener(`click`,()=>this.updatePref(`font`,`sans`))),a.forEach(e=>e.addEventListener(`click`,()=>this.updatePref(`font`,`serif`)));let s=document.querySelectorAll(`[data-testid="theme-system"]`),c=document.querySelectorAll(`[data-testid="theme-light"]`),l=document.querySelectorAll(`[data-testid="theme-dark"]`);s.forEach(e=>e.addEventListener(`click`,()=>this.updatePref(`theme`,`system`))),c.forEach(e=>e.addEventListener(`click`,()=>this.updatePref(`theme`,`light`))),l.forEach(e=>e.addEventListener(`click`,()=>this.updatePref(`theme`,`dark`))),document.querySelectorAll(`[data-testid="guide-open"]`).forEach(e=>e.addEventListener(`click`,()=>{this.guideOpen=!0,this.pushCoverState(),this.renderModalsOnly()})),document.querySelector(`[data-testid="guide-close"]`)?.addEventListener(`click`,()=>{history.back()}),document.querySelector(`[data-testid="guide-replay"]`)?.addEventListener(`click`,async()=>{await o(`flag:welcome`),this.showOnboarding=!0;let e=+!!this.guideOpen+ +!!this.settingsOpen;this.guideOpen=!1,this.settingsOpen=!1,e>0?(history.go(-e),setTimeout(()=>{this.showOnboarding=!0,this.render();let e=document.querySelector(`.shelf-container`);e&&(e.scrollTop=0)},160)):this.render()}),document.querySelector(`[data-testid="export"]`)?.addEventListener(`click`,()=>this.handleExport());let u=document.getElementById(`import-trigger`),d=document.querySelector(`[data-testid="import-file"]`);u?.addEventListener(`click`,()=>d?.click()),d?.addEventListener(`change`,async e=>{let t=e.target.files?.[0];t&&await this.handleImportFile(t)}),document.querySelector(`[data-testid="lock-app"]`)?.addEventListener(`click`,()=>{this.lockConfirmOpen=!0,this.pushCoverState(),this.renderModalsOnly()}),document.querySelector(`[data-testid="lock-confirm"]`)?.addEventListener(`click`,()=>this.confirmLockApp()),document.querySelectorAll(`[data-testid="lock-cancel"]`).forEach(e=>e.addEventListener(`click`,()=>{history.back()}))}};