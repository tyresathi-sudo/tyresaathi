function hI(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in t)){const s=Object.getOwnPropertyDescriptor(r,i);s&&Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function pI(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var N0={exports:{}},Tu={},P0={exports:{}},oe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ya=Symbol.for("react.element"),fI=Symbol.for("react.portal"),mI=Symbol.for("react.fragment"),gI=Symbol.for("react.strict_mode"),yI=Symbol.for("react.profiler"),vI=Symbol.for("react.provider"),xI=Symbol.for("react.context"),_I=Symbol.for("react.forward_ref"),wI=Symbol.for("react.suspense"),bI=Symbol.for("react.memo"),TI=Symbol.for("react.lazy"),fy=Symbol.iterator;function EI(t){return t===null||typeof t!="object"?null:(t=fy&&t[fy]||t["@@iterator"],typeof t=="function"?t:null)}var A0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R0=Object.assign,C0={};function Xs(t,e,n){this.props=t,this.context=e,this.refs=C0,this.updater=n||A0}Xs.prototype.isReactComponent={};Xs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Xs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function j0(){}j0.prototype=Xs.prototype;function af(t,e,n){this.props=t,this.context=e,this.refs=C0,this.updater=n||A0}var lf=af.prototype=new j0;lf.constructor=af;R0(lf,Xs.prototype);lf.isPureReactComponent=!0;var my=Array.isArray,D0=Object.prototype.hasOwnProperty,cf={current:null},V0={key:!0,ref:!0,__self:!0,__source:!0};function O0(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)D0.call(e,r)&&!V0.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),d=0;d<l;d++)u[d]=arguments[d+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:Ya,type:t,key:s,ref:o,props:i,_owner:cf.current}}function II(t,e){return{$$typeof:Ya,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function uf(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ya}function SI(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var gy=/\/+/g;function Od(t,e){return typeof t=="object"&&t!==null&&t.key!=null?SI(""+t.key):e.toString(36)}function rc(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Ya:case fI:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Od(o,0):r,my(i)?(n="",t!=null&&(n=t.replace(gy,"$&/")+"/"),rc(i,e,n,"",function(d){return d})):i!=null&&(uf(i)&&(i=II(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(gy,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",my(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+Od(s,l);o+=rc(s,e,n,u,i)}else if(u=EI(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+Od(s,l++),o+=rc(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Al(t,e,n){if(t==null)return t;var r=[],i=0;return rc(t,r,"","",function(s){return e.call(n,s,i++)}),r}function kI(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Et={current:null},ic={transition:null},NI={ReactCurrentDispatcher:Et,ReactCurrentBatchConfig:ic,ReactCurrentOwner:cf};function M0(){throw Error("act(...) is not supported in production builds of React.")}oe.Children={map:Al,forEach:function(t,e,n){Al(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Al(t,function(){e++}),e},toArray:function(t){return Al(t,function(e){return e})||[]},only:function(t){if(!uf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};oe.Component=Xs;oe.Fragment=mI;oe.Profiler=yI;oe.PureComponent=af;oe.StrictMode=gI;oe.Suspense=wI;oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=NI;oe.act=M0;oe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=R0({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=cf.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)D0.call(e,u)&&!V0.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var d=0;d<u;d++)l[d]=arguments[d+2];r.children=l}return{$$typeof:Ya,type:t.type,key:i,ref:s,props:r,_owner:o}};oe.createContext=function(t){return t={$$typeof:xI,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:vI,_context:t},t.Consumer=t};oe.createElement=O0;oe.createFactory=function(t){var e=O0.bind(null,t);return e.type=t,e};oe.createRef=function(){return{current:null}};oe.forwardRef=function(t){return{$$typeof:_I,render:t}};oe.isValidElement=uf;oe.lazy=function(t){return{$$typeof:TI,_payload:{_status:-1,_result:t},_init:kI}};oe.memo=function(t,e){return{$$typeof:bI,type:t,compare:e===void 0?null:e}};oe.startTransition=function(t){var e=ic.transition;ic.transition={};try{t()}finally{ic.transition=e}};oe.unstable_act=M0;oe.useCallback=function(t,e){return Et.current.useCallback(t,e)};oe.useContext=function(t){return Et.current.useContext(t)};oe.useDebugValue=function(){};oe.useDeferredValue=function(t){return Et.current.useDeferredValue(t)};oe.useEffect=function(t,e){return Et.current.useEffect(t,e)};oe.useId=function(){return Et.current.useId()};oe.useImperativeHandle=function(t,e,n){return Et.current.useImperativeHandle(t,e,n)};oe.useInsertionEffect=function(t,e){return Et.current.useInsertionEffect(t,e)};oe.useLayoutEffect=function(t,e){return Et.current.useLayoutEffect(t,e)};oe.useMemo=function(t,e){return Et.current.useMemo(t,e)};oe.useReducer=function(t,e,n){return Et.current.useReducer(t,e,n)};oe.useRef=function(t){return Et.current.useRef(t)};oe.useState=function(t){return Et.current.useState(t)};oe.useSyncExternalStore=function(t,e,n){return Et.current.useSyncExternalStore(t,e,n)};oe.useTransition=function(){return Et.current.useTransition()};oe.version="18.3.1";P0.exports=oe;var D=P0.exports;const df=pI(D),PI=hI({__proto__:null,default:df},[D]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var AI=D,RI=Symbol.for("react.element"),CI=Symbol.for("react.fragment"),jI=Object.prototype.hasOwnProperty,DI=AI.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,VI={key:!0,ref:!0,__self:!0,__source:!0};function L0(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)jI.call(e,r)&&!VI.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:RI,type:t,key:s,ref:o,props:i,_owner:DI.current}}Tu.Fragment=CI;Tu.jsx=L0;Tu.jsxs=L0;N0.exports=Tu;var a=N0.exports,kh={},z0={exports:{}},qt={},F0={exports:{}},U0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(q,X){var ne=q.length;q.push(X);e:for(;0<ne;){var be=ne-1>>>1,pe=q[be];if(0<i(pe,X))q[be]=X,q[ne]=pe,ne=be;else break e}}function n(q){return q.length===0?null:q[0]}function r(q){if(q.length===0)return null;var X=q[0],ne=q.pop();if(ne!==X){q[0]=ne;e:for(var be=0,pe=q.length,Fe=pe>>>1;be<Fe;){var kn=2*(be+1)-1,Nn=q[kn],Pn=kn+1,An=q[Pn];if(0>i(Nn,ne))Pn<pe&&0>i(An,Nn)?(q[be]=An,q[Pn]=ne,be=Pn):(q[be]=Nn,q[kn]=ne,be=kn);else if(Pn<pe&&0>i(An,ne))q[be]=An,q[Pn]=ne,be=Pn;else break e}}return X}function i(q,X){var ne=q.sortIndex-X.sortIndex;return ne!==0?ne:q.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],d=[],p=1,f=null,g=3,k=!1,A=!1,w=!1,E=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(q){for(var X=n(d);X!==null;){if(X.callback===null)r(d);else if(X.startTime<=q)r(d),X.sortIndex=X.expirationTime,e(u,X);else break;X=n(d)}}function N(q){if(w=!1,v(q),!A)if(n(u)!==null)A=!0,ee(O);else{var X=n(d);X!==null&&qe(N,X.startTime-q)}}function O(q,X){A=!1,w&&(w=!1,y(b),b=-1),k=!0;var ne=g;try{for(v(X),f=n(u);f!==null&&(!(f.expirationTime>X)||q&&!R());){var be=f.callback;if(typeof be=="function"){f.callback=null,g=f.priorityLevel;var pe=be(f.expirationTime<=X);X=t.unstable_now(),typeof pe=="function"?f.callback=pe:f===n(u)&&r(u),v(X)}else r(u);f=n(u)}if(f!==null)var Fe=!0;else{var kn=n(d);kn!==null&&qe(N,kn.startTime-X),Fe=!1}return Fe}finally{f=null,g=ne,k=!1}}var L=!1,S=null,b=-1,x=5,I=-1;function R(){return!(t.unstable_now()-I<x)}function C(){if(S!==null){var q=t.unstable_now();I=q;var X=!0;try{X=S(!0,q)}finally{X?P():(L=!1,S=null)}}else L=!1}var P;if(typeof _=="function")P=function(){_(C)};else if(typeof MessageChannel<"u"){var M=new MessageChannel,W=M.port2;M.port1.onmessage=C,P=function(){W.postMessage(null)}}else P=function(){E(C,0)};function ee(q){S=q,L||(L=!0,P())}function qe(q,X){b=E(function(){q(t.unstable_now())},X)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(q){q.callback=null},t.unstable_continueExecution=function(){A||k||(A=!0,ee(O))},t.unstable_forceFrameRate=function(q){0>q||125<q?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<q?Math.floor(1e3/q):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(q){switch(g){case 1:case 2:case 3:var X=3;break;default:X=g}var ne=g;g=X;try{return q()}finally{g=ne}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(q,X){switch(q){case 1:case 2:case 3:case 4:case 5:break;default:q=3}var ne=g;g=q;try{return X()}finally{g=ne}},t.unstable_scheduleCallback=function(q,X,ne){var be=t.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?be+ne:be):ne=be,q){case 1:var pe=-1;break;case 2:pe=250;break;case 5:pe=1073741823;break;case 4:pe=1e4;break;default:pe=5e3}return pe=ne+pe,q={id:p++,callback:X,priorityLevel:q,startTime:ne,expirationTime:pe,sortIndex:-1},ne>be?(q.sortIndex=ne,e(d,q),n(u)===null&&q===n(d)&&(w?(y(b),b=-1):w=!0,qe(N,ne-be))):(q.sortIndex=pe,e(u,q),A||k||(A=!0,ee(O))),q},t.unstable_shouldYield=R,t.unstable_wrapCallback=function(q){var X=g;return function(){var ne=g;g=X;try{return q.apply(this,arguments)}finally{g=ne}}}})(U0);F0.exports=U0;var OI=F0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var MI=D,Bt=OI;function B(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var B0=new Set,da={};function Fi(t,e){As(t,e),As(t+"Capture",e)}function As(t,e){for(da[t]=e,t=0;t<e.length;t++)B0.add(e[t])}var qn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Nh=Object.prototype.hasOwnProperty,LI=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,yy={},vy={};function zI(t){return Nh.call(vy,t)?!0:Nh.call(yy,t)?!1:LI.test(t)?vy[t]=!0:(yy[t]=!0,!1)}function FI(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function UI(t,e,n,r){if(e===null||typeof e>"u"||FI(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function It(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var it={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){it[t]=new It(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];it[e]=new It(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){it[t]=new It(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){it[t]=new It(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){it[t]=new It(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){it[t]=new It(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){it[t]=new It(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){it[t]=new It(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){it[t]=new It(t,5,!1,t.toLowerCase(),null,!1,!1)});var hf=/[\-:]([a-z])/g;function pf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(hf,pf);it[e]=new It(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(hf,pf);it[e]=new It(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(hf,pf);it[e]=new It(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){it[t]=new It(t,1,!1,t.toLowerCase(),null,!1,!1)});it.xlinkHref=new It("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){it[t]=new It(t,1,!1,t.toLowerCase(),null,!0,!0)});function ff(t,e,n,r){var i=it.hasOwnProperty(e)?it[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(UI(e,n,i,r)&&(n=null),r||i===null?zI(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Xn=MI.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Rl=Symbol.for("react.element"),as=Symbol.for("react.portal"),ls=Symbol.for("react.fragment"),mf=Symbol.for("react.strict_mode"),Ph=Symbol.for("react.profiler"),$0=Symbol.for("react.provider"),q0=Symbol.for("react.context"),gf=Symbol.for("react.forward_ref"),Ah=Symbol.for("react.suspense"),Rh=Symbol.for("react.suspense_list"),yf=Symbol.for("react.memo"),ur=Symbol.for("react.lazy"),H0=Symbol.for("react.offscreen"),xy=Symbol.iterator;function To(t){return t===null||typeof t!="object"?null:(t=xy&&t[xy]||t["@@iterator"],typeof t=="function"?t:null)}var je=Object.assign,Md;function Mo(t){if(Md===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Md=e&&e[1]||""}return`
`+Md+t}var Ld=!1;function zd(t,e){if(!t||Ld)return"";Ld=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(d){var r=d}Reflect.construct(t,[],e)}else{try{e.call()}catch(d){r=d}t.call(e.prototype)}else{try{throw Error()}catch(d){r=d}t()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{Ld=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Mo(t):""}function BI(t){switch(t.tag){case 5:return Mo(t.type);case 16:return Mo("Lazy");case 13:return Mo("Suspense");case 19:return Mo("SuspenseList");case 0:case 2:case 15:return t=zd(t.type,!1),t;case 11:return t=zd(t.type.render,!1),t;case 1:return t=zd(t.type,!0),t;default:return""}}function Ch(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ls:return"Fragment";case as:return"Portal";case Ph:return"Profiler";case mf:return"StrictMode";case Ah:return"Suspense";case Rh:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case q0:return(t.displayName||"Context")+".Consumer";case $0:return(t._context.displayName||"Context")+".Provider";case gf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case yf:return e=t.displayName||null,e!==null?e:Ch(t.type)||"Memo";case ur:e=t._payload,t=t._init;try{return Ch(t(e))}catch{}}return null}function $I(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ch(e);case 8:return e===mf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Lr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function K0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function qI(t){var e=K0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Cl(t){t._valueTracker||(t._valueTracker=qI(t))}function W0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=K0(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Nc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function jh(t,e){var n=e.checked;return je({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function _y(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Lr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function G0(t,e){e=e.checked,e!=null&&ff(t,"checked",e,!1)}function Dh(t,e){G0(t,e);var n=Lr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Vh(t,e.type,n):e.hasOwnProperty("defaultValue")&&Vh(t,e.type,Lr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function wy(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Vh(t,e,n){(e!=="number"||Nc(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Lo=Array.isArray;function _s(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Lr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Oh(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(B(91));return je({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function by(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(B(92));if(Lo(n)){if(1<n.length)throw Error(B(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Lr(n)}}function Q0(t,e){var n=Lr(e.value),r=Lr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Ty(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Y0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Mh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Y0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var jl,J0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(jl=jl||document.createElement("div"),jl.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=jl.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function ha(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Go={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},HI=["Webkit","ms","Moz","O"];Object.keys(Go).forEach(function(t){HI.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Go[e]=Go[t]})});function X0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Go.hasOwnProperty(t)&&Go[t]?(""+e).trim():e+"px"}function Z0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=X0(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var KI=je({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Lh(t,e){if(e){if(KI[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(B(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(B(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(B(61))}if(e.style!=null&&typeof e.style!="object")throw Error(B(62))}}function zh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Fh=null;function vf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Uh=null,ws=null,bs=null;function Ey(t){if(t=Za(t)){if(typeof Uh!="function")throw Error(B(280));var e=t.stateNode;e&&(e=Nu(e),Uh(t.stateNode,t.type,e))}}function e_(t){ws?bs?bs.push(t):bs=[t]:ws=t}function t_(){if(ws){var t=ws,e=bs;if(bs=ws=null,Ey(t),e)for(t=0;t<e.length;t++)Ey(e[t])}}function n_(t,e){return t(e)}function r_(){}var Fd=!1;function i_(t,e,n){if(Fd)return t(e,n);Fd=!0;try{return n_(t,e,n)}finally{Fd=!1,(ws!==null||bs!==null)&&(r_(),t_())}}function pa(t,e){var n=t.stateNode;if(n===null)return null;var r=Nu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(B(231,e,typeof n));return n}var Bh=!1;if(qn)try{var Eo={};Object.defineProperty(Eo,"passive",{get:function(){Bh=!0}}),window.addEventListener("test",Eo,Eo),window.removeEventListener("test",Eo,Eo)}catch{Bh=!1}function WI(t,e,n,r,i,s,o,l,u){var d=Array.prototype.slice.call(arguments,3);try{e.apply(n,d)}catch(p){this.onError(p)}}var Qo=!1,Pc=null,Ac=!1,$h=null,GI={onError:function(t){Qo=!0,Pc=t}};function QI(t,e,n,r,i,s,o,l,u){Qo=!1,Pc=null,WI.apply(GI,arguments)}function YI(t,e,n,r,i,s,o,l,u){if(QI.apply(this,arguments),Qo){if(Qo){var d=Pc;Qo=!1,Pc=null}else throw Error(B(198));Ac||(Ac=!0,$h=d)}}function Ui(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function s_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Iy(t){if(Ui(t)!==t)throw Error(B(188))}function JI(t){var e=t.alternate;if(!e){if(e=Ui(t),e===null)throw Error(B(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Iy(i),t;if(s===r)return Iy(i),e;s=s.sibling}throw Error(B(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(B(189))}}if(n.alternate!==r)throw Error(B(190))}if(n.tag!==3)throw Error(B(188));return n.stateNode.current===n?t:e}function o_(t){return t=JI(t),t!==null?a_(t):null}function a_(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=a_(t);if(e!==null)return e;t=t.sibling}return null}var l_=Bt.unstable_scheduleCallback,Sy=Bt.unstable_cancelCallback,XI=Bt.unstable_shouldYield,ZI=Bt.unstable_requestPaint,Ue=Bt.unstable_now,eS=Bt.unstable_getCurrentPriorityLevel,xf=Bt.unstable_ImmediatePriority,c_=Bt.unstable_UserBlockingPriority,Rc=Bt.unstable_NormalPriority,tS=Bt.unstable_LowPriority,u_=Bt.unstable_IdlePriority,Eu=null,yn=null;function nS(t){if(yn&&typeof yn.onCommitFiberRoot=="function")try{yn.onCommitFiberRoot(Eu,t,void 0,(t.current.flags&128)===128)}catch{}}var rn=Math.clz32?Math.clz32:sS,rS=Math.log,iS=Math.LN2;function sS(t){return t>>>=0,t===0?32:31-(rS(t)/iS|0)|0}var Dl=64,Vl=4194304;function zo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Cc(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=zo(l):(s&=o,s!==0&&(r=zo(s)))}else o=n&~i,o!==0?r=zo(o):s!==0&&(r=zo(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-rn(e),i=1<<n,r|=t[n],e&=~i;return r}function oS(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function aS(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-rn(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=oS(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function qh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function d_(){var t=Dl;return Dl<<=1,!(Dl&4194240)&&(Dl=64),t}function Ud(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ja(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-rn(e),t[e]=n}function lS(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-rn(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function _f(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-rn(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ge=0;function h_(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var p_,wf,f_,m_,g_,Hh=!1,Ol=[],Ir=null,Sr=null,kr=null,fa=new Map,ma=new Map,hr=[],cS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ky(t,e){switch(t){case"focusin":case"focusout":Ir=null;break;case"dragenter":case"dragleave":Sr=null;break;case"mouseover":case"mouseout":kr=null;break;case"pointerover":case"pointerout":fa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ma.delete(e.pointerId)}}function Io(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Za(e),e!==null&&wf(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function uS(t,e,n,r,i){switch(e){case"focusin":return Ir=Io(Ir,t,e,n,r,i),!0;case"dragenter":return Sr=Io(Sr,t,e,n,r,i),!0;case"mouseover":return kr=Io(kr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return fa.set(s,Io(fa.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,ma.set(s,Io(ma.get(s)||null,t,e,n,r,i)),!0}return!1}function y_(t){var e=hi(t.target);if(e!==null){var n=Ui(e);if(n!==null){if(e=n.tag,e===13){if(e=s_(n),e!==null){t.blockedOn=e,g_(t.priority,function(){f_(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function sc(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Kh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Fh=r,n.target.dispatchEvent(r),Fh=null}else return e=Za(n),e!==null&&wf(e),t.blockedOn=n,!1;e.shift()}return!0}function Ny(t,e,n){sc(t)&&n.delete(e)}function dS(){Hh=!1,Ir!==null&&sc(Ir)&&(Ir=null),Sr!==null&&sc(Sr)&&(Sr=null),kr!==null&&sc(kr)&&(kr=null),fa.forEach(Ny),ma.forEach(Ny)}function So(t,e){t.blockedOn===e&&(t.blockedOn=null,Hh||(Hh=!0,Bt.unstable_scheduleCallback(Bt.unstable_NormalPriority,dS)))}function ga(t){function e(i){return So(i,t)}if(0<Ol.length){So(Ol[0],t);for(var n=1;n<Ol.length;n++){var r=Ol[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Ir!==null&&So(Ir,t),Sr!==null&&So(Sr,t),kr!==null&&So(kr,t),fa.forEach(e),ma.forEach(e),n=0;n<hr.length;n++)r=hr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<hr.length&&(n=hr[0],n.blockedOn===null);)y_(n),n.blockedOn===null&&hr.shift()}var Ts=Xn.ReactCurrentBatchConfig,jc=!0;function hS(t,e,n,r){var i=ge,s=Ts.transition;Ts.transition=null;try{ge=1,bf(t,e,n,r)}finally{ge=i,Ts.transition=s}}function pS(t,e,n,r){var i=ge,s=Ts.transition;Ts.transition=null;try{ge=4,bf(t,e,n,r)}finally{ge=i,Ts.transition=s}}function bf(t,e,n,r){if(jc){var i=Kh(t,e,n,r);if(i===null)Jd(t,e,r,Dc,n),ky(t,r);else if(uS(i,t,e,n,r))r.stopPropagation();else if(ky(t,r),e&4&&-1<cS.indexOf(t)){for(;i!==null;){var s=Za(i);if(s!==null&&p_(s),s=Kh(t,e,n,r),s===null&&Jd(t,e,r,Dc,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Jd(t,e,r,null,n)}}var Dc=null;function Kh(t,e,n,r){if(Dc=null,t=vf(r),t=hi(t),t!==null)if(e=Ui(t),e===null)t=null;else if(n=e.tag,n===13){if(t=s_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Dc=t,null}function v_(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(eS()){case xf:return 1;case c_:return 4;case Rc:case tS:return 16;case u_:return 536870912;default:return 16}default:return 16}}var wr=null,Tf=null,oc=null;function x_(){if(oc)return oc;var t,e=Tf,n=e.length,r,i="value"in wr?wr.value:wr.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return oc=i.slice(t,1<r?1-r:void 0)}function ac(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ml(){return!0}function Py(){return!1}function Ht(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ml:Py,this.isPropagationStopped=Py,this}return je(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ml)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ml)},persist:function(){},isPersistent:Ml}),e}var Zs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ef=Ht(Zs),Xa=je({},Zs,{view:0,detail:0}),fS=Ht(Xa),Bd,$d,ko,Iu=je({},Xa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:If,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ko&&(ko&&t.type==="mousemove"?(Bd=t.screenX-ko.screenX,$d=t.screenY-ko.screenY):$d=Bd=0,ko=t),Bd)},movementY:function(t){return"movementY"in t?t.movementY:$d}}),Ay=Ht(Iu),mS=je({},Iu,{dataTransfer:0}),gS=Ht(mS),yS=je({},Xa,{relatedTarget:0}),qd=Ht(yS),vS=je({},Zs,{animationName:0,elapsedTime:0,pseudoElement:0}),xS=Ht(vS),_S=je({},Zs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),wS=Ht(_S),bS=je({},Zs,{data:0}),Ry=Ht(bS),TS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ES={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},IS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function SS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=IS[t])?!!e[t]:!1}function If(){return SS}var kS=je({},Xa,{key:function(t){if(t.key){var e=TS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ac(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ES[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:If,charCode:function(t){return t.type==="keypress"?ac(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ac(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),NS=Ht(kS),PS=je({},Iu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cy=Ht(PS),AS=je({},Xa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:If}),RS=Ht(AS),CS=je({},Zs,{propertyName:0,elapsedTime:0,pseudoElement:0}),jS=Ht(CS),DS=je({},Iu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),VS=Ht(DS),OS=[9,13,27,32],Sf=qn&&"CompositionEvent"in window,Yo=null;qn&&"documentMode"in document&&(Yo=document.documentMode);var MS=qn&&"TextEvent"in window&&!Yo,__=qn&&(!Sf||Yo&&8<Yo&&11>=Yo),jy=" ",Dy=!1;function w_(t,e){switch(t){case"keyup":return OS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function b_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var cs=!1;function LS(t,e){switch(t){case"compositionend":return b_(e);case"keypress":return e.which!==32?null:(Dy=!0,jy);case"textInput":return t=e.data,t===jy&&Dy?null:t;default:return null}}function zS(t,e){if(cs)return t==="compositionend"||!Sf&&w_(t,e)?(t=x_(),oc=Tf=wr=null,cs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return __&&e.locale!=="ko"?null:e.data;default:return null}}var FS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Vy(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!FS[t.type]:e==="textarea"}function T_(t,e,n,r){e_(r),e=Vc(e,"onChange"),0<e.length&&(n=new Ef("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Jo=null,ya=null;function US(t){D_(t,0)}function Su(t){var e=hs(t);if(W0(e))return t}function BS(t,e){if(t==="change")return e}var E_=!1;if(qn){var Hd;if(qn){var Kd="oninput"in document;if(!Kd){var Oy=document.createElement("div");Oy.setAttribute("oninput","return;"),Kd=typeof Oy.oninput=="function"}Hd=Kd}else Hd=!1;E_=Hd&&(!document.documentMode||9<document.documentMode)}function My(){Jo&&(Jo.detachEvent("onpropertychange",I_),ya=Jo=null)}function I_(t){if(t.propertyName==="value"&&Su(ya)){var e=[];T_(e,ya,t,vf(t)),i_(US,e)}}function $S(t,e,n){t==="focusin"?(My(),Jo=e,ya=n,Jo.attachEvent("onpropertychange",I_)):t==="focusout"&&My()}function qS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Su(ya)}function HS(t,e){if(t==="click")return Su(e)}function KS(t,e){if(t==="input"||t==="change")return Su(e)}function WS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var an=typeof Object.is=="function"?Object.is:WS;function va(t,e){if(an(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Nh.call(e,i)||!an(t[i],e[i]))return!1}return!0}function Ly(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function zy(t,e){var n=Ly(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ly(n)}}function S_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?S_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function k_(){for(var t=window,e=Nc();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Nc(t.document)}return e}function kf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function GS(t){var e=k_(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&S_(n.ownerDocument.documentElement,n)){if(r!==null&&kf(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=zy(n,s);var o=zy(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var QS=qn&&"documentMode"in document&&11>=document.documentMode,us=null,Wh=null,Xo=null,Gh=!1;function Fy(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Gh||us==null||us!==Nc(r)||(r=us,"selectionStart"in r&&kf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Xo&&va(Xo,r)||(Xo=r,r=Vc(Wh,"onSelect"),0<r.length&&(e=new Ef("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=us)))}function Ll(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ds={animationend:Ll("Animation","AnimationEnd"),animationiteration:Ll("Animation","AnimationIteration"),animationstart:Ll("Animation","AnimationStart"),transitionend:Ll("Transition","TransitionEnd")},Wd={},N_={};qn&&(N_=document.createElement("div").style,"AnimationEvent"in window||(delete ds.animationend.animation,delete ds.animationiteration.animation,delete ds.animationstart.animation),"TransitionEvent"in window||delete ds.transitionend.transition);function ku(t){if(Wd[t])return Wd[t];if(!ds[t])return t;var e=ds[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in N_)return Wd[t]=e[n];return t}var P_=ku("animationend"),A_=ku("animationiteration"),R_=ku("animationstart"),C_=ku("transitionend"),j_=new Map,Uy="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function qr(t,e){j_.set(t,e),Fi(e,[t])}for(var Gd=0;Gd<Uy.length;Gd++){var Qd=Uy[Gd],YS=Qd.toLowerCase(),JS=Qd[0].toUpperCase()+Qd.slice(1);qr(YS,"on"+JS)}qr(P_,"onAnimationEnd");qr(A_,"onAnimationIteration");qr(R_,"onAnimationStart");qr("dblclick","onDoubleClick");qr("focusin","onFocus");qr("focusout","onBlur");qr(C_,"onTransitionEnd");As("onMouseEnter",["mouseout","mouseover"]);As("onMouseLeave",["mouseout","mouseover"]);As("onPointerEnter",["pointerout","pointerover"]);As("onPointerLeave",["pointerout","pointerover"]);Fi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fi("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),XS=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fo));function By(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,YI(r,e,void 0,t),t.currentTarget=null}function D_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,d=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;By(i,l,d),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,d=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;By(i,l,d),s=u}}}if(Ac)throw t=$h,Ac=!1,$h=null,t}function Ee(t,e){var n=e[Zh];n===void 0&&(n=e[Zh]=new Set);var r=t+"__bubble";n.has(r)||(V_(e,t,2,!1),n.add(r))}function Yd(t,e,n){var r=0;e&&(r|=4),V_(n,t,r,e)}var zl="_reactListening"+Math.random().toString(36).slice(2);function xa(t){if(!t[zl]){t[zl]=!0,B0.forEach(function(n){n!=="selectionchange"&&(XS.has(n)||Yd(n,!1,t),Yd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[zl]||(e[zl]=!0,Yd("selectionchange",!1,e))}}function V_(t,e,n,r){switch(v_(e)){case 1:var i=hS;break;case 4:i=pS;break;default:i=bf}n=i.bind(null,e,n,t),i=void 0,!Bh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Jd(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=hi(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}i_(function(){var d=s,p=vf(n),f=[];e:{var g=j_.get(t);if(g!==void 0){var k=Ef,A=t;switch(t){case"keypress":if(ac(n)===0)break e;case"keydown":case"keyup":k=NS;break;case"focusin":A="focus",k=qd;break;case"focusout":A="blur",k=qd;break;case"beforeblur":case"afterblur":k=qd;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":k=Ay;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":k=gS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":k=RS;break;case P_:case A_:case R_:k=xS;break;case C_:k=jS;break;case"scroll":k=fS;break;case"wheel":k=VS;break;case"copy":case"cut":case"paste":k=wS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":k=Cy}var w=(e&4)!==0,E=!w&&t==="scroll",y=w?g!==null?g+"Capture":null:g;w=[];for(var _=d,v;_!==null;){v=_;var N=v.stateNode;if(v.tag===5&&N!==null&&(v=N,y!==null&&(N=pa(_,y),N!=null&&w.push(_a(_,N,v)))),E)break;_=_.return}0<w.length&&(g=new k(g,A,null,n,p),f.push({event:g,listeners:w}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",k=t==="mouseout"||t==="pointerout",g&&n!==Fh&&(A=n.relatedTarget||n.fromElement)&&(hi(A)||A[Hn]))break e;if((k||g)&&(g=p.window===p?p:(g=p.ownerDocument)?g.defaultView||g.parentWindow:window,k?(A=n.relatedTarget||n.toElement,k=d,A=A?hi(A):null,A!==null&&(E=Ui(A),A!==E||A.tag!==5&&A.tag!==6)&&(A=null)):(k=null,A=d),k!==A)){if(w=Ay,N="onMouseLeave",y="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(w=Cy,N="onPointerLeave",y="onPointerEnter",_="pointer"),E=k==null?g:hs(k),v=A==null?g:hs(A),g=new w(N,_+"leave",k,n,p),g.target=E,g.relatedTarget=v,N=null,hi(p)===d&&(w=new w(y,_+"enter",A,n,p),w.target=v,w.relatedTarget=E,N=w),E=N,k&&A)t:{for(w=k,y=A,_=0,v=w;v;v=Yi(v))_++;for(v=0,N=y;N;N=Yi(N))v++;for(;0<_-v;)w=Yi(w),_--;for(;0<v-_;)y=Yi(y),v--;for(;_--;){if(w===y||y!==null&&w===y.alternate)break t;w=Yi(w),y=Yi(y)}w=null}else w=null;k!==null&&$y(f,g,k,w,!1),A!==null&&E!==null&&$y(f,E,A,w,!0)}}e:{if(g=d?hs(d):window,k=g.nodeName&&g.nodeName.toLowerCase(),k==="select"||k==="input"&&g.type==="file")var O=BS;else if(Vy(g))if(E_)O=KS;else{O=qS;var L=$S}else(k=g.nodeName)&&k.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(O=HS);if(O&&(O=O(t,d))){T_(f,O,n,p);break e}L&&L(t,g,d),t==="focusout"&&(L=g._wrapperState)&&L.controlled&&g.type==="number"&&Vh(g,"number",g.value)}switch(L=d?hs(d):window,t){case"focusin":(Vy(L)||L.contentEditable==="true")&&(us=L,Wh=d,Xo=null);break;case"focusout":Xo=Wh=us=null;break;case"mousedown":Gh=!0;break;case"contextmenu":case"mouseup":case"dragend":Gh=!1,Fy(f,n,p);break;case"selectionchange":if(QS)break;case"keydown":case"keyup":Fy(f,n,p)}var S;if(Sf)e:{switch(t){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else cs?w_(t,n)&&(b="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(__&&n.locale!=="ko"&&(cs||b!=="onCompositionStart"?b==="onCompositionEnd"&&cs&&(S=x_()):(wr=p,Tf="value"in wr?wr.value:wr.textContent,cs=!0)),L=Vc(d,b),0<L.length&&(b=new Ry(b,t,null,n,p),f.push({event:b,listeners:L}),S?b.data=S:(S=b_(n),S!==null&&(b.data=S)))),(S=MS?LS(t,n):zS(t,n))&&(d=Vc(d,"onBeforeInput"),0<d.length&&(p=new Ry("onBeforeInput","beforeinput",null,n,p),f.push({event:p,listeners:d}),p.data=S))}D_(f,e)})}function _a(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Vc(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=pa(t,n),s!=null&&r.unshift(_a(t,s,i)),s=pa(t,e),s!=null&&r.push(_a(t,s,i))),t=t.return}return r}function Yi(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function $y(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,d=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&d!==null&&(l=d,i?(u=pa(n,s),u!=null&&o.unshift(_a(n,u,l))):i||(u=pa(n,s),u!=null&&o.push(_a(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var ZS=/\r\n?/g,ek=/\u0000|\uFFFD/g;function qy(t){return(typeof t=="string"?t:""+t).replace(ZS,`
`).replace(ek,"")}function Fl(t,e,n){if(e=qy(e),qy(t)!==e&&n)throw Error(B(425))}function Oc(){}var Qh=null,Yh=null;function Jh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Xh=typeof setTimeout=="function"?setTimeout:void 0,tk=typeof clearTimeout=="function"?clearTimeout:void 0,Hy=typeof Promise=="function"?Promise:void 0,nk=typeof queueMicrotask=="function"?queueMicrotask:typeof Hy<"u"?function(t){return Hy.resolve(null).then(t).catch(rk)}:Xh;function rk(t){setTimeout(function(){throw t})}function Xd(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),ga(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);ga(e)}function Nr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Ky(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var eo=Math.random().toString(36).slice(2),hn="__reactFiber$"+eo,wa="__reactProps$"+eo,Hn="__reactContainer$"+eo,Zh="__reactEvents$"+eo,ik="__reactListeners$"+eo,sk="__reactHandles$"+eo;function hi(t){var e=t[hn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Hn]||n[hn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Ky(t);t!==null;){if(n=t[hn])return n;t=Ky(t)}return e}t=n,n=t.parentNode}return null}function Za(t){return t=t[hn]||t[Hn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function hs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(B(33))}function Nu(t){return t[wa]||null}var ep=[],ps=-1;function Hr(t){return{current:t}}function Ie(t){0>ps||(t.current=ep[ps],ep[ps]=null,ps--)}function _e(t,e){ps++,ep[ps]=t.current,t.current=e}var zr={},mt=Hr(zr),Rt=Hr(!1),bi=zr;function Rs(t,e){var n=t.type.contextTypes;if(!n)return zr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Ct(t){return t=t.childContextTypes,t!=null}function Mc(){Ie(Rt),Ie(mt)}function Wy(t,e,n){if(mt.current!==zr)throw Error(B(168));_e(mt,e),_e(Rt,n)}function O_(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(B(108,$I(t)||"Unknown",i));return je({},n,r)}function Lc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||zr,bi=mt.current,_e(mt,t),_e(Rt,Rt.current),!0}function Gy(t,e,n){var r=t.stateNode;if(!r)throw Error(B(169));n?(t=O_(t,e,bi),r.__reactInternalMemoizedMergedChildContext=t,Ie(Rt),Ie(mt),_e(mt,t)):Ie(Rt),_e(Rt,n)}var Dn=null,Pu=!1,Zd=!1;function M_(t){Dn===null?Dn=[t]:Dn.push(t)}function ok(t){Pu=!0,M_(t)}function Kr(){if(!Zd&&Dn!==null){Zd=!0;var t=0,e=ge;try{var n=Dn;for(ge=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Dn=null,Pu=!1}catch(i){throw Dn!==null&&(Dn=Dn.slice(t+1)),l_(xf,Kr),i}finally{ge=e,Zd=!1}}return null}var fs=[],ms=0,zc=null,Fc=0,Kt=[],Wt=0,Ti=null,On=1,Mn="";function ii(t,e){fs[ms++]=Fc,fs[ms++]=zc,zc=t,Fc=e}function L_(t,e,n){Kt[Wt++]=On,Kt[Wt++]=Mn,Kt[Wt++]=Ti,Ti=t;var r=On;t=Mn;var i=32-rn(r)-1;r&=~(1<<i),n+=1;var s=32-rn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,On=1<<32-rn(e)+i|n<<i|r,Mn=s+t}else On=1<<s|n<<i|r,Mn=t}function Nf(t){t.return!==null&&(ii(t,1),L_(t,1,0))}function Pf(t){for(;t===zc;)zc=fs[--ms],fs[ms]=null,Fc=fs[--ms],fs[ms]=null;for(;t===Ti;)Ti=Kt[--Wt],Kt[Wt]=null,Mn=Kt[--Wt],Kt[Wt]=null,On=Kt[--Wt],Kt[Wt]=null}var Ft=null,Mt=null,ke=!1,nn=null;function z_(t,e){var n=Gt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Qy(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Ft=t,Mt=Nr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Ft=t,Mt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ti!==null?{id:On,overflow:Mn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Gt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Ft=t,Mt=null,!0):!1;default:return!1}}function tp(t){return(t.mode&1)!==0&&(t.flags&128)===0}function np(t){if(ke){var e=Mt;if(e){var n=e;if(!Qy(t,e)){if(tp(t))throw Error(B(418));e=Nr(n.nextSibling);var r=Ft;e&&Qy(t,e)?z_(r,n):(t.flags=t.flags&-4097|2,ke=!1,Ft=t)}}else{if(tp(t))throw Error(B(418));t.flags=t.flags&-4097|2,ke=!1,Ft=t}}}function Yy(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Ft=t}function Ul(t){if(t!==Ft)return!1;if(!ke)return Yy(t),ke=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Jh(t.type,t.memoizedProps)),e&&(e=Mt)){if(tp(t))throw F_(),Error(B(418));for(;e;)z_(t,e),e=Nr(e.nextSibling)}if(Yy(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(B(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Mt=Nr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Mt=null}}else Mt=Ft?Nr(t.stateNode.nextSibling):null;return!0}function F_(){for(var t=Mt;t;)t=Nr(t.nextSibling)}function Cs(){Mt=Ft=null,ke=!1}function Af(t){nn===null?nn=[t]:nn.push(t)}var ak=Xn.ReactCurrentBatchConfig;function No(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(B(309));var r=n.stateNode}if(!r)throw Error(B(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(B(284));if(!n._owner)throw Error(B(290,t))}return t}function Bl(t,e){throw t=Object.prototype.toString.call(e),Error(B(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Jy(t){var e=t._init;return e(t._payload)}function U_(t){function e(y,_){if(t){var v=y.deletions;v===null?(y.deletions=[_],y.flags|=16):v.push(_)}}function n(y,_){if(!t)return null;for(;_!==null;)e(y,_),_=_.sibling;return null}function r(y,_){for(y=new Map;_!==null;)_.key!==null?y.set(_.key,_):y.set(_.index,_),_=_.sibling;return y}function i(y,_){return y=Cr(y,_),y.index=0,y.sibling=null,y}function s(y,_,v){return y.index=v,t?(v=y.alternate,v!==null?(v=v.index,v<_?(y.flags|=2,_):v):(y.flags|=2,_)):(y.flags|=1048576,_)}function o(y){return t&&y.alternate===null&&(y.flags|=2),y}function l(y,_,v,N){return _===null||_.tag!==6?(_=oh(v,y.mode,N),_.return=y,_):(_=i(_,v),_.return=y,_)}function u(y,_,v,N){var O=v.type;return O===ls?p(y,_,v.props.children,N,v.key):_!==null&&(_.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===ur&&Jy(O)===_.type)?(N=i(_,v.props),N.ref=No(y,_,v),N.return=y,N):(N=fc(v.type,v.key,v.props,null,y.mode,N),N.ref=No(y,_,v),N.return=y,N)}function d(y,_,v,N){return _===null||_.tag!==4||_.stateNode.containerInfo!==v.containerInfo||_.stateNode.implementation!==v.implementation?(_=ah(v,y.mode,N),_.return=y,_):(_=i(_,v.children||[]),_.return=y,_)}function p(y,_,v,N,O){return _===null||_.tag!==7?(_=yi(v,y.mode,N,O),_.return=y,_):(_=i(_,v),_.return=y,_)}function f(y,_,v){if(typeof _=="string"&&_!==""||typeof _=="number")return _=oh(""+_,y.mode,v),_.return=y,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Rl:return v=fc(_.type,_.key,_.props,null,y.mode,v),v.ref=No(y,null,_),v.return=y,v;case as:return _=ah(_,y.mode,v),_.return=y,_;case ur:var N=_._init;return f(y,N(_._payload),v)}if(Lo(_)||To(_))return _=yi(_,y.mode,v,null),_.return=y,_;Bl(y,_)}return null}function g(y,_,v,N){var O=_!==null?_.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return O!==null?null:l(y,_,""+v,N);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Rl:return v.key===O?u(y,_,v,N):null;case as:return v.key===O?d(y,_,v,N):null;case ur:return O=v._init,g(y,_,O(v._payload),N)}if(Lo(v)||To(v))return O!==null?null:p(y,_,v,N,null);Bl(y,v)}return null}function k(y,_,v,N,O){if(typeof N=="string"&&N!==""||typeof N=="number")return y=y.get(v)||null,l(_,y,""+N,O);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case Rl:return y=y.get(N.key===null?v:N.key)||null,u(_,y,N,O);case as:return y=y.get(N.key===null?v:N.key)||null,d(_,y,N,O);case ur:var L=N._init;return k(y,_,v,L(N._payload),O)}if(Lo(N)||To(N))return y=y.get(v)||null,p(_,y,N,O,null);Bl(_,N)}return null}function A(y,_,v,N){for(var O=null,L=null,S=_,b=_=0,x=null;S!==null&&b<v.length;b++){S.index>b?(x=S,S=null):x=S.sibling;var I=g(y,S,v[b],N);if(I===null){S===null&&(S=x);break}t&&S&&I.alternate===null&&e(y,S),_=s(I,_,b),L===null?O=I:L.sibling=I,L=I,S=x}if(b===v.length)return n(y,S),ke&&ii(y,b),O;if(S===null){for(;b<v.length;b++)S=f(y,v[b],N),S!==null&&(_=s(S,_,b),L===null?O=S:L.sibling=S,L=S);return ke&&ii(y,b),O}for(S=r(y,S);b<v.length;b++)x=k(S,y,b,v[b],N),x!==null&&(t&&x.alternate!==null&&S.delete(x.key===null?b:x.key),_=s(x,_,b),L===null?O=x:L.sibling=x,L=x);return t&&S.forEach(function(R){return e(y,R)}),ke&&ii(y,b),O}function w(y,_,v,N){var O=To(v);if(typeof O!="function")throw Error(B(150));if(v=O.call(v),v==null)throw Error(B(151));for(var L=O=null,S=_,b=_=0,x=null,I=v.next();S!==null&&!I.done;b++,I=v.next()){S.index>b?(x=S,S=null):x=S.sibling;var R=g(y,S,I.value,N);if(R===null){S===null&&(S=x);break}t&&S&&R.alternate===null&&e(y,S),_=s(R,_,b),L===null?O=R:L.sibling=R,L=R,S=x}if(I.done)return n(y,S),ke&&ii(y,b),O;if(S===null){for(;!I.done;b++,I=v.next())I=f(y,I.value,N),I!==null&&(_=s(I,_,b),L===null?O=I:L.sibling=I,L=I);return ke&&ii(y,b),O}for(S=r(y,S);!I.done;b++,I=v.next())I=k(S,y,b,I.value,N),I!==null&&(t&&I.alternate!==null&&S.delete(I.key===null?b:I.key),_=s(I,_,b),L===null?O=I:L.sibling=I,L=I);return t&&S.forEach(function(C){return e(y,C)}),ke&&ii(y,b),O}function E(y,_,v,N){if(typeof v=="object"&&v!==null&&v.type===ls&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Rl:e:{for(var O=v.key,L=_;L!==null;){if(L.key===O){if(O=v.type,O===ls){if(L.tag===7){n(y,L.sibling),_=i(L,v.props.children),_.return=y,y=_;break e}}else if(L.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===ur&&Jy(O)===L.type){n(y,L.sibling),_=i(L,v.props),_.ref=No(y,L,v),_.return=y,y=_;break e}n(y,L);break}else e(y,L);L=L.sibling}v.type===ls?(_=yi(v.props.children,y.mode,N,v.key),_.return=y,y=_):(N=fc(v.type,v.key,v.props,null,y.mode,N),N.ref=No(y,_,v),N.return=y,y=N)}return o(y);case as:e:{for(L=v.key;_!==null;){if(_.key===L)if(_.tag===4&&_.stateNode.containerInfo===v.containerInfo&&_.stateNode.implementation===v.implementation){n(y,_.sibling),_=i(_,v.children||[]),_.return=y,y=_;break e}else{n(y,_);break}else e(y,_);_=_.sibling}_=ah(v,y.mode,N),_.return=y,y=_}return o(y);case ur:return L=v._init,E(y,_,L(v._payload),N)}if(Lo(v))return A(y,_,v,N);if(To(v))return w(y,_,v,N);Bl(y,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,_!==null&&_.tag===6?(n(y,_.sibling),_=i(_,v),_.return=y,y=_):(n(y,_),_=oh(v,y.mode,N),_.return=y,y=_),o(y)):n(y,_)}return E}var js=U_(!0),B_=U_(!1),Uc=Hr(null),Bc=null,gs=null,Rf=null;function Cf(){Rf=gs=Bc=null}function jf(t){var e=Uc.current;Ie(Uc),t._currentValue=e}function rp(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Es(t,e){Bc=t,Rf=gs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Nt=!0),t.firstContext=null)}function Yt(t){var e=t._currentValue;if(Rf!==t)if(t={context:t,memoizedValue:e,next:null},gs===null){if(Bc===null)throw Error(B(308));gs=t,Bc.dependencies={lanes:0,firstContext:t}}else gs=gs.next=t;return e}var pi=null;function Df(t){pi===null?pi=[t]:pi.push(t)}function $_(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Df(e)):(n.next=i.next,i.next=n),e.interleaved=n,Kn(t,r)}function Kn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var dr=!1;function Vf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function q_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Bn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Pr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,de&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Kn(t,n)}return i=r.interleaved,i===null?(e.next=e,Df(r)):(e.next=i.next,i.next=e),r.interleaved=e,Kn(t,n)}function lc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,_f(t,n)}}function Xy(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function $c(t,e,n,r){var i=t.updateQueue;dr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,d=u.next;u.next=null,o===null?s=d:o.next=d,o=u;var p=t.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==o&&(l===null?p.firstBaseUpdate=d:l.next=d,p.lastBaseUpdate=u))}if(s!==null){var f=i.baseState;o=0,p=d=u=null,l=s;do{var g=l.lane,k=l.eventTime;if((r&g)===g){p!==null&&(p=p.next={eventTime:k,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var A=t,w=l;switch(g=e,k=n,w.tag){case 1:if(A=w.payload,typeof A=="function"){f=A.call(k,f,g);break e}f=A;break e;case 3:A.flags=A.flags&-65537|128;case 0:if(A=w.payload,g=typeof A=="function"?A.call(k,f,g):A,g==null)break e;f=je({},f,g);break e;case 2:dr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,g=i.effects,g===null?i.effects=[l]:g.push(l))}else k={eventTime:k,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(d=p=k,u=f):p=p.next=k,o|=g;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;g=l,l=g.next,g.next=null,i.lastBaseUpdate=g,i.shared.pending=null}}while(!0);if(p===null&&(u=f),i.baseState=u,i.firstBaseUpdate=d,i.lastBaseUpdate=p,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Ii|=o,t.lanes=o,t.memoizedState=f}}function Zy(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(B(191,i));i.call(r)}}}var el={},vn=Hr(el),ba=Hr(el),Ta=Hr(el);function fi(t){if(t===el)throw Error(B(174));return t}function Of(t,e){switch(_e(Ta,e),_e(ba,t),_e(vn,el),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Mh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Mh(e,t)}Ie(vn),_e(vn,e)}function Ds(){Ie(vn),Ie(ba),Ie(Ta)}function H_(t){fi(Ta.current);var e=fi(vn.current),n=Mh(e,t.type);e!==n&&(_e(ba,t),_e(vn,n))}function Mf(t){ba.current===t&&(Ie(vn),Ie(ba))}var Ne=Hr(0);function qc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var eh=[];function Lf(){for(var t=0;t<eh.length;t++)eh[t]._workInProgressVersionPrimary=null;eh.length=0}var cc=Xn.ReactCurrentDispatcher,th=Xn.ReactCurrentBatchConfig,Ei=0,Ae=null,We=null,Xe=null,Hc=!1,Zo=!1,Ea=0,lk=0;function lt(){throw Error(B(321))}function zf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!an(t[n],e[n]))return!1;return!0}function Ff(t,e,n,r,i,s){if(Ei=s,Ae=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,cc.current=t===null||t.memoizedState===null?hk:pk,t=n(r,i),Zo){s=0;do{if(Zo=!1,Ea=0,25<=s)throw Error(B(301));s+=1,Xe=We=null,e.updateQueue=null,cc.current=fk,t=n(r,i)}while(Zo)}if(cc.current=Kc,e=We!==null&&We.next!==null,Ei=0,Xe=We=Ae=null,Hc=!1,e)throw Error(B(300));return t}function Uf(){var t=Ea!==0;return Ea=0,t}function dn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xe===null?Ae.memoizedState=Xe=t:Xe=Xe.next=t,Xe}function Jt(){if(We===null){var t=Ae.alternate;t=t!==null?t.memoizedState:null}else t=We.next;var e=Xe===null?Ae.memoizedState:Xe.next;if(e!==null)Xe=e,We=t;else{if(t===null)throw Error(B(310));We=t,t={memoizedState:We.memoizedState,baseState:We.baseState,baseQueue:We.baseQueue,queue:We.queue,next:null},Xe===null?Ae.memoizedState=Xe=t:Xe=Xe.next=t}return Xe}function Ia(t,e){return typeof e=="function"?e(t):e}function nh(t){var e=Jt(),n=e.queue;if(n===null)throw Error(B(311));n.lastRenderedReducer=t;var r=We,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,d=s;do{var p=d.lane;if((Ei&p)===p)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:t(r,d.action);else{var f={lane:p,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(l=u=f,o=r):u=u.next=f,Ae.lanes|=p,Ii|=p}d=d.next}while(d!==null&&d!==s);u===null?o=r:u.next=l,an(r,e.memoizedState)||(Nt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,Ae.lanes|=s,Ii|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function rh(t){var e=Jt(),n=e.queue;if(n===null)throw Error(B(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);an(s,e.memoizedState)||(Nt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function K_(){}function W_(t,e){var n=Ae,r=Jt(),i=e(),s=!an(r.memoizedState,i);if(s&&(r.memoizedState=i,Nt=!0),r=r.queue,Bf(Y_.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Xe!==null&&Xe.memoizedState.tag&1){if(n.flags|=2048,Sa(9,Q_.bind(null,n,r,i,e),void 0,null),Ze===null)throw Error(B(349));Ei&30||G_(n,e,i)}return i}function G_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ae.updateQueue,e===null?(e={lastEffect:null,stores:null},Ae.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Q_(t,e,n,r){e.value=n,e.getSnapshot=r,J_(e)&&X_(t)}function Y_(t,e,n){return n(function(){J_(e)&&X_(t)})}function J_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!an(t,n)}catch{return!0}}function X_(t){var e=Kn(t,1);e!==null&&sn(e,t,1,-1)}function ev(t){var e=dn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ia,lastRenderedState:t},e.queue=t,t=t.dispatch=dk.bind(null,Ae,t),[e.memoizedState,t]}function Sa(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Ae.updateQueue,e===null?(e={lastEffect:null,stores:null},Ae.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Z_(){return Jt().memoizedState}function uc(t,e,n,r){var i=dn();Ae.flags|=t,i.memoizedState=Sa(1|e,n,void 0,r===void 0?null:r)}function Au(t,e,n,r){var i=Jt();r=r===void 0?null:r;var s=void 0;if(We!==null){var o=We.memoizedState;if(s=o.destroy,r!==null&&zf(r,o.deps)){i.memoizedState=Sa(e,n,s,r);return}}Ae.flags|=t,i.memoizedState=Sa(1|e,n,s,r)}function tv(t,e){return uc(8390656,8,t,e)}function Bf(t,e){return Au(2048,8,t,e)}function ew(t,e){return Au(4,2,t,e)}function tw(t,e){return Au(4,4,t,e)}function nw(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function rw(t,e,n){return n=n!=null?n.concat([t]):null,Au(4,4,nw.bind(null,e,t),n)}function $f(){}function iw(t,e){var n=Jt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&zf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function sw(t,e){var n=Jt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&zf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function ow(t,e,n){return Ei&21?(an(n,e)||(n=d_(),Ae.lanes|=n,Ii|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Nt=!0),t.memoizedState=n)}function ck(t,e){var n=ge;ge=n!==0&&4>n?n:4,t(!0);var r=th.transition;th.transition={};try{t(!1),e()}finally{ge=n,th.transition=r}}function aw(){return Jt().memoizedState}function uk(t,e,n){var r=Rr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},lw(t))cw(e,n);else if(n=$_(t,e,n,r),n!==null){var i=wt();sn(n,t,r,i),uw(n,e,r)}}function dk(t,e,n){var r=Rr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(lw(t))cw(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,an(l,o)){var u=e.interleaved;u===null?(i.next=i,Df(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=$_(t,e,i,r),n!==null&&(i=wt(),sn(n,t,r,i),uw(n,e,r))}}function lw(t){var e=t.alternate;return t===Ae||e!==null&&e===Ae}function cw(t,e){Zo=Hc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function uw(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,_f(t,n)}}var Kc={readContext:Yt,useCallback:lt,useContext:lt,useEffect:lt,useImperativeHandle:lt,useInsertionEffect:lt,useLayoutEffect:lt,useMemo:lt,useReducer:lt,useRef:lt,useState:lt,useDebugValue:lt,useDeferredValue:lt,useTransition:lt,useMutableSource:lt,useSyncExternalStore:lt,useId:lt,unstable_isNewReconciler:!1},hk={readContext:Yt,useCallback:function(t,e){return dn().memoizedState=[t,e===void 0?null:e],t},useContext:Yt,useEffect:tv,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,uc(4194308,4,nw.bind(null,e,t),n)},useLayoutEffect:function(t,e){return uc(4194308,4,t,e)},useInsertionEffect:function(t,e){return uc(4,2,t,e)},useMemo:function(t,e){var n=dn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=dn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=uk.bind(null,Ae,t),[r.memoizedState,t]},useRef:function(t){var e=dn();return t={current:t},e.memoizedState=t},useState:ev,useDebugValue:$f,useDeferredValue:function(t){return dn().memoizedState=t},useTransition:function(){var t=ev(!1),e=t[0];return t=ck.bind(null,t[1]),dn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Ae,i=dn();if(ke){if(n===void 0)throw Error(B(407));n=n()}else{if(n=e(),Ze===null)throw Error(B(349));Ei&30||G_(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,tv(Y_.bind(null,r,s,t),[t]),r.flags|=2048,Sa(9,Q_.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=dn(),e=Ze.identifierPrefix;if(ke){var n=Mn,r=On;n=(r&~(1<<32-rn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ea++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=lk++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},pk={readContext:Yt,useCallback:iw,useContext:Yt,useEffect:Bf,useImperativeHandle:rw,useInsertionEffect:ew,useLayoutEffect:tw,useMemo:sw,useReducer:nh,useRef:Z_,useState:function(){return nh(Ia)},useDebugValue:$f,useDeferredValue:function(t){var e=Jt();return ow(e,We.memoizedState,t)},useTransition:function(){var t=nh(Ia)[0],e=Jt().memoizedState;return[t,e]},useMutableSource:K_,useSyncExternalStore:W_,useId:aw,unstable_isNewReconciler:!1},fk={readContext:Yt,useCallback:iw,useContext:Yt,useEffect:Bf,useImperativeHandle:rw,useInsertionEffect:ew,useLayoutEffect:tw,useMemo:sw,useReducer:rh,useRef:Z_,useState:function(){return rh(Ia)},useDebugValue:$f,useDeferredValue:function(t){var e=Jt();return We===null?e.memoizedState=t:ow(e,We.memoizedState,t)},useTransition:function(){var t=rh(Ia)[0],e=Jt().memoizedState;return[t,e]},useMutableSource:K_,useSyncExternalStore:W_,useId:aw,unstable_isNewReconciler:!1};function en(t,e){if(t&&t.defaultProps){e=je({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function ip(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:je({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ru={isMounted:function(t){return(t=t._reactInternals)?Ui(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=wt(),i=Rr(t),s=Bn(r,i);s.payload=e,n!=null&&(s.callback=n),e=Pr(t,s,i),e!==null&&(sn(e,t,i,r),lc(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=wt(),i=Rr(t),s=Bn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Pr(t,s,i),e!==null&&(sn(e,t,i,r),lc(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=wt(),r=Rr(t),i=Bn(n,r);i.tag=2,e!=null&&(i.callback=e),e=Pr(t,i,r),e!==null&&(sn(e,t,r,n),lc(e,t,r))}};function nv(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!va(n,r)||!va(i,s):!0}function dw(t,e,n){var r=!1,i=zr,s=e.contextType;return typeof s=="object"&&s!==null?s=Yt(s):(i=Ct(e)?bi:mt.current,r=e.contextTypes,s=(r=r!=null)?Rs(t,i):zr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Ru,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function rv(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Ru.enqueueReplaceState(e,e.state,null)}function sp(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Vf(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Yt(s):(s=Ct(e)?bi:mt.current,i.context=Rs(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(ip(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Ru.enqueueReplaceState(i,i.state,null),$c(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function Vs(t,e){try{var n="",r=e;do n+=BI(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function ih(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function op(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var mk=typeof WeakMap=="function"?WeakMap:Map;function hw(t,e,n){n=Bn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Gc||(Gc=!0,gp=r),op(t,e)},n}function pw(t,e,n){n=Bn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){op(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){op(t,e),typeof r!="function"&&(Ar===null?Ar=new Set([this]):Ar.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function iv(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new mk;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=Pk.bind(null,t,e,n),e.then(t,t))}function sv(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function ov(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Bn(-1,1),e.tag=2,Pr(n,e,1))),n.lanes|=1),t)}var gk=Xn.ReactCurrentOwner,Nt=!1;function xt(t,e,n,r){e.child=t===null?B_(e,null,n,r):js(e,t.child,n,r)}function av(t,e,n,r,i){n=n.render;var s=e.ref;return Es(e,i),r=Ff(t,e,n,r,s,i),n=Uf(),t!==null&&!Nt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Wn(t,e,i)):(ke&&n&&Nf(e),e.flags|=1,xt(t,e,r,i),e.child)}function lv(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Jf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,fw(t,e,s,r,i)):(t=fc(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:va,n(o,r)&&t.ref===e.ref)return Wn(t,e,i)}return e.flags|=1,t=Cr(s,r),t.ref=e.ref,t.return=e,e.child=t}function fw(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(va(s,r)&&t.ref===e.ref)if(Nt=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(Nt=!0);else return e.lanes=t.lanes,Wn(t,e,i)}return ap(t,e,n,r,i)}function mw(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},_e(vs,Ot),Ot|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,_e(vs,Ot),Ot|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,_e(vs,Ot),Ot|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,_e(vs,Ot),Ot|=r;return xt(t,e,i,n),e.child}function gw(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function ap(t,e,n,r,i){var s=Ct(n)?bi:mt.current;return s=Rs(e,s),Es(e,i),n=Ff(t,e,n,r,s,i),r=Uf(),t!==null&&!Nt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Wn(t,e,i)):(ke&&r&&Nf(e),e.flags|=1,xt(t,e,n,i),e.child)}function cv(t,e,n,r,i){if(Ct(n)){var s=!0;Lc(e)}else s=!1;if(Es(e,i),e.stateNode===null)dc(t,e),dw(e,n,r),sp(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,d=n.contextType;typeof d=="object"&&d!==null?d=Yt(d):(d=Ct(n)?bi:mt.current,d=Rs(e,d));var p=n.getDerivedStateFromProps,f=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==d)&&rv(e,o,r,d),dr=!1;var g=e.memoizedState;o.state=g,$c(e,r,o,i),u=e.memoizedState,l!==r||g!==u||Rt.current||dr?(typeof p=="function"&&(ip(e,n,p,r),u=e.memoizedState),(l=dr||nv(e,n,l,r,g,u,d))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=d,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,q_(t,e),l=e.memoizedProps,d=e.type===e.elementType?l:en(e.type,l),o.props=d,f=e.pendingProps,g=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Yt(u):(u=Ct(n)?bi:mt.current,u=Rs(e,u));var k=n.getDerivedStateFromProps;(p=typeof k=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==f||g!==u)&&rv(e,o,r,u),dr=!1,g=e.memoizedState,o.state=g,$c(e,r,o,i);var A=e.memoizedState;l!==f||g!==A||Rt.current||dr?(typeof k=="function"&&(ip(e,n,k,r),A=e.memoizedState),(d=dr||nv(e,n,d,r,g,A,u)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,A,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,A,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=A),o.props=r,o.state=A,o.context=u,r=d):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return lp(t,e,n,r,s,i)}function lp(t,e,n,r,i,s){gw(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Gy(e,n,!1),Wn(t,e,s);r=e.stateNode,gk.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=js(e,t.child,null,s),e.child=js(e,null,l,s)):xt(t,e,l,s),e.memoizedState=r.state,i&&Gy(e,n,!0),e.child}function yw(t){var e=t.stateNode;e.pendingContext?Wy(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Wy(t,e.context,!1),Of(t,e.containerInfo)}function uv(t,e,n,r,i){return Cs(),Af(i),e.flags|=256,xt(t,e,n,r),e.child}var cp={dehydrated:null,treeContext:null,retryLane:0};function up(t){return{baseLanes:t,cachePool:null,transitions:null}}function vw(t,e,n){var r=e.pendingProps,i=Ne.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),_e(Ne,i&1),t===null)return np(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Du(o,r,0,null),t=yi(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=up(n),e.memoizedState=cp,t):qf(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return yk(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Cr(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=Cr(l,s):(s=yi(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?up(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=cp,r}return s=t.child,t=s.sibling,r=Cr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function qf(t,e){return e=Du({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function $l(t,e,n,r){return r!==null&&Af(r),js(e,t.child,null,n),t=qf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function yk(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=ih(Error(B(422))),$l(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Du({mode:"visible",children:r.children},i,0,null),s=yi(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&js(e,t.child,null,o),e.child.memoizedState=up(o),e.memoizedState=cp,s);if(!(e.mode&1))return $l(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(B(419)),r=ih(s,r,void 0),$l(t,e,o,r)}if(l=(o&t.childLanes)!==0,Nt||l){if(r=Ze,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Kn(t,i),sn(r,t,i,-1))}return Yf(),r=ih(Error(B(421))),$l(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=Ak.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Mt=Nr(i.nextSibling),Ft=e,ke=!0,nn=null,t!==null&&(Kt[Wt++]=On,Kt[Wt++]=Mn,Kt[Wt++]=Ti,On=t.id,Mn=t.overflow,Ti=e),e=qf(e,r.children),e.flags|=4096,e)}function dv(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),rp(t.return,e,n)}function sh(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function xw(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(xt(t,e,r.children,n),r=Ne.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&dv(t,n,e);else if(t.tag===19)dv(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(_e(Ne,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&qc(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),sh(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&qc(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}sh(e,!0,n,null,s);break;case"together":sh(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function dc(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Wn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ii|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(B(153));if(e.child!==null){for(t=e.child,n=Cr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Cr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function vk(t,e,n){switch(e.tag){case 3:yw(e),Cs();break;case 5:H_(e);break;case 1:Ct(e.type)&&Lc(e);break;case 4:Of(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;_e(Uc,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(_e(Ne,Ne.current&1),e.flags|=128,null):n&e.child.childLanes?vw(t,e,n):(_e(Ne,Ne.current&1),t=Wn(t,e,n),t!==null?t.sibling:null);_e(Ne,Ne.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return xw(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),_e(Ne,Ne.current),r)break;return null;case 22:case 23:return e.lanes=0,mw(t,e,n)}return Wn(t,e,n)}var _w,dp,ww,bw;_w=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};dp=function(){};ww=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,fi(vn.current);var s=null;switch(n){case"input":i=jh(t,i),r=jh(t,r),s=[];break;case"select":i=je({},i,{value:void 0}),r=je({},r,{value:void 0}),s=[];break;case"textarea":i=Oh(t,i),r=Oh(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Oc)}Lh(n,r);var o;n=null;for(d in i)if(!r.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var l=i[d];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(da.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in r){var u=r[d];if(l=i!=null?i[d]:void 0,r.hasOwnProperty(d)&&u!==l&&(u!=null||l!=null))if(d==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(d,n)),n=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(da.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&Ee("scroll",t),s||l===u||(s=[])):(s=s||[]).push(d,u))}n&&(s=s||[]).push("style",n);var d=s;(e.updateQueue=d)&&(e.flags|=4)}};bw=function(t,e,n,r){n!==r&&(e.flags|=4)};function Po(t,e){if(!ke)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function ct(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function xk(t,e,n){var r=e.pendingProps;switch(Pf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ct(e),null;case 1:return Ct(e.type)&&Mc(),ct(e),null;case 3:return r=e.stateNode,Ds(),Ie(Rt),Ie(mt),Lf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Ul(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,nn!==null&&(xp(nn),nn=null))),dp(t,e),ct(e),null;case 5:Mf(e);var i=fi(Ta.current);if(n=e.type,t!==null&&e.stateNode!=null)ww(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(B(166));return ct(e),null}if(t=fi(vn.current),Ul(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[hn]=e,r[wa]=s,t=(e.mode&1)!==0,n){case"dialog":Ee("cancel",r),Ee("close",r);break;case"iframe":case"object":case"embed":Ee("load",r);break;case"video":case"audio":for(i=0;i<Fo.length;i++)Ee(Fo[i],r);break;case"source":Ee("error",r);break;case"img":case"image":case"link":Ee("error",r),Ee("load",r);break;case"details":Ee("toggle",r);break;case"input":_y(r,s),Ee("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Ee("invalid",r);break;case"textarea":by(r,s),Ee("invalid",r)}Lh(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&Fl(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&Fl(r.textContent,l,t),i=["children",""+l]):da.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&Ee("scroll",r)}switch(n){case"input":Cl(r),wy(r,s,!0);break;case"textarea":Cl(r),Ty(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Oc)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Y0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[hn]=e,t[wa]=r,_w(t,e,!1,!1),e.stateNode=t;e:{switch(o=zh(n,r),n){case"dialog":Ee("cancel",t),Ee("close",t),i=r;break;case"iframe":case"object":case"embed":Ee("load",t),i=r;break;case"video":case"audio":for(i=0;i<Fo.length;i++)Ee(Fo[i],t);i=r;break;case"source":Ee("error",t),i=r;break;case"img":case"image":case"link":Ee("error",t),Ee("load",t),i=r;break;case"details":Ee("toggle",t),i=r;break;case"input":_y(t,r),i=jh(t,r),Ee("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=je({},r,{value:void 0}),Ee("invalid",t);break;case"textarea":by(t,r),i=Oh(t,r),Ee("invalid",t);break;default:i=r}Lh(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?Z0(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&J0(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&ha(t,u):typeof u=="number"&&ha(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(da.hasOwnProperty(s)?u!=null&&s==="onScroll"&&Ee("scroll",t):u!=null&&ff(t,s,u,o))}switch(n){case"input":Cl(t),wy(t,r,!1);break;case"textarea":Cl(t),Ty(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Lr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?_s(t,!!r.multiple,s,!1):r.defaultValue!=null&&_s(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Oc)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return ct(e),null;case 6:if(t&&e.stateNode!=null)bw(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(B(166));if(n=fi(Ta.current),fi(vn.current),Ul(e)){if(r=e.stateNode,n=e.memoizedProps,r[hn]=e,(s=r.nodeValue!==n)&&(t=Ft,t!==null))switch(t.tag){case 3:Fl(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Fl(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[hn]=e,e.stateNode=r}return ct(e),null;case 13:if(Ie(Ne),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ke&&Mt!==null&&e.mode&1&&!(e.flags&128))F_(),Cs(),e.flags|=98560,s=!1;else if(s=Ul(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(B(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(B(317));s[hn]=e}else Cs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;ct(e),s=!1}else nn!==null&&(xp(nn),nn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Ne.current&1?Ge===0&&(Ge=3):Yf())),e.updateQueue!==null&&(e.flags|=4),ct(e),null);case 4:return Ds(),dp(t,e),t===null&&xa(e.stateNode.containerInfo),ct(e),null;case 10:return jf(e.type._context),ct(e),null;case 17:return Ct(e.type)&&Mc(),ct(e),null;case 19:if(Ie(Ne),s=e.memoizedState,s===null)return ct(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Po(s,!1);else{if(Ge!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=qc(t),o!==null){for(e.flags|=128,Po(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return _e(Ne,Ne.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ue()>Os&&(e.flags|=128,r=!0,Po(s,!1),e.lanes=4194304)}else{if(!r)if(t=qc(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Po(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ke)return ct(e),null}else 2*Ue()-s.renderingStartTime>Os&&n!==1073741824&&(e.flags|=128,r=!0,Po(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ue(),e.sibling=null,n=Ne.current,_e(Ne,r?n&1|2:n&1),e):(ct(e),null);case 22:case 23:return Qf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Ot&1073741824&&(ct(e),e.subtreeFlags&6&&(e.flags|=8192)):ct(e),null;case 24:return null;case 25:return null}throw Error(B(156,e.tag))}function _k(t,e){switch(Pf(e),e.tag){case 1:return Ct(e.type)&&Mc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ds(),Ie(Rt),Ie(mt),Lf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Mf(e),null;case 13:if(Ie(Ne),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(B(340));Cs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Ie(Ne),null;case 4:return Ds(),null;case 10:return jf(e.type._context),null;case 22:case 23:return Qf(),null;case 24:return null;default:return null}}var ql=!1,pt=!1,wk=typeof WeakSet=="function"?WeakSet:Set,G=null;function ys(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ve(t,e,r)}else n.current=null}function hp(t,e,n){try{n()}catch(r){Ve(t,e,r)}}var hv=!1;function bk(t,e){if(Qh=jc,t=k_(),kf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,d=0,p=0,f=t,g=null;t:for(;;){for(var k;f!==n||i!==0&&f.nodeType!==3||(l=o+i),f!==s||r!==0&&f.nodeType!==3||(u=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(k=f.firstChild)!==null;)g=f,f=k;for(;;){if(f===t)break t;if(g===n&&++d===i&&(l=o),g===s&&++p===r&&(u=o),(k=f.nextSibling)!==null)break;f=g,g=f.parentNode}f=k}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Yh={focusedElem:t,selectionRange:n},jc=!1,G=e;G!==null;)if(e=G,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,G=t;else for(;G!==null;){e=G;try{var A=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(A!==null){var w=A.memoizedProps,E=A.memoizedState,y=e.stateNode,_=y.getSnapshotBeforeUpdate(e.elementType===e.type?w:en(e.type,w),E);y.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(B(163))}}catch(N){Ve(e,e.return,N)}if(t=e.sibling,t!==null){t.return=e.return,G=t;break}G=e.return}return A=hv,hv=!1,A}function ea(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&hp(e,n,s)}i=i.next}while(i!==r)}}function Cu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function pp(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Tw(t){var e=t.alternate;e!==null&&(t.alternate=null,Tw(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[hn],delete e[wa],delete e[Zh],delete e[ik],delete e[sk])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Ew(t){return t.tag===5||t.tag===3||t.tag===4}function pv(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Ew(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function fp(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Oc));else if(r!==4&&(t=t.child,t!==null))for(fp(t,e,n),t=t.sibling;t!==null;)fp(t,e,n),t=t.sibling}function mp(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(mp(t,e,n),t=t.sibling;t!==null;)mp(t,e,n),t=t.sibling}var tt=null,tn=!1;function or(t,e,n){for(n=n.child;n!==null;)Iw(t,e,n),n=n.sibling}function Iw(t,e,n){if(yn&&typeof yn.onCommitFiberUnmount=="function")try{yn.onCommitFiberUnmount(Eu,n)}catch{}switch(n.tag){case 5:pt||ys(n,e);case 6:var r=tt,i=tn;tt=null,or(t,e,n),tt=r,tn=i,tt!==null&&(tn?(t=tt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):tt.removeChild(n.stateNode));break;case 18:tt!==null&&(tn?(t=tt,n=n.stateNode,t.nodeType===8?Xd(t.parentNode,n):t.nodeType===1&&Xd(t,n),ga(t)):Xd(tt,n.stateNode));break;case 4:r=tt,i=tn,tt=n.stateNode.containerInfo,tn=!0,or(t,e,n),tt=r,tn=i;break;case 0:case 11:case 14:case 15:if(!pt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&hp(n,e,o),i=i.next}while(i!==r)}or(t,e,n);break;case 1:if(!pt&&(ys(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Ve(n,e,l)}or(t,e,n);break;case 21:or(t,e,n);break;case 22:n.mode&1?(pt=(r=pt)||n.memoizedState!==null,or(t,e,n),pt=r):or(t,e,n);break;default:or(t,e,n)}}function fv(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new wk),e.forEach(function(r){var i=Rk.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Zt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:tt=l.stateNode,tn=!1;break e;case 3:tt=l.stateNode.containerInfo,tn=!0;break e;case 4:tt=l.stateNode.containerInfo,tn=!0;break e}l=l.return}if(tt===null)throw Error(B(160));Iw(s,o,i),tt=null,tn=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(d){Ve(i,e,d)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Sw(e,t),e=e.sibling}function Sw(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Zt(e,t),un(t),r&4){try{ea(3,t,t.return),Cu(3,t)}catch(w){Ve(t,t.return,w)}try{ea(5,t,t.return)}catch(w){Ve(t,t.return,w)}}break;case 1:Zt(e,t),un(t),r&512&&n!==null&&ys(n,n.return);break;case 5:if(Zt(e,t),un(t),r&512&&n!==null&&ys(n,n.return),t.flags&32){var i=t.stateNode;try{ha(i,"")}catch(w){Ve(t,t.return,w)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&G0(i,s),zh(l,o);var d=zh(l,s);for(o=0;o<u.length;o+=2){var p=u[o],f=u[o+1];p==="style"?Z0(i,f):p==="dangerouslySetInnerHTML"?J0(i,f):p==="children"?ha(i,f):ff(i,p,f,d)}switch(l){case"input":Dh(i,s);break;case"textarea":Q0(i,s);break;case"select":var g=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var k=s.value;k!=null?_s(i,!!s.multiple,k,!1):g!==!!s.multiple&&(s.defaultValue!=null?_s(i,!!s.multiple,s.defaultValue,!0):_s(i,!!s.multiple,s.multiple?[]:"",!1))}i[wa]=s}catch(w){Ve(t,t.return,w)}}break;case 6:if(Zt(e,t),un(t),r&4){if(t.stateNode===null)throw Error(B(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(w){Ve(t,t.return,w)}}break;case 3:if(Zt(e,t),un(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ga(e.containerInfo)}catch(w){Ve(t,t.return,w)}break;case 4:Zt(e,t),un(t);break;case 13:Zt(e,t),un(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Wf=Ue())),r&4&&fv(t);break;case 22:if(p=n!==null&&n.memoizedState!==null,t.mode&1?(pt=(d=pt)||p,Zt(e,t),pt=d):Zt(e,t),un(t),r&8192){if(d=t.memoizedState!==null,(t.stateNode.isHidden=d)&&!p&&t.mode&1)for(G=t,p=t.child;p!==null;){for(f=G=p;G!==null;){switch(g=G,k=g.child,g.tag){case 0:case 11:case 14:case 15:ea(4,g,g.return);break;case 1:ys(g,g.return);var A=g.stateNode;if(typeof A.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,A.props=e.memoizedProps,A.state=e.memoizedState,A.componentWillUnmount()}catch(w){Ve(r,n,w)}}break;case 5:ys(g,g.return);break;case 22:if(g.memoizedState!==null){gv(f);continue}}k!==null?(k.return=g,G=k):gv(f)}p=p.sibling}e:for(p=null,f=t;;){if(f.tag===5){if(p===null){p=f;try{i=f.stateNode,d?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=f.stateNode,u=f.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=X0("display",o))}catch(w){Ve(t,t.return,w)}}}else if(f.tag===6){if(p===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(w){Ve(t,t.return,w)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;p===f&&(p=null),f=f.return}p===f&&(p=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Zt(e,t),un(t),r&4&&fv(t);break;case 21:break;default:Zt(e,t),un(t)}}function un(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Ew(n)){var r=n;break e}n=n.return}throw Error(B(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(ha(i,""),r.flags&=-33);var s=pv(t);mp(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=pv(t);fp(t,l,o);break;default:throw Error(B(161))}}catch(u){Ve(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Tk(t,e,n){G=t,kw(t)}function kw(t,e,n){for(var r=(t.mode&1)!==0;G!==null;){var i=G,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ql;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||pt;l=ql;var d=pt;if(ql=o,(pt=u)&&!d)for(G=i;G!==null;)o=G,u=o.child,o.tag===22&&o.memoizedState!==null?yv(i):u!==null?(u.return=o,G=u):yv(i);for(;s!==null;)G=s,kw(s),s=s.sibling;G=i,ql=l,pt=d}mv(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,G=s):mv(t)}}function mv(t){for(;G!==null;){var e=G;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:pt||Cu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!pt)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:en(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Zy(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Zy(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var d=e.alternate;if(d!==null){var p=d.memoizedState;if(p!==null){var f=p.dehydrated;f!==null&&ga(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(B(163))}pt||e.flags&512&&pp(e)}catch(g){Ve(e,e.return,g)}}if(e===t){G=null;break}if(n=e.sibling,n!==null){n.return=e.return,G=n;break}G=e.return}}function gv(t){for(;G!==null;){var e=G;if(e===t){G=null;break}var n=e.sibling;if(n!==null){n.return=e.return,G=n;break}G=e.return}}function yv(t){for(;G!==null;){var e=G;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Cu(4,e)}catch(u){Ve(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Ve(e,i,u)}}var s=e.return;try{pp(e)}catch(u){Ve(e,s,u)}break;case 5:var o=e.return;try{pp(e)}catch(u){Ve(e,o,u)}}}catch(u){Ve(e,e.return,u)}if(e===t){G=null;break}var l=e.sibling;if(l!==null){l.return=e.return,G=l;break}G=e.return}}var Ek=Math.ceil,Wc=Xn.ReactCurrentDispatcher,Hf=Xn.ReactCurrentOwner,Qt=Xn.ReactCurrentBatchConfig,de=0,Ze=null,Ke=null,rt=0,Ot=0,vs=Hr(0),Ge=0,ka=null,Ii=0,ju=0,Kf=0,ta=null,kt=null,Wf=0,Os=1/0,jn=null,Gc=!1,gp=null,Ar=null,Hl=!1,br=null,Qc=0,na=0,yp=null,hc=-1,pc=0;function wt(){return de&6?Ue():hc!==-1?hc:hc=Ue()}function Rr(t){return t.mode&1?de&2&&rt!==0?rt&-rt:ak.transition!==null?(pc===0&&(pc=d_()),pc):(t=ge,t!==0||(t=window.event,t=t===void 0?16:v_(t.type)),t):1}function sn(t,e,n,r){if(50<na)throw na=0,yp=null,Error(B(185));Ja(t,n,r),(!(de&2)||t!==Ze)&&(t===Ze&&(!(de&2)&&(ju|=n),Ge===4&&pr(t,rt)),jt(t,r),n===1&&de===0&&!(e.mode&1)&&(Os=Ue()+500,Pu&&Kr()))}function jt(t,e){var n=t.callbackNode;aS(t,e);var r=Cc(t,t===Ze?rt:0);if(r===0)n!==null&&Sy(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Sy(n),e===1)t.tag===0?ok(vv.bind(null,t)):M_(vv.bind(null,t)),nk(function(){!(de&6)&&Kr()}),n=null;else{switch(h_(r)){case 1:n=xf;break;case 4:n=c_;break;case 16:n=Rc;break;case 536870912:n=u_;break;default:n=Rc}n=Vw(n,Nw.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Nw(t,e){if(hc=-1,pc=0,de&6)throw Error(B(327));var n=t.callbackNode;if(Is()&&t.callbackNode!==n)return null;var r=Cc(t,t===Ze?rt:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Yc(t,r);else{e=r;var i=de;de|=2;var s=Aw();(Ze!==t||rt!==e)&&(jn=null,Os=Ue()+500,gi(t,e));do try{kk();break}catch(l){Pw(t,l)}while(!0);Cf(),Wc.current=s,de=i,Ke!==null?e=0:(Ze=null,rt=0,e=Ge)}if(e!==0){if(e===2&&(i=qh(t),i!==0&&(r=i,e=vp(t,i))),e===1)throw n=ka,gi(t,0),pr(t,r),jt(t,Ue()),n;if(e===6)pr(t,r);else{if(i=t.current.alternate,!(r&30)&&!Ik(i)&&(e=Yc(t,r),e===2&&(s=qh(t),s!==0&&(r=s,e=vp(t,s))),e===1))throw n=ka,gi(t,0),pr(t,r),jt(t,Ue()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(B(345));case 2:si(t,kt,jn);break;case 3:if(pr(t,r),(r&130023424)===r&&(e=Wf+500-Ue(),10<e)){if(Cc(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){wt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Xh(si.bind(null,t,kt,jn),e);break}si(t,kt,jn);break;case 4:if(pr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-rn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Ue()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ek(r/1960))-r,10<r){t.timeoutHandle=Xh(si.bind(null,t,kt,jn),r);break}si(t,kt,jn);break;case 5:si(t,kt,jn);break;default:throw Error(B(329))}}}return jt(t,Ue()),t.callbackNode===n?Nw.bind(null,t):null}function vp(t,e){var n=ta;return t.current.memoizedState.isDehydrated&&(gi(t,e).flags|=256),t=Yc(t,e),t!==2&&(e=kt,kt=n,e!==null&&xp(e)),t}function xp(t){kt===null?kt=t:kt.push.apply(kt,t)}function Ik(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!an(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function pr(t,e){for(e&=~Kf,e&=~ju,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-rn(e),r=1<<n;t[n]=-1,e&=~r}}function vv(t){if(de&6)throw Error(B(327));Is();var e=Cc(t,0);if(!(e&1))return jt(t,Ue()),null;var n=Yc(t,e);if(t.tag!==0&&n===2){var r=qh(t);r!==0&&(e=r,n=vp(t,r))}if(n===1)throw n=ka,gi(t,0),pr(t,e),jt(t,Ue()),n;if(n===6)throw Error(B(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,si(t,kt,jn),jt(t,Ue()),null}function Gf(t,e){var n=de;de|=1;try{return t(e)}finally{de=n,de===0&&(Os=Ue()+500,Pu&&Kr())}}function Si(t){br!==null&&br.tag===0&&!(de&6)&&Is();var e=de;de|=1;var n=Qt.transition,r=ge;try{if(Qt.transition=null,ge=1,t)return t()}finally{ge=r,Qt.transition=n,de=e,!(de&6)&&Kr()}}function Qf(){Ot=vs.current,Ie(vs)}function gi(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,tk(n)),Ke!==null)for(n=Ke.return;n!==null;){var r=n;switch(Pf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Mc();break;case 3:Ds(),Ie(Rt),Ie(mt),Lf();break;case 5:Mf(r);break;case 4:Ds();break;case 13:Ie(Ne);break;case 19:Ie(Ne);break;case 10:jf(r.type._context);break;case 22:case 23:Qf()}n=n.return}if(Ze=t,Ke=t=Cr(t.current,null),rt=Ot=e,Ge=0,ka=null,Kf=ju=Ii=0,kt=ta=null,pi!==null){for(e=0;e<pi.length;e++)if(n=pi[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}pi=null}return t}function Pw(t,e){do{var n=Ke;try{if(Cf(),cc.current=Kc,Hc){for(var r=Ae.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Hc=!1}if(Ei=0,Xe=We=Ae=null,Zo=!1,Ea=0,Hf.current=null,n===null||n.return===null){Ge=1,ka=e,Ke=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=rt,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,p=l,f=p.tag;if(!(p.mode&1)&&(f===0||f===11||f===15)){var g=p.alternate;g?(p.updateQueue=g.updateQueue,p.memoizedState=g.memoizedState,p.lanes=g.lanes):(p.updateQueue=null,p.memoizedState=null)}var k=sv(o);if(k!==null){k.flags&=-257,ov(k,o,l,s,e),k.mode&1&&iv(s,d,e),e=k,u=d;var A=e.updateQueue;if(A===null){var w=new Set;w.add(u),e.updateQueue=w}else A.add(u);break e}else{if(!(e&1)){iv(s,d,e),Yf();break e}u=Error(B(426))}}else if(ke&&l.mode&1){var E=sv(o);if(E!==null){!(E.flags&65536)&&(E.flags|=256),ov(E,o,l,s,e),Af(Vs(u,l));break e}}s=u=Vs(u,l),Ge!==4&&(Ge=2),ta===null?ta=[s]:ta.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var y=hw(s,u,e);Xy(s,y);break e;case 1:l=u;var _=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Ar===null||!Ar.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var N=pw(s,l,e);Xy(s,N);break e}}s=s.return}while(s!==null)}Cw(n)}catch(O){e=O,Ke===n&&n!==null&&(Ke=n=n.return);continue}break}while(!0)}function Aw(){var t=Wc.current;return Wc.current=Kc,t===null?Kc:t}function Yf(){(Ge===0||Ge===3||Ge===2)&&(Ge=4),Ze===null||!(Ii&268435455)&&!(ju&268435455)||pr(Ze,rt)}function Yc(t,e){var n=de;de|=2;var r=Aw();(Ze!==t||rt!==e)&&(jn=null,gi(t,e));do try{Sk();break}catch(i){Pw(t,i)}while(!0);if(Cf(),de=n,Wc.current=r,Ke!==null)throw Error(B(261));return Ze=null,rt=0,Ge}function Sk(){for(;Ke!==null;)Rw(Ke)}function kk(){for(;Ke!==null&&!XI();)Rw(Ke)}function Rw(t){var e=Dw(t.alternate,t,Ot);t.memoizedProps=t.pendingProps,e===null?Cw(t):Ke=e,Hf.current=null}function Cw(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=_k(n,e),n!==null){n.flags&=32767,Ke=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ge=6,Ke=null;return}}else if(n=xk(n,e,Ot),n!==null){Ke=n;return}if(e=e.sibling,e!==null){Ke=e;return}Ke=e=t}while(e!==null);Ge===0&&(Ge=5)}function si(t,e,n){var r=ge,i=Qt.transition;try{Qt.transition=null,ge=1,Nk(t,e,n,r)}finally{Qt.transition=i,ge=r}return null}function Nk(t,e,n,r){do Is();while(br!==null);if(de&6)throw Error(B(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(B(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(lS(t,s),t===Ze&&(Ke=Ze=null,rt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Hl||(Hl=!0,Vw(Rc,function(){return Is(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Qt.transition,Qt.transition=null;var o=ge;ge=1;var l=de;de|=4,Hf.current=null,bk(t,n),Sw(n,t),GS(Yh),jc=!!Qh,Yh=Qh=null,t.current=n,Tk(n),ZI(),de=l,ge=o,Qt.transition=s}else t.current=n;if(Hl&&(Hl=!1,br=t,Qc=i),s=t.pendingLanes,s===0&&(Ar=null),nS(n.stateNode),jt(t,Ue()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Gc)throw Gc=!1,t=gp,gp=null,t;return Qc&1&&t.tag!==0&&Is(),s=t.pendingLanes,s&1?t===yp?na++:(na=0,yp=t):na=0,Kr(),null}function Is(){if(br!==null){var t=h_(Qc),e=Qt.transition,n=ge;try{if(Qt.transition=null,ge=16>t?16:t,br===null)var r=!1;else{if(t=br,br=null,Qc=0,de&6)throw Error(B(331));var i=de;for(de|=4,G=t.current;G!==null;){var s=G,o=s.child;if(G.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var d=l[u];for(G=d;G!==null;){var p=G;switch(p.tag){case 0:case 11:case 15:ea(8,p,s)}var f=p.child;if(f!==null)f.return=p,G=f;else for(;G!==null;){p=G;var g=p.sibling,k=p.return;if(Tw(p),p===d){G=null;break}if(g!==null){g.return=k,G=g;break}G=k}}}var A=s.alternate;if(A!==null){var w=A.child;if(w!==null){A.child=null;do{var E=w.sibling;w.sibling=null,w=E}while(w!==null)}}G=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,G=o;else e:for(;G!==null;){if(s=G,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ea(9,s,s.return)}var y=s.sibling;if(y!==null){y.return=s.return,G=y;break e}G=s.return}}var _=t.current;for(G=_;G!==null;){o=G;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,G=v;else e:for(o=_;G!==null;){if(l=G,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Cu(9,l)}}catch(O){Ve(l,l.return,O)}if(l===o){G=null;break e}var N=l.sibling;if(N!==null){N.return=l.return,G=N;break e}G=l.return}}if(de=i,Kr(),yn&&typeof yn.onPostCommitFiberRoot=="function")try{yn.onPostCommitFiberRoot(Eu,t)}catch{}r=!0}return r}finally{ge=n,Qt.transition=e}}return!1}function xv(t,e,n){e=Vs(n,e),e=hw(t,e,1),t=Pr(t,e,1),e=wt(),t!==null&&(Ja(t,1,e),jt(t,e))}function Ve(t,e,n){if(t.tag===3)xv(t,t,n);else for(;e!==null;){if(e.tag===3){xv(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ar===null||!Ar.has(r))){t=Vs(n,t),t=pw(e,t,1),e=Pr(e,t,1),t=wt(),e!==null&&(Ja(e,1,t),jt(e,t));break}}e=e.return}}function Pk(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=wt(),t.pingedLanes|=t.suspendedLanes&n,Ze===t&&(rt&n)===n&&(Ge===4||Ge===3&&(rt&130023424)===rt&&500>Ue()-Wf?gi(t,0):Kf|=n),jt(t,e)}function jw(t,e){e===0&&(t.mode&1?(e=Vl,Vl<<=1,!(Vl&130023424)&&(Vl=4194304)):e=1);var n=wt();t=Kn(t,e),t!==null&&(Ja(t,e,n),jt(t,n))}function Ak(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),jw(t,n)}function Rk(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(B(314))}r!==null&&r.delete(e),jw(t,n)}var Dw;Dw=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Rt.current)Nt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Nt=!1,vk(t,e,n);Nt=!!(t.flags&131072)}else Nt=!1,ke&&e.flags&1048576&&L_(e,Fc,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;dc(t,e),t=e.pendingProps;var i=Rs(e,mt.current);Es(e,n),i=Ff(null,e,r,t,i,n);var s=Uf();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Ct(r)?(s=!0,Lc(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Vf(e),i.updater=Ru,e.stateNode=i,i._reactInternals=e,sp(e,r,t,n),e=lp(null,e,r,!0,s,n)):(e.tag=0,ke&&s&&Nf(e),xt(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(dc(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=jk(r),t=en(r,t),i){case 0:e=ap(null,e,r,t,n);break e;case 1:e=cv(null,e,r,t,n);break e;case 11:e=av(null,e,r,t,n);break e;case 14:e=lv(null,e,r,en(r.type,t),n);break e}throw Error(B(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:en(r,i),ap(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:en(r,i),cv(t,e,r,i,n);case 3:e:{if(yw(e),t===null)throw Error(B(387));r=e.pendingProps,s=e.memoizedState,i=s.element,q_(t,e),$c(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Vs(Error(B(423)),e),e=uv(t,e,r,n,i);break e}else if(r!==i){i=Vs(Error(B(424)),e),e=uv(t,e,r,n,i);break e}else for(Mt=Nr(e.stateNode.containerInfo.firstChild),Ft=e,ke=!0,nn=null,n=B_(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Cs(),r===i){e=Wn(t,e,n);break e}xt(t,e,r,n)}e=e.child}return e;case 5:return H_(e),t===null&&np(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,Jh(r,i)?o=null:s!==null&&Jh(r,s)&&(e.flags|=32),gw(t,e),xt(t,e,o,n),e.child;case 6:return t===null&&np(e),null;case 13:return vw(t,e,n);case 4:return Of(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=js(e,null,r,n):xt(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:en(r,i),av(t,e,r,i,n);case 7:return xt(t,e,e.pendingProps,n),e.child;case 8:return xt(t,e,e.pendingProps.children,n),e.child;case 12:return xt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,_e(Uc,r._currentValue),r._currentValue=o,s!==null)if(an(s.value,o)){if(s.children===i.children&&!Rt.current){e=Wn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Bn(-1,n&-n),u.tag=2;var d=s.updateQueue;if(d!==null){d=d.shared;var p=d.pending;p===null?u.next=u:(u.next=p.next,p.next=u),d.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),rp(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(B(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),rp(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}xt(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Es(e,n),i=Yt(i),r=r(i),e.flags|=1,xt(t,e,r,n),e.child;case 14:return r=e.type,i=en(r,e.pendingProps),i=en(r.type,i),lv(t,e,r,i,n);case 15:return fw(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:en(r,i),dc(t,e),e.tag=1,Ct(r)?(t=!0,Lc(e)):t=!1,Es(e,n),dw(e,r,i),sp(e,r,i,n),lp(null,e,r,!0,t,n);case 19:return xw(t,e,n);case 22:return mw(t,e,n)}throw Error(B(156,e.tag))};function Vw(t,e){return l_(t,e)}function Ck(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Gt(t,e,n,r){return new Ck(t,e,n,r)}function Jf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function jk(t){if(typeof t=="function")return Jf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===gf)return 11;if(t===yf)return 14}return 2}function Cr(t,e){var n=t.alternate;return n===null?(n=Gt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function fc(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Jf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ls:return yi(n.children,i,s,e);case mf:o=8,i|=8;break;case Ph:return t=Gt(12,n,e,i|2),t.elementType=Ph,t.lanes=s,t;case Ah:return t=Gt(13,n,e,i),t.elementType=Ah,t.lanes=s,t;case Rh:return t=Gt(19,n,e,i),t.elementType=Rh,t.lanes=s,t;case H0:return Du(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case $0:o=10;break e;case q0:o=9;break e;case gf:o=11;break e;case yf:o=14;break e;case ur:o=16,r=null;break e}throw Error(B(130,t==null?t:typeof t,""))}return e=Gt(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function yi(t,e,n,r){return t=Gt(7,t,r,e),t.lanes=n,t}function Du(t,e,n,r){return t=Gt(22,t,r,e),t.elementType=H0,t.lanes=n,t.stateNode={isHidden:!1},t}function oh(t,e,n){return t=Gt(6,t,null,e),t.lanes=n,t}function ah(t,e,n){return e=Gt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Dk(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ud(0),this.expirationTimes=Ud(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ud(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Xf(t,e,n,r,i,s,o,l,u){return t=new Dk(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Gt(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Vf(s),t}function Vk(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:as,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Ow(t){if(!t)return zr;t=t._reactInternals;e:{if(Ui(t)!==t||t.tag!==1)throw Error(B(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Ct(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(B(171))}if(t.tag===1){var n=t.type;if(Ct(n))return O_(t,n,e)}return e}function Mw(t,e,n,r,i,s,o,l,u){return t=Xf(n,r,!0,t,i,s,o,l,u),t.context=Ow(null),n=t.current,r=wt(),i=Rr(n),s=Bn(r,i),s.callback=e??null,Pr(n,s,i),t.current.lanes=i,Ja(t,i,r),jt(t,r),t}function Vu(t,e,n,r){var i=e.current,s=wt(),o=Rr(i);return n=Ow(n),e.context===null?e.context=n:e.pendingContext=n,e=Bn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Pr(i,e,o),t!==null&&(sn(t,i,o,s),lc(t,i,o)),o}function Jc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function _v(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Zf(t,e){_v(t,e),(t=t.alternate)&&_v(t,e)}function Ok(){return null}var Lw=typeof reportError=="function"?reportError:function(t){console.error(t)};function em(t){this._internalRoot=t}Ou.prototype.render=em.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(B(409));Vu(t,e,null,null)};Ou.prototype.unmount=em.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Si(function(){Vu(null,t,null,null)}),e[Hn]=null}};function Ou(t){this._internalRoot=t}Ou.prototype.unstable_scheduleHydration=function(t){if(t){var e=m_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<hr.length&&e!==0&&e<hr[n].priority;n++);hr.splice(n,0,t),n===0&&y_(t)}};function tm(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Mu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function wv(){}function Mk(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var d=Jc(o);s.call(d)}}var o=Mw(e,r,t,0,null,!1,!1,"",wv);return t._reactRootContainer=o,t[Hn]=o.current,xa(t.nodeType===8?t.parentNode:t),Si(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var d=Jc(u);l.call(d)}}var u=Xf(t,0,!1,null,null,!1,!1,"",wv);return t._reactRootContainer=u,t[Hn]=u.current,xa(t.nodeType===8?t.parentNode:t),Si(function(){Vu(e,u,n,r)}),u}function Lu(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=Jc(o);l.call(u)}}Vu(e,o,t,i)}else o=Mk(n,e,t,i,r);return Jc(o)}p_=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=zo(e.pendingLanes);n!==0&&(_f(e,n|1),jt(e,Ue()),!(de&6)&&(Os=Ue()+500,Kr()))}break;case 13:Si(function(){var r=Kn(t,1);if(r!==null){var i=wt();sn(r,t,1,i)}}),Zf(t,1)}};wf=function(t){if(t.tag===13){var e=Kn(t,134217728);if(e!==null){var n=wt();sn(e,t,134217728,n)}Zf(t,134217728)}};f_=function(t){if(t.tag===13){var e=Rr(t),n=Kn(t,e);if(n!==null){var r=wt();sn(n,t,e,r)}Zf(t,e)}};m_=function(){return ge};g_=function(t,e){var n=ge;try{return ge=t,e()}finally{ge=n}};Uh=function(t,e,n){switch(e){case"input":if(Dh(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Nu(r);if(!i)throw Error(B(90));W0(r),Dh(r,i)}}}break;case"textarea":Q0(t,n);break;case"select":e=n.value,e!=null&&_s(t,!!n.multiple,e,!1)}};n_=Gf;r_=Si;var Lk={usingClientEntryPoint:!1,Events:[Za,hs,Nu,e_,t_,Gf]},Ao={findFiberByHostInstance:hi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},zk={bundleType:Ao.bundleType,version:Ao.version,rendererPackageName:Ao.rendererPackageName,rendererConfig:Ao.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Xn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=o_(t),t===null?null:t.stateNode},findFiberByHostInstance:Ao.findFiberByHostInstance||Ok,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Kl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Kl.isDisabled&&Kl.supportsFiber)try{Eu=Kl.inject(zk),yn=Kl}catch{}}qt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Lk;qt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!tm(e))throw Error(B(200));return Vk(t,e,null,n)};qt.createRoot=function(t,e){if(!tm(t))throw Error(B(299));var n=!1,r="",i=Lw;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Xf(t,1,!1,null,null,n,!1,r,i),t[Hn]=e.current,xa(t.nodeType===8?t.parentNode:t),new em(e)};qt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(B(188)):(t=Object.keys(t).join(","),Error(B(268,t)));return t=o_(e),t=t===null?null:t.stateNode,t};qt.flushSync=function(t){return Si(t)};qt.hydrate=function(t,e,n){if(!Mu(e))throw Error(B(200));return Lu(null,t,e,!0,n)};qt.hydrateRoot=function(t,e,n){if(!tm(t))throw Error(B(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Lw;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Mw(e,null,t,1,n??null,i,!1,s,o),t[Hn]=e.current,xa(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Ou(e)};qt.render=function(t,e,n){if(!Mu(e))throw Error(B(200));return Lu(null,t,e,!1,n)};qt.unmountComponentAtNode=function(t){if(!Mu(t))throw Error(B(40));return t._reactRootContainer?(Si(function(){Lu(null,null,t,!1,function(){t._reactRootContainer=null,t[Hn]=null})}),!0):!1};qt.unstable_batchedUpdates=Gf;qt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Mu(n))throw Error(B(200));if(t==null||t._reactInternals===void 0)throw Error(B(38));return Lu(t,e,n,!1,r)};qt.version="18.3.1-next-f1338f8080-20240426";function zw(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(zw)}catch(t){console.error(t)}}zw(),z0.exports=qt;var Fk=z0.exports,bv=Fk;kh.createRoot=bv.createRoot,kh.hydrateRoot=bv.hydrateRoot;/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Na(){return Na=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Na.apply(null,arguments)}var Tr;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Tr||(Tr={}));const Tv="popstate";function Uk(t){t===void 0&&(t={});function e(r,i){let{pathname:s,search:o,hash:l}=r.location;return _p("",{pathname:s,search:o,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:Xc(i)}return $k(e,n,null,t)}function Re(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function nm(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Bk(){return Math.random().toString(36).substr(2,8)}function Ev(t,e){return{usr:t.state,key:t.key,idx:e}}function _p(t,e,n,r){return n===void 0&&(n=null),Na({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?to(e):e,{state:n,key:e&&e.key||r||Bk()})}function Xc(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function to(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function $k(t,e,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,l=Tr.Pop,u=null,d=p();d==null&&(d=0,o.replaceState(Na({},o.state,{idx:d}),""));function p(){return(o.state||{idx:null}).idx}function f(){l=Tr.Pop;let E=p(),y=E==null?null:E-d;d=E,u&&u({action:l,location:w.location,delta:y})}function g(E,y){l=Tr.Push;let _=_p(w.location,E,y);d=p()+1;let v=Ev(_,d),N=w.createHref(_);try{o.pushState(v,"",N)}catch(O){if(O instanceof DOMException&&O.name==="DataCloneError")throw O;i.location.assign(N)}s&&u&&u({action:l,location:w.location,delta:1})}function k(E,y){l=Tr.Replace;let _=_p(w.location,E,y);d=p();let v=Ev(_,d),N=w.createHref(_);o.replaceState(v,"",N),s&&u&&u({action:l,location:w.location,delta:0})}function A(E){let y=i.location.origin!=="null"?i.location.origin:i.location.href,_=typeof E=="string"?E:Xc(E);return _=_.replace(/ $/,"%20"),Re(y,"No window.location.(origin|href) available to create URL for href: "+_),new URL(_,y)}let w={get action(){return l},get location(){return t(i,o)},listen(E){if(u)throw new Error("A history only accepts one active listener");return i.addEventListener(Tv,f),u=E,()=>{i.removeEventListener(Tv,f),u=null}},createHref(E){return e(i,E)},createURL:A,encodeLocation(E){let y=A(E);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:k,go(E){return o.go(E)}};return w}var Iv;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(Iv||(Iv={}));function qk(t,e,n){return n===void 0&&(n="/"),Hk(t,e,n)}function Hk(t,e,n,r){let i=typeof e=="string"?to(e):e,s=Ms(i.pathname||"/",n);if(s==null)return null;let o=Fw(t);Kk(o);let l=null,u=rN(s);for(let d=0;l==null&&d<o.length;++d)l=tN(o[d],u);return l}function Fw(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(s,o,l)=>{let u={relativePath:l===void 0?s.path||"":l,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};u.relativePath.startsWith("/")&&(Re(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let d=jr([r,u.relativePath]),p=n.concat(u);s.children&&s.children.length>0&&(Re(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Fw(s.children,e,p,d)),!(s.path==null&&!s.index)&&e.push({path:d,score:Zk(d,s.index),routesMeta:p})};return t.forEach((s,o)=>{var l;if(s.path===""||!((l=s.path)!=null&&l.includes("?")))i(s,o);else for(let u of Uw(s.path))i(s,o,u)}),e}function Uw(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=Uw(r.join("/")),l=[];return l.push(...o.map(u=>u===""?s:[s,u].join("/"))),i&&l.push(...o),l.map(u=>t.startsWith("/")&&u===""?"/":u)}function Kk(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:eN(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Wk=/^:[\w-]+$/,Gk=3,Qk=2,Yk=1,Jk=10,Xk=-2,Sv=t=>t==="*";function Zk(t,e){let n=t.split("/"),r=n.length;return n.some(Sv)&&(r+=Xk),e&&(r+=Qk),n.filter(i=>!Sv(i)).reduce((i,s)=>i+(Wk.test(s)?Gk:s===""?Yk:Jk),r)}function eN(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function tN(t,e,n){let{routesMeta:r}=t,i={},s="/",o=[];for(let l=0;l<r.length;++l){let u=r[l],d=l===r.length-1,p=s==="/"?e:e.slice(s.length)||"/",f=wp({path:u.relativePath,caseSensitive:u.caseSensitive,end:d},p),g=u.route;if(!f)return null;Object.assign(i,f.params),o.push({params:i,pathname:jr([s,f.pathname]),pathnameBase:lN(jr([s,f.pathnameBase])),route:g}),f.pathnameBase!=="/"&&(s=jr([s,f.pathnameBase]))}return o}function wp(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=nN(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:r.reduce((d,p,f)=>{let{paramName:g,isOptional:k}=p;if(g==="*"){let w=l[f]||"";o=s.slice(0,s.length-w.length).replace(/(.)\/+$/,"$1")}const A=l[f];return k&&!A?d[g]=void 0:d[g]=(A||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:o,pattern:t}}function nN(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),nm(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function rN(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return nm(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Ms(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const iN=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,sN=t=>iN.test(t);function oN(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?to(t):t,s;if(n)if(sN(n))s=n;else{if(n.includes("//")){let o=n;n=Bw(n),nm(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?s=kv(n.substring(1),"/"):s=kv(n,e)}else s=e;return{pathname:s,search:cN(r),hash:uN(i)}}function kv(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function lh(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function aN(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function rm(t,e){let n=aN(t);return e?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function im(t,e,n,r){r===void 0&&(r=!1);let i;typeof t=="string"?i=to(t):(i=Na({},t),Re(!i.pathname||!i.pathname.includes("?"),lh("?","pathname","search",i)),Re(!i.pathname||!i.pathname.includes("#"),lh("#","pathname","hash",i)),Re(!i.search||!i.search.includes("#"),lh("#","search","hash",i)));let s=t===""||i.pathname==="",o=s?"/":i.pathname,l;if(o==null)l=n;else{let f=e.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),f-=1;i.pathname=g.join("/")}l=f>=0?e[f]:"/"}let u=oN(i,l),d=o&&o!=="/"&&o.endsWith("/"),p=(s||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(d||p)&&(u.pathname+="/"),u}const Bw=t=>t.replace(/\/\/+/g,"/"),jr=t=>Bw(t.join("/")),lN=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),cN=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,uN=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function dN(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const $w=["post","put","patch","delete"];new Set($w);const hN=["get",...$w];new Set(hN);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Pa(){return Pa=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Pa.apply(null,arguments)}const zu=D.createContext(null),qw=D.createContext(null),Zn=D.createContext(null),Fu=D.createContext(null),En=D.createContext({outlet:null,matches:[],isDataRoute:!1}),Hw=D.createContext(null);function pN(t,e){let{relative:n}=e===void 0?{}:e;no()||Re(!1);let{basename:r,navigator:i}=D.useContext(Zn),{hash:s,pathname:o,search:l}=Uu(t,{relative:n}),u=o;return r!=="/"&&(u=o==="/"?r:jr([r,o])),i.createHref({pathname:u,search:l,hash:s})}function no(){return D.useContext(Fu)!=null}function Wr(){return no()||Re(!1),D.useContext(Fu).location}function Kw(t){D.useContext(Zn).static||D.useLayoutEffect(t)}function cn(){let{isDataRoute:t}=D.useContext(En);return t?PN():fN()}function fN(){no()||Re(!1);let t=D.useContext(zu),{basename:e,future:n,navigator:r}=D.useContext(Zn),{matches:i}=D.useContext(En),{pathname:s}=Wr(),o=JSON.stringify(rm(i,n.v7_relativeSplatPath)),l=D.useRef(!1);return Kw(()=>{l.current=!0}),D.useCallback(function(d,p){if(p===void 0&&(p={}),!l.current)return;if(typeof d=="number"){r.go(d);return}let f=im(d,JSON.parse(o),s,p.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:jr([e,f.pathname])),(p.replace?r.replace:r.push)(f,p.state,p)},[e,r,o,s,t])}const mN=D.createContext(null);function gN(t){let e=D.useContext(En).outlet;return e&&D.createElement(mN.Provider,{value:t},e)}function yN(){let{matches:t}=D.useContext(En),e=t[t.length-1];return e?e.params:{}}function Uu(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=D.useContext(Zn),{matches:i}=D.useContext(En),{pathname:s}=Wr(),o=JSON.stringify(rm(i,r.v7_relativeSplatPath));return D.useMemo(()=>im(t,JSON.parse(o),s,n==="path"),[t,o,s,n])}function vN(t,e){return xN(t,e)}function xN(t,e,n,r){no()||Re(!1);let{navigator:i}=D.useContext(Zn),{matches:s}=D.useContext(En),o=s[s.length-1],l=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let d=Wr(),p;if(e){var f;let E=typeof e=="string"?to(e):e;u==="/"||(f=E.pathname)!=null&&f.startsWith(u)||Re(!1),p=E}else p=d;let g=p.pathname||"/",k=g;if(u!=="/"){let E=u.replace(/^\//,"").split("/");k="/"+g.replace(/^\//,"").split("/").slice(E.length).join("/")}let A=qk(t,{pathname:k}),w=EN(A&&A.map(E=>Object.assign({},E,{params:Object.assign({},l,E.params),pathname:jr([u,i.encodeLocation?i.encodeLocation(E.pathname).pathname:E.pathname]),pathnameBase:E.pathnameBase==="/"?u:jr([u,i.encodeLocation?i.encodeLocation(E.pathnameBase).pathname:E.pathnameBase])})),s,n,r);return e&&w?D.createElement(Fu.Provider,{value:{location:Pa({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:Tr.Pop}},w):w}function _N(){let t=NN(),e=dN(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return D.createElement(D.Fragment,null,D.createElement("h2",null,"Unexpected Application Error!"),D.createElement("h3",{style:{fontStyle:"italic"}},e),n?D.createElement("pre",{style:i},n):null,null)}const wN=D.createElement(_N,null);class bN extends D.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?D.createElement(En.Provider,{value:this.props.routeContext},D.createElement(Hw.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function TN(t){let{routeContext:e,match:n,children:r}=t,i=D.useContext(zu);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),D.createElement(En.Provider,{value:e},r)}function EN(t,e,n,r){var i;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,l=(i=n)==null?void 0:i.errors;if(l!=null){let p=o.findIndex(f=>f.route.id&&(l==null?void 0:l[f.route.id])!==void 0);p>=0||Re(!1),o=o.slice(0,Math.min(o.length,p+1))}let u=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let p=0;p<o.length;p++){let f=o[p];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(d=p),f.route.id){let{loaderData:g,errors:k}=n,A=f.route.loader&&g[f.route.id]===void 0&&(!k||k[f.route.id]===void 0);if(f.route.lazy||A){u=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((p,f,g)=>{let k,A=!1,w=null,E=null;n&&(k=l&&f.route.id?l[f.route.id]:void 0,w=f.route.errorElement||wN,u&&(d<0&&g===0?(AN("route-fallback"),A=!0,E=null):d===g&&(A=!0,E=f.route.hydrateFallbackElement||null)));let y=e.concat(o.slice(0,g+1)),_=()=>{let v;return k?v=w:A?v=E:f.route.Component?v=D.createElement(f.route.Component,null):f.route.element?v=f.route.element:v=p,D.createElement(TN,{match:f,routeContext:{outlet:p,matches:y,isDataRoute:n!=null},children:v})};return n&&(f.route.ErrorBoundary||f.route.errorElement||g===0)?D.createElement(bN,{location:n.location,revalidation:n.revalidation,component:w,error:k,children:_(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):_()},null)}var Ww=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(Ww||{}),Gw=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(Gw||{});function IN(t){let e=D.useContext(zu);return e||Re(!1),e}function SN(t){let e=D.useContext(qw);return e||Re(!1),e}function kN(t){let e=D.useContext(En);return e||Re(!1),e}function Qw(t){let e=kN(),n=e.matches[e.matches.length-1];return n.route.id||Re(!1),n.route.id}function NN(){var t;let e=D.useContext(Hw),n=SN(),r=Qw();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function PN(){let{router:t}=IN(Ww.UseNavigateStable),e=Qw(Gw.UseNavigateStable),n=D.useRef(!1);return Kw(()=>{n.current=!0}),D.useCallback(function(i,s){s===void 0&&(s={}),n.current&&(typeof i=="number"?t.navigate(i):t.navigate(i,Pa({fromRouteId:e},s)))},[t,e])}const Nv={};function AN(t,e,n){Nv[t]||(Nv[t]=!0)}function RN(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function CN(t){let{to:e,replace:n,state:r,relative:i}=t;no()||Re(!1);let{future:s,static:o}=D.useContext(Zn),{matches:l}=D.useContext(En),{pathname:u}=Wr(),d=cn(),p=im(e,rm(l,s.v7_relativeSplatPath),u,i==="path"),f=JSON.stringify(p);return D.useEffect(()=>d(JSON.parse(f),{replace:n,state:r,relative:i}),[d,f,i,n,r]),null}function jN(t){return gN(t.context)}function dt(t){Re(!1)}function DN(t){let{basename:e="/",children:n=null,location:r,navigationType:i=Tr.Pop,navigator:s,static:o=!1,future:l}=t;no()&&Re(!1);let u=e.replace(/^\/*/,"/"),d=D.useMemo(()=>({basename:u,navigator:s,static:o,future:Pa({v7_relativeSplatPath:!1},l)}),[u,l,s,o]);typeof r=="string"&&(r=to(r));let{pathname:p="/",search:f="",hash:g="",state:k=null,key:A="default"}=r,w=D.useMemo(()=>{let E=Ms(p,u);return E==null?null:{location:{pathname:E,search:f,hash:g,state:k,key:A},navigationType:i}},[u,p,f,g,k,A,i]);return w==null?null:D.createElement(Zn.Provider,{value:d},D.createElement(Fu.Provider,{children:n,value:w}))}function VN(t){let{children:e,location:n}=t;return vN(bp(e),n)}new Promise(()=>{});function bp(t,e){e===void 0&&(e=[]);let n=[];return D.Children.forEach(t,(r,i)=>{if(!D.isValidElement(r))return;let s=[...e,i];if(r.type===D.Fragment){n.push.apply(n,bp(r.props.children,s));return}r.type!==dt&&Re(!1),!r.props.index||!r.props.children||Re(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=bp(r.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Zc(){return Zc=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Zc.apply(null,arguments)}function Yw(t,e){if(t==null)return{};var n={};for(var r in t)if({}.hasOwnProperty.call(t,r)){if(e.indexOf(r)!==-1)continue;n[r]=t[r]}return n}function ON(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function MN(t,e){return t.button===0&&(!e||e==="_self")&&!ON(t)}function Tp(t){return t===void 0&&(t=""),new URLSearchParams(typeof t=="string"||Array.isArray(t)||t instanceof URLSearchParams?t:Object.keys(t).reduce((e,n)=>{let r=t[n];return e.concat(Array.isArray(r)?r.map(i=>[n,i]):[[n,r]])},[]))}function LN(t,e){let n=Tp(t);return e&&e.forEach((r,i)=>{n.has(i)||e.getAll(i).forEach(s=>{n.append(i,s)})}),n}const zN=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],FN=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],UN="6";try{window.__reactRouterVersion=UN}catch{}const BN=D.createContext({isTransitioning:!1}),$N="startTransition",Pv=PI[$N];function qN(t){let{basename:e,children:n,future:r,window:i}=t,s=D.useRef();s.current==null&&(s.current=Uk({window:i,v5Compat:!0}));let o=s.current,[l,u]=D.useState({action:o.action,location:o.location}),{v7_startTransition:d}=r||{},p=D.useCallback(f=>{d&&Pv?Pv(()=>u(f)):u(f)},[u,d]);return D.useLayoutEffect(()=>o.listen(p),[o,p]),D.useEffect(()=>RN(r),[r]),D.createElement(DN,{basename:e,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}const HN=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",KN=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,fe=D.forwardRef(function(e,n){let{onClick:r,relative:i,reloadDocument:s,replace:o,state:l,target:u,to:d,preventScrollReset:p,viewTransition:f}=e,g=Yw(e,zN),{basename:k}=D.useContext(Zn),A,w=!1;if(typeof d=="string"&&KN.test(d)&&(A=d,HN))try{let v=new URL(window.location.href),N=d.startsWith("//")?new URL(v.protocol+d):new URL(d),O=Ms(N.pathname,k);N.origin===v.origin&&O!=null?d=O+N.search+N.hash:w=!0}catch{}let E=pN(d,{relative:i}),y=GN(d,{replace:o,state:l,target:u,preventScrollReset:p,relative:i,viewTransition:f});function _(v){r&&r(v),v.defaultPrevented||y(v)}return D.createElement("a",Zc({},g,{href:A||E,onClick:w||s?r:_,ref:n,target:u}))}),Vn=D.forwardRef(function(e,n){let{"aria-current":r="page",caseSensitive:i=!1,className:s="",end:o=!1,style:l,to:u,viewTransition:d,children:p}=e,f=Yw(e,FN),g=Uu(u,{relative:f.relative}),k=Wr(),A=D.useContext(qw),{navigator:w,basename:E}=D.useContext(Zn),y=A!=null&&QN(g)&&d===!0,_=w.encodeLocation?w.encodeLocation(g).pathname:g.pathname,v=k.pathname,N=A&&A.navigation&&A.navigation.location?A.navigation.location.pathname:null;i||(v=v.toLowerCase(),N=N?N.toLowerCase():null,_=_.toLowerCase()),N&&E&&(N=Ms(N,E)||N);const O=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let L=v===_||!o&&v.startsWith(_)&&v.charAt(O)==="/",S=N!=null&&(N===_||!o&&N.startsWith(_)&&N.charAt(_.length)==="/"),b={isActive:L,isPending:S,isTransitioning:y},x=L?r:void 0,I;typeof s=="function"?I=s(b):I=[s,L?"active":null,S?"pending":null,y?"transitioning":null].filter(Boolean).join(" ");let R=typeof l=="function"?l(b):l;return D.createElement(fe,Zc({},f,{"aria-current":x,className:I,ref:n,style:R,to:u,viewTransition:d}),typeof p=="function"?p(b):p)});var Ep;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(Ep||(Ep={}));var Av;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(Av||(Av={}));function WN(t){let e=D.useContext(zu);return e||Re(!1),e}function GN(t,e){let{target:n,replace:r,state:i,preventScrollReset:s,relative:o,viewTransition:l}=e===void 0?{}:e,u=cn(),d=Wr(),p=Uu(t,{relative:o});return D.useCallback(f=>{if(MN(f,n)){f.preventDefault();let g=r!==void 0?r:Xc(d)===Xc(p);u(t,{replace:g,state:i,preventScrollReset:s,relative:o,viewTransition:l})}},[d,u,p,r,i,n,t,s,o,l])}function sm(t){let e=D.useRef(Tp(t)),n=D.useRef(!1),r=Wr(),i=D.useMemo(()=>LN(r.search,n.current?null:e.current),[r.search]),s=cn(),o=D.useCallback((l,u)=>{const d=Tp(typeof l=="function"?l(i):l);n.current=!0,s("?"+d,u)},[s,i]);return[i,o]}function QN(t,e){e===void 0&&(e={});let n=D.useContext(BN);n==null&&Re(!1);let{basename:r}=WN(Ep.useViewTransitionState),i=Uu(t,{relative:e.relative});if(!n.isTransitioning)return!1;let s=Ms(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Ms(n.nextLocation.pathname,r)||n.nextLocation.pathname;return wp(i.pathname,o)!=null||wp(i.pathname,s)!=null}/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YN=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Jw=(...t)=>t.filter((e,n,r)=>!!e&&r.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var JN={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XN=D.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:s,iconNode:o,...l},u)=>D.createElement("svg",{ref:u,...JN,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:Jw("lucide",i),...l},[...o.map(([d,p])=>D.createElement(d,p)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=(t,e)=>{const n=D.forwardRef(({className:r,...i},s)=>D.createElement(XN,{ref:s,iconNode:e,className:Jw(`lucide-${YN(t)}`,r),...i}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bi=ie("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ip=ie("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xw=ie("Car",[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rv=ie("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZN=ie("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aa=ie("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eu=ie("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e2=ie("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t2=ie("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n2=ie("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cv=ie("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r2=ie("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i2=ie("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s2=ie("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o2=ie("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a2=ie("KeyRound",[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",key:"167ctg"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zw=ie("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l2=ie("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ra=ie("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c2=ie("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e1=ie("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jv=ie("Navigation",[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u2=ie("OctagonAlert",[["polygon",{points:"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2",key:"h1p8hx"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d2=ie("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",key:"ymcmye"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ca=ie("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=ie("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ch=ie("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mi=ie("Receipt",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 17.5v-11",key:"1jc1ny"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h2=ie("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ki=ie("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t1=ie("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p2=ie("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f2=ie("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=ie("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7",key:"jon5kx"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n1=ie("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r1=ie("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i1=ie("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m2=ie("Truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g2=ie("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja=ie("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kp=ie("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s1=ie("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),o1=D.createContext(null);function y2(){var e;const t=localStorage.getItem("tyresaathi_theme");return t==="dark"||t==="light"?t:(e=window.matchMedia)!=null&&e.call(window,"(prefers-color-scheme: dark)").matches?"dark":"light"}function v2({children:t}){const[e,n]=D.useState(y2());D.useEffect(()=>{document.documentElement.setAttribute("data-theme",e),localStorage.setItem("tyresaathi_theme",e)},[e]);function r(){n(i=>i==="dark"?"light":"dark")}return a.jsx(o1.Provider,{value:{theme:e,toggleTheme:r,setTheme:n},children:t})}function a1(){const t=D.useContext(o1);if(!t)throw new Error("useTheme must be used inside <ThemeProvider>");return t}var Vv={};/**
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
 */const l1=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},x2=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},c1={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,d=u?t[i+2]:0,p=s>>2,f=(s&3)<<4|l>>4;let g=(l&15)<<2|d>>6,k=d&63;u||(k=64,o||(g=64)),r.push(n[p],n[f],n[g],n[k])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(l1(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):x2(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const d=i<t.length?n[t.charAt(i)]:64;++i;const f=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||d==null||f==null)throw new _2;const g=s<<2|l>>4;if(r.push(g),d!==64){const k=l<<4&240|d>>2;if(r.push(k),f!==64){const A=d<<6&192|f;r.push(A)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class _2 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const w2=function(t){const e=l1(t);return c1.encodeByteArray(e,!0)},tu=function(t){return w2(t).replace(/\./g,"")},u1=function(t){try{return c1.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function b2(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const T2=()=>b2().__FIREBASE_DEFAULTS__,E2=()=>{if(typeof process>"u"||typeof Vv>"u")return;const t=Vv.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},I2=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&u1(t[1]);return e&&JSON.parse(e)},Bu=()=>{try{return T2()||E2()||I2()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},d1=t=>{var e,n;return(n=(e=Bu())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},S2=t=>{const e=d1(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},h1=()=>{var t;return(t=Bu())===null||t===void 0?void 0:t.config},p1=t=>{var e;return(e=Bu())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class k2{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function N2(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[tu(JSON.stringify(n)),tu(JSON.stringify(o)),""].join(".")}/**
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
 */function Qe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function P2(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Qe())}function A2(){var t;const e=(t=Bu())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function R2(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function C2(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function j2(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function D2(){const t=Qe();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function f1(){return!A2()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function m1(){try{return typeof indexedDB=="object"}catch{return!1}}function V2(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
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
 */const O2="FirebaseError";class In extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=O2,Object.setPrototypeOf(this,In.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,tl.prototype.create)}}class tl{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?M2(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new In(i,l,r)}}function M2(t,e){return t.replace(L2,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const L2=/\{\$([^}]+)}/g;function z2(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Da(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Ov(s)&&Ov(o)){if(!Da(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Ov(t){return t!==null&&typeof t=="object"}/**
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
 */function nl(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Uo(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Bo(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function F2(t,e){const n=new U2(t,e);return n.subscribe.bind(n)}class U2{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");B2(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=uh),i.error===void 0&&(i.error=uh),i.complete===void 0&&(i.complete=uh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function B2(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function uh(){}/**
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
 */function Me(t){return t&&t._delegate?t._delegate:t}class Fr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class $2{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new k2;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(H2(e))try{this.getOrInitializeService({instanceIdentifier:oi})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=oi){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=oi){return this.instances.has(e)}getOptions(e=oi){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:q2(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=oi){return this.component?this.component.multipleInstances?e:oi:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function q2(t){return t===oi?void 0:t}function H2(t){return t.instantiationMode==="EAGER"}/**
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
 */class K2{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new $2(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ae;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ae||(ae={}));const W2={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},G2=ae.INFO,Q2={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},Y2=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Q2[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class om{constructor(e){this.name=e,this._logLevel=G2,this._logHandler=Y2,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?W2[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}}const J2=(t,e)=>e.some(n=>t instanceof n);let Mv,Lv;function X2(){return Mv||(Mv=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Z2(){return Lv||(Lv=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const g1=new WeakMap,Np=new WeakMap,y1=new WeakMap,dh=new WeakMap,am=new WeakMap;function eP(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Dr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&g1.set(n,t)}).catch(()=>{}),am.set(e,t),e}function tP(t){if(Np.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Np.set(t,e)}let Pp={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Np.get(t);if(e==="objectStoreNames")return t.objectStoreNames||y1.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Dr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function nP(t){Pp=t(Pp)}function rP(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(hh(this),e,...n);return y1.set(r,e.sort?e.sort():[e]),Dr(r)}:Z2().includes(t)?function(...e){return t.apply(hh(this),e),Dr(g1.get(this))}:function(...e){return Dr(t.apply(hh(this),e))}}function iP(t){return typeof t=="function"?rP(t):(t instanceof IDBTransaction&&tP(t),J2(t,X2())?new Proxy(t,Pp):t)}function Dr(t){if(t instanceof IDBRequest)return eP(t);if(dh.has(t))return dh.get(t);const e=iP(t);return e!==t&&(dh.set(t,e),am.set(e,t)),e}const hh=t=>am.get(t);function sP(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=Dr(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Dr(o.result),u.oldVersion,u.newVersion,Dr(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const oP=["get","getKey","getAll","getAllKeys","count"],aP=["put","add","delete","clear"],ph=new Map;function zv(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ph.get(e))return ph.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=aP.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||oP.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[n](...l),i&&u.done]))[0]};return ph.set(e,s),s}nP(t=>({...t,get:(e,n,r)=>zv(e,n)||t.get(e,n,r),has:(e,n)=>!!zv(e,n)||t.has(e,n)}));/**
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
 */class lP{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(cP(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function cP(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ap="@firebase/app",Fv="0.10.13";/**
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
 */const Gn=new om("@firebase/app"),uP="@firebase/app-compat",dP="@firebase/analytics-compat",hP="@firebase/analytics",pP="@firebase/app-check-compat",fP="@firebase/app-check",mP="@firebase/auth",gP="@firebase/auth-compat",yP="@firebase/database",vP="@firebase/data-connect",xP="@firebase/database-compat",_P="@firebase/functions",wP="@firebase/functions-compat",bP="@firebase/installations",TP="@firebase/installations-compat",EP="@firebase/messaging",IP="@firebase/messaging-compat",SP="@firebase/performance",kP="@firebase/performance-compat",NP="@firebase/remote-config",PP="@firebase/remote-config-compat",AP="@firebase/storage",RP="@firebase/storage-compat",CP="@firebase/firestore",jP="@firebase/vertexai-preview",DP="@firebase/firestore-compat",VP="firebase",OP="10.14.1";/**
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
 */const Rp="[DEFAULT]",MP={[Ap]:"fire-core",[uP]:"fire-core-compat",[hP]:"fire-analytics",[dP]:"fire-analytics-compat",[fP]:"fire-app-check",[pP]:"fire-app-check-compat",[mP]:"fire-auth",[gP]:"fire-auth-compat",[yP]:"fire-rtdb",[vP]:"fire-data-connect",[xP]:"fire-rtdb-compat",[_P]:"fire-fn",[wP]:"fire-fn-compat",[bP]:"fire-iid",[TP]:"fire-iid-compat",[EP]:"fire-fcm",[IP]:"fire-fcm-compat",[SP]:"fire-perf",[kP]:"fire-perf-compat",[NP]:"fire-rc",[PP]:"fire-rc-compat",[AP]:"fire-gcs",[RP]:"fire-gcs-compat",[CP]:"fire-fst",[DP]:"fire-fst-compat",[jP]:"fire-vertex","fire-js":"fire-js",[VP]:"fire-js-all"};/**
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
 */const nu=new Map,LP=new Map,Cp=new Map;function Uv(t,e){try{t.container.addComponent(e)}catch(n){Gn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ni(t){const e=t.name;if(Cp.has(e))return Gn.debug(`There were multiple attempts to register component ${e}.`),!1;Cp.set(e,t);for(const n of nu.values())Uv(n,t);for(const n of LP.values())Uv(n,t);return!0}function $u(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function pn(t){return t.settings!==void 0}/**
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
 */const zP={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Vr=new tl("app","Firebase",zP);/**
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
 */class FP{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Fr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Vr.create("app-deleted",{appName:this._name})}}/**
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
 */const $i=OP;function v1(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Rp,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Vr.create("bad-app-name",{appName:String(i)});if(n||(n=h1()),!n)throw Vr.create("no-options");const s=nu.get(i);if(s){if(Da(n,s.options)&&Da(r,s.config))return s;throw Vr.create("duplicate-app",{appName:i})}const o=new K2(i);for(const u of Cp.values())o.addComponent(u);const l=new FP(n,r,o);return nu.set(i,l),l}function x1(t=Rp){const e=nu.get(t);if(!e&&t===Rp&&h1())return v1();if(!e)throw Vr.create("no-app",{appName:t});return e}function xn(t,e,n){var r;let i=(r=MP[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Gn.warn(l.join(" "));return}Ni(new Fr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const UP="firebase-heartbeat-database",BP=1,Va="firebase-heartbeat-store";let fh=null;function _1(){return fh||(fh=sP(UP,BP,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Va)}catch(n){console.warn(n)}}}}).catch(t=>{throw Vr.create("idb-open",{originalErrorMessage:t.message})})),fh}async function $P(t){try{const n=(await _1()).transaction(Va),r=await n.objectStore(Va).get(w1(t));return await n.done,r}catch(e){if(e instanceof In)Gn.warn(e.message);else{const n=Vr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Gn.warn(n.message)}}}async function Bv(t,e){try{const r=(await _1()).transaction(Va,"readwrite");await r.objectStore(Va).put(e,w1(t)),await r.done}catch(n){if(n instanceof In)Gn.warn(n.message);else{const r=Vr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Gn.warn(r.message)}}}function w1(t){return`${t.name}!${t.options.appId}`}/**
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
 */const qP=1024,HP=30*24*60*60*1e3;class KP{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new GP(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=$v();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=HP}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Gn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=$v(),{heartbeatsToSend:r,unsentEntries:i}=WP(this._heartbeatsCache.heartbeats),s=tu(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Gn.warn(n),""}}}function $v(){return new Date().toISOString().substring(0,10)}function WP(t,e=qP){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),qv(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),qv(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class GP{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return m1()?V2().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await $P(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Bv(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Bv(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function qv(t){return tu(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function QP(t){Ni(new Fr("platform-logger",e=>new lP(e),"PRIVATE")),Ni(new Fr("heartbeat",e=>new KP(e),"PRIVATE")),xn(Ap,Fv,t),xn(Ap,Fv,"esm2017"),xn("fire-js","")}QP("");var YP="firebase",JP="10.14.1";/**
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
 */xn(YP,JP,"app");var Hv=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var vi,b1;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(S,b){function x(){}x.prototype=b.prototype,S.D=b.prototype,S.prototype=new x,S.prototype.constructor=S,S.C=function(I,R,C){for(var P=Array(arguments.length-2),M=2;M<arguments.length;M++)P[M-2]=arguments[M];return b.prototype[R].apply(I,P)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(S,b,x){x||(x=0);var I=Array(16);if(typeof b=="string")for(var R=0;16>R;++R)I[R]=b.charCodeAt(x++)|b.charCodeAt(x++)<<8|b.charCodeAt(x++)<<16|b.charCodeAt(x++)<<24;else for(R=0;16>R;++R)I[R]=b[x++]|b[x++]<<8|b[x++]<<16|b[x++]<<24;b=S.g[0],x=S.g[1],R=S.g[2];var C=S.g[3],P=b+(C^x&(R^C))+I[0]+3614090360&4294967295;b=x+(P<<7&4294967295|P>>>25),P=C+(R^b&(x^R))+I[1]+3905402710&4294967295,C=b+(P<<12&4294967295|P>>>20),P=R+(x^C&(b^x))+I[2]+606105819&4294967295,R=C+(P<<17&4294967295|P>>>15),P=x+(b^R&(C^b))+I[3]+3250441966&4294967295,x=R+(P<<22&4294967295|P>>>10),P=b+(C^x&(R^C))+I[4]+4118548399&4294967295,b=x+(P<<7&4294967295|P>>>25),P=C+(R^b&(x^R))+I[5]+1200080426&4294967295,C=b+(P<<12&4294967295|P>>>20),P=R+(x^C&(b^x))+I[6]+2821735955&4294967295,R=C+(P<<17&4294967295|P>>>15),P=x+(b^R&(C^b))+I[7]+4249261313&4294967295,x=R+(P<<22&4294967295|P>>>10),P=b+(C^x&(R^C))+I[8]+1770035416&4294967295,b=x+(P<<7&4294967295|P>>>25),P=C+(R^b&(x^R))+I[9]+2336552879&4294967295,C=b+(P<<12&4294967295|P>>>20),P=R+(x^C&(b^x))+I[10]+4294925233&4294967295,R=C+(P<<17&4294967295|P>>>15),P=x+(b^R&(C^b))+I[11]+2304563134&4294967295,x=R+(P<<22&4294967295|P>>>10),P=b+(C^x&(R^C))+I[12]+1804603682&4294967295,b=x+(P<<7&4294967295|P>>>25),P=C+(R^b&(x^R))+I[13]+4254626195&4294967295,C=b+(P<<12&4294967295|P>>>20),P=R+(x^C&(b^x))+I[14]+2792965006&4294967295,R=C+(P<<17&4294967295|P>>>15),P=x+(b^R&(C^b))+I[15]+1236535329&4294967295,x=R+(P<<22&4294967295|P>>>10),P=b+(R^C&(x^R))+I[1]+4129170786&4294967295,b=x+(P<<5&4294967295|P>>>27),P=C+(x^R&(b^x))+I[6]+3225465664&4294967295,C=b+(P<<9&4294967295|P>>>23),P=R+(b^x&(C^b))+I[11]+643717713&4294967295,R=C+(P<<14&4294967295|P>>>18),P=x+(C^b&(R^C))+I[0]+3921069994&4294967295,x=R+(P<<20&4294967295|P>>>12),P=b+(R^C&(x^R))+I[5]+3593408605&4294967295,b=x+(P<<5&4294967295|P>>>27),P=C+(x^R&(b^x))+I[10]+38016083&4294967295,C=b+(P<<9&4294967295|P>>>23),P=R+(b^x&(C^b))+I[15]+3634488961&4294967295,R=C+(P<<14&4294967295|P>>>18),P=x+(C^b&(R^C))+I[4]+3889429448&4294967295,x=R+(P<<20&4294967295|P>>>12),P=b+(R^C&(x^R))+I[9]+568446438&4294967295,b=x+(P<<5&4294967295|P>>>27),P=C+(x^R&(b^x))+I[14]+3275163606&4294967295,C=b+(P<<9&4294967295|P>>>23),P=R+(b^x&(C^b))+I[3]+4107603335&4294967295,R=C+(P<<14&4294967295|P>>>18),P=x+(C^b&(R^C))+I[8]+1163531501&4294967295,x=R+(P<<20&4294967295|P>>>12),P=b+(R^C&(x^R))+I[13]+2850285829&4294967295,b=x+(P<<5&4294967295|P>>>27),P=C+(x^R&(b^x))+I[2]+4243563512&4294967295,C=b+(P<<9&4294967295|P>>>23),P=R+(b^x&(C^b))+I[7]+1735328473&4294967295,R=C+(P<<14&4294967295|P>>>18),P=x+(C^b&(R^C))+I[12]+2368359562&4294967295,x=R+(P<<20&4294967295|P>>>12),P=b+(x^R^C)+I[5]+4294588738&4294967295,b=x+(P<<4&4294967295|P>>>28),P=C+(b^x^R)+I[8]+2272392833&4294967295,C=b+(P<<11&4294967295|P>>>21),P=R+(C^b^x)+I[11]+1839030562&4294967295,R=C+(P<<16&4294967295|P>>>16),P=x+(R^C^b)+I[14]+4259657740&4294967295,x=R+(P<<23&4294967295|P>>>9),P=b+(x^R^C)+I[1]+2763975236&4294967295,b=x+(P<<4&4294967295|P>>>28),P=C+(b^x^R)+I[4]+1272893353&4294967295,C=b+(P<<11&4294967295|P>>>21),P=R+(C^b^x)+I[7]+4139469664&4294967295,R=C+(P<<16&4294967295|P>>>16),P=x+(R^C^b)+I[10]+3200236656&4294967295,x=R+(P<<23&4294967295|P>>>9),P=b+(x^R^C)+I[13]+681279174&4294967295,b=x+(P<<4&4294967295|P>>>28),P=C+(b^x^R)+I[0]+3936430074&4294967295,C=b+(P<<11&4294967295|P>>>21),P=R+(C^b^x)+I[3]+3572445317&4294967295,R=C+(P<<16&4294967295|P>>>16),P=x+(R^C^b)+I[6]+76029189&4294967295,x=R+(P<<23&4294967295|P>>>9),P=b+(x^R^C)+I[9]+3654602809&4294967295,b=x+(P<<4&4294967295|P>>>28),P=C+(b^x^R)+I[12]+3873151461&4294967295,C=b+(P<<11&4294967295|P>>>21),P=R+(C^b^x)+I[15]+530742520&4294967295,R=C+(P<<16&4294967295|P>>>16),P=x+(R^C^b)+I[2]+3299628645&4294967295,x=R+(P<<23&4294967295|P>>>9),P=b+(R^(x|~C))+I[0]+4096336452&4294967295,b=x+(P<<6&4294967295|P>>>26),P=C+(x^(b|~R))+I[7]+1126891415&4294967295,C=b+(P<<10&4294967295|P>>>22),P=R+(b^(C|~x))+I[14]+2878612391&4294967295,R=C+(P<<15&4294967295|P>>>17),P=x+(C^(R|~b))+I[5]+4237533241&4294967295,x=R+(P<<21&4294967295|P>>>11),P=b+(R^(x|~C))+I[12]+1700485571&4294967295,b=x+(P<<6&4294967295|P>>>26),P=C+(x^(b|~R))+I[3]+2399980690&4294967295,C=b+(P<<10&4294967295|P>>>22),P=R+(b^(C|~x))+I[10]+4293915773&4294967295,R=C+(P<<15&4294967295|P>>>17),P=x+(C^(R|~b))+I[1]+2240044497&4294967295,x=R+(P<<21&4294967295|P>>>11),P=b+(R^(x|~C))+I[8]+1873313359&4294967295,b=x+(P<<6&4294967295|P>>>26),P=C+(x^(b|~R))+I[15]+4264355552&4294967295,C=b+(P<<10&4294967295|P>>>22),P=R+(b^(C|~x))+I[6]+2734768916&4294967295,R=C+(P<<15&4294967295|P>>>17),P=x+(C^(R|~b))+I[13]+1309151649&4294967295,x=R+(P<<21&4294967295|P>>>11),P=b+(R^(x|~C))+I[4]+4149444226&4294967295,b=x+(P<<6&4294967295|P>>>26),P=C+(x^(b|~R))+I[11]+3174756917&4294967295,C=b+(P<<10&4294967295|P>>>22),P=R+(b^(C|~x))+I[2]+718787259&4294967295,R=C+(P<<15&4294967295|P>>>17),P=x+(C^(R|~b))+I[9]+3951481745&4294967295,S.g[0]=S.g[0]+b&4294967295,S.g[1]=S.g[1]+(R+(P<<21&4294967295|P>>>11))&4294967295,S.g[2]=S.g[2]+R&4294967295,S.g[3]=S.g[3]+C&4294967295}r.prototype.u=function(S,b){b===void 0&&(b=S.length);for(var x=b-this.blockSize,I=this.B,R=this.h,C=0;C<b;){if(R==0)for(;C<=x;)i(this,S,C),C+=this.blockSize;if(typeof S=="string"){for(;C<b;)if(I[R++]=S.charCodeAt(C++),R==this.blockSize){i(this,I),R=0;break}}else for(;C<b;)if(I[R++]=S[C++],R==this.blockSize){i(this,I),R=0;break}}this.h=R,this.o+=b},r.prototype.v=function(){var S=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);S[0]=128;for(var b=1;b<S.length-8;++b)S[b]=0;var x=8*this.o;for(b=S.length-8;b<S.length;++b)S[b]=x&255,x/=256;for(this.u(S),S=Array(16),b=x=0;4>b;++b)for(var I=0;32>I;I+=8)S[x++]=this.g[b]>>>I&255;return S};function s(S,b){var x=l;return Object.prototype.hasOwnProperty.call(x,S)?x[S]:x[S]=b(S)}function o(S,b){this.h=b;for(var x=[],I=!0,R=S.length-1;0<=R;R--){var C=S[R]|0;I&&C==b||(x[R]=C,I=!1)}this.g=x}var l={};function u(S){return-128<=S&&128>S?s(S,function(b){return new o([b|0],0>b?-1:0)}):new o([S|0],0>S?-1:0)}function d(S){if(isNaN(S)||!isFinite(S))return f;if(0>S)return E(d(-S));for(var b=[],x=1,I=0;S>=x;I++)b[I]=S/x|0,x*=4294967296;return new o(b,0)}function p(S,b){if(S.length==0)throw Error("number format error: empty string");if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(S.charAt(0)=="-")return E(p(S.substring(1),b));if(0<=S.indexOf("-"))throw Error('number format error: interior "-" character');for(var x=d(Math.pow(b,8)),I=f,R=0;R<S.length;R+=8){var C=Math.min(8,S.length-R),P=parseInt(S.substring(R,R+C),b);8>C?(C=d(Math.pow(b,C)),I=I.j(C).add(d(P))):(I=I.j(x),I=I.add(d(P)))}return I}var f=u(0),g=u(1),k=u(16777216);t=o.prototype,t.m=function(){if(w(this))return-E(this).m();for(var S=0,b=1,x=0;x<this.g.length;x++){var I=this.i(x);S+=(0<=I?I:4294967296+I)*b,b*=4294967296}return S},t.toString=function(S){if(S=S||10,2>S||36<S)throw Error("radix out of range: "+S);if(A(this))return"0";if(w(this))return"-"+E(this).toString(S);for(var b=d(Math.pow(S,6)),x=this,I="";;){var R=N(x,b).g;x=y(x,R.j(b));var C=((0<x.g.length?x.g[0]:x.h)>>>0).toString(S);if(x=R,A(x))return C+I;for(;6>C.length;)C="0"+C;I=C+I}},t.i=function(S){return 0>S?0:S<this.g.length?this.g[S]:this.h};function A(S){if(S.h!=0)return!1;for(var b=0;b<S.g.length;b++)if(S.g[b]!=0)return!1;return!0}function w(S){return S.h==-1}t.l=function(S){return S=y(this,S),w(S)?-1:A(S)?0:1};function E(S){for(var b=S.g.length,x=[],I=0;I<b;I++)x[I]=~S.g[I];return new o(x,~S.h).add(g)}t.abs=function(){return w(this)?E(this):this},t.add=function(S){for(var b=Math.max(this.g.length,S.g.length),x=[],I=0,R=0;R<=b;R++){var C=I+(this.i(R)&65535)+(S.i(R)&65535),P=(C>>>16)+(this.i(R)>>>16)+(S.i(R)>>>16);I=P>>>16,C&=65535,P&=65535,x[R]=P<<16|C}return new o(x,x[x.length-1]&-2147483648?-1:0)};function y(S,b){return S.add(E(b))}t.j=function(S){if(A(this)||A(S))return f;if(w(this))return w(S)?E(this).j(E(S)):E(E(this).j(S));if(w(S))return E(this.j(E(S)));if(0>this.l(k)&&0>S.l(k))return d(this.m()*S.m());for(var b=this.g.length+S.g.length,x=[],I=0;I<2*b;I++)x[I]=0;for(I=0;I<this.g.length;I++)for(var R=0;R<S.g.length;R++){var C=this.i(I)>>>16,P=this.i(I)&65535,M=S.i(R)>>>16,W=S.i(R)&65535;x[2*I+2*R]+=P*W,_(x,2*I+2*R),x[2*I+2*R+1]+=C*W,_(x,2*I+2*R+1),x[2*I+2*R+1]+=P*M,_(x,2*I+2*R+1),x[2*I+2*R+2]+=C*M,_(x,2*I+2*R+2)}for(I=0;I<b;I++)x[I]=x[2*I+1]<<16|x[2*I];for(I=b;I<2*b;I++)x[I]=0;return new o(x,0)};function _(S,b){for(;(S[b]&65535)!=S[b];)S[b+1]+=S[b]>>>16,S[b]&=65535,b++}function v(S,b){this.g=S,this.h=b}function N(S,b){if(A(b))throw Error("division by zero");if(A(S))return new v(f,f);if(w(S))return b=N(E(S),b),new v(E(b.g),E(b.h));if(w(b))return b=N(S,E(b)),new v(E(b.g),b.h);if(30<S.g.length){if(w(S)||w(b))throw Error("slowDivide_ only works with positive integers.");for(var x=g,I=b;0>=I.l(S);)x=O(x),I=O(I);var R=L(x,1),C=L(I,1);for(I=L(I,2),x=L(x,2);!A(I);){var P=C.add(I);0>=P.l(S)&&(R=R.add(x),C=P),I=L(I,1),x=L(x,1)}return b=y(S,R.j(b)),new v(R,b)}for(R=f;0<=S.l(b);){for(x=Math.max(1,Math.floor(S.m()/b.m())),I=Math.ceil(Math.log(x)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),C=d(x),P=C.j(b);w(P)||0<P.l(S);)x-=I,C=d(x),P=C.j(b);A(C)&&(C=g),R=R.add(C),S=y(S,P)}return new v(R,S)}t.A=function(S){return N(this,S).h},t.and=function(S){for(var b=Math.max(this.g.length,S.g.length),x=[],I=0;I<b;I++)x[I]=this.i(I)&S.i(I);return new o(x,this.h&S.h)},t.or=function(S){for(var b=Math.max(this.g.length,S.g.length),x=[],I=0;I<b;I++)x[I]=this.i(I)|S.i(I);return new o(x,this.h|S.h)},t.xor=function(S){for(var b=Math.max(this.g.length,S.g.length),x=[],I=0;I<b;I++)x[I]=this.i(I)^S.i(I);return new o(x,this.h^S.h)};function O(S){for(var b=S.g.length+1,x=[],I=0;I<b;I++)x[I]=S.i(I)<<1|S.i(I-1)>>>31;return new o(x,S.h)}function L(S,b){var x=b>>5;b%=32;for(var I=S.g.length-x,R=[],C=0;C<I;C++)R[C]=0<b?S.i(C+x)>>>b|S.i(C+x+1)<<32-b:S.i(C+x);return new o(R,S.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,b1=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=p,vi=o}).apply(typeof Hv<"u"?Hv:typeof self<"u"?self:typeof window<"u"?window:{});var Wl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var T1,$o,E1,mc,jp,I1,S1,k1;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(c,h,m){return c==Array.prototype||c==Object.prototype||(c[h]=m.value),c};function n(c){c=[typeof globalThis=="object"&&globalThis,c,typeof window=="object"&&window,typeof self=="object"&&self,typeof Wl=="object"&&Wl];for(var h=0;h<c.length;++h){var m=c[h];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=n(this);function i(c,h){if(h)e:{var m=r;c=c.split(".");for(var T=0;T<c.length-1;T++){var j=c[T];if(!(j in m))break e;m=m[j]}c=c[c.length-1],T=m[c],h=h(T),h!=T&&h!=null&&e(m,c,{configurable:!0,writable:!0,value:h})}}function s(c,h){c instanceof String&&(c+="");var m=0,T=!1,j={next:function(){if(!T&&m<c.length){var z=m++;return{value:h(z,c[z]),done:!1}}return T=!0,{done:!0,value:void 0}}};return j[Symbol.iterator]=function(){return j},j}i("Array.prototype.values",function(c){return c||function(){return s(this,function(h,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(c){var h=typeof c;return h=h!="object"?h:c?Array.isArray(c)?"array":h:"null",h=="array"||h=="object"&&typeof c.length=="number"}function d(c){var h=typeof c;return h=="object"&&c!=null||h=="function"}function p(c,h,m){return c.call.apply(c.bind,arguments)}function f(c,h,m){if(!c)throw Error();if(2<arguments.length){var T=Array.prototype.slice.call(arguments,2);return function(){var j=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(j,T),c.apply(h,j)}}return function(){return c.apply(h,arguments)}}function g(c,h,m){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:f,g.apply(null,arguments)}function k(c,h){var m=Array.prototype.slice.call(arguments,1);return function(){var T=m.slice();return T.push.apply(T,arguments),c.apply(this,T)}}function A(c,h){function m(){}m.prototype=h.prototype,c.aa=h.prototype,c.prototype=new m,c.prototype.constructor=c,c.Qb=function(T,j,z){for(var $=Array(arguments.length-2),xe=2;xe<arguments.length;xe++)$[xe-2]=arguments[xe];return h.prototype[j].apply(T,$)}}function w(c){const h=c.length;if(0<h){const m=Array(h);for(let T=0;T<h;T++)m[T]=c[T];return m}return[]}function E(c,h){for(let m=1;m<arguments.length;m++){const T=arguments[m];if(u(T)){const j=c.length||0,z=T.length||0;c.length=j+z;for(let $=0;$<z;$++)c[j+$]=T[$]}else c.push(T)}}class y{constructor(h,m){this.i=h,this.j=m,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function _(c){return/^[\s\xa0]*$/.test(c)}function v(){var c=l.navigator;return c&&(c=c.userAgent)?c:""}function N(c){return N[" "](c),c}N[" "]=function(){};var O=v().indexOf("Gecko")!=-1&&!(v().toLowerCase().indexOf("webkit")!=-1&&v().indexOf("Edge")==-1)&&!(v().indexOf("Trident")!=-1||v().indexOf("MSIE")!=-1)&&v().indexOf("Edge")==-1;function L(c,h,m){for(const T in c)h.call(m,c[T],T,c)}function S(c,h){for(const m in c)h.call(void 0,c[m],m,c)}function b(c){const h={};for(const m in c)h[m]=c[m];return h}const x="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(c,h){let m,T;for(let j=1;j<arguments.length;j++){T=arguments[j];for(m in T)c[m]=T[m];for(let z=0;z<x.length;z++)m=x[z],Object.prototype.hasOwnProperty.call(T,m)&&(c[m]=T[m])}}function R(c){var h=1;c=c.split(":");const m=[];for(;0<h&&c.length;)m.push(c.shift()),h--;return c.length&&m.push(c.join(":")),m}function C(c){l.setTimeout(()=>{throw c},0)}function P(){var c=X;let h=null;return c.g&&(h=c.g,c.g=c.g.next,c.g||(c.h=null),h.next=null),h}class M{constructor(){this.h=this.g=null}add(h,m){const T=W.get();T.set(h,m),this.h?this.h.next=T:this.g=T,this.h=T}}var W=new y(()=>new ee,c=>c.reset());class ee{constructor(){this.next=this.g=this.h=null}set(h,m){this.h=h,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let qe,q=!1,X=new M,ne=()=>{const c=l.Promise.resolve(void 0);qe=()=>{c.then(be)}};var be=()=>{for(var c;c=P();){try{c.h.call(c.g)}catch(m){C(m)}var h=W;h.j(c),100>h.h&&(h.h++,c.next=h.g,h.g=c)}q=!1};function pe(){this.s=this.s,this.C=this.C}pe.prototype.s=!1,pe.prototype.ma=function(){this.s||(this.s=!0,this.N())},pe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Fe(c,h){this.type=c,this.g=this.target=h,this.defaultPrevented=!1}Fe.prototype.h=function(){this.defaultPrevented=!0};var kn=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var c=!1,h=Object.defineProperty({},"passive",{get:function(){c=!0}});try{const m=()=>{};l.addEventListener("test",m,h),l.removeEventListener("test",m,h)}catch{}return c}();function Nn(c,h){if(Fe.call(this,c?c.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,c){var m=this.type=c.type,T=c.changedTouches&&c.changedTouches.length?c.changedTouches[0]:null;if(this.target=c.target||c.srcElement,this.g=h,h=c.relatedTarget){if(O){e:{try{N(h.nodeName);var j=!0;break e}catch{}j=!1}j||(h=null)}}else m=="mouseover"?h=c.fromElement:m=="mouseout"&&(h=c.toElement);this.relatedTarget=h,T?(this.clientX=T.clientX!==void 0?T.clientX:T.pageX,this.clientY=T.clientY!==void 0?T.clientY:T.pageY,this.screenX=T.screenX||0,this.screenY=T.screenY||0):(this.clientX=c.clientX!==void 0?c.clientX:c.pageX,this.clientY=c.clientY!==void 0?c.clientY:c.pageY,this.screenX=c.screenX||0,this.screenY=c.screenY||0),this.button=c.button,this.key=c.key||"",this.ctrlKey=c.ctrlKey,this.altKey=c.altKey,this.shiftKey=c.shiftKey,this.metaKey=c.metaKey,this.pointerId=c.pointerId||0,this.pointerType=typeof c.pointerType=="string"?c.pointerType:Pn[c.pointerType]||"",this.state=c.state,this.i=c,c.defaultPrevented&&Nn.aa.h.call(this)}}A(Nn,Fe);var Pn={2:"touch",3:"pen",4:"mouse"};Nn.prototype.h=function(){Nn.aa.h.call(this);var c=this.i;c.preventDefault?c.preventDefault():c.returnValue=!1};var An="closure_listenable_"+(1e6*Math.random()|0),VE=0;function OE(c,h,m,T,j){this.listener=c,this.proxy=null,this.src=h,this.type=m,this.capture=!!T,this.ha=j,this.key=++VE,this.da=this.fa=!1}function hl(c){c.da=!0,c.listener=null,c.proxy=null,c.src=null,c.ha=null}function pl(c){this.src=c,this.g={},this.h=0}pl.prototype.add=function(c,h,m,T,j){var z=c.toString();c=this.g[z],c||(c=this.g[z]=[],this.h++);var $=fd(c,h,T,j);return-1<$?(h=c[$],m||(h.fa=!1)):(h=new OE(h,this.src,z,!!T,j),h.fa=m,c.push(h)),h};function pd(c,h){var m=h.type;if(m in c.g){var T=c.g[m],j=Array.prototype.indexOf.call(T,h,void 0),z;(z=0<=j)&&Array.prototype.splice.call(T,j,1),z&&(hl(h),c.g[m].length==0&&(delete c.g[m],c.h--))}}function fd(c,h,m,T){for(var j=0;j<c.length;++j){var z=c[j];if(!z.da&&z.listener==h&&z.capture==!!m&&z.ha==T)return j}return-1}var md="closure_lm_"+(1e6*Math.random()|0),gd={};function mg(c,h,m,T,j){if(Array.isArray(h)){for(var z=0;z<h.length;z++)mg(c,h[z],m,T,j);return null}return m=vg(m),c&&c[An]?c.K(h,m,d(T)?!!T.capture:!1,j):ME(c,h,m,!1,T,j)}function ME(c,h,m,T,j,z){if(!h)throw Error("Invalid event type");var $=d(j)?!!j.capture:!!j,xe=vd(c);if(xe||(c[md]=xe=new pl(c)),m=xe.add(h,m,T,$,z),m.proxy)return m;if(T=LE(),m.proxy=T,T.src=c,T.listener=m,c.addEventListener)kn||(j=$),j===void 0&&(j=!1),c.addEventListener(h.toString(),T,j);else if(c.attachEvent)c.attachEvent(yg(h.toString()),T);else if(c.addListener&&c.removeListener)c.addListener(T);else throw Error("addEventListener and attachEvent are unavailable.");return m}function LE(){function c(m){return h.call(c.src,c.listener,m)}const h=zE;return c}function gg(c,h,m,T,j){if(Array.isArray(h))for(var z=0;z<h.length;z++)gg(c,h[z],m,T,j);else T=d(T)?!!T.capture:!!T,m=vg(m),c&&c[An]?(c=c.i,h=String(h).toString(),h in c.g&&(z=c.g[h],m=fd(z,m,T,j),-1<m&&(hl(z[m]),Array.prototype.splice.call(z,m,1),z.length==0&&(delete c.g[h],c.h--)))):c&&(c=vd(c))&&(h=c.g[h.toString()],c=-1,h&&(c=fd(h,m,T,j)),(m=-1<c?h[c]:null)&&yd(m))}function yd(c){if(typeof c!="number"&&c&&!c.da){var h=c.src;if(h&&h[An])pd(h.i,c);else{var m=c.type,T=c.proxy;h.removeEventListener?h.removeEventListener(m,T,c.capture):h.detachEvent?h.detachEvent(yg(m),T):h.addListener&&h.removeListener&&h.removeListener(T),(m=vd(h))?(pd(m,c),m.h==0&&(m.src=null,h[md]=null)):hl(c)}}}function yg(c){return c in gd?gd[c]:gd[c]="on"+c}function zE(c,h){if(c.da)c=!0;else{h=new Nn(h,this);var m=c.listener,T=c.ha||c.src;c.fa&&yd(c),c=m.call(T,h)}return c}function vd(c){return c=c[md],c instanceof pl?c:null}var xd="__closure_events_fn_"+(1e9*Math.random()>>>0);function vg(c){return typeof c=="function"?c:(c[xd]||(c[xd]=function(h){return c.handleEvent(h)}),c[xd])}function st(){pe.call(this),this.i=new pl(this),this.M=this,this.F=null}A(st,pe),st.prototype[An]=!0,st.prototype.removeEventListener=function(c,h,m,T){gg(this,c,h,m,T)};function gt(c,h){var m,T=c.F;if(T)for(m=[];T;T=T.F)m.push(T);if(c=c.M,T=h.type||h,typeof h=="string")h=new Fe(h,c);else if(h instanceof Fe)h.target=h.target||c;else{var j=h;h=new Fe(T,c),I(h,j)}if(j=!0,m)for(var z=m.length-1;0<=z;z--){var $=h.g=m[z];j=fl($,T,!0,h)&&j}if($=h.g=c,j=fl($,T,!0,h)&&j,j=fl($,T,!1,h)&&j,m)for(z=0;z<m.length;z++)$=h.g=m[z],j=fl($,T,!1,h)&&j}st.prototype.N=function(){if(st.aa.N.call(this),this.i){var c=this.i,h;for(h in c.g){for(var m=c.g[h],T=0;T<m.length;T++)hl(m[T]);delete c.g[h],c.h--}}this.F=null},st.prototype.K=function(c,h,m,T){return this.i.add(String(c),h,!1,m,T)},st.prototype.L=function(c,h,m,T){return this.i.add(String(c),h,!0,m,T)};function fl(c,h,m,T){if(h=c.i.g[String(h)],!h)return!0;h=h.concat();for(var j=!0,z=0;z<h.length;++z){var $=h[z];if($&&!$.da&&$.capture==m){var xe=$.listener,et=$.ha||$.src;$.fa&&pd(c.i,$),j=xe.call(et,T)!==!1&&j}}return j&&!T.defaultPrevented}function xg(c,h,m){if(typeof c=="function")m&&(c=g(c,m));else if(c&&typeof c.handleEvent=="function")c=g(c.handleEvent,c);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:l.setTimeout(c,h||0)}function _g(c){c.g=xg(()=>{c.g=null,c.i&&(c.i=!1,_g(c))},c.l);const h=c.h;c.h=null,c.m.apply(null,h)}class FE extends pe{constructor(h,m){super(),this.m=h,this.l=m,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:_g(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function co(c){pe.call(this),this.h=c,this.g={}}A(co,pe);var wg=[];function bg(c){L(c.g,function(h,m){this.g.hasOwnProperty(m)&&yd(h)},c),c.g={}}co.prototype.N=function(){co.aa.N.call(this),bg(this)},co.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var _d=l.JSON.stringify,UE=l.JSON.parse,BE=class{stringify(c){return l.JSON.stringify(c,void 0)}parse(c){return l.JSON.parse(c,void 0)}};function wd(){}wd.prototype.h=null;function Tg(c){return c.h||(c.h=c.i())}function Eg(){}var uo={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function bd(){Fe.call(this,"d")}A(bd,Fe);function Td(){Fe.call(this,"c")}A(Td,Fe);var Zr={},Ig=null;function ml(){return Ig=Ig||new st}Zr.La="serverreachability";function Sg(c){Fe.call(this,Zr.La,c)}A(Sg,Fe);function ho(c){const h=ml();gt(h,new Sg(h))}Zr.STAT_EVENT="statevent";function kg(c,h){Fe.call(this,Zr.STAT_EVENT,c),this.stat=h}A(kg,Fe);function yt(c){const h=ml();gt(h,new kg(h,c))}Zr.Ma="timingevent";function Ng(c,h){Fe.call(this,Zr.Ma,c),this.size=h}A(Ng,Fe);function po(c,h){if(typeof c!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){c()},h)}function fo(){this.g=!0}fo.prototype.xa=function(){this.g=!1};function $E(c,h,m,T,j,z){c.info(function(){if(c.g)if(z)for(var $="",xe=z.split("&"),et=0;et<xe.length;et++){var he=xe[et].split("=");if(1<he.length){var ot=he[0];he=he[1];var at=ot.split("_");$=2<=at.length&&at[1]=="type"?$+(ot+"="+he+"&"):$+(ot+"=redacted&")}}else $=null;else $=z;return"XMLHTTP REQ ("+T+") [attempt "+j+"]: "+h+`
`+m+`
`+$})}function qE(c,h,m,T,j,z,$){c.info(function(){return"XMLHTTP RESP ("+T+") [ attempt "+j+"]: "+h+`
`+m+`
`+z+" "+$})}function Ki(c,h,m,T){c.info(function(){return"XMLHTTP TEXT ("+h+"): "+KE(c,m)+(T?" "+T:"")})}function HE(c,h){c.info(function(){return"TIMEOUT: "+h})}fo.prototype.info=function(){};function KE(c,h){if(!c.g)return h;if(!h)return null;try{var m=JSON.parse(h);if(m){for(c=0;c<m.length;c++)if(Array.isArray(m[c])){var T=m[c];if(!(2>T.length)){var j=T[1];if(Array.isArray(j)&&!(1>j.length)){var z=j[0];if(z!="noop"&&z!="stop"&&z!="close")for(var $=1;$<j.length;$++)j[$]=""}}}}return _d(m)}catch{return h}}var gl={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Pg={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ed;function yl(){}A(yl,wd),yl.prototype.g=function(){return new XMLHttpRequest},yl.prototype.i=function(){return{}},Ed=new yl;function rr(c,h,m,T){this.j=c,this.i=h,this.l=m,this.R=T||1,this.U=new co(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ag}function Ag(){this.i=null,this.g="",this.h=!1}var Rg={},Id={};function Sd(c,h,m){c.L=1,c.v=wl(Rn(h)),c.m=m,c.P=!0,Cg(c,null)}function Cg(c,h){c.F=Date.now(),vl(c),c.A=Rn(c.v);var m=c.A,T=c.R;Array.isArray(T)||(T=[String(T)]),Kg(m.i,"t",T),c.C=0,m=c.j.J,c.h=new Ag,c.g=uy(c.j,m?h:null,!c.m),0<c.O&&(c.M=new FE(g(c.Y,c,c.g),c.O)),h=c.U,m=c.g,T=c.ca;var j="readystatechange";Array.isArray(j)||(j&&(wg[0]=j.toString()),j=wg);for(var z=0;z<j.length;z++){var $=mg(m,j[z],T||h.handleEvent,!1,h.h||h);if(!$)break;h.g[$.key]=$}h=c.H?b(c.H):{},c.m?(c.u||(c.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",c.g.ea(c.A,c.u,c.m,h)):(c.u="GET",c.g.ea(c.A,c.u,null,h)),ho(),$E(c.i,c.u,c.A,c.l,c.R,c.m)}rr.prototype.ca=function(c){c=c.target;const h=this.M;h&&Cn(c)==3?h.j():this.Y(c)},rr.prototype.Y=function(c){try{if(c==this.g)e:{const at=Cn(this.g);var h=this.g.Ba();const Qi=this.g.Z();if(!(3>at)&&(at!=3||this.g&&(this.h.h||this.g.oa()||Zg(this.g)))){this.J||at!=4||h==7||(h==8||0>=Qi?ho(3):ho(2)),kd(this);var m=this.g.Z();this.X=m;t:if(jg(this)){var T=Zg(this.g);c="";var j=T.length,z=Cn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ei(this),mo(this);var $="";break t}this.h.i=new l.TextDecoder}for(h=0;h<j;h++)this.h.h=!0,c+=this.h.i.decode(T[h],{stream:!(z&&h==j-1)});T.length=0,this.h.g+=c,this.C=0,$=this.h.g}else $=this.g.oa();if(this.o=m==200,qE(this.i,this.u,this.A,this.l,this.R,at,m),this.o){if(this.T&&!this.K){t:{if(this.g){var xe,et=this.g;if((xe=et.g?et.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(xe)){var he=xe;break t}}he=null}if(m=he)Ki(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Nd(this,m);else{this.o=!1,this.s=3,yt(12),ei(this),mo(this);break e}}if(this.P){m=!0;let Xt;for(;!this.J&&this.C<$.length;)if(Xt=WE(this,$),Xt==Id){at==4&&(this.s=4,yt(14),m=!1),Ki(this.i,this.l,null,"[Incomplete Response]");break}else if(Xt==Rg){this.s=4,yt(15),Ki(this.i,this.l,$,"[Invalid Chunk]"),m=!1;break}else Ki(this.i,this.l,Xt,null),Nd(this,Xt);if(jg(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),at!=4||$.length!=0||this.h.h||(this.s=1,yt(16),m=!1),this.o=this.o&&m,!m)Ki(this.i,this.l,$,"[Invalid Chunked Response]"),ei(this),mo(this);else if(0<$.length&&!this.W){this.W=!0;var ot=this.j;ot.g==this&&ot.ba&&!ot.M&&(ot.j.info("Great, no buffering proxy detected. Bytes received: "+$.length),Dd(ot),ot.M=!0,yt(11))}}else Ki(this.i,this.l,$,null),Nd(this,$);at==4&&ei(this),this.o&&!this.J&&(at==4?oy(this.j,this):(this.o=!1,vl(this)))}else uI(this.g),m==400&&0<$.indexOf("Unknown SID")?(this.s=3,yt(12)):(this.s=0,yt(13)),ei(this),mo(this)}}}catch{}finally{}};function jg(c){return c.g?c.u=="GET"&&c.L!=2&&c.j.Ca:!1}function WE(c,h){var m=c.C,T=h.indexOf(`
`,m);return T==-1?Id:(m=Number(h.substring(m,T)),isNaN(m)?Rg:(T+=1,T+m>h.length?Id:(h=h.slice(T,T+m),c.C=T+m,h)))}rr.prototype.cancel=function(){this.J=!0,ei(this)};function vl(c){c.S=Date.now()+c.I,Dg(c,c.I)}function Dg(c,h){if(c.B!=null)throw Error("WatchDog timer not null");c.B=po(g(c.ba,c),h)}function kd(c){c.B&&(l.clearTimeout(c.B),c.B=null)}rr.prototype.ba=function(){this.B=null;const c=Date.now();0<=c-this.S?(HE(this.i,this.A),this.L!=2&&(ho(),yt(17)),ei(this),this.s=2,mo(this)):Dg(this,this.S-c)};function mo(c){c.j.G==0||c.J||oy(c.j,c)}function ei(c){kd(c);var h=c.M;h&&typeof h.ma=="function"&&h.ma(),c.M=null,bg(c.U),c.g&&(h=c.g,c.g=null,h.abort(),h.ma())}function Nd(c,h){try{var m=c.j;if(m.G!=0&&(m.g==c||Pd(m.h,c))){if(!c.K&&Pd(m.h,c)&&m.G==3){try{var T=m.Da.g.parse(h)}catch{T=null}if(Array.isArray(T)&&T.length==3){var j=T;if(j[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<c.F)kl(m),Il(m);else break e;jd(m),yt(18)}}else m.za=j[1],0<m.za-m.T&&37500>j[2]&&m.F&&m.v==0&&!m.C&&(m.C=po(g(m.Za,m),6e3));if(1>=Mg(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else ni(m,11)}else if((c.K||m.g==c)&&kl(m),!_(h))for(j=m.Da.g.parse(h),h=0;h<j.length;h++){let he=j[h];if(m.T=he[0],he=he[1],m.G==2)if(he[0]=="c"){m.K=he[1],m.ia=he[2];const ot=he[3];ot!=null&&(m.la=ot,m.j.info("VER="+m.la));const at=he[4];at!=null&&(m.Aa=at,m.j.info("SVER="+m.Aa));const Qi=he[5];Qi!=null&&typeof Qi=="number"&&0<Qi&&(T=1.5*Qi,m.L=T,m.j.info("backChannelRequestTimeoutMs_="+T)),T=m;const Xt=c.g;if(Xt){const Pl=Xt.g?Xt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Pl){var z=T.h;z.g||Pl.indexOf("spdy")==-1&&Pl.indexOf("quic")==-1&&Pl.indexOf("h2")==-1||(z.j=z.l,z.g=new Set,z.h&&(Ad(z,z.h),z.h=null))}if(T.D){const Vd=Xt.g?Xt.g.getResponseHeader("X-HTTP-Session-Id"):null;Vd&&(T.ya=Vd,Te(T.I,T.D,Vd))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-c.F,m.j.info("Handshake RTT: "+m.R+"ms")),T=m;var $=c;if(T.qa=cy(T,T.J?T.ia:null,T.W),$.K){Lg(T.h,$);var xe=$,et=T.L;et&&(xe.I=et),xe.B&&(kd(xe),vl(xe)),T.g=$}else iy(T);0<m.i.length&&Sl(m)}else he[0]!="stop"&&he[0]!="close"||ni(m,7);else m.G==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?ni(m,7):Cd(m):he[0]!="noop"&&m.l&&m.l.ta(he),m.v=0)}}ho(4)}catch{}}var GE=class{constructor(c,h){this.g=c,this.map=h}};function Vg(c){this.l=c||10,l.PerformanceNavigationTiming?(c=l.performance.getEntriesByType("navigation"),c=0<c.length&&(c[0].nextHopProtocol=="hq"||c[0].nextHopProtocol=="h2")):c=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=c?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Og(c){return c.h?!0:c.g?c.g.size>=c.j:!1}function Mg(c){return c.h?1:c.g?c.g.size:0}function Pd(c,h){return c.h?c.h==h:c.g?c.g.has(h):!1}function Ad(c,h){c.g?c.g.add(h):c.h=h}function Lg(c,h){c.h&&c.h==h?c.h=null:c.g&&c.g.has(h)&&c.g.delete(h)}Vg.prototype.cancel=function(){if(this.i=zg(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const c of this.g.values())c.cancel();this.g.clear()}};function zg(c){if(c.h!=null)return c.i.concat(c.h.D);if(c.g!=null&&c.g.size!==0){let h=c.i;for(const m of c.g.values())h=h.concat(m.D);return h}return w(c.i)}function QE(c){if(c.V&&typeof c.V=="function")return c.V();if(typeof Map<"u"&&c instanceof Map||typeof Set<"u"&&c instanceof Set)return Array.from(c.values());if(typeof c=="string")return c.split("");if(u(c)){for(var h=[],m=c.length,T=0;T<m;T++)h.push(c[T]);return h}h=[],m=0;for(T in c)h[m++]=c[T];return h}function YE(c){if(c.na&&typeof c.na=="function")return c.na();if(!c.V||typeof c.V!="function"){if(typeof Map<"u"&&c instanceof Map)return Array.from(c.keys());if(!(typeof Set<"u"&&c instanceof Set)){if(u(c)||typeof c=="string"){var h=[];c=c.length;for(var m=0;m<c;m++)h.push(m);return h}h=[],m=0;for(const T in c)h[m++]=T;return h}}}function Fg(c,h){if(c.forEach&&typeof c.forEach=="function")c.forEach(h,void 0);else if(u(c)||typeof c=="string")Array.prototype.forEach.call(c,h,void 0);else for(var m=YE(c),T=QE(c),j=T.length,z=0;z<j;z++)h.call(void 0,T[z],m&&m[z],c)}var Ug=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function JE(c,h){if(c){c=c.split("&");for(var m=0;m<c.length;m++){var T=c[m].indexOf("="),j=null;if(0<=T){var z=c[m].substring(0,T);j=c[m].substring(T+1)}else z=c[m];h(z,j?decodeURIComponent(j.replace(/\+/g," ")):"")}}}function ti(c){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,c instanceof ti){this.h=c.h,xl(this,c.j),this.o=c.o,this.g=c.g,_l(this,c.s),this.l=c.l;var h=c.i,m=new vo;m.i=h.i,h.g&&(m.g=new Map(h.g),m.h=h.h),Bg(this,m),this.m=c.m}else c&&(h=String(c).match(Ug))?(this.h=!1,xl(this,h[1]||"",!0),this.o=go(h[2]||""),this.g=go(h[3]||"",!0),_l(this,h[4]),this.l=go(h[5]||"",!0),Bg(this,h[6]||"",!0),this.m=go(h[7]||"")):(this.h=!1,this.i=new vo(null,this.h))}ti.prototype.toString=function(){var c=[],h=this.j;h&&c.push(yo(h,$g,!0),":");var m=this.g;return(m||h=="file")&&(c.push("//"),(h=this.o)&&c.push(yo(h,$g,!0),"@"),c.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&c.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&c.push("/"),c.push(yo(m,m.charAt(0)=="/"?eI:ZE,!0))),(m=this.i.toString())&&c.push("?",m),(m=this.m)&&c.push("#",yo(m,nI)),c.join("")};function Rn(c){return new ti(c)}function xl(c,h,m){c.j=m?go(h,!0):h,c.j&&(c.j=c.j.replace(/:$/,""))}function _l(c,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);c.s=h}else c.s=null}function Bg(c,h,m){h instanceof vo?(c.i=h,rI(c.i,c.h)):(m||(h=yo(h,tI)),c.i=new vo(h,c.h))}function Te(c,h,m){c.i.set(h,m)}function wl(c){return Te(c,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),c}function go(c,h){return c?h?decodeURI(c.replace(/%25/g,"%2525")):decodeURIComponent(c):""}function yo(c,h,m){return typeof c=="string"?(c=encodeURI(c).replace(h,XE),m&&(c=c.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c):null}function XE(c){return c=c.charCodeAt(0),"%"+(c>>4&15).toString(16)+(c&15).toString(16)}var $g=/[#\/\?@]/g,ZE=/[#\?:]/g,eI=/[#\?]/g,tI=/[#\?@]/g,nI=/#/g;function vo(c,h){this.h=this.g=null,this.i=c||null,this.j=!!h}function ir(c){c.g||(c.g=new Map,c.h=0,c.i&&JE(c.i,function(h,m){c.add(decodeURIComponent(h.replace(/\+/g," ")),m)}))}t=vo.prototype,t.add=function(c,h){ir(this),this.i=null,c=Wi(this,c);var m=this.g.get(c);return m||this.g.set(c,m=[]),m.push(h),this.h+=1,this};function qg(c,h){ir(c),h=Wi(c,h),c.g.has(h)&&(c.i=null,c.h-=c.g.get(h).length,c.g.delete(h))}function Hg(c,h){return ir(c),h=Wi(c,h),c.g.has(h)}t.forEach=function(c,h){ir(this),this.g.forEach(function(m,T){m.forEach(function(j){c.call(h,j,T,this)},this)},this)},t.na=function(){ir(this);const c=Array.from(this.g.values()),h=Array.from(this.g.keys()),m=[];for(let T=0;T<h.length;T++){const j=c[T];for(let z=0;z<j.length;z++)m.push(h[T])}return m},t.V=function(c){ir(this);let h=[];if(typeof c=="string")Hg(this,c)&&(h=h.concat(this.g.get(Wi(this,c))));else{c=Array.from(this.g.values());for(let m=0;m<c.length;m++)h=h.concat(c[m])}return h},t.set=function(c,h){return ir(this),this.i=null,c=Wi(this,c),Hg(this,c)&&(this.h-=this.g.get(c).length),this.g.set(c,[h]),this.h+=1,this},t.get=function(c,h){return c?(c=this.V(c),0<c.length?String(c[0]):h):h};function Kg(c,h,m){qg(c,h),0<m.length&&(c.i=null,c.g.set(Wi(c,h),w(m)),c.h+=m.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const c=[],h=Array.from(this.g.keys());for(var m=0;m<h.length;m++){var T=h[m];const z=encodeURIComponent(String(T)),$=this.V(T);for(T=0;T<$.length;T++){var j=z;$[T]!==""&&(j+="="+encodeURIComponent(String($[T]))),c.push(j)}}return this.i=c.join("&")};function Wi(c,h){return h=String(h),c.j&&(h=h.toLowerCase()),h}function rI(c,h){h&&!c.j&&(ir(c),c.i=null,c.g.forEach(function(m,T){var j=T.toLowerCase();T!=j&&(qg(this,T),Kg(this,j,m))},c)),c.j=h}function iI(c,h){const m=new fo;if(l.Image){const T=new Image;T.onload=k(sr,m,"TestLoadImage: loaded",!0,h,T),T.onerror=k(sr,m,"TestLoadImage: error",!1,h,T),T.onabort=k(sr,m,"TestLoadImage: abort",!1,h,T),T.ontimeout=k(sr,m,"TestLoadImage: timeout",!1,h,T),l.setTimeout(function(){T.ontimeout&&T.ontimeout()},1e4),T.src=c}else h(!1)}function sI(c,h){const m=new fo,T=new AbortController,j=setTimeout(()=>{T.abort(),sr(m,"TestPingServer: timeout",!1,h)},1e4);fetch(c,{signal:T.signal}).then(z=>{clearTimeout(j),z.ok?sr(m,"TestPingServer: ok",!0,h):sr(m,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(j),sr(m,"TestPingServer: error",!1,h)})}function sr(c,h,m,T,j){try{j&&(j.onload=null,j.onerror=null,j.onabort=null,j.ontimeout=null),T(m)}catch{}}function oI(){this.g=new BE}function aI(c,h,m){const T=m||"";try{Fg(c,function(j,z){let $=j;d(j)&&($=_d(j)),h.push(T+z+"="+encodeURIComponent($))})}catch(j){throw h.push(T+"type="+encodeURIComponent("_badmap")),j}}function bl(c){this.l=c.Ub||null,this.j=c.eb||!1}A(bl,wd),bl.prototype.g=function(){return new Tl(this.l,this.j)},bl.prototype.i=function(c){return function(){return c}}({});function Tl(c,h){st.call(this),this.D=c,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}A(Tl,st),t=Tl.prototype,t.open=function(c,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=c,this.A=h,this.readyState=1,_o(this)},t.send=function(c){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};c&&(h.body=c),(this.D||l).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,xo(this)),this.readyState=0},t.Sa=function(c){if(this.g&&(this.l=c,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=c.headers,this.readyState=2,_o(this)),this.g&&(this.readyState=3,_o(this),this.g)))if(this.responseType==="arraybuffer")c.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in c){if(this.j=c.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Wg(this)}else c.text().then(this.Ra.bind(this),this.ga.bind(this))};function Wg(c){c.j.read().then(c.Pa.bind(c)).catch(c.ga.bind(c))}t.Pa=function(c){if(this.g){if(this.o&&c.value)this.response.push(c.value);else if(!this.o){var h=c.value?c.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!c.done}))&&(this.response=this.responseText+=h)}c.done?xo(this):_o(this),this.readyState==3&&Wg(this)}},t.Ra=function(c){this.g&&(this.response=this.responseText=c,xo(this))},t.Qa=function(c){this.g&&(this.response=c,xo(this))},t.ga=function(){this.g&&xo(this)};function xo(c){c.readyState=4,c.l=null,c.j=null,c.v=null,_o(c)}t.setRequestHeader=function(c,h){this.u.append(c,h)},t.getResponseHeader=function(c){return this.h&&this.h.get(c.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const c=[],h=this.h.entries();for(var m=h.next();!m.done;)m=m.value,c.push(m[0]+": "+m[1]),m=h.next();return c.join(`\r
`)};function _o(c){c.onreadystatechange&&c.onreadystatechange.call(c)}Object.defineProperty(Tl.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(c){this.m=c?"include":"same-origin"}});function Gg(c){let h="";return L(c,function(m,T){h+=T,h+=":",h+=m,h+=`\r
`}),h}function Rd(c,h,m){e:{for(T in m){var T=!1;break e}T=!0}T||(m=Gg(m),typeof c=="string"?m!=null&&encodeURIComponent(String(m)):Te(c,h,m))}function De(c){st.call(this),this.headers=new Map,this.o=c||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}A(De,st);var lI=/^https?$/i,cI=["POST","PUT"];t=De.prototype,t.Ha=function(c){this.J=c},t.ea=function(c,h,m,T){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+c);h=h?h.toUpperCase():"GET",this.D=c,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ed.g(),this.v=this.o?Tg(this.o):Tg(Ed),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(c),!0),this.B=!1}catch(z){Qg(this,z);return}if(c=m||"",m=new Map(this.headers),T)if(Object.getPrototypeOf(T)===Object.prototype)for(var j in T)m.set(j,T[j]);else if(typeof T.keys=="function"&&typeof T.get=="function")for(const z of T.keys())m.set(z,T.get(z));else throw Error("Unknown input type for opt_headers: "+String(T));T=Array.from(m.keys()).find(z=>z.toLowerCase()=="content-type"),j=l.FormData&&c instanceof l.FormData,!(0<=Array.prototype.indexOf.call(cI,h,void 0))||T||j||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[z,$]of m)this.g.setRequestHeader(z,$);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Xg(this),this.u=!0,this.g.send(c),this.u=!1}catch(z){Qg(this,z)}};function Qg(c,h){c.h=!1,c.g&&(c.j=!0,c.g.abort(),c.j=!1),c.l=h,c.m=5,Yg(c),El(c)}function Yg(c){c.A||(c.A=!0,gt(c,"complete"),gt(c,"error"))}t.abort=function(c){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=c||7,gt(this,"complete"),gt(this,"abort"),El(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),El(this,!0)),De.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Jg(this):this.bb())},t.bb=function(){Jg(this)};function Jg(c){if(c.h&&typeof o<"u"&&(!c.v[1]||Cn(c)!=4||c.Z()!=2)){if(c.u&&Cn(c)==4)xg(c.Ea,0,c);else if(gt(c,"readystatechange"),Cn(c)==4){c.h=!1;try{const $=c.Z();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var m;if(!(m=h)){var T;if(T=$===0){var j=String(c.D).match(Ug)[1]||null;!j&&l.self&&l.self.location&&(j=l.self.location.protocol.slice(0,-1)),T=!lI.test(j?j.toLowerCase():"")}m=T}if(m)gt(c,"complete"),gt(c,"success");else{c.m=6;try{var z=2<Cn(c)?c.g.statusText:""}catch{z=""}c.l=z+" ["+c.Z()+"]",Yg(c)}}finally{El(c)}}}}function El(c,h){if(c.g){Xg(c);const m=c.g,T=c.v[0]?()=>{}:null;c.g=null,c.v=null,h||gt(c,"ready");try{m.onreadystatechange=T}catch{}}}function Xg(c){c.I&&(l.clearTimeout(c.I),c.I=null)}t.isActive=function(){return!!this.g};function Cn(c){return c.g?c.g.readyState:0}t.Z=function(){try{return 2<Cn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(c){if(this.g){var h=this.g.responseText;return c&&h.indexOf(c)==0&&(h=h.substring(c.length)),UE(h)}};function Zg(c){try{if(!c.g)return null;if("response"in c.g)return c.g.response;switch(c.H){case"":case"text":return c.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in c.g)return c.g.mozResponseArrayBuffer}return null}catch{return null}}function uI(c){const h={};c=(c.g&&2<=Cn(c)&&c.g.getAllResponseHeaders()||"").split(`\r
`);for(let T=0;T<c.length;T++){if(_(c[T]))continue;var m=R(c[T]);const j=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const z=h[j]||[];h[j]=z,z.push(m)}S(h,function(T){return T.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function wo(c,h,m){return m&&m.internalChannelParams&&m.internalChannelParams[c]||h}function ey(c){this.Aa=0,this.i=[],this.j=new fo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=wo("failFast",!1,c),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=wo("baseRetryDelayMs",5e3,c),this.cb=wo("retryDelaySeedMs",1e4,c),this.Wa=wo("forwardChannelMaxRetries",2,c),this.wa=wo("forwardChannelRequestTimeoutMs",2e4,c),this.pa=c&&c.xmlHttpFactory||void 0,this.Xa=c&&c.Tb||void 0,this.Ca=c&&c.useFetchStreams||!1,this.L=void 0,this.J=c&&c.supportsCrossDomainXhr||!1,this.K="",this.h=new Vg(c&&c.concurrentRequestLimit),this.Da=new oI,this.P=c&&c.fastHandshake||!1,this.O=c&&c.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=c&&c.Rb||!1,c&&c.xa&&this.j.xa(),c&&c.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&c&&c.detectBufferingProxy||!1,this.ja=void 0,c&&c.longPollingTimeout&&0<c.longPollingTimeout&&(this.ja=c.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=ey.prototype,t.la=8,t.G=1,t.connect=function(c,h,m,T){yt(0),this.W=c,this.H=h||{},m&&T!==void 0&&(this.H.OSID=m,this.H.OAID=T),this.F=this.X,this.I=cy(this,null,this.W),Sl(this)};function Cd(c){if(ty(c),c.G==3){var h=c.U++,m=Rn(c.I);if(Te(m,"SID",c.K),Te(m,"RID",h),Te(m,"TYPE","terminate"),bo(c,m),h=new rr(c,c.j,h),h.L=2,h.v=wl(Rn(m)),m=!1,l.navigator&&l.navigator.sendBeacon)try{m=l.navigator.sendBeacon(h.v.toString(),"")}catch{}!m&&l.Image&&(new Image().src=h.v,m=!0),m||(h.g=uy(h.j,null),h.g.ea(h.v)),h.F=Date.now(),vl(h)}ly(c)}function Il(c){c.g&&(Dd(c),c.g.cancel(),c.g=null)}function ty(c){Il(c),c.u&&(l.clearTimeout(c.u),c.u=null),kl(c),c.h.cancel(),c.s&&(typeof c.s=="number"&&l.clearTimeout(c.s),c.s=null)}function Sl(c){if(!Og(c.h)&&!c.s){c.s=!0;var h=c.Ga;qe||ne(),q||(qe(),q=!0),X.add(h,c),c.B=0}}function dI(c,h){return Mg(c.h)>=c.h.j-(c.s?1:0)?!1:c.s?(c.i=h.D.concat(c.i),!0):c.G==1||c.G==2||c.B>=(c.Va?0:c.Wa)?!1:(c.s=po(g(c.Ga,c,h),ay(c,c.B)),c.B++,!0)}t.Ga=function(c){if(this.s)if(this.s=null,this.G==1){if(!c){this.U=Math.floor(1e5*Math.random()),c=this.U++;const j=new rr(this,this.j,c);let z=this.o;if(this.S&&(z?(z=b(z),I(z,this.S)):z=this.S),this.m!==null||this.O||(j.H=z,z=null),this.P)e:{for(var h=0,m=0;m<this.i.length;m++){t:{var T=this.i[m];if("__data__"in T.map&&(T=T.map.__data__,typeof T=="string")){T=T.length;break t}T=void 0}if(T===void 0)break;if(h+=T,4096<h){h=m;break e}if(h===4096||m===this.i.length-1){h=m+1;break e}}h=1e3}else h=1e3;h=ry(this,j,h),m=Rn(this.I),Te(m,"RID",c),Te(m,"CVER",22),this.D&&Te(m,"X-HTTP-Session-Id",this.D),bo(this,m),z&&(this.O?h="headers="+encodeURIComponent(String(Gg(z)))+"&"+h:this.m&&Rd(m,this.m,z)),Ad(this.h,j),this.Ua&&Te(m,"TYPE","init"),this.P?(Te(m,"$req",h),Te(m,"SID","null"),j.T=!0,Sd(j,m,null)):Sd(j,m,h),this.G=2}}else this.G==3&&(c?ny(this,c):this.i.length==0||Og(this.h)||ny(this))};function ny(c,h){var m;h?m=h.l:m=c.U++;const T=Rn(c.I);Te(T,"SID",c.K),Te(T,"RID",m),Te(T,"AID",c.T),bo(c,T),c.m&&c.o&&Rd(T,c.m,c.o),m=new rr(c,c.j,m,c.B+1),c.m===null&&(m.H=c.o),h&&(c.i=h.D.concat(c.i)),h=ry(c,m,1e3),m.I=Math.round(.5*c.wa)+Math.round(.5*c.wa*Math.random()),Ad(c.h,m),Sd(m,T,h)}function bo(c,h){c.H&&L(c.H,function(m,T){Te(h,T,m)}),c.l&&Fg({},function(m,T){Te(h,T,m)})}function ry(c,h,m){m=Math.min(c.i.length,m);var T=c.l?g(c.l.Na,c.l,c):null;e:{var j=c.i;let z=-1;for(;;){const $=["count="+m];z==-1?0<m?(z=j[0].g,$.push("ofs="+z)):z=0:$.push("ofs="+z);let xe=!0;for(let et=0;et<m;et++){let he=j[et].g;const ot=j[et].map;if(he-=z,0>he)z=Math.max(0,j[et].g-100),xe=!1;else try{aI(ot,$,"req"+he+"_")}catch{T&&T(ot)}}if(xe){T=$.join("&");break e}}}return c=c.i.splice(0,m),h.D=c,T}function iy(c){if(!c.g&&!c.u){c.Y=1;var h=c.Fa;qe||ne(),q||(qe(),q=!0),X.add(h,c),c.v=0}}function jd(c){return c.g||c.u||3<=c.v?!1:(c.Y++,c.u=po(g(c.Fa,c),ay(c,c.v)),c.v++,!0)}t.Fa=function(){if(this.u=null,sy(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var c=2*this.R;this.j.info("BP detection timer enabled: "+c),this.A=po(g(this.ab,this),c)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,yt(10),Il(this),sy(this))};function Dd(c){c.A!=null&&(l.clearTimeout(c.A),c.A=null)}function sy(c){c.g=new rr(c,c.j,"rpc",c.Y),c.m===null&&(c.g.H=c.o),c.g.O=0;var h=Rn(c.qa);Te(h,"RID","rpc"),Te(h,"SID",c.K),Te(h,"AID",c.T),Te(h,"CI",c.F?"0":"1"),!c.F&&c.ja&&Te(h,"TO",c.ja),Te(h,"TYPE","xmlhttp"),bo(c,h),c.m&&c.o&&Rd(h,c.m,c.o),c.L&&(c.g.I=c.L);var m=c.g;c=c.ia,m.L=1,m.v=wl(Rn(h)),m.m=null,m.P=!0,Cg(m,c)}t.Za=function(){this.C!=null&&(this.C=null,Il(this),jd(this),yt(19))};function kl(c){c.C!=null&&(l.clearTimeout(c.C),c.C=null)}function oy(c,h){var m=null;if(c.g==h){kl(c),Dd(c),c.g=null;var T=2}else if(Pd(c.h,h))m=h.D,Lg(c.h,h),T=1;else return;if(c.G!=0){if(h.o)if(T==1){m=h.m?h.m.length:0,h=Date.now()-h.F;var j=c.B;T=ml(),gt(T,new Ng(T,m)),Sl(c)}else iy(c);else if(j=h.s,j==3||j==0&&0<h.X||!(T==1&&dI(c,h)||T==2&&jd(c)))switch(m&&0<m.length&&(h=c.h,h.i=h.i.concat(m)),j){case 1:ni(c,5);break;case 4:ni(c,10);break;case 3:ni(c,6);break;default:ni(c,2)}}}function ay(c,h){let m=c.Ta+Math.floor(Math.random()*c.cb);return c.isActive()||(m*=2),m*h}function ni(c,h){if(c.j.info("Error code "+h),h==2){var m=g(c.fb,c),T=c.Xa;const j=!T;T=new ti(T||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||xl(T,"https"),wl(T),j?iI(T.toString(),m):sI(T.toString(),m)}else yt(2);c.G=0,c.l&&c.l.sa(h),ly(c),ty(c)}t.fb=function(c){c?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function ly(c){if(c.G=0,c.ka=[],c.l){const h=zg(c.h);(h.length!=0||c.i.length!=0)&&(E(c.ka,h),E(c.ka,c.i),c.h.i.length=0,w(c.i),c.i.length=0),c.l.ra()}}function cy(c,h,m){var T=m instanceof ti?Rn(m):new ti(m);if(T.g!="")h&&(T.g=h+"."+T.g),_l(T,T.s);else{var j=l.location;T=j.protocol,h=h?h+"."+j.hostname:j.hostname,j=+j.port;var z=new ti(null);T&&xl(z,T),h&&(z.g=h),j&&_l(z,j),m&&(z.l=m),T=z}return m=c.D,h=c.ya,m&&h&&Te(T,m,h),Te(T,"VER",c.la),bo(c,T),T}function uy(c,h,m){if(h&&!c.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=c.Ca&&!c.pa?new De(new bl({eb:m})):new De(c.pa),h.Ha(c.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function dy(){}t=dy.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Nl(){}Nl.prototype.g=function(c,h){return new Vt(c,h)};function Vt(c,h){st.call(this),this.g=new ey(h),this.l=c,this.h=h&&h.messageUrlParams||null,c=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(c?c["X-Client-Protocol"]="webchannel":c={"X-Client-Protocol":"webchannel"}),this.g.o=c,c=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(c?c["X-WebChannel-Content-Type"]=h.messageContentType:c={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(c?c["X-WebChannel-Client-Profile"]=h.va:c={"X-WebChannel-Client-Profile":h.va}),this.g.S=c,(c=h&&h.Sb)&&!_(c)&&(this.g.m=c),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!_(h)&&(this.g.D=h,c=this.h,c!==null&&h in c&&(c=this.h,h in c&&delete c[h])),this.j=new Gi(this)}A(Vt,st),Vt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Vt.prototype.close=function(){Cd(this.g)},Vt.prototype.o=function(c){var h=this.g;if(typeof c=="string"){var m={};m.__data__=c,c=m}else this.u&&(m={},m.__data__=_d(c),c=m);h.i.push(new GE(h.Ya++,c)),h.G==3&&Sl(h)},Vt.prototype.N=function(){this.g.l=null,delete this.j,Cd(this.g),delete this.g,Vt.aa.N.call(this)};function hy(c){bd.call(this),c.__headers__&&(this.headers=c.__headers__,this.statusCode=c.__status__,delete c.__headers__,delete c.__status__);var h=c.__sm__;if(h){e:{for(const m in h){c=m;break e}c=void 0}(this.i=c)&&(c=this.i,h=h!==null&&c in h?h[c]:void 0),this.data=h}else this.data=c}A(hy,bd);function py(){Td.call(this),this.status=1}A(py,Td);function Gi(c){this.g=c}A(Gi,dy),Gi.prototype.ua=function(){gt(this.g,"a")},Gi.prototype.ta=function(c){gt(this.g,new hy(c))},Gi.prototype.sa=function(c){gt(this.g,new py)},Gi.prototype.ra=function(){gt(this.g,"b")},Nl.prototype.createWebChannel=Nl.prototype.g,Vt.prototype.send=Vt.prototype.o,Vt.prototype.open=Vt.prototype.m,Vt.prototype.close=Vt.prototype.close,k1=function(){return new Nl},S1=function(){return ml()},I1=Zr,jp={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},gl.NO_ERROR=0,gl.TIMEOUT=8,gl.HTTP_ERROR=6,mc=gl,Pg.COMPLETE="complete",E1=Pg,Eg.EventType=uo,uo.OPEN="a",uo.CLOSE="b",uo.ERROR="c",uo.MESSAGE="d",st.prototype.listen=st.prototype.K,$o=Eg,De.prototype.listenOnce=De.prototype.L,De.prototype.getLastError=De.prototype.Ka,De.prototype.getLastErrorCode=De.prototype.Ba,De.prototype.getStatus=De.prototype.Z,De.prototype.getResponseJson=De.prototype.Oa,De.prototype.getResponseText=De.prototype.oa,De.prototype.send=De.prototype.ea,De.prototype.setWithCredentials=De.prototype.Ha,T1=De}).apply(typeof Wl<"u"?Wl:typeof self<"u"?self:typeof window<"u"?window:{});const Kv="@firebase/firestore";/**
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
 */class ht{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ht.UNAUTHENTICATED=new ht(null),ht.GOOGLE_CREDENTIALS=new ht("google-credentials-uid"),ht.FIRST_PARTY=new ht("first-party-uid"),ht.MOCK_USER=new ht("mock-user");/**
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
 */let ro="10.14.0";/**
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
 */const Pi=new om("@firebase/firestore");function ns(){return Pi.logLevel}function U(t,...e){if(Pi.logLevel<=ae.DEBUG){const n=e.map(lm);Pi.debug(`Firestore (${ro}): ${t}`,...n)}}function Be(t,...e){if(Pi.logLevel<=ae.ERROR){const n=e.map(lm);Pi.error(`Firestore (${ro}): ${t}`,...n)}}function Oa(t,...e){if(Pi.logLevel<=ae.WARN){const n=e.map(lm);Pi.warn(`Firestore (${ro}): ${t}`,...n)}}function lm(t){if(typeof t=="string")return t;try{/**
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
 */function Q(t="Unexpected state"){const e=`FIRESTORE (${ro}) INTERNAL ASSERTION FAILED: `+t;throw Be(e),new Error(e)}function J(t,e){t||Q()}function Y(t,e){return t}/**
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
 */const F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class K extends In{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class _n{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class XP{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ZP{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ht.UNAUTHENTICATED))}shutdown(){}}class eA{constructor(e){this.t=e,this.currentUser=ht.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){J(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new _n;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new _n,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new _n)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(J(typeof r.accessToken=="string"),new XP(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return J(e===null||typeof e=="string"),new ht(e)}}class tA{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=ht.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class nA{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new tA(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(ht.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class rA{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class iA{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){J(this.o===void 0);const r=s=>{s.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,U("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(J(typeof n.token=="string"),this.R=n.token,new rA(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function sA(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class N1{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=sA(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function re(t,e){return t<e?-1:t>e?1:0}function Ls(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}function P1(t){return t+"\0"}/**
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
 */class Ce{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new K(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new K(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new K(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new K(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ce.fromMillis(Date.now())}static fromDate(e){return Ce.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Ce(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?re(this.nanoseconds,e.nanoseconds):re(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class Z{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Z(e)}static min(){return new Z(new Ce(0,0))}static max(){return new Z(new Ce(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Ma{constructor(e,n,r){n===void 0?n=0:n>e.length&&Q(),r===void 0?r=e.length-n:r>e.length-n&&Q(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Ma.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ma?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),o=n.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class me extends Ma{construct(e,n,r){return new me(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new K(F.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new me(n)}static emptyPath(){return new me([])}}const oA=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Pe extends Ma{construct(e,n,r){return new Pe(e,n,r)}static isValidIdentifier(e){return oA.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Pe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Pe(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new K(F.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new K(F.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new K(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(r+=l,i++):(s(),i++)}if(s(),o)throw new K(F.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Pe(n)}static emptyPath(){return new Pe([])}}/**
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
 */class H{constructor(e){this.path=e}static fromPath(e){return new H(me.fromString(e))}static fromName(e){return new H(me.fromString(e).popFirst(5))}static empty(){return new H(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return me.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new H(new me(e.slice()))}}/**
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
 */class ru{constructor(e,n,r,i){this.indexId=e,this.collectionGroup=n,this.fields=r,this.indexState=i}}function Dp(t){return t.fields.find(e=>e.kind===2)}function ai(t){return t.fields.filter(e=>e.kind!==2)}ru.UNKNOWN_ID=-1;class gc{constructor(e,n){this.fieldPath=e,this.kind=n}}class La{constructor(e,n){this.sequenceNumber=e,this.offset=n}static empty(){return new La(0,$t.min())}}function A1(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=Z.fromTimestamp(r===1e9?new Ce(n+1,0):new Ce(n,r));return new $t(i,H.empty(),e)}function R1(t){return new $t(t.readTime,t.key,-1)}class $t{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new $t(Z.min(),H.empty(),-1)}static max(){return new $t(Z.max(),H.empty(),-1)}}function cm(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=H.comparator(t.documentKey,e.documentKey),n!==0?n:re(t.largestBatchId,e.largestBatchId))}/**
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
 */const C1="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class j1{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Gr(t){if(t.code!==F.FAILED_PRECONDITION||t.message!==C1)throw t;U("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&Q(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new V((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof V?n:V.resolve(n)}catch(n){return V.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):V.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):V.reject(n)}static resolve(e){return new V((n,r)=>{n(e)})}static reject(e){return new V((n,r)=>{r(e)})}static waitFor(e){return new V((n,r)=>{let i=0,s=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=V.resolve(!1);for(const r of e)n=n.next(i=>i?V.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new V((r,i)=>{const s=e.length,o=new Array(s);let l=0;for(let u=0;u<s;u++){const d=u;n(e[d]).next(p=>{o[d]=p,++l,l===s&&r(o)},p=>i(p))}})}static doWhile(e,n){return new V((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}/**
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
 */class qu{constructor(e,n){this.action=e,this.transaction=n,this.aborted=!1,this.V=new _n,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{n.error?this.V.reject(new ra(e,n.error)):this.V.resolve()},this.transaction.onerror=r=>{const i=um(r.target.error);this.V.reject(new ra(e,i))}}static open(e,n,r,i){try{return new qu(n,e.transaction(i,r))}catch(s){throw new ra(n,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(U("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const n=this.transaction.objectStore(e);return new lA(n)}}class Or{constructor(e,n,r){this.name=e,this.version=n,this.p=r,Or.S(Qe())===12.2&&Be("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return U("SimpleDb","Removing database:",e),li(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!m1())return!1;if(Or.v())return!0;const e=Qe(),n=Or.S(e),r=0<n&&n<10,i=D1(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,n){return e.store(n)}static S(e){const n=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=n?n[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||(U("SimpleDb","Opening database:",this.name),this.db=await new Promise((n,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;n(o)},i.onblocked=()=>{r(new ra(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new K(F.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new K(F.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new ra(e,o))},i.onupgradeneeded=s=>{U("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{U("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=n=>this.N(n)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=n=>e(n))}async runTransaction(e,n,r,i){const s=n==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const l=qu.open(this.db,e,s?"readonly":"readwrite",r),u=i(l).next(d=>(l.g(),d)).catch(d=>(l.abort(d),V.reject(d))).toPromise();return u.catch(()=>{}),await l.m,u}catch(l){const u=l,d=u.name!=="FirebaseError"&&o<3;if(U("SimpleDb","Transaction failed with error:",u.message,"Retrying:",d),this.close(),!d)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function D1(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class aA{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return li(this.B.delete())}}class ra extends K{constructor(e,n){super(F.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${n}`),this.name="IndexedDbTransactionError"}}function Qr(t){return t.name==="IndexedDbTransactionError"}class lA{constructor(e){this.store=e}put(e,n){let r;return n!==void 0?(U("SimpleDb","PUT",this.store.name,e,n),r=this.store.put(n,e)):(U("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),li(r)}add(e){return U("SimpleDb","ADD",this.store.name,e,e),li(this.store.add(e))}get(e){return li(this.store.get(e)).next(n=>(n===void 0&&(n=null),U("SimpleDb","GET",this.store.name,e,n),n))}delete(e){return U("SimpleDb","DELETE",this.store.name,e),li(this.store.delete(e))}count(){return U("SimpleDb","COUNT",this.store.name),li(this.store.count())}U(e,n){const r=this.options(e,n),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new V((o,l)=>{s.onerror=u=>{l(u.target.error)},s.onsuccess=u=>{o(u.target.result)}})}{const s=this.cursor(r),o=[];return this.W(s,(l,u)=>{o.push(u)}).next(()=>o)}}G(e,n){const r=this.store.getAll(e,n===null?void 0:n);return new V((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}j(e,n){U("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,n);r.H=!1;const i=this.cursor(r);return this.W(i,(s,o,l)=>l.delete())}J(e,n){let r;n?r=e:(r={},n=e);const i=this.cursor(r);return this.W(i,n)}Y(e){const n=this.cursor({});return new V((r,i)=>{n.onerror=s=>{const o=um(s.target.error);i(o)},n.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(l=>{l?o.continue():r()}):r()}})}W(e,n){const r=[];return new V((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const l=o.target.result;if(!l)return void i();const u=new aA(l),d=n(l.primaryKey,l.value,u);if(d instanceof V){const p=d.catch(f=>(u.done(),V.reject(f)));r.push(p)}u.isDone?i():u.K===null?l.continue():l.continue(u.K)}}).next(()=>V.waitFor(r))}options(e,n){let r;return e!==void 0&&(typeof e=="string"?r=e:n=e),{index:r,range:n}}cursor(e){let n="next";if(e.reverse&&(n="prev"),e.index){const r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,n):r.openCursor(e.range,n)}return this.store.openCursor(e.range,n)}}function li(t){return new V((e,n)=>{t.onsuccess=r=>{const i=r.target.result;e(i)},t.onerror=r=>{const i=um(r.target.error);n(i)}})}let Wv=!1;function um(t){const e=Or.S(Qe());if(e>=12.2&&e<13){const n="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(n)>=0){const r=new K("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${n}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Wv||(Wv=!0,setTimeout(()=>{throw r},0)),r}}return t}class cA{constructor(e,n){this.asyncQueue=e,this.Z=n,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){U("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{U("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(n){Qr(n)?U("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",n):await Gr(n)}await this.X(6e4)})}}class uA{constructor(e,n){this.localStore=e,this.persistence=n}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",n=>this.te(n,e))}te(e,n){const r=new Set;let i=n,s=!0;return V.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return U("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(l=>{i-=l,r.add(o)});s=!1})).next(()=>n-i)}ne(e,n,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,n).next(i=>this.localStore.localDocuments.getNextDocuments(e,n,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(l=>(U("IndexBackfiller",`Updating offset: ${l}`),this.localStore.indexManager.updateCollectionGroup(e,n,l))).next(()=>o.size)}))}re(e,n){let r=e;return n.changes.forEach((i,s)=>{const o=R1(s);cm(o,r)>0&&(r=o)}),new $t(r.readTime,r.documentKey,Math.max(n.batchId,e.largestBatchId))}}/**
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
 */class Pt{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Pt.oe=-1;function Hu(t){return t==null}function za(t){return t===0&&1/t==-1/0}function V1(t){return typeof t=="number"&&Number.isInteger(t)&&!za(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */function bt(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Gv(e)),e=dA(t.get(n),e);return Gv(e)}function dA(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const s=t.charAt(i);switch(s){case"\0":n+="";break;case"":n+="";break;default:n+=s}}return n}function Gv(t){return t+""}function fn(t){const e=t.length;if(J(e>=2),e===2)return J(t.charAt(0)===""&&t.charAt(1)===""),me.emptyPath();const n=e-2,r=[];let i="";for(let s=0;s<e;){const o=t.indexOf("",s);switch((o<0||o>n)&&Q(),t.charAt(o+1)){case"":const l=t.substring(s,o);let u;i.length===0?u=l:(i+=l,u=i,i=""),r.push(u);break;case"":i+=t.substring(s,o),i+="\0";break;case"":i+=t.substring(s,o+1);break;default:Q()}s=o+2}return new me(r)}/**
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
 */const Qv=["userId","batchId"];/**
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
 */function yc(t,e){return[t,bt(e)]}function O1(t,e,n){return[t,bt(e),n]}const hA={},pA=["prefixPath","collectionGroup","readTime","documentId"],fA=["prefixPath","collectionGroup","documentId"],mA=["collectionGroup","readTime","prefixPath","documentId"],gA=["canonicalId","targetId"],yA=["targetId","path"],vA=["path","targetId"],xA=["collectionId","parent"],_A=["indexId","uid"],wA=["uid","sequenceNumber"],bA=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],TA=["indexId","uid","orderedDocumentKey"],EA=["userId","collectionPath","documentId"],IA=["userId","collectionPath","largestBatchId"],SA=["userId","collectionGroup","largestBatchId"],M1=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],kA=[...M1,"documentOverlays"],L1=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],z1=L1,dm=[...z1,"indexConfiguration","indexState","indexEntries"],NA=dm,PA=[...dm,"globals"];/**
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
 */class Vp extends j1{constructor(e,n){super(),this._e=e,this.currentSequenceNumber=n}}function Ye(t,e){const n=Y(t);return Or.F(n._e,e)}/**
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
 */function Yv(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function qi(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function F1(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class we{constructor(e,n){this.comparator=e,this.root=n||nt.EMPTY}insert(e,n){return new we(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,nt.BLACK,null,null))}remove(e){return new we(this.comparator,this.root.remove(e,this.comparator).copy(null,null,nt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Gl(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Gl(this.root,e,this.comparator,!1)}getReverseIterator(){return new Gl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Gl(this.root,e,this.comparator,!0)}}class Gl{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class nt{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??nt.RED,this.left=i??nt.EMPTY,this.right=s??nt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new nt(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return nt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return nt.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,nt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,nt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw Q();const e=this.left.check();if(e!==this.right.check())throw Q();return e+(this.isRed()?0:1)}}nt.EMPTY=null,nt.RED=!0,nt.BLACK=!1;nt.EMPTY=new class{constructor(){this.size=0}get key(){throw Q()}get value(){throw Q()}get color(){throw Q()}get left(){throw Q()}get right(){throw Q()}copy(e,n,r,i,s){return this}insert(e,n,r){return new nt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ve{constructor(e){this.comparator=e,this.data=new we(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Jv(this.data.getIterator())}getIteratorFrom(e){return new Jv(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof ve)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ve(this.comparator);return n.data=e,n}}class Jv{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Ji(t){return t.hasNext()?t.getNext():void 0}/**
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
 */class At{constructor(e){this.fields=e,e.sort(Pe.comparator)}static empty(){return new At([])}unionWith(e){let n=new ve(Pe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new At(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Ls(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
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
 */class U1 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class $e{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new U1("Invalid base64 string: "+s):s}}(e);return new $e(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new $e(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return re(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}$e.EMPTY_BYTE_STRING=new $e("");const AA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Qn(t){if(J(!!t),typeof t=="string"){let e=0;const n=AA.exec(t);if(J(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Se(t.seconds),nanos:Se(t.nanos)}}function Se(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Ur(t){return typeof t=="string"?$e.fromBase64String(t):$e.fromUint8Array(t)}/**
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
 */function hm(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function pm(t){const e=t.mapValue.fields.__previous_value__;return hm(e)?pm(e):e}function Fa(t){const e=Qn(t.mapValue.fields.__local_write_time__.timestampValue);return new Ce(e.seconds,e.nanos)}/**
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
 */class RA{constructor(e,n,r,i,s,o,l,u,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d}}class Ai{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Ai("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ai&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Er={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},vc={nullValue:"NULL_VALUE"};function Ri(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?hm(t)?4:B1(t)?9007199254740991:Ku(t)?10:11:Q()}function Tn(t,e){if(t===e)return!0;const n=Ri(t);if(n!==Ri(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Fa(t).isEqual(Fa(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Qn(i.timestampValue),l=Qn(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return Ur(i.bytesValue).isEqual(Ur(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return Se(i.geoPointValue.latitude)===Se(s.geoPointValue.latitude)&&Se(i.geoPointValue.longitude)===Se(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Se(i.integerValue)===Se(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Se(i.doubleValue),l=Se(s.doubleValue);return o===l?za(o)===za(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return Ls(t.arrayValue.values||[],e.arrayValue.values||[],Tn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},l=s.mapValue.fields||{};if(Yv(o)!==Yv(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!Tn(o[u],l[u])))return!1;return!0}(t,e);default:return Q()}}function Ua(t,e){return(t.values||[]).find(n=>Tn(n,e))!==void 0}function Br(t,e){if(t===e)return 0;const n=Ri(t),r=Ri(e);if(n!==r)return re(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return re(t.booleanValue,e.booleanValue);case 2:return function(s,o){const l=Se(s.integerValue||s.doubleValue),u=Se(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Xv(t.timestampValue,e.timestampValue);case 4:return Xv(Fa(t),Fa(e));case 5:return re(t.stringValue,e.stringValue);case 6:return function(s,o){const l=Ur(s),u=Ur(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const l=s.split("/"),u=o.split("/");for(let d=0;d<l.length&&d<u.length;d++){const p=re(l[d],u[d]);if(p!==0)return p}return re(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const l=re(Se(s.latitude),Se(o.latitude));return l!==0?l:re(Se(s.longitude),Se(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Zv(t.arrayValue,e.arrayValue);case 10:return function(s,o){var l,u,d,p;const f=s.fields||{},g=o.fields||{},k=(l=f.value)===null||l===void 0?void 0:l.arrayValue,A=(u=g.value)===null||u===void 0?void 0:u.arrayValue,w=re(((d=k==null?void 0:k.values)===null||d===void 0?void 0:d.length)||0,((p=A==null?void 0:A.values)===null||p===void 0?void 0:p.length)||0);return w!==0?w:Zv(k,A)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===Er.mapValue&&o===Er.mapValue)return 0;if(s===Er.mapValue)return 1;if(o===Er.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),d=o.fields||{},p=Object.keys(d);u.sort(),p.sort();for(let f=0;f<u.length&&f<p.length;++f){const g=re(u[f],p[f]);if(g!==0)return g;const k=Br(l[u[f]],d[p[f]]);if(k!==0)return k}return re(u.length,p.length)}(t.mapValue,e.mapValue);default:throw Q()}}function Xv(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return re(t,e);const n=Qn(t),r=Qn(e),i=re(n.seconds,r.seconds);return i!==0?i:re(n.nanos,r.nanos)}function Zv(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=Br(n[i],r[i]);if(s)return s}return re(n.length,r.length)}function zs(t){return Op(t)}function Op(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Qn(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Ur(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return H.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=Op(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Op(n.fields[o])}`;return i+"}"}(t.mapValue):Q()}function fm(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Mp(t){return!!t&&"integerValue"in t}function Ba(t){return!!t&&"arrayValue"in t}function ex(t){return!!t&&"nullValue"in t}function tx(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function xc(t){return!!t&&"mapValue"in t}function Ku(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function ia(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return qi(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=ia(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ia(t.arrayValue.values[n]);return e}return Object.assign({},t)}function B1(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const $1={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function CA(t){return"nullValue"in t?vc:"booleanValue"in t?{booleanValue:!1}:"integerValue"in t||"doubleValue"in t?{doubleValue:NaN}:"timestampValue"in t?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in t?{stringValue:""}:"bytesValue"in t?{bytesValue:""}:"referenceValue"in t?fm(Ai.empty(),H.empty()):"geoPointValue"in t?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in t?{arrayValue:{}}:"mapValue"in t?Ku(t)?$1:{mapValue:{}}:Q()}function jA(t){return"nullValue"in t?{booleanValue:!1}:"booleanValue"in t?{doubleValue:NaN}:"integerValue"in t||"doubleValue"in t?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in t?{stringValue:""}:"stringValue"in t?{bytesValue:""}:"bytesValue"in t?fm(Ai.empty(),H.empty()):"referenceValue"in t?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in t?{arrayValue:{}}:"arrayValue"in t?$1:"mapValue"in t?Ku(t)?{mapValue:{}}:Er:Q()}function nx(t,e){const n=Br(t.value,e.value);return n!==0?n:t.inclusive&&!e.inclusive?-1:!t.inclusive&&e.inclusive?1:0}function rx(t,e){const n=Br(t.value,e.value);return n!==0?n:t.inclusive&&!e.inclusive?1:!t.inclusive&&e.inclusive?-1:0}/**
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
 */class ft{constructor(e){this.value=e}static empty(){return new ft({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!xc(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ia(n)}setAll(e){let n=Pe.emptyPath(),r={},i=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}o?r[l.lastSegment()]=ia(o):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());xc(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Tn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];xc(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){qi(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new ft(ia(this.value))}}function q1(t){const e=[];return qi(t.fields,(n,r)=>{const i=new Pe([n]);if(xc(r)){const s=q1(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new At(e)}/**
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
 */class Oe{constructor(e,n,r,i,s,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new Oe(e,0,Z.min(),Z.min(),Z.min(),ft.empty(),0)}static newFoundDocument(e,n,r,i){return new Oe(e,1,n,Z.min(),r,i,0)}static newNoDocument(e,n){return new Oe(e,2,n,Z.min(),Z.min(),ft.empty(),0)}static newUnknownDocument(e,n){return new Oe(e,3,n,Z.min(),Z.min(),ft.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ft.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ft.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Oe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Oe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Fs{constructor(e,n){this.position=e,this.inclusive=n}}function ix(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=H.comparator(H.fromName(o.referenceValue),n.key):r=Br(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function sx(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Tn(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class iu{constructor(e,n="asc"){this.field=e,this.dir=n}}function DA(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class H1{}class le extends H1{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new VA(e,n,r):n==="array-contains"?new LA(e,r):n==="in"?new J1(e,r):n==="not-in"?new zA(e,r):n==="array-contains-any"?new FA(e,r):new le(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new OA(e,r):new MA(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Br(n,this.value)):n!==null&&Ri(this.value)===Ri(n)&&this.matchesComparison(Br(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Q()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ye extends H1{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new ye(e,n)}matches(e){return Us(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Us(t){return t.op==="and"}function Lp(t){return t.op==="or"}function mm(t){return K1(t)&&Us(t)}function K1(t){for(const e of t.filters)if(e instanceof ye)return!1;return!0}function zp(t){if(t instanceof le)return t.field.canonicalString()+t.op.toString()+zs(t.value);if(mm(t))return t.filters.map(e=>zp(e)).join(",");{const e=t.filters.map(n=>zp(n)).join(",");return`${t.op}(${e})`}}function W1(t,e){return t instanceof le?function(r,i){return i instanceof le&&r.op===i.op&&r.field.isEqual(i.field)&&Tn(r.value,i.value)}(t,e):t instanceof ye?function(r,i){return i instanceof ye&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,l)=>s&&W1(o,i.filters[l]),!0):!1}(t,e):void Q()}function G1(t,e){const n=t.filters.concat(e);return ye.create(n,t.op)}function Q1(t){return t instanceof le?function(n){return`${n.field.canonicalString()} ${n.op} ${zs(n.value)}`}(t):t instanceof ye?function(n){return n.op.toString()+" {"+n.getFilters().map(Q1).join(" ,")+"}"}(t):"Filter"}class VA extends le{constructor(e,n,r){super(e,n,r),this.key=H.fromName(r.referenceValue)}matches(e){const n=H.comparator(e.key,this.key);return this.matchesComparison(n)}}class OA extends le{constructor(e,n){super(e,"in",n),this.keys=Y1("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class MA extends le{constructor(e,n){super(e,"not-in",n),this.keys=Y1("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Y1(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>H.fromName(r.referenceValue))}class LA extends le{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ba(n)&&Ua(n.arrayValue,this.value)}}class J1 extends le{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ua(this.value.arrayValue,n)}}class zA extends le{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ua(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Ua(this.value.arrayValue,n)}}class FA extends le{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ba(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ua(this.value.arrayValue,r))}}/**
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
 */class UA{constructor(e,n=null,r=[],i=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=l,this.ue=null}}function Fp(t,e=null,n=[],r=[],i=null,s=null,o=null){return new UA(t,e,n,r,i,s,o)}function Ci(t){const e=Y(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>zp(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Hu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>zs(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>zs(r)).join(",")),e.ue=n}return e.ue}function rl(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!DA(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!W1(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!sx(t.startAt,e.startAt)&&sx(t.endAt,e.endAt)}function su(t){return H.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function ou(t,e){return t.filters.filter(n=>n instanceof le&&n.field.isEqual(e))}function ox(t,e,n){let r=vc,i=!0;for(const s of ou(t,e)){let o=vc,l=!0;switch(s.op){case"<":case"<=":o=CA(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,l=!1;break;case"!=":case"not-in":o=vc}nx({value:r,inclusive:i},{value:o,inclusive:l})<0&&(r=o,i=l)}if(n!==null){for(let s=0;s<t.orderBy.length;++s)if(t.orderBy[s].field.isEqual(e)){const o=n.position[s];nx({value:r,inclusive:i},{value:o,inclusive:n.inclusive})<0&&(r=o,i=n.inclusive);break}}return{value:r,inclusive:i}}function ax(t,e,n){let r=Er,i=!0;for(const s of ou(t,e)){let o=Er,l=!0;switch(s.op){case">=":case">":o=jA(s.value),l=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,l=!1;break;case"!=":case"not-in":o=Er}rx({value:r,inclusive:i},{value:o,inclusive:l})>0&&(r=o,i=l)}if(n!==null){for(let s=0;s<t.orderBy.length;++s)if(t.orderBy[s].field.isEqual(e)){const o=n.position[s];rx({value:r,inclusive:i},{value:o,inclusive:n.inclusive})>0&&(r=o,i=n.inclusive);break}}return{value:r,inclusive:i}}/**
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
 */class Wu{constructor(e,n=null,r=[],i=[],s=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function X1(t,e,n,r,i,s,o,l){return new Wu(t,e,n,r,i,s,o,l)}function Gu(t){return new Wu(t)}function lx(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function BA(t){return t.collectionGroup!==null}function sa(t){const e=Y(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new ve(Pe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new iu(s,r))}),n.has(Pe.keyField().canonicalString())||e.ce.push(new iu(Pe.keyField(),r))}return e.ce}function Ut(t){const e=Y(t);return e.le||(e.le=$A(e,sa(t))),e.le}function $A(t,e){if(t.limitType==="F")return Fp(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new iu(i.field,s)});const n=t.endAt?new Fs(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Fs(t.startAt.position,t.startAt.inclusive):null;return Fp(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Up(t,e,n){return new Wu(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Qu(t,e){return rl(Ut(t),Ut(e))&&t.limitType===e.limitType}function Z1(t){return`${Ci(Ut(t))}|lt:${t.limitType}`}function rs(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>Q1(i)).join(", ")}]`),Hu(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>zs(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>zs(i)).join(",")),`Target(${r})`}(Ut(t))}; limitType=${t.limitType})`}function il(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):H.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of sa(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,l,u){const d=ix(o,l,u);return o.inclusive?d<=0:d<0}(r.startAt,sa(r),i)||r.endAt&&!function(o,l,u){const d=ix(o,l,u);return o.inclusive?d>=0:d>0}(r.endAt,sa(r),i))}(t,e)}function eb(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function tb(t){return(e,n)=>{let r=!1;for(const i of sa(t)){const s=qA(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function qA(t,e,n){const r=t.field.isKeyField()?H.comparator(e.key,n.key):function(s,o,l){const u=o.data.field(s),d=l.data.field(s);return u!==null&&d!==null?Br(u,d):Q()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Q()}}/**
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
 */class Yr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){qi(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return F1(this.inner)}size(){return this.innerSize}}/**
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
 */const HA=new we(H.comparator);function Lt(){return HA}const nb=new we(H.comparator);function qo(...t){let e=nb;for(const n of t)e=e.insert(n.key,n);return e}function rb(t){let e=nb;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function mn(){return oa()}function ib(){return oa()}function oa(){return new Yr(t=>t.toString(),(t,e)=>t.isEqual(e))}const KA=new we(H.comparator),WA=new ve(H.comparator);function se(...t){let e=WA;for(const n of t)e=e.add(n);return e}const GA=new ve(re);function gm(){return GA}/**
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
 */function ym(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:za(e)?"-0":e}}function sb(t){return{integerValue:""+t}}function QA(t,e){return V1(e)?sb(e):ym(t,e)}/**
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
 */class Yu{constructor(){this._=void 0}}function YA(t,e,n){return t instanceof Bs?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&hm(s)&&(s=pm(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(n,e):t instanceof $s?ab(t,e):t instanceof qs?lb(t,e):function(i,s){const o=ob(i,s),l=cx(o)+cx(i.Pe);return Mp(o)&&Mp(i.Pe)?sb(l):ym(i.serializer,l)}(t,e)}function JA(t,e,n){return t instanceof $s?ab(t,e):t instanceof qs?lb(t,e):n}function ob(t,e){return t instanceof $a?function(r){return Mp(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Bs extends Yu{}class $s extends Yu{constructor(e){super(),this.elements=e}}function ab(t,e){const n=cb(e);for(const r of t.elements)n.some(i=>Tn(i,r))||n.push(r);return{arrayValue:{values:n}}}class qs extends Yu{constructor(e){super(),this.elements=e}}function lb(t,e){let n=cb(e);for(const r of t.elements)n=n.filter(i=>!Tn(i,r));return{arrayValue:{values:n}}}class $a extends Yu{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function cx(t){return Se(t.integerValue||t.doubleValue)}function cb(t){return Ba(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class ub{constructor(e,n){this.field=e,this.transform=n}}function XA(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof $s&&i instanceof $s||r instanceof qs&&i instanceof qs?Ls(r.elements,i.elements,Tn):r instanceof $a&&i instanceof $a?Tn(r.Pe,i.Pe):r instanceof Bs&&i instanceof Bs}(t.transform,e.transform)}class ZA{constructor(e,n){this.version=e,this.transformResults=n}}class _t{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new _t}static exists(e){return new _t(void 0,e)}static updateTime(e){return new _t(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function _c(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Ju{}function db(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new vm(t.key,_t.none()):new io(t.key,t.data,_t.none());{const n=t.data,r=ft.empty();let i=new ve(Pe.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new er(t.key,r,new At(i.toArray()),_t.none())}}function eR(t,e,n){t instanceof io?function(i,s,o){const l=i.value.clone(),u=dx(i.fieldTransforms,s,o.transformResults);l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof er?function(i,s,o){if(!_c(i.precondition,s))return void s.convertToUnknownDocument(o.version);const l=dx(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(hb(i)),u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function aa(t,e,n,r){return t instanceof io?function(s,o,l,u){if(!_c(s.precondition,o))return l;const d=s.value.clone(),p=hx(s.fieldTransforms,u,o);return d.setAll(p),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(t,e,n,r):t instanceof er?function(s,o,l,u){if(!_c(s.precondition,o))return l;const d=hx(s.fieldTransforms,u,o),p=o.data;return p.setAll(hb(s)),p.setAll(d),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(f=>f.field))}(t,e,n,r):function(s,o,l){return _c(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function tR(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=ob(r.transform,i||null);s!=null&&(n===null&&(n=ft.empty()),n.set(r.field,s))}return n||null}function ux(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Ls(r,i,(s,o)=>XA(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class io extends Ju{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class er extends Ju{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function hb(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function dx(t,e,n){const r=new Map;J(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,l=e.data.field(s.field);r.set(s.field,JA(o,l,n[i]))}return r}function hx(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,YA(s,o,e))}return r}class vm extends Ju{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class pb extends Ju{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class xm{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&eR(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=aa(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=aa(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=ib();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=n.has(i.key)?null:l;const u=db(o,l);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(Z.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),se())}isEqual(e){return this.batchId===e.batchId&&Ls(this.mutations,e.mutations,(n,r)=>ux(n,r))&&Ls(this.baseMutations,e.baseMutations,(n,r)=>ux(n,r))}}class _m{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){J(e.mutations.length===r.length);let i=function(){return KA}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new _m(e,n,r,i)}}/**
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
 */class wm{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class nR{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var He,ce;function rR(t){switch(t){default:return Q();case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0}}function fb(t){if(t===void 0)return Be("GRPC error has no .code"),F.UNKNOWN;switch(t){case He.OK:return F.OK;case He.CANCELLED:return F.CANCELLED;case He.UNKNOWN:return F.UNKNOWN;case He.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case He.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case He.INTERNAL:return F.INTERNAL;case He.UNAVAILABLE:return F.UNAVAILABLE;case He.UNAUTHENTICATED:return F.UNAUTHENTICATED;case He.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case He.NOT_FOUND:return F.NOT_FOUND;case He.ALREADY_EXISTS:return F.ALREADY_EXISTS;case He.PERMISSION_DENIED:return F.PERMISSION_DENIED;case He.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case He.ABORTED:return F.ABORTED;case He.OUT_OF_RANGE:return F.OUT_OF_RANGE;case He.UNIMPLEMENTED:return F.UNIMPLEMENTED;case He.DATA_LOSS:return F.DATA_LOSS;default:return Q()}}(ce=He||(He={}))[ce.OK=0]="OK",ce[ce.CANCELLED=1]="CANCELLED",ce[ce.UNKNOWN=2]="UNKNOWN",ce[ce.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ce[ce.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ce[ce.NOT_FOUND=5]="NOT_FOUND",ce[ce.ALREADY_EXISTS=6]="ALREADY_EXISTS",ce[ce.PERMISSION_DENIED=7]="PERMISSION_DENIED",ce[ce.UNAUTHENTICATED=16]="UNAUTHENTICATED",ce[ce.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ce[ce.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ce[ce.ABORTED=10]="ABORTED",ce[ce.OUT_OF_RANGE=11]="OUT_OF_RANGE",ce[ce.UNIMPLEMENTED=12]="UNIMPLEMENTED",ce[ce.INTERNAL=13]="INTERNAL",ce[ce.UNAVAILABLE=14]="UNAVAILABLE",ce[ce.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function iR(){return new TextEncoder}/**
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
 */const sR=new vi([4294967295,4294967295],0);function px(t){const e=iR().encode(t),n=new b1;return n.update(e),new Uint8Array(n.digest())}function fx(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new vi([n,r],0),new vi([i,s],0)]}class bm{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Ho(`Invalid padding: ${n}`);if(r<0)throw new Ho(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ho(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Ho(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=vi.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(vi.fromNumber(r)));return i.compare(sR)===1&&(i=new vi([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=px(e),[r,i]=fx(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new bm(s,i,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=px(e),[r,i]=fx(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Ho extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class sl{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,ol.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new sl(Z.min(),i,new we(re),Lt(),se())}}class ol{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new ol(r,n,se(),se(),se())}}/**
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
 */class wc{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class mb{constructor(e,n){this.targetId=e,this.me=n}}class gb{constructor(e,n,r=$e.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class mx{constructor(){this.fe=0,this.ge=yx(),this.pe=$e.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=se(),n=se(),r=se();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:Q()}}),new ol(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=yx()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,J(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class oR{constructor(e){this.Le=e,this.Be=new Map,this.ke=Lt(),this.qe=gx(),this.Qe=new we(re)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:Q()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(su(s))if(r===0){const o=new H(s.path);this.Ue(n,o,Oe.newNoDocument(o,Z.min()))}else J(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),u=l?this.Xe(l,e,o):1;if(u!==0){this.je(n);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,d)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,l;try{o=Ur(r).toUint8Array()}catch(u){if(u instanceof U1)return Oa("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new bm(o,i,s)}catch(u){return Oa(u instanceof Ho?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,o)=>{const l=this.Je(o);if(l){if(s.current&&su(l.target)){const u=new H(l.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,Oe.newNoDocument(u,e))}s.be&&(n.set(o,s.ve()),s.Ce())}});let r=se();this.qe.forEach((s,o)=>{let l=!0;o.forEachWhile(u=>{const d=this.Je(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new sl(e,n,this.Qe,this.ke,r);return this.ke=Lt(),this.qe=gx(),this.Qe=new we(re),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new mx,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new ve(re),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||U("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new mx),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function gx(){return new we(H.comparator)}function yx(){return new we(H.comparator)}const aR={asc:"ASCENDING",desc:"DESCENDING"},lR={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},cR={and:"AND",or:"OR"};class uR{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Bp(t,e){return t.useProto3Json||Hu(e)?e:{value:e}}function Hs(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function yb(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function dR(t,e){return Hs(t,e.toTimestamp())}function Tt(t){return J(!!t),Z.fromTimestamp(function(n){const r=Qn(n);return new Ce(r.seconds,r.nanos)}(t))}function Tm(t,e){return $p(t,e).canonicalString()}function $p(t,e){const n=function(i){return new me(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function vb(t){const e=me.fromString(t);return J(kb(e)),e}function au(t,e){return Tm(t.databaseId,e.path)}function xi(t,e){const n=vb(e);if(n.get(1)!==t.databaseId.projectId)throw new K(F.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new K(F.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new H(wb(n))}function xb(t,e){return Tm(t.databaseId,e)}function _b(t){const e=vb(t);return e.length===4?me.emptyPath():wb(e)}function qp(t){return new me(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function wb(t){return J(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function vx(t,e,n){return{name:au(t,e),fields:n.value.mapValue.fields}}function hR(t,e,n){const r=xi(t,e.name),i=Tt(e.updateTime),s=e.createTime?Tt(e.createTime):Z.min(),o=new ft({mapValue:{fields:e.fields}}),l=Oe.newFoundDocument(r,i,s,o);return n&&l.setHasCommittedMutations(),n?l.setHasCommittedMutations():l}function pR(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:Q()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,p){return d.useProto3Json?(J(p===void 0||typeof p=="string"),$e.fromBase64String(p||"")):(J(p===void 0||p instanceof Buffer||p instanceof Uint8Array),$e.fromUint8Array(p||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(d){const p=d.code===void 0?F.UNKNOWN:fb(d.code);return new K(p,d.message||"")}(o);n=new gb(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=xi(t,r.document.name),s=Tt(r.document.updateTime),o=r.document.createTime?Tt(r.document.createTime):Z.min(),l=new ft({mapValue:{fields:r.document.fields}}),u=Oe.newFoundDocument(i,s,o,l),d=r.targetIds||[],p=r.removedTargetIds||[];n=new wc(d,p,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=xi(t,r.document),s=r.readTime?Tt(r.readTime):Z.min(),o=Oe.newNoDocument(i,s),l=r.removedTargetIds||[];n=new wc([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=xi(t,r.document),s=r.removedTargetIds||[];n=new wc([],s,i,null)}else{if(!("filter"in e))return Q();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new nR(i,s),l=r.targetId;n=new mb(l,o)}}return n}function lu(t,e){let n;if(e instanceof io)n={update:vx(t,e.key,e.value)};else if(e instanceof vm)n={delete:au(t,e.key)};else if(e instanceof er)n={update:vx(t,e.key,e.data),updateMask:xR(e.fieldMask)};else{if(!(e instanceof pb))return Q();n={verify:au(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const l=o.transform;if(l instanceof Bs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof $s)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof qs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof $a)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw Q()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:dR(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:Q()}(t,e.precondition)),n}function Hp(t,e){const n=e.currentDocument?function(s){return s.updateTime!==void 0?_t.updateTime(Tt(s.updateTime)):s.exists!==void 0?_t.exists(s.exists):_t.none()}(e.currentDocument):_t.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,l){let u=null;if("setToServerValue"in l)J(l.setToServerValue==="REQUEST_TIME"),u=new Bs;else if("appendMissingElements"in l){const p=l.appendMissingElements.values||[];u=new $s(p)}else if("removeAllFromArray"in l){const p=l.removeAllFromArray.values||[];u=new qs(p)}else"increment"in l?u=new $a(o,l.increment):Q();const d=Pe.fromServerFormat(l.fieldPath);return new ub(d,u)}(t,i)):[];if(e.update){e.update.name;const i=xi(t,e.update.name),s=new ft({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const d=u.fieldPaths||[];return new At(d.map(p=>Pe.fromServerFormat(p)))}(e.updateMask);return new er(i,s,o,n,r)}return new io(i,s,n,r)}if(e.delete){const i=xi(t,e.delete);return new vm(i,n)}if(e.verify){const i=xi(t,e.verify);return new pb(i,n)}return Q()}function fR(t,e){return t&&t.length>0?(J(e!==void 0),t.map(n=>function(i,s){let o=i.updateTime?Tt(i.updateTime):Tt(s);return o.isEqual(Z.min())&&(o=Tt(s)),new ZA(o,i.transformResults||[])}(n,e))):[]}function bb(t,e){return{documents:[xb(t,e.path)]}}function Tb(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=xb(t,i);const s=function(d){if(d.length!==0)return Sb(ye.create(d,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(d){if(d.length!==0)return d.map(p=>function(g){return{field:is(g.field),direction:gR(g.dir)}}(p))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Bp(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:n,parent:i}}function Eb(t){let e=_b(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){J(r===1);const p=n.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];n.where&&(s=function(f){const g=Ib(f);return g instanceof ye&&mm(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(f){return f.map(g=>function(A){return new iu(ss(A.field),function(E){switch(E){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(A.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(f){let g;return g=typeof f=="object"?f.value:f,Hu(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(f){const g=!!f.before,k=f.values||[];return new Fs(k,g)}(n.startAt));let d=null;return n.endAt&&(d=function(f){const g=!f.before,k=f.values||[];return new Fs(k,g)}(n.endAt)),X1(e,i,o,s,l,"F",u,d)}function mR(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Q()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Ib(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=ss(n.unaryFilter.field);return le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ss(n.unaryFilter.field);return le.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ss(n.unaryFilter.field);return le.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ss(n.unaryFilter.field);return le.create(o,"!=",{nullValue:"NULL_VALUE"});default:return Q()}}(t):t.fieldFilter!==void 0?function(n){return le.create(ss(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Q()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return ye.create(n.compositeFilter.filters.map(r=>Ib(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return Q()}}(n.compositeFilter.op))}(t):Q()}function gR(t){return aR[t]}function yR(t){return lR[t]}function vR(t){return cR[t]}function is(t){return{fieldPath:t.canonicalString()}}function ss(t){return Pe.fromServerFormat(t.fieldPath)}function Sb(t){return t instanceof le?function(n){if(n.op==="=="){if(tx(n.value))return{unaryFilter:{field:is(n.field),op:"IS_NAN"}};if(ex(n.value))return{unaryFilter:{field:is(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(tx(n.value))return{unaryFilter:{field:is(n.field),op:"IS_NOT_NAN"}};if(ex(n.value))return{unaryFilter:{field:is(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:is(n.field),op:yR(n.op),value:n.value}}}(t):t instanceof ye?function(n){const r=n.getFilters().map(i=>Sb(i));return r.length===1?r[0]:{compositeFilter:{op:vR(n.op),filters:r}}}(t):Q()}function xR(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function kb(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class Ln{constructor(e,n,r,i,s=Z.min(),o=Z.min(),l=$e.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Ln(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Ln(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ln(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ln(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Nb{constructor(e){this.ct=e}}function _R(t,e){let n;if(e.document)n=hR(t.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=H.fromSegments(e.noDocument.path),i=Di(e.noDocument.readTime);n=Oe.newNoDocument(r,i),e.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!e.unknownDocument)return Q();{const r=H.fromSegments(e.unknownDocument.path),i=Di(e.unknownDocument.version);n=Oe.newUnknownDocument(r,i)}}return e.readTime&&n.setReadTime(function(i){const s=new Ce(i[0],i[1]);return Z.fromTimestamp(s)}(e.readTime)),n}function xx(t,e){const n=e.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:cu(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:au(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Hs(s,o.version.toTimestamp()),createTime:Hs(s,o.createTime.toTimestamp())}}(t.ct,e);else if(e.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:ji(e.version)};else{if(!e.isUnknownDocument())return Q();r.unknownDocument={path:n.path.toArray(),version:ji(e.version)}}return r}function cu(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function ji(t){const e=t.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Di(t){const e=new Ce(t.seconds,t.nanoseconds);return Z.fromTimestamp(e)}function ci(t,e){const n=(e.baseMutations||[]).map(s=>Hp(t.ct,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const l=e.mutations[s+1];o.updateTransforms=l.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>Hp(t.ct,s)),i=Ce.fromMillis(e.localWriteTimeMs);return new xm(e.batchId,i,n,r)}function Ko(t){const e=Di(t.readTime),n=t.lastLimboFreeSnapshotVersion!==void 0?Di(t.lastLimboFreeSnapshotVersion):Z.min();let r;return r=function(s){return s.documents!==void 0}(t.query)?function(s){return J(s.documents.length===1),Ut(Gu(_b(s.documents[0])))}(t.query):function(s){return Ut(Eb(s))}(t.query),new Ln(r,t.targetId,"TargetPurposeListen",t.lastListenSequenceNumber,e,n,$e.fromBase64String(t.resumeToken))}function Pb(t,e){const n=ji(e.snapshotVersion),r=ji(e.lastLimboFreeSnapshotVersion);let i;i=su(e.target)?bb(t.ct,e.target):Tb(t.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Ci(e.target),readTime:n,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Ab(t){const e=Eb({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Up(e,e.limit,"L"):e}function mh(t,e){return new wm(e.largestBatchId,Hp(t.ct,e.overlayMutation))}function _x(t,e){const n=e.path.lastSegment();return[t,bt(e.path.popLast()),n]}function wx(t,e,n,r){return{indexId:t,uid:e,sequenceNumber:n,readTime:ji(r.readTime),documentKey:bt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
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
 */class wR{getBundleMetadata(e,n){return bx(e).get(n).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:Di(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,n){return bx(e).put(function(i){return{bundleId:i.id,createTime:ji(Tt(i.createTime)),version:i.version}}(n))}getNamedQuery(e,n){return Tx(e).get(n).next(r=>{if(r)return function(s){return{name:s.name,query:Ab(s.bundledQuery),readTime:Di(s.readTime)}}(r)})}saveNamedQuery(e,n){return Tx(e).put(function(i){return{name:i.name,readTime:ji(Tt(i.readTime)),bundledQuery:i.bundledQuery}}(n))}}function bx(t){return Ye(t,"bundles")}function Tx(t){return Ye(t,"namedQueries")}/**
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
 */class Xu{constructor(e,n){this.serializer=e,this.userId=n}static lt(e,n){const r=n.uid||"";return new Xu(e,r)}getOverlay(e,n){return Ro(e).get(_x(this.userId,n)).next(r=>r?mh(this.serializer,r):null)}getOverlays(e,n){const r=mn();return V.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){const i=[];return r.forEach((s,o)=>{const l=new wm(n,o);i.push(this.ht(e,l))}),V.waitFor(i)}removeOverlaysForBatchId(e,n,r){const i=new Set;n.forEach(o=>i.add(bt(o.getCollectionPath())));const s=[];return i.forEach(o=>{const l=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Ro(e).j("collectionPathOverlayIndex",l))}),V.waitFor(s)}getOverlaysForCollection(e,n,r){const i=mn(),s=bt(n),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Ro(e).U("collectionPathOverlayIndex",o).next(l=>{for(const u of l){const d=mh(this.serializer,u);i.set(d.getKey(),d)}return i})}getOverlaysForCollectionGroup(e,n,r,i){const s=mn();let o;const l=IDBKeyRange.bound([this.userId,n,r],[this.userId,n,Number.POSITIVE_INFINITY],!0);return Ro(e).J({index:"collectionGroupOverlayIndex",range:l},(u,d,p)=>{const f=mh(this.serializer,d);s.size()<i||f.largestBatchId===o?(s.set(f.getKey(),f),o=f.largestBatchId):p.done()}).next(()=>s)}ht(e,n){return Ro(e).put(function(i,s,o){const[l,u,d]=_x(s,o.mutation.key);return{userId:s,collectionPath:u,documentId:d,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:lu(i.ct,o.mutation)}}(this.serializer,this.userId,n))}}function Ro(t){return Ye(t,"documentOverlays")}/**
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
 */class bR{Pt(e){return Ye(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(n=>{const r=n==null?void 0:n.value;return r?$e.fromUint8Array(r):$e.EMPTY_BYTE_STRING})}setSessionToken(e,n){return this.Pt(e).put({name:"sessionToken",value:n.toUint8Array()})}}/**
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
 */class ui{constructor(){}It(e,n){this.Tt(e,n),n.Et()}Tt(e,n){if("nullValue"in e)this.dt(n,5);else if("booleanValue"in e)this.dt(n,10),n.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(n,15),n.At(Se(e.integerValue));else if("doubleValue"in e){const r=Se(e.doubleValue);isNaN(r)?this.dt(n,13):(this.dt(n,15),za(r)?n.At(0):n.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(n,20),typeof r=="string"&&(r=Qn(r)),n.Rt(`${r.seconds||""}`),n.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,n),this.ft(n);else if("bytesValue"in e)this.dt(n,30),n.gt(Ur(e.bytesValue)),this.ft(n);else if("referenceValue"in e)this.yt(e.referenceValue,n);else if("geoPointValue"in e){const r=e.geoPointValue;this.dt(n,45),n.At(r.latitude||0),n.At(r.longitude||0)}else"mapValue"in e?B1(e)?this.dt(n,Number.MAX_SAFE_INTEGER):Ku(e)?this.wt(e.mapValue,n):(this.St(e.mapValue,n),this.ft(n)):"arrayValue"in e?(this.bt(e.arrayValue,n),this.ft(n)):Q()}Vt(e,n){this.dt(n,25),this.Dt(e,n)}Dt(e,n){n.Rt(e)}St(e,n){const r=e.fields||{};this.dt(n,55);for(const i of Object.keys(r))this.Vt(i,n),this.Tt(r[i],n)}wt(e,n){var r,i;const s=e.fields||{};this.dt(n,53);const o="value",l=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.dt(n,15),n.At(Se(l)),this.Vt(o,n),this.Tt(s[o],n)}bt(e,n){const r=e.values||[];this.dt(n,50);for(const i of r)this.Tt(i,n)}yt(e,n){this.dt(n,37),H.fromName(e).path.forEach(r=>{this.dt(n,60),this.Dt(r,n)})}dt(e,n){e.At(n)}ft(e){e.At(2)}}ui.vt=new ui;function TR(t){if(t===0)return 8;let e=0;return!(t>>4)&&(e+=4,t<<=4),!(t>>6)&&(e+=2,t<<=2),!(t>>7)&&(e+=1),e}function Ex(t){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=TR(255&r[s]);if(i+=o,o!==8)break}return i}(t);return Math.ceil(e/8)}class ER{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const n=e[Symbol.iterator]();let r=n.next();for(;!r.done;)this.Ft(r.value),r=n.next();this.Mt()}xt(e){const n=e[Symbol.iterator]();let r=n.next();for(;!r.done;)this.Ot(r.value),r=n.next();this.Nt()}Lt(e){for(const n of e){const r=n.charCodeAt(0);if(r<128)this.Ft(r);else if(r<2048)this.Ft(960|r>>>6),this.Ft(128|63&r);else if(n<"\uD800"||"\uDBFF"<n)this.Ft(480|r>>>12),this.Ft(128|63&r>>>6),this.Ft(128|63&r);else{const i=n.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const n of e){const r=n.charCodeAt(0);if(r<128)this.Ot(r);else if(r<2048)this.Ot(960|r>>>6),this.Ot(128|63&r);else if(n<"\uD800"||"\uDBFF"<n)this.Ot(480|r>>>12),this.Ot(128|63&r>>>6),this.Ot(128|63&r);else{const i=n.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const n=this.qt(e),r=Ex(n);this.Qt(1+r),this.buffer[this.position++]=255&r;for(let i=n.length-r;i<n.length;++i)this.buffer[this.position++]=255&n[i]}Kt(e){const n=this.qt(e),r=Ex(n);this.Qt(1+r),this.buffer[this.position++]=~(255&r);for(let i=n.length-r;i<n.length;++i)this.buffer[this.position++]=~(255&n[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const n=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=(128&n[0])!=0;n[0]^=r?255:128;for(let i=1;i<n.length;++i)n[i]^=r?255:0;return n}Ft(e){const n=255&e;n===0?(this.Ut(0),this.Ut(255)):n===255?(this.Ut(255),this.Ut(0)):this.Ut(n)}Ot(e){const n=255&e;n===0?(this.Gt(0),this.Gt(255)):n===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const n=e+this.position;if(n<=this.buffer.length)return;let r=2*this.buffer.length;r<n&&(r=n);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class IR{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class SR{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Co{constructor(){this.jt=new ER,this.Ht=new IR(this.jt),this.Jt=new SR(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class di{constructor(e,n,r,i){this.indexId=e,this.documentKey=n,this.arrayValue=r,this.directionalValue=i}Zt(){const e=this.directionalValue.length,n=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(n);return r.set(this.directionalValue,0),n!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new di(this.indexId,this.documentKey,this.arrayValue,r)}}function ar(t,e){let n=t.indexId-e.indexId;return n!==0?n:(n=Ix(t.arrayValue,e.arrayValue),n!==0?n:(n=Ix(t.directionalValue,e.directionalValue),n!==0?n:H.comparator(t.documentKey,e.documentKey)))}function Ix(t,e){for(let n=0;n<t.length&&n<e.length;++n){const r=t[n]-e[n];if(r!==0)return r}return t.length-e.length}/**
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
 */class Sx{constructor(e){this.Xt=new ve((n,r)=>Pe.comparator(n.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const n of e.filters){const r=n;r.isInequality()?this.Xt=this.Xt.add(r):this.tn.push(r)}}get nn(){return this.Xt.size>1}rn(e){if(J(e.collectionGroup===this.collectionId),this.nn)return!1;const n=Dp(e);if(n!==void 0&&!this.sn(n))return!1;const r=ai(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.sn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Xt.size>0){const l=this.Xt.getIterator().getNext();if(!i.has(l.field.canonicalString())){const u=r[s];if(!this.on(l,u)||!this._n(this.en[o++],u))return!1}++s}for(;s<r.length;++s){const l=r[s];if(o>=this.en.length||!this._n(this.en[o++],l))return!1}return!0}an(){if(this.nn)return null;let e=new ve(Pe.comparator);const n=[];for(const r of this.tn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")n.push(new gc(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),n.push(new gc(r.field,0))}for(const r of this.en)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),n.push(new gc(r.field,r.dir==="asc"?0:1)));return new ru(ru.UNKNOWN_ID,this.collectionId,n,La.empty())}sn(e){for(const n of this.tn)if(this.on(n,e))return!0;return!1}on(e,n){if(e===void 0||!e.field.isEqual(n.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return n.kind===2===r}_n(e,n){return!!e.field.isEqual(n.fieldPath)&&(n.kind===0&&e.dir==="asc"||n.kind===1&&e.dir==="desc")}}/**
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
 */function Rb(t){var e,n;if(J(t instanceof le||t instanceof ye),t instanceof le){if(t instanceof J1){const i=((n=(e=t.value.arrayValue)===null||e===void 0?void 0:e.values)===null||n===void 0?void 0:n.map(s=>le.create(t.field,"==",s)))||[];return ye.create(i,"or")}return t}const r=t.filters.map(i=>Rb(i));return ye.create(r,t.op)}function kR(t){if(t.getFilters().length===0)return[];const e=Gp(Rb(t));return J(Cb(e)),Kp(e)||Wp(e)?[e]:e.getFilters()}function Kp(t){return t instanceof le}function Wp(t){return t instanceof ye&&mm(t)}function Cb(t){return Kp(t)||Wp(t)||function(n){if(n instanceof ye&&Lp(n)){for(const r of n.getFilters())if(!Kp(r)&&!Wp(r))return!1;return!0}return!1}(t)}function Gp(t){if(J(t instanceof le||t instanceof ye),t instanceof le)return t;if(t.filters.length===1)return Gp(t.filters[0]);const e=t.filters.map(r=>Gp(r));let n=ye.create(e,t.op);return n=uu(n),Cb(n)?n:(J(n instanceof ye),J(Us(n)),J(n.filters.length>1),n.filters.reduce((r,i)=>Em(r,i)))}function Em(t,e){let n;return J(t instanceof le||t instanceof ye),J(e instanceof le||e instanceof ye),n=t instanceof le?e instanceof le?function(i,s){return ye.create([i,s],"and")}(t,e):kx(t,e):e instanceof le?kx(e,t):function(i,s){if(J(i.filters.length>0&&s.filters.length>0),Us(i)&&Us(s))return G1(i,s.getFilters());const o=Lp(i)?i:s,l=Lp(i)?s:i,u=o.filters.map(d=>Em(d,l));return ye.create(u,"or")}(t,e),uu(n)}function kx(t,e){if(Us(e))return G1(e,t.getFilters());{const n=e.filters.map(r=>Em(t,r));return ye.create(n,"or")}}function uu(t){if(J(t instanceof le||t instanceof ye),t instanceof le)return t;const e=t.getFilters();if(e.length===1)return uu(e[0]);if(K1(t))return t;const n=e.map(i=>uu(i)),r=[];return n.forEach(i=>{i instanceof le?r.push(i):i instanceof ye&&(i.op===t.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ye.create(r,t.op)}/**
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
 */class NR{constructor(){this.un=new Im}addToCollectionParentIndex(e,n){return this.un.add(n),V.resolve()}getCollectionParents(e,n){return V.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return V.resolve()}deleteFieldIndex(e,n){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,n){return V.resolve()}getDocumentsMatchingTarget(e,n){return V.resolve(null)}getIndexType(e,n){return V.resolve(0)}getFieldIndexes(e,n){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,n){return V.resolve($t.min())}getMinOffsetFromCollectionGroup(e,n){return V.resolve($t.min())}updateCollectionGroup(e,n,r){return V.resolve()}updateIndexEntries(e,n){return V.resolve()}}class Im{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new ve(me.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ve(me.comparator)).toArray()}}/**
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
 */const Ql=new Uint8Array(0);class PR{constructor(e,n){this.databaseId=n,this.cn=new Im,this.ln=new Yr(r=>Ci(r),(r,i)=>rl(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,n){if(!this.cn.has(n)){const r=n.lastSegment(),i=n.popLast();e.addOnCommittedListener(()=>{this.cn.add(n)});const s={collectionId:r,parent:bt(i)};return Nx(e).put(s)}return V.resolve()}getCollectionParents(e,n){const r=[],i=IDBKeyRange.bound([n,""],[P1(n),""],!1,!0);return Nx(e).U(i).next(s=>{for(const o of s){if(o.collectionId!==n)break;r.push(fn(o.parent))}return r})}addFieldIndex(e,n){const r=jo(e),i=function(l){return{indexId:l.indexId,collectionGroup:l.collectionGroup,fields:l.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(n);delete i.indexId;const s=r.add(i);if(n.indexState){const o=Zi(e);return s.next(l=>{o.put(wx(l,this.uid,n.indexState.sequenceNumber,n.indexState.offset))})}return s.next()}deleteFieldIndex(e,n){const r=jo(e),i=Zi(e),s=Xi(e);return r.delete(n.indexId).next(()=>i.delete(IDBKeyRange.bound([n.indexId],[n.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([n.indexId],[n.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const n=jo(e),r=Xi(e),i=Zi(e);return n.j().next(()=>r.j()).next(()=>i.j())}createTargetIndexes(e,n){return V.forEach(this.hn(n),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new Sx(r).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,n){const r=Xi(e);let i=!0;const s=new Map;return V.forEach(this.hn(n),o=>this.Pn(e,o).next(l=>{i&&(i=!!l),s.set(o,l)})).next(()=>{if(i){let o=se();const l=[];return V.forEach(s,(u,d)=>{U("IndexedDbIndexManager",`Using index ${function(v){return`id=${v.indexId}|cg=${v.collectionGroup}|f=${v.fields.map(N=>`${N.fieldPath}:${N.kind}`).join(",")}`}(u)} to execute ${Ci(n)}`);const p=function(v,N){const O=Dp(N);if(O===void 0)return null;for(const L of ou(v,O.fieldPath))switch(L.op){case"array-contains-any":return L.value.arrayValue.values||[];case"array-contains":return[L.value]}return null}(d,u),f=function(v,N){const O=new Map;for(const L of ai(N))for(const S of ou(v,L.fieldPath))switch(S.op){case"==":case"in":O.set(L.fieldPath.canonicalString(),S.value);break;case"not-in":case"!=":return O.set(L.fieldPath.canonicalString(),S.value),Array.from(O.values())}return null}(d,u),g=function(v,N){const O=[];let L=!0;for(const S of ai(N)){const b=S.kind===0?ox(v,S.fieldPath,v.startAt):ax(v,S.fieldPath,v.startAt);O.push(b.value),L&&(L=b.inclusive)}return new Fs(O,L)}(d,u),k=function(v,N){const O=[];let L=!0;for(const S of ai(N)){const b=S.kind===0?ax(v,S.fieldPath,v.endAt):ox(v,S.fieldPath,v.endAt);O.push(b.value),L&&(L=b.inclusive)}return new Fs(O,L)}(d,u),A=this.In(u,d,g),w=this.In(u,d,k),E=this.Tn(u,d,f),y=this.En(u.indexId,p,A,g.inclusive,w,k.inclusive,E);return V.forEach(y,_=>r.G(_,n.limit).next(v=>{v.forEach(N=>{const O=H.fromSegments(N.documentKey);o.has(O)||(o=o.add(O),l.push(O))})}))}).next(()=>l)}return V.resolve(null)})}hn(e){let n=this.ln.get(e);return n||(e.filters.length===0?n=[e]:n=kR(ye.create(e.filters,"and")).map(r=>Fp(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,n),n)}En(e,n,r,i,s,o,l){const u=(n!=null?n.length:1)*Math.max(r.length,s.length),d=u/(n!=null?n.length:1),p=[];for(let f=0;f<u;++f){const g=n?this.dn(n[f/d]):Ql,k=this.An(e,g,r[f%d],i),A=this.Rn(e,g,s[f%d],o),w=l.map(E=>this.An(e,g,E,!0));p.push(...this.createRange(k,A,w))}return p}An(e,n,r,i){const s=new di(e,H.empty(),n,r);return i?s:s.Zt()}Rn(e,n,r,i){const s=new di(e,H.empty(),n,r);return i?s.Zt():s}Pn(e,n){const r=new Sx(n),i=n.collectionGroup!=null?n.collectionGroup:n.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const l of s)r.rn(l)&&(!o||l.fields.length>o.fields.length)&&(o=l);return o})}getIndexType(e,n){let r=2;const i=this.hn(n);return V.forEach(i,s=>this.Pn(e,s).next(o=>{o?r!==0&&o.fields.length<function(u){let d=new ve(Pe.comparator),p=!1;for(const f of u.filters)for(const g of f.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?p=!0:d=d.add(g.field));for(const f of u.orderBy)f.field.isKeyField()||(d=d.add(f.field));return d.size+(p?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(n)&&i.length>1&&r===2?1:r)}Vn(e,n){const r=new Co;for(const i of ai(e)){const s=n.data.field(i.fieldPath);if(s==null)return null;const o=r.Yt(i.kind);ui.vt.It(s,o)}return r.zt()}dn(e){const n=new Co;return ui.vt.It(e,n.Yt(0)),n.zt()}mn(e,n){const r=new Co;return ui.vt.It(fm(this.databaseId,n),r.Yt(function(s){const o=ai(s);return o.length===0?0:o[o.length-1].kind}(e))),r.zt()}Tn(e,n,r){if(r===null)return[];let i=[];i.push(new Co);let s=0;for(const o of ai(e)){const l=r[s++];for(const u of i)if(this.fn(n,o.fieldPath)&&Ba(l))i=this.gn(i,o,l);else{const d=u.Yt(o.kind);ui.vt.It(l,d)}}return this.pn(i)}In(e,n,r){return this.Tn(e,n,r.position)}pn(e){const n=[];for(let r=0;r<e.length;++r)n[r]=e[r].zt();return n}gn(e,n,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const l of i){const u=new Co;u.seed(l.zt()),ui.vt.It(o,u.Yt(n.kind)),s.push(u)}return s}fn(e,n){return!!e.filters.find(r=>r instanceof le&&r.field.isEqual(n)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,n){const r=jo(e),i=Zi(e);return(n?r.U("collectionGroupIndex",IDBKeyRange.bound(n,n)):r.U()).next(s=>{const o=[];return V.forEach(s,l=>i.get([l.indexId,this.uid]).next(u=>{o.push(function(p,f){const g=f?new La(f.sequenceNumber,new $t(Di(f.readTime),new H(fn(f.documentKey)),f.largestBatchId)):La.empty(),k=p.fields.map(([A,w])=>new gc(Pe.fromServerFormat(A),w));return new ru(p.indexId,p.collectionGroup,k,g)}(l,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(n=>n.length===0?null:(n.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:re(r.collectionGroup,i.collectionGroup)}),n[0].collectionGroup))}updateCollectionGroup(e,n,r){const i=jo(e),s=Zi(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(n,n)).next(l=>V.forEach(l,u=>s.put(wx(u.indexId,this.uid,o,r)))))}updateIndexEntries(e,n){const r=new Map;return V.forEach(n,(i,s)=>{const o=r.get(i.collectionGroup);return(o?V.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(l=>(r.set(i.collectionGroup,l),V.forEach(l,u=>this.wn(e,i,u).next(d=>{const p=this.Sn(s,u);return d.isEqual(p)?V.resolve():this.bn(e,s,u,d,p)}))))})}Dn(e,n,r,i){return Xi(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(r,n.key),documentKey:n.key.path.toArray()})}vn(e,n,r,i){return Xi(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(r,n.key),n.key.path.toArray()])}wn(e,n,r){const i=Xi(e);let s=new ve(ar);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.mn(r,n)])},(o,l)=>{s=s.add(new di(r.indexId,n,l.arrayValue,l.directionalValue))}).next(()=>s)}Sn(e,n){let r=new ve(ar);const i=this.Vn(n,e);if(i==null)return r;const s=Dp(n);if(s!=null){const o=e.data.field(s.fieldPath);if(Ba(o))for(const l of o.arrayValue.values||[])r=r.add(new di(n.indexId,e.key,this.dn(l),i))}else r=r.add(new di(n.indexId,e.key,Ql,i));return r}bn(e,n,r,i,s){U("IndexedDbIndexManager","Updating index entries for document '%s'",n.key);const o=[];return function(u,d,p,f,g){const k=u.getIterator(),A=d.getIterator();let w=Ji(k),E=Ji(A);for(;w||E;){let y=!1,_=!1;if(w&&E){const v=p(w,E);v<0?_=!0:v>0&&(y=!0)}else w!=null?_=!0:y=!0;y?(f(E),E=Ji(A)):_?(g(w),w=Ji(k)):(w=Ji(k),E=Ji(A))}}(i,s,ar,l=>{o.push(this.Dn(e,n,r,l))},l=>{o.push(this.vn(e,n,r,l))}),V.waitFor(o)}yn(e){let n=1;return Zi(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),n=i.sequenceNumber+1}).next(()=>n)}createRange(e,n,r){r=r.sort((o,l)=>ar(o,l)).filter((o,l,u)=>!l||ar(o,u[l-1])!==0);const i=[];i.push(e);for(const o of r){const l=ar(o,e),u=ar(o,n);if(l===0)i[0]=e.Zt();else if(l>0&&u<0)i.push(o),i.push(o.Zt());else if(u>0)break}i.push(n);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const l=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Ql,[]],u=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Ql,[]];s.push(IDBKeyRange.bound(l,u))}return s}Cn(e,n){return ar(e,n)>0}getMinOffsetFromCollectionGroup(e,n){return this.getFieldIndexes(e,n).next(Px)}getMinOffset(e,n){return V.mapArray(this.hn(n),r=>this.Pn(e,r).next(i=>i||Q())).next(Px)}}function Nx(t){return Ye(t,"collectionParents")}function Xi(t){return Ye(t,"indexEntries")}function jo(t){return Ye(t,"indexConfiguration")}function Zi(t){return Ye(t,"indexState")}function Px(t){J(t.length!==0);let e=t[0].indexState.offset,n=e.largestBatchId;for(let r=1;r<t.length;r++){const i=t[r].indexState.offset;cm(i,e)<0&&(e=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new $t(e.readTime,e.documentKey,n)}/**
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
 */const Ax={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class St{constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new St(e,St.DEFAULT_COLLECTION_PERCENTILE,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */function jb(t,e,n){const r=t.store("mutations"),i=t.store("documentMutations"),s=[],o=IDBKeyRange.only(n.batchId);let l=0;const u=r.J({range:o},(p,f,g)=>(l++,g.delete()));s.push(u.next(()=>{J(l===1)}));const d=[];for(const p of n.mutations){const f=O1(e,p.key.path,n.batchId);s.push(i.delete(f)),d.push(p.key)}return V.waitFor(s).next(()=>d)}function du(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw Q();e=t.noDocument}return JSON.stringify(e).length}/**
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
 */St.DEFAULT_COLLECTION_PERCENTILE=10,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,St.DEFAULT=new St(41943040,St.DEFAULT_COLLECTION_PERCENTILE,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),St.DISABLED=new St(-1,0,0);class Zu{constructor(e,n,r,i){this.userId=e,this.serializer=n,this.indexManager=r,this.referenceDelegate=i,this.Fn={}}static lt(e,n,r,i){J(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Zu(s,n,r,i)}checkEmpty(e){let n=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return lr(e).J({index:"userMutationsIndex",range:r},(i,s,o)=>{n=!1,o.done()}).next(()=>n)}addMutationBatch(e,n,r,i){const s=os(e),o=lr(e);return o.add({}).next(l=>{J(typeof l=="number");const u=new xm(l,n,r,i),d=function(k,A,w){const E=w.baseMutations.map(_=>lu(k.ct,_)),y=w.mutations.map(_=>lu(k.ct,_));return{userId:A,batchId:w.batchId,localWriteTimeMs:w.localWriteTime.toMillis(),baseMutations:E,mutations:y}}(this.serializer,this.userId,u),p=[];let f=new ve((g,k)=>re(g.canonicalString(),k.canonicalString()));for(const g of i){const k=O1(this.userId,g.key.path,l);f=f.add(g.key.path.popLast()),p.push(o.put(d)),p.push(s.put(k,hA))}return f.forEach(g=>{p.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Fn[l]=u.keys()}),V.waitFor(p).next(()=>u)})}lookupMutationBatch(e,n){return lr(e).get(n).next(r=>r?(J(r.userId===this.userId),ci(this.serializer,r)):null)}Mn(e,n){return this.Fn[n]?V.resolve(this.Fn[n]):this.lookupMutationBatch(e,n).next(r=>{if(r){const i=r.keys();return this.Fn[n]=i,i}return null})}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return lr(e).J({index:"userMutationsIndex",range:i},(o,l,u)=>{l.userId===this.userId&&(J(l.batchId>=r),s=ci(this.serializer,l)),u.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const n=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return lr(e).J({index:"userMutationsIndex",range:n,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const n=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return lr(e).U("userMutationsIndex",n).next(r=>r.map(i=>ci(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,n){const r=yc(this.userId,n.path),i=IDBKeyRange.lowerBound(r),s=[];return os(e).J({range:i},(o,l,u)=>{const[d,p,f]=o,g=fn(p);if(d===this.userId&&n.path.isEqual(g))return lr(e).get(f).next(k=>{if(!k)throw Q();J(k.userId===this.userId),s.push(ci(this.serializer,k))});u.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new ve(re);const i=[];return n.forEach(s=>{const o=yc(this.userId,s.path),l=IDBKeyRange.lowerBound(o),u=os(e).J({range:l},(d,p,f)=>{const[g,k,A]=d,w=fn(k);g===this.userId&&s.path.isEqual(w)?r=r.add(A):f.done()});i.push(u)}),V.waitFor(i).next(()=>this.xn(e,r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1,s=yc(this.userId,r),o=IDBKeyRange.lowerBound(s);let l=new ve(re);return os(e).J({range:o},(u,d,p)=>{const[f,g,k]=u,A=fn(g);f===this.userId&&r.isPrefixOf(A)?A.length===i&&(l=l.add(k)):p.done()}).next(()=>this.xn(e,l))}xn(e,n){const r=[],i=[];return n.forEach(s=>{i.push(lr(e).get(s).next(o=>{if(o===null)throw Q();J(o.userId===this.userId),r.push(ci(this.serializer,o))}))}),V.waitFor(i).next(()=>r)}removeMutationBatch(e,n){return jb(e._e,this.userId,n).next(r=>(e.addOnCommittedListener(()=>{this.On(n.batchId)}),V.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(n=>{if(!n)return V.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return os(e).J({range:r},(s,o,l)=>{if(s[0]===this.userId){const u=fn(s[1]);i.push(u)}else l.done()}).next(()=>{J(i.length===0)})})}containsKey(e,n){return Db(e,this.userId,n)}Nn(e){return Vb(e).get(this.userId).next(n=>n||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function Db(t,e,n){const r=yc(e,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return os(t).J({range:s,H:!0},(l,u,d)=>{const[p,f,g]=l;p===e&&f===i&&(o=!0),d.done()}).next(()=>o)}function lr(t){return Ye(t,"mutations")}function os(t){return Ye(t,"documentMutations")}function Vb(t){return Ye(t,"mutationQueues")}/**
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
 */class Vi{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Vi(0)}static kn(){return new Vi(-1)}}/**
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
 */class AR{constructor(e,n){this.referenceDelegate=e,this.serializer=n}allocateTargetId(e){return this.qn(e).next(n=>{const r=new Vi(n.highestTargetId);return n.highestTargetId=r.next(),this.Qn(e,n).next(()=>n.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(n=>Z.fromTimestamp(new Ce(n.lastRemoteSnapshotVersion.seconds,n.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(n=>n.highestListenSequenceNumber)}setTargetsMetadata(e,n,r){return this.qn(e).next(i=>(i.highestListenSequenceNumber=n,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),n>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=n),this.Qn(e,i)))}addTargetData(e,n){return this.Kn(e,n).next(()=>this.qn(e).next(r=>(r.targetCount+=1,this.$n(n,r),this.Qn(e,r))))}updateTargetData(e,n){return this.Kn(e,n)}removeTargetData(e,n){return this.removeMatchingKeysForTargetId(e,n.targetId).next(()=>es(e).delete(n.targetId)).next(()=>this.qn(e)).next(r=>(J(r.targetCount>0),r.targetCount-=1,this.Qn(e,r)))}removeTargets(e,n,r){let i=0;const s=[];return es(e).J((o,l)=>{const u=Ko(l);u.sequenceNumber<=n&&r.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))}).next(()=>V.waitFor(s)).next(()=>i)}forEachTarget(e,n){return es(e).J((r,i)=>{const s=Ko(i);n(s)})}qn(e){return Rx(e).get("targetGlobalKey").next(n=>(J(n!==null),n))}Qn(e,n){return Rx(e).put("targetGlobalKey",n)}Kn(e,n){return es(e).put(Pb(this.serializer,n))}$n(e,n){let r=!1;return e.targetId>n.highestTargetId&&(n.highestTargetId=e.targetId,r=!0),e.sequenceNumber>n.highestListenSequenceNumber&&(n.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.qn(e).next(n=>n.targetCount)}getTargetData(e,n){const r=Ci(n),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return es(e).J({range:i,index:"queryTargetsIndex"},(o,l,u)=>{const d=Ko(l);rl(n,d.target)&&(s=d,u.done())}).next(()=>s)}addMatchingKeys(e,n,r){const i=[],s=fr(e);return n.forEach(o=>{const l=bt(o.path);i.push(s.put({targetId:r,path:l})),i.push(this.referenceDelegate.addReference(e,r,o))}),V.waitFor(i)}removeMatchingKeys(e,n,r){const i=fr(e);return V.forEach(n,s=>{const o=bt(s.path);return V.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,n){const r=fr(e),i=IDBKeyRange.bound([n],[n+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,n){const r=IDBKeyRange.bound([n],[n+1],!1,!0),i=fr(e);let s=se();return i.J({range:r,H:!0},(o,l,u)=>{const d=fn(o[1]),p=new H(d);s=s.add(p)}).next(()=>s)}containsKey(e,n){const r=bt(n.path),i=IDBKeyRange.bound([r],[P1(r)],!1,!0);let s=0;return fr(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,l],u,d)=>{o!==0&&(s++,d.done())}).next(()=>s>0)}ot(e,n){return es(e).get(n).next(r=>r?Ko(r):null)}}function es(t){return Ye(t,"targets")}function Rx(t){return Ye(t,"targetGlobal")}function fr(t){return Ye(t,"targetDocuments")}/**
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
 */function Cx([t,e],[n,r]){const i=re(t,n);return i===0?re(e,r):i}class RR{constructor(e){this.Un=e,this.buffer=new ve(Cx),this.Wn=0}Gn(){return++this.Wn}zn(e){const n=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Cx(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class CR{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){U("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Qr(n)?U("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",n):await Gr(n)}await this.Hn(3e5)})}}class jR{constructor(e,n){this.Jn=e,this.params=n}calculateTargetCount(e,n){return this.Jn.Yn(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return V.resolve(Pt.oe);const r=new RR(n);return this.Jn.forEachTarget(e,i=>r.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>r.zn(i))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.Jn.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Jn.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(Ax)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ax):this.Xn(e,n))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,n){let r,i,s,o,l,u,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),i=this.params.maximumSequenceNumbersToCollect):i=f,o=Date.now(),this.nthSequenceNumber(e,i))).next(f=>(r=f,l=Date.now(),this.removeTargets(e,r,n))).next(f=>(s=f,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(f=>(d=Date.now(),ns()<=ae.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${s} targets in `+(u-l)+`ms
	Removed ${f} documents in `+(d-u)+`ms
Total Duration: ${d-p}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:f})))}}function DR(t,e){return new jR(t,e)}/**
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
 */class VR{constructor(e,n){this.db=e,this.garbageCollector=DR(this,n)}Yn(e){const n=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(r=>n.next(i=>r+i))}er(e){let n=0;return this.Zn(e,r=>{n++}).next(()=>n)}forEachTarget(e,n){return this.db.getTargetCache().forEachTarget(e,n)}Zn(e,n){return this.tr(e,(r,i)=>n(i))}addReference(e,n,r){return Yl(e,r)}removeReference(e,n,r){return Yl(e,r)}removeTargets(e,n,r){return this.db.getTargetCache().removeTargets(e,n,r)}markPotentiallyOrphaned(e,n){return Yl(e,n)}nr(e,n){return function(i,s){let o=!1;return Vb(i).Y(l=>Db(i,l,s).next(u=>(u&&(o=!0),V.resolve(!u)))).next(()=>o)}(e,n)}removeOrphanedDocuments(e,n){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,(o,l)=>{if(l<=n){const u=this.nr(e,o).next(d=>{if(!d)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,Z.min()),fr(e).delete(function(f){return[0,bt(f.path)]}(o))))});i.push(u)}}).next(()=>V.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,n){return Yl(e,n)}tr(e,n){const r=fr(e);let i,s=Pt.oe;return r.J({index:"documentTargetsIndex"},([o,l],{path:u,sequenceNumber:d})=>{o===0?(s!==Pt.oe&&n(new H(fn(i)),s),s=d,i=u):s=Pt.oe}).next(()=>{s!==Pt.oe&&n(new H(fn(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Yl(t,e){return fr(t).put(function(r,i){return{targetId:0,path:bt(r.path),sequenceNumber:i}}(e,t.currentSequenceNumber))}/**
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
 */class Ob{constructor(){this.changes=new Yr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Oe.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?V.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class OR{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,n,r){return ri(e).put(r)}removeEntry(e,n,r){return ri(e).delete(function(s,o){const l=s.path.toArray();return[l.slice(0,l.length-2),l[l.length-2],cu(o),l[l.length-1]]}(n,r))}updateMetadata(e,n){return this.getMetadata(e).next(r=>(r.byteSize+=n,this.rr(e,r)))}getEntry(e,n){let r=Oe.newInvalidDocument(n);return ri(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Do(n))},(i,s)=>{r=this.ir(n,s)}).next(()=>r)}sr(e,n){let r={size:0,document:Oe.newInvalidDocument(n)};return ri(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Do(n))},(i,s)=>{r={document:this.ir(n,s),size:du(s)}}).next(()=>r)}getEntries(e,n){let r=Lt();return this._r(e,n,(i,s)=>{const o=this.ir(i,s);r=r.insert(i,o)}).next(()=>r)}ar(e,n){let r=Lt(),i=new we(H.comparator);return this._r(e,n,(s,o)=>{const l=this.ir(s,o);r=r.insert(s,l),i=i.insert(s,du(o))}).next(()=>({documents:r,ur:i}))}_r(e,n,r){if(n.isEmpty())return V.resolve();let i=new ve(Vx);n.forEach(u=>i=i.add(u));const s=IDBKeyRange.bound(Do(i.first()),Do(i.last())),o=i.getIterator();let l=o.getNext();return ri(e).J({index:"documentKeyIndex",range:s},(u,d,p)=>{const f=H.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;l&&Vx(l,f)<0;)r(l,null),l=o.getNext();l&&l.isEqual(f)&&(r(l,d),l=o.hasNext()?o.getNext():null),l?p.$(Do(l)):p.done()}).next(()=>{for(;l;)r(l,null),l=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,n,r,i,s){const o=n.path,l=[o.popLast().toArray(),o.lastSegment(),cu(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return ri(e).U(IDBKeyRange.bound(l,u,!0)).next(d=>{s==null||s.incrementDocumentReadCount(d.length);let p=Lt();for(const f of d){const g=this.ir(H.fromSegments(f.prefixPath.concat(f.collectionGroup,f.documentId)),f);g.isFoundDocument()&&(il(n,g)||i.has(g.key))&&(p=p.insert(g.key,g))}return p})}getAllFromCollectionGroup(e,n,r,i){let s=Lt();const o=Dx(n,r),l=Dx(n,$t.max());return ri(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,l,!0)},(u,d,p)=>{const f=this.ir(H.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);s=s.insert(f.key,f),s.size===i&&p.done()}).next(()=>s)}newChangeBuffer(e){return new MR(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(n=>n.byteSize)}getMetadata(e){return jx(e).get("remoteDocumentGlobalKey").next(n=>(J(!!n),n))}rr(e,n){return jx(e).put("remoteDocumentGlobalKey",n)}ir(e,n){if(n){const r=_R(this.serializer,n);if(!(r.isNoDocument()&&r.version.isEqual(Z.min())))return r}return Oe.newInvalidDocument(e)}}function Mb(t){return new OR(t)}class MR extends Ob{constructor(e,n){super(),this.cr=e,this.trackRemovals=n,this.lr=new Yr(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const n=[];let r=0,i=new ve((s,o)=>re(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const l=this.lr.get(s);if(n.push(this.cr.removeEntry(e,s,l.readTime)),o.isValidDocument()){const u=xx(this.cr.serializer,o);i=i.add(s.path.popLast());const d=du(u);r+=d-l.size,n.push(this.cr.addEntry(e,s,u))}else if(r-=l.size,this.trackRemovals){const u=xx(this.cr.serializer,o.convertToNoDocument(Z.min()));n.push(this.cr.addEntry(e,s,u))}}),i.forEach(s=>{n.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),n.push(this.cr.updateMetadata(e,r)),V.waitFor(n)}getFromCache(e,n){return this.cr.sr(e,n).next(r=>(this.lr.set(n,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,n){return this.cr.ar(e,n).next(({documents:r,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function jx(t){return Ye(t,"remoteDocumentGlobal")}function ri(t){return Ye(t,"remoteDocumentsV14")}function Do(t){const e=t.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Dx(t,e){const n=e.documentKey.path.toArray();return[t,cu(e.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function Vx(t,e){const n=t.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<n.length-2&&s<r.length-2;++s)if(i=re(n[s],r[s]),i)return i;return i=re(n.length,r.length),i||(i=re(n[n.length-2],r[r.length-2]),i||re(n[n.length-1],r[r.length-1]))}/**
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
 */class LR{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class Lb{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&aa(r.mutation,i,At.empty(),Ce.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,n,r=se()){const i=mn();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=qo();return s.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=mn();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,se()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,i){let s=Lt();const o=oa(),l=function(){return oa()}();return n.forEach((u,d)=>{const p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof er)?s=s.insert(d.key,d):p!==void 0?(o.set(d.key,p.mutation.getFieldMask()),aa(p.mutation,d,p.mutation.getFieldMask(),Ce.now())):o.set(d.key,At.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((d,p)=>o.set(d,p)),n.forEach((d,p)=>{var f;return l.set(d,new LR(p,(f=o.get(d))!==null&&f!==void 0?f:null))}),l))}recalculateAndSaveOverlays(e,n){const r=oa();let i=new we((o,l)=>o-l),s=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const d=n.get(u);if(d===null)return;let p=r.get(u)||At.empty();p=l.applyToLocalView(d,p),r.set(u,p);const f=(i.get(l.batchId)||se()).add(u);i=i.insert(l.batchId,f)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,p=u.value,f=ib();p.forEach(g=>{if(!s.has(g)){const k=db(n.get(g),r.get(g));k!==null&&f.set(g,k),s=s.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,f))}return V.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return H.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):BA(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):V.resolve(mn());let l=-1,u=s;return o.next(d=>V.forEach(d,(p,f)=>(l<f.largestBatchId&&(l=f.largestBatchId),s.get(p)?V.resolve():this.remoteDocumentCache.getEntry(e,p).next(g=>{u=u.insert(p,g)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,u,d,se())).next(p=>({batchId:l,changes:rb(p)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new H(n)).next(r=>{let i=qo();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=qo();return this.indexManager.getCollectionParents(e,s).next(l=>V.forEach(l,u=>{const d=function(f,g){return new Wu(g,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((f,g)=>{o=o.insert(f,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,d)=>{const p=d.getKey();o.get(p)===null&&(o=o.insert(p,Oe.newInvalidDocument(p)))});let l=qo();return o.forEach((u,d)=>{const p=s.get(u);p!==void 0&&aa(p.mutation,d,At.empty(),Ce.now()),il(n,d)&&(l=l.insert(u,d))}),l})}}/**
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
 */class zR{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return V.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:Tt(i.createTime)}}(n)),V.resolve()}getNamedQuery(e,n){return V.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:Ab(i.bundledQuery),readTime:Tt(i.readTime)}}(n)),V.resolve()}}/**
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
 */class FR{constructor(){this.overlays=new we(H.comparator),this.Ir=new Map}getOverlay(e,n){return V.resolve(this.overlays.get(n))}getOverlays(e,n){const r=mn();return V.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),V.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),V.resolve()}getOverlaysForCollection(e,n,r){const i=mn(),s=n.length+1,o=new H(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!n.isPrefixOf(d.path))break;d.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return V.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new we((d,p)=>d-p);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===n&&d.largestBatchId>r){let p=s.get(d.largestBatchId);p===null&&(p=mn(),s=s.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const l=mn(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,p)=>l.set(d,p)),!(l.size()>=i)););return V.resolve(l)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new wm(n,r));let s=this.Ir.get(n);s===void 0&&(s=se(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
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
 */class UR{constructor(){this.sessionToken=$e.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,V.resolve()}}/**
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
 */class Sm{constructor(){this.Tr=new ve(Je.Er),this.dr=new ve(Je.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Je(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Je(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new H(new me([])),r=new Je(n,e),i=new Je(n,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new H(new me([])),r=new Je(n,e),i=new Je(n,e+1);let s=se();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new Je(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Je{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return H.comparator(e.key,n.key)||re(e.wr,n.wr)}static Ar(e,n){return re(e.wr,n.wr)||H.comparator(e.key,n.key)}}/**
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
 */class BR{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new ve(Je.Er)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new xm(s,n,r,i);this.mutationQueue.push(o);for(const l of i)this.br=this.br.add(new Je(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return V.resolve(o)}lookupMutationBatch(e,n){return V.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return V.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Je(n,0),i=new Je(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const l=this.Dr(o.wr);s.push(l)}),V.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new ve(re);return n.forEach(i=>{const s=new Je(i,0),o=new Je(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],l=>{r=r.add(l.wr)})}),V.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;H.isDocumentKey(s)||(s=s.child(""));const o=new Je(new H(s),0);let l=new ve(re);return this.br.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(l=l.add(u.wr)),!0)},o),V.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){J(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return V.forEach(n.mutations,i=>{const s=new Je(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Je(n,0),i=this.br.firstAfterOrEqual(r);return V.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class $R{constructor(e){this.Mr=e,this.docs=function(){return new we(H.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return V.resolve(r?r.document.mutableCopy():Oe.newInvalidDocument(n))}getEntries(e,n){let r=Lt();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Oe.newInvalidDocument(i))}),V.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=Lt();const o=n.path,l=new H(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:p}}=u.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||cm(R1(p),r)<=0||(i.has(p.key)||il(n,p))&&(s=s.insert(p.key,p.mutableCopy()))}return V.resolve(s)}getAllFromCollectionGroup(e,n,r,i){Q()}Or(e,n){return V.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new qR(this)}getSize(e){return V.resolve(this.size)}}class qR extends Ob{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),V.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
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
 */class HR{constructor(e){this.persistence=e,this.Nr=new Yr(n=>Ci(n),rl),this.lastRemoteSnapshotVersion=Z.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Sm,this.targetCount=0,this.kr=Vi.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),V.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Vi(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,V.resolve()}updateTargetData(e,n){return this.Kn(n),V.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),V.waitFor(s).next(()=>i)}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return V.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),V.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),V.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),V.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return V.resolve(r)}containsKey(e,n){return V.resolve(this.Br.containsKey(n))}}/**
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
 */class zb{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Pt(0),this.Kr=!1,this.Kr=!0,this.$r=new UR,this.referenceDelegate=e(this),this.Ur=new HR(this),this.indexManager=new NR,this.remoteDocumentCache=function(i){return new $R(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Nb(n),this.Gr=new zR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new FR,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new BR(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){U("MemoryPersistence","Starting transaction:",e);const i=new KR(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return V.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class KR extends j1{constructor(e){super(),this.currentSequenceNumber=e}}class ed{constructor(e){this.persistence=e,this.Jr=new Sm,this.Yr=null}static Zr(e){return new ed(e)}get Xr(){if(this.Yr)return this.Yr;throw Q()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),V.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),V.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),V.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.Xr,r=>{const i=H.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,Z.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return V.or([()=>V.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
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
 */class WR{constructor(e){this.serializer=e}O(e,n,r,i){const s=new qu("createOrUpgrade",n);r<1&&i>=1&&(function(u){u.createObjectStore("owner")}(e),function(u){u.createObjectStore("mutationQueues",{keyPath:"userId"}),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Qv,{unique:!0}),u.createObjectStore("documentMutations")}(e),Ox(e),function(u){u.createObjectStore("remoteDocuments")}(e));let o=V.resolve();return r<3&&i>=3&&(r!==0&&(function(u){u.deleteObjectStore("targetDocuments"),u.deleteObjectStore("targets"),u.deleteObjectStore("targetGlobal")}(e),Ox(e)),o=o.next(()=>function(u){const d=u.store("targetGlobal"),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Z.min().toTimestamp(),targetCount:0};return d.put("targetGlobalKey",p)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(u,d){return d.store("mutations").U().next(p=>{u.deleteObjectStore("mutations"),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Qv,{unique:!0});const f=d.store("mutations"),g=p.map(k=>f.put(k));return V.waitFor(g)})}(e,s))),o=o.next(()=>{(function(u){u.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.ni(s))),r<6&&i>=6&&(o=o.next(()=>(function(u){u.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),r<7&&i>=7&&(o=o.next(()=>this.ii(s))),r<8&&i>=8&&(o=o.next(()=>this.si(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.oi(s))),r<11&&i>=11&&(o=o.next(()=>{(function(u){u.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(u){u.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(u){const d=u.createObjectStore("documentOverlays",{keyPath:EA});d.createIndex("collectionPathOverlayIndex",IA,{unique:!1}),d.createIndex("collectionGroupOverlayIndex",SA,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(u){const d=u.createObjectStore("remoteDocumentsV14",{keyPath:pA});d.createIndex("documentKeyIndex",fA),d.createIndex("collectionGroupIndex",mA)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),r<15&&i>=15&&(o=o.next(()=>function(u){u.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),u.createObjectStore("indexState",{keyPath:_A}).createIndex("sequenceNumberIndex",wA,{unique:!1}),u.createObjectStore("indexEntries",{keyPath:bA}).createIndex("documentKeyIndex",TA,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{n.objectStore("indexState").clear()}).next(()=>{n.objectStore("indexEntries").clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(u){u.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let n=0;return e.store("remoteDocuments").J((r,i)=>{n+=du(i)}).next(()=>{const r={byteSize:n};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}ni(e){const n=e.store("mutationQueues"),r=e.store("mutations");return n.U().next(i=>V.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next(l=>V.forEach(l,u=>{J(u.userId===s.userId);const d=ci(this.serializer,u);return jb(e,s.userId,d).next(()=>{})}))}))}ii(e){const n=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return r.J((o,l)=>{const u=new me(o),d=function(f){return[0,bt(f)]}(u);s.push(n.get(d).next(p=>p?V.resolve():(f=>n.put({targetId:0,path:bt(f),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>V.waitFor(s))})}si(e,n){e.createObjectStore("collectionParents",{keyPath:xA});const r=n.store("collectionParents"),i=new Im,s=o=>{if(i.add(o)){const l=o.lastSegment(),u=o.popLast();return r.put({collectionId:l,parent:bt(u)})}};return n.store("remoteDocuments").J({H:!0},(o,l)=>{const u=new me(o);return s(u.popLast())}).next(()=>n.store("documentMutations").J({H:!0},([o,l,u],d)=>{const p=fn(l);return s(p.popLast())}))}oi(e){const n=e.store("targets");return n.J((r,i)=>{const s=Ko(i),o=Pb(this.serializer,s);return n.put(o)})}_i(e,n){const r=n.store("remoteDocuments"),i=[];return r.J((s,o)=>{const l=n.store("remoteDocumentsV14"),u=function(f){return f.document?new H(me.fromString(f.document.name).popFirst(5)):f.noDocument?H.fromSegments(f.noDocument.path):f.unknownDocument?H.fromSegments(f.unknownDocument.path):Q()}(o).path.toArray(),d={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(l.put(d))}).next(()=>V.waitFor(i))}ai(e,n){const r=n.store("mutations"),i=Mb(this.serializer),s=new zb(ed.Zr,this.serializer.ct);return r.U().next(o=>{const l=new Map;return o.forEach(u=>{var d;let p=(d=l.get(u.userId))!==null&&d!==void 0?d:se();ci(this.serializer,u).keys().forEach(f=>p=p.add(f)),l.set(u.userId,p)}),V.forEach(l,(u,d)=>{const p=new ht(d),f=Xu.lt(this.serializer,p),g=s.getIndexManager(p),k=Zu.lt(p,this.serializer,g,s.referenceDelegate);return new Lb(i,k,f,g).recalculateAndSaveOverlaysForDocumentKeys(new Vp(n,Pt.oe),u).next()})})}}function Ox(t){t.createObjectStore("targetDocuments",{keyPath:yA}).createIndex("documentTargetsIndex",vA,{unique:!0}),t.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",gA,{unique:!0}),t.createObjectStore("targetGlobal")}const gh="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class km{constructor(e,n,r,i,s,o,l,u,d,p,f=17){if(this.allowTabSynchronization=e,this.persistenceKey=n,this.clientId=r,this.ui=s,this.window=o,this.document=l,this.ci=d,this.li=p,this.hi=f,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=g=>Promise.resolve(),!km.D())throw new K(F.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new VR(this,i),this.Ai=n+"main",this.serializer=new Nb(u),this.Ri=new Or(this.Ai,this.hi,new WR(this.serializer)),this.$r=new bR,this.Ur=new AR(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Mb(this.serializer),this.Gr=new wR,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,p===!1&&Be("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new K(F.FAILED_PRECONDITION,gh);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new Pt(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async n=>{if(this.started)return e(n)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async n=>{n.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Jl(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(n=>{n||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(n=>this.isPrimary&&!n?this.bi(e).next(()=>!1):!!n&&this.Di(e).next(()=>!0))).catch(e=>{if(Qr(e))return U("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return U("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return Vo(e).get("owner").next(n=>V.resolve(this.vi(n)))}Ci(e){return Jl(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",n=>{const r=Ye(n,"clientMetadata");return r.U().next(i=>{const s=this.xi(i,18e5),o=i.filter(l=>s.indexOf(l)===-1);return V.forEach(o,l=>r.delete(l.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const n of e)this.Vi.removeItem(this.Oi(n.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?V.resolve(!0):Vo(e).get("owner").next(n=>{if(n!==null&&this.Mi(n.leaseTimestampMs,5e3)&&!this.Ni(n.ownerId)){if(this.vi(n)&&this.networkEnabled)return!0;if(!this.vi(n)){if(!n.allowTabSynchronization)throw new K(F.FAILED_PRECONDITION,gh);return!1}}return!(!this.networkEnabled||!this.inForeground)||Jl(e).U().next(r=>this.xi(r,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,l=this.networkEnabled===i.networkEnabled;if(s||o&&l)return!0}return!1})===void 0)}).next(n=>(this.isPrimary!==n&&U("IndexedDbPersistence",`Client ${n?"is":"is not"} eligible for a primary lease.`),n))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const n=new Vp(e,Pt.oe);return this.bi(n).next(()=>this.Ci(n))}),this.Ri.close(),this.qi()}xi(e,n){return e.filter(r=>this.Mi(r.updateTimeMs,n)&&!this.Ni(r.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>Jl(e).U().next(n=>this.xi(n,18e5).map(r=>r.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,n){return Zu.lt(e,this.serializer,n,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new PR(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Xu.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,n,r){U("IndexedDbPersistence","Starting transaction:",e);const i=n==="readonly"?"readonly":"readwrite",s=function(u){return u===17?PA:u===16?NA:u===15?dm:u===14?z1:u===13?L1:u===12?kA:u===11?M1:void Q()}(this.hi);let o;return this.Ri.runTransaction(e,i,s,l=>(o=new Vp(l,this.Qr?this.Qr.next():Pt.oe),n==="readwrite-primary"?this.wi(o).next(u=>!!u||this.Si(o)).next(u=>{if(!u)throw Be(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new K(F.FAILED_PRECONDITION,C1);return r(o)}).next(u=>this.Di(o).next(()=>u)):this.Ki(o).next(()=>r(o)))).then(l=>(o.raiseOnCommittedEvent(),l))}Ki(e){return Vo(e).get("owner").next(n=>{if(n!==null&&this.Mi(n.leaseTimestampMs,5e3)&&!this.Ni(n.ownerId)&&!this.vi(n)&&!(this.li||this.allowTabSynchronization&&n.allowTabSynchronization))throw new K(F.FAILED_PRECONDITION,gh)})}Di(e){const n={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Vo(e).put("owner",n)}static D(){return Or.D()}bi(e){const n=Vo(e);return n.get("owner").next(r=>this.vi(r)?(U("IndexedDbPersistence","Releasing primary lease."),n.delete("owner")):V.resolve())}Mi(e,n){const r=Date.now();return!(e<r-n)&&(!(e>r)||(Be(`Detected an update time that is in the future: ${e} > ${r}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const n=/(?:Version|Mobile)\/1[456]/;f1()&&(navigator.appVersion.match(n)||navigator.userAgent.match(n))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var n;try{const r=((n=this.Vi)===null||n===void 0?void 0:n.getItem(this.Oi(e)))!==null;return U("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Be("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){Be("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Vo(t){return Ye(t,"owner")}function Jl(t){return Ye(t,"clientMetadata")}function Fb(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"}/**
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
 */class Nm{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=se(),i=se();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Nm(e,n.fromCache,r,i)}}/**
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
 */class GR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Ub{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return f1()?8:D1(Qe())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new GR;return this.Xi(e,n,o).next(l=>{if(s.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(ns()<=ae.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",rs(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),V.resolve()):(ns()<=ae.DEBUG&&U("QueryEngine","Query:",rs(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(ns()<=ae.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",rs(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ut(n))):V.resolve())}Yi(e,n){if(lx(n))return V.resolve(null);let r=Ut(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=Up(n,null,"F"),r=Ut(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=se(...s);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.ts(n,l);return this.ns(n,d,o,u.readTime)?this.Yi(e,Up(n,null,"F")):this.rs(e,d,n,u)}))})))}Zi(e,n,r,i){return lx(n)||i.isEqual(Z.min())?V.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(n,s);return this.ns(n,o,r,i)?V.resolve(null):(ns()<=ae.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),rs(n)),this.rs(e,o,n,A1(i,-1)).next(l=>l))})}ts(e,n){let r=new ve(tb(e));return n.forEach((i,s)=>{il(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return ns()<=ae.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",rs(n)),this.Ji.getDocumentsMatchingQuery(e,n,$t.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
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
 */class QR{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new we(re),this._s=new Yr(s=>Ci(s),rl),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Lb(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function Bb(t,e,n,r){return new QR(t,e,n,r)}async function $b(t,e){const n=Y(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],l=[];let u=se();for(const d of i){o.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}for(const d of s){l.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}return n.localDocuments.getDocuments(r,u).next(d=>({hs:d,removedBatchIds:o,addedBatchIds:l}))})})}function YR(t,e){const n=Y(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,d,p){const f=d.batch,g=f.keys();let k=V.resolve();return g.forEach(A=>{k=k.next(()=>p.getEntry(u,A)).next(w=>{const E=d.docVersions.get(A);J(E!==null),w.version.compareTo(E)<0&&(f.applyToRemoteDocument(w,d),w.isValidDocument()&&(w.setReadTime(d.commitVersion),p.addEntry(w)))})}),k.next(()=>l.mutationQueue.removeMutationBatch(u,f))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=se();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function qb(t){const e=Y(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function JR(t,e){const n=Y(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const l=[];e.targetChanges.forEach((p,f)=>{const g=i.get(f);if(!g)return;l.push(n.Ur.removeMatchingKeys(s,p.removedDocuments,f).next(()=>n.Ur.addMatchingKeys(s,p.addedDocuments,f)));let k=g.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(f)!==null?k=k.withResumeToken($e.EMPTY_BYTE_STRING,Z.min()).withLastLimboFreeSnapshotVersion(Z.min()):p.resumeToken.approximateByteSize()>0&&(k=k.withResumeToken(p.resumeToken,r)),i=i.insert(f,k),function(w,E,y){return w.resumeToken.approximateByteSize()===0||E.snapshotVersion.toMicroseconds()-w.snapshotVersion.toMicroseconds()>=3e8?!0:y.addedDocuments.size+y.modifiedDocuments.size+y.removedDocuments.size>0}(g,k,p)&&l.push(n.Ur.updateTargetData(s,k))});let u=Lt(),d=se();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,p))}),l.push(XR(s,o,e.documentUpdates).next(p=>{u=p.Ps,d=p.Is})),!r.isEqual(Z.min())){const p=n.Ur.getLastRemoteSnapshotVersion(s).next(f=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(p)}return V.waitFor(l).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,d)).next(()=>u)}).then(s=>(n.os=i,s))}function XR(t,e,n){let r=se(),i=se();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=Lt();return n.forEach((l,u)=>{const d=s.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(Z.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):U("LocalStore","Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{Ps:o,Is:i}})}function ZR(t,e){const n=Y(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function hu(t,e){const n=Y(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,V.resolve(i)):n.Ur.allocateTargetId(r).next(o=>(i=new Ln(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Ks(t,e,n){const r=Y(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Qr(o))throw o;U("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function Qp(t,e,n){const r=Y(t);let i=Z.min(),s=se();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,d,p){const f=Y(u),g=f._s.get(p);return g!==void 0?V.resolve(f.os.get(g)):f.Ur.getTargetData(d,p)}(r,o,Ut(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(u=>{s=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?i:Z.min(),n?s:se())).next(l=>(Wb(r,eb(e),l),{documents:l,Ts:s})))}function Hb(t,e){const n=Y(t),r=Y(n.Ur),i=n.os.get(e);return i?Promise.resolve(i.target):n.persistence.runTransaction("Get target data","readonly",s=>r.ot(s,e).next(o=>o?o.target:null))}function Kb(t,e){const n=Y(t),r=n.us.get(e)||Z.min();return n.persistence.runTransaction("Get new document changes","readonly",i=>n.cs.getAllFromCollectionGroup(i,e,A1(r,-1),Number.MAX_SAFE_INTEGER)).then(i=>(Wb(n,e,i),i))}function Wb(t,e,n){let r=t.us.get(e)||Z.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}function Mx(t,e){return`firestore_clients_${t}_${e}`}function Lx(t,e,n){let r=`firestore_mutations_${t}_${n}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function yh(t,e){return`firestore_targets_${t}_${e}`}class pu{constructor(e,n,r,i){this.user=e,this.batchId=n,this.state=r,this.error=i}static Rs(e,n,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new K(i.error.code,i.error.message))),o?new pu(e,n,i.state,s):(Be("SharedClientState",`Failed to parse mutation state for ID '${n}': ${r}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class la{constructor(e,n,r){this.targetId=e,this.state=n,this.error=r}static Rs(e,n){const r=JSON.parse(n);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new K(r.error.code,r.error.message))),s?new la(e,r.state,i):(Be("SharedClientState",`Failed to parse target state for ID '${e}': ${n}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class fu{constructor(e,n){this.clientId=e,this.activeTargetIds=n}static Rs(e,n){const r=JSON.parse(n);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=gm();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=V1(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new fu(e,s):(Be("SharedClientState",`Failed to parse client data for instance '${e}': ${n}`),null)}}class Pm{constructor(e,n){this.clientId=e,this.onlineState=n}static Rs(e){const n=JSON.parse(e);return typeof n=="object"&&["Unknown","Online","Offline"].indexOf(n.onlineState)!==-1&&typeof n.clientId=="string"?new Pm(n.clientId,n.onlineState):(Be("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Yp{constructor(){this.activeTargetIds=gm()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class vh{constructor(e,n,r,i,s){this.window=e,this.ui=n,this.persistenceKey=r,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new we(re),this.started=!1,this.bs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=Mx(this.persistenceKey,this.ps),this.vs=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Yp),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.Os=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const r of e){if(r===this.ps)continue;const i=this.getItem(Mx(this.persistenceKey,r));if(i){const s=fu.Rs(r,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const n=this.storage.getItem(this.xs);if(n){const r=this.Ls(n);r&&this.Bs(r)}for(const r of this.bs)this.ws(r);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let n=!1;return this.Ss.forEach((r,i)=>{i.activeTargetIds.has(e)&&(n=!0)}),n}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,n,r){this.qs(e,n,r),this.Qs(e)}addLocalQueryTarget(e,n=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(yh(this.persistenceKey,e));if(i){const s=la.Rs(e,i);s&&(r=s.state)}}return n&&this.Ks.fs(e),this.Ns(),r}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(yh(this.persistenceKey,e))}updateQueryState(e,n,r){this.$s(e,n,r)}handleUserChange(e,n,r){n.forEach(i=>{this.Qs(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const n=this.storage.getItem(e);return U("SharedClientState","READ",e,n),n}setItem(e,n){U("SharedClientState","SET",e,n),this.storage.setItem(e,n)}removeItem(e){U("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const n=e;if(n.storageArea===this.storage){if(U("SharedClientState","EVENT",n.key,n.newValue),n.key===this.Ds)return void Be("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(n.key!==null){if(this.Cs.test(n.key)){if(n.newValue==null){const r=this.Gs(n.key);return this.zs(r,null)}{const r=this.js(n.key,n.newValue);if(r)return this.zs(r.clientId,r)}}else if(this.Fs.test(n.key)){if(n.newValue!==null){const r=this.Hs(n.key,n.newValue);if(r)return this.Js(r)}}else if(this.Ms.test(n.key)){if(n.newValue!==null){const r=this.Ys(n.key,n.newValue);if(r)return this.Zs(r)}}else if(n.key===this.xs){if(n.newValue!==null){const r=this.Ls(n.newValue);if(r)return this.Bs(r)}}else if(n.key===this.vs){const r=function(s){let o=Pt.oe;if(s!=null)try{const l=JSON.parse(s);J(typeof l=="number"),o=l}catch(l){Be("SharedClientState","Failed to read sequence number from WebStorage",l)}return o}(n.newValue);r!==Pt.oe&&this.sequenceNumberHandler(r)}else if(n.key===this.Os){const r=this.Xs(n.newValue);await Promise.all(r.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(n)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,n,r){const i=new pu(this.currentUser,e,n,r),s=Lx(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const n=Lx(this.persistenceKey,this.currentUser,e);this.removeItem(n)}Us(e){const n={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(n))}$s(e,n,r){const i=yh(this.persistenceKey,e),s=new la(e,n,r);this.setItem(i,s.Vs())}Ws(e){const n=JSON.stringify(Array.from(e));this.setItem(this.Os,n)}Gs(e){const n=this.Cs.exec(e);return n?n[1]:null}js(e,n){const r=this.Gs(e);return fu.Rs(r,n)}Hs(e,n){const r=this.Fs.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return pu.Rs(new ht(s),i,n)}Ys(e,n){const r=this.Ms.exec(e),i=Number(r[1]);return la.Rs(i,n)}Ls(e){return Pm.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);U("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,n){const r=n?this.Ss.insert(e,n):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(r),o=[],l=[];return s.forEach(u=>{i.has(u)||o.push(u)}),i.forEach(u=>{s.has(u)||l.push(u)}),this.syncEngine.io(o,l).then(()=>{this.Ss=r})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let n=gm();return e.forEach((r,i)=>{n=n.unionWith(i.activeTargetIds)}),n}}class Gb{constructor(){this.so=new Yp,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Yp,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class eC{_o(e){}shutdown(){}}/**
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
 */class zx{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){U("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){U("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Xl=null;function xh(){return Xl===null?Xl=function(){return 268435456+Math.round(2147483648*Math.random())}():Xl++,"0x"+Xl.toString(16)}/**
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
 */const tC={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class nC{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const ut="WebChannelConnection";class rC extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,o){const l=xh(),u=this.xo(n,r.toUriEncodedString());U("RestConnection",`Sending RPC '${n}' ${l}:`,u,i);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,s,o),this.No(n,u,d,i).then(p=>(U("RestConnection",`Received RPC '${n}' ${l}: `,p),p),p=>{throw Oa("RestConnection",`RPC '${n}' ${l} failed with error: `,p,"url: ",u,"request:",i),p})}Lo(n,r,i,s,o,l){return this.Mo(n,r,i,s,o)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ro}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>n[o]=s),i&&i.headers.forEach((s,o)=>n[o]=s)}xo(n,r){const i=tC[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=xh();return new Promise((o,l)=>{const u=new T1;u.setWithCredentials(!0),u.listenOnce(E1.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case mc.NO_ERROR:const p=u.getResponseJson();U(ut,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),o(p);break;case mc.TIMEOUT:U(ut,`RPC '${e}' ${s} timed out`),l(new K(F.DEADLINE_EXCEEDED,"Request time out"));break;case mc.HTTP_ERROR:const f=u.getStatus();if(U(ut,`RPC '${e}' ${s} failed with status:`,f,"response text:",u.getResponseText()),f>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const k=g==null?void 0:g.error;if(k&&k.status&&k.message){const A=function(E){const y=E.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf(y)>=0?y:F.UNKNOWN}(k.status);l(new K(A,k.message))}else l(new K(F.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new K(F.UNAVAILABLE,"Connection failed."));break;default:Q()}}finally{U(ut,`RPC '${e}' ${s} completed.`)}});const d=JSON.stringify(i);U(ut,`RPC '${e}' ${s} sending request:`,i),u.send(n,"POST",d,r,15)})}Bo(e,n,r){const i=xh(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=k1(),l=S1(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const p=s.join("");U(ut,`Creating RPC '${e}' stream ${i}: ${p}`,u);const f=o.createWebChannel(p,u);let g=!1,k=!1;const A=new nC({Io:E=>{k?U(ut,`Not sending because RPC '${e}' stream ${i} is closed:`,E):(g||(U(ut,`Opening RPC '${e}' stream ${i} transport.`),f.open(),g=!0),U(ut,`RPC '${e}' stream ${i} sending:`,E),f.send(E))},To:()=>f.close()}),w=(E,y,_)=>{E.listen(y,v=>{try{_(v)}catch(N){setTimeout(()=>{throw N},0)}})};return w(f,$o.EventType.OPEN,()=>{k||(U(ut,`RPC '${e}' stream ${i} transport opened.`),A.yo())}),w(f,$o.EventType.CLOSE,()=>{k||(k=!0,U(ut,`RPC '${e}' stream ${i} transport closed`),A.So())}),w(f,$o.EventType.ERROR,E=>{k||(k=!0,Oa(ut,`RPC '${e}' stream ${i} transport errored:`,E),A.So(new K(F.UNAVAILABLE,"The operation could not be completed")))}),w(f,$o.EventType.MESSAGE,E=>{var y;if(!k){const _=E.data[0];J(!!_);const v=_,N=v.error||((y=v[0])===null||y===void 0?void 0:y.error);if(N){U(ut,`RPC '${e}' stream ${i} received error:`,N);const O=N.status;let L=function(x){const I=He[x];if(I!==void 0)return fb(I)}(O),S=N.message;L===void 0&&(L=F.INTERNAL,S="Unknown error status: "+O+" with message "+N.message),k=!0,A.So(new K(L,S)),f.close()}else U(ut,`RPC '${e}' stream ${i} received:`,_),A.bo(_)}}),w(l,I1.STAT_EVENT,E=>{E.stat===jp.PROXY?U(ut,`RPC '${e}' stream ${i} detected buffering proxy`):E.stat===jp.NOPROXY&&U(ut,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{A.wo()},0),A}}/**
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
 */function Qb(){return typeof window<"u"?window:null}function bc(){return typeof document<"u"?document:null}/**
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
 */function td(t){return new uR(t,!0)}/**
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
 */class Yb{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&U("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Jb{constructor(e,n,r,i,s,o,l,u){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Yb(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===F.RESOURCE_EXHAUSTED?(Be(n.toString()),Be("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===F.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new K(F.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return U("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(U("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class iC extends Jb{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=pR(this.serializer,e),r=function(s){if(!("targetChange"in s))return Z.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Z.min():o.readTime?Tt(o.readTime):Z.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=qp(this.serializer),n.addTarget=function(s,o){let l;const u=o.target;if(l=su(u)?{documents:bb(s,u)}:{query:Tb(s,u)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=yb(s,o.resumeToken);const d=Bp(s,o.expectedCount);d!==null&&(l.expectedCount=d)}else if(o.snapshotVersion.compareTo(Z.min())>0){l.readTime=Hs(s,o.snapshotVersion.toTimestamp());const d=Bp(s,o.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=mR(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=qp(this.serializer),n.removeTarget=e,this.a_(n)}}class sC extends Jb{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return J(!!e.streamToken),this.lastStreamToken=e.streamToken,J(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){J(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=fR(e.writeResults,e.commitTime),r=Tt(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=qp(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>lu(this.serializer,r))};this.a_(n)}}/**
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
 */class oC extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new K(F.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,$p(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new K(F.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,$p(n,r),i,o,l,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new K(F.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class aC{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Be(n),this.D_=!1):U("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class lC{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{Hi(this)&&(U("RemoteStore","Restarting streams for network reachability change."),await async function(u){const d=Y(u);d.L_.add(4),await al(d),d.q_.set("Unknown"),d.L_.delete(4),await nd(d)}(this))})}),this.q_=new aC(r,i)}}async function nd(t){if(Hi(t))for(const e of t.B_)await e(!0)}async function al(t){for(const e of t.B_)await e(!1)}function rd(t,e){const n=Y(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Cm(n)?Rm(n):oo(n).r_()&&Am(n,e))}function Ws(t,e){const n=Y(t),r=oo(n);n.N_.delete(e),r.r_()&&Xb(n,e),n.N_.size===0&&(r.r_()?r.o_():Hi(n)&&n.q_.set("Unknown"))}function Am(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Z.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}oo(t).A_(e)}function Xb(t,e){t.Q_.xe(e),oo(t).R_(e)}function Rm(t){t.Q_=new oR({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),oo(t).start(),t.q_.v_()}function Cm(t){return Hi(t)&&!oo(t).n_()&&t.N_.size>0}function Hi(t){return Y(t).L_.size===0}function Zb(t){t.Q_=void 0}async function cC(t){t.q_.set("Online")}async function uC(t){t.N_.forEach((e,n)=>{Am(t,e)})}async function dC(t,e){Zb(t),Cm(t)?(t.q_.M_(e),Rm(t)):t.q_.set("Unknown")}async function hC(t,e,n){if(t.q_.set("Online"),e instanceof gb&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const l of s.targetIds)i.N_.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.N_.delete(l),i.Q_.removeTarget(l))}(t,e)}catch(r){U("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await mu(t,r)}else if(e instanceof wc?t.Q_.Ke(e):e instanceof mb?t.Q_.He(e):t.Q_.We(e),!n.isEqual(Z.min()))try{const r=await qb(t.localStore);n.compareTo(r)>=0&&await function(s,o){const l=s.Q_.rt(o);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const p=s.N_.get(d);p&&s.N_.set(d,p.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,d)=>{const p=s.N_.get(u);if(!p)return;s.N_.set(u,p.withResumeToken($e.EMPTY_BYTE_STRING,p.snapshotVersion)),Xb(s,u);const f=new Ln(p.target,u,d,p.sequenceNumber);Am(s,f)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){U("RemoteStore","Failed to raise snapshot:",r),await mu(t,r)}}async function mu(t,e,n){if(!Qr(e))throw e;t.L_.add(1),await al(t),t.q_.set("Offline"),n||(n=()=>qb(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{U("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await nd(t)})}function eT(t,e){return e().catch(n=>mu(t,n,e))}async function so(t){const e=Y(t),n=$r(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;pC(e);)try{const i=await ZR(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,fC(e,i)}catch(i){await mu(e,i)}tT(e)&&nT(e)}function pC(t){return Hi(t)&&t.O_.length<10}function fC(t,e){t.O_.push(e);const n=$r(t);n.r_()&&n.V_&&n.m_(e.mutations)}function tT(t){return Hi(t)&&!$r(t).n_()&&t.O_.length>0}function nT(t){$r(t).start()}async function mC(t){$r(t).p_()}async function gC(t){const e=$r(t);for(const n of t.O_)e.m_(n.mutations)}async function yC(t,e,n){const r=t.O_.shift(),i=_m.from(r,e,n);await eT(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await so(t)}async function vC(t,e){e&&$r(t).V_&&await async function(r,i){if(function(o){return rR(o)&&o!==F.ABORTED}(i.code)){const s=r.O_.shift();$r(r).s_(),await eT(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await so(r)}}(t,e),tT(t)&&nT(t)}async function Fx(t,e){const n=Y(t);n.asyncQueue.verifyOperationInProgress(),U("RemoteStore","RemoteStore received new credentials");const r=Hi(n);n.L_.add(3),await al(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await nd(n)}async function Jp(t,e){const n=Y(t);e?(n.L_.delete(2),await nd(n)):e||(n.L_.add(2),await al(n),n.q_.set("Unknown"))}function oo(t){return t.K_||(t.K_=function(n,r,i){const s=Y(n);return s.w_(),new iC(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:cC.bind(null,t),Ro:uC.bind(null,t),mo:dC.bind(null,t),d_:hC.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Cm(t)?Rm(t):t.q_.set("Unknown")):(await t.K_.stop(),Zb(t))})),t.K_}function $r(t){return t.U_||(t.U_=function(n,r,i){const s=Y(n);return s.w_(),new sC(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:mC.bind(null,t),mo:vC.bind(null,t),f_:gC.bind(null,t),g_:yC.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await so(t)):(await t.U_.stop(),t.O_.length>0&&(U("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
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
 */class jm{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new _n,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new jm(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new K(F.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Dm(t,e){if(Be("AsyncQueue",`${e}: ${t}`),Qr(t))return new K(F.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class Ss{constructor(e){this.comparator=e?(n,r)=>e(n,r)||H.comparator(n.key,r.key):(n,r)=>H.comparator(n.key,r.key),this.keyedMap=qo(),this.sortedSet=new we(this.comparator)}static emptySet(e){return new Ss(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ss)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Ss;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class Ux{constructor(){this.W_=new we(H.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):Q():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class Gs{constructor(e,n,r,i,s,o,l,u,d){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new Gs(e,n,Ss.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Qu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class xC{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class _C{constructor(){this.queries=Bx(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=Y(n),s=i.queries;i.queries=Bx(),s.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new K(F.ABORTED,"Firestore shutting down"))}}function Bx(){return new Yr(t=>Z1(t),Qu)}async function rT(t,e){const n=Y(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new xC,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const l=Dm(o,`Initialization of query '${rs(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&Vm(n)}async function iT(t,e){const n=Y(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function wC(t,e){const n=Y(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const l of o.j_)l.X_(i)&&(r=!0);o.z_=i}}r&&Vm(n)}function bC(t,e,n){const r=Y(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function Vm(t){t.Y_.forEach(e=>{e.next()})}var Xp,$x;($x=Xp||(Xp={})).ea="default",$x.Cache="cache";class sT{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Gs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=Gs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Xp.Cache}}/**
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
 */class oT{constructor(e){this.key=e}}class aT{constructor(e){this.key=e}}class TC{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=se(),this.mutatedKeys=se(),this.Aa=tb(e),this.Ra=new Ss(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Ux,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,f)=>{const g=i.get(p),k=il(this.query,f)?f:null,A=!!g&&this.mutatedKeys.has(g.key),w=!!k&&(k.hasLocalMutations||this.mutatedKeys.has(k.key)&&k.hasCommittedMutations);let E=!1;g&&k?g.data.isEqual(k.data)?A!==w&&(r.track({type:3,doc:k}),E=!0):this.ga(g,k)||(r.track({type:2,doc:k}),E=!0,(u&&this.Aa(k,u)>0||d&&this.Aa(k,d)<0)&&(l=!0)):!g&&k?(r.track({type:0,doc:k}),E=!0):g&&!k&&(r.track({type:1,doc:g}),E=!0,(u||d)&&(l=!0)),E&&(k?(o=o.add(k),s=w?s.add(p):s.delete(p)):(o=o.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{Ra:o,fa:r,ns:l,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((p,f)=>function(k,A){const w=E=>{switch(E){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Q()}};return w(k)-w(A)}(p.type,f.type)||this.Aa(p.doc,f.doc)),this.pa(r),i=i!=null&&i;const l=n&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,d=u!==this.Ea;return this.Ea=u,o.length!==0||d?{snapshot:new Gs(this.query,e.Ra,s,o,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Ux,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=se(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new aT(r))}),this.da.forEach(r=>{e.has(r)||n.push(new oT(r))}),n}ba(e){this.Ta=e.Ts,this.da=se();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return Gs.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class EC{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class IC{constructor(e){this.key=e,this.va=!1}}class SC{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Yr(l=>Z1(l),Qu),this.Ma=new Map,this.xa=new Set,this.Oa=new we(H.comparator),this.Na=new Map,this.La=new Sm,this.Ba={},this.ka=new Map,this.qa=Vi.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function kC(t,e,n=!0){const r=id(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await lT(r,e,n,!0),i}async function NC(t,e){const n=id(t);await lT(n,e,!0,!1)}async function lT(t,e,n,r){const i=await hu(t.localStore,Ut(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await Om(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&rd(t.remoteStore,i),l}async function Om(t,e,n,r,i){t.Ka=(f,g,k)=>async function(w,E,y,_){let v=E.view.ma(y);v.ns&&(v=await Qp(w.localStore,E.query,!1).then(({documents:S})=>E.view.ma(S,v)));const N=_&&_.targetChanges.get(E.targetId),O=_&&_.targetMismatches.get(E.targetId)!=null,L=E.view.applyChanges(v,w.isPrimaryClient,N,O);return Zp(w,E.targetId,L.wa),L.snapshot}(t,f,g,k);const s=await Qp(t.localStore,e,!0),o=new TC(e,s.Ts),l=o.ma(s.documents),u=ol.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),d=o.applyChanges(l,t.isPrimaryClient,u);Zp(t,n,d.wa);const p=new EC(e,n,o);return t.Fa.set(e,p),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),d.snapshot}async function PC(t,e,n){const r=Y(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!Qu(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ks(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Ws(r.remoteStore,i.targetId),Qs(r,i.targetId)}).catch(Gr)):(Qs(r,i.targetId),await Ks(r.localStore,i.targetId,!0))}async function AC(t,e){const n=Y(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Ws(n.remoteStore,r.targetId))}async function RC(t,e,n){const r=Fm(t);try{const i=await function(o,l){const u=Y(o),d=Ce.now(),p=l.reduce((k,A)=>k.add(A.key),se());let f,g;return u.persistence.runTransaction("Locally write mutations","readwrite",k=>{let A=Lt(),w=se();return u.cs.getEntries(k,p).next(E=>{A=E,A.forEach((y,_)=>{_.isValidDocument()||(w=w.add(y))})}).next(()=>u.localDocuments.getOverlayedDocuments(k,A)).next(E=>{f=E;const y=[];for(const _ of l){const v=tR(_,f.get(_.key).overlayedDocument);v!=null&&y.push(new er(_.key,v,q1(v.value.mapValue),_t.exists(!0)))}return u.mutationQueue.addMutationBatch(k,d,y,l)}).next(E=>{g=E;const y=E.applyToLocalDocumentSet(f,w);return u.documentOverlayCache.saveOverlays(k,E.batchId,y)})}).then(()=>({batchId:g.batchId,changes:rb(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let d=o.Ba[o.currentUser.toKey()];d||(d=new we(re)),d=d.insert(l,u),o.Ba[o.currentUser.toKey()]=d}(r,i.batchId,n),await Jr(r,i.changes),await so(r.remoteStore)}catch(i){const s=Dm(i,"Failed to persist write");n.reject(s)}}async function cT(t,e){const n=Y(t);try{const r=await JR(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Na.get(s);o&&(J(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?J(o.va):i.removedDocuments.size>0&&(J(o.va),o.va=!1))}),await Jr(n,r,e)}catch(r){await Gr(r)}}function qx(t,e,n){const r=Y(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,o)=>{const l=o.view.Z_(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=Y(o);u.onlineState=l;let d=!1;u.queries.forEach((p,f)=>{for(const g of f.j_)g.Z_(l)&&(d=!0)}),d&&Vm(u)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function CC(t,e,n){const r=Y(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new we(H.comparator);o=o.insert(s,Oe.newNoDocument(s,Z.min()));const l=se().add(s),u=new sl(Z.min(),new Map,new we(re),o,l);await cT(r,u),r.Oa=r.Oa.remove(s),r.Na.delete(e),zm(r)}else await Ks(r.localStore,e,!1).then(()=>Qs(r,e,n)).catch(Gr)}async function jC(t,e){const n=Y(t),r=e.batch.batchId;try{const i=await YR(n.localStore,e);Lm(n,r,null),Mm(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Jr(n,i)}catch(i){await Gr(i)}}async function DC(t,e,n){const r=Y(t);try{const i=await function(o,l){const u=Y(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return u.mutationQueue.lookupMutationBatch(d,l).next(f=>(J(f!==null),p=f.keys(),u.mutationQueue.removeMutationBatch(d,f))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,p,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>u.localDocuments.getDocuments(d,p))})}(r.localStore,e);Lm(r,e,n),Mm(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Jr(r,i)}catch(i){await Gr(i)}}function Mm(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function Lm(t,e,n){const r=Y(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function Qs(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||uT(t,r)})}function uT(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Ws(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),zm(t))}function Zp(t,e,n){for(const r of n)r instanceof oT?(t.La.addReference(r.key,e),VC(t,r)):r instanceof aT?(U("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||uT(t,r.key)):Q()}function VC(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(U("SyncEngine","New document in limbo: "+n),t.xa.add(r),zm(t))}function zm(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new H(me.fromString(e)),r=t.qa.next();t.Na.set(r,new IC(n)),t.Oa=t.Oa.insert(n,r),rd(t.remoteStore,new Ln(Ut(Gu(n.path)),r,"TargetPurposeLimboResolution",Pt.oe))}}async function Jr(t,e,n){const r=Y(t),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(d=>{var p;if((d||n)&&r.isPrimaryClient){const f=d?!d.fromCache:(p=n==null?void 0:n.targetChanges.get(u.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(d){i.push(d);const f=Nm.Wi(u.targetId,d);s.push(f)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(u,d){const p=Y(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>V.forEach(d,g=>V.forEach(g.$i,k=>p.persistence.referenceDelegate.addReference(f,g.targetId,k)).next(()=>V.forEach(g.Ui,k=>p.persistence.referenceDelegate.removeReference(f,g.targetId,k)))))}catch(f){if(!Qr(f))throw f;U("LocalStore","Failed to update sequence numbers: "+f)}for(const f of d){const g=f.targetId;if(!f.fromCache){const k=p.os.get(g),A=k.snapshotVersion,w=k.withLastLimboFreeSnapshotVersion(A);p.os=p.os.insert(g,w)}}}(r.localStore,s))}async function OC(t,e){const n=Y(t);if(!n.currentUser.isEqual(e)){U("SyncEngine","User change. New user:",e.toKey());const r=await $b(n.localStore,e);n.currentUser=e,function(s,o){s.ka.forEach(l=>{l.forEach(u=>{u.reject(new K(F.CANCELLED,o))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Jr(n,r.hs)}}function MC(t,e){const n=Y(t),r=n.Na.get(e);if(r&&r.va)return se().add(r.key);{let i=se();const s=n.Ma.get(e);if(!s)return i;for(const o of s){const l=n.Fa.get(o);i=i.unionWith(l.view.Va)}return i}}async function LC(t,e){const n=Y(t),r=await Qp(n.localStore,e.query,!0),i=e.view.ba(r);return n.isPrimaryClient&&Zp(n,e.targetId,i.wa),i}async function zC(t,e){const n=Y(t);return Kb(n.localStore,e).then(r=>Jr(n,r))}async function FC(t,e,n,r){const i=Y(t),s=await function(l,u){const d=Y(l),p=Y(d.mutationQueue);return d.persistence.runTransaction("Lookup mutation documents","readonly",f=>p.Mn(f,u).next(g=>g?d.localDocuments.getDocuments(f,g):V.resolve(null)))}(i.localStore,e);s!==null?(n==="pending"?await so(i.remoteStore):n==="acknowledged"||n==="rejected"?(Lm(i,e,r||null),Mm(i,e),function(l,u){Y(Y(l).mutationQueue).On(u)}(i.localStore,e)):Q(),await Jr(i,s)):U("SyncEngine","Cannot apply mutation batch with id: "+e)}async function UC(t,e){const n=Y(t);if(id(n),Fm(n),e===!0&&n.Qa!==!0){const r=n.sharedClientState.getAllActiveQueryTargets(),i=await Hx(n,r.toArray());n.Qa=!0,await Jp(n.remoteStore,!0);for(const s of i)rd(n.remoteStore,s)}else if(e===!1&&n.Qa!==!1){const r=[];let i=Promise.resolve();n.Ma.forEach((s,o)=>{n.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(Qs(n,o),Ks(n.localStore,o,!0))),Ws(n.remoteStore,o)}),await i,await Hx(n,r),function(o){const l=Y(o);l.Na.forEach((u,d)=>{Ws(l.remoteStore,d)}),l.La.pr(),l.Na=new Map,l.Oa=new we(H.comparator)}(n),n.Qa=!1,await Jp(n.remoteStore,!1)}}async function Hx(t,e,n){const r=Y(t),i=[],s=[];for(const o of e){let l;const u=r.Ma.get(o);if(u&&u.length!==0){l=await hu(r.localStore,Ut(u[0]));for(const d of u){const p=r.Fa.get(d),f=await LC(r,p);f.snapshot&&s.push(f.snapshot)}}else{const d=await Hb(r.localStore,o);l=await hu(r.localStore,d),await Om(r,dT(d),o,!1,l.resumeToken)}i.push(l)}return r.Ca.d_(s),i}function dT(t){return X1(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function BC(t){return function(n){return Y(Y(n).persistence).Qi()}(Y(t).localStore)}async function $C(t,e,n,r){const i=Y(t);if(i.Qa)return void U("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(n){case"current":case"not-current":{const o=await Kb(i.localStore,eb(s[0])),l=sl.createSynthesizedRemoteEventForCurrentChange(e,n==="current",$e.EMPTY_BYTE_STRING);await Jr(i,o,l);break}case"rejected":await Ks(i.localStore,e,!0),Qs(i,e,r);break;default:Q()}}async function qC(t,e,n){const r=id(t);if(r.Qa){for(const i of e){if(r.Ma.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){U("SyncEngine","Adding an already active target "+i);continue}const s=await Hb(r.localStore,i),o=await hu(r.localStore,s);await Om(r,dT(s),o.targetId,!1,o.resumeToken),rd(r.remoteStore,o)}for(const i of n)r.Ma.has(i)&&await Ks(r.localStore,i,!1).then(()=>{Ws(r.remoteStore,i),Qs(r,i)}).catch(Gr)}}function id(t){const e=Y(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=cT.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=MC.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=CC.bind(null,e),e.Ca.d_=wC.bind(null,e.eventManager),e.Ca.$a=bC.bind(null,e.eventManager),e}function Fm(t){const e=Y(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=jC.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=DC.bind(null,e),e}class qa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=td(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return Bb(this.persistence,new Ub,e.initialUser,this.serializer)}Ga(e){return new zb(ed.Zr,this.serializer)}Wa(e){return new Gb}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}qa.provider={build:()=>new qa};class hT extends qa{constructor(e,n,r){super(),this.Ja=e,this.cacheSizeBytes=n,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Fm(this.Ja.syncEngine),await so(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return Bb(this.persistence,new Ub,e.initialUser,this.serializer)}ja(e,n){const r=this.persistence.referenceDelegate.garbageCollector;return new CR(r,e.asyncQueue,n)}Ha(e,n){const r=new uA(n,this.persistence);return new cA(e.asyncQueue,r)}Ga(e){const n=Fb(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?St.withCacheSize(this.cacheSizeBytes):St.DEFAULT;return new km(this.synchronizeTabs,n,e.clientId,r,e.asyncQueue,Qb(),bc(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new Gb}}class HC extends hT{constructor(e,n){super(e,n,!1),this.Ja=e,this.cacheSizeBytes=n,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const n=this.Ja.syncEngine;this.sharedClientState instanceof vh&&(this.sharedClientState.syncEngine={no:FC.bind(null,n),ro:$C.bind(null,n),io:qC.bind(null,n),Qi:BC.bind(null,n),eo:zC.bind(null,n)},await this.sharedClientState.start()),await this.persistence.yi(async r=>{await UC(this.Ja.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}Wa(e){const n=Qb();if(!vh.D(n))throw new K(F.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Fb(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new vh(n,e.asyncQueue,r,e.clientId,e.initialUser)}}class Ha{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>qx(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=OC.bind(null,this.syncEngine),await Jp(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new _C}()}createDatastore(e){const n=td(e.databaseInfo.databaseId),r=function(s){return new rC(s)}(e.databaseInfo);return function(s,o,l,u){return new oC(s,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,l){return new lC(r,i,s,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>qx(this.syncEngine,n,0),function(){return zx.D()?new zx:new eC}())}createSyncEngine(e,n){return function(i,s,o,l,u,d,p){const f=new SC(i,s,o,l,u,d);return p&&(f.Qa=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=Y(i);U("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await al(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Ha.provider={build:()=>new Ha};/**
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
 */class pT{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Be("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class KC{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=ht.UNAUTHENTICATED,this.clientId=N1.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{U("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(U("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new _n;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Dm(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function _h(t,e){t.asyncQueue.verifyOperationInProgress(),U("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await $b(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Kx(t,e){t.asyncQueue.verifyOperationInProgress();const n=await WC(t);U("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Fx(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>Fx(e.remoteStore,i)),t._onlineComponents=e}async function WC(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){U("FirestoreClient","Using user provided OfflineComponentProvider");try{await _h(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===F.FAILED_PRECONDITION||i.code===F.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;Oa("Error using user provided cache. Falling back to memory cache: "+n),await _h(t,new qa)}}else U("FirestoreClient","Using default OfflineComponentProvider"),await _h(t,new qa);return t._offlineComponents}async function fT(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(U("FirestoreClient","Using user provided OnlineComponentProvider"),await Kx(t,t._uninitializedComponentsProvider._online)):(U("FirestoreClient","Using default OnlineComponentProvider"),await Kx(t,new Ha))),t._onlineComponents}function GC(t){return fT(t).then(e=>e.syncEngine)}async function mT(t){const e=await fT(t),n=e.eventManager;return n.onListen=kC.bind(null,e.syncEngine),n.onUnlisten=PC.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=NC.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=AC.bind(null,e.syncEngine),n}function QC(t,e,n={}){const r=new _n;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,d){const p=new pT({next:g=>{p.Za(),o.enqueueAndForget(()=>iT(s,f));const k=g.docs.has(l);!k&&g.fromCache?d.reject(new K(F.UNAVAILABLE,"Failed to get document because the client is offline.")):k&&g.fromCache&&u&&u.source==="server"?d.reject(new K(F.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(g)},error:g=>d.reject(g)}),f=new sT(Gu(l.path),p,{includeMetadataChanges:!0,_a:!0});return rT(s,f)}(await mT(t),t.asyncQueue,e,n,r)),r.promise}function YC(t,e,n={}){const r=new _n;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,d){const p=new pT({next:g=>{p.Za(),o.enqueueAndForget(()=>iT(s,f)),g.fromCache&&u.source==="server"?d.reject(new K(F.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(g)},error:g=>d.reject(g)}),f=new sT(l,p,{includeMetadataChanges:!0,_a:!0});return rT(s,f)}(await mT(t),t.asyncQueue,e,n,r)),r.promise}/**
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
 */function gT(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Wx=new Map;/**
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
 */function yT(t,e,n){if(!n)throw new K(F.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function JC(t,e,n,r){if(e===!0&&r===!0)throw new K(F.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Gx(t){if(!H.isDocumentKey(t))throw new K(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Qx(t){if(H.isDocumentKey(t))throw new K(F.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Um(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":Q()}function Yn(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new K(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Um(t);throw new K(F.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class Yx{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new K(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new K(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}JC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=gT((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new K(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new K(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new K(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Bm{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Yx({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new K(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new K(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Yx(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ZP;switch(r.type){case"firstParty":return new nA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new K(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Wx.get(n);r&&(U("ComponentProvider","Removing Datastore"),Wx.delete(n),r.terminate())}(this),Promise.resolve()}}/**
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
 */class sd{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new sd(this.firestore,e,this._query)}}class Dt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Mr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Dt(this.firestore,e,this._key)}}class Mr extends sd{constructor(e,n,r){super(e,n,Gu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Dt(this.firestore,null,new H(e))}withConverter(e){return new Mr(this.firestore,e,this._path)}}function Ka(t,e,...n){if(t=Me(t),yT("collection","path",e),t instanceof Bm){const r=me.fromString(e,...n);return Qx(r),new Mr(t,null,r)}{if(!(t instanceof Dt||t instanceof Mr))throw new K(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(me.fromString(e,...n));return Qx(r),new Mr(t.firestore,null,r)}}function _i(t,e,...n){if(t=Me(t),arguments.length===1&&(e=N1.newId()),yT("doc","path",e),t instanceof Bm){const r=me.fromString(e,...n);return Gx(r),new Dt(t,null,new H(r))}{if(!(t instanceof Dt||t instanceof Mr))throw new K(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(me.fromString(e,...n));return Gx(r),new Dt(t.firestore,t instanceof Mr?t.converter:null,new H(r))}}/**
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
 */class Jx{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Yb(this,"async_queue_retry"),this.Vu=()=>{const r=bc();r&&U("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=bc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=bc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new _n;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Qr(e))throw e;U("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Be("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=jm.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&Q()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class ao extends Bm{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new Jx,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Jx(e),this._firestoreClient=void 0,await e}}}function XC(t,e,n){n||(n="(default)");const r=$u(t,"firestore");if(r.isInitialized(n)){const i=r.getImmediate({identifier:n}),s=r.getOptions(n);if(Da(s,e))return i;throw new K(F.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new K(F.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new K(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:n})}function $m(t){if(t._terminated)throw new K(F.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||ZC(t),t._firestoreClient}function ZC(t){var e,n,r;const i=t._freezeSettings(),s=function(l,u,d,p){return new RA(l,u,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,gT(p.experimentalLongPollingOptions),p.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new KC(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
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
 */class Ys{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ys($e.fromBase64String(e))}catch(n){throw new K(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Ys($e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class od{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new K(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class ad{constructor(e){this._methodName=e}}/**
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
 */class qm{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new K(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new K(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return re(this._lat,e._lat)||re(this._long,e._long)}}/**
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
 */class Hm{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
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
 */const ej=/^__.*__$/;class tj{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new er(e,this.data,this.fieldMask,n,this.fieldTransforms):new io(e,this.data,n,this.fieldTransforms)}}class vT{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new er(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function xT(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Q()}}class Km{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Km(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return gu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(xT(this.Cu)&&ej.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class nj{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||td(e)}Qu(e,n,r,i=!1){return new Km({Cu:e,methodName:n,qu:r,path:Pe.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Wm(t){const e=t._freezeSettings(),n=td(t._databaseId);return new nj(t._databaseId,!!e.ignoreUndefinedProperties,n)}function _T(t,e,n,r,i,s={}){const o=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);Qm("Data must be an object, but it was:",o,r);const l=wT(r,o);let u,d;if(s.merge)u=new At(o.fieldMask),d=o.fieldTransforms;else if(s.mergeFields){const p=[];for(const f of s.mergeFields){const g=ef(e,f,n);if(!o.contains(g))throw new K(F.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);TT(p,g)||p.push(g)}u=new At(p),d=o.fieldTransforms.filter(f=>u.covers(f.field))}else u=null,d=o.fieldTransforms;return new tj(new ft(l),u,d)}class ld extends ad{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ld}}class Gm extends ad{_toFieldTransform(e){return new ub(e.path,new Bs)}isEqual(e){return e instanceof Gm}}function rj(t,e,n,r){const i=t.Qu(1,e,n);Qm("Data must be an object, but it was:",i,r);const s=[],o=ft.empty();qi(r,(u,d)=>{const p=Ym(e,u,n);d=Me(d);const f=i.Nu(p);if(d instanceof ld)s.push(p);else{const g=cd(d,f);g!=null&&(s.push(p),o.set(p,g))}});const l=new At(s);return new vT(o,l,i.fieldTransforms)}function ij(t,e,n,r,i,s){const o=t.Qu(1,e,n),l=[ef(e,r,n)],u=[i];if(s.length%2!=0)throw new K(F.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<s.length;g+=2)l.push(ef(e,s[g])),u.push(s[g+1]);const d=[],p=ft.empty();for(let g=l.length-1;g>=0;--g)if(!TT(d,l[g])){const k=l[g];let A=u[g];A=Me(A);const w=o.Nu(k);if(A instanceof ld)d.push(k);else{const E=cd(A,w);E!=null&&(d.push(k),p.set(k,E))}}const f=new At(d);return new vT(p,f,o.fieldTransforms)}function cd(t,e){if(bT(t=Me(t)))return Qm("Unsupported field value:",e,t),wT(t,e);if(t instanceof ad)return function(r,i){if(!xT(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const l of r){let u=cd(l,i.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=Me(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return QA(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ce.fromDate(r);return{timestampValue:Hs(i.serializer,s)}}if(r instanceof Ce){const s=new Ce(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Hs(i.serializer,s)}}if(r instanceof qm)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ys)return{bytesValue:yb(i.serializer,r._byteString)};if(r instanceof Dt){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Tm(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Hm)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return ym(l.serializer,u)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${Um(r)}`)}(t,e)}function wT(t,e){const n={};return F1(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):qi(t,(r,i)=>{const s=cd(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function bT(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ce||t instanceof qm||t instanceof Ys||t instanceof Dt||t instanceof ad||t instanceof Hm)}function Qm(t,e,n){if(!bT(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=Um(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function ef(t,e,n){if((e=Me(e))instanceof od)return e._internalPath;if(typeof e=="string")return Ym(t,e);throw gu("Field path arguments must be of type string or ",t,!1,void 0,n)}const sj=new RegExp("[~\\*/\\[\\]]");function Ym(t,e,n){if(e.search(sj)>=0)throw gu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new od(...e.split("."))._internalPath}catch{throw gu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function gu(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new K(F.INVALID_ARGUMENT,l+t+u)}function TT(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class ET{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Dt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new oj(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(IT("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class oj extends ET{data(){return super.data()}}function IT(t,e){return typeof e=="string"?Ym(t,e):e instanceof od?e._internalPath:e._delegate._internalPath}/**
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
 */function aj(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new K(F.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class lj{convertValue(e,n="none"){switch(Ri(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Se(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Ur(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw Q()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return qi(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>Se(o.doubleValue));return new Hm(s)}convertGeoPoint(e){return new qm(Se(e.latitude),Se(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=pm(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Fa(e));default:return null}}convertTimestamp(e){const n=Qn(e);return new Ce(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=me.fromString(e);J(kb(r));const i=new Ai(r.get(1),r.get(3)),s=new H(r.popFirst(5));return i.isEqual(n)||Be(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
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
 */function ST(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
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
 */class Wo{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class kT extends ET{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Tc(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(IT("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Tc extends kT{data(e={}){return super.data(e)}}class cj{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Wo(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Tc(this._firestore,this._userDataWriter,r.key,r,new Wo(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new K(F.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new Tc(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Wo(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Tc(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Wo(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return l.type!==0&&(d=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),p=o.indexOf(l.doc.key)),{type:uj(l.type),doc:u,oldIndex:d,newIndex:p}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function uj(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Q()}}/**
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
 */function NT(t){t=Yn(t,Dt);const e=Yn(t.firestore,ao);return QC($m(e),t._key).then(n=>dj(e,t,n))}class PT extends lj{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ys(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Dt(this.firestore,null,n)}}function AT(t){t=Yn(t,sd);const e=Yn(t.firestore,ao),n=$m(e),r=new PT(e);return aj(t._query),YC(n,t._query).then(i=>new cj(e,r,t,i))}function Xx(t,e,n){t=Yn(t,Dt);const r=Yn(t.firestore,ao),i=ST(t.converter,e,n);return Xm(r,[_T(Wm(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,_t.none())])}function RT(t,e,n,...r){t=Yn(t,Dt);const i=Yn(t.firestore,ao),s=Wm(i);let o;return o=typeof(e=Me(e))=="string"||e instanceof od?ij(s,"updateDoc",t._key,e,n,r):rj(s,"updateDoc",t._key,e),Xm(i,[o.toMutation(t._key,_t.exists(!0))])}function Jm(t,e){const n=Yn(t.firestore,ao),r=_i(t),i=ST(t.converter,e);return Xm(n,[_T(Wm(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,_t.exists(!1))]).then(()=>r)}function Xm(t,e){return function(r,i){const s=new _n;return r.asyncQueue.enqueueAndForget(async()=>RC(await GC(r),i,s)),s.promise}($m(t),e)}function dj(t,e,n){const r=n.docs.get(e._key),i=new PT(t);return new kT(t,i,e._key,r,new Wo(n.hasPendingWrites,n.fromCache),e.converter)}class hj{constructor(e){let n;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),n=e.tabManager):(n=gj(),n._initialize(e)),this._onlineComponentProvider=n._onlineComponentProvider,this._offlineComponentProvider=n._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function pj(t){return new hj(t)}class fj{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ha.provider,this._offlineComponentProvider={build:n=>new hT(n,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class mj{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ha.provider,this._offlineComponentProvider={build:n=>new HC(n,e==null?void 0:e.cacheSizeBytes)}}}function gj(t){return new fj(void 0)}function yj(){return new mj}function Oi(){return new Gm("serverTimestamp")}(function(e,n=!0){(function(i){ro=i})($i),Ni(new Fr("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new ao(new eA(r.getProvider("auth-internal")),new iA(r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new K(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ai(d.options.projectId,p)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),xn(Kv,"4.7.3",e),xn(Kv,"4.7.3","esm2017")})();function Zm(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function CT(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const vj=CT,jT=new tl("auth","Firebase",CT());/**
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
 */const yu=new om("@firebase/auth");function xj(t,...e){yu.logLevel<=ae.WARN&&yu.warn(`Auth (${$i}): ${t}`,...e)}function Ec(t,...e){yu.logLevel<=ae.ERROR&&yu.error(`Auth (${$i}): ${t}`,...e)}/**
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
 */function ln(t,...e){throw eg(t,...e)}function wn(t,...e){return eg(t,...e)}function DT(t,e,n){const r=Object.assign(Object.assign({},vj()),{[e]:n});return new tl("auth","Firebase",r).create(e,{appName:t.name})}function $n(t){return DT(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function eg(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return jT.create(t,...e)}function te(t,e,...n){if(!t)throw eg(e,...n)}function zn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ec(e),new Error(e)}function Jn(t,e){t||zn(e)}/**
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
 */function tf(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function _j(){return Zx()==="http:"||Zx()==="https:"}function Zx(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function wj(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_j()||C2()||"connection"in navigator)?navigator.onLine:!0}function bj(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class ll{constructor(e,n){this.shortDelay=e,this.longDelay=n,Jn(n>e,"Short delay should be less than long delay!"),this.isMobile=P2()||j2()}get(){return wj()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function tg(t,e){Jn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class VT{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;zn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;zn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;zn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Tj={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Ej=new ll(3e4,6e4);function tr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Sn(t,e,n,r,i={}){return OT(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=nl(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const d=Object.assign({method:e,headers:u},s);return R2()||(d.referrerPolicy="no-referrer"),VT.fetch()(MT(t,t.config.apiHost,n,l),d)})}async function OT(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Tj),e);try{const i=new Sj(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Zl(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Zl(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Zl(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw Zl(t,"user-disabled",o);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw DT(t,p,d);ln(t,p)}}catch(i){if(i instanceof In)throw i;ln(t,"network-request-failed",{message:String(i)})}}async function cl(t,e,n,r,i={}){const s=await Sn(t,e,n,r,i);return"mfaPendingCredential"in s&&ln(t,"multi-factor-auth-required",{_serverResponse:s}),s}function MT(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?tg(t.config,i):`${t.config.apiScheme}://${i}`}function Ij(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Sj{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(wn(this.auth,"network-request-failed")),Ej.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Zl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=wn(t,e,r);return i.customData._tokenResponse=n,i}function e0(t){return t!==void 0&&t.enterprise!==void 0}class kj{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return Ij(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Nj(t,e){return Sn(t,"GET","/v2/recaptchaConfig",tr(t,e))}/**
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
 */async function Pj(t,e){return Sn(t,"POST","/v1/accounts:delete",e)}async function LT(t,e){return Sn(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function ca(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Aj(t,e=!1){const n=Me(t),r=await n.getIdToken(e),i=ng(r);te(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:ca(wh(i.auth_time)),issuedAtTime:ca(wh(i.iat)),expirationTime:ca(wh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function wh(t){return Number(t)*1e3}function ng(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Ec("JWT malformed, contained fewer than 3 sections"),null;try{const i=u1(n);return i?JSON.parse(i):(Ec("Failed to decode base64 JWT payload"),null)}catch(i){return Ec("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function t0(t){const e=ng(t);return te(e,"internal-error"),te(typeof e.exp<"u","internal-error"),te(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Js(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof In&&Rj(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Rj({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class Cj{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class nf{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ca(this.lastLoginAt),this.creationTime=ca(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function vu(t){var e;const n=t.auth,r=await t.getIdToken(),i=await Js(t,LT(n,{idToken:r}));te(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?zT(s.providerUserInfo):[],l=Dj(t.providerData,o),u=t.isAnonymous,d=!(t.email&&s.passwordHash)&&!(l!=null&&l.length),p=u?d:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new nf(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(t,f)}async function jj(t){const e=Me(t);await vu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Dj(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function zT(t){return t.map(e=>{var{providerId:n}=e,r=Zm(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Vj(t,e){const n=await OT(t,{},async()=>{const r=nl({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=MT(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",VT.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Oj(t,e){return Sn(t,"POST","/v2/accounts:revokeToken",tr(t,e))}/**
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
 */class ks{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){te(e.idToken,"internal-error"),te(typeof e.idToken<"u","internal-error"),te(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):t0(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){te(e.length!==0,"internal-error");const n=t0(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(te(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await Vj(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new ks;return r&&(te(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(te(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(te(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ks,this.toJSON())}_performRefresh(){return zn("not implemented")}}/**
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
 */function cr(t,e){te(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Fn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=Zm(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Cj(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new nf(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await Js(this,this.stsTokenManager.getToken(this.auth,e));return te(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Aj(this,e)}reload(){return jj(this)}_assign(e){this!==e&&(te(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Fn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){te(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await vu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(pn(this.auth.app))return Promise.reject($n(this.auth));const e=await this.getIdToken();return await Js(this,Pj(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,l,u,d,p;const f=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(i=n.email)!==null&&i!==void 0?i:void 0,k=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,A=(o=n.photoURL)!==null&&o!==void 0?o:void 0,w=(l=n.tenantId)!==null&&l!==void 0?l:void 0,E=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,y=(d=n.createdAt)!==null&&d!==void 0?d:void 0,_=(p=n.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:v,emailVerified:N,isAnonymous:O,providerData:L,stsTokenManager:S}=n;te(v&&S,e,"internal-error");const b=ks.fromJSON(this.name,S);te(typeof v=="string",e,"internal-error"),cr(f,e.name),cr(g,e.name),te(typeof N=="boolean",e,"internal-error"),te(typeof O=="boolean",e,"internal-error"),cr(k,e.name),cr(A,e.name),cr(w,e.name),cr(E,e.name),cr(y,e.name),cr(_,e.name);const x=new Fn({uid:v,auth:e,email:g,emailVerified:N,displayName:f,isAnonymous:O,photoURL:A,phoneNumber:k,tenantId:w,stsTokenManager:b,createdAt:y,lastLoginAt:_});return L&&Array.isArray(L)&&(x.providerData=L.map(I=>Object.assign({},I))),E&&(x._redirectEventId=E),x}static async _fromIdTokenResponse(e,n,r=!1){const i=new ks;i.updateFromServerResponse(n);const s=new Fn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await vu(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];te(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?zT(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new ks;l.updateFromIdToken(r);const u=new Fn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new nf(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,d),u}}/**
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
 */const n0=new Map;function Un(t){Jn(t instanceof Function,"Expected a class definition");let e=n0.get(t);return e?(Jn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,n0.set(t,e),e)}/**
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
 */class FT{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}FT.type="NONE";const r0=FT;/**
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
 */function Ic(t,e,n){return`firebase:${t}:${e}:${n}`}class Ns{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ic(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ic("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Fn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ns(Un(r0),e,r);const i=(await Promise.all(n.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||Un(r0);const o=Ic(r,e.config.apiKey,e.name);let l=null;for(const d of n)try{const p=await d._get(o);if(p){const f=Fn._fromJSON(e,p);d!==s&&(l=f),s=d;break}}catch{}const u=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Ns(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new Ns(s,e,r))}}/**
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
 */function i0(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(qT(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(UT(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(KT(e))return"Blackberry";if(WT(e))return"Webos";if(BT(e))return"Safari";if((e.includes("chrome/")||$T(e))&&!e.includes("edge/"))return"Chrome";if(HT(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function UT(t=Qe()){return/firefox\//i.test(t)}function BT(t=Qe()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $T(t=Qe()){return/crios\//i.test(t)}function qT(t=Qe()){return/iemobile/i.test(t)}function HT(t=Qe()){return/android/i.test(t)}function KT(t=Qe()){return/blackberry/i.test(t)}function WT(t=Qe()){return/webos/i.test(t)}function rg(t=Qe()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Mj(t=Qe()){var e;return rg(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Lj(){return D2()&&document.documentMode===10}function GT(t=Qe()){return rg(t)||HT(t)||WT(t)||KT(t)||/windows phone/i.test(t)||qT(t)}/**
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
 */function QT(t,e=[]){let n;switch(t){case"Browser":n=i0(Qe());break;case"Worker":n=`${i0(Qe())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${$i}/${r}`}/**
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
 */class zj{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function Fj(t,e={}){return Sn(t,"GET","/v2/passwordPolicy",tr(t,e))}/**
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
 */const Uj=6;class Bj{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:Uj,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class $j{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new s0(this),this.idTokenSubscription=new s0(this),this.beforeStateQueue=new zj(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=jT,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Un(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ns.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await LT(this,{idToken:e}),r=await Fn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(pn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return te(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await vu(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=bj()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(pn(this.app))return Promise.reject($n(this));const n=e?Me(e):null;return n&&te(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&te(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return pn(this.app)?Promise.reject($n(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return pn(this.app)?Promise.reject($n(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Un(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Fj(this),n=new Bj(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new tl("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Oj(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Un(e)||this._popupRedirectResolver;te(n,this,"argument-error"),this.redirectPersistenceManager=await Ns.create(this,[Un(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(te(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return te(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=QT(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&xj(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Xr(t){return Me(t)}class s0{constructor(e){this.auth=e,this.observer=null,this.addObserver=F2(n=>this.observer=n)}get next(){return te(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ud={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function qj(t){ud=t}function YT(t){return ud.loadJS(t)}function Hj(){return ud.recaptchaEnterpriseScript}function Kj(){return ud.gapiScript}function Wj(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const Gj="recaptcha-enterprise",Qj="NO_RECAPTCHA";class Yj{constructor(e){this.type=Gj,this.auth=Xr(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{Nj(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new kj(u);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,o(d.siteKey)}}).catch(u=>{l(u)})})}function i(s,o,l){const u=window.grecaptcha;e0(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(d=>{o(d)}).catch(()=>{o(Qj)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(l=>{if(!n&&e0(window.grecaptcha))i(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Hj();u.length!==0&&(u+=l),YT(u).then(()=>{i(l,s,o)}).catch(d=>{o(d)})}}).catch(l=>{o(l)})})}}async function o0(t,e,n,r=!1){const i=new Yj(t);let s;try{s=await i.verify(n)}catch{s=await i.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function xu(t,e,n,r){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await o0(t,e,n,n==="getOobCode");return r(t,s)}else return r(t,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await o0(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(s)})}/**
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
 */function Jj(t,e){const n=$u(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Da(s,e??{}))return i;ln(i,"already-initialized")}return n.initialize({options:e})}function Xj(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Un);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Zj(t,e,n){const r=Xr(t);te(r._canInitEmulator,r,"emulator-config-failed"),te(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=JT(e),{host:o,port:l}=eD(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${s}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),tD()}function JT(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function eD(t){const e=JT(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:a0(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:a0(o)}}}function a0(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function tD(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class ig{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return zn("not implemented")}_getIdTokenResponse(e){return zn("not implemented")}_linkToIdToken(e,n){return zn("not implemented")}_getReauthenticationResolver(e){return zn("not implemented")}}async function nD(t,e){return Sn(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function rD(t,e){return cl(t,"POST","/v1/accounts:signInWithPassword",tr(t,e))}async function iD(t,e){return Sn(t,"POST","/v1/accounts:sendOobCode",tr(t,e))}async function sD(t,e){return iD(t,e)}/**
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
 */async function oD(t,e){return cl(t,"POST","/v1/accounts:signInWithEmailLink",tr(t,e))}async function aD(t,e){return cl(t,"POST","/v1/accounts:signInWithEmailLink",tr(t,e))}/**
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
 */class Wa extends ig{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Wa(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Wa(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return xu(e,n,"signInWithPassword",rD);case"emailLink":return oD(e,{email:this._email,oobCode:this._password});default:ln(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return xu(e,r,"signUpPassword",nD);case"emailLink":return aD(e,{idToken:n,email:this._email,oobCode:this._password});default:ln(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Ps(t,e){return cl(t,"POST","/v1/accounts:signInWithIdp",tr(t,e))}/**
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
 */const lD="http://localhost";class Mi extends ig{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Mi(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ln("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=Zm(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Mi(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ps(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ps(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ps(e,n)}buildRequest(){const e={requestUri:lD,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=nl(n)}return e}}/**
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
 */function cD(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function uD(t){const e=Uo(Bo(t)).link,n=e?Uo(Bo(e)).deep_link_id:null,r=Uo(Bo(t)).deep_link_id;return(r?Uo(Bo(r)).link:null)||r||n||e||t}class sg{constructor(e){var n,r,i,s,o,l;const u=Uo(Bo(e)),d=(n=u.apiKey)!==null&&n!==void 0?n:null,p=(r=u.oobCode)!==null&&r!==void 0?r:null,f=cD((i=u.mode)!==null&&i!==void 0?i:null);te(d&&p&&f,"argument-error"),this.apiKey=d,this.operation=f,this.code=p,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=uD(e);try{return new sg(n)}catch{return null}}}/**
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
 */class lo{constructor(){this.providerId=lo.PROVIDER_ID}static credential(e,n){return Wa._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=sg.parseLink(n);return te(r,"argument-error"),Wa._fromEmailAndCode(e,r.code,r.tenantId)}}lo.PROVIDER_ID="password";lo.EMAIL_PASSWORD_SIGN_IN_METHOD="password";lo.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class XT{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ul extends XT{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class mr extends ul{constructor(){super("facebook.com")}static credential(e){return Mi._fromParams({providerId:mr.PROVIDER_ID,signInMethod:mr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return mr.credentialFromTaggedObject(e)}static credentialFromError(e){return mr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return mr.credential(e.oauthAccessToken)}catch{return null}}}mr.FACEBOOK_SIGN_IN_METHOD="facebook.com";mr.PROVIDER_ID="facebook.com";/**
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
 */class gr extends ul{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Mi._fromParams({providerId:gr.PROVIDER_ID,signInMethod:gr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return gr.credentialFromTaggedObject(e)}static credentialFromError(e){return gr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return gr.credential(n,r)}catch{return null}}}gr.GOOGLE_SIGN_IN_METHOD="google.com";gr.PROVIDER_ID="google.com";/**
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
 */class yr extends ul{constructor(){super("github.com")}static credential(e){return Mi._fromParams({providerId:yr.PROVIDER_ID,signInMethod:yr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yr.credentialFromTaggedObject(e)}static credentialFromError(e){return yr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yr.credential(e.oauthAccessToken)}catch{return null}}}yr.GITHUB_SIGN_IN_METHOD="github.com";yr.PROVIDER_ID="github.com";/**
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
 */class vr extends ul{constructor(){super("twitter.com")}static credential(e,n){return Mi._fromParams({providerId:vr.PROVIDER_ID,signInMethod:vr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return vr.credentialFromTaggedObject(e)}static credentialFromError(e){return vr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return vr.credential(n,r)}catch{return null}}}vr.TWITTER_SIGN_IN_METHOD="twitter.com";vr.PROVIDER_ID="twitter.com";/**
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
 */async function dD(t,e){return cl(t,"POST","/v1/accounts:signUp",tr(t,e))}/**
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
 */class Li{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Fn._fromIdTokenResponse(e,r,i),o=l0(r);return new Li({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=l0(r);return new Li({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function l0(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class _u extends In{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,_u.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new _u(e,n,r,i)}}function ZT(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?_u._fromErrorAndOperation(t,s,e,r):s})}async function hD(t,e,n=!1){const r=await Js(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Li._forOperation(t,"link",r)}/**
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
 */async function pD(t,e,n=!1){const{auth:r}=t;if(pn(r.app))return Promise.reject($n(r));const i="reauthenticate";try{const s=await Js(t,ZT(r,i,e,t),n);te(s.idToken,r,"internal-error");const o=ng(s.idToken);te(o,r,"internal-error");const{sub:l}=o;return te(t.uid===l,r,"user-mismatch"),Li._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&ln(r,"user-mismatch"),s}}/**
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
 */async function eE(t,e,n=!1){if(pn(t.app))return Promise.reject($n(t));const r="signIn",i=await ZT(t,r,e),s=await Li._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function fD(t,e){return eE(Xr(t),e)}/**
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
 */async function tE(t){const e=Xr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function mD(t,e,n){const r=Xr(t);await xu(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",sD)}async function c0(t,e,n){if(pn(t.app))return Promise.reject($n(t));const r=Xr(t),o=await xu(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",dD).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&tE(t),u}),l=await Li._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function gD(t,e,n){return pn(t.app)?Promise.reject($n(t)):fD(Me(t),lo.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&tE(t),r})}/**
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
 */async function yD(t,e){return Sn(t,"POST","/v1/accounts:update",e)}/**
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
 */async function u0(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Me(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await Js(r,yD(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function vD(t,e,n,r){return Me(t).onIdTokenChanged(e,n,r)}function xD(t,e,n){return Me(t).beforeAuthStateChanged(e,n)}function _D(t,e,n,r){return Me(t).onAuthStateChanged(e,n,r)}function wD(t){return Me(t).signOut()}const wu="__sak";/**
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
 */class nE{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(wu,"1"),this.storage.removeItem(wu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const bD=1e3,TD=10;class rE extends nE{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=GT(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Lj()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,TD):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},bD)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}rE.type="LOCAL";const ED=rE;/**
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
 */class iE extends nE{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}iE.type="SESSION";const sE=iE;/**
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
 */function ID(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class dd{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new dd(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async d=>d(n.origin,s)),u=await ID(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}dd.receivers=[];/**
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
 */function og(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class SD{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const d=og("",20);i.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(f){const g=f;if(g.data.eventId===d)switch(g.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(g.data.response);break;default:clearTimeout(p),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function bn(){return window}function kD(t){bn().location.href=t}/**
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
 */function oE(){return typeof bn().WorkerGlobalScope<"u"&&typeof bn().importScripts=="function"}async function ND(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function PD(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function AD(){return oE()?self:null}/**
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
 */const aE="firebaseLocalStorageDb",RD=1,bu="firebaseLocalStorage",lE="fbase_key";class dl{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function hd(t,e){return t.transaction([bu],e?"readwrite":"readonly").objectStore(bu)}function CD(){const t=indexedDB.deleteDatabase(aE);return new dl(t).toPromise()}function rf(){const t=indexedDB.open(aE,RD);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(bu,{keyPath:lE})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(bu)?e(r):(r.close(),await CD(),e(await rf()))})})}async function d0(t,e,n){const r=hd(t,!0).put({[lE]:e,value:n});return new dl(r).toPromise()}async function jD(t,e){const n=hd(t,!1).get(e),r=await new dl(n).toPromise();return r===void 0?null:r.value}function h0(t,e){const n=hd(t,!0).delete(e);return new dl(n).toPromise()}const DD=800,VD=3;class cE{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await rf(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>VD)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return oE()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=dd._getInstance(AD()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await ND(),!this.activeServiceWorker)return;this.sender=new SD(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||PD()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await rf();return await d0(e,wu,"1"),await h0(e,wu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>d0(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>jD(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>h0(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=hd(i,!1).getAll();return new dl(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),DD)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}cE.type="LOCAL";const OD=cE;new ll(3e4,6e4);/**
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
 */function MD(t,e){return e?Un(e):(te(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class ag extends ig{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ps(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ps(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ps(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function LD(t){return eE(t.auth,new ag(t),t.bypassAuthState)}function zD(t){const{auth:e,user:n}=t;return te(n,e,"internal-error"),pD(n,new ag(t),t.bypassAuthState)}async function FD(t){const{auth:e,user:n}=t;return te(n,e,"internal-error"),hD(n,new ag(t),t.bypassAuthState)}/**
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
 */class uE{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return LD;case"linkViaPopup":case"linkViaRedirect":return FD;case"reauthViaPopup":case"reauthViaRedirect":return zD;default:ln(this.auth,"internal-error")}}resolve(e){Jn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Jn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const UD=new ll(2e3,1e4);class xs extends uE{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,xs.currentPopupAction&&xs.currentPopupAction.cancel(),xs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return te(e,this.auth,"internal-error"),e}async onExecution(){Jn(this.filter.length===1,"Popup operations only handle one event");const e=og();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(wn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(wn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,xs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(wn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,UD.get())};e()}}xs.currentPopupAction=null;/**
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
 */const BD="pendingRedirect",Sc=new Map;class $D extends uE{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Sc.get(this.auth._key());if(!e){try{const r=await qD(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Sc.set(this.auth._key(),e)}return this.bypassAuthState||Sc.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function qD(t,e){const n=WD(e),r=KD(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function HD(t,e){Sc.set(t._key(),e)}function KD(t){return Un(t._redirectPersistence)}function WD(t){return Ic(BD,t.config.apiKey,t.name)}async function GD(t,e,n=!1){if(pn(t.app))return Promise.reject($n(t));const r=Xr(t),i=MD(r,e),o=await new $D(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const QD=10*60*1e3;class YD{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!JD(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!dE(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(wn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=QD&&this.cachedEventUids.clear(),this.cachedEventUids.has(p0(e))}saveEventToCache(e){this.cachedEventUids.add(p0(e)),this.lastProcessedEventTime=Date.now()}}function p0(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function dE({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function JD(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return dE(t);default:return!1}}/**
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
 */async function XD(t,e={}){return Sn(t,"GET","/v1/projects",e)}/**
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
 */const ZD=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,eV=/^https?/;async function tV(t){if(t.config.emulator)return;const{authorizedDomains:e}=await XD(t);for(const n of e)try{if(nV(n))return}catch{}ln(t,"unauthorized-domain")}function nV(t){const e=tf(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!eV.test(n))return!1;if(ZD.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const rV=new ll(3e4,6e4);function f0(){const t=bn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function iV(t){return new Promise((e,n)=>{var r,i,s;function o(){f0(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{f0(),n(wn(t,"network-request-failed"))},timeout:rV.get()})}if(!((i=(r=bn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=bn().gapi)===null||s===void 0)&&s.load)o();else{const l=Wj("iframefcb");return bn()[l]=()=>{gapi.load?o():n(wn(t,"network-request-failed"))},YT(`${Kj()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw kc=null,e})}let kc=null;function sV(t){return kc=kc||iV(t),kc}/**
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
 */const oV=new ll(5e3,15e3),aV="__/auth/iframe",lV="emulator/auth/iframe",cV={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},uV=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function dV(t){const e=t.config;te(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?tg(e,lV):`https://${t.config.authDomain}/${aV}`,r={apiKey:e.apiKey,appName:t.name,v:$i},i=uV.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${nl(r).slice(1)}`}async function hV(t){const e=await sV(t),n=bn().gapi;return te(n,t,"internal-error"),e.open({where:document.body,url:dV(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:cV,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=wn(t,"network-request-failed"),l=bn().setTimeout(()=>{s(o)},oV.get());function u(){bn().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
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
 */const pV={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},fV=500,mV=600,gV="_blank",yV="http://localhost";class m0{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function vV(t,e,n,r=fV,i=mV){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},pV),{width:r.toString(),height:i.toString(),top:s,left:o}),d=Qe().toLowerCase();n&&(l=$T(d)?gV:n),UT(d)&&(e=e||yV,u.scrollbars="yes");const p=Object.entries(u).reduce((g,[k,A])=>`${g}${k}=${A},`,"");if(Mj(d)&&l!=="_self")return xV(e||"",l),new m0(null);const f=window.open(e||"",l,p);te(f,t,"popup-blocked");try{f.focus()}catch{}return new m0(f)}function xV(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const _V="__/auth/handler",wV="emulator/auth/handler",bV=encodeURIComponent("fac");async function g0(t,e,n,r,i,s){te(t.config.authDomain,t,"auth-domain-config-required"),te(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:$i,eventId:i};if(e instanceof XT){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",z2(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,f]of Object.entries({}))o[p]=f}if(e instanceof ul){const p=e.getScopes().filter(f=>f!=="");p.length>0&&(o.scopes=p.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const u=await t._getAppCheckToken(),d=u?`#${bV}=${encodeURIComponent(u)}`:"";return`${TV(t)}?${nl(l).slice(1)}${d}`}function TV({config:t}){return t.emulator?tg(t,wV):`https://${t.authDomain}/${_V}`}/**
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
 */const bh="webStorageSupport";class EV{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sE,this._completeRedirectFn=GD,this._overrideRedirectResult=HD}async _openPopup(e,n,r,i){var s;Jn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await g0(e,n,r,tf(),i);return vV(e,o,og())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await g0(e,n,r,tf(),i);return kD(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Jn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await hV(e),r=new YD(e);return n.register("authEvent",i=>(te(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(bh,{type:bh},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[bh];o!==void 0&&n(!!o),ln(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=tV(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return GT()||BT()||rg()}}const IV=EV;var y0="@firebase/auth",v0="1.7.9";/**
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
 */class SV{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){te(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function kV(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function NV(t){Ni(new Fr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;te(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:QT(t)},d=new $j(r,i,s,u);return Xj(d,n),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ni(new Fr("auth-internal",e=>{const n=Xr(e.getProvider("auth").getImmediate());return(r=>new SV(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),xn(y0,v0,kV(t)),xn(y0,v0,"esm2017")}/**
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
 */const PV=5*60,AV=p1("authIdTokenMaxAge")||PV;let x0=null;const RV=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>AV)return;const i=n==null?void 0:n.token;x0!==i&&(x0=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function CV(t=x1()){const e=$u(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Jj(t,{popupRedirectResolver:IV,persistence:[OD,ED,sE]}),r=p1("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=RV(s.toString());xD(n,o,()=>o(n.currentUser)),vD(n,l=>o(l))}}const i=d1("auth");return i&&Zj(n,`http://${i}`),n}function jV(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}qj({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=wn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",jV().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});NV("Browser");/**
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
 */const hE="firebasestorage.googleapis.com",pE="storageBucket",DV=2*60*1e3,VV=10*60*1e3;/**
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
 */class ze extends In{constructor(e,n,r=0){super(Th(e),`Firebase Storage: ${n} (${Th(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ze.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Th(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Le;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Le||(Le={}));function Th(t){return"storage/"+t}function lg(){const t="An unknown error occurred, please check the error payload for server response.";return new ze(Le.UNKNOWN,t)}function OV(t){return new ze(Le.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function MV(t){return new ze(Le.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function LV(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ze(Le.UNAUTHENTICATED,t)}function zV(){return new ze(Le.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function FV(t){return new ze(Le.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function UV(){return new ze(Le.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function BV(){return new ze(Le.CANCELED,"User canceled the upload/download.")}function $V(t){return new ze(Le.INVALID_URL,"Invalid URL '"+t+"'.")}function qV(t){return new ze(Le.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function HV(){return new ze(Le.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+pE+"' property when initializing the app?")}function KV(){return new ze(Le.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function WV(){return new ze(Le.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function GV(t){return new ze(Le.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function sf(t){return new ze(Le.INVALID_ARGUMENT,t)}function fE(){return new ze(Le.APP_DELETED,"The Firebase app was deleted.")}function QV(t){return new ze(Le.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function ua(t,e){return new ze(Le.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function Oo(t){throw new ze(Le.INTERNAL_ERROR,"Internal error: "+t)}/**
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
 */class zt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=zt.makeFromUrl(e,n)}catch{return new zt(e,"")}if(r.path==="")return r;throw qV(e)}static makeFromUrl(e,n){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(N){N.path.charAt(N.path.length-1)==="/"&&(N.path_=N.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+i+o,"i"),u={bucket:1,path:3};function d(N){N.path_=decodeURIComponent(N.path)}const p="v[A-Za-z0-9_]+",f=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",k=new RegExp(`^https?://${f}/${p}/b/${i}/o${g}`,"i"),A={bucket:1,path:3},w=n===hE?"(?:storage.googleapis.com|storage.cloud.google.com)":n,E="([^?#]*)",y=new RegExp(`^https?://${w}/${i}/${E}`,"i"),v=[{regex:l,indices:u,postModify:s},{regex:k,indices:A,postModify:d},{regex:y,indices:{bucket:1,path:2},postModify:d}];for(let N=0;N<v.length;N++){const O=v[N],L=O.regex.exec(e);if(L){const S=L[O.indices.bucket];let b=L[O.indices.path];b||(b=""),r=new zt(S,b),O.postModify(r);break}}if(r==null)throw $V(e);return r}}class YV{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function JV(t,e,n){let r=1,i=null,s=null,o=!1,l=0;function u(){return l===2}let d=!1;function p(...E){d||(d=!0,e.apply(null,E))}function f(E){i=setTimeout(()=>{i=null,t(k,u())},E)}function g(){s&&clearTimeout(s)}function k(E,...y){if(d){g();return}if(E){g(),p.call(null,E,...y);return}if(u()||o){g(),p.call(null,E,...y);return}r<64&&(r*=2);let v;l===1?(l=2,v=0):v=(r+Math.random())*1e3,f(v)}let A=!1;function w(E){A||(A=!0,g(),!d&&(i!==null?(E||(l=2),clearTimeout(i),f(0)):E||(l=1)))}return f(0),s=setTimeout(()=>{o=!0,w(!0)},n),w}function XV(t){t(!1)}/**
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
 */function ZV(t){return t!==void 0}function eO(t){return typeof t=="object"&&!Array.isArray(t)}function cg(t){return typeof t=="string"||t instanceof String}function _0(t){return ug()&&t instanceof Blob}function ug(){return typeof Blob<"u"}function w0(t,e,n,r){if(r<e)throw sf(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw sf(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
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
 */function dg(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function mE(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const i=e(r)+"="+e(t[r]);n=n+i+"&"}return n=n.slice(0,-1),n}var wi;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(wi||(wi={}));/**
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
 */function tO(t,e){const n=t>=500&&t<600,i=[408,429].indexOf(t)!==-1,s=e.indexOf(t)!==-1;return n||i||s}/**
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
 */class nO{constructor(e,n,r,i,s,o,l,u,d,p,f,g=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=p,this.connectionFactory_=f,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((k,A)=>{this.resolve_=k,this.reject_=A,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new ec(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=l=>{const u=l.loaded,d=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const l=s.getErrorCode()===wi.NO_ERROR,u=s.getStatus();if(!l||tO(u,this.additionalRetryCodes_)&&this.retry){const p=s.getErrorCode()===wi.ABORT;r(!1,new ec(!1,null,p));return}const d=this.successCodes_.indexOf(u)!==-1;r(!0,new ec(d,s))})},n=(r,i)=>{const s=this.resolve_,o=this.reject_,l=i.connection;if(i.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());ZV(u)?s(u):s()}catch(u){o(u)}else if(l!==null){const u=lg();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(i.canceled){const u=this.appDelete_?fE():BV();o(u)}else{const u=UV();o(u)}};this.canceled_?n(!1,new ec(!1,null,!0)):this.backoffId_=JV(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&XV(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ec{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function rO(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function iO(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function sO(t,e){e&&(t["X-Firebase-GMPID"]=e)}function oO(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function aO(t,e,n,r,i,s,o=!0){const l=mE(t.urlParams),u=t.url+l,d=Object.assign({},t.headers);return sO(d,e),rO(d,n),iO(d,s),oO(d,r),new nO(u,t.method,d,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i,o)}/**
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
 */function lO(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function cO(...t){const e=lO();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(ug())return new Blob(t);throw new ze(Le.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function uO(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
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
 */function dO(t){if(typeof atob>"u")throw GV("base-64");return atob(t)}/**
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
 */const gn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Eh{constructor(e,n){this.data=e,this.contentType=n||null}}function hO(t,e){switch(t){case gn.RAW:return new Eh(gE(e));case gn.BASE64:case gn.BASE64URL:return new Eh(yE(t,e));case gn.DATA_URL:return new Eh(fO(e),mO(e))}throw lg()}function gE(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=t.charCodeAt(++n);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function pO(t){let e;try{e=decodeURIComponent(t)}catch{throw ua(gn.DATA_URL,"Malformed data URL.")}return gE(e)}function yE(t,e){switch(t){case gn.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw ua(t,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case gn.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw ua(t,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=dO(e)}catch(i){throw i.message.includes("polyfill")?i:ua(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}class vE{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw ua(gn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=gO(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function fO(t){const e=new vE(t);return e.base64?yE(gn.BASE64,e.rest):pO(e.rest)}function mO(t){return new vE(t).contentType}function gO(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
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
 */class xr{constructor(e,n){let r=0,i="";_0(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,n){if(_0(this.data_)){const r=this.data_,i=uO(r,e,n);return i===null?null:new xr(i)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new xr(r,!0)}}static getBlob(...e){if(ug()){const n=e.map(r=>r instanceof xr?r.data_:r);return new xr(cO.apply(null,n))}else{const n=e.map(o=>cg(o)?hO(gn.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return n.forEach(o=>{for(let l=0;l<o.length;l++)i[s++]=o[l]}),new xr(i,!0)}}uploadData(){return this.data_}}/**
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
 */function xE(t){let e;try{e=JSON.parse(t)}catch{return null}return eO(e)?e:null}/**
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
 */function yO(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function vO(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function _E(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
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
 */function xO(t,e){return e}class vt{constructor(e,n,r,i){this.server=e,this.local=n||e,this.writable=!!r,this.xform=i||xO}}let tc=null;function _O(t){return!cg(t)||t.length<2?t:_E(t)}function wE(){if(tc)return tc;const t=[];t.push(new vt("bucket")),t.push(new vt("generation")),t.push(new vt("metageneration")),t.push(new vt("name","fullPath",!0));function e(s,o){return _O(o)}const n=new vt("name");n.xform=e,t.push(n);function r(s,o){return o!==void 0?Number(o):o}const i=new vt("size");return i.xform=r,t.push(i),t.push(new vt("timeCreated")),t.push(new vt("updated")),t.push(new vt("md5Hash",null,!0)),t.push(new vt("cacheControl",null,!0)),t.push(new vt("contentDisposition",null,!0)),t.push(new vt("contentEncoding",null,!0)),t.push(new vt("contentLanguage",null,!0)),t.push(new vt("contentType",null,!0)),t.push(new vt("metadata","customMetadata",!0)),tc=t,tc}function wO(t,e){function n(){const r=t.bucket,i=t.fullPath,s=new zt(r,i);return e._makeStorageReference(s)}Object.defineProperty(t,"ref",{get:n})}function bO(t,e,n){const r={};r.type="file";const i=n.length;for(let s=0;s<i;s++){const o=n[s];r[o.local]=o.xform(r,e[o.server])}return wO(r,t),r}function bE(t,e,n){const r=xE(e);return r===null?null:bO(t,r,n)}function TO(t,e,n,r){const i=xE(e);if(i===null||!cg(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(d=>{const p=t.bucket,f=t.fullPath,g="/b/"+o(p)+"/o/"+o(f),k=dg(g,n,r),A=mE({alt:"media",token:d});return k+A})[0]}function EO(t,e){const n={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(n[s.server]=t[s.local])}return JSON.stringify(n)}class TE{constructor(e,n,r,i){this.url=e,this.method=n,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function EE(t){if(!t)throw lg()}function IO(t,e){function n(r,i){const s=bE(t,i,e);return EE(s!==null),s}return n}function SO(t,e){function n(r,i){const s=bE(t,i,e);return EE(s!==null),TO(s,i,t.host,t._protocol)}return n}function IE(t){function e(n,r){let i;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?i=zV():i=LV():n.getStatus()===402?i=MV(t.bucket):n.getStatus()===403?i=FV(t.path):i=r,i.status=n.getStatus(),i.serverResponse=r.serverResponse,i}return e}function kO(t){const e=IE(t);function n(r,i){let s=e(r,i);return r.getStatus()===404&&(s=OV(t.path)),s.serverResponse=i.serverResponse,s}return n}function NO(t,e,n){const r=e.fullServerUrl(),i=dg(r,t.host,t._protocol),s="GET",o=t.maxOperationRetryTime,l=new TE(i,s,SO(t,n),o);return l.errorHandler=kO(e),l}function PO(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function AO(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=PO(null,e)),r}function RO(t,e,n,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function l(){let v="";for(let N=0;N<2;N++)v=v+Math.random().toString().slice(2);return v}const u=l();o["Content-Type"]="multipart/related; boundary="+u;const d=AO(e,r,i),p=EO(d,n),f="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+p+`\r
--`+u+`\r
Content-Type: `+d.contentType+`\r
\r
`,g=`\r
--`+u+"--",k=xr.getBlob(f,r,g);if(k===null)throw KV();const A={name:d.fullPath},w=dg(s,t.host,t._protocol),E="POST",y=t.maxUploadRetryTime,_=new TE(w,E,IO(t,n),y);return _.urlParams=A,_.headers=o,_.body=k.uploadData(),_.errorHandler=IE(e),_}class CO{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=wi.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=wi.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=wi.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,i){if(this.sent_)throw Oo("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),i!==void 0)for(const s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Oo("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Oo("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Oo("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Oo("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class jO extends CO{initXhr(){this.xhr_.responseType="text"}}function SE(){return new jO}/**
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
 */class zi{constructor(e,n){this._service=e,n instanceof zt?this._location=n:this._location=zt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new zi(e,n)}get root(){const e=new zt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return _E(this._location.path)}get storage(){return this._service}get parent(){const e=yO(this._location.path);if(e===null)return null;const n=new zt(this._location.bucket,e);return new zi(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw QV(e)}}function DO(t,e,n){t._throwIfRoot("uploadBytes");const r=RO(t.storage,t._location,wE(),new xr(e,!0),n);return t.storage.makeRequestWithTokens(r,SE).then(i=>({metadata:i,ref:t}))}function VO(t){t._throwIfRoot("getDownloadURL");const e=NO(t.storage,t._location,wE());return t.storage.makeRequestWithTokens(e,SE).then(n=>{if(n===null)throw WV();return n})}function OO(t,e){const n=vO(t._location.path,e),r=new zt(t._location.bucket,n);return new zi(t.storage,r)}/**
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
 */function MO(t){return/^[A-Za-z]+:\/\//.test(t)}function LO(t,e){return new zi(t,e)}function kE(t,e){if(t instanceof hg){const n=t;if(n._bucket==null)throw HV();const r=new zi(n,n._bucket);return e!=null?kE(r,e):r}else return e!==void 0?OO(t,e):t}function zO(t,e){if(e&&MO(e)){if(t instanceof hg)return LO(t,e);throw sf("To use ref(service, url), the first argument must be a Storage instance.")}else return kE(t,e)}function b0(t,e){const n=e==null?void 0:e[pE];return n==null?null:zt.makeFromBucketSpec(n,t)}function FO(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:i}=r;i&&(t._overrideAuthToken=typeof i=="string"?i:N2(i,t.app.options.projectId))}class hg{constructor(e,n,r,i,s){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=hE,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=DV,this._maxUploadRetryTime=VV,this._requests=new Set,i!=null?this._bucket=zt.makeFromBucketSpec(i,this._host):this._bucket=b0(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=zt.makeFromBucketSpec(this._url,e):this._bucket=b0(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){w0("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){w0("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new zi(this,e)}_makeRequest(e,n,r,i,s=!0){if(this._deleted)return new YV(fE());{const o=aO(e,this._appId,r,i,n,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,i).getPromise()}}const T0="@firebase/storage",E0="0.13.2";/**
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
 */const NE="storage";function PE(t,e,n){return t=Me(t),DO(t,e,n)}function AE(t){return t=Me(t),VO(t)}function RE(t,e){return t=Me(t),zO(t,e)}function UO(t=x1(),e){t=Me(t);const r=$u(t,NE).getImmediate({identifier:e}),i=S2("storage");return i&&BO(r,...i),r}function BO(t,e,n,r={}){FO(t,e,n,r)}function $O(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new hg(n,r,i,e,$i)}function qO(){Ni(new Fr(NE,$O,"PUBLIC").setMultipleInstances(!0)),xn(T0,E0,""),xn(T0,E0,"esm2017")}qO();const HO={apiKey:"AIzaSyDgvUowdRyc6CIsKKSHqJHyNQnFsWQ1h_U",authDomain:"tyresathi-93306.firebaseapp.com",projectId:"tyresathi-93306",storageBucket:"tyresathi-93306.firebasestorage.app",messagingSenderId:"71107233578",appId:"1:71107233578:web:b662874092abc23bd54053"},pg=v1(HO),on=XC(pg,{localCache:pj({tabManager:yj()})}),ts=CV(pg),CE=UO(pg),ue={CUSTOMER:"customer",SHOP_OWNER:"shop_owner",ADMIN:"admin",USER:"customer",VENDOR:"shop_owner"},jE=D.createContext();function KO({children:t}){const[e,n]=D.useState(null),[r,i]=D.useState(null),[s,o]=D.useState(ue.CUSTOMER),[l,u]=D.useState(!0);function d(E,y){return gD(ts,E,y)}async function p({name:E,phone:y,email:_,password:v,role:N=ue.CUSTOMER,shopName:O=""}){const L=await c0(ts,_,v);if(E)try{await u0(L.user,{displayName:E})}catch(b){console.warn("Could not update displayName",b)}const S={uid:L.user.uid,name:E||"",phone:y||"",email:_||"",role:N||ue.CUSTOMER,shopName:O||"",shopApproved:N===ue.SHOP_OWNER,photoURL:"",address:"",city:"",openingHours:"09:00 AM - 09:00 PM",createdAt:Oi()};try{await Xx(_i(on,"users",L.user.uid),S)}catch(b){console.error("Firestore user creation warning:",b)}return i(S),o(S.role),L}async function f(E){if(!e)return;const y=e.uid,_={...r||{},...E,uid:y,email:E.email||(r==null?void 0:r.email)||e.email,updatedAt:Oi()};if(E.name||E.photoURL)try{await u0(e,{displayName:E.name||e.displayName,photoURL:E.photoURL||e.photoURL})}catch(v){console.warn("Could not update auth profile:",v)}try{await Xx(_i(on,"users",y),_,{merge:!0})}catch(v){console.warn("Firestore user update warning:",v)}return i(_),E.role&&o(E.role),_}function g(E,y){return c0(ts,E,y)}function k(){return i(null),o(ue.CUSTOMER),wD(ts)}function A(E){return mD(ts,E)}D.useEffect(()=>_D(ts,async y=>{var _,v;if(n(y),y)try{const N=await NT(_i(on,"users",y.uid));if(N.exists()){const O=N.data();i(O),o(O.role||ue.CUSTOMER)}else{const O={uid:y.uid,email:y.email,name:y.displayName||((_=y.email)==null?void 0:_.split("@")[0])||"User",role:ue.CUSTOMER,photoURL:y.photoURL||"",phone:"",shopName:""};i(O),o(ue.CUSTOMER)}}catch(N){console.error("Firestore user fetch error:",N);const O={uid:y.uid,email:y.email,name:y.displayName||((v=y.email)==null?void 0:v.split("@")[0])||"User",role:ue.CUSTOMER,photoURL:y.photoURL||"",phone:"",shopName:""};i(O),o(ue.CUSTOMER)}else i(null),o(ue.CUSTOMER);u(!1)}),[]);const w={user:e,currentUser:e,profile:r,userData:r,role:s,loading:l,login:d,register:p,signup:g,updateUserProfile:f,logout:k,resetPassword:A,isAdmin:s==="admin"||s===ue.ADMIN,isVendor:s==="vendor"||s==="shop_owner"||s===ue.SHOP_OWNER||s===ue.VENDOR,isShopOwner:s==="shop_owner"||s===ue.SHOP_OWNER};return a.jsx(jE.Provider,{value:w,children:t})}function nr(){return D.useContext(jE)}const Ga=[{name:"Apollo",popular:!0,count:"120+ Products"},{name:"Bridgestone",popular:!0,count:"95+ Products"},{name:"Ceat",popular:!0,count:"140+ Products"},{name:"Continental",popular:!0,count:"60+ Products"},{name:"Clearance",tag:"Sale",count:"Special Deals"},{name:"Firestone",count:"35+ Products"},{name:"Goodyear",popular:!0,count:"80+ Products"},{name:"JK Tyre",popular:!0,count:"110+ Products"},{name:"Kelly",count:"25+ Products"},{name:"Michelin",popular:!0,count:"75+ Products"},{name:"Pirelli",popular:!0,count:"45+ Products"},{name:"Vredestein",count:"30+ Products"},{name:"Ralco",popular:!0,count:"55+ Products"},{name:"reise",count:"20+ Products"},{name:"TVS Eurogrip",popular:!0,count:"90+ Products"},{name:"Vee Rubber",count:"15+ Products"},{name:"Metzeler",count:"25+ Products"},{name:"Metro",count:"40+ Products"},{name:"ARF",count:"18+ Products"},{name:"ARL",count:"12+ Products"},{name:"Auto Boss",count:"30+ Products"},{name:"Classic",count:"22+ Products"},{name:"Galaxy",count:"15+ Products"},{name:"Maruti",count:"28+ Products"},{name:"META GOLD",count:"16+ Products"},{name:"Moly Lube",count:"14+ Products"},{name:"NEO Wheels",tag:"Alloy",count:"40+ Designs"},{name:"Onyx",count:"20+ Products"},{name:"PLATI Alloy Wheels",tag:"Alloy",count:"50+ Designs"},{name:"MY TVS",count:"35+ Products"},{name:"MRF",popular:!0,count:"180+ Products"},{name:"Yokohama",popular:!0,count:"65+ Products"}],Qa=[{id:"two_wheeler",name:"Two-Wheeler (Bike / Scooter / EV)",icon:"🏍️"},{id:"passenger_car",name:"Passenger Car & Hatchback",icon:"🚗"},{id:"suv_muv",name:"SUV & Compact MUV",icon:"🚙"},{id:"commercial",name:"Commercial (Truck / Bus / LCV)",icon:"🚚"},{id:"tractor_agri",name:"Tractor & Agriculture Farm",icon:"🚜"},{id:"auto_rickshaw",name:"Auto Rickshaw (3-Wheeler)",icon:"🛺"},{id:"otr_industrial",name:"OTR & Industrial Crane",icon:"🏗️"},{id:"alloy_wheels",name:"Alloy Wheels & Designer Rims",icon:"✨"}],Ih={two_wheeler:["Scooter (Activa, Jupiter, Access)","Motorcycle (100cc-150cc)","Sports Bike (150cc-400cc)","Electric Scooter (Ola, Ather, Chetak)","Bullet / Royal Enfield Classic"],passenger_car:["Hatchback (Swift, WagonR, i10, Tiago)","Sedan (City, Verna, Dzire, Amaze)","Premium Sedan (Octavia, Camry)"],suv_muv:["Compact SUV (Brezza, Nexon, Creta, Seltos)","Full-Size SUV (Scorpio, Thar, Safari, Fortuner)","MUV / MPV (Innova, Ertiga, Carens)"],commercial:["Small LCV (Tata Ace, Bolero Maxi Truck)","Medium LCV (Eicher, 407)","Heavy Commercial (10-Wheeler, 12-Wheeler Truck)","Intercity Bus / Volvo"],tractor_agri:["Tractor Front Steering","Tractor Rear Traction (12.4/13.6/14.9)","Harvester & Trailer"],auto_rickshaw:["Passenger 3-Wheeler (Bajaj, Piaggio)","Cargo Load Carrier 3-Wheeler","Electric Auto (E-Rickshaw)"],otr_industrial:["JCB Backhoe Loader","Forklift & Warehouse Crane","Mining Tipper Dumper"],alloy_wheels:["13 Inch Alloys","14 Inch Alloys","15 Inch Alloys","16 Inch Alloys","17+ Inch Diamond Cut Alloys"]},Sh={two_wheeler:["90/90-12","100/90-17","80/100-18","2.75-17","3.00-18","140/70-17","110/80-17","120/80-18","90/100-10"],passenger_car:["145/80 R12","155/80 R13","165/80 R14","175/65 R14","185/65 R15","185/70 R14","195/65 R15","205/55 R16","205/60 R16"],suv_muv:["215/60 R16","215/65 R16","235/65 R17","265/65 R17","215/60 R17","225/65 R17","255/60 R18","265/60 R18"],commercial:["10.00-20","295/80 R22.5","7.50-16","8.25-16","11.00-20","155 R13 LT","7.00 R15 LT"],tractor_agri:["6.00-16","12.4-28","13.6-28","14.9-28","7.50-16","16.9-28"],auto_rickshaw:["4.00-8","4.50-10","145/70 R12","3.75-12"],otr_industrial:["12.5/80-18","14.00-24","16.9-28","23.5-25"],alloy_wheels:["PCD 100 4-Hole (14 Inch)","PCD 100 4-Hole (15 Inch)","PCD 114.3 5-Hole (16 Inch)","PCD 114.3 5-Hole (17 Inch)"]},WO=["MRF Zapper FX (Tubeless)","MRF Nylogrip Ezeeride","MRF ZVTV Premium","MRF Wanderer Street AT","MRF Super Lug 50","Apollo Amazer 4G Life","Apollo Alnac 4G","Apollo Apterra AT2","Apollo ActiGrip R1","CEAT Secura Zoom","CEAT Milaze X3","CEAT CrossDrive AT","CEAT Gripp X3","Bridgestone Turanza T005","Bridgestone Ecopia EP150","Bridgestone B290","Bridgestone Dueler D684","Michelin Primacy 4 ST","Michelin Energy XM2+","Michelin LTX Trail","Goodyear Assurance TripleMax 2","Goodyear Wrangler AT SilentTrac","JK Tyre UX Royale","JK Tyre Elanzo Touring","TVS Eurogrip Dragon Tube/Tubeless","Ralco Speed Blaster","Yokohama Earth-1 E400","Yokohama Geolandar A/T G015"],nc=[{id:"cut_repair",name:"Tyre Cut & Sidewall Repair (टायर कट रिपेयर)",duration:"45 Mins",price:350},{id:"puncture",name:"Tubeless Puncture Repair (पंचर रिपेयर)",duration:"15 Mins",price:100},{id:"alignment",name:"3D Wheel Alignment & Balancing (अलाइनमेंट)",duration:"30 Mins",price:450},{id:"fitting",name:"New Tyre Fitting & Nitrogen Fill (फिटिंग)",duration:"20 Mins",price:150},{id:"doorstep",name:"Doorstep Emergency Assistance (घर/रास्ते पर सर्विस)",duration:"45 Mins",price:499},{id:"rotation",name:"Tyre Rotation & Brake Check (रोटेशन)",duration:"25 Mins",price:250}],_r=[{id:"shop-blr-central",name:"TyreSaathi Partner Hub — Central",ownerName:"Verified Partner",phone:"",rating:4.8,reviewsCount:128,address:"Near Auto Complex, Central Market Area, Bengaluru, Karnataka",city:"Bengaluru",distanceKm:1.2,isNearest:!0,coordinates:{lat:12.9716,lng:77.5946},servicesOffered:["Tyre Replacement","Cut Repair","Wheel Alignment","Nitrogen Air"],isOpen:!0},{id:"shop-blr-south",name:"TyreSaathi Express Center — South",ownerName:"Verified Partner",phone:"",rating:4.7,reviewsCount:94,address:"Main Road, Near Petrol Station, South Zone, Bengaluru, Karnataka",city:"Bengaluru",distanceKm:2.8,isNearest:!0,coordinates:{lat:12.9352,lng:77.6245},servicesOffered:["Tyre Sales","Puncture Repair","Doorstep Mobile Van"],isOpen:!0},{id:"shop-delhi-ncr",name:"TyreSaathi Super Hub — NCR",ownerName:"Verified Partner",phone:"",rating:4.9,reviewsCount:210,address:"Auto Market Sector, Ring Road Area, New Delhi, Delhi NCR",city:"Delhi NCR",distanceKm:4.2,isNearest:!1,coordinates:{lat:28.6139,lng:77.209},servicesOffered:["Complete Wheel Care","Alloy Wheels","Doorstep Mobile Van"],isOpen:!0},{id:"shop-mumbai-west",name:"TyreSaathi Partner Wheels — West",ownerName:"Verified Partner",phone:"",rating:4.7,reviewsCount:145,address:"Link Road, Metro Corridor Area, Andheri, Mumbai, Maharashtra",city:"Mumbai",distanceKm:5,isNearest:!1,coordinates:{lat:19.1363,lng:72.8277},servicesOffered:["Tubeless Specialist","Nitrogen Air","Alloy Wheels"],isOpen:!0},{id:"shop-erode-hub",name:"TyreSaathi Service Hub — Erode",ownerName:"Verified Partner",phone:"",rating:4.6,reviewsCount:76,address:"Main Road, Commercial Center, Erode, Tamil Nadu",city:"Erode",distanceKm:3.5,isNearest:!1,coordinates:{lat:11.341,lng:77.7172},servicesOffered:["All Vehicle Tyres","Wheel Balancing","Tube Repair"],isOpen:!0}],of=[{id:"prod-1",productName:"MRF Zapper FX 100/90-17 Tubeless Bike Tyre",productType:"tyre",brandName:"MRF",categoryName:"Two-Wheeler (Bike / Scooter / EV)",vehicleTypeName:"Motorcycle (100cc-150cc)",sizeName:"100/90-17",modelName:"MRF Zapper FX (Tubeless)",originalPrice:2450,offerPrice:2099,stock:8,published:!0,condition:"new",shopId:"shop-blr-central",shopName:"TyreSaathi Partner Hub",shopPhone:"",distanceKm:1.2,isNearest:!0,images:["https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80"],description:"High performance bike rear tyre with deep water grooving and 5 years manufacturer warranty."},{id:"prod-2",productName:"Apollo Amazer 4G Life 185/65 R15 Car Tyre",productType:"tyre",brandName:"Apollo",categoryName:"Passenger Car & Hatchback",vehicleTypeName:"Sedan (City, Verna, Dzire, Amaze)",sizeName:"185/65 R15",modelName:"Apollo Amazer 4G Life",originalPrice:5200,offerPrice:4350,stock:12,published:!0,condition:"new",shopId:"shop-blr-central",shopName:"TyreSaathi Partner Hub",shopPhone:"",distanceKm:1.2,isNearest:!0,images:["https://images.unsplash.com/photo-1549497538-303791108f95?w=600&auto=format&fit=crop&q=80"],description:"Guaranteed 100,000 km tread life with ultra micro-silica compound for maximum fuel efficiency."},{id:"prod-3",productName:"CEAT Milaze X3 165/80 R14 Durable Car Tyre",productType:"tyre",brandName:"Ceat",categoryName:"Passenger Car & Hatchback",vehicleTypeName:"Hatchback (Swift, WagonR, i10, Tiago)",sizeName:"165/80 R14",modelName:"CEAT Milaze X3",originalPrice:4100,offerPrice:3499,stock:6,published:!0,condition:"new",shopId:"shop-blr-south",shopName:"TyreSaathi Express Center",shopPhone:"",distanceKm:2.8,isNearest:!0,images:["https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80"],description:"Specially crafted for Indian roads with high rubber content and 3 years unconditional warranty."},{id:"prod-4",productName:"Bridgestone Turanza T005 205/55 R16 Premium Tyre",productType:"tyre",brandName:"Bridgestone",categoryName:"Passenger Car & Hatchback",vehicleTypeName:"Premium Sedan (Octavia, Camry)",sizeName:"205/55 R16",modelName:"Bridgestone Turanza T005",originalPrice:8900,offerPrice:7650,stock:4,published:!0,condition:"new",shopId:"shop-erode-hub",shopName:"TyreSaathi Service Hub",shopPhone:"",distanceKm:3.5,isNearest:!1,images:["https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80"],description:"Ultra quiet luxury touring tyre with highest safety rating on wet surfaces."},{id:"prod-5",productName:"PLATI 16 Inch Diamond Cut Alloy Wheels (Set of 4)",productType:"custom",brandName:"PLATI Alloy Wheels",categoryName:"Alloy Wheels & Designer Rims",vehicleTypeName:"16 Inch Alloys",sizeName:"PCD 114.3 5-Hole (16 Inch)",modelName:"PLATI Diamond Cut Racing Black",originalPrice:36e3,offerPrice:29999,stock:2,published:!0,condition:"new",shopId:"shop-delhi-ncr",shopName:"TyreSaathi Super Hub",shopPhone:"",distanceKm:4.2,isNearest:!1,images:["https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600&auto=format&fit=crop&q=80"],description:"Lightweight aircraft grade alloy wheels with hyper-gloss CNC diamond cut finish."}];function GO({onMenuClick:t}){const{theme:e,toggleTheme:n}=a1(),{user:r,profile:i,logout:s,isVendor:o}=nr(),l=cn(),[u,d]=D.useState(!1),[p,f]=D.useState(!1),[g,k]=D.useState(""),A=D.useRef(null),w=D.useRef(null);D.useEffect(()=>{function N(O){A.current&&!A.current.contains(O.target)&&d(!1),w.current&&!w.current.contains(O.target)&&f(!1)}return document.addEventListener("mousedown",N),()=>document.removeEventListener("mousedown",N)},[]);const E=N=>{N.preventDefault(),g.trim()&&l(`/search?q=${encodeURIComponent(g.trim())}`)},y=N=>{d(!1),l(`/search?brand=${encodeURIComponent(N)}`)},_=N=>{d(!1),l(`/search?category=${encodeURIComponent(N)}`)},v=async()=>{f(!1),await s(),l("/login")};return a.jsxs("header",{className:"main-site-header",children:[a.jsx("div",{className:"top-utility-bar",children:a.jsxs("div",{className:"utility-container",children:[a.jsxs("div",{className:"top-left-info",children:[a.jsx("span",{className:"top-phone",children:"⚡ TyreSaathi — India's Verified Tyre & Service Network"}),a.jsx("span",{className:"top-timing",children:"🛡️ 100% Genuine Tyres & Authorized Fitment"})]}),a.jsxs("div",{className:"top-right-tools",children:[a.jsxs("button",{className:"utility-tool-btn",onClick:n,title:"Toggle Theme",children:[e==="dark"?a.jsx(n1,{size:14}):a.jsx(e1,{size:14}),a.jsx("span",{children:e==="dark"?"Light":"Dark"})]}),a.jsxs("div",{className:"user-profile-menu-wrap",ref:w,children:[a.jsxs("button",{className:"utility-tool-btn user-btn",onClick:()=>f(!p),children:[a.jsx(ja,{size:14}),a.jsx("span",{children:i!=null&&i.name?i.name.split(" ")[0]:r?"My Account":"Login"}),a.jsx(Rv,{size:12})]}),p&&a.jsx("div",{className:"dropdown-panel user-dropdown",children:r?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"user-dropdown-header",children:[a.jsx("strong",{children:(i==null?void 0:i.name)||"TyreSaathi User"}),a.jsx("span",{className:"role-tag",children:(i==null?void 0:i.role)==="shop_owner"?"🏪 Shop Owner":"👤 Customer"}),a.jsx("small",{children:r.email})]}),a.jsx("div",{className:"dropdown-divider"}),a.jsxs(fe,{to:"/profile",className:"dropdown-item",onClick:()=>f(!1),children:[a.jsx(ja,{size:14})," My Profile & Settings"]}),a.jsxs(fe,{to:"/bookings",className:"dropdown-item",onClick:()=>f(!1),children:[a.jsx(Bi,{size:14})," My Bookings"]}),a.jsxs(fe,{to:"/billing",className:"dropdown-item",onClick:()=>f(!1),children:[a.jsx(mi,{size:14})," Shop Billing & Invoices"]}),o&&a.jsxs(fe,{to:"/shop/add-product",className:"dropdown-item",onClick:()=>f(!1),children:[a.jsx(eu,{size:14})," Add Product / Service"]}),a.jsx("div",{className:"dropdown-divider"}),a.jsxs("button",{className:"dropdown-item logout-item",onClick:v,children:[a.jsx(Zw,{size:14})," Logout"]})]}):a.jsxs(a.Fragment,{children:[a.jsx(fe,{to:"/login",className:"dropdown-item",onClick:()=>f(!1),children:"Login to Account"}),a.jsx(fe,{to:"/register",className:"dropdown-item",onClick:()=>f(!1),children:"Register New Account"})]})})]}),a.jsxs(fe,{to:"/bookings",className:"top-cart-btn",title:"View Bookings & Cart",children:[a.jsx(p2,{size:15}),a.jsx("span",{className:"cart-badge-count",children:"0"})]})]})]})}),a.jsx("div",{className:"main-nav-bar",children:a.jsxs("div",{className:"nav-container",children:[a.jsx("button",{className:"mobile-hamburger-btn",onClick:t,"aria-label":"Toggle Menu",children:a.jsx(c2,{size:24})}),a.jsxs(fe,{to:"/",className:"site-brand-logo",children:[a.jsx("img",{src:"/logo.png",alt:"TyreSaathi Logo",className:"logo-img",onError:N=>{N.target.src="/tyresaathi-logo.png"}}),a.jsxs("div",{className:"logo-text-group",children:[a.jsxs("span",{className:"brand-primary-name",children:["TYRE",a.jsx("span",{className:"brand-highlight",children:"SAATHI"})]}),a.jsx("span",{className:"brand-tagline",children:"India's Trusted Tyre & Service Network"})]})]}),a.jsxs("nav",{className:"desktop-nav-links",children:[a.jsx(Vn,{to:"/",end:!0,className:({isActive:N})=>`nav-link ${N?"nav-link-active":""}`,children:"HOME"}),a.jsxs("div",{className:"categories-mega-wrap",ref:A,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),children:[a.jsxs("button",{className:`nav-link categories-trigger-btn ${u?"nav-link-active":""}`,onClick:()=>d(!u),children:["CATEGORIES ",a.jsx(Rv,{size:14,className:`chevron-icon ${u?"chevron-open":""}`})]}),u&&a.jsx("div",{className:"mega-menu-panel",children:a.jsxs("div",{className:"mega-menu-inner",children:[a.jsxs("div",{className:"mega-categories-sidebar",children:[a.jsx("h4",{className:"mega-col-title",children:"Vehicle Types"}),a.jsx("ul",{className:"cat-type-list",children:Qa.map(N=>a.jsx("li",{children:a.jsxs("button",{onClick:()=>_(N.id),children:[a.jsx("span",{children:N.icon})," ",N.name]})},N.id))})]}),a.jsxs("div",{className:"mega-brands-grid-wrap",children:[a.jsxs("div",{className:"mega-brands-header",children:[a.jsx("h4",{className:"mega-col-title",children:"Popular Tyre & Wheel Brands"}),a.jsx("span",{className:"brands-subnote",children:"Click on any brand to view available tyres and sizes"})]}),a.jsx("div",{className:"mega-brands-multi-columns",children:Ga.map((N,O)=>a.jsxs("button",{className:`mega-brand-btn ${N.popular?"mega-brand-popular":""} ${N.tag?"mega-brand-tagged":""}`,onClick:()=>y(N.name),children:[a.jsx("span",{className:"brand-title-text",children:N.name}),N.tag&&a.jsx("span",{className:"brand-deal-tag",children:N.tag})]},O))})]})]})})]}),a.jsx(Vn,{to:"/store-location",className:({isActive:N})=>`nav-link ${N?"nav-link-active":""}`,children:"STORE LOCATION"}),a.jsx(Vn,{to:"/bookings",className:({isActive:N})=>`nav-link ${N?"nav-link-active":""}`,children:"BOOKINGS"}),a.jsx(Vn,{to:"/billing",className:({isActive:N})=>`nav-link ${N?"nav-link-active":""}`,children:"BILLING"}),a.jsx(Vn,{to:"/search",className:({isActive:N})=>`nav-link ${N?"nav-link-active":""}`,children:"SEARCH"}),a.jsx(Vn,{to:"/privacy-policy",className:({isActive:N})=>`nav-link ${N?"nav-link-active":""}`,children:"ABOUT US"})]}),a.jsxs("div",{className:"nav-right-actions",children:[a.jsxs("form",{onSubmit:E,className:"nav-search-form",children:[a.jsx("input",{type:"text",placeholder:"Search tyres, sizes (e.g. 185/65 R15)...",value:g,onChange:N=>k(N.target.value)}),a.jsx("button",{type:"submit","aria-label":"Search",children:a.jsx(ki,{size:16})})]}),o&&a.jsxs(fe,{to:"/shop/add-product",className:"nav-add-product-btn",title:"Add Product to Shop",children:[a.jsx(eu,{size:15}),a.jsx("span",{children:"Add Product"})]})]})]})}),a.jsx("style",{children:`
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
      `})]})}const DE=[{to:"/",label:"Home",icon:o2,end:!0},{to:"/search",label:"Search",icon:ki},{to:"/store-location",label:"Stores",icon:Ra},{to:"/bookings",label:"Bookings",icon:Bi},{to:"/billing",label:"Billing",icon:mi},{to:"/profile",label:"Profile",icon:ja}];function QO({open:t,onClose:e}){return a.jsxs(a.Fragment,{children:[t&&a.jsx("div",{className:"sidebar-backdrop",onClick:e}),a.jsxs("aside",{className:"sidebar"+(t?" sidebar-open":""),children:[a.jsxs("div",{className:"sidebar-header",children:[a.jsx("span",{className:"brand-font sidebar-title",children:"Menu"}),a.jsx("button",{className:"icon-btn sidebar-close",onClick:e,"aria-label":"Close menu",children:a.jsx(s1,{size:20})})]}),a.jsxs("nav",{className:"sidebar-nav",children:[DE.map(({to:n,label:r,icon:i,end:s})=>a.jsxs(Vn,{to:n,end:s,className:({isActive:o})=>"sidebar-link"+(o?" sidebar-link-active":""),onClick:e,children:[a.jsx(i,{size:18}),a.jsx("span",{children:r})]},n)),a.jsxs(Vn,{to:"/shop/add-product",className:({isActive:n})=>"sidebar-link"+(n?" sidebar-link-active":""),onClick:e,children:[a.jsx(eu,{size:18}),a.jsx("span",{children:"Add Product"})]})]}),a.jsx("div",{className:"sidebar-footer",children:a.jsx("span",{children:"TyreSaathi v2 · Phase 1"})})]}),a.jsx("style",{children:`
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
      `})]})}function YO(){return a.jsxs("nav",{className:"bottom-nav",children:[DE.map(({to:t,label:e,icon:n,end:r})=>a.jsxs(Vn,{to:t,end:r,className:({isActive:i})=>"bottom-nav-btn"+(i?" bottom-nav-btn-active":""),children:[a.jsx(n,{size:20}),a.jsx("span",{children:e})]},t)),a.jsx("style",{children:`
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
      `})]})}function JO(){const[t,e]=D.useState(!1);return a.jsxs("div",{className:"app-shell",children:[a.jsx(GO,{onMenuClick:()=>e(!0)}),a.jsxs("div",{className:"app-body",children:[a.jsx(QO,{open:t,onClose:()=>e(!1)}),a.jsx("main",{className:"app-main",children:a.jsx("div",{className:"page-pad",children:a.jsx(jN,{})})})]}),a.jsx(YO,{})]})}function XO({inline:t=!1,label:e="Load ho raha hai..."}){return a.jsxs("div",{className:t?"loading-inline":"loading-full",children:[a.jsx("span",{className:"spinner"}),a.jsx("p",{children:e}),a.jsx("style",{children:`
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
      `})]})}function ZO({children:t,allowRoles:e}){const{user:n,role:r,loading:i}=nr(),s=Wr();return i?a.jsx(XO,{label:"Check kar rahe hain..."}):n?e&&!e.includes(r)?a.jsx("div",{className:"auth-wrap",children:a.jsxs("div",{className:"auth-card",style:{textAlign:"center"},children:[a.jsx("h1",{className:"brand-font auth-title",style:{fontSize:20},children:"Access Nahi Hai"}),a.jsxs("p",{className:"auth-sub",children:["Ye page sirf ",e.join(" / ")," role ke liye hai."]})]})}):t:a.jsx(CN,{to:"/login",state:{from:s},replace:!0})}function fg(t){if(typeof t=="string"&&(t.includes("offline")||t.includes("unavailable")))return"Network connection issue. Please check your internet.";switch(t){case"auth/invalid-email":return"Email format galat hai. Kripya sahi email dalein.";case"auth/user-not-found":case"auth/invalid-credential":return"Incorrect Email ya Password! (ईमेल या पासवर्ड गलत है)";case"auth/wrong-password":return"Galat password! (Incorrect password)";case"auth/email-already-in-use":return"Ye email pehle se registered hai. Kripya login karein.";case"auth/weak-password":return"Password kam se kam 6 characters ka hona chahiye.";case"auth/too-many-requests":return"Bahut zyada attempts ho gaye hain. Thodi der baad try karein ya password reset karein.";default:return t?`Error: ${t}`:"Login fail ho gaya. Kripya email aur password check karein."}}function e4(){const{login:t,resetPassword:e}=nr(),n=cn(),[r,i]=D.useState(""),[s,o]=D.useState(""),[l,u]=D.useState(!1),[d,p]=D.useState(""),[f,g]=D.useState(""),[k,A]=D.useState(!1),[w,E]=D.useState(!1);async function y(v){v.preventDefault(),p(""),g(""),A(!0);const N=r.trim().toLowerCase();try{await t(N,s),n("/",{replace:!0})}catch(O){console.warn("Firebase Login Error:",O),p(fg(O.code||O.message))}finally{A(!1)}}async function _(){const v=r.trim().toLowerCase();if(!v){p("Pehle apna email ID dalein.");return}E(!0);try{await e(v),g(`Password reset link '${v}' par bhej diya gaya hai! Apna Gmail inbox aur spam folder check karein.`),p("")}catch(N){p("Reset link bhejne me dikkat aayi: "+(N.message||N.code))}finally{E(!1)}}return a.jsxs("div",{className:"auth-wrap",children:[a.jsxs("div",{className:"auth-card",children:[a.jsx("div",{style:{textAlign:"center",marginBottom:"16px"},children:a.jsx("img",{src:"/logo.png",alt:"TyreSaathi Logo",style:{height:"50px",objectFit:"contain",borderRadius:"6px"},onError:v=>{v.target.src="/tyresaathi-logo.png"}})}),a.jsx("h1",{className:"brand-font auth-title",style:{textAlign:"center"},children:"Login to TyreSaathi"}),a.jsx("p",{className:"auth-sub",style:{textAlign:"center"},children:"Shop Owner & Customer Portal"}),d&&a.jsxs("div",{className:"auth-error-box",children:[a.jsxs("div",{className:"error-title-row",children:[a.jsx(i1,{size:18,color:"#c0392b"}),a.jsx("strong",{children:d})]}),a.jsx("p",{className:"error-desc-text",children:"Firebase me ye email ya password match nahi hua. Aap niche diye gaye options use kar sakte hain:"}),a.jsxs("div",{className:"error-action-btns",children:[a.jsxs("button",{type:"button",className:"btn-quick-reset",disabled:w,onClick:_,children:[a.jsx(a2,{size:13})," ",w?"Bhej rahe hain...":"📩 Password Reset Link Bhejein"]}),a.jsxs(fe,{to:`/register?email=${encodeURIComponent(r)}`,className:"btn-quick-register",children:[a.jsx(g2,{size:13})," 🏪 Naya Shop Owner Account Banayein"]})]})]}),f&&a.jsxs("div",{className:"auth-success",style:{marginBottom:"16px",fontSize:"13px",lineHeight:1.4},children:["✅ ",f]}),a.jsxs("form",{onSubmit:y,children:[a.jsxs("div",{className:"auth-field",children:[a.jsx("label",{children:"Email Address (ईमेल आईडी)"}),a.jsx("input",{type:"email",value:r,onChange:v=>i(v.target.value),placeholder:"e.g. ucanmail@gmail.com / ucanmail195@gmail.com",required:!0,autoComplete:"email"})]}),a.jsxs("div",{className:"auth-field",children:[a.jsx("label",{children:"Password (पासवर्ड)"}),a.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[a.jsx("input",{type:l?"text":"password",value:s,onChange:v=>o(v.target.value),placeholder:"••••••••",required:!0,autoComplete:"current-password",style:{paddingRight:"40px"}}),a.jsx("button",{type:"button",onClick:()=>u(!l),style:{position:"absolute",right:"10px",background:"none",border:"none",color:"var(--text-muted)",cursor:"pointer",display:"flex",alignItems:"center",padding:"4px"},title:l?"Hide Password":"Show Password",children:l?a.jsx(r2,{size:18}):a.jsx(i2,{size:18})})]})]}),a.jsx("button",{className:"auth-btn",disabled:k,type:"submit",children:k?"कृपया प्रतीक्षा करें...":"Login (लॉग इन करें)"})]}),a.jsxs("div",{className:"auth-links",style:{marginTop:"16px",display:"flex",justifyContent:"space-between"},children:[a.jsx(fe,{to:"/forgot-password",children:"Forgot Password?"}),a.jsx(fe,{to:"/register",children:"Create a new account"})]})]}),a.jsx("style",{children:`
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
      `})]})}function t4(){const{register:t}=nr(),e=cn(),[n]=sm(),r=n.get("email")||"",[i,s]=D.useState(ue.SHOP_OWNER),[o,l]=D.useState(""),[u,d]=D.useState(""),[p,f]=D.useState(""),[g,k]=D.useState(r),[A,w]=D.useState(""),[E,y]=D.useState(""),[_,v]=D.useState(!1);async function N(O){if(O.preventDefault(),y(""),i===ue.SHOP_OWNER&&!p.trim()){y("Dukan ka naam daalna zaroori hai.");return}v(!0);try{await t({name:o.trim(),phone:u.trim(),email:g.trim().toLowerCase(),password:A,role:i,shopName:p.trim()}),e("/",{replace:!0})}catch(L){console.warn("Registration Error:",L),y(fg(L.code||L.message))}finally{v(!1)}}return a.jsx("div",{className:"auth-wrap",children:a.jsxs("div",{className:"auth-card",children:[a.jsx("div",{style:{textAlign:"center",marginBottom:"12px"},children:a.jsx("img",{src:"/logo.png",alt:"TyreSaathi Logo",style:{height:"46px",objectFit:"contain",borderRadius:"6px"},onError:O=>{O.target.src="/tyresaathi-logo.png"}})}),a.jsx("h1",{className:"brand-font auth-title",style:{textAlign:"center"},children:"Account Banayein"}),a.jsx("p",{className:"auth-sub",style:{textAlign:"center"},children:"Customer ho ya Shop Owner, dono jud sakte hain"}),E&&a.jsx("div",{className:"auth-error",children:E}),a.jsxs("div",{className:"role-pick",children:[a.jsx("button",{type:"button",className:"role-btn"+(i===ue.SHOP_OWNER?" role-btn-active":""),onClick:()=>s(ue.SHOP_OWNER),children:"🏪 Shop Owner (दुकानदार)"}),a.jsx("button",{type:"button",className:"role-btn"+(i===ue.CUSTOMER?" role-btn-active":""),onClick:()=>s(ue.CUSTOMER),children:"👤 Customer"})]}),a.jsxs("form",{onSubmit:N,children:[a.jsxs("div",{className:"auth-field",children:[a.jsx("label",{children:"Aapka Naam (Full Name) *"}),a.jsx("input",{value:o,onChange:O=>l(O.target.value),required:!0,placeholder:"e.g. Ramesh Kumar"})]}),a.jsxs("div",{className:"auth-field",children:[a.jsx("label",{children:"Phone Number *"}),a.jsx("input",{type:"tel",value:u,onChange:O=>d(O.target.value),required:!0,placeholder:"98765 43210"})]}),i===ue.SHOP_OWNER&&a.jsxs("div",{className:"auth-field",children:[a.jsx("label",{children:"Dukan ka Naam (Shop / Center Name) *"}),a.jsx("input",{value:p,onChange:O=>f(O.target.value),placeholder:"Jaise: Shree Ram Tyre Care / National Tyre Hub",required:!0})]}),a.jsxs("div",{className:"auth-field",children:[a.jsx("label",{children:"Email Address *"}),a.jsx("input",{type:"email",value:g,onChange:O=>k(O.target.value),required:!0,placeholder:"aapka@email.com",autoComplete:"email"})]}),a.jsxs("div",{className:"auth-field",children:[a.jsx("label",{children:"Password (Kam se kam 6 akshar) *"}),a.jsx("input",{type:"password",value:A,onChange:O=>w(O.target.value),required:!0,minLength:6,placeholder:"••••••••",autoComplete:"new-password"})]}),a.jsx("button",{className:"auth-btn",disabled:_,children:_?"Creating Account...":"Register Account"})]}),a.jsx("div",{className:"auth-links",style:{justifyContent:"center",marginTop:"16px"},children:a.jsx(fe,{to:"/login",children:"Pehle se account hai? Login karein"})})]})})}function n4(){const{resetPassword:t}=nr(),[e,n]=D.useState(""),[r,i]=D.useState(""),[s,o]=D.useState(!1),[l,u]=D.useState(!1);async function d(p){p.preventDefault(),i(""),u(!0);try{await t(e.trim()),o(!0)}catch(f){i(fg(f.code))}finally{u(!1)}}return a.jsx("div",{className:"auth-wrap",children:a.jsxs("div",{className:"auth-card",children:[a.jsx("h1",{className:"brand-font auth-title",children:"Password Reset"}),a.jsx("p",{className:"auth-sub",children:"Apna email daalein, reset link bhej denge"}),r&&a.jsx("div",{className:"auth-error",children:r}),s&&a.jsx("div",{className:"auth-success",children:"Reset link bhej diya gaya hai. Apna email inbox (aur spam folder) check karein."}),!s&&a.jsxs("form",{onSubmit:d,children:[a.jsxs("div",{className:"auth-field",children:[a.jsx("label",{children:"Email"}),a.jsx("input",{type:"email",value:e,onChange:p=>n(p.target.value),placeholder:"aapka@email.com",required:!0,autoComplete:"email"})]}),a.jsx("button",{className:"auth-btn",disabled:l,children:l?"Ruko...":"Reset Link Bhejein"})]}),a.jsx("div",{className:"auth-links",style:{justifyContent:"center"},children:a.jsx(fe,{to:"/login",children:"Login page par wapas jaayein"})})]})})}function r4(){const t=cn(),[e,n]=D.useState(""),[r,i]=D.useState("all"),s=o=>{o.preventDefault();let l="/search?";e.trim()&&(l+=`q=${encodeURIComponent(e.trim())}&`),r!=="all"&&(l+=`brand=${encodeURIComponent(r)}&`),t(l)};return a.jsxs("div",{className:"home-page-container",children:[a.jsx("section",{className:"hero-banner-section",children:a.jsxs("div",{className:"hero-content",children:[a.jsx("span",{className:"hero-badge",children:"⚡ India's #1 Tyre & Auto Service Network"}),a.jsxs("h1",{className:"hero-heading",children:["Find the Perfect Tyre for Your ",a.jsx("span",{className:"highlight-text",children:"Car & Bike"})]}),a.jsx("p",{className:"hero-description",children:"Compare prices across nearest authorized tyre shops, get genuine brand warranty, and book 15-minute doorstep puncture or 3D alignment."}),a.jsxs("form",{className:"hero-search-card",onSubmit:s,children:[a.jsxs("div",{className:"search-field-unit",children:[a.jsx("label",{children:"Tyre Size / Vehicle"}),a.jsx("input",{type:"text",placeholder:"e.g. 185/65 R15, Swift, Activa...",value:e,onChange:o=>n(o.target.value)})]}),a.jsxs("div",{className:"search-field-unit",children:[a.jsx("label",{children:"Brand"}),a.jsxs("select",{value:r,onChange:o=>i(o.target.value),children:[a.jsx("option",{value:"all",children:"All Brands"}),Ga.slice(0,15).map((o,l)=>a.jsx("option",{value:o.name,children:o.name},l))]})]}),a.jsxs("button",{type:"submit",className:"hero-search-btn",children:[a.jsx(ki,{size:18})," Search Tyres"]})]}),a.jsxs("div",{className:"hero-features-strip",children:[a.jsxs("div",{className:"feature-item",children:[a.jsx(t1,{size:18,color:"#27ae60"})," 100% Genuine Warranty"]}),a.jsxs("div",{className:"feature-item",children:[a.jsx(Ra,{size:18,color:"#c0392b"})," 500+ Verified Stores"]}),a.jsxs("div",{className:"feature-item",children:[a.jsx(m2,{size:18,color:"#ffc145"})," Doorstep Mobile Van"]})]})]})}),a.jsxs("section",{className:"home-section",children:[a.jsx("div",{className:"section-header-row",children:a.jsxs("div",{children:[a.jsx("h2",{className:"section-main-title",children:"Shop by Vehicle Category"}),a.jsx("p",{className:"section-sub-title",children:"Choose your vehicle type to see compatible tyres and sizes"})]})}),a.jsx("div",{className:"categories-card-grid",children:Qa.map(o=>a.jsxs(fe,{to:`/search?category=${o.id}`,className:"cat-box-card",children:[a.jsx("span",{className:"cat-box-emoji",children:o.icon}),a.jsx("h3",{className:"cat-box-name",children:o.name}),a.jsxs("span",{className:"cat-browse-link",children:["View Tyres ",a.jsx(ZN,{size:14})]})]},o.id))})]}),a.jsxs("section",{className:"home-section brands-section",children:[a.jsxs("div",{className:"section-header-row",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"section-main-title",children:"Popular Tyre & Wheel Brands"}),a.jsx("p",{className:"section-sub-title",children:"Authorized sales and warranty for all leading manufacturers"})]}),a.jsx(fe,{to:"/search",className:"view-all-link",children:"All Brands →"})]}),a.jsx("div",{className:"brands-logo-row",children:Ga.slice(0,12).map((o,l)=>a.jsxs(fe,{to:`/search?brand=${encodeURIComponent(o.name)}`,className:"brand-pill-box",children:[a.jsx("span",{className:"brand-name-bold",children:o.name}),a.jsx("span",{className:"brand-count-sub",children:o.count})]},l))})]}),a.jsxs("section",{className:"home-section",children:[a.jsxs("div",{className:"section-header-row",children:[a.jsxs("div",{children:[a.jsx("span",{className:"section-tag-red",children:"HOT DEALS"}),a.jsx("h2",{className:"section-main-title",children:"Featured Tyres & Accessories"}),a.jsx("p",{className:"section-sub-title",children:"Top rated products in stock with special shop discounts"})]}),a.jsx(fe,{to:"/search",className:"view-all-link",children:"View All in Search →"})]}),a.jsx("div",{className:"home-products-grid",children:of.slice(0,4).map(o=>a.jsxs("div",{className:"home-product-card",children:[a.jsxs("div",{className:"product-image-box",children:[a.jsx("img",{src:o.images[0],alt:o.productName}),a.jsxs("span",{className:"dist-badge",children:["📍 ",o.distanceKm," km (Nearest)"]})]}),a.jsxs("div",{className:"product-info-box",children:[a.jsxs("span",{className:"brand-tag",children:[o.brandName," • ",o.sizeName]}),a.jsx("h4",{className:"prod-title",children:o.productName}),a.jsxs("div",{className:"price-line",children:[a.jsxs("span",{className:"deal-price",children:["₹",o.offerPrice]}),a.jsxs("span",{className:"mrp-price",children:["₹",o.originalPrice]})]}),a.jsx("div",{className:"shop-line",children:a.jsxs("small",{children:["🏪 ",o.shopName]})}),a.jsxs("div",{className:"btn-row",children:[a.jsxs(fe,{to:"/bookings",className:"btn-book",children:[a.jsx(Bi,{size:13})," Book Service"]}),a.jsx(fe,{to:"/store-location",className:"btn-call",title:"View Hub Location",children:a.jsx(Ra,{size:13})})]})]})]},o.id))})]}),a.jsxs("section",{className:"home-section service-cta-banner",children:[a.jsxs("div",{className:"service-banner-left",children:[a.jsx(kp,{size:36,className:"wrench-icon-gold"}),a.jsxs("div",{children:[a.jsx("h3",{className:"banner-title",children:"Need Urgent Tyre Cut Repair or Puncture Fix?"}),a.jsx("p",{className:"banner-desc",children:"Book doorstep service or priority shop queue. Verified technician reaches within 30 minutes."})]})]}),a.jsx(fe,{to:"/bookings",className:"banner-cta-btn",children:"📅 Book Tyre Service Now"})]}),a.jsx("section",{className:"home-section store-cta-section",children:a.jsx("div",{className:"store-cta-card",children:a.jsxs("div",{className:"store-cta-text",children:[a.jsx("h2",{children:"📍 Find a TyreSaathi Authorized Store Near You"}),a.jsx("p",{children:"Over 500+ verified tyre shops with 3D Wheel Alignment machines, Nitrogen filling, and genuine tyre stocks."}),a.jsxs("div",{className:"store-sample-pills",children:[a.jsx("span",{children:"📍 Bengaluru"}),a.jsx("span",{children:"📍 Delhi NCR"}),a.jsx("span",{children:"📍 Mumbai"}),a.jsx("span",{children:"📍 Erode"}),a.jsx("span",{children:"📍 Hyderabad"})]}),a.jsx(fe,{to:"/store-location",className:"btn-store-explore",children:"Open Interactive Store Locator →"})]})})}),a.jsx("style",{children:`
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
      `})]})}function i4(){const[t,e]=sm(),n=t.get("q")||"",r=t.get("brand")||"all",i=t.get("category")||"all",[s,o]=D.useState(n),[l,u]=D.useState(r),[d,p]=D.useState(i),[f,g]=D.useState("all"),[k,A]=D.useState(of);D.useEffect(()=>{n&&o(n),u(r),p(i)},[n,r,i]),D.useEffect(()=>{async function v(){try{const N=await AT(Ka(on,"products"));if(!N.empty){const O=N.docs.map(L=>({id:L.id,distanceKm:2.5,isNearest:!0,...L.data()}));A(L=>{const S=[...O,...of];return Array.from(new Map(S.map(x=>[x.id,x])).values())})}}catch(N){console.warn("Using default catalog items:",N)}}v()},[]);const w=k.filter(v=>{var x,I,R,C,P,M,W,ee;const N=s.toLowerCase().trim(),O=!N||((x=v.productName)==null?void 0:x.toLowerCase().includes(N))||((I=v.brandName)==null?void 0:I.toLowerCase().includes(N))||((R=v.sizeName)==null?void 0:R.toLowerCase().includes(N))||((C=v.vehicleTypeName)==null?void 0:C.toLowerCase().includes(N))||((P=v.description)==null?void 0:P.toLowerCase().includes(N))||((M=v.shopName)==null?void 0:M.toLowerCase().includes(N)),L=l==="all"||((W=v.brandName)==null?void 0:W.toLowerCase())===l.toLowerCase(),S=d==="all"||((ee=v.categoryName)==null?void 0:ee.toLowerCase().includes(d.toLowerCase()))||v.categoryKey===d,b=f==="all"||v.sizeName===f;return O&&L&&S&&b}),E=w.filter(v=>(v.distanceKm||0)<=5),y=w.filter(v=>(v.distanceKm||0)>5),_=()=>{o(""),u("all"),p("all"),g("all"),e({})};return a.jsxs("div",{className:"search-page-container",children:[a.jsxs("div",{className:"search-hero-bar",children:[a.jsx("h1",{className:"search-page-title",children:"🔍 Search Tyres, Tubes & Services"}),a.jsxs("p",{className:"search-page-sub",children:["Results are automatically sorted with ",a.jsx("strong",{children:"Nearest Shops (निकटतम दुकानें)"})," first for quick pickup and doorstep service."]}),a.jsx("div",{className:"search-input-row",children:a.jsxs("div",{className:"search-bar-wrap",children:[a.jsx(ki,{size:20,className:"search-bar-icon"}),a.jsx("input",{type:"text",placeholder:"Search by Tyre Size (185/65 R15), Brand (Apollo, MRF), Bike or Car...",value:s,onChange:v=>o(v.target.value)}),s&&a.jsx("button",{className:"clear-search-btn",onClick:()=>o(""),children:"✕"})]})}),a.jsxs("div",{className:"search-filters-row",children:[a.jsxs("div",{className:"filter-select-wrap",children:[a.jsx("label",{children:"Brand:"}),a.jsxs("select",{value:l,onChange:v=>u(v.target.value),children:[a.jsx("option",{value:"all",children:"All Brands"}),Ga.map((v,N)=>a.jsx("option",{value:v.name,children:v.name},N))]})]}),a.jsxs("div",{className:"filter-select-wrap",children:[a.jsx("label",{children:"Category:"}),a.jsxs("select",{value:d,onChange:v=>p(v.target.value),children:[a.jsx("option",{value:"all",children:"All Vehicle Categories"}),Qa.map(v=>a.jsxs("option",{value:v.id,children:[v.icon," ",v.name]},v.id))]})]}),a.jsxs("div",{className:"filter-select-wrap",children:[a.jsx("label",{children:"Popular Size:"}),a.jsxs("select",{value:f,onChange:v=>g(v.target.value),children:[a.jsx("option",{value:"all",children:"All Sizes"}),a.jsx("option",{value:"185/65 R15",children:"185/65 R15 (Swift/Dzire/i20)"}),a.jsx("option",{value:"165/80 R14",children:"165/80 R14 (WagonR/Ritz)"}),a.jsx("option",{value:"205/55 R16",children:"205/55 R16 (Creta/Seltos/City)"}),a.jsx("option",{value:"215/60 R16",children:"215/60 R16 (Brezza/Nexon)"}),a.jsx("option",{value:"235/65 R17",children:"235/65 R17 (Scorpio/Thar)"}),a.jsx("option",{value:"90/90-12",children:"90/90-12 (Activa/Jupiter)"}),a.jsx("option",{value:"100/90-17",children:"100/90-17 (Pulsar/Apache/Filt)"}),a.jsx("option",{value:"10.00-20",children:"10.00-20 (Heavy Truck/Bus)"})]})]}),(l!=="all"||d!=="all"||f!=="all"||s)&&a.jsx("button",{className:"reset-all-filters-btn",onClick:_,children:"Reset Filters"})]})]}),a.jsx("div",{className:"search-results-layout",children:w.length===0?a.jsxs("div",{className:"no-results-card",children:[a.jsx(ki,{size:48,color:"#aaa"}),a.jsx("h3",{children:"No Tyres or Services found"}),a.jsx("p",{children:'Try searching for popular sizes like "185/65 R15", "100/90-17" or brand names like "Apollo", "MRF", "CEAT".'}),a.jsx("button",{className:"btn-browse-all",onClick:_,children:"Browse All Products"})]}):a.jsxs(a.Fragment,{children:[E.length>0&&a.jsxs("div",{className:"results-group-section",children:[a.jsxs("div",{className:"group-section-header",children:[a.jsxs("div",{className:"header-left",children:[a.jsx("span",{className:"nearest-flame-icon",children:"⚡"}),a.jsx("h2",{className:"group-title",children:"Nearest Shop Products (निकटतम दुकानें)"})]}),a.jsxs("span",{className:"group-count-tag",children:[E.length," items available within 5 km"]})]}),a.jsx("div",{className:"products-card-grid",children:E.map(v=>a.jsx(I0,{product:v},v.id))})]}),y.length>0&&a.jsxs("div",{className:"results-group-section",style:{marginTop:"32px"},children:[a.jsxs("div",{className:"group-section-header",children:[a.jsxs("div",{className:"header-left",children:[a.jsx("span",{className:"other-shops-icon",children:"🚗"}),a.jsx("h2",{className:"group-title",children:"Other Partner Shops (अन्य क्षेत्रों की दुकानें)"})]}),a.jsxs("span",{className:"group-count-tag",style:{background:"#7f8c8d"},children:[y.length," items from other regional hubs"]})]}),a.jsx("div",{className:"products-card-grid",children:y.map(v=>a.jsx(I0,{product:v},v.id))})]})]})}),a.jsx("style",{children:`
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
      `})]})}function I0({product:t}){const e=Array.isArray(t.images)&&t.images.length>0?t.images:["https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80"],[n,r]=D.useState(e[0]),i=(()=>{const s=Number(t.originalPrice||0),o=Number(t.offerPrice||0);return s>0&&o>0&&s>o?Math.round((s-o)/s*100):0})();return a.jsxs("div",{className:"product-item-card",children:[a.jsxs("div",{className:"card-img-wrapper",children:[a.jsx("img",{src:n,alt:t.productName,className:"main-card-img"}),i>0&&a.jsxs("span",{className:"card-discount-pill",children:[i,"% OFF"]}),a.jsxs("span",{className:`card-distance-pill ${(t.distanceKm||0)<=3?"dist-nearest":"dist-far"}`,children:["📍 ",t.distanceKm||2.5," km away"]})]}),e.length>1&&a.jsx("div",{className:"card-thumbs-strip",children:e.map((s,o)=>a.jsx("button",{type:"button",className:`card-mini-thumb ${n===s?"thumb-selected":""}`,onClick:()=>r(s),children:a.jsx("img",{src:s,alt:`angle ${o+1}`})},o))}),a.jsxs("div",{className:"card-info-content",children:[a.jsxs("div",{className:"brand-size-tag-row",children:[a.jsx("span",{className:"brand-badge-tag",children:t.brandName}),t.sizeName&&a.jsx("span",{className:"size-badge-tag",children:t.sizeName}),t.condition==="new"?a.jsx("span",{className:"condition-badge-tag",children:"🆕 New"}):a.jsx("span",{className:"condition-badge-tag",children:"♻️ Used"})]}),a.jsx("h3",{className:"card-product-title",children:t.productName}),a.jsxs("div",{className:"card-price-row",children:[a.jsxs("span",{className:"card-selling-price",children:["₹",t.offerPrice||"0"]}),Number(t.originalPrice)>Number(t.offerPrice)&&a.jsxs("span",{className:"card-mrp-price",children:["₹",t.originalPrice]})]}),a.jsxs("div",{className:"card-shop-banner",children:[a.jsxs("div",{className:"shop-name-row",children:[a.jsx("span",{className:"shop-icon",children:"🏪"}),a.jsx("span",{className:"shop-title-text",children:t.shopName||"TyreSaathi Partner"})]}),a.jsx("span",{className:"stock-info-text",children:Number(t.stock)>0?`✅ In Stock (${t.stock} pcs)`:"❌ Out of Stock"})]}),a.jsxs("div",{className:"card-action-buttons",children:[a.jsxs(fe,{to:"/bookings",className:"card-book-service-btn",children:[a.jsx(Bi,{size:14})," Book / Buy"]}),t.shopPhone&&a.jsxs("a",{href:`tel:${t.shopPhone}`,className:"card-call-shop-btn",title:"Call Shop",children:[a.jsx(Ca,{size:14})," Call"]})]})]}),a.jsx("style",{children:`
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
      `})]})}const s4=[{id:"booking-101",customerName:"Ramesh Sharma",customerPhone:"98765-11223",customerEmail:"ramesh@example.com",serviceId:"cut_repair",serviceName:"Tyre Cut & Sidewall Repair (टायर कट रिपेयर)",vehicleType:"Car (Swift Dzire)",vehicleNumber:"KA 05 MN 4589",shopId:"shop-blr-central",shopName:"TyreSaathi Partner Hub — Central",shopPhone:"",date:"2026-08-18",timeSlot:"11:00 AM - 12:00 PM",notes:"Left rear tyre got cut from side on highway, need urgent repair.",status:"pending",createdAt:new Date().toISOString()},{id:"booking-102",customerName:"Pooja Verma",customerPhone:"98440-99887",customerEmail:"pooja@example.com",serviceId:"alignment",serviceName:"3D Wheel Alignment & Balancing (अलाइनमेंट)",vehicleType:"SUV (Hyundai Creta)",vehicleNumber:"KA 01 AB 8877",shopId:"shop-blr-central",shopName:"TyreSaathi Partner Hub — Central",shopPhone:"",date:"2026-08-18",timeSlot:"03:00 PM - 04:00 PM",notes:"Steering vibrating at 80 km/h, alignment needed.",status:"accepted",createdAt:new Date().toISOString()},{id:"booking-103",customerName:"Anil Kumar",customerPhone:"99001-22334",customerEmail:"anil@example.com",serviceId:"doorstep",serviceName:"Doorstep Emergency Assistance (घर/रास्ते पर सर्विस)",vehicleType:"Bike (Royal Enfield Classic 350)",vehicleNumber:"KA 04 EQ 1234",shopId:"shop-blr-south",shopName:"TyreSaathi Express Center — South",shopPhone:"",date:"2026-08-17",timeSlot:"06:00 PM - 07:00 PM",notes:"Flat tyre at home parking, need puncture fix and tube check.",status:"completed",createdAt:new Date().toISOString()}];function o4(){const{user:t,profile:e,isVendor:n}=nr(),[r,i]=D.useState(s4),[s,o]=D.useState("all"),[l,u]=D.useState(!1),[d,p]=D.useState(!1),[f,g]=D.useState({serviceId:nc[0].id,serviceName:nc[0].name,shopId:_r[0].id,shopName:_r[0].name,shopPhone:_r[0].phone,customerName:(e==null?void 0:e.name)||"",customerPhone:(e==null?void 0:e.phone)||"",vehicleType:"Car / SUV",vehicleNumber:"",date:new Date().toISOString().split("T")[0],timeSlot:"10:00 AM - 11:00 AM",notes:""});D.useEffect(()=>{async function y(){try{const _=await AT(Ka(on,"bookings"));if(!_.empty){const v=_.docs.map(N=>({id:N.id,...N.data()}));i(v)}}catch(_){console.warn("Using local bookings state:",_)}}y()},[]);const k=async(y,_)=>{i(v=>v.map(N=>N.id===y?{...N,status:_}:N));try{await RT(_i(on,"bookings",y),{status:_,updatedAt:Oi()})}catch(v){console.warn("Firestore update notice:",v)}},A=async y=>{if(y.preventDefault(),!f.customerName||!f.customerPhone||!f.vehicleNumber){alert("Kripya Naam, Phone aur Gaadi number zaroor bharein!");return}p(!0);const _={...f,customerId:(t==null?void 0:t.uid)||"guest_cust",customerEmail:(t==null?void 0:t.email)||"customer@tyresaathi.com",status:"pending",createdAt:new Date().toISOString()};try{const v=await Jm(Ka(on,"bookings"),{..._,createdAtServer:Oi()});i(N=>[{id:v.id,..._},...N])}catch(v){console.warn("Local fallback save for booking:",v),i(N=>[{id:"b-"+Date.now(),..._},...N])}finally{p(!1),u(!1),alert("✅ Aapki Booking Shop Owner ko bhej di gayi hai! Dukan se call ya approval status yahan dikhega.")}},w=r.filter(y=>s==="all"?!0:y.status===s),E={all:r.length,pending:r.filter(y=>y.status==="pending").length,accepted:r.filter(y=>y.status==="accepted").length,in_progress:r.filter(y=>y.status==="in_progress").length,completed:r.filter(y=>y.status==="completed").length,rejected:r.filter(y=>y.status==="rejected").length};return a.jsxs("div",{className:"bookings-page-container",children:[a.jsxs("div",{className:"bookings-header-row",children:[a.jsxs("div",{children:[a.jsx("h1",{className:"page-heading",children:n?"🏪 Shop Owner Bookings Dashboard":"📅 Tyre Service Bookings"}),a.jsx("p",{className:"page-sub",children:n?"Aapki dukan par aayi hui customer service bookings ko Accept ya Reject karein.":"Tyre Cut Repair, Puncture, Fitting aur Doorstep Service ki bookings aur status dekhein."})]}),a.jsxs("button",{className:"book-service-cta",onClick:()=>u(!0),children:[a.jsx(Sp,{size:16})," Book New Service (नई बुकिंग)"]})]}),a.jsxs("div",{className:"booking-filter-tabs",children:[a.jsxs("button",{className:`filter-tab ${s==="all"?"tab-active":""}`,onClick:()=>o("all"),children:["All (",E.all,")"]}),a.jsxs("button",{className:`filter-tab ${s==="pending"?"tab-active tab-pending":""}`,onClick:()=>o("pending"),children:["⏳ Pending / New (",E.pending,")"]}),a.jsxs("button",{className:`filter-tab ${s==="accepted"?"tab-active tab-accepted":""}`,onClick:()=>o("accepted"),children:["✅ Accepted (",E.accepted,")"]}),a.jsxs("button",{className:`filter-tab ${s==="in_progress"?"tab-active":""}`,onClick:()=>o("in_progress"),children:["🔧 In Progress (",E.in_progress,")"]}),a.jsxs("button",{className:`filter-tab ${s==="completed"?"tab-active tab-completed":""}`,onClick:()=>o("completed"),children:["🎉 Completed (",E.completed,")"]}),a.jsxs("button",{className:`filter-tab ${s==="rejected"?"tab-active tab-rejected":""}`,onClick:()=>o("rejected"),children:["❌ Rejected (",E.rejected,")"]})]}),a.jsx("div",{className:"bookings-list-grid",children:w.length===0?a.jsxs("div",{className:"no-bookings-card",children:[a.jsx(Bi,{size:48,color:"#aaa"}),a.jsx("h3",{children:"No Bookings in this status"}),a.jsx("p",{children:'Aap "Book New Service" button dabakar nayi booking create kar sakte hain.'})]}):w.map(y=>a.jsxs("div",{className:`booking-item-card status-border-${y.status}`,children:[a.jsxs("div",{className:"booking-card-top",children:[a.jsxs("div",{className:"service-info-group",children:[a.jsx("span",{className:"service-icon-circle",children:a.jsx(kp,{size:18})}),a.jsxs("div",{children:[a.jsx("h3",{className:"booking-service-title",children:y.serviceName}),a.jsxs("span",{className:"booking-vehicle-tag",children:[a.jsx(Xw,{size:13})," ",y.vehicleType," • ",a.jsx("strong",{children:y.vehicleNumber})]})]})]}),a.jsxs("div",{className:"booking-status-badge-wrap",children:[y.status==="pending"&&a.jsx("span",{className:"status-badge badge-pending",children:"⏳ Awaiting Shop Response"}),y.status==="accepted"&&a.jsx("span",{className:"status-badge badge-accepted",children:"✅ Booking Accepted"}),y.status==="rejected"&&a.jsx("span",{className:"status-badge badge-rejected",children:"❌ Booking Rejected"}),y.status==="in_progress"&&a.jsx("span",{className:"status-badge badge-inprogress",children:"🔧 Service in Progress"}),y.status==="completed"&&a.jsx("span",{className:"status-badge badge-completed",children:"🎉 Service Completed"})]})]}),a.jsxs("div",{className:"booking-meta-grid",children:[a.jsxs("div",{className:"meta-block",children:[a.jsx("span",{className:"meta-label",children:"👤 Customer Details:"}),a.jsx("span",{className:"meta-value",children:y.customerName}),a.jsxs("a",{href:`tel:${y.customerPhone}`,className:"meta-phone-link",children:[a.jsx(Ca,{size:12})," ",y.customerPhone]})]}),a.jsxs("div",{className:"meta-block",children:[a.jsx("span",{className:"meta-label",children:"🏪 Service Shop:"}),a.jsx("span",{className:"meta-value",children:y.shopName}),a.jsx("span",{className:"meta-subtext",children:y.shopPhone?`📞 ${y.shopPhone}`:"✓ Verified TyreSaathi Hub"})]}),a.jsxs("div",{className:"meta-block",children:[a.jsx("span",{className:"meta-label",children:"⏰ Date & Time Slot:"}),a.jsx("span",{className:"meta-value",children:y.date}),a.jsx("span",{className:"meta-subtext",children:y.timeSlot})]})]}),y.notes&&a.jsxs("div",{className:"booking-notes-box",children:[a.jsx("strong",{children:"Customer Note:"}),' "',y.notes,'"']}),a.jsxs("div",{className:"booking-card-actions",children:[a.jsx("div",{className:"action-left-info",children:a.jsxs("span",{className:"time-ago-text",children:["Booking ID: #",y.id.slice(-6)]})}),a.jsxs("div",{className:"action-buttons-group",children:[y.status==="pending"&&a.jsxs(a.Fragment,{children:[a.jsxs("button",{className:"btn-action-reject",onClick:()=>k(y.id,"rejected"),children:[a.jsx(e2,{size:15})," Reject (अस्वीकार करें)"]}),a.jsxs("button",{className:"btn-action-accept",onClick:()=>k(y.id,"accepted"),children:[a.jsx(Aa,{size:15})," Accept (स्वीकार करें)"]})]}),y.status==="accepted"&&a.jsxs("button",{className:"btn-action-progress",onClick:()=>k(y.id,"in_progress"),children:[a.jsx(kp,{size:14})," Start Service (काम शुरू करें)"]}),y.status==="in_progress"&&a.jsxs("button",{className:"btn-action-complete",onClick:()=>k(y.id,"completed"),children:[a.jsx(Aa,{size:14})," Mark Completed (पूरा हुआ)"]}),y.customerPhone&&a.jsxs(a.Fragment,{children:[a.jsxs("a",{href:`tel:${y.customerPhone}`,className:"btn-action-call",title:`Call ${y.customerName}`,children:[a.jsx(Ca,{size:14})," Call (",y.customerPhone,")"]}),a.jsx("a",{href:`https://wa.me/91${y.customerPhone.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(`Namaste ${y.customerName}, TyreSaathi par aapki booking (${y.serviceName}) ke regarding...`)}`,target:"_blank",rel:"noreferrer",className:"btn-action-whatsapp",title:"Chat on WhatsApp",children:"💬 WhatsApp"})]}),a.jsxs(fe,{to:`/billing?customer=${encodeURIComponent(y.customerName)}&phone=${encodeURIComponent(y.customerPhone)}&vehicle=${encodeURIComponent(y.vehicleType)}&vehicleNo=${encodeURIComponent(y.vehicleNumber)}&service=${encodeURIComponent(y.serviceName)}`,className:"btn-action-bill-shortcut",title:"Generate Bill for this Service",children:[a.jsx(mi,{size:14})," 🧾 Bill Banayein"]})]})]})]},y.id))}),l&&a.jsx("div",{className:"modal-backdrop",onClick:()=>u(!1),children:a.jsxs("div",{className:"modal-card",onClick:y=>y.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{className:"modal-title",children:"🛠️ Book a Tyre Service (सर्विस बुक करें)"}),a.jsx("button",{className:"modal-close-btn",onClick:()=>u(!1),children:"✕"})]}),a.jsxs("form",{onSubmit:A,className:"modal-form",children:[a.jsxs("div",{className:"modal-field",children:[a.jsx("label",{children:"Choose Service (सर्विस चुनें) *"}),a.jsx("select",{value:f.serviceId,onChange:y=>{const _=nc.find(v=>v.id===y.target.value);g({...f,serviceId:y.target.value,serviceName:_?_.name:y.target.value})},children:nc.map(y=>a.jsxs("option",{value:y.id,children:[y.name," (~₹",y.price,")"]},y.id))})]}),a.jsxs("div",{className:"modal-field",children:[a.jsx("label",{children:"Choose Preferred Shop (दुकान चुनें) *"}),a.jsx("select",{value:f.shopId,onChange:y=>{const _=_r.find(v=>v.id===y.target.value);g({...f,shopId:y.target.value,shopName:_?_.name:"TyreSaathi Shop",shopPhone:(_==null?void 0:_.phone)||""})},children:_r.map(y=>a.jsxs("option",{value:y.id,children:[y.name," (📍 ",y.distanceKm," km - ",y.city,")"]},y.id))})]}),a.jsxs("div",{className:"modal-grid-2",children:[a.jsxs("div",{className:"modal-field",children:[a.jsx("label",{children:"Aapka Naam (Customer Name) *"}),a.jsx("input",{type:"text",required:!0,placeholder:"Enter your name",value:f.customerName,onChange:y=>g({...f,customerName:y.target.value})})]}),a.jsxs("div",{className:"modal-field",children:[a.jsx("label",{children:"Phone Number *"}),a.jsx("input",{type:"tel",required:!0,placeholder:"98765 43210",value:f.customerPhone,onChange:y=>g({...f,customerPhone:y.target.value})})]})]}),a.jsxs("div",{className:"modal-grid-2",children:[a.jsxs("div",{className:"modal-field",children:[a.jsx("label",{children:"Vehicle Type *"}),a.jsxs("select",{value:f.vehicleType,onChange:y=>g({...f,vehicleType:y.target.value}),children:[a.jsx("option",{children:"Car / SUV"}),a.jsx("option",{children:"Motorcycle / Bike"}),a.jsx("option",{children:"Scooter / Activa"}),a.jsx("option",{children:"Commercial Truck / Bus"}),a.jsx("option",{children:"Auto Rickshaw"}),a.jsx("option",{children:"Tractor"})]})]}),a.jsxs("div",{className:"modal-field",children:[a.jsx("label",{children:"Vehicle Number (गाड़ी का नंबर) *"}),a.jsx("input",{type:"text",required:!0,placeholder:"e.g. DL 01 AB 1234",value:f.vehicleNumber,onChange:y=>g({...f,vehicleNumber:y.target.value})})]})]}),a.jsxs("div",{className:"modal-grid-2",children:[a.jsxs("div",{className:"modal-field",children:[a.jsx("label",{children:"Booking Date *"}),a.jsx("input",{type:"date",required:!0,value:f.date,onChange:y=>g({...f,date:y.target.value})})]}),a.jsxs("div",{className:"modal-field",children:[a.jsx("label",{children:"Preferred Time Slot *"}),a.jsxs("select",{value:f.timeSlot,onChange:y=>g({...f,timeSlot:y.target.value}),children:[a.jsx("option",{children:"09:00 AM - 10:00 AM"}),a.jsx("option",{children:"10:00 AM - 11:00 AM"}),a.jsx("option",{children:"11:00 AM - 12:00 PM"}),a.jsx("option",{children:"01:00 PM - 02:00 PM"}),a.jsx("option",{children:"03:00 PM - 04:00 PM"}),a.jsx("option",{children:"05:00 PM - 06:00 PM"}),a.jsx("option",{children:"07:00 PM - 08:00 PM"})]})]})]}),a.jsxs("div",{className:"modal-field",children:[a.jsx("label",{children:"Problem Notes / Special Request"}),a.jsx("textarea",{rows:2,placeholder:"Tell shop about tyre condition or location...",value:f.notes,onChange:y=>g({...f,notes:y.target.value})})]}),a.jsxs("div",{className:"modal-actions",children:[a.jsx("button",{type:"button",className:"btn-cancel",onClick:()=>u(!1),children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn-submit-booking",disabled:d,children:d?"Sending...":"🚀 Confirm Booking (बुक करें)"})]})]})]})}),a.jsx("style",{children:`
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
          transition: background 0.15s ease;
        }
        .btn-action-call:hover {
          background: var(--border);
          color: #c0392b;
        }
        .btn-action-whatsapp {
          background: #25D366;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);
          transition: background 0.15s ease;
        }
        .btn-action-whatsapp:hover {
          background: #1ebd56;
          color: white;
        }
        .btn-action-bill-shortcut {
          background: #2c3e50;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s ease;
        }
        .btn-action-bill-shortcut:hover {
          background: #1a252f;
          color: white;
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
      `})]})}function a4(){const[t,e]=D.useState(""),[n,r]=D.useState(_r[0]),[i,s]=D.useState("all"),o=_r.filter(u=>{const d=u.name.toLowerCase().includes(t.toLowerCase())||u.address.toLowerCase().includes(t.toLowerCase())||u.city.toLowerCase().includes(t.toLowerCase()),p=i==="all"||u.city.toLowerCase()===i.toLowerCase();return d&&p}),l=["all",...new Set(_r.map(u=>u.city))];return a.jsxs("div",{className:"store-location-page",children:[a.jsxs("div",{className:"breadcrumbs-bar",children:[a.jsx("span",{children:"Home"})," / ",a.jsx("span",{children:"Store Location"})]}),a.jsxs("div",{className:"store-locator-container",children:[a.jsxs("div",{className:"store-sidebar",children:[a.jsx("h1",{className:"store-main-title",children:"Find a Store Near You"}),a.jsxs("div",{className:"store-search-box",children:[a.jsxs("div",{className:"search-input-wrapper",children:[a.jsx(ki,{size:18,className:"search-icon-inside"}),a.jsx("input",{type:"text",placeholder:"Search by city or store name",value:t,onChange:u=>e(u.target.value)})]}),a.jsx("button",{className:"search-submit-btn",onClick:()=>{},children:"Search"})]}),a.jsx("div",{className:"city-pill-row",children:l.map(u=>a.jsx("button",{className:`city-pill ${i===u?"city-pill-active":""}`,onClick:()=>s(u),children:u==="all"?"All Locations":u},u))}),a.jsxs("div",{className:"store-count-badge",children:["Showing ",o.length," TyreSaathi Authorized Stores"]}),a.jsx("div",{className:"store-list-scroll",children:o.length===0?a.jsxs("div",{className:"no-stores-found",children:[a.jsx(Ra,{size:32,color:"#999"}),a.jsxs("p",{children:['No stores found for "',t,'". Try another city.']})]}):o.map(u=>{var d;return a.jsxs("div",{className:`store-item-card ${(n==null?void 0:n.id)===u.id?"store-item-selected":""}`,onClick:()=>r(u),children:[a.jsxs("div",{className:"store-card-header",children:[a.jsx("h3",{className:"store-name",children:u.name}),u.isNearest&&a.jsx("span",{className:"nearest-tag",children:"⚡ Nearest"})]}),a.jsxs("div",{className:"store-rating-row",children:[a.jsxs("span",{className:"rating-badge",children:[a.jsx(f2,{size:13,fill:"#ffc107",color:"#ffc107"})," ",u.rating]}),a.jsxs("span",{className:"reviews-text",children:["(",u.reviewsCount," reviews)"]}),a.jsxs("span",{className:"distance-text",children:["📍 ",u.distanceKm," km away"]})]}),a.jsx("p",{className:"store-address",children:u.address}),a.jsx("div",{className:"store-services-chips",children:(d=u.servicesOffered)==null?void 0:d.slice(0,3).map((p,f)=>a.jsxs("span",{className:"svc-chip",children:["✓ ",p]},f))}),a.jsxs("div",{className:"store-card-actions",children:[a.jsxs("button",{className:"view-on-map-btn",onClick:p=>{p.stopPropagation(),r(u)},children:[a.jsx(jv,{size:13})," View on Map"]}),a.jsxs("a",{href:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u.name+" "+u.address)}`,target:"_blank",rel:"noreferrer",className:"google-maps-link",onClick:p=>p.stopPropagation(),children:["Open in Maps ",a.jsx(Cv,{size:12})]})]})]},u.id)})})]}),a.jsxs("div",{className:"store-map-wrapper",children:[n&&a.jsxs("div",{className:"map-info-popup",children:[a.jsxs("div",{className:"popup-top",children:[a.jsxs("div",{children:[a.jsx("h4",{className:"popup-title",children:n.name}),a.jsx("p",{className:"popup-address",children:n.address})]}),a.jsx("a",{href:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.name+" "+n.address)}`,target:"_blank",rel:"noreferrer",className:"popup-external-icon",title:"Open in Google Maps",children:a.jsx(Cv,{size:16})})]}),a.jsxs("div",{className:"popup-rating",children:[a.jsxs("span",{className:"star-num",children:[n.rating," ★"]}),a.jsxs("span",{className:"reviews-count",children:["(",n.reviewsCount," reviews)"]}),a.jsxs("span",{className:"open-badge",children:[a.jsx(Aa,{size:13,color:"#27ae60"})," Verified TyreSaathi Hub"]})]}),a.jsxs("div",{className:"popup-services",children:[a.jsx("strong",{children:"Services:"})," ",n.servicesOffered.join(" • ")]}),a.jsxs("div",{className:"popup-action-buttons",children:[a.jsx("a",{href:"/bookings",className:"popup-call-btn",style:{background:"#c0392b",color:"white",textDecoration:"none"},children:"📅 Book at this Hub"}),a.jsxs("a",{href:`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(n.address)}`,target:"_blank",rel:"noreferrer",className:"popup-directions-btn",children:[a.jsx(jv,{size:14})," Get Directions"]})]})]}),a.jsx("div",{className:"interactive-map-canvas",children:a.jsx("iframe",{title:"Store Map",width:"100%",height:"100%",style:{border:0},loading:"lazy",src:`https://maps.google.com/maps?q=${n?encodeURIComponent(n.address):"Bengaluru"}&t=&z=14&ie=UTF8&iwloc=&output=embed`})})]})]}),a.jsx("style",{children:`
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
      `})]})}function l4(){const{theme:t,toggleTheme:e}=a1(),{user:n,profile:r,updateUserProfile:i,logout:s}=nr(),o=cn(),[l,u]=D.useState(!1),[d,p]=D.useState(!1),[f,g]=D.useState(!1),[k,A]=D.useState(!1),[w,E]=D.useState({name:"",phone:"",email:"",role:ue.CUSTOMER,shopName:"",address:"",city:"",openingHours:"09:00 AM - 09:00 PM",photoURL:""});D.useEffect(()=>{(r||n)&&E({name:(r==null?void 0:r.name)||(n==null?void 0:n.displayName)||"",phone:(r==null?void 0:r.phone)||"",email:(r==null?void 0:r.email)||(n==null?void 0:n.email)||"",role:(r==null?void 0:r.role)||ue.CUSTOMER,shopName:(r==null?void 0:r.shopName)||"",address:(r==null?void 0:r.address)||"",city:(r==null?void 0:r.city)||"",openingHours:(r==null?void 0:r.openingHours)||"09:00 AM - 09:00 PM",photoURL:(r==null?void 0:r.photoURL)||(n==null?void 0:n.photoURL)||""})},[r,n]);const y=async L=>{if(!(!L||!n)){g(!0);try{const S=RE(CE,`avatars/${n.uid}/${Date.now()}-${L.name.replace(/[^a-zA-Z0-9.]/g,"_")}`);await PE(S,L);const b=await AE(S);E(x=>({...x,photoURL:b})),await i({photoURL:b})}catch(S){console.warn("Storage upload fallback to local reader:",S);const b=new FileReader;b.onload=async x=>{const I=x.target.result;E(R=>({...R,photoURL:I})),await i({photoURL:I})},b.readAsDataURL(L)}finally{g(!1)}}},_=async L=>{L.preventDefault(),p(!0),A(!1);try{await i({name:w.name.trim(),phone:w.phone.trim(),email:w.email.trim(),role:w.role,shopName:w.role===ue.SHOP_OWNER?w.shopName.trim():"",address:w.address.trim(),city:w.city.trim(),openingHours:w.openingHours.trim(),photoURL:w.photoURL,shopApproved:w.role===ue.SHOP_OWNER}),A(!0),u(!1),setTimeout(()=>A(!1),4e3)}catch(S){alert("Profile save error: "+S.message)}finally{p(!1)}};async function v(){await s(),o("/login",{replace:!0})}const N=w.photoURL||(r==null?void 0:r.photoURL)||(n==null?void 0:n.photoURL),O=w.name?w.name[0].toUpperCase():r!=null&&r.name?r.name[0].toUpperCase():"U";return a.jsxs("div",{className:"profile-page-wrap",children:[a.jsxs("div",{className:"profile-header-bar",children:[a.jsx("h1",{className:"brand-font page-title",children:"My Profile & Account"}),l?a.jsxs("button",{className:"btn-cancel-edit",onClick:()=>u(!1),children:[a.jsx(s1,{size:15})," Cancel (रद्द करें)"]}):a.jsxs("button",{className:"btn-edit-toggle",onClick:()=>u(!0),children:[a.jsx(d2,{size:15})," Edit Profile (एडिट करें)"]})]}),k&&a.jsxs("div",{className:"save-success-banner",children:[a.jsx(Aa,{size:18})," Profile details saved successfully! (प्रोफाइल सफलतापूर्वक अपडेट हो गई)"]}),a.jsxs("div",{className:"profile-card",children:[a.jsxs("div",{className:"avatar-section-wrapper",children:[a.jsxs("div",{className:"profile-avatar-container",children:[N?a.jsx("img",{src:N,alt:"Profile",className:"profile-avatar-img"}):a.jsx("div",{className:"profile-avatar-initial",children:O}),a.jsxs("label",{className:"avatar-upload-overlay",title:"Change Profile Photo / Shop Logo",children:[a.jsx("input",{type:"file",accept:"image/*",onChange:L=>y(L.target.files[0]),style:{display:"none"}}),a.jsx(Ip,{size:18,color:"white"})]})]}),f&&a.jsx("span",{className:"upload-photo-text",children:"Uploading photo..."}),!l&&a.jsxs("label",{className:"btn-change-photo-text",children:[a.jsx("input",{type:"file",accept:"image/*",onChange:L=>y(L.target.files[0]),style:{display:"none"}}),"📸 Change Photo / Logo"]})]}),l?a.jsxs("form",{className:"profile-edit-form",onSubmit:_,children:[a.jsxs("div",{className:"edit-role-section",children:[a.jsx("label",{className:"field-label-bold",children:"Account Role (अपना रोल चुनें):"}),a.jsxs("div",{className:"role-toggle-row",children:[a.jsx("button",{type:"button",className:`role-choice-btn ${w.role===ue.SHOP_OWNER?"role-choice-active":""}`,onClick:()=>E({...w,role:ue.SHOP_OWNER}),children:"🏪 Shop Owner (दुकानदार)"}),a.jsx("button",{type:"button",className:`role-choice-btn ${w.role===ue.CUSTOMER?"role-choice-active":""}`,onClick:()=>E({...w,role:ue.CUSTOMER}),children:"👤 Customer (ग्राहक)"})]})]}),a.jsxs("div",{className:"form-two-col",children:[a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Aapka Naam (Full Name) *"}),a.jsx("input",{type:"text",required:!0,value:w.name,onChange:L=>E({...w,name:L.target.value}),placeholder:"e.g. Heena Kausar / Rajesh Kumar"})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Mobile Number *"}),a.jsx("input",{type:"tel",required:!0,value:w.phone,onChange:L=>E({...w,phone:L.target.value}),placeholder:"e.g. 9910281345"})]})]}),w.role===ue.SHOP_OWNER&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Dukan ka Naam (Shop Name) *"}),a.jsx("input",{type:"text",required:!0,value:w.shopName,onChange:L=>E({...w,shopName:L.target.value}),placeholder:"e.g. UCAN Tyre Shop / Cherry Tyre Park"})]}),a.jsxs("div",{className:"form-two-col",children:[a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"City (शहर)"}),a.jsx("input",{type:"text",value:w.city,onChange:L=>E({...w,city:L.target.value}),placeholder:"e.g. Bengaluru / Delhi / Mumbai"})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Opening Hours (दुकान का समय)"}),a.jsx("input",{type:"text",value:w.openingHours,onChange:L=>E({...w,openingHours:L.target.value}),placeholder:"09:00 AM - 09:00 PM"})]})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Dukan ka Pata (Shop Address)"}),a.jsx("input",{type:"text",value:w.address,onChange:L=>E({...w,address:L.target.value}),placeholder:"Shop No., Market Road, Near Landmark..."})]})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Email Address"}),a.jsx("input",{type:"email",value:w.email,onChange:L=>E({...w,email:L.target.value}),placeholder:"email@example.com"})]}),a.jsxs("div",{className:"edit-action-buttons",children:[a.jsx("button",{type:"button",className:"btn-form-cancel",onClick:()=>u(!1),disabled:d,children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn-form-save",disabled:d,children:d?"Saving Changes...":"💾 Save Changes (बदलाव सेव करें)"})]})]}):a.jsxs("div",{className:"profile-view-details",children:[a.jsx("h2",{className:"profile-name-text",children:(r==null?void 0:r.name)||(n==null?void 0:n.displayName)||"TyreSaathi User"}),a.jsx("div",{className:"profile-role-badge",children:(r==null?void 0:r.role)===ue.SHOP_OWNER?a.jsxs("span",{className:"role-pill-shop",children:[a.jsx(Dv,{size:14})," Shop Owner · ",(r==null?void 0:r.shopName)||"My Tyre Shop"]}):a.jsxs("span",{className:"role-pill-customer",children:[a.jsx(ja,{size:14})," Customer (ग्राहक)"]})}),a.jsxs("div",{className:"profile-info-grid",children:[a.jsxs("div",{className:"info-item",children:[a.jsxs("span",{className:"info-label",children:[a.jsx(Ca,{size:13})," Mobile Number"]}),a.jsx("span",{className:"info-value",children:(r==null?void 0:r.phone)||"Not added yet"})]}),a.jsxs("div",{className:"info-item",children:[a.jsxs("span",{className:"info-label",children:[a.jsx(l2,{size:13})," Email Address"]}),a.jsx("span",{className:"info-value",children:(r==null?void 0:r.email)||(n==null?void 0:n.email)||"Not added"})]}),(r==null?void 0:r.role)===ue.SHOP_OWNER&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"info-item",children:[a.jsxs("span",{className:"info-label",children:[a.jsx(Dv,{size:13})," Shop Name"]}),a.jsx("span",{className:"info-value",children:(r==null?void 0:r.shopName)||"UCAN Tyre Shop"})]}),a.jsxs("div",{className:"info-item",children:[a.jsxs("span",{className:"info-label",children:[a.jsx(Ra,{size:13})," Shop Location"]}),a.jsx("span",{className:"info-value",children:r!=null&&r.city?`${r.city}, ${r.address||""}`:"Not added"})]}),a.jsxs("div",{className:"info-item full-width",children:[a.jsxs("span",{className:"info-label",children:[a.jsx(t1,{size:13})," Shop Verification"]}),a.jsx("span",{className:"info-value verified-text",children:"✅ Shop is fully active & approved on TyreSaathi"})]})]})]}),(r==null?void 0:r.role)===ue.SHOP_OWNER&&a.jsxs("div",{className:"shop-quick-actions",children:[a.jsxs(fe,{to:"/shop/add-product",className:"btn-shop-action",children:[a.jsx(eu,{size:15})," Add Tyre / Product to Shop"]}),a.jsxs(fe,{to:"/bookings",className:"btn-shop-action secondary",children:[a.jsx(Bi,{size:15})," View Customer Bookings"]})]})]})]}),a.jsxs("div",{className:"settings-row",children:[a.jsx("span",{children:"Theme & Dark Mode"}),a.jsxs("button",{className:"theme-switch",onClick:e,children:[t==="dark"?a.jsx(n1,{size:16}):a.jsx(e1,{size:16}),t==="dark"?"Light Mode":"Dark Mode"]})]}),a.jsxs("button",{className:"logout-btn-full",onClick:v,children:[a.jsx(Zw,{size:16})," Logout from Account"]}),a.jsx("style",{children:`
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
      `})]})}function c4(){return a.jsxs("div",{className:"status-page",children:[a.jsx(i1,{size:48,color:"var(--orange)"}),a.jsx("h1",{className:"brand-font",children:"404"}),a.jsx("p",{children:"Ye page nahi mila."}),a.jsx(fe,{to:"/",className:"status-btn",children:"Home par jaayein"}),a.jsx("style",{children:`
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
      `})]})}const u4=[{id:"tyre",label:"🆕 Tyre (टायर)",icon:"🛞"},{id:"tube",label:"⭕ Tube (ट्यूब)",icon:"⭕"},{id:"flap",label:"◉ Flap (फ्लैप)",icon:"◉"},{id:"patch",label:"🩹 Patch (पैच)",icon:"🩹"},{id:"gater",label:"🔧 Gater (गेटर)",icon:"🔧"},{id:"custom",label:"✨ Alloy Wheels & Rims",icon:"✨"},{id:"service",label:"🛠️ Repair & Service (सर्विस)",icon:"🛠️"}],d4=[{id:0,title:"1. Main / Front View",desc:"सामने से फोटो (Main)"},{id:1,title:"2. Tread & Grooves Pattern",desc:"ग्रिप और डिजाइन (Tread)"},{id:2,title:"3. Sidewall & Brand Stamp",desc:"साइज और ब्रांड (Sidewall)"},{id:3,title:"4. Warranty / Extra Angle",desc:"वारंटी या अन्य एंगल"}];function S0(){const{user:t,currentUser:e,profile:n,userData:r}=nr(),i=t||e,s=n||r,{id:o}=yN(),l=cn(),u=!!o,[d,p]=D.useState(!1),[f,g]=D.useState(u),[k,A]=D.useState(null),[w,E]=D.useState({productType:"tyre",condition:"new",categoryKey:"passenger_car",categoryName:"Passenger Car & Hatchback",vehicleTypeName:"",brandName:"",sizeName:"",modelName:"",customBrand:"",customSize:"",customModel:"",productName:"",description:"",images:["","","",""],tyreType:"Tubeless",warranty:"",tubeSize:"",valveType:"TR",flapSize:"",patchType:"",serviceName:"",serviceDuration:"30 Mins",originalPrice:"",offerPrice:"",stock:"",published:!0});D.useEffect(()=>{async function x(){if(o)try{const I=_i(on,"products",o),R=await NT(I);if(R.exists()){const C=R.data(),P=Array.isArray(C.images)?C.images:[],M=[P[0]||"",P[1]||"",P[2]||"",P[3]||""];E(W=>({...W,...C,images:M}))}}catch(I){console.error("Error loading product:",I)}finally{g(!1)}}x()},[o]);const y=Ih[w.categoryKey]||Ih.passenger_car||[],_=Sh[w.categoryKey]||Sh.passenger_car||[],v=(x,I)=>{E(R=>{const C={...R,[x]:I};if(x==="categoryKey"){const P=Qa.find(ee=>ee.id===I);C.categoryName=P?P.name:I;const M=Ih[I]||[],W=Sh[I]||[];C.vehicleTypeName=M[0]||"",C.sizeName=W[0]||""}if(["brandName","modelName","sizeName","categoryKey","customBrand","customSize","customModel"].includes(x)){const P=C.brandName==="OTHER"?C.customBrand:C.brandName,M=C.modelName==="OTHER"?C.customModel:C.modelName,W=C.sizeName==="OTHER"?C.customSize:C.sizeName;C.productType==="tyre"&&(C.productName=`${P||""} ${M||""} ${W||""}`.trim())}return C})},N=async(x,I)=>{if(I){A(x);try{const R=(i==null?void 0:i.uid)||"demo_shop",C=RE(CE,`products/${R}/${Date.now()}-slot${x}-${I.name.replace(/[^a-zA-Z0-9.]/g,"_")}`);await PE(C,I);const P=await AE(C);E(M=>{const W=[...M.images];return W[x]=P,{...M,images:W}})}catch(R){console.warn("Storage upload fallback to base64 preview:",R);const C=new FileReader;C.onload=P=>{E(M=>{const W=[...M.images];return W[x]=P.target.result,{...M,images:W}})},C.readAsDataURL(I)}finally{A(null)}}},O=x=>{E(I=>{const R=[...I.images];return R[x]="",{...I,images:R}})},L=(()=>{const x=Number(w.originalPrice),I=Number(w.offerPrice);return x>0&&I>0&&x>I?Math.round((x-I)/x*100):0})(),S=async(x,I=!1)=>{x.preventDefault();const R=w.brandName==="OTHER"?w.customBrand:w.brandName,C=w.sizeName==="OTHER"?w.customSize:w.sizeName,P=w.modelName==="OTHER"?w.customModel:w.modelName,M=w.productType==="service"?w.serviceName:(w.productName||`${R} ${C}`).trim();if(!M){alert("Please enter a valid product / service name!");return}const W=w.images.filter(ee=>ee&&ee.trim()!=="");p(!0);try{const ee={...w,productName:M,brandName:R,sizeName:C,modelName:P,images:W.length>0?W:["https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80"],originalPrice:Number(w.originalPrice||0),offerPrice:Number(w.offerPrice||0),stock:w.productType==="service"?999:Number(w.stock||1),published:!I,shopId:(i==null?void 0:i.uid)||"demo_shop",shopName:(s==null?void 0:s.shopName)||"TyreSaathi Partner Shop",shopPhone:(s==null?void 0:s.phone)||"",updatedAt:Oi()};u?(await RT(_i(on,"products",o),ee),alert(I?"📝 Draft saved successfully!":"✅ Product updated successfully!")):(await Jm(Ka(on,"products"),{...ee,createdAt:Oi()}),alert(I?"📝 Draft saved successfully!":"🚀 Product published to TyreSaathi network!")),l("/search")}catch(ee){console.error("Firestore save error:",ee),alert("Saved locally! "+ee.message),l("/search")}finally{p(!1)}};if(f)return a.jsx("div",{style:{padding:"40px",textAlign:"center"},children:"Loading product details..."});const b=w.images.filter(x=>x).length;return a.jsxs("div",{className:"add-product-container",children:[a.jsxs("div",{className:"page-header-row",children:[a.jsxs("div",{children:[a.jsx("h1",{className:"page-main-heading",children:u?"✏️ Edit Tyre & Service Details":"➕ Add Product / Tyre to Shop"}),a.jsx("p",{className:"page-subheading",children:"Choose tyre category, vehicle type, size and upload up to 4 photos for higher customer trust."})]}),a.jsx(fe,{to:"/search",className:"back-link-btn",children:"← View All Products"})]}),a.jsxs("div",{className:"form-preview-grid",children:[a.jsxs("form",{className:"add-product-form",onSubmit:x=>S(x,!1),children:[a.jsxs("div",{className:"form-section-card",children:[a.jsxs("h3",{className:"section-title",children:[a.jsx("span",{className:"step-num",children:"1"})," What are you adding? (सामान का प्रकार)"]}),a.jsx("div",{className:"product-type-pill-grid",children:u4.map(x=>a.jsxs("button",{type:"button",className:`type-select-pill ${w.productType===x.id?"type-pill-selected":""}`,onClick:()=>v("productType",x.id),children:[a.jsx("span",{className:"pill-icon",children:x.icon}),a.jsx("span",{className:"pill-label",children:x.label})]},x.id))}),w.productType!=="service"&&w.productType!=="custom"&&a.jsxs("div",{className:"condition-toggle-row",children:[a.jsx("label",{className:"field-label",children:"Condition (हालत):"}),a.jsxs("div",{className:"toggle-btn-group",children:[a.jsx("button",{type:"button",className:`toggle-option ${w.condition==="new"?"toggle-active":""}`,onClick:()=>v("condition","new"),children:"🆕 Brand New (नया)"}),a.jsx("button",{type:"button",className:`toggle-option ${w.condition==="old"?"toggle-active":""}`,onClick:()=>v("condition","old"),children:"♻️ Second Hand (पुराना / री-ट्रेडेड)"})]})]})]}),["tyre","tube","flap","custom"].includes(w.productType)&&a.jsxs("div",{className:"form-section-card",children:[a.jsxs("h3",{className:"section-title",children:[a.jsx("span",{className:"step-num",children:"2"})," Tyre Category & Size (कैटेगरी और साइज)"]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Tyre Category (गाड़ी की श्रेणी) *"}),a.jsx("select",{value:w.categoryKey,onChange:x=>v("categoryKey",x.target.value),className:"smart-select",children:Qa.map(x=>a.jsxs("option",{value:x.id,children:[x.icon," ",x.name]},x.id))})]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Vehicle Type (गाड़ी का मॉडल) *"}),a.jsx("select",{value:w.vehicleTypeName,onChange:x=>v("vehicleTypeName",x.target.value),className:"smart-select",children:y.map((x,I)=>a.jsx("option",{value:x,children:x},I))})]}),a.jsxs("div",{className:"two-col-grid",children:[a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Tyre Brand (ब्रांड) *"}),a.jsxs("select",{value:w.brandName,onChange:x=>v("brandName",x.target.value),className:"smart-select",children:[Ga.map((x,I)=>a.jsxs("option",{value:x.name,children:[x.name," ",x.popular?"★ Popular":""]},I)),a.jsx("option",{value:"OTHER",children:"✏️ Other (Custom Brand / अन्य)"})]}),w.brandName==="OTHER"&&a.jsx("input",{type:"text",placeholder:"Type brand name (जैसे MRF, Metro...)",value:w.customBrand,onChange:x=>v("customBrand",x.target.value),className:"smart-text-input custom-input",required:!0})]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Tyre Size (साइज) *"}),a.jsxs("select",{value:w.sizeName,onChange:x=>v("sizeName",x.target.value),className:"smart-select",children:[_.map((x,I)=>a.jsx("option",{value:x,children:x},I)),a.jsx("option",{value:"OTHER",children:"✏️ Other (Custom Size / अन्य साइज)"})]}),w.sizeName==="OTHER"&&a.jsx("input",{type:"text",placeholder:"Type size (जैसे 195/55 R16, 10.00-20...)",value:w.customSize,onChange:x=>v("customSize",x.target.value),className:"smart-text-input custom-input",required:!0})]})]}),a.jsxs("div",{className:"two-col-grid",children:[a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Model / Tread Pattern (पैटर्न)"}),a.jsxs("select",{value:w.modelName,onChange:x=>v("modelName",x.target.value),className:"smart-select",children:[WO.map((x,I)=>a.jsx("option",{value:x,children:x},I)),a.jsx("option",{value:"OTHER",children:"✏️ Custom Model Name"})]}),w.modelName==="OTHER"&&a.jsx("input",{type:"text",placeholder:"Type pattern/model (जैसे Zapper, Milaze...)",value:w.customModel,onChange:x=>v("customModel",x.target.value),className:"smart-text-input custom-input"})]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Tyre Construction"}),a.jsxs("select",{value:w.tyreType,onChange:x=>v("tyreType",x.target.value),className:"smart-select",children:[a.jsx("option",{value:"Tubeless",children:"Tubeless (ट्यूबलेस)"}),a.jsx("option",{value:"Tube Type",children:"Tube Type (ट्यूब वाला)"}),a.jsx("option",{value:"Radial",children:"Radial Steel Belted"}),a.jsx("option",{value:"Bias / Nylon",children:"Bias / Nylon Ply"})]})]})]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Product Full Title (ग्राहक को दिखने वाला नाम)"}),a.jsx("input",{type:"text",value:w.productName,onChange:x=>v("productName",x.target.value),placeholder:"Product Title",className:"smart-text-input",required:!0})]})]}),w.productType==="service"&&a.jsxs("div",{className:"form-section-card",children:[a.jsxs("h3",{className:"section-title",children:[a.jsx("span",{className:"step-num",children:"2"})," Service Details (सर्विस की जानकारी)"]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Service Name (सर्विस का नाम) *"}),a.jsx("input",{type:"text",value:w.serviceName,onChange:x=>v("serviceName",x.target.value),placeholder:"e.g. Tyre Cut Repair / Wheel Alignment",className:"smart-text-input",required:!0})]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Approx Time Taken (समय)"}),a.jsx("input",{type:"text",value:w.serviceDuration,onChange:x=>v("serviceDuration",x.target.value),placeholder:"e.g. 30 Mins",className:"smart-text-input"})]})]}),a.jsxs("div",{className:"form-section-card",children:[a.jsxs("div",{className:"photo-section-header",children:[a.jsxs("div",{children:[a.jsxs("h3",{className:"section-title",style:{margin:0},children:[a.jsx("span",{className:"step-num",children:"3"})," Upload 4 Photos (4 फोटो अपलोड करें)"]}),a.jsx("p",{className:"section-subtext",children:"4 alag-alag angles se photo lagayein taaki customer aasani se pasand kare."})]}),a.jsxs("span",{className:"photos-counter-tag",children:[b," / 4 Uploaded"]})]}),a.jsx("div",{className:"four-photo-slots-grid",children:d4.map(x=>{const I=w.images[x.id],R=k===x.id;return a.jsxs("div",{className:"photo-slot-box",children:[a.jsx("div",{className:"slot-title-bar",children:a.jsx("span",{className:"slot-label",children:x.title})}),I?a.jsxs("div",{className:"slot-img-preview-wrap",children:[a.jsx("img",{src:I,alt:x.title,className:"slot-preview-img"}),a.jsxs("button",{type:"button",className:"slot-remove-btn",onClick:()=>O(x.id),title:"Remove Photo",children:[a.jsx(r1,{size:14})," Remove"]})]}):a.jsxs("label",{className:"slot-upload-dropzone",children:[a.jsx("input",{type:"file",accept:"image/*",onChange:C=>N(x.id,C.target.files[0]),style:{display:"none"}}),R?a.jsxs("div",{className:"uploading-spinner-box",children:[a.jsx("span",{className:"upload-spin"}),a.jsx("span",{children:"Uploading..."})]}):a.jsxs(a.Fragment,{children:[a.jsx(Ip,{size:24,className:"camera-icon-muted"}),a.jsx("span",{className:"slot-cta-text",children:"Click to Add Photo"}),a.jsx("small",{className:"slot-desc-text",children:x.desc})]})]})]},x.id)})})]}),a.jsxs("div",{className:"form-section-card",children:[a.jsxs("h3",{className:"section-title",children:[a.jsx("span",{className:"step-num",children:"4"})," Pricing & Stock (दाम और स्टॉक)"]}),a.jsx("p",{className:"section-subtext",children:"अपना सही MRP और सेलिंग प्राइस डालें — वेबसाइट पर ग्राहक को यही दाम दिखेगा।"}),a.jsxs("div",{className:"two-col-grid",children:[a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"MRP (₹ Original Price)"}),a.jsx("input",{type:"number",value:w.originalPrice,onChange:x=>v("originalPrice",x.target.value),placeholder:"उदा: 4800 (MRP)",className:"smart-text-input"})]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",style:{color:"#27ae60",fontWeight:700},children:"Selling / Offer Price (₹ सेलिंग प्राइस / ग्राहक का दाम) *"}),a.jsx("input",{type:"number",value:w.offerPrice,onChange:x=>v("offerPrice",x.target.value),placeholder:"उदा: 4199 (दाम दर्ज करें)",className:"smart-text-input highlight-price-input",required:!0})]})]}),w.productType!=="service"&&a.jsxs("div",{className:"two-col-grid",children:[a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Stock Quantity (कितने पीस उपलब्ध हैं?) *"}),a.jsx("input",{type:"number",value:w.stock,onChange:x=>v("stock",x.target.value),placeholder:"उदा: 5 (उपलब्ध पीस)",min:"0",className:"smart-text-input",required:!0})]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Warranty / Guarantee Details"}),a.jsx("input",{type:"text",value:w.warranty,onChange:x=>v("warranty",x.target.value),placeholder:"उदा: 5 Years Warranty (वैकल्पिक)",className:"smart-text-input"})]})]}),a.jsxs("div",{className:"input-field-group",children:[a.jsx("label",{className:"field-label",children:"Extra Description / Shop Notes (अतिरिक्त विवरण)"}),a.jsx("textarea",{value:w.description,onChange:x=>v("description",x.target.value),placeholder:"उदा: नई फिटिंग उपलब्ध, 5 साल वारंटी, तुरंत डिलीवरी...",rows:3,className:"smart-textarea"})]}),a.jsxs("div",{className:"form-action-row",children:[a.jsx("button",{type:"button",className:"save-draft-btn",disabled:d,onClick:x=>S(x,!0),children:"📝 Save as Draft"}),a.jsx("button",{type:"submit",className:"publish-submit-btn",disabled:d,children:d?"⏳ Publishing...":u?"✅ Update Product":"🚀 Publish to TyreSaathi"})]})]})]}),a.jsx("div",{className:"live-preview-sidebar",children:a.jsxs("div",{className:"preview-sticky-card",children:[a.jsxs("div",{className:"preview-header",children:[a.jsx("span",{className:"live-pulse-dot"}),a.jsx("h4",{children:"👁️ लाइव प्रीव्यू (Live Customer View)"}),a.jsx("span",{className:"preview-tag",children:"Preview"})]}),a.jsx("p",{style:{fontSize:"11.5px",color:"var(--text-muted)",margin:"0 0 10px",lineHeight:1.3},children:"ℹ️ यह कार्ड सिर्फ आपको दिखाने के लिए है कि फॉर्म भरने के बाद यह सामान वेबसाइट पर ग्राहक को कैसा दिखेगा।"}),a.jsxs("div",{className:"preview-main-img-box",children:[w.images.find(x=>x)?a.jsx("img",{src:w.images.find(x=>x),alt:"Product Preview",className:"preview-img-active"}):a.jsxs("div",{className:"preview-img-empty",children:[a.jsx(Ip,{size:36,color:"#aaa"}),a.jsx("span",{children:"फोटो अपलोड करने पर यहाँ दिखेगी"})]}),L>0&&a.jsxs("span",{className:"preview-discount-badge",children:[L,"% OFF"]})]}),a.jsx("div",{className:"preview-thumbs-row",children:w.images.map((x,I)=>a.jsx("div",{className:`preview-thumb ${x?"thumb-has-img":"thumb-empty"}`,children:x?a.jsx("img",{src:x,alt:`Thumb ${I+1}`}):a.jsx("span",{children:I+1})},I))}),a.jsxs("div",{className:"preview-body",children:[a.jsx("span",{className:"preview-category-badge",children:w.categoryName||"Vehicle Category"}),a.jsx("h3",{className:"preview-product-title",children:w.productType==="service"?w.serviceName||"सर्विस का नाम...":w.productName||"उत्पाद का नाम (ऑटो जनरेट होगा)..."}),a.jsx("div",{className:"preview-price-box",children:w.offerPrice?a.jsxs(a.Fragment,{children:[a.jsxs("span",{className:"preview-offer-price",children:["₹",w.offerPrice]}),Number(w.originalPrice)>Number(w.offerPrice)&&a.jsxs("span",{className:"preview-mrp",children:["₹",w.originalPrice]})]}):a.jsx("span",{className:"preview-offer-price",style:{color:"var(--text-muted)",fontSize:"16px"},children:"₹ -- (दाम दर्ज करें)"})}),a.jsxs("div",{className:"preview-features-list",children:[a.jsxs("div",{className:"preview-feature-item",children:[a.jsx("strong",{children:"🏷️ Brand:"})," ",w.brandName==="OTHER"?w.customBrand||"Custom":w.brandName||"चुनें"]}),w.sizeName&&a.jsxs("div",{className:"preview-feature-item",children:[a.jsx("strong",{children:"📏 Size:"})," ",w.sizeName==="OTHER"?w.customSize||"Custom":w.sizeName]}),w.productType!=="service"&&a.jsxs("div",{className:"preview-feature-item",children:[a.jsx("strong",{children:"📦 Stock:"})," ",a.jsx("span",{style:{color:Number(w.stock)>0?"#27ae60":"var(--text-muted)",fontWeight:700},children:Number(w.stock)>0?`${w.stock} Pieces in Stock`:w.stock===""?"संख्या दर्ज करें":"Out of Stock"})]}),a.jsxs("div",{className:"preview-feature-item",children:[a.jsx("strong",{children:"🏪 Shop:"})," ",(s==null?void 0:s.shopName)||"आपकी दुकान का नाम"]})]})]})]})})]}),a.jsx("style",{children:`
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
      `})]})}function k0(){const t=cn();return a.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px",fontFamily:"sans-serif"},children:[a.jsx("button",{onClick:()=>t(-1),style:{marginBottom:"20px",padding:"8px 16px",cursor:"pointer",background:"#f0f0f0",border:"1px solid #ccc",borderRadius:"4px"},children:"← Back"}),a.jsx("h1",{style:{textAlign:"center",color:"#333"},children:"Privacy Policy for TyreSaathi"}),a.jsxs("p",{style:{textAlign:"center",color:"#666"},children:[a.jsx("strong",{children:"Last Updated:"})," ",new Date().toLocaleDateString()]}),a.jsx("hr",{style:{margin:"20px 0"}}),a.jsx("h2",{children:"1. Introduction"}),a.jsxs("p",{children:["Welcome to ",a.jsx("strong",{children:"TyreSaathi"}),". We value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our web application."]}),a.jsx("h2",{children:"2. Information We Collect"}),a.jsx("p",{children:"When you register and use TyreSaathi, we may collect the following information:"}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"Personal Details:"})," Name, Email Address, and Phone Number."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Shop Details:"})," Shop Name, Location, and Inventory data (for Shop Owners)."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Usage Data:"})," Information about how you interact with our platform to improve user experience."]})]}),a.jsx("h2",{children:"3. How We Use Your Information"}),a.jsx("p",{children:"We use the collected data strictly to provide and improve our services:"}),a.jsxs("ul",{children:[a.jsx("li",{children:"To create and manage your account."}),a.jsx("li",{children:"To connect customers with shop owners for tyre-related services and products."}),a.jsx("li",{children:"To send important updates regarding bookings or security alerts."}),a.jsxs("li",{children:["We ",a.jsx("strong",{children:"do not"})," sell your personal data to any third-party marketing companies."]})]}),a.jsx("h2",{children:"4. Data Security (Firebase)"}),a.jsxs("p",{children:["Your data is stored securely using ",a.jsx("strong",{children:"Google Firebase"}),". We use industry-standard encryption and security rules to ensure that your personal information, passwords, and shop data remain safe and are only accessible to authorized users."]}),a.jsx("h2",{children:"5. User Rights"}),a.jsx("p",{children:"You have full control over your data. You can update your profile information at any time. If you wish to delete your account and all associated data, you can contact our support team."}),a.jsx("h2",{children:"6. Changes to This Policy"}),a.jsx("p",{children:"We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of the app implies your acceptance of the updated policy."}),a.jsx("h2",{children:"7. Contact Us"}),a.jsxs("p",{children:["If you have any questions or legal concerns regarding this Privacy Policy, please contact us at: ",a.jsx("br",{}),a.jsx("strong",{children:"Email:"})," tyresathi@gmail.com"]}),a.jsx("div",{style:{textAlign:"center",marginTop:"40px",padding:"20px",background:"#f9f9f9",borderRadius:"8px"},children:a.jsx("p",{children:"By using TyreSaathi, you agree to the terms outlined in this Privacy Policy."})})]})}const h4=[{id:"TS-INV-1001",invoiceNo:"TS-INV-1001",date:"2026-08-18",customerName:"Ramesh Sharma",customerPhone:"98765-11223",vehicleName:"Swift Dzire",vehicleNumber:"KA 05 MN 4589",shopName:"TyreSaathi Partner Hub",items:[{id:"1",name:"MRF Zapper FX 100/90-17 Tubeless Tyre",type:"tyre",qty:2,rate:2100,amount:4200},{id:"2",name:"Tyre Cut & Sidewall Repair (सर्विस)",type:"service",qty:1,rate:350,amount:350},{id:"3",name:"Nitrogen Air Fill (4 Tyres)",type:"service",qty:1,rate:100,amount:100}],subtotal:4650,discount:150,taxType:"none",taxAmount:0,grandTotal:4500,paymentMode:"upi",paymentStatus:"paid",notes:"5 Years manufacturer warranty on tyres. Free air check for 6 months.",createdAt:new Date().toISOString()},{id:"TS-INV-1002",invoiceNo:"TS-INV-1002",date:"2026-08-18",customerName:"Pooja Verma",customerPhone:"98440-99887",vehicleName:"Hyundai Creta",vehicleNumber:"KA 01 AB 8877",shopName:"TyreSaathi Partner Hub",items:[{id:"1",name:"3D Wheel Alignment & Balancing",type:"service",qty:1,rate:450,amount:450},{id:"2",name:"Tubeless Puncture Fix (2 Plugs)",type:"service",qty:2,rate:100,amount:200}],subtotal:650,discount:50,taxType:"none",taxAmount:0,grandTotal:600,paymentMode:"cash",paymentStatus:"paid",notes:"Alignment report given. Next checkup after 5000 km.",createdAt:new Date().toISOString()},{id:"TS-INV-1003",invoiceNo:"TS-INV-1003",date:"2026-08-17",customerName:"Anil Kumar",customerPhone:"99001-22334",vehicleName:"Royal Enfield Classic 350",vehicleNumber:"KA 04 EQ 1234",shopName:"TyreSaathi Partner Hub",items:[{id:"1",name:"CEAT Secura Zoom 3.00-18 Bike Tyre",type:"tyre",qty:1,rate:1850,amount:1850},{id:"2",name:"Doorstep Emergency Assistance",type:"service",qty:1,rate:499,amount:499}],subtotal:2349,discount:99,taxType:"none",taxAmount:0,grandTotal:2250,paymentMode:"khata",paymentStatus:"pending",notes:"Remaining payment promised by tomorrow evening.",createdAt:new Date().toISOString()}],p4=[{name:"Tyre Cut & Sidewall Repair (कट रिपेयर)",rate:350,type:"service"},{name:"Tubeless Puncture Repair (पंचर रिपेयर)",rate:100,type:"service"},{name:"3D Wheel Alignment & Balancing (अलाइनमेंट)",rate:450,type:"service"},{name:"New Tyre Fitting & Nitrogen Fill (फिटिंग)",rate:150,type:"service"},{name:"Doorstep Emergency Assistance (घर/रास्ते पर)",rate:499,type:"service"},{name:"Nitrogen Air Fill - All 4 Tyres",rate:100,type:"service"},{name:"Wheel Weights / Lead balancing (per 50g)",rate:80,type:"service"},{name:"Tyre Rotation & Inspection",rate:200,type:"service"}];function f4(){const{user:t,profile:e,isVendor:n}=nr(),[r]=sm();cn();const[i,s]=D.useState("create"),[o,l]=D.useState(h4),[u,d]=D.useState(!1),[p,f]=D.useState(!1),[g,k]=D.useState(""),[A,w]=D.useState("all"),[E,y]=D.useState({invoiceNo:`TS-INV-${Math.floor(1e3+Math.random()*9e3)}`,date:new Date().toISOString().split("T")[0],customerName:r.get("customer")||"",customerPhone:r.get("phone")||"",vehicleName:r.get("vehicle")||"",vehicleNumber:r.get("vehicleNo")||"",shopName:(e==null?void 0:e.shopName)||"TyreSaathi Partner Hub",shopPhone:(e==null?void 0:e.phone)||"",shopAddress:(e==null?void 0:e.address)||"Verified TyreSaathi Network",items:[{id:"1",name:r.get("service")||"MRF / Apollo Tyre Replacement",type:"tyre",qty:1,rate:2500,amount:2500}],subtotal:2500,discount:0,taxType:"none",taxAmount:0,grandTotal:2500,paymentMode:"upi",paymentStatus:"paid",notes:"Warranty as per company terms. Free checkup on next visit."}),[_,v]=D.useState(null);D.useEffect(()=>{const M=E.items.reduce((X,ne)=>X+(Number(ne.amount)||0),0),W=Number(E.discount)||0,ee=Math.max(0,M-W);let qe=0;E.taxType==="gst18"?qe=Math.round(ee*.18):E.taxType==="gst28"&&(qe=Math.round(ee*.28));const q=Math.max(0,ee+qe);y(X=>({...X,subtotal:M,taxAmount:qe,grandTotal:q}))},[E.items,E.discount,E.taxType]);const N=(M,W,ee)=>{y(qe=>{const q=qe.items.map(X=>{if(X.id!==M)return X;const ne={...X,[W]:ee};if(W==="qty"||W==="rate"){const be=Number(W==="qty"?ee:X.qty)||0,pe=Number(W==="rate"?ee:X.rate)||0;ne.amount=be*pe}return ne});return{...qe,items:q}})},O=(M="tyre")=>{const W={id:Date.now().toString(),name:M==="service"?"Wheel Alignment / Puncture Fix":"New Tyre / Tube",type:M,qty:1,rate:M==="service"?350:2200,amount:M==="service"?350:2200};y(ee=>({...ee,items:[...ee.items,W]}))},L=M=>{const W={id:Date.now().toString(),name:M.name,type:M.type,qty:1,rate:M.rate,amount:M.rate};y(ee=>({...ee,items:[...ee.items,W]}))},S=M=>{if(E.items.length<=1){alert("कम से कम एक आइटम बिल में होना चाहिए।");return}y(W=>({...W,items:W.items.filter(ee=>ee.id!==M)}))},b=async M=>{if(M&&M.preventDefault(),!E.customerName.trim()){alert("कृपया ग्राहक का नाम (Customer Name) दर्ज करें।");return}d(!0);const W={...E,id:E.invoiceNo,shopName:(e==null?void 0:e.shopName)||E.shopName||"TyreSaathi Partner Hub",createdAt:new Date().toISOString()};try{await Jm(Ka(on,"invoices"),{...W,timestamp:Oi()})}catch(ee){console.warn("Firestore invoice save note (using local state):",ee)}l(ee=>[W,...ee]),d(!1),f(!0),setTimeout(()=>f(!1),4e3),v(W)},x=()=>{y({invoiceNo:`TS-INV-${Math.floor(1e3+Math.random()*9e3)}`,date:new Date().toISOString().split("T")[0],customerName:"",customerPhone:"",vehicleName:"",vehicleNumber:"",shopName:(e==null?void 0:e.shopName)||"TyreSaathi Partner Hub",shopPhone:(e==null?void 0:e.phone)||"",shopAddress:(e==null?void 0:e.address)||"Verified TyreSaathi Network",items:[{id:Date.now().toString(),name:"",type:"tyre",qty:1,rate:0,amount:0}],subtotal:0,discount:0,taxType:"none",taxAmount:0,grandTotal:0,paymentMode:"upi",paymentStatus:"paid",notes:"Warranty as per company terms. Free checkup on next visit."})},I=M=>{const W=M.items.map((q,X)=>`${X+1}. ${q.name} (x${q.qty}) - ₹${q.amount}`).join(`
`),ee=`🧾 *TyreSaathi Retail Invoice*

🏢 *Dukan:* ${M.shopName}
📄 *Bill No:* ${M.invoiceNo}
📅 *Date:* ${M.date}
👤 *Customer:* ${M.customerName} (${M.vehicleName||"Vehicle"} ${M.vehicleNumber||""})

*ITEMS BREAKDOWN:*
${W}

💰 *Subtotal:* ₹${M.subtotal}
`+(M.discount>0?`🎁 *Discount:* -₹${M.discount}
`:"")+(M.taxAmount>0?`🏛️ *GST Tax:* +₹${M.taxAmount}
`:"")+`💳 *Grand Total:* ₹${M.grandTotal}
✅ *Payment Mode:* ${M.paymentMode.toUpperCase()} (${M.paymentStatus==="paid"?"PAID ✅":"PENDING ⏳"})

_TyreSaathi se judne ke liye dhanyawad! Shubh Yatra!_ 🚗✨`;return`https://wa.me/91${M.customerPhone.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(ee)}`},R=o.filter(M=>{const W=g.toLowerCase(),ee=M.customerName.toLowerCase().includes(W)||M.customerPhone.includes(W)||M.invoiceNo.toLowerCase().includes(W)||M.vehicleNumber&&M.vehicleNumber.toLowerCase().includes(W),qe=A==="all"||M.paymentStatus===A||M.paymentMode===A;return ee&&qe}),C=o.reduce((M,W)=>M+(W.paymentStatus==="paid"?W.grandTotal:0),0),P=o.reduce((M,W)=>M+(W.paymentStatus==="pending"?W.grandTotal:0),0);return a.jsxs("div",{className:"billing-page-container",children:[a.jsxs("div",{className:"billing-header-row",children:[a.jsxs("div",{children:[a.jsxs("h1",{className:"billing-title",children:[a.jsx(mi,{size:26,color:"#c0392b"})," Tyre & Service Billing (दुकान बिलिंग)"]}),a.jsx("p",{className:"billing-sub",children:"Grahak ke liye instant cash memo, GST/Non-GST retail invoice banayein, print karein aur WhatsApp par bhejein."})]}),a.jsxs("div",{className:"billing-nav-pills",children:[a.jsxs("button",{className:`pill-btn ${i==="create"?"pill-btn-active":""}`,onClick:()=>s("create"),children:[a.jsx(Sp,{size:15})," ➕ Naya Bill Banayein"]}),a.jsxs("button",{className:`pill-btn ${i==="history"?"pill-btn-active":""}`,onClick:()=>s("history"),children:[a.jsx(s2,{size:15})," 📋 Sabhi Bills (",o.length,")"]})]})]}),p&&a.jsxs("div",{className:"billing-success-alert",children:[a.jsx(Aa,{size:18,color:"#27ae60"}),a.jsxs("span",{children:["✅ Bill #",E.invoiceNo," successfully save ho gaya hai! Niche print karein ya WhatsApp karein."]})]}),i==="create"&&a.jsxs("div",{className:"billing-workspace-grid",children:[a.jsx("div",{className:"billing-form-card",children:a.jsxs("form",{onSubmit:b,children:[a.jsxs("div",{className:"form-sub-card",children:[a.jsxs("div",{className:"card-section-title",children:[a.jsx("span",{children:"1"})," Grahak Aur Gaadi Ki Details (Customer & Vehicle)"]}),a.jsxs("div",{className:"form-grid-3",children:[a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Customer Name (ग्राहक का नाम) *"}),a.jsxs("div",{className:"input-with-icon",children:[a.jsx(ja,{size:15}),a.jsx("input",{type:"text",placeholder:"उदा: Ramesh Sharma",value:E.customerName,onChange:M=>y({...E,customerName:M.target.value}),required:!0})]})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Mobile Number (मोबाइल नंबर) *"}),a.jsxs("div",{className:"input-with-icon",children:[a.jsx(Ca,{size:15}),a.jsx("input",{type:"tel",placeholder:"उदा: 9876543210",value:E.customerPhone,onChange:M=>y({...E,customerPhone:M.target.value}),required:!0})]})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Invoice Date (तारीख)"}),a.jsxs("div",{className:"input-with-icon",children:[a.jsx(Bi,{size:15}),a.jsx("input",{type:"date",value:E.date,onChange:M=>y({...E,date:M.target.value})})]})]})]}),a.jsxs("div",{className:"form-grid-2",style:{marginTop:"12px"},children:[a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Vehicle Model (गाड़ी का नाम/मॉडल)"}),a.jsxs("div",{className:"input-with-icon",children:[a.jsx(Xw,{size:15}),a.jsx("input",{type:"text",placeholder:"उदा: Swift Dzire / Creta / Activa",value:E.vehicleName,onChange:M=>y({...E,vehicleName:M.target.value})})]})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Vehicle Registration No. (गाड़ी नंबर)"}),a.jsx("input",{type:"text",placeholder:"उदा: KA 05 MN 4589 / DL 01 AB 1234",value:E.vehicleNumber,onChange:M=>y({...E,vehicleNumber:M.target.value.toUpperCase()}),style:{textTransform:"uppercase"}})]})]})]}),a.jsxs("div",{className:"form-sub-card",children:[a.jsxs("div",{className:"card-section-header",children:[a.jsxs("div",{className:"card-section-title",children:[a.jsx("span",{children:"2"})," Tyres, Tubes & Services (सामान और सर्विस विवरण)"]}),a.jsxs("div",{className:"quick-add-actions",children:[a.jsx("button",{type:"button",className:"btn-quick-add",onClick:()=>O("tyre"),children:"+ 🛞 Tyre Item"}),a.jsx("button",{type:"button",className:"btn-quick-add",onClick:()=>O("service"),children:"+ 🛠️ Service Item"})]})]}),a.jsxs("div",{className:"presets-bar",children:[a.jsx("span",{className:"preset-label",children:"⚡ Quick Services:"}),p4.slice(0,4).map((M,W)=>a.jsxs("button",{type:"button",className:"preset-chip",onClick:()=>L(M),children:["+ ",M.name.split("(")[0]," (₹",M.rate,")"]},W))]}),a.jsx("div",{className:"items-table-wrapper",children:a.jsxs("table",{className:"items-entry-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{style:{width:"45%"},children:"Item Description / Service Name"}),a.jsx("th",{style:{width:"15%"},children:"Type"}),a.jsx("th",{style:{width:"12%"},children:"Qty"}),a.jsx("th",{style:{width:"15%"},children:"Rate (₹)"}),a.jsx("th",{style:{width:"13%"},children:"Amount (₹)"}),a.jsx("th",{style:{width:"5%"}})]})}),a.jsx("tbody",{children:E.items.map((M,W)=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsx("input",{type:"text",value:M.name,placeholder:"उदा: Apollo Amazer 185/65 R15 / Cut Repair",onChange:ee=>N(M.id,"name",ee.target.value),className:"item-name-input",required:!0})}),a.jsx("td",{children:a.jsxs("select",{value:M.type,onChange:ee=>N(M.id,"type",ee.target.value),className:"item-type-select",children:[a.jsx("option",{value:"tyre",children:"🛞 Tyre"}),a.jsx("option",{value:"tube",children:"⭕ Tube"}),a.jsx("option",{value:"service",children:"🛠️ Service"}),a.jsx("option",{value:"alloy",children:"✨ Alloy"}),a.jsx("option",{value:"other",children:"📦 Other"})]})}),a.jsx("td",{children:a.jsx("input",{type:"number",min:"1",value:M.qty,onChange:ee=>N(M.id,"qty",ee.target.value),className:"item-qty-input"})}),a.jsx("td",{children:a.jsx("input",{type:"number",min:"0",value:M.rate,onChange:ee=>N(M.id,"rate",ee.target.value),className:"item-rate-input"})}),a.jsxs("td",{className:"item-amount-col",children:["₹",M.amount]}),a.jsx("td",{children:a.jsx("button",{type:"button",className:"btn-remove-row",onClick:()=>S(M.id),title:"Delete Item",children:a.jsx(r1,{size:15})})})]},M.id))})]})}),a.jsxs("button",{type:"button",className:"btn-add-row-full",onClick:()=>O("tyre"),children:[a.jsx(Sp,{size:15})," Nayi Line / Item Jodein"]})]}),a.jsxs("div",{className:"form-sub-card",children:[a.jsxs("div",{className:"card-section-title",children:[a.jsx("span",{children:"3"})," Tax, Discount Aur Payment Details"]}),a.jsxs("div",{className:"form-grid-3",children:[a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Discount / Chhut (₹ छूट)"}),a.jsx("input",{type:"number",min:"0",value:E.discount,onChange:M=>y({...E,discount:M.target.value}),placeholder:"0"})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Tax Invoice Mode (जीएसटी प्रकार)"}),a.jsxs("select",{value:E.taxType,onChange:M=>y({...E,taxType:M.target.value}),children:[a.jsx("option",{value:"none",children:"Non-GST / Kacha Bill (0% Tax)"}),a.jsx("option",{value:"gst18",children:"GST 18% (Tyres & Auto Services)"}),a.jsx("option",{value:"gst28",children:"GST 28% (Commercial / Heavy)"})]})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Payment Method (भुगतान का तरीका)"}),a.jsxs("select",{value:E.paymentMode,onChange:M=>y({...E,paymentMode:M.target.value}),children:[a.jsx("option",{value:"upi",children:"📱 UPI (GPay / PhonePe / Paytm)"}),a.jsx("option",{value:"cash",children:"💵 Cash (नकद)"}),a.jsx("option",{value:"card",children:"💳 Debit / Credit Card"}),a.jsx("option",{value:"khata",children:"📒 Khata / Udhar (बाकी)"})]})]})]}),a.jsxs("div",{className:"form-grid-2",style:{marginTop:"12px"},children:[a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Payment Status"}),a.jsxs("div",{className:"payment-status-toggle",children:[a.jsx("button",{type:"button",className:`status-toggle-btn ${E.paymentStatus==="paid"?"status-paid-active":""}`,onClick:()=>y({...E,paymentStatus:"paid"}),children:"✅ Paid (पूरा पैसा मिल गया)"}),a.jsx("button",{type:"button",className:`status-toggle-btn ${E.paymentStatus==="pending"?"status-pending-active":""}`,onClick:()=>y({...E,paymentStatus:"pending"}),children:"⏳ Pending / Khata (उधार बाकी)"})]})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{children:"Warranty / Terms Notes (वारंटी व शर्तें)"}),a.jsx("input",{type:"text",value:E.notes,onChange:M=>y({...E,notes:M.target.value}),placeholder:"e.g. 5 Years Unconditional Warranty"})]})]})]}),a.jsxs("div",{className:"billing-action-buttons",children:[a.jsx("button",{type:"button",className:"btn-reset-bill",onClick:x,children:"🔄 Form Reset Karein"}),a.jsxs("button",{type:"submit",className:"btn-generate-bill",disabled:u,children:[a.jsx(mi,{size:17})," ",u?"Bill Save Ho Raha Hai...":"💾 Bill Save & Print Karein"]})]})]})}),a.jsx("div",{className:"billing-receipt-sidebar",children:a.jsxs("div",{className:"live-receipt-card",children:[a.jsxs("div",{className:"receipt-top-brand",children:[a.jsx("span",{className:"brand-badge",children:"TYRESAATHI RETAIL INVOICE"}),a.jsxs("span",{className:"receipt-inv-num",children:["#",E.invoiceNo]})]}),a.jsxs("div",{className:"receipt-shop-meta",children:[a.jsx("h3",{children:E.shopName||"TyreSaathi Partner Hub"}),a.jsx("p",{children:"Verified Tyre & Auto Service Network"}),a.jsxs("small",{children:["Date: ",E.date]})]}),a.jsx("div",{className:"receipt-divider"}),a.jsxs("div",{className:"receipt-customer-details",children:[a.jsxs("div",{children:[a.jsx("span",{className:"meta-lbl",children:"Customer:"}),a.jsx("strong",{children:E.customerName||"Grahak Ka Naam"})]}),a.jsxs("div",{children:[a.jsx("span",{className:"meta-lbl",children:"Phone:"}),a.jsx("span",{children:E.customerPhone||"Mobile Number"})]}),E.vehicleNumber&&a.jsxs("div",{children:[a.jsx("span",{className:"meta-lbl",children:"Vehicle:"}),a.jsxs("span",{children:[E.vehicleName," (",E.vehicleNumber,")"]})]})]}),a.jsx("div",{className:"receipt-divider"}),a.jsx("div",{className:"receipt-items-list",children:E.items.map((M,W)=>a.jsxs("div",{className:"receipt-item-row",children:[a.jsxs("div",{className:"it-left",children:[a.jsx("span",{className:"it-name",children:M.name||"Item Name"}),a.jsxs("small",{className:"it-qty",children:[M.qty," x ₹",M.rate]})]}),a.jsxs("span",{className:"it-amt",children:["₹",M.amount]})]},W))}),a.jsx("div",{className:"receipt-divider"}),a.jsxs("div",{className:"receipt-calc-table",children:[a.jsxs("div",{className:"calc-row",children:[a.jsx("span",{children:"Subtotal:"}),a.jsxs("span",{children:["₹",E.subtotal]})]}),E.discount>0&&a.jsxs("div",{className:"calc-row discount-row",children:[a.jsx("span",{children:"Discount:"}),a.jsxs("span",{children:["-₹",E.discount]})]}),E.taxAmount>0&&a.jsxs("div",{className:"calc-row tax-row",children:[a.jsxs("span",{children:["GST (",E.taxType==="gst18"?"18%":"28%","):"]}),a.jsxs("span",{children:["+₹",E.taxAmount]})]}),a.jsxs("div",{className:"calc-row grand-total-row",children:[a.jsx("span",{children:"Grand Total:"}),a.jsxs("span",{className:"grand-amount",children:["₹",E.grandTotal]})]})]}),a.jsxs("div",{className:"receipt-payment-tag",children:[a.jsxs("span",{children:["Payment Mode: ",a.jsx("strong",{children:E.paymentMode.toUpperCase()})]}),a.jsx("span",{className:E.paymentStatus==="paid"?"badge-paid":"badge-pending",children:E.paymentStatus==="paid"?"✅ PAID":"⏳ KHATA"})]}),a.jsxs("div",{className:"receipt-actions-grid",children:[a.jsxs("button",{type:"button",className:"btn-print-preview",onClick:()=>v(E),children:[a.jsx(ch,{size:15})," Print / PDF Slip"]}),E.customerPhone&&a.jsx("a",{href:I(E),target:"_blank",rel:"noreferrer",className:"btn-whatsapp-share",children:"💬 WhatsApp Bill"})]})]})})]}),i==="history"&&a.jsxs("div",{className:"billing-history-container",children:[a.jsxs("div",{className:"billing-stats-grid",children:[a.jsxs("div",{className:"stat-card",children:[a.jsx("span",{className:"stat-icon-wrap",style:{background:"#e8f8f5",color:"#27ae60"},children:a.jsx(n2,{size:20})}),a.jsxs("div",{children:[a.jsx("span",{className:"stat-label",children:"Total Revenue Collected"}),a.jsxs("h3",{className:"stat-value",children:["₹",C.toLocaleString()]})]})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("span",{className:"stat-icon-wrap",style:{background:"#fef9e7",color:"#f39c12"},children:a.jsx(t2,{size:20})}),a.jsxs("div",{children:[a.jsx("span",{className:"stat-label",children:"Khata / Pending Amount"}),a.jsxs("h3",{className:"stat-value",style:{color:"#d35400"},children:["₹",P.toLocaleString()]})]})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("span",{className:"stat-icon-wrap",style:{background:"#ebf5fb",color:"#2980b9"},children:a.jsx(mi,{size:20})}),a.jsxs("div",{children:[a.jsx("span",{className:"stat-label",children:"Total Bills Generated"}),a.jsxs("h3",{className:"stat-value",children:[o.length," Bills"]})]})]})]}),a.jsxs("div",{className:"history-toolbar",children:[a.jsxs("div",{className:"history-search-input",children:[a.jsx(ki,{size:16}),a.jsx("input",{type:"text",placeholder:"Search by customer, phone, vehicle no, or bill #...",value:g,onChange:M=>k(M.target.value)})]}),a.jsxs("div",{className:"history-filter-pills",children:[a.jsx("button",{className:`hist-filter ${A==="all"?"hist-active":""}`,onClick:()=>w("all"),children:"All"}),a.jsx("button",{className:`hist-filter ${A==="paid"?"hist-active":""}`,onClick:()=>w("paid"),children:"✅ Paid"}),a.jsx("button",{className:`hist-filter ${A==="pending"?"hist-active":""}`,onClick:()=>w("pending"),children:"⏳ Khata / Pending"}),a.jsx("button",{className:`hist-filter ${A==="upi"?"hist-active":""}`,onClick:()=>w("upi"),children:"📱 UPI"}),a.jsx("button",{className:`hist-filter ${A==="cash"?"hist-active":""}`,onClick:()=>w("cash"),children:"💵 Cash"})]})]}),a.jsx("div",{className:"invoices-table-card",children:R.length===0?a.jsxs("div",{className:"no-invoices-found",children:[a.jsx(mi,{size:40,color:"#bbb"}),a.jsx("h4",{children:"No Bills Found"}),a.jsx("p",{children:'Naya bill banane ke liye upar "Naya Bill Banayein" button par click karein.'})]}):a.jsxs("table",{className:"invoices-history-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Bill No & Date"}),a.jsx("th",{children:"Customer Details"}),a.jsx("th",{children:"Vehicle"}),a.jsx("th",{children:"Items Summary"}),a.jsx("th",{children:"Total Amount"}),a.jsx("th",{children:"Payment"}),a.jsx("th",{children:"Actions"})]})}),a.jsx("tbody",{children:R.map(M=>a.jsxs("tr",{children:[a.jsxs("td",{children:[a.jsx("strong",{children:M.invoiceNo}),a.jsx("small",{className:"cell-subtext",children:M.date})]}),a.jsxs("td",{children:[a.jsx("span",{className:"customer-name-bold",children:M.customerName}),a.jsxs("a",{href:`tel:${M.customerPhone}`,className:"customer-phone-link",children:["📞 ",M.customerPhone]})]}),a.jsx("td",{children:M.vehicleName||M.vehicleNumber?a.jsxs(a.Fragment,{children:[a.jsx("span",{children:M.vehicleName}),a.jsx("small",{className:"vehicle-no-badge",children:M.vehicleNumber})]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsxs("td",{children:[a.jsxs("span",{className:"items-count-tag",children:[M.items.length," Items"]}),a.jsxs("small",{className:"items-summary-preview",children:[M.items.map(W=>W.name).slice(0,2).join(", "),M.items.length>2?"...":""]})]}),a.jsxs("td",{children:[a.jsxs("strong",{className:"table-grand-total",children:["₹",M.grandTotal]}),M.discount>0&&a.jsxs("small",{className:"discount-tag",children:["₹",M.discount," Off"]})]}),a.jsxs("td",{children:[a.jsx("span",{className:`status-pill ${M.paymentStatus==="paid"?"pill-paid":"pill-pending"}`,children:M.paymentStatus==="paid"?"✅ Paid":"⏳ Pending"}),a.jsx("small",{className:"pay-mode-text",children:M.paymentMode.toUpperCase()})]}),a.jsx("td",{children:a.jsxs("div",{className:"table-actions-cell",children:[a.jsxs("button",{type:"button",className:"btn-tbl-print",onClick:()=>v(M),title:"Print / View Invoice",children:[a.jsx(ch,{size:14})," Print"]}),a.jsx("a",{href:I(M),target:"_blank",rel:"noreferrer",className:"btn-tbl-wa",title:"Send on WhatsApp",children:"💬 WA"})]})})]},M.id))})]})})]}),_&&a.jsx("div",{className:"print-modal-overlay",onClick:()=>v(null),children:a.jsxs("div",{className:"print-modal-box",onClick:M=>M.stopPropagation(),children:[a.jsxs("div",{className:"print-modal-controls no-print",children:[a.jsx("h3",{children:"📄 Retail Invoice Print Preview"}),a.jsxs("div",{className:"print-controls-right",children:[a.jsxs("button",{type:"button",className:"btn-do-print",onClick:()=>window.print(),children:[a.jsx(ch,{size:16})," Print / Save as PDF"]}),a.jsx("button",{type:"button",className:"btn-close-modal",onClick:()=>v(null),children:"✕ Close"})]})]}),a.jsxs("div",{className:"invoice-paper-sheet",id:"printable-invoice",children:[a.jsxs("div",{className:"paper-header",children:[a.jsxs("div",{className:"paper-header-left",children:[a.jsx("img",{src:"/logo.png",alt:"TyreSaathi",className:"paper-logo",onError:M=>{M.target.src="/tyresaathi-logo.png"}}),a.jsxs("div",{children:[a.jsx("h2",{className:"paper-shop-name",children:_.shopName}),a.jsx("p",{className:"paper-shop-tag",children:"Authorized TyreSaathi Network Partner"}),a.jsx("p",{className:"paper-shop-info",children:"India's Trusted Tyre & Service Network"})]})]}),a.jsxs("div",{className:"paper-header-right",children:[a.jsx("span",{className:"invoice-badge-title",children:_.taxType!=="none"?"TAX INVOICE (जीएसटी बिल)":"RETAIL CASH MEMO (कैश मेमो)"}),a.jsxs("div",{className:"invoice-meta-pair",children:[a.jsx("strong",{children:"Invoice No:"})," ",a.jsx("span",{children:_.invoiceNo})]}),a.jsxs("div",{className:"invoice-meta-pair",children:[a.jsx("strong",{children:"Date:"})," ",a.jsx("span",{children:_.date})]}),a.jsxs("div",{className:"invoice-meta-pair",children:[a.jsx("strong",{children:"Payment:"})," ",a.jsxs("span",{style:{textTransform:"uppercase"},children:[_.paymentMode," (",_.paymentStatus,")"]})]})]})]}),a.jsx("div",{className:"paper-thick-line"}),a.jsxs("div",{className:"paper-billed-to-grid",children:[a.jsxs("div",{className:"billed-party-col",children:[a.jsx("span",{className:"paper-sec-label",children:"BILLED TO (ग्राहक विवरण):"}),a.jsx("h4",{className:"billed-customer-name",children:_.customerName}),a.jsxs("p",{children:[a.jsx("strong",{children:"Phone:"})," ",_.customerPhone]})]}),a.jsxs("div",{className:"billed-vehicle-col",children:[a.jsx("span",{className:"paper-sec-label",children:"VEHICLE DETAILS (गाड़ी विवरण):"}),a.jsxs("p",{children:[a.jsx("strong",{children:"Vehicle Model:"})," ",_.vehicleName||"—"]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Reg. Number:"})," ",_.vehicleNumber||"—"]})]})]}),a.jsxs("table",{className:"paper-items-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{style:{width:"8%"},children:"#"}),a.jsx("th",{style:{width:"52%"},children:"Item Description / Service"}),a.jsx("th",{style:{width:"12%"},children:"Qty"}),a.jsx("th",{style:{width:"14%"},children:"Rate (₹)"}),a.jsx("th",{style:{width:"14%",textAlign:"right"},children:"Amount (₹)"})]})}),a.jsx("tbody",{children:_.items.map((M,W)=>a.jsxs("tr",{children:[a.jsx("td",{children:W+1}),a.jsxs("td",{children:[a.jsx("strong",{children:M.name}),a.jsxs("span",{className:"paper-type-sub",children:["(",M.type.toUpperCase(),")"]})]}),a.jsx("td",{children:M.qty}),a.jsxs("td",{children:["₹",M.rate]}),a.jsxs("td",{style:{textAlign:"right"},children:["₹",M.amount]})]},W))})]}),a.jsxs("div",{className:"paper-totals-layout",children:[a.jsxs("div",{className:"paper-notes-col",children:[a.jsx("span",{className:"paper-sec-label",children:"TERMS & CONDITIONS:"}),a.jsxs("ul",{className:"paper-terms-list",children:[a.jsx("li",{children:_.notes||"Goods once sold cannot be returned without warranty card."}),a.jsx("li",{children:"Tyre warranty is subject to manufacturer terms and conditions."}),a.jsx("li",{children:"Free wheel checkup & air pressure inspection for 3 months."})]})]}),a.jsxs("div",{className:"paper-amounts-col",children:[a.jsxs("div",{className:"paper-amt-row",children:[a.jsx("span",{children:"Subtotal:"}),a.jsxs("strong",{children:["₹",_.subtotal]})]}),_.discount>0&&a.jsxs("div",{className:"paper-amt-row",children:[a.jsx("span",{children:"Discount:"}),a.jsxs("strong",{children:["-₹",_.discount]})]}),_.taxAmount>0&&a.jsxs("div",{className:"paper-amt-row",children:[a.jsxs("span",{children:["GST (",_.taxType==="gst18"?"18%":"28%","):"]}),a.jsxs("strong",{children:["+₹",_.taxAmount]})]}),a.jsxs("div",{className:"paper-grand-total-box",children:[a.jsx("span",{children:"GRAND TOTAL:"}),a.jsxs("span",{className:"paper-grand-amt",children:["₹",_.grandTotal]})]})]})]}),a.jsxs("div",{className:"paper-footer-signatures",children:[a.jsxs("div",{className:"sign-col",children:[a.jsx("div",{className:"sign-line"}),a.jsx("span",{children:"Customer Signature"})]}),a.jsxs("div",{className:"sign-col",style:{textAlign:"right"},children:[a.jsx("div",{className:"sign-line"}),a.jsx("span",{children:"Authorized Signature & Shop Stamp"})]})]})]})]})}),a.jsx("style",{children:`
        .billing-page-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .billing-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 800px) {
          .billing-header-row { flex-direction: column; }
        }
        .billing-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .billing-sub {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .billing-nav-pills {
          display: flex;
          gap: 8px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 4px;
          border-radius: 10px;
        }
        .pill-btn {
          background: none;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          color: var(--text-muted);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }
        .pill-btn-active {
          background: #c0392b;
          color: white;
        }

        .billing-success-alert {
          background: #eafaf1;
          border: 1.5px solid #2ecc71;
          color: #27ae60;
          padding: 12px 16px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        /* Workspace Grid */
        .billing-workspace-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1050px) {
          .billing-workspace-grid { grid-template-columns: 1fr; }
        }

        /* Form Sub Cards */
        .billing-form-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-sub-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .card-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .card-section-title {
          font-size: 15px;
          font-weight: 800;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .card-section-title span {
          background: #c0392b;
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        .quick-add-actions {
          display: flex;
          gap: 6px;
        }
        .btn-quick-add {
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-quick-add:hover {
          background: var(--border);
        }

        .presets-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 14px;
          padding: 8px 12px;
          background: var(--bg);
          border-radius: 8px;
          border: 1px dashed var(--border);
        }
        .preset-label {
          font-size: 11.5px;
          font-weight: 700;
          color: #c0392b;
        }
        .preset-chip {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 11.5px;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }
        .preset-chip:hover {
          background: #fdedec;
          border-color: #c0392b;
          color: #c0392b;
        }

        /* Form Grids */
        .form-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 700px) {
          .form-grid-3, .form-grid-2 { grid-template-columns: 1fr; }
        }

        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-input-group label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-with-icon svg {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        .input-with-icon input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }
        .input-with-icon input:focus,
        .form-input-group input:focus,
        .form-input-group select:focus {
          border-color: #c0392b;
        }
        .form-input-group input,
        .form-input-group select {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }

        .payment-status-toggle {
          display: flex;
          gap: 8px;
        }
        .status-toggle-btn {
          flex: 1;
          padding: 10px 8px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg);
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
        }
        .status-paid-active {
          background: #eafaf1;
          border-color: #2ecc71;
          color: #27ae60;
        }
        .status-pending-active {
          background: #fef9e7;
          border-color: #f39c12;
          color: #d35400;
        }

        /* Items Entry Table */
        .items-table-wrapper {
          overflow-x: auto;
          margin-bottom: 12px;
        }
        .items-entry-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .items-entry-table th {
          background: var(--surface-2);
          padding: 8px 10px;
          text-align: left;
          font-weight: 700;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }
        .items-entry-table td {
          padding: 8px 6px;
          border-bottom: 1px solid var(--border);
        }
        .item-name-input {
          width: 100%;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13px;
        }
        .item-type-select {
          width: 100%;
          padding: 8px 4px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 12px;
        }
        .item-qty-input,
        .item-rate-input {
          width: 100%;
          padding: 8px 6px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13px;
          text-align: right;
        }
        .item-amount-col {
          font-weight: 800;
          color: #c0392b;
          text-align: right;
          padding-right: 10px;
        }
        .btn-remove-row {
          background: none;
          border: none;
          color: #c0392b;
          cursor: pointer;
          padding: 4px;
        }
        .btn-add-row-full {
          width: 100%;
          background: var(--surface-2);
          border: 1.5px dashed var(--border);
          color: var(--text);
          padding: 9px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-add-row-full:hover {
          background: var(--border);
        }

        .billing-action-buttons {
          display: flex;
          gap: 14px;
          margin-top: 10px;
        }
        .btn-reset-bill {
          flex: 1;
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-generate-bill {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
        }
        .btn-generate-bill:hover {
          background: #a93226;
        }

        /* Live Receipt Sidebar */
        .live-receipt-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          position: sticky;
          top: 80px;
        }
        .receipt-top-brand {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .brand-badge {
          font-size: 11px;
          font-weight: 800;
          color: #c0392b;
          letter-spacing: 0.5px;
        }
        .receipt-inv-num {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .receipt-shop-meta h3 {
          font-size: 16px;
          font-weight: 800;
          margin: 0 0 2px;
          color: var(--text);
        }
        .receipt-shop-meta p {
          font-size: 11.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .receipt-shop-meta small {
          font-size: 11px;
          color: var(--text-muted);
        }
        .receipt-divider {
          height: 1px;
          background: var(--border);
          margin: 12px 0;
        }
        .receipt-customer-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12.5px;
        }
        .meta-lbl {
          color: var(--text-muted);
          display: inline-block;
          width: 70px;
        }
        .receipt-items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 180px;
          overflow-y: auto;
        }
        .receipt-item-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          font-size: 12.5px;
        }
        .it-left {
          display: flex;
          flex-direction: column;
          max-width: 75%;
        }
        .it-name {
          font-weight: 600;
          color: var(--text);
        }
        .it-qty {
          color: var(--text-muted);
          font-size: 11px;
        }
        .it-amt {
          font-weight: 700;
          color: var(--text);
        }
        .receipt-calc-table {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
        }
        .discount-row { color: #27ae60; font-weight: 600; }
        .tax-row { color: #8e44ad; font-weight: 600; }
        .grand-total-row {
          border-top: 1.5px dashed var(--border);
          padding-top: 8px;
          margin-top: 4px;
          font-weight: 800;
          font-size: 16px;
          color: var(--text);
        }
        .grand-amount {
          color: #c0392b;
          font-size: 18px;
        }
        .receipt-payment-tag {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          margin: 12px 0 16px;
        }
        .badge-paid {
          background: #eafaf1;
          color: #27ae60;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
        }
        .badge-pending {
          background: #fef9e7;
          color: #d35400;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
        }
        .receipt-actions-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .btn-print-preview {
          background: #2c3e50;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-whatsapp-share {
          background: #25D366;
          color: white;
          text-decoration: none;
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-align: center;
        }

        /* History Tab Styles */
        .billing-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .billing-stats-grid { grid-template-columns: 1fr; }
        }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-label {
          font-size: 12px;
          color: var(--text-muted);
          display: block;
        }
        .stat-value {
          font-size: 20px;
          font-weight: 800;
          margin: 2px 0 0;
          color: var(--text);
        }

        .history-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .history-search-input {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 260px;
        }
        .history-search-input svg {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        .history-search-input input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-size: 13.5px;
        }
        .history-filter-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .hist-filter {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
        }
        .hist-active {
          background: #c0392b;
          color: white;
          border-color: #c0392b;
        }

        /* History Table Card */
        .invoices-table-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(0,0,0,0.04);
        }
        .invoices-history-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .invoices-history-table th {
          background: var(--surface-2);
          padding: 12px 14px;
          text-align: left;
          font-weight: 700;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }
        .invoices-history-table td {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }
        .cell-subtext {
          display: block;
          color: var(--text-muted);
          font-size: 11px;
        }
        .customer-name-bold {
          display: block;
          font-weight: 700;
          color: var(--text);
        }
        .customer-phone-link {
          font-size: 11.5px;
          color: #c0392b;
          text-decoration: none;
          font-weight: 600;
        }
        .vehicle-no-badge {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
        }
        .items-count-tag {
          font-weight: 700;
          color: var(--text);
        }
        .items-summary-preview {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .table-grand-total {
          font-size: 14.5px;
          color: #c0392b;
          display: block;
        }
        .discount-tag {
          font-size: 10.5px;
          color: #27ae60;
          font-weight: 700;
        }
        .status-pill {
          display: inline-block;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
        }
        .pill-paid { background: #eafaf1; color: #27ae60; }
        .pill-pending { background: #fef9e7; color: #d35400; }
        .pay-mode-text {
          display: block;
          font-size: 10.5px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .table-actions-cell {
          display: flex;
          gap: 6px;
        }
        .btn-tbl-print {
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-tbl-wa {
          background: #25D366;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Printable Modal */
        .print-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }
        .print-modal-box {
          background: white;
          border-radius: 12px;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .print-modal-controls {
          background: #2c3e50;
          color: white;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .print-modal-controls h3 {
          margin: 0;
          font-size: 15px;
        }
        .print-controls-right {
          display: flex;
          gap: 10px;
        }
        .btn-do-print {
          background: #c0392b;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-close-modal {
          background: rgba(255,255,255,0.15);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 700;
        }

        /* Paper Sheet Layout */
        .invoice-paper-sheet {
          padding: 36px 40px;
          color: #1c1c1e;
          background: white;
          font-family: 'Inter', sans-serif;
          overflow-y: auto;
        }
        .paper-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .paper-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .paper-logo {
          height: 54px;
          object-fit: contain;
        }
        .paper-shop-name {
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 2px;
          color: #c0392b;
        }
        .paper-shop-tag {
          font-size: 12px;
          font-weight: 700;
          color: #555;
          margin: 0;
        }
        .paper-shop-info {
          font-size: 11px;
          color: #777;
          margin: 0;
        }
        .paper-header-right {
          text-align: right;
          font-size: 12.5px;
        }
        .invoice-badge-title {
          display: inline-block;
          background: #2c3e50;
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 800;
          font-size: 12px;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }
        .invoice-meta-pair {
          margin-bottom: 2px;
        }
        .paper-thick-line {
          height: 2px;
          background: #c0392b;
          margin: 16px 0;
        }
        .paper-billed-to-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
          font-size: 13px;
        }
        .paper-sec-label {
          font-size: 11px;
          font-weight: 800;
          color: #c0392b;
          display: block;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }
        .billed-customer-name {
          font-size: 15px;
          font-weight: 800;
          margin: 0 0 4px;
        }
        .paper-billed-to-grid p {
          margin: 2px 0;
          color: #444;
        }
        .paper-items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 13px;
        }
        .paper-items-table th {
          background: #f4f6f7;
          border: 1px solid #ddd;
          padding: 8px 10px;
          font-weight: 700;
          text-align: left;
        }
        .paper-items-table td {
          border: 1px solid #ddd;
          padding: 9px 10px;
        }
        .paper-type-sub {
          font-size: 11px;
          color: #777;
          margin-left: 6px;
        }
        .paper-totals-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          margin-bottom: 30px;
        }
        .paper-terms-list {
          padding-left: 18px;
          margin: 0;
          font-size: 11px;
          color: #666;
          line-height: 1.4;
        }
        .paper-amounts-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
        }
        .paper-amt-row {
          display: flex;
          justify-content: space-between;
          color: #444;
        }
        .paper-grand-total-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid #2c3e50;
          padding-top: 8px;
          margin-top: 4px;
          font-weight: 800;
          font-size: 15px;
        }
        .paper-grand-amt {
          color: #c0392b;
          font-size: 20px;
        }
        .paper-footer-signatures {
          display: flex;
          justify-content: space-between;
          padding-top: 30px;
          margin-top: 20px;
        }
        .sign-col {
          font-size: 11.5px;
          font-weight: 700;
          color: #555;
        }
        .sign-line {
          width: 180px;
          height: 1px;
          background: #999;
          margin-bottom: 6px;
        }

        /* 🖨️ Native Browser Print Rules */
        @media print {
          body * {
            visibility: hidden;
          }
          .no-print,
          .main-site-header,
          .bottom-nav,
          .mobile-sidebar {
            display: none !important;
          }
          .print-modal-overlay {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            background: white !important;
          }
          .print-modal-box {
            box-shadow: none;
            max-width: 100%;
            border-radius: 0;
          }
          #printable-invoice,
          #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
        }
      `})]})}function m4(){return a.jsxs(VN,{children:[a.jsx(dt,{path:"/login",element:a.jsx(e4,{})}),a.jsx(dt,{path:"/register",element:a.jsx(t4,{})}),a.jsx(dt,{path:"/forgot-password",element:a.jsx(n4,{})}),a.jsx(dt,{path:"/privacy-policy",element:a.jsx(k0,{})}),a.jsx(dt,{path:"/about",element:a.jsx(k0,{})}),a.jsxs(dt,{element:a.jsx(ZO,{children:a.jsx(JO,{})}),children:[a.jsx(dt,{path:"/",element:a.jsx(r4,{})}),a.jsx(dt,{path:"/search",element:a.jsx(i4,{})}),a.jsx(dt,{path:"/bookings",element:a.jsx(o4,{})}),a.jsx(dt,{path:"/billing",element:a.jsx(f4,{})}),a.jsx(dt,{path:"/store-location",element:a.jsx(a4,{})}),a.jsx(dt,{path:"/profile",element:a.jsx(l4,{})}),a.jsx(dt,{path:"/shop/add-product",element:a.jsx(S0,{})}),a.jsx(dt,{path:"/shop/edit-product/:id",element:a.jsx(S0,{})}),a.jsx(dt,{path:"*",element:a.jsx(c4,{})})]})]})}function g4({message:t,onRetry:e}){return a.jsxs("div",{className:"status-page",children:[a.jsx(u2,{size:48,color:"var(--danger)"}),a.jsx("h1",{className:"brand-font",style:{fontSize:26},children:"Kuch Gadbad Ho Gayi"}),a.jsx("p",{children:t||"Ek unexpected error aa gaya. Please dobara try karein."}),a.jsxs("button",{className:"status-btn",onClick:e||(()=>window.location.reload()),children:[a.jsx(h2,{size:15,style:{verticalAlign:"middle",marginRight:6}}),"Dobara Try Karein"]}),a.jsx("style",{children:`
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
      `})]})}class y4 extends df.Component{constructor(e){super(e),this.state={hasError:!1,message:""}}static getDerivedStateFromError(e){return{hasError:!0,message:e==null?void 0:e.message}}componentDidCatch(e,n){console.error("TyreSaathi crashed:",e,n)}render(){return this.state.hasError?a.jsx(g4,{message:this.state.message,onRetry:()=>this.setState({hasError:!1,message:""})}):this.props.children}}kh.createRoot(document.getElementById("root")).render(a.jsx(df.StrictMode,{children:a.jsx(y4,{children:a.jsx(v2,{children:a.jsx(qN,{children:a.jsx(KO,{children:a.jsx(m4,{})})})})})}));
