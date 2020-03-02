import Vue from 'vue'
// 0. 导入 子组件
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'
//导入index的子组件
import children from './childrenRouter.js'

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
    { path: '/login', component: login, meta: { title: "登录" }, roles: ["超级管理员", "管理员", "老师", "学生"] },
    //路由重定向:↓
    //相当于不输入,帮你输入了/login
    { path: '/', redirect: '/login' },
    {
        path: '/index',
        component: index,
        meta: { title: "首页", roles: ["超级管理员", "管理员", "老师", "学生"] },
        children
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
    console.log(to);

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
                //判断用户是否禁用,
                if (res.data.data.status == 1) {
                    console.log(res);
                    //把数据存到vuex,要在发送请求,状态在200时存,因为这时候才会有正确的数据
                    //渲染用户名
                    store.commit('changeUsername', res.data.data.username)
                    //渲染头像
                    store.commit('changeAvatar', process.env.VUE_APP_URL + '/' + res.data.data.avatar)
                    //渲染角色
                    store.commit('changeRole', res.data.data.role)
                    // 因为导航守卫每次有跳转都会调用,所以要判断
                    // 从登录跳过来的，才提示登录成功
                    if (from.path == '/login') {
                        Message.success("登陆成功！");
                    }
                    //就算账户是启用，也不能无条件放行
                    //因为还要判断下，你这个账号有没有权限去访问将要去的页面
                    //to.meta.roles可以得到这个要去的页面哪些角色可以访问
                    //然后我们要判断当前登录的用户的角色是不是在这些角色里面
                    // console.log(to);

                    // 判断一个数组是否包含一个元素，包含得到true，不包含得到false
                    // 在判断要去的页面可以访问的角色里，是否包含我当前登录的用户的角色
                    if (to.meta.roles.includes(res.data.data.role)) {
                        //请求放行
                        next();
                    } else {
                        //代表没有权限访问，就从哪来的就回到哪
                        Message.warning('该页面，你无权访问！')
                        NProgress.done();
                        //原本在哪个页面就返回哪个页面
                        next(from.path);
                    }

                } else {
                    Message.warning("用户已禁用,请联系管理员");
                    //手动添加关闭进度条,作用是没执行afterEach在这里关闭
                    NProgress.done();
                    //跳转到登录页面,
                    next("/login");
                }
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