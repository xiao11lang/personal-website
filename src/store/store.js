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
        daily:[],
        mesList:[],
        currentArticle:{},
        thumpList:[],
        commers:[],
        barrageList:[]
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
        getDaily:function(state,daily){
            state.daily=daily
        },
        getMes:function(state,mes){
            state.mesList=mes
        },
        mesAdd:function(state,mes){
            state.mesList.push(mes)
        },
        getCommer:function(state,commer){
            state.commers=commer
        },
        getBarrage:function(state,barrage){
            state.barrageList=barrage
        }
    },
    actions:{
        getArticle:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://localhost:3000/article').then(function(res){
                    context.commit('getArticle',res.data)
                    resolve()
                    })
            })
             
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
        getDaily:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://localhost:3000/daily').then(function(res){
                    context.commit('getDaily',res.data)
                    resolve()
                    })
            })
             
        },
        getMes:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://localhost:3000/message').then(function(res){
                    context.commit('getMes',res.data)
                    resolve()
                    })
            })
        },
        getCommer:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://localhost:3000/commer').then(function(res){
                    context.commit('getCommer',res.data)
                    resolve()
                    })
            })
             
        },
        getBarrage:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://localhost:3000/barrage').then(function(res){
                    context.commit('getBarrage',res.data)
                    resolve()
                    })
            })
             
        },
    }
})