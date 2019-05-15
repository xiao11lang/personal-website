import fetch from './fetch'
import {GET_DAILY,ADD_DAILY,DELETE_DAILY,ADD_COMMENTS,GET_COMMER,ADD_COMMER} from './api'
export const getDaily=(data)=>fetch({
    url:GET_DAILY,
    method:'post',
    data
})
export const addDaily=(data)=>fetch({
    url:ADD_DAILY,
    method:'post',
    data
})
export const deleteDaily=(data)=>fetch({
    url:DELETE_DAILY,
    method:'post',
    data
})
export const addComments=(data)=>fetch({
    url:ADD_COMMENTS,
    method:'post',
    data
})
export const getCommer=()=>fetch({
    url:GET_COMMER,
    method:'get',
})
export const addCommer=(data)=>fetch({
    url:ADD_COMMER,
    method:'post',
    data
})