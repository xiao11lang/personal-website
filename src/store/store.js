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
        currentArticle:{},
        thumpList:[]
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
        setArticle:function(state,article){
            state.currentArticle=article
        },
        readCountAdd:function(state,data){
            let article=state.article.find(function(art){
                return art._id===data.id
            })
            article.readCount=data.readCount
        },
        thumpUpAdd:function(state,data){
            let article=state.article.find(function(art){
                return art._id===data.id
            })
            article.thumpUp=data.thumpUp
            state.thumpList.push(article._id)
        },
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
             
        },
        countAdd:function(context,data){
            let fd=new FormData()
            fd.append('id',data.id)
            fd.append('readCount',data.readCount)
            axios.post('http://localhost:3000/countAdd',fd).then(function(res){
                if(res.data==='success'){
                    context.commit('readCountAdd',data)
                }
            })
        },
        thumpAdd:function(context,data){
            context.commit('thumpUpAdd',data)
            let fd=new FormData()
            fd.append('id',data.id)
            fd.append('thumpUp',data.thumpUp)
            axios.post('http://localhost:3000/thumpAdd',fd).then(function(res){
                if(res.data==='success'){
                    
                }
            })
        },
    }
})