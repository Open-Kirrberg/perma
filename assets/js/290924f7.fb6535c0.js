(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1386],{4981:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>h,frontMatter:()=>c,metadata:()=>d,toc:()=>p});var r=n(4848),s=n(8453),i=n(6540),a=n(6309);n(5862);const o=function(){const[e,t]=(0,i.useState)(new Date),s=n(9128),o=s.keys().map((e=>{const t=s(e);return{...t,date:new Date(t.date)}})).reduce(((e,t)=>{const n=t.date.toDateString();return e[n]||(e[n]=[]),e[n].push(t),e}),{});return(0,r.jsxs)("div",{className:"event-calendar-container",children:[(0,r.jsx)(a.Ay,{onChange:t,value:e,tileContent:e=>{let{date:t,view:n}=e;if("month"===n){const e=t.toDateString();if(o[e])return(0,r.jsx)("div",{className:"event-indicator",title:"Event day",children:"\u2022"})}return null}}),(0,r.jsxs)("div",{className:"event-details",children:[(0,r.jsxs)("h3",{children:["Events on ",e.toDateString()]}),o[e.toDateString()]?(0,r.jsx)("ul",{children:o[e.toDateString()].map(((e,t)=>(0,r.jsxs)("li",{children:[(0,r.jsx)("h4",{children:e.title}),(0,r.jsx)("p",{children:e.description})]},t)))}):(0,r.jsx)("p",{children:"No events."})]})]})},c={},l="Community Calendar",d={type:"mdx",permalink:"/perma/events",source:"@site/src/pages/events.md",title:"Community Calendar",description:"Keep track of upcoming permaculture events.",frontMatter:{},unlisted:!1},u={},p=[];function m(e){const t={h1:"h1",p:"p",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"community-calendar",children:"Community Calendar"}),"\n",(0,r.jsx)(t.p,{children:"Keep track of upcoming permaculture events."}),"\n",(0,r.jsx)(o,{})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},9128:(e,t,n)=>{var r={"./event1.json":4318};function s(e){var t=i(e);return n(t)}function i(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}s.keys=function(){return Object.keys(r)},s.resolve=i,e.exports=s,s.id=9128},4318:e=>{"use strict";e.exports=JSON.parse('{"title":"Permaculture Workshop","date":"2025-03-01","description":"A hands-on workshop exploring permaculture principles."}')}}]);