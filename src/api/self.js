import fetch from './fetch'
import {GET_SELFINFO} from './api'
export const getSelfInfo=()=>fetch({
    url:GET_SELFINFO,
    method:'get',
})