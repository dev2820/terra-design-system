function s(n){return Math.max(0,Math.min(1,n))}function S(n,t){const{left:e,top:r,width:u,height:o}=t.getBoundingClientRect(),a={x:n.x-e,y:n.y-r},i={x:s(a.x/u),y:s(a.y/o)};function h(g={}){const{dir:M="ltr",orientation:V="horizontal",inverted:c}=g,d=typeof c=="object"?c.x:c,p=typeof c=="object"?c.y:c;return V==="horizontal"?M==="rtl"||d?1-i.x:i.x:p?1-i.y:i.y}return{offset:a,percent:i,getPercentValue:h}}function m(n,t,e){return n===0?e:t[n-1]}function N(n,t,e){return n===t.length-1?e:t[n+1]}function b(n,t,e){return Math.round((n-t)/e)*e+t}function I(n,t,e){return Math.min(Math.max(n,t),e)}function A(n,t,e){return(n-t)/(e-t)}function P(n,t,e,r){const u=n*(e-t)+t,o=b(u,t,r);return I(o,t,e)}function f(n,t){let e=n,r=t.toString(),u=r.indexOf("."),o=u>=0?r.length-u:0;if(o>0){let a=Math.pow(10,o);e=Math.round(e*a)/a}return e}function y(n,t,e,r){t=Number(t),e=Number(e);let u=(n-(isNaN(t)?0:t))%r,o=f(Math.abs(u)*2>=r?n+Math.sign(u)*(r-Math.abs(u)):n-u,r);return isNaN(t)?!isNaN(e)&&o>e&&(o=Math.floor(f(e/r,r))*r):o<t?o=t:!isNaN(e)&&o>e&&(o=t+Math.floor(f((e-t)/r,r))*r),o=f(o,r),o}function x(n,t,e){return n[t]===e?n:[...n.slice(0,t),e,...n.slice(t+1)]}function l(n,t){const e=m(n,t.values,t.min),r=N(n,t.values,t.max);let u=t.values.slice();return function(a){let i=y(a,e,r,t.step);return u=x(u,n,a),u[n]=i,u}}function w(n,t){const e=t.values[n]+t.step;return l(n,t)(e)}function R(n,t){const e=t.values[n]-t.step;return l(n,t)(e)}function T(n,t){let e=n.findIndex(o=>t-o<0);if(e===0)return e;if(e===-1)return n.length-1;let r=n[e-1],u=n[e];return Math.abs(r-t)<Math.abs(u-t)?e-1:e}function j(n,t,e,r){return n.map((u,o)=>{const a=o===0?t:n[o-1]+r,i=o===n.length-1?e:n[o+1]-r;return{min:a,max:i,value:u}})}function z(n,t){const e={min:n[0],max:n[1]},r={min:t[0],max:t[1]};return function(o){if(e.min===e.max||r.min===r.max)return r.min;const a=(r.max-r.min)/(e.max-e.min);return r.min+a*(o-e.min)}}function C(n,t=0,e=10){const r=Math.pow(e,t);return Math.round(n*r)/r}function B(n,t){return(n%t+t)%t}export{P as a,A as b,j as c,I as d,R as e,w as f,S as g,T as h,z as i,B as m,y as s,C as t};
