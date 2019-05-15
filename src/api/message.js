import fetch from './fetch'
import {GET_MESSAGE,ADD_MESSAGE,DELETE_MESSAGE} from './api'
export const getMessage=(data)=>fetch({
    url:GET_MESSAGE,
    method:'post',
    data
})
export const addMessage=(data)=>fetch({
    url:ADD_MESSAGE,
    method:'post',
    data
})
export const deleteMessage=(data)=>fetch({
    url:DELETE_MESSAGE,
    method:'post',
    data
})