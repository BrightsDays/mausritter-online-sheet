import{d as w,u as i,z as v,a as S,c as _,e as r,j as o,f as u,A as l,o as b,p as g,k as h,_ as y}from"./index.8f72f6ed.js";import{_ as W,a as x,U as C}from"./UiDrop.924319fe.js";const d=n=>(g("data-v-e8877dc2"),n=n(),h(),n),B={key:0,class:"warband"},$={class:"header"},I=d(()=>r("h3",{class:"heading"}," Warband ",-1)),D=d(()=>r("div",{class:"details"}," Your warband is formed by 20 fighting mice, plus one follower (luggage porter, cook, armourer) for every fighter. ",-1)),P={class:"wrapper"},U={key:1,class:"warband column"},V=d(()=>r("span",{class:"details"}," You have not formed warband. ",-1)),N=w({__name:"WarbandCard",setup(n){const f=i(),e=v(f,"warband"),c=i(),p=S(),m=s=>{var t;const a=(t=e.value)==null?void 0:t.stats[s.stat];a&&a.current<s.maxValue&&c.setWarbandStat(s.stat,+a.current+1)},k=s=>{var t;const a=(t=e.value)==null?void 0:t.stats[s.stat];a&&a.current>0&&c.setWarbandStat(s.stat,+a.current-1)};return(s,a)=>e.value?(b(),_("div",B,[r("div",$,[I,o(l,{type:"simple",text:"Disband",onClick:a[0]||(a[0]=t=>u(p).setPopup("disbandWarband"))})]),D,o(C,{width:243}),r("div",P,[o(W,{stats:e.value.stats,onGrowStat:a[1]||(a[1]=t=>m(t)),onDownStat:a[2]||(a[2]=t=>k(t))},null,8,["stats"]),o(x,{"body-back":e.value.bodyBack,"pack-back":e.value.packBack,"is-warband":"warband"},null,8,["body-back","pack-back"])])])):(b(),_("div",U,[V,o(l,{text:"Form warband",type:"big",onClick:a[3]||(a[3]=t=>u(p).setPopup("formWarband"))})]))}});const z=y(N,[["__scopeId","data-v-e8877dc2"]]);export{z as default};
