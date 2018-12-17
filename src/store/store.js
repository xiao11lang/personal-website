import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from "axios"
export default new Vuex.Store({
    state:{
        isLogin:false,
        userName:'',
        admin:false,
        avatar:'icon-git',
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
            state.avatar=info.avatar;
        },
        setAvatar:function(state,avatar){
            state.avatar=avatar
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
            state.mesList=mes.map(function(v,index){return Object.assign({},v,{index:index+1})})
        },
        mesAdd:function(state,mes){
            state.mesList.push(Object.assign({},mes,{index:state.mesList.length+1}))
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
                axios.get('http://www.11lang.cn/api/getArticle').then(function(res){
                    context.commit('getArticle',res.data)
                    resolve()
                    })
            })
             
        },
        countAdd:function(context,data){
            let fd=new FormData()
            fd.append('id',data.id)
            axios.post('http://www.11lang.cn/api/addCount',fd).then(function(res){
                if(res.data==='success'){
                    context.commit('readCountAdd',data)
                }
            })
        },
        thumpAdd:function(context,data){
            context.commit('thumpUpAdd',data)
            let fd=new FormData()
            fd.append('id',data.id)
            axios.post('http://www.11lang.cn/api/addthump',fd).then(function(res){
                if(res.data==='success'){
                    
                }
            })
        },
        getDaily:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://www.11lang.cn/api/getDaily').then(function(res){
                    context.commit('getDaily',res.data)
                    resolve()
                    })
            })
             
        },
        getMes:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://www.11lang.cn/api/getMessage').then(function(res){
                    context.commit('getMes',res.data)
                    resolve()
                    })
            })
        },
        getCommer:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://www.11lang.cn/api/getCommer').then(function(res){
                    context.commit('getCommer',res.data)
                    resolve()
                    })
            })
             
        },
        getBarrage:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://www.11lang.cn/api/getBarrage').then(function(res){
                    context.commit('getBarrage',res.data)
                    resolve()
                    })
            })
             
        },
    }
})