import axios from 'axios'


//克隆axios
let indexkelong = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // headers: {
    //     token: getToken()
    // }
})
// 添加请求拦截器
indexkelong.interceptors.request.use(function (config) {
    //config参数就是被拦截下来请求的配置
    window.console.log(config);
    //把每次发的请求拦截下来,给他加上一个token值
    config.headers.token = getToken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//导入封装好的获取token值方法
import { getToken } from '@/utils/token.js'
//获取用户信息
export function info() {
    return indexkelong({
        url: "/info",
        method: "get",
    })
    // return axios({
    //     url: porcess.env.VUE_APP_URL + "/info",
    //     method: "get",
    //     headers: {
    //         token: getToken()
    //     }
    // })
}

//获取用户退出接口
export function logout() {
    return indexkelong({
        url: '/logout',
        method: "get",
    })
    // return axios({
    //     url: porcess.env.VUE_APP_URL + "/logout",
    //     method: "get",
    //     headers: {
    //         token: getToken()
    //     }
    // })
}