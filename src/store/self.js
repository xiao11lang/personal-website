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
            fetch(GET_SELFINFO).then(function(data){
                context.commit('getSelfInfo',data)
            })
        },
    }
}