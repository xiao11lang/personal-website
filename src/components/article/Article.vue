<template>
    <div class="article">
        <div class="left">
            <div class="top">
                <div class="topItem">
                    <p>原创</p>
                    <p>270</p>
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
            <div class="classification">
                <h3>分类</h3>
                <p><span>vue</span><span>3篇</span></p>
                <p><span>React</span><span>3篇</span></p>
            </div>
            <div class="file">
                <h3>归档</h3>
                <p><span>2018年8月</span><span>3篇</span></p>
                <p><span>2018年7月</span><span>3篇</span></p>

            </div>
            <div class="hot">
                <h3>热门文章</h3>
                <p>React中组件通信的方式</p>
            </div>
        </div>
        <div class="right">
            <div class="select">
                <div class="onlySelf">
                    只看原创
                </div>
                <div class="rules">
                    <span>排序:</span>
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
        padding-right: 20px;
        font-size: 14px;
        background-color: white;
        display: flex;
        .left{
            flex-grow: 1;
            margin-right: 12px;
            .top{
                display: flex;
                height: 44px;
                padding: 16px 10px;
                align-items: center;
                border-bottom: 1px solid rgb(227, 227, 227);
                .topItem{
                    width: 25%;
                    text-align: center;
                    p{
                        color: rgb(51, 51, 51);
                        font-family: "SF Pro Display",Roboto,Noto,Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei"
                    }
                }
            }
            .classification,.file,.hot{
                h3{
                    height: 38px;
                    line-height: 38px;
                    font-size: 12px;
                    background-color: rgb(245, 245, 245);
                    padding-left: 16px;
                    margin-bottom: 8px
                }
                p{
                    padding: 0 16px;
                    margin: 8px 0;
                    display: flex;
                    width: 100%;
                    box-sizing: border-box;
                    justify-content: space-between;
                    span{
                        color:  #ffa200;
                        &:last-child{
                            color: #858585;
                        }
                    }
                }
            }
            .hot{
               p{
                    color:  #ffa200;
                }
            }
        }
        .right{
            max-width: 730px;
            .select{
                display: flex;
                height: 48px;
                padding: 0 24px;
                justify-content: space-between;
                align-items: center;
                .rules{
                    span{
                        margin-left: 16px
                    }
                }
            }
            .summaryCon{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap
            }
        }
    }
</style>
