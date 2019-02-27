<template>
    <div class="commentItem">
        <span :class="['iconfont', commentInfo.fromAvatar]"></span>
        <div class="commentInfo">
            <div>
                <span class="commentName">{{commentInfo.fromName}}</span>
                <div class="commentContent">{{commentInfo.content}}</div>
            </div>
            <div>
                <span class="commentTime">{{commentInfo.commentTime}}</span>
                <input type="text" v-if="showReply">
                <span class="reply" @click="reply">{{showReply?'取消':'回复'}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Comment',
    props:['commentInfo'],
    data:function(){
        return {
            showReply:false
        }
    },
    methods:{
        reply:function(){
            this.showReply=!this.showReply
        }
    }
}
</script>
<style lang="scss" scoped>
    .commentItem{
        display: flex;
        margin-top: 10px;
        border-bottom: 1px solid rgb(231, 231, 231);
        .iconfont::before{
            font-size: 24px
        }
        .commentInfo{
            margin: 0 10px;
            color: #8c7e83;
            width: 100%;
            .commentName{
                color: #2595b7;
                margin-right: 10px;
                min-width: 70px;
            }
            .commentContent{
                word-break: break-all
            }
            &>:first-child{
                display: flex
            }
            &>:last-child{
                margin: 5px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                input{
                    flex-grow: 1;
                    border: 1px solid rgb(231, 231, 231);
                    margin: 0 10px;
                    height: 20px;
                    line-height: 20px;
                    padding-left: 10px;
                }
                .reply{
                    color: #2595b7
                }
            }
        }
    }
</style>
