"use strict";(self.webpackChunkstacklok=self.webpackChunkstacklok||[]).push([[3198],{3905:(t,e,i)=>{i.d(e,{Zo:()=>p,kt:()=>y});var r=i(7294);function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function o(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function l(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?o(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function s(t,e){if(null==t)return{};var i,r,n=function(t,e){if(null==t)return{};var i,r,n={},o=Object.keys(t);for(r=0;r<o.length;r++)i=o[r],e.indexOf(i)>=0||(n[i]=t[i]);return n}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)i=o[r],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(t,i)&&(n[i]=t[i])}return n}var a=r.createContext({}),c=function(t){var e=r.useContext(a),i=e;return t&&(i="function"==typeof t?t(e):l(l({},e),t)),i},p=function(t){var e=c(t.components);return r.createElement(a.Provider,{value:e},t.children)},u="mdxType",d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var i=t.components,n=t.mdxType,o=t.originalType,a=t.parentName,p=s(t,["components","mdxType","originalType","parentName"]),u=c(i),m=n,y=u["".concat(a,".").concat(m)]||u[m]||d[m]||o;return i?r.createElement(y,l(l({ref:e},p),{},{components:i})):r.createElement(y,l({ref:e},p))}));function y(t,e){var i=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var o=i.length,l=new Array(o);l[0]=m;var s={};for(var a in e)hasOwnProperty.call(e,a)&&(s[a]=e[a]);s.originalType=t,s[u]="string"==typeof t?t:n,l[1]=s;for(var c=2;c<o;c++)l[c]=i[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,i)}m.displayName="MDXCreateElement"},9667:(t,e,i)=>{i.r(e),i.d(e,{assets:()=>a,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=i(7462),n=(i(7294),i(3905));const o={},l=void 0,s={unversionedId:"cli/medic_policy_status_list",id:"cli/medic_policy_status_list",title:"medic_policy_status_list",description:"medic policy_status list",source:"@site/docs/cli/medic_policy_status_list.md",sourceDirName:"cli",slug:"/cli/medic_policy_status_list",permalink:"/cli/medic_policy_status_list",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"mediator",previous:{title:"medic_policy_status",permalink:"/cli/medic_policy_status"},next:{title:"medic_policy_type",permalink:"/cli/medic_policy_type"}},a={},c=[{value:"medic policy_status list",id:"medic-policy_status-list",level:2},{value:"Synopsis",id:"synopsis",level:3},{value:"Options",id:"options",level:3},{value:"Options inherited from parent commands",id:"options-inherited-from-parent-commands",level:3},{value:"SEE ALSO",id:"see-also",level:3}],p={toc:c},u="wrapper";function d(t){let{components:e,...i}=t;return(0,n.kt)(u,(0,r.Z)({},p,i,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"medic-policy_status-list"},"medic policy_status list"),(0,n.kt)("p",null,"List policy status within a mediator control plane"),(0,n.kt)("h3",{id:"synopsis"},"Synopsis"),(0,n.kt)("p",null,"The medic policy_status list subcommand lets you list policy status within a\nmediator control plane for an specific provider/group or policy id."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"medic policy_status list [flags]\n")),(0,n.kt)("h3",{id:"options"},"Options"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'  -a, --all               List all policy violations\n  -g, --group string      group id to list policy status for\n  -h, --help              help for list\n  -o, --output string     Output format (json or yaml) (default "yaml")\n  -i, --policy int32      policy id to list policy status for\n  -p, --provider string   Provider to list policy status for (default "github")\n')),(0,n.kt)("h3",{id:"options-inherited-from-parent-commands"},"Options inherited from parent commands"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'      --config string      config file (default is $PWD/config.yaml)\n      --grpc-host string   Server host (default "localhost")\n      --grpc-port int      Server port (default 8090)\n')),(0,n.kt)("h3",{id:"see-also"},"SEE ALSO"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/cli/medic_policy_status"},"medic policy_status"),"\t - Manage policy status within a mediator control plane")))}d.isMDXComponent=!0}}]);