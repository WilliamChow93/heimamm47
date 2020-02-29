import Vue from 'vue'
//导入moment插件
import moment from 'moment'
//全局过滤器
//参数1:过滤器名称
//参数2:过利器的具体实现
Vue.filter('formatTime', function (val) {
    // val是一个日期
    return moment(val).format('YYYY-MM-DD')
})