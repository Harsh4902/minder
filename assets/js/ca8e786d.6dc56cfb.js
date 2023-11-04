"use strict";(self.webpackChunkstacklok=self.webpackChunkstacklok||[]).push([[6378],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=s(n),g=r,m=u["".concat(p,".").concat(g)]||u[g]||d[g]||i;return n?a.createElement(m,l(l({ref:t},c),{},{components:n})):a.createElement(m,l({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=g;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[u]="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},99151:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var a=n(87462),r=(n(67294),n(3905));const i={title:"Get Hacking",sidebar_position:1},l="Get Hacking",o={unversionedId:"developer_guide/get-hacking",id:"developer_guide/get-hacking",title:"Get Hacking",description:"Prerequisites",source:"@site/docs/developer_guide/get-hacking.md",sourceDirName:"developer_guide",slug:"/developer_guide/get-hacking",permalink:"/developer_guide/get-hacking",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Get Hacking",sidebar_position:1},sidebar:"minder",previous:{title:"Configure OAuth Provider",permalink:"/run_minder_server/config_oauth"},next:{title:"Architecture",permalink:"/developer_guide/architecture"}},p={},s=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Clone the repository",id:"clone-the-repository",level:2},{value:"Build the application",id:"build-the-application",level:2},{value:"Run the application",id:"run-the-application",level:2},{value:"Run the tests",id:"run-the-tests",level:2},{value:"Install tools",id:"install-tools",level:2},{value:"CLI",id:"cli",level:2},{value:"APIs",id:"apis",level:2},{value:"How to generate protobuf stubs",id:"how-to-generate-protobuf-stubs",level:2}],c={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"get-hacking"},"Get Hacking"),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://golang.org/doc/install"},"Go")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.docker.com/get-docker/"},"Docker")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.docker.com/compose/install/"},"Docker Compose"))),(0,r.kt)("h2",{id:"clone-the-repository"},"Clone the repository"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git clone git@github.com:stacklok/minder.git\n")),(0,r.kt)("h2",{id:"build-the-application"},"Build the application"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make build\n")),(0,r.kt)("h2",{id:"run-the-application"},"Run the application"),(0,r.kt)("p",null,"Note that the application requires a database to be running. This can be achieved\nusing docker-compose:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'KO_DOCKER_REPO=ko.local services="postgres keycloak migrateup" make run-docker\n')),(0,r.kt)("p",null,"Then run the application"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"bin/minder-server serve\n")),(0,r.kt)("p",null,"Or direct from source"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"go run cmd/server/main.go serve\n")),(0,r.kt)("p",null,"The application will be available on ",(0,r.kt)("inlineCode",{parentName:"p"},"https://localhost:8080")," and gRPC on ",(0,r.kt)("inlineCode",{parentName:"p"},"https://localhost:8090"),"."),(0,r.kt)("h2",{id:"run-the-tests"},"Run the tests"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make test\n")),(0,r.kt)("h2",{id:"install-tools"},"Install tools"),(0,r.kt)("p",null,"You may bootstrap the whole development environment, which includes initializing the ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," file with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make bootstrap\n")),(0,r.kt)("h2",{id:"cli"},"CLI"),(0,r.kt)("p",null,"The CLI is available in the ",(0,r.kt)("inlineCode",{parentName:"p"},"cmd/cli")," directory."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"go run cmd/cli/main.go --help\n")),(0,r.kt)("h2",{id:"apis"},"APIs"),(0,r.kt)("p",null,"The APIs are defined in protobuf ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/stacklok/minder/blob/main/proto/minder/v1/minder.proto"},"here"),"."),(0,r.kt)("p",null,"An OpenAPI / swagger spec is generated to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/stacklok/minder/blob/main/pkg/api/openapi/proto/minder/v1/minder.swagger.json"},"here")),(0,r.kt)("p",null,"It can be accessed over gRPC or HTTP using ",(0,r.kt)("a",{parentName:"p",href:"https://grpc-ecosystem.github.io/grpc-gateway/"},"gprc-gateway"),"."),(0,r.kt)("h2",{id:"how-to-generate-protobuf-stubs"},"How to generate protobuf stubs"),(0,r.kt)("p",null,"We use ",(0,r.kt)("a",{parentName:"p",href:"https://buf.build/docs/"},"buf")," to generate the gRPC / HTTP stubs (both protobuf and openAPI)."),(0,r.kt)("p",null,"To build the stubs, run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make clean-gen\nmake gen\n")),(0,r.kt)("h1",{id:"database-migrations-and-tooling"},"Database migrations and tooling"),(0,r.kt)("p",null,"Minder uses ",(0,r.kt)("a",{parentName:"p",href:"https://sqlc.dev/"},"sqlc")," to generate Go code from SQL."),(0,r.kt)("p",null,"The main configuration file is ",(0,r.kt)("inlineCode",{parentName:"p"},"sqlc.yaml"),"."),(0,r.kt)("p",null,"To make changes to the database schema, create a new migration file in the\n",(0,r.kt)("inlineCode",{parentName:"p"},"database/migrations")," directory."),(0,r.kt)("p",null,"Add any queries to the ",(0,r.kt)("inlineCode",{parentName:"p"},"database/queries/sqlc.sql")," file."),(0,r.kt)("p",null,"To generate the Go code, run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make sqlc\n")),(0,r.kt)("p",null,"Users will then need to peform a migration"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make migrateup\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make migratedown\n")),(0,r.kt)("h1",{id:"viper-configuration"},"Viper configuration"),(0,r.kt)("p",null,"Minder uses ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/spf13/viper"},"viper")," for configuration."),(0,r.kt)("p",null,"An example configuration file is ",(0,r.kt)("inlineCode",{parentName:"p"},"config/config.yaml.example"),"."),(0,r.kt)("p",null,"Most values should be quite self-explanatory."),(0,r.kt)("p",null,"Before running the app, please copy the content of ",(0,r.kt)("inlineCode",{parentName:"p"},"config/config.yaml.example")," into ",(0,r.kt)("inlineCode",{parentName:"p"},"$PWD/config.yaml")," file,\nand modify to use your own settings."),(0,r.kt)("h1",{id:"keycloak-configuration-for-social-login-github"},"Keycloak configuration for social login (GitHub)"),(0,r.kt)("p",null,"Create an OAuth2 application for GitHub ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/settings/developers"},"here"),". Select\n",(0,r.kt)("inlineCode",{parentName:"p"},"New OAuth App")," and fill in the details. The callback URL should be ",(0,r.kt)("inlineCode",{parentName:"p"},"http://localhost:8081/realms/stacklok/broker/github/endpoint"),".\nCreate a new client secret for your OAuth2 client."),(0,r.kt)("p",null,"Using the client ID and client secret you created above, enable GitHub login on Keycloak by running the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make KC_GITHUB_CLIENT_ID=<client_id> KC_GITHUB_CLIENT_SECRET=<client_secret> github-login\n")))}d.isMDXComponent=!0}}]);