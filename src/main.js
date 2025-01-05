import Vue from "vue"; // 引入Vue库
import App from "./App.vue"; // 引入根组件App.vue
import router from "./router"; // 引入路由配置
import store from "./store"; // 引入Vuex状态管理
Vue.config.productionTip = false; // 关闭Vue的生产模式提示

import elementUi from "element-ui"; // 引入Element UI组件库
import "element-ui/lib/theme-chalk/index.css"; // 引入Element UI的样式文件

import { getToken } from "@/utils/auth.js"; // 引入获取token的工具函数

// 阿里图标
import "@/assets/icons/font/iconfont.css"; // 引入阿里图标的样式文件
import Fragment from "vue-fragment"; // 引入vue-fragment插件，用于在Vue中使用多根节点
Vue.use(Fragment.Plugin); // 使用vue-fragment插件

// echarts
import echarts from "echarts"; // 引入echarts图表库
Vue.prototype.$echarts = echarts; // 将echarts挂载到Vue原型上，方便全局使用

// 路由守卫
const whiteList = ["/login"]; // 定义白名单，不需要重定向的路由

router.beforeEach((to, from, next) => {
  const hasToken = getToken(); // 获取token
  // console.log(to);
  // console.log(from);
  if (hasToken) {
    // 如果有token
    if (to.path === '/login') {
      // 如果用户已经登录并且试图访问登录页面，重定向到首页
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.state.username // 检查是否已经获取了用户信息
      if (hasGetUserInfo) {
        next() // 如果已经获取了用户信息，继续导航
      } else {
        try {
          // 如果没有获取用户信息，尝试获取用户信息
          store.dispatch('getInfo1')

          next() // 获取用户信息后继续导航
        } catch (error) {
          next(`/login?redirect=${to.path}`) // 如果获取用户信息失败，重定向到登录页面
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果访问的路由在白名单中，直接放行
      next();
    } else {
      // 如果访问的路由不在白名单中，重定向到登录页面
      next(`/login?redirect=${to.path}`);
    }
  }
});


Vue.use(elementUi); // 使用Element UI组件库
new Vue({
  router, // 注入路由
  store, // 注入Vuex状态管理
  render: (h) => h(App), // 渲染根组件App
}).$mount("#app"); // 挂载到id为app的DOM元素上