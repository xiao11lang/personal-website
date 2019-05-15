import Vue from 'vue'
import Vuex from 'vuex'
import daily from './daily'
import barrage from './barrage'
import article from './article'
import message from './message'
import self from './self'
import axios from "axios"
import {getCommer} from '../api/daily'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        daily:daily,
        barrage:barrage,
        article:article,
        message:message,
        self:self
    },
    state:{
        isLogin:false,
        userName:'',
        admin:false,
        userId:1,
        avatar:'icon-git',
        commers:[],
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
        getCommer:function(state,commer){
            state.commers=commer
        },
        
    },
    actions:{
        
        getCommer:function(context){
            return getCommer().then(function(res){
                context.commit('getCommer',res.data)
                })
            /* return new Promise(function(resolve,reject){
                axios.get('http://www.11lang.cn/api/getCommer').then(function(res){
                    context.commit('getCommer',res.data)
                    resolve()
                    })
            }) */
             
        }
    }
})