import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
//注册element-ui
Vue.use(ElementUI)
// 导入路由对象
import router from './router/index'
//导入vuex的对象
import store from './store/index.js'
// 导包element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入全局过滤器
//只要能执行里面的代码就行,所以简单的导入就行
import '@/utils/filters.js'
//导入base.css
import '../src/style/base.css'
//注册element-ui
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
