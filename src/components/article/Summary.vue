<template>
    <div class="summary" @click="show(info)">
        <div class="title">{{info.title}}</div>
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
import {mapMutations} from 'vuex' 
export default {
    name:"Summary",
    props:['info'],
    methods:{
        show:function(info){
            this.$emit('show')
            this.setArticle(info)
        },
        ...mapMutations(['setArticle'])
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
            color: #0366d6
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
