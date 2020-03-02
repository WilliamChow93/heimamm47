import Vue from 'vue'
import Vuex from 'vuex'
//注册
Vue.use(Vuex)

// 创建vuex对象
const store = new Vuex.Store({
    state: {
        //用户名
        username: '',
        //用户头像
        avatar: '',
        //角色
        role:'',
    },
    mutations: {
        //用来修改用户名的方法
        changeUsername(state, val) {
            state.username = val
        },
        //用来修改用户头像的方法
        changeAvatar(state, val) {
            state.avatar = val
        },
        //用来修改用户头像的方法
        changeRole(state, val) {
            state.role = val
        }
    }
})

export default store