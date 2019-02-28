import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from "axios"
export default new Vuex.Store({
    state:{
        isLogin:false,
        userName:'',
        admin:false,
        userId:1,
        avatar:'icon-git',
        article:[],
        articleCount:0,
        selfInfo:{},
        daily:[],
        dailyCount:0,
        dailyPage:1,
        mesList:[],
        mesCount:0,
        currentArticle:{},
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
            state.avatar=info.avatar||'icon-Git';
            state.userId=info.id||1;
        },
        setAvatar:function(state,avatar){
            state.avatar=avatar
        },
        getArticle:function(state,articleInfo){
            state.article=articleInfo.article
            state.articleCount=articleInfo.total
        },
        getSelfInfo:function(state,info){
            state.selfInfo=info
        },
        addArticle:function(state,article){
            state.article.unshift(article)
            if(state.article.length>10){
                state.article.pop()
            }
            state.articleCount++
        },
        setArticle:function(state,article){
            state.currentArticle=article
        },
        readCountAdd:function(state,data){
            let article=state.article.find(function(art){
                return art.id===data.id
            })
            article.readCount=data.readCount
        },
        thumpUpAdd:function(state,data){
            let article=state.article.find(function(art){
                return art.id===data.id
            })
            article.thumpUp=data.thumpUp
        },
        getDaily:function(state,dailyInfo){
            state.dailyCount=dailyInfo.total
            state.daily=dailyInfo.daily
        },
        addDaily:function(state,daily){
            state.daily.unshift(daily)
            if(state.daily.length>10){
                state.daily.pop()
            }
            state.dailyCount++
        },
        deleteDailys:function(state,id){
            let i;
            state.daily.forEach(function(daily,index){
                if(id==daily.id){
                    i=index
                }
            })
            state.daily.splice(i,1)
        },
        setDailyPage:function(state,page){
            state.dailyPage=page
        },
        getMes:function(state,mesInfo){
            state.mesCount=mesInfo.total
            state.mesList=mesInfo.mes.map(function(v,index){return Object.assign({},v,{index:index+1})})
        },
        mesAdd:function(state,mes){
            state.mesList.unshift(Object.assign({},mes))
            if(state.mesList.length>10){
                state.mesList.pop()
            }
            state.mesList=state.mesList.map(function(v,index){return Object.assign({},v,{index:index+1})})
            state.mesCount++
        },
        getCommer:function(state,commer){
            state.commers=commer
        },
        getBarrage:function(state,barrage){
            state.barrageList=barrage
        }
    },
    actions:{
        getArticle:function(context,pageNum){
            let fd=new FormData()
            fd.append('pageNum',pageNum)
            return new Promise(function(resolve,reject){
                axios.post('http://www.11lang.cn/api/getArticle',fd).then(function(res){
                    context.commit('getArticle',res.data)
                    resolve()
                    })
            })
             
        },
        getSelfInfo:function(context){
            return new Promise(function(resolve,reject){
                axios.get('http://www.11lang.cn/api/getSelfInfo').then(function(res){
                    context.commit('getSelfInfo',res.data)
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
            let fd=new FormData()
            fd.append('id',data.id)
            fd.append('userName',data.userName)
            axios.post('http://www.11lang.cn/api/addthump',fd).then(function(res){
                if(res.data==='success'){
                    context.commit('thumpUpAdd',data)
                }else{
                    alert('不可重复点赞')
                }
            })
        },
        getDaily:function(context,pageNum){
            let fd=new FormData()
            fd.append('pageNum',pageNum)
            return new Promise(function(resolve,reject){
                axios.post('http://www.11lang.cn/api/getDaily',fd).then(function(res){
                    context.commit('getDaily',res.data)
                    resolve()
                    }).catch(function(e){
                        reject(e)
                    })
            })
             
        },
        getMes:function(context,pageNum){
            let fd=new FormData()
            fd.append('pageNum',pageNum)
            return new Promise(function(resolve,reject){
                axios.post('http://www.11lang.cn/api/getMessage',fd).then(function(res){
                    context.commit('getMes',res.data)
                    resolve()
                    }).catch(function(e){
                        reject(e)
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