//定义一个常量
const TOKENKEY = 'mmtoken'
//获取token
export function getToken() {
    return window.localStorage.getItem(TOKENKEY)
}
//设置,存储token
export function setToken(token) {
    window.localStorage.setItem(TOKENKEY, token)
}
//删除token
export function removeToken() {
    window.localStorage.removeItem(TOKENKEY)
}