import fetch from '../until/fetch'
import {GET_ARTICLE,ADD_COUNT,ADD_THUMP} from '../until/constant'
export default {
    namespaced:true,
    state:{
        article:[],
        articleCount:0,
        currentArticle:{},
    },
    mutations:{
        getArticle:function(state,articleInfo){
            state.article=articleInfo.article
            state.articleCount=articleInfo.total
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
    },
    actions:{
        getArticle:function(context,pageNum){
            let fd=new FormData()
            fd.append('pageNum',pageNum)
            fetch(GET_ARTICLE,fd).then(function(data){
                context.commit('getArticle',data)
            })
        },
        countAdd:function(context,data){
            let fd=new FormData()
            fd.append('id',data.id)
            fetch(ADD_COUNT,fd).then(function(res){
                if(res==='success'){
                    context.commit('readCountAdd',data)
                }
            })
        },
        thumpAdd:function(context,data){
            let fd=new FormData()
            fd.append('id',data.id)
            fd.append('userName',data.userName)
            fetch(ADD_THUMP).then(function(res){
                if(res==='success'){
                    context.commit('thumpUpAdd',data)
                }else{
                    alert('不可重复点赞')
                }
            })
        },
    }
}