import axios from 'axios'

//克隆axios
let indexkelong = axios.create({
    baseURL: process.env.VUE_APP_URL,
    headers: {
        token: getToken()
    }
})
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
        url:'/logout',
        method:"get",
    })
    // return axios({
    //     url: porcess.env.VUE_APP_URL + "/logout",
    //     method: "get",
    //     headers: {
    //         token: getToken()
    //     }
    // })
}