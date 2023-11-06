"use strict";(self.webpackChunkstacklok=self.webpackChunkstacklok||[]).push([[3686],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(r),m=a,f=d["".concat(p,".").concat(m)]||d[m]||c[m]||i;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[d]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},66993:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var n=r(87462),a=(r(67294),r(3905));const i={title:"Setting up a profile for auto-remediation",sidebar_position:50},o="Setting up a Profile for Autoremediation",l={unversionedId:"how-to/setup-autoremediation",id:"how-to/setup-autoremediation",title:"Setting up a profile for auto-remediation",description:"Prerequisites",source:"@site/docs/how-to/setup-autoremediation.md",sourceDirName:"how-to",slug:"/how-to/setup-autoremediation",permalink:"/how-to/setup-autoremediation",draft:!1,tags:[],version:"current",sidebarPosition:50,frontMatter:{title:"Setting up a profile for auto-remediation",sidebar_position:50},sidebar:"minder",previous:{title:"Setting up a profile for alerts",permalink:"/how-to/setup-alerts"}},p={},s=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Create a rule types that you want to use auto-remediation on",id:"create-a-rule-types-that-you-want-to-use-auto-remediation-on",level:2},{value:"Create a profile",id:"create-a-profile",level:2},{value:"Limitations",id:"limitations",level:2}],u={toc:s},d="wrapper";function c(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"setting-up-a-profile-for-autoremediation"},"Setting up a Profile for Autoremediation"),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The ",(0,a.kt)("inlineCode",{parentName:"li"},"minder")," CLI application"),(0,a.kt)("li",{parentName:"ul"},"A Minder account"),(0,a.kt)("li",{parentName:"ul"},"An enrolled Provider (e.g., GitHub) and registered repositories")),(0,a.kt)("h2",{id:"create-a-rule-types-that-you-want-to-use-auto-remediation-on"},"Create a rule types that you want to use auto-remediation on"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"remediate")," feature is available for all rule types that have the ",(0,a.kt)("inlineCode",{parentName:"p"},"remediate")," section defined in their\n",(0,a.kt)("inlineCode",{parentName:"p"},"<alert-type>.yaml")," file. When the ",(0,a.kt)("inlineCode",{parentName:"p"},"remediate")," feature is turned ",(0,a.kt)("inlineCode",{parentName:"p"},"on"),", Minder will try to automatically remediate failed\nrules based on their type, i.e., by processing a REST call to enable/disable a non-compliant repository setting or by\ncreating a pull request with a proposed fix."),(0,a.kt)("p",null,"In this example, we will use a rule type that checks if a repository allows having force pushes on their main branch,\nwhich is considered a security risk. If their setting allows for force pushes, Minder will automatically remediate it\nand disable it. "),(0,a.kt)("p",null,"The rule type is called ",(0,a.kt)("inlineCode",{parentName:"p"},"branch_protection_allow_force_pushes.yaml")," and is one of the reference rule types provided by\nthe Minder team."),(0,a.kt)("p",null,"Fetch all the reference rules by cloning the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/stacklok/minder-rules-and-profiles"},"minder-rules-and-profiles repository"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/stacklok/minder-rules-and-profiles.git\n")),(0,a.kt)("p",null,"In that directory, you can find all the reference rules and profiles."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"cd minder-rules-and-profiles\n")),(0,a.kt)("p",null,"Create the ",(0,a.kt)("inlineCode",{parentName:"p"},"branch_protection_allow_force_pushes")," rule type in Minder:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"minder rule_type create -f rule-types/github/branch_protection_allow_force_pushes.yaml\n")),(0,a.kt)("h2",{id:"create-a-profile"},"Create a profile"),(0,a.kt)("p",null,"Next, create a profile that applies the rule to all registered repositories."),(0,a.kt)("p",null,"Create a new file called ",(0,a.kt)("inlineCode",{parentName:"p"},"profile.yaml")," using the following profile definition and enable auto remediation by setting\n",(0,a.kt)("inlineCode",{parentName:"p"},"remediate")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"on"),". The other available values are ",(0,a.kt)("inlineCode",{parentName:"p"},"off"),"(default) and ",(0,a.kt)("inlineCode",{parentName:"p"},"dry_run"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'---\nversion: v1\ntype: profile\nname: disable-force-push-profile\ncontext:\n  provider: github\nremediate: "on"\nrepository:\n  - type: branch_protection_allow_force_pushes\n    params:\n      branch: main\n    def:\n      allow_force_pushes: false\n')),(0,a.kt)("p",null,"Create the profile in Minder:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"minder profile create -f profile.yaml\n")),(0,a.kt)("p",null,"Once the profile is created, Minder will monitor if the ",(0,a.kt)("inlineCode",{parentName:"p"},"allow_force_pushes")," setting on all of your registered\nrepositories is set to ",(0,a.kt)("inlineCode",{parentName:"p"},"false"),". If the setting is set to ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),", Minder will automatically remediate it by disabling it\nand will make sure to keep it that way until the profile is deleted."),(0,a.kt)("p",null,"Alerts are complementary to the remediation feature. If you have both ",(0,a.kt)("inlineCode",{parentName:"p"},"alert")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"remediation")," enabled for a profile,\nMinder will attempt to remediate it first. If the remediation fails, Minder will create an alert. If the remediation\nsucceeds, Minder will close any previously opened alerts related to that rule."),(0,a.kt)("h2",{id:"limitations"},"Limitations"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The auto remediation feature is only available for rule types that support it, i.e., have the ",(0,a.kt)("inlineCode",{parentName:"li"},"remediate")," section defined in their ",(0,a.kt)("inlineCode",{parentName:"li"},"<alert-type>.yaml")," file.")))}c.isMDXComponent=!0}}]);