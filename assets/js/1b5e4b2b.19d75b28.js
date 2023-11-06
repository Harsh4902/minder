"use strict";(self.webpackChunkstacklok=self.webpackChunkstacklok||[]).push([[4993],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},f="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),f=s(n),d=o,m=f["".concat(p,".").concat(d)]||f[d]||u[d]||i;return n?r.createElement(m,a(a({ref:t},c),{},{components:n})):r.createElement(m,a({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[f]="string"==typeof e?e:o,a[1]=l;for(var s=2;s<i;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},35944:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=n(87462),o=(n(67294),n(3905));const i={title:"Profile Introduction",sidebar_position:10},a="Profile Introduction",l={unversionedId:"profile_engine/profile_introduction",id:"profile_engine/profile_introduction",title:"Profile Introduction",description:"Minder allows you to define profiles for your software supply chain.",source:"@site/docs/profile_engine/profile_introduction.md",sourceDirName:"profile_engine",slug:"/profile_engine/profile_introduction",permalink:"/profile_engine/profile_introduction",draft:!1,tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"Profile Introduction",sidebar_position:10},sidebar:"minder",previous:{title:"Automatic Remediations",permalink:"/getting_started/remediations"},next:{title:"Manage profiles and violations",permalink:"/profile_engine/manage_profiles"}},p={},s=[],c={toc:s},f="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(f,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"profile-introduction"},"Profile Introduction"),(0,o.kt)("p",null,"Minder allows you to define profiles for your software supply chain."),(0,o.kt)("p",null,"The anatomy of a profile is the profile itself, which outlines the rules to be\nchecked, the rule types, and the evaluation engine."),(0,o.kt)("p",null,"As of time of writing, Minder supports the following evaluation engines:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("a",{parentName:"strong",href:"https://www.openprofileagent.org/"},"Open Profile Agent"))," (OPA) profile language."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("a",{parentName:"strong",href:"https://jqlang.github.io/jq/"},"JQ"))," - a lightweight and flexible command-line JSON processor.")),(0,o.kt)("p",null,"Each engine is designed to be extensible, allowing you to integrate your own\nlogic and processes."),(0,o.kt)("p",null,"Please see the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/stacklok/minder/tree/main/examples"},"examples")," directory for examples of profiles, and ",(0,o.kt)("a",{parentName:"p",href:"/profile_engine/manage_profiles"},"Manage Profiles")," for more details on how to set up profiles and rule types."))}u.isMDXComponent=!0}}]);