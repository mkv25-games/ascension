(window.webpackJsonp=window.webpackJsonp||[]).push([[3,4,5],{306:function(t,e,n){},307:function(t,e,n){"use strict";n(306)},308:function(t,e,n){},309:function(t,e,n){"use strict";n.r(e);n(165);n(164);var o={name:"asc-button",props:{label:{type:String,required:!0},primary:{type:Boolean,default:!1},size:{type:String,default:"medium",validator:function(t){return-1!==["small","medium","large"].indexOf(t)}},backgroundColor:{type:String}},computed:{classes:function(){return t={"storybook-button":!0,"storybook-button--primary":this.primary,"storybook-button--secondary":!this.primary},e="storybook-button--".concat(this.size),n=!0,e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t;var t,e,n},style:function(){return{backgroundColor:this.backgroundColor}}},methods:{onClick:function(){this.$emit("onClick")}}},i=(n(307),n(45)),s=Object(i.a)(o,(function(){var t=this.$createElement;return(this._self._c||t)("button",{class:this.classes,style:this.style,attrs:{type:"button"},on:{click:this.onClick}},[this._v(this._s(this.label))])}),[],!1,null,"2909715a",null);e.default=s.exports},312:function(t,e,n){"use strict";n(308)},332:function(t,e,n){},338:function(t,e,n){"use strict";n.r(e);var o={name:"Header",components:{MyButton:n(309).default},props:{user:{type:Object}},methods:{onLogin:function(){this.$emit("onLogin")},onLogout:function(){this.$emit("onLogout")},onCreateAccount:function(){this.$emit("onCreateAccount")}}},i=(n(312),n(45)),s=Object(i.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("div",{staticClass:"wrapper"},[n("div",[n("svg",{attrs:{width:"32",height:"32",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"}},[n("g",{attrs:{fill:"none","fill-rule":"evenodd"}},[n("path",{attrs:{d:"M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",fill:"#FFF"}}),t._v(" "),n("path",{attrs:{d:"M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",fill:"#555AB9"}}),t._v(" "),n("path",{attrs:{d:"M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",fill:"#91BAF8"}})])]),t._v(" "),n("h1",[t._v("Ascension")])]),t._v(" "),n("div",[t.user?n("my-button",{attrs:{size:"small",label:"Log out"},on:{onClick:t.onLogout}}):t._e(),t._v(" "),t.user?t._e():n("my-button",{attrs:{size:"small",label:"Log in"},on:{onClick:t.onLogin}}),t._v(" "),t.user?t._e():n("my-button",{attrs:{primary:"",size:"small",label:"Sign up"},on:{onClick:t.onCreateAccount}})],1)])])}),[],!1,null,"c67f1d88",null);e.default=s.exports},363:function(t,e,n){"use strict";n(332)},370:function(t,e,n){"use strict";n.r(e);var o={name:"Page",components:{MyHeader:n(338).default},props:{user:{type:Object}},methods:{onLogin:function(){this.$emit("onLogin")},onLogout:function(){this.$emit("onLogout")},onCreateAccount:function(){this.$emit("onCreateAccount")}}},i=(n(363),n(45)),s=Object(i.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("article",[e("my-header",{attrs:{user:this.user},on:{onLogin:this.onLogin,onLogout:this.onLogout,onCreateAccount:this.onCreateAccount}}),this._v(" "),this._m(0)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("section",[e("h2",[this._v("Example Page")]),this._v(" "),e("p",[this._v("\n      Here is a basic page - a single user experience driven by data. This page is one step down from the site / application logic which will be providing the data you rely on.\n    ")])])}],!1,null,"0761f9a2",null);e.default=s.exports}}]);