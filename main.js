import App from './App'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import { router, RouterMount } from "router/index.js"; 
// import uni from 'uni'
// import request from './utils/request.js'



// uni.$u.http.setConfig((config) => {
//      /* config 为默认全局配置*/
//      config.baseURL = 'http://127.0.0.1:8000/api/private/v1'; /* 根域名 */
//      return config
//  })





// #ifndef VUE3
import Vue from 'vue'
// import uView from 'uview-ui'

// Vue.use(uView)
// Vue.use(router)
Vue.use(ElementUI)


Vue.prototype.$axios = axios



import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
});
// RouterMount(app, router, '#app');
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif