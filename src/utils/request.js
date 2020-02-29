//抽取请求对象
import axios from 'axios'
//克隆一个axios
let request = axios.create({
    baseURL: process.env.VUE_APP_URL,
    //携带cookie
    withCredentials: true,
})
import { getToken } from '@/utils/token.js'
//加请求拦截,要加token
request.interceptors.request.use(function (config) {
    //添加token
    config.headers.token = getToken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default request