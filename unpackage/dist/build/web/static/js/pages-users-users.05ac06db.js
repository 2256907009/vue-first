(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-users-users"],{"042b":function(e,t,s){"use strict";var a=s("bd9a"),r=s.n(a);r.a},"2e5c":function(e,t,s){"use strict";s("6a54");var a=s("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(s("2634")),n=a(s("2fdc"));s("5c47"),s("0506"),s("7a76"),s("c9b5"),s("c223"),s("d4b5");var i=s("fe49"),o={name:"users",data:function(){return{users:[],status:"",total:0,queryInfo:{query:"",pagenum:1,pagesize:1},dialogVisible:!1,editdialogVisible:!1,assignmentVisible:!1,addUserForm:{username:"",password:"",email:"",mobile:""},editUserForm:{id:"",email:"",mobile:""},selectedRoleId:"",assignmentRole:[],addFromRules:{username:[{required:!0,message:"请输入用户名称",trigger:"blur"},{min:3,max:10,message:"用户名在3~10个字符之间",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"密码在6-15个字符之间",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{validator:function(e,t,s){if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(t))return s();s(new Error("邮箱格式不对"))},trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号",trigger:"blur"},{validator:function(e,t,s){if(/^1[3456789]\d{9}$/.test(t))return s();s(new Error("手机号格式不对"))},trigger:"blur"}]},getRoleList:[]}},methods:{saveRole:function(e){var t=this;return(0,n.default)((0,r.default)().mark((function s(){var a;return(0,r.default)().wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(console.log(e),t.selectedRoleId){s.next=3;break}return s.abrupt("return",t.$message.error("请选择要分配的角色"));case 3:return s.next=5,(0,i.put)("users/".concat(e.id,"/role"),{rid:t.selectedRoleId});case 5:a=s.sent,console.log(a),t.getUserList(),assignmentVisible=!1;case 9:case"end":return s.stop()}}),s)})))()},getUserList:function(){var e=this;return(0,n.default)((0,r.default)().mark((function t(){var s;return(0,r.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,i.get)("/users",e.queryInfo);case 2:s=t.sent,200!==s.meta.status&&e.$message.error(s.meta.msg),e.users=s.data.users,e.total=s.data.total;case 6:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.queryInfo.pagesize=e,this.getUserList()},handleCurrentChange:function(e){this.queryInfo.pagenum=e,this.getUserList()},userStateChanged:function(e){var t=this;return(0,n.default)((0,r.default)().mark((function s(){var a;return(0,r.default)().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,(0,i.put)("/users/".concat(e.id,"/state/").concat(e.mg_state));case 2:if(a=s.sent,200===a.meta.status){s.next=7;break}return console.log(a.meta.msg),e.mg_state=!e.mg_state,s.abrupt("return",t.$messgae.error("更新用户状态失败"));case 7:t.$message.success("更新用户成功");case 8:case"end":return s.stop()}}),s)})))()},addDialogClose:function(){this.$refs.addUserFromRefs.resetFields()},addUser:function(){var e=this;this.$refs.addUserFromRefs.validate(function(){var t=(0,n.default)((0,r.default)().mark((function t(s){var a;return(0,r.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!s){t.next=8;break}return t.next=3,(0,i.post)("/users",e.addUserForm);case 3:a=t.sent,e.$message.success("添加用户成功"),console.log(a),e.getUserList(),e.dialogVisible=!1;case 8:if(201===res.meta.status){t.next=10;break}return t.abrupt("return",e.$message.error("添加用户失败"));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},showEditDialog:function(e){this.editdialogVisible=!0,this.editUserForm=JSON.parse(JSON.stringify(e.row)),console.log(this.editUserForm)},editUser:function(){var e=this;return(0,n.default)((0,r.default)().mark((function t(){var s,a;return(0,r.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=e.editUserForm.id,t.next=3,(0,i.put)("/users/".concat(s),e.editUserForm);case 3:if(a=t.sent,e.editdialogVisible=!1,200===a.meta.status){t.next=7;break}return t.abrupt("return",e.$message.error("更新用户失败"));case 7:e.$message.success("更新用户成功"),e.getUserList();case 9:case"end":return t.stop()}}),t)})))()},deleteUser:function(e){var t=this;return(0,n.default)((0,r.default)().mark((function s(){var a;return(0,r.default)().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,(0,i.del)("/users/".concat(e),e);case 2:if(a=s.sent,200===a.meta.status){s.next=5;break}return s.abrupt("return",t.$message.error("删除用户失败"));case 5:t.$message.success("用户删除成功"),t.getUserList();case 7:case"end":return s.stop()}}),s)})))()},showAssignment:function(e){var t=this;return(0,n.default)((0,r.default)().mark((function s(){var a;return(0,r.default)().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return console.log(e),t.assignmentVisible=!0,t.assignmentRole=JSON.parse(JSON.stringify(e)),console.log(t.assignmentRole),s.next=6,(0,i.get)("/roles");case 6:a=s.sent,t.getRoleList=a.data;case 8:case"end":return s.stop()}}),s)})))()}},created:function(){this.getUserList()}};t.default=o},"8dc8":function(e,t,s){var a=s("c86c");t=a(!1),t.push([e.i,".users[data-v-7a5271e9]{width:97.5%;\t\n\t/* height: 80vh; */background-color:#fff;margin-top:10px;border-radius:5px;box-shadow:-2px 5px 10px #d0d2d6;padding:10px}.users-top[data-v-7a5271e9]{display:inline;margin:20px}.inline-input[data-v-7a5271e9]{width:30%;margin:20px}.block[data-v-7a5271e9]{margin:20px;bottom:0}.input-item[data-v-7a5271e9]{width:70%}.addUsers[data-v-7a5271e9]{padding-left:20%}.editUsers[data-v-7a5271e9]{padding-left:20%}.button-item[data-v-7a5271e9]{margin-left:10px}",""]),e.exports=t},"92d7":function(e,t,s){"use strict";s.r(t);var a=s("b522"),r=s("c75e");for(var n in r)["default"].indexOf(n)<0&&function(e){s.d(t,e,(function(){return r[e]}))}(n);s("042b");var i=s("828b"),o=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"7a5271e9",null,!1,a["a"],void 0);t["default"]=o.exports},b522:function(e,t,s){"use strict";s.d(t,"b",(function(){return a})),s.d(t,"c",(function(){return r})),s.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-uni-view",{staticClass:"users"},[s("v-uni-view",{staticClass:"users-top"},[s("el-input",{staticClass:"inline-input",attrs:{placeholder:"请输入内容",clearable:!0},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[s("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getUserList.apply(void 0,arguments)}},slot:"append"})],1),s("el-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.dialogVisible=!0}}},[e._v("添加用户")]),s("el-dialog",{attrs:{title:"添加用户",visible:e.dialogVisible},on:{"update:visible":function(t){arguments[0]=t=e.$handleEvent(t),e.dialogVisible=t},close:function(t){arguments[0]=t=e.$handleEvent(t),e.addDialogClose.apply(void 0,arguments)}}},[s("v-uni-view",{staticClass:"addUsers"},[s("el-form",{ref:"addUserFromRefs",attrs:{"label-position":"right","label-width":"80px",model:e.addUserForm,rules:e.addFromRules}},[s("el-form-item",{attrs:{label:"用户名",prop:"username"}},[s("el-input",{staticClass:"input-item",model:{value:e.addUserForm.username,callback:function(t){e.$set(e.addUserForm,"username",t)},expression:"addUserForm.username"}})],1),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{staticClass:"input-item",model:{value:e.addUserForm.password,callback:function(t){e.$set(e.addUserForm,"password",t)},expression:"addUserForm.password"}})],1),s("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[s("el-input",{staticClass:"input-item",model:{value:e.addUserForm.email,callback:function(t){e.$set(e.addUserForm,"email",t)},expression:"addUserForm.email"}})],1),s("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[s("el-input",{staticClass:"input-item",model:{value:e.addUserForm.mobile,callback:function(t){e.$set(e.addUserForm,"mobile",t)},expression:"addUserForm.mobile"}})],1)],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.dialogVisible=!1}}},[e._v("取消")]),s("el-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.addUser.apply(void 0,arguments)}}},[e._v("确定")])],1)],1)],1),s("v-uni-view",{staticClass:"users-content"},[s("el-table",{attrs:{data:e.users,stripe:!0,border:!0}},[s("el-table-column",{attrs:{type:"index",label:"#"}}),s("el-table-column",{attrs:{label:"姓名",prop:"username"}}),s("el-table-column",{attrs:{label:"邮箱",prop:"email"}}),s("el-table-column",{attrs:{label:"电话",prop:"mobile"}}),s("el-table-column",{attrs:{label:"角色",prop:"role_name"}}),s("el-table-column",{attrs:{label:"状态",prop:"mg_state"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-switch",{on:{change:function(s){arguments[0]=s=e.$handleEvent(s),e.userStateChanged(t.row)}},model:{value:t.row.mg_state,callback:function(s){e.$set(t.row,"mg_state",s)},expression:"scope.row.mg_state"}})]}}])}),s("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"修改角色",placement:"top-end",enterable:!1}},[s("el-button",{staticClass:"button-item",attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(s){arguments[0]=s=e.$handleEvent(s),e.showEditDialog(t)}}})],1),s("el-dialog",{attrs:{title:"修改用户",visible:e.editdialogVisible},on:{"update:visible":function(t){arguments[0]=t=e.$handleEvent(t),e.editdialogVisible=t},close:function(t){arguments[0]=t=e.$handleEvent(t),e.addDialogClose.apply(void 0,arguments)}}},[s("v-uni-view",{staticClass:"editUsers"},[s("el-form",{ref:"addUserFromRefs",attrs:{"label-position":"right","label-width":"80px",model:e.editUserForm,rules:e.addFromRules}},[s("el-form-item",{attrs:{label:"用户名"}},[s("el-input",{staticClass:"input-item",attrs:{disabled:!0},model:{value:e.editUserForm.username,callback:function(t){e.$set(e.editUserForm,"username",t)},expression:"editUserForm.username"}})],1),s("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[s("el-input",{staticClass:"input-item",model:{value:e.editUserForm.email,callback:function(t){e.$set(e.editUserForm,"email",t)},expression:"editUserForm.email"}})],1),s("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[s("el-input",{staticClass:"input-item",model:{value:e.editUserForm.mobile,callback:function(t){e.$set(e.editUserForm,"mobile",t)},expression:"editUserForm.mobile"}})],1)],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.editdialogVisible=!1}}},[e._v("取消")]),s("el-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.editUser()}}},[e._v("确定")])],1)],1),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"删除角色",placement:"top-end",enterable:!1}},[s("el-popconfirm",{attrs:{title:"确定删除这个用户吗"},on:{confirm:function(s){arguments[0]=s=e.$handleEvent(s),e.deleteUser(t.row.id)}}},[s("el-button",{staticClass:"button-item",attrs:{slot:"reference",type:"danger",icon:"el-icon-delete",size:"mini"},slot:"reference"})],1)],1),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"分配角色",placement:"top-end",enterable:!1}},[s("el-button",{staticClass:"button-item",attrs:{type:"warning",icon:"el-icon-setting",size:"mini"},on:{click:function(s){arguments[0]=s=e.$handleEvent(s),e.showAssignment(t.row)}}})],1),t.row.id===e.assignmentRole.id?s("el-dialog",{attrs:{title:"分配角色",visible:e.assignmentVisible},on:{"update:visible":function(t){arguments[0]=t=e.$handleEvent(t),e.assignmentVisible=t}}},[s("el-form",{attrs:{model:e.assignmentRole}},[s("el-form-item",{attrs:{label:"当前用户:"}},[e._v(e._s(e.assignmentRole.username))]),s("el-form-item",{attrs:{label:"当前角色:"}},[e._v(e._s(e.assignmentRole.role_name))]),s("el-form-item",{attrs:{label:"分配新的角色"}},[s("el-select",{attrs:{placeholder:"请选择新的角色"},model:{value:e.selectedRoleId,callback:function(t){e.selectedRoleId=t},expression:"selectedRoleId"}},e._l(e.getRoleList,(function(e){return s("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}})})),1)],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.assignmentVisible=!1}}},[e._v("取消")]),s("el-button",{attrs:{type:"primary"},on:{click:function(s){arguments[0]=s=e.$handleEvent(s),e.saveRole(t.row),e.assignmentVisible=!1}}},[e._v("确定")])],1)],1):e._e()]}}])})],1)],1),s("v-uni-view",{staticClass:"block"},[s("el-pagination",{attrs:{"current-page":e.queryInfo.pagesize,"page-sizes":[1,2,5,7],"page-size":1,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":function(t){arguments[0]=t=e.$handleEvent(t),e.handleSizeChange.apply(void 0,arguments)},"current-change":function(t){arguments[0]=t=e.$handleEvent(t),e.handleCurrentChange.apply(void 0,arguments)}}})],1)],1)},r=[]},bd9a:function(e,t,s){var a=s("8dc8");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var r=s("967d").default;r("160dd9c4",a,!0,{sourceMap:!1,shadowMode:!1})},c75e:function(e,t,s){"use strict";s.r(t);var a=s("2e5c"),r=s.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){s.d(t,e,(function(){return a[e]}))}(n);t["default"]=r.a},fe49:function(e,t,s){"use strict";s("6a54");var a=s("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.put=t.post=t.get=t.del=void 0,s("bf0f");var r=a(s("9ddc")),n=r.default.create({baseURL:"http://127.0.0.1:8000/api/private/v1",timeout:1e4,headers:{"Content-Type":"application/x-www-form-urlencoded"}});n.interceptors.request.use((function(e){return e.headers.Authorization=window.sessionStorage.getItem("token"),e}),(function(e){return Promise.reject(e)})),n.interceptors.response.use((function(e){return e.data}),(function(e){return Promise.reject(e)}));t.get=function(e,t){return n.get(e,{params:t})};t.post=function(e,t){return n.post(e,t)};t.put=function(e,t){return n.put(e,t)};t.del=function(e){return n.delete(e)}}}]);