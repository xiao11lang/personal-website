import {getSelfInfo} from '../api/self'
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
            getSelfInfo().then(function(data){
                context.commit('getSelfInfo',data)
            })
        },
    }
}