<template>
    <div class="summary">
        <div class="title">jstraning</div>
        <div class="content">全栈工程师培训资料</div>
        <div class="extraInfo">
            <div class="typeCon">
               <span class="iconfont icon-yuan"></span>
               <span class="type">javascript</span> 
            </div>
            <div class="upCon">
                <span class="iconfont icon-aixin"></span>
                <span class="thumpUp">131</span>
            </div>
            <div class="countCon">
                <span class="iconfont icon-kanguo"></span>
                <span class="readCount">124</span>
            </div>
            <div class="timeCon">
                <span class="writeTime">2018-12</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Summary"
}
</script>
<style lang="scss" scoped>
    .summary{
        width: 360px;
        height: 130px;
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
