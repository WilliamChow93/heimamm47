import Vue from 'vue'
// 0. 导入 子组件
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'
import user from '../views/index/user/index.vue'
// 1. 导入 vue-router
import VueRouter from 'vue-router'
// 2. 注册 vue-router
Vue.use(VueRouter)
//这里就是路由的配制项
const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/index',
        component: index,
        children: [{
            //子路由一般不加"/""
            path: 'user',
            component: user,
        }]
    },
]
// 3. 实例化
const router = new VueRouter({
    routes
}) // 4. 需要在下面注入router
export default router 