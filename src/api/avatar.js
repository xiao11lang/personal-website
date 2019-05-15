import fetch from './fetch'
import {Modify_Avatar} from './api'
export const modifyAvatar=(data)=>fetch({
    url:Modify_Avatar,
    method:'post',
    data
})