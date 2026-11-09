const canvas=document.getElementById("sky"),ctx=canvas.getContext("2d");
let w,h,dpr,particles=[];
function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:Math.min(150,Math.floor(w*h/8500))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.5+.3,a:Math.random()*.6+.15,s:Math.random()*.008+.002,p:Math.random()*6.28}))}
function draw(){ctx.clearRect(0,0,w,h);for(const p of particles){p.p+=p.s;const alpha=p.a*(.55+.45*Math.sin(p.p));ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,225,165,${alpha})`;ctx.fill()}requestAnimationFrame(draw)}
addEventListener("resize",resize);resize();draw();

const wishes=[
 {title:"A little more happiness",text:"May ordinary days surprise you with extraordinary reasons to smile.",symbol:"☼"},
 {title:"Dreams that take flight",text:"May your hard work meet the right opportunities, and may every brave dream find its wings.",symbol:"✧"},
 {title:"Peace in every season",text:"May you find calm in the chaos, comfort in the little things, and strength for every new day.",symbol:"❋"},
 {title:"Laughter that stays",text:"May your days be sprinkled with good people, silly moments and memories worth keeping.",symbol:"♡"},
 {title:"Beautiful beginnings",text:"May every new chapter bring fresh possibilities and something wonderful you never expected.",symbol:"✦"}
];
const intro=document.getElementById("intro"),universe=document.getElementById("universe"),modal=document.getElementById("modal");
const nodes=[...document.querySelectorAll(".star-node")],found=new Set();
const count=document.getElementById("count"),completion=document.getElementById("completion");
let activeIndex=null;
document.getElementById("begin").addEventListener("click",()=>{intro.classList.add("hidden");universe.classList.remove("hidden");});
function openWish(i){activeIndex=i;const item=wishes[i];document.getElementById("modalSymbol").textContent=item.symbol;document.getElementById("modalTitle").textContent=item.title;document.getElementById("modalText").textContent=item.text;document.getElementById("modalEyebrow").textContent=`WONDER NUMBER 0${i+1}`;modal.classList.add("open");modal.setAttribute("aria-hidden","false");}
function closeWish(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");}
nodes.forEach(node=>node.addEventListener("click",()=>{const i=Number(node.dataset.star);if(found.has(i)){document.getElementById("wishTitle").textContent=wishes[i].title;document.getElementById("wishText").textContent=wishes[i].text;return;}openWish(i)}));
document.getElementById("closeModal").addEventListener("click",closeWish);
modal.addEventListener("click",e=>{if(e.target===modal)closeWish()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeWish()});
document.getElementById("collect").addEventListener("click",()=>{if(activeIndex===null)return;found.add(activeIndex);nodes[activeIndex].classList.add("found");nodes[activeIndex].setAttribute("aria-label",`Star ${activeIndex+1}, discovered`);count.textContent=found.size;document.getElementById("wishTitle").textContent=wishes[activeIndex].title;document.getElementById("wishText").textContent=wishes[activeIndex].text;closeWish();if(found.size===5){document.getElementById("constellationPath").classList.add("complete");setTimeout(()=>{completion.classList.add("show");completion.scrollIntoView({behavior:"smooth",block:"center"})},650)}});
document.getElementById("again").addEventListener("click",()=>{found.clear();count.textContent="0";nodes.forEach((n,i)=>{n.classList.remove("found");n.setAttribute("aria-label",`Discover star ${i+1}`)});completion.classList.remove("show");document.getElementById("constellationPath").classList.remove("complete");document.getElementById("wishTitle").textContent="A wish is waiting...";document.getElementById("wishText").textContent="Choose any glowing star above to reveal it.";document.getElementById("universe").scrollIntoView({behavior:"smooth"})});
