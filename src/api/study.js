//科学模板接口
import request from '@/utils/request.js'
//封装一个获取学科列表的接口
export function studyList(params) {
    return request({
        url: '/subject/list',
        method: 'get',
        params
    })

}

//封装学科编辑的接口
export function status(data) {
    return request({
        url: '/subject/status',
        method: 'post',
        data
    })
}

//封装添加学科的接口
export function studyAdd(data) {
    return request({
        url: '/subject/add',
        method: 'post',
        data
    })
}
//封装学科编辑的接口
export function studyEdit(data) {
    return request({
        url: '/subject/edit',
        method: "post",
        data
    })
}
//封装学科删除的接口
export function studtDel(data) {
    return request({
        url: '/subject/remove',
        method: "post",
        data
    })
}