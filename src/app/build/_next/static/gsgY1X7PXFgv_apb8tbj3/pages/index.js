(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"/0+H":function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(r("q1tI")),o=r("lwAK");function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,r=void 0!==t&&t,n=e.hybrid,i=void 0!==n&&n,o=e.hasQuery;return r||i&&(void 0!==o&&o)}t.isInAmpMode=s,t.useAmp=function(){return s(i.default.useContext(o.AmpStateContext))}},"3niX":function(e,t,r){"use strict";t.__esModule=!0,t.flush=function(){var e=o.cssRules();return o.flush(),e},t.default=void 0;var n,i=r("q1tI");var o=new(((n=r("SevZ"))&&n.__esModule?n:{default:n}).default),s=function(e){var t,r;function n(t){var r;return(r=e.call(this,t)||this).prevProps={},r}r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n.dynamic=function(e){return e.map((function(e){var t=e[0],r=e[1];return o.computeId(t,r)})).join(" ")};var i=n.prototype;return i.shouldComponentUpdate=function(e){return this.props.id!==e.id||String(this.props.dynamic)!==String(e.dynamic)},i.componentWillUnmount=function(){o.remove(this.props)},i.render=function(){return this.shouldComponentUpdate(this.prevProps)&&(this.prevProps.id&&o.remove(this.prevProps),o.add(this.props),this.prevProps=this.props),null},n}(i.Component);t.default=s},"8Kt/":function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(r("q1tI")),o=n(r("Xuae")),s=r("lwAK"),a=r("FYa8"),c=r("/0+H");function u(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function l(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}t.defaultHead=u;var f=["name","httpEquiv","charSet","itemProp"];function d(e,t){return e.reduce((function(e,t){var r=i.default.Children.toArray(t.props.children);return e.concat(r)}),[]).reduce(l,[]).reverse().concat(u(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,r=new Set,n={};return function(i){var o=!0;if(i.key&&"number"!==typeof i.key&&i.key.indexOf("$")>0){var s=i.key.slice(i.key.indexOf("$")+1);e.has(s)?o=!1:e.add(s)}switch(i.type){case"title":case"base":t.has(i.type)?o=!1:t.add(i.type);break;case"meta":for(var a=0,c=f.length;a<c;a++){var u=f[a];if(i.props.hasOwnProperty(u))if("charSet"===u)r.has(u)?o=!1:r.add(u);else{var l=i.props[u],d=n[u]||new Set;d.has(l)?o=!1:(d.add(l),n[u]=d)}}}return o}}()).reverse().map((function(e,t){var r=e.key||t;return i.default.cloneElement(e,{key:r})}))}var p=o.default();function h(e){var t=e.children;return i.default.createElement(s.AmpStateContext.Consumer,null,(function(e){return i.default.createElement(a.HeadManagerContext.Consumer,null,(function(r){return i.default.createElement(p,{reduceComponentsToState:d,handleStateChange:r,inAmpMode:c.isInAmpMode(e)},t)}))}))}h.rewind=p.rewind,t.default=h},"8oxB":function(e,t){var r,n,i=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(r===setTimeout)return setTimeout(e,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"===typeof setTimeout?setTimeout:o}catch(e){r=o}try{n="function"===typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var c,u=[],l=!1,f=-1;function d(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&p())}function p(){if(!l){var e=a(d);l=!0;for(var t=u.length;t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new h(e,t)),1!==u.length||l||a(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},"9kyW":function(e,t,r){"use strict";e.exports=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0}},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},EbDI:function(e,t){e.exports=function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}},FYa8:function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var i=n(r("q1tI"));t.HeadManagerContext=i.createContext(null)},Ijbi:function(e,t){e.exports=function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}},MX0m:function(e,t,r){e.exports=r("3niX")},RIqP:function(e,t,r){var n=r("Ijbi"),i=r("EbDI"),o=r("Bnag");e.exports=function(e){return n(e)||i(e)||o()}},RNiq:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return d}));var n=r("MX0m"),i=r.n(n),o=r("q1tI"),s=r.n(o),a=r("8Kt/"),c=r.n(a),u=r("YFqc"),l=r.n(u),f=s.a.createElement;function d(){return f("div",{className:"jsx-1799183244 container"},f(c.a,null,f("title",{className:"jsx-1799183244"},"Create Next App"),f("link",{rel:"icon",href:"/favicon.ico",className:"jsx-1799183244"})),f("main",{className:"jsx-1799183244"},f(l.a,{href:"/twit"},f("a",{className:"jsx-1799183244"},"Twit")),f(l.a,{href:"/user"},f("a",{className:"jsx-1799183244"},"User")),f("h1",{className:"jsx-1799183244 title"},"Welcome to ",f("a",{href:"https://nextjs.org",className:"jsx-1799183244"},"Next.js!")),f("p",{className:"jsx-1799183244 description"},"Get started by editing ",f("code",{className:"jsx-1799183244"},"pages/index.js")),f("div",{className:"jsx-1799183244 grid"},f("a",{href:"https://nextjs.org/docs",className:"jsx-1799183244 card"},f("h3",{className:"jsx-1799183244"},"Documentation \u2192"),f("p",{className:"jsx-1799183244"},"Find in-depth information about Next.js features and API.")),f("a",{href:"https://nextjs.org/learn",className:"jsx-1799183244 card"},f("h3",{className:"jsx-1799183244"},"Learn \u2192"),f("p",{className:"jsx-1799183244"},"Learn about Next.js in an interactive course with quizzes!")),f("a",{href:"https://github.com/zeit/next.js/tree/master/examples",className:"jsx-1799183244 card"},f("h3",{className:"jsx-1799183244"},"Examples \u2192"),f("p",{className:"jsx-1799183244"},"Discover and deploy boilerplate example Next.js projects.")),f("a",{href:"https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",className:"jsx-1799183244 card"},f("h3",{className:"jsx-1799183244"},"Deploy \u2192"),f("p",{className:"jsx-1799183244"},"Instantly deploy your Next.js site to a public URL with Vercel.")))),f("footer",{className:"jsx-1799183244"},f("a",{href:"https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",target:"_blank",rel:"noopener noreferrer",className:"jsx-1799183244"},"Powered by"," ",f("img",{src:"/vercel.svg",alt:"Vercel Logo",className:"jsx-1799183244 logo"}))),f(i.a,{id:"3345803726"},[".container.jsx-1799183244{min-height:100vh;padding:0 0.5rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}","main.jsx-1799183244{padding:5rem 0;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}","footer.jsx-1799183244{width:100%;height:100px;border-top:1px solid #eaeaea;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}","footer.jsx-1799183244 img.jsx-1799183244{margin-left:0.5rem;}","footer.jsx-1799183244 a.jsx-1799183244{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}","a.jsx-1799183244{color:inherit;-webkit-text-decoration:none;text-decoration:none;}",".title.jsx-1799183244 a.jsx-1799183244{color:#0070f3;-webkit-text-decoration:none;text-decoration:none;}",".title.jsx-1799183244 a.jsx-1799183244:hover,.title.jsx-1799183244 a.jsx-1799183244:focus,.title.jsx-1799183244 a.jsx-1799183244:active{-webkit-text-decoration:underline;text-decoration:underline;}",".title.jsx-1799183244{margin:0;line-height:1.15;font-size:4rem;}",".title.jsx-1799183244,.description.jsx-1799183244{text-align:center;}",".description.jsx-1799183244{line-height:1.5;font-size:1.5rem;}","code.jsx-1799183244{background:#fafafa;border-radius:5px;padding:0.75rem;font-size:1.1rem;font-family:Menlo,Monaco,Lucida Console,Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace;}",".grid.jsx-1799183244{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;max-width:800px;margin-top:3rem;}",".card.jsx-1799183244{margin:1rem;-webkit-flex-basis:45%;-ms-flex-preferred-size:45%;flex-basis:45%;padding:1.5rem;text-align:left;color:inherit;-webkit-text-decoration:none;text-decoration:none;border:1px solid #eaeaea;border-radius:10px;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}",".card.jsx-1799183244:hover,.card.jsx-1799183244:focus,.card.jsx-1799183244:active{color:#0070f3;border-color:#0070f3;}",".card.jsx-1799183244 h3.jsx-1799183244{margin:0 0 1rem 0;font-size:1.5rem;}",".card.jsx-1799183244 p.jsx-1799183244{margin:0;font-size:1.25rem;line-height:1.5;}",".logo.jsx-1799183244{height:1em;}","@media (max-width:600px){.grid.jsx-1799183244{width:100%;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}}"]),f(i.a,{id:"3379920139"},["html,body{padding:0;margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto, Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue, sans-serif;}","*{box-sizing:border-box;}"]))}},SevZ:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=o(r("9kyW")),i=o(r("bVZc"));function o(e){return e&&e.__esModule?e:{default:e}}var s=function(){function e(e){var t=void 0===e?{}:e,r=t.styleSheet,n=void 0===r?null:r,o=t.optimizeForSpeed,s=void 0!==o&&o,a=t.isBrowser,c=void 0===a?"undefined"!==typeof window:a;this._sheet=n||new i.default({name:"styled-jsx",optimizeForSpeed:s}),this._sheet.inject(),n&&"boolean"===typeof s&&(this._sheet.setOptimizeForSpeed(s),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._isBrowser=c,this._fromServer=void 0,this._indices={},this._instancesCounts={},this.computeId=this.createComputeId(),this.computeSelector=this.createComputeSelector()}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._isBrowser&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce((function(e,t){return e[t]=0,e}),{}));var r=this.getIdAndRules(e),n=r.styleId,i=r.rules;if(n in this._instancesCounts)this._instancesCounts[n]+=1;else{var o=i.map((function(e){return t._sheet.insertRule(e)})).filter((function(e){return-1!==e}));this._indices[n]=o,this._instancesCounts[n]=1}},t.remove=function(e){var t=this,r=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw new Error("StyleSheetRegistry: "+t+".")}(r in this._instancesCounts,"styleId: `"+r+"` not found"),this._instancesCounts[r]-=1,this._instancesCounts[r]<1){var n=this._fromServer&&this._fromServer[r];n?(n.parentNode.removeChild(n),delete this._fromServer[r]):(this._indices[r].forEach((function(e){return t._sheet.deleteRule(e)})),delete this._indices[r]),delete this._instancesCounts[r]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={},this.computeId=this.createComputeId(),this.computeSelector=this.createComputeSelector()},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map((function(t){return[t,e._fromServer[t]]})):[],r=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map((function(t){return[t,e._indices[t].map((function(e){return r[e].cssText})).join(e._optimizeForSpeed?"":"\n")]})).filter((function(e){return Boolean(e[1])})))},t.createComputeId=function(){var e={};return function(t,r){if(!r)return"jsx-"+t;var i=String(r),o=t+i;return e[o]||(e[o]="jsx-"+(0,n.default)(t+"-"+i)),e[o]}},t.createComputeSelector=function(e){void 0===e&&(e=/__jsx-style-dynamic-selector/g);var t={};return function(r,n){this._isBrowser||(n=n.replace(/\/style/gi,"\\/style"));var i=r+n;return t[i]||(t[i]=n.replace(e,r)),t[i]}},t.getIdAndRules=function(e){var t=this,r=e.children,n=e.dynamic,i=e.id;if(n){var o=this.computeId(i,n);return{styleId:o,rules:Array.isArray(r)?r.map((function(e){return t.computeSelector(o,e)})):[this.computeSelector(o,r)]}}return{styleId:this.computeId(i),rules:Array.isArray(r)?r:[r]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce((function(e,t){return e[t.id.slice(2)]=t,e}),{})},e}();t.default=s},Xuae:function(e,t,r){"use strict";var n=r("lwsE"),i=r("PJYZ"),o=r("W8MJ"),s=r("7W2i"),a=r("a1gu"),c=r("Nsbk"),u=r("RIqP");function l(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=c(e);if(t){var i=c(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return a(this,r)}}Object.defineProperty(t,"__esModule",{value:!0});var f=r("q1tI"),d=!1;t.default=function(){var e,t=new Set;function r(r){e=r.props.reduceComponentsToState(u(t),r.props),r.props.handleStateChange&&r.props.handleStateChange(e)}return(function(a){s(u,a);var c=l(u);function u(e){var o;return n(this,u),o=c.call(this,e),d&&(t.add(i(o)),r(i(o))),o}return o(u,null,[{key:"rewind",value:function(){var r=e;return e=void 0,t.clear(),r}}]),o(u,[{key:"componentDidMount",value:function(){t.add(this),r(this)}},{key:"componentDidUpdate",value:function(){r(this)}},{key:"componentWillUnmount",value:function(){t.delete(this),r(this)}},{key:"render",value:function(){return null}}]),u}(f.Component))}},YFqc:function(e,t,r){e.exports=r("cTJO")},bVZc:function(e,t,r){"use strict";(function(e){function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}t.__esModule=!0,t.default=void 0;var n="undefined"!==typeof e&&e.env&&!0,i=function(e){return"[object String]"===Object.prototype.toString.call(e)},o=function(){function e(e){var t=void 0===e?{}:e,r=t.name,o=void 0===r?"stylesheet":r,a=t.optimizeForSpeed,c=void 0===a?n:a,u=t.isBrowser,l=void 0===u?"undefined"!==typeof window:u;s(i(o),"`name` must be a string"),this._name=o,this._deletedRulePlaceholder="#"+o+"-deleted-rule____{}",s("boolean"===typeof c,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=c,this._isBrowser=l,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var f=this._isBrowser&&document.querySelector('meta[property="csp-nonce"]');this._nonce=f?f.getAttribute("content"):null}var t,o,a,c=e.prototype;return c.setOptimizeForSpeed=function(e){s("boolean"===typeof e,"`setOptimizeForSpeed` accepts a boolean"),s(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},c.isOptimizeForSpeed=function(){return this._optimizeForSpeed},c.inject=function(){var e=this;if(s(!this._injected,"sheet already injected"),this._injected=!0,this._isBrowser&&this._optimizeForSpeed)return this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),void(this._optimizeForSpeed||(n||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0));this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"===typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},c.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},c.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},c.insertRule=function(e,t){if(s(i(e),"`insertRule` accepts only strings"),!this._isBrowser)return"number"!==typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var r=this.getSheet();"number"!==typeof t&&(t=r.cssRules.length);try{r.insertRule(e,t)}catch(a){return n||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var o=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,o))}return this._rulesCount++},c.replaceRule=function(e,t){if(this._optimizeForSpeed||!this._isBrowser){var r=this._isBrowser?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(o){n||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}}else{var i=this._tags[e];s(i,"old rule at index `"+e+"` not found"),i.textContent=t}return e},c.deleteRule=function(e){if(this._isBrowser)if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];s(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}else this._serverSheet.deleteRule(e)},c.flush=function(){this._injected=!1,this._rulesCount=0,this._isBrowser?(this._tags.forEach((function(e){return e&&e.parentNode.removeChild(e)})),this._tags=[]):this._serverSheet.cssRules=[]},c.cssRules=function(){var e=this;return this._isBrowser?this._tags.reduce((function(t,r){return r?t=t.concat(Array.prototype.map.call(e.getSheetForTag(r).cssRules,(function(t){return t.cssText===e._deletedRulePlaceholder?null:t}))):t.push(null),t}),[]):this._serverSheet.cssRules},c.makeStyleTag=function(e,t,r){t&&s(i(t),"makeStyleTag acceps only strings as second parameter");var n=document.createElement("style");this._nonce&&n.setAttribute("nonce",this._nonce),n.type="text/css",n.setAttribute("data-"+e,""),t&&n.appendChild(document.createTextNode(t));var o=document.head||document.getElementsByTagName("head")[0];return r?o.insertBefore(n,r):o.appendChild(n),n},t=e,(o=[{key:"length",get:function(){return this._rulesCount}}])&&r(t.prototype,o),a&&r(t,a),e}();function s(e,t){if(!e)throw new Error("StyleSheet: "+t+".")}t.default=o}).call(this,r("8oxB"))},cTJO:function(e,t,r){"use strict";var n=r("lwsE"),i=r("W8MJ"),o=r("7W2i"),s=r("a1gu"),a=r("Nsbk");function c(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=a(e);if(t){var i=a(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return s(this,r)}}var u=r("TqRt"),l=r("284h");t.__esModule=!0,t.default=void 0;var f,d=l(r("q1tI")),p=r("QmWs"),h=r("g/15"),m=u(r("nOHt")),v=r("elyg");function y(e){return e&&"object"===typeof e?(0,h.formatWithValidation)(e):e}var x=new Map,_=window.IntersectionObserver,g={};function b(){return f||(_?f=new _((function(e){e.forEach((function(e){if(x.has(e.target)){var t=x.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(f.unobserve(e.target),x.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0)}var w=function(e){o(s,e);var t=c(s);function s(e){var r;return n(this,s),(r=t.call(this,e)).p=void 0,r.cleanUpListeners=function(){},r.formatUrls=function(e){var t=null,r=null,n=null;return function(i,o){if(n&&i===t&&o===r)return n;var s=e(i,o);return t=i,r=o,n=s,s}}((function(e,t){return{href:(0,v.addBasePath)(y(e)),as:t?(0,v.addBasePath)(y(t)):t}})),r.linkClicked=function(e){var t=e.currentTarget,n=t.nodeName,i=t.target;if("A"!==n||!(i&&"_self"!==i||e.metaKey||e.ctrlKey||e.shiftKey||e.nativeEvent&&2===e.nativeEvent.which)){var o=r.formatUrls(r.props.href,r.props.as),s=o.href,a=o.as;if(function(e){var t=(0,p.parse)(e,!1,!0),r=(0,p.parse)((0,h.getLocationOrigin)(),!1,!0);return!t.host||t.protocol===r.protocol&&t.host===r.host}(s)){var c=window.location.pathname;s=(0,p.resolve)(c,s),a=a?(0,p.resolve)(c,a):s,e.preventDefault();var u=r.props.scroll;null==u&&(u=a.indexOf("#")<0),m.default[r.props.replace?"replace":"push"](s,a,{shallow:r.props.shallow}).then((function(e){e&&u&&(window.scrollTo(0,0),document.body.focus())}))}}},r.p=!1!==e.prefetch,r}return i(s,[{key:"componentWillUnmount",value:function(){this.cleanUpListeners()}},{key:"getPaths",value:function(){var e=window.location.pathname,t=this.formatUrls(this.props.href,this.props.as),r=t.href,n=t.as,i=(0,p.resolve)(e,r);return[i,n?(0,p.resolve)(e,n):i]}},{key:"handleRef",value:function(e){var t=this;this.p&&_&&e&&e.tagName&&(this.cleanUpListeners(),g[this.getPaths().join("%")]||(this.cleanUpListeners=function(e,t){var r=b();return r?(r.observe(e),x.set(e,t),function(){try{r.unobserve(e)}catch(t){console.error(t)}x.delete(e)}):function(){}}(e,(function(){t.prefetch()}))))}},{key:"prefetch",value:function(e){if(this.p){var t=this.getPaths();m.default.prefetch(t[0],t[1],e).catch((function(e){0})),g[t.join("%")]=!0}}},{key:"render",value:function(){var e=this,t=this.props.children,n=this.formatUrls(this.props.href,this.props.as),i=n.href,o=n.as;"string"===typeof t&&(t=d.default.createElement("a",null,t));var s=d.Children.only(t),a={ref:function(t){e.handleRef(t),s&&"object"===typeof s&&s.ref&&("function"===typeof s.ref?s.ref(t):"object"===typeof s.ref&&(s.ref.current=t))},onMouseEnter:function(t){s.props&&"function"===typeof s.props.onMouseEnter&&s.props.onMouseEnter(t),e.prefetch({priority:!0})},onClick:function(t){s.props&&"function"===typeof s.props.onClick&&s.props.onClick(t),t.defaultPrevented||e.linkClicked(t)}};!this.props.passHref&&("a"!==s.type||"href"in s.props)||(a.href=o||i);var c=r("P5f7").rewriteUrlForNextExport;return a.href&&"undefined"!==typeof __NEXT_DATA__&&__NEXT_DATA__.nextExport&&(a.href=c(a.href)),d.default.cloneElement(s,a)}}]),s}(d.Component);t.default=w},lwAK:function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var i=n(r("q1tI"));t.AmpStateContext=i.createContext({})},"m0L+":function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r("RNiq")}])}},[["m0L+",0,1,2]]]);