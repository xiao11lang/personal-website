<template>
    <div class="article">
        <div class="left">
            <div class="top">
                <div class="topItem">
                    <p>原创</p>
                    <p>0</p>
                </div>
                <div class="topItem">
                    <p>转载</p>
                    <p>0</p>
                </div>
                <div class="topItem">
                    <p>点赞</p>
                    <p>0</p>
                </div>
                <div class="topItem">
                    <p>阅读</p>
                    <p>0</p>
                </div>
            </div>
            <div class="Classification">
                <p>vue</p>
                <p>react</p>
            </div>
            <div class="file">
                <p>2018年8月</p>
                <p>2018年7月</p>

            </div>
            <div class="hot">
                <p>React中组件通信的方式</p>
            </div>
        </div>
        <div class="right">
            <div class="select">
                <div class="onlySelf">
                    只看原创
                </div>
                <div class="rules">
                    <span>排序</span>
                    <span>按点赞数</span>
                    <span>按阅读数</span>
                    <span>按时间</span>
                </div>
            </div>
            <div class="summaryCon">
                <Summary :info='info' v-for="(info,index) in article" :key='info.title+index'></Summary>
            </div>
        </div>
        
    </div>
    
</template>
<script>
import Summary from './Summary'
import {mapActions,mapState} from 'vuex'
export default {
    name:"Article",
    data:function(){
        return {
            got:false
        }
    },
    components:{
        Summary
    },
    computed:{
        ...mapState(['article'])
    },
    methods:{
        ...mapActions(['getArticle'])
    },
    mounted:function(){
        if(this.got){
            return
        }else{
            this.getArticle()
        }
    }
}
</script>
<style lang="scss" scoped>
    .article{
        margin: 30px 180px;
        padding: 0 20px;
        font-size: 14px;
        background-color: white;
        display: flex;
        .left{
            flex-grow: 1;
            .top{
                display: flex
            }
        }
        .right{
            max-width: 730px;
            .select{
                display: flex;
            }
            .summaryCon{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap
            }
        }
    }
</style>
