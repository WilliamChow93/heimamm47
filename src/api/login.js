import axios from "axios"
//暴露一个登陆接口的地址
export function login(data) {
    return axios({
        url: process.env.VUE_APP_URL + '/login',
        method: "post",
        data,
        //携带cookie
        withCredentials: true,
    })

}
export function info() {
    return axios({
        url: process.env.VUE_APP_URL + '/info',
        method: "get",
    })

}
