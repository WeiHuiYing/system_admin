(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0af08f"],{"0d38":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("keep-alive",{attrs:{include:t.cacheList,exclude:t.notCacheName}},[n("router-view",{ref:"child"})],1)},c=[],i=n("75fc"),r=(n("7f7f"),{name:"ParentView",computed:{tagNavList:function(){return this.$store.state.app.tagNavList},notCacheName:function(){return[this.$route.meta&&this.$route.meta.notCache?this.$route.name:""]},cacheList:function(){return["ParentView"].concat(Object(i["a"])(this.tagNavList.length?this.tagNavList.filter((function(t){return!(t.meta&&t.meta.notCache)})).map((function(t){return t.name})):[]))}}}),u=r,o=n("2877"),s=Object(o["a"])(u,a,c,!1,null,null,null);e["default"]=s.exports}}]);