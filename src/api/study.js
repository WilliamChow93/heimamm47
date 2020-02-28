//科学模板接口
import axios from 'axios'

//创建axios的新对象，设置基地址和允许携带cookie（克隆axios）
let studykelong = axios.create({
    //基地址
    baseURL: process.env.VUE_APP_URL,
    //允许携带cookie
    withCredentials: true,
})
//给新对象加请求拦截,在里面加token
import { getToken } from '@/utils/token.js'
studykelong.interceptors.request.use(function (config) {
    console.log("config:", config);
    //在拦截器的请求头添加ttoken
    config.headers.token = getToken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//封装一个获取学科列表的接口
export function studyList(params) {
    return studykelong({
        url: '/subject/list',
        method: 'get',
        params
    })

}

//封装学科编辑的接口
export function status(data) {
    return studykelong({
        url: '/subject/status',
        method: 'post',
        data
    })
}

//封装添加学科的接口
export function studyAdd(data) {
    return studykelong({
        url: '/subject/add',
        method: 'post',
        data
    })
}
//封装学科编辑的接口
export function studyEdit(data) {
    return studykelong({
        url: '/subject/edit',
        method: "post",
        data
    })
}
//封装学科删除的接口
export function studtDel(data) {
    return studykelong({
        url: '/subject/remove',
        method: "post",
        data
    })
}