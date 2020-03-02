//这里面就是一个数组
//导入index里的子组件
import user from '../views/index/user/user.vue'
import business from '../views/index/business/business.vue'
import information from '../views/index/information/information.vue'
import question from '../views/index/question/question.vue'
import study from '../views/index/study/study.vue'
//把这个数组暴露出去
export default [
    // 子路由一般不加/
    {
        path: "information",
        component: information,
        meta: {
            title: '数据概览',
            roles: ['超级管理员', '管理员'],
            icon: 'el-icon-pie-chart'
        }
    },
    {
        path: "user",
        component: user,
        meta: {
            title: '用户列表',
            roles: ['超级管理员', '管理员'],
            icon: 'el-icon-user'
        },

    },

    {
        path: "question",
        component: question,
        meta: {
            title: '题库列表',
            roles: ['超级管理员', '管理员', '老师', '学生'],
            icon: 'el-icon-edit-outline'
        }
    },
    {
        path: "business",
        component: business,
        meta: {
            title: '企业列表',
            roles: ['超级管理员', '管理员', '老师'],
            icon: 'el-icon-office-building'
        }
    },

    {
        path: "study",
        component: study,
        meta: {
            title: '学科列表',
            roles: ['超级管理员', '管理员', '老师', '学生'],
            icon: 'el-icon-notebook-2'
        }
    },
]