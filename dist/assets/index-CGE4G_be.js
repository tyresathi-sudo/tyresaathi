function aI(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in t)){const s=Object.getOwnPropertyDescriptor(r,i);s&&Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function lI(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var T0={exports:{}},Eu={},b0={exports:{}},ne={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ka=Symbol.for("react.element"),cI=Symbol.for("react.portal"),uI=Symbol.for("react.fragment"),dI=Symbol.for("react.strict_mode"),hI=Symbol.for("react.profiler"),fI=Symbol.for("react.provider"),pI=Symbol.for("react.context"),mI=Symbol.for("react.forward_ref"),gI=Symbol.for("react.suspense"),yI=Symbol.for("react.memo"),vI=Symbol.for("react.lazy"),cy=Symbol.iterator;function _I(t){return t===null||typeof t!="object"?null:(t=cy&&t[cy]||t["@@iterator"],typeof t=="function"?t:null)}var I0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S0=Object.assign,k0={};function Ys(t,e,n){this.props=t,this.context=e,this.refs=k0,this.updater=n||I0}Ys.prototype.isReactComponent={};Ys.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ys.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function R0(){}R0.prototype=Ys.prototype;function ip(t,e,n){this.props=t,this.context=e,this.refs=k0,this.updater=n||I0}var sp=ip.prototype=new R0;sp.constructor=ip;S0(sp,Ys.prototype);sp.isPureReactComponent=!0;var uy=Array.isArray,P0=Object.prototype.hasOwnProperty,op={current:null},A0={key:!0,ref:!0,__self:!0,__source:!0};function N0(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)P0.call(e,r)&&!A0.hasOwnProperty(r)&&(i[r]=e[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var c=Array(a),d=0;d<a;d++)c[d]=arguments[d+2];i.children=c}if(t&&t.defaultProps)for(r in a=t.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Ka,type:t,key:s,ref:o,props:i,_owner:op.current}}function xI(t,e){return{$$typeof:Ka,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ap(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ka}function wI(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var dy=/\/+/g;function Vd(t,e){return typeof t=="object"&&t!==null&&t.key!=null?wI(""+t.key):e.toString(36)}function Xl(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Ka:case cI:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Vd(o,0):r,uy(i)?(n="",t!=null&&(n=t.replace(dy,"$&/")+"/"),Xl(i,e,n,"",function(d){return d})):i!=null&&(ap(i)&&(i=xI(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(dy,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",uy(t))for(var a=0;a<t.length;a++){s=t[a];var c=r+Vd(s,a);o+=Xl(s,e,n,c,i)}else if(c=_I(t),typeof c=="function")for(t=c.call(t),a=0;!(s=t.next()).done;)s=s.value,c=r+Vd(s,a++),o+=Xl(s,e,n,c,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Il(t,e,n){if(t==null)return t;var r=[],i=0;return Xl(t,r,"","",function(s){return e.call(n,s,i++)}),r}function EI(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Tt={current:null},Zl={transition:null},TI={ReactCurrentDispatcher:Tt,ReactCurrentBatchConfig:Zl,ReactCurrentOwner:op};function C0(){throw Error("act(...) is not supported in production builds of React.")}ne.Children={map:Il,forEach:function(t,e,n){Il(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Il(t,function(){e++}),e},toArray:function(t){return Il(t,function(e){return e})||[]},only:function(t){if(!ap(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ne.Component=Ys;ne.Fragment=uI;ne.Profiler=hI;ne.PureComponent=ip;ne.StrictMode=dI;ne.Suspense=gI;ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=TI;ne.act=C0;ne.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=S0({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=op.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(c in e)P0.call(e,c)&&!A0.hasOwnProperty(c)&&(r[c]=e[c]===void 0&&a!==void 0?a[c]:e[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){a=Array(c);for(var d=0;d<c;d++)a[d]=arguments[d+2];r.children=a}return{$$typeof:Ka,type:t.type,key:i,ref:s,props:r,_owner:o}};ne.createContext=function(t){return t={$$typeof:pI,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:fI,_context:t},t.Consumer=t};ne.createElement=N0;ne.createFactory=function(t){var e=N0.bind(null,t);return e.type=t,e};ne.createRef=function(){return{current:null}};ne.forwardRef=function(t){return{$$typeof:mI,render:t}};ne.isValidElement=ap;ne.lazy=function(t){return{$$typeof:vI,_payload:{_status:-1,_result:t},_init:EI}};ne.memo=function(t,e){return{$$typeof:yI,type:t,compare:e===void 0?null:e}};ne.startTransition=function(t){var e=Zl.transition;Zl.transition={};try{t()}finally{Zl.transition=e}};ne.unstable_act=C0;ne.useCallback=function(t,e){return Tt.current.useCallback(t,e)};ne.useContext=function(t){return Tt.current.useContext(t)};ne.useDebugValue=function(){};ne.useDeferredValue=function(t){return Tt.current.useDeferredValue(t)};ne.useEffect=function(t,e){return Tt.current.useEffect(t,e)};ne.useId=function(){return Tt.current.useId()};ne.useImperativeHandle=function(t,e,n){return Tt.current.useImperativeHandle(t,e,n)};ne.useInsertionEffect=function(t,e){return Tt.current.useInsertionEffect(t,e)};ne.useLayoutEffect=function(t,e){return Tt.current.useLayoutEffect(t,e)};ne.useMemo=function(t,e){return Tt.current.useMemo(t,e)};ne.useReducer=function(t,e,n){return Tt.current.useReducer(t,e,n)};ne.useRef=function(t){return Tt.current.useRef(t)};ne.useState=function(t){return Tt.current.useState(t)};ne.useSyncExternalStore=function(t,e,n){return Tt.current.useSyncExternalStore(t,e,n)};ne.useTransition=function(){return Tt.current.useTransition()};ne.version="18.3.1";b0.exports=ne;var V=b0.exports;const lp=lI(V),bI=aI({__proto__:null,default:lp},[V]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var II=V,SI=Symbol.for("react.element"),kI=Symbol.for("react.fragment"),RI=Object.prototype.hasOwnProperty,PI=II.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,AI={key:!0,ref:!0,__self:!0,__source:!0};function D0(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)RI.call(e,r)&&!AI.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:SI,type:t,key:s,ref:o,props:i,_owner:PI.current}}Eu.Fragment=kI;Eu.jsx=D0;Eu.jsxs=D0;T0.exports=Eu;var u=T0.exports,Ih={},j0={exports:{}},$t={},V0={exports:{}},O0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(K,X){var ee=K.length;K.push(X);e:for(;0<ee;){var Se=ee-1>>>1,me=K[Se];if(0<i(me,X))K[Se]=X,K[ee]=me,ee=Se;else break e}}function n(K){return K.length===0?null:K[0]}function r(K){if(K.length===0)return null;var X=K[0],ee=K.pop();if(ee!==X){K[0]=ee;e:for(var Se=0,me=K.length,Fe=me>>>1;Se<Fe;){var kn=2*(Se+1)-1,Rn=K[kn],Pn=kn+1,An=K[Pn];if(0>i(Rn,ee))Pn<me&&0>i(An,Rn)?(K[Se]=An,K[Pn]=ee,Se=Pn):(K[Se]=Rn,K[kn]=ee,Se=kn);else if(Pn<me&&0>i(An,ee))K[Se]=An,K[Pn]=ee,Se=Pn;else break e}}return X}function i(K,X){var ee=K.sortIndex-X.sortIndex;return ee!==0?ee:K.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var c=[],d=[],f=1,p=null,g=3,S=!1,A=!1,T=!1,P=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(K){for(var X=n(d);X!==null;){if(X.callback===null)r(d);else if(X.startTime<=K)r(d),X.sortIndex=X.expirationTime,e(c,X);else break;X=n(d)}}function k(K){if(T=!1,v(K),!A)if(n(c)!==null)A=!0,Ke(O);else{var X=n(d);X!==null&&Sn(k,X.startTime-K)}}function O(K,X){A=!1,T&&(T=!1,y(E),E=-1),S=!0;var ee=g;try{for(v(X),p=n(c);p!==null&&(!(p.expirationTime>X)||K&&!N());){var Se=p.callback;if(typeof Se=="function"){p.callback=null,g=p.priorityLevel;var me=Se(p.expirationTime<=X);X=t.unstable_now(),typeof me=="function"?p.callback=me:p===n(c)&&r(c),v(X)}else r(c);p=n(c)}if(p!==null)var Fe=!0;else{var kn=n(d);kn!==null&&Sn(k,kn.startTime-X),Fe=!1}return Fe}finally{p=null,g=ee,S=!1}}var M=!1,I=null,E=-1,_=5,b=-1;function N(){return!(t.unstable_now()-b<_)}function C(){if(I!==null){var K=t.unstable_now();b=K;var X=!0;try{X=I(!0,K)}finally{X?R():(M=!1,I=null)}}else M=!1}var R;if(typeof x=="function")R=function(){x(C)};else if(typeof MessageChannel<"u"){var ue=new MessageChannel,xe=ue.port2;ue.port1.onmessage=C,R=function(){xe.postMessage(null)}}else R=function(){P(C,0)};function Ke(K){I=K,M||(M=!0,R())}function Sn(K,X){E=P(function(){K(t.unstable_now())},X)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(K){K.callback=null},t.unstable_continueExecution=function(){A||S||(A=!0,Ke(O))},t.unstable_forceFrameRate=function(K){0>K||125<K?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<K?Math.floor(1e3/K):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(c)},t.unstable_next=function(K){switch(g){case 1:case 2:case 3:var X=3;break;default:X=g}var ee=g;g=X;try{return K()}finally{g=ee}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(K,X){switch(K){case 1:case 2:case 3:case 4:case 5:break;default:K=3}var ee=g;g=K;try{return X()}finally{g=ee}},t.unstable_scheduleCallback=function(K,X,ee){var Se=t.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?Se+ee:Se):ee=Se,K){case 1:var me=-1;break;case 2:me=250;break;case 5:me=1073741823;break;case 4:me=1e4;break;default:me=5e3}return me=ee+me,K={id:f++,callback:X,priorityLevel:K,startTime:ee,expirationTime:me,sortIndex:-1},ee>Se?(K.sortIndex=ee,e(d,K),n(c)===null&&K===n(d)&&(T?(y(E),E=-1):T=!0,Sn(k,ee-Se))):(K.sortIndex=me,e(c,K),A||S||(A=!0,Ke(O))),K},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(K){var X=g;return function(){var ee=g;g=X;try{return K.apply(this,arguments)}finally{g=ee}}}})(O0);V0.exports=O0;var NI=V0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var CI=V,zt=NI;function z(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var M0=new Set,ua={};function Mi(t,e){Ss(t,e),Ss(t+"Capture",e)}function Ss(t,e){for(ua[t]=e,t=0;t<e.length;t++)M0.add(e[t])}var $n=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Sh=Object.prototype.hasOwnProperty,DI=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,hy={},fy={};function jI(t){return Sh.call(fy,t)?!0:Sh.call(hy,t)?!1:DI.test(t)?fy[t]=!0:(hy[t]=!0,!1)}function VI(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function OI(t,e,n,r){if(e===null||typeof e>"u"||VI(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function bt(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var rt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){rt[t]=new bt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];rt[e]=new bt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){rt[t]=new bt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){rt[t]=new bt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){rt[t]=new bt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){rt[t]=new bt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){rt[t]=new bt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){rt[t]=new bt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){rt[t]=new bt(t,5,!1,t.toLowerCase(),null,!1,!1)});var cp=/[\-:]([a-z])/g;function up(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(cp,up);rt[e]=new bt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(cp,up);rt[e]=new bt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(cp,up);rt[e]=new bt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){rt[t]=new bt(t,1,!1,t.toLowerCase(),null,!1,!1)});rt.xlinkHref=new bt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){rt[t]=new bt(t,1,!1,t.toLowerCase(),null,!0,!0)});function dp(t,e,n,r){var i=rt.hasOwnProperty(e)?rt[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(OI(e,n,i,r)&&(n=null),r||i===null?jI(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Jn=CI.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Sl=Symbol.for("react.element"),rs=Symbol.for("react.portal"),is=Symbol.for("react.fragment"),hp=Symbol.for("react.strict_mode"),kh=Symbol.for("react.profiler"),L0=Symbol.for("react.provider"),F0=Symbol.for("react.context"),fp=Symbol.for("react.forward_ref"),Rh=Symbol.for("react.suspense"),Ph=Symbol.for("react.suspense_list"),pp=Symbol.for("react.memo"),lr=Symbol.for("react.lazy"),U0=Symbol.for("react.offscreen"),py=Symbol.iterator;function Eo(t){return t===null||typeof t!="object"?null:(t=py&&t[py]||t["@@iterator"],typeof t=="function"?t:null)}var Ce=Object.assign,Od;function Oo(t){if(Od===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Od=e&&e[1]||""}return`
`+Od+t}var Md=!1;function Ld(t,e){if(!t||Md)return"";Md=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(d){var r=d}Reflect.construct(t,[],e)}else{try{e.call()}catch(d){r=d}t.call(e.prototype)}else{try{throw Error()}catch(d){r=d}t()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var c=`
`+i[o].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=o&&0<=a);break}}}finally{Md=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Oo(t):""}function MI(t){switch(t.tag){case 5:return Oo(t.type);case 16:return Oo("Lazy");case 13:return Oo("Suspense");case 19:return Oo("SuspenseList");case 0:case 2:case 15:return t=Ld(t.type,!1),t;case 11:return t=Ld(t.type.render,!1),t;case 1:return t=Ld(t.type,!0),t;default:return""}}function Ah(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case is:return"Fragment";case rs:return"Portal";case kh:return"Profiler";case hp:return"StrictMode";case Rh:return"Suspense";case Ph:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case F0:return(t.displayName||"Context")+".Consumer";case L0:return(t._context.displayName||"Context")+".Provider";case fp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case pp:return e=t.displayName||null,e!==null?e:Ah(t.type)||"Memo";case lr:e=t._payload,t=t._init;try{return Ah(t(e))}catch{}}return null}function LI(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ah(e);case 8:return e===hp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Mr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function z0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function FI(t){var e=z0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function kl(t){t._valueTracker||(t._valueTracker=FI(t))}function B0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=z0(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Tc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Nh(t,e){var n=e.checked;return Ce({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function my(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Mr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function $0(t,e){e=e.checked,e!=null&&dp(t,"checked",e,!1)}function Ch(t,e){$0(t,e);var n=Mr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Dh(t,e.type,n):e.hasOwnProperty("defaultValue")&&Dh(t,e.type,Mr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function gy(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Dh(t,e,n){(e!=="number"||Tc(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Mo=Array.isArray;function gs(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Mr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function jh(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(z(91));return Ce({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function yy(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(z(92));if(Mo(n)){if(1<n.length)throw Error(z(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Mr(n)}}function q0(t,e){var n=Mr(e.value),r=Mr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function vy(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function K0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Vh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?K0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Rl,H0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Rl=Rl||document.createElement("div"),Rl.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Rl.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function da(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Wo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},UI=["Webkit","ms","Moz","O"];Object.keys(Wo).forEach(function(t){UI.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Wo[e]=Wo[t]})});function W0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Wo.hasOwnProperty(t)&&Wo[t]?(""+e).trim():e+"px"}function G0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=W0(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var zI=Ce({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Oh(t,e){if(e){if(zI[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(z(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(z(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(z(61))}if(e.style!=null&&typeof e.style!="object")throw Error(z(62))}}function Mh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Lh=null;function mp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Fh=null,ys=null,vs=null;function _y(t){if(t=Ga(t)){if(typeof Fh!="function")throw Error(z(280));var e=t.stateNode;e&&(e=ku(e),Fh(t.stateNode,t.type,e))}}function Q0(t){ys?vs?vs.push(t):vs=[t]:ys=t}function Y0(){if(ys){var t=ys,e=vs;if(vs=ys=null,_y(t),e)for(t=0;t<e.length;t++)_y(e[t])}}function J0(t,e){return t(e)}function X0(){}var Fd=!1;function Z0(t,e,n){if(Fd)return t(e,n);Fd=!0;try{return J0(t,e,n)}finally{Fd=!1,(ys!==null||vs!==null)&&(X0(),Y0())}}function ha(t,e){var n=t.stateNode;if(n===null)return null;var r=ku(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(z(231,e,typeof n));return n}var Uh=!1;if($n)try{var To={};Object.defineProperty(To,"passive",{get:function(){Uh=!0}}),window.addEventListener("test",To,To),window.removeEventListener("test",To,To)}catch{Uh=!1}function BI(t,e,n,r,i,s,o,a,c){var d=Array.prototype.slice.call(arguments,3);try{e.apply(n,d)}catch(f){this.onError(f)}}var Go=!1,bc=null,Ic=!1,zh=null,$I={onError:function(t){Go=!0,bc=t}};function qI(t,e,n,r,i,s,o,a,c){Go=!1,bc=null,BI.apply($I,arguments)}function KI(t,e,n,r,i,s,o,a,c){if(qI.apply(this,arguments),Go){if(Go){var d=bc;Go=!1,bc=null}else throw Error(z(198));Ic||(Ic=!0,zh=d)}}function Li(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function ex(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function xy(t){if(Li(t)!==t)throw Error(z(188))}function HI(t){var e=t.alternate;if(!e){if(e=Li(t),e===null)throw Error(z(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return xy(i),t;if(s===r)return xy(i),e;s=s.sibling}throw Error(z(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===n){o=!0,n=i,r=s;break}if(a===r){o=!0,r=i,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,r=i;break}if(a===r){o=!0,r=s,n=i;break}a=a.sibling}if(!o)throw Error(z(189))}}if(n.alternate!==r)throw Error(z(190))}if(n.tag!==3)throw Error(z(188));return n.stateNode.current===n?t:e}function tx(t){return t=HI(t),t!==null?nx(t):null}function nx(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=nx(t);if(e!==null)return e;t=t.sibling}return null}var rx=zt.unstable_scheduleCallback,wy=zt.unstable_cancelCallback,WI=zt.unstable_shouldYield,GI=zt.unstable_requestPaint,Ue=zt.unstable_now,QI=zt.unstable_getCurrentPriorityLevel,gp=zt.unstable_ImmediatePriority,ix=zt.unstable_UserBlockingPriority,Sc=zt.unstable_NormalPriority,YI=zt.unstable_LowPriority,sx=zt.unstable_IdlePriority,Tu=null,pn=null;function JI(t){if(pn&&typeof pn.onCommitFiberRoot=="function")try{pn.onCommitFiberRoot(Tu,t,void 0,(t.current.flags&128)===128)}catch{}}var nn=Math.clz32?Math.clz32:eS,XI=Math.log,ZI=Math.LN2;function eS(t){return t>>>=0,t===0?32:31-(XI(t)/ZI|0)|0}var Pl=64,Al=4194304;function Lo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function kc(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~i;a!==0?r=Lo(a):(s&=o,s!==0&&(r=Lo(s)))}else o=n&~i,o!==0?r=Lo(o):s!==0&&(r=Lo(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-nn(e),i=1<<n,r|=t[n],e&=~i;return r}function tS(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function nS(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-nn(s),a=1<<o,c=i[o];c===-1?(!(a&n)||a&r)&&(i[o]=tS(a,e)):c<=e&&(t.expiredLanes|=a),s&=~a}}function Bh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function ox(){var t=Pl;return Pl<<=1,!(Pl&4194240)&&(Pl=64),t}function Ud(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ha(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-nn(e),t[e]=n}function rS(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-nn(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function yp(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-nn(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var he=0;function ax(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var lx,vp,cx,ux,dx,$h=!1,Nl=[],br=null,Ir=null,Sr=null,fa=new Map,pa=new Map,ur=[],iS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ey(t,e){switch(t){case"focusin":case"focusout":br=null;break;case"dragenter":case"dragleave":Ir=null;break;case"mouseover":case"mouseout":Sr=null;break;case"pointerover":case"pointerout":fa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":pa.delete(e.pointerId)}}function bo(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Ga(e),e!==null&&vp(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function sS(t,e,n,r,i){switch(e){case"focusin":return br=bo(br,t,e,n,r,i),!0;case"dragenter":return Ir=bo(Ir,t,e,n,r,i),!0;case"mouseover":return Sr=bo(Sr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return fa.set(s,bo(fa.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,pa.set(s,bo(pa.get(s)||null,t,e,n,r,i)),!0}return!1}function hx(t){var e=hi(t.target);if(e!==null){var n=Li(e);if(n!==null){if(e=n.tag,e===13){if(e=ex(n),e!==null){t.blockedOn=e,dx(t.priority,function(){cx(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ec(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=qh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Lh=r,n.target.dispatchEvent(r),Lh=null}else return e=Ga(n),e!==null&&vp(e),t.blockedOn=n,!1;e.shift()}return!0}function Ty(t,e,n){ec(t)&&n.delete(e)}function oS(){$h=!1,br!==null&&ec(br)&&(br=null),Ir!==null&&ec(Ir)&&(Ir=null),Sr!==null&&ec(Sr)&&(Sr=null),fa.forEach(Ty),pa.forEach(Ty)}function Io(t,e){t.blockedOn===e&&(t.blockedOn=null,$h||($h=!0,zt.unstable_scheduleCallback(zt.unstable_NormalPriority,oS)))}function ma(t){function e(i){return Io(i,t)}if(0<Nl.length){Io(Nl[0],t);for(var n=1;n<Nl.length;n++){var r=Nl[n];r.blockedOn===t&&(r.blockedOn=null)}}for(br!==null&&Io(br,t),Ir!==null&&Io(Ir,t),Sr!==null&&Io(Sr,t),fa.forEach(e),pa.forEach(e),n=0;n<ur.length;n++)r=ur[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<ur.length&&(n=ur[0],n.blockedOn===null);)hx(n),n.blockedOn===null&&ur.shift()}var _s=Jn.ReactCurrentBatchConfig,Rc=!0;function aS(t,e,n,r){var i=he,s=_s.transition;_s.transition=null;try{he=1,_p(t,e,n,r)}finally{he=i,_s.transition=s}}function lS(t,e,n,r){var i=he,s=_s.transition;_s.transition=null;try{he=4,_p(t,e,n,r)}finally{he=i,_s.transition=s}}function _p(t,e,n,r){if(Rc){var i=qh(t,e,n,r);if(i===null)Yd(t,e,r,Pc,n),Ey(t,r);else if(sS(i,t,e,n,r))r.stopPropagation();else if(Ey(t,r),e&4&&-1<iS.indexOf(t)){for(;i!==null;){var s=Ga(i);if(s!==null&&lx(s),s=qh(t,e,n,r),s===null&&Yd(t,e,r,Pc,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Yd(t,e,r,null,n)}}var Pc=null;function qh(t,e,n,r){if(Pc=null,t=mp(r),t=hi(t),t!==null)if(e=Li(t),e===null)t=null;else if(n=e.tag,n===13){if(t=ex(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Pc=t,null}function fx(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(QI()){case gp:return 1;case ix:return 4;case Sc:case YI:return 16;case sx:return 536870912;default:return 16}default:return 16}}var xr=null,xp=null,tc=null;function px(){if(tc)return tc;var t,e=xp,n=e.length,r,i="value"in xr?xr.value:xr.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return tc=i.slice(t,1<r?1-r:void 0)}function nc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Cl(){return!0}function by(){return!1}function qt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Cl:by,this.isPropagationStopped=by,this}return Ce(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Cl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Cl)},persist:function(){},isPersistent:Cl}),e}var Js={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},wp=qt(Js),Wa=Ce({},Js,{view:0,detail:0}),cS=qt(Wa),zd,Bd,So,bu=Ce({},Wa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ep,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==So&&(So&&t.type==="mousemove"?(zd=t.screenX-So.screenX,Bd=t.screenY-So.screenY):Bd=zd=0,So=t),zd)},movementY:function(t){return"movementY"in t?t.movementY:Bd}}),Iy=qt(bu),uS=Ce({},bu,{dataTransfer:0}),dS=qt(uS),hS=Ce({},Wa,{relatedTarget:0}),$d=qt(hS),fS=Ce({},Js,{animationName:0,elapsedTime:0,pseudoElement:0}),pS=qt(fS),mS=Ce({},Js,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),gS=qt(mS),yS=Ce({},Js,{data:0}),Sy=qt(yS),vS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_S={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function wS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=xS[t])?!!e[t]:!1}function Ep(){return wS}var ES=Ce({},Wa,{key:function(t){if(t.key){var e=vS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=nc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?_S[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ep,charCode:function(t){return t.type==="keypress"?nc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?nc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),TS=qt(ES),bS=Ce({},bu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ky=qt(bS),IS=Ce({},Wa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ep}),SS=qt(IS),kS=Ce({},Js,{propertyName:0,elapsedTime:0,pseudoElement:0}),RS=qt(kS),PS=Ce({},bu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),AS=qt(PS),NS=[9,13,27,32],Tp=$n&&"CompositionEvent"in window,Qo=null;$n&&"documentMode"in document&&(Qo=document.documentMode);var CS=$n&&"TextEvent"in window&&!Qo,mx=$n&&(!Tp||Qo&&8<Qo&&11>=Qo),Ry=" ",Py=!1;function gx(t,e){switch(t){case"keyup":return NS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function yx(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ss=!1;function DS(t,e){switch(t){case"compositionend":return yx(e);case"keypress":return e.which!==32?null:(Py=!0,Ry);case"textInput":return t=e.data,t===Ry&&Py?null:t;default:return null}}function jS(t,e){if(ss)return t==="compositionend"||!Tp&&gx(t,e)?(t=px(),tc=xp=xr=null,ss=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return mx&&e.locale!=="ko"?null:e.data;default:return null}}var VS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ay(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!VS[t.type]:e==="textarea"}function vx(t,e,n,r){Q0(r),e=Ac(e,"onChange"),0<e.length&&(n=new wp("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Yo=null,ga=null;function OS(t){Px(t,0)}function Iu(t){var e=ls(t);if(B0(e))return t}function MS(t,e){if(t==="change")return e}var _x=!1;if($n){var qd;if($n){var Kd="oninput"in document;if(!Kd){var Ny=document.createElement("div");Ny.setAttribute("oninput","return;"),Kd=typeof Ny.oninput=="function"}qd=Kd}else qd=!1;_x=qd&&(!document.documentMode||9<document.documentMode)}function Cy(){Yo&&(Yo.detachEvent("onpropertychange",xx),ga=Yo=null)}function xx(t){if(t.propertyName==="value"&&Iu(ga)){var e=[];vx(e,ga,t,mp(t)),Z0(OS,e)}}function LS(t,e,n){t==="focusin"?(Cy(),Yo=e,ga=n,Yo.attachEvent("onpropertychange",xx)):t==="focusout"&&Cy()}function FS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Iu(ga)}function US(t,e){if(t==="click")return Iu(e)}function zS(t,e){if(t==="input"||t==="change")return Iu(e)}function BS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var sn=typeof Object.is=="function"?Object.is:BS;function ya(t,e){if(sn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Sh.call(e,i)||!sn(t[i],e[i]))return!1}return!0}function Dy(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function jy(t,e){var n=Dy(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Dy(n)}}function wx(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?wx(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Ex(){for(var t=window,e=Tc();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Tc(t.document)}return e}function bp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function $S(t){var e=Ex(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&wx(n.ownerDocument.documentElement,n)){if(r!==null&&bp(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=jy(n,s);var o=jy(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var qS=$n&&"documentMode"in document&&11>=document.documentMode,os=null,Kh=null,Jo=null,Hh=!1;function Vy(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Hh||os==null||os!==Tc(r)||(r=os,"selectionStart"in r&&bp(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jo&&ya(Jo,r)||(Jo=r,r=Ac(Kh,"onSelect"),0<r.length&&(e=new wp("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=os)))}function Dl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var as={animationend:Dl("Animation","AnimationEnd"),animationiteration:Dl("Animation","AnimationIteration"),animationstart:Dl("Animation","AnimationStart"),transitionend:Dl("Transition","TransitionEnd")},Hd={},Tx={};$n&&(Tx=document.createElement("div").style,"AnimationEvent"in window||(delete as.animationend.animation,delete as.animationiteration.animation,delete as.animationstart.animation),"TransitionEvent"in window||delete as.transitionend.transition);function Su(t){if(Hd[t])return Hd[t];if(!as[t])return t;var e=as[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Tx)return Hd[t]=e[n];return t}var bx=Su("animationend"),Ix=Su("animationiteration"),Sx=Su("animationstart"),kx=Su("transitionend"),Rx=new Map,Oy="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $r(t,e){Rx.set(t,e),Mi(e,[t])}for(var Wd=0;Wd<Oy.length;Wd++){var Gd=Oy[Wd],KS=Gd.toLowerCase(),HS=Gd[0].toUpperCase()+Gd.slice(1);$r(KS,"on"+HS)}$r(bx,"onAnimationEnd");$r(Ix,"onAnimationIteration");$r(Sx,"onAnimationStart");$r("dblclick","onDoubleClick");$r("focusin","onFocus");$r("focusout","onBlur");$r(kx,"onTransitionEnd");Ss("onMouseEnter",["mouseout","mouseover"]);Ss("onMouseLeave",["mouseout","mouseover"]);Ss("onPointerEnter",["pointerout","pointerover"]);Ss("onPointerLeave",["pointerout","pointerover"]);Mi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Mi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Mi("onBeforeInput",["compositionend","keypress","textInput","paste"]);Mi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Mi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Mi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),WS=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fo));function My(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,KI(r,e,void 0,t),t.currentTarget=null}function Px(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var a=r[o],c=a.instance,d=a.currentTarget;if(a=a.listener,c!==s&&i.isPropagationStopped())break e;My(i,a,d),s=c}else for(o=0;o<r.length;o++){if(a=r[o],c=a.instance,d=a.currentTarget,a=a.listener,c!==s&&i.isPropagationStopped())break e;My(i,a,d),s=c}}}if(Ic)throw t=zh,Ic=!1,zh=null,t}function Ee(t,e){var n=e[Jh];n===void 0&&(n=e[Jh]=new Set);var r=t+"__bubble";n.has(r)||(Ax(e,t,2,!1),n.add(r))}function Qd(t,e,n){var r=0;e&&(r|=4),Ax(n,t,r,e)}var jl="_reactListening"+Math.random().toString(36).slice(2);function va(t){if(!t[jl]){t[jl]=!0,M0.forEach(function(n){n!=="selectionchange"&&(WS.has(n)||Qd(n,!1,t),Qd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[jl]||(e[jl]=!0,Qd("selectionchange",!1,e))}}function Ax(t,e,n,r){switch(fx(e)){case 1:var i=aS;break;case 4:i=lS;break;default:i=_p}n=i.bind(null,e,n,t),i=void 0,!Uh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Yd(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;o=o.return}for(;a!==null;){if(o=hi(a),o===null)return;if(c=o.tag,c===5||c===6){r=s=o;continue e}a=a.parentNode}}r=r.return}Z0(function(){var d=s,f=mp(n),p=[];e:{var g=Rx.get(t);if(g!==void 0){var S=wp,A=t;switch(t){case"keypress":if(nc(n)===0)break e;case"keydown":case"keyup":S=TS;break;case"focusin":A="focus",S=$d;break;case"focusout":A="blur",S=$d;break;case"beforeblur":case"afterblur":S=$d;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=Iy;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=dS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=SS;break;case bx:case Ix:case Sx:S=pS;break;case kx:S=RS;break;case"scroll":S=cS;break;case"wheel":S=AS;break;case"copy":case"cut":case"paste":S=gS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=ky}var T=(e&4)!==0,P=!T&&t==="scroll",y=T?g!==null?g+"Capture":null:g;T=[];for(var x=d,v;x!==null;){v=x;var k=v.stateNode;if(v.tag===5&&k!==null&&(v=k,y!==null&&(k=ha(x,y),k!=null&&T.push(_a(x,k,v)))),P)break;x=x.return}0<T.length&&(g=new S(g,A,null,n,f),p.push({event:g,listeners:T}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",S=t==="mouseout"||t==="pointerout",g&&n!==Lh&&(A=n.relatedTarget||n.fromElement)&&(hi(A)||A[qn]))break e;if((S||g)&&(g=f.window===f?f:(g=f.ownerDocument)?g.defaultView||g.parentWindow:window,S?(A=n.relatedTarget||n.toElement,S=d,A=A?hi(A):null,A!==null&&(P=Li(A),A!==P||A.tag!==5&&A.tag!==6)&&(A=null)):(S=null,A=d),S!==A)){if(T=Iy,k="onMouseLeave",y="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(T=ky,k="onPointerLeave",y="onPointerEnter",x="pointer"),P=S==null?g:ls(S),v=A==null?g:ls(A),g=new T(k,x+"leave",S,n,f),g.target=P,g.relatedTarget=v,k=null,hi(f)===d&&(T=new T(y,x+"enter",A,n,f),T.target=v,T.relatedTarget=P,k=T),P=k,S&&A)t:{for(T=S,y=A,x=0,v=T;v;v=Hi(v))x++;for(v=0,k=y;k;k=Hi(k))v++;for(;0<x-v;)T=Hi(T),x--;for(;0<v-x;)y=Hi(y),v--;for(;x--;){if(T===y||y!==null&&T===y.alternate)break t;T=Hi(T),y=Hi(y)}T=null}else T=null;S!==null&&Ly(p,g,S,T,!1),A!==null&&P!==null&&Ly(p,P,A,T,!0)}}e:{if(g=d?ls(d):window,S=g.nodeName&&g.nodeName.toLowerCase(),S==="select"||S==="input"&&g.type==="file")var O=MS;else if(Ay(g))if(_x)O=zS;else{O=FS;var M=LS}else(S=g.nodeName)&&S.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(O=US);if(O&&(O=O(t,d))){vx(p,O,n,f);break e}M&&M(t,g,d),t==="focusout"&&(M=g._wrapperState)&&M.controlled&&g.type==="number"&&Dh(g,"number",g.value)}switch(M=d?ls(d):window,t){case"focusin":(Ay(M)||M.contentEditable==="true")&&(os=M,Kh=d,Jo=null);break;case"focusout":Jo=Kh=os=null;break;case"mousedown":Hh=!0;break;case"contextmenu":case"mouseup":case"dragend":Hh=!1,Vy(p,n,f);break;case"selectionchange":if(qS)break;case"keydown":case"keyup":Vy(p,n,f)}var I;if(Tp)e:{switch(t){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else ss?gx(t,n)&&(E="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(mx&&n.locale!=="ko"&&(ss||E!=="onCompositionStart"?E==="onCompositionEnd"&&ss&&(I=px()):(xr=f,xp="value"in xr?xr.value:xr.textContent,ss=!0)),M=Ac(d,E),0<M.length&&(E=new Sy(E,t,null,n,f),p.push({event:E,listeners:M}),I?E.data=I:(I=yx(n),I!==null&&(E.data=I)))),(I=CS?DS(t,n):jS(t,n))&&(d=Ac(d,"onBeforeInput"),0<d.length&&(f=new Sy("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:d}),f.data=I))}Px(p,e)})}function _a(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ac(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=ha(t,n),s!=null&&r.unshift(_a(t,s,i)),s=ha(t,e),s!=null&&r.push(_a(t,s,i))),t=t.return}return r}function Hi(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Ly(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var a=n,c=a.alternate,d=a.stateNode;if(c!==null&&c===r)break;a.tag===5&&d!==null&&(a=d,i?(c=ha(n,s),c!=null&&o.unshift(_a(n,c,a))):i||(c=ha(n,s),c!=null&&o.push(_a(n,c,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var GS=/\r\n?/g,QS=/\u0000|\uFFFD/g;function Fy(t){return(typeof t=="string"?t:""+t).replace(GS,`
`).replace(QS,"")}function Vl(t,e,n){if(e=Fy(e),Fy(t)!==e&&n)throw Error(z(425))}function Nc(){}var Wh=null,Gh=null;function Qh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Yh=typeof setTimeout=="function"?setTimeout:void 0,YS=typeof clearTimeout=="function"?clearTimeout:void 0,Uy=typeof Promise=="function"?Promise:void 0,JS=typeof queueMicrotask=="function"?queueMicrotask:typeof Uy<"u"?function(t){return Uy.resolve(null).then(t).catch(XS)}:Yh;function XS(t){setTimeout(function(){throw t})}function Jd(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),ma(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);ma(e)}function kr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function zy(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Xs=Math.random().toString(36).slice(2),cn="__reactFiber$"+Xs,xa="__reactProps$"+Xs,qn="__reactContainer$"+Xs,Jh="__reactEvents$"+Xs,ZS="__reactListeners$"+Xs,ek="__reactHandles$"+Xs;function hi(t){var e=t[cn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[qn]||n[cn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=zy(t);t!==null;){if(n=t[cn])return n;t=zy(t)}return e}t=n,n=t.parentNode}return null}function Ga(t){return t=t[cn]||t[qn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ls(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(z(33))}function ku(t){return t[xa]||null}var Xh=[],cs=-1;function qr(t){return{current:t}}function Te(t){0>cs||(t.current=Xh[cs],Xh[cs]=null,cs--)}function ve(t,e){cs++,Xh[cs]=t.current,t.current=e}var Lr={},ft=qr(Lr),At=qr(!1),wi=Lr;function ks(t,e){var n=t.type.contextTypes;if(!n)return Lr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Nt(t){return t=t.childContextTypes,t!=null}function Cc(){Te(At),Te(ft)}function By(t,e,n){if(ft.current!==Lr)throw Error(z(168));ve(ft,e),ve(At,n)}function Nx(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(z(108,LI(t)||"Unknown",i));return Ce({},n,r)}function Dc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Lr,wi=ft.current,ve(ft,t),ve(At,At.current),!0}function $y(t,e,n){var r=t.stateNode;if(!r)throw Error(z(169));n?(t=Nx(t,e,wi),r.__reactInternalMemoizedMergedChildContext=t,Te(At),Te(ft),ve(ft,t)):Te(At),ve(At,n)}var jn=null,Ru=!1,Xd=!1;function Cx(t){jn===null?jn=[t]:jn.push(t)}function tk(t){Ru=!0,Cx(t)}function Kr(){if(!Xd&&jn!==null){Xd=!0;var t=0,e=he;try{var n=jn;for(he=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}jn=null,Ru=!1}catch(i){throw jn!==null&&(jn=jn.slice(t+1)),rx(gp,Kr),i}finally{he=e,Xd=!1}}return null}var us=[],ds=0,jc=null,Vc=0,Kt=[],Ht=0,Ei=null,Vn=1,On="";function ii(t,e){us[ds++]=Vc,us[ds++]=jc,jc=t,Vc=e}function Dx(t,e,n){Kt[Ht++]=Vn,Kt[Ht++]=On,Kt[Ht++]=Ei,Ei=t;var r=Vn;t=On;var i=32-nn(r)-1;r&=~(1<<i),n+=1;var s=32-nn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Vn=1<<32-nn(e)+i|n<<i|r,On=s+t}else Vn=1<<s|n<<i|r,On=t}function Ip(t){t.return!==null&&(ii(t,1),Dx(t,1,0))}function Sp(t){for(;t===jc;)jc=us[--ds],us[ds]=null,Vc=us[--ds],us[ds]=null;for(;t===Ei;)Ei=Kt[--Ht],Kt[Ht]=null,On=Kt[--Ht],Kt[Ht]=null,Vn=Kt[--Ht],Kt[Ht]=null}var Ft=null,Ot=null,Ie=!1,tn=null;function jx(t,e){var n=Wt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function qy(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Ft=t,Ot=kr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Ft=t,Ot=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ei!==null?{id:Vn,overflow:On}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Wt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Ft=t,Ot=null,!0):!1;default:return!1}}function Zh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function ef(t){if(Ie){var e=Ot;if(e){var n=e;if(!qy(t,e)){if(Zh(t))throw Error(z(418));e=kr(n.nextSibling);var r=Ft;e&&qy(t,e)?jx(r,n):(t.flags=t.flags&-4097|2,Ie=!1,Ft=t)}}else{if(Zh(t))throw Error(z(418));t.flags=t.flags&-4097|2,Ie=!1,Ft=t}}}function Ky(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Ft=t}function Ol(t){if(t!==Ft)return!1;if(!Ie)return Ky(t),Ie=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Qh(t.type,t.memoizedProps)),e&&(e=Ot)){if(Zh(t))throw Vx(),Error(z(418));for(;e;)jx(t,e),e=kr(e.nextSibling)}if(Ky(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(z(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Ot=kr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Ot=null}}else Ot=Ft?kr(t.stateNode.nextSibling):null;return!0}function Vx(){for(var t=Ot;t;)t=kr(t.nextSibling)}function Rs(){Ot=Ft=null,Ie=!1}function kp(t){tn===null?tn=[t]:tn.push(t)}var nk=Jn.ReactCurrentBatchConfig;function ko(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(z(309));var r=n.stateNode}if(!r)throw Error(z(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(z(284));if(!n._owner)throw Error(z(290,t))}return t}function Ml(t,e){throw t=Object.prototype.toString.call(e),Error(z(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Hy(t){var e=t._init;return e(t._payload)}function Ox(t){function e(y,x){if(t){var v=y.deletions;v===null?(y.deletions=[x],y.flags|=16):v.push(x)}}function n(y,x){if(!t)return null;for(;x!==null;)e(y,x),x=x.sibling;return null}function r(y,x){for(y=new Map;x!==null;)x.key!==null?y.set(x.key,x):y.set(x.index,x),x=x.sibling;return y}function i(y,x){return y=Nr(y,x),y.index=0,y.sibling=null,y}function s(y,x,v){return y.index=v,t?(v=y.alternate,v!==null?(v=v.index,v<x?(y.flags|=2,x):v):(y.flags|=2,x)):(y.flags|=1048576,x)}function o(y){return t&&y.alternate===null&&(y.flags|=2),y}function a(y,x,v,k){return x===null||x.tag!==6?(x=sh(v,y.mode,k),x.return=y,x):(x=i(x,v),x.return=y,x)}function c(y,x,v,k){var O=v.type;return O===is?f(y,x,v.props.children,k,v.key):x!==null&&(x.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===lr&&Hy(O)===x.type)?(k=i(x,v.props),k.ref=ko(y,x,v),k.return=y,k):(k=cc(v.type,v.key,v.props,null,y.mode,k),k.ref=ko(y,x,v),k.return=y,k)}function d(y,x,v,k){return x===null||x.tag!==4||x.stateNode.containerInfo!==v.containerInfo||x.stateNode.implementation!==v.implementation?(x=oh(v,y.mode,k),x.return=y,x):(x=i(x,v.children||[]),x.return=y,x)}function f(y,x,v,k,O){return x===null||x.tag!==7?(x=gi(v,y.mode,k,O),x.return=y,x):(x=i(x,v),x.return=y,x)}function p(y,x,v){if(typeof x=="string"&&x!==""||typeof x=="number")return x=sh(""+x,y.mode,v),x.return=y,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Sl:return v=cc(x.type,x.key,x.props,null,y.mode,v),v.ref=ko(y,null,x),v.return=y,v;case rs:return x=oh(x,y.mode,v),x.return=y,x;case lr:var k=x._init;return p(y,k(x._payload),v)}if(Mo(x)||Eo(x))return x=gi(x,y.mode,v,null),x.return=y,x;Ml(y,x)}return null}function g(y,x,v,k){var O=x!==null?x.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return O!==null?null:a(y,x,""+v,k);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Sl:return v.key===O?c(y,x,v,k):null;case rs:return v.key===O?d(y,x,v,k):null;case lr:return O=v._init,g(y,x,O(v._payload),k)}if(Mo(v)||Eo(v))return O!==null?null:f(y,x,v,k,null);Ml(y,v)}return null}function S(y,x,v,k,O){if(typeof k=="string"&&k!==""||typeof k=="number")return y=y.get(v)||null,a(x,y,""+k,O);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Sl:return y=y.get(k.key===null?v:k.key)||null,c(x,y,k,O);case rs:return y=y.get(k.key===null?v:k.key)||null,d(x,y,k,O);case lr:var M=k._init;return S(y,x,v,M(k._payload),O)}if(Mo(k)||Eo(k))return y=y.get(v)||null,f(x,y,k,O,null);Ml(x,k)}return null}function A(y,x,v,k){for(var O=null,M=null,I=x,E=x=0,_=null;I!==null&&E<v.length;E++){I.index>E?(_=I,I=null):_=I.sibling;var b=g(y,I,v[E],k);if(b===null){I===null&&(I=_);break}t&&I&&b.alternate===null&&e(y,I),x=s(b,x,E),M===null?O=b:M.sibling=b,M=b,I=_}if(E===v.length)return n(y,I),Ie&&ii(y,E),O;if(I===null){for(;E<v.length;E++)I=p(y,v[E],k),I!==null&&(x=s(I,x,E),M===null?O=I:M.sibling=I,M=I);return Ie&&ii(y,E),O}for(I=r(y,I);E<v.length;E++)_=S(I,y,E,v[E],k),_!==null&&(t&&_.alternate!==null&&I.delete(_.key===null?E:_.key),x=s(_,x,E),M===null?O=_:M.sibling=_,M=_);return t&&I.forEach(function(N){return e(y,N)}),Ie&&ii(y,E),O}function T(y,x,v,k){var O=Eo(v);if(typeof O!="function")throw Error(z(150));if(v=O.call(v),v==null)throw Error(z(151));for(var M=O=null,I=x,E=x=0,_=null,b=v.next();I!==null&&!b.done;E++,b=v.next()){I.index>E?(_=I,I=null):_=I.sibling;var N=g(y,I,b.value,k);if(N===null){I===null&&(I=_);break}t&&I&&N.alternate===null&&e(y,I),x=s(N,x,E),M===null?O=N:M.sibling=N,M=N,I=_}if(b.done)return n(y,I),Ie&&ii(y,E),O;if(I===null){for(;!b.done;E++,b=v.next())b=p(y,b.value,k),b!==null&&(x=s(b,x,E),M===null?O=b:M.sibling=b,M=b);return Ie&&ii(y,E),O}for(I=r(y,I);!b.done;E++,b=v.next())b=S(I,y,E,b.value,k),b!==null&&(t&&b.alternate!==null&&I.delete(b.key===null?E:b.key),x=s(b,x,E),M===null?O=b:M.sibling=b,M=b);return t&&I.forEach(function(C){return e(y,C)}),Ie&&ii(y,E),O}function P(y,x,v,k){if(typeof v=="object"&&v!==null&&v.type===is&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Sl:e:{for(var O=v.key,M=x;M!==null;){if(M.key===O){if(O=v.type,O===is){if(M.tag===7){n(y,M.sibling),x=i(M,v.props.children),x.return=y,y=x;break e}}else if(M.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===lr&&Hy(O)===M.type){n(y,M.sibling),x=i(M,v.props),x.ref=ko(y,M,v),x.return=y,y=x;break e}n(y,M);break}else e(y,M);M=M.sibling}v.type===is?(x=gi(v.props.children,y.mode,k,v.key),x.return=y,y=x):(k=cc(v.type,v.key,v.props,null,y.mode,k),k.ref=ko(y,x,v),k.return=y,y=k)}return o(y);case rs:e:{for(M=v.key;x!==null;){if(x.key===M)if(x.tag===4&&x.stateNode.containerInfo===v.containerInfo&&x.stateNode.implementation===v.implementation){n(y,x.sibling),x=i(x,v.children||[]),x.return=y,y=x;break e}else{n(y,x);break}else e(y,x);x=x.sibling}x=oh(v,y.mode,k),x.return=y,y=x}return o(y);case lr:return M=v._init,P(y,x,M(v._payload),k)}if(Mo(v))return A(y,x,v,k);if(Eo(v))return T(y,x,v,k);Ml(y,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,x!==null&&x.tag===6?(n(y,x.sibling),x=i(x,v),x.return=y,y=x):(n(y,x),x=sh(v,y.mode,k),x.return=y,y=x),o(y)):n(y,x)}return P}var Ps=Ox(!0),Mx=Ox(!1),Oc=qr(null),Mc=null,hs=null,Rp=null;function Pp(){Rp=hs=Mc=null}function Ap(t){var e=Oc.current;Te(Oc),t._currentValue=e}function tf(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function xs(t,e){Mc=t,Rp=hs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(kt=!0),t.firstContext=null)}function Qt(t){var e=t._currentValue;if(Rp!==t)if(t={context:t,memoizedValue:e,next:null},hs===null){if(Mc===null)throw Error(z(308));hs=t,Mc.dependencies={lanes:0,firstContext:t}}else hs=hs.next=t;return e}var fi=null;function Np(t){fi===null?fi=[t]:fi.push(t)}function Lx(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Np(e)):(n.next=i.next,i.next=n),e.interleaved=n,Kn(t,r)}function Kn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var cr=!1;function Cp(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fx(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function zn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Rr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,le&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Kn(t,n)}return i=r.interleaved,i===null?(e.next=e,Np(r)):(e.next=i.next,i.next=e),r.interleaved=e,Kn(t,n)}function rc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,yp(t,n)}}function Wy(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Lc(t,e,n,r){var i=t.updateQueue;cr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var c=a,d=c.next;c.next=null,o===null?s=d:o.next=d,o=c;var f=t.alternate;f!==null&&(f=f.updateQueue,a=f.lastBaseUpdate,a!==o&&(a===null?f.firstBaseUpdate=d:a.next=d,f.lastBaseUpdate=c))}if(s!==null){var p=i.baseState;o=0,f=d=c=null,a=s;do{var g=a.lane,S=a.eventTime;if((r&g)===g){f!==null&&(f=f.next={eventTime:S,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var A=t,T=a;switch(g=e,S=n,T.tag){case 1:if(A=T.payload,typeof A=="function"){p=A.call(S,p,g);break e}p=A;break e;case 3:A.flags=A.flags&-65537|128;case 0:if(A=T.payload,g=typeof A=="function"?A.call(S,p,g):A,g==null)break e;p=Ce({},p,g);break e;case 2:cr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,g=i.effects,g===null?i.effects=[a]:g.push(a))}else S={eventTime:S,lane:g,tag:a.tag,payload:a.payload,callback:a.callback,next:null},f===null?(d=f=S,c=p):f=f.next=S,o|=g;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;g=a,a=g.next,g.next=null,i.lastBaseUpdate=g,i.shared.pending=null}}while(!0);if(f===null&&(c=p),i.baseState=c,i.firstBaseUpdate=d,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);bi|=o,t.lanes=o,t.memoizedState=p}}function Gy(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(z(191,i));i.call(r)}}}var Qa={},mn=qr(Qa),wa=qr(Qa),Ea=qr(Qa);function pi(t){if(t===Qa)throw Error(z(174));return t}function Dp(t,e){switch(ve(Ea,e),ve(wa,t),ve(mn,Qa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Vh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Vh(e,t)}Te(mn),ve(mn,e)}function As(){Te(mn),Te(wa),Te(Ea)}function Ux(t){pi(Ea.current);var e=pi(mn.current),n=Vh(e,t.type);e!==n&&(ve(wa,t),ve(mn,n))}function jp(t){wa.current===t&&(Te(mn),Te(wa))}var ke=qr(0);function Fc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Zd=[];function Vp(){for(var t=0;t<Zd.length;t++)Zd[t]._workInProgressVersionPrimary=null;Zd.length=0}var ic=Jn.ReactCurrentDispatcher,eh=Jn.ReactCurrentBatchConfig,Ti=0,Pe=null,He=null,Je=null,Uc=!1,Xo=!1,Ta=0,rk=0;function at(){throw Error(z(321))}function Op(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!sn(t[n],e[n]))return!1;return!0}function Mp(t,e,n,r,i,s){if(Ti=s,Pe=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ic.current=t===null||t.memoizedState===null?ak:lk,t=n(r,i),Xo){s=0;do{if(Xo=!1,Ta=0,25<=s)throw Error(z(301));s+=1,Je=He=null,e.updateQueue=null,ic.current=ck,t=n(r,i)}while(Xo)}if(ic.current=zc,e=He!==null&&He.next!==null,Ti=0,Je=He=Pe=null,Uc=!1,e)throw Error(z(300));return t}function Lp(){var t=Ta!==0;return Ta=0,t}function ln(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Je===null?Pe.memoizedState=Je=t:Je=Je.next=t,Je}function Yt(){if(He===null){var t=Pe.alternate;t=t!==null?t.memoizedState:null}else t=He.next;var e=Je===null?Pe.memoizedState:Je.next;if(e!==null)Je=e,He=t;else{if(t===null)throw Error(z(310));He=t,t={memoizedState:He.memoizedState,baseState:He.baseState,baseQueue:He.baseQueue,queue:He.queue,next:null},Je===null?Pe.memoizedState=Je=t:Je=Je.next=t}return Je}function ba(t,e){return typeof e=="function"?e(t):e}function th(t){var e=Yt(),n=e.queue;if(n===null)throw Error(z(311));n.lastRenderedReducer=t;var r=He,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,c=null,d=s;do{var f=d.lane;if((Ti&f)===f)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:t(r,d.action);else{var p={lane:f,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(a=c=p,o=r):c=c.next=p,Pe.lanes|=f,bi|=f}d=d.next}while(d!==null&&d!==s);c===null?o=r:c.next=a,sn(r,e.memoizedState)||(kt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=c,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,Pe.lanes|=s,bi|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function nh(t){var e=Yt(),n=e.queue;if(n===null)throw Error(z(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);sn(s,e.memoizedState)||(kt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function zx(){}function Bx(t,e){var n=Pe,r=Yt(),i=e(),s=!sn(r.memoizedState,i);if(s&&(r.memoizedState=i,kt=!0),r=r.queue,Fp(Kx.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Je!==null&&Je.memoizedState.tag&1){if(n.flags|=2048,Ia(9,qx.bind(null,n,r,i,e),void 0,null),Xe===null)throw Error(z(349));Ti&30||$x(n,e,i)}return i}function $x(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Pe.updateQueue,e===null?(e={lastEffect:null,stores:null},Pe.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function qx(t,e,n,r){e.value=n,e.getSnapshot=r,Hx(e)&&Wx(t)}function Kx(t,e,n){return n(function(){Hx(e)&&Wx(t)})}function Hx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!sn(t,n)}catch{return!0}}function Wx(t){var e=Kn(t,1);e!==null&&rn(e,t,1,-1)}function Qy(t){var e=ln();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:t},e.queue=t,t=t.dispatch=ok.bind(null,Pe,t),[e.memoizedState,t]}function Ia(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Pe.updateQueue,e===null?(e={lastEffect:null,stores:null},Pe.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Gx(){return Yt().memoizedState}function sc(t,e,n,r){var i=ln();Pe.flags|=t,i.memoizedState=Ia(1|e,n,void 0,r===void 0?null:r)}function Pu(t,e,n,r){var i=Yt();r=r===void 0?null:r;var s=void 0;if(He!==null){var o=He.memoizedState;if(s=o.destroy,r!==null&&Op(r,o.deps)){i.memoizedState=Ia(e,n,s,r);return}}Pe.flags|=t,i.memoizedState=Ia(1|e,n,s,r)}function Yy(t,e){return sc(8390656,8,t,e)}function Fp(t,e){return Pu(2048,8,t,e)}function Qx(t,e){return Pu(4,2,t,e)}function Yx(t,e){return Pu(4,4,t,e)}function Jx(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Xx(t,e,n){return n=n!=null?n.concat([t]):null,Pu(4,4,Jx.bind(null,e,t),n)}function Up(){}function Zx(t,e){var n=Yt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Op(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function ew(t,e){var n=Yt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Op(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function tw(t,e,n){return Ti&21?(sn(n,e)||(n=ox(),Pe.lanes|=n,bi|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,kt=!0),t.memoizedState=n)}function ik(t,e){var n=he;he=n!==0&&4>n?n:4,t(!0);var r=eh.transition;eh.transition={};try{t(!1),e()}finally{he=n,eh.transition=r}}function nw(){return Yt().memoizedState}function sk(t,e,n){var r=Ar(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},rw(t))iw(e,n);else if(n=Lx(t,e,n,r),n!==null){var i=xt();rn(n,t,r,i),sw(n,e,r)}}function ok(t,e,n){var r=Ar(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(rw(t))iw(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(i.hasEagerState=!0,i.eagerState=a,sn(a,o)){var c=e.interleaved;c===null?(i.next=i,Np(e)):(i.next=c.next,c.next=i),e.interleaved=i;return}}catch{}finally{}n=Lx(t,e,i,r),n!==null&&(i=xt(),rn(n,t,r,i),sw(n,e,r))}}function rw(t){var e=t.alternate;return t===Pe||e!==null&&e===Pe}function iw(t,e){Xo=Uc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function sw(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,yp(t,n)}}var zc={readContext:Qt,useCallback:at,useContext:at,useEffect:at,useImperativeHandle:at,useInsertionEffect:at,useLayoutEffect:at,useMemo:at,useReducer:at,useRef:at,useState:at,useDebugValue:at,useDeferredValue:at,useTransition:at,useMutableSource:at,useSyncExternalStore:at,useId:at,unstable_isNewReconciler:!1},ak={readContext:Qt,useCallback:function(t,e){return ln().memoizedState=[t,e===void 0?null:e],t},useContext:Qt,useEffect:Yy,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,sc(4194308,4,Jx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return sc(4194308,4,t,e)},useInsertionEffect:function(t,e){return sc(4,2,t,e)},useMemo:function(t,e){var n=ln();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=ln();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=sk.bind(null,Pe,t),[r.memoizedState,t]},useRef:function(t){var e=ln();return t={current:t},e.memoizedState=t},useState:Qy,useDebugValue:Up,useDeferredValue:function(t){return ln().memoizedState=t},useTransition:function(){var t=Qy(!1),e=t[0];return t=ik.bind(null,t[1]),ln().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Pe,i=ln();if(Ie){if(n===void 0)throw Error(z(407));n=n()}else{if(n=e(),Xe===null)throw Error(z(349));Ti&30||$x(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Yy(Kx.bind(null,r,s,t),[t]),r.flags|=2048,Ia(9,qx.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=ln(),e=Xe.identifierPrefix;if(Ie){var n=On,r=Vn;n=(r&~(1<<32-nn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ta++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=rk++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},lk={readContext:Qt,useCallback:Zx,useContext:Qt,useEffect:Fp,useImperativeHandle:Xx,useInsertionEffect:Qx,useLayoutEffect:Yx,useMemo:ew,useReducer:th,useRef:Gx,useState:function(){return th(ba)},useDebugValue:Up,useDeferredValue:function(t){var e=Yt();return tw(e,He.memoizedState,t)},useTransition:function(){var t=th(ba)[0],e=Yt().memoizedState;return[t,e]},useMutableSource:zx,useSyncExternalStore:Bx,useId:nw,unstable_isNewReconciler:!1},ck={readContext:Qt,useCallback:Zx,useContext:Qt,useEffect:Fp,useImperativeHandle:Xx,useInsertionEffect:Qx,useLayoutEffect:Yx,useMemo:ew,useReducer:nh,useRef:Gx,useState:function(){return nh(ba)},useDebugValue:Up,useDeferredValue:function(t){var e=Yt();return He===null?e.memoizedState=t:tw(e,He.memoizedState,t)},useTransition:function(){var t=nh(ba)[0],e=Yt().memoizedState;return[t,e]},useMutableSource:zx,useSyncExternalStore:Bx,useId:nw,unstable_isNewReconciler:!1};function Zt(t,e){if(t&&t.defaultProps){e=Ce({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function nf(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ce({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Au={isMounted:function(t){return(t=t._reactInternals)?Li(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=xt(),i=Ar(t),s=zn(r,i);s.payload=e,n!=null&&(s.callback=n),e=Rr(t,s,i),e!==null&&(rn(e,t,i,r),rc(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=xt(),i=Ar(t),s=zn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Rr(t,s,i),e!==null&&(rn(e,t,i,r),rc(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=xt(),r=Ar(t),i=zn(n,r);i.tag=2,e!=null&&(i.callback=e),e=Rr(t,i,r),e!==null&&(rn(e,t,r,n),rc(e,t,r))}};function Jy(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!ya(n,r)||!ya(i,s):!0}function ow(t,e,n){var r=!1,i=Lr,s=e.contextType;return typeof s=="object"&&s!==null?s=Qt(s):(i=Nt(e)?wi:ft.current,r=e.contextTypes,s=(r=r!=null)?ks(t,i):Lr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Au,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Xy(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Au.enqueueReplaceState(e,e.state,null)}function rf(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Cp(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Qt(s):(s=Nt(e)?wi:ft.current,i.context=ks(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(nf(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Au.enqueueReplaceState(i,i.state,null),Lc(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function Ns(t,e){try{var n="",r=e;do n+=MI(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function rh(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function sf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var uk=typeof WeakMap=="function"?WeakMap:Map;function aw(t,e,n){n=zn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){$c||($c=!0,mf=r),sf(t,e)},n}function lw(t,e,n){n=zn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){sf(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){sf(t,e),typeof r!="function"&&(Pr===null?Pr=new Set([this]):Pr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Zy(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new uk;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=bk.bind(null,t,e,n),e.then(t,t))}function ev(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function tv(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=zn(-1,1),e.tag=2,Rr(n,e,1))),n.lanes|=1),t)}var dk=Jn.ReactCurrentOwner,kt=!1;function vt(t,e,n,r){e.child=t===null?Mx(e,null,n,r):Ps(e,t.child,n,r)}function nv(t,e,n,r,i){n=n.render;var s=e.ref;return xs(e,i),r=Mp(t,e,n,r,s,i),n=Lp(),t!==null&&!kt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Hn(t,e,i)):(Ie&&n&&Ip(e),e.flags|=1,vt(t,e,r,i),e.child)}function rv(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Gp(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,cw(t,e,s,r,i)):(t=cc(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:ya,n(o,r)&&t.ref===e.ref)return Hn(t,e,i)}return e.flags|=1,t=Nr(s,r),t.ref=e.ref,t.return=e,e.child=t}function cw(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(ya(s,r)&&t.ref===e.ref)if(kt=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(kt=!0);else return e.lanes=t.lanes,Hn(t,e,i)}return of(t,e,n,r,i)}function uw(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ve(ps,Vt),Vt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ve(ps,Vt),Vt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ve(ps,Vt),Vt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,ve(ps,Vt),Vt|=r;return vt(t,e,i,n),e.child}function dw(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function of(t,e,n,r,i){var s=Nt(n)?wi:ft.current;return s=ks(e,s),xs(e,i),n=Mp(t,e,n,r,s,i),r=Lp(),t!==null&&!kt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Hn(t,e,i)):(Ie&&r&&Ip(e),e.flags|=1,vt(t,e,n,i),e.child)}function iv(t,e,n,r,i){if(Nt(n)){var s=!0;Dc(e)}else s=!1;if(xs(e,i),e.stateNode===null)oc(t,e),ow(e,n,r),rf(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var c=o.context,d=n.contextType;typeof d=="object"&&d!==null?d=Qt(d):(d=Nt(n)?wi:ft.current,d=ks(e,d));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||c!==d)&&Xy(e,o,r,d),cr=!1;var g=e.memoizedState;o.state=g,Lc(e,r,o,i),c=e.memoizedState,a!==r||g!==c||At.current||cr?(typeof f=="function"&&(nf(e,n,f,r),c=e.memoizedState),(a=cr||Jy(e,n,a,r,g,c,d))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=c),o.props=r,o.state=c,o.context=d,r=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Fx(t,e),a=e.memoizedProps,d=e.type===e.elementType?a:Zt(e.type,a),o.props=d,p=e.pendingProps,g=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Qt(c):(c=Nt(n)?wi:ft.current,c=ks(e,c));var S=n.getDerivedStateFromProps;(f=typeof S=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==p||g!==c)&&Xy(e,o,r,c),cr=!1,g=e.memoizedState,o.state=g,Lc(e,r,o,i);var A=e.memoizedState;a!==p||g!==A||At.current||cr?(typeof S=="function"&&(nf(e,n,S,r),A=e.memoizedState),(d=cr||Jy(e,n,d,r,g,A,c)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,A,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,A,c)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=A),o.props=r,o.state=A,o.context=c,r=d):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return af(t,e,n,r,s,i)}function af(t,e,n,r,i,s){dw(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&$y(e,n,!1),Hn(t,e,s);r=e.stateNode,dk.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Ps(e,t.child,null,s),e.child=Ps(e,null,a,s)):vt(t,e,a,s),e.memoizedState=r.state,i&&$y(e,n,!0),e.child}function hw(t){var e=t.stateNode;e.pendingContext?By(t,e.pendingContext,e.pendingContext!==e.context):e.context&&By(t,e.context,!1),Dp(t,e.containerInfo)}function sv(t,e,n,r,i){return Rs(),kp(i),e.flags|=256,vt(t,e,n,r),e.child}var lf={dehydrated:null,treeContext:null,retryLane:0};function cf(t){return{baseLanes:t,cachePool:null,transitions:null}}function fw(t,e,n){var r=e.pendingProps,i=ke.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(i&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),ve(ke,i&1),t===null)return ef(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Du(o,r,0,null),t=gi(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=cf(n),e.memoizedState=lf,t):zp(e,o));if(i=t.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return hk(t,e,o,r,a,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,a=i.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=c,e.deletions=null):(r=Nr(i,c),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=Nr(a,s):(s=gi(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?cf(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=lf,r}return s=t.child,t=s.sibling,r=Nr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function zp(t,e){return e=Du({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ll(t,e,n,r){return r!==null&&kp(r),Ps(e,t.child,null,n),t=zp(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function hk(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=rh(Error(z(422))),Ll(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Du({mode:"visible",children:r.children},i,0,null),s=gi(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Ps(e,t.child,null,o),e.child.memoizedState=cf(o),e.memoizedState=lf,s);if(!(e.mode&1))return Ll(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(z(419)),r=rh(s,r,void 0),Ll(t,e,o,r)}if(a=(o&t.childLanes)!==0,kt||a){if(r=Xe,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Kn(t,i),rn(r,t,i,-1))}return Wp(),r=rh(Error(z(421))),Ll(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=Ik.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Ot=kr(i.nextSibling),Ft=e,Ie=!0,tn=null,t!==null&&(Kt[Ht++]=Vn,Kt[Ht++]=On,Kt[Ht++]=Ei,Vn=t.id,On=t.overflow,Ei=e),e=zp(e,r.children),e.flags|=4096,e)}function ov(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),tf(t.return,e,n)}function ih(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function pw(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(vt(t,e,r.children,n),r=ke.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&ov(t,n,e);else if(t.tag===19)ov(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ve(ke,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Fc(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),ih(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Fc(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}ih(e,!0,n,null,s);break;case"together":ih(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function oc(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Hn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),bi|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(z(153));if(e.child!==null){for(t=e.child,n=Nr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Nr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function fk(t,e,n){switch(e.tag){case 3:hw(e),Rs();break;case 5:Ux(e);break;case 1:Nt(e.type)&&Dc(e);break;case 4:Dp(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;ve(Oc,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ve(ke,ke.current&1),e.flags|=128,null):n&e.child.childLanes?fw(t,e,n):(ve(ke,ke.current&1),t=Hn(t,e,n),t!==null?t.sibling:null);ve(ke,ke.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return pw(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ve(ke,ke.current),r)break;return null;case 22:case 23:return e.lanes=0,uw(t,e,n)}return Hn(t,e,n)}var mw,uf,gw,yw;mw=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};uf=function(){};gw=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,pi(mn.current);var s=null;switch(n){case"input":i=Nh(t,i),r=Nh(t,r),s=[];break;case"select":i=Ce({},i,{value:void 0}),r=Ce({},r,{value:void 0}),s=[];break;case"textarea":i=jh(t,i),r=jh(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Nc)}Oh(n,r);var o;n=null;for(d in i)if(!r.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var a=i[d];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(ua.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in r){var c=r[d];if(a=i!=null?i[d]:void 0,r.hasOwnProperty(d)&&c!==a&&(c!=null||a!=null))if(d==="style")if(a){for(o in a)!a.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&a[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(s||(s=[]),s.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(s=s||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(ua.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&Ee("scroll",t),s||a===c||(s=[])):(s=s||[]).push(d,c))}n&&(s=s||[]).push("style",n);var d=s;(e.updateQueue=d)&&(e.flags|=4)}};yw=function(t,e,n,r){n!==r&&(e.flags|=4)};function Ro(t,e){if(!Ie)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function lt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function pk(t,e,n){var r=e.pendingProps;switch(Sp(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return lt(e),null;case 1:return Nt(e.type)&&Cc(),lt(e),null;case 3:return r=e.stateNode,As(),Te(At),Te(ft),Vp(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Ol(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,tn!==null&&(vf(tn),tn=null))),uf(t,e),lt(e),null;case 5:jp(e);var i=pi(Ea.current);if(n=e.type,t!==null&&e.stateNode!=null)gw(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(z(166));return lt(e),null}if(t=pi(mn.current),Ol(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[cn]=e,r[xa]=s,t=(e.mode&1)!==0,n){case"dialog":Ee("cancel",r),Ee("close",r);break;case"iframe":case"object":case"embed":Ee("load",r);break;case"video":case"audio":for(i=0;i<Fo.length;i++)Ee(Fo[i],r);break;case"source":Ee("error",r);break;case"img":case"image":case"link":Ee("error",r),Ee("load",r);break;case"details":Ee("toggle",r);break;case"input":my(r,s),Ee("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Ee("invalid",r);break;case"textarea":yy(r,s),Ee("invalid",r)}Oh(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&Vl(r.textContent,a,t),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Vl(r.textContent,a,t),i=["children",""+a]):ua.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Ee("scroll",r)}switch(n){case"input":kl(r),gy(r,s,!0);break;case"textarea":kl(r),vy(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Nc)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=K0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[cn]=e,t[xa]=r,mw(t,e,!1,!1),e.stateNode=t;e:{switch(o=Mh(n,r),n){case"dialog":Ee("cancel",t),Ee("close",t),i=r;break;case"iframe":case"object":case"embed":Ee("load",t),i=r;break;case"video":case"audio":for(i=0;i<Fo.length;i++)Ee(Fo[i],t);i=r;break;case"source":Ee("error",t),i=r;break;case"img":case"image":case"link":Ee("error",t),Ee("load",t),i=r;break;case"details":Ee("toggle",t),i=r;break;case"input":my(t,r),i=Nh(t,r),Ee("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Ce({},r,{value:void 0}),Ee("invalid",t);break;case"textarea":yy(t,r),i=jh(t,r),Ee("invalid",t);break;default:i=r}Oh(n,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var c=a[s];s==="style"?G0(t,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&H0(t,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&da(t,c):typeof c=="number"&&da(t,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ua.hasOwnProperty(s)?c!=null&&s==="onScroll"&&Ee("scroll",t):c!=null&&dp(t,s,c,o))}switch(n){case"input":kl(t),gy(t,r,!1);break;case"textarea":kl(t),vy(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Mr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?gs(t,!!r.multiple,s,!1):r.defaultValue!=null&&gs(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Nc)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return lt(e),null;case 6:if(t&&e.stateNode!=null)yw(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(z(166));if(n=pi(Ea.current),pi(mn.current),Ol(e)){if(r=e.stateNode,n=e.memoizedProps,r[cn]=e,(s=r.nodeValue!==n)&&(t=Ft,t!==null))switch(t.tag){case 3:Vl(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Vl(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[cn]=e,e.stateNode=r}return lt(e),null;case 13:if(Te(ke),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ie&&Ot!==null&&e.mode&1&&!(e.flags&128))Vx(),Rs(),e.flags|=98560,s=!1;else if(s=Ol(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(z(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(z(317));s[cn]=e}else Rs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;lt(e),s=!1}else tn!==null&&(vf(tn),tn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ke.current&1?We===0&&(We=3):Wp())),e.updateQueue!==null&&(e.flags|=4),lt(e),null);case 4:return As(),uf(t,e),t===null&&va(e.stateNode.containerInfo),lt(e),null;case 10:return Ap(e.type._context),lt(e),null;case 17:return Nt(e.type)&&Cc(),lt(e),null;case 19:if(Te(ke),s=e.memoizedState,s===null)return lt(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Ro(s,!1);else{if(We!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Fc(t),o!==null){for(e.flags|=128,Ro(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ve(ke,ke.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ue()>Cs&&(e.flags|=128,r=!0,Ro(s,!1),e.lanes=4194304)}else{if(!r)if(t=Fc(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ro(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Ie)return lt(e),null}else 2*Ue()-s.renderingStartTime>Cs&&n!==1073741824&&(e.flags|=128,r=!0,Ro(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ue(),e.sibling=null,n=ke.current,ve(ke,r?n&1|2:n&1),e):(lt(e),null);case 22:case 23:return Hp(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Vt&1073741824&&(lt(e),e.subtreeFlags&6&&(e.flags|=8192)):lt(e),null;case 24:return null;case 25:return null}throw Error(z(156,e.tag))}function mk(t,e){switch(Sp(e),e.tag){case 1:return Nt(e.type)&&Cc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return As(),Te(At),Te(ft),Vp(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return jp(e),null;case 13:if(Te(ke),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(z(340));Rs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Te(ke),null;case 4:return As(),null;case 10:return Ap(e.type._context),null;case 22:case 23:return Hp(),null;case 24:return null;default:return null}}var Fl=!1,dt=!1,gk=typeof WeakSet=="function"?WeakSet:Set,H=null;function fs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){je(t,e,r)}else n.current=null}function df(t,e,n){try{n()}catch(r){je(t,e,r)}}var av=!1;function yk(t,e){if(Wh=Rc,t=Ex(),bp(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,c=-1,d=0,f=0,p=t,g=null;t:for(;;){for(var S;p!==n||i!==0&&p.nodeType!==3||(a=o+i),p!==s||r!==0&&p.nodeType!==3||(c=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(S=p.firstChild)!==null;)g=p,p=S;for(;;){if(p===t)break t;if(g===n&&++d===i&&(a=o),g===s&&++f===r&&(c=o),(S=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=S}n=a===-1||c===-1?null:{start:a,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Gh={focusedElem:t,selectionRange:n},Rc=!1,H=e;H!==null;)if(e=H,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,H=t;else for(;H!==null;){e=H;try{var A=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(A!==null){var T=A.memoizedProps,P=A.memoizedState,y=e.stateNode,x=y.getSnapshotBeforeUpdate(e.elementType===e.type?T:Zt(e.type,T),P);y.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(z(163))}}catch(k){je(e,e.return,k)}if(t=e.sibling,t!==null){t.return=e.return,H=t;break}H=e.return}return A=av,av=!1,A}function Zo(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&df(e,n,s)}i=i.next}while(i!==r)}}function Nu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function hf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function vw(t){var e=t.alternate;e!==null&&(t.alternate=null,vw(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[cn],delete e[xa],delete e[Jh],delete e[ZS],delete e[ek])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function _w(t){return t.tag===5||t.tag===3||t.tag===4}function lv(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||_w(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ff(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Nc));else if(r!==4&&(t=t.child,t!==null))for(ff(t,e,n),t=t.sibling;t!==null;)ff(t,e,n),t=t.sibling}function pf(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(pf(t,e,n),t=t.sibling;t!==null;)pf(t,e,n),t=t.sibling}var et=null,en=!1;function ir(t,e,n){for(n=n.child;n!==null;)xw(t,e,n),n=n.sibling}function xw(t,e,n){if(pn&&typeof pn.onCommitFiberUnmount=="function")try{pn.onCommitFiberUnmount(Tu,n)}catch{}switch(n.tag){case 5:dt||fs(n,e);case 6:var r=et,i=en;et=null,ir(t,e,n),et=r,en=i,et!==null&&(en?(t=et,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):et.removeChild(n.stateNode));break;case 18:et!==null&&(en?(t=et,n=n.stateNode,t.nodeType===8?Jd(t.parentNode,n):t.nodeType===1&&Jd(t,n),ma(t)):Jd(et,n.stateNode));break;case 4:r=et,i=en,et=n.stateNode.containerInfo,en=!0,ir(t,e,n),et=r,en=i;break;case 0:case 11:case 14:case 15:if(!dt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&df(n,e,o),i=i.next}while(i!==r)}ir(t,e,n);break;case 1:if(!dt&&(fs(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){je(n,e,a)}ir(t,e,n);break;case 21:ir(t,e,n);break;case 22:n.mode&1?(dt=(r=dt)||n.memoizedState!==null,ir(t,e,n),dt=r):ir(t,e,n);break;default:ir(t,e,n)}}function cv(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new gk),e.forEach(function(r){var i=Sk.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Xt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:et=a.stateNode,en=!1;break e;case 3:et=a.stateNode.containerInfo,en=!0;break e;case 4:et=a.stateNode.containerInfo,en=!0;break e}a=a.return}if(et===null)throw Error(z(160));xw(s,o,i),et=null,en=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(d){je(i,e,d)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)ww(e,t),e=e.sibling}function ww(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Xt(e,t),an(t),r&4){try{Zo(3,t,t.return),Nu(3,t)}catch(T){je(t,t.return,T)}try{Zo(5,t,t.return)}catch(T){je(t,t.return,T)}}break;case 1:Xt(e,t),an(t),r&512&&n!==null&&fs(n,n.return);break;case 5:if(Xt(e,t),an(t),r&512&&n!==null&&fs(n,n.return),t.flags&32){var i=t.stateNode;try{da(i,"")}catch(T){je(t,t.return,T)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&$0(i,s),Mh(a,o);var d=Mh(a,s);for(o=0;o<c.length;o+=2){var f=c[o],p=c[o+1];f==="style"?G0(i,p):f==="dangerouslySetInnerHTML"?H0(i,p):f==="children"?da(i,p):dp(i,f,p,d)}switch(a){case"input":Ch(i,s);break;case"textarea":q0(i,s);break;case"select":var g=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var S=s.value;S!=null?gs(i,!!s.multiple,S,!1):g!==!!s.multiple&&(s.defaultValue!=null?gs(i,!!s.multiple,s.defaultValue,!0):gs(i,!!s.multiple,s.multiple?[]:"",!1))}i[xa]=s}catch(T){je(t,t.return,T)}}break;case 6:if(Xt(e,t),an(t),r&4){if(t.stateNode===null)throw Error(z(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(T){je(t,t.return,T)}}break;case 3:if(Xt(e,t),an(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ma(e.containerInfo)}catch(T){je(t,t.return,T)}break;case 4:Xt(e,t),an(t);break;case 13:Xt(e,t),an(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(qp=Ue())),r&4&&cv(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(dt=(d=dt)||f,Xt(e,t),dt=d):Xt(e,t),an(t),r&8192){if(d=t.memoizedState!==null,(t.stateNode.isHidden=d)&&!f&&t.mode&1)for(H=t,f=t.child;f!==null;){for(p=H=f;H!==null;){switch(g=H,S=g.child,g.tag){case 0:case 11:case 14:case 15:Zo(4,g,g.return);break;case 1:fs(g,g.return);var A=g.stateNode;if(typeof A.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,A.props=e.memoizedProps,A.state=e.memoizedState,A.componentWillUnmount()}catch(T){je(r,n,T)}}break;case 5:fs(g,g.return);break;case 22:if(g.memoizedState!==null){dv(p);continue}}S!==null?(S.return=g,H=S):dv(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{i=p.stateNode,d?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=p.stateNode,c=p.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=W0("display",o))}catch(T){je(t,t.return,T)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(T){je(t,t.return,T)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Xt(e,t),an(t),r&4&&cv(t);break;case 21:break;default:Xt(e,t),an(t)}}function an(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(_w(n)){var r=n;break e}n=n.return}throw Error(z(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(da(i,""),r.flags&=-33);var s=lv(t);pf(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=lv(t);ff(t,a,o);break;default:throw Error(z(161))}}catch(c){je(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function vk(t,e,n){H=t,Ew(t)}function Ew(t,e,n){for(var r=(t.mode&1)!==0;H!==null;){var i=H,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Fl;if(!o){var a=i.alternate,c=a!==null&&a.memoizedState!==null||dt;a=Fl;var d=dt;if(Fl=o,(dt=c)&&!d)for(H=i;H!==null;)o=H,c=o.child,o.tag===22&&o.memoizedState!==null?hv(i):c!==null?(c.return=o,H=c):hv(i);for(;s!==null;)H=s,Ew(s),s=s.sibling;H=i,Fl=a,dt=d}uv(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,H=s):uv(t)}}function uv(t){for(;H!==null;){var e=H;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:dt||Nu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!dt)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Zt(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Gy(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Gy(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var d=e.alternate;if(d!==null){var f=d.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&ma(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(z(163))}dt||e.flags&512&&hf(e)}catch(g){je(e,e.return,g)}}if(e===t){H=null;break}if(n=e.sibling,n!==null){n.return=e.return,H=n;break}H=e.return}}function dv(t){for(;H!==null;){var e=H;if(e===t){H=null;break}var n=e.sibling;if(n!==null){n.return=e.return,H=n;break}H=e.return}}function hv(t){for(;H!==null;){var e=H;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Nu(4,e)}catch(c){je(e,n,c)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(c){je(e,i,c)}}var s=e.return;try{hf(e)}catch(c){je(e,s,c)}break;case 5:var o=e.return;try{hf(e)}catch(c){je(e,o,c)}}}catch(c){je(e,e.return,c)}if(e===t){H=null;break}var a=e.sibling;if(a!==null){a.return=e.return,H=a;break}H=e.return}}var _k=Math.ceil,Bc=Jn.ReactCurrentDispatcher,Bp=Jn.ReactCurrentOwner,Gt=Jn.ReactCurrentBatchConfig,le=0,Xe=null,qe=null,nt=0,Vt=0,ps=qr(0),We=0,Sa=null,bi=0,Cu=0,$p=0,ea=null,St=null,qp=0,Cs=1/0,Dn=null,$c=!1,mf=null,Pr=null,Ul=!1,wr=null,qc=0,ta=0,gf=null,ac=-1,lc=0;function xt(){return le&6?Ue():ac!==-1?ac:ac=Ue()}function Ar(t){return t.mode&1?le&2&&nt!==0?nt&-nt:nk.transition!==null?(lc===0&&(lc=ox()),lc):(t=he,t!==0||(t=window.event,t=t===void 0?16:fx(t.type)),t):1}function rn(t,e,n,r){if(50<ta)throw ta=0,gf=null,Error(z(185));Ha(t,n,r),(!(le&2)||t!==Xe)&&(t===Xe&&(!(le&2)&&(Cu|=n),We===4&&dr(t,nt)),Ct(t,r),n===1&&le===0&&!(e.mode&1)&&(Cs=Ue()+500,Ru&&Kr()))}function Ct(t,e){var n=t.callbackNode;nS(t,e);var r=kc(t,t===Xe?nt:0);if(r===0)n!==null&&wy(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&wy(n),e===1)t.tag===0?tk(fv.bind(null,t)):Cx(fv.bind(null,t)),JS(function(){!(le&6)&&Kr()}),n=null;else{switch(ax(r)){case 1:n=gp;break;case 4:n=ix;break;case 16:n=Sc;break;case 536870912:n=sx;break;default:n=Sc}n=Aw(n,Tw.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Tw(t,e){if(ac=-1,lc=0,le&6)throw Error(z(327));var n=t.callbackNode;if(ws()&&t.callbackNode!==n)return null;var r=kc(t,t===Xe?nt:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Kc(t,r);else{e=r;var i=le;le|=2;var s=Iw();(Xe!==t||nt!==e)&&(Dn=null,Cs=Ue()+500,mi(t,e));do try{Ek();break}catch(a){bw(t,a)}while(!0);Pp(),Bc.current=s,le=i,qe!==null?e=0:(Xe=null,nt=0,e=We)}if(e!==0){if(e===2&&(i=Bh(t),i!==0&&(r=i,e=yf(t,i))),e===1)throw n=Sa,mi(t,0),dr(t,r),Ct(t,Ue()),n;if(e===6)dr(t,r);else{if(i=t.current.alternate,!(r&30)&&!xk(i)&&(e=Kc(t,r),e===2&&(s=Bh(t),s!==0&&(r=s,e=yf(t,s))),e===1))throw n=Sa,mi(t,0),dr(t,r),Ct(t,Ue()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(z(345));case 2:si(t,St,Dn);break;case 3:if(dr(t,r),(r&130023424)===r&&(e=qp+500-Ue(),10<e)){if(kc(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){xt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Yh(si.bind(null,t,St,Dn),e);break}si(t,St,Dn);break;case 4:if(dr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-nn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Ue()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*_k(r/1960))-r,10<r){t.timeoutHandle=Yh(si.bind(null,t,St,Dn),r);break}si(t,St,Dn);break;case 5:si(t,St,Dn);break;default:throw Error(z(329))}}}return Ct(t,Ue()),t.callbackNode===n?Tw.bind(null,t):null}function yf(t,e){var n=ea;return t.current.memoizedState.isDehydrated&&(mi(t,e).flags|=256),t=Kc(t,e),t!==2&&(e=St,St=n,e!==null&&vf(e)),t}function vf(t){St===null?St=t:St.push.apply(St,t)}function xk(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!sn(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function dr(t,e){for(e&=~$p,e&=~Cu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-nn(e),r=1<<n;t[n]=-1,e&=~r}}function fv(t){if(le&6)throw Error(z(327));ws();var e=kc(t,0);if(!(e&1))return Ct(t,Ue()),null;var n=Kc(t,e);if(t.tag!==0&&n===2){var r=Bh(t);r!==0&&(e=r,n=yf(t,r))}if(n===1)throw n=Sa,mi(t,0),dr(t,e),Ct(t,Ue()),n;if(n===6)throw Error(z(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,si(t,St,Dn),Ct(t,Ue()),null}function Kp(t,e){var n=le;le|=1;try{return t(e)}finally{le=n,le===0&&(Cs=Ue()+500,Ru&&Kr())}}function Ii(t){wr!==null&&wr.tag===0&&!(le&6)&&ws();var e=le;le|=1;var n=Gt.transition,r=he;try{if(Gt.transition=null,he=1,t)return t()}finally{he=r,Gt.transition=n,le=e,!(le&6)&&Kr()}}function Hp(){Vt=ps.current,Te(ps)}function mi(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,YS(n)),qe!==null)for(n=qe.return;n!==null;){var r=n;switch(Sp(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Cc();break;case 3:As(),Te(At),Te(ft),Vp();break;case 5:jp(r);break;case 4:As();break;case 13:Te(ke);break;case 19:Te(ke);break;case 10:Ap(r.type._context);break;case 22:case 23:Hp()}n=n.return}if(Xe=t,qe=t=Nr(t.current,null),nt=Vt=e,We=0,Sa=null,$p=Cu=bi=0,St=ea=null,fi!==null){for(e=0;e<fi.length;e++)if(n=fi[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}fi=null}return t}function bw(t,e){do{var n=qe;try{if(Pp(),ic.current=zc,Uc){for(var r=Pe.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Uc=!1}if(Ti=0,Je=He=Pe=null,Xo=!1,Ta=0,Bp.current=null,n===null||n.return===null){We=1,Sa=e,qe=null;break}e:{var s=t,o=n.return,a=n,c=e;if(e=nt,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,f=a,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var g=f.alternate;g?(f.updateQueue=g.updateQueue,f.memoizedState=g.memoizedState,f.lanes=g.lanes):(f.updateQueue=null,f.memoizedState=null)}var S=ev(o);if(S!==null){S.flags&=-257,tv(S,o,a,s,e),S.mode&1&&Zy(s,d,e),e=S,c=d;var A=e.updateQueue;if(A===null){var T=new Set;T.add(c),e.updateQueue=T}else A.add(c);break e}else{if(!(e&1)){Zy(s,d,e),Wp();break e}c=Error(z(426))}}else if(Ie&&a.mode&1){var P=ev(o);if(P!==null){!(P.flags&65536)&&(P.flags|=256),tv(P,o,a,s,e),kp(Ns(c,a));break e}}s=c=Ns(c,a),We!==4&&(We=2),ea===null?ea=[s]:ea.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var y=aw(s,c,e);Wy(s,y);break e;case 1:a=c;var x=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof x.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Pr===null||!Pr.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var k=lw(s,a,e);Wy(s,k);break e}}s=s.return}while(s!==null)}kw(n)}catch(O){e=O,qe===n&&n!==null&&(qe=n=n.return);continue}break}while(!0)}function Iw(){var t=Bc.current;return Bc.current=zc,t===null?zc:t}function Wp(){(We===0||We===3||We===2)&&(We=4),Xe===null||!(bi&268435455)&&!(Cu&268435455)||dr(Xe,nt)}function Kc(t,e){var n=le;le|=2;var r=Iw();(Xe!==t||nt!==e)&&(Dn=null,mi(t,e));do try{wk();break}catch(i){bw(t,i)}while(!0);if(Pp(),le=n,Bc.current=r,qe!==null)throw Error(z(261));return Xe=null,nt=0,We}function wk(){for(;qe!==null;)Sw(qe)}function Ek(){for(;qe!==null&&!WI();)Sw(qe)}function Sw(t){var e=Pw(t.alternate,t,Vt);t.memoizedProps=t.pendingProps,e===null?kw(t):qe=e,Bp.current=null}function kw(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=mk(n,e),n!==null){n.flags&=32767,qe=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{We=6,qe=null;return}}else if(n=pk(n,e,Vt),n!==null){qe=n;return}if(e=e.sibling,e!==null){qe=e;return}qe=e=t}while(e!==null);We===0&&(We=5)}function si(t,e,n){var r=he,i=Gt.transition;try{Gt.transition=null,he=1,Tk(t,e,n,r)}finally{Gt.transition=i,he=r}return null}function Tk(t,e,n,r){do ws();while(wr!==null);if(le&6)throw Error(z(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(z(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(rS(t,s),t===Xe&&(qe=Xe=null,nt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ul||(Ul=!0,Aw(Sc,function(){return ws(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Gt.transition,Gt.transition=null;var o=he;he=1;var a=le;le|=4,Bp.current=null,yk(t,n),ww(n,t),$S(Gh),Rc=!!Wh,Gh=Wh=null,t.current=n,vk(n),GI(),le=a,he=o,Gt.transition=s}else t.current=n;if(Ul&&(Ul=!1,wr=t,qc=i),s=t.pendingLanes,s===0&&(Pr=null),JI(n.stateNode),Ct(t,Ue()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if($c)throw $c=!1,t=mf,mf=null,t;return qc&1&&t.tag!==0&&ws(),s=t.pendingLanes,s&1?t===gf?ta++:(ta=0,gf=t):ta=0,Kr(),null}function ws(){if(wr!==null){var t=ax(qc),e=Gt.transition,n=he;try{if(Gt.transition=null,he=16>t?16:t,wr===null)var r=!1;else{if(t=wr,wr=null,qc=0,le&6)throw Error(z(331));var i=le;for(le|=4,H=t.current;H!==null;){var s=H,o=s.child;if(H.flags&16){var a=s.deletions;if(a!==null){for(var c=0;c<a.length;c++){var d=a[c];for(H=d;H!==null;){var f=H;switch(f.tag){case 0:case 11:case 15:Zo(8,f,s)}var p=f.child;if(p!==null)p.return=f,H=p;else for(;H!==null;){f=H;var g=f.sibling,S=f.return;if(vw(f),f===d){H=null;break}if(g!==null){g.return=S,H=g;break}H=S}}}var A=s.alternate;if(A!==null){var T=A.child;if(T!==null){A.child=null;do{var P=T.sibling;T.sibling=null,T=P}while(T!==null)}}H=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,H=o;else e:for(;H!==null;){if(s=H,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Zo(9,s,s.return)}var y=s.sibling;if(y!==null){y.return=s.return,H=y;break e}H=s.return}}var x=t.current;for(H=x;H!==null;){o=H;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,H=v;else e:for(o=x;H!==null;){if(a=H,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Nu(9,a)}}catch(O){je(a,a.return,O)}if(a===o){H=null;break e}var k=a.sibling;if(k!==null){k.return=a.return,H=k;break e}H=a.return}}if(le=i,Kr(),pn&&typeof pn.onPostCommitFiberRoot=="function")try{pn.onPostCommitFiberRoot(Tu,t)}catch{}r=!0}return r}finally{he=n,Gt.transition=e}}return!1}function pv(t,e,n){e=Ns(n,e),e=aw(t,e,1),t=Rr(t,e,1),e=xt(),t!==null&&(Ha(t,1,e),Ct(t,e))}function je(t,e,n){if(t.tag===3)pv(t,t,n);else for(;e!==null;){if(e.tag===3){pv(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Pr===null||!Pr.has(r))){t=Ns(n,t),t=lw(e,t,1),e=Rr(e,t,1),t=xt(),e!==null&&(Ha(e,1,t),Ct(e,t));break}}e=e.return}}function bk(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=xt(),t.pingedLanes|=t.suspendedLanes&n,Xe===t&&(nt&n)===n&&(We===4||We===3&&(nt&130023424)===nt&&500>Ue()-qp?mi(t,0):$p|=n),Ct(t,e)}function Rw(t,e){e===0&&(t.mode&1?(e=Al,Al<<=1,!(Al&130023424)&&(Al=4194304)):e=1);var n=xt();t=Kn(t,e),t!==null&&(Ha(t,e,n),Ct(t,n))}function Ik(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Rw(t,n)}function Sk(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(z(314))}r!==null&&r.delete(e),Rw(t,n)}var Pw;Pw=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||At.current)kt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return kt=!1,fk(t,e,n);kt=!!(t.flags&131072)}else kt=!1,Ie&&e.flags&1048576&&Dx(e,Vc,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;oc(t,e),t=e.pendingProps;var i=ks(e,ft.current);xs(e,n),i=Mp(null,e,r,t,i,n);var s=Lp();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Nt(r)?(s=!0,Dc(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Cp(e),i.updater=Au,e.stateNode=i,i._reactInternals=e,rf(e,r,t,n),e=af(null,e,r,!0,s,n)):(e.tag=0,Ie&&s&&Ip(e),vt(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(oc(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=Rk(r),t=Zt(r,t),i){case 0:e=of(null,e,r,t,n);break e;case 1:e=iv(null,e,r,t,n);break e;case 11:e=nv(null,e,r,t,n);break e;case 14:e=rv(null,e,r,Zt(r.type,t),n);break e}throw Error(z(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Zt(r,i),of(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Zt(r,i),iv(t,e,r,i,n);case 3:e:{if(hw(e),t===null)throw Error(z(387));r=e.pendingProps,s=e.memoizedState,i=s.element,Fx(t,e),Lc(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Ns(Error(z(423)),e),e=sv(t,e,r,n,i);break e}else if(r!==i){i=Ns(Error(z(424)),e),e=sv(t,e,r,n,i);break e}else for(Ot=kr(e.stateNode.containerInfo.firstChild),Ft=e,Ie=!0,tn=null,n=Mx(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Rs(),r===i){e=Hn(t,e,n);break e}vt(t,e,r,n)}e=e.child}return e;case 5:return Ux(e),t===null&&ef(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,Qh(r,i)?o=null:s!==null&&Qh(r,s)&&(e.flags|=32),dw(t,e),vt(t,e,o,n),e.child;case 6:return t===null&&ef(e),null;case 13:return fw(t,e,n);case 4:return Dp(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Ps(e,null,r,n):vt(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Zt(r,i),nv(t,e,r,i,n);case 7:return vt(t,e,e.pendingProps,n),e.child;case 8:return vt(t,e,e.pendingProps.children,n),e.child;case 12:return vt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,ve(Oc,r._currentValue),r._currentValue=o,s!==null)if(sn(s.value,o)){if(s.children===i.children&&!At.current){e=Hn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var c=a.firstContext;c!==null;){if(c.context===r){if(s.tag===1){c=zn(-1,n&-n),c.tag=2;var d=s.updateQueue;if(d!==null){d=d.shared;var f=d.pending;f===null?c.next=c:(c.next=f.next,f.next=c),d.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),tf(s.return,n,e),a.lanes|=n;break}c=c.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(z(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),tf(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}vt(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,xs(e,n),i=Qt(i),r=r(i),e.flags|=1,vt(t,e,r,n),e.child;case 14:return r=e.type,i=Zt(r,e.pendingProps),i=Zt(r.type,i),rv(t,e,r,i,n);case 15:return cw(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Zt(r,i),oc(t,e),e.tag=1,Nt(r)?(t=!0,Dc(e)):t=!1,xs(e,n),ow(e,r,i),rf(e,r,i,n),af(null,e,r,!0,t,n);case 19:return pw(t,e,n);case 22:return uw(t,e,n)}throw Error(z(156,e.tag))};function Aw(t,e){return rx(t,e)}function kk(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Wt(t,e,n,r){return new kk(t,e,n,r)}function Gp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Rk(t){if(typeof t=="function")return Gp(t)?1:0;if(t!=null){if(t=t.$$typeof,t===fp)return 11;if(t===pp)return 14}return 2}function Nr(t,e){var n=t.alternate;return n===null?(n=Wt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function cc(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Gp(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case is:return gi(n.children,i,s,e);case hp:o=8,i|=8;break;case kh:return t=Wt(12,n,e,i|2),t.elementType=kh,t.lanes=s,t;case Rh:return t=Wt(13,n,e,i),t.elementType=Rh,t.lanes=s,t;case Ph:return t=Wt(19,n,e,i),t.elementType=Ph,t.lanes=s,t;case U0:return Du(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case L0:o=10;break e;case F0:o=9;break e;case fp:o=11;break e;case pp:o=14;break e;case lr:o=16,r=null;break e}throw Error(z(130,t==null?t:typeof t,""))}return e=Wt(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function gi(t,e,n,r){return t=Wt(7,t,r,e),t.lanes=n,t}function Du(t,e,n,r){return t=Wt(22,t,r,e),t.elementType=U0,t.lanes=n,t.stateNode={isHidden:!1},t}function sh(t,e,n){return t=Wt(6,t,null,e),t.lanes=n,t}function oh(t,e,n){return e=Wt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Pk(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ud(0),this.expirationTimes=Ud(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ud(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Qp(t,e,n,r,i,s,o,a,c){return t=new Pk(t,e,n,a,c),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Wt(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Cp(s),t}function Ak(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:rs,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Nw(t){if(!t)return Lr;t=t._reactInternals;e:{if(Li(t)!==t||t.tag!==1)throw Error(z(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Nt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(z(171))}if(t.tag===1){var n=t.type;if(Nt(n))return Nx(t,n,e)}return e}function Cw(t,e,n,r,i,s,o,a,c){return t=Qp(n,r,!0,t,i,s,o,a,c),t.context=Nw(null),n=t.current,r=xt(),i=Ar(n),s=zn(r,i),s.callback=e??null,Rr(n,s,i),t.current.lanes=i,Ha(t,i,r),Ct(t,r),t}function ju(t,e,n,r){var i=e.current,s=xt(),o=Ar(i);return n=Nw(n),e.context===null?e.context=n:e.pendingContext=n,e=zn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Rr(i,e,o),t!==null&&(rn(t,i,o,s),rc(t,i,o)),o}function Hc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function mv(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Yp(t,e){mv(t,e),(t=t.alternate)&&mv(t,e)}function Nk(){return null}var Dw=typeof reportError=="function"?reportError:function(t){console.error(t)};function Jp(t){this._internalRoot=t}Vu.prototype.render=Jp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(z(409));ju(t,e,null,null)};Vu.prototype.unmount=Jp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Ii(function(){ju(null,t,null,null)}),e[qn]=null}};function Vu(t){this._internalRoot=t}Vu.prototype.unstable_scheduleHydration=function(t){if(t){var e=ux();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ur.length&&e!==0&&e<ur[n].priority;n++);ur.splice(n,0,t),n===0&&hx(t)}};function Xp(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ou(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function gv(){}function Ck(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var d=Hc(o);s.call(d)}}var o=Cw(e,r,t,0,null,!1,!1,"",gv);return t._reactRootContainer=o,t[qn]=o.current,va(t.nodeType===8?t.parentNode:t),Ii(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var d=Hc(c);a.call(d)}}var c=Qp(t,0,!1,null,null,!1,!1,"",gv);return t._reactRootContainer=c,t[qn]=c.current,va(t.nodeType===8?t.parentNode:t),Ii(function(){ju(e,c,n,r)}),c}function Mu(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var c=Hc(o);a.call(c)}}ju(e,o,t,i)}else o=Ck(n,e,t,i,r);return Hc(o)}lx=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Lo(e.pendingLanes);n!==0&&(yp(e,n|1),Ct(e,Ue()),!(le&6)&&(Cs=Ue()+500,Kr()))}break;case 13:Ii(function(){var r=Kn(t,1);if(r!==null){var i=xt();rn(r,t,1,i)}}),Yp(t,1)}};vp=function(t){if(t.tag===13){var e=Kn(t,134217728);if(e!==null){var n=xt();rn(e,t,134217728,n)}Yp(t,134217728)}};cx=function(t){if(t.tag===13){var e=Ar(t),n=Kn(t,e);if(n!==null){var r=xt();rn(n,t,e,r)}Yp(t,e)}};ux=function(){return he};dx=function(t,e){var n=he;try{return he=t,e()}finally{he=n}};Fh=function(t,e,n){switch(e){case"input":if(Ch(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=ku(r);if(!i)throw Error(z(90));B0(r),Ch(r,i)}}}break;case"textarea":q0(t,n);break;case"select":e=n.value,e!=null&&gs(t,!!n.multiple,e,!1)}};J0=Kp;X0=Ii;var Dk={usingClientEntryPoint:!1,Events:[Ga,ls,ku,Q0,Y0,Kp]},Po={findFiberByHostInstance:hi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jk={bundleType:Po.bundleType,version:Po.version,rendererPackageName:Po.rendererPackageName,rendererConfig:Po.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Jn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=tx(t),t===null?null:t.stateNode},findFiberByHostInstance:Po.findFiberByHostInstance||Nk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zl.isDisabled&&zl.supportsFiber)try{Tu=zl.inject(jk),pn=zl}catch{}}$t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Dk;$t.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Xp(e))throw Error(z(200));return Ak(t,e,null,n)};$t.createRoot=function(t,e){if(!Xp(t))throw Error(z(299));var n=!1,r="",i=Dw;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Qp(t,1,!1,null,null,n,!1,r,i),t[qn]=e.current,va(t.nodeType===8?t.parentNode:t),new Jp(e)};$t.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(z(188)):(t=Object.keys(t).join(","),Error(z(268,t)));return t=tx(e),t=t===null?null:t.stateNode,t};$t.flushSync=function(t){return Ii(t)};$t.hydrate=function(t,e,n){if(!Ou(e))throw Error(z(200));return Mu(null,t,e,!0,n)};$t.hydrateRoot=function(t,e,n){if(!Xp(t))throw Error(z(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Dw;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Cw(e,null,t,1,n??null,i,!1,s,o),t[qn]=e.current,va(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Vu(e)};$t.render=function(t,e,n){if(!Ou(e))throw Error(z(200));return Mu(null,t,e,!1,n)};$t.unmountComponentAtNode=function(t){if(!Ou(t))throw Error(z(40));return t._reactRootContainer?(Ii(function(){Mu(null,null,t,!1,function(){t._reactRootContainer=null,t[qn]=null})}),!0):!1};$t.unstable_batchedUpdates=Kp;$t.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Ou(n))throw Error(z(200));if(t==null||t._reactInternals===void 0)throw Error(z(38));return Mu(t,e,n,!1,r)};$t.version="18.3.1-next-f1338f8080-20240426";function jw(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jw)}catch(t){console.error(t)}}jw(),j0.exports=$t;var Vk=j0.exports,yv=Vk;Ih.createRoot=yv.createRoot,Ih.hydrateRoot=yv.hydrateRoot;/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ka(){return ka=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ka.apply(null,arguments)}var Er;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Er||(Er={}));const vv="popstate";function Ok(t){t===void 0&&(t={});function e(r,i){let{pathname:s,search:o,hash:a}=r.location;return _f("",{pathname:s,search:o,hash:a},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:Wc(i)}return Lk(e,n,null,t)}function Ae(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Zp(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Mk(){return Math.random().toString(36).substr(2,8)}function _v(t,e){return{usr:t.state,key:t.key,idx:e}}function _f(t,e,n,r){return n===void 0&&(n=null),ka({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?Zs(e):e,{state:n,key:e&&e.key||r||Mk()})}function Wc(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function Zs(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function Lk(t,e,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,a=Er.Pop,c=null,d=f();d==null&&(d=0,o.replaceState(ka({},o.state,{idx:d}),""));function f(){return(o.state||{idx:null}).idx}function p(){a=Er.Pop;let P=f(),y=P==null?null:P-d;d=P,c&&c({action:a,location:T.location,delta:y})}function g(P,y){a=Er.Push;let x=_f(T.location,P,y);d=f()+1;let v=_v(x,d),k=T.createHref(x);try{o.pushState(v,"",k)}catch(O){if(O instanceof DOMException&&O.name==="DataCloneError")throw O;i.location.assign(k)}s&&c&&c({action:a,location:T.location,delta:1})}function S(P,y){a=Er.Replace;let x=_f(T.location,P,y);d=f();let v=_v(x,d),k=T.createHref(x);o.replaceState(v,"",k),s&&c&&c({action:a,location:T.location,delta:0})}function A(P){let y=i.location.origin!=="null"?i.location.origin:i.location.href,x=typeof P=="string"?P:Wc(P);return x=x.replace(/ $/,"%20"),Ae(y,"No window.location.(origin|href) available to create URL for href: "+x),new URL(x,y)}let T={get action(){return a},get location(){return t(i,o)},listen(P){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(vv,p),c=P,()=>{i.removeEventListener(vv,p),c=null}},createHref(P){return e(i,P)},createURL:A,encodeLocation(P){let y=A(P);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:S,go(P){return o.go(P)}};return T}var xv;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(xv||(xv={}));function Fk(t,e,n){return n===void 0&&(n="/"),Uk(t,e,n)}function Uk(t,e,n,r){let i=typeof e=="string"?Zs(e):e,s=Ds(i.pathname||"/",n);if(s==null)return null;let o=Vw(t);zk(o);let a=null,c=Xk(s);for(let d=0;a==null&&d<o.length;++d)a=Yk(o[d],c);return a}function Vw(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(s,o,a)=>{let c={relativePath:a===void 0?s.path||"":a,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};c.relativePath.startsWith("/")&&(Ae(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let d=Cr([r,c.relativePath]),f=n.concat(c);s.children&&s.children.length>0&&(Ae(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Vw(s.children,e,f,d)),!(s.path==null&&!s.index)&&e.push({path:d,score:Gk(d,s.index),routesMeta:f})};return t.forEach((s,o)=>{var a;if(s.path===""||!((a=s.path)!=null&&a.includes("?")))i(s,o);else for(let c of Ow(s.path))i(s,o,c)}),e}function Ow(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=Ow(r.join("/")),a=[];return a.push(...o.map(c=>c===""?s:[s,c].join("/"))),i&&a.push(...o),a.map(c=>t.startsWith("/")&&c===""?"/":c)}function zk(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:Qk(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Bk=/^:[\w-]+$/,$k=3,qk=2,Kk=1,Hk=10,Wk=-2,wv=t=>t==="*";function Gk(t,e){let n=t.split("/"),r=n.length;return n.some(wv)&&(r+=Wk),e&&(r+=qk),n.filter(i=>!wv(i)).reduce((i,s)=>i+(Bk.test(s)?$k:s===""?Kk:Hk),r)}function Qk(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function Yk(t,e,n){let{routesMeta:r}=t,i={},s="/",o=[];for(let a=0;a<r.length;++a){let c=r[a],d=a===r.length-1,f=s==="/"?e:e.slice(s.length)||"/",p=xf({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},f),g=c.route;if(!p)return null;Object.assign(i,p.params),o.push({params:i,pathname:Cr([s,p.pathname]),pathnameBase:rR(Cr([s,p.pathnameBase])),route:g}),p.pathnameBase!=="/"&&(s=Cr([s,p.pathnameBase]))}return o}function xf(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=Jk(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),a=i.slice(1);return{params:r.reduce((d,f,p)=>{let{paramName:g,isOptional:S}=f;if(g==="*"){let T=a[p]||"";o=s.slice(0,s.length-T.length).replace(/(.)\/+$/,"$1")}const A=a[p];return S&&!A?d[g]=void 0:d[g]=(A||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:o,pattern:t}}function Jk(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Zp(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,c)=>(r.push({paramName:a,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function Xk(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Zp(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Ds(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const Zk=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,eR=t=>Zk.test(t);function tR(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?Zs(t):t,s;if(n)if(eR(n))s=n;else{if(n.includes("//")){let o=n;n=Mw(n),Zp(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?s=Ev(n.substring(1),"/"):s=Ev(n,e)}else s=e;return{pathname:s,search:iR(r),hash:sR(i)}}function Ev(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function ah(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function nR(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function em(t,e){let n=nR(t);return e?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function tm(t,e,n,r){r===void 0&&(r=!1);let i;typeof t=="string"?i=Zs(t):(i=ka({},t),Ae(!i.pathname||!i.pathname.includes("?"),ah("?","pathname","search",i)),Ae(!i.pathname||!i.pathname.includes("#"),ah("#","pathname","hash",i)),Ae(!i.search||!i.search.includes("#"),ah("#","search","hash",i)));let s=t===""||i.pathname==="",o=s?"/":i.pathname,a;if(o==null)a=n;else{let p=e.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),p-=1;i.pathname=g.join("/")}a=p>=0?e[p]:"/"}let c=tR(i,a),d=o&&o!=="/"&&o.endsWith("/"),f=(s||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||f)&&(c.pathname+="/"),c}const Mw=t=>t.replace(/\/\/+/g,"/"),Cr=t=>Mw(t.join("/")),rR=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),iR=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,sR=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function oR(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const Lw=["post","put","patch","delete"];new Set(Lw);const aR=["get",...Lw];new Set(aR);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ra(){return Ra=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Ra.apply(null,arguments)}const Lu=V.createContext(null),Fw=V.createContext(null),Xn=V.createContext(null),Fu=V.createContext(null),En=V.createContext({outlet:null,matches:[],isDataRoute:!1}),Uw=V.createContext(null);function lR(t,e){let{relative:n}=e===void 0?{}:e;eo()||Ae(!1);let{basename:r,navigator:i}=V.useContext(Xn),{hash:s,pathname:o,search:a}=Uu(t,{relative:n}),c=o;return r!=="/"&&(c=o==="/"?r:Cr([r,o])),i.createHref({pathname:c,search:a,hash:s})}function eo(){return V.useContext(Fu)!=null}function Hr(){return eo()||Ae(!1),V.useContext(Fu).location}function zw(t){V.useContext(Xn).static||V.useLayoutEffect(t)}function Tn(){let{isDataRoute:t}=V.useContext(En);return t?bR():cR()}function cR(){eo()||Ae(!1);let t=V.useContext(Lu),{basename:e,future:n,navigator:r}=V.useContext(Xn),{matches:i}=V.useContext(En),{pathname:s}=Hr(),o=JSON.stringify(em(i,n.v7_relativeSplatPath)),a=V.useRef(!1);return zw(()=>{a.current=!0}),V.useCallback(function(d,f){if(f===void 0&&(f={}),!a.current)return;if(typeof d=="number"){r.go(d);return}let p=tm(d,JSON.parse(o),s,f.relative==="path");t==null&&e!=="/"&&(p.pathname=p.pathname==="/"?e:Cr([e,p.pathname])),(f.replace?r.replace:r.push)(p,f.state,f)},[e,r,o,s,t])}const uR=V.createContext(null);function dR(t){let e=V.useContext(En).outlet;return e&&V.createElement(uR.Provider,{value:t},e)}function hR(){let{matches:t}=V.useContext(En),e=t[t.length-1];return e?e.params:{}}function Uu(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=V.useContext(Xn),{matches:i}=V.useContext(En),{pathname:s}=Hr(),o=JSON.stringify(em(i,r.v7_relativeSplatPath));return V.useMemo(()=>tm(t,JSON.parse(o),s,n==="path"),[t,o,s,n])}function fR(t,e){return pR(t,e)}function pR(t,e,n,r){eo()||Ae(!1);let{navigator:i}=V.useContext(Xn),{matches:s}=V.useContext(En),o=s[s.length-1],a=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let d=Hr(),f;if(e){var p;let P=typeof e=="string"?Zs(e):e;c==="/"||(p=P.pathname)!=null&&p.startsWith(c)||Ae(!1),f=P}else f=d;let g=f.pathname||"/",S=g;if(c!=="/"){let P=c.replace(/^\//,"").split("/");S="/"+g.replace(/^\//,"").split("/").slice(P.length).join("/")}let A=Fk(t,{pathname:S}),T=_R(A&&A.map(P=>Object.assign({},P,{params:Object.assign({},a,P.params),pathname:Cr([c,i.encodeLocation?i.encodeLocation(P.pathname).pathname:P.pathname]),pathnameBase:P.pathnameBase==="/"?c:Cr([c,i.encodeLocation?i.encodeLocation(P.pathnameBase).pathname:P.pathnameBase])})),s,n,r);return e&&T?V.createElement(Fu.Provider,{value:{location:Ra({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:Er.Pop}},T):T}function mR(){let t=TR(),e=oR(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return V.createElement(V.Fragment,null,V.createElement("h2",null,"Unexpected Application Error!"),V.createElement("h3",{style:{fontStyle:"italic"}},e),n?V.createElement("pre",{style:i},n):null,null)}const gR=V.createElement(mR,null);class yR extends V.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?V.createElement(En.Provider,{value:this.props.routeContext},V.createElement(Uw.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function vR(t){let{routeContext:e,match:n,children:r}=t,i=V.useContext(Lu);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),V.createElement(En.Provider,{value:e},r)}function _R(t,e,n,r){var i;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,a=(i=n)==null?void 0:i.errors;if(a!=null){let f=o.findIndex(p=>p.route.id&&(a==null?void 0:a[p.route.id])!==void 0);f>=0||Ae(!1),o=o.slice(0,Math.min(o.length,f+1))}let c=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<o.length;f++){let p=o[f];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(d=f),p.route.id){let{loaderData:g,errors:S}=n,A=p.route.loader&&g[p.route.id]===void 0&&(!S||S[p.route.id]===void 0);if(p.route.lazy||A){c=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((f,p,g)=>{let S,A=!1,T=null,P=null;n&&(S=a&&p.route.id?a[p.route.id]:void 0,T=p.route.errorElement||gR,c&&(d<0&&g===0?(IR("route-fallback"),A=!0,P=null):d===g&&(A=!0,P=p.route.hydrateFallbackElement||null)));let y=e.concat(o.slice(0,g+1)),x=()=>{let v;return S?v=T:A?v=P:p.route.Component?v=V.createElement(p.route.Component,null):p.route.element?v=p.route.element:v=f,V.createElement(vR,{match:p,routeContext:{outlet:f,matches:y,isDataRoute:n!=null},children:v})};return n&&(p.route.ErrorBoundary||p.route.errorElement||g===0)?V.createElement(yR,{location:n.location,revalidation:n.revalidation,component:T,error:S,children:x(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):x()},null)}var Bw=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(Bw||{}),$w=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}($w||{});function xR(t){let e=V.useContext(Lu);return e||Ae(!1),e}function wR(t){let e=V.useContext(Fw);return e||Ae(!1),e}function ER(t){let e=V.useContext(En);return e||Ae(!1),e}function qw(t){let e=ER(),n=e.matches[e.matches.length-1];return n.route.id||Ae(!1),n.route.id}function TR(){var t;let e=V.useContext(Uw),n=wR(),r=qw();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function bR(){let{router:t}=xR(Bw.UseNavigateStable),e=qw($w.UseNavigateStable),n=V.useRef(!1);return zw(()=>{n.current=!0}),V.useCallback(function(i,s){s===void 0&&(s={}),n.current&&(typeof i=="number"?t.navigate(i):t.navigate(i,Ra({fromRouteId:e},s)))},[t,e])}const Tv={};function IR(t,e,n){Tv[t]||(Tv[t]=!0)}function SR(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function kR(t){let{to:e,replace:n,state:r,relative:i}=t;eo()||Ae(!1);let{future:s,static:o}=V.useContext(Xn),{matches:a}=V.useContext(En),{pathname:c}=Hr(),d=Tn(),f=tm(e,em(a,s.v7_relativeSplatPath),c,i==="path"),p=JSON.stringify(f);return V.useEffect(()=>d(JSON.parse(p),{replace:n,state:r,relative:i}),[d,p,i,n,r]),null}function RR(t){return dR(t.context)}function yt(t){Ae(!1)}function PR(t){let{basename:e="/",children:n=null,location:r,navigationType:i=Er.Pop,navigator:s,static:o=!1,future:a}=t;eo()&&Ae(!1);let c=e.replace(/^\/*/,"/"),d=V.useMemo(()=>({basename:c,navigator:s,static:o,future:Ra({v7_relativeSplatPath:!1},a)}),[c,a,s,o]);typeof r=="string"&&(r=Zs(r));let{pathname:f="/",search:p="",hash:g="",state:S=null,key:A="default"}=r,T=V.useMemo(()=>{let P=Ds(f,c);return P==null?null:{location:{pathname:P,search:p,hash:g,state:S,key:A},navigationType:i}},[c,f,p,g,S,A,i]);return T==null?null:V.createElement(Xn.Provider,{value:d},V.createElement(Fu.Provider,{children:n,value:T}))}function AR(t){let{children:e,location:n}=t;return fR(wf(e),n)}new Promise(()=>{});function wf(t,e){e===void 0&&(e=[]);let n=[];return V.Children.forEach(t,(r,i)=>{if(!V.isValidElement(r))return;let s=[...e,i];if(r.type===V.Fragment){n.push.apply(n,wf(r.props.children,s));return}r.type!==yt&&Ae(!1),!r.props.index||!r.props.children||Ae(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=wf(r.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Gc(){return Gc=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Gc.apply(null,arguments)}function Kw(t,e){if(t==null)return{};var n={};for(var r in t)if({}.hasOwnProperty.call(t,r)){if(e.indexOf(r)!==-1)continue;n[r]=t[r]}return n}function NR(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function CR(t,e){return t.button===0&&(!e||e==="_self")&&!NR(t)}function Ef(t){return t===void 0&&(t=""),new URLSearchParams(typeof t=="string"||Array.isArray(t)||t instanceof URLSearchParams?t:Object.keys(t).reduce((e,n)=>{let r=t[n];return e.concat(Array.isArray(r)?r.map(i=>[n,i]):[[n,r]])},[]))}function DR(t,e){let n=Ef(t);return e&&e.forEach((r,i)=>{n.has(i)||e.getAll(i).forEach(s=>{n.append(i,s)})}),n}const jR=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],VR=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],OR="6";try{window.__reactRouterVersion=OR}catch{}const MR=V.createContext({isTransitioning:!1}),LR="startTransition",bv=bI[LR];function FR(t){let{basename:e,children:n,future:r,window:i}=t,s=V.useRef();s.current==null&&(s.current=Ok({window:i,v5Compat:!0}));let o=s.current,[a,c]=V.useState({action:o.action,location:o.location}),{v7_startTransition:d}=r||{},f=V.useCallback(p=>{d&&bv?bv(()=>c(p)):c(p)},[c,d]);return V.useLayoutEffect(()=>o.listen(f),[o,f]),V.useEffect(()=>SR(r),[r]),V.createElement(PR,{basename:e,children:n,location:a.location,navigationType:a.action,navigator:o,future:r})}const UR=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",zR=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ye=V.forwardRef(function(e,n){let{onClick:r,relative:i,reloadDocument:s,replace:o,state:a,target:c,to:d,preventScrollReset:f,viewTransition:p}=e,g=Kw(e,jR),{basename:S}=V.useContext(Xn),A,T=!1;if(typeof d=="string"&&zR.test(d)&&(A=d,UR))try{let v=new URL(window.location.href),k=d.startsWith("//")?new URL(v.protocol+d):new URL(d),O=Ds(k.pathname,S);k.origin===v.origin&&O!=null?d=O+k.search+k.hash:T=!0}catch{}let P=lR(d,{relative:i}),y=$R(d,{replace:o,state:a,target:c,preventScrollReset:f,relative:i,viewTransition:p});function x(v){r&&r(v),v.defaultPrevented||y(v)}return V.createElement("a",Gc({},g,{href:A||P,onClick:T||s?r:x,ref:n,target:c}))}),hr=V.forwardRef(function(e,n){let{"aria-current":r="page",caseSensitive:i=!1,className:s="",end:o=!1,style:a,to:c,viewTransition:d,children:f}=e,p=Kw(e,VR),g=Uu(c,{relative:p.relative}),S=Hr(),A=V.useContext(Fw),{navigator:T,basename:P}=V.useContext(Xn),y=A!=null&&qR(g)&&d===!0,x=T.encodeLocation?T.encodeLocation(g).pathname:g.pathname,v=S.pathname,k=A&&A.navigation&&A.navigation.location?A.navigation.location.pathname:null;i||(v=v.toLowerCase(),k=k?k.toLowerCase():null,x=x.toLowerCase()),k&&P&&(k=Ds(k,P)||k);const O=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let M=v===x||!o&&v.startsWith(x)&&v.charAt(O)==="/",I=k!=null&&(k===x||!o&&k.startsWith(x)&&k.charAt(x.length)==="/"),E={isActive:M,isPending:I,isTransitioning:y},_=M?r:void 0,b;typeof s=="function"?b=s(E):b=[s,M?"active":null,I?"pending":null,y?"transitioning":null].filter(Boolean).join(" ");let N=typeof a=="function"?a(E):a;return V.createElement(ye,Gc({},p,{"aria-current":_,className:b,ref:n,style:N,to:c,viewTransition:d}),typeof f=="function"?f(E):f)});var Tf;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(Tf||(Tf={}));var Iv;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(Iv||(Iv={}));function BR(t){let e=V.useContext(Lu);return e||Ae(!1),e}function $R(t,e){let{target:n,replace:r,state:i,preventScrollReset:s,relative:o,viewTransition:a}=e===void 0?{}:e,c=Tn(),d=Hr(),f=Uu(t,{relative:o});return V.useCallback(p=>{if(CR(p,n)){p.preventDefault();let g=r!==void 0?r:Wc(d)===Wc(f);c(t,{replace:g,state:i,preventScrollReset:s,relative:o,viewTransition:a})}},[d,c,f,r,i,n,t,s,o,a])}function Hw(t){let e=V.useRef(Ef(t)),n=V.useRef(!1),r=Hr(),i=V.useMemo(()=>DR(r.search,n.current?null:e.current),[r.search]),s=Tn(),o=V.useCallback((a,c)=>{const d=Ef(typeof a=="function"?a(i):a);n.current=!0,s("?"+d,c)},[s,i]);return[i,o]}function qR(t,e){e===void 0&&(e={});let n=V.useContext(MR);n==null&&Ae(!1);let{basename:r}=BR(Tf.useViewTransitionState),i=Uu(t,{relative:e.relative});if(!n.isTransitioning)return!1;let s=Ds(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Ds(n.nextLocation.pathname,r)||n.nextLocation.pathname;return xf(i.pathname,o)!=null||xf(i.pathname,s)!=null}/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KR=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ww=(...t)=>t.filter((e,n,r)=>!!e&&r.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var HR={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WR=V.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:s,iconNode:o,...a},c)=>V.createElement("svg",{ref:c,...HR,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:Ww("lucide",i),...a},[...o.map(([d,f])=>V.createElement(d,f)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=(t,e)=>{const n=V.forwardRef(({className:r,...i},s)=>V.createElement(WR,{ref:s,iconNode:e,className:Ww(`lucide-${KR(t)}`,r),...i}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const to=re("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bf=re("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GR=re("Car",[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sv=re("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QR=re("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qc=re("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yc=re("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YR=re("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kv=re("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JR=re("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XR=re("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZR=re("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eP=re("KeyRound",[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",key:"167ctg"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gw=re("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tP=re("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pa=re("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nP=re("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qw=re("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rv=re("Navigation",[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rP=re("OctagonAlert",[["polygon",{points:"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2",key:"h1p8hx"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iP=re("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",key:"ymcmye"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jc=re("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sP=re("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oP=re("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const js=re("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yw=re("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aP=re("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lP=re("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pv=re("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7",key:"jon5kx"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jw=re("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cP=re("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xw=re("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uP=re("Truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dP=re("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xc=re("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=re("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zw=re("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),e1=V.createContext(null);function hP(){var e;const t=localStorage.getItem("tyresaathi_theme");return t==="dark"||t==="light"?t:(e=window.matchMedia)!=null&&e.call(window,"(prefers-color-scheme: dark)").matches?"dark":"light"}function fP({children:t}){const[e,n]=V.useState(hP());V.useEffect(()=>{document.documentElement.setAttribute("data-theme",e),localStorage.setItem("tyresaathi_theme",e)},[e]);function r(){n(i=>i==="dark"?"light":"dark")}return u.jsx(e1.Provider,{value:{theme:e,toggleTheme:r,setTheme:n},children:t})}function t1(){const t=V.useContext(e1);if(!t)throw new Error("useTheme must be used inside <ThemeProvider>");return t}var Av={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n1=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},pP=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},r1={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,d=c?t[i+2]:0,f=s>>2,p=(s&3)<<4|a>>4;let g=(a&15)<<2|d>>6,S=d&63;c||(S=64,o||(g=64)),r.push(n[f],n[p],n[g],n[S])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(n1(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):pP(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const d=i<t.length?n[t.charAt(i)]:64;++i;const p=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||d==null||p==null)throw new mP;const g=s<<2|a>>4;if(r.push(g),d!==64){const S=a<<4&240|d>>2;if(r.push(S),p!==64){const A=d<<6&192|p;r.push(A)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class mP extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gP=function(t){const e=n1(t);return r1.encodeByteArray(e,!0)},Zc=function(t){return gP(t).replace(/\./g,"")},i1=function(t){try{return r1.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yP(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vP=()=>yP().__FIREBASE_DEFAULTS__,_P=()=>{if(typeof process>"u"||typeof Av>"u")return;const t=Av.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},xP=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&i1(t[1]);return e&&JSON.parse(e)},zu=()=>{try{return vP()||_P()||xP()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},s1=t=>{var e,n;return(n=(e=zu())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},wP=t=>{const e=s1(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},o1=()=>{var t;return(t=zu())===null||t===void 0?void 0:t.config},a1=t=>{var e;return(e=zu())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EP{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TP(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Zc(JSON.stringify(n)),Zc(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bP(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ge())}function IP(){var t;const e=(t=zu())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function SP(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function kP(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function RP(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function PP(){const t=Ge();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function l1(){return!IP()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function c1(){try{return typeof indexedDB=="object"}catch{return!1}}function AP(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NP="FirebaseError";class bn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=NP,Object.setPrototypeOf(this,bn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ya.prototype.create)}}class Ya{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?CP(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new bn(i,a,r)}}function CP(t,e){return t.replace(DP,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const DP=/\{\$([^}]+)}/g;function jP(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Aa(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Nv(s)&&Nv(o)){if(!Aa(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Nv(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Uo(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function zo(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function VP(t,e){const n=new OP(t,e);return n.subscribe.bind(n)}class OP{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");MP(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=lh),i.error===void 0&&(i.error=lh),i.complete===void 0&&(i.complete=lh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function MP(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function lh(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(t){return t&&t._delegate?t._delegate:t}class Fr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LP{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new EP;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(UP(e))try{this.getOrInitializeService({instanceIdentifier:oi})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=oi){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=oi){return this.instances.has(e)}getOptions(e=oi){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:FP(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=oi){return this.component?this.component.multipleInstances?e:oi:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function FP(t){return t===oi?void 0:t}function UP(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zP{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new LP(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ie||(ie={}));const BP={debug:ie.DEBUG,verbose:ie.VERBOSE,info:ie.INFO,warn:ie.WARN,error:ie.ERROR,silent:ie.SILENT},$P=ie.INFO,qP={[ie.DEBUG]:"log",[ie.VERBOSE]:"log",[ie.INFO]:"info",[ie.WARN]:"warn",[ie.ERROR]:"error"},KP=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=qP[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class nm{constructor(e){this.name=e,this._logLevel=$P,this._logHandler=KP,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ie))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?BP[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ie.DEBUG,...e),this._logHandler(this,ie.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ie.VERBOSE,...e),this._logHandler(this,ie.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ie.INFO,...e),this._logHandler(this,ie.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ie.WARN,...e),this._logHandler(this,ie.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ie.ERROR,...e),this._logHandler(this,ie.ERROR,...e)}}const HP=(t,e)=>e.some(n=>t instanceof n);let Cv,Dv;function WP(){return Cv||(Cv=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function GP(){return Dv||(Dv=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const u1=new WeakMap,Sf=new WeakMap,d1=new WeakMap,ch=new WeakMap,rm=new WeakMap;function QP(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Dr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&u1.set(n,t)}).catch(()=>{}),rm.set(e,t),e}function YP(t){if(Sf.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Sf.set(t,e)}let kf={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Sf.get(t);if(e==="objectStoreNames")return t.objectStoreNames||d1.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Dr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function JP(t){kf=t(kf)}function XP(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(uh(this),e,...n);return d1.set(r,e.sort?e.sort():[e]),Dr(r)}:GP().includes(t)?function(...e){return t.apply(uh(this),e),Dr(u1.get(this))}:function(...e){return Dr(t.apply(uh(this),e))}}function ZP(t){return typeof t=="function"?XP(t):(t instanceof IDBTransaction&&YP(t),HP(t,WP())?new Proxy(t,kf):t)}function Dr(t){if(t instanceof IDBRequest)return QP(t);if(ch.has(t))return ch.get(t);const e=ZP(t);return e!==t&&(ch.set(t,e),rm.set(e,t)),e}const uh=t=>rm.get(t);function eA(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=Dr(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Dr(o.result),c.oldVersion,c.newVersion,Dr(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),a}const tA=["get","getKey","getAll","getAllKeys","count"],nA=["put","add","delete","clear"],dh=new Map;function jv(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(dh.get(e))return dh.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=nA.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||tA.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let d=c.store;return r&&(d=d.index(a.shift())),(await Promise.all([d[n](...a),i&&c.done]))[0]};return dh.set(e,s),s}JP(t=>({...t,get:(e,n,r)=>jv(e,n)||t.get(e,n,r),has:(e,n)=>!!jv(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(iA(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function iA(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Rf="@firebase/app",Vv="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn=new nm("@firebase/app"),sA="@firebase/app-compat",oA="@firebase/analytics-compat",aA="@firebase/analytics",lA="@firebase/app-check-compat",cA="@firebase/app-check",uA="@firebase/auth",dA="@firebase/auth-compat",hA="@firebase/database",fA="@firebase/data-connect",pA="@firebase/database-compat",mA="@firebase/functions",gA="@firebase/functions-compat",yA="@firebase/installations",vA="@firebase/installations-compat",_A="@firebase/messaging",xA="@firebase/messaging-compat",wA="@firebase/performance",EA="@firebase/performance-compat",TA="@firebase/remote-config",bA="@firebase/remote-config-compat",IA="@firebase/storage",SA="@firebase/storage-compat",kA="@firebase/firestore",RA="@firebase/vertexai-preview",PA="@firebase/firestore-compat",AA="firebase",NA="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf="[DEFAULT]",CA={[Rf]:"fire-core",[sA]:"fire-core-compat",[aA]:"fire-analytics",[oA]:"fire-analytics-compat",[cA]:"fire-app-check",[lA]:"fire-app-check-compat",[uA]:"fire-auth",[dA]:"fire-auth-compat",[hA]:"fire-rtdb",[fA]:"fire-data-connect",[pA]:"fire-rtdb-compat",[mA]:"fire-fn",[gA]:"fire-fn-compat",[yA]:"fire-iid",[vA]:"fire-iid-compat",[_A]:"fire-fcm",[xA]:"fire-fcm-compat",[wA]:"fire-perf",[EA]:"fire-perf-compat",[TA]:"fire-rc",[bA]:"fire-rc-compat",[IA]:"fire-gcs",[SA]:"fire-gcs-compat",[kA]:"fire-fst",[PA]:"fire-fst-compat",[RA]:"fire-vertex","fire-js":"fire-js",[AA]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu=new Map,DA=new Map,Af=new Map;function Ov(t,e){try{t.container.addComponent(e)}catch(n){Wn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Si(t){const e=t.name;if(Af.has(e))return Wn.debug(`There were multiple attempts to register component ${e}.`),!1;Af.set(e,t);for(const n of eu.values())Ov(n,t);for(const n of DA.values())Ov(n,t);return!0}function Bu(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function un(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jA={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},jr=new Ya("app","Firebase",jA);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VA{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Fr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw jr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fi=NA;function h1(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Pf,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw jr.create("bad-app-name",{appName:String(i)});if(n||(n=o1()),!n)throw jr.create("no-options");const s=eu.get(i);if(s){if(Aa(n,s.options)&&Aa(r,s.config))return s;throw jr.create("duplicate-app",{appName:i})}const o=new zP(i);for(const c of Af.values())o.addComponent(c);const a=new VA(n,r,o);return eu.set(i,a),a}function f1(t=Pf){const e=eu.get(t);if(!e&&t===Pf&&o1())return h1();if(!e)throw jr.create("no-app",{appName:t});return e}function gn(t,e,n){var r;let i=(r=CA[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Wn.warn(a.join(" "));return}Si(new Fr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OA="firebase-heartbeat-database",MA=1,Na="firebase-heartbeat-store";let hh=null;function p1(){return hh||(hh=eA(OA,MA,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Na)}catch(n){console.warn(n)}}}}).catch(t=>{throw jr.create("idb-open",{originalErrorMessage:t.message})})),hh}async function LA(t){try{const n=(await p1()).transaction(Na),r=await n.objectStore(Na).get(m1(t));return await n.done,r}catch(e){if(e instanceof bn)Wn.warn(e.message);else{const n=jr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Wn.warn(n.message)}}}async function Mv(t,e){try{const r=(await p1()).transaction(Na,"readwrite");await r.objectStore(Na).put(e,m1(t)),await r.done}catch(n){if(n instanceof bn)Wn.warn(n.message);else{const r=jr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Wn.warn(r.message)}}}function m1(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FA=1024,UA=30*24*60*60*1e3;class zA{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new $A(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Lv();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=UA}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Wn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Lv(),{heartbeatsToSend:r,unsentEntries:i}=BA(this._heartbeatsCache.heartbeats),s=Zc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Wn.warn(n),""}}}function Lv(){return new Date().toISOString().substring(0,10)}function BA(t,e=FA){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Fv(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Fv(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class $A{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return c1()?AP().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await LA(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Mv(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Mv(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Fv(t){return Zc(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qA(t){Si(new Fr("platform-logger",e=>new rA(e),"PRIVATE")),Si(new Fr("heartbeat",e=>new zA(e),"PRIVATE")),gn(Rf,Vv,t),gn(Rf,Vv,"esm2017"),gn("fire-js","")}qA("");var KA="firebase",HA="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */gn(KA,HA,"app");var Uv=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var yi,g1;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,E){function _(){}_.prototype=E.prototype,I.D=E.prototype,I.prototype=new _,I.prototype.constructor=I,I.C=function(b,N,C){for(var R=Array(arguments.length-2),ue=2;ue<arguments.length;ue++)R[ue-2]=arguments[ue];return E.prototype[N].apply(b,R)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,E,_){_||(_=0);var b=Array(16);if(typeof E=="string")for(var N=0;16>N;++N)b[N]=E.charCodeAt(_++)|E.charCodeAt(_++)<<8|E.charCodeAt(_++)<<16|E.charCodeAt(_++)<<24;else for(N=0;16>N;++N)b[N]=E[_++]|E[_++]<<8|E[_++]<<16|E[_++]<<24;E=I.g[0],_=I.g[1],N=I.g[2];var C=I.g[3],R=E+(C^_&(N^C))+b[0]+3614090360&4294967295;E=_+(R<<7&4294967295|R>>>25),R=C+(N^E&(_^N))+b[1]+3905402710&4294967295,C=E+(R<<12&4294967295|R>>>20),R=N+(_^C&(E^_))+b[2]+606105819&4294967295,N=C+(R<<17&4294967295|R>>>15),R=_+(E^N&(C^E))+b[3]+3250441966&4294967295,_=N+(R<<22&4294967295|R>>>10),R=E+(C^_&(N^C))+b[4]+4118548399&4294967295,E=_+(R<<7&4294967295|R>>>25),R=C+(N^E&(_^N))+b[5]+1200080426&4294967295,C=E+(R<<12&4294967295|R>>>20),R=N+(_^C&(E^_))+b[6]+2821735955&4294967295,N=C+(R<<17&4294967295|R>>>15),R=_+(E^N&(C^E))+b[7]+4249261313&4294967295,_=N+(R<<22&4294967295|R>>>10),R=E+(C^_&(N^C))+b[8]+1770035416&4294967295,E=_+(R<<7&4294967295|R>>>25),R=C+(N^E&(_^N))+b[9]+2336552879&4294967295,C=E+(R<<12&4294967295|R>>>20),R=N+(_^C&(E^_))+b[10]+4294925233&4294967295,N=C+(R<<17&4294967295|R>>>15),R=_+(E^N&(C^E))+b[11]+2304563134&4294967295,_=N+(R<<22&4294967295|R>>>10),R=E+(C^_&(N^C))+b[12]+1804603682&4294967295,E=_+(R<<7&4294967295|R>>>25),R=C+(N^E&(_^N))+b[13]+4254626195&4294967295,C=E+(R<<12&4294967295|R>>>20),R=N+(_^C&(E^_))+b[14]+2792965006&4294967295,N=C+(R<<17&4294967295|R>>>15),R=_+(E^N&(C^E))+b[15]+1236535329&4294967295,_=N+(R<<22&4294967295|R>>>10),R=E+(N^C&(_^N))+b[1]+4129170786&4294967295,E=_+(R<<5&4294967295|R>>>27),R=C+(_^N&(E^_))+b[6]+3225465664&4294967295,C=E+(R<<9&4294967295|R>>>23),R=N+(E^_&(C^E))+b[11]+643717713&4294967295,N=C+(R<<14&4294967295|R>>>18),R=_+(C^E&(N^C))+b[0]+3921069994&4294967295,_=N+(R<<20&4294967295|R>>>12),R=E+(N^C&(_^N))+b[5]+3593408605&4294967295,E=_+(R<<5&4294967295|R>>>27),R=C+(_^N&(E^_))+b[10]+38016083&4294967295,C=E+(R<<9&4294967295|R>>>23),R=N+(E^_&(C^E))+b[15]+3634488961&4294967295,N=C+(R<<14&4294967295|R>>>18),R=_+(C^E&(N^C))+b[4]+3889429448&4294967295,_=N+(R<<20&4294967295|R>>>12),R=E+(N^C&(_^N))+b[9]+568446438&4294967295,E=_+(R<<5&4294967295|R>>>27),R=C+(_^N&(E^_))+b[14]+3275163606&4294967295,C=E+(R<<9&4294967295|R>>>23),R=N+(E^_&(C^E))+b[3]+4107603335&4294967295,N=C+(R<<14&4294967295|R>>>18),R=_+(C^E&(N^C))+b[8]+1163531501&4294967295,_=N+(R<<20&4294967295|R>>>12),R=E+(N^C&(_^N))+b[13]+2850285829&4294967295,E=_+(R<<5&4294967295|R>>>27),R=C+(_^N&(E^_))+b[2]+4243563512&4294967295,C=E+(R<<9&4294967295|R>>>23),R=N+(E^_&(C^E))+b[7]+1735328473&4294967295,N=C+(R<<14&4294967295|R>>>18),R=_+(C^E&(N^C))+b[12]+2368359562&4294967295,_=N+(R<<20&4294967295|R>>>12),R=E+(_^N^C)+b[5]+4294588738&4294967295,E=_+(R<<4&4294967295|R>>>28),R=C+(E^_^N)+b[8]+2272392833&4294967295,C=E+(R<<11&4294967295|R>>>21),R=N+(C^E^_)+b[11]+1839030562&4294967295,N=C+(R<<16&4294967295|R>>>16),R=_+(N^C^E)+b[14]+4259657740&4294967295,_=N+(R<<23&4294967295|R>>>9),R=E+(_^N^C)+b[1]+2763975236&4294967295,E=_+(R<<4&4294967295|R>>>28),R=C+(E^_^N)+b[4]+1272893353&4294967295,C=E+(R<<11&4294967295|R>>>21),R=N+(C^E^_)+b[7]+4139469664&4294967295,N=C+(R<<16&4294967295|R>>>16),R=_+(N^C^E)+b[10]+3200236656&4294967295,_=N+(R<<23&4294967295|R>>>9),R=E+(_^N^C)+b[13]+681279174&4294967295,E=_+(R<<4&4294967295|R>>>28),R=C+(E^_^N)+b[0]+3936430074&4294967295,C=E+(R<<11&4294967295|R>>>21),R=N+(C^E^_)+b[3]+3572445317&4294967295,N=C+(R<<16&4294967295|R>>>16),R=_+(N^C^E)+b[6]+76029189&4294967295,_=N+(R<<23&4294967295|R>>>9),R=E+(_^N^C)+b[9]+3654602809&4294967295,E=_+(R<<4&4294967295|R>>>28),R=C+(E^_^N)+b[12]+3873151461&4294967295,C=E+(R<<11&4294967295|R>>>21),R=N+(C^E^_)+b[15]+530742520&4294967295,N=C+(R<<16&4294967295|R>>>16),R=_+(N^C^E)+b[2]+3299628645&4294967295,_=N+(R<<23&4294967295|R>>>9),R=E+(N^(_|~C))+b[0]+4096336452&4294967295,E=_+(R<<6&4294967295|R>>>26),R=C+(_^(E|~N))+b[7]+1126891415&4294967295,C=E+(R<<10&4294967295|R>>>22),R=N+(E^(C|~_))+b[14]+2878612391&4294967295,N=C+(R<<15&4294967295|R>>>17),R=_+(C^(N|~E))+b[5]+4237533241&4294967295,_=N+(R<<21&4294967295|R>>>11),R=E+(N^(_|~C))+b[12]+1700485571&4294967295,E=_+(R<<6&4294967295|R>>>26),R=C+(_^(E|~N))+b[3]+2399980690&4294967295,C=E+(R<<10&4294967295|R>>>22),R=N+(E^(C|~_))+b[10]+4293915773&4294967295,N=C+(R<<15&4294967295|R>>>17),R=_+(C^(N|~E))+b[1]+2240044497&4294967295,_=N+(R<<21&4294967295|R>>>11),R=E+(N^(_|~C))+b[8]+1873313359&4294967295,E=_+(R<<6&4294967295|R>>>26),R=C+(_^(E|~N))+b[15]+4264355552&4294967295,C=E+(R<<10&4294967295|R>>>22),R=N+(E^(C|~_))+b[6]+2734768916&4294967295,N=C+(R<<15&4294967295|R>>>17),R=_+(C^(N|~E))+b[13]+1309151649&4294967295,_=N+(R<<21&4294967295|R>>>11),R=E+(N^(_|~C))+b[4]+4149444226&4294967295,E=_+(R<<6&4294967295|R>>>26),R=C+(_^(E|~N))+b[11]+3174756917&4294967295,C=E+(R<<10&4294967295|R>>>22),R=N+(E^(C|~_))+b[2]+718787259&4294967295,N=C+(R<<15&4294967295|R>>>17),R=_+(C^(N|~E))+b[9]+3951481745&4294967295,I.g[0]=I.g[0]+E&4294967295,I.g[1]=I.g[1]+(N+(R<<21&4294967295|R>>>11))&4294967295,I.g[2]=I.g[2]+N&4294967295,I.g[3]=I.g[3]+C&4294967295}r.prototype.u=function(I,E){E===void 0&&(E=I.length);for(var _=E-this.blockSize,b=this.B,N=this.h,C=0;C<E;){if(N==0)for(;C<=_;)i(this,I,C),C+=this.blockSize;if(typeof I=="string"){for(;C<E;)if(b[N++]=I.charCodeAt(C++),N==this.blockSize){i(this,b),N=0;break}}else for(;C<E;)if(b[N++]=I[C++],N==this.blockSize){i(this,b),N=0;break}}this.h=N,this.o+=E},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var E=1;E<I.length-8;++E)I[E]=0;var _=8*this.o;for(E=I.length-8;E<I.length;++E)I[E]=_&255,_/=256;for(this.u(I),I=Array(16),E=_=0;4>E;++E)for(var b=0;32>b;b+=8)I[_++]=this.g[E]>>>b&255;return I};function s(I,E){var _=a;return Object.prototype.hasOwnProperty.call(_,I)?_[I]:_[I]=E(I)}function o(I,E){this.h=E;for(var _=[],b=!0,N=I.length-1;0<=N;N--){var C=I[N]|0;b&&C==E||(_[N]=C,b=!1)}this.g=_}var a={};function c(I){return-128<=I&&128>I?s(I,function(E){return new o([E|0],0>E?-1:0)}):new o([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return p;if(0>I)return P(d(-I));for(var E=[],_=1,b=0;I>=_;b++)E[b]=I/_|0,_*=4294967296;return new o(E,0)}function f(I,E){if(I.length==0)throw Error("number format error: empty string");if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(I.charAt(0)=="-")return P(f(I.substring(1),E));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(E,8)),b=p,N=0;N<I.length;N+=8){var C=Math.min(8,I.length-N),R=parseInt(I.substring(N,N+C),E);8>C?(C=d(Math.pow(E,C)),b=b.j(C).add(d(R))):(b=b.j(_),b=b.add(d(R)))}return b}var p=c(0),g=c(1),S=c(16777216);t=o.prototype,t.m=function(){if(T(this))return-P(this).m();for(var I=0,E=1,_=0;_<this.g.length;_++){var b=this.i(_);I+=(0<=b?b:4294967296+b)*E,E*=4294967296}return I},t.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(A(this))return"0";if(T(this))return"-"+P(this).toString(I);for(var E=d(Math.pow(I,6)),_=this,b="";;){var N=k(_,E).g;_=y(_,N.j(E));var C=((0<_.g.length?_.g[0]:_.h)>>>0).toString(I);if(_=N,A(_))return C+b;for(;6>C.length;)C="0"+C;b=C+b}},t.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function A(I){if(I.h!=0)return!1;for(var E=0;E<I.g.length;E++)if(I.g[E]!=0)return!1;return!0}function T(I){return I.h==-1}t.l=function(I){return I=y(this,I),T(I)?-1:A(I)?0:1};function P(I){for(var E=I.g.length,_=[],b=0;b<E;b++)_[b]=~I.g[b];return new o(_,~I.h).add(g)}t.abs=function(){return T(this)?P(this):this},t.add=function(I){for(var E=Math.max(this.g.length,I.g.length),_=[],b=0,N=0;N<=E;N++){var C=b+(this.i(N)&65535)+(I.i(N)&65535),R=(C>>>16)+(this.i(N)>>>16)+(I.i(N)>>>16);b=R>>>16,C&=65535,R&=65535,_[N]=R<<16|C}return new o(_,_[_.length-1]&-2147483648?-1:0)};function y(I,E){return I.add(P(E))}t.j=function(I){if(A(this)||A(I))return p;if(T(this))return T(I)?P(this).j(P(I)):P(P(this).j(I));if(T(I))return P(this.j(P(I)));if(0>this.l(S)&&0>I.l(S))return d(this.m()*I.m());for(var E=this.g.length+I.g.length,_=[],b=0;b<2*E;b++)_[b]=0;for(b=0;b<this.g.length;b++)for(var N=0;N<I.g.length;N++){var C=this.i(b)>>>16,R=this.i(b)&65535,ue=I.i(N)>>>16,xe=I.i(N)&65535;_[2*b+2*N]+=R*xe,x(_,2*b+2*N),_[2*b+2*N+1]+=C*xe,x(_,2*b+2*N+1),_[2*b+2*N+1]+=R*ue,x(_,2*b+2*N+1),_[2*b+2*N+2]+=C*ue,x(_,2*b+2*N+2)}for(b=0;b<E;b++)_[b]=_[2*b+1]<<16|_[2*b];for(b=E;b<2*E;b++)_[b]=0;return new o(_,0)};function x(I,E){for(;(I[E]&65535)!=I[E];)I[E+1]+=I[E]>>>16,I[E]&=65535,E++}function v(I,E){this.g=I,this.h=E}function k(I,E){if(A(E))throw Error("division by zero");if(A(I))return new v(p,p);if(T(I))return E=k(P(I),E),new v(P(E.g),P(E.h));if(T(E))return E=k(I,P(E)),new v(P(E.g),E.h);if(30<I.g.length){if(T(I)||T(E))throw Error("slowDivide_ only works with positive integers.");for(var _=g,b=E;0>=b.l(I);)_=O(_),b=O(b);var N=M(_,1),C=M(b,1);for(b=M(b,2),_=M(_,2);!A(b);){var R=C.add(b);0>=R.l(I)&&(N=N.add(_),C=R),b=M(b,1),_=M(_,1)}return E=y(I,N.j(E)),new v(N,E)}for(N=p;0<=I.l(E);){for(_=Math.max(1,Math.floor(I.m()/E.m())),b=Math.ceil(Math.log(_)/Math.LN2),b=48>=b?1:Math.pow(2,b-48),C=d(_),R=C.j(E);T(R)||0<R.l(I);)_-=b,C=d(_),R=C.j(E);A(C)&&(C=g),N=N.add(C),I=y(I,R)}return new v(N,I)}t.A=function(I){return k(this,I).h},t.and=function(I){for(var E=Math.max(this.g.length,I.g.length),_=[],b=0;b<E;b++)_[b]=this.i(b)&I.i(b);return new o(_,this.h&I.h)},t.or=function(I){for(var E=Math.max(this.g.length,I.g.length),_=[],b=0;b<E;b++)_[b]=this.i(b)|I.i(b);return new o(_,this.h|I.h)},t.xor=function(I){for(var E=Math.max(this.g.length,I.g.length),_=[],b=0;b<E;b++)_[b]=this.i(b)^I.i(b);return new o(_,this.h^I.h)};function O(I){for(var E=I.g.length+1,_=[],b=0;b<E;b++)_[b]=I.i(b)<<1|I.i(b-1)>>>31;return new o(_,I.h)}function M(I,E){var _=E>>5;E%=32;for(var b=I.g.length-_,N=[],C=0;C<b;C++)N[C]=0<E?I.i(C+_)>>>E|I.i(C+_+1)<<32-E:I.i(C+_);return new o(N,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,g1=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=f,yi=o}).apply(typeof Uv<"u"?Uv:typeof self<"u"?self:typeof window<"u"?window:{});var Bl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var y1,Bo,v1,uc,Nf,_1,x1,w1;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(l,h,m){return l==Array.prototype||l==Object.prototype||(l[h]=m.value),l};function n(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bl=="object"&&Bl];for(var h=0;h<l.length;++h){var m=l[h];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=n(this);function i(l,h){if(h)e:{var m=r;l=l.split(".");for(var w=0;w<l.length-1;w++){var D=l[w];if(!(D in m))break e;m=m[D]}l=l[l.length-1],w=m[l],h=h(w),h!=w&&h!=null&&e(m,l,{configurable:!0,writable:!0,value:h})}}function s(l,h){l instanceof String&&(l+="");var m=0,w=!1,D={next:function(){if(!w&&m<l.length){var L=m++;return{value:h(L,l[L]),done:!1}}return w=!0,{done:!0,value:void 0}}};return D[Symbol.iterator]=function(){return D},D}i("Array.prototype.values",function(l){return l||function(){return s(this,function(h,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function c(l){var h=typeof l;return h=h!="object"?h:l?Array.isArray(l)?"array":h:"null",h=="array"||h=="object"&&typeof l.length=="number"}function d(l){var h=typeof l;return h=="object"&&l!=null||h=="function"}function f(l,h,m){return l.call.apply(l.bind,arguments)}function p(l,h,m){if(!l)throw Error();if(2<arguments.length){var w=Array.prototype.slice.call(arguments,2);return function(){var D=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(D,w),l.apply(h,D)}}return function(){return l.apply(h,arguments)}}function g(l,h,m){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function S(l,h){var m=Array.prototype.slice.call(arguments,1);return function(){var w=m.slice();return w.push.apply(w,arguments),l.apply(this,w)}}function A(l,h){function m(){}m.prototype=h.prototype,l.aa=h.prototype,l.prototype=new m,l.prototype.constructor=l,l.Qb=function(w,D,L){for(var B=Array(arguments.length-2),ge=2;ge<arguments.length;ge++)B[ge-2]=arguments[ge];return h.prototype[D].apply(w,B)}}function T(l){const h=l.length;if(0<h){const m=Array(h);for(let w=0;w<h;w++)m[w]=l[w];return m}return[]}function P(l,h){for(let m=1;m<arguments.length;m++){const w=arguments[m];if(c(w)){const D=l.length||0,L=w.length||0;l.length=D+L;for(let B=0;B<L;B++)l[D+B]=w[B]}else l.push(w)}}class y{constructor(h,m){this.i=h,this.j=m,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function x(l){return/^[\s\xa0]*$/.test(l)}function v(){var l=a.navigator;return l&&(l=l.userAgent)?l:""}function k(l){return k[" "](l),l}k[" "]=function(){};var O=v().indexOf("Gecko")!=-1&&!(v().toLowerCase().indexOf("webkit")!=-1&&v().indexOf("Edge")==-1)&&!(v().indexOf("Trident")!=-1||v().indexOf("MSIE")!=-1)&&v().indexOf("Edge")==-1;function M(l,h,m){for(const w in l)h.call(m,l[w],w,l)}function I(l,h){for(const m in l)h.call(void 0,l[m],m,l)}function E(l){const h={};for(const m in l)h[m]=l[m];return h}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(l,h){let m,w;for(let D=1;D<arguments.length;D++){w=arguments[D];for(m in w)l[m]=w[m];for(let L=0;L<_.length;L++)m=_[L],Object.prototype.hasOwnProperty.call(w,m)&&(l[m]=w[m])}}function N(l){var h=1;l=l.split(":");const m=[];for(;0<h&&l.length;)m.push(l.shift()),h--;return l.length&&m.push(l.join(":")),m}function C(l){a.setTimeout(()=>{throw l},0)}function R(){var l=X;let h=null;return l.g&&(h=l.g,l.g=l.g.next,l.g||(l.h=null),h.next=null),h}class ue{constructor(){this.h=this.g=null}add(h,m){const w=xe.get();w.set(h,m),this.h?this.h.next=w:this.g=w,this.h=w}}var xe=new y(()=>new Ke,l=>l.reset());class Ke{constructor(){this.next=this.g=this.h=null}set(h,m){this.h=h,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let Sn,K=!1,X=new ue,ee=()=>{const l=a.Promise.resolve(void 0);Sn=()=>{l.then(Se)}};var Se=()=>{for(var l;l=R();){try{l.h.call(l.g)}catch(m){C(m)}var h=xe;h.j(l),100>h.h&&(h.h++,l.next=h.g,h.g=l)}K=!1};function me(){this.s=this.s,this.C=this.C}me.prototype.s=!1,me.prototype.ma=function(){this.s||(this.s=!0,this.N())},me.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Fe(l,h){this.type=l,this.g=this.target=h,this.defaultPrevented=!1}Fe.prototype.h=function(){this.defaultPrevented=!0};var kn=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var l=!1,h=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const m=()=>{};a.addEventListener("test",m,h),a.removeEventListener("test",m,h)}catch{}return l}();function Rn(l,h){if(Fe.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l){var m=this.type=l.type,w=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;if(this.target=l.target||l.srcElement,this.g=h,h=l.relatedTarget){if(O){e:{try{k(h.nodeName);var D=!0;break e}catch{}D=!1}D||(h=null)}}else m=="mouseover"?h=l.fromElement:m=="mouseout"&&(h=l.toElement);this.relatedTarget=h,w?(this.clientX=w.clientX!==void 0?w.clientX:w.pageX,this.clientY=w.clientY!==void 0?w.clientY:w.pageY,this.screenX=w.screenX||0,this.screenY=w.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=typeof l.pointerType=="string"?l.pointerType:Pn[l.pointerType]||"",this.state=l.state,this.i=l,l.defaultPrevented&&Rn.aa.h.call(this)}}A(Rn,Fe);var Pn={2:"touch",3:"pen",4:"mouse"};Rn.prototype.h=function(){Rn.aa.h.call(this);var l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var An="closure_listenable_"+(1e6*Math.random()|0),Ab=0;function Nb(l,h,m,w,D){this.listener=l,this.proxy=null,this.src=h,this.type=m,this.capture=!!w,this.ha=D,this.key=++Ab,this.da=this.fa=!1}function al(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function ll(l){this.src=l,this.g={},this.h=0}ll.prototype.add=function(l,h,m,w,D){var L=l.toString();l=this.g[L],l||(l=this.g[L]=[],this.h++);var B=fd(l,h,w,D);return-1<B?(h=l[B],m||(h.fa=!1)):(h=new Nb(h,this.src,L,!!w,D),h.fa=m,l.push(h)),h};function hd(l,h){var m=h.type;if(m in l.g){var w=l.g[m],D=Array.prototype.indexOf.call(w,h,void 0),L;(L=0<=D)&&Array.prototype.splice.call(w,D,1),L&&(al(h),l.g[m].length==0&&(delete l.g[m],l.h--))}}function fd(l,h,m,w){for(var D=0;D<l.length;++D){var L=l[D];if(!L.da&&L.listener==h&&L.capture==!!m&&L.ha==w)return D}return-1}var pd="closure_lm_"+(1e6*Math.random()|0),md={};function ug(l,h,m,w,D){if(Array.isArray(h)){for(var L=0;L<h.length;L++)ug(l,h[L],m,w,D);return null}return m=fg(m),l&&l[An]?l.K(h,m,d(w)?!!w.capture:!1,D):Cb(l,h,m,!1,w,D)}function Cb(l,h,m,w,D,L){if(!h)throw Error("Invalid event type");var B=d(D)?!!D.capture:!!D,ge=yd(l);if(ge||(l[pd]=ge=new ll(l)),m=ge.add(h,m,w,B,L),m.proxy)return m;if(w=Db(),m.proxy=w,w.src=l,w.listener=m,l.addEventListener)kn||(D=B),D===void 0&&(D=!1),l.addEventListener(h.toString(),w,D);else if(l.attachEvent)l.attachEvent(hg(h.toString()),w);else if(l.addListener&&l.removeListener)l.addListener(w);else throw Error("addEventListener and attachEvent are unavailable.");return m}function Db(){function l(m){return h.call(l.src,l.listener,m)}const h=jb;return l}function dg(l,h,m,w,D){if(Array.isArray(h))for(var L=0;L<h.length;L++)dg(l,h[L],m,w,D);else w=d(w)?!!w.capture:!!w,m=fg(m),l&&l[An]?(l=l.i,h=String(h).toString(),h in l.g&&(L=l.g[h],m=fd(L,m,w,D),-1<m&&(al(L[m]),Array.prototype.splice.call(L,m,1),L.length==0&&(delete l.g[h],l.h--)))):l&&(l=yd(l))&&(h=l.g[h.toString()],l=-1,h&&(l=fd(h,m,w,D)),(m=-1<l?h[l]:null)&&gd(m))}function gd(l){if(typeof l!="number"&&l&&!l.da){var h=l.src;if(h&&h[An])hd(h.i,l);else{var m=l.type,w=l.proxy;h.removeEventListener?h.removeEventListener(m,w,l.capture):h.detachEvent?h.detachEvent(hg(m),w):h.addListener&&h.removeListener&&h.removeListener(w),(m=yd(h))?(hd(m,l),m.h==0&&(m.src=null,h[pd]=null)):al(l)}}}function hg(l){return l in md?md[l]:md[l]="on"+l}function jb(l,h){if(l.da)l=!0;else{h=new Rn(h,this);var m=l.listener,w=l.ha||l.src;l.fa&&gd(l),l=m.call(w,h)}return l}function yd(l){return l=l[pd],l instanceof ll?l:null}var vd="__closure_events_fn_"+(1e9*Math.random()>>>0);function fg(l){return typeof l=="function"?l:(l[vd]||(l[vd]=function(h){return l.handleEvent(h)}),l[vd])}function it(){me.call(this),this.i=new ll(this),this.M=this,this.F=null}A(it,me),it.prototype[An]=!0,it.prototype.removeEventListener=function(l,h,m,w){dg(this,l,h,m,w)};function pt(l,h){var m,w=l.F;if(w)for(m=[];w;w=w.F)m.push(w);if(l=l.M,w=h.type||h,typeof h=="string")h=new Fe(h,l);else if(h instanceof Fe)h.target=h.target||l;else{var D=h;h=new Fe(w,l),b(h,D)}if(D=!0,m)for(var L=m.length-1;0<=L;L--){var B=h.g=m[L];D=cl(B,w,!0,h)&&D}if(B=h.g=l,D=cl(B,w,!0,h)&&D,D=cl(B,w,!1,h)&&D,m)for(L=0;L<m.length;L++)B=h.g=m[L],D=cl(B,w,!1,h)&&D}it.prototype.N=function(){if(it.aa.N.call(this),this.i){var l=this.i,h;for(h in l.g){for(var m=l.g[h],w=0;w<m.length;w++)al(m[w]);delete l.g[h],l.h--}}this.F=null},it.prototype.K=function(l,h,m,w){return this.i.add(String(l),h,!1,m,w)},it.prototype.L=function(l,h,m,w){return this.i.add(String(l),h,!0,m,w)};function cl(l,h,m,w){if(h=l.i.g[String(h)],!h)return!0;h=h.concat();for(var D=!0,L=0;L<h.length;++L){var B=h[L];if(B&&!B.da&&B.capture==m){var ge=B.listener,Ze=B.ha||B.src;B.fa&&hd(l.i,B),D=ge.call(Ze,w)!==!1&&D}}return D&&!w.defaultPrevented}function pg(l,h,m){if(typeof l=="function")m&&(l=g(l,m));else if(l&&typeof l.handleEvent=="function")l=g(l.handleEvent,l);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:a.setTimeout(l,h||0)}function mg(l){l.g=pg(()=>{l.g=null,l.i&&(l.i=!1,mg(l))},l.l);const h=l.h;l.h=null,l.m.apply(null,h)}class Vb extends me{constructor(h,m){super(),this.m=h,this.l=m,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:mg(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lo(l){me.call(this),this.h=l,this.g={}}A(lo,me);var gg=[];function yg(l){M(l.g,function(h,m){this.g.hasOwnProperty(m)&&gd(h)},l),l.g={}}lo.prototype.N=function(){lo.aa.N.call(this),yg(this)},lo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var _d=a.JSON.stringify,Ob=a.JSON.parse,Mb=class{stringify(l){return a.JSON.stringify(l,void 0)}parse(l){return a.JSON.parse(l,void 0)}};function xd(){}xd.prototype.h=null;function vg(l){return l.h||(l.h=l.i())}function _g(){}var co={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function wd(){Fe.call(this,"d")}A(wd,Fe);function Ed(){Fe.call(this,"c")}A(Ed,Fe);var Zr={},xg=null;function ul(){return xg=xg||new it}Zr.La="serverreachability";function wg(l){Fe.call(this,Zr.La,l)}A(wg,Fe);function uo(l){const h=ul();pt(h,new wg(h))}Zr.STAT_EVENT="statevent";function Eg(l,h){Fe.call(this,Zr.STAT_EVENT,l),this.stat=h}A(Eg,Fe);function mt(l){const h=ul();pt(h,new Eg(h,l))}Zr.Ma="timingevent";function Tg(l,h){Fe.call(this,Zr.Ma,l),this.size=h}A(Tg,Fe);function ho(l,h){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){l()},h)}function fo(){this.g=!0}fo.prototype.xa=function(){this.g=!1};function Lb(l,h,m,w,D,L){l.info(function(){if(l.g)if(L)for(var B="",ge=L.split("&"),Ze=0;Ze<ge.length;Ze++){var ce=ge[Ze].split("=");if(1<ce.length){var st=ce[0];ce=ce[1];var ot=st.split("_");B=2<=ot.length&&ot[1]=="type"?B+(st+"="+ce+"&"):B+(st+"=redacted&")}}else B=null;else B=L;return"XMLHTTP REQ ("+w+") [attempt "+D+"]: "+h+`
`+m+`
`+B})}function Fb(l,h,m,w,D,L,B){l.info(function(){return"XMLHTTP RESP ("+w+") [ attempt "+D+"]: "+h+`
`+m+`
`+L+" "+B})}function Bi(l,h,m,w){l.info(function(){return"XMLHTTP TEXT ("+h+"): "+zb(l,m)+(w?" "+w:"")})}function Ub(l,h){l.info(function(){return"TIMEOUT: "+h})}fo.prototype.info=function(){};function zb(l,h){if(!l.g)return h;if(!h)return null;try{var m=JSON.parse(h);if(m){for(l=0;l<m.length;l++)if(Array.isArray(m[l])){var w=m[l];if(!(2>w.length)){var D=w[1];if(Array.isArray(D)&&!(1>D.length)){var L=D[0];if(L!="noop"&&L!="stop"&&L!="close")for(var B=1;B<D.length;B++)D[B]=""}}}}return _d(m)}catch{return h}}var dl={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},bg={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Td;function hl(){}A(hl,xd),hl.prototype.g=function(){return new XMLHttpRequest},hl.prototype.i=function(){return{}},Td=new hl;function tr(l,h,m,w){this.j=l,this.i=h,this.l=m,this.R=w||1,this.U=new lo(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ig}function Ig(){this.i=null,this.g="",this.h=!1}var Sg={},bd={};function Id(l,h,m){l.L=1,l.v=gl(Nn(h)),l.m=m,l.P=!0,kg(l,null)}function kg(l,h){l.F=Date.now(),fl(l),l.A=Nn(l.v);var m=l.A,w=l.R;Array.isArray(w)||(w=[String(w)]),zg(m.i,"t",w),l.C=0,m=l.j.J,l.h=new Ig,l.g=sy(l.j,m?h:null,!l.m),0<l.O&&(l.M=new Vb(g(l.Y,l,l.g),l.O)),h=l.U,m=l.g,w=l.ca;var D="readystatechange";Array.isArray(D)||(D&&(gg[0]=D.toString()),D=gg);for(var L=0;L<D.length;L++){var B=ug(m,D[L],w||h.handleEvent,!1,h.h||h);if(!B)break;h.g[B.key]=B}h=l.H?E(l.H):{},l.m?(l.u||(l.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.A,l.u,l.m,h)):(l.u="GET",l.g.ea(l.A,l.u,null,h)),uo(),Lb(l.i,l.u,l.A,l.l,l.R,l.m)}tr.prototype.ca=function(l){l=l.target;const h=this.M;h&&Cn(l)==3?h.j():this.Y(l)},tr.prototype.Y=function(l){try{if(l==this.g)e:{const ot=Cn(this.g);var h=this.g.Ba();const Ki=this.g.Z();if(!(3>ot)&&(ot!=3||this.g&&(this.h.h||this.g.oa()||Gg(this.g)))){this.J||ot!=4||h==7||(h==8||0>=Ki?uo(3):uo(2)),Sd(this);var m=this.g.Z();this.X=m;t:if(Rg(this)){var w=Gg(this.g);l="";var D=w.length,L=Cn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ei(this),po(this);var B="";break t}this.h.i=new a.TextDecoder}for(h=0;h<D;h++)this.h.h=!0,l+=this.h.i.decode(w[h],{stream:!(L&&h==D-1)});w.length=0,this.h.g+=l,this.C=0,B=this.h.g}else B=this.g.oa();if(this.o=m==200,Fb(this.i,this.u,this.A,this.l,this.R,ot,m),this.o){if(this.T&&!this.K){t:{if(this.g){var ge,Ze=this.g;if((ge=Ze.g?Ze.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!x(ge)){var ce=ge;break t}}ce=null}if(m=ce)Bi(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,kd(this,m);else{this.o=!1,this.s=3,mt(12),ei(this),po(this);break e}}if(this.P){m=!0;let Jt;for(;!this.J&&this.C<B.length;)if(Jt=Bb(this,B),Jt==bd){ot==4&&(this.s=4,mt(14),m=!1),Bi(this.i,this.l,null,"[Incomplete Response]");break}else if(Jt==Sg){this.s=4,mt(15),Bi(this.i,this.l,B,"[Invalid Chunk]"),m=!1;break}else Bi(this.i,this.l,Jt,null),kd(this,Jt);if(Rg(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ot!=4||B.length!=0||this.h.h||(this.s=1,mt(16),m=!1),this.o=this.o&&m,!m)Bi(this.i,this.l,B,"[Invalid Chunked Response]"),ei(this),po(this);else if(0<B.length&&!this.W){this.W=!0;var st=this.j;st.g==this&&st.ba&&!st.M&&(st.j.info("Great, no buffering proxy detected. Bytes received: "+B.length),Dd(st),st.M=!0,mt(11))}}else Bi(this.i,this.l,B,null),kd(this,B);ot==4&&ei(this),this.o&&!this.J&&(ot==4?ty(this.j,this):(this.o=!1,fl(this)))}else sI(this.g),m==400&&0<B.indexOf("Unknown SID")?(this.s=3,mt(12)):(this.s=0,mt(13)),ei(this),po(this)}}}catch{}finally{}};function Rg(l){return l.g?l.u=="GET"&&l.L!=2&&l.j.Ca:!1}function Bb(l,h){var m=l.C,w=h.indexOf(`
`,m);return w==-1?bd:(m=Number(h.substring(m,w)),isNaN(m)?Sg:(w+=1,w+m>h.length?bd:(h=h.slice(w,w+m),l.C=w+m,h)))}tr.prototype.cancel=function(){this.J=!0,ei(this)};function fl(l){l.S=Date.now()+l.I,Pg(l,l.I)}function Pg(l,h){if(l.B!=null)throw Error("WatchDog timer not null");l.B=ho(g(l.ba,l),h)}function Sd(l){l.B&&(a.clearTimeout(l.B),l.B=null)}tr.prototype.ba=function(){this.B=null;const l=Date.now();0<=l-this.S?(Ub(this.i,this.A),this.L!=2&&(uo(),mt(17)),ei(this),this.s=2,po(this)):Pg(this,this.S-l)};function po(l){l.j.G==0||l.J||ty(l.j,l)}function ei(l){Sd(l);var h=l.M;h&&typeof h.ma=="function"&&h.ma(),l.M=null,yg(l.U),l.g&&(h=l.g,l.g=null,h.abort(),h.ma())}function kd(l,h){try{var m=l.j;if(m.G!=0&&(m.g==l||Rd(m.h,l))){if(!l.K&&Rd(m.h,l)&&m.G==3){try{var w=m.Da.g.parse(h)}catch{w=null}if(Array.isArray(w)&&w.length==3){var D=w;if(D[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<l.F)El(m),xl(m);else break e;Cd(m),mt(18)}}else m.za=D[1],0<m.za-m.T&&37500>D[2]&&m.F&&m.v==0&&!m.C&&(m.C=ho(g(m.Za,m),6e3));if(1>=Cg(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else ni(m,11)}else if((l.K||m.g==l)&&El(m),!x(h))for(D=m.Da.g.parse(h),h=0;h<D.length;h++){let ce=D[h];if(m.T=ce[0],ce=ce[1],m.G==2)if(ce[0]=="c"){m.K=ce[1],m.ia=ce[2];const st=ce[3];st!=null&&(m.la=st,m.j.info("VER="+m.la));const ot=ce[4];ot!=null&&(m.Aa=ot,m.j.info("SVER="+m.Aa));const Ki=ce[5];Ki!=null&&typeof Ki=="number"&&0<Ki&&(w=1.5*Ki,m.L=w,m.j.info("backChannelRequestTimeoutMs_="+w)),w=m;const Jt=l.g;if(Jt){const bl=Jt.g?Jt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(bl){var L=w.h;L.g||bl.indexOf("spdy")==-1&&bl.indexOf("quic")==-1&&bl.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(Pd(L,L.h),L.h=null))}if(w.D){const jd=Jt.g?Jt.g.getResponseHeader("X-HTTP-Session-Id"):null;jd&&(w.ya=jd,we(w.I,w.D,jd))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-l.F,m.j.info("Handshake RTT: "+m.R+"ms")),w=m;var B=l;if(w.qa=iy(w,w.J?w.ia:null,w.W),B.K){Dg(w.h,B);var ge=B,Ze=w.L;Ze&&(ge.I=Ze),ge.B&&(Sd(ge),fl(ge)),w.g=B}else Zg(w);0<m.i.length&&wl(m)}else ce[0]!="stop"&&ce[0]!="close"||ni(m,7);else m.G==3&&(ce[0]=="stop"||ce[0]=="close"?ce[0]=="stop"?ni(m,7):Nd(m):ce[0]!="noop"&&m.l&&m.l.ta(ce),m.v=0)}}uo(4)}catch{}}var $b=class{constructor(l,h){this.g=l,this.map=h}};function Ag(l){this.l=l||10,a.PerformanceNavigationTiming?(l=a.performance.getEntriesByType("navigation"),l=0<l.length&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ng(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function Cg(l){return l.h?1:l.g?l.g.size:0}function Rd(l,h){return l.h?l.h==h:l.g?l.g.has(h):!1}function Pd(l,h){l.g?l.g.add(h):l.h=h}function Dg(l,h){l.h&&l.h==h?l.h=null:l.g&&l.g.has(h)&&l.g.delete(h)}Ag.prototype.cancel=function(){if(this.i=jg(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function jg(l){if(l.h!=null)return l.i.concat(l.h.D);if(l.g!=null&&l.g.size!==0){let h=l.i;for(const m of l.g.values())h=h.concat(m.D);return h}return T(l.i)}function qb(l){if(l.V&&typeof l.V=="function")return l.V();if(typeof Map<"u"&&l instanceof Map||typeof Set<"u"&&l instanceof Set)return Array.from(l.values());if(typeof l=="string")return l.split("");if(c(l)){for(var h=[],m=l.length,w=0;w<m;w++)h.push(l[w]);return h}h=[],m=0;for(w in l)h[m++]=l[w];return h}function Kb(l){if(l.na&&typeof l.na=="function")return l.na();if(!l.V||typeof l.V!="function"){if(typeof Map<"u"&&l instanceof Map)return Array.from(l.keys());if(!(typeof Set<"u"&&l instanceof Set)){if(c(l)||typeof l=="string"){var h=[];l=l.length;for(var m=0;m<l;m++)h.push(m);return h}h=[],m=0;for(const w in l)h[m++]=w;return h}}}function Vg(l,h){if(l.forEach&&typeof l.forEach=="function")l.forEach(h,void 0);else if(c(l)||typeof l=="string")Array.prototype.forEach.call(l,h,void 0);else for(var m=Kb(l),w=qb(l),D=w.length,L=0;L<D;L++)h.call(void 0,w[L],m&&m[L],l)}var Og=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Hb(l,h){if(l){l=l.split("&");for(var m=0;m<l.length;m++){var w=l[m].indexOf("="),D=null;if(0<=w){var L=l[m].substring(0,w);D=l[m].substring(w+1)}else L=l[m];h(L,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function ti(l){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,l instanceof ti){this.h=l.h,pl(this,l.j),this.o=l.o,this.g=l.g,ml(this,l.s),this.l=l.l;var h=l.i,m=new yo;m.i=h.i,h.g&&(m.g=new Map(h.g),m.h=h.h),Mg(this,m),this.m=l.m}else l&&(h=String(l).match(Og))?(this.h=!1,pl(this,h[1]||"",!0),this.o=mo(h[2]||""),this.g=mo(h[3]||"",!0),ml(this,h[4]),this.l=mo(h[5]||"",!0),Mg(this,h[6]||"",!0),this.m=mo(h[7]||"")):(this.h=!1,this.i=new yo(null,this.h))}ti.prototype.toString=function(){var l=[],h=this.j;h&&l.push(go(h,Lg,!0),":");var m=this.g;return(m||h=="file")&&(l.push("//"),(h=this.o)&&l.push(go(h,Lg,!0),"@"),l.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&l.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&l.push("/"),l.push(go(m,m.charAt(0)=="/"?Qb:Gb,!0))),(m=this.i.toString())&&l.push("?",m),(m=this.m)&&l.push("#",go(m,Jb)),l.join("")};function Nn(l){return new ti(l)}function pl(l,h,m){l.j=m?mo(h,!0):h,l.j&&(l.j=l.j.replace(/:$/,""))}function ml(l,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);l.s=h}else l.s=null}function Mg(l,h,m){h instanceof yo?(l.i=h,Xb(l.i,l.h)):(m||(h=go(h,Yb)),l.i=new yo(h,l.h))}function we(l,h,m){l.i.set(h,m)}function gl(l){return we(l,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),l}function mo(l,h){return l?h?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function go(l,h,m){return typeof l=="string"?(l=encodeURI(l).replace(h,Wb),m&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function Wb(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var Lg=/[#\/\?@]/g,Gb=/[#\?:]/g,Qb=/[#\?]/g,Yb=/[#\?@]/g,Jb=/#/g;function yo(l,h){this.h=this.g=null,this.i=l||null,this.j=!!h}function nr(l){l.g||(l.g=new Map,l.h=0,l.i&&Hb(l.i,function(h,m){l.add(decodeURIComponent(h.replace(/\+/g," ")),m)}))}t=yo.prototype,t.add=function(l,h){nr(this),this.i=null,l=$i(this,l);var m=this.g.get(l);return m||this.g.set(l,m=[]),m.push(h),this.h+=1,this};function Fg(l,h){nr(l),h=$i(l,h),l.g.has(h)&&(l.i=null,l.h-=l.g.get(h).length,l.g.delete(h))}function Ug(l,h){return nr(l),h=$i(l,h),l.g.has(h)}t.forEach=function(l,h){nr(this),this.g.forEach(function(m,w){m.forEach(function(D){l.call(h,D,w,this)},this)},this)},t.na=function(){nr(this);const l=Array.from(this.g.values()),h=Array.from(this.g.keys()),m=[];for(let w=0;w<h.length;w++){const D=l[w];for(let L=0;L<D.length;L++)m.push(h[w])}return m},t.V=function(l){nr(this);let h=[];if(typeof l=="string")Ug(this,l)&&(h=h.concat(this.g.get($i(this,l))));else{l=Array.from(this.g.values());for(let m=0;m<l.length;m++)h=h.concat(l[m])}return h},t.set=function(l,h){return nr(this),this.i=null,l=$i(this,l),Ug(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[h]),this.h+=1,this},t.get=function(l,h){return l?(l=this.V(l),0<l.length?String(l[0]):h):h};function zg(l,h,m){Fg(l,h),0<m.length&&(l.i=null,l.g.set($i(l,h),T(m)),l.h+=m.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],h=Array.from(this.g.keys());for(var m=0;m<h.length;m++){var w=h[m];const L=encodeURIComponent(String(w)),B=this.V(w);for(w=0;w<B.length;w++){var D=L;B[w]!==""&&(D+="="+encodeURIComponent(String(B[w]))),l.push(D)}}return this.i=l.join("&")};function $i(l,h){return h=String(h),l.j&&(h=h.toLowerCase()),h}function Xb(l,h){h&&!l.j&&(nr(l),l.i=null,l.g.forEach(function(m,w){var D=w.toLowerCase();w!=D&&(Fg(this,w),zg(this,D,m))},l)),l.j=h}function Zb(l,h){const m=new fo;if(a.Image){const w=new Image;w.onload=S(rr,m,"TestLoadImage: loaded",!0,h,w),w.onerror=S(rr,m,"TestLoadImage: error",!1,h,w),w.onabort=S(rr,m,"TestLoadImage: abort",!1,h,w),w.ontimeout=S(rr,m,"TestLoadImage: timeout",!1,h,w),a.setTimeout(function(){w.ontimeout&&w.ontimeout()},1e4),w.src=l}else h(!1)}function eI(l,h){const m=new fo,w=new AbortController,D=setTimeout(()=>{w.abort(),rr(m,"TestPingServer: timeout",!1,h)},1e4);fetch(l,{signal:w.signal}).then(L=>{clearTimeout(D),L.ok?rr(m,"TestPingServer: ok",!0,h):rr(m,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(D),rr(m,"TestPingServer: error",!1,h)})}function rr(l,h,m,w,D){try{D&&(D.onload=null,D.onerror=null,D.onabort=null,D.ontimeout=null),w(m)}catch{}}function tI(){this.g=new Mb}function nI(l,h,m){const w=m||"";try{Vg(l,function(D,L){let B=D;d(D)&&(B=_d(D)),h.push(w+L+"="+encodeURIComponent(B))})}catch(D){throw h.push(w+"type="+encodeURIComponent("_badmap")),D}}function yl(l){this.l=l.Ub||null,this.j=l.eb||!1}A(yl,xd),yl.prototype.g=function(){return new vl(this.l,this.j)},yl.prototype.i=function(l){return function(){return l}}({});function vl(l,h){it.call(this),this.D=l,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}A(vl,it),t=vl.prototype,t.open=function(l,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=l,this.A=h,this.readyState=1,_o(this)},t.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};l&&(h.body=l),(this.D||a).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,vo(this)),this.readyState=0},t.Sa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,_o(this)),this.g&&(this.readyState=3,_o(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Bg(this)}else l.text().then(this.Ra.bind(this),this.ga.bind(this))};function Bg(l){l.j.read().then(l.Pa.bind(l)).catch(l.ga.bind(l))}t.Pa=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var h=l.value?l.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!l.done}))&&(this.response=this.responseText+=h)}l.done?vo(this):_o(this),this.readyState==3&&Bg(this)}},t.Ra=function(l){this.g&&(this.response=this.responseText=l,vo(this))},t.Qa=function(l){this.g&&(this.response=l,vo(this))},t.ga=function(){this.g&&vo(this)};function vo(l){l.readyState=4,l.l=null,l.j=null,l.v=null,_o(l)}t.setRequestHeader=function(l,h){this.u.append(l,h)},t.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],h=this.h.entries();for(var m=h.next();!m.done;)m=m.value,l.push(m[0]+": "+m[1]),m=h.next();return l.join(`\r
`)};function _o(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(vl.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function $g(l){let h="";return M(l,function(m,w){h+=w,h+=":",h+=m,h+=`\r
`}),h}function Ad(l,h,m){e:{for(w in m){var w=!1;break e}w=!0}w||(m=$g(m),typeof l=="string"?m!=null&&encodeURIComponent(String(m)):we(l,h,m))}function De(l){it.call(this),this.headers=new Map,this.o=l||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}A(De,it);var rI=/^https?$/i,iI=["POST","PUT"];t=De.prototype,t.Ha=function(l){this.J=l},t.ea=function(l,h,m,w){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);h=h?h.toUpperCase():"GET",this.D=l,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Td.g(),this.v=this.o?vg(this.o):vg(Td),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(l),!0),this.B=!1}catch(L){qg(this,L);return}if(l=m||"",m=new Map(this.headers),w)if(Object.getPrototypeOf(w)===Object.prototype)for(var D in w)m.set(D,w[D]);else if(typeof w.keys=="function"&&typeof w.get=="function")for(const L of w.keys())m.set(L,w.get(L));else throw Error("Unknown input type for opt_headers: "+String(w));w=Array.from(m.keys()).find(L=>L.toLowerCase()=="content-type"),D=a.FormData&&l instanceof a.FormData,!(0<=Array.prototype.indexOf.call(iI,h,void 0))||w||D||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,B]of m)this.g.setRequestHeader(L,B);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Wg(this),this.u=!0,this.g.send(l),this.u=!1}catch(L){qg(this,L)}};function qg(l,h){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=h,l.m=5,Kg(l),_l(l)}function Kg(l){l.A||(l.A=!0,pt(l,"complete"),pt(l,"error"))}t.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=l||7,pt(this,"complete"),pt(this,"abort"),_l(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),_l(this,!0)),De.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Hg(this):this.bb())},t.bb=function(){Hg(this)};function Hg(l){if(l.h&&typeof o<"u"&&(!l.v[1]||Cn(l)!=4||l.Z()!=2)){if(l.u&&Cn(l)==4)pg(l.Ea,0,l);else if(pt(l,"readystatechange"),Cn(l)==4){l.h=!1;try{const B=l.Z();e:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var m;if(!(m=h)){var w;if(w=B===0){var D=String(l.D).match(Og)[1]||null;!D&&a.self&&a.self.location&&(D=a.self.location.protocol.slice(0,-1)),w=!rI.test(D?D.toLowerCase():"")}m=w}if(m)pt(l,"complete"),pt(l,"success");else{l.m=6;try{var L=2<Cn(l)?l.g.statusText:""}catch{L=""}l.l=L+" ["+l.Z()+"]",Kg(l)}}finally{_l(l)}}}}function _l(l,h){if(l.g){Wg(l);const m=l.g,w=l.v[0]?()=>{}:null;l.g=null,l.v=null,h||pt(l,"ready");try{m.onreadystatechange=w}catch{}}}function Wg(l){l.I&&(a.clearTimeout(l.I),l.I=null)}t.isActive=function(){return!!this.g};function Cn(l){return l.g?l.g.readyState:0}t.Z=function(){try{return 2<Cn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(l){if(this.g){var h=this.g.responseText;return l&&h.indexOf(l)==0&&(h=h.substring(l.length)),Ob(h)}};function Gg(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.H){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function sI(l){const h={};l=(l.g&&2<=Cn(l)&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let w=0;w<l.length;w++){if(x(l[w]))continue;var m=N(l[w]);const D=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const L=h[D]||[];h[D]=L,L.push(m)}I(h,function(w){return w.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function xo(l,h,m){return m&&m.internalChannelParams&&m.internalChannelParams[l]||h}function Qg(l){this.Aa=0,this.i=[],this.j=new fo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=xo("failFast",!1,l),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=xo("baseRetryDelayMs",5e3,l),this.cb=xo("retryDelaySeedMs",1e4,l),this.Wa=xo("forwardChannelMaxRetries",2,l),this.wa=xo("forwardChannelRequestTimeoutMs",2e4,l),this.pa=l&&l.xmlHttpFactory||void 0,this.Xa=l&&l.Tb||void 0,this.Ca=l&&l.useFetchStreams||!1,this.L=void 0,this.J=l&&l.supportsCrossDomainXhr||!1,this.K="",this.h=new Ag(l&&l.concurrentRequestLimit),this.Da=new tI,this.P=l&&l.fastHandshake||!1,this.O=l&&l.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=l&&l.Rb||!1,l&&l.xa&&this.j.xa(),l&&l.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&l&&l.detectBufferingProxy||!1,this.ja=void 0,l&&l.longPollingTimeout&&0<l.longPollingTimeout&&(this.ja=l.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Qg.prototype,t.la=8,t.G=1,t.connect=function(l,h,m,w){mt(0),this.W=l,this.H=h||{},m&&w!==void 0&&(this.H.OSID=m,this.H.OAID=w),this.F=this.X,this.I=iy(this,null,this.W),wl(this)};function Nd(l){if(Yg(l),l.G==3){var h=l.U++,m=Nn(l.I);if(we(m,"SID",l.K),we(m,"RID",h),we(m,"TYPE","terminate"),wo(l,m),h=new tr(l,l.j,h),h.L=2,h.v=gl(Nn(m)),m=!1,a.navigator&&a.navigator.sendBeacon)try{m=a.navigator.sendBeacon(h.v.toString(),"")}catch{}!m&&a.Image&&(new Image().src=h.v,m=!0),m||(h.g=sy(h.j,null),h.g.ea(h.v)),h.F=Date.now(),fl(h)}ry(l)}function xl(l){l.g&&(Dd(l),l.g.cancel(),l.g=null)}function Yg(l){xl(l),l.u&&(a.clearTimeout(l.u),l.u=null),El(l),l.h.cancel(),l.s&&(typeof l.s=="number"&&a.clearTimeout(l.s),l.s=null)}function wl(l){if(!Ng(l.h)&&!l.s){l.s=!0;var h=l.Ga;Sn||ee(),K||(Sn(),K=!0),X.add(h,l),l.B=0}}function oI(l,h){return Cg(l.h)>=l.h.j-(l.s?1:0)?!1:l.s?(l.i=h.D.concat(l.i),!0):l.G==1||l.G==2||l.B>=(l.Va?0:l.Wa)?!1:(l.s=ho(g(l.Ga,l,h),ny(l,l.B)),l.B++,!0)}t.Ga=function(l){if(this.s)if(this.s=null,this.G==1){if(!l){this.U=Math.floor(1e5*Math.random()),l=this.U++;const D=new tr(this,this.j,l);let L=this.o;if(this.S&&(L?(L=E(L),b(L,this.S)):L=this.S),this.m!==null||this.O||(D.H=L,L=null),this.P)e:{for(var h=0,m=0;m<this.i.length;m++){t:{var w=this.i[m];if("__data__"in w.map&&(w=w.map.__data__,typeof w=="string")){w=w.length;break t}w=void 0}if(w===void 0)break;if(h+=w,4096<h){h=m;break e}if(h===4096||m===this.i.length-1){h=m+1;break e}}h=1e3}else h=1e3;h=Xg(this,D,h),m=Nn(this.I),we(m,"RID",l),we(m,"CVER",22),this.D&&we(m,"X-HTTP-Session-Id",this.D),wo(this,m),L&&(this.O?h="headers="+encodeURIComponent(String($g(L)))+"&"+h:this.m&&Ad(m,this.m,L)),Pd(this.h,D),this.Ua&&we(m,"TYPE","init"),this.P?(we(m,"$req",h),we(m,"SID","null"),D.T=!0,Id(D,m,null)):Id(D,m,h),this.G=2}}else this.G==3&&(l?Jg(this,l):this.i.length==0||Ng(this.h)||Jg(this))};function Jg(l,h){var m;h?m=h.l:m=l.U++;const w=Nn(l.I);we(w,"SID",l.K),we(w,"RID",m),we(w,"AID",l.T),wo(l,w),l.m&&l.o&&Ad(w,l.m,l.o),m=new tr(l,l.j,m,l.B+1),l.m===null&&(m.H=l.o),h&&(l.i=h.D.concat(l.i)),h=Xg(l,m,1e3),m.I=Math.round(.5*l.wa)+Math.round(.5*l.wa*Math.random()),Pd(l.h,m),Id(m,w,h)}function wo(l,h){l.H&&M(l.H,function(m,w){we(h,w,m)}),l.l&&Vg({},function(m,w){we(h,w,m)})}function Xg(l,h,m){m=Math.min(l.i.length,m);var w=l.l?g(l.l.Na,l.l,l):null;e:{var D=l.i;let L=-1;for(;;){const B=["count="+m];L==-1?0<m?(L=D[0].g,B.push("ofs="+L)):L=0:B.push("ofs="+L);let ge=!0;for(let Ze=0;Ze<m;Ze++){let ce=D[Ze].g;const st=D[Ze].map;if(ce-=L,0>ce)L=Math.max(0,D[Ze].g-100),ge=!1;else try{nI(st,B,"req"+ce+"_")}catch{w&&w(st)}}if(ge){w=B.join("&");break e}}}return l=l.i.splice(0,m),h.D=l,w}function Zg(l){if(!l.g&&!l.u){l.Y=1;var h=l.Fa;Sn||ee(),K||(Sn(),K=!0),X.add(h,l),l.v=0}}function Cd(l){return l.g||l.u||3<=l.v?!1:(l.Y++,l.u=ho(g(l.Fa,l),ny(l,l.v)),l.v++,!0)}t.Fa=function(){if(this.u=null,ey(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var l=2*this.R;this.j.info("BP detection timer enabled: "+l),this.A=ho(g(this.ab,this),l)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,mt(10),xl(this),ey(this))};function Dd(l){l.A!=null&&(a.clearTimeout(l.A),l.A=null)}function ey(l){l.g=new tr(l,l.j,"rpc",l.Y),l.m===null&&(l.g.H=l.o),l.g.O=0;var h=Nn(l.qa);we(h,"RID","rpc"),we(h,"SID",l.K),we(h,"AID",l.T),we(h,"CI",l.F?"0":"1"),!l.F&&l.ja&&we(h,"TO",l.ja),we(h,"TYPE","xmlhttp"),wo(l,h),l.m&&l.o&&Ad(h,l.m,l.o),l.L&&(l.g.I=l.L);var m=l.g;l=l.ia,m.L=1,m.v=gl(Nn(h)),m.m=null,m.P=!0,kg(m,l)}t.Za=function(){this.C!=null&&(this.C=null,xl(this),Cd(this),mt(19))};function El(l){l.C!=null&&(a.clearTimeout(l.C),l.C=null)}function ty(l,h){var m=null;if(l.g==h){El(l),Dd(l),l.g=null;var w=2}else if(Rd(l.h,h))m=h.D,Dg(l.h,h),w=1;else return;if(l.G!=0){if(h.o)if(w==1){m=h.m?h.m.length:0,h=Date.now()-h.F;var D=l.B;w=ul(),pt(w,new Tg(w,m)),wl(l)}else Zg(l);else if(D=h.s,D==3||D==0&&0<h.X||!(w==1&&oI(l,h)||w==2&&Cd(l)))switch(m&&0<m.length&&(h=l.h,h.i=h.i.concat(m)),D){case 1:ni(l,5);break;case 4:ni(l,10);break;case 3:ni(l,6);break;default:ni(l,2)}}}function ny(l,h){let m=l.Ta+Math.floor(Math.random()*l.cb);return l.isActive()||(m*=2),m*h}function ni(l,h){if(l.j.info("Error code "+h),h==2){var m=g(l.fb,l),w=l.Xa;const D=!w;w=new ti(w||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||pl(w,"https"),gl(w),D?Zb(w.toString(),m):eI(w.toString(),m)}else mt(2);l.G=0,l.l&&l.l.sa(h),ry(l),Yg(l)}t.fb=function(l){l?(this.j.info("Successfully pinged google.com"),mt(2)):(this.j.info("Failed to ping google.com"),mt(1))};function ry(l){if(l.G=0,l.ka=[],l.l){const h=jg(l.h);(h.length!=0||l.i.length!=0)&&(P(l.ka,h),P(l.ka,l.i),l.h.i.length=0,T(l.i),l.i.length=0),l.l.ra()}}function iy(l,h,m){var w=m instanceof ti?Nn(m):new ti(m);if(w.g!="")h&&(w.g=h+"."+w.g),ml(w,w.s);else{var D=a.location;w=D.protocol,h=h?h+"."+D.hostname:D.hostname,D=+D.port;var L=new ti(null);w&&pl(L,w),h&&(L.g=h),D&&ml(L,D),m&&(L.l=m),w=L}return m=l.D,h=l.ya,m&&h&&we(w,m,h),we(w,"VER",l.la),wo(l,w),w}function sy(l,h,m){if(h&&!l.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=l.Ca&&!l.pa?new De(new yl({eb:m})):new De(l.pa),h.Ha(l.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function oy(){}t=oy.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Tl(){}Tl.prototype.g=function(l,h){return new jt(l,h)};function jt(l,h){it.call(this),this.g=new Qg(h),this.l=l,this.h=h&&h.messageUrlParams||null,l=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(l?l["X-WebChannel-Content-Type"]=h.messageContentType:l={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(l?l["X-WebChannel-Client-Profile"]=h.va:l={"X-WebChannel-Client-Profile":h.va}),this.g.S=l,(l=h&&h.Sb)&&!x(l)&&(this.g.m=l),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!x(h)&&(this.g.D=h,l=this.h,l!==null&&h in l&&(l=this.h,h in l&&delete l[h])),this.j=new qi(this)}A(jt,it),jt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},jt.prototype.close=function(){Nd(this.g)},jt.prototype.o=function(l){var h=this.g;if(typeof l=="string"){var m={};m.__data__=l,l=m}else this.u&&(m={},m.__data__=_d(l),l=m);h.i.push(new $b(h.Ya++,l)),h.G==3&&wl(h)},jt.prototype.N=function(){this.g.l=null,delete this.j,Nd(this.g),delete this.g,jt.aa.N.call(this)};function ay(l){wd.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var h=l.__sm__;if(h){e:{for(const m in h){l=m;break e}l=void 0}(this.i=l)&&(l=this.i,h=h!==null&&l in h?h[l]:void 0),this.data=h}else this.data=l}A(ay,wd);function ly(){Ed.call(this),this.status=1}A(ly,Ed);function qi(l){this.g=l}A(qi,oy),qi.prototype.ua=function(){pt(this.g,"a")},qi.prototype.ta=function(l){pt(this.g,new ay(l))},qi.prototype.sa=function(l){pt(this.g,new ly)},qi.prototype.ra=function(){pt(this.g,"b")},Tl.prototype.createWebChannel=Tl.prototype.g,jt.prototype.send=jt.prototype.o,jt.prototype.open=jt.prototype.m,jt.prototype.close=jt.prototype.close,w1=function(){return new Tl},x1=function(){return ul()},_1=Zr,Nf={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},dl.NO_ERROR=0,dl.TIMEOUT=8,dl.HTTP_ERROR=6,uc=dl,bg.COMPLETE="complete",v1=bg,_g.EventType=co,co.OPEN="a",co.CLOSE="b",co.ERROR="c",co.MESSAGE="d",it.prototype.listen=it.prototype.K,Bo=_g,De.prototype.listenOnce=De.prototype.L,De.prototype.getLastError=De.prototype.Ka,De.prototype.getLastErrorCode=De.prototype.Ba,De.prototype.getStatus=De.prototype.Z,De.prototype.getResponseJson=De.prototype.Oa,De.prototype.getResponseText=De.prototype.oa,De.prototype.send=De.prototype.ea,De.prototype.setWithCredentials=De.prototype.Ha,y1=De}).apply(typeof Bl<"u"?Bl:typeof self<"u"?self:typeof window<"u"?window:{});const zv="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ut.UNAUTHENTICATED=new ut(null),ut.GOOGLE_CREDENTIALS=new ut("google-credentials-uid"),ut.FIRST_PARTY=new ut("first-party-uid"),ut.MOCK_USER=new ut("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let no="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ki=new nm("@firebase/firestore");function Xi(){return ki.logLevel}function U(t,...e){if(ki.logLevel<=ie.DEBUG){const n=e.map(im);ki.debug(`Firestore (${no}): ${t}`,...n)}}function ze(t,...e){if(ki.logLevel<=ie.ERROR){const n=e.map(im);ki.error(`Firestore (${no}): ${t}`,...n)}}function Ca(t,...e){if(ki.logLevel<=ie.WARN){const n=e.map(im);ki.warn(`Firestore (${no}): ${t}`,...n)}}function im(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(t="Unexpected state"){const e=`FIRESTORE (${no}) INTERNAL ASSERTION FAILED: `+t;throw ze(e),new Error(e)}function Q(t,e){t||W()}function G(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class q extends bn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WA{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class GA{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ut.UNAUTHENTICATED))}shutdown(){}}class QA{constructor(e){this.t=e,this.currentUser=ut.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Q(this.o===void 0);let r=this.i;const i=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let s=new yn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new yn,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},a=c=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new yn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string"),new WA(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string"),new ut(e)}}class YA{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=ut.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class JA{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new YA(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(ut.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class XA{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ZA{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Q(this.o===void 0);const r=s=>{s.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,U("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Q(typeof n.token=="string"),this.R=n.token,new XA(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eN(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E1{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=eN(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function Z(t,e){return t<e?-1:t>e?1:0}function Vs(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}function T1(t){return t+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new q(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new q(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new q(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new q(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ne.fromMillis(Date.now())}static fromDate(e){return Ne.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Ne(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Z(this.nanoseconds,e.nanoseconds):Z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Y(e)}static min(){return new Y(new Ne(0,0))}static max(){return new Y(new Ne(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,n,r){n===void 0?n=0:n>e.length&&W(),r===void 0?r=e.length-n:r>e.length-n&&W(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Da.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Da?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),o=n.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class de extends Da{construct(e,n,r){return new de(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new q(F.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new de(n)}static emptyPath(){return new de([])}}const tN=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Re extends Da{construct(e,n,r){return new Re(e,n,r)}static isValidIdentifier(e){return tN.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Re.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Re(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new q(F.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new q(F.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new q(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new q(F.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Re(n)}static emptyPath(){return new Re([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(de.fromString(e))}static fromName(e){return new $(de.fromString(e).popFirst(5))}static empty(){return new $(de.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&de.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return de.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new de(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e,n,r,i){this.indexId=e,this.collectionGroup=n,this.fields=r,this.indexState=i}}function Cf(t){return t.fields.find(e=>e.kind===2)}function ai(t){return t.fields.filter(e=>e.kind!==2)}tu.UNKNOWN_ID=-1;class dc{constructor(e,n){this.fieldPath=e,this.kind=n}}class ja{constructor(e,n){this.sequenceNumber=e,this.offset=n}static empty(){return new ja(0,Bt.min())}}function b1(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=Y.fromTimestamp(r===1e9?new Ne(n+1,0):new Ne(n,r));return new Bt(i,$.empty(),e)}function I1(t){return new Bt(t.readTime,t.key,-1)}class Bt{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Bt(Y.min(),$.empty(),-1)}static max(){return new Bt(Y.max(),$.empty(),-1)}}function sm(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=$.comparator(t.documentKey,e.documentKey),n!==0?n:Z(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S1="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class k1{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wr(t){if(t.code!==F.FAILED_PRECONDITION||t.message!==S1)throw t;U("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&W(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new j((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof j?n:j.resolve(n)}catch(n){return j.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):j.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):j.reject(n)}static resolve(e){return new j((n,r)=>{n(e)})}static reject(e){return new j((n,r)=>{r(e)})}static waitFor(e){return new j((n,r)=>{let i=0,s=0,o=!1;e.forEach(a=>{++i,a.next(()=>{++s,o&&s===i&&n()},c=>r(c))}),o=!0,s===i&&n()})}static or(e){let n=j.resolve(!1);for(const r of e)n=n.next(i=>i?j.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new j((r,i)=>{const s=e.length,o=new Array(s);let a=0;for(let c=0;c<s;c++){const d=c;n(e[d]).next(f=>{o[d]=f,++a,a===s&&r(o)},f=>i(f))}})}static doWhile(e,n){return new j((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e,n){this.action=e,this.transaction=n,this.aborted=!1,this.V=new yn,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{n.error?this.V.reject(new na(e,n.error)):this.V.resolve()},this.transaction.onerror=r=>{const i=om(r.target.error);this.V.reject(new na(e,i))}}static open(e,n,r,i){try{return new $u(n,e.transaction(i,r))}catch(s){throw new na(n,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(U("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const n=this.transaction.objectStore(e);return new rN(n)}}class Vr{constructor(e,n,r){this.name=e,this.version=n,this.p=r,Vr.S(Ge())===12.2&&ze("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return U("SimpleDb","Removing database:",e),li(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!c1())return!1;if(Vr.v())return!0;const e=Ge(),n=Vr.S(e),r=0<n&&n<10,i=R1(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,n){return e.store(n)}static S(e){const n=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=n?n[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||(U("SimpleDb","Opening database:",this.name),this.db=await new Promise((n,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;n(o)},i.onblocked=()=>{r(new na(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new q(F.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new q(F.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new na(e,o))},i.onupgradeneeded=s=>{U("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{U("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=n=>this.N(n)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=n=>e(n))}async runTransaction(e,n,r,i){const s=n==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const a=$u.open(this.db,e,s?"readonly":"readwrite",r),c=i(a).next(d=>(a.g(),d)).catch(d=>(a.abort(d),j.reject(d))).toPromise();return c.catch(()=>{}),await a.m,c}catch(a){const c=a,d=c.name!=="FirebaseError"&&o<3;if(U("SimpleDb","Transaction failed with error:",c.message,"Retrying:",d),this.close(),!d)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function R1(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class nN{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return li(this.B.delete())}}class na extends q{constructor(e,n){super(F.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${n}`),this.name="IndexedDbTransactionError"}}function Gr(t){return t.name==="IndexedDbTransactionError"}class rN{constructor(e){this.store=e}put(e,n){let r;return n!==void 0?(U("SimpleDb","PUT",this.store.name,e,n),r=this.store.put(n,e)):(U("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),li(r)}add(e){return U("SimpleDb","ADD",this.store.name,e,e),li(this.store.add(e))}get(e){return li(this.store.get(e)).next(n=>(n===void 0&&(n=null),U("SimpleDb","GET",this.store.name,e,n),n))}delete(e){return U("SimpleDb","DELETE",this.store.name,e),li(this.store.delete(e))}count(){return U("SimpleDb","COUNT",this.store.name),li(this.store.count())}U(e,n){const r=this.options(e,n),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new j((o,a)=>{s.onerror=c=>{a(c.target.error)},s.onsuccess=c=>{o(c.target.result)}})}{const s=this.cursor(r),o=[];return this.W(s,(a,c)=>{o.push(c)}).next(()=>o)}}G(e,n){const r=this.store.getAll(e,n===null?void 0:n);return new j((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}j(e,n){U("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,n);r.H=!1;const i=this.cursor(r);return this.W(i,(s,o,a)=>a.delete())}J(e,n){let r;n?r=e:(r={},n=e);const i=this.cursor(r);return this.W(i,n)}Y(e){const n=this.cursor({});return new j((r,i)=>{n.onerror=s=>{const o=om(s.target.error);i(o)},n.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(a=>{a?o.continue():r()}):r()}})}W(e,n){const r=[];return new j((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const c=new nN(a),d=n(a.primaryKey,a.value,c);if(d instanceof j){const f=d.catch(p=>(c.done(),j.reject(p)));r.push(f)}c.isDone?i():c.K===null?a.continue():a.continue(c.K)}}).next(()=>j.waitFor(r))}options(e,n){let r;return e!==void 0&&(typeof e=="string"?r=e:n=e),{index:r,range:n}}cursor(e){let n="next";if(e.reverse&&(n="prev"),e.index){const r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,n):r.openCursor(e.range,n)}return this.store.openCursor(e.range,n)}}function li(t){return new j((e,n)=>{t.onsuccess=r=>{const i=r.target.result;e(i)},t.onerror=r=>{const i=om(r.target.error);n(i)}})}let Bv=!1;function om(t){const e=Vr.S(Ge());if(e>=12.2&&e<13){const n="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(n)>=0){const r=new q("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${n}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Bv||(Bv=!0,setTimeout(()=>{throw r},0)),r}}return t}class iN{constructor(e,n){this.asyncQueue=e,this.Z=n,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){U("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{U("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(n){Gr(n)?U("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",n):await Wr(n)}await this.X(6e4)})}}class sN{constructor(e,n){this.localStore=e,this.persistence=n}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",n=>this.te(n,e))}te(e,n){const r=new Set;let i=n,s=!0;return j.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return U("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(a=>{i-=a,r.add(o)});s=!1})).next(()=>n-i)}ne(e,n,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,n).next(i=>this.localStore.localDocuments.getNextDocuments(e,n,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(a=>(U("IndexBackfiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,n,a))).next(()=>o.size)}))}re(e,n){let r=e;return n.changes.forEach((i,s)=>{const o=I1(s);sm(o,r)>0&&(r=o)}),new Bt(r.readTime,r.documentKey,Math.max(n.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Rt.oe=-1;function qu(t){return t==null}function Va(t){return t===0&&1/t==-1/0}function P1(t){return typeof t=="number"&&Number.isInteger(t)&&!Va(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=$v(e)),e=oN(t.get(n),e);return $v(e)}function oN(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const s=t.charAt(i);switch(s){case"\0":n+="";break;case"":n+="";break;default:n+=s}}return n}function $v(t){return t+""}function dn(t){const e=t.length;if(Q(e>=2),e===2)return Q(t.charAt(0)===""&&t.charAt(1)===""),de.emptyPath();const n=e-2,r=[];let i="";for(let s=0;s<e;){const o=t.indexOf("",s);switch((o<0||o>n)&&W(),t.charAt(o+1)){case"":const a=t.substring(s,o);let c;i.length===0?c=a:(i+=a,c=i,i=""),r.push(c);break;case"":i+=t.substring(s,o),i+="\0";break;case"":i+=t.substring(s,o+1);break;default:W()}s=o+2}return new de(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qv=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(t,e){return[t,wt(e)]}function A1(t,e,n){return[t,wt(e),n]}const aN={},lN=["prefixPath","collectionGroup","readTime","documentId"],cN=["prefixPath","collectionGroup","documentId"],uN=["collectionGroup","readTime","prefixPath","documentId"],dN=["canonicalId","targetId"],hN=["targetId","path"],fN=["path","targetId"],pN=["collectionId","parent"],mN=["indexId","uid"],gN=["uid","sequenceNumber"],yN=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],vN=["indexId","uid","orderedDocumentKey"],_N=["userId","collectionPath","documentId"],xN=["userId","collectionPath","largestBatchId"],wN=["userId","collectionGroup","largestBatchId"],N1=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],EN=[...N1,"documentOverlays"],C1=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],D1=C1,am=[...D1,"indexConfiguration","indexState","indexEntries"],TN=am,bN=[...am,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df extends k1{constructor(e,n){super(),this._e=e,this.currentSequenceNumber=n}}function Qe(t,e){const n=G(t);return Vr.F(n._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Ui(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function j1(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e,n){this.comparator=e,this.root=n||tt.EMPTY}insert(e,n){return new _e(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,tt.BLACK,null,null))}remove(e){return new _e(this.comparator,this.root.remove(e,this.comparator).copy(null,null,tt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new $l(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new $l(this.root,e,this.comparator,!1)}getReverseIterator(){return new $l(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new $l(this.root,e,this.comparator,!0)}}class $l{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class tt{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??tt.RED,this.left=i??tt.EMPTY,this.right=s??tt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new tt(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return tt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return tt.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,tt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,tt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw W();const e=this.left.check();if(e!==this.right.check())throw W();return e+(this.isRed()?0:1)}}tt.EMPTY=null,tt.RED=!0,tt.BLACK=!1;tt.EMPTY=new class{constructor(){this.size=0}get key(){throw W()}get value(){throw W()}get color(){throw W()}get left(){throw W()}get right(){throw W()}copy(e,n,r,i,s){return this}insert(e,n,r){return new tt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.comparator=e,this.data=new _e(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Hv(this.data.getIterator())}getIteratorFrom(e){return new Hv(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof pe)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new pe(this.comparator);return n.data=e,n}}class Hv{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Wi(t){return t.hasNext()?t.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e){this.fields=e,e.sort(Re.comparator)}static empty(){return new Pt([])}unionWith(e){let n=new pe(Re.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Pt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Vs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V1 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new V1("Invalid base64 string: "+s):s}}(e);return new Be(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Be(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Be.EMPTY_BYTE_STRING=new Be("");const IN=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Gn(t){if(Q(!!t),typeof t=="string"){let e=0;const n=IN.exec(t);if(Q(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:be(t.seconds),nanos:be(t.nanos)}}function be(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Ur(t){return typeof t=="string"?Be.fromBase64String(t):Be.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lm(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function cm(t){const e=t.mapValue.fields.__previous_value__;return lm(e)?cm(e):e}function Oa(t){const e=Gn(t.mapValue.fields.__local_write_time__.timestampValue);return new Ne(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SN{constructor(e,n,r,i,s,o,a,c,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=d}}class Ri{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Ri("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ri&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},fc={nullValue:"NULL_VALUE"};function Pi(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?lm(t)?4:O1(t)?9007199254740991:Ku(t)?10:11:W()}function wn(t,e){if(t===e)return!0;const n=Pi(t);if(n!==Pi(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Oa(t).isEqual(Oa(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Gn(i.timestampValue),a=Gn(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return Ur(i.bytesValue).isEqual(Ur(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return be(i.geoPointValue.latitude)===be(s.geoPointValue.latitude)&&be(i.geoPointValue.longitude)===be(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return be(i.integerValue)===be(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=be(i.doubleValue),a=be(s.doubleValue);return o===a?Va(o)===Va(a):isNaN(o)&&isNaN(a)}return!1}(t,e);case 9:return Vs(t.arrayValue.values||[],e.arrayValue.values||[],wn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(Kv(o)!==Kv(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!wn(o[c],a[c])))return!1;return!0}(t,e);default:return W()}}function Ma(t,e){return(t.values||[]).find(n=>wn(n,e))!==void 0}function zr(t,e){if(t===e)return 0;const n=Pi(t),r=Pi(e);if(n!==r)return Z(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Z(t.booleanValue,e.booleanValue);case 2:return function(s,o){const a=be(s.integerValue||s.doubleValue),c=be(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(t,e);case 3:return Wv(t.timestampValue,e.timestampValue);case 4:return Wv(Oa(t),Oa(e));case 5:return Z(t.stringValue,e.stringValue);case 6:return function(s,o){const a=Ur(s),c=Ur(o);return a.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const a=s.split("/"),c=o.split("/");for(let d=0;d<a.length&&d<c.length;d++){const f=Z(a[d],c[d]);if(f!==0)return f}return Z(a.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const a=Z(be(s.latitude),be(o.latitude));return a!==0?a:Z(be(s.longitude),be(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Gv(t.arrayValue,e.arrayValue);case 10:return function(s,o){var a,c,d,f;const p=s.fields||{},g=o.fields||{},S=(a=p.value)===null||a===void 0?void 0:a.arrayValue,A=(c=g.value)===null||c===void 0?void 0:c.arrayValue,T=Z(((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0,((f=A==null?void 0:A.values)===null||f===void 0?void 0:f.length)||0);return T!==0?T:Gv(S,A)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===Tr.mapValue&&o===Tr.mapValue)return 0;if(s===Tr.mapValue)return 1;if(o===Tr.mapValue)return-1;const a=s.fields||{},c=Object.keys(a),d=o.fields||{},f=Object.keys(d);c.sort(),f.sort();for(let p=0;p<c.length&&p<f.length;++p){const g=Z(c[p],f[p]);if(g!==0)return g;const S=zr(a[c[p]],d[f[p]]);if(S!==0)return S}return Z(c.length,f.length)}(t.mapValue,e.mapValue);default:throw W()}}function Wv(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Z(t,e);const n=Gn(t),r=Gn(e),i=Z(n.seconds,r.seconds);return i!==0?i:Z(n.nanos,r.nanos)}function Gv(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=zr(n[i],r[i]);if(s)return s}return Z(n.length,r.length)}function Os(t){return jf(t)}function jf(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Gn(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Ur(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return $.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=jf(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${jf(n.fields[o])}`;return i+"}"}(t.mapValue):W()}function um(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Vf(t){return!!t&&"integerValue"in t}function La(t){return!!t&&"arrayValue"in t}function Qv(t){return!!t&&"nullValue"in t}function Yv(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function pc(t){return!!t&&"mapValue"in t}function Ku(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function ra(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Ui(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=ra(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ra(t.arrayValue.values[n]);return e}return Object.assign({},t)}function O1(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const M1={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function kN(t){return"nullValue"in t?fc:"booleanValue"in t?{booleanValue:!1}:"integerValue"in t||"doubleValue"in t?{doubleValue:NaN}:"timestampValue"in t?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in t?{stringValue:""}:"bytesValue"in t?{bytesValue:""}:"referenceValue"in t?um(Ri.empty(),$.empty()):"geoPointValue"in t?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in t?{arrayValue:{}}:"mapValue"in t?Ku(t)?M1:{mapValue:{}}:W()}function RN(t){return"nullValue"in t?{booleanValue:!1}:"booleanValue"in t?{doubleValue:NaN}:"integerValue"in t||"doubleValue"in t?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in t?{stringValue:""}:"stringValue"in t?{bytesValue:""}:"bytesValue"in t?um(Ri.empty(),$.empty()):"referenceValue"in t?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in t?{arrayValue:{}}:"arrayValue"in t?M1:"mapValue"in t?Ku(t)?{mapValue:{}}:Tr:W()}function Jv(t,e){const n=zr(t.value,e.value);return n!==0?n:t.inclusive&&!e.inclusive?-1:!t.inclusive&&e.inclusive?1:0}function Xv(t,e){const n=zr(t.value,e.value);return n!==0?n:t.inclusive&&!e.inclusive?1:!t.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this.value=e}static empty(){return new ht({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!pc(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ra(n)}setAll(e){let n=Re.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,r,i),r={},i=[],n=a.popLast()}o?r[a.lastSegment()]=ra(o):i.push(a.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());pc(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return wn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];pc(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Ui(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new ht(ra(this.value))}}function L1(t){const e=[];return Ui(t.fields,(n,r)=>{const i=new Re([n]);if(pc(r)){const s=L1(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Pt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,n,r,i,s,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Ve(e,0,Y.min(),Y.min(),Y.min(),ht.empty(),0)}static newFoundDocument(e,n,r,i){return new Ve(e,1,n,Y.min(),r,i,0)}static newNoDocument(e,n){return new Ve(e,2,n,Y.min(),Y.min(),ht.empty(),0)}static newUnknownDocument(e,n){return new Ve(e,3,n,Y.min(),Y.min(),ht.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ht.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ht.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ve&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ve(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e,n){this.position=e,this.inclusive=n}}function Zv(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=$.comparator($.fromName(o.referenceValue),n.key):r=zr(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function e_(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!wn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,n="asc"){this.field=e,this.dir=n}}function PN(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F1{}class se extends F1{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new AN(e,n,r):n==="array-contains"?new DN(e,r):n==="in"?new K1(e,r):n==="not-in"?new jN(e,r):n==="array-contains-any"?new VN(e,r):new se(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new NN(e,r):new CN(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(zr(n,this.value)):n!==null&&Pi(this.value)===Pi(n)&&this.matchesComparison(zr(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class fe extends F1{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new fe(e,n)}matches(e){return Ls(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Ls(t){return t.op==="and"}function Of(t){return t.op==="or"}function dm(t){return U1(t)&&Ls(t)}function U1(t){for(const e of t.filters)if(e instanceof fe)return!1;return!0}function Mf(t){if(t instanceof se)return t.field.canonicalString()+t.op.toString()+Os(t.value);if(dm(t))return t.filters.map(e=>Mf(e)).join(",");{const e=t.filters.map(n=>Mf(n)).join(",");return`${t.op}(${e})`}}function z1(t,e){return t instanceof se?function(r,i){return i instanceof se&&r.op===i.op&&r.field.isEqual(i.field)&&wn(r.value,i.value)}(t,e):t instanceof fe?function(r,i){return i instanceof fe&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,a)=>s&&z1(o,i.filters[a]),!0):!1}(t,e):void W()}function B1(t,e){const n=t.filters.concat(e);return fe.create(n,t.op)}function $1(t){return t instanceof se?function(n){return`${n.field.canonicalString()} ${n.op} ${Os(n.value)}`}(t):t instanceof fe?function(n){return n.op.toString()+" {"+n.getFilters().map($1).join(" ,")+"}"}(t):"Filter"}class AN extends se{constructor(e,n,r){super(e,n,r),this.key=$.fromName(r.referenceValue)}matches(e){const n=$.comparator(e.key,this.key);return this.matchesComparison(n)}}class NN extends se{constructor(e,n){super(e,"in",n),this.keys=q1("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class CN extends se{constructor(e,n){super(e,"not-in",n),this.keys=q1("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function q1(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>$.fromName(r.referenceValue))}class DN extends se{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return La(n)&&Ma(n.arrayValue,this.value)}}class K1 extends se{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ma(this.value.arrayValue,n)}}class jN extends se{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ma(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Ma(this.value.arrayValue,n)}}class VN extends se{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!La(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ma(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ON{constructor(e,n=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.ue=null}}function Lf(t,e=null,n=[],r=[],i=null,s=null,o=null){return new ON(t,e,n,r,i,s,o)}function Ai(t){const e=G(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Mf(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),qu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Os(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Os(r)).join(",")),e.ue=n}return e.ue}function Xa(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!PN(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!z1(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!e_(t.startAt,e.startAt)&&e_(t.endAt,e.endAt)}function ru(t){return $.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function iu(t,e){return t.filters.filter(n=>n instanceof se&&n.field.isEqual(e))}function t_(t,e,n){let r=fc,i=!0;for(const s of iu(t,e)){let o=fc,a=!0;switch(s.op){case"<":case"<=":o=kN(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=fc}Jv({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(n!==null){for(let s=0;s<t.orderBy.length;++s)if(t.orderBy[s].field.isEqual(e)){const o=n.position[s];Jv({value:r,inclusive:i},{value:o,inclusive:n.inclusive})<0&&(r=o,i=n.inclusive);break}}return{value:r,inclusive:i}}function n_(t,e,n){let r=Tr,i=!0;for(const s of iu(t,e)){let o=Tr,a=!0;switch(s.op){case">=":case">":o=RN(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=Tr}Xv({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(n!==null){for(let s=0;s<t.orderBy.length;++s)if(t.orderBy[s].field.isEqual(e)){const o=n.position[s];Xv({value:r,inclusive:i},{value:o,inclusive:n.inclusive})>0&&(r=o,i=n.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e,n=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function H1(t,e,n,r,i,s,o,a){return new Hu(t,e,n,r,i,s,o,a)}function Wu(t){return new Hu(t)}function r_(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function MN(t){return t.collectionGroup!==null}function ia(t){const e=G(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new pe(Re.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(d=>{d.isInequality()&&(a=a.add(d.field))})}),a})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new nu(s,r))}),n.has(Re.keyField().canonicalString())||e.ce.push(new nu(Re.keyField(),r))}return e.ce}function Ut(t){const e=G(t);return e.le||(e.le=LN(e,ia(t))),e.le}function LN(t,e){if(t.limitType==="F")return Lf(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new nu(i.field,s)});const n=t.endAt?new Ms(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Ms(t.startAt.position,t.startAt.inclusive):null;return Lf(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Ff(t,e,n){return new Hu(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Gu(t,e){return Xa(Ut(t),Ut(e))&&t.limitType===e.limitType}function W1(t){return`${Ai(Ut(t))}|lt:${t.limitType}`}function Zi(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>$1(i)).join(", ")}]`),qu(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>Os(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>Os(i)).join(",")),`Target(${r})`}(Ut(t))}; limitType=${t.limitType})`}function Za(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):$.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of ia(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,a,c){const d=Zv(o,a,c);return o.inclusive?d<=0:d<0}(r.startAt,ia(r),i)||r.endAt&&!function(o,a,c){const d=Zv(o,a,c);return o.inclusive?d>=0:d>0}(r.endAt,ia(r),i))}(t,e)}function G1(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Q1(t){return(e,n)=>{let r=!1;for(const i of ia(t)){const s=FN(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function FN(t,e,n){const r=t.field.isKeyField()?$.comparator(e.key,n.key):function(s,o,a){const c=o.data.field(s),d=a.data.field(s);return c!==null&&d!==null?zr(c,d):W()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return W()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Ui(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return j1(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UN=new _e($.comparator);function Mt(){return UN}const Y1=new _e($.comparator);function $o(...t){let e=Y1;for(const n of t)e=e.insert(n.key,n);return e}function J1(t){let e=Y1;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function hn(){return sa()}function X1(){return sa()}function sa(){return new Qr(t=>t.toString(),(t,e)=>t.isEqual(e))}const zN=new _e($.comparator),BN=new pe($.comparator);function te(...t){let e=BN;for(const n of t)e=e.add(n);return e}const $N=new pe(Z);function hm(){return $N}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fm(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Va(e)?"-0":e}}function Z1(t){return{integerValue:""+t}}function qN(t,e){return P1(e)?Z1(e):fm(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(){this._=void 0}}function KN(t,e,n){return t instanceof Fs?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&lm(s)&&(s=cm(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(n,e):t instanceof Us?tE(t,e):t instanceof zs?nE(t,e):function(i,s){const o=eE(i,s),a=i_(o)+i_(i.Pe);return Vf(o)&&Vf(i.Pe)?Z1(a):fm(i.serializer,a)}(t,e)}function HN(t,e,n){return t instanceof Us?tE(t,e):t instanceof zs?nE(t,e):n}function eE(t,e){return t instanceof Fa?function(r){return Vf(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Fs extends Qu{}class Us extends Qu{constructor(e){super(),this.elements=e}}function tE(t,e){const n=rE(e);for(const r of t.elements)n.some(i=>wn(i,r))||n.push(r);return{arrayValue:{values:n}}}class zs extends Qu{constructor(e){super(),this.elements=e}}function nE(t,e){let n=rE(e);for(const r of t.elements)n=n.filter(i=>!wn(i,r));return{arrayValue:{values:n}}}class Fa extends Qu{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function i_(t){return be(t.integerValue||t.doubleValue)}function rE(t){return La(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iE{constructor(e,n){this.field=e,this.transform=n}}function WN(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof Us&&i instanceof Us||r instanceof zs&&i instanceof zs?Vs(r.elements,i.elements,wn):r instanceof Fa&&i instanceof Fa?wn(r.Pe,i.Pe):r instanceof Fs&&i instanceof Fs}(t.transform,e.transform)}class GN{constructor(e,n){this.version=e,this.transformResults=n}}class _t{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new _t}static exists(e){return new _t(void 0,e)}static updateTime(e){return new _t(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function mc(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Yu{}function sE(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new pm(t.key,_t.none()):new ro(t.key,t.data,_t.none());{const n=t.data,r=ht.empty();let i=new pe(Re.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Zn(t.key,r,new Pt(i.toArray()),_t.none())}}function QN(t,e,n){t instanceof ro?function(i,s,o){const a=i.value.clone(),c=o_(i.fieldTransforms,s,o.transformResults);a.setAll(c),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(t,e,n):t instanceof Zn?function(i,s,o){if(!mc(i.precondition,s))return void s.convertToUnknownDocument(o.version);const a=o_(i.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(oE(i)),c.setAll(a),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function oa(t,e,n,r){return t instanceof ro?function(s,o,a,c){if(!mc(s.precondition,o))return a;const d=s.value.clone(),f=a_(s.fieldTransforms,c,o);return d.setAll(f),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(t,e,n,r):t instanceof Zn?function(s,o,a,c){if(!mc(s.precondition,o))return a;const d=a_(s.fieldTransforms,c,o),f=o.data;return f.setAll(oE(s)),f.setAll(d),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(s,o,a){return mc(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(t,e,n)}function YN(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=eE(r.transform,i||null);s!=null&&(n===null&&(n=ht.empty()),n.set(r.field,s))}return n||null}function s_(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Vs(r,i,(s,o)=>WN(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class ro extends Yu{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Zn extends Yu{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function oE(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function o_(t,e,n){const r=new Map;Q(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,HN(o,a,n[i]))}return r}function a_(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,KN(s,o,e))}return r}class pm extends Yu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class aE extends Yu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&QN(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=oa(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=oa(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=X1();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=n.has(i.key)?null:a;const c=sE(o,a);c!==null&&r.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(Y.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),te())}isEqual(e){return this.batchId===e.batchId&&Vs(this.mutations,e.mutations,(n,r)=>s_(n,r))&&Vs(this.baseMutations,e.baseMutations,(n,r)=>s_(n,r))}}class gm{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){Q(e.mutations.length===r.length);let i=function(){return zN}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new gm(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JN{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $e,oe;function XN(t){switch(t){default:return W();case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0}}function lE(t){if(t===void 0)return ze("GRPC error has no .code"),F.UNKNOWN;switch(t){case $e.OK:return F.OK;case $e.CANCELLED:return F.CANCELLED;case $e.UNKNOWN:return F.UNKNOWN;case $e.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case $e.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case $e.INTERNAL:return F.INTERNAL;case $e.UNAVAILABLE:return F.UNAVAILABLE;case $e.UNAUTHENTICATED:return F.UNAUTHENTICATED;case $e.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case $e.NOT_FOUND:return F.NOT_FOUND;case $e.ALREADY_EXISTS:return F.ALREADY_EXISTS;case $e.PERMISSION_DENIED:return F.PERMISSION_DENIED;case $e.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case $e.ABORTED:return F.ABORTED;case $e.OUT_OF_RANGE:return F.OUT_OF_RANGE;case $e.UNIMPLEMENTED:return F.UNIMPLEMENTED;case $e.DATA_LOSS:return F.DATA_LOSS;default:return W()}}(oe=$e||($e={}))[oe.OK=0]="OK",oe[oe.CANCELLED=1]="CANCELLED",oe[oe.UNKNOWN=2]="UNKNOWN",oe[oe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",oe[oe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",oe[oe.NOT_FOUND=5]="NOT_FOUND",oe[oe.ALREADY_EXISTS=6]="ALREADY_EXISTS",oe[oe.PERMISSION_DENIED=7]="PERMISSION_DENIED",oe[oe.UNAUTHENTICATED=16]="UNAUTHENTICATED",oe[oe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",oe[oe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",oe[oe.ABORTED=10]="ABORTED",oe[oe.OUT_OF_RANGE=11]="OUT_OF_RANGE",oe[oe.UNIMPLEMENTED=12]="UNIMPLEMENTED",oe[oe.INTERNAL=13]="INTERNAL",oe[oe.UNAVAILABLE=14]="UNAVAILABLE",oe[oe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZN(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eC=new yi([4294967295,4294967295],0);function l_(t){const e=ZN().encode(t),n=new g1;return n.update(e),new Uint8Array(n.digest())}function c_(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new yi([n,r],0),new yi([i,s],0)]}class vm{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new qo(`Invalid padding: ${n}`);if(r<0)throw new qo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new qo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new qo(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=yi.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(yi.fromNumber(r)));return i.compare(eC)===1&&(i=new yi([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=l_(e),[r,i]=c_(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new vm(s,i,n);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.Ie===0)return;const n=l_(e),[r,i]=c_(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class qo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,tl.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new el(Y.min(),i,new _e(Z),Mt(),te())}}class tl{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new tl(r,n,te(),te(),te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class cE{constructor(e,n){this.targetId=e,this.me=n}}class uE{constructor(e,n,r=Be.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class u_{constructor(){this.fe=0,this.ge=h_(),this.pe=Be.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=te(),n=te(),r=te();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:W()}}),new tl(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=h_()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class tC{constructor(e){this.Le=e,this.Be=new Map,this.ke=Mt(),this.qe=d_(),this.Qe=new _e(Z)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:W()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(ru(s))if(r===0){const o=new $(s.path);this.Ue(n,o,Ve.newNoDocument(o,Y.min()))}else Q(r===1);else{const o=this.Ye(n);if(o!==r){const a=this.Ze(e),c=a?this.Xe(a,e,o):1;if(c!==0){this.je(n);const d=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,d)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,a;try{o=Ur(r).toUint8Array()}catch(c){if(c instanceof V1)return Ca("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new vm(o,i,s)}catch(c){return Ca(c instanceof qo?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.Ie===0?null:a}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Le.tt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,o)=>{const a=this.Je(o);if(a){if(s.current&&ru(a.target)){const c=new $(a.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,Ve.newNoDocument(c,e))}s.be&&(n.set(o,s.ve()),s.Ce())}});let r=te();this.qe.forEach((s,o)=>{let a=!0;o.forEachWhile(c=>{const d=this.Je(c);return!d||d.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new el(e,n,this.Qe,this.ke,r);return this.ke=Mt(),this.qe=d_(),this.Qe=new _e(Z),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new u_,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new pe(Z),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||U("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new u_),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function d_(){return new _e($.comparator)}function h_(){return new _e($.comparator)}const nC={asc:"ASCENDING",desc:"DESCENDING"},rC={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},iC={and:"AND",or:"OR"};class sC{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Uf(t,e){return t.useProto3Json||qu(e)?e:{value:e}}function Bs(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function dE(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function oC(t,e){return Bs(t,e.toTimestamp())}function Et(t){return Q(!!t),Y.fromTimestamp(function(n){const r=Gn(n);return new Ne(r.seconds,r.nanos)}(t))}function _m(t,e){return zf(t,e).canonicalString()}function zf(t,e){const n=function(i){return new de(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function hE(t){const e=de.fromString(t);return Q(wE(e)),e}function su(t,e){return _m(t.databaseId,e.path)}function vi(t,e){const n=hE(e);if(n.get(1)!==t.databaseId.projectId)throw new q(F.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new q(F.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new $(mE(n))}function fE(t,e){return _m(t.databaseId,e)}function pE(t){const e=hE(t);return e.length===4?de.emptyPath():mE(e)}function Bf(t){return new de(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function mE(t){return Q(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function f_(t,e,n){return{name:su(t,e),fields:n.value.mapValue.fields}}function aC(t,e,n){const r=vi(t,e.name),i=Et(e.updateTime),s=e.createTime?Et(e.createTime):Y.min(),o=new ht({mapValue:{fields:e.fields}}),a=Ve.newFoundDocument(r,i,s,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}function lC(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:W()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,f){return d.useProto3Json?(Q(f===void 0||typeof f=="string"),Be.fromBase64String(f||"")):(Q(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Be.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(d){const f=d.code===void 0?F.UNKNOWN:lE(d.code);return new q(f,d.message||"")}(o);n=new uE(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=vi(t,r.document.name),s=Et(r.document.updateTime),o=r.document.createTime?Et(r.document.createTime):Y.min(),a=new ht({mapValue:{fields:r.document.fields}}),c=Ve.newFoundDocument(i,s,o,a),d=r.targetIds||[],f=r.removedTargetIds||[];n=new gc(d,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=vi(t,r.document),s=r.readTime?Et(r.readTime):Y.min(),o=Ve.newNoDocument(i,s),a=r.removedTargetIds||[];n=new gc([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=vi(t,r.document),s=r.removedTargetIds||[];n=new gc([],s,i,null)}else{if(!("filter"in e))return W();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new JN(i,s),a=r.targetId;n=new cE(a,o)}}return n}function ou(t,e){let n;if(e instanceof ro)n={update:f_(t,e.key,e.value)};else if(e instanceof pm)n={delete:su(t,e.key)};else if(e instanceof Zn)n={update:f_(t,e.key,e.data),updateMask:pC(e.fieldMask)};else{if(!(e instanceof aE))return W();n={verify:su(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const a=o.transform;if(a instanceof Fs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Us)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof zs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Fa)return{fieldPath:o.field.canonicalString(),increment:a.Pe};throw W()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:oC(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:W()}(t,e.precondition)),n}function $f(t,e){const n=e.currentDocument?function(s){return s.updateTime!==void 0?_t.updateTime(Et(s.updateTime)):s.exists!==void 0?_t.exists(s.exists):_t.none()}(e.currentDocument):_t.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,a){let c=null;if("setToServerValue"in a)Q(a.setToServerValue==="REQUEST_TIME"),c=new Fs;else if("appendMissingElements"in a){const f=a.appendMissingElements.values||[];c=new Us(f)}else if("removeAllFromArray"in a){const f=a.removeAllFromArray.values||[];c=new zs(f)}else"increment"in a?c=new Fa(o,a.increment):W();const d=Re.fromServerFormat(a.fieldPath);return new iE(d,c)}(t,i)):[];if(e.update){e.update.name;const i=vi(t,e.update.name),s=new ht({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(c){const d=c.fieldPaths||[];return new Pt(d.map(f=>Re.fromServerFormat(f)))}(e.updateMask);return new Zn(i,s,o,n,r)}return new ro(i,s,n,r)}if(e.delete){const i=vi(t,e.delete);return new pm(i,n)}if(e.verify){const i=vi(t,e.verify);return new aE(i,n)}return W()}function cC(t,e){return t&&t.length>0?(Q(e!==void 0),t.map(n=>function(i,s){let o=i.updateTime?Et(i.updateTime):Et(s);return o.isEqual(Y.min())&&(o=Et(s)),new GN(o,i.transformResults||[])}(n,e))):[]}function gE(t,e){return{documents:[fE(t,e.path)]}}function yE(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=fE(t,i);const s=function(d){if(d.length!==0)return xE(fe.create(d,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(d){if(d.length!==0)return d.map(f=>function(g){return{field:es(g.field),direction:dC(g.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Uf(t,e.limit);return a!==null&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:n,parent:i}}function vE(t){let e=pE(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){Q(r===1);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(p){const g=_E(p);return g instanceof fe&&dm(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(g=>function(A){return new nu(ts(A.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(A.direction))}(g))}(n.orderBy));let a=null;n.limit&&(a=function(p){let g;return g=typeof p=="object"?p.value:p,qu(g)?null:g}(n.limit));let c=null;n.startAt&&(c=function(p){const g=!!p.before,S=p.values||[];return new Ms(S,g)}(n.startAt));let d=null;return n.endAt&&(d=function(p){const g=!p.before,S=p.values||[];return new Ms(S,g)}(n.endAt)),H1(e,i,o,s,a,"F",c,d)}function uC(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function _E(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=ts(n.unaryFilter.field);return se.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ts(n.unaryFilter.field);return se.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ts(n.unaryFilter.field);return se.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ts(n.unaryFilter.field);return se.create(o,"!=",{nullValue:"NULL_VALUE"});default:return W()}}(t):t.fieldFilter!==void 0?function(n){return se.create(ts(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return W()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return fe.create(n.compositeFilter.filters.map(r=>_E(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return W()}}(n.compositeFilter.op))}(t):W()}function dC(t){return nC[t]}function hC(t){return rC[t]}function fC(t){return iC[t]}function es(t){return{fieldPath:t.canonicalString()}}function ts(t){return Re.fromServerFormat(t.fieldPath)}function xE(t){return t instanceof se?function(n){if(n.op==="=="){if(Yv(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NAN"}};if(Qv(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Yv(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NOT_NAN"}};if(Qv(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:es(n.field),op:hC(n.op),value:n.value}}}(t):t instanceof fe?function(n){const r=n.getFilters().map(i=>xE(i));return r.length===1?r[0]:{compositeFilter:{op:fC(n.op),filters:r}}}(t):W()}function pC(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function wE(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e,n,r,i,s=Y.min(),o=Y.min(),a=Be.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new Mn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Mn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Mn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Mn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EE{constructor(e){this.ct=e}}function mC(t,e){let n;if(e.document)n=aC(t.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=$.fromSegments(e.noDocument.path),i=Ci(e.noDocument.readTime);n=Ve.newNoDocument(r,i),e.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!e.unknownDocument)return W();{const r=$.fromSegments(e.unknownDocument.path),i=Ci(e.unknownDocument.version);n=Ve.newUnknownDocument(r,i)}}return e.readTime&&n.setReadTime(function(i){const s=new Ne(i[0],i[1]);return Y.fromTimestamp(s)}(e.readTime)),n}function p_(t,e){const n=e.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:au(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:su(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Bs(s,o.version.toTimestamp()),createTime:Bs(s,o.createTime.toTimestamp())}}(t.ct,e);else if(e.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:Ni(e.version)};else{if(!e.isUnknownDocument())return W();r.unknownDocument={path:n.path.toArray(),version:Ni(e.version)}}return r}function au(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function Ni(t){const e=t.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Ci(t){const e=new Ne(t.seconds,t.nanoseconds);return Y.fromTimestamp(e)}function ci(t,e){const n=(e.baseMutations||[]).map(s=>$f(t.ct,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>$f(t.ct,s)),i=Ne.fromMillis(e.localWriteTimeMs);return new mm(e.batchId,i,n,r)}function Ko(t){const e=Ci(t.readTime),n=t.lastLimboFreeSnapshotVersion!==void 0?Ci(t.lastLimboFreeSnapshotVersion):Y.min();let r;return r=function(s){return s.documents!==void 0}(t.query)?function(s){return Q(s.documents.length===1),Ut(Wu(pE(s.documents[0])))}(t.query):function(s){return Ut(vE(s))}(t.query),new Mn(r,t.targetId,"TargetPurposeListen",t.lastListenSequenceNumber,e,n,Be.fromBase64String(t.resumeToken))}function TE(t,e){const n=Ni(e.snapshotVersion),r=Ni(e.lastLimboFreeSnapshotVersion);let i;i=ru(e.target)?gE(t.ct,e.target):yE(t.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Ai(e.target),readTime:n,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function bE(t){const e=vE({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Ff(e,e.limit,"L"):e}function fh(t,e){return new ym(e.largestBatchId,$f(t.ct,e.overlayMutation))}function m_(t,e){const n=e.path.lastSegment();return[t,wt(e.path.popLast()),n]}function g_(t,e,n,r){return{indexId:t,uid:e,sequenceNumber:n,readTime:Ni(r.readTime),documentKey:wt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gC{getBundleMetadata(e,n){return y_(e).get(n).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:Ci(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,n){return y_(e).put(function(i){return{bundleId:i.id,createTime:Ni(Et(i.createTime)),version:i.version}}(n))}getNamedQuery(e,n){return v_(e).get(n).next(r=>{if(r)return function(s){return{name:s.name,query:bE(s.bundledQuery),readTime:Ci(s.readTime)}}(r)})}saveNamedQuery(e,n){return v_(e).put(function(i){return{name:i.name,readTime:Ni(Et(i.readTime)),bundledQuery:i.bundledQuery}}(n))}}function y_(t){return Qe(t,"bundles")}function v_(t){return Qe(t,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(e,n){this.serializer=e,this.userId=n}static lt(e,n){const r=n.uid||"";return new Ju(e,r)}getOverlay(e,n){return Ao(e).get(m_(this.userId,n)).next(r=>r?fh(this.serializer,r):null)}getOverlays(e,n){const r=hn();return j.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){const i=[];return r.forEach((s,o)=>{const a=new ym(n,o);i.push(this.ht(e,a))}),j.waitFor(i)}removeOverlaysForBatchId(e,n,r){const i=new Set;n.forEach(o=>i.add(wt(o.getCollectionPath())));const s=[];return i.forEach(o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Ao(e).j("collectionPathOverlayIndex",a))}),j.waitFor(s)}getOverlaysForCollection(e,n,r){const i=hn(),s=wt(n),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Ao(e).U("collectionPathOverlayIndex",o).next(a=>{for(const c of a){const d=fh(this.serializer,c);i.set(d.getKey(),d)}return i})}getOverlaysForCollectionGroup(e,n,r,i){const s=hn();let o;const a=IDBKeyRange.bound([this.userId,n,r],[this.userId,n,Number.POSITIVE_INFINITY],!0);return Ao(e).J({index:"collectionGroupOverlayIndex",range:a},(c,d,f)=>{const p=fh(this.serializer,d);s.size()<i||p.largestBatchId===o?(s.set(p.getKey(),p),o=p.largestBatchId):f.done()}).next(()=>s)}ht(e,n){return Ao(e).put(function(i,s,o){const[a,c,d]=m_(s,o.mutation.key);return{userId:s,collectionPath:c,documentId:d,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:ou(i.ct,o.mutation)}}(this.serializer,this.userId,n))}}function Ao(t){return Qe(t,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yC{Pt(e){return Qe(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(n=>{const r=n==null?void 0:n.value;return r?Be.fromUint8Array(r):Be.EMPTY_BYTE_STRING})}setSessionToken(e,n){return this.Pt(e).put({name:"sessionToken",value:n.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(){}It(e,n){this.Tt(e,n),n.Et()}Tt(e,n){if("nullValue"in e)this.dt(n,5);else if("booleanValue"in e)this.dt(n,10),n.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(n,15),n.At(be(e.integerValue));else if("doubleValue"in e){const r=be(e.doubleValue);isNaN(r)?this.dt(n,13):(this.dt(n,15),Va(r)?n.At(0):n.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(n,20),typeof r=="string"&&(r=Gn(r)),n.Rt(`${r.seconds||""}`),n.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,n),this.ft(n);else if("bytesValue"in e)this.dt(n,30),n.gt(Ur(e.bytesValue)),this.ft(n);else if("referenceValue"in e)this.yt(e.referenceValue,n);else if("geoPointValue"in e){const r=e.geoPointValue;this.dt(n,45),n.At(r.latitude||0),n.At(r.longitude||0)}else"mapValue"in e?O1(e)?this.dt(n,Number.MAX_SAFE_INTEGER):Ku(e)?this.wt(e.mapValue,n):(this.St(e.mapValue,n),this.ft(n)):"arrayValue"in e?(this.bt(e.arrayValue,n),this.ft(n)):W()}Vt(e,n){this.dt(n,25),this.Dt(e,n)}Dt(e,n){n.Rt(e)}St(e,n){const r=e.fields||{};this.dt(n,55);for(const i of Object.keys(r))this.Vt(i,n),this.Tt(r[i],n)}wt(e,n){var r,i;const s=e.fields||{};this.dt(n,53);const o="value",a=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.dt(n,15),n.At(be(a)),this.Vt(o,n),this.Tt(s[o],n)}bt(e,n){const r=e.values||[];this.dt(n,50);for(const i of r)this.Tt(i,n)}yt(e,n){this.dt(n,37),$.fromName(e).path.forEach(r=>{this.dt(n,60),this.Dt(r,n)})}dt(e,n){e.At(n)}ft(e){e.At(2)}}ui.vt=new ui;function vC(t){if(t===0)return 8;let e=0;return!(t>>4)&&(e+=4,t<<=4),!(t>>6)&&(e+=2,t<<=2),!(t>>7)&&(e+=1),e}function __(t){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=vC(255&r[s]);if(i+=o,o!==8)break}return i}(t);return Math.ceil(e/8)}class _C{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const n=e[Symbol.iterator]();let r=n.next();for(;!r.done;)this.Ft(r.value),r=n.next();this.Mt()}xt(e){const n=e[Symbol.iterator]();let r=n.next();for(;!r.done;)this.Ot(r.value),r=n.next();this.Nt()}Lt(e){for(const n of e){const r=n.charCodeAt(0);if(r<128)this.Ft(r);else if(r<2048)this.Ft(960|r>>>6),this.Ft(128|63&r);else if(n<"\uD800"||"\uDBFF"<n)this.Ft(480|r>>>12),this.Ft(128|63&r>>>6),this.Ft(128|63&r);else{const i=n.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const n of e){const r=n.charCodeAt(0);if(r<128)this.Ot(r);else if(r<2048)this.Ot(960|r>>>6),this.Ot(128|63&r);else if(n<"\uD800"||"\uDBFF"<n)this.Ot(480|r>>>12),this.Ot(128|63&r>>>6),this.Ot(128|63&r);else{const i=n.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const n=this.qt(e),r=__(n);this.Qt(1+r),this.buffer[this.position++]=255&r;for(let i=n.length-r;i<n.length;++i)this.buffer[this.position++]=255&n[i]}Kt(e){const n=this.qt(e),r=__(n);this.Qt(1+r),this.buffer[this.position++]=~(255&r);for(let i=n.length-r;i<n.length;++i)this.buffer[this.position++]=~(255&n[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const n=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=(128&n[0])!=0;n[0]^=r?255:128;for(let i=1;i<n.length;++i)n[i]^=r?255:0;return n}Ft(e){const n=255&e;n===0?(this.Ut(0),this.Ut(255)):n===255?(this.Ut(255),this.Ut(0)):this.Ut(n)}Ot(e){const n=255&e;n===0?(this.Gt(0),this.Gt(255)):n===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const n=e+this.position;if(n<=this.buffer.length)return;let r=2*this.buffer.length;r<n&&(r=n);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class xC{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class wC{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class No{constructor(){this.jt=new _C,this.Ht=new xC(this.jt),this.Jt=new wC(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e,n,r,i){this.indexId=e,this.documentKey=n,this.arrayValue=r,this.directionalValue=i}Zt(){const e=this.directionalValue.length,n=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(n);return r.set(this.directionalValue,0),n!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new di(this.indexId,this.documentKey,this.arrayValue,r)}}function sr(t,e){let n=t.indexId-e.indexId;return n!==0?n:(n=x_(t.arrayValue,e.arrayValue),n!==0?n:(n=x_(t.directionalValue,e.directionalValue),n!==0?n:$.comparator(t.documentKey,e.documentKey)))}function x_(t,e){for(let n=0;n<t.length&&n<e.length;++n){const r=t[n]-e[n];if(r!==0)return r}return t.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w_{constructor(e){this.Xt=new pe((n,r)=>Re.comparator(n.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const n of e.filters){const r=n;r.isInequality()?this.Xt=this.Xt.add(r):this.tn.push(r)}}get nn(){return this.Xt.size>1}rn(e){if(Q(e.collectionGroup===this.collectionId),this.nn)return!1;const n=Cf(e);if(n!==void 0&&!this.sn(n))return!1;const r=ai(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.sn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Xt.size>0){const a=this.Xt.getIterator().getNext();if(!i.has(a.field.canonicalString())){const c=r[s];if(!this.on(a,c)||!this._n(this.en[o++],c))return!1}++s}for(;s<r.length;++s){const a=r[s];if(o>=this.en.length||!this._n(this.en[o++],a))return!1}return!0}an(){if(this.nn)return null;let e=new pe(Re.comparator);const n=[];for(const r of this.tn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")n.push(new dc(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),n.push(new dc(r.field,0))}for(const r of this.en)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),n.push(new dc(r.field,r.dir==="asc"?0:1)));return new tu(tu.UNKNOWN_ID,this.collectionId,n,ja.empty())}sn(e){for(const n of this.tn)if(this.on(n,e))return!0;return!1}on(e,n){if(e===void 0||!e.field.isEqual(n.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return n.kind===2===r}_n(e,n){return!!e.field.isEqual(n.fieldPath)&&(n.kind===0&&e.dir==="asc"||n.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IE(t){var e,n;if(Q(t instanceof se||t instanceof fe),t instanceof se){if(t instanceof K1){const i=((n=(e=t.value.arrayValue)===null||e===void 0?void 0:e.values)===null||n===void 0?void 0:n.map(s=>se.create(t.field,"==",s)))||[];return fe.create(i,"or")}return t}const r=t.filters.map(i=>IE(i));return fe.create(r,t.op)}function EC(t){if(t.getFilters().length===0)return[];const e=Hf(IE(t));return Q(SE(e)),qf(e)||Kf(e)?[e]:e.getFilters()}function qf(t){return t instanceof se}function Kf(t){return t instanceof fe&&dm(t)}function SE(t){return qf(t)||Kf(t)||function(n){if(n instanceof fe&&Of(n)){for(const r of n.getFilters())if(!qf(r)&&!Kf(r))return!1;return!0}return!1}(t)}function Hf(t){if(Q(t instanceof se||t instanceof fe),t instanceof se)return t;if(t.filters.length===1)return Hf(t.filters[0]);const e=t.filters.map(r=>Hf(r));let n=fe.create(e,t.op);return n=lu(n),SE(n)?n:(Q(n instanceof fe),Q(Ls(n)),Q(n.filters.length>1),n.filters.reduce((r,i)=>xm(r,i)))}function xm(t,e){let n;return Q(t instanceof se||t instanceof fe),Q(e instanceof se||e instanceof fe),n=t instanceof se?e instanceof se?function(i,s){return fe.create([i,s],"and")}(t,e):E_(t,e):e instanceof se?E_(e,t):function(i,s){if(Q(i.filters.length>0&&s.filters.length>0),Ls(i)&&Ls(s))return B1(i,s.getFilters());const o=Of(i)?i:s,a=Of(i)?s:i,c=o.filters.map(d=>xm(d,a));return fe.create(c,"or")}(t,e),lu(n)}function E_(t,e){if(Ls(e))return B1(e,t.getFilters());{const n=e.filters.map(r=>xm(t,r));return fe.create(n,"or")}}function lu(t){if(Q(t instanceof se||t instanceof fe),t instanceof se)return t;const e=t.getFilters();if(e.length===1)return lu(e[0]);if(U1(t))return t;const n=e.map(i=>lu(i)),r=[];return n.forEach(i=>{i instanceof se?r.push(i):i instanceof fe&&(i.op===t.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:fe.create(r,t.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TC{constructor(){this.un=new wm}addToCollectionParentIndex(e,n){return this.un.add(n),j.resolve()}getCollectionParents(e,n){return j.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return j.resolve()}deleteFieldIndex(e,n){return j.resolve()}deleteAllFieldIndexes(e){return j.resolve()}createTargetIndexes(e,n){return j.resolve()}getDocumentsMatchingTarget(e,n){return j.resolve(null)}getIndexType(e,n){return j.resolve(0)}getFieldIndexes(e,n){return j.resolve([])}getNextCollectionGroupToUpdate(e){return j.resolve(null)}getMinOffset(e,n){return j.resolve(Bt.min())}getMinOffsetFromCollectionGroup(e,n){return j.resolve(Bt.min())}updateCollectionGroup(e,n,r){return j.resolve()}updateIndexEntries(e,n){return j.resolve()}}class wm{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new pe(de.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new pe(de.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ql=new Uint8Array(0);class bC{constructor(e,n){this.databaseId=n,this.cn=new wm,this.ln=new Qr(r=>Ai(r),(r,i)=>Xa(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,n){if(!this.cn.has(n)){const r=n.lastSegment(),i=n.popLast();e.addOnCommittedListener(()=>{this.cn.add(n)});const s={collectionId:r,parent:wt(i)};return T_(e).put(s)}return j.resolve()}getCollectionParents(e,n){const r=[],i=IDBKeyRange.bound([n,""],[T1(n),""],!1,!0);return T_(e).U(i).next(s=>{for(const o of s){if(o.collectionId!==n)break;r.push(dn(o.parent))}return r})}addFieldIndex(e,n){const r=Co(e),i=function(a){return{indexId:a.indexId,collectionGroup:a.collectionGroup,fields:a.fields.map(c=>[c.fieldPath.canonicalString(),c.kind])}}(n);delete i.indexId;const s=r.add(i);if(n.indexState){const o=Qi(e);return s.next(a=>{o.put(g_(a,this.uid,n.indexState.sequenceNumber,n.indexState.offset))})}return s.next()}deleteFieldIndex(e,n){const r=Co(e),i=Qi(e),s=Gi(e);return r.delete(n.indexId).next(()=>i.delete(IDBKeyRange.bound([n.indexId],[n.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([n.indexId],[n.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const n=Co(e),r=Gi(e),i=Qi(e);return n.j().next(()=>r.j()).next(()=>i.j())}createTargetIndexes(e,n){return j.forEach(this.hn(n),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new w_(r).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,n){const r=Gi(e);let i=!0;const s=new Map;return j.forEach(this.hn(n),o=>this.Pn(e,o).next(a=>{i&&(i=!!a),s.set(o,a)})).next(()=>{if(i){let o=te();const a=[];return j.forEach(s,(c,d)=>{U("IndexedDbIndexManager",`Using index ${function(v){return`id=${v.indexId}|cg=${v.collectionGroup}|f=${v.fields.map(k=>`${k.fieldPath}:${k.kind}`).join(",")}`}(c)} to execute ${Ai(n)}`);const f=function(v,k){const O=Cf(k);if(O===void 0)return null;for(const M of iu(v,O.fieldPath))switch(M.op){case"array-contains-any":return M.value.arrayValue.values||[];case"array-contains":return[M.value]}return null}(d,c),p=function(v,k){const O=new Map;for(const M of ai(k))for(const I of iu(v,M.fieldPath))switch(I.op){case"==":case"in":O.set(M.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return O.set(M.fieldPath.canonicalString(),I.value),Array.from(O.values())}return null}(d,c),g=function(v,k){const O=[];let M=!0;for(const I of ai(k)){const E=I.kind===0?t_(v,I.fieldPath,v.startAt):n_(v,I.fieldPath,v.startAt);O.push(E.value),M&&(M=E.inclusive)}return new Ms(O,M)}(d,c),S=function(v,k){const O=[];let M=!0;for(const I of ai(k)){const E=I.kind===0?n_(v,I.fieldPath,v.endAt):t_(v,I.fieldPath,v.endAt);O.push(E.value),M&&(M=E.inclusive)}return new Ms(O,M)}(d,c),A=this.In(c,d,g),T=this.In(c,d,S),P=this.Tn(c,d,p),y=this.En(c.indexId,f,A,g.inclusive,T,S.inclusive,P);return j.forEach(y,x=>r.G(x,n.limit).next(v=>{v.forEach(k=>{const O=$.fromSegments(k.documentKey);o.has(O)||(o=o.add(O),a.push(O))})}))}).next(()=>a)}return j.resolve(null)})}hn(e){let n=this.ln.get(e);return n||(e.filters.length===0?n=[e]:n=EC(fe.create(e.filters,"and")).map(r=>Lf(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,n),n)}En(e,n,r,i,s,o,a){const c=(n!=null?n.length:1)*Math.max(r.length,s.length),d=c/(n!=null?n.length:1),f=[];for(let p=0;p<c;++p){const g=n?this.dn(n[p/d]):ql,S=this.An(e,g,r[p%d],i),A=this.Rn(e,g,s[p%d],o),T=a.map(P=>this.An(e,g,P,!0));f.push(...this.createRange(S,A,T))}return f}An(e,n,r,i){const s=new di(e,$.empty(),n,r);return i?s:s.Zt()}Rn(e,n,r,i){const s=new di(e,$.empty(),n,r);return i?s.Zt():s}Pn(e,n){const r=new w_(n),i=n.collectionGroup!=null?n.collectionGroup:n.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const a of s)r.rn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o})}getIndexType(e,n){let r=2;const i=this.hn(n);return j.forEach(i,s=>this.Pn(e,s).next(o=>{o?r!==0&&o.fields.length<function(c){let d=new pe(Re.comparator),f=!1;for(const p of c.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:d=d.add(g.field));for(const p of c.orderBy)p.field.isKeyField()||(d=d.add(p.field));return d.size+(f?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(n)&&i.length>1&&r===2?1:r)}Vn(e,n){const r=new No;for(const i of ai(e)){const s=n.data.field(i.fieldPath);if(s==null)return null;const o=r.Yt(i.kind);ui.vt.It(s,o)}return r.zt()}dn(e){const n=new No;return ui.vt.It(e,n.Yt(0)),n.zt()}mn(e,n){const r=new No;return ui.vt.It(um(this.databaseId,n),r.Yt(function(s){const o=ai(s);return o.length===0?0:o[o.length-1].kind}(e))),r.zt()}Tn(e,n,r){if(r===null)return[];let i=[];i.push(new No);let s=0;for(const o of ai(e)){const a=r[s++];for(const c of i)if(this.fn(n,o.fieldPath)&&La(a))i=this.gn(i,o,a);else{const d=c.Yt(o.kind);ui.vt.It(a,d)}}return this.pn(i)}In(e,n,r){return this.Tn(e,n,r.position)}pn(e){const n=[];for(let r=0;r<e.length;++r)n[r]=e[r].zt();return n}gn(e,n,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const c=new No;c.seed(a.zt()),ui.vt.It(o,c.Yt(n.kind)),s.push(c)}return s}fn(e,n){return!!e.filters.find(r=>r instanceof se&&r.field.isEqual(n)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,n){const r=Co(e),i=Qi(e);return(n?r.U("collectionGroupIndex",IDBKeyRange.bound(n,n)):r.U()).next(s=>{const o=[];return j.forEach(s,a=>i.get([a.indexId,this.uid]).next(c=>{o.push(function(f,p){const g=p?new ja(p.sequenceNumber,new Bt(Ci(p.readTime),new $(dn(p.documentKey)),p.largestBatchId)):ja.empty(),S=f.fields.map(([A,T])=>new dc(Re.fromServerFormat(A),T));return new tu(f.indexId,f.collectionGroup,S,g)}(a,c))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(n=>n.length===0?null:(n.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:Z(r.collectionGroup,i.collectionGroup)}),n[0].collectionGroup))}updateCollectionGroup(e,n,r){const i=Co(e),s=Qi(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(n,n)).next(a=>j.forEach(a,c=>s.put(g_(c.indexId,this.uid,o,r)))))}updateIndexEntries(e,n){const r=new Map;return j.forEach(n,(i,s)=>{const o=r.get(i.collectionGroup);return(o?j.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(a=>(r.set(i.collectionGroup,a),j.forEach(a,c=>this.wn(e,i,c).next(d=>{const f=this.Sn(s,c);return d.isEqual(f)?j.resolve():this.bn(e,s,c,d,f)}))))})}Dn(e,n,r,i){return Gi(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(r,n.key),documentKey:n.key.path.toArray()})}vn(e,n,r,i){return Gi(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(r,n.key),n.key.path.toArray()])}wn(e,n,r){const i=Gi(e);let s=new pe(sr);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.mn(r,n)])},(o,a)=>{s=s.add(new di(r.indexId,n,a.arrayValue,a.directionalValue))}).next(()=>s)}Sn(e,n){let r=new pe(sr);const i=this.Vn(n,e);if(i==null)return r;const s=Cf(n);if(s!=null){const o=e.data.field(s.fieldPath);if(La(o))for(const a of o.arrayValue.values||[])r=r.add(new di(n.indexId,e.key,this.dn(a),i))}else r=r.add(new di(n.indexId,e.key,ql,i));return r}bn(e,n,r,i,s){U("IndexedDbIndexManager","Updating index entries for document '%s'",n.key);const o=[];return function(c,d,f,p,g){const S=c.getIterator(),A=d.getIterator();let T=Wi(S),P=Wi(A);for(;T||P;){let y=!1,x=!1;if(T&&P){const v=f(T,P);v<0?x=!0:v>0&&(y=!0)}else T!=null?x=!0:y=!0;y?(p(P),P=Wi(A)):x?(g(T),T=Wi(S)):(T=Wi(S),P=Wi(A))}}(i,s,sr,a=>{o.push(this.Dn(e,n,r,a))},a=>{o.push(this.vn(e,n,r,a))}),j.waitFor(o)}yn(e){let n=1;return Qi(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),n=i.sequenceNumber+1}).next(()=>n)}createRange(e,n,r){r=r.sort((o,a)=>sr(o,a)).filter((o,a,c)=>!a||sr(o,c[a-1])!==0);const i=[];i.push(e);for(const o of r){const a=sr(o,e),c=sr(o,n);if(a===0)i[0]=e.Zt();else if(a>0&&c<0)i.push(o),i.push(o.Zt());else if(c>0)break}i.push(n);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const a=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,ql,[]],c=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,ql,[]];s.push(IDBKeyRange.bound(a,c))}return s}Cn(e,n){return sr(e,n)>0}getMinOffsetFromCollectionGroup(e,n){return this.getFieldIndexes(e,n).next(b_)}getMinOffset(e,n){return j.mapArray(this.hn(n),r=>this.Pn(e,r).next(i=>i||W())).next(b_)}}function T_(t){return Qe(t,"collectionParents")}function Gi(t){return Qe(t,"indexEntries")}function Co(t){return Qe(t,"indexConfiguration")}function Qi(t){return Qe(t,"indexState")}function b_(t){Q(t.length!==0);let e=t[0].indexState.offset,n=e.largestBatchId;for(let r=1;r<t.length;r++){const i=t[r].indexState.offset;sm(i,e)<0&&(e=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new Bt(e.readTime,e.documentKey,n)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class It{constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new It(e,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kE(t,e,n){const r=t.store("mutations"),i=t.store("documentMutations"),s=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.J({range:o},(f,p,g)=>(a++,g.delete()));s.push(c.next(()=>{Q(a===1)}));const d=[];for(const f of n.mutations){const p=A1(e,f.key.path,n.batchId);s.push(i.delete(p)),d.push(f.key)}return j.waitFor(s).next(()=>d)}function cu(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw W();e=t.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */It.DEFAULT_COLLECTION_PERCENTILE=10,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,It.DEFAULT=new It(41943040,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),It.DISABLED=new It(-1,0,0);class Xu{constructor(e,n,r,i){this.userId=e,this.serializer=n,this.indexManager=r,this.referenceDelegate=i,this.Fn={}}static lt(e,n,r,i){Q(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Xu(s,n,r,i)}checkEmpty(e){let n=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return or(e).J({index:"userMutationsIndex",range:r},(i,s,o)=>{n=!1,o.done()}).next(()=>n)}addMutationBatch(e,n,r,i){const s=ns(e),o=or(e);return o.add({}).next(a=>{Q(typeof a=="number");const c=new mm(a,n,r,i),d=function(S,A,T){const P=T.baseMutations.map(x=>ou(S.ct,x)),y=T.mutations.map(x=>ou(S.ct,x));return{userId:A,batchId:T.batchId,localWriteTimeMs:T.localWriteTime.toMillis(),baseMutations:P,mutations:y}}(this.serializer,this.userId,c),f=[];let p=new pe((g,S)=>Z(g.canonicalString(),S.canonicalString()));for(const g of i){const S=A1(this.userId,g.key.path,a);p=p.add(g.key.path.popLast()),f.push(o.put(d)),f.push(s.put(S,aN))}return p.forEach(g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Fn[a]=c.keys()}),j.waitFor(f).next(()=>c)})}lookupMutationBatch(e,n){return or(e).get(n).next(r=>r?(Q(r.userId===this.userId),ci(this.serializer,r)):null)}Mn(e,n){return this.Fn[n]?j.resolve(this.Fn[n]):this.lookupMutationBatch(e,n).next(r=>{if(r){const i=r.keys();return this.Fn[n]=i,i}return null})}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return or(e).J({index:"userMutationsIndex",range:i},(o,a,c)=>{a.userId===this.userId&&(Q(a.batchId>=r),s=ci(this.serializer,a)),c.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const n=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return or(e).J({index:"userMutationsIndex",range:n,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const n=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return or(e).U("userMutationsIndex",n).next(r=>r.map(i=>ci(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,n){const r=hc(this.userId,n.path),i=IDBKeyRange.lowerBound(r),s=[];return ns(e).J({range:i},(o,a,c)=>{const[d,f,p]=o,g=dn(f);if(d===this.userId&&n.path.isEqual(g))return or(e).get(p).next(S=>{if(!S)throw W();Q(S.userId===this.userId),s.push(ci(this.serializer,S))});c.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new pe(Z);const i=[];return n.forEach(s=>{const o=hc(this.userId,s.path),a=IDBKeyRange.lowerBound(o),c=ns(e).J({range:a},(d,f,p)=>{const[g,S,A]=d,T=dn(S);g===this.userId&&s.path.isEqual(T)?r=r.add(A):p.done()});i.push(c)}),j.waitFor(i).next(()=>this.xn(e,r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1,s=hc(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new pe(Z);return ns(e).J({range:o},(c,d,f)=>{const[p,g,S]=c,A=dn(g);p===this.userId&&r.isPrefixOf(A)?A.length===i&&(a=a.add(S)):f.done()}).next(()=>this.xn(e,a))}xn(e,n){const r=[],i=[];return n.forEach(s=>{i.push(or(e).get(s).next(o=>{if(o===null)throw W();Q(o.userId===this.userId),r.push(ci(this.serializer,o))}))}),j.waitFor(i).next(()=>r)}removeMutationBatch(e,n){return kE(e._e,this.userId,n).next(r=>(e.addOnCommittedListener(()=>{this.On(n.batchId)}),j.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(n=>{if(!n)return j.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return ns(e).J({range:r},(s,o,a)=>{if(s[0]===this.userId){const c=dn(s[1]);i.push(c)}else a.done()}).next(()=>{Q(i.length===0)})})}containsKey(e,n){return RE(e,this.userId,n)}Nn(e){return PE(e).get(this.userId).next(n=>n||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function RE(t,e,n){const r=hc(e,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return ns(t).J({range:s,H:!0},(a,c,d)=>{const[f,p,g]=a;f===e&&p===i&&(o=!0),d.done()}).next(()=>o)}function or(t){return Qe(t,"mutations")}function ns(t){return Qe(t,"documentMutations")}function PE(t){return Qe(t,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Di(0)}static kn(){return new Di(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IC{constructor(e,n){this.referenceDelegate=e,this.serializer=n}allocateTargetId(e){return this.qn(e).next(n=>{const r=new Di(n.highestTargetId);return n.highestTargetId=r.next(),this.Qn(e,n).next(()=>n.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(n=>Y.fromTimestamp(new Ne(n.lastRemoteSnapshotVersion.seconds,n.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(n=>n.highestListenSequenceNumber)}setTargetsMetadata(e,n,r){return this.qn(e).next(i=>(i.highestListenSequenceNumber=n,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),n>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=n),this.Qn(e,i)))}addTargetData(e,n){return this.Kn(e,n).next(()=>this.qn(e).next(r=>(r.targetCount+=1,this.$n(n,r),this.Qn(e,r))))}updateTargetData(e,n){return this.Kn(e,n)}removeTargetData(e,n){return this.removeMatchingKeysForTargetId(e,n.targetId).next(()=>Yi(e).delete(n.targetId)).next(()=>this.qn(e)).next(r=>(Q(r.targetCount>0),r.targetCount-=1,this.Qn(e,r)))}removeTargets(e,n,r){let i=0;const s=[];return Yi(e).J((o,a)=>{const c=Ko(a);c.sequenceNumber<=n&&r.get(c.targetId)===null&&(i++,s.push(this.removeTargetData(e,c)))}).next(()=>j.waitFor(s)).next(()=>i)}forEachTarget(e,n){return Yi(e).J((r,i)=>{const s=Ko(i);n(s)})}qn(e){return S_(e).get("targetGlobalKey").next(n=>(Q(n!==null),n))}Qn(e,n){return S_(e).put("targetGlobalKey",n)}Kn(e,n){return Yi(e).put(TE(this.serializer,n))}$n(e,n){let r=!1;return e.targetId>n.highestTargetId&&(n.highestTargetId=e.targetId,r=!0),e.sequenceNumber>n.highestListenSequenceNumber&&(n.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.qn(e).next(n=>n.targetCount)}getTargetData(e,n){const r=Ai(n),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return Yi(e).J({range:i,index:"queryTargetsIndex"},(o,a,c)=>{const d=Ko(a);Xa(n,d.target)&&(s=d,c.done())}).next(()=>s)}addMatchingKeys(e,n,r){const i=[],s=fr(e);return n.forEach(o=>{const a=wt(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))}),j.waitFor(i)}removeMatchingKeys(e,n,r){const i=fr(e);return j.forEach(n,s=>{const o=wt(s.path);return j.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,n){const r=fr(e),i=IDBKeyRange.bound([n],[n+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,n){const r=IDBKeyRange.bound([n],[n+1],!1,!0),i=fr(e);let s=te();return i.J({range:r,H:!0},(o,a,c)=>{const d=dn(o[1]),f=new $(d);s=s.add(f)}).next(()=>s)}containsKey(e,n){const r=wt(n.path),i=IDBKeyRange.bound([r],[T1(r)],!1,!0);let s=0;return fr(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,a],c,d)=>{o!==0&&(s++,d.done())}).next(()=>s>0)}ot(e,n){return Yi(e).get(n).next(r=>r?Ko(r):null)}}function Yi(t){return Qe(t,"targets")}function S_(t){return Qe(t,"targetGlobal")}function fr(t){return Qe(t,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_([t,e],[n,r]){const i=Z(t,n);return i===0?Z(e,r):i}class SC{constructor(e){this.Un=e,this.buffer=new pe(k_),this.Wn=0}Gn(){return++this.Wn}zn(e){const n=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();k_(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class kC{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){U("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Gr(n)?U("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",n):await Wr(n)}await this.Hn(3e5)})}}class RC{constructor(e,n){this.Jn=e,this.params=n}calculateTargetCount(e,n){return this.Jn.Yn(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return j.resolve(Rt.oe);const r=new SC(n);return this.Jn.forEachTarget(e,i=>r.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>r.zn(i))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.Jn.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Jn.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),j.resolve(I_)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),I_):this.Xn(e,n))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,n){let r,i,s,o,a,c,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,a=Date.now(),this.removeTargets(e,r,n))).next(p=>(s=p,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(d=Date.now(),Xi()<=ie.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(c-a)+`ms
	Removed ${p} documents in `+(d-c)+`ms
Total Duration: ${d-f}ms`),j.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function PC(t,e){return new RC(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AC{constructor(e,n){this.db=e,this.garbageCollector=PC(this,n)}Yn(e){const n=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(r=>n.next(i=>r+i))}er(e){let n=0;return this.Zn(e,r=>{n++}).next(()=>n)}forEachTarget(e,n){return this.db.getTargetCache().forEachTarget(e,n)}Zn(e,n){return this.tr(e,(r,i)=>n(i))}addReference(e,n,r){return Kl(e,r)}removeReference(e,n,r){return Kl(e,r)}removeTargets(e,n,r){return this.db.getTargetCache().removeTargets(e,n,r)}markPotentiallyOrphaned(e,n){return Kl(e,n)}nr(e,n){return function(i,s){let o=!1;return PE(i).Y(a=>RE(i,a,s).next(c=>(c&&(o=!0),j.resolve(!c)))).next(()=>o)}(e,n)}removeOrphanedDocuments(e,n){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,(o,a)=>{if(a<=n){const c=this.nr(e,o).next(d=>{if(!d)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,Y.min()),fr(e).delete(function(p){return[0,wt(p.path)]}(o))))});i.push(c)}}).next(()=>j.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,n){return Kl(e,n)}tr(e,n){const r=fr(e);let i,s=Rt.oe;return r.J({index:"documentTargetsIndex"},([o,a],{path:c,sequenceNumber:d})=>{o===0?(s!==Rt.oe&&n(new $(dn(i)),s),s=d,i=c):s=Rt.oe}).next(()=>{s!==Rt.oe&&n(new $(dn(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Kl(t,e){return fr(t).put(function(r,i){return{targetId:0,path:wt(r.path),sequenceNumber:i}}(e,t.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(){this.changes=new Qr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Ve.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?j.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NC{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,n,r){return ri(e).put(r)}removeEntry(e,n,r){return ri(e).delete(function(s,o){const a=s.path.toArray();return[a.slice(0,a.length-2),a[a.length-2],au(o),a[a.length-1]]}(n,r))}updateMetadata(e,n){return this.getMetadata(e).next(r=>(r.byteSize+=n,this.rr(e,r)))}getEntry(e,n){let r=Ve.newInvalidDocument(n);return ri(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Do(n))},(i,s)=>{r=this.ir(n,s)}).next(()=>r)}sr(e,n){let r={size:0,document:Ve.newInvalidDocument(n)};return ri(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Do(n))},(i,s)=>{r={document:this.ir(n,s),size:cu(s)}}).next(()=>r)}getEntries(e,n){let r=Mt();return this._r(e,n,(i,s)=>{const o=this.ir(i,s);r=r.insert(i,o)}).next(()=>r)}ar(e,n){let r=Mt(),i=new _e($.comparator);return this._r(e,n,(s,o)=>{const a=this.ir(s,o);r=r.insert(s,a),i=i.insert(s,cu(o))}).next(()=>({documents:r,ur:i}))}_r(e,n,r){if(n.isEmpty())return j.resolve();let i=new pe(A_);n.forEach(c=>i=i.add(c));const s=IDBKeyRange.bound(Do(i.first()),Do(i.last())),o=i.getIterator();let a=o.getNext();return ri(e).J({index:"documentKeyIndex",range:s},(c,d,f)=>{const p=$.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;a&&A_(a,p)<0;)r(a,null),a=o.getNext();a&&a.isEqual(p)&&(r(a,d),a=o.hasNext()?o.getNext():null),a?f.$(Do(a)):f.done()}).next(()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,n,r,i,s){const o=n.path,a=[o.popLast().toArray(),o.lastSegment(),au(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return ri(e).U(IDBKeyRange.bound(a,c,!0)).next(d=>{s==null||s.incrementDocumentReadCount(d.length);let f=Mt();for(const p of d){const g=this.ir($.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(Za(n,g)||i.has(g.key))&&(f=f.insert(g.key,g))}return f})}getAllFromCollectionGroup(e,n,r,i){let s=Mt();const o=P_(n,r),a=P_(n,Bt.max());return ri(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},(c,d,f)=>{const p=this.ir($.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);s=s.insert(p.key,p),s.size===i&&f.done()}).next(()=>s)}newChangeBuffer(e){return new CC(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(n=>n.byteSize)}getMetadata(e){return R_(e).get("remoteDocumentGlobalKey").next(n=>(Q(!!n),n))}rr(e,n){return R_(e).put("remoteDocumentGlobalKey",n)}ir(e,n){if(n){const r=mC(this.serializer,n);if(!(r.isNoDocument()&&r.version.isEqual(Y.min())))return r}return Ve.newInvalidDocument(e)}}function NE(t){return new NC(t)}class CC extends AE{constructor(e,n){super(),this.cr=e,this.trackRemovals=n,this.lr=new Qr(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const n=[];let r=0,i=new pe((s,o)=>Z(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const a=this.lr.get(s);if(n.push(this.cr.removeEntry(e,s,a.readTime)),o.isValidDocument()){const c=p_(this.cr.serializer,o);i=i.add(s.path.popLast());const d=cu(c);r+=d-a.size,n.push(this.cr.addEntry(e,s,c))}else if(r-=a.size,this.trackRemovals){const c=p_(this.cr.serializer,o.convertToNoDocument(Y.min()));n.push(this.cr.addEntry(e,s,c))}}),i.forEach(s=>{n.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),n.push(this.cr.updateMetadata(e,r)),j.waitFor(n)}getFromCache(e,n){return this.cr.sr(e,n).next(r=>(this.lr.set(n,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,n){return this.cr.ar(e,n).next(({documents:r,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function R_(t){return Qe(t,"remoteDocumentGlobal")}function ri(t){return Qe(t,"remoteDocumentsV14")}function Do(t){const e=t.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function P_(t,e){const n=e.documentKey.path.toArray();return[t,au(e.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function A_(t,e){const n=t.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<n.length-2&&s<r.length-2;++s)if(i=Z(n[s],r[s]),i)return i;return i=Z(n.length,r.length),i||(i=Z(n[n.length-2],r[r.length-2]),i||Z(n[n.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DC{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&oa(r.mutation,i,Pt.empty(),Ne.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,te()).next(()=>r))}getLocalViewOfDocuments(e,n,r=te()){const i=hn();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=$o();return s.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=hn();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,te()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,r,i){let s=Mt();const o=sa(),a=function(){return sa()}();return n.forEach((c,d)=>{const f=r.get(d.key);i.has(d.key)&&(f===void 0||f.mutation instanceof Zn)?s=s.insert(d.key,d):f!==void 0?(o.set(d.key,f.mutation.getFieldMask()),oa(f.mutation,d,f.mutation.getFieldMask(),Ne.now())):o.set(d.key,Pt.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((d,f)=>o.set(d,f)),n.forEach((d,f)=>{var p;return a.set(d,new DC(f,(p=o.get(d))!==null&&p!==void 0?p:null))}),a))}recalculateAndSaveOverlays(e,n){const r=sa();let i=new _e((o,a)=>o-a),s=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const d=n.get(c);if(d===null)return;let f=r.get(c)||Pt.empty();f=a.applyToLocalView(d,f),r.set(c,f);const p=(i.get(a.batchId)||te()).add(c);i=i.insert(a.batchId,p)})}).next(()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),d=c.key,f=c.value,p=X1();f.forEach(g=>{if(!s.has(g)){const S=sE(n.get(g),r.get(g));S!==null&&p.set(g,S),s=s.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,p))}return j.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return $.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):MN(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):j.resolve(hn());let a=-1,c=s;return o.next(d=>j.forEach(d,(f,p)=>(a<p.largestBatchId&&(a=p.largestBatchId),s.get(f)?j.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{c=c.insert(f,g)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,c,d,te())).next(f=>({batchId:a,changes:J1(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new $(n)).next(r=>{let i=$o();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=$o();return this.indexManager.getCollectionParents(e,s).next(a=>j.forEach(a,c=>{const d=function(p,g){return new Hu(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(f=>{f.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((c,d)=>{const f=d.getKey();o.get(f)===null&&(o=o.insert(f,Ve.newInvalidDocument(f)))});let a=$o();return o.forEach((c,d)=>{const f=s.get(c);f!==void 0&&oa(f.mutation,d,Pt.empty(),Ne.now()),Za(n,d)&&(a=a.insert(c,d))}),a})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jC{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return j.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:Et(i.createTime)}}(n)),j.resolve()}getNamedQuery(e,n){return j.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:bE(i.bundledQuery),readTime:Et(i.readTime)}}(n)),j.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VC{constructor(){this.overlays=new _e($.comparator),this.Ir=new Map}getOverlay(e,n){return j.resolve(this.overlays.get(n))}getOverlays(e,n){const r=hn();return j.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),j.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),j.resolve()}getOverlaysForCollection(e,n,r){const i=hn(),s=n.length+1,o=new $(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,d=c.getKey();if(!n.isPrefixOf(d.path))break;d.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return j.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new _e((d,f)=>d-f);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===n&&d.largestBatchId>r){let f=s.get(d.largestBatchId);f===null&&(f=hn(),s=s.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const a=hn(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((d,f)=>a.set(d,f)),!(a.size()>=i)););return j.resolve(a)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ym(n,r));let s=this.Ir.get(n);s===void 0&&(s=te(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OC{constructor(){this.sessionToken=Be.EMPTY_BYTE_STRING}getSessionToken(e){return j.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,j.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{constructor(){this.Tr=new pe(Ye.Er),this.dr=new pe(Ye.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Ye(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Ye(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new $(new de([])),r=new Ye(n,e),i=new Ye(n,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new $(new de([])),r=new Ye(n,e),i=new Ye(n,e+1);let s=te();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new Ye(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Ye{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return $.comparator(e.key,n.key)||Z(e.wr,n.wr)}static Ar(e,n){return Z(e.wr,n.wr)||$.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MC{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new pe(Ye.Er)}checkEmpty(e){return j.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new mm(s,n,r,i);this.mutationQueue.push(o);for(const a of i)this.br=this.br.add(new Ye(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return j.resolve(o)}lookupMutationBatch(e,n){return j.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return j.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return j.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return j.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Ye(n,0),i=new Ye(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const a=this.Dr(o.wr);s.push(a)}),j.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new pe(Z);return n.forEach(i=>{const s=new Ye(i,0),o=new Ye(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],a=>{r=r.add(a.wr)})}),j.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;$.isDocumentKey(s)||(s=s.child(""));const o=new Ye(new $(s),0);let a=new pe(Z);return this.br.forEachWhile(c=>{const d=c.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(a=a.add(c.wr)),!0)},o),j.resolve(this.Cr(a))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){Q(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return j.forEach(n.mutations,i=>{const s=new Ye(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Ye(n,0),i=this.br.firstAfterOrEqual(r);return j.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,j.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LC{constructor(e){this.Mr=e,this.docs=function(){return new _e($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return j.resolve(r?r.document.mutableCopy():Ve.newInvalidDocument(n))}getEntries(e,n){let r=Mt();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ve.newInvalidDocument(i))}),j.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=Mt();const o=n.path,a=new $(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:d,value:{document:f}}=c.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||sm(I1(f),r)<=0||(i.has(f.key)||Za(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return j.resolve(s)}getAllFromCollectionGroup(e,n,r,i){W()}Or(e,n){return j.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new FC(this)}getSize(e){return j.resolve(this.size)}}class FC extends AE{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),j.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UC{constructor(e){this.persistence=e,this.Nr=new Qr(n=>Ai(n),Xa),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Em,this.targetCount=0,this.kr=Di.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),j.resolve()}getLastRemoteSnapshotVersion(e){return j.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return j.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),j.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),j.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Di(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,j.resolve()}updateTargetData(e,n){return this.Kn(n),j.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,j.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),j.waitFor(s).next(()=>i)}getTargetCount(e){return j.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return j.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),j.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),j.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),j.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return j.resolve(r)}containsKey(e,n){return j.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DE{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Rt(0),this.Kr=!1,this.Kr=!0,this.$r=new OC,this.referenceDelegate=e(this),this.Ur=new UC(this),this.indexManager=new TC,this.remoteDocumentCache=function(i){return new LC(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new EE(n),this.Gr=new jC(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new VC,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new MC(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){U("MemoryPersistence","Starting transaction:",e);const i=new zC(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return j.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class zC extends k1{constructor(e){super(),this.currentSequenceNumber=e}}class Zu{constructor(e){this.persistence=e,this.Jr=new Em,this.Yr=null}static Zr(e){return new Zu(e)}get Xr(){if(this.Yr)return this.Yr;throw W()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),j.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),j.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),j.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return j.forEach(this.Xr,r=>{const i=$.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,Y.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return j.or([()=>j.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BC{constructor(e){this.serializer=e}O(e,n,r,i){const s=new $u("createOrUpgrade",n);r<1&&i>=1&&(function(c){c.createObjectStore("owner")}(e),function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",qv,{unique:!0}),c.createObjectStore("documentMutations")}(e),N_(e),function(c){c.createObjectStore("remoteDocuments")}(e));let o=j.resolve();return r<3&&i>=3&&(r!==0&&(function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")}(e),N_(e)),o=o.next(()=>function(c){const d=c.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Y.min().toTimestamp(),targetCount:0};return d.put("targetGlobalKey",f)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(c,d){return d.store("mutations").U().next(f=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",qv,{unique:!0});const p=d.store("mutations"),g=f.map(S=>p.put(S));return j.waitFor(g)})}(e,s))),o=o.next(()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.ni(s))),r<6&&i>=6&&(o=o.next(()=>(function(c){c.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),r<7&&i>=7&&(o=o.next(()=>this.ii(s))),r<8&&i>=8&&(o=o.next(()=>this.si(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.oi(s))),r<11&&i>=11&&(o=o.next(()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(c){c.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(c){const d=c.createObjectStore("documentOverlays",{keyPath:_N});d.createIndex("collectionPathOverlayIndex",xN,{unique:!1}),d.createIndex("collectionGroupOverlayIndex",wN,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(c){const d=c.createObjectStore("remoteDocumentsV14",{keyPath:lN});d.createIndex("documentKeyIndex",cN),d.createIndex("collectionGroupIndex",uN)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),r<15&&i>=15&&(o=o.next(()=>function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:mN}).createIndex("sequenceNumberIndex",gN,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:yN}).createIndex("documentKeyIndex",vN,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{n.objectStore("indexState").clear()}).next(()=>{n.objectStore("indexEntries").clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let n=0;return e.store("remoteDocuments").J((r,i)=>{n+=cu(i)}).next(()=>{const r={byteSize:n};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}ni(e){const n=e.store("mutationQueues"),r=e.store("mutations");return n.U().next(i=>j.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next(a=>j.forEach(a,c=>{Q(c.userId===s.userId);const d=ci(this.serializer,c);return kE(e,s.userId,d).next(()=>{})}))}))}ii(e){const n=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return r.J((o,a)=>{const c=new de(o),d=function(p){return[0,wt(p)]}(c);s.push(n.get(d).next(f=>f?j.resolve():(p=>n.put({targetId:0,path:wt(p),sequenceNumber:i.highestListenSequenceNumber}))(c)))}).next(()=>j.waitFor(s))})}si(e,n){e.createObjectStore("collectionParents",{keyPath:pN});const r=n.store("collectionParents"),i=new wm,s=o=>{if(i.add(o)){const a=o.lastSegment(),c=o.popLast();return r.put({collectionId:a,parent:wt(c)})}};return n.store("remoteDocuments").J({H:!0},(o,a)=>{const c=new de(o);return s(c.popLast())}).next(()=>n.store("documentMutations").J({H:!0},([o,a,c],d)=>{const f=dn(a);return s(f.popLast())}))}oi(e){const n=e.store("targets");return n.J((r,i)=>{const s=Ko(i),o=TE(this.serializer,s);return n.put(o)})}_i(e,n){const r=n.store("remoteDocuments"),i=[];return r.J((s,o)=>{const a=n.store("remoteDocumentsV14"),c=function(p){return p.document?new $(de.fromString(p.document.name).popFirst(5)):p.noDocument?$.fromSegments(p.noDocument.path):p.unknownDocument?$.fromSegments(p.unknownDocument.path):W()}(o).path.toArray(),d={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(d))}).next(()=>j.waitFor(i))}ai(e,n){const r=n.store("mutations"),i=NE(this.serializer),s=new DE(Zu.Zr,this.serializer.ct);return r.U().next(o=>{const a=new Map;return o.forEach(c=>{var d;let f=(d=a.get(c.userId))!==null&&d!==void 0?d:te();ci(this.serializer,c).keys().forEach(p=>f=f.add(p)),a.set(c.userId,f)}),j.forEach(a,(c,d)=>{const f=new ut(d),p=Ju.lt(this.serializer,f),g=s.getIndexManager(f),S=Xu.lt(f,this.serializer,g,s.referenceDelegate);return new CE(i,S,p,g).recalculateAndSaveOverlaysForDocumentKeys(new Df(n,Rt.oe),c).next()})})}}function N_(t){t.createObjectStore("targetDocuments",{keyPath:hN}).createIndex("documentTargetsIndex",fN,{unique:!0}),t.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",dN,{unique:!0}),t.createObjectStore("targetGlobal")}const ph="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Tm{constructor(e,n,r,i,s,o,a,c,d,f,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=n,this.clientId=r,this.ui=s,this.window=o,this.document=a,this.ci=d,this.li=f,this.hi=p,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=g=>Promise.resolve(),!Tm.D())throw new q(F.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new AC(this,i),this.Ai=n+"main",this.serializer=new EE(c),this.Ri=new Vr(this.Ai,this.hi,new BC(this.serializer)),this.$r=new yC,this.Ur=new IC(this.referenceDelegate,this.serializer),this.remoteDocumentCache=NE(this.serializer),this.Gr=new gC,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&ze("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new q(F.FAILED_PRECONDITION,ph);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new Rt(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async n=>{if(this.started)return e(n)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async n=>{n.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Hl(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(n=>{n||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(n=>this.isPrimary&&!n?this.bi(e).next(()=>!1):!!n&&this.Di(e).next(()=>!0))).catch(e=>{if(Gr(e))return U("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return U("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return jo(e).get("owner").next(n=>j.resolve(this.vi(n)))}Ci(e){return Hl(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",n=>{const r=Qe(n,"clientMetadata");return r.U().next(i=>{const s=this.xi(i,18e5),o=i.filter(a=>s.indexOf(a)===-1);return j.forEach(o,a=>r.delete(a.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const n of e)this.Vi.removeItem(this.Oi(n.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?j.resolve(!0):jo(e).get("owner").next(n=>{if(n!==null&&this.Mi(n.leaseTimestampMs,5e3)&&!this.Ni(n.ownerId)){if(this.vi(n)&&this.networkEnabled)return!0;if(!this.vi(n)){if(!n.allowTabSynchronization)throw new q(F.FAILED_PRECONDITION,ph);return!1}}return!(!this.networkEnabled||!this.inForeground)||Hl(e).U().next(r=>this.xi(r,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1})===void 0)}).next(n=>(this.isPrimary!==n&&U("IndexedDbPersistence",`Client ${n?"is":"is not"} eligible for a primary lease.`),n))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const n=new Df(e,Rt.oe);return this.bi(n).next(()=>this.Ci(n))}),this.Ri.close(),this.qi()}xi(e,n){return e.filter(r=>this.Mi(r.updateTimeMs,n)&&!this.Ni(r.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>Hl(e).U().next(n=>this.xi(n,18e5).map(r=>r.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,n){return Xu.lt(e,this.serializer,n,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new bC(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Ju.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,n,r){U("IndexedDbPersistence","Starting transaction:",e);const i=n==="readonly"?"readonly":"readwrite",s=function(c){return c===17?bN:c===16?TN:c===15?am:c===14?D1:c===13?C1:c===12?EN:c===11?N1:void W()}(this.hi);let o;return this.Ri.runTransaction(e,i,s,a=>(o=new Df(a,this.Qr?this.Qr.next():Rt.oe),n==="readwrite-primary"?this.wi(o).next(c=>!!c||this.Si(o)).next(c=>{if(!c)throw ze(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new q(F.FAILED_PRECONDITION,S1);return r(o)}).next(c=>this.Di(o).next(()=>c)):this.Ki(o).next(()=>r(o)))).then(a=>(o.raiseOnCommittedEvent(),a))}Ki(e){return jo(e).get("owner").next(n=>{if(n!==null&&this.Mi(n.leaseTimestampMs,5e3)&&!this.Ni(n.ownerId)&&!this.vi(n)&&!(this.li||this.allowTabSynchronization&&n.allowTabSynchronization))throw new q(F.FAILED_PRECONDITION,ph)})}Di(e){const n={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return jo(e).put("owner",n)}static D(){return Vr.D()}bi(e){const n=jo(e);return n.get("owner").next(r=>this.vi(r)?(U("IndexedDbPersistence","Releasing primary lease."),n.delete("owner")):j.resolve())}Mi(e,n){const r=Date.now();return!(e<r-n)&&(!(e>r)||(ze(`Detected an update time that is in the future: ${e} > ${r}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const n=/(?:Version|Mobile)\/1[456]/;l1()&&(navigator.appVersion.match(n)||navigator.userAgent.match(n))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var n;try{const r=((n=this.Vi)===null||n===void 0?void 0:n.getItem(this.Oi(e)))!==null;return U("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return ze("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){ze("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function jo(t){return Qe(t,"owner")}function Hl(t){return Qe(t,"clientMetadata")}function jE(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=te(),i=te();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new bm(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $C{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return l1()?8:R1(Ge())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new $C;return this.Xi(e,n,o).next(a=>{if(s.result=a,this.zi)return this.es(e,n,o,a.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(Xi()<=ie.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",Zi(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),j.resolve()):(Xi()<=ie.DEBUG&&U("QueryEngine","Query:",Zi(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Xi()<=ie.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",Zi(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ut(n))):j.resolve())}Yi(e,n){if(r_(n))return j.resolve(null);let r=Ut(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=Ff(n,null,"F"),r=Ut(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=te(...s);return this.Ji.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(c=>{const d=this.ts(n,a);return this.ns(n,d,o,c.readTime)?this.Yi(e,Ff(n,null,"F")):this.rs(e,d,n,c)}))})))}Zi(e,n,r,i){return r_(n)||i.isEqual(Y.min())?j.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(n,s);return this.ns(n,o,r,i)?j.resolve(null):(Xi()<=ie.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Zi(n)),this.rs(e,o,n,b1(i,-1)).next(a=>a))})}ts(e,n){let r=new pe(Q1(e));return n.forEach((i,s)=>{Za(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return Xi()<=ie.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",Zi(n)),this.Ji.getDocumentsMatchingQuery(e,n,Bt.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qC{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new _e(Z),this._s=new Qr(s=>Ai(s),Xa),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new CE(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function OE(t,e,n,r){return new qC(t,e,n,r)}async function ME(t,e){const n=G(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],a=[];let c=te();for(const d of i){o.push(d.batchId);for(const f of d.mutations)c=c.add(f.key)}for(const d of s){a.push(d.batchId);for(const f of d.mutations)c=c.add(f.key)}return n.localDocuments.getDocuments(r,c).next(d=>({hs:d,removedBatchIds:o,addedBatchIds:a}))})})}function KC(t,e){const n=G(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(a,c,d,f){const p=d.batch,g=p.keys();let S=j.resolve();return g.forEach(A=>{S=S.next(()=>f.getEntry(c,A)).next(T=>{const P=d.docVersions.get(A);Q(P!==null),T.version.compareTo(P)<0&&(p.applyToRemoteDocument(T,d),T.isValidDocument()&&(T.setReadTime(d.commitVersion),f.addEntry(T)))})}),S.next(()=>a.mutationQueue.removeMutationBatch(c,p))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let c=te();for(let d=0;d<a.mutationResults.length;++d)a.mutationResults[d].transformResults.length>0&&(c=c.add(a.batch.mutations[d].key));return c}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function LE(t){const e=G(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function HC(t,e){const n=G(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const a=[];e.targetChanges.forEach((f,p)=>{const g=i.get(p);if(!g)return;a.push(n.Ur.removeMatchingKeys(s,f.removedDocuments,p).next(()=>n.Ur.addMatchingKeys(s,f.addedDocuments,p)));let S=g.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?S=S.withResumeToken(Be.EMPTY_BYTE_STRING,Y.min()).withLastLimboFreeSnapshotVersion(Y.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),i=i.insert(p,S),function(T,P,y){return T.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-T.snapshotVersion.toMicroseconds()>=3e8?!0:y.addedDocuments.size+y.modifiedDocuments.size+y.removedDocuments.size>0}(g,S,f)&&a.push(n.Ur.updateTargetData(s,S))});let c=Mt(),d=te();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),a.push(WC(s,o,e.documentUpdates).next(f=>{c=f.Ps,d=f.Is})),!r.isEqual(Y.min())){const f=n.Ur.getLastRemoteSnapshotVersion(s).next(p=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));a.push(f)}return j.waitFor(a).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,c,d)).next(()=>c)}).then(s=>(n.os=i,s))}function WC(t,e,n){let r=te(),i=te();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=Mt();return n.forEach((a,c)=>{const d=s.get(a);c.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(a)),c.isNoDocument()&&c.version.isEqual(Y.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!d.isValidDocument()||c.version.compareTo(d.version)>0||c.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):U("LocalStore","Ignoring outdated watch update for ",a,". Current version:",d.version," Watch version:",c.version)}),{Ps:o,Is:i}})}function GC(t,e){const n=G(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function uu(t,e){const n=G(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,j.resolve(i)):n.Ur.allocateTargetId(r).next(o=>(i=new Mn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function $s(t,e,n){const r=G(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Gr(o))throw o;U("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function Wf(t,e,n){const r=G(t);let i=Y.min(),s=te();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,d,f){const p=G(c),g=p._s.get(f);return g!==void 0?j.resolve(p.os.get(g)):p.Ur.getTargetData(d,f)}(r,o,Ut(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,a.targetId).next(c=>{s=c})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?i:Y.min(),n?s:te())).next(a=>(zE(r,G1(e),a),{documents:a,Ts:s})))}function FE(t,e){const n=G(t),r=G(n.Ur),i=n.os.get(e);return i?Promise.resolve(i.target):n.persistence.runTransaction("Get target data","readonly",s=>r.ot(s,e).next(o=>o?o.target:null))}function UE(t,e){const n=G(t),r=n.us.get(e)||Y.min();return n.persistence.runTransaction("Get new document changes","readonly",i=>n.cs.getAllFromCollectionGroup(i,e,b1(r,-1),Number.MAX_SAFE_INTEGER)).then(i=>(zE(n,e,i),i))}function zE(t,e,n){let r=t.us.get(e)||Y.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}function C_(t,e){return`firestore_clients_${t}_${e}`}function D_(t,e,n){let r=`firestore_mutations_${t}_${n}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function mh(t,e){return`firestore_targets_${t}_${e}`}class du{constructor(e,n,r,i){this.user=e,this.batchId=n,this.state=r,this.error=i}static Rs(e,n,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new q(i.error.code,i.error.message))),o?new du(e,n,i.state,s):(ze("SharedClientState",`Failed to parse mutation state for ID '${n}': ${r}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class aa{constructor(e,n,r){this.targetId=e,this.state=n,this.error=r}static Rs(e,n){const r=JSON.parse(n);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new q(r.error.code,r.error.message))),s?new aa(e,r.state,i):(ze("SharedClientState",`Failed to parse target state for ID '${e}': ${n}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class hu{constructor(e,n){this.clientId=e,this.activeTargetIds=n}static Rs(e,n){const r=JSON.parse(n);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=hm();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=P1(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new hu(e,s):(ze("SharedClientState",`Failed to parse client data for instance '${e}': ${n}`),null)}}class Im{constructor(e,n){this.clientId=e,this.onlineState=n}static Rs(e){const n=JSON.parse(e);return typeof n=="object"&&["Unknown","Online","Offline"].indexOf(n.onlineState)!==-1&&typeof n.clientId=="string"?new Im(n.clientId,n.onlineState):(ze("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Gf{constructor(){this.activeTargetIds=hm()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class gh{constructor(e,n,r,i,s){this.window=e,this.ui=n,this.persistenceKey=r,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new _e(Z),this.started=!1,this.bs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=C_(this.persistenceKey,this.ps),this.vs=function(c){return`firestore_sequence_number_${c}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Gf),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(c){return`firestore_online_state_${c}`}(this.persistenceKey),this.Os=function(c){return`firestore_bundle_loaded_v2_${c}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const r of e){if(r===this.ps)continue;const i=this.getItem(C_(this.persistenceKey,r));if(i){const s=hu.Rs(r,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const n=this.storage.getItem(this.xs);if(n){const r=this.Ls(n);r&&this.Bs(r)}for(const r of this.bs)this.ws(r);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let n=!1;return this.Ss.forEach((r,i)=>{i.activeTargetIds.has(e)&&(n=!0)}),n}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,n,r){this.qs(e,n,r),this.Qs(e)}addLocalQueryTarget(e,n=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(mh(this.persistenceKey,e));if(i){const s=aa.Rs(e,i);s&&(r=s.state)}}return n&&this.Ks.fs(e),this.Ns(),r}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(mh(this.persistenceKey,e))}updateQueryState(e,n,r){this.$s(e,n,r)}handleUserChange(e,n,r){n.forEach(i=>{this.Qs(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const n=this.storage.getItem(e);return U("SharedClientState","READ",e,n),n}setItem(e,n){U("SharedClientState","SET",e,n),this.storage.setItem(e,n)}removeItem(e){U("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const n=e;if(n.storageArea===this.storage){if(U("SharedClientState","EVENT",n.key,n.newValue),n.key===this.Ds)return void ze("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(n.key!==null){if(this.Cs.test(n.key)){if(n.newValue==null){const r=this.Gs(n.key);return this.zs(r,null)}{const r=this.js(n.key,n.newValue);if(r)return this.zs(r.clientId,r)}}else if(this.Fs.test(n.key)){if(n.newValue!==null){const r=this.Hs(n.key,n.newValue);if(r)return this.Js(r)}}else if(this.Ms.test(n.key)){if(n.newValue!==null){const r=this.Ys(n.key,n.newValue);if(r)return this.Zs(r)}}else if(n.key===this.xs){if(n.newValue!==null){const r=this.Ls(n.newValue);if(r)return this.Bs(r)}}else if(n.key===this.vs){const r=function(s){let o=Rt.oe;if(s!=null)try{const a=JSON.parse(s);Q(typeof a=="number"),o=a}catch(a){ze("SharedClientState","Failed to read sequence number from WebStorage",a)}return o}(n.newValue);r!==Rt.oe&&this.sequenceNumberHandler(r)}else if(n.key===this.Os){const r=this.Xs(n.newValue);await Promise.all(r.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(n)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,n,r){const i=new du(this.currentUser,e,n,r),s=D_(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const n=D_(this.persistenceKey,this.currentUser,e);this.removeItem(n)}Us(e){const n={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(n))}$s(e,n,r){const i=mh(this.persistenceKey,e),s=new aa(e,n,r);this.setItem(i,s.Vs())}Ws(e){const n=JSON.stringify(Array.from(e));this.setItem(this.Os,n)}Gs(e){const n=this.Cs.exec(e);return n?n[1]:null}js(e,n){const r=this.Gs(e);return hu.Rs(r,n)}Hs(e,n){const r=this.Fs.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return du.Rs(new ut(s),i,n)}Ys(e,n){const r=this.Ms.exec(e),i=Number(r[1]);return aa.Rs(i,n)}Ls(e){return Im.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);U("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,n){const r=n?this.Ss.insert(e,n):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(r),o=[],a=[];return s.forEach(c=>{i.has(c)||o.push(c)}),i.forEach(c=>{s.has(c)||a.push(c)}),this.syncEngine.io(o,a).then(()=>{this.Ss=r})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let n=hm();return e.forEach((r,i)=>{n=n.unionWith(i.activeTargetIds)}),n}}class BE{constructor(){this.so=new Gf,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Gf,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QC{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){U("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){U("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wl=null;function yh(){return Wl===null?Wl=function(){return 268435456+Math.round(2147483648*Math.random())}():Wl++,"0x"+Wl.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YC={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JC{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct="WebChannelConnection";class XC extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,o){const a=yh(),c=this.xo(n,r.toUriEncodedString());U("RestConnection",`Sending RPC '${n}' ${a}:`,c,i);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,s,o),this.No(n,c,d,i).then(f=>(U("RestConnection",`Received RPC '${n}' ${a}: `,f),f),f=>{throw Ca("RestConnection",`RPC '${n}' ${a} failed with error: `,f,"url: ",c,"request:",i),f})}Lo(n,r,i,s,o,a){return this.Mo(n,r,i,s,o)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+no}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>n[o]=s),i&&i.headers.forEach((s,o)=>n[o]=s)}xo(n,r){const i=YC[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=yh();return new Promise((o,a)=>{const c=new y1;c.setWithCredentials(!0),c.listenOnce(v1.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case uc.NO_ERROR:const f=c.getResponseJson();U(ct,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case uc.TIMEOUT:U(ct,`RPC '${e}' ${s} timed out`),a(new q(F.DEADLINE_EXCEEDED,"Request time out"));break;case uc.HTTP_ERROR:const p=c.getStatus();if(U(ct,`RPC '${e}' ${s} failed with status:`,p,"response text:",c.getResponseText()),p>0){let g=c.getResponseJson();Array.isArray(g)&&(g=g[0]);const S=g==null?void 0:g.error;if(S&&S.status&&S.message){const A=function(P){const y=P.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf(y)>=0?y:F.UNKNOWN}(S.status);a(new q(A,S.message))}else a(new q(F.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new q(F.UNAVAILABLE,"Connection failed."));break;default:W()}}finally{U(ct,`RPC '${e}' ${s} completed.`)}});const d=JSON.stringify(i);U(ct,`RPC '${e}' ${s} sending request:`,i),c.send(n,"POST",d,r,15)})}Bo(e,n,r){const i=yh(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=w1(),a=x1(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(c.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const f=s.join("");U(ct,`Creating RPC '${e}' stream ${i}: ${f}`,c);const p=o.createWebChannel(f,c);let g=!1,S=!1;const A=new JC({Io:P=>{S?U(ct,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(g||(U(ct,`Opening RPC '${e}' stream ${i} transport.`),p.open(),g=!0),U(ct,`RPC '${e}' stream ${i} sending:`,P),p.send(P))},To:()=>p.close()}),T=(P,y,x)=>{P.listen(y,v=>{try{x(v)}catch(k){setTimeout(()=>{throw k},0)}})};return T(p,Bo.EventType.OPEN,()=>{S||(U(ct,`RPC '${e}' stream ${i} transport opened.`),A.yo())}),T(p,Bo.EventType.CLOSE,()=>{S||(S=!0,U(ct,`RPC '${e}' stream ${i} transport closed`),A.So())}),T(p,Bo.EventType.ERROR,P=>{S||(S=!0,Ca(ct,`RPC '${e}' stream ${i} transport errored:`,P),A.So(new q(F.UNAVAILABLE,"The operation could not be completed")))}),T(p,Bo.EventType.MESSAGE,P=>{var y;if(!S){const x=P.data[0];Q(!!x);const v=x,k=v.error||((y=v[0])===null||y===void 0?void 0:y.error);if(k){U(ct,`RPC '${e}' stream ${i} received error:`,k);const O=k.status;let M=function(_){const b=$e[_];if(b!==void 0)return lE(b)}(O),I=k.message;M===void 0&&(M=F.INTERNAL,I="Unknown error status: "+O+" with message "+k.message),S=!0,A.So(new q(M,I)),p.close()}else U(ct,`RPC '${e}' stream ${i} received:`,x),A.bo(x)}}),T(a,_1.STAT_EVENT,P=>{P.stat===Nf.PROXY?U(ct,`RPC '${e}' stream ${i} detected buffering proxy`):P.stat===Nf.NOPROXY&&U(ct,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{A.wo()},0),A}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $E(){return typeof window<"u"?window:null}function yc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(t){return new sC(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qE{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&U("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(e,n,r,i,s,o,a,c){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new qE(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===F.RESOURCE_EXHAUSTED?(ze(n.toString()),ze("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===F.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new q(F.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return U("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(U("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ZC extends KE{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=lC(this.serializer,e),r=function(s){if(!("targetChange"in s))return Y.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Y.min():o.readTime?Et(o.readTime):Y.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Bf(this.serializer),n.addTarget=function(s,o){let a;const c=o.target;if(a=ru(c)?{documents:gE(s,c)}:{query:yE(s,c)._t},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=dE(s,o.resumeToken);const d=Uf(s,o.expectedCount);d!==null&&(a.expectedCount=d)}else if(o.snapshotVersion.compareTo(Y.min())>0){a.readTime=Bs(s,o.snapshotVersion.toTimestamp());const d=Uf(s,o.expectedCount);d!==null&&(a.expectedCount=d)}return a}(this.serializer,e);const r=uC(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Bf(this.serializer),n.removeTarget=e,this.a_(n)}}class e2 extends KE{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return Q(!!e.streamToken),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=cC(e.writeResults,e.commitTime),r=Et(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Bf(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>ou(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t2 extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new q(F.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,zf(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new q(F.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Lo(e,zf(n,r),i,o,a,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new q(F.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class n2{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ze(n),this.D_=!1):U("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r2{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{zi(this)&&(U("RemoteStore","Restarting streams for network reachability change."),await async function(c){const d=G(c);d.L_.add(4),await nl(d),d.q_.set("Unknown"),d.L_.delete(4),await td(d)}(this))})}),this.q_=new n2(r,i)}}async function td(t){if(zi(t))for(const e of t.B_)await e(!0)}async function nl(t){for(const e of t.B_)await e(!1)}function nd(t,e){const n=G(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Rm(n)?km(n):so(n).r_()&&Sm(n,e))}function qs(t,e){const n=G(t),r=so(n);n.N_.delete(e),r.r_()&&HE(n,e),n.N_.size===0&&(r.r_()?r.o_():zi(n)&&n.q_.set("Unknown"))}function Sm(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Y.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}so(t).A_(e)}function HE(t,e){t.Q_.xe(e),so(t).R_(e)}function km(t){t.Q_=new tC({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),so(t).start(),t.q_.v_()}function Rm(t){return zi(t)&&!so(t).n_()&&t.N_.size>0}function zi(t){return G(t).L_.size===0}function WE(t){t.Q_=void 0}async function i2(t){t.q_.set("Online")}async function s2(t){t.N_.forEach((e,n)=>{Sm(t,e)})}async function o2(t,e){WE(t),Rm(t)?(t.q_.M_(e),km(t)):t.q_.set("Unknown")}async function a2(t,e,n){if(t.q_.set("Online"),e instanceof uE&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const a of s.targetIds)i.N_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.N_.delete(a),i.Q_.removeTarget(a))}(t,e)}catch(r){U("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await fu(t,r)}else if(e instanceof gc?t.Q_.Ke(e):e instanceof cE?t.Q_.He(e):t.Q_.We(e),!n.isEqual(Y.min()))try{const r=await LE(t.localStore);n.compareTo(r)>=0&&await function(s,o){const a=s.Q_.rt(o);return a.targetChanges.forEach((c,d)=>{if(c.resumeToken.approximateByteSize()>0){const f=s.N_.get(d);f&&s.N_.set(d,f.withResumeToken(c.resumeToken,o))}}),a.targetMismatches.forEach((c,d)=>{const f=s.N_.get(c);if(!f)return;s.N_.set(c,f.withResumeToken(Be.EMPTY_BYTE_STRING,f.snapshotVersion)),HE(s,c);const p=new Mn(f.target,c,d,f.sequenceNumber);Sm(s,p)}),s.remoteSyncer.applyRemoteEvent(a)}(t,n)}catch(r){U("RemoteStore","Failed to raise snapshot:",r),await fu(t,r)}}async function fu(t,e,n){if(!Gr(e))throw e;t.L_.add(1),await nl(t),t.q_.set("Offline"),n||(n=()=>LE(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{U("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await td(t)})}function GE(t,e){return e().catch(n=>fu(t,n,e))}async function io(t){const e=G(t),n=Br(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;l2(e);)try{const i=await GC(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,c2(e,i)}catch(i){await fu(e,i)}QE(e)&&YE(e)}function l2(t){return zi(t)&&t.O_.length<10}function c2(t,e){t.O_.push(e);const n=Br(t);n.r_()&&n.V_&&n.m_(e.mutations)}function QE(t){return zi(t)&&!Br(t).n_()&&t.O_.length>0}function YE(t){Br(t).start()}async function u2(t){Br(t).p_()}async function d2(t){const e=Br(t);for(const n of t.O_)e.m_(n.mutations)}async function h2(t,e,n){const r=t.O_.shift(),i=gm.from(r,e,n);await GE(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await io(t)}async function f2(t,e){e&&Br(t).V_&&await async function(r,i){if(function(o){return XN(o)&&o!==F.ABORTED}(i.code)){const s=r.O_.shift();Br(r).s_(),await GE(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await io(r)}}(t,e),QE(t)&&YE(t)}async function V_(t,e){const n=G(t);n.asyncQueue.verifyOperationInProgress(),U("RemoteStore","RemoteStore received new credentials");const r=zi(n);n.L_.add(3),await nl(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await td(n)}async function Qf(t,e){const n=G(t);e?(n.L_.delete(2),await td(n)):e||(n.L_.add(2),await nl(n),n.q_.set("Unknown"))}function so(t){return t.K_||(t.K_=function(n,r,i){const s=G(n);return s.w_(),new ZC(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:i2.bind(null,t),Ro:s2.bind(null,t),mo:o2.bind(null,t),d_:a2.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Rm(t)?km(t):t.q_.set("Unknown")):(await t.K_.stop(),WE(t))})),t.K_}function Br(t){return t.U_||(t.U_=function(n,r,i){const s=G(n);return s.w_(),new e2(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:u2.bind(null,t),mo:f2.bind(null,t),f_:d2.bind(null,t),g_:h2.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await io(t)):(await t.U_.stop(),t.O_.length>0&&(U("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new yn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,a=new Pm(e,n,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new q(F.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Am(t,e){if(ze("AsyncQueue",`${e}: ${t}`),Gr(t))return new q(F.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e){this.comparator=e?(n,r)=>e(n,r)||$.comparator(n.key,r.key):(n,r)=>$.comparator(n.key,r.key),this.keyedMap=$o(),this.sortedSet=new _e(this.comparator)}static emptySet(e){return new Es(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Es)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Es;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(){this.W_=new _e($.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):W():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class Ks{constructor(e,n,r,i,s,o,a,c,d){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=d}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new Ks(e,n,Es.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Gu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p2{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class m2{constructor(){this.queries=M_(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=G(n),s=i.queries;i.queries=M_(),s.forEach((o,a)=>{for(const c of a.j_)c.onError(r)})})(this,new q(F.ABORTED,"Firestore shutting down"))}}function M_(){return new Qr(t=>W1(t),Gu)}async function JE(t,e){const n=G(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new p2,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const a=Am(o,`Initialization of query '${Zi(e.query)}' failed`);return void e.onError(a)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&Nm(n)}async function XE(t,e){const n=G(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function g2(t,e){const n=G(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const a of o.j_)a.X_(i)&&(r=!0);o.z_=i}}r&&Nm(n)}function y2(t,e,n){const r=G(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function Nm(t){t.Y_.forEach(e=>{e.next()})}var Yf,L_;(L_=Yf||(Yf={})).ea="default",L_.Cache="cache";class ZE{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Ks(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=Ks.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Yf.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(e){this.key=e}}class tT{constructor(e){this.key=e}}class v2{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=te(),this.mutatedKeys=te(),this.Aa=Q1(e),this.Ra=new Es(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new O_,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,a=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,p)=>{const g=i.get(f),S=Za(this.query,p)?p:null,A=!!g&&this.mutatedKeys.has(g.key),T=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let P=!1;g&&S?g.data.isEqual(S.data)?A!==T&&(r.track({type:3,doc:S}),P=!0):this.ga(g,S)||(r.track({type:2,doc:S}),P=!0,(c&&this.Aa(S,c)>0||d&&this.Aa(S,d)<0)&&(a=!0)):!g&&S?(r.track({type:0,doc:S}),P=!0):g&&!S&&(r.track({type:1,doc:g}),P=!0,(c||d)&&(a=!0)),P&&(S?(o=o.add(S),s=T?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{Ra:o,fa:r,ns:a,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,p)=>function(S,A){const T=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W()}};return T(S)-T(A)}(f.type,p.type)||this.Aa(f.doc,p.doc)),this.pa(r),i=i!=null&&i;const a=n&&!i?this.ya():[],c=this.da.size===0&&this.current&&!i?1:0,d=c!==this.Ea;return this.Ea=c,o.length!==0||d?{snapshot:new Ks(this.query,e.Ra,s,o,e.mutatedKeys,c===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:a}:{wa:a}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new O_,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=te(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new tT(r))}),this.da.forEach(r=>{e.has(r)||n.push(new eT(r))}),n}ba(e){this.Ta=e.Ts,this.da=te();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return Ks.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class _2{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class x2{constructor(e){this.key=e,this.va=!1}}class w2{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Qr(a=>W1(a),Gu),this.Ma=new Map,this.xa=new Set,this.Oa=new _e($.comparator),this.Na=new Map,this.La=new Em,this.Ba={},this.ka=new Map,this.qa=Di.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function E2(t,e,n=!0){const r=rd(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await nT(r,e,n,!0),i}async function T2(t,e){const n=rd(t);await nT(n,e,!0,!1)}async function nT(t,e,n,r){const i=await uu(t.localStore,Ut(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let a;return r&&(a=await Cm(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&nd(t.remoteStore,i),a}async function Cm(t,e,n,r,i){t.Ka=(p,g,S)=>async function(T,P,y,x){let v=P.view.ma(y);v.ns&&(v=await Wf(T.localStore,P.query,!1).then(({documents:I})=>P.view.ma(I,v)));const k=x&&x.targetChanges.get(P.targetId),O=x&&x.targetMismatches.get(P.targetId)!=null,M=P.view.applyChanges(v,T.isPrimaryClient,k,O);return Jf(T,P.targetId,M.wa),M.snapshot}(t,p,g,S);const s=await Wf(t.localStore,e,!0),o=new v2(e,s.Ts),a=o.ma(s.documents),c=tl.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),d=o.applyChanges(a,t.isPrimaryClient,c);Jf(t,n,d.wa);const f=new _2(e,n,o);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),d.snapshot}async function b2(t,e,n){const r=G(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!Gu(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await $s(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&qs(r.remoteStore,i.targetId),Hs(r,i.targetId)}).catch(Wr)):(Hs(r,i.targetId),await $s(r.localStore,i.targetId,!0))}async function I2(t,e){const n=G(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),qs(n.remoteStore,r.targetId))}async function S2(t,e,n){const r=Om(t);try{const i=await function(o,a){const c=G(o),d=Ne.now(),f=a.reduce((S,A)=>S.add(A.key),te());let p,g;return c.persistence.runTransaction("Locally write mutations","readwrite",S=>{let A=Mt(),T=te();return c.cs.getEntries(S,f).next(P=>{A=P,A.forEach((y,x)=>{x.isValidDocument()||(T=T.add(y))})}).next(()=>c.localDocuments.getOverlayedDocuments(S,A)).next(P=>{p=P;const y=[];for(const x of a){const v=YN(x,p.get(x.key).overlayedDocument);v!=null&&y.push(new Zn(x.key,v,L1(v.value.mapValue),_t.exists(!0)))}return c.mutationQueue.addMutationBatch(S,d,y,a)}).next(P=>{g=P;const y=P.applyToLocalDocumentSet(p,T);return c.documentOverlayCache.saveOverlays(S,P.batchId,y)})}).then(()=>({batchId:g.batchId,changes:J1(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,a,c){let d=o.Ba[o.currentUser.toKey()];d||(d=new _e(Z)),d=d.insert(a,c),o.Ba[o.currentUser.toKey()]=d}(r,i.batchId,n),await Yr(r,i.changes),await io(r.remoteStore)}catch(i){const s=Am(i,"Failed to persist write");n.reject(s)}}async function rT(t,e){const n=G(t);try{const r=await HC(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Na.get(s);o&&(Q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?Q(o.va):i.removedDocuments.size>0&&(Q(o.va),o.va=!1))}),await Yr(n,r,e)}catch(r){await Wr(r)}}function F_(t,e,n){const r=G(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,o)=>{const a=o.view.Z_(e);a.snapshot&&i.push(a.snapshot)}),function(o,a){const c=G(o);c.onlineState=a;let d=!1;c.queries.forEach((f,p)=>{for(const g of p.j_)g.Z_(a)&&(d=!0)}),d&&Nm(c)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function k2(t,e,n){const r=G(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new _e($.comparator);o=o.insert(s,Ve.newNoDocument(s,Y.min()));const a=te().add(s),c=new el(Y.min(),new Map,new _e(Z),o,a);await rT(r,c),r.Oa=r.Oa.remove(s),r.Na.delete(e),Vm(r)}else await $s(r.localStore,e,!1).then(()=>Hs(r,e,n)).catch(Wr)}async function R2(t,e){const n=G(t),r=e.batch.batchId;try{const i=await KC(n.localStore,e);jm(n,r,null),Dm(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Yr(n,i)}catch(i){await Wr(i)}}async function P2(t,e,n){const r=G(t);try{const i=await function(o,a){const c=G(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return c.mutationQueue.lookupMutationBatch(d,a).next(p=>(Q(p!==null),f=p.keys(),c.mutationQueue.removeMutationBatch(d,p))).next(()=>c.mutationQueue.performConsistencyCheck(d)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(d,f,a)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>c.localDocuments.getDocuments(d,f))})}(r.localStore,e);jm(r,e,n),Dm(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Yr(r,i)}catch(i){await Wr(i)}}function Dm(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function jm(t,e,n){const r=G(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function Hs(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||iT(t,r)})}function iT(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(qs(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Vm(t))}function Jf(t,e,n){for(const r of n)r instanceof eT?(t.La.addReference(r.key,e),A2(t,r)):r instanceof tT?(U("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||iT(t,r.key)):W()}function A2(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(U("SyncEngine","New document in limbo: "+n),t.xa.add(r),Vm(t))}function Vm(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new $(de.fromString(e)),r=t.qa.next();t.Na.set(r,new x2(n)),t.Oa=t.Oa.insert(n,r),nd(t.remoteStore,new Mn(Ut(Wu(n.path)),r,"TargetPurposeLimboResolution",Rt.oe))}}async function Yr(t,e,n){const r=G(t),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((a,c)=>{o.push(r.Ka(c,e,n).then(d=>{var f;if((d||n)&&r.isPrimaryClient){const p=d?!d.fromCache:(f=n==null?void 0:n.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(d){i.push(d);const p=bm.Wi(c.targetId,d);s.push(p)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(c,d){const f=G(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>j.forEach(d,g=>j.forEach(g.$i,S=>f.persistence.referenceDelegate.addReference(p,g.targetId,S)).next(()=>j.forEach(g.Ui,S=>f.persistence.referenceDelegate.removeReference(p,g.targetId,S)))))}catch(p){if(!Gr(p))throw p;U("LocalStore","Failed to update sequence numbers: "+p)}for(const p of d){const g=p.targetId;if(!p.fromCache){const S=f.os.get(g),A=S.snapshotVersion,T=S.withLastLimboFreeSnapshotVersion(A);f.os=f.os.insert(g,T)}}}(r.localStore,s))}async function N2(t,e){const n=G(t);if(!n.currentUser.isEqual(e)){U("SyncEngine","User change. New user:",e.toKey());const r=await ME(n.localStore,e);n.currentUser=e,function(s,o){s.ka.forEach(a=>{a.forEach(c=>{c.reject(new q(F.CANCELLED,o))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Yr(n,r.hs)}}function C2(t,e){const n=G(t),r=n.Na.get(e);if(r&&r.va)return te().add(r.key);{let i=te();const s=n.Ma.get(e);if(!s)return i;for(const o of s){const a=n.Fa.get(o);i=i.unionWith(a.view.Va)}return i}}async function D2(t,e){const n=G(t),r=await Wf(n.localStore,e.query,!0),i=e.view.ba(r);return n.isPrimaryClient&&Jf(n,e.targetId,i.wa),i}async function j2(t,e){const n=G(t);return UE(n.localStore,e).then(r=>Yr(n,r))}async function V2(t,e,n,r){const i=G(t),s=await function(a,c){const d=G(a),f=G(d.mutationQueue);return d.persistence.runTransaction("Lookup mutation documents","readonly",p=>f.Mn(p,c).next(g=>g?d.localDocuments.getDocuments(p,g):j.resolve(null)))}(i.localStore,e);s!==null?(n==="pending"?await io(i.remoteStore):n==="acknowledged"||n==="rejected"?(jm(i,e,r||null),Dm(i,e),function(a,c){G(G(a).mutationQueue).On(c)}(i.localStore,e)):W(),await Yr(i,s)):U("SyncEngine","Cannot apply mutation batch with id: "+e)}async function O2(t,e){const n=G(t);if(rd(n),Om(n),e===!0&&n.Qa!==!0){const r=n.sharedClientState.getAllActiveQueryTargets(),i=await U_(n,r.toArray());n.Qa=!0,await Qf(n.remoteStore,!0);for(const s of i)nd(n.remoteStore,s)}else if(e===!1&&n.Qa!==!1){const r=[];let i=Promise.resolve();n.Ma.forEach((s,o)=>{n.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(Hs(n,o),$s(n.localStore,o,!0))),qs(n.remoteStore,o)}),await i,await U_(n,r),function(o){const a=G(o);a.Na.forEach((c,d)=>{qs(a.remoteStore,d)}),a.La.pr(),a.Na=new Map,a.Oa=new _e($.comparator)}(n),n.Qa=!1,await Qf(n.remoteStore,!1)}}async function U_(t,e,n){const r=G(t),i=[],s=[];for(const o of e){let a;const c=r.Ma.get(o);if(c&&c.length!==0){a=await uu(r.localStore,Ut(c[0]));for(const d of c){const f=r.Fa.get(d),p=await D2(r,f);p.snapshot&&s.push(p.snapshot)}}else{const d=await FE(r.localStore,o);a=await uu(r.localStore,d),await Cm(r,sT(d),o,!1,a.resumeToken)}i.push(a)}return r.Ca.d_(s),i}function sT(t){return H1(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function M2(t){return function(n){return G(G(n).persistence).Qi()}(G(t).localStore)}async function L2(t,e,n,r){const i=G(t);if(i.Qa)return void U("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(n){case"current":case"not-current":{const o=await UE(i.localStore,G1(s[0])),a=el.createSynthesizedRemoteEventForCurrentChange(e,n==="current",Be.EMPTY_BYTE_STRING);await Yr(i,o,a);break}case"rejected":await $s(i.localStore,e,!0),Hs(i,e,r);break;default:W()}}async function F2(t,e,n){const r=rd(t);if(r.Qa){for(const i of e){if(r.Ma.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){U("SyncEngine","Adding an already active target "+i);continue}const s=await FE(r.localStore,i),o=await uu(r.localStore,s);await Cm(r,sT(s),o.targetId,!1,o.resumeToken),nd(r.remoteStore,o)}for(const i of n)r.Ma.has(i)&&await $s(r.localStore,i,!1).then(()=>{qs(r.remoteStore,i),Hs(r,i)}).catch(Wr)}}function rd(t){const e=G(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=rT.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=C2.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=k2.bind(null,e),e.Ca.d_=g2.bind(null,e.eventManager),e.Ca.$a=y2.bind(null,e.eventManager),e}function Om(t){const e=G(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=R2.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=P2.bind(null,e),e}class Ua{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ed(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return OE(this.persistence,new VE,e.initialUser,this.serializer)}Ga(e){return new DE(Zu.Zr,this.serializer)}Wa(e){return new BE}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ua.provider={build:()=>new Ua};class oT extends Ua{constructor(e,n,r){super(),this.Ja=e,this.cacheSizeBytes=n,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Om(this.Ja.syncEngine),await io(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return OE(this.persistence,new VE,e.initialUser,this.serializer)}ja(e,n){const r=this.persistence.referenceDelegate.garbageCollector;return new kC(r,e.asyncQueue,n)}Ha(e,n){const r=new sN(n,this.persistence);return new iN(e.asyncQueue,r)}Ga(e){const n=jE(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?It.withCacheSize(this.cacheSizeBytes):It.DEFAULT;return new Tm(this.synchronizeTabs,n,e.clientId,r,e.asyncQueue,$E(),yc(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new BE}}class U2 extends oT{constructor(e,n){super(e,n,!1),this.Ja=e,this.cacheSizeBytes=n,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const n=this.Ja.syncEngine;this.sharedClientState instanceof gh&&(this.sharedClientState.syncEngine={no:V2.bind(null,n),ro:L2.bind(null,n),io:F2.bind(null,n),Qi:M2.bind(null,n),eo:j2.bind(null,n)},await this.sharedClientState.start()),await this.persistence.yi(async r=>{await O2(this.Ja.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}Wa(e){const n=$E();if(!gh.D(n))throw new q(F.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=jE(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new gh(n,e.asyncQueue,r,e.clientId,e.initialUser)}}class za{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>F_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=N2.bind(null,this.syncEngine),await Qf(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new m2}()}createDatastore(e){const n=ed(e.databaseInfo.databaseId),r=function(s){return new XC(s)}(e.databaseInfo);return function(s,o,a,c){return new t2(s,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,a){return new r2(r,i,s,o,a)}(this.localStore,this.datastore,e.asyncQueue,n=>F_(this.syncEngine,n,0),function(){return j_.D()?new j_:new QC}())}createSyncEngine(e,n){return function(i,s,o,a,c,d,f){const p=new w2(i,s,o,a,c,d);return f&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=G(i);U("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await nl(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}za.provider={build:()=>new za};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):ze("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z2{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=ut.UNAUTHENTICATED,this.clientId=E1.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{U("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(U("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new yn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Am(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function vh(t,e){t.asyncQueue.verifyOperationInProgress(),U("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await ME(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function z_(t,e){t.asyncQueue.verifyOperationInProgress();const n=await B2(t);U("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>V_(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>V_(e.remoteStore,i)),t._onlineComponents=e}async function B2(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){U("FirestoreClient","Using user provided OfflineComponentProvider");try{await vh(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===F.FAILED_PRECONDITION||i.code===F.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;Ca("Error using user provided cache. Falling back to memory cache: "+n),await vh(t,new Ua)}}else U("FirestoreClient","Using default OfflineComponentProvider"),await vh(t,new Ua);return t._offlineComponents}async function lT(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(U("FirestoreClient","Using user provided OnlineComponentProvider"),await z_(t,t._uninitializedComponentsProvider._online)):(U("FirestoreClient","Using default OnlineComponentProvider"),await z_(t,new za))),t._onlineComponents}function $2(t){return lT(t).then(e=>e.syncEngine)}async function cT(t){const e=await lT(t),n=e.eventManager;return n.onListen=E2.bind(null,e.syncEngine),n.onUnlisten=b2.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=T2.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=I2.bind(null,e.syncEngine),n}function q2(t,e,n={}){const r=new yn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,a,c,d){const f=new aT({next:g=>{f.Za(),o.enqueueAndForget(()=>XE(s,p));const S=g.docs.has(a);!S&&g.fromCache?d.reject(new q(F.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&g.fromCache&&c&&c.source==="server"?d.reject(new q(F.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new ZE(Wu(a.path),f,{includeMetadataChanges:!0,_a:!0});return JE(s,p)}(await cT(t),t.asyncQueue,e,n,r)),r.promise}function K2(t,e,n={}){const r=new yn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,a,c,d){const f=new aT({next:g=>{f.Za(),o.enqueueAndForget(()=>XE(s,p)),g.fromCache&&c.source==="server"?d.reject(new q(F.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new ZE(a,f,{includeMetadataChanges:!0,_a:!0});return JE(s,p)}(await cT(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uT(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B_=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dT(t,e,n){if(!n)throw new q(F.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function H2(t,e,n,r){if(e===!0&&r===!0)throw new q(F.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function $_(t){if(!$.isDocumentKey(t))throw new q(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function q_(t){if($.isDocumentKey(t))throw new q(F.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Mm(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":W()}function Qn(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new q(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Mm(t);throw new q(F.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new q(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new q(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}H2("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=uT((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new q(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new q(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new q(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Lm{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new K_({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new q(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new q(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new K_(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new GA;switch(r.type){case"firstParty":return new JA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new q(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=B_.get(n);r&&(U("ComponentProvider","Removing Datastore"),B_.delete(n),r.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new id(this.firestore,e,this._query)}}class Dt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Or(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Dt(this.firestore,e,this._key)}}class Or extends id{constructor(e,n,r){super(e,n,Wu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Dt(this.firestore,null,new $(e))}withConverter(e){return new Or(this.firestore,e,this._path)}}function pu(t,e,...n){if(t=Oe(t),dT("collection","path",e),t instanceof Lm){const r=de.fromString(e,...n);return q_(r),new Or(t,null,r)}{if(!(t instanceof Dt||t instanceof Or))throw new q(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(de.fromString(e,...n));return q_(r),new Or(t.firestore,null,r)}}function _i(t,e,...n){if(t=Oe(t),arguments.length===1&&(e=E1.newId()),dT("doc","path",e),t instanceof Lm){const r=de.fromString(e,...n);return $_(r),new Dt(t,null,new $(r))}{if(!(t instanceof Dt||t instanceof Or))throw new q(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(de.fromString(e,...n));return $_(r),new Dt(t.firestore,t instanceof Or?t.converter:null,new $(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new qE(this,"async_queue_retry"),this.Vu=()=>{const r=yc();r&&U("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=yc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=yc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new yn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Gr(e))throw e;U("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw ze("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=Pm.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&W()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class oo extends Lm{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new H_,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new H_(e),this._firestoreClient=void 0,await e}}}function W2(t,e,n){n||(n="(default)");const r=Bu(t,"firestore");if(r.isInitialized(n)){const i=r.getImmediate({identifier:n}),s=r.getOptions(n);if(Aa(s,e))return i;throw new q(F.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new q(F.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new q(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:n})}function Fm(t){if(t._terminated)throw new q(F.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||G2(t),t._firestoreClient}function G2(t){var e,n,r;const i=t._freezeSettings(),s=function(a,c,d,f){return new SN(a,c,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,uT(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new z2(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(a){const c=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(c),_online:c}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ws(Be.fromBase64String(e))}catch(n){throw new q(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Ws(Be.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new q(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Re(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new q(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new q(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Z(this._lat,e._lat)||Z(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q2=/^__.*__$/;class Y2{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Zn(e,this.data,this.fieldMask,n,this.fieldTransforms):new ro(e,this.data,n,this.fieldTransforms)}}class hT{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Zn(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function fT(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W()}}class Bm{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Bm(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return mu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(fT(this.Cu)&&Q2.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class J2{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||ed(e)}Qu(e,n,r,i=!1){return new Bm({Cu:e,methodName:n,qu:r,path:Re.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function $m(t){const e=t._freezeSettings(),n=ed(t._databaseId);return new J2(t._databaseId,!!e.ignoreUndefinedProperties,n)}function pT(t,e,n,r,i,s={}){const o=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);Km("Data must be an object, but it was:",o,r);const a=mT(r,o);let c,d;if(s.merge)c=new Pt(o.fieldMask),d=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const p of s.mergeFields){const g=Xf(e,p,n);if(!o.contains(g))throw new q(F.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);yT(f,g)||f.push(g)}c=new Pt(f),d=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,d=o.fieldTransforms;return new Y2(new ht(a),c,d)}class ad extends od{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ad}}class qm extends od{_toFieldTransform(e){return new iE(e.path,new Fs)}isEqual(e){return e instanceof qm}}function X2(t,e,n,r){const i=t.Qu(1,e,n);Km("Data must be an object, but it was:",i,r);const s=[],o=ht.empty();Ui(r,(c,d)=>{const f=Hm(e,c,n);d=Oe(d);const p=i.Nu(f);if(d instanceof ad)s.push(f);else{const g=ld(d,p);g!=null&&(s.push(f),o.set(f,g))}});const a=new Pt(s);return new hT(o,a,i.fieldTransforms)}function Z2(t,e,n,r,i,s){const o=t.Qu(1,e,n),a=[Xf(e,r,n)],c=[i];if(s.length%2!=0)throw new q(F.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<s.length;g+=2)a.push(Xf(e,s[g])),c.push(s[g+1]);const d=[],f=ht.empty();for(let g=a.length-1;g>=0;--g)if(!yT(d,a[g])){const S=a[g];let A=c[g];A=Oe(A);const T=o.Nu(S);if(A instanceof ad)d.push(S);else{const P=ld(A,T);P!=null&&(d.push(S),f.set(S,P))}}const p=new Pt(d);return new hT(f,p,o.fieldTransforms)}function ld(t,e){if(gT(t=Oe(t)))return Km("Unsupported field value:",e,t),mT(t,e);if(t instanceof od)return function(r,i){if(!fT(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const a of r){let c=ld(a,i.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=Oe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return qN(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ne.fromDate(r);return{timestampValue:Bs(i.serializer,s)}}if(r instanceof Ne){const s=new Ne(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Bs(i.serializer,s)}}if(r instanceof Um)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ws)return{bytesValue:dE(i.serializer,r._byteString)};if(r instanceof Dt){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:_m(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof zm)return function(o,a){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw a.Bu("VectorValues must only contain numeric values.");return fm(a.serializer,c)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${Mm(r)}`)}(t,e)}function mT(t,e){const n={};return j1(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ui(t,(r,i)=>{const s=ld(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function gT(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ne||t instanceof Um||t instanceof Ws||t instanceof Dt||t instanceof od||t instanceof zm)}function Km(t,e,n){if(!gT(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=Mm(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Xf(t,e,n){if((e=Oe(e))instanceof sd)return e._internalPath;if(typeof e=="string")return Hm(t,e);throw mu("Field path arguments must be of type string or ",t,!1,void 0,n)}const eD=new RegExp("[~\\*/\\[\\]]");function Hm(t,e,n){if(e.search(eD)>=0)throw mu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new sd(...e.split("."))._internalPath}catch{throw mu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function mu(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new q(F.INVALID_ARGUMENT,a+t+c)}function yT(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vT{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Dt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new tD(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(_T("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class tD extends vT{data(){return super.data()}}function _T(t,e){return typeof e=="string"?Hm(t,e):e instanceof sd?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nD(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new q(F.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class rD{convertValue(e,n="none"){switch(Pi(e)){case 0:return null;case 1:return e.booleanValue;case 2:return be(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Ur(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw W()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Ui(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>be(o.doubleValue));return new zm(s)}convertGeoPoint(e){return new Um(be(e.latitude),be(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=cm(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Oa(e));default:return null}}convertTimestamp(e){const n=Gn(e);return new Ne(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=de.fromString(e);Q(wE(r));const i=new Ri(r.get(1),r.get(3)),s=new $(r.popFirst(5));return i.isEqual(n)||ze(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xT(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class wT extends vT{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new vc(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(_T("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class vc extends wT{data(e={}){return super.data(e)}}class iD{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Ho(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new vc(this._firestore,this._userDataWriter,r.key,r,new Ho(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new q(F.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(a=>{const c=new vc(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Ho(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(a=>s||a.type!==3).map(a=>{const c=new vc(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Ho(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,f=-1;return a.type!==0&&(d=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),f=o.indexOf(a.doc.key)),{type:sD(a.type),doc:c,oldIndex:d,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function sD(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ET(t){t=Qn(t,Dt);const e=Qn(t.firestore,oo);return q2(Fm(e),t._key).then(n=>oD(e,t,n))}class TT extends rD{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ws(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Dt(this.firestore,null,n)}}function bT(t){t=Qn(t,id);const e=Qn(t.firestore,oo),n=Fm(e),r=new TT(e);return nD(t._query),K2(n,t._query).then(i=>new iD(e,r,t,i))}function W_(t,e,n){t=Qn(t,Dt);const r=Qn(t.firestore,oo),i=xT(t.converter,e,n);return Wm(r,[pT($m(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,_t.none())])}function IT(t,e,n,...r){t=Qn(t,Dt);const i=Qn(t.firestore,oo),s=$m(i);let o;return o=typeof(e=Oe(e))=="string"||e instanceof sd?Z2(s,"updateDoc",t._key,e,n,r):X2(s,"updateDoc",t._key,e),Wm(i,[o.toMutation(t._key,_t.exists(!0))])}function ST(t,e){const n=Qn(t.firestore,oo),r=_i(t),i=xT(t.converter,e);return Wm(n,[pT($m(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,_t.exists(!1))]).then(()=>r)}function Wm(t,e){return function(r,i){const s=new yn;return r.asyncQueue.enqueueAndForget(async()=>S2(await $2(r),i,s)),s.promise}(Fm(t),e)}function oD(t,e,n){const r=n.docs.get(e._key),i=new TT(t);return new wT(t,i,e._key,r,new Ho(n.hasPendingWrites,n.fromCache),e.converter)}class aD{constructor(e){let n;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),n=e.tabManager):(n=dD(),n._initialize(e)),this._onlineComponentProvider=n._onlineComponentProvider,this._offlineComponentProvider=n._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function lD(t){return new aD(t)}class cD{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=za.provider,this._offlineComponentProvider={build:n=>new oT(n,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class uD{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=za.provider,this._offlineComponentProvider={build:n=>new U2(n,e==null?void 0:e.cacheSizeBytes)}}}function dD(t){return new cD(void 0)}function hD(){return new uD}function Gs(){return new qm("serverTimestamp")}(function(e,n=!0){(function(i){no=i})(Fi),Si(new Fr("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),a=new oo(new QA(r.getProvider("auth-internal")),new ZA(r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new q(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ri(d.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),a._setSettings(s),a},"PUBLIC").setMultipleInstances(!0)),gn(zv,"4.7.3",e),gn(zv,"4.7.3","esm2017")})();function Gm(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function kT(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const fD=kT,RT=new Ya("auth","Firebase",kT());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu=new nm("@firebase/auth");function pD(t,...e){gu.logLevel<=ie.WARN&&gu.warn(`Auth (${Fi}): ${t}`,...e)}function _c(t,...e){gu.logLevel<=ie.ERROR&&gu.error(`Auth (${Fi}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t,...e){throw Qm(t,...e)}function vn(t,...e){return Qm(t,...e)}function PT(t,e,n){const r=Object.assign(Object.assign({},fD()),{[e]:n});return new Ya("auth","Firebase",r).create(e,{appName:t.name})}function Bn(t){return PT(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Qm(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return RT.create(t,...e)}function J(t,e,...n){if(!t)throw Qm(e,...n)}function Ln(t){const e="INTERNAL ASSERTION FAILED: "+t;throw _c(e),new Error(e)}function Yn(t,e){t||Ln(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zf(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function mD(){return G_()==="http:"||G_()==="https:"}function G_(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gD(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(mD()||kP()||"connection"in navigator)?navigator.onLine:!0}function yD(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,n){this.shortDelay=e,this.longDelay=n,Yn(n>e,"Short delay should be less than long delay!"),this.isMobile=bP()||RP()}get(){return gD()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ym(t,e){Yn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AT{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ln("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ln("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ln("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vD={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _D=new rl(3e4,6e4);function er(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function In(t,e,n,r,i={}){return NT(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=Ja(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const d=Object.assign({method:e,headers:c},s);return SP()||(d.referrerPolicy="no-referrer"),AT.fetch()(CT(t,t.config.apiHost,n,a),d)})}async function NT(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},vD),e);try{const i=new wD(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Gl(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,d]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Gl(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Gl(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Gl(t,"user-disabled",o);const f=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw PT(t,f,d);on(t,f)}}catch(i){if(i instanceof bn)throw i;on(t,"network-request-failed",{message:String(i)})}}async function il(t,e,n,r,i={}){const s=await In(t,e,n,r,i);return"mfaPendingCredential"in s&&on(t,"multi-factor-auth-required",{_serverResponse:s}),s}function CT(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Ym(t.config,i):`${t.config.apiScheme}://${i}`}function xD(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class wD{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(vn(this.auth,"network-request-failed")),_D.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Gl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=vn(t,e,r);return i.customData._tokenResponse=n,i}function Q_(t){return t!==void 0&&t.enterprise!==void 0}class ED{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return xD(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function TD(t,e){return In(t,"GET","/v2/recaptchaConfig",er(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bD(t,e){return In(t,"POST","/v1/accounts:delete",e)}async function DT(t,e){return In(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function la(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ID(t,e=!1){const n=Oe(t),r=await n.getIdToken(e),i=Jm(r);J(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:la(_h(i.auth_time)),issuedAtTime:la(_h(i.iat)),expirationTime:la(_h(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function _h(t){return Number(t)*1e3}function Jm(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return _c("JWT malformed, contained fewer than 3 sections"),null;try{const i=i1(n);return i?JSON.parse(i):(_c("Failed to decode base64 JWT payload"),null)}catch(i){return _c("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Y_(t){const e=Jm(t);return J(e,"internal-error"),J(typeof e.exp<"u","internal-error"),J(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qs(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof bn&&SD(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function SD({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kD{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=la(this.lastLoginAt),this.creationTime=la(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yu(t){var e;const n=t.auth,r=await t.getIdToken(),i=await Qs(t,DT(n,{idToken:r}));J(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?jT(s.providerUserInfo):[],a=PD(t.providerData,o),c=t.isAnonymous,d=!(t.email&&s.passwordHash)&&!(a!=null&&a.length),f=c?d:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new ep(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(t,p)}async function RD(t){const e=Oe(t);await yu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function PD(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function jT(t){return t.map(e=>{var{providerId:n}=e,r=Gm(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AD(t,e){const n=await NT(t,{},async()=>{const r=Ja({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=CT(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",AT.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ND(t,e){return In(t,"POST","/v2/accounts:revokeToken",er(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){J(e.idToken,"internal-error"),J(typeof e.idToken<"u","internal-error"),J(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Y_(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){J(e.length!==0,"internal-error");const n=Y_(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(J(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await AD(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Ts;return r&&(J(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(J(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(J(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ts,this.toJSON())}_performRefresh(){return Ln("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ar(t,e){J(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Fn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=Gm(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new kD(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ep(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await Qs(this,this.stsTokenManager.getToken(this.auth,e));return J(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ID(this,e)}reload(){return RD(this)}_assign(e){this!==e&&(J(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Fn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){J(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await yu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(un(this.auth.app))return Promise.reject(Bn(this.auth));const e=await this.getIdToken();return await Qs(this,bD(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,a,c,d,f;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(i=n.email)!==null&&i!==void 0?i:void 0,S=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,A=(o=n.photoURL)!==null&&o!==void 0?o:void 0,T=(a=n.tenantId)!==null&&a!==void 0?a:void 0,P=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,y=(d=n.createdAt)!==null&&d!==void 0?d:void 0,x=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:v,emailVerified:k,isAnonymous:O,providerData:M,stsTokenManager:I}=n;J(v&&I,e,"internal-error");const E=Ts.fromJSON(this.name,I);J(typeof v=="string",e,"internal-error"),ar(p,e.name),ar(g,e.name),J(typeof k=="boolean",e,"internal-error"),J(typeof O=="boolean",e,"internal-error"),ar(S,e.name),ar(A,e.name),ar(T,e.name),ar(P,e.name),ar(y,e.name),ar(x,e.name);const _=new Fn({uid:v,auth:e,email:g,emailVerified:k,displayName:p,isAnonymous:O,photoURL:A,phoneNumber:S,tenantId:T,stsTokenManager:E,createdAt:y,lastLoginAt:x});return M&&Array.isArray(M)&&(_.providerData=M.map(b=>Object.assign({},b))),P&&(_._redirectEventId=P),_}static async _fromIdTokenResponse(e,n,r=!1){const i=new Ts;i.updateFromServerResponse(n);const s=new Fn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await yu(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];J(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?jT(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new Ts;a.updateFromIdToken(r);const c=new Fn({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new ep(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,d),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J_=new Map;function Un(t){Yn(t instanceof Function,"Expected a class definition");let e=J_.get(t);return e?(Yn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,J_.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VT{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}VT.type="NONE";const X_=VT;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(t,e,n){return`firebase:${t}:${e}:${n}`}class bs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=xc(this.userKey,i.apiKey,s),this.fullPersistenceKey=xc("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Fn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new bs(Un(X_),e,r);const i=(await Promise.all(n.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||Un(X_);const o=xc(r,e.config.apiKey,e.name);let a=null;for(const d of n)try{const f=await d._get(o);if(f){const p=Fn._fromJSON(e,f);d!==s&&(a=p),s=d;break}}catch{}const c=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new bs(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new bs(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z_(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(FT(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(OT(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(zT(e))return"Blackberry";if(BT(e))return"Webos";if(MT(e))return"Safari";if((e.includes("chrome/")||LT(e))&&!e.includes("edge/"))return"Chrome";if(UT(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function OT(t=Ge()){return/firefox\//i.test(t)}function MT(t=Ge()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function LT(t=Ge()){return/crios\//i.test(t)}function FT(t=Ge()){return/iemobile/i.test(t)}function UT(t=Ge()){return/android/i.test(t)}function zT(t=Ge()){return/blackberry/i.test(t)}function BT(t=Ge()){return/webos/i.test(t)}function Xm(t=Ge()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function CD(t=Ge()){var e;return Xm(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function DD(){return PP()&&document.documentMode===10}function $T(t=Ge()){return Xm(t)||UT(t)||BT(t)||zT(t)||/windows phone/i.test(t)||FT(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qT(t,e=[]){let n;switch(t){case"Browser":n=Z_(Ge());break;case"Worker":n=`${Z_(Ge())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Fi}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jD{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VD(t,e={}){return In(t,"GET","/v2/passwordPolicy",er(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OD=6;class MD{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:OD,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,a;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LD{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new e0(this),this.idTokenSubscription=new e0(this),this.beforeStateQueue=new jD(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=RT,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Un(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await bs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await DT(this,{idToken:e}),r=await Fn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(un(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return J(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await yu(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=yD()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(un(this.app))return Promise.reject(Bn(this));const n=e?Oe(e):null;return n&&J(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&J(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return un(this.app)?Promise.reject(Bn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return un(this.app)?Promise.reject(Bn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Un(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await VD(this),n=new MD(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ya("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await ND(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Un(e)||this._popupRedirectResolver;J(n,this,"argument-error"),this.redirectPersistenceManager=await bs.create(this,[Un(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(J(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return J(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=qT(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&pD(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Jr(t){return Oe(t)}class e0{constructor(e){this.auth=e,this.observer=null,this.addObserver=VP(n=>this.observer=n)}get next(){return J(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cd={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function FD(t){cd=t}function KT(t){return cd.loadJS(t)}function UD(){return cd.recaptchaEnterpriseScript}function zD(){return cd.gapiScript}function BD(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const $D="recaptcha-enterprise",qD="NO_RECAPTCHA";class KD{constructor(e){this.type=$D,this.auth=Jr(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{TD(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const d=new ED(c);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,o(d.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){const c=window.grecaptcha;Q_(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(d=>{o(d)}).catch(()=>{o(qD)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!n&&Q_(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=UD();c.length!==0&&(c+=a),KT(c).then(()=>{i(a,s,o)}).catch(d=>{o(d)})}}).catch(a=>{o(a)})})}}async function t0(t,e,n,r=!1){const i=new KD(t);let s;try{s=await i.verify(n)}catch{s=await i.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function vu(t,e,n,r){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await t0(t,e,n,n==="getOobCode");return r(t,s)}else return r(t,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await t0(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(s)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HD(t,e){const n=Bu(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Aa(s,e??{}))return i;on(i,"already-initialized")}return n.initialize({options:e})}function WD(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Un);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function GD(t,e,n){const r=Jr(t);J(r._canInitEmulator,r,"emulator-config-failed"),J(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=HT(e),{host:o,port:a}=QD(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),YD()}function HT(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function QD(t){const e=HT(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:n0(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:n0(o)}}}function n0(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function YD(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ln("not implemented")}_getIdTokenResponse(e){return Ln("not implemented")}_linkToIdToken(e,n){return Ln("not implemented")}_getReauthenticationResolver(e){return Ln("not implemented")}}async function JD(t,e){return In(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XD(t,e){return il(t,"POST","/v1/accounts:signInWithPassword",er(t,e))}async function ZD(t,e){return In(t,"POST","/v1/accounts:sendOobCode",er(t,e))}async function ej(t,e){return ZD(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tj(t,e){return il(t,"POST","/v1/accounts:signInWithEmailLink",er(t,e))}async function nj(t,e){return il(t,"POST","/v1/accounts:signInWithEmailLink",er(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba extends Zm{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Ba(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Ba(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return vu(e,n,"signInWithPassword",XD);case"emailLink":return tj(e,{email:this._email,oobCode:this._password});default:on(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return vu(e,r,"signUpPassword",JD);case"emailLink":return nj(e,{idToken:n,email:this._email,oobCode:this._password});default:on(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Is(t,e){return il(t,"POST","/v1/accounts:signInWithIdp",er(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rj="http://localhost";class ji extends Zm{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ji(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):on("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=Gm(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new ji(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Is(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Is(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Is(e,n)}buildRequest(){const e={requestUri:rj,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ja(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ij(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function sj(t){const e=Uo(zo(t)).link,n=e?Uo(zo(e)).deep_link_id:null,r=Uo(zo(t)).deep_link_id;return(r?Uo(zo(r)).link:null)||r||n||e||t}class eg{constructor(e){var n,r,i,s,o,a;const c=Uo(zo(e)),d=(n=c.apiKey)!==null&&n!==void 0?n:null,f=(r=c.oobCode)!==null&&r!==void 0?r:null,p=ij((i=c.mode)!==null&&i!==void 0?i:null);J(d&&f&&p,"argument-error"),this.apiKey=d,this.operation=p,this.code=f,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=sj(e);try{return new eg(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(){this.providerId=ao.PROVIDER_ID}static credential(e,n){return Ba._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=eg.parseLink(n);return J(r,"argument-error"),Ba._fromEmailAndCode(e,r.code,r.tenantId)}}ao.PROVIDER_ID="password";ao.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ao.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl extends WT{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr extends sl{constructor(){super("facebook.com")}static credential(e){return ji._fromParams({providerId:pr.PROVIDER_ID,signInMethod:pr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return pr.credentialFromTaggedObject(e)}static credentialFromError(e){return pr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return pr.credential(e.oauthAccessToken)}catch{return null}}}pr.FACEBOOK_SIGN_IN_METHOD="facebook.com";pr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr extends sl{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ji._fromParams({providerId:mr.PROVIDER_ID,signInMethod:mr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return mr.credentialFromTaggedObject(e)}static credentialFromError(e){return mr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return mr.credential(n,r)}catch{return null}}}mr.GOOGLE_SIGN_IN_METHOD="google.com";mr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr extends sl{constructor(){super("github.com")}static credential(e){return ji._fromParams({providerId:gr.PROVIDER_ID,signInMethod:gr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return gr.credentialFromTaggedObject(e)}static credentialFromError(e){return gr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return gr.credential(e.oauthAccessToken)}catch{return null}}}gr.GITHUB_SIGN_IN_METHOD="github.com";gr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr extends sl{constructor(){super("twitter.com")}static credential(e,n){return ji._fromParams({providerId:yr.PROVIDER_ID,signInMethod:yr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return yr.credentialFromTaggedObject(e)}static credentialFromError(e){return yr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return yr.credential(n,r)}catch{return null}}}yr.TWITTER_SIGN_IN_METHOD="twitter.com";yr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oj(t,e){return il(t,"POST","/v1/accounts:signUp",er(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Fn._fromIdTokenResponse(e,r,i),o=r0(r);return new Vi({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=r0(r);return new Vi({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function r0(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u extends bn{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,_u.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new _u(e,n,r,i)}}function GT(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?_u._fromErrorAndOperation(t,s,e,r):s})}async function aj(t,e,n=!1){const r=await Qs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Vi._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lj(t,e,n=!1){const{auth:r}=t;if(un(r.app))return Promise.reject(Bn(r));const i="reauthenticate";try{const s=await Qs(t,GT(r,i,e,t),n);J(s.idToken,r,"internal-error");const o=Jm(s.idToken);J(o,r,"internal-error");const{sub:a}=o;return J(t.uid===a,r,"user-mismatch"),Vi._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&on(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QT(t,e,n=!1){if(un(t.app))return Promise.reject(Bn(t));const r="signIn",i=await GT(t,r,e),s=await Vi._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function cj(t,e){return QT(Jr(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YT(t){const e=Jr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function uj(t,e,n){const r=Jr(t);await vu(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",ej)}async function i0(t,e,n){if(un(t.app))return Promise.reject(Bn(t));const r=Jr(t),o=await vu(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",oj).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&YT(t),c}),a=await Vi._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(a.user),a}function dj(t,e,n){return un(t.app)?Promise.reject(Bn(t)):cj(Oe(t),ao.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&YT(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hj(t,e){return In(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function s0(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Oe(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await Qs(r,hj(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function fj(t,e,n,r){return Oe(t).onIdTokenChanged(e,n,r)}function pj(t,e,n){return Oe(t).beforeAuthStateChanged(e,n)}function mj(t,e,n,r){return Oe(t).onAuthStateChanged(e,n,r)}function gj(t){return Oe(t).signOut()}const xu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(xu,"1"),this.storage.removeItem(xu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yj=1e3,vj=10;class XT extends JT{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=$T(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);DD()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,vj):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},yj)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}XT.type="LOCAL";const _j=XT;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT extends JT{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ZT.type="SESSION";const eb=ZT;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xj(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new ud(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async d=>d(n.origin,s)),c=await xj(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ud.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tg(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wj{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const d=tg("",20);i.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const g=p;if(g.data.eventId===d)switch(g.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(g.data.response);break;default:clearTimeout(f),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(){return window}function Ej(t){_n().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tb(){return typeof _n().WorkerGlobalScope<"u"&&typeof _n().importScripts=="function"}async function Tj(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function bj(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Ij(){return tb()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nb="firebaseLocalStorageDb",Sj=1,wu="firebaseLocalStorage",rb="fbase_key";class ol{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function dd(t,e){return t.transaction([wu],e?"readwrite":"readonly").objectStore(wu)}function kj(){const t=indexedDB.deleteDatabase(nb);return new ol(t).toPromise()}function tp(){const t=indexedDB.open(nb,Sj);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(wu,{keyPath:rb})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(wu)?e(r):(r.close(),await kj(),e(await tp()))})})}async function o0(t,e,n){const r=dd(t,!0).put({[rb]:e,value:n});return new ol(r).toPromise()}async function Rj(t,e){const n=dd(t,!1).get(e),r=await new ol(n).toPromise();return r===void 0?null:r.value}function a0(t,e){const n=dd(t,!0).delete(e);return new ol(n).toPromise()}const Pj=800,Aj=3;class ib{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await tp(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Aj)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tb()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ud._getInstance(Ij()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Tj(),!this.activeServiceWorker)return;this.sender=new wj(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||bj()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await tp();return await o0(e,xu,"1"),await a0(e,xu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>o0(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Rj(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>a0(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=dd(i,!1).getAll();return new ol(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Pj)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ib.type="LOCAL";const Nj=ib;new rl(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cj(t,e){return e?Un(e):(J(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng extends Zm{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Is(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Is(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Is(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Dj(t){return QT(t.auth,new ng(t),t.bypassAuthState)}function jj(t){const{auth:e,user:n}=t;return J(n,e,"internal-error"),lj(n,new ng(t),t.bypassAuthState)}async function Vj(t){const{auth:e,user:n}=t;return J(n,e,"internal-error"),aj(n,new ng(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sb{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Dj;case"linkViaPopup":case"linkViaRedirect":return Vj;case"reauthViaPopup":case"reauthViaRedirect":return jj;default:on(this.auth,"internal-error")}}resolve(e){Yn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Yn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oj=new rl(2e3,1e4);class ms extends sb{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,ms.currentPopupAction&&ms.currentPopupAction.cancel(),ms.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return J(e,this.auth,"internal-error"),e}async onExecution(){Yn(this.filter.length===1,"Popup operations only handle one event");const e=tg();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(vn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(vn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ms.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(vn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Oj.get())};e()}}ms.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mj="pendingRedirect",wc=new Map;class Lj extends sb{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=wc.get(this.auth._key());if(!e){try{const r=await Fj(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}wc.set(this.auth._key(),e)}return this.bypassAuthState||wc.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Fj(t,e){const n=Bj(e),r=zj(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function Uj(t,e){wc.set(t._key(),e)}function zj(t){return Un(t._redirectPersistence)}function Bj(t){return xc(Mj,t.config.apiKey,t.name)}async function $j(t,e,n=!1){if(un(t.app))return Promise.reject(Bn(t));const r=Jr(t),i=Cj(r,e),o=await new Lj(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qj=10*60*1e3;class Kj{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Hj(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!ob(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(vn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=qj&&this.cachedEventUids.clear(),this.cachedEventUids.has(l0(e))}saveEventToCache(e){this.cachedEventUids.add(l0(e)),this.lastProcessedEventTime=Date.now()}}function l0(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function ob({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Hj(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ob(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wj(t,e={}){return In(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gj=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Qj=/^https?/;async function Yj(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Wj(t);for(const n of e)try{if(Jj(n))return}catch{}on(t,"unauthorized-domain")}function Jj(t){const e=Zf(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Qj.test(n))return!1;if(Gj.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xj=new rl(3e4,6e4);function c0(){const t=_n().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Zj(t){return new Promise((e,n)=>{var r,i,s;function o(){c0(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{c0(),n(vn(t,"network-request-failed"))},timeout:Xj.get()})}if(!((i=(r=_n().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=_n().gapi)===null||s===void 0)&&s.load)o();else{const a=BD("iframefcb");return _n()[a]=()=>{gapi.load?o():n(vn(t,"network-request-failed"))},KT(`${zD()}?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Ec=null,e})}let Ec=null;function eV(t){return Ec=Ec||Zj(t),Ec}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tV=new rl(5e3,15e3),nV="__/auth/iframe",rV="emulator/auth/iframe",iV={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},sV=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function oV(t){const e=t.config;J(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ym(e,rV):`https://${t.config.authDomain}/${nV}`,r={apiKey:e.apiKey,appName:t.name,v:Fi},i=sV.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${Ja(r).slice(1)}`}async function aV(t){const e=await eV(t),n=_n().gapi;return J(n,t,"internal-error"),e.open({where:document.body,url:oV(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:iV,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=vn(t,"network-request-failed"),a=_n().setTimeout(()=>{s(o)},tV.get());function c(){_n().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lV={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},cV=500,uV=600,dV="_blank",hV="http://localhost";class u0{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function fV(t,e,n,r=cV,i=uV){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},lV),{width:r.toString(),height:i.toString(),top:s,left:o}),d=Ge().toLowerCase();n&&(a=LT(d)?dV:n),OT(d)&&(e=e||hV,c.scrollbars="yes");const f=Object.entries(c).reduce((g,[S,A])=>`${g}${S}=${A},`,"");if(CD(d)&&a!=="_self")return pV(e||"",a),new u0(null);const p=window.open(e||"",a,f);J(p,t,"popup-blocked");try{p.focus()}catch{}return new u0(p)}function pV(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mV="__/auth/handler",gV="emulator/auth/handler",yV=encodeURIComponent("fac");async function d0(t,e,n,r,i,s){J(t.config.authDomain,t,"auth-domain-config-required"),J(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Fi,eventId:i};if(e instanceof WT){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",jP(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof sl){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const f of Object.keys(a))a[f]===void 0&&delete a[f];const c=await t._getAppCheckToken(),d=c?`#${yV}=${encodeURIComponent(c)}`:"";return`${vV(t)}?${Ja(a).slice(1)}${d}`}function vV({config:t}){return t.emulator?Ym(t,gV):`https://${t.authDomain}/${mV}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh="webStorageSupport";class _V{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=eb,this._completeRedirectFn=$j,this._overrideRedirectResult=Uj}async _openPopup(e,n,r,i){var s;Yn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await d0(e,n,r,Zf(),i);return fV(e,o,tg())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await d0(e,n,r,Zf(),i);return Ej(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Yn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await aV(e),r=new Kj(e);return n.register("authEvent",i=>(J(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(xh,{type:xh},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[xh];o!==void 0&&n(!!o),on(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Yj(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return $T()||MT()||Xm()}}const xV=_V;var h0="@firebase/auth",f0="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wV{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){J(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EV(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function TV(t){Si(new Fr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;J(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qT(t)},d=new LD(r,i,s,c);return WD(d,n),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Si(new Fr("auth-internal",e=>{const n=Jr(e.getProvider("auth").getImmediate());return(r=>new wV(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),gn(h0,f0,EV(t)),gn(h0,f0,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bV=5*60,IV=a1("authIdTokenMaxAge")||bV;let p0=null;const SV=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>IV)return;const i=n==null?void 0:n.token;p0!==i&&(p0=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function kV(t=f1()){const e=Bu(t,"auth");if(e.isInitialized())return e.getImmediate();const n=HD(t,{popupRedirectResolver:xV,persistence:[Nj,_j,eb]}),r=a1("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=SV(s.toString());pj(n,o,()=>o(n.currentUser)),fj(n,a=>o(a))}}const i=s1("auth");return i&&GD(n,`http://${i}`),n}function RV(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}FD({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=vn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",RV().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});TV("Browser");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ab="firebasestorage.googleapis.com",lb="storageBucket",PV=2*60*1e3,AV=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le extends bn{constructor(e,n,r=0){super(wh(e),`Firebase Storage: ${n} (${wh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Le.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return wh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Me;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Me||(Me={}));function wh(t){return"storage/"+t}function rg(){const t="An unknown error occurred, please check the error payload for server response.";return new Le(Me.UNKNOWN,t)}function NV(t){return new Le(Me.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function CV(t){return new Le(Me.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function DV(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Le(Me.UNAUTHENTICATED,t)}function jV(){return new Le(Me.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function VV(t){return new Le(Me.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function OV(){return new Le(Me.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function MV(){return new Le(Me.CANCELED,"User canceled the upload/download.")}function LV(t){return new Le(Me.INVALID_URL,"Invalid URL '"+t+"'.")}function FV(t){return new Le(Me.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function UV(){return new Le(Me.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+lb+"' property when initializing the app?")}function zV(){return new Le(Me.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function BV(){return new Le(Me.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function $V(t){return new Le(Me.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function np(t){return new Le(Me.INVALID_ARGUMENT,t)}function cb(){return new Le(Me.APP_DELETED,"The Firebase app was deleted.")}function qV(t){return new Le(Me.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function ca(t,e){return new Le(Me.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function Vo(t){throw new Le(Me.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=Lt.makeFromUrl(e,n)}catch{return new Lt(e,"")}if(r.path==="")return r;throw FV(e)}static makeFromUrl(e,n){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(k){k.path.charAt(k.path.length-1)==="/"&&(k.path_=k.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),c={bucket:1,path:3};function d(k){k.path_=decodeURIComponent(k.path)}const f="v[A-Za-z0-9_]+",p=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",S=new RegExp(`^https?://${p}/${f}/b/${i}/o${g}`,"i"),A={bucket:1,path:3},T=n===ab?"(?:storage.googleapis.com|storage.cloud.google.com)":n,P="([^?#]*)",y=new RegExp(`^https?://${T}/${i}/${P}`,"i"),v=[{regex:a,indices:c,postModify:s},{regex:S,indices:A,postModify:d},{regex:y,indices:{bucket:1,path:2},postModify:d}];for(let k=0;k<v.length;k++){const O=v[k],M=O.regex.exec(e);if(M){const I=M[O.indices.bucket];let E=M[O.indices.path];E||(E=""),r=new Lt(I,E),O.postModify(r);break}}if(r==null)throw LV(e);return r}}class KV{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HV(t,e,n){let r=1,i=null,s=null,o=!1,a=0;function c(){return a===2}let d=!1;function f(...P){d||(d=!0,e.apply(null,P))}function p(P){i=setTimeout(()=>{i=null,t(S,c())},P)}function g(){s&&clearTimeout(s)}function S(P,...y){if(d){g();return}if(P){g(),f.call(null,P,...y);return}if(c()||o){g(),f.call(null,P,...y);return}r<64&&(r*=2);let v;a===1?(a=2,v=0):v=(r+Math.random())*1e3,p(v)}let A=!1;function T(P){A||(A=!0,g(),!d&&(i!==null?(P||(a=2),clearTimeout(i),p(0)):P||(a=1)))}return p(0),s=setTimeout(()=>{o=!0,T(!0)},n),T}function WV(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GV(t){return t!==void 0}function QV(t){return typeof t=="object"&&!Array.isArray(t)}function ig(t){return typeof t=="string"||t instanceof String}function m0(t){return sg()&&t instanceof Blob}function sg(){return typeof Blob<"u"}function g0(t,e,n,r){if(r<e)throw np(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw np(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function og(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function ub(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const i=e(r)+"="+e(t[r]);n=n+i+"&"}return n=n.slice(0,-1),n}var xi;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(xi||(xi={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YV(t,e){const n=t>=500&&t<600,i=[408,429].indexOf(t)!==-1,s=e.indexOf(t)!==-1;return n||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JV{constructor(e,n,r,i,s,o,a,c,d,f,p,g=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=p,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((S,A)=>{this.resolve_=S,this.reject_=A,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new Ql(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const c=a.loaded,d=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,d)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===xi.NO_ERROR,c=s.getStatus();if(!a||YV(c,this.additionalRetryCodes_)&&this.retry){const f=s.getErrorCode()===xi.ABORT;r(!1,new Ql(!1,null,f));return}const d=this.successCodes_.indexOf(c)!==-1;r(!0,new Ql(d,s))})},n=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());GV(c)?s(c):s()}catch(c){o(c)}else if(a!==null){const c=rg();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(i.canceled){const c=this.appDelete_?cb():MV();o(c)}else{const c=OV();o(c)}};this.canceled_?n(!1,new Ql(!1,null,!0)):this.backoffId_=HV(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&WV(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Ql{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function XV(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function ZV(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function eO(t,e){e&&(t["X-Firebase-GMPID"]=e)}function tO(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function nO(t,e,n,r,i,s,o=!0){const a=ub(t.urlParams),c=t.url+a,d=Object.assign({},t.headers);return eO(d,e),XV(d,n),ZV(d,s),tO(d,r),new JV(c,t.method,d,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rO(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function iO(...t){const e=rO();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(sg())return new Blob(t);throw new Le(Me.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function sO(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oO(t){if(typeof atob>"u")throw $V("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Eh{constructor(e,n){this.data=e,this.contentType=n||null}}function aO(t,e){switch(t){case fn.RAW:return new Eh(db(e));case fn.BASE64:case fn.BASE64URL:return new Eh(hb(t,e));case fn.DATA_URL:return new Eh(cO(e),uO(e))}throw rg()}function db(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=t.charCodeAt(++n);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function lO(t){let e;try{e=decodeURIComponent(t)}catch{throw ca(fn.DATA_URL,"Malformed data URL.")}return db(e)}function hb(t,e){switch(t){case fn.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw ca(t,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case fn.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw ca(t,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=oO(e)}catch(i){throw i.message.includes("polyfill")?i:ca(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}class fb{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw ca(fn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=dO(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function cO(t){const e=new fb(t);return e.base64?hb(fn.BASE64,e.rest):lO(e.rest)}function uO(t){return new fb(t).contentType}function dO(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,n){let r=0,i="";m0(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,n){if(m0(this.data_)){const r=this.data_,i=sO(r,e,n);return i===null?null:new vr(i)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new vr(r,!0)}}static getBlob(...e){if(sg()){const n=e.map(r=>r instanceof vr?r.data_:r);return new vr(iO.apply(null,n))}else{const n=e.map(o=>ig(o)?aO(fn.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)i[s++]=o[a]}),new vr(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pb(t){let e;try{e=JSON.parse(t)}catch{return null}return QV(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hO(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function fO(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function mb(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pO(t,e){return e}class gt{constructor(e,n,r,i){this.server=e,this.local=n||e,this.writable=!!r,this.xform=i||pO}}let Yl=null;function mO(t){return!ig(t)||t.length<2?t:mb(t)}function gb(){if(Yl)return Yl;const t=[];t.push(new gt("bucket")),t.push(new gt("generation")),t.push(new gt("metageneration")),t.push(new gt("name","fullPath",!0));function e(s,o){return mO(o)}const n=new gt("name");n.xform=e,t.push(n);function r(s,o){return o!==void 0?Number(o):o}const i=new gt("size");return i.xform=r,t.push(i),t.push(new gt("timeCreated")),t.push(new gt("updated")),t.push(new gt("md5Hash",null,!0)),t.push(new gt("cacheControl",null,!0)),t.push(new gt("contentDisposition",null,!0)),t.push(new gt("contentEncoding",null,!0)),t.push(new gt("contentLanguage",null,!0)),t.push(new gt("contentType",null,!0)),t.push(new gt("metadata","customMetadata",!0)),Yl=t,Yl}function gO(t,e){function n(){const r=t.bucket,i=t.fullPath,s=new Lt(r,i);return e._makeStorageReference(s)}Object.defineProperty(t,"ref",{get:n})}function yO(t,e,n){const r={};r.type="file";const i=n.length;for(let s=0;s<i;s++){const o=n[s];r[o.local]=o.xform(r,e[o.server])}return gO(r,t),r}function yb(t,e,n){const r=pb(e);return r===null?null:yO(t,r,n)}function vO(t,e,n,r){const i=pb(e);if(i===null||!ig(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(d=>{const f=t.bucket,p=t.fullPath,g="/b/"+o(f)+"/o/"+o(p),S=og(g,n,r),A=ub({alt:"media",token:d});return S+A})[0]}function _O(t,e){const n={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(n[s.server]=t[s.local])}return JSON.stringify(n)}class vb{constructor(e,n,r,i){this.url=e,this.method=n,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _b(t){if(!t)throw rg()}function xO(t,e){function n(r,i){const s=yb(t,i,e);return _b(s!==null),s}return n}function wO(t,e){function n(r,i){const s=yb(t,i,e);return _b(s!==null),vO(s,i,t.host,t._protocol)}return n}function xb(t){function e(n,r){let i;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?i=jV():i=DV():n.getStatus()===402?i=CV(t.bucket):n.getStatus()===403?i=VV(t.path):i=r,i.status=n.getStatus(),i.serverResponse=r.serverResponse,i}return e}function EO(t){const e=xb(t);function n(r,i){let s=e(r,i);return r.getStatus()===404&&(s=NV(t.path)),s.serverResponse=i.serverResponse,s}return n}function TO(t,e,n){const r=e.fullServerUrl(),i=og(r,t.host,t._protocol),s="GET",o=t.maxOperationRetryTime,a=new vb(i,s,wO(t,n),o);return a.errorHandler=EO(e),a}function bO(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function IO(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=bO(null,e)),r}function SO(t,e,n,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let v="";for(let k=0;k<2;k++)v=v+Math.random().toString().slice(2);return v}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const d=IO(e,r,i),f=_O(d,n),p="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+c+`\r
Content-Type: `+d.contentType+`\r
\r
`,g=`\r
--`+c+"--",S=vr.getBlob(p,r,g);if(S===null)throw zV();const A={name:d.fullPath},T=og(s,t.host,t._protocol),P="POST",y=t.maxUploadRetryTime,x=new vb(T,P,xO(t,n),y);return x.urlParams=A,x.headers=o,x.body=S.uploadData(),x.errorHandler=xb(e),x}class kO{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=xi.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=xi.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=xi.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,i){if(this.sent_)throw Vo("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),i!==void 0)for(const s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Vo("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Vo("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Vo("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Vo("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class RO extends kO{initXhr(){this.xhr_.responseType="text"}}function wb(){return new RO}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,n){this._service=e,n instanceof Lt?this._location=n:this._location=Lt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Oi(e,n)}get root(){const e=new Lt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return mb(this._location.path)}get storage(){return this._service}get parent(){const e=hO(this._location.path);if(e===null)return null;const n=new Lt(this._location.bucket,e);return new Oi(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw qV(e)}}function PO(t,e,n){t._throwIfRoot("uploadBytes");const r=SO(t.storage,t._location,gb(),new vr(e,!0),n);return t.storage.makeRequestWithTokens(r,wb).then(i=>({metadata:i,ref:t}))}function AO(t){t._throwIfRoot("getDownloadURL");const e=TO(t.storage,t._location,gb());return t.storage.makeRequestWithTokens(e,wb).then(n=>{if(n===null)throw BV();return n})}function NO(t,e){const n=fO(t._location.path,e),r=new Lt(t._location.bucket,n);return new Oi(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CO(t){return/^[A-Za-z]+:\/\//.test(t)}function DO(t,e){return new Oi(t,e)}function Eb(t,e){if(t instanceof ag){const n=t;if(n._bucket==null)throw UV();const r=new Oi(n,n._bucket);return e!=null?Eb(r,e):r}else return e!==void 0?NO(t,e):t}function jO(t,e){if(e&&CO(e)){if(t instanceof ag)return DO(t,e);throw np("To use ref(service, url), the first argument must be a Storage instance.")}else return Eb(t,e)}function y0(t,e){const n=e==null?void 0:e[lb];return n==null?null:Lt.makeFromBucketSpec(n,t)}function VO(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:i}=r;i&&(t._overrideAuthToken=typeof i=="string"?i:TP(i,t.app.options.projectId))}class ag{constructor(e,n,r,i,s){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=ab,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=PV,this._maxUploadRetryTime=AV,this._requests=new Set,i!=null?this._bucket=Lt.makeFromBucketSpec(i,this._host):this._bucket=y0(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Lt.makeFromBucketSpec(this._url,e):this._bucket=y0(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){g0("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){g0("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Oi(this,e)}_makeRequest(e,n,r,i,s=!0){if(this._deleted)return new KV(cb());{const o=nO(e,this._appId,r,i,n,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,i).getPromise()}}const v0="@firebase/storage",_0="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb="storage";function bb(t,e,n){return t=Oe(t),PO(t,e,n)}function Ib(t){return t=Oe(t),AO(t)}function Sb(t,e){return t=Oe(t),jO(t,e)}function OO(t=f1(),e){t=Oe(t);const r=Bu(t,Tb).getImmediate({identifier:e}),i=wP("storage");return i&&MO(r,...i),r}function MO(t,e,n,r={}){VO(t,e,n,r)}function LO(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new ag(n,r,i,e,Fi)}function FO(){Si(new Fr(Tb,LO,"PUBLIC").setMultipleInstances(!0)),gn(v0,_0,""),gn(v0,_0,"esm2017")}FO();const UO={apiKey:"AIzaSyDgvUowdRyc6CIsKKSHqJHyNQnFsWQ1h_U",authDomain:"tyresathi-93306.firebaseapp.com",projectId:"tyresathi-93306",storageBucket:"tyresathi-93306.firebasestorage.app",messagingSenderId:"71107233578",appId:"1:71107233578:web:b662874092abc23bd54053"},lg=h1(UO),xn=W2(lg,{localCache:lD({tabManager:hD()})}),Ji=kV(lg),kb=OO(lg),ae={CUSTOMER:"customer",SHOP_OWNER:"shop_owner",ADMIN:"admin",USER:"customer",VENDOR:"shop_owner"},Rb=V.createContext();function zO({children:t}){const[e,n]=V.useState(null),[r,i]=V.useState(null),[s,o]=V.useState(ae.CUSTOMER),[a,c]=V.useState(!0);function d(P,y){return dj(Ji,P,y)}async function f({name:P,phone:y,email:x,password:v,role:k=ae.CUSTOMER,shopName:O=""}){const M=await i0(Ji,x,v);if(P)try{await s0(M.user,{displayName:P})}catch(E){console.warn("Could not update displayName",E)}const I={uid:M.user.uid,name:P||"",phone:y||"",email:x||"",role:k||ae.CUSTOMER,shopName:O||"",shopApproved:k===ae.SHOP_OWNER,photoURL:"",address:"",city:"",openingHours:"09:00 AM - 09:00 PM",createdAt:Gs()};try{await W_(_i(xn,"users",M.user.uid),I)}catch(E){console.error("Firestore user creation warning:",E)}return i(I),o(I.role),M}async function p(P){if(!e)return;const y=e.uid,x={...r||{},...P,uid:y,email:P.email||(r==null?void 0:r.email)||e.email,updatedAt:Gs()};if(P.name||P.photoURL)try{await s0(e,{displayName:P.name||e.displayName,photoURL:P.photoURL||e.photoURL})}catch(v){console.warn("Could not update auth profile:",v)}try{await W_(_i(xn,"users",y),x,{merge:!0})}catch(v){console.warn("Firestore user update warning:",v)}return i(x),P.role&&o(P.role),x}function g(P,y){return i0(Ji,P,y)}function S(){return i(null),o(ae.CUSTOMER),gj(Ji)}function A(P){return uj(Ji,P)}V.useEffect(()=>mj(Ji,async y=>{var x,v;if(n(y),y)try{const k=await ET(_i(xn,"users",y.uid));if(k.exists()){const O=k.data();i(O),o(O.role||ae.CUSTOMER)}else{const O={uid:y.uid,email:y.email,name:y.displayName||((x=y.email)==null?void 0:x.split("@")[0])||"User",role:ae.CUSTOMER,photoURL:y.photoURL||"",phone:"",shopName:""};i(O),o(ae.CUSTOMER)}}catch(k){console.error("Firestore user fetch error:",k);const O={uid:y.uid,email:y.email,name:y.displayName||((v=y.email)==null?void 0:v.split("@")[0])||"User",role:ae.CUSTOMER,photoURL:y.photoURL||"",phone:"",shopName:""};i(O),o(ae.CUSTOMER)}else i(null),o(ae.CUSTOMER);c(!1)}),[]);const T={user:e,currentUser:e,profile:r,userData:r,role:s,loading:a,login:d,register:f,signup:g,updateUserProfile:p,logout:S,resetPassword:A,isAdmin:s==="admin"||s===ae.ADMIN,isVendor:s==="vendor"||s==="shop_owner"||s===ae.SHOP_OWNER||s===ae.VENDOR,isShopOwner:s==="shop_owner"||s===ae.SHOP_OWNER};return u.jsx(Rb.Provider,{value:T,children:t})}function Xr(){return V.useContext(Rb)}const $a=[{name:"Apollo",popular:!0,count:"120+ Products"},{name:"Bridgestone",popular:!0,count:"95+ Products"},{name:"Ceat",popular:!0,count:"140+ Products"},{name:"Continental",popular:!0,count:"60+ Products"},{name:"Clearance",tag:"Sale",count:"Special Deals"},{name:"Firestone",count:"35+ Products"},{name:"Goodyear",popular:!0,count:"80+ Products"},{name:"JK Tyre",popular:!0,count:"110+ Products"},{name:"Kelly",count:"25+ Products"},{name:"Michelin",popular:!0,count:"75+ Products"},{name:"Pirelli",popular:!0,count:"45+ Products"},{name:"Vredestein",count:"30+ Products"},{name:"Ralco",popular:!0,count:"55+ Products"},{name:"reise",count:"20+ Products"},{name:"TVS Eurogrip",popular:!0,count:"90+ Products"},{name:"Vee Rubber",count:"15+ Products"},{name:"Metzeler",count:"25+ Products"},{name:"Metro",count:"40+ Products"},{name:"ARF",count:"18+ Products"},{name:"ARL",count:"12+ Products"},{name:"Auto Boss",count:"30+ Products"},{name:"Classic",count:"22+ Products"},{name:"Galaxy",count:"15+ Products"},{name:"Maruti",count:"28+ Products"},{name:"META GOLD",count:"16+ Products"},{name:"Moly Lube",count:"14+ Products"},{name:"NEO Wheels",tag:"Alloy",count:"40+ Designs"},{name:"Onyx",count:"20+ Products"},{name:"PLATI Alloy Wheels",tag:"Alloy",count:"50+ Designs"},{name:"MY TVS",count:"35+ Products"},{name:"MRF",popular:!0,count:"180+ Products"},{name:"Yokohama",popular:!0,count:"65+ Products"}],qa=[{id:"two_wheeler",name:"Two-Wheeler (Bike / Scooter / EV)",icon:"🏍️"},{id:"passenger_car",name:"Passenger Car & Hatchback",icon:"🚗"},{id:"suv_muv",name:"SUV & Compact MUV",icon:"🚙"},{id:"commercial",name:"Commercial (Truck / Bus / LCV)",icon:"🚚"},{id:"tractor_agri",name:"Tractor & Agriculture Farm",icon:"🚜"},{id:"auto_rickshaw",name:"Auto Rickshaw (3-Wheeler)",icon:"🛺"},{id:"otr_industrial",name:"OTR & Industrial Crane",icon:"🏗️"},{id:"alloy_wheels",name:"Alloy Wheels & Designer Rims",icon:"✨"}],Th={two_wheeler:["Scooter (Activa, Jupiter, Access)","Motorcycle (100cc-150cc)","Sports Bike (150cc-400cc)","Electric Scooter (Ola, Ather, Chetak)","Bullet / Royal Enfield Classic"],passenger_car:["Hatchback (Swift, WagonR, i10, Tiago)","Sedan (City, Verna, Dzire, Amaze)","Premium Sedan (Octavia, Camry)"],suv_muv:["Compact SUV (Brezza, Nexon, Creta, Seltos)","Full-Size SUV (Scorpio, Thar, Safari, Fortuner)","MUV / MPV (Innova, Ertiga, Carens)"],commercial:["Small LCV (Tata Ace, Bolero Maxi Truck)","Medium LCV (Eicher, 407)","Heavy Commercial (10-Wheeler, 12-Wheeler Truck)","Intercity Bus / Volvo"],tractor_agri:["Tractor Front Steering","Tractor Rear Traction (12.4/13.6/14.9)","Harvester & Trailer"],auto_rickshaw:["Passenger 3-Wheeler (Bajaj, Piaggio)","Cargo Load Carrier 3-Wheeler","Electric Auto (E-Rickshaw)"],otr_industrial:["JCB Backhoe Loader","Forklift & Warehouse Crane","Mining Tipper Dumper"],alloy_wheels:["13 Inch Alloys","14 Inch Alloys","15 Inch Alloys","16 Inch Alloys","17+ Inch Diamond Cut Alloys"]},bh={two_wheeler:["90/90-12","100/90-17","80/100-18","2.75-17","3.00-18","140/70-17","110/80-17","120/80-18","90/100-10"],passenger_car:["145/80 R12","155/80 R13","165/80 R14","175/65 R14","185/65 R15","185/70 R14","195/65 R15","205/55 R16","205/60 R16"],suv_muv:["215/60 R16","215/65 R16","235/65 R17","265/65 R17","215/60 R17","225/65 R17","255/60 R18","265/60 R18"],commercial:["10.00-20","295/80 R22.5","7.50-16","8.25-16","11.00-20","155 R13 LT","7.00 R15 LT"],tractor_agri:["6.00-16","12.4-28","13.6-28","14.9-28","7.50-16","16.9-28"],auto_rickshaw:["4.00-8","4.50-10","145/70 R12","3.75-12"],otr_industrial:["12.5/80-18","14.00-24","16.9-28","23.5-25"],alloy_wheels:["PCD 100 4-Hole (14 Inch)","PCD 100 4-Hole (15 Inch)","PCD 114.3 5-Hole (16 Inch)","PCD 114.3 5-Hole (17 Inch)"]},BO=["MRF Zapper FX (Tubeless)","MRF Nylogrip Ezeeride","MRF ZVTV Premium","MRF Wanderer Street AT","MRF Super Lug 50","Apollo Amazer 4G Life","Apollo Alnac 4G","Apollo Apterra AT2","Apollo ActiGrip R1","CEAT Secura Zoom","CEAT Milaze X3","CEAT CrossDrive AT","CEAT Gripp X3","Bridgestone Turanza T005","Bridgestone Ecopia EP150","Bridgestone B290","Bridgestone Dueler D684","Michelin Primacy 4 ST","Michelin Energy XM2+","Michelin LTX Trail","Goodyear Assurance TripleMax 2","Goodyear Wrangler AT SilentTrac","JK Tyre UX Royale","JK Tyre Elanzo Touring","TVS Eurogrip Dragon Tube/Tubeless","Ralco Speed Blaster","Yokohama Earth-1 E400","Yokohama Geolandar A/T G015"],Jl=[{id:"cut_repair",name:"Tyre Cut & Sidewall Repair (टायर कट रिपेयर)",duration:"45 Mins",price:350},{id:"puncture",name:"Tubeless Puncture Repair (पंचर रिपेयर)",duration:"15 Mins",price:100},{id:"alignment",name:"3D Wheel Alignment & Balancing (अलाइनमेंट)",duration:"30 Mins",price:450},{id:"fitting",name:"New Tyre Fitting & Nitrogen Fill (फिटिंग)",duration:"20 Mins",price:150},{id:"doorstep",name:"Doorstep Emergency Assistance (घर/रास्ते पर सर्विस)",duration:"45 Mins",price:499},{id:"rotation",name:"Tyre Rotation & Brake Check (रोटेशन)",duration:"25 Mins",price:250}],_r=[{id:"shop-blr-central",name:"TyreSaathi Partner Hub — Central",ownerName:"Verified Partner",phone:"",rating:4.8,reviewsCount:128,address:"Near Auto Complex, Central Market Area, Bengaluru, Karnataka",city:"Bengaluru",distanceKm:1.2,isNearest:!0,coordinates:{lat:12.9716,lng:77.5946},servicesOffered:["Tyre Replacement","Cut Repair","Wheel Alignment","Nitrogen Air"],isOpen:!0},{id:"shop-blr-south",name:"TyreSaathi Express Center — South",ownerName:"Verified Partner",phone:"",rating:4.7,reviewsCount:94,address:"Main Road, Near Petrol Station, South Zone, Bengaluru, Karnataka",city:"Bengaluru",distanceKm:2.8,isNearest:!0,coordinates:{lat:12.9352,lng:77.6245},servicesOffered:["Tyre Sales","Puncture Repair","Doorstep Mobile Van"],isOpen:!0},{id:"shop-delhi-ncr",name:"TyreSaathi Super Hub — NCR",ownerName:"Verified Partner",phone:"",rating:4.9,reviewsCount:210,address:"Auto Market Sector, Ring Road Area, New Delhi, Delhi NCR",city:"Delhi NCR",distanceKm:4.2,isNearest:!1,coordinates:{lat:28.6139,lng:77.209},servicesOffered:["Complete Wheel Care","Alloy Wheels","Doorstep Mobile Van"],isOpen:!0},{id:"shop-mumbai-west",name:"TyreSaathi Partner Wheels — West",ownerName:"Verified Partner",phone:"",rating:4.7,reviewsCount:145,address:"Link Road, Metro Corridor Area, Andheri, Mumbai, Maharashtra",city:"Mumbai",distanceKm:5,isNearest:!1,coordinates:{lat:19.1363,lng:72.8277},servicesOffered:["Tubeless Specialist","Nitrogen Air","Alloy Wheels"],isOpen:!0},{id:"shop-erode-hub",name:"TyreSaathi Service Hub — Erode",ownerName:"Verified Partner",phone:"",rating:4.6,reviewsCount:76,address:"Main Road, Commercial Center, Erode, Tamil Nadu",city:"Erode",distanceKm:3.5,isNearest:!1,coordinates:{lat:11.341,lng:77.7172},servicesOffered:["All Vehicle Tyres","Wheel Balancing","Tube Repair"],isOpen:!0}],rp=[{id:"prod-1",productName:"MRF Zapper FX 100/90-17 Tubeless Bike Tyre",productType:"tyre",brandName:"MRF",categoryName:"Two-Wheeler (Bike / Scooter / EV)",vehicleTypeName:"Motorcycle (100cc-150cc)",sizeName:"100/90-17",modelName:"MRF Zapper FX (Tubeless)",originalPrice:2450,offerPrice:2099,stock:8,published:!0,condition:"new",shopId:"shop-blr-central",shopName:"TyreSaathi Partner Hub",shopPhone:"",distanceKm:1.2,isNearest:!0,images:["https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80"],description:"High performance bike rear tyre with deep water grooving and 5 years manufacturer warranty."},{id:"prod-2",productName:"Apollo Amazer 4G Life 185/65 R15 Car Tyre",productType:"tyre",brandName:"Apollo",categoryName:"Passenger Car & Hatchback",vehicleTypeName:"Sedan (City, Verna, Dzire, Amaze)",sizeName:"185/65 R15",modelName:"Apollo Amazer 4G Life",originalPrice:5200,offerPrice:4350,stock:12,published:!0,condition:"new",shopId:"shop-blr-central",shopName:"TyreSaathi Partner Hub",shopPhone:"",distanceKm:1.2,isNearest:!0,images:["https://images.unsplash.com/photo-1549497538-303791108f95?w=600&auto=format&fit=crop&q=80"],description:"Guaranteed 100,000 km tread life with ultra micro-silica compound for maximum fuel efficiency."},{id:"prod-3",productName:"CEAT Milaze X3 165/80 R14 Durable Car Tyre",productType:"tyre",brandName:"Ceat",categoryName:"Passenger Car & Hatchback",vehicleTypeName:"Hatchback (Swift, WagonR, i10, Tiago)",sizeName:"165/80 R14",modelName:"CEAT Milaze X3",originalPrice:4100,offerPrice:3499,stock:6,published:!0,condition:"new",shopId:"shop-blr-south",shopName:"TyreSaathi Express Center",shopPhone:"",distanceKm:2.8,isNearest:!0,images:["https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80"],description:"Specially crafted for Indian roads with high rubber content and 3 years unconditional warranty."},{id:"prod-4",productName:"Bridgestone Turanza T005 205/55 R16 Premium Tyre",productType:"tyre",brandName:"Bridgestone",categoryName:"Passenger Car & Hatchback",vehicleTypeName:"Premium Sedan (Octavia, Camry)",sizeName:"205/55 R16",modelName:"Bridgestone Turanza T005",originalPrice:8900,offerPrice:7650,stock:4,published:!0,condition:"new",shopId:"shop-erode-hub",shopName:"TyreSaathi Service Hub",shopPhone:"",distanceKm:3.5,isNearest:!1,images:["https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80"],description:"Ultra quiet luxury touring tyre with highest safety rating on wet surfaces."},{id:"prod-5",productName:"PLATI 16 Inch Diamond Cut Alloy Wheels (Set of 4)",productType:"custom",brandName:"PLATI Alloy Wheels",categoryName:"Alloy Wheels & Designer Rims",vehicleTypeName:"16 Inch Alloys",sizeName:"PCD 114.3 5-Hole (16 Inch)",modelName:"PLATI Diamond Cut Racing Black",originalPrice:36e3,offerPrice:29999,stock:2,published:!0,condition:"new",shopId:"shop-delhi-ncr",shopName:"TyreSaathi Super Hub",shopPhone:"",distanceKm:4.2,isNearest:!1,images:["https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600&auto=format&fit=crop&q=80"],description:"Lightweight aircraft grade alloy wheels with hyper-gloss CNC diamond cut finish."}];function $O({onMenuClick:t}){const{theme:e,toggleTheme:n}=t1(),{user:r,profile:i,logout:s,isVendor:o}=Xr(),a=Tn(),[c,d]=V.useState(!1),[f,p]=V.useState(!1),[g,S]=V.useState(""),A=V.useRef(null),T=V.useRef(null);V.useEffect(()=>{function k(O){A.current&&!A.current.contains(O.target)&&d(!1),T.current&&!T.current.contains(O.target)&&p(!1)}return document.addEventListener("mousedown",k),()=>document.removeEventListener("mousedown",k)},[]);const P=k=>{k.preventDefault(),g.trim()&&a(`/search?q=${encodeURIComponent(g.trim())}`)},y=k=>{d(!1),a(`/search?brand=${encodeURIComponent(k)}`)},x=k=>{d(!1),a(`/search?category=${encodeURIComponent(k)}`)},v=async()=>{p(!1),await s(),a("/login")};return u.jsxs("header",{className:"main-site-header",children:[u.jsx("div",{className:"top-utility-bar",children:u.jsxs("div",{className:"utility-container",children:[u.jsxs("div",{className:"top-left-info",children:[u.jsx("span",{className:"top-phone",children:"⚡ TyreSaathi — India's Verified Tyre & Service Network"}),u.jsx("span",{className:"top-timing",children:"🛡️ 100% Genuine Tyres & Authorized Fitment"})]}),u.jsxs("div",{className:"top-right-tools",children:[u.jsxs("button",{className:"utility-tool-btn",onClick:n,title:"Toggle Theme",children:[e==="dark"?u.jsx(Jw,{size:14}):u.jsx(Qw,{size:14}),u.jsx("span",{children:e==="dark"?"Light":"Dark"})]}),u.jsxs("div",{className:"user-profile-menu-wrap",ref:T,children:[u.jsxs("button",{className:"utility-tool-btn user-btn",onClick:()=>p(!f),children:[u.jsx(Xc,{size:14}),u.jsx("span",{children:i!=null&&i.name?i.name.split(" ")[0]:r?"My Account":"Login"}),u.jsx(Sv,{size:12})]}),f&&u.jsx("div",{className:"dropdown-panel user-dropdown",children:r?u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"user-dropdown-header",children:[u.jsx("strong",{children:(i==null?void 0:i.name)||"TyreSaathi User"}),u.jsx("span",{className:"role-tag",children:(i==null?void 0:i.role)==="shop_owner"?"🏪 Shop Owner":"👤 Customer"}),u.jsx("small",{children:r.email})]}),u.jsx("div",{className:"dropdown-divider"}),u.jsxs(ye,{to:"/profile",className:"dropdown-item",onClick:()=>p(!1),children:[u.jsx(Xc,{size:14})," My Profile & Settings"]}),u.jsxs(ye,{to:"/bookings",className:"dropdown-item",onClick:()=>p(!1),children:[u.jsx(to,{size:14})," My Bookings"]}),o&&u.jsxs(ye,{to:"/shop/add-product",className:"dropdown-item",onClick:()=>p(!1),children:[u.jsx(Yc,{size:14})," Add Product / Service"]}),u.jsx("div",{className:"dropdown-divider"}),u.jsxs("button",{className:"dropdown-item logout-item",onClick:v,children:[u.jsx(Gw,{size:14})," Logout"]})]}):u.jsxs(u.Fragment,{children:[u.jsx(ye,{to:"/login",className:"dropdown-item",onClick:()=>p(!1),children:"Login to Account"}),u.jsx(ye,{to:"/register",className:"dropdown-item",onClick:()=>p(!1),children:"Register New Account"})]})})]}),u.jsxs(ye,{to:"/bookings",className:"top-cart-btn",title:"View Bookings & Cart",children:[u.jsx(aP,{size:15}),u.jsx("span",{className:"cart-badge-count",children:"0"})]})]})]})}),u.jsx("div",{className:"main-nav-bar",children:u.jsxs("div",{className:"nav-container",children:[u.jsx("button",{className:"mobile-hamburger-btn",onClick:t,"aria-label":"Toggle Menu",children:u.jsx(nP,{size:24})}),u.jsxs(ye,{to:"/",className:"site-brand-logo",children:[u.jsx("img",{src:"/logo.png",alt:"TyreSaathi Logo",className:"logo-img",onError:k=>{k.target.src="/tyresaathi-logo.png"}}),u.jsxs("div",{className:"logo-text-group",children:[u.jsxs("span",{className:"brand-primary-name",children:["TYRE",u.jsx("span",{className:"brand-highlight",children:"SAATHI"})]}),u.jsx("span",{className:"brand-tagline",children:"India's Trusted Tyre & Service Network"})]})]}),u.jsxs("nav",{className:"desktop-nav-links",children:[u.jsx(hr,{to:"/",end:!0,className:({isActive:k})=>`nav-link ${k?"nav-link-active":""}`,children:"HOME"}),u.jsxs("div",{className:"categories-mega-wrap",ref:A,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),children:[u.jsxs("button",{className:`nav-link categories-trigger-btn ${c?"nav-link-active":""}`,onClick:()=>d(!c),children:["CATEGORIES ",u.jsx(Sv,{size:14,className:`chevron-icon ${c?"chevron-open":""}`})]}),c&&u.jsx("div",{className:"mega-menu-panel",children:u.jsxs("div",{className:"mega-menu-inner",children:[u.jsxs("div",{className:"mega-categories-sidebar",children:[u.jsx("h4",{className:"mega-col-title",children:"Vehicle Types"}),u.jsx("ul",{className:"cat-type-list",children:qa.map(k=>u.jsx("li",{children:u.jsxs("button",{onClick:()=>x(k.id),children:[u.jsx("span",{children:k.icon})," ",k.name]})},k.id))})]}),u.jsxs("div",{className:"mega-brands-grid-wrap",children:[u.jsxs("div",{className:"mega-brands-header",children:[u.jsx("h4",{className:"mega-col-title",children:"Popular Tyre & Wheel Brands"}),u.jsx("span",{className:"brands-subnote",children:"Click on any brand to view available tyres and sizes"})]}),u.jsx("div",{className:"mega-brands-multi-columns",children:$a.map((k,O)=>u.jsxs("button",{className:`mega-brand-btn ${k.popular?"mega-brand-popular":""} ${k.tag?"mega-brand-tagged":""}`,onClick:()=>y(k.name),children:[u.jsx("span",{className:"brand-title-text",children:k.name}),k.tag&&u.jsx("span",{className:"brand-deal-tag",children:k.tag})]},O))})]})]})})]}),u.jsx(hr,{to:"/store-location",className:({isActive:k})=>`nav-link ${k?"nav-link-active":""}`,children:"STORE LOCATION"}),u.jsx(hr,{to:"/bookings",className:({isActive:k})=>`nav-link ${k?"nav-link-active":""}`,children:"BOOKINGS"}),u.jsx(hr,{to:"/search",className:({isActive:k})=>`nav-link ${k?"nav-link-active":""}`,children:"SEARCH"}),u.jsx(hr,{to:"/privacy-policy",className:({isActive:k})=>`nav-link ${k?"nav-link-active":""}`,children:"ABOUT US"})]}),u.jsxs("div",{className:"nav-right-actions",children:[u.jsxs("form",{onSubmit:P,className:"nav-search-form",children:[u.jsx("input",{type:"text",placeholder:"Search tyres, sizes (e.g. 185/65 R15)...",value:g,onChange:k=>S(k.target.value)}),u.jsx("button",{type:"submit","aria-label":"Search",children:u.jsx(js,{size:16})})]}),o&&u.jsxs(ye,{to:"/shop/add-product",className:"nav-add-product-btn",title:"Add Product to Shop",children:[u.jsx(Yc,{size:15}),u.jsx("span",{children:"Add Product"})]})]})]})}),u.jsx("style",{children:`
        .main-site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          background: var(--surface);
        }
        
        /* Top Utility Bar */
        .top-utility-bar {
          background: #1e1e24;
          color: #e0e0e0;
          font-size: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 5px 0;
        }
        .utility-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .top-left-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .top-phone {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-weight: 700;
          color: #ffc145;
          letter-spacing: 0.3px;
        }
        .top-timing {
          color: #a8acb3;
          font-size: 11.5px;
        }
        @media (max-width: 768px) {
          .top-timing { display: none; }
        }
        .top-right-tools {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .utility-tool-btn {
          background: none;
          border: none;
          color: #e0e0e0;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 3px 6px;
          border-radius: 4px;
        }
        .utility-tool-btn:hover {
          color: #ff6b35;
          background: rgba(255,255,255,0.06);
        }
        .user-profile-menu-wrap {
          position: relative;
        }
        .dropdown-panel {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          min-width: 220px;
          z-index: 120;
          padding: 8px 0;
          color: var(--text);
        }
        .user-dropdown-header {
          padding: 10px 16px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .role-tag {
          display: inline-block;
          font-size: 11px;
          color: var(--orange);
          font-weight: 700;
        }
        .dropdown-divider {
          height: 1px;
          background: var(--border);
          margin: 6px 0;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          color: var(--text);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
        }
        .dropdown-item:hover {
          background: var(--surface-2);
          color: var(--orange);
        }
        .logout-item {
          color: var(--danger);
        }
        .top-cart-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #c0392b;
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
        }
        .cart-badge-count {
          background: white;
          color: #c0392b;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
        }

        /* Main Navigation Bar */
        .main-nav-bar {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .nav-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .mobile-hamburger-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 4px;
        }
        @media (max-width: 900px) {
          .mobile-hamburger-btn { display: block; }
          .desktop-nav-links { display: none !important; }
        }

        /* Logo Styling */
        .site-brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text);
        }
        .logo-img {
          height: 48px;
          width: auto;
          object-fit: contain;
          border-radius: 6px;
        }
        .logo-text-group {
          display: flex;
          flex-direction: column;
        }
        .brand-primary-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 0.5px;
          line-height: 1;
        }
        .brand-highlight {
          color: #c0392b;
        }
        .brand-tagline {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        /* Desktop Nav Links */
        .desktop-nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-link {
          text-decoration: none;
          color: var(--text);
          font-weight: 700;
          font-size: 13.5px;
          letter-spacing: 0.3px;
          padding: 8px 4px;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.15s ease;
        }
        .nav-link:hover,
        .nav-link-active {
          color: #c0392b;
        }
        .categories-trigger-btn {
          color: #c0392b;
          font-weight: 800;
        }
        .chevron-icon {
          transition: transform 0.2s ease;
        }
        .chevron-open {
          transform: rotate(180deg);
        }

        /* 🌟 Mega Menu Dropdown (Photo 1 Multi-Column Layout) */
        .categories-mega-wrap {
          position: static;
        }
        .mega-menu-panel {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--surface);
          border-top: 2px solid #c0392b;
          border-bottom: 1px solid var(--border);
          box-shadow: 0 16px 36px rgba(0,0,0,0.16);
          z-index: 150;
          padding: 24px 0 30px;
          animation: megaSlideDown 0.2s ease-out;
        }
        @keyframes megaSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mega-menu-inner {
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 32px;
        }
        .mega-categories-sidebar {
          flex: 0 0 260px;
          border-right: 1px solid var(--border);
          padding-right: 20px;
        }
        .mega-col-title {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #c0392b;
          margin: 0 0 12px;
          border-bottom: 2px solid var(--surface-2);
          padding-bottom: 6px;
        }
        .cat-type-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cat-type-list button {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.15s ease;
        }
        .cat-type-list button:hover {
          background: var(--surface-2);
          color: #c0392b;
        }
        .mega-brands-grid-wrap {
          flex: 1;
        }
        .mega-brands-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .brands-subnote {
          font-size: 12px;
          color: var(--text-muted);
        }
        .mega-brands-multi-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 16px;
        }
        @media (max-width: 1100px) {
          .mega-brands-multi-columns {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .mega-brand-btn {
          background: none;
          border: none;
          text-align: left;
          padding: 8px 12px;
          border-radius: 6px;
          color: var(--text);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.15s ease;
        }
        .mega-brand-btn:hover {
          background: var(--surface-2);
          color: #c0392b;
          transform: translateX(3px);
        }
        .mega-brand-popular .brand-title-text {
          font-weight: 700;
        }
        .brand-deal-tag {
          font-size: 10px;
          background: #c0392b;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }

        /* Right Search & CTA */
        .nav-right-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-search-form {
          display: flex;
          align-items: center;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 4px 10px 4px 14px;
          width: 220px;
          transition: width 0.2s ease, border-color 0.2s ease;
        }
        .nav-search-form:focus-within {
          width: 260px;
          border-color: #c0392b;
        }
        .nav-search-form input {
          border: none;
          background: none;
          outline: none;
          font-size: 12.5px;
          width: 100%;
          color: var(--text);
        }
        .nav-search-form button {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
        }
        @media (max-width: 600px) {
          .nav-search-form { display: none; }
        }
        .nav-add-product-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #c0392b;
          color: white;
          padding: 8px 14px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 2px 6px rgba(192, 57, 43, 0.3);
          white-space: nowrap;
        }
        .nav-add-product-btn:hover {
          background: #a93226;
        }
      `})]})}const Pb=[{to:"/",label:"Home",icon:ZR,end:!0},{to:"/search",label:"Search",icon:js},{to:"/store-location",label:"Stores",icon:Pa},{to:"/bookings",label:"Bookings",icon:to},{to:"/profile",label:"Profile",icon:Xc}];function qO({open:t,onClose:e}){return u.jsxs(u.Fragment,{children:[t&&u.jsx("div",{className:"sidebar-backdrop",onClick:e}),u.jsxs("aside",{className:"sidebar"+(t?" sidebar-open":""),children:[u.jsxs("div",{className:"sidebar-header",children:[u.jsx("span",{className:"brand-font sidebar-title",children:"Menu"}),u.jsx("button",{className:"icon-btn sidebar-close",onClick:e,"aria-label":"Close menu",children:u.jsx(Zw,{size:20})})]}),u.jsxs("nav",{className:"sidebar-nav",children:[Pb.map(({to:n,label:r,icon:i,end:s})=>u.jsxs(hr,{to:n,end:s,className:({isActive:o})=>"sidebar-link"+(o?" sidebar-link-active":""),onClick:e,children:[u.jsx(i,{size:18}),u.jsx("span",{children:r})]},n)),u.jsxs(hr,{to:"/shop/add-product",className:({isActive:n})=>"sidebar-link"+(n?" sidebar-link-active":""),onClick:e,children:[u.jsx(Yc,{size:18}),u.jsx("span",{children:"Add Product"})]})]}),u.jsx("div",{className:"sidebar-footer",children:u.jsx("span",{children:"TyreSaathi v2 · Phase 1"})})]}),u.jsx("style",{children:`
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 39;
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 240px;
          background: var(--surface);
          border-right: 1px solid var(--border);
          z-index: 40;
          transform: translateX(-100%);
          transition: transform 0.22s ease;
          display: flex;
          flex-direction: column;
        }
        .sidebar-open { transform: translateX(0); }
        .sidebar-header {
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 14px;
          border-bottom: 1px solid var(--border);
        }
        .sidebar-title { font-size: 17px; }
        .sidebar-close { display: flex; }
        .sidebar-nav { flex: 1; padding: 10px; display: flex; flex-direction: column; gap: 2px; }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 10px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }
        .sidebar-link:hover { background: var(--surface-2); }
        .sidebar-link-active { background: var(--orange); color: white; }
        .sidebar-footer {
          padding: 14px;
          font-size: 11px;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
        }

        /* Desktop: sidebar is permanent, no backdrop, no close button */
        @media (min-width: 900px) {
          .sidebar-backdrop { display: none; }
          .sidebar {
            position: sticky;
            transform: none;
            top: 58px;
            height: calc(100vh - 58px);
          }
          .sidebar-close { display: none; }
        }
      `})]})}function KO(){return u.jsxs("nav",{className:"bottom-nav",children:[Pb.map(({to:t,label:e,icon:n,end:r})=>u.jsxs(hr,{to:t,end:r,className:({isActive:i})=>"bottom-nav-btn"+(i?" bottom-nav-btn-active":""),children:[u.jsx(n,{size:20}),u.jsx("span",{children:e})]},t)),u.jsx("style",{children:`
        .bottom-nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          background: var(--surface);
          border-top: 1px solid var(--border);
          z-index: 20;
        }
        .bottom-nav-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 9px 0 8px;
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
          text-decoration: none;
        }
        .bottom-nav-btn-active { color: var(--orange); }

        @media (min-width: 900px) {
          .bottom-nav { display: none; }
        }
      `})]})}function HO(){const[t,e]=V.useState(!1);return u.jsxs("div",{className:"app-shell",children:[u.jsx($O,{onMenuClick:()=>e(!0)}),u.jsxs("div",{className:"app-body",children:[u.jsx(qO,{open:t,onClose:()=>e(!1)}),u.jsx("main",{className:"app-main",children:u.jsx("div",{className:"page-pad",children:u.jsx(RR,{})})})]}),u.jsx(KO,{})]})}function WO({inline:t=!1,label:e="Load ho raha hai..."}){return u.jsxs("div",{className:t?"loading-inline":"loading-full",children:[u.jsx("span",{className:"spinner"}),u.jsx("p",{children:e}),u.jsx("style",{children:`
        .loading-full {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: var(--text-muted);
        }
        .loading-inline {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 30px 0;
          color: var(--text-muted);
        }
        .spinner {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 3px solid var(--surface-2);
          border-top-color: var(--orange);
          animation: spin 0.7s linear infinite;
        }
        .loading-inline .spinner { width: 24px; height: 24px; border-width: 2.5px; }
        p { font-size: 13.5px; font-weight: 600; margin: 0; }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `})]})}function GO({children:t,allowRoles:e}){const{user:n,role:r,loading:i}=Xr(),s=Hr();return i?u.jsx(WO,{label:"Check kar rahe hain..."}):n?e&&!e.includes(r)?u.jsx("div",{className:"auth-wrap",children:u.jsxs("div",{className:"auth-card",style:{textAlign:"center"},children:[u.jsx("h1",{className:"brand-font auth-title",style:{fontSize:20},children:"Access Nahi Hai"}),u.jsxs("p",{className:"auth-sub",children:["Ye page sirf ",e.join(" / ")," role ke liye hai."]})]})}):t:u.jsx(kR,{to:"/login",state:{from:s},replace:!0})}function cg(t){if(typeof t=="string"&&(t.includes("offline")||t.includes("unavailable")))return"Network connection issue. Please check your internet.";switch(t){case"auth/invalid-email":return"Email format galat hai. Kripya sahi email dalein.";case"auth/user-not-found":case"auth/invalid-credential":return"Incorrect Email ya Password! (ईमेल या पासवर्ड गलत है)";case"auth/wrong-password":return"Galat password! (Incorrect password)";case"auth/email-already-in-use":return"Ye email pehle se registered hai. Kripya login karein.";case"auth/weak-password":return"Password kam se kam 6 characters ka hona chahiye.";case"auth/too-many-requests":return"Bahut zyada attempts ho gaye hain. Thodi der baad try karein ya password reset karein.";default:return t?`Error: ${t}`:"Login fail ho gaya. Kripya email aur password check karein."}}function QO(){const{login:t,resetPassword:e}=Xr(),n=Tn(),[r,i]=V.useState(""),[s,o]=V.useState(""),[a,c]=V.useState(!1),[d,f]=V.useState(""),[p,g]=V.useState(""),[S,A]=V.useState(!1),[T,P]=V.useState(!1);async function y(v){v.preventDefault(),f(""),g(""),A(!0);const k=r.trim().toLowerCase();try{await t(k,s),n("/",{replace:!0})}catch(O){console.warn("Firebase Login Error:",O),f(cg(O.code||O.message))}finally{A(!1)}}async function x(){const v=r.trim().toLowerCase();if(!v){f("Pehle apna email ID dalein.");return}P(!0);try{await e(v),g(`Password reset link '${v}' par bhej diya gaya hai! Apna Gmail inbox aur spam folder check karein.`),f("")}catch(k){f("Reset link bhejne me dikkat aayi: "+(k.message||k.code))}finally{P(!1)}}return u.jsxs("div",{className:"auth-wrap",children:[u.jsxs("div",{className:"auth-card",children:[u.jsx("div",{style:{textAlign:"center",marginBottom:"16px"},children:u.jsx("img",{src:"/logo.png",alt:"TyreSaathi Logo",style:{height:"50px",objectFit:"contain",borderRadius:"6px"},onError:v=>{v.target.src="/tyresaathi-logo.png"}})}),u.jsx("h1",{className:"brand-font auth-title",style:{textAlign:"center"},children:"Login to TyreSaathi"}),u.jsx("p",{className:"auth-sub",style:{textAlign:"center"},children:"Shop Owner & Customer Portal"}),d&&u.jsxs("div",{className:"auth-error-box",children:[u.jsxs("div",{className:"error-title-row",children:[u.jsx(Xw,{size:18,color:"#c0392b"}),u.jsx("strong",{children:d})]}),u.jsx("p",{className:"error-desc-text",children:"Firebase me ye email ya password match nahi hua. Aap niche diye gaye options use kar sakte hain:"}),u.jsxs("div",{className:"error-action-btns",children:[u.jsxs("button",{type:"button",className:"btn-quick-reset",disabled:T,onClick:x,children:[u.jsx(eP,{size:13})," ",T?"Bhej rahe hain...":"📩 Password Reset Link Bhejein"]}),u.jsxs(ye,{to:`/register?email=${encodeURIComponent(r)}`,className:"btn-quick-register",children:[u.jsx(dP,{size:13})," 🏪 Naya Shop Owner Account Banayein"]})]})]}),p&&u.jsxs("div",{className:"auth-success",style:{marginBottom:"16px",fontSize:"13px",lineHeight:1.4},children:["✅ ",p]}),u.jsxs("form",{onSubmit:y,children:[u.jsxs("div",{className:"auth-field",children:[u.jsx("label",{children:"Email Address (ईमेल आईडी)"}),u.jsx("input",{type:"email",value:r,onChange:v=>i(v.target.value),placeholder:"e.g. ucanmail@gmail.com / ucanmail195@gmail.com",required:!0,autoComplete:"email"})]}),u.jsxs("div",{className:"auth-field",children:[u.jsx("label",{children:"Password (पासवर्ड)"}),u.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[u.jsx("input",{type:a?"text":"password",value:s,onChange:v=>o(v.target.value),placeholder:"••••••••",required:!0,autoComplete:"current-password",style:{paddingRight:"40px"}}),u.jsx("button",{type:"button",onClick:()=>c(!a),style:{position:"absolute",right:"10px",background:"none",border:"none",color:"var(--text-muted)",cursor:"pointer",display:"flex",alignItems:"center",padding:"4px"},title:a?"Hide Password":"Show Password",children:a?u.jsx(JR,{size:18}):u.jsx(XR,{size:18})})]})]}),u.jsx("button",{className:"auth-btn",disabled:S,type:"submit",children:S?"कृपया प्रतीक्षा करें...":"Login (लॉग इन करें)"})]}),u.jsxs("div",{className:"auth-links",style:{marginTop:"16px",display:"flex",justifyContent:"space-between"},children:[u.jsx(ye,{to:"/forgot-password",children:"Forgot Password?"}),u.jsx(ye,{to:"/register",children:"Create a new account"})]})]}),u.jsx("style",{children:`
        .auth-error-box {
          background: #fdedec;
          border: 1.5px solid #e74c3c;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
          color: #2c3e50;
        }
        .error-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #c0392b;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .error-desc-text {
          font-size: 12px;
          color: #555;
          margin: 0 0 10px;
          line-height: 1.3;
        }
        .error-action-btns {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .btn-quick-reset {
          background: white;
          border: 1px solid #c0392b;
          color: #c0392b;
          padding: 7px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-quick-reset:hover {
          background: #fdedec;
        }
        .btn-quick-register {
          background: #c0392b;
          color: white;
          text-decoration: none;
          padding: 7px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-align: center;
        }
        .btn-quick-register:hover {
          background: #a93226;
        }
      `})]})}function YO(){const{register:t}=Xr(),e=Tn(),[n]=Hw(),r=n.get("email")||"",[i,s]=V.useState(ae.SHOP_OWNER),[o,a]=V.useState(""),[c,d]=V.useState(""),[f,p]=V.useState(""),[g,S]=V.useState(r),[A,T]=V.useState(""),[P,y]=V.useState(""),[x,v]=V.useState(!1);async function k(O){if(O.preventDefault(),y(""),i===ae.SHOP_OWNER&&!f.trim()){y("Dukan ka naam daalna zaroori hai.");return}v(!0);try{await t({name:o.trim(),phone:c.trim(),email:g.trim().toLowerCase(),password:A,role:i,shopName:f.trim()}),e("/",{replace:!0})}catch(M){console.warn("Registration Error:",M),y(cg(M.code||M.message))}finally{v(!1)}}return u.jsx("div",{className:"auth-wrap",children:u.jsxs("div",{className:"auth-card",children:[u.jsx("div",{style:{textAlign:"center",marginBottom:"12px"},children:u.jsx("img",{src:"/logo.png",alt:"TyreSaathi Logo",style:{height:"46px",objectFit:"contain",borderRadius:"6px"},onError:O=>{O.target.src="/tyresaathi-logo.png"}})}),u.jsx("h1",{className:"brand-font auth-title",style:{textAlign:"center"},children:"Account Banayein"}),u.jsx("p",{className:"auth-sub",style:{textAlign:"center"},children:"Customer ho ya Shop Owner, dono jud sakte hain"}),P&&u.jsx("div",{className:"auth-error",children:P}),u.jsxs("div",{className:"role-pick",children:[u.jsx("button",{type:"button",className:"role-btn"+(i===ae.SHOP_OWNER?" role-btn-active":""),onClick:()=>s(ae.SHOP_OWNER),children:"🏪 Shop Owner (दुकानदार)"}),u.jsx("button",{type:"button",className:"role-btn"+(i===ae.CUSTOMER?" role-btn-active":""),onClick:()=>s(ae.CUSTOMER),children:"👤 Customer"})]}),u.jsxs("form",{onSubmit:k,children:[u.jsxs("div",{className:"auth-field",children:[u.jsx("label",{children:"Aapka Naam (Full Name) *"}),u.jsx("input",{value:o,onChange:O=>a(O.target.value),required:!0,placeholder:"e.g. Ramesh Kumar"})]}),u.jsxs("div",{className:"auth-field",children:[u.jsx("label",{children:"Phone Number *"}),u.jsx("input",{type:"tel",value:c,onChange:O=>d(O.target.value),required:!0,placeholder:"98765 43210"})]}),i===ae.SHOP_OWNER&&u.jsxs("div",{className:"auth-field",children:[u.jsx("label",{children:"Dukan ka Naam (Shop / Center Name) *"}),u.jsx("input",{value:f,onChange:O=>p(O.target.value),placeholder:"Jaise: Shree Ram Tyre Care / National Tyre Hub",required:!0})]}),u.jsxs("div",{className:"auth-field",children:[u.jsx("label",{children:"Email Address *"}),u.jsx("input",{type:"email",value:g,onChange:O=>S(O.target.value),required:!0,placeholder:"aapka@email.com",autoComplete:"email"})]}),u.jsxs("div",{className:"auth-field",children:[u.jsx("label",{children:"Password (Kam se kam 6 akshar) *"}),u.jsx("input",{type:"password",value:A,onChange:O=>T(O.target.value),required:!0,minLength:6,placeholder:"••••••••",autoComplete:"new-password"})]}),u.jsx("button",{className:"auth-btn",disabled:x,children:x?"Creating Account...":"Register Account"})]}),u.jsx("div",{className:"auth-links",style:{justifyContent:"center",marginTop:"16px"},children:u.jsx(ye,{to:"/login",children:"Pehle se account hai? Login karein"})})]})})}function JO(){const{resetPassword:t}=Xr(),[e,n]=V.useState(""),[r,i]=V.useState(""),[s,o]=V.useState(!1),[a,c]=V.useState(!1);async function d(f){f.preventDefault(),i(""),c(!0);try{await t(e.trim()),o(!0)}catch(p){i(cg(p.code))}finally{c(!1)}}return u.jsx("div",{className:"auth-wrap",children:u.jsxs("div",{className:"auth-card",children:[u.jsx("h1",{className:"brand-font auth-title",children:"Password Reset"}),u.jsx("p",{className:"auth-sub",children:"Apna email daalein, reset link bhej denge"}),r&&u.jsx("div",{className:"auth-error",children:r}),s&&u.jsx("div",{className:"auth-success",children:"Reset link bhej diya gaya hai. Apna email inbox (aur spam folder) check karein."}),!s&&u.jsxs("form",{onSubmit:d,children:[u.jsxs("div",{className:"auth-field",children:[u.jsx("label",{children:"Email"}),u.jsx("input",{type:"email",value:e,onChange:f=>n(f.target.value),placeholder:"aapka@email.com",required:!0,autoComplete:"email"})]}),u.jsx("button",{className:"auth-btn",disabled:a,children:a?"Ruko...":"Reset Link Bhejein"})]}),u.jsx("div",{className:"auth-links",style:{justifyContent:"center"},children:u.jsx(ye,{to:"/login",children:"Login page par wapas jaayein"})})]})})}function XO(){const t=Tn(),[e,n]=V.useState(""),[r,i]=V.useState("all"),s=o=>{o.preventDefault();let a="/search?";e.trim()&&(a+=`q=${encodeURIComponent(e.trim())}&`),r!=="all"&&(a+=`brand=${encodeURIComponent(r)}&`),t(a)};return u.jsxs("div",{className:"home-page-container",children:[u.jsx("section",{className:"hero-banner-section",children:u.jsxs("div",{className:"hero-content",children:[u.jsx("span",{className:"hero-badge",children:"⚡ India's #1 Tyre & Auto Service Network"}),u.jsxs("h1",{className:"hero-heading",children:["Find the Perfect Tyre for Your ",u.jsx("span",{className:"highlight-text",children:"Car & Bike"})]}),u.jsx("p",{className:"hero-description",children:"Compare prices across nearest authorized tyre shops, get genuine brand warranty, and book 15-minute doorstep puncture or 3D alignment."}),u.jsxs("form",{className:"hero-search-card",onSubmit:s,children:[u.jsxs("div",{className:"search-field-unit",children:[u.jsx("label",{children:"Tyre Size / Vehicle"}),u.jsx("input",{type:"text",placeholder:"e.g. 185/65 R15, Swift, Activa...",value:e,onChange:o=>n(o.target.value)})]}),u.jsxs("div",{className:"search-field-unit",children:[u.jsx("label",{children:"Brand"}),u.jsxs("select",{value:r,onChange:o=>i(o.target.value),children:[u.jsx("option",{value:"all",children:"All Brands"}),$a.slice(0,15).map((o,a)=>u.jsx("option",{value:o.name,children:o.name},a))]})]}),u.jsxs("button",{type:"submit",className:"hero-search-btn",children:[u.jsx(js,{size:18})," Search Tyres"]})]}),u.jsxs("div",{className:"hero-features-strip",children:[u.jsxs("div",{className:"feature-item",children:[u.jsx(Yw,{size:18,color:"#27ae60"})," 100% Genuine Warranty"]}),u.jsxs("div",{className:"feature-item",children:[u.jsx(Pa,{size:18,color:"#c0392b"})," 500+ Verified Stores"]}),u.jsxs("div",{className:"feature-item",children:[u.jsx(uP,{size:18,color:"#ffc145"})," Doorstep Mobile Van"]})]})]})}),u.jsxs("section",{className:"home-section",children:[u.jsx("div",{className:"section-header-row",children:u.jsxs("div",{children:[u.jsx("h2",{className:"section-main-title",children:"Shop by Vehicle Category"}),u.jsx("p",{className:"section-sub-title",children:"Choose your vehicle type to see compatible tyres and sizes"})]})}),u.jsx("div",{className:"categories-card-grid",children:qa.map(o=>u.jsxs(ye,{to:`/search?category=${o.id}`,className:"cat-box-card",children:[u.jsx("span",{className:"cat-box-emoji",children:o.icon}),u.jsx("h3",{className:"cat-box-name",children:o.name}),u.jsxs("span",{className:"cat-browse-link",children:["View Tyres ",u.jsx(QR,{size:14})]})]},o.id))})]}),u.jsxs("section",{className:"home-section brands-section",children:[u.jsxs("div",{className:"section-header-row",children:[u.jsxs("div",{children:[u.jsx("h2",{className:"section-main-title",children:"Popular Tyre & Wheel Brands"}),u.jsx("p",{className:"section-sub-title",children:"Authorized sales and warranty for all leading manufacturers"})]}),u.jsx(ye,{to:"/search",className:"view-all-link",children:"All Brands →"})]}),u.jsx("div",{className:"brands-logo-row",children:$a.slice(0,12).map((o,a)=>u.jsxs(ye,{to:`/search?brand=${encodeURIComponent(o.name)}`,className:"brand-pill-box",children:[u.jsx("span",{className:"brand-name-bold",children:o.name}),u.jsx("span",{className:"brand-count-sub",children:o.count})]},a))})]}),u.jsxs("section",{className:"home-section",children:[u.jsxs("div",{className:"section-header-row",children:[u.jsxs("div",{children:[u.jsx("span",{className:"section-tag-red",children:"HOT DEALS"}),u.jsx("h2",{className:"section-main-title",children:"Featured Tyres & Accessories"}),u.jsx("p",{className:"section-sub-title",children:"Top rated products in stock with special shop discounts"})]}),u.jsx(ye,{to:"/search",className:"view-all-link",children:"View All in Search →"})]}),u.jsx("div",{className:"home-products-grid",children:rp.slice(0,4).map(o=>u.jsxs("div",{className:"home-product-card",children:[u.jsxs("div",{className:"product-image-box",children:[u.jsx("img",{src:o.images[0],alt:o.productName}),u.jsxs("span",{className:"dist-badge",children:["📍 ",o.distanceKm," km (Nearest)"]})]}),u.jsxs("div",{className:"product-info-box",children:[u.jsxs("span",{className:"brand-tag",children:[o.brandName," • ",o.sizeName]}),u.jsx("h4",{className:"prod-title",children:o.productName}),u.jsxs("div",{className:"price-line",children:[u.jsxs("span",{className:"deal-price",children:["₹",o.offerPrice]}),u.jsxs("span",{className:"mrp-price",children:["₹",o.originalPrice]})]}),u.jsx("div",{className:"shop-line",children:u.jsxs("small",{children:["🏪 ",o.shopName]})}),u.jsxs("div",{className:"btn-row",children:[u.jsxs(ye,{to:"/bookings",className:"btn-book",children:[u.jsx(to,{size:13})," Book Service"]}),u.jsx(ye,{to:"/store-location",className:"btn-call",title:"View Hub Location",children:u.jsx(Pa,{size:13})})]})]})]},o.id))})]}),u.jsxs("section",{className:"home-section service-cta-banner",children:[u.jsxs("div",{className:"service-banner-left",children:[u.jsx(If,{size:36,className:"wrench-icon-gold"}),u.jsxs("div",{children:[u.jsx("h3",{className:"banner-title",children:"Need Urgent Tyre Cut Repair or Puncture Fix?"}),u.jsx("p",{className:"banner-desc",children:"Book doorstep service or priority shop queue. Verified technician reaches within 30 minutes."})]})]}),u.jsx(ye,{to:"/bookings",className:"banner-cta-btn",children:"📅 Book Tyre Service Now"})]}),u.jsx("section",{className:"home-section store-cta-section",children:u.jsx("div",{className:"store-cta-card",children:u.jsxs("div",{className:"store-cta-text",children:[u.jsx("h2",{children:"📍 Find a TyreSaathi Authorized Store Near You"}),u.jsx("p",{children:"Over 500+ verified tyre shops with 3D Wheel Alignment machines, Nitrogen filling, and genuine tyre stocks."}),u.jsxs("div",{className:"store-sample-pills",children:[u.jsx("span",{children:"📍 Bengaluru"}),u.jsx("span",{children:"📍 Delhi NCR"}),u.jsx("span",{children:"📍 Mumbai"}),u.jsx("span",{children:"📍 Erode"}),u.jsx("span",{children:"📍 Hyderabad"})]}),u.jsx(ye,{to:"/store-location",className:"btn-store-explore",children:"Open Interactive Store Locator →"})]})})}),u.jsx("style",{children:`
        .home-page-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 10px 40px;
        }

        /* Hero Banner */
        .hero-banner-section {
          background: linear-gradient(135deg, #1e1e24 0%, #2c3e50 100%);
          color: white;
          border-radius: 16px;
          padding: 40px 30px;
          margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        .hero-content {
          max-width: 860px;
        }
        .hero-badge {
          display: inline-block;
          background: rgba(255, 107, 53, 0.2);
          border: 1px solid #ff6b35;
          color: #ff6b35;
          font-size: 12px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 14px;
        }
        .hero-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 42px;
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 12px;
          letter-spacing: 0.5px;
        }
        @media (max-width: 600px) {
          .hero-heading { font-size: 30px; }
        }
        .highlight-text {
          color: #ffc145;
        }
        .hero-description {
          font-size: 15px;
          color: #d1d5db;
          line-height: 1.5;
          margin: 0 0 24px;
        }
        .hero-search-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          gap: 14px;
          align-items: flex-end;
          color: #222;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .hero-search-card {
            flex-direction: column;
            align-items: stretch;
          }
        }
        .search-field-unit {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .search-field-unit label {
          font-size: 11.5px;
          font-weight: 700;
          color: #555;
          text-transform: uppercase;
        }
        .search-field-unit input,
        .search-field-unit select {
          padding: 10px 12px;
          border-radius: 6px;
          border: 1.5px solid #ddd;
          font-size: 13.5px;
          outline: none;
          color: #111;
          background: white;
        }
        .hero-search-btn {
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .hero-features-strip {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 13px;
          color: #e5e7eb;
          font-weight: 600;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Home Sections */
        .home-section {
          margin-bottom: 36px;
        }
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 18px;
        }
        .section-tag-red {
          font-size: 11px;
          background: #c0392b;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .section-main-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text);
          margin: 4px 0 2px;
        }
        .section-sub-title {
          font-size: 13px;
          color: var(--text-muted);
          margin: 0;
        }
        .view-all-link {
          font-size: 13px;
          color: #c0392b;
          font-weight: 700;
          text-decoration: none;
        }

        /* Categories Grid */
        .categories-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
        }
        .cat-box-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          color: var(--text);
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .cat-box-card:hover {
          border-color: #c0392b;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
        }
        .cat-box-emoji {
          font-size: 28px;
        }
        .cat-box-name {
          font-size: 14px;
          font-weight: 700;
          margin: 0;
          line-height: 1.3;
        }
        .cat-browse-link {
          font-size: 12px;
          color: #c0392b;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 2px;
          margin-top: 4px;
        }

        /* Brands Logo Row */
        .brands-logo-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }
        .brand-pill-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 14px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
          transition: all 0.15s ease;
        }
        .brand-pill-box:hover {
          border-color: #c0392b;
          background: var(--surface-2);
          transform: translateY(-2px);
        }
        .brand-name-bold {
          font-size: 14.5px;
          font-weight: 800;
          color: var(--text);
        }
        .brand-count-sub {
          font-size: 11px;
          color: var(--text-muted);
        }

        /* Products Grid */
        .home-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
        }
        .home-product-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .home-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border-color: #c0392b;
        }
        .product-image-box {
          position: relative;
          height: 160px;
          background: #f8f9fa;
        }
        .product-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .dist-badge {
          position: absolute;
          bottom: 8px;
          left: 8px;
          background: rgba(39, 174, 96, 0.95);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 4px;
        }
        .product-info-box {
          padding: 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .brand-tag {
          font-size: 11px;
          font-weight: 800;
          color: #c0392b;
          text-transform: uppercase;
        }
        .prod-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin: 4px 0 8px;
          line-height: 1.3;
          min-height: 36px;
        }
        .price-line {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 6px;
        }
        .deal-price {
          font-size: 19px;
          font-weight: 800;
          color: #27ae60;
        }
        .mrp-price {
          font-size: 12.5px;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .shop-line {
          font-size: 11.5px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .btn-row {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }
        .btn-book {
          flex: 1;
          background: #c0392b;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 700;
          padding: 8px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .btn-call {
          background: #27ae60;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Service Banner */
        .service-cta-banner {
          background: #1e1e24;
          color: white;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .service-banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .wrench-icon-gold {
          color: #ffc145;
        }
        .banner-title {
          font-size: 18px;
          font-weight: 800;
          margin: 0 0 4px;
        }
        .banner-desc {
          font-size: 13px;
          color: #aaa;
          margin: 0;
        }
        .banner-cta-btn {
          background: #ff6b35;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          font-size: 14px;
          white-space: nowrap;
        }

        /* Store Locator Banner */
        .store-cta-card {
          background: linear-gradient(135deg, #631936 0%, #3e0e20 100%);
          color: white;
          border-radius: 14px;
          padding: 30px;
        }
        .store-cta-text h2 {
          font-size: 22px;
          margin: 0 0 8px;
          font-weight: 800;
        }
        .store-cta-text p {
          font-size: 14px;
          color: #e0d0d8;
          margin: 0 0 16px;
          max-width: 600px;
        }
        .store-sample-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .store-sample-pills span {
          background: rgba(255, 255, 255, 0.15);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }
        .btn-store-explore {
          display: inline-block;
          background: white;
          color: #631936;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 800;
          text-decoration: none;
          font-size: 13.5px;
        }
      `})]})}function ZO(){const[t,e]=Hw(),n=t.get("q")||"",r=t.get("brand")||"all",i=t.get("category")||"all",[s,o]=V.useState(n),[a,c]=V.useState(r),[d,f]=V.useState(i),[p,g]=V.useState("all"),[S,A]=V.useState(rp);V.useEffect(()=>{n&&o(n),c(r),f(i)},[n,r,i]),V.useEffect(()=>{async function v(){try{const k=await bT(pu(xn,"products"));if(!k.empty){const O=k.docs.map(M=>({id:M.id,distanceKm:2.5,isNearest:!0,...M.data()}));A(M=>{const I=[...O,...rp];return Array.from(new Map(I.map(_=>[_.id,_])).values())})}}catch(k){console.warn("Using default catalog items:",k)}}v()},[]);const T=S.filter(v=>{var _,b,N,C,R,ue,xe,Ke;const k=s.toLowerCase().trim(),O=!k||((_=v.productName)==null?void 0:_.toLowerCase().includes(k))||((b=v.brandName)==null?void 0:b.toLowerCase().includes(k))||((N=v.sizeName)==null?void 0:N.toLowerCase().includes(k))||((C=v.vehicleTypeName)==null?void 0:C.toLowerCase().includes(k))||((R=v.description)==null?void 0:R.toLowerCase().includes(k))||((ue=v.shopName)==null?void 0:ue.toLowerCase().includes(k)),M=a==="all"||((xe=v.brandName)==null?void 0:xe.toLowerCase())===a.toLowerCase(),I=d==="all"||((Ke=v.categoryName)==null?void 0:Ke.toLowerCase().includes(d.toLowerCase()))||v.categoryKey===d,E=p==="all"||v.sizeName===p;return O&&M&&I&&E}),P=T.filter(v=>(v.distanceKm||0)<=5),y=T.filter(v=>(v.distanceKm||0)>5),x=()=>{o(""),c("all"),f("all"),g("all"),e({})};return u.jsxs("div",{className:"search-page-container",children:[u.jsxs("div",{className:"search-hero-bar",children:[u.jsx("h1",{className:"search-page-title",children:"🔍 Search Tyres, Tubes & Services"}),u.jsxs("p",{className:"search-page-sub",children:["Results are automatically sorted with ",u.jsx("strong",{children:"Nearest Shops (निकटतम दुकानें)"})," first for quick pickup and doorstep service."]}),u.jsx("div",{className:"search-input-row",children:u.jsxs("div",{className:"search-bar-wrap",children:[u.jsx(js,{size:20,className:"search-bar-icon"}),u.jsx("input",{type:"text",placeholder:"Search by Tyre Size (185/65 R15), Brand (Apollo, MRF), Bike or Car...",value:s,onChange:v=>o(v.target.value)}),s&&u.jsx("button",{className:"clear-search-btn",onClick:()=>o(""),children:"✕"})]})}),u.jsxs("div",{className:"search-filters-row",children:[u.jsxs("div",{className:"filter-select-wrap",children:[u.jsx("label",{children:"Brand:"}),u.jsxs("select",{value:a,onChange:v=>c(v.target.value),children:[u.jsx("option",{value:"all",children:"All Brands"}),$a.map((v,k)=>u.jsx("option",{value:v.name,children:v.name},k))]})]}),u.jsxs("div",{className:"filter-select-wrap",children:[u.jsx("label",{children:"Category:"}),u.jsxs("select",{value:d,onChange:v=>f(v.target.value),children:[u.jsx("option",{value:"all",children:"All Vehicle Categories"}),qa.map(v=>u.jsxs("option",{value:v.id,children:[v.icon," ",v.name]},v.id))]})]}),u.jsxs("div",{className:"filter-select-wrap",children:[u.jsx("label",{children:"Popular Size:"}),u.jsxs("select",{value:p,onChange:v=>g(v.target.value),children:[u.jsx("option",{value:"all",children:"All Sizes"}),u.jsx("option",{value:"185/65 R15",children:"185/65 R15 (Swift/Dzire/i20)"}),u.jsx("option",{value:"165/80 R14",children:"165/80 R14 (WagonR/Ritz)"}),u.jsx("option",{value:"205/55 R16",children:"205/55 R16 (Creta/Seltos/City)"}),u.jsx("option",{value:"215/60 R16",children:"215/60 R16 (Brezza/Nexon)"}),u.jsx("option",{value:"235/65 R17",children:"235/65 R17 (Scorpio/Thar)"}),u.jsx("option",{value:"90/90-12",children:"90/90-12 (Activa/Jupiter)"}),u.jsx("option",{value:"100/90-17",children:"100/90-17 (Pulsar/Apache/Filt)"}),u.jsx("option",{value:"10.00-20",children:"10.00-20 (Heavy Truck/Bus)"})]})]}),(a!=="all"||d!=="all"||p!=="all"||s)&&u.jsx("button",{className:"reset-all-filters-btn",onClick:x,children:"Reset Filters"})]})]}),u.jsx("div",{className:"search-results-layout",children:T.length===0?u.jsxs("div",{className:"no-results-card",children:[u.jsx(js,{size:48,color:"#aaa"}),u.jsx("h3",{children:"No Tyres or Services found"}),u.jsx("p",{children:'Try searching for popular sizes like "185/65 R15", "100/90-17" or brand names like "Apollo", "MRF", "CEAT".'}),u.jsx("button",{className:"btn-browse-all",onClick:x,children:"Browse All Products"})]}):u.jsxs(u.Fragment,{children:[P.length>0&&u.jsxs("div",{className:"results-group-section",children:[u.jsxs("div",{className:"group-section-header",children:[u.jsxs("div",{className:"header-left",children:[u.jsx("span",{className:"nearest-flame-icon",children:"⚡"}),u.jsx("h2",{className:"group-title",children:"Nearest Shop Products (निकटतम दुकानें)"})]}),u.jsxs("span",{className:"group-count-tag",children:[P.length," items available within 5 km"]})]}),u.jsx("div",{className:"products-card-grid",children:P.map(v=>u.jsx(x0,{product:v},v.id))})]}),y.length>0&&u.jsxs("div",{className:"results-group-section",style:{marginTop:"32px"},children:[u.jsxs("div",{className:"group-section-header",children:[u.jsxs("div",{className:"header-left",children:[u.jsx("span",{className:"other-shops-icon",children:"🚗"}),u.jsx("h2",{className:"group-title",children:"Other Partner Shops (अन्य क्षेत्रों की दुकानें)"})]}),u.jsxs("span",{className:"group-count-tag",style:{background:"#7f8c8d"},children:[y.length," items from other regional hubs"]})]}),u.jsx("div",{className:"products-card-grid",children:y.map(v=>u.jsx(x0,{product:v},v.id))})]})]})}),u.jsx("style",{children:`
        .search-page-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .search-hero-bar {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
        }
        .search-page-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
        }
        .search-page-sub {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0 0 16px;
        }
        .search-input-row {
          margin-bottom: 16px;
        }
        .search-bar-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-bar-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
        }
        .search-bar-wrap input {
          width: 100%;
          padding: 14px 44px 14px 44px;
          border-radius: 10px;
          border: 2px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 15px;
          font-weight: 600;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .search-bar-wrap input:focus {
          border-color: #c0392b;
        }
        .clear-search-btn {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 14px;
          cursor: pointer;
        }
        .search-filters-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .filter-select-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: 8px;
        }
        .filter-select-wrap label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .filter-select-wrap select {
          border: none;
          background: none;
          color: var(--text);
          font-size: 13px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }
        .reset-all-filters-btn {
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: #c0392b;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
        }

        /* Results Group */
        .results-group-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .group-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nearest-flame-icon {
          font-size: 22px;
        }
        .other-shops-icon {
          font-size: 20px;
        }
        .group-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text);
          margin: 0;
        }
        .group-count-tag {
          font-size: 12px;
          background: #27ae60;
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 700;
        }

        /* Product Grid */
        .products-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        @media (max-width: 600px) {
          .products-card-grid {
            grid-template-columns: 1fr;
          }
        }

        .no-results-card {
          padding: 80px 20px;
          text-align: center;
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: 16px;
          color: var(--text-muted);
        }
        .btn-browse-all {
          margin-top: 16px;
          background: #c0392b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
      `})]})}function x0({product:t}){const e=Array.isArray(t.images)&&t.images.length>0?t.images:["https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80"],[n,r]=V.useState(e[0]),i=(()=>{const s=Number(t.originalPrice||0),o=Number(t.offerPrice||0);return s>0&&o>0&&s>o?Math.round((s-o)/s*100):0})();return u.jsxs("div",{className:"product-item-card",children:[u.jsxs("div",{className:"card-img-wrapper",children:[u.jsx("img",{src:n,alt:t.productName,className:"main-card-img"}),i>0&&u.jsxs("span",{className:"card-discount-pill",children:[i,"% OFF"]}),u.jsxs("span",{className:`card-distance-pill ${(t.distanceKm||0)<=3?"dist-nearest":"dist-far"}`,children:["📍 ",t.distanceKm||2.5," km away"]})]}),e.length>1&&u.jsx("div",{className:"card-thumbs-strip",children:e.map((s,o)=>u.jsx("button",{type:"button",className:`card-mini-thumb ${n===s?"thumb-selected":""}`,onClick:()=>r(s),children:u.jsx("img",{src:s,alt:`angle ${o+1}`})},o))}),u.jsxs("div",{className:"card-info-content",children:[u.jsxs("div",{className:"brand-size-tag-row",children:[u.jsx("span",{className:"brand-badge-tag",children:t.brandName}),t.sizeName&&u.jsx("span",{className:"size-badge-tag",children:t.sizeName}),t.condition==="new"?u.jsx("span",{className:"condition-badge-tag",children:"🆕 New"}):u.jsx("span",{className:"condition-badge-tag",children:"♻️ Used"})]}),u.jsx("h3",{className:"card-product-title",children:t.productName}),u.jsxs("div",{className:"card-price-row",children:[u.jsxs("span",{className:"card-selling-price",children:["₹",t.offerPrice||"0"]}),Number(t.originalPrice)>Number(t.offerPrice)&&u.jsxs("span",{className:"card-mrp-price",children:["₹",t.originalPrice]})]}),u.jsxs("div",{className:"card-shop-banner",children:[u.jsxs("div",{className:"shop-name-row",children:[u.jsx("span",{className:"shop-icon",children:"🏪"}),u.jsx("span",{className:"shop-title-text",children:t.shopName||"TyreSaathi Partner"})]}),u.jsx("span",{className:"stock-info-text",children:Number(t.stock)>0?`✅ In Stock (${t.stock} pcs)`:"❌ Out of Stock"})]}),u.jsxs("div",{className:"card-action-buttons",children:[u.jsxs(ye,{to:"/bookings",className:"card-book-service-btn",children:[u.jsx(to,{size:14})," Book / Buy"]}),t.shopPhone&&u.jsxs("a",{href:`tel:${t.shopPhone}`,className:"card-call-shop-btn",title:"Call Shop",children:[u.jsx(Jc,{size:14})," Call"]})]})]}),u.jsx("style",{children:`
        .product-item-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 14px rgba(0,0,0,0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .product-item-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border-color: #c0392b;
        }
        .card-img-wrapper {
          position: relative;
          height: 180px;
          background: #f8f9fa;
          overflow: hidden;
        }
        .main-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .product-item-card:hover .main-card-img {
          transform: scale(1.04);
        }
        .card-discount-pill {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #c0392b;
          color: white;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 6px;
          border-radius: 4px;
        }
        .card-distance-pill {
          position: absolute;
          bottom: 10px;
          left: 10px;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 12px;
          color: white;
        }
        .dist-nearest {
          background: rgba(39, 174, 96, 0.95);
          box-shadow: 0 2px 6px rgba(39, 174, 96, 0.4);
        }
        .dist-far {
          background: rgba(44, 62, 80, 0.85);
        }
        .card-thumbs-strip {
          display: flex;
          gap: 6px;
          padding: 6px 12px;
          background: var(--surface-2);
          border-bottom: 1px solid var(--border);
        }
        .card-mini-thumb {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid var(--border);
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          background: none;
        }
        .thumb-selected {
          border-color: #c0392b;
          border-width: 2px;
        }
        .card-mini-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-info-content {
          padding: 14px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .brand-size-tag-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }
        .brand-badge-tag {
          font-size: 11px;
          font-weight: 800;
          color: #c0392b;
          text-transform: uppercase;
        }
        .size-badge-tag {
          font-size: 11px;
          font-weight: 700;
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 1px 6px;
          border-radius: 4px;
          color: var(--text);
        }
        .condition-badge-tag {
          font-size: 11px;
          color: var(--text-muted);
        }
        .card-product-title {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 8px;
          line-height: 1.3;
          min-height: 38px;
        }
        .card-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 10px;
        }
        .card-selling-price {
          font-size: 20px;
          font-weight: 800;
          color: #27ae60;
        }
        .card-mrp-price {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .card-shop-banner {
          background: var(--bg);
          padding: 8px 10px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .shop-name-row {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          color: var(--text);
        }
        .stock-info-text {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .card-action-buttons {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }
        .card-book-service-btn {
          flex: 1;
          background: #c0392b;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 8px;
          box-shadow: 0 2px 6px rgba(192, 57, 43, 0.25);
        }
        .card-call-shop-btn {
          background: #27ae60;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 9px 12px;
        }
      `})]})}const eM=[{id:"booking-101",customerName:"Ramesh Sharma",customerPhone:"98765-11223",customerEmail:"ramesh@example.com",serviceId:"cut_repair",serviceName:"Tyre Cut & Sidewall Repair (टायर कट रिपेयर)",vehicleType:"Car (Swift Dzire)",vehicleNumber:"KA 05 MN 4589",shopId:"shop-blr-central",shopName:"TyreSaathi Partner Hub — Central",shopPhone:"",date:"2026-08-18",timeSlot:"11:00 AM - 12:00 PM",notes:"Left rear tyre got cut from side on highway, need urgent repair.",status:"pending",createdAt:new Date().toISOString()},{id:"booking-102",customerName:"Pooja Verma",customerPhone:"98440-99887",customerEmail:"pooja@example.com",serviceId:"alignment",serviceName:"3D Wheel Alignment & Balancing (अलाइनमेंट)",vehicleType:"SUV (Hyundai Creta)",vehicleNumber:"KA 01 AB 8877",shopId:"shop-blr-central",shopName:"TyreSaathi Partner Hub — Central",shopPhone:"",date:"2026-08-18",timeSlot:"03:00 PM - 04:00 PM",notes:"Steering vibrating at 80 km/h, alignment needed.",status:"accepted",createdAt:new Date().toISOString()},{id:"booking-103",customerName:"Anil Kumar",customerPhone:"99001-22334",customerEmail:"anil@example.com",serviceId:"doorstep",serviceName:"Doorstep Emergency Assistance (घर/रास्ते पर सर्विस)",vehicleType:"Bike (Royal Enfield Classic 350)",vehicleNumber:"KA 04 EQ 1234",shopId:"shop-blr-south",shopName:"TyreSaathi Express Center — South",shopPhone:"",date:"2026-08-17",timeSlot:"06:00 PM - 07:00 PM",notes:"Flat tyre at home parking, need puncture fix and tube check.",status:"completed",createdAt:new Date().toISOString()}];function tM(){const{user:t,profile:e,isVendor:n}=Xr(),[r,i]=V.useState(eM),[s,o]=V.useState("all"),[a,c]=V.useState(!1),[d,f]=V.useState(!1),[p,g]=V.useState({serviceId:Jl[0].id,serviceName:Jl[0].name,shopId:_r[0].id,shopName:_r[0].name,shopPhone:_r[0].phone,customerName:(e==null?void 0:e.name)||"",customerPhone:(e==null?void 0:e.phone)||"",vehicleType:"Car / SUV",vehicleNumber:"",date:new Date().toISOString().split("T")[0],timeSlot:"10:00 AM - 11:00 AM",notes:""});V.useEffect(()=>{async function y(){try{const x=await bT(pu(xn,"bookings"));if(!x.empty){const v=x.docs.map(k=>({id:k.id,...k.data()}));i(v)}}catch(x){console.warn("Using local bookings state:",x)}}y()},[]);const S=async(y,x)=>{i(v=>v.map(k=>k.id===y?{...k,status:x}:k));try{await IT(_i(xn,"bookings",y),{status:x,updatedAt:Gs()})}catch(v){console.warn("Firestore update notice:",v)}},A=async y=>{if(y.preventDefault(),!p.customerName||!p.customerPhone||!p.vehicleNumber){alert("Kripya Naam, Phone aur Gaadi number zaroor bharein!");return}f(!0);const x={...p,customerId:(t==null?void 0:t.uid)||"guest_cust",customerEmail:(t==null?void 0:t.email)||"customer@tyresaathi.com",status:"pending",createdAt:new Date().toISOString()};try{const v=await ST(pu(xn,"bookings"),{...x,createdAtServer:Gs()});i(k=>[{id:v.id,...x},...k])}catch(v){console.warn("Local fallback save for booking:",v),i(k=>[{id:"b-"+Date.now(),...x},...k])}finally{f(!1),c(!1),alert("✅ Aapki Booking Shop Owner ko bhej di gayi hai! Dukan se call ya approval status yahan dikhega.")}},T=r.filter(y=>s==="all"?!0:y.status===s),P={all:r.length,pending:r.filter(y=>y.status==="pending").length,accepted:r.filter(y=>y.status==="accepted").length,in_progress:r.filter(y=>y.status==="in_progress").length,completed:r.filter(y=>y.status==="completed").length,rejected:r.filter(y=>y.status==="rejected").length};return u.jsxs("div",{className:"bookings-page-container",children:[u.jsxs("div",{className:"bookings-header-row",children:[u.jsxs("div",{children:[u.jsx("h1",{className:"page-heading",children:n?"🏪 Shop Owner Bookings Dashboard":"📅 Tyre Service Bookings"}),u.jsx("p",{className:"page-sub",children:n?"Aapki dukan par aayi hui customer service bookings ko Accept ya Reject karein.":"Tyre Cut Repair, Puncture, Fitting aur Doorstep Service ki bookings aur status dekhein."})]}),u.jsxs("button",{className:"book-service-cta",onClick:()=>c(!0),children:[u.jsx(sP,{size:16})," Book New Service (नई बुकिंग)"]})]}),u.jsxs("div",{className:"booking-filter-tabs",children:[u.jsxs("button",{className:`filter-tab ${s==="all"?"tab-active":""}`,onClick:()=>o("all"),children:["All (",P.all,")"]}),u.jsxs("button",{className:`filter-tab ${s==="pending"?"tab-active tab-pending":""}`,onClick:()=>o("pending"),children:["⏳ Pending / New (",P.pending,")"]}),u.jsxs("button",{className:`filter-tab ${s==="accepted"?"tab-active tab-accepted":""}`,onClick:()=>o("accepted"),children:["✅ Accepted (",P.accepted,")"]}),u.jsxs("button",{className:`filter-tab ${s==="in_progress"?"tab-active":""}`,onClick:()=>o("in_progress"),children:["🔧 In Progress (",P.in_progress,")"]}),u.jsxs("button",{className:`filter-tab ${s==="completed"?"tab-active tab-completed":""}`,onClick:()=>o("completed"),children:["🎉 Completed (",P.completed,")"]}),u.jsxs("button",{className:`filter-tab ${s==="rejected"?"tab-active tab-rejected":""}`,onClick:()=>o("rejected"),children:["❌ Rejected (",P.rejected,")"]})]}),u.jsx("div",{className:"bookings-list-grid",children:T.length===0?u.jsxs("div",{className:"no-bookings-card",children:[u.jsx(to,{size:48,color:"#aaa"}),u.jsx("h3",{children:"No Bookings in this status"}),u.jsx("p",{children:'Aap "Book New Service" button dabakar nayi booking create kar sakte hain.'})]}):T.map(y=>u.jsxs("div",{className:`booking-item-card status-border-${y.status}`,children:[u.jsxs("div",{className:"booking-card-top",children:[u.jsxs("div",{className:"service-info-group",children:[u.jsx("span",{className:"service-icon-circle",children:u.jsx(If,{size:18})}),u.jsxs("div",{children:[u.jsx("h3",{className:"booking-service-title",children:y.serviceName}),u.jsxs("span",{className:"booking-vehicle-tag",children:[u.jsx(GR,{size:13})," ",y.vehicleType," • ",u.jsx("strong",{children:y.vehicleNumber})]})]})]}),u.jsxs("div",{className:"booking-status-badge-wrap",children:[y.status==="pending"&&u.jsx("span",{className:"status-badge badge-pending",children:"⏳ Awaiting Shop Response"}),y.status==="accepted"&&u.jsx("span",{className:"status-badge badge-accepted",children:"✅ Booking Accepted"}),y.status==="rejected"&&u.jsx("span",{className:"status-badge badge-rejected",children:"❌ Booking Rejected"}),y.status==="in_progress"&&u.jsx("span",{className:"status-badge badge-inprogress",children:"🔧 Service in Progress"}),y.status==="completed"&&u.jsx("span",{className:"status-badge badge-completed",children:"🎉 Service Completed"})]})]}),u.jsxs("div",{className:"booking-meta-grid",children:[u.jsxs("div",{className:"meta-block",children:[u.jsx("span",{className:"meta-label",children:"👤 Customer Details:"}),u.jsx("span",{className:"meta-value",children:y.customerName}),u.jsxs("a",{href:`tel:${y.customerPhone}`,className:"meta-phone-link",children:[u.jsx(Jc,{size:12})," ",y.customerPhone]})]}),u.jsxs("div",{className:"meta-block",children:[u.jsx("span",{className:"meta-label",children:"🏪 Service Shop:"}),u.jsx("span",{className:"meta-value",children:y.shopName}),u.jsxs("span",{className:"meta-subtext",children:["📞 ",y.shopPhone]})]}),u.jsxs("div",{className:"meta-block",children:[u.jsx("span",{className:"meta-label",children:"⏰ Date & Time Slot:"}),u.jsx("span",{className:"meta-value",children:y.date}),u.jsx("span",{className:"meta-subtext",children:y.timeSlot})]})]}),y.notes&&u.jsxs("div",{className:"booking-notes-box",children:[u.jsx("strong",{children:"Customer Note:"}),' "',y.notes,'"']}),u.jsxs("div",{className:"booking-card-actions",children:[u.jsx("div",{className:"action-left-info",children:u.jsxs("span",{className:"time-ago-text",children:["Booking ID: #",y.id.slice(-6)]})}),u.jsxs("div",{className:"action-buttons-group",children:[y.status==="pending"&&u.jsxs(u.Fragment,{children:[u.jsxs("button",{className:"btn-action-reject",onClick:()=>S(y.id,"rejected"),children:[u.jsx(YR,{size:15})," Reject (अस्वीकार करें)"]}),u.jsxs("button",{className:"btn-action-accept",onClick:()=>S(y.id,"accepted"),children:[u.jsx(Qc,{size:15})," Accept (स्वीकार करें)"]})]}),y.status==="accepted"&&u.jsxs("button",{className:"btn-action-progress",onClick:()=>S(y.id,"in_progress"),children:[u.jsx(If,{size:14})," Start Service (काम शुरू करें)"]}),y.status==="in_progress"&&u.jsxs("button",{className:"btn-action-complete",onClick:()=>S(y.id,"completed"),children:[u.jsx(Qc,{size:14})," Mark Completed (पूरा हुआ)"]}),u.jsxs("a",{href:`tel:${y.customerPhone}`,className:"btn-action-call",children:[u.jsx(Jc,{size:14})," Call"]})]})]})]},y.id))}),a&&u.jsx("div",{className:"modal-backdrop",onClick:()=>c(!1),children:u.jsxs("div",{className:"modal-card",onClick:y=>y.stopPropagation(),children:[u.jsxs("div",{className:"modal-header",children:[u.jsx("h3",{className:"modal-title",children:"🛠️ Book a Tyre Service (सर्विस बुक करें)"}),u.jsx("button",{className:"modal-close-btn",onClick:()=>c(!1),children:"✕"})]}),u.jsxs("form",{onSubmit:A,className:"modal-form",children:[u.jsxs("div",{className:"modal-field",children:[u.jsx("label",{children:"Choose Service (सर्विस चुनें) *"}),u.jsx("select",{value:p.serviceId,onChange:y=>{const x=Jl.find(v=>v.id===y.target.value);g({...p,serviceId:y.target.value,serviceName:x?x.name:y.target.value})},children:Jl.map(y=>u.jsxs("option",{value:y.id,children:[y.name," (~₹",y.price,")"]},y.id))})]}),u.jsxs("div",{className:"modal-field",children:[u.jsx("label",{children:"Choose Preferred Shop (दुकान चुनें) *"}),u.jsx("select",{value:p.shopId,onChange:y=>{const x=_r.find(v=>v.id===y.target.value);g({...p,shopId:y.target.value,shopName:x?x.name:"TyreSaathi Shop",shopPhone:(x==null?void 0:x.phone)||""})},children:_r.map(y=>u.jsxs("option",{value:y.id,children:[y.name," (📍 ",y.distanceKm," km - ",y.city,")"]},y.id))})]}),u.jsxs("div",{className:"modal-grid-2",children:[u.jsxs("div",{className:"modal-field",children:[u.jsx("label",{children:"Aapka Naam (Customer Name) *"}),u.jsx("input",{type:"text",required:!0,placeholder:"Enter your name",value:p.customerName,onChange:y=>g({...p,customerName:y.target.value})})]}),u.jsxs("div",{className:"modal-field",children:[u.jsx("label",{children:"Phone Number *"}),u.jsx("input",{type:"tel",required:!0,placeholder:"98765 43210",value:p.customerPhone,onChange:y=>g({...p,customerPhone:y.target.value})})]})]}),u.jsxs("div",{className:"modal-grid-2",children:[u.jsxs("div",{className:"modal-field",children:[u.jsx("label",{children:"Vehicle Type *"}),u.jsxs("select",{value:p.vehicleType,onChange:y=>g({...p,vehicleType:y.target.value}),children:[u.jsx("option",{children:"Car / SUV"}),u.jsx("option",{children:"Motorcycle / Bike"}),u.jsx("option",{children:"Scooter / Activa"}),u.jsx("option",{children:"Commercial Truck / Bus"}),u.jsx("option",{children:"Auto Rickshaw"}),u.jsx("option",{children:"Tractor"})]})]}),u.jsxs("div",{className:"modal-field",children:[u.jsx("label",{children:"Vehicle Number (गाड़ी का नंबर) *"}),u.jsx("input",{type:"text",required:!0,placeholder:"e.g. DL 01 AB 1234",value:p.vehicleNumber,onChange:y=>g({...p,vehicleNumber:y.target.value})})]})]}),u.jsxs("div",{className:"modal-grid-2",children:[u.jsxs("div",{className:"modal-field",children:[u.jsx("label",{children:"Booking Date *"}),u.jsx("input",{type:"date",required:!0,value:p.date,onChange:y=>g({...p,date:y.target.value})})]}),u.jsxs("div",{className:"modal-field",children:[u.jsx("label",{children:"Preferred Time Slot *"}),u.jsxs("select",{value:p.timeSlot,onChange:y=>g({...p,timeSlot:y.target.value}),children:[u.jsx("option",{children:"09:00 AM - 10:00 AM"}),u.jsx("option",{children:"10:00 AM - 11:00 AM"}),u.jsx("option",{children:"11:00 AM - 12:00 PM"}),u.jsx("option",{children:"01:00 PM - 02:00 PM"}),u.jsx("option",{children:"03:00 PM - 04:00 PM"}),u.jsx("option",{children:"05:00 PM - 06:00 PM"}),u.jsx("option",{children:"07:00 PM - 08:00 PM"})]})]})]}),u.jsxs("div",{className:"modal-field",children:[u.jsx("label",{children:"Problem Notes / Special Request"}),u.jsx("textarea",{rows:2,placeholder:"Tell shop about tyre condition or location...",value:p.notes,onChange:y=>g({...p,notes:y.target.value})})]}),u.jsxs("div",{className:"modal-actions",children:[u.jsx("button",{type:"button",className:"btn-cancel",onClick:()=>c(!1),children:"Cancel"}),u.jsx("button",{type:"submit",className:"btn-submit-booking",disabled:d,children:d?"Sending...":"🚀 Confirm Booking (बुक करें)"})]})]})]})}),u.jsx("style",{children:`
        .bookings-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .bookings-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .bookings-header-row {
            flex-direction: column;
          }
        }
        .page-heading {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
        }
        .page-sub {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .book-service-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #c0392b;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
          white-space: nowrap;
        }
        .book-service-cta:hover {
          background: #a93226;
        }

        /* Filter Tabs */
        .booking-filter-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .filter-tab {
          padding: 8px 14px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }
        .tab-active {
          background: #1e1e24;
          color: white;
          border-color: #1e1e24;
        }
        .tab-pending.tab-active { background: #d35400; border-color: #d35400; }
        .tab-accepted.tab-active { background: #27ae60; border-color: #27ae60; }
        .tab-completed.tab-active { background: #2980b9; border-color: #2980b9; }
        .tab-rejected.tab-active { background: #c0392b; border-color: #c0392b; }

        /* Bookings List */
        .bookings-list-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .booking-item-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .status-border-pending { border-left: 5px solid #d35400; }
        .status-border-accepted { border-left: 5px solid #27ae60; }
        .status-border-in_progress { border-left: 5px solid #f39c12; }
        .status-border-completed { border-left: 5px solid #2980b9; }
        .status-border-rejected { border-left: 5px solid #c0392b; }

        .booking-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        @media (max-width: 650px) {
          .booking-card-top {
            flex-direction: column;
          }
        }
        .service-info-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .service-icon-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: color-mix(in srgb, #c0392b 10%, var(--surface));
          color: #c0392b;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .booking-service-title {
          font-size: 16.5px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 4px;
        }
        .booking-vehicle-tag {
          font-size: 12.5px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 700;
        }
        .badge-pending { background: #fef5e7; color: #d35400; }
        .badge-accepted { background: #eafaf1; color: #27ae60; }
        .badge-inprogress { background: #fef9e7; color: #b7950b; }
        .badge-completed { background: #ebf5fb; color: #2980b9; }
        .badge-rejected { background: #fdedec; color: #c0392b; }

        .booking-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
          background: var(--bg);
          padding: 14px;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .meta-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .meta-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .meta-value {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text);
        }
        .meta-subtext {
          font-size: 12px;
          color: var(--text-muted);
        }
        .meta-phone-link {
          font-size: 12px;
          color: #27ae60;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .booking-notes-box {
          font-size: 12.5px;
          background: var(--surface-2);
          padding: 8px 12px;
          border-radius: 6px;
          color: var(--text);
          margin-bottom: 14px;
        }

        .booking-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          gap: 10px;
          flex-wrap: wrap;
        }
        .time-ago-text {
          font-size: 12px;
          color: var(--text-muted);
        }
        .action-buttons-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .btn-action-accept {
          background: #27ae60;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-action-reject {
          background: var(--surface-2);
          color: #c0392b;
          border: 1px solid #c0392b;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-action-progress {
          background: #f39c12;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-action-complete {
          background: #2980b9;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-action-call {
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .modal-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          max-width: 540px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.2);
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }
        .modal-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: var(--text);
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: var(--text-muted);
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .modal-field label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .modal-field input,
        .modal-field select,
        .modal-field textarea {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }
        .modal-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 500px) {
          .modal-grid-2 {
            grid-template-columns: 1fr;
          }
        }
        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 14px;
        }
        .btn-cancel {
          flex: 1;
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-submit-booking {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .no-bookings-card {
          padding: 60px 20px;
          text-align: center;
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: 12px;
          color: var(--text-muted);
        }
      `})]})}function nM(){const[t,e]=V.useState(""),[n,r]=V.useState(_r[0]),[i,s]=V.useState("all"),o=_r.filter(c=>{const d=c.name.toLowerCase().includes(t.toLowerCase())||c.address.toLowerCase().includes(t.toLowerCase())||c.city.toLowerCase().includes(t.toLowerCase()),f=i==="all"||c.city.toLowerCase()===i.toLowerCase();return d&&f}),a=["all",...new Set(_r.map(c=>c.city))];return u.jsxs("div",{className:"store-location-page",children:[u.jsxs("div",{className:"breadcrumbs-bar",children:[u.jsx("span",{children:"Home"})," / ",u.jsx("span",{children:"Store Location"})]}),u.jsxs("div",{className:"store-locator-container",children:[u.jsxs("div",{className:"store-sidebar",children:[u.jsx("h1",{className:"store-main-title",children:"Find a Store Near You"}),u.jsxs("div",{className:"store-search-box",children:[u.jsxs("div",{className:"search-input-wrapper",children:[u.jsx(js,{size:18,className:"search-icon-inside"}),u.jsx("input",{type:"text",placeholder:"Search by city or store name",value:t,onChange:c=>e(c.target.value)})]}),u.jsx("button",{className:"search-submit-btn",onClick:()=>{},children:"Search"})]}),u.jsx("div",{className:"city-pill-row",children:a.map(c=>u.jsx("button",{className:`city-pill ${i===c?"city-pill-active":""}`,onClick:()=>s(c),children:c==="all"?"All Locations":c},c))}),u.jsxs("div",{className:"store-count-badge",children:["Showing ",o.length," TyreSaathi Authorized Stores"]}),u.jsx("div",{className:"store-list-scroll",children:o.length===0?u.jsxs("div",{className:"no-stores-found",children:[u.jsx(Pa,{size:32,color:"#999"}),u.jsxs("p",{children:['No stores found for "',t,'". Try another city.']})]}):o.map(c=>{var d;return u.jsxs("div",{className:`store-item-card ${(n==null?void 0:n.id)===c.id?"store-item-selected":""}`,onClick:()=>r(c),children:[u.jsxs("div",{className:"store-card-header",children:[u.jsx("h3",{className:"store-name",children:c.name}),c.isNearest&&u.jsx("span",{className:"nearest-tag",children:"⚡ Nearest"})]}),u.jsxs("div",{className:"store-rating-row",children:[u.jsxs("span",{className:"rating-badge",children:[u.jsx(lP,{size:13,fill:"#ffc107",color:"#ffc107"})," ",c.rating]}),u.jsxs("span",{className:"reviews-text",children:["(",c.reviewsCount," reviews)"]}),u.jsxs("span",{className:"distance-text",children:["📍 ",c.distanceKm," km away"]})]}),u.jsx("p",{className:"store-address",children:c.address}),u.jsx("div",{className:"store-services-chips",children:(d=c.servicesOffered)==null?void 0:d.slice(0,3).map((f,p)=>u.jsxs("span",{className:"svc-chip",children:["✓ ",f]},p))}),u.jsxs("div",{className:"store-card-actions",children:[u.jsxs("button",{className:"view-on-map-btn",onClick:f=>{f.stopPropagation(),r(c)},children:[u.jsx(Rv,{size:13})," View on Map"]}),u.jsxs("a",{href:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.name+" "+c.address)}`,target:"_blank",rel:"noreferrer",className:"google-maps-link",onClick:f=>f.stopPropagation(),children:["Open in Maps ",u.jsx(kv,{size:12})]})]})]},c.id)})})]}),u.jsxs("div",{className:"store-map-wrapper",children:[n&&u.jsxs("div",{className:"map-info-popup",children:[u.jsxs("div",{className:"popup-top",children:[u.jsxs("div",{children:[u.jsx("h4",{className:"popup-title",children:n.name}),u.jsx("p",{className:"popup-address",children:n.address})]}),u.jsx("a",{href:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.name+" "+n.address)}`,target:"_blank",rel:"noreferrer",className:"popup-external-icon",title:"Open in Google Maps",children:u.jsx(kv,{size:16})})]}),u.jsxs("div",{className:"popup-rating",children:[u.jsxs("span",{className:"star-num",children:[n.rating," ★"]}),u.jsxs("span",{className:"reviews-count",children:["(",n.reviewsCount," reviews)"]}),u.jsxs("span",{className:"open-badge",children:[u.jsx(Qc,{size:13,color:"#27ae60"})," Verified TyreSaathi Hub"]})]}),u.jsxs("div",{className:"popup-services",children:[u.jsx("strong",{children:"Services:"})," ",n.servicesOffered.join(" • ")]}),u.jsxs("div",{className:"popup-action-buttons",children:[u.jsx("a",{href:"/bookings",className:"popup-call-btn",style:{background:"#c0392b",color:"white",textDecoration:"none"},children:"📅 Book at this Hub"}),u.jsxs("a",{href:`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(n.address)}`,target:"_blank",rel:"noreferrer",className:"popup-directions-btn",children:[u.jsx(Rv,{size:14})," Get Directions"]})]})]}),u.jsx("div",{className:"interactive-map-canvas",children:u.jsx("iframe",{title:"Store Map",width:"100%",height:"100%",style:{border:0},loading:"lazy",src:`https://maps.google.com/maps?q=${n?encodeURIComponent(n.address):"Bengaluru"}&t=&z=14&ie=UTF8&iwloc=&output=embed`})})]})]}),u.jsx("style",{children:`
        .store-location-page {
          max-width: 1350px;
          margin: 0 auto;
          padding: 10px 15px 40px;
        }
        .breadcrumbs-bar {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 16px;
          display: flex;
          gap: 6px;
        }
        .breadcrumbs-bar span:last-child {
          color: var(--text);
          font-weight: 600;
        }
        .store-locator-container {
          display: flex;
          gap: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          min-height: 720px;
        }
        @media (max-width: 900px) {
          .store-locator-container {
            flex-direction: column;
          }
        }
        .store-sidebar {
          flex: 0 0 420px;
          max-width: 450px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border);
          background: var(--surface);
        }
        @media (max-width: 900px) {
          .store-sidebar {
            flex: none;
            max-width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--border);
          }
        }
        .store-main-title {
          font-size: 26px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 16px;
          letter-spacing: -0.5px;
        }
        .store-search-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon-inside {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        .search-input-wrapper input {
          width: 100%;
          padding: 12px 14px 12px 38px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 14px;
          outline: none;
        }
        .search-input-wrapper input:focus {
          border-color: #691b38;
        }
        .search-submit-btn {
          background: #631936;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .search-submit-btn:hover {
          background: #4b1227;
        }
        .city-pill-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .city-pill {
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--surface-2);
          color: var(--text);
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
        }
        .city-pill-active {
          background: #631936;
          color: white;
          border-color: #631936;
        }
        .store-count-badge {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 12px;
          font-weight: 600;
        }
        .store-list-scroll {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-right: 4px;
          max-height: 520px;
        }
        .store-item-card {
          padding: 16px;
          border-radius: 10px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .store-item-card:hover {
          border-color: #631936;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }
        .store-item-selected {
          border-color: #631936;
          background: color-mix(in srgb, #631936 5%, var(--surface));
          box-shadow: 0 2px 12px rgba(99, 25, 54, 0.15);
        }
        .store-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 6px;
        }
        .store-name {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .nearest-tag {
          font-size: 11px;
          background: #e67e22;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          white-space: nowrap;
        }
        .store-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          margin-bottom: 8px;
        }
        .rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-weight: 700;
          color: #d35400;
        }
        .reviews-text {
          color: var(--text-muted);
        }
        .distance-text {
          color: #27ae60;
          font-weight: 600;
          margin-left: auto;
        }
        .store-address {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0 0 10px;
        }
        .store-services-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }
        .svc-chip {
          font-size: 11px;
          background: var(--surface-2);
          color: var(--text);
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 600;
        }
        .store-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px dashed var(--border);
        }
        .view-on-map-btn {
          background: none;
          border: none;
          color: #631936;
          font-size: 12.5px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 0;
        }
        .view-on-map-btn:hover {
          text-decoration: underline;
        }
        .google-maps-link {
          font-size: 12px;
          color: var(--text-muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .google-maps-link:hover {
          color: #631936;
        }
        .store-map-wrapper {
          flex: 1;
          position: relative;
          min-height: 600px;
          display: flex;
          flex-direction: column;
        }
        .interactive-map-canvas {
          flex: 1;
          width: 100%;
          min-height: 600px;
          background: #e8ecef;
        }
        .map-info-popup {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 16px;
          max-width: 360px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          color: #222;
        }
        .popup-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 8px;
        }
        .popup-title {
          margin: 0 0 4px;
          font-size: 15px;
          font-weight: 700;
          color: #111;
        }
        .popup-address {
          margin: 0;
          font-size: 12px;
          color: #555;
          line-height: 1.3;
        }
        .popup-external-icon {
          color: #631936;
          padding: 4px;
          border-radius: 4px;
        }
        .popup-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          margin-bottom: 8px;
        }
        .star-num {
          font-weight: 700;
          color: #d35400;
        }
        .open-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #27ae60;
          font-weight: 600;
        }
        .popup-services {
          font-size: 11.5px;
          color: #666;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .popup-action-buttons {
          display: flex;
          gap: 8px;
        }
        .popup-call-btn,
        .popup-directions-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          text-align: center;
        }
        .popup-call-btn {
          background: #27ae60;
          color: white;
        }
        .popup-directions-btn {
          background: #631936;
          color: white;
        }
        .no-stores-found {
          padding: 40px 20px;
          text-align: center;
          color: var(--text-muted);
        }
      `})]})}function rM(){const{theme:t,toggleTheme:e}=t1(),{user:n,profile:r,updateUserProfile:i,logout:s}=Xr(),o=Tn(),[a,c]=V.useState(!1),[d,f]=V.useState(!1),[p,g]=V.useState(!1),[S,A]=V.useState(!1),[T,P]=V.useState({name:"",phone:"",email:"",role:ae.CUSTOMER,shopName:"",address:"",city:"",openingHours:"09:00 AM - 09:00 PM",photoURL:""});V.useEffect(()=>{(r||n)&&P({name:(r==null?void 0:r.name)||(n==null?void 0:n.displayName)||"",phone:(r==null?void 0:r.phone)||"",email:(r==null?void 0:r.email)||(n==null?void 0:n.email)||"",role:(r==null?void 0:r.role)||ae.CUSTOMER,shopName:(r==null?void 0:r.shopName)||"",address:(r==null?void 0:r.address)||"",city:(r==null?void 0:r.city)||"",openingHours:(r==null?void 0:r.openingHours)||"09:00 AM - 09:00 PM",photoURL:(r==null?void 0:r.photoURL)||(n==null?void 0:n.photoURL)||""})},[r,n]);const y=async M=>{if(!(!M||!n)){g(!0);try{const I=Sb(kb,`avatars/${n.uid}/${Date.now()}-${M.name.replace(/[^a-zA-Z0-9.]/g,"_")}`);await bb(I,M);const E=await Ib(I);P(_=>({..._,photoURL:E})),await i({photoURL:E})}catch(I){console.warn("Storage upload fallback to local reader:",I);const E=new FileReader;E.onload=async _=>{const b=_.target.result;P(N=>({...N,photoURL:b})),await i({photoURL:b})},E.readAsDataURL(M)}finally{g(!1)}}},x=async M=>{M.preventDefault(),f(!0),A(!1);try{await i({name:T.name.trim(),phone:T.phone.trim(),email:T.email.trim(),role:T.role,shopName:T.role===ae.SHOP_OWNER?T.shopName.trim():"",address:T.address.trim(),city:T.city.trim(),openingHours:T.openingHours.trim(),photoURL:T.photoURL,shopApproved:T.role===ae.SHOP_OWNER}),A(!0),c(!1),setTimeout(()=>A(!1),4e3)}catch(I){alert("Profile save error: "+I.message)}finally{f(!1)}};async function v(){await s(),o("/login",{replace:!0})}const k=T.photoURL||(r==null?void 0:r.photoURL)||(n==null?void 0:n.photoURL),O=T.name?T.name[0].toUpperCase():r!=null&&r.name?r.name[0].toUpperCase():"U";return u.jsxs("div",{className:"profile-page-wrap",children:[u.jsxs("div",{className:"profile-header-bar",children:[u.jsx("h1",{className:"brand-font page-title",children:"My Profile & Account"}),a?u.jsxs("button",{className:"btn-cancel-edit",onClick:()=>c(!1),children:[u.jsx(Zw,{size:15})," Cancel (रद्द करें)"]}):u.jsxs("button",{className:"btn-edit-toggle",onClick:()=>c(!0),children:[u.jsx(iP,{size:15})," Edit Profile (एडिट करें)"]})]}),S&&u.jsxs("div",{className:"save-success-banner",children:[u.jsx(Qc,{size:18})," Profile details saved successfully! (प्रोफाइल सफलतापूर्वक अपडेट हो गई)"]}),u.jsxs("div",{className:"profile-card",children:[u.jsxs("div",{className:"avatar-section-wrapper",children:[u.jsxs("div",{className:"profile-avatar-container",children:[k?u.jsx("img",{src:k,alt:"Profile",className:"profile-avatar-img"}):u.jsx("div",{className:"profile-avatar-initial",children:O}),u.jsxs("label",{className:"avatar-upload-overlay",title:"Change Profile Photo / Shop Logo",children:[u.jsx("input",{type:"file",accept:"image/*",onChange:M=>y(M.target.files[0]),style:{display:"none"}}),u.jsx(bf,{size:18,color:"white"})]})]}),p&&u.jsx("span",{className:"upload-photo-text",children:"Uploading photo..."}),!a&&u.jsxs("label",{className:"btn-change-photo-text",children:[u.jsx("input",{type:"file",accept:"image/*",onChange:M=>y(M.target.files[0]),style:{display:"none"}}),"📸 Change Photo / Logo"]})]}),a?u.jsxs("form",{className:"profile-edit-form",onSubmit:x,children:[u.jsxs("div",{className:"edit-role-section",children:[u.jsx("label",{className:"field-label-bold",children:"Account Role (अपना रोल चुनें):"}),u.jsxs("div",{className:"role-toggle-row",children:[u.jsx("button",{type:"button",className:`role-choice-btn ${T.role===ae.SHOP_OWNER?"role-choice-active":""}`,onClick:()=>P({...T,role:ae.SHOP_OWNER}),children:"🏪 Shop Owner (दुकानदार)"}),u.jsx("button",{type:"button",className:`role-choice-btn ${T.role===ae.CUSTOMER?"role-choice-active":""}`,onClick:()=>P({...T,role:ae.CUSTOMER}),children:"👤 Customer (ग्राहक)"})]})]}),u.jsxs("div",{className:"form-two-col",children:[u.jsxs("div",{className:"form-input-group",children:[u.jsx("label",{children:"Aapka Naam (Full Name) *"}),u.jsx("input",{type:"text",required:!0,value:T.name,onChange:M=>P({...T,name:M.target.value}),placeholder:"e.g. Heena Kausar / Rajesh Kumar"})]}),u.jsxs("div",{className:"form-input-group",children:[u.jsx("label",{children:"Mobile Number *"}),u.jsx("input",{type:"tel",required:!0,value:T.phone,onChange:M=>P({...T,phone:M.target.value}),placeholder:"e.g. 9910281345"})]})]}),T.role===ae.SHOP_OWNER&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"form-input-group",children:[u.jsx("label",{children:"Dukan ka Naam (Shop Name) *"}),u.jsx("input",{type:"text",required:!0,value:T.shopName,onChange:M=>P({...T,shopName:M.target.value}),placeholder:"e.g. UCAN Tyre Shop / Cherry Tyre Park"})]}),u.jsxs("div",{className:"form-two-col",children:[u.jsxs("div",{className:"form-input-group",children:[u.jsx("label",{children:"City (शहर)"}),u.jsx("input",{type:"text",value:T.city,onChange:M=>P({...T,city:M.target.value}),placeholder:"e.g. Bengaluru / Delhi / Mumbai"})]}),u.jsxs("div",{className:"form-input-group",children:[u.jsx("label",{children:"Opening Hours (दुकान का समय)"}),u.jsx("input",{type:"text",value:T.openingHours,onChange:M=>P({...T,openingHours:M.target.value}),placeholder:"09:00 AM - 09:00 PM"})]})]}),u.jsxs("div",{className:"form-input-group",children:[u.jsx("label",{children:"Dukan ka Pata (Shop Address)"}),u.jsx("input",{type:"text",value:T.address,onChange:M=>P({...T,address:M.target.value}),placeholder:"Shop No., Market Road, Near Landmark..."})]})]}),u.jsxs("div",{className:"form-input-group",children:[u.jsx("label",{children:"Email Address"}),u.jsx("input",{type:"email",value:T.email,onChange:M=>P({...T,email:M.target.value}),placeholder:"email@example.com"})]}),u.jsxs("div",{className:"edit-action-buttons",children:[u.jsx("button",{type:"button",className:"btn-form-cancel",onClick:()=>c(!1),disabled:d,children:"Cancel"}),u.jsx("button",{type:"submit",className:"btn-form-save",disabled:d,children:d?"Saving Changes...":"💾 Save Changes (बदलाव सेव करें)"})]})]}):u.jsxs("div",{className:"profile-view-details",children:[u.jsx("h2",{className:"profile-name-text",children:(r==null?void 0:r.name)||(n==null?void 0:n.displayName)||"TyreSaathi User"}),u.jsx("div",{className:"profile-role-badge",children:(r==null?void 0:r.role)===ae.SHOP_OWNER?u.jsxs("span",{className:"role-pill-shop",children:[u.jsx(Pv,{size:14})," Shop Owner · ",(r==null?void 0:r.shopName)||"My Tyre Shop"]}):u.jsxs("span",{className:"role-pill-customer",children:[u.jsx(Xc,{size:14})," Customer (ग्राहक)"]})}),u.jsxs("div",{className:"profile-info-grid",children:[u.jsxs("div",{className:"info-item",children:[u.jsxs("span",{className:"info-label",children:[u.jsx(Jc,{size:13})," Mobile Number"]}),u.jsx("span",{className:"info-value",children:(r==null?void 0:r.phone)||"Not added yet"})]}),u.jsxs("div",{className:"info-item",children:[u.jsxs("span",{className:"info-label",children:[u.jsx(tP,{size:13})," Email Address"]}),u.jsx("span",{className:"info-value",children:(r==null?void 0:r.email)||(n==null?void 0:n.email)||"Not added"})]}),(r==null?void 0:r.role)===ae.SHOP_OWNER&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"info-item",children:[u.jsxs("span",{className:"info-label",children:[u.jsx(Pv,{size:13})," Shop Name"]}),u.jsx("span",{className:"info-value",children:(r==null?void 0:r.shopName)||"UCAN Tyre Shop"})]}),u.jsxs("div",{className:"info-item",children:[u.jsxs("span",{className:"info-label",children:[u.jsx(Pa,{size:13})," Shop Location"]}),u.jsx("span",{className:"info-value",children:r!=null&&r.city?`${r.city}, ${r.address||""}`:"Not added"})]}),u.jsxs("div",{className:"info-item full-width",children:[u.jsxs("span",{className:"info-label",children:[u.jsx(Yw,{size:13})," Shop Verification"]}),u.jsx("span",{className:"info-value verified-text",children:"✅ Shop is fully active & approved on TyreSaathi"})]})]})]}),(r==null?void 0:r.role)===ae.SHOP_OWNER&&u.jsxs("div",{className:"shop-quick-actions",children:[u.jsxs(ye,{to:"/shop/add-product",className:"btn-shop-action",children:[u.jsx(Yc,{size:15})," Add Tyre / Product to Shop"]}),u.jsxs(ye,{to:"/bookings",className:"btn-shop-action secondary",children:[u.jsx(to,{size:15})," View Customer Bookings"]})]})]})]}),u.jsxs("div",{className:"settings-row",children:[u.jsx("span",{children:"Theme & Dark Mode"}),u.jsxs("button",{className:"theme-switch",onClick:e,children:[t==="dark"?u.jsx(Jw,{size:16}):u.jsx(Qw,{size:16}),t==="dark"?"Light Mode":"Dark Mode"]})]}),u.jsxs("button",{className:"logout-btn-full",onClick:v,children:[u.jsx(Gw,{size:16})," Logout from Account"]}),u.jsx("style",{children:`
        .profile-page-wrap {
          max-width: 740px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .profile-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .page-title {
          font-size: 24px;
          margin: 0;
          color: var(--text);
        }
        .btn-edit-toggle {
          background: #c0392b;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-cancel-edit {
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .save-success-banner {
          background: #eafaf1;
          border: 1.5px solid #27ae60;
          color: #27ae60;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .profile-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }

        /* Avatar */
        .avatar-section-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .profile-avatar-container {
          position: relative;
          width: 84px;
          height: 84px;
          border-radius: 50%;
          border: 3px solid #c0392b;
          overflow: hidden;
          background: #ff6b35;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }
        .profile-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-avatar-initial {
          color: white;
          font-size: 36px;
          font-weight: 800;
        }
        .avatar-upload-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
          cursor: pointer;
        }
        .profile-avatar-container:hover .avatar-upload-overlay {
          opacity: 1;
        }
        .btn-change-photo-text {
          font-size: 12px;
          color: #c0392b;
          font-weight: 700;
          cursor: pointer;
        }
        .upload-photo-text {
          font-size: 11.5px;
          color: #f39c12;
          font-weight: 700;
        }

        /* View Mode Details */
        .profile-view-details {
          text-align: center;
        }
        .profile-name-text {
          font-size: 22px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
        }
        .profile-role-badge {
          margin-bottom: 20px;
        }
        .role-pill-shop {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fdedec;
          color: #c0392b;
          border: 1px solid #c0392b;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
        }
        .role-pill-customer {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--surface-2);
          color: var(--text);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
        }

        .profile-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          text-align: left;
          background: var(--bg);
          padding: 18px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        @media (max-width: 600px) {
          .profile-info-grid {
            grid-template-columns: 1fr;
          }
        }
        .info-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .info-item.full-width {
          grid-column: 1 / -1;
        }
        .info-label {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .info-value {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
        }
        .verified-text {
          color: #27ae60;
        }

        .shop-quick-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .btn-shop-action {
          flex: 1;
          background: #c0392b;
          color: white;
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-shop-action.secondary {
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
        }

        /* ✏️ Edit Form */
        .profile-edit-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }
        .field-label-bold {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
          display: block;
        }
        .role-toggle-row {
          display: flex;
          gap: 10px;
        }
        .role-choice-btn {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .role-choice-active {
          border-color: #c0392b;
          background: #fdedec;
          color: #c0392b;
        }
        .form-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .form-two-col {
            grid-template-columns: 1fr;
          }
        }
        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .form-input-group label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .form-input-group input {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }
        .form-input-group input:focus {
          border-color: #c0392b;
        }

        .edit-action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .btn-form-cancel {
          flex: 1;
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-form-save {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
        }

        /* Settings */
        .settings-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 14px;
          font-weight: 600;
          font-size: 14px;
        }
        .theme-switch {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--surface-2);
          border: none;
          border-radius: 100px;
          padding: 7px 14px;
          font-weight: 700;
          font-size: 12.5px;
          cursor: pointer;
          color: var(--text);
        }
        .logout-btn-full {
          width: 100%;
          background: var(--surface-2);
          color: var(--danger);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
      `})]})}function iM(){return u.jsxs("div",{className:"status-page",children:[u.jsx(Xw,{size:48,color:"var(--orange)"}),u.jsx("h1",{className:"brand-font",children:"404"}),u.jsx("p",{children:"Ye page nahi mila."}),u.jsx(ye,{to:"/",className:"status-btn",children:"Home par jaayein"}),u.jsx("style",{children:`
        .status-page {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
        }
        .status-page h1 { font-size: 42px; margin: 6px 0 0; }
        .status-page p { color: var(--text-muted); margin: 0 0 10px; }
        .status-btn {
          background: var(--orange);
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 10px;
        }
      `})]})}const sM=[{id:"tyre",label:"🆕 Tyre (टायर)",icon:"🛞"},{id:"tube",label:"⭕ Tube (ट्यूब)",icon:"⭕"},{id:"flap",label:"◉ Flap (फ्लैप)",icon:"◉"},{id:"patch",label:"🩹 Patch (पैच)",icon:"🩹"},{id:"gater",label:"🔧 Gater (गेटर)",icon:"🔧"},{id:"custom",label:"✨ Alloy Wheels & Rims",icon:"✨"},{id:"service",label:"🛠️ Repair & Service (सर्विस)",icon:"🛠️"}],oM=[{id:0,title:"1. Main / Front View",desc:"सामने से फोटो (Main)"},{id:1,title:"2. Tread & Grooves Pattern",desc:"ग्रिप और डिजाइन (Tread)"},{id:2,title:"3. Sidewall & Brand Stamp",desc:"साइज और ब्रांड (Sidewall)"},{id:3,title:"4. Warranty / Extra Angle",desc:"वारंटी या अन्य एंगल"}];function w0(){const{user:t,currentUser:e,profile:n,userData:r}=Xr(),i=t||e,s=n||r,{id:o}=hR(),a=Tn(),c=!!o,[d,f]=V.useState(!1),[p,g]=V.useState(c),[S,A]=V.useState(null),[T,P]=V.useState({productType:"tyre",condition:"new",categoryKey:"passenger_car",categoryName:"Passenger Car & Hatchback",vehicleTypeName:"",brandName:"",sizeName:"",modelName:"",customBrand:"",customSize:"",customModel:"",productName:"",description:"",images:["","","",""],tyreType:"Tubeless",warranty:"",tubeSize:"",valveType:"TR",flapSize:"",patchType:"",serviceName:"",serviceDuration:"30 Mins",originalPrice:"",offerPrice:"",stock:"",published:!0});V.useEffect(()=>{async function _(){if(o)try{const b=_i(xn,"products",o),N=await ET(b);if(N.exists()){const C=N.data(),R=Array.isArray(C.images)?C.images:[],ue=[R[0]||"",R[1]||"",R[2]||"",R[3]||""];P(xe=>({...xe,...C,images:ue}))}}catch(b){console.error("Error loading product:",b)}finally{g(!1)}}_()},[o]);const y=Th[T.categoryKey]||Th.passenger_car||[],x=bh[T.categoryKey]||bh.passenger_car||[],v=(_,b)=>{P(N=>{const C={...N,[_]:b};if(_==="categoryKey"){const R=qa.find(Ke=>Ke.id===b);C.categoryName=R?R.name:b;const ue=Th[b]||[],xe=bh[b]||[];C.vehicleTypeName=ue[0]||"",C.sizeName=xe[0]||""}if(["brandName","modelName","sizeName","categoryKey","customBrand","customSize","customModel"].includes(_)){const R=C.brandName==="OTHER"?C.customBrand:C.brandName,ue=C.modelName==="OTHER"?C.customModel:C.modelName,xe=C.sizeName==="OTHER"?C.customSize:C.sizeName;C.productType==="tyre"&&(C.productName=`${R||""} ${ue||""} ${xe||""}`.trim())}return C})},k=async(_,b)=>{if(b){A(_);try{const N=(i==null?void 0:i.uid)||"demo_shop",C=Sb(kb,`products/${N}/${Date.now()}-slot${_}-${b.name.replace(/[^a-zA-Z0-9.]/g,"_")}`);await bb(C,b);const R=await Ib(C);P(ue=>{const xe=[...ue.images];return xe[_]=R,{...ue,images:xe}})}catch(N){console.warn("Storage upload fallback to base64 preview:",N);const C=new FileReader;C.onload=R=>{P(ue=>{const xe=[...ue.images];return xe[_]=R.target.result,{...ue,images:xe}})},C.readAsDataURL(b)}finally{A(null)}}},O=_=>{P(b=>{const N=[...b.images];return N[_]="",{...b,images:N}})},M=(()=>{const _=Number(T.originalPrice),b=Number(T.offerPrice);return _>0&&b>0&&_>b?Math.round((_-b)/_*100):0})(),I=async(_,b=!1)=>{_.preventDefault();const N=T.brandName==="OTHER"?T.customBrand:T.brandName,C=T.sizeName==="OTHER"?T.customSize:T.sizeName,R=T.modelName==="OTHER"?T.customModel:T.modelName,ue=T.productType==="service"?T.serviceName:(T.productName||`${N} ${C}`).trim();if(!ue){alert("Please enter a valid product / service name!");return}const xe=T.images.filter(Ke=>Ke&&Ke.trim()!=="");f(!0);try{const Ke={...T,productName:ue,brandName:N,sizeName:C,modelName:R,images:xe.length>0?xe:["https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80"],originalPrice:Number(T.originalPrice||0),offerPrice:Number(T.offerPrice||0),stock:T.productType==="service"?999:Number(T.stock||1),published:!b,shopId:(i==null?void 0:i.uid)||"demo_shop",shopName:(s==null?void 0:s.shopName)||"TyreSaathi Partner Shop",shopPhone:(s==null?void 0:s.phone)||"",updatedAt:Gs()};c?(await IT(_i(xn,"products",o),Ke),alert(b?"📝 Draft saved successfully!":"✅ Product updated successfully!")):(await ST(pu(xn,"products"),{...Ke,createdAt:Gs()}),alert(b?"📝 Draft saved successfully!":"🚀 Product published to TyreSaathi network!")),a("/search")}catch(Ke){console.error("Firestore save error:",Ke),alert("Saved locally! "+Ke.message),a("/search")}finally{f(!1)}};if(p)return u.jsx("div",{style:{padding:"40px",textAlign:"center"},children:"Loading product details..."});const E=T.images.filter(_=>_).length;return u.jsxs("div",{className:"add-product-container",children:[u.jsxs("div",{className:"page-header-row",children:[u.jsxs("div",{children:[u.jsx("h1",{className:"page-main-heading",children:c?"✏️ Edit Tyre & Service Details":"➕ Add Product / Tyre to Shop"}),u.jsx("p",{className:"page-subheading",children:"Choose tyre category, vehicle type, size and upload up to 4 photos for higher customer trust."})]}),u.jsx(ye,{to:"/search",className:"back-link-btn",children:"← View All Products"})]}),u.jsxs("div",{className:"form-preview-grid",children:[u.jsxs("form",{className:"add-product-form",onSubmit:_=>I(_,!1),children:[u.jsxs("div",{className:"form-section-card",children:[u.jsxs("h3",{className:"section-title",children:[u.jsx("span",{className:"step-num",children:"1"})," What are you adding? (सामान का प्रकार)"]}),u.jsx("div",{className:"product-type-pill-grid",children:sM.map(_=>u.jsxs("button",{type:"button",className:`type-select-pill ${T.productType===_.id?"type-pill-selected":""}`,onClick:()=>v("productType",_.id),children:[u.jsx("span",{className:"pill-icon",children:_.icon}),u.jsx("span",{className:"pill-label",children:_.label})]},_.id))}),T.productType!=="service"&&T.productType!=="custom"&&u.jsxs("div",{className:"condition-toggle-row",children:[u.jsx("label",{className:"field-label",children:"Condition (हालत):"}),u.jsxs("div",{className:"toggle-btn-group",children:[u.jsx("button",{type:"button",className:`toggle-option ${T.condition==="new"?"toggle-active":""}`,onClick:()=>v("condition","new"),children:"🆕 Brand New (नया)"}),u.jsx("button",{type:"button",className:`toggle-option ${T.condition==="old"?"toggle-active":""}`,onClick:()=>v("condition","old"),children:"♻️ Second Hand (पुराना / री-ट्रेडेड)"})]})]})]}),["tyre","tube","flap","custom"].includes(T.productType)&&u.jsxs("div",{className:"form-section-card",children:[u.jsxs("h3",{className:"section-title",children:[u.jsx("span",{className:"step-num",children:"2"})," Tyre Category & Size (कैटेगरी और साइज)"]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Tyre Category (गाड़ी की श्रेणी) *"}),u.jsx("select",{value:T.categoryKey,onChange:_=>v("categoryKey",_.target.value),className:"smart-select",children:qa.map(_=>u.jsxs("option",{value:_.id,children:[_.icon," ",_.name]},_.id))})]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Vehicle Type (गाड़ी का मॉडल) *"}),u.jsx("select",{value:T.vehicleTypeName,onChange:_=>v("vehicleTypeName",_.target.value),className:"smart-select",children:y.map((_,b)=>u.jsx("option",{value:_,children:_},b))})]}),u.jsxs("div",{className:"two-col-grid",children:[u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Tyre Brand (ब्रांड) *"}),u.jsxs("select",{value:T.brandName,onChange:_=>v("brandName",_.target.value),className:"smart-select",children:[$a.map((_,b)=>u.jsxs("option",{value:_.name,children:[_.name," ",_.popular?"★ Popular":""]},b)),u.jsx("option",{value:"OTHER",children:"✏️ Other (Custom Brand / अन्य)"})]}),T.brandName==="OTHER"&&u.jsx("input",{type:"text",placeholder:"Type brand name (जैसे MRF, Metro...)",value:T.customBrand,onChange:_=>v("customBrand",_.target.value),className:"smart-text-input custom-input",required:!0})]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Tyre Size (साइज) *"}),u.jsxs("select",{value:T.sizeName,onChange:_=>v("sizeName",_.target.value),className:"smart-select",children:[x.map((_,b)=>u.jsx("option",{value:_,children:_},b)),u.jsx("option",{value:"OTHER",children:"✏️ Other (Custom Size / अन्य साइज)"})]}),T.sizeName==="OTHER"&&u.jsx("input",{type:"text",placeholder:"Type size (जैसे 195/55 R16, 10.00-20...)",value:T.customSize,onChange:_=>v("customSize",_.target.value),className:"smart-text-input custom-input",required:!0})]})]}),u.jsxs("div",{className:"two-col-grid",children:[u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Model / Tread Pattern (पैटर्न)"}),u.jsxs("select",{value:T.modelName,onChange:_=>v("modelName",_.target.value),className:"smart-select",children:[BO.map((_,b)=>u.jsx("option",{value:_,children:_},b)),u.jsx("option",{value:"OTHER",children:"✏️ Custom Model Name"})]}),T.modelName==="OTHER"&&u.jsx("input",{type:"text",placeholder:"Type pattern/model (जैसे Zapper, Milaze...)",value:T.customModel,onChange:_=>v("customModel",_.target.value),className:"smart-text-input custom-input"})]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Tyre Construction"}),u.jsxs("select",{value:T.tyreType,onChange:_=>v("tyreType",_.target.value),className:"smart-select",children:[u.jsx("option",{value:"Tubeless",children:"Tubeless (ट्यूबलेस)"}),u.jsx("option",{value:"Tube Type",children:"Tube Type (ट्यूब वाला)"}),u.jsx("option",{value:"Radial",children:"Radial Steel Belted"}),u.jsx("option",{value:"Bias / Nylon",children:"Bias / Nylon Ply"})]})]})]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Product Full Title (ग्राहक को दिखने वाला नाम)"}),u.jsx("input",{type:"text",value:T.productName,onChange:_=>v("productName",_.target.value),placeholder:"Product Title",className:"smart-text-input",required:!0})]})]}),T.productType==="service"&&u.jsxs("div",{className:"form-section-card",children:[u.jsxs("h3",{className:"section-title",children:[u.jsx("span",{className:"step-num",children:"2"})," Service Details (सर्विस की जानकारी)"]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Service Name (सर्विस का नाम) *"}),u.jsx("input",{type:"text",value:T.serviceName,onChange:_=>v("serviceName",_.target.value),placeholder:"e.g. Tyre Cut Repair / Wheel Alignment",className:"smart-text-input",required:!0})]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Approx Time Taken (समय)"}),u.jsx("input",{type:"text",value:T.serviceDuration,onChange:_=>v("serviceDuration",_.target.value),placeholder:"e.g. 30 Mins",className:"smart-text-input"})]})]}),u.jsxs("div",{className:"form-section-card",children:[u.jsxs("div",{className:"photo-section-header",children:[u.jsxs("div",{children:[u.jsxs("h3",{className:"section-title",style:{margin:0},children:[u.jsx("span",{className:"step-num",children:"3"})," Upload 4 Photos (4 फोटो अपलोड करें)"]}),u.jsx("p",{className:"section-subtext",children:"4 alag-alag angles se photo lagayein taaki customer aasani se pasand kare."})]}),u.jsxs("span",{className:"photos-counter-tag",children:[E," / 4 Uploaded"]})]}),u.jsx("div",{className:"four-photo-slots-grid",children:oM.map(_=>{const b=T.images[_.id],N=S===_.id;return u.jsxs("div",{className:"photo-slot-box",children:[u.jsx("div",{className:"slot-title-bar",children:u.jsx("span",{className:"slot-label",children:_.title})}),b?u.jsxs("div",{className:"slot-img-preview-wrap",children:[u.jsx("img",{src:b,alt:_.title,className:"slot-preview-img"}),u.jsxs("button",{type:"button",className:"slot-remove-btn",onClick:()=>O(_.id),title:"Remove Photo",children:[u.jsx(cP,{size:14})," Remove"]})]}):u.jsxs("label",{className:"slot-upload-dropzone",children:[u.jsx("input",{type:"file",accept:"image/*",onChange:C=>k(_.id,C.target.files[0]),style:{display:"none"}}),N?u.jsxs("div",{className:"uploading-spinner-box",children:[u.jsx("span",{className:"upload-spin"}),u.jsx("span",{children:"Uploading..."})]}):u.jsxs(u.Fragment,{children:[u.jsx(bf,{size:24,className:"camera-icon-muted"}),u.jsx("span",{className:"slot-cta-text",children:"Click to Add Photo"}),u.jsx("small",{className:"slot-desc-text",children:_.desc})]})]})]},_.id)})})]}),u.jsxs("div",{className:"form-section-card",children:[u.jsxs("h3",{className:"section-title",children:[u.jsx("span",{className:"step-num",children:"4"})," Pricing & Stock (दाम और स्टॉक)"]}),u.jsx("p",{className:"section-subtext",children:"अपना सही MRP और सेलिंग प्राइस डालें — वेबसाइट पर ग्राहक को यही दाम दिखेगा।"}),u.jsxs("div",{className:"two-col-grid",children:[u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"MRP (₹ Original Price)"}),u.jsx("input",{type:"number",value:T.originalPrice,onChange:_=>v("originalPrice",_.target.value),placeholder:"उदा: 4800 (MRP)",className:"smart-text-input"})]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",style:{color:"#27ae60",fontWeight:700},children:"Selling / Offer Price (₹ सेलिंग प्राइस / ग्राहक का दाम) *"}),u.jsx("input",{type:"number",value:T.offerPrice,onChange:_=>v("offerPrice",_.target.value),placeholder:"उदा: 4199 (दाम दर्ज करें)",className:"smart-text-input highlight-price-input",required:!0})]})]}),T.productType!=="service"&&u.jsxs("div",{className:"two-col-grid",children:[u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Stock Quantity (कितने पीस उपलब्ध हैं?) *"}),u.jsx("input",{type:"number",value:T.stock,onChange:_=>v("stock",_.target.value),placeholder:"उदा: 5 (उपलब्ध पीस)",min:"0",className:"smart-text-input",required:!0})]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Warranty / Guarantee Details"}),u.jsx("input",{type:"text",value:T.warranty,onChange:_=>v("warranty",_.target.value),placeholder:"उदा: 5 Years Warranty (वैकल्पिक)",className:"smart-text-input"})]})]}),u.jsxs("div",{className:"input-field-group",children:[u.jsx("label",{className:"field-label",children:"Extra Description / Shop Notes (अतिरिक्त विवरण)"}),u.jsx("textarea",{value:T.description,onChange:_=>v("description",_.target.value),placeholder:"उदा: नई फिटिंग उपलब्ध, 5 साल वारंटी, तुरंत डिलीवरी...",rows:3,className:"smart-textarea"})]}),u.jsxs("div",{className:"form-action-row",children:[u.jsx("button",{type:"button",className:"save-draft-btn",disabled:d,onClick:_=>I(_,!0),children:"📝 Save as Draft"}),u.jsx("button",{type:"submit",className:"publish-submit-btn",disabled:d,children:d?"⏳ Publishing...":c?"✅ Update Product":"🚀 Publish to TyreSaathi"})]})]})]}),u.jsx("div",{className:"live-preview-sidebar",children:u.jsxs("div",{className:"preview-sticky-card",children:[u.jsxs("div",{className:"preview-header",children:[u.jsx("span",{className:"live-pulse-dot"}),u.jsx("h4",{children:"👁️ लाइव प्रीव्यू (Live Customer View)"}),u.jsx("span",{className:"preview-tag",children:"Preview"})]}),u.jsx("p",{style:{fontSize:"11.5px",color:"var(--text-muted)",margin:"0 0 10px",lineHeight:1.3},children:"ℹ️ यह कार्ड सिर्फ आपको दिखाने के लिए है कि फॉर्म भरने के बाद यह सामान वेबसाइट पर ग्राहक को कैसा दिखेगा।"}),u.jsxs("div",{className:"preview-main-img-box",children:[T.images.find(_=>_)?u.jsx("img",{src:T.images.find(_=>_),alt:"Product Preview",className:"preview-img-active"}):u.jsxs("div",{className:"preview-img-empty",children:[u.jsx(bf,{size:36,color:"#aaa"}),u.jsx("span",{children:"फोटो अपलोड करने पर यहाँ दिखेगी"})]}),M>0&&u.jsxs("span",{className:"preview-discount-badge",children:[M,"% OFF"]})]}),u.jsx("div",{className:"preview-thumbs-row",children:T.images.map((_,b)=>u.jsx("div",{className:`preview-thumb ${_?"thumb-has-img":"thumb-empty"}`,children:_?u.jsx("img",{src:_,alt:`Thumb ${b+1}`}):u.jsx("span",{children:b+1})},b))}),u.jsxs("div",{className:"preview-body",children:[u.jsx("span",{className:"preview-category-badge",children:T.categoryName||"Vehicle Category"}),u.jsx("h3",{className:"preview-product-title",children:T.productType==="service"?T.serviceName||"सर्विस का नाम...":T.productName||"उत्पाद का नाम (ऑटो जनरेट होगा)..."}),u.jsx("div",{className:"preview-price-box",children:T.offerPrice?u.jsxs(u.Fragment,{children:[u.jsxs("span",{className:"preview-offer-price",children:["₹",T.offerPrice]}),Number(T.originalPrice)>Number(T.offerPrice)&&u.jsxs("span",{className:"preview-mrp",children:["₹",T.originalPrice]})]}):u.jsx("span",{className:"preview-offer-price",style:{color:"var(--text-muted)",fontSize:"16px"},children:"₹ -- (दाम दर्ज करें)"})}),u.jsxs("div",{className:"preview-features-list",children:[u.jsxs("div",{className:"preview-feature-item",children:[u.jsx("strong",{children:"🏷️ Brand:"})," ",T.brandName==="OTHER"?T.customBrand||"Custom":T.brandName||"चुनें"]}),T.sizeName&&u.jsxs("div",{className:"preview-feature-item",children:[u.jsx("strong",{children:"📏 Size:"})," ",T.sizeName==="OTHER"?T.customSize||"Custom":T.sizeName]}),T.productType!=="service"&&u.jsxs("div",{className:"preview-feature-item",children:[u.jsx("strong",{children:"📦 Stock:"})," ",u.jsx("span",{style:{color:Number(T.stock)>0?"#27ae60":"var(--text-muted)",fontWeight:700},children:Number(T.stock)>0?`${T.stock} Pieces in Stock`:T.stock===""?"संख्या दर्ज करें":"Out of Stock"})]}),u.jsxs("div",{className:"preview-feature-item",children:[u.jsx("strong",{children:"🏪 Shop:"})," ",(s==null?void 0:s.shopName)||"आपकी दुकान का नाम"]})]})]})]})})]}),u.jsx("style",{children:`
        .add-product-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .page-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 14px;
        }
        .page-main-heading {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
        }
        .page-subheading {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .back-link-btn {
          font-size: 13px;
          color: var(--orange);
          text-decoration: none;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 6px;
          background: var(--surface-2);
        }
        .form-preview-grid {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }
        @media (max-width: 950px) {
          .form-preview-grid {
            flex-direction: column;
          }
        }
        .add-product-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-section-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .step-num {
          background: #c0392b;
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
        }
        .product-type-pill-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 10px;
          margin-bottom: 14px;
        }
        .type-select-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 8px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .type-select-pill:hover {
          border-color: #c0392b;
        }
        .type-pill-selected {
          border-color: #c0392b;
          background: color-mix(in srgb, #c0392b 10%, var(--bg));
          color: #c0392b;
        }
        .pill-icon {
          font-size: 18px;
        }
        .condition-toggle-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 10px;
          border-top: 1px dashed var(--border);
        }
        .toggle-btn-group {
          display: flex;
          gap: 8px;
        }
        .toggle-option {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
        }
        .toggle-active {
          background: #c0392b;
          color: white;
          border-color: #c0392b;
        }
        .input-field-group {
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .field-label {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .smart-select,
        .smart-text-input,
        .smart-textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }
        .smart-select:focus,
        .smart-text-input:focus,
        .smart-textarea:focus {
          border-color: #c0392b;
        }
        .custom-input {
          margin-top: 6px;
          border-color: #c0392b;
        }
        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .two-col-grid {
            grid-template-columns: 1fr;
          }
        }
        .highlight-price-input {
          border-color: #27ae60;
          font-weight: 700;
          font-size: 15px;
        }

        /* 📸 4 Photo Slots Grid */
        .photo-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .section-subtext {
          font-size: 12px;
          color: var(--text-muted);
          margin: 4px 0 0;
        }
        .photos-counter-tag {
          font-size: 12px;
          background: #27ae60;
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          font-weight: 700;
        }
        .four-photo-slots-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (max-width: 600px) {
          .four-photo-slots-grid {
            grid-template-columns: 1fr;
          }
        }
        .photo-slot-box {
          border: 1.5px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          background: var(--bg);
        }
        .slot-title-bar {
          background: var(--surface-2);
          padding: 6px 10px;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text);
          border-bottom: 1px solid var(--border);
        }
        .slot-upload-dropzone {
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          padding: 10px;
          text-align: center;
          border: 2px dashed transparent;
          transition: background 0.15s ease;
        }
        .slot-upload-dropzone:hover {
          background: color-mix(in srgb, #c0392b 5%, var(--bg));
          border-color: #c0392b;
        }
        .slot-cta-text {
          font-size: 12px;
          font-weight: 700;
          color: #c0392b;
        }
        .slot-desc-text {
          font-size: 10.5px;
          color: var(--text-muted);
        }
        .slot-img-preview-wrap {
          position: relative;
          height: 120px;
          background: #000;
        }
        .slot-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slot-remove-btn {
          position: absolute;
          bottom: 6px;
          right: 6px;
          background: rgba(192, 57, 43, 0.9);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 3px 6px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
        .uploading-spinner-box {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #c0392b;
          font-weight: 700;
        }

        /* Action Buttons */
        .form-action-row {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }
        .save-draft-btn {
          flex: 1;
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
        }
        .publish-submit-btn {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14.5px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.3);
        }

        /* Live Preview Sidebar */
        .live-preview-sidebar {
          flex: 0 0 340px;
          max-width: 360px;
        }
        .preview-sticky-card {
          position: sticky;
          top: 80px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
        }
        .preview-header {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          background: var(--surface-2);
        }
        .preview-header h4 {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
        }
        .preview-tag {
          font-size: 11px;
          color: var(--text-muted);
        }
        .preview-main-img-box {
          position: relative;
          height: 200px;
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .preview-img-active {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .preview-img-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 12px;
        }
        .preview-discount-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #c0392b;
          color: white;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11.5px;
          font-weight: 800;
        }
        .preview-thumbs-row {
          display: flex;
          gap: 6px;
          padding: 10px 14px;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .preview-thumb {
          flex: 1;
          height: 48px;
          border-radius: 4px;
          border: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface);
          font-size: 11px;
          color: var(--text-muted);
        }
        .preview-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .preview-body {
          padding: 14px 16px;
        }
        .preview-category-badge {
          font-size: 11px;
          color: #c0392b;
          font-weight: 700;
          text-transform: uppercase;
        }
        .preview-product-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin: 4px 0 8px;
          line-height: 1.3;
        }
        .preview-price-box {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }
        .preview-offer-price {
          font-size: 22px;
          font-weight: 800;
          color: #27ae60;
        }
        .preview-mrp {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .preview-features-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          font-size: 12px;
          color: var(--text-muted);
          background: var(--bg);
          padding: 10px;
          border-radius: 6px;
        }
      `})]})}function E0(){const t=Tn();return u.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px",fontFamily:"sans-serif"},children:[u.jsx("button",{onClick:()=>t(-1),style:{marginBottom:"20px",padding:"8px 16px",cursor:"pointer",background:"#f0f0f0",border:"1px solid #ccc",borderRadius:"4px"},children:"← Back"}),u.jsx("h1",{style:{textAlign:"center",color:"#333"},children:"Privacy Policy for TyreSaathi"}),u.jsxs("p",{style:{textAlign:"center",color:"#666"},children:[u.jsx("strong",{children:"Last Updated:"})," ",new Date().toLocaleDateString()]}),u.jsx("hr",{style:{margin:"20px 0"}}),u.jsx("h2",{children:"1. Introduction"}),u.jsxs("p",{children:["Welcome to ",u.jsx("strong",{children:"TyreSaathi"}),". We value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our web application."]}),u.jsx("h2",{children:"2. Information We Collect"}),u.jsx("p",{children:"When you register and use TyreSaathi, we may collect the following information:"}),u.jsxs("ul",{children:[u.jsxs("li",{children:[u.jsx("strong",{children:"Personal Details:"})," Name, Email Address, and Phone Number."]}),u.jsxs("li",{children:[u.jsx("strong",{children:"Shop Details:"})," Shop Name, Location, and Inventory data (for Shop Owners)."]}),u.jsxs("li",{children:[u.jsx("strong",{children:"Usage Data:"})," Information about how you interact with our platform to improve user experience."]})]}),u.jsx("h2",{children:"3. How We Use Your Information"}),u.jsx("p",{children:"We use the collected data strictly to provide and improve our services:"}),u.jsxs("ul",{children:[u.jsx("li",{children:"To create and manage your account."}),u.jsx("li",{children:"To connect customers with shop owners for tyre-related services and products."}),u.jsx("li",{children:"To send important updates regarding bookings or security alerts."}),u.jsxs("li",{children:["We ",u.jsx("strong",{children:"do not"})," sell your personal data to any third-party marketing companies."]})]}),u.jsx("h2",{children:"4. Data Security (Firebase)"}),u.jsxs("p",{children:["Your data is stored securely using ",u.jsx("strong",{children:"Google Firebase"}),". We use industry-standard encryption and security rules to ensure that your personal information, passwords, and shop data remain safe and are only accessible to authorized users."]}),u.jsx("h2",{children:"5. User Rights"}),u.jsx("p",{children:"You have full control over your data. You can update your profile information at any time. If you wish to delete your account and all associated data, you can contact our support team."}),u.jsx("h2",{children:"6. Changes to This Policy"}),u.jsx("p",{children:"We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of the app implies your acceptance of the updated policy."}),u.jsx("h2",{children:"7. Contact Us"}),u.jsxs("p",{children:["If you have any questions or legal concerns regarding this Privacy Policy, please contact us at: ",u.jsx("br",{}),u.jsx("strong",{children:"Email:"})," tyresathi@gmail.com"]}),u.jsx("div",{style:{textAlign:"center",marginTop:"40px",padding:"20px",background:"#f9f9f9",borderRadius:"8px"},children:u.jsx("p",{children:"By using TyreSaathi, you agree to the terms outlined in this Privacy Policy."})})]})}function aM(){return u.jsxs(AR,{children:[u.jsx(yt,{path:"/login",element:u.jsx(QO,{})}),u.jsx(yt,{path:"/register",element:u.jsx(YO,{})}),u.jsx(yt,{path:"/forgot-password",element:u.jsx(JO,{})}),u.jsx(yt,{path:"/privacy-policy",element:u.jsx(E0,{})}),u.jsx(yt,{path:"/about",element:u.jsx(E0,{})}),u.jsxs(yt,{element:u.jsx(GO,{children:u.jsx(HO,{})}),children:[u.jsx(yt,{path:"/",element:u.jsx(XO,{})}),u.jsx(yt,{path:"/search",element:u.jsx(ZO,{})}),u.jsx(yt,{path:"/bookings",element:u.jsx(tM,{})}),u.jsx(yt,{path:"/store-location",element:u.jsx(nM,{})}),u.jsx(yt,{path:"/profile",element:u.jsx(rM,{})}),u.jsx(yt,{path:"/shop/add-product",element:u.jsx(w0,{})}),u.jsx(yt,{path:"/shop/edit-product/:id",element:u.jsx(w0,{})}),u.jsx(yt,{path:"*",element:u.jsx(iM,{})})]})]})}function lM({message:t,onRetry:e}){return u.jsxs("div",{className:"status-page",children:[u.jsx(rP,{size:48,color:"var(--danger)"}),u.jsx("h1",{className:"brand-font",style:{fontSize:26},children:"Kuch Gadbad Ho Gayi"}),u.jsx("p",{children:t||"Ek unexpected error aa gaya. Please dobara try karein."}),u.jsxs("button",{className:"status-btn",onClick:e||(()=>window.location.reload()),children:[u.jsx(oP,{size:15,style:{verticalAlign:"middle",marginRight:6}}),"Dobara Try Karein"]}),u.jsx("style",{children:`
        .status-page {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
          padding: 20px;
        }
        .status-page p { color: var(--text-muted); margin: 0 0 10px; max-width: 320px; }
        .status-btn {
          background: var(--orange);
          color: white;
          border: none;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
        }
      `})]})}class cM extends lp.Component{constructor(e){super(e),this.state={hasError:!1,message:""}}static getDerivedStateFromError(e){return{hasError:!0,message:e==null?void 0:e.message}}componentDidCatch(e,n){console.error("TyreSaathi crashed:",e,n)}render(){return this.state.hasError?u.jsx(lM,{message:this.state.message,onRetry:()=>this.setState({hasError:!1,message:""})}):this.props.children}}Ih.createRoot(document.getElementById("root")).render(u.jsx(lp.StrictMode,{children:u.jsx(cM,{children:u.jsx(fP,{children:u.jsx(FR,{children:u.jsx(zO,{children:u.jsx(aM,{})})})})})}));
