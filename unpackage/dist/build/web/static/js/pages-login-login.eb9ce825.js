(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"1c3d":function(e,t,n){"use strict";n("7a82");var a=n("ee27").default;Object.defineProperty(t,"__esModule",{value:!0}),t.put=t.post=t.get=t.del=void 0,n("d3b7");var i=a(n("804c")),o=i.default.create({baseURL:"http://127.0.0.1:8000/api/private/v1",timeout:1e4,headers:{"Content-Type":"application/x-www-form-urlencoded"}});o.interceptors.request.use((function(e){return e.headers.Authorization=window.sessionStorage.getItem("token"),e}),(function(e){return Promise.reject(e)})),o.interceptors.response.use((function(e){return e.data}),(function(e){return Promise.reject(e)}));t.get=function(e,t){return o.get(e,{params:t})};t.post=function(e,t){return o.post(e,t)};t.put=function(e,t){return o.put(e,t)};t.del=function(e){return o.delete(e)}},8133:function(e,t,n){"use strict";n.r(t);var a=n("e5a3"),i=n("ad97");for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("de64");var r=n("f0c5"),s=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"642809cd",null,!1,a["a"],void 0);t["default"]=s.exports},ad97:function(e,t,n){"use strict";n.r(t);var a=n("fb76"),i=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},d39c:function(e,t,n){var a=n("df1b");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("b6c5dde4",a,!0,{sourceMap:!1,shadowMode:!1})},de64:function(e,t,n){"use strict";var a=n("d39c"),i=n.n(a);i.a},df1b:function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,".login[data-v-642809cd]{padding:0;margin:0;background:url(/static/login.jpg) no-repeat;background-size:100% 100%;background-attachment:fixed;background-position:center 0;background-size:cover;min-height:100vh;width:100%;display:flex;justify-content:center; /* 水平居中 */align-items:center /* 垂直居中 */}.login-from[data-v-642809cd]{width:40%;\n\t/* height: 350px; */text-align:center;margin:0 auto;background-color:#fff;opacity:.6;color:#000}.login-box[data-v-642809cd]{font-size:40px;padding-bottom:20px;padding-top:20px}.login-form-username[data-v-642809cd]{display:flex;padding-bottom:20px}.login-form-password[data-v-642809cd]{display:flex;padding-bottom:20px}.login-form-button[data-v-642809cd]{width:50%;margin:10px;padding-left:25%}.canvas[data-v-642809cd]{display:flex;justify-content:center}",""]),e.exports=t},e5a3:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"login"},[n("v-uni-view",{staticClass:"login-from"},[n("v-uni-view",{staticClass:"login-box"},[e._v("登录")]),n("v-uni-view",{staticClass:"login-form-username"},[n("v-uni-view",{staticStyle:{width:"30%"}},[e._v("用户名：")]),n("v-uni-view",{},[n("el-input",{attrs:{placeholder:"请输入用户名",clearable:!0},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})],1)],1),n("v-uni-view",{staticClass:"login-form-password"},[n("v-uni-view",{staticStyle:{width:"30%"}},[e._v("密码：")]),n("v-uni-view",{},[n("el-input",{attrs:{placeholder:"请输入密码",clearable:!0},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)],1),n("v-uni-view",{staticClass:"canvas"},[n("v-uni-view",{},[n("el-input",{attrs:{placeholder:"请输入验证码",clearable:!0},model:{value:e.form.check,callback:function(t){e.$set(e.form,"check",t)},expression:"form.check"}})],1),n("v-uni-view",{staticClass:"canvas-img-code",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clickCode.apply(void 0,arguments)}}},[n("v-uni-canvas",{style:{width:e.width+"px",height:e.height+"px"},attrs:{"canvas-id":"imgcanvas"}})],1)],1),n("v-uni-view",{staticClass:"login-form-button"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handle.apply(void 0,arguments)}}},[e._v("登录")])],1)],1)],1)},i=[]},fb76:function(e,t,n){"use strict";n("7a82");var a=n("ee27").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("e25e"),n("cb29");var i=a(n("f07e")),o=a(n("c964")),r=n("1c3d"),s={name:"login",data:function(){return{disabled:!1,password:"123456",username:"admin",form:{check:""},width:120,height:45}},mounted:function(){this.initCode()},methods:{handle:function(){var e=this;return(0,o.default)((0,i.default)().mark((function t(){var n;return(0,i.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,console.log("验证码：",uni.getStorageSync("imgcode")),console.log(e.form.check),e.form.check.toLowerCase()===uni.getStorageSync("imgcode").toLowerCase()){t.next=7;break}uni.showToast({icon:"none",title:"验证码失败"}),t.next=15;break;case 7:return uni.showToast({icon:"none",title:"验证码正确"}),t.next=10,(0,r.post)("/login",{username:e.username,password:e.password});case 10:n=t.sent,console.log("请求成功",n),window.sessionStorage.setItem("token",n.data.token),alert(n.meta.msg),uni.navigateTo({url:"/pages/home/home"});case 15:t.next=20;break;case 17:t.prev=17,t.t0=t["catch"](0),console.log("请求失败",t.t0);case 20:case"end":return t.stop()}}),t,null,[[0,17]])})))()},initCode:function(){console.log("start");var e=uni.createCanvasContext("imgcanvas",this),t=this.width,n=this.height;e.setFillStyle("white"),e.setLineWidth(5),e.fillRect(0,0,t,n);for(var a=["A","B","C","D","E","F","G","H","I","J","K","L","I","M","N","O","P","Q","R","S","T","U","V","W","S","Y","Z","1","2","3","4","5","6","7","8","9","0"],i="",o=0;o<4;o++){var r=a[this.rn(0,a.length-1)],s=this.rn(-30,30);e.setFontSize(18),e.setTextBaseline("top"),e.setFillStyle(this.rc(80,150)),e.save(),e.translate(30*o+15,parseInt(n/1.5)),e.rotate(s*Math.PI/180),e.fillText(r,-10,-15),e.restore(),i+=r}console.log("验证码：",i),uni.setStorage({key:"imgcode",data:i});for(o=0;o<40;o++)e.beginPath(),e.arc(this.rn(0,t),this.rn(0,n),1,0,2*Math.PI),e.closePath(),e.setFillStyle(this.rc(150,200)),e.fill();e.draw(),console.log("end")},rc:function(e,t){var n=this.rn(e,t),a=this.rn(e,t),i=this.rn(e,t);return"rgb("+n+","+a+","+i+")"},rn:function(e,t){return parseInt(Math.random()*(e-t))+t},clickCode:function(){this.initCode()}}};t.default=s}}]);