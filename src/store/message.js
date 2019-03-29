import {GET_MESSAGE} from '../until/constant'
import fetch from '../until/fetch'
export default {
    namespaced:true,
    state:{
        mesList:[],
        mesCount:0,
    },
    mutations:{
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
        }
    },
    actions:{
        getMes:function(context,pageNum){
            let fd=new FormData()
            fd.append('pageNum',pageNum)
            return fetch(GET_MESSAGE,fd).then(function(data){
                context.commit('getMes',data)
            })
        }
    }
}