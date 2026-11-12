const palettes=[{name:'Tierra',colors:['#eddfbd','#dab05b','#b85d3b','#94a077','#516644','#91aab5']},{name:'Mediterráneo',colors:['#f0e5cb','#b9d3d1','#44888e','#244e66','#d5ad67','#d57651']},{name:'Jardín',colors:['#ece1c9','#ddb1a0','#a95e61','#a9b58b','#536f51','#d9b658']}];
const shapes=[
{id:'espejo',name:'Espejo',icon:'◉',group:'Hogar',d:'M578 300 A278 278 0 1 0 22 300 A278 278 0 1 0 578 300Z M469 300 A169 169 0 1 1 131 300 A169 169 0 1 1 469 300Z',hole:'round'},
{id:'mandala',name:'Mandala',icon:'✺',group:'Decoración',d:'M570 300 A270 270 0 1 0 30 300 A270 270 0 1 0 570 300Z',radial:true},
{id:'marco',name:'Marco de cuadro',icon:'▣',group:'Hogar',d:'M40 70H560V530H40Z M132 162V438H468V162Z',hole:'landscape'},
{id:'retrato',name:'Portarretrato',icon:'▯',group:'Hogar',d:'M95 25H505V575H95Z M173 110V490H427V110Z',hole:'portrait'},
{id:'letra',name:'Letras',icon:'Aa',group:'Personalizables',text:true},
{id:'numero',name:'Números',icon:'12',group:'Personalizables',text:true},
{id:'corazon',name:'Corazón',icon:'♡',group:'Decoración',d:'M300 550C260 507 44 347 44 191C44 50 225 22 300 160C375 22 556 50 556 191C556 347 340 507 300 550Z'},
{id:'cruz',name:'Cruz',icon:'✝',group:'Decoración',d:'M235 35H365V195H515V325H365V565H235V325H85V195H235Z'},
{id:'buho',name:'Búho',icon:'♧',group:'Naturaleza',d:'M145 180L122 35L254 118Q300 99 346 118L478 35L455 180Q535 285 485 424Q448 530 350 548L300 573L250 548Q152 530 115 424Q65 285 145 180Z'},
{id:'mariposa',name:'Mariposa',icon:'⋈',group:'Naturaleza',d:'M285 295C157 25 25 23 40 225Q45 316 160 327Q30 425 104 510Q177 585 285 353L285 520Q300 550 315 520L315 353Q423 585 496 510Q570 425 440 327Q555 316 560 225C575 23 443 25 315 295L315 160Q300 130 285 160Z'},
{id:'flor',name:'Flor',icon:'✿',group:'Naturaleza',flower:true},
{id:'estrella',name:'Estrella',icon:'☆',group:'Decoración',star:true},
{id:'luna',name:'Luna',icon:'☾',group:'Decoración',d:'M405 45A270 270 0 1 0 405 555C170 510 150 140 405 45Z'},
{id:'pez',name:'Pez',icon:'◁',group:'Naturaleza',d:'M440 300L563 170V430L440 320Q255 570 40 300Q255 30 440 280Z'},
{id:'casa',name:'Casita',icon:'⌂',group:'Hogar',d:'M40 275L300 40L560 275H500V555H100V275Z'}
];
const ns='http://www.w3.org/2000/svg',el=id=>document.getElementById(id);let palette=0,selected=2,shape='espejo',pattern='petalos',grout='#e6dcc9',letter='A',number='8',models={},history=[],group='Todas',activeColors=[...palettes[0].colors],customColors=[],paletteName='Tierra',geometryStyle='artesanal';
const polar=(r,a)=>[300+r*Math.cos(a),300+r*Math.sin(a)],polygon=p=>'M'+p.map(v=>v.join(',')).join('L')+'Z';
shapes.find(s=>s.star).d=polygon(Array.from({length:10},(_,i)=>polar(i%2?125:275,-Math.PI/2+i*Math.PI/5)));
shapes.find(s=>s.flower).d=polygon(Array.from({length:180},(_,i)=>{let a=i*Math.PI/90;return polar(220+48*Math.cos(a*8),a)}));
function spec(){return shapes.find(s=>s.id===shape)}
function key(){return shape+'-'+geometryStyle+'-'+pattern+'-'+(shape==='letra'?letter:shape==='numero'?number:'')}
function snapshot(){history.push(JSON.stringify({palette,selected,shape,pattern,grout,letter,number,models,activeColors,customColors,paletteName,geometryStyle}));if(history.length>35)history.shift()}
function say(t){el('status').textContent=t}
function sector(r1,r2,a,b){let p=polar(r1,a),q=polar(r2,a),r=polar(r2,b),s=polar(r1,b);return 'M'+p+'L'+q+'A'+r2+','+r2+' 0 0 1 '+r+'L'+s+'A'+r1+','+r1+' 0 0 0 '+p+'Z'}
function glyph(){return shape==='letra'?letter:number}
function maskNode(){let s=spec(),n=document.createElementNS(ns,s.text?'text':'path');if(s.text){n.textContent=glyph();n.setAttribute('x',300);n.setAttribute('y',465);n.setAttribute('text-anchor','middle');n.setAttribute('font-family','Arial, sans-serif');n.setAttribute('font-weight',900);n.setAttribute('font-size',glyph().length>1?305:510)}else{n.setAttribute('d',s.d);n.setAttribute('fill-rule','evenodd');n.setAttribute('clip-rule','evenodd')}return n}
function maskSampler(){let c=document.createElement('canvas');c.width=c.height=600;let x=c.getContext('2d');if(spec().text){x.font='900 '+(glyph().length>1?305:510)+'px Arial';x.textAlign='center';x.fillText(glyph(),300,465)}else{x.fill(new Path2D(spec().d),'evenodd')}let data=x.getImageData(0,0,600,600).data;return (a,b)=>{a=Math.round(a);b=Math.round(b);return a>=0&&a<600&&b>=0&&b<600&&data[(b*600+a)*4+3]>20}}
function slot(x,y,row,col){let a=Math.atan2(y-300,x-300),r=Math.hypot(x-300,y-300);if(shape==='buho'){if(Math.hypot(x-212,y-237)<65||Math.hypot(x-388,y-237)<65)return 0;if(y>220&&y<335&&Math.abs(x-300)<33)return 1;if(Math.abs(x-300)>125&&y>280)return 4}
if(shape==='flor'&&r<85)return 1;
if(pattern==='petalos')return (Math.floor((a+Math.PI)*6/Math.PI)+Math.floor(r/50))%activeColors.length;
if(pattern==='geometrico')return (Math.floor(col/2)+Math.floor(row/2))%activeColors.length;
return Math.abs(Math.floor(y/40+Math.sin(x/70)*2))%activeColors.length}
function makeClassic(){let tiles=[],inside=maskSampler();if(shape==='espejo'||shape==='mandala'){let start=shape==='espejo'?171:0,rings=shape==='espejo'?4:9;for(let row=0;row<rings;row++){let r1=start+row*29.8,r2=Math.min(start+(row+1)*29.8,shape==='espejo'?278:270),n=shape==='espejo'?36:Math.max(12,row*8),off=row%2*.04;for(let i=0;i<n;i++){let a=i*2*Math.PI/n+off,b=(i+1)*2*Math.PI/n+off,p=polar((r1+r2)/2,(a+b)/2),s=slot(...p,row,i);tiles.push({d:sector(Math.max(.5,r1),r2,a,b),slot:s,color:activeColors[s]})}}}
else {const step=29;let pts=[];for(let row=0;row<22;row++){pts[row]=[];for(let col=0;col<22;col++)pts[row][col]=[col*step+Math.sin(row*7+col*11)*4,row*step+Math.cos(row*11+col*3)*4]}
for(let row=0;row<21;row++)for(let col=0;col<21;col++){let p=[pts[row][col],pts[row][col+1],pts[row+1][col+1],pts[row+1][col]],x=p.reduce((a,v)=>a+v[0],0)/4,y=p.reduce((a,v)=>a+v[1],0)/4;if(!inside(x,y)&&!p.some(v=>inside(...v)))continue;let s=slot(x,y,row,col);tiles.push({d:polygon(p),slot:s,color:activeColors[s]})}}
return tiles}
function shapeButtons(){el('shapeGrid').replaceChildren();shapes.filter(s=>group==='Todas'||s.group===group).forEach(s=>{let b=document.createElement('button');b.className='shape-button'+(shape===s.id?' active':'');b.setAttribute('aria-pressed',shape===s.id);b.innerHTML=(s.d?'<svg viewBox="0 0 600 600" aria-hidden="true"><path d="'+s.d+'" fill-rule="evenodd"/></svg>':'<span>'+s.icon+'</span>')+'<small>'+s.name+'</small>';b.onclick=()=>{if(shape===s.id)return;snapshot();shape=s.id;render();say(s.name+' listo para pintar.')};el('shapeGrid').append(b)})}
function render(){let s=spec(),k=key();if(!models[k])models[k]=make();shapeButtons();el('shapeClip').replaceChildren(maskNode());el('shapeBase').replaceChildren(maskNode());el('shapeBase').setAttribute('fill',grout);el('tiles').replaceChildren();models[k].forEach((t,i)=>{let p=document.createElementNS(ns,'path');p.setAttribute('d',t.d);p.setAttribute('fill',t.color);p.setAttribute('stroke',grout);p.setAttribute('stroke-width','3');p.setAttribute('stroke-linejoin','round');p.setAttribute('class','tile');p.setAttribute('role','button');p.setAttribute('tabindex','0');p.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();p.onclick()}};p.setAttribute('aria-label','Pintar pieza '+(i+1));p.onclick=()=>{let color=availableColors()[selected];if(t.color===color)return;snapshot();t.color=color;p.setAttribute('fill',color);el('undo').disabled=false;queueSave();say('Pieza pintada. Seguí creando.')};el('tiles').append(p)});
el('details').innerHTML=s.hole==='round'?'<circle cx="300" cy="300" r="168" fill="url(#mirror)" stroke="#b4a38a" stroke-width="2"/><path d="M210 198Q240 170 278 174L360 423Q325 440 295 437Z" fill="white" opacity=".17"/>':s.hole?'<rect x="'+(s.hole==='portrait'?174:133)+'" y="'+(s.hole==='portrait'?111:163)+'" width="'+(s.hole==='portrait'?252:334)+'" height="'+(s.hole==='portrait'?378:274)+'" fill="#fbf8f0"/><path d="M255 340L300 285L345 340Z" fill="#e0ded0"/><circle cx="320" cy="265" r="14" fill="#dbcfb8"/><text x="300" y="375" text-anchor="middle" fill="#8c8879" font-family="Arial" font-size="13">Tu foto acá</text>':shape==='buho'?'<circle cx="212" cy="237" r="27" fill="#34372d"/><circle cx="388" cy="237" r="27" fill="#34372d"/><circle cx="220" cy="228" r="8" fill="#faf4df"/><circle cx="396" cy="228" r="8" fill="#faf4df"/>':shape==='pez'?'<circle cx="135" cy="275" r="17" fill="#34372d"/><circle cx="140" cy="270" r="5" fill="white"/>':'';
el('caption').textContent=s.name+(s.text?' · '+glyph():'');el('pieceCount').textContent=models[k].length+' piezas · diseño orientativo';el('stageLabel').textContent=s.name+' · Vista previa';el('textControls').hidden=!s.text;el('letterControl').hidden=shape!=='letra';el('numberControl').hidden=shape!=='numero';el('letter').value=letter;el('number').value=number;el('patternSelect').value=pattern;el('undo').disabled=!history.length;el('geometryStyle').value=geometryStyle;swatches();queueSave()}
function swatches(){el('activePaletteName').textContent=paletteName;el('colors').replaceChildren();availableColors().forEach((c,i)=>{let b=document.createElement('button');b.className='swatch'+(i===selected?' active':'');b.style.background=c;b.setAttribute('aria-label','Color '+(i+1)+' '+c);b.setAttribute('aria-pressed',i===selected);b.onclick=()=>{selected=i;swatches();queueSave()};el('colors').append(b)});el('colorLabel').textContent='Color seleccionado · '+availableColors()[selected].toUpperCase();el('grouts').replaceChildren();['#e6dcc9','#c2ae90','#55564f'].forEach((c,i)=>{let b=document.createElement('button');b.className='swatch'+(c===grout?' active':'');b.style.background=c;b.setAttribute('aria-label','Juntas '+['crema','arena','grafito'][i]);b.setAttribute('aria-pressed',c===grout);b.onclick=()=>{if(grout!==c){snapshot();grout=c;render()}};el('grouts').append(b)})}
palettes.forEach((p,j)=>{let b=document.createElement('button');b.className='pal';b.innerHTML=p.colors.slice(0,5).map(c=>'<i style="background:'+c+'"></i>').join('')+'<span>'+p.name+'</span>';b.onclick=()=>{snapshot();palette=j;activeColors=[...p.colors];paletteName=p.name;selected=0;models[key()]=make();render();say('Paleta '+p.name+' aplicada a esta pieza.')};el('palettes').append(b)});
el('category').onchange=e=>{group=e.target.value;shapeButtons()};
el('patternSelect').onchange=e=>{snapshot();pattern=e.target.value;render();say('Patrón cambiado. Tus otras combinaciones se conservan.')};
for(let c of 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'){let o=document.createElement('option');o.value=c;o.textContent=c;el('letter').append(o)}
el('letter').onchange=e=>{snapshot();letter=e.target.value;render()};
el('number').oninput=e=>{e.target.value=e.target.value.replace(/[^0-9]/g,'').slice(0,2)};
el('applyNumber').onclick=()=>{let v=el('number').value;if(!/^\d{1,2}$/.test(v)){say('Ingresá uno o dos dígitos.');return}if(v!==number){snapshot();number=v;shape='numero';render();say('Número '+v+' listo para pintar.')}};
el('undo').onclick=()=>{if(!history.length)return;let s=JSON.parse(history.pop());({models,shape,pattern,palette,selected,grout,letter,number,activeColors,customColors,paletteName,geometryStyle}=s);render();say('Último cambio deshecho.')};
el('reset').onclick=()=>{snapshot();models[key()]=make();render();say('Colores restablecidos en esta pieza.')};
el('download').onclick=()=>{let svg=el('art').cloneNode(true);svg.setAttribute('width','1200');svg.setAttribute('height','1200');svg.querySelectorAll('.tile').forEach(p=>p.removeAttribute('role'));let blob=new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='mosaica-'+shape+(spec().text?'-'+glyph():'')+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(u),1500);say('Diseño descargado en SVG.')};

el('printDesign').onclick=()=>{window.print()};


function availableColors(){return [...activeColors,...customColors]}
function hslHex(h,s,l){s/=100;l/=100;const a=s*Math.min(l,1-l),f=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1)))).toString(16).padStart(2,'0')};return '#'+f(0)+f(8)+f(4)}
function randomPalette(count){let base=Math.random()*360,spread=[35,145,180][Math.floor(Math.random()*3)],colors=[];for(let i=0;i<count;i++){let hue=(base+(i%3)*spread+Math.floor(i/3)*17)%360,sat=38+Math.random()*30,light=30+(i/(count-1))*48;colors.push(hslHex(hue,sat,light))}return colors}
el('randomPalette').onclick=()=>{let count=Number(el('paletteSize').value);if(![6,8,10,12].includes(count))count=8;snapshot();activeColors=randomPalette(count);paletteName='Aleatoria · '+count+' colores';selected=0;models[key()]=make();render();say('Nueva paleta aplicada. Podés deshacer para volver a la anterior.')};
el('customPicker').oninput=e=>{el('customHex').value=e.target.value.toUpperCase();el('customError').textContent=''};
el('customHex').oninput=e=>{let v=e.target.value.trim();if(!v.startsWith('#'))v='#'+v;if(/^#[0-9a-f]{6}$/i.test(v))el('customPicker').value=v;el('customError').textContent=''};
el('addColor').onclick=()=>{let c=el('customHex').value.trim().toLowerCase();if(!c.startsWith('#'))c='#'+c;if(/^#[0-9a-f]{3}$/i.test(c))c='#'+c.slice(1).split('').map(v=>v+v).join('');if(!/^#[0-9a-f]{6}$/i.test(c)){el('customError').textContent='Usá un código como #FFB38A.';return}let index=availableColors().indexOf(c);if(index<0){snapshot();customColors.push(c);index=availableColors().length-1}selected=index;el('customHex').value=c.toUpperCase();el('customPicker').value=c;el('customError').textContent='';swatches();el('undo').disabled=!history.length;queueSave();say('Color seleccionado. Tocá una pieza para pintarla.')};
el('customHex').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();el('addColor').onclick()}};


function make(){return geometryStyle==='clasico'?makeClassic():makeArtisan()}
function makeArtisan(){
 const out=[],ncol=activeColors.length,put=(d,s)=>out.push({d,slot:((s%ncol)+ncol)%ncol,color:activeColors[((s%ncol)+ncol)%ncol]});
 const colorAt=(x,y,row,col)=>slot(x,y,row,col);
 if(['mandala','flor','espejo'].includes(shape)){
  let bands=shape==='espejo'?4:5,segments=shape==='espejo'?48:64;
  let start=shape==='espejo'?171:0,petals=shape==='espejo'?12:8;
  const radius=(r,a)=>{if(shape==='flor')return (220+48*Math.cos(a*8))*r/bands;
   if(shape==='espejo')return start+(278-start)*r/bands+(r>0&&r<bands?7*Math.cos(a*petals+(r%2)*Math.PI):0);
   return 270*r/bands+(r>0&&r<bands?16*Math.cos(a*petals+(r%2)*Math.PI):0)};
  for(let ring=0;ring<bands;ring++)for(let col=0;col<segments;col++){
   let a=col*2*Math.PI/segments,b=(col+1)*2*Math.PI/segments,points=[];
   for(let j=0;j<=4;j++){let t=a+(b-a)*j/4;points.push(polar(Math.max(0,radius(ring+1,t)),t))}
   for(let j=4;j>=0;j--){let t=a+(b-a)*j/4;points.push(polar(Math.max(0,radius(ring,t)),t))}
   let mid=polar((radius(ring,a)+radius(ring+1,a))/2,(a+b)/2);
   let s=pattern==='petalos'?(ring+Math.floor(col/4))%ncol:colorAt(...mid,ring,col);
   if(shape==='flor'&&ring===0)s=1;
   put(polygon(points),s);
  }
  return out;
 }
 // A deterministic, irregular tessellation gives each silhouette ceramic-like pieces.
 const seeds=[];const step=43;
 for(let row=0;row<15;row++)for(let col=0;col<15;col++){
  let x=col*step+Math.sin(row*31+col*17)*12,y=row*step+Math.cos(row*19+col*29)*12;
  seeds.push([x,y,row,col]);
 }
 const inside=maskSampler();
 for(let i=0;i<seeds.length;i++){
  let [x,y,row,col]=seeds[i],poly=[[0,0],[600,0],[600,600],[0,600]];
  for(let j=0;j<seeds.length&&poly.length;j++){if(i===j)continue;let [qx,qy]=seeds[j],nx=qx-x,ny=qy-y,c=(qx*qx+qy*qy-x*x-y*y)/2,next=[];
   for(let k=0;k<poly.length;k++){let a=poly[k],b=poly[(k+1)%poly.length],da=a[0]*nx+a[1]*ny-c,db=b[0]*nx+b[1]*ny-c;
    if(da<=.001)next.push(a);if((da<=.001)!==(db<=.001)){let t=da/(da-db);next.push([a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])])}}
   poly=next;
  }
  if(poly.length<3||(!inside(x,y)&&!poly.some(p=>inside(...p))))continue;
  put(polygon(poly),colorAt(x,y,row,col));
 }
 if(shape==='buho'){
  // Editable feather-shaped tesserae on the wings, and ceramic rings around the eyes.
  for(let side of [-1,1])for(let row=0;row<5;row++)for(let col=0;col<3;col++){
   let x=300+side*(105+col*28-row*5),y=320+row*35,dx=side*16;
   put('M'+x+','+y+'Q'+(x+dx*2)+','+(y+13)+' '+(x+dx)+','+(y+39)+'Q'+(x-dx)+','+(y+19)+' '+x+','+y+'Z',(row+col+3)%ncol);
  }
  for(let cx of [212,388])for(let ring=0;ring<2;ring++)for(let i=0;i<16;i++){
   let a=i*Math.PI/8,b=(i+1)*Math.PI/8,r1=27+ring*20,r2=r1+20;
   let p=(r,t)=>[cx+r*Math.cos(t),237+r*Math.sin(t)];
   put('M'+p(r1,a)+'L'+p(r2,a)+'A'+r2+','+r2+' 0 0 1 '+p(r2,b)+'L'+p(r1,b)+'A'+r1+','+r1+' 0 0 0 '+p(r1,a)+'Z',ring?1:0);
  }
 }
 return out;
}


const STORAGE_KEY='mosaica.studio.v1';let projectName='Mi mosaico',saveTimer=null,storageReady=false,storageWarning=false;
function projectState(){return {palette,selected,shape,pattern,grout,letter,number,models,activeColors,customColors,paletteName,geometryStyle}}
function validState(s){return s&&shapes.some(x=>x.id===s.shape)&&['petalos','geometrico','ondas'].includes(s.pattern)&&['artesanal','clasico'].includes(s.geometryStyle)&&Array.isArray(s.activeColors)&&s.activeColors.length>=6&&s.activeColors.length<=12&&s.activeColors.every(c=>/^#[0-9a-f]{6}$/i.test(c))&&Array.isArray(s.customColors)&&s.customColors.length<1000&&s.customColors.every(c=>/^#[0-9a-f]{6}$/i.test(c))&&Number.isInteger(s.selected)&&s.selected>=0&&s.selected<s.activeColors.length+s.customColors.length&&/^#[0-9a-f]{6}$/i.test(s.grout)&&/^[A-ZÑ]$/.test(s.letter)&&/^\d{1,2}$/.test(s.number)&&typeof s.paletteName==='string'&&s.models&&typeof s.models==='object'&&Object.keys(s.models).length<200&&Object.values(s.models).every(ts=>Array.isArray(ts)&&ts.length<=1500&&ts.every(t=>typeof t.d==='string'&&t.d.length<6000&&/^#[0-9a-f]{6}$/i.test(t.color)&&Number.isInteger(t.slot)))}
function setProjectState(s){if(!validState(s))throw Error('Proyecto inválido');({palette,selected,shape,pattern,grout,letter,number,models,activeColors,customColors,paletteName,geometryStyle}=s);history=[]}
function storageData(){let raw=localStorage.getItem(STORAGE_KEY);if(!raw)return {version:1,projects:[]};let d=JSON.parse(raw);if(d.version!==1||!Array.isArray(d.projects))throw Error('Formato no compatible');return d}
function storageFailed(){storageWarning=true;el('saveState').textContent='No se pudo guardar en este navegador';say('El guardado local no está disponible o no tiene espacio. Descargá tu diseño para conservarlo.')}
function saveDraft(){if(!storageReady)return;clearTimeout(saveTimer);try{let d=storageData();d.draft={name:projectName,state:projectState(),updated:Date.now()};localStorage.setItem(STORAGE_KEY,JSON.stringify(d));storageWarning=false;el('saveState').textContent='Guardado en este navegador'}catch{storageFailed()}}
function queueSave(){if(!storageReady)return;clearTimeout(saveTimer);el('saveState').textContent='Guardando…';saveTimer=setTimeout(saveDraft,350)}
function restoreDraft(){try{let d=storageData();if(d.draft){if(!validState(d.draft.state))throw Error('Borrador inválido');projectName=String(d.draft.name||'Mi mosaico').slice(0,60);setProjectState(d.draft.state);el('saveState').textContent='Último trabajo recuperado'}}catch{storageFailed()}storageReady=true;el('projectName').value=projectName}
function projectList(){let target=el('projectList');target.replaceChildren();try{let d=storageData();if(!d.projects.length){let p=document.createElement('p');p.textContent='Todavía no guardaste copias. Poné un nombre y tocá “Guardar copia”.';target.append(p)}d.projects.slice().reverse().forEach(p=>{let row=document.createElement('div');row.className='saved-project';let text=document.createElement('div'),strong=document.createElement('strong'),small=document.createElement('small');strong.textContent=p.name;small.textContent=new Date(p.updated).toLocaleString('es-AR',{dateStyle:'short',timeStyle:'short'});text.append(strong);text.append(small);let open=document.createElement('button');open.textContent='Abrir';open.onclick=()=>{try{saveDraft();setProjectState(p.state);projectName=p.name;el('projectName').value=projectName;group='Todas';el('category').value=group;el('projectsDialog').close();render();saveDraft();say('Proyecto “'+p.name+'” recuperado.')}catch{say('Este proyecto no se puede abrir.')}};let remove=document.createElement('button');remove.textContent='Eliminar';remove.className='delete-project';remove.onclick=()=>{if(!window.confirm('¿Eliminar la copia “'+p.name+'”? El trabajo abierto no se modifica.'))return;try{let latest=storageData();latest.projects=latest.projects.filter(x=>x.id!==p.id);localStorage.setItem(STORAGE_KEY,JSON.stringify(latest));projectList()}catch{storageFailed()}};row.append(text);row.append(open);row.append(remove);target.append(row)})}catch{storageFailed()}}
el('projectName').oninput=e=>{projectName=e.target.value.trim().slice(0,60)||'Mi mosaico';queueSave()};
el('saveProject').onclick=()=>{try{let d=storageData();if(d.projects.length>=12){say('Ya hay 12 copias guardadas en este navegador.');return}d.projects.push({id:Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7),name:projectName,updated:Date.now(),state:projectState()});d.draft={name:projectName,updated:Date.now(),state:projectState()};localStorage.setItem(STORAGE_KEY,JSON.stringify(d));el('saveState').textContent='Copia guardada';say('Guardamos “'+projectName+'”. Podés abrirlo desde Mis proyectos.')}catch{storageFailed()}};
el('openProjects').onclick=()=>{projectList();el('projectsDialog').showModal()};
el('closeProjects').onclick=()=>el('projectsDialog').close();
window.addEventListener('pagehide',saveDraft);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')saveDraft()});
el('geometryStyle').onchange=e=>{snapshot();geometryStyle=e.target.value;render();say('Estilo '+(geometryStyle==='artesanal'?'artesanal':'clásico')+' seleccionado.')};

restoreDraft();render();

function activateColorTab(name,focus=false){for(let id of ['palettes','custom','grout']){let active=id===name;el('tab-'+id).setAttribute('aria-selected',String(active));el('tab-'+id).setAttribute('tabindex',active?'0':'-1');el('panel-'+id).hidden=!active;if(active&&focus)el('tab-'+id).focus()}}
for(let [index,name] of ['palettes','custom','grout'].entries()){el('tab-'+name).onclick=()=>activateColorTab(name);el('tab-'+name).onkeydown=e=>{let names=['palettes','custom','grout'];if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();let target=e.key==='Home'?0:e.key==='End'?2:(index+(e.key==='ArrowRight'?1:2))%3;activateColorTab(names[target],true)}}}
