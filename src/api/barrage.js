import fetch from './fetch'
import {GET_BARRAGE,ADD_BARRAGE} from './api'
export const getBarrage=()=>fetch({
    url:GET_BARRAGE,
    method:'get',
})
export const addBarrage=(data)=>fetch({
    url:ADD_BARRAGE,
    method:'post',
    data
})