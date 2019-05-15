import fetch from './fetch'
import {GET_ARTICLE,ADD_ARTICLE,DELETE_ARTICLE,ADD_COUNT,ADD_THUMP} from './api'
export const getArticle=(data)=>fetch({
    url:GET_ARTICLE,
    method:'post',
    data
})
export const addArticle=(data)=>fetch({
    url:ADD_ARTICLE,
    method:'post',
    data
})
export const deleteArticle=(data)=>fetch({
    url:DELETE_ARTICLE,
    method:'post',
    data
})
export const addCount=(data)=>fetch({
    url:ADD_COUNT,
    method:'post',
    data
})
export const addThump=(data)=>fetch({
    url:ADD_THUMP,
    method:'post',
    data
})