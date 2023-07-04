"use strict";(self.webpackChunkstacklok=self.webpackChunkstacklok||[]).push([[3010],{3905:(e,t,o)=>{o.d(t,{Zo:()=>s,kt:()=>f});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function l(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?l(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):l(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function p(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)o=l[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)o=l[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var c=n.createContext({}),a=function(e){var t=n.useContext(c),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},s=function(e){var t=a(e.components);return n.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=a(o),d=r,f=m["".concat(c,".").concat(d)]||m[d]||u[d]||l;return o?n.createElement(f,i(i({ref:t},s),{},{components:o})):n.createElement(f,i({ref:t},s))}));function f(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=o.length,i=new Array(l);i[0]=d;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[m]="string"==typeof e?e:r,i[1]=p;for(var a=2;a<l;a++)i[a]=o[a];return n.createElement.apply(null,i)}return n.createElement.apply(null,o)}d.displayName="MDXCreateElement"},2865:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>p,toc:()=>a});var n=o(7462),r=(o(7294),o(3905));const l={},i=void 0,p={unversionedId:"cli/medic_completion_powershell",id:"cli/medic_completion_powershell",title:"medic_completion_powershell",description:"medic completion powershell",source:"@site/docs/cli/medic_completion_powershell.md",sourceDirName:"cli",slug:"/cli/medic_completion_powershell",permalink:"/cli/medic_completion_powershell",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"mediator",previous:{title:"medic_completion_fish",permalink:"/cli/medic_completion_fish"},next:{title:"medic_completion_zsh",permalink:"/cli/medic_completion_zsh"}},c={},a=[{value:"medic completion powershell",id:"medic-completion-powershell",level:2},{value:"Synopsis",id:"synopsis",level:3},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3},{value:"Auto generated by spf13/cobra on 30-Jun-2023",id:"auto-generated-by-spf13cobra-on-30-jun-2023",level:6}],s={toc:a},m="wrapper";function u(e){let{components:t,...o}=e;return(0,r.kt)(m,(0,n.Z)({},s,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"medic-completion-powershell"},"medic completion powershell"),(0,r.kt)("p",null,"Generate the autocompletion script for powershell"),(0,r.kt)("h3",{id:"synopsis"},"Synopsis"),(0,r.kt)("p",null,"Generate the autocompletion script for powershell."),(0,r.kt)("p",null,"To load completions in your current shell session:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"medic completion powershell | Out-String | Invoke-Expression\n")),(0,r.kt)("p",null,"To load completions for every new session, add the output of the above command\nto your powershell profile."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"medic completion powershell [flags]\n")),(0,r.kt)("h3",{id:"options"},"Options"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"  -h, --help              help for powershell\n      --no-descriptions   disable completion descriptions\n")),(0,r.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'      --config string      config file (default is $PWD/config.yaml)\n      --grpc-host string   Server host (default "localhost")\n      --grpc-port int      Server port (default 8090)\n')),(0,r.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/cli/medic_completion"},"medic completion"),"\t - Generate the autocompletion script for the specified shell")),(0,r.kt)("h6",{id:"auto-generated-by-spf13cobra-on-30-jun-2023"},"Auto generated by spf13/cobra on 30-Jun-2023"))}u.isMDXComponent=!0}}]);