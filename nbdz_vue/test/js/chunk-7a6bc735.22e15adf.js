(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a6bc735","chunk-2d22c863","chunk-2d0e5da3","chunk-2d21ee4a"],{"4e90":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Form",{ref:"formInline",attrs:{"label-position":"right",model:e.Row,rules:e.ruleUser,"label-width":100}},[r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"用户名",prop:"userName"}},[r("Input",{attrs:{clearable:""},model:{value:e.Row.userName,callback:function(t){e.$set(e.Row,"userName",t)},expression:"Row.userName"}})],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"密码",prop:"salt"}},[r("Input",{attrs:{type:"password",clearable:""},model:{value:e.Row.salt,callback:function(t){e.$set(e.Row,"salt",t)},expression:"Row.salt"}})],1)],1)],1),r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"电话"}},[r("Input",{attrs:{clearable:""},model:{value:e.Row.phone,callback:function(t){e.$set(e.Row,"phone",t)},expression:"Row.phone"}})],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"部门"}},[r("Input",{attrs:{search:"","enter-button":"",readonly:""},on:{"on-search":e.deptSelect},model:{value:e.Row.deptName,callback:function(t){e.$set(e.Row,"deptName",t)},expression:"Row.deptName"}})],1)],1)],1),r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"姓名"}},[r("Input",{attrs:{clearable:""},model:{value:e.Row.realName,callback:function(t){e.$set(e.Row,"realName",t)},expression:"Row.realName"}})],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"头像url"}},[r("Input",{attrs:{clearable:""},model:{value:e.Row.headUrl,callback:function(t){e.$set(e.Row,"headUrl",t)},expression:"Row.headUrl"}})],1)],1)],1),r("Row",[r("Col",{attrs:{span:"24"}},[r("FormItem",{attrs:{label:"角色"}},[r("Select",{attrs:{filterable:"",multiple:"",clearable:""},on:{"on-change":e.rolesSelect},model:{value:e.Row.UserRoles,callback:function(t){e.$set(e.Row,"UserRoles",t)},expression:"Row.UserRoles"}},e._l(e.Roles,(function(t){return r("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.roleName))])})),1)],1)],1)],1),r("Row",[r("Col",{attrs:{span:"24"}},[r("FormItem",{attrs:{label:"邮箱地址"}},[r("Input",{attrs:{clearable:""},model:{value:e.Row.email,callback:function(t){e.$set(e.Row,"email",t)},expression:"Row.email"}})],1)],1)],1),r("Row",[r("Col",{attrs:{span:"24"}},[r("FormItem",{attrs:{label:"备注"}},[r("Input",{attrs:{clearable:""},model:{value:e.Row.remark,callback:function(t){e.$set(e.Row,"remark",t)},expression:"Row.remark"}})],1)],1)],1),r("Row",[r("Col",{attrs:{span:"24"}},[r("div",{staticStyle:{"text-align":"center"}},[r("Button",{on:{click:function(t){e.parent.modelEdit=!1}}},[e._v("取消")]),r("Button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:function(t){return e.save("formInline")}}},[e._v("保存")])],1)])],1)],1),r("Modal",{attrs:{title:"选择部门","mask-closable":!1,width:"300",scrollable:"","footer-hide":""},model:{value:e.modelDept,callback:function(t){e.modelDept=t},expression:"modelDept"}},[r("Tree",{attrs:{data:e.DeptTree},on:{"on-select-change":e.deptTreeChange}})],1)],1)},a=[],o=r("bd86"),s=(r("7f7f"),r("d800")),l=r("95f7"),i=r("f432"),u={props:{editRow:Object,parent:Object},computed:{},data:function(){return{Row:{},Roles:[],Depts:[],DeptTree:[],DeptTreeItems:[],modelDept:!1,ruleUser:{userName:[{required:!0,message:"用户名必填",trigger:"blur"}],userPwd:[{required:!0,message:"密码必填",trigger:"blur"},{type:"string",min:6,message:"密码长度≥6",trigger:"blur"}]}}},watch:{editRow:function(e,t){this.handleReset(),this.Row=Object.assign({},e),this.Row.resUserRoles&&this.Row.resUserRoles.length>0&&(this.Row.UserRoles=this.Row.resUserRoles.map((function(e){return e.id})))}},methods:Object(o["a"])({getRoles:function(){var e=this,t={};Object(l["getList"])(t).then((function(t){var r=t.data,n=r.data;e.Roles=n})).catch((function(e){}))},deptSelect:function(){(!this.Depts||this.Depts.length<=0)&&this.getDepts(),this.modelDept=!0},getDepts:function(){var e=this,t={};Object(i["getList"])(t).then((function(t){var r=t.data,n=r.data;e.Depts=n,e.loadDeptTree()})).catch((function(e){}))},loadDeptTree:function(){var e=this.Depts.filter((function(e){return!e.parentCode||""==e.parentCode}));this.loadDeptTreeChild(e)},loadDeptTreeChild:function(e){for(var t=this,r=function(r){var n=e[r];t.loadDeptTreeItem(n);var a=t.Depts.filter((function(e){return e.parentCode==n.deptCode}));a&&a.length>0&&t.loadDeptTreeChild(a)},n=0;n<e.length;n++)r(n)},loadDeptTreeItem:function(e){var t={title:e.deptName,expand:!0,value:e.deptCode,id:e.id};this.DeptTreeItems.push(t),e.parentCode?this.DeptTreeItems.every((function(r){return r.value!=e.parentCode||(r.children||(r.children=[]),r.children.push(t),!1)})):this.DeptTree.push(t)},deptTreeChange:function(e){var t=e[0];this.Row.deptName=t.title,this.Row.deptId=t.id,this.modelDept=!1},rolesSelect:function(){this.Row.resUserRoles=this.Row.UserRoles.map((function(e){var t={roleId:e};return t}))},save:function(){this.parent.isAdd?this.saveAdd():this.saveEdit()},saveValidate:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"formInline";return this.$refs[t].validate((function(t){return!!t||(e.$Message.warning("请检查表单数据！"),!1)}))},handleReset:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"formInline";this.$refs[e].resetFields()},saveEdit:function(){var e=this,t=this;t.saveValidate().then((function(r){r&&(delete t.Row.UserRoles,Object(s["Edit"])(t.Row).then((function(t){200===t.data.code?(e.$Message.info("编辑成功"),e.parent.modelEdit=!1,e.parent.loadData()):e.$Message.error({content:t.data.msg,duration:10,closable:!0})})).catch((function(e){})))}))},saveAdd:function(){var e=this,t=this;t.saveValidate().then((function(r){r&&(delete t.Row.UserRoles,Object(s["Add"])(t.Row).then((function(t){200===t.data.code?(e.$Message.info("编辑成功"),e.parent.modelEdit=!1,e.parent.loadData()):e.$Message.error({content:t.data.msg,duration:10,closable:!0})})).catch((function(e){})))}))}},"handleReset",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"formInline";this.$refs[e].resetFields()})),mounted:function(){this.getRoles()}},d=u,c=r("2877"),p=Object(c["a"])(d,n,a,!1,null,"55ba3e1a",null);t["default"]=p.exports},"95f7":function(e,t,r){"use strict";r.r(t),r.d(t,"getList",(function(){return a})),r.d(t,"getPage",(function(){return o})),r.d(t,"Add",(function(){return s})),r.d(t,"Edit",(function(){return l})),r.d(t,"Delete",(function(){return i})),r.d(t,"getFunctions",(function(){return u})),r.d(t,"saveFunctions",(function(){return d}));var n=r("66df"),a=function(e){return n["default"].request({url:"api/ResRole/GetList",data:e,method:"post"})},o=function(e){return n["default"].request({url:"api/ResRole/GetPage",data:e,method:"post"})},s=function(e){return n["default"].request({url:"api/ResRole/Add",data:e,method:"post"})},l=function(e){return n["default"].request({url:"api/ResRole/Edit",data:e,method:"post"})},i=function(e){return n["default"].request({url:"api/ResRole/Delete/"+e,method:"post"})},u=function(e){return n["default"].request({url:"api/ResRole/GetPermissions/"+e,method:"post"})},d=function(e,t){return n["default"].request({url:"api/ResRole/SaveFunctions/"+e,data:t,method:"post"})}},d800:function(e,t,r){"use strict";r.r(t),r.d(t,"getList",(function(){return a})),r.d(t,"Get",(function(){return o})),r.d(t,"Add",(function(){return s})),r.d(t,"Edit",(function(){return l})),r.d(t,"Delete",(function(){return i})),r.d(t,"getPermissions",(function(){return u}));var n=r("66df"),a=(r("4360"),function(e){return n["default"].request({url:"api/User/GetPage",data:e,method:"post"})}),o=function(e){return n["default"].request({url:"/api/User/Get",data:e,method:"post"})},s=function(e){return n["default"].request({url:"api/User/Add",data:e,method:"post"})},l=function(e){return n["default"].request({url:"api/User/Edit",data:e,method:"post"})},i=function(e){return n["default"].request({url:"api/User/Delete/"+e,method:"post"})},u=function(e){return n["default"].request({url:"api/User/GetUserPermissions?userId="+e,method:"post"})}},f432:function(e,t,r){"use strict";r.r(t),r.d(t,"getList",(function(){return a})),r.d(t,"getChildList",(function(){return o})),r.d(t,"Add",(function(){return s})),r.d(t,"Edit",(function(){return l})),r.d(t,"Delete",(function(){return i})),r.d(t,"Get",(function(){return u}));var n=r("66df"),a=function(e){return n["default"].request({url:"api/ResDept/GetList",data:e,method:"post"})},o=function(e){return n["default"].request({url:"api/ResDept/GetChildList/"+e,method:"post"})},s=function(e){var t=e;return n["default"].request({url:"api/ResDept/Add",data:t,method:"post"})},l=function(e){var t=e;return n["default"].request({url:"api/ResDept/Edit",data:t,method:"post"})},i=function(e){return n["default"].request({url:"api/ResDept/Delete/"+e,method:"post"})},u=function(e){return n["default"].request({url:"api/ResDept/Get",data:e,method:"post"})}}}]);