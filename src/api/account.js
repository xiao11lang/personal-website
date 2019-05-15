import fetch from './fetch'
import {REGISTER,LOGIN} from './api'
export const login=(data)=>fetch({
    url:LOGIN,
    method:'post',
    data
})

export const register=(data)=>fetch({
    url:REGISTER,
    method:'post',
    data
})