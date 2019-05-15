import {getBarrage} from '../api/barrage'
export default {
    namespaced:true,
    state:{
        barrageList:[]
    },
    mutations:{
        getBarrage:function(state,barrage){
            state.barrageList=barrage
        }
    },
    actions:{
        getBarrage:function(context){
            getBarrage().then(function(data){
                context.commit('getBarrage',data)
            })
        }
    }
}