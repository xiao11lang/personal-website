import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from "axios"
export default new Vuex.Store({
    state:{
        isLogin:false,
        userName:'',
        admin:false,
        article:[],
        articleGot:false,
        currentArticlePath:''
    },
    mutations:{
        setLoginState:function(state,flag){
            state.isLogin=flag;
            if(!flag){
                state.admin=false
            }
        },
        setUserInfo:function(state,info){
            state.userName=info.userName;
            state.admin=info.admin
        },
        getArticle:function(state,article){
            state.article=article
            state.articleGot=true
        },
        setPath:function(state,path){
            state.currentArticlePath=path
        }
    },
    actions:{
        getArticle:function(context){
            if(context.state.articleGot){
                return Promise.resolve()
            }else{
                return new Promise(function(resolve,reject){
                    axios.get('http://localhost:3000/article').then(function(res){
                        context.commit('getArticle',res.data)
                        resolve()
                        })
                })
            }
             
        }
    }
})