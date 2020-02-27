import Vue from 'vue'
// 0. 导入 子组件
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'
//导入index里的子组件
import user from '../views/index/user/user.vue'
import business from '../views/index/business/business.vue'
import information from '../views/index/information/information.vue'
import question from '../views/index/question/question.vue'
import study from '../views/index/study/study.vue'

import store from '../store/index.js'
//  导入进度条 js 和 css 文件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { removeToken } from "@/utils/token.js"
import { info } from "@/api/index.js";
//单独导入element-ui的Message方法
import { Message } from 'element-ui';

// 1. 导入 vue-router
import VueRouter from 'vue-router'

// 2. 注册 vue-router
Vue.use(VueRouter)
//这里就是路由的配制项
const routes = [
    //meta路由元信息,设置当前页面的title
    { path: '/login', component: login, meta: { title: "登录" } },
    //路由重定向:↓
    //相当于不输入,帮你输入了/login
    { path: '/', redirect: '/login' },
    {
        path: '/index',
        component: index,
        meta: { title: "首页" },
        children: [
            //子路由一般不加"/""
            { path: 'user', component: user, meta: { title: "用户列表" } },
            { path: 'business', component: business, meta: { title: "企业列表" } },
            { path: 'information', component: information, meta: { title: "数据概览" } },
            { path: 'question', component: question, meta: { title: "题库列表" } },
            { path: 'study', component: study, meta: { title: "学科列表" } }
        ]
    },
]
// 3. 实例化路由对象
const router = new VueRouter({
    routes
})
//定义白名单数组
//路由白名单,里面存放着一些不用验证的网页路径
let whiteUrl = ["/login"]
//导航守卫
//导航守卫要创建在实例化路由对象的后面
//这个回调函数是在即将跳转路由之前调用的
//to:到哪里
//from:从哪里
//next:是一个函数,调用这个函数才能放行
//next:不传参就代表原来去那就去那,如果传参就会跳转到传参的地址上
//beforeEach是准备进入到某个页面触发
router.beforeEach((to, from, next) => {
    //开启进度条
    NProgress.start();
    //如果白名单包括要去的页面,那么代表这个页面不需要验证,直接放行
    //includes方法判断要去的路径是不是在白名单数组中
    if (whiteUrl.includes(to.path)) {
        //如果是登录页面直接放行
        next();
    } else {
        info().then(res => {
            if (res.data.code == 200) {
                console.log(res);
                
                //把数据存到vuex,要在发送请求,状态在200时存,因为这时候才会有正确的数据
                //渲染用户名
                store.commit('changeUsername',res.data.data.username)
                //渲染头像
                store.commit('changeAvatar',process.env.VUE_APP_URL+'/'+res.data.data.avatar)
                //启动进度条'
                NProgress.start();
                //请求放行
                next();
            } else if (res.data.code == 206) {
                Message.error("系统异常,重新登录");
                //删除token
                removeToken();

                //手动添加关闭进度条,作用是没执行afterEach在这里关闭
                NProgress.done();
                //跳转到登录页面,
                // next传参就会跳转到传参的地址上
                next("/login");
            }
        })
    }
})
//afterEach是已经进入到某个页面触发
router.afterEach((to) => {
    // 关闭进度条
    NProgress.done();
    //取出当前要去页面的标签title
    document.title = to.meta.title
})
// 4. 需要在下面把router暴露出去
export default router 