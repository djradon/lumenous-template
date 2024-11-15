var w=Object.defineProperty;var o=(i,t)=>w(i,"name",{value:t,configurable:!0});var f=class extends HTMLElement{static{o(this,"LumeCode")}constructor(){super(),this.tabFocus=0,this.tabs=this.querySelectorAll('[role="tab"]'),this.tabList=this.querySelector('[role="tablist"]'),this.buttonBoundListener=this.handleTabChange.bind(this),this.keydownBoundListener=this.handleKeyPress.bind(this)}connectedCallback(){this.tabs.forEach(t=>{t.addEventListener("click",this.buttonBoundListener)}),this.tabList.addEventListener("keydown",this.keydownBoundListener)}handleKeyPress(t){(t.keyCode===39||t.keyCode===37)&&(this.tabs[this.tabFocus].setAttribute("tabindex",-1),t.keyCode===39?(this.tabFocus++,this.tabFocus>=this.tabs.length&&(this.tabFocus=0)):t.keyCode===37&&(this.tabFocus--,this.tabFocus<0&&(this.tabFocus=this.tabs.length-1)),this.tabs[this.tabFocus].setAttribute("tabindex",0),this.tabs[this.tabFocus].focus())}handleTabChange(t){let e=t.target,n=e.parentNode.parentNode,r=e.getAttribute("aria-controls");n.querySelectorAll('[aria-selected="true"]').forEach(a=>{a!==e&&(a.setAttribute("aria-selected",!1),a.setAttribute("tabindex",-1),a.classList.remove("is-active"))}),e.setAttribute("aria-selected",!0),e.setAttribute("tabindex",0),e.classList.add("is-active"),n.parentNode.querySelectorAll('[role="tabpanel"]').forEach(a=>{a.id===r?a.removeAttribute("hidden"):a.setAttribute("hidden",!0)})}};var m,b=class extends HTMLElement{static{o(this,"Carousel")}static get observedAttributes(){return["index"]}constructor(){super(),this.scrollBehavior="smooth",this.history="push"}connectedCallback(){if(S(this,"position")==="static"&&(this.style.position="relative"),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:this.index-=1,t.preventDefault();break;case 39:this.index+=1,t.preventDefault();break}}),C(this),A(this),this.querySelector(":scope > [id]")){self.addEventListener("popstate",()=>E(this,document.location.hash)),document.location.hash?E(this,document.location.hash):this.children[0]&&x(this.children[0],this.history);let t,e=o(()=>{clearTimeout(t),t=setTimeout(()=>{let s=this.target;x(s,this.history),this.lastTarget=s},50)},"handleScroll");this.addEventListener("scroll",e,!1)}window.ResizeObserver&&(m||(m=new ResizeObserver(t=>{for(let e of t){let s=e.target;if(s.lastTarget){let n=s.scrollBehavior;s.scrollBehavior="auto",s.target=s.lastTarget,s.scrollBehavior=n}}})),m.observe(this))}disconnectedCallback(){m&&m.unobserver(this)}attributeChangedCallback(t,e,s){if(t==="index"){this.index=parseInt(s);return}}next(t=1){this.scrollFromLeft+=this.clientWidth*t}prev(t=1){this.scrollFromLeft-=this.clientWidth*t}get index(){let t=this.children.length-1,e=this.children;for(let s=0;s<t;s++){let n=e[s],r=Math.round(n.offsetLeft-this.clientWidth/2);if(this.scrollLeft>=r&&this.scrollLeft<=r+n.clientWidth)return s}return t}set index(t){if(typeof t!="number"||Math.round(t)!==t)throw new Error("Invalid index value. It must be an integer");let e=this.children;t=Math.min(Math.max(t,0),e.length-1),this.target=e[t]}get target(){return this.children[this.index]}set target(t){if(t.parentElement!==this)throw new Error("The target must be a direct child of this element");let e=Math.round(t.offsetLeft-this.clientWidth/2+t.clientWidth/2);this.scrollFromLeft=Math.max(0,e),this.lastTarget=t}get scrollFromLeft(){return this.scrollLeft}set scrollFromLeft(t){try{this.scroll({left:t,behavior:this.scrollBehavior})}catch{this.scrollLeft=t}}get scrollFromRight(){return this.scrollWidth-this.clientWidth-this.scrollLeft}set scrollFromRight(t){this.scrollFromLeft=this.scrollWidth-this.clientWidth-t}};function E(i,t){if(!t)return;let e=i.querySelector(`:scope > ${t}`);e&&(i.target=e)}o(E,"handleTarget");function x(i,t){if(!(!i.id||document.location.hash===`#${i.id}`))switch(t){case"push":history.pushState({},null,`#${i.id}`);break;case"replace":history.replaceState({},null,`#${i.id}`);break}}o(x,"handleHistory");function S(i,t){let e=getComputedStyle(i)[t];if(e&&e.replace(/none/g,"").trim())return e}o(S,"getStyleValue");function C(i){"scroll"in i&&"scrollBehavior"in i.style||console.info("@oom/carusel [compatibility]:",'Missing smooth scrolling support. Consider using a polyfill like "smoothscroll-polyfill"')}o(C,"checkScrollSupport");function A(i){i.getAttribute("role")!=="region"&&console.info("@oom/carusel [accesibility]:",'Missing role="region" attribute in the carousel element'),i.hasAttribute("aria-label")||console.info("@oom/carusel [accesibility]:","Missing aria-label attribute in the carousel element"),i.hasAttribute("tabindex")||console.info("@oom/carusel [accesibility]:",'Missing tabindex="0" attribute in the carousel element')}o(A,"checkA11y");var p=class extends HTMLElement{static{o(this,"LumeCode")}connectedCallback(){let t=this.querySelectorAll("button"),e=document.querySelector(this.getAttribute("target"));t.forEach(r=>{r.addEventListener("click",()=>{r.value==="next"?e.next():e.prev()})});let s;e.addEventListener("scroll",()=>{clearTimeout(s),s=setTimeout(n,50)},!1),e.addEventListener("mouseenter",n);function n(){t.forEach(r=>{switch(r.value){case"next":r.disabled=e.scrollFromRight<5;break;case"prev":r.disabled=e.scrollFromLeft<5;break}})}o(n,"showHideButtons"),n()}};var g=class extends HTMLElement{static{o(this,"LumeFilter")}connectedCallback(){let t=this.querySelector("form"),e=this.querySelectorAll(":scope > ul > li"),s=this.querySelector(":scope > footer"),n=new URLSearchParams(location.search);for(let c of n.keys()){let l=t[c];l&&(l.checked=!0)}t.addEventListener("submit",c=>{r(),c.preventDefault()}),t.addEventListener("input",r),r();function r(){t.querySelectorAll("input[type='checkbox']").forEach(d=>{let u=d.closest(".button");u&&u.classList.toggle("is-active",d.checked)});let c=new FormData(t);a(c);let l=new URLSearchParams(c).toString();if(l!==document.location.search){let d=l?`?${l}`:document.location.pathname;history.pushState({},null,d)}}o(r,"onChange");function a(c){let l=[],d;for(let[h,k]of c.entries()){if(h==="status"){d=k;continue}l.push(h)}let u=!0;e.forEach(h=>{switch(d){case"enabled":if(!h.classList.contains("is-enabled")){h.hidden=!0;return}break;case"disabled":if(h.classList.contains("is-enabled")){h.hidden=!0;return}break}h.hidden=l.length&&!l.every(k=>h.dataset.tags.split(",").includes(k)),h.hidden||(u=!1)}),s.hidden=!u}o(a,"filter")}};var v=class extends HTMLElement{static{o(this,"LumeDevices")}connectedCallback(){let t=this.querySelector("form"),e=this.querySelectorAll(".device"),s=new URLSearchParams(window.location.search);for(let[r,a]of s.entries()){let c=t[r];c&&(c.value=a)}t.addEventListener("submit",r=>{n(),r.preventDefault()}),t.addEventListener("input",n),n();function n(){let r=new FormData(t),a=r.get("device"),c=r.get("theme");e.forEach(l=>{l.hidden=l.dataset.device!==a||l.dataset.theme!==c})}o(n,"onChange")}};var y=class extends HTMLElement{static{o(this,"LumeShield")}async connectedCallback(){let t=await F(this.dataset.name);if(t){let e=this.dataset.visibleName||t.name;this.innerHTML=`
      <a href="${t.url}">
        ${e}<span>${t.version.replace(/^v/,"")}</span>
      </a>`}}};async function F(i){let t=`https://nudd.deno.dev/${i}`,e=await fetch(t);if(e.ok)return await e.json()}o(F,"getData");var L=class extends HTMLElement{static{o(this,"LumeCopy")}connectedCallback(){let t=this.querySelector("button"),e=t.dataset.text;t.addEventListener("click",async()=>{await navigator.clipboard.writeText(e);let s=document.createElement("div");s.classList.add("tooltip"),s.textContent="Copied!",t.appendChild(s),setTimeout(()=>{s.remove()},2e3)})}};customElements.define("lume-code",f);customElements.define("lume-carousel",b);customElements.define("lume-carousel-controls",p);customElements.define("lume-filter",g);customElements.define("lume-devices",v);customElements.define("lume-shield",y);customElements.define("lume-copy",L);var T=navigator.userAgent,M=T.indexOf("Chrome")>-1;M&&new ReportingObserver(t=>{for(let e of t)console.log(e.type,e.url,e.body)},{buffered:!0}).observe();
