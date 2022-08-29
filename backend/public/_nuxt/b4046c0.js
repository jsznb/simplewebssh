(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{492:function(e,t,o){"use strict";o.r(t);o(42);var n=o(88),r=o.n(n),l={name:"WebSSH",data:function(){return{rdrawer:!1,hostTableData:[],hostCount:1e3,pathLike:"",pageSize:20,pageCur:1,selRow:{}}},methods:{onSearch:function(){var e=this;r.a.get("/api/host/search",{params:{path:"%".concat(this.pathLike,"%"),offset:(this.pageCur-1)*this.pageSize,limit:this.pageSize}}).then((function(t){if(200!=t.status||0!=t.data.code)throw"Error: Query Data";e.hostTableData=t.data.data,e.hostCount=t.data.count})).catch(console.log)},onSave:function(e){var t=this;switch(e){case"del":r.a.get("/api/host/del",{params:{id:this.selRow.id}}).then((function(e){if(200!=e.status||0!=e.data.code)throw"Error: Query Data";t.onSearch()})).catch(console.log);break;case"new":r.a.get("/api/host/save",{params:{path:this.selRow.path,name:this.selRow.name,conf:JSON.stringify(JSON.parse(this.selRow.conf))}}).then((function(e){if(200!=e.status||0!=e.data.code)throw"Error: Query Data";t.onSearch()})).catch(console.log);break;case"set":r.a.get("/api/host/save",{params:{id:this.selRow.id,path:this.selRow.path,name:this.selRow.name,conf:JSON.stringify(JSON.parse(this.selRow.conf))}}).then((function(e){if(200!=e.status||0!=e.data.code)throw"Error: Query Data";t.onSearch()})).catch(console.log)}},formatDate:function(e,col,t,o){return new Date(t).toUTCString()},newWindow:function(e){window.open("/term/?path=".concat(e.path),"_blank")},openRightDrawer:function(e){this.selRow=e,this.rdrawer=!0},handleSizeChange:function(e){this.pageSize=e},handleCurrentChange:function(e){this.pageCur=e}},mounted:function(){this.$route.query&&this.$route.query.path&&(this.pathLike=this.$route.query.path),this.onSearch()}},c=o(54),component=Object(c.a)(l,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("el-menu",{staticClass:"el-menu-demo",attrs:{mode:"horizontal"}},[t("el-menu-item",{attrs:{index:"1"}},[t("a",{attrs:{href:"/",target:"_blank"}},[e._v("Hosts")])]),e._v(" "),t("el-menu-item",{attrs:{index:"2"}},[t("a",{attrs:{href:"/cmd",target:"_blank"}},[e._v("Commands")])]),e._v(" "),t("el-menu-item",{attrs:{index:"3"},on:{click:function(t){return e.openRightDrawer({})}}},[e._v("New")])],1),e._v(" "),t("el-drawer",{attrs:{title:"编辑主机",visible:e.rdrawer,direction:e.rtl},on:{"update:visible":function(t){e.rdrawer=t}}},[t("el-form",{ref:"form",attrs:{model:e.selRow,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"Id"}},[t("el-input",{model:{value:e.selRow.id,callback:function(t){e.$set(e.selRow,"id",t)},expression:"selRow.id"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"Name"}},[t("el-input",{model:{value:e.selRow.name,callback:function(t){e.$set(e.selRow,"name",t)},expression:"selRow.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"Path"}},[t("el-input",{model:{value:e.selRow.path,callback:function(t){e.$set(e.selRow,"path",t)},expression:"selRow.path"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"Conf"}},[t("el-input",{attrs:{type:"textarea",autosize:""},model:{value:e.selRow.conf,callback:function(t){e.$set(e.selRow,"conf",t)},expression:"selRow.conf"}})],1)],1),e._v(" "),t("el-button-group",{staticStyle:{float:"right"}},[t("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(t){return e.onSave("new")}}},[e._v("New")]),e._v(" "),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.onSave("set")}}},[e._v("Set")]),e._v(" "),t("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){return e.onSave("del")}}},[e._v("Del")])],1)],1),e._v(" "),t("el-row",[t("el-col",[t("el-input",{attrs:{placeholder:"Search Path","prefix-icon":"el-icon-search"},on:{change:e.onSearch},model:{value:e.pathLike,callback:function(t){e.pathLike=t},expression:"pathLike"}})],1)],1),e._v(" "),t("el-row",[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.hostTableData,border:""}},[t("el-table-column",{attrs:{fixed:"",prop:"path",label:"Path"}}),e._v(" "),t("el-table-column",{attrs:{prop:"name",label:"Name"}}),e._v(" "),t("el-table-column",{attrs:{prop:"conf",label:"Conf","show-overflow-tooltip":""}}),e._v(" "),t("el-table-column",{attrs:{prop:"create_at",label:"CreateAt",formatter:e.formatDate,"show-overflow-tooltip":""}}),e._v(" "),t("el-table-column",{attrs:{fixed:"right",label:"Opt"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.openRightDrawer(o.row)}}},[e._v("Edit/New/Del")]),e._v(" "),t("el-button",{attrs:{type:"success",size:"mini"},nativeOn:{click:function(t){return e.newWindow(o.row)}}},[e._v("Term")])]}}])})],1),e._v(" "),t("div",{staticClass:"block"},[t("el-pagination",{attrs:{"current-page":e.pageCur,"page-sizes":[20,50,100,200],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.hostCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)}),[],!1,null,"177c4397",null);t.default=component.exports}}]);