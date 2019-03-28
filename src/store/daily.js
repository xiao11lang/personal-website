import fetch from '../until/fetch'
import { GET_DAILY} from '../until/constant'
export default {
    namespaced:true,
    state:{
        daily:[],
        dailyCount:0,
        dailyPage:1,
    },
    mutations:{
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
        }
    },
    actions:{
        getDaily:function(context,pageNum){
            let fd=new FormData()
            fd.append('pageNum',pageNum)
            fetch(GET_DAILY,fd).then(function(data){
                context.commit('getDaily',data)
            })
            /* return new Promise(function(resolve,reject){
                axios.post('http://www.11lang.cn/api/getDaily',fd).then(function(res){
                    context.commit('getDaily',res.data)
                    resolve()
                    }).catch(function(e){
                        reject(e)
                    })
            }) */
             
        },
    }
}