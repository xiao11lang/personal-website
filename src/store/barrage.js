import fetch from '../until/fetch'
import {GET_BARRAGE} from '../until/constant'
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
            fetch(GET_BARRAGE).then(function(data){
                context.commit('getBarrage',data)
            })
        }
    }
}