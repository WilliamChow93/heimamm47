import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 导入路由对象
import router from './router/index'
// 导包element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入base.css
import '../src/style/base.css'
//注册element-ui
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
