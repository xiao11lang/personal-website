import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        isLogin:false,
        userName:'',
        admin:false
    },
    mutations:{
        setLoginState:function(state,flag){
            state.isLogin=flag
        },
        setUserInfo:function(state,info){
            state.userName=info.userName;
            state.admin=info.admin
        }
    }
})