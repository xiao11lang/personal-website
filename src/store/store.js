import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from "axios"
export default new Vuex.Store({
    state:{
        isLogin:false,
        userName:'',
        admin:false,
        article:[]
    },
    mutations:{
        setLoginState:function(state,flag){
            state.isLogin=flag
        },
        setUserInfo:function(state,info){
            state.userName=info.userName;
            state.admin=info.admin
        },
        getArticle:function(state,article){
            state.article=article
        }
    },
    actions:{
        getArticle:function(context){
            axios.get('http://localhost:3000/article').then(function(res){
                context.commit('getArticle',res.data)
            })
        }
    }
})