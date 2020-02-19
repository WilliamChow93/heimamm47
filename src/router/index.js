import Vue from 'vue'
// 0. 导入 子组件

// 1. 导入 vue-router
import VueRouter from 'vue-router'
// 2. 注册 vue-router
Vue.use(VueRouter)

// 3. 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [

    ]
}) // 4. 需要在下面注入router
export default router 