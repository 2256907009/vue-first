// router/index.js
// import { RouterMount, createRouter } from "uni-simple-router";
// const router = new createRouter({
//   platform: process.env.VUE_APP_PLATFORM,
//   h5: {
//     vueRouterDev: true, //完全使用vue-router开发 默认 false
//   },
//   routes: [
//     {
//       path: "/home",
//       name: "home",
//       component: () => import("pages/home/home"),
//       meta: {
//         title: "首页",
//       },
//     },
//     {
//       path: "/login",
//       name: "login",
//       component: () => import("pages/login/login"),
//       meta: {
//         title: "登录",
//       },
//     },
//   ],
// });

// //配置路由守卫 next()表示放行  next('/login')表示强制跳转
// router.beforeEach((to,from,next)=>{
// 	if(to.path === '/login') return next();
// 	//客户端存储token在关闭页面时会清除
// 	const tokenStr = window.sessionStorage.getItem('token')
// 	if(!tokenStr) return next('/login')
// 	next()
// })


// export { router, RouterMount };

