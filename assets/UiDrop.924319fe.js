import{d as f,c as r,e as i,F as g,l as h,o as c,n as b,t as v,i as S,v as C,u as D,f as n,q as I,s as p,x as y,m as B,U as w,y as $,h as U,p as q,k as j,_ as O}from"./index.8f72f6ed.js";const P={class:"stats"},V=i("span",{class:"stats__info stats__max"},"Max",-1),H=i("span",{class:"stats__info stats__current"},"Current",-1),N={class:"stats__list"},W={class:"stats__label"},z=["onUpdate:modelValue"],F=["onUpdate:modelValue"],M={class:"stat-buttons"},E=["onClick"],L=i("p",null,"+",-1),T=[L],x=["onClick"],A=i("p",null,"-",-1),G=[A],et=f({__name:"CharStats",props:{stats:{type:Object,required:!0},hirelingIndex:{type:Number,required:!1,default:null}},emits:["growStat","downStat"],setup(s,{emit:a}){const d=s,l=(o,t)=>{a("growStat",{stat:o,maxValue:t})},k=o=>{a("downStat",{stat:o})};return(o,t)=>(c(),r("div",P,[V,H,i("div",N,[(c(!0),r(g,null,h(d.stats,e=>(c(),r("div",{key:e.name,class:b(["stats__item",e.name==="hp"&&"stats__hp"])},[i("label",W,v(e.name),1),S(i("input",{"onUpdate:modelValue":m=>e.max=m,type:"number",class:"stats__input",readonly:""},null,8,z),[[C,e.max]]),S(i("input",{"onUpdate:modelValue":m=>e.current=m,type:"number",class:"stats__input",readonly:""},null,8,F),[[C,e.current]]),i("div",M,[i("button",{class:"stat-buttons__button stat-buttons__button--grow",onClick:m=>l(e.name,e.max)},T,8,E),i("button",{class:"stat-buttons__button stat-buttons__button--down",onClick:m=>k(e.name)},G,8,x)])],2))),128))])]))}});const J=["id","data-index","data-warband"],K={key:0,class:"body-items__name"},Q=["id","data-index","data-warband"],R={key:0,class:"pack-items__name"},st=f({__name:"CharInventory",props:{bodyBack:{type:Object,required:!0},packBack:{type:Object,required:!0},hirelingIndex:{type:Number,required:!1,default:null},isWarband:{type:String||null,required:!1,default:null}},setup(s){const a=s,d=D(),l=(o,t)=>{typeof a.hirelingIndex!="number"?o>+a.bodyBack[t].item.used?d.updateItems("bodyBack",{...a.bodyBack,[t]:{name:a.bodyBack[t].name,item:{...a.bodyBack[t].item,used:o}}}):d.updateItems("bodyBack",{...a.bodyBack,[t]:{name:a.bodyBack[t].name,item:{...a.bodyBack[t].item,used:+a.bodyBack[t].item.used-1}}}):o>+a.bodyBack[t].item.used?d.updateHirelingItems("bodyBack",{...a.bodyBack,[t]:{name:a.bodyBack[t].name,item:{...a.bodyBack[t].item,used:o}}},a.hirelingIndex):d.updateHirelingItems("bodyBack",{...a.bodyBack,[t]:{name:a.bodyBack[t].name,item:{...a.bodyBack[t].item,used:+a.bodyBack[t].item.used-1}}},a.hirelingIndex)},k=(o,t)=>{typeof a.hirelingIndex!="number"?o>+a.packBack[t].item.used?d.updateItems("packBack",{...a.packBack,[t]:{name:a.packBack[t].name,item:{...a.packBack[t].item,used:o}}}):d.updateItems("packBack",{...a.packBack,[t]:{name:a.packBack[t].name,item:{...a.packBack[t].item,used:+a.packBack[t].item.used-1}}}):o>+a.packBack[t].item.used?d.updateHirelingItems("packBack",{...a.packBack,[t]:{name:a.packBack[t].name,item:{...a.packBack[t].item,used:o}}},a.hirelingIndex):d.updateHirelingItems("packBack",{...a.packBack,[t]:{name:a.packBack[t].name,item:{...a.packBack[t].item,used:+a.packBack[t].item.used-1}}},a.hirelingIndex)};return(o,t)=>(c(),r("div",{class:b(["inventory",Object.keys(s.bodyBack).length===2&&"inventory--hireling"])},[i("div",{class:b(["body-items",Object.keys(s.bodyBack).length===2&&"body-items--hireling"])},[(c(!0),r(g,null,h(s.bodyBack,(e,m)=>(c(),r("div",{id:e.name.toString(),key:`it__${e}`,"data-index":s.hirelingIndex,"data-warband":s.isWarband,class:"body-items__back",onDrop:t[0]||(t[0]=u=>n(I)(u,"bodyBack",n(d))),onDragover:t[1]||(t[1]=(...u)=>n(p)&&n(p)(...u)),onDragleave:t[2]||(t[2]=(...u)=>n(y)&&n(y)(...u))},[e.item?(c(),B(w,{key:1,item:e.item,onPointClick:u=>l(u,m)},null,8,["item","onPointClick"])):(c(),r("span",K,v(e.name),1))],40,J))),128))],2),i("div",{class:b(["pack-items",Object.keys(s.packBack).length===4&&"pack-items--hireling"])},[(c(!0),r(g,null,h(s.packBack,(e,m)=>{var u;return c(),r("div",{id:e.name.toString(),key:`pb__${e}`,"data-index":s.hirelingIndex,"data-warband":s.isWarband,class:"pack-items__back",onDrop:t[3]||(t[3]=_=>n(I)(_,"packBack",n(d))),onDragover:t[4]||(t[4]=(..._)=>n(p)&&n(p)(..._)),onDragleave:t[5]||(t[5]=(..._)=>n(y)&&n(y)(..._))},[e.item?((u=e.item)==null?void 0:u.group)==="conditions"?(c(),B($,{key:1,condition:e.item},null,8,["condition"])):(c(),B(w,{key:2,item:e.item,onPointClick:_=>k(_,m)},null,8,["item","onPointClick"])):(c(),r("span",R,v(e.name),1))],40,Q)}),128))],2)],2))}});const X=s=>(q("data-v-32a6853d"),s=s(),j(),s),Y=X(()=>i("label",{id:"drop",class:"label"},"Drop item here to remove",-1)),Z=[Y],tt=f({__name:"UiDrop",props:{width:{default:221}},setup(s){const a=D();return(d,l)=>(c(),r("div",{class:"input",style:U({width:`${s.width}px`}),onDrop:l[0]||(l[0]=k=>n(I)(k,"drop",n(a))),onDragover:l[1]||(l[1]=(...k)=>n(p)&&n(p)(...k)),onDragleave:l[2]||(l[2]=(...k)=>n(y)&&n(y)(...k))},Z,36))}});const nt=O(tt,[["__scopeId","data-v-32a6853d"]]);export{nt as U,et as _,st as a};