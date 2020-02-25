import Vue from 'vue'
// 0. 导入 子组件
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'
import user from '../views/index/user/user.vue'
import business from '../views/index/business/business.vue'
import information from '../views/index/information/information.vue'
import question from '../views/index/question/question.vue'
import study from '../views/index/study/study.vue'
//  导入进度条 js 和 css 文件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
        children: [
            //子路由一般不加"/""
            { path: 'user', component: user, },
            { path: 'business', component: business },
            { path: 'information', component: information },
            { path: 'question', component: question },
            { path: 'study', component: study }
        ]
    },
]
// 3. 实例化
const router = new VueRouter({
    routes
})
//导航守卫
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
})
router.afterEach(() => {
    NProgress.done();
})
// 4. 需要在下面把router暴露出去
export default router 