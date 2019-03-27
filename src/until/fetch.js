import axios from 'axios'
export default function fetch(url,data){
    if(!data){
        return new Promise(function(resolve,reject){
            axios.get(url).then(function(res){
                resolve(res.data)
            }).catch(function(err){
                reject(err)
            })
        })
    }else{
        return new Promise(function(resolve,reject){
            axios.post(url,data).then(function(res){
                resolve(res.data)
            }).catch(function(err){
                reject(err)
            })
        })
    }
}