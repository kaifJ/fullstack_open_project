/*! For license information please see main.ecf09ac2.js.LICENSE.txt */
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),_l=hl(yl||(yl=El`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),Cl=hl(bl||(bl=El`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),Al=(0,iu.ZP)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),kl=(0,iu.ZP)(pl,{name:"MuiTouchRipple",slot:"Ripple"})(wl||(wl=El`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),kW=hl(wW||(wW=_W`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),SW=(0,iu.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],t[`color${(0,cu.Z)(r.color)}`]]}})((e=>{let{ownerState:t,theme:r}=e;return(0,Hs.Z)({display:"inline-block"},"determinate"===t.variant&&{transition:r.transitions.create("transform")},"inherit"!==t.color&&{color:(r.vars||r).palette[t.color].main})}),(e=>{let{ownerState:t}=e;return"indeterminate"===t.variant&&dl(EW||(EW=_W`
      animation: ${0} 1.4s linear infinite;
    `),AW)})),MW=(0,iu.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),PW=(0,iu.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.circle,t[`circle${(0,cu.Z)(r.variant)}`],r.disableShrink&&t.circleDisableShrink]}})((e=>{let{ownerState:t,theme:r}=e;return(0,Hs.Z)({stroke:"currentColor"},"determinate"===t.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(e=>{let{ownerState:t}=e;return"indeterminate"===t.variant&&!t.disableShrink&&dl(xW||(xW=_W`
      animation: ${0} 1.4s ease-in-out infinite;
    `),kW)})),OW=o.forwardRef((function(e,t){const r=(0,lu.Z)({props:e,name:"MuiCircularProgress"}),{className:n,color:i="primary",disableShrink:o=!1,size:a=40,style:s,thickness:u=3.6,value:l=0,variant:c="indeterminate"}=r,f=(0,Zs.Z)(r,yW),d=(0,Hs.Z)({},r,{color:i,disableShrink:o,size:a,thickness:u,value:l,variant:c}),h=(e=>{const{classes:t,variant:r,color:n,disableShrink:i}=e,o={root:["root",r,`color${(0,cu.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,cu.Z)(r)}`,i&&"circleDisableShrink"]};return(0,qs.Z)(o,vW,t)})(d),p={},m={},g={};if("determinate"===c){const e=2*Math.PI*((CW-u)/2);p.strokeDasharray=e.toFixed(3),g["aria-valuenow"]=Math.round(l),p.strokeDashoffset=`${((100-l)/100*e).toFixed(3)}px`,m.transform="rotate(-90deg)"}return(0,tu.jsx)(SW,(0,Hs.Z)({className:(0,Ws.Z)(h.root,n),style:(0,Hs.Z)({width:a,height:a},m,s),ownerState:d,ref:t,role:"progressbar"},g,f,{children:(0,tu.jsx)(MW,{className:h.svg,ownerState:d,viewBox:"22 22 44 44",children:(0,tu.jsx)(PW,{className:h.circle,style:p,ownerState:d,cx:CW,cy:CW,r:(CW-u)/2,fill:"none",strokeWidth:u})})}))})),IW=OW,RW={container:{display:"flex",flex:1,justifyContent:"center",alignItems:"center",height:"100vh"}},TW=()=>(0,tu.jsx)("div",{style:RW.container,children:(0,tu.jsx)(IW,{})}),NW=()=>{const e=Cs(),[t,r]=o.useState(!0);return o.useEffect((()=>{const t=localStorage.getItem("jwtToken");e(t?"/":"/login"),r(!1)}),[]),t?(0,tu.jsx)(TW,{}):(0,tu.jsxs)(Fs,{children:[(0,tu.jsx)(js,{path:"/",element:(0,tu.jsx)(gW,{})}),(0,tu.jsx)(js,{path:"/register",element:(0,tu.jsx)(Hl,{})}),(0,tu.jsx)(js,{path:"/login",element:(0,tu.jsx)(Gl,{})})]})};s.createRoot(document.getElementById("root")).render((0,tu.jsx)(Yd,{initializeOnMount:!1,children:(0,tu.jsx)(aA,{children:(0,tu.jsx)(Sf,{children:(0,tu.jsx)(NW,{})})})}))})()})();