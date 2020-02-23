//这是调用接口用的js
import axios from 'axios'

export function sendSMS(data) {
    return axios({
        url: process.env.VUE_APP_URL + '/sendsms',
        method: 'post',
        data,
        //携带cookie
        withCredentials: true,
    })
}
//注册账号接口的请求
export function register(data) {
    return axios({
        url: process.env.VUE_APP_URL + "/register",
        method: "post",
        data,
        //携带cookie
        withCredentials: true,
    })
}