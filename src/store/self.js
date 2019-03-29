import fetch from '../until/fetch'
import {GET_SELFINFO} from '../until/constant'
export default {
    namespaced:true,
    state:{
        selfInfo:{}
    },
    mutations:{
        getSelfInfo:function(state,info){
            state.selfInfo=info
        }
    },
    actions:{
        getSelfInfo:function(context){
            /* return new Promise(function(resolve,reject){
                axios.get('http://www.11lang.cn/api/getSelfInfo').then(function(res){
                    context.commit('getSelfInfo',res.data)
                    resolve()
                    })
            }) */
            fetch(GET_SELFINFO).then(function(data){
                context.commit('getSelfInfo',data)
            })
        },
    }
}