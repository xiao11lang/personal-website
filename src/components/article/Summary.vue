<template>
    <div class="summary" @click="show(info)">
        <div class="title">
            <span>{{(info.isOriginal?'原 ':"转 ")+info.title}}</span>
            <span @click.stop="deleteArticle(info.id)" v-if="admin" class="delete">删除</span>
        </div>
        <div class="content">{{info.content}}</div>
        <div class="extraInfo">
            <div class="typeCon">
               <span class="iconfont icon-yuan"></span>
               <span class="type">{{info.type}}</span> 
            </div>
            <div class="upCon">
                <span class="iconfont icon-aixin"></span>
                <span class="thumpUp">{{info.thumpUp}}</span>
            </div>
            <div class="countCon">
                <span class="iconfont icon-kanguo"></span>
                <span class="readCount">{{info.readCount}}</span>
            </div>
            <div class="timeCon">
                <span class="writeTime">{{info.writeTime}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import {deleteArticle} from '../../api/article.js'
import {mapMutations,mapState} from 'vuex' 
export default {
    name:"Summary",
    props:['info'],
    methods:{
        show:function(info){
            this.$emit('show')
            this.setArticle(info)
        },
        deleteArticle:function(id){
            let fd=this.fd({
                id:id
            })
            deleteArticle(fd).then(function(res){
                if(res==='success'){
                }
            }).catch(function(){
                alert('删除失败')
            })
        },
        ...mapMutations('article',['setArticle'])
    },
    computed:{
        ...mapState(['admin'])
    }
}
</script>
<style lang="scss" scoped>
    .summary{
        min-width: 360px;
        height: 130px;
        margin-bottom: 16px;
        border: 1px #e1e4e8 solid;
        padding: 16px;
        box-sizing: border-box;
        border-radius: 3px;
        .title{
            color: #0366d6;
            display: flex;
            justify-content: space-between;
            span.delete{
                color: #d6035b
            }
        }
        .content{
            color: #586069;
            margin: 8px 0 16px 0;
            font-size: 12px;
            height: 36px
        }
        .extraInfo{
            display: flex;
            color: #586069;
            div{
                margin-right: 16px;
                
                span:before{
                    font-size: 12px
                }
                &:nth-child(3){
                    span::before{
                        font-size: 16px
                    }
                }
            }
        }
    }
</style>
