(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-869ab590","chunk-30d7aaf4","chunk-2d213cc5","chunk-749e3724"],{"2edc":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Form",{ref:"formInline",attrs:{"label-position":"right",model:t.Row,rules:t.rule,"label-width":100}},[n("Row",[n("Col",{attrs:{span:"24"}},[n("FormItem",{attrs:{label:"中文名",prop:"cnName"}},[n("Input",{attrs:{clearable:""},model:{value:t.Row.cnName,callback:function(e){t.$set(t.Row,"cnName",e)},expression:"Row.cnName"}})],1)],1)],1),n("Row",[n("Col",{attrs:{span:"24"}},[n("FormItem",{attrs:{label:"英文名",prop:"enName"}},[n("Input",{attrs:{clearable:""},model:{value:t.Row.enName,callback:function(e){t.$set(t.Row,"enName",e)},expression:"Row.enName"}})],1)],1)],1),n("Row",[n("Col",{attrs:{span:"24"}},[n("FormItem",{attrs:{label:"编码",prop:"permissionCode"}},[n("Input",{attrs:{clearable:""},model:{value:t.Row.permissionCode,callback:function(e){t.$set(t.Row,"permissionCode",e)},expression:"Row.permissionCode"}})],1)],1)],1),n("Row",[n("Col",{attrs:{span:"24"}},[n("div",{staticStyle:{"text-align":"center"}},[n("Button",{on:{click:function(e){t.parent.modelEdit=!1}}},[t._v("取消")]),n("Button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:function(e){return t.save("formInline")}}},[t._v("保存")])],1)])],1)],1)],1)},o=[],i=(n("7f7f"),n("ade1")),s={props:{editRow:Object,parent:Object},computed:{},data:function(){return{Row:{},rule:{cnName:[{required:!0,message:"中文名必填",trigger:"blur"}],enName:[{required:!0,message:"英文名必填",trigger:"blur"}],permissionCode:[{required:!0,message:"编码必填",trigger:"blur"}]}}},methods:{save:function(){this.parent.isAdd?this.saveAdd():this.saveEdit()},saveAdd:function(){var t=this;this.saveValidate().then((function(e){e&&Object(i["Add"])(t.Row).then((function(e){var n=e.data,a=(n.data,n.code),o=n.msg;200==a?(t.$Message.info("添加成功"),t.parent.modelEdit=!1,t.parent.loadData()):t.$Message.error({content:o,duration:10,closable:!0})})).catch((function(t){}))}))},saveEdit:function(){var t=this;this.saveValidate().then((function(e){e&&Object(i["Edit"])(t.Row).then((function(e){var n=e.data,a=(n.data,n.code),o=n.msg;200==a?(t.$Message.info("编辑成功"),t.parent.modelEdit=!1,t.parent.loadData()):t.$Message.error({content:o,duration:10,closable:!0})})).catch((function(t){}))}))},saveValidate:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"formInline";return this.$refs[e].validate((function(e){return!!e||(t.$Message.warning("请检查表单数据！"),!1)}))},handleReset:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"formInline";this.$refs[t].resetFields()}},watch:{editRow:function(t,e){this.handleReset(),this.Row=Object.assign({},t)}},mounted:function(){}},r=s,d=n("2877"),l=Object(d["a"])(r,a,o,!1,null,null,null);e["default"]=l.exports},5252:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Card",[n("div",{staticClass:"button-top-warp"},[n("Button",{staticClass:"search-btn",attrs:{type:"success",size:"small"},on:{click:t.handleAdd}},[n("Icon",{attrs:{type:"md-add"}}),t._v("  新增\n      ")],1)],1),n("Table",{ref:"tables",attrs:{data:t.tableData,columns:t.tableColumns,stripe:""}})],1),n("Modal",{attrs:{title:"编辑","mask-closable":!1,width:"800",scrollable:"","footer-hide":""},model:{value:t.modelEdit,callback:function(e){t.modelEdit=e},expression:"modelEdit"}},[n("Edit",{ref:"edit",attrs:{parent:this,"edit-row":t.editPermission}})],1)],1)},o=[],i=n("ade1"),s=(n("707c"),n("2edc")),r={props:{editRow:Object,parent:Object},components:{Edit:s["default"]},data:function(){var t=this;return{Row:{},tableData:[],tableColumns:[{title:"英文名",key:"enName"},{title:"中文名",key:"cnName"},{title:"编码",key:"permissionCode"},{title:"创建时间",key:"createDate",sortable:!0},{title:"操作",key:"action",width:300,align:"center",render:function(e,n){return e("div",[e("Button",{props:{type:"primary",size:"small",icon:"md-create"},style:{marginRight:"5px"},on:{click:function(){t.handleEdit(n)}}},"编辑"),e("Button",{props:{type:"error",size:"small",icon:"md-trash"},on:{click:function(){t.handleDelete(n)}}},"删除")])}}],modelEdit:!1,isAdd:!1,editPermission:{}}},watch:{editRow:function(t,e){this.Row=Object.assign({},t),this.Row.id&&this.loadData()}},methods:{loadData:function(){var t=this,e=this;Object(i["getList"])(e.Row.id).then((function(n){var a=n.data;200==a.code?e.tableData=a.data:t.$Message.error({content:a.msg,duration:10,closable:!0})})).catch((function(t){console.log(t)}))},handleEdit:function(t){var e=this;e.isAdd=!1,e.editPermission=t.row,e.modelEdit=!0},handleDelete:function(t){var e=this;this.$Modal.confirm({title:"提示",content:"<p>确定要删除?</p>",onOk:function(){Object(i["Delete"])(t.row.id).then((function(t){var n=t.data;200==n.code?e.$Message.info("删除成功"):e.$Message.error({content:n.msg,duration:10,closable:!0})})).catch((function(t){console.log(t)}))},onCancel:function(t){}})},handleAdd:function(){var t=this;t.isAdd=!0,t.editPermission={resResourceId:t.Row.id},t.modelEdit=!0}},mounted:function(){}},d=r,l=n("2877"),c=Object(l["a"])(d,a,o,!1,null,null,null);e["default"]=c.exports},"707c":function(t,e,n){},ade1:function(t,e,n){"use strict";n.r(e),n.d(e,"getList",(function(){return o})),n.d(e,"Add",(function(){return i})),n.d(e,"Edit",(function(){return s})),n.d(e,"Delete",(function(){return r}));var a=n("66df"),o=function(t){return a["default"].request({url:"api/Permission/GetList/"+t,method:"get"})},i=function(t){return a["default"].request({url:"api/Permission/Add",data:t,method:"post"})},s=function(t){return a["default"].request({url:"api/Permission/Edit",data:t,method:"post"})},r=function(t){return a["default"].request({url:"api/Permission/Delete/"+t,method:"post"})}}}]);