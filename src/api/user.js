//抽取出来的克隆axios和过滤器请求对象
import request from '@/utils/request'

//封装用户列表接口
export function userList(params) {
    return request({
        url: '/user/list',
        method: 'get',
        params
    })
}
//封装创建用户接口
export function userAdd(data) {
    return request({
        url: '/user/add',
        method: 'post',
        data
    })
}
//封装设置用户状态接口
export function userStatus(data) {
    return request({
        url: '/user/status',
        method: 'post',
        data
    })
}
//封装删除用户接口
export function userRemove(data) {
    return request({
        url: '/user/remove',
        method: 'post',
        data
    })
}
//封装编辑用户接口
export function userEdit(data) {
    return request({
        url: '/user/edit',
        method: 'post',
        data
    })
}