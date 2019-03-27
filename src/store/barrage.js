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
            /* return new Promise(function(resolve,reject){
                axios.get('http://www.11lang.cn/api/getBarrage').then(function(res){
                    context.commit('getBarrage',res.data)
                    resolve()
                    })
            }) */
            fetch(GET_BARRAGE).then(function(data){
                context.commit('getBarrage',data)
            })
        }
    }
}