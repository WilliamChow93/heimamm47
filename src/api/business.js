// import axios from 'axios'

// //克隆一个axios
// let businesskelong = axios.create({
//     baseURL: process.env.VUE_APP_URL,
//     //携带cookie
//     withCredentials: true,
// })
// import { getToken } from '@/utils/token.js'
// //加请求拦截,要加token
// businesskelong.interceptors.request.use(function (config) {
//     //添加token
//     config.headers.token = getToken();
//     // 在发送请求之前做些什么
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
//导入封装好的request
import request from '@/utils/request.js'
//封装企业列表的接口

export function business(params) {
    return request({
        url: '/enterprise/list',
        method: 'get',
        params
    })
}

//封装企业状态设置
export function bsnStatus(data) {
    return request({
        url: '/enterprise/status',
        method: 'post',
        data
    })
}
//封装企业添加接口
export function bsnAdd(data) {
    return request({
        url: '/enterprise/add',
        method: 'post',
        data
    })
}
//封装企业删除接口
export function bsnRemove(data) {
    return request({
        url: '/enterprise/remove',
        method: 'post',
        data
    })
}
//封装企业编辑接口
export function bsnEdit(data){

    return request({
        url:"/enterprise/edit",
        method:"post",
        data
    })
}