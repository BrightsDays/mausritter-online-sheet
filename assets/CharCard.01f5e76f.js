import{d as v,u as x,a as w,b as U,o as c,c as d,e as i,f as n,g as m,w as V,n as D,h as P,i as b,v as $,j as h,p as C,k as I,_ as y,F as S,r as M,t as k,l as N,m as H}from"./index.8f72f6ed.js";import{_ as L,U as j,a as B}from"./UiDrop.924319fe.js";const f=e=>(C("data-v-9a6aab27"),e=e(),I(),e),z={class:"info"},F={key:0,for:"upload",class:"label"},R=f(()=>i("svg",{width:"16",height:"16",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},[i("path",{d:"M1 1L8 8M15 15L8 8M8 8L15 1L1 15",stroke:"#272727","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)),E=[R],G={class:"info__stats"},A={class:"exp-input"},T=f(()=>i("label",{class:"exp-input__label"},"Level / Exp",-1)),Y=f(()=>i("span",{class:"exp-input__devider"},"/",-1)),q=["disabled"],J=f(()=>i("p",null,"+",-1)),K=[J],O=v({__name:"CharInfo",setup(e){const t=x(),p=w(),u=U(),_=()=>p.setPopup("levelUp"),g=l=>{const s=l.target.files,o=new FileReader;if(s&&s.length>0&&s[0].size/1024**2>2){u.setNotification({type:"error",message:"Your file is to big"});return}o.onload=()=>{o.result&&t.setPortrait(o.result.toString())},s&&s[0]&&o.readAsDataURL(s[0])},r=l=>{const s=t.stats[l.stat];s&&s.current<l.maxValue&&t.setStat(l.stat,+s.current+1)},a=l=>{const s=t.stats[l.stat];s&&s.current>0&&t.setStat(l.stat,+s.current-1)};return(l,s)=>(c(),d("div",z,[i("div",{class:D(["portrait",{uploaded:n(t).portrait}]),style:P({backgroundImage:`url(${n(t).portrait})`})},[i("input",{id:"upload",ref:"upload",type:"file",class:"input",accept:"image/png, image/jpeg",onChange:s[0]||(s[0]=o=>g(o))},null,544),n(t).portrait?m("",!0):(c(),d("label",F," Upload portrait (up to 2 MB) ")),n(t).portrait?(c(),d("button",{key:1,class:"clear",onClick:s[1]||(s[1]=V(o=>n(t).setPortrait(null),["prevent"]))},E)):m("",!0)],6),i("div",G,[i("div",A,[T,b(i("input",{"onUpdate:modelValue":s[2]||(s[2]=o=>n(t).level=o),class:"exp-input__input exp-input__level",readonly:""},null,512),[[$,n(t).level]]),Y,b(i("input",{"onUpdate:modelValue":s[3]||(s[3]=o=>n(t).exp=o),class:"exp-input__input exp-input__exp",readonly:""},null,512),[[$,n(t).exp]]),i("button",{class:"exp-input__add",disabled:!n(t).name,onClick:_},K,8,q)]),h(L,{stats:n(t).stats,onGrowStat:s[4]||(s[4]=o=>r(o)),onDownStat:s[5]||(s[5]=o=>a(o))},null,8,["stats"])])]))}});const Q=y(O,[["__scopeId","data-v-9a6aab27"]]),W={class:"items__header"},X=i("h2",{class:"items__heading"}," Inventory ",-1),Z={class:"pips-input"},tt=i("label",{class:"pips-input__label"},"Pips",-1),et=["value"],st=v({__name:"CharItems",setup(e){const t=x(),p=u=>t.setValue("pips",+u.value);return(u,_)=>{const g=M("maska");return c(),d(S,null,[i("header",W,[X,h(j),i("div",Z,[tt,b(i("input",{class:"pips-input__input",value:n(t).pips,onInput:_[0]||(_[0]=r=>p(r.target))},null,40,et),[[g,"###"]])])]),h(B,{"body-back":n(t).bodyBack,"pack-back":n(t).packBack},null,8,["body-back","pack-back"])],64)}}});const it={class:"hireling"},nt={class:"header"},at={class:"heading"},ot={class:"details"},rt={class:"wrapper"},lt=v({__name:"HirelingCard",props:{hireling:null},setup(e){const t=x(),p=w(),u=r=>{if(typeof e.hireling.index=="number"){const a=t.hirelings[e.hireling.index].stats[r.stat];a&&a.current<r.maxValue&&t.setHirelingStat(r.stat,+a.current+1,e.hireling.index)}},_=r=>{if(typeof e.hireling.index=="number"){const a=t.hirelings[e.hireling.index].stats[r.stat];a&&a.current>0&&t.setHirelingStat(r.stat,+a.current-1,e.hireling.index)}},g=r=>{r&&(p.setPopup("removeHireling"),t.setHirelingIndex(r))};return(r,a)=>(c(),d("div",it,[i("div",nt,[i("h3",at,k(e.hireling.name),1),e.hireling.index?(c(),d("button",{key:0,class:"remove",onClick:a[0]||(a[0]=l=>g(e.hireling.index))}," Remove ")):m("",!0)]),i("div",ot," Look: "+k(e.hireling.details),1),i("div",rt,[h(L,{stats:e.hireling.stats,"hireling-index":e.hireling.index,onGrowStat:a[1]||(a[1]=l=>u(l)),onDownStat:a[2]||(a[2]=l=>_(l))},null,8,["stats","hireling-index"]),h(B,{"body-back":e.hireling.bodyBack,"pack-back":e.hireling.packBack,"hireling-index":e.hireling.index},null,8,["body-back","pack-back","hireling-index"])])]))}});const ct=y(lt,[["__scopeId","data-v-0759de19"]]),dt=e=>(C("data-v-bbe33171"),e=e(),I(),e),_t={class:"hirelings"},ut={class:"header"},pt=dt(()=>i("h2",{class:"heading"}," Hirelings ",-1)),ht={class:"count"},gt={key:0,class:"list"},mt=v({__name:"HirelingsList",setup(e){const t=x();return(p,u)=>(c(),d("div",_t,[i("div",ut,[pt,i("span",ht,k(n(t).hirelings.length),1)]),n(t).hirelings?(c(),d("div",gt,[(c(!0),d(S,null,N(n(t).hirelings,_=>(c(),H(ct,{key:`hr__${_}`,hireling:_},null,8,["hireling"]))),128))])):m("",!0)]))}});const vt=y(mt,[["__scopeId","data-v-bbe33171"]]),bt=v({__name:"CharCard",setup(e){const t=x();return(p,u)=>(c(),d(S,null,[h(Q),h(st),n(t).hirelings.length?(c(),H(vt,{key:0})):m("",!0)],64))}});export{bt as default};