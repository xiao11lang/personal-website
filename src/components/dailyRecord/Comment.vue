<template>
    <div class="commentContainer">
        <div class="commentItem">
        <span :class="['iconfont', commentInfo.fromAvatar]"></span>
        <div class="commentInfo">
            <div>
                <span class="commentName">{{commentInfo.fromName}}</span>
                <div class="commentContent">{{commentInfo.content}}</div>
            </div>
            <div>
                <span class="commentTime">{{commentInfo.commentTime}}</span>
                <input type="text" v-if="showReply"  v-focus v-model="comment" @keyup.enter="publish">
                <span class="reply" @click="reply">{{showReply?'取消':'回复'}}</span>
            </div>
        </div>
    </div>
    <div class="childContainer">
            <ChildComment :childInfo='child' v-for='child in commentInfo.childList' :key='child.commentId' :parentId='commentInfo.commentId'></ChildComment>
        </div>
    </div>
</template>
<script>
import {ADD_COMMENTS} from '../../until/constant.js'
import {mapMutations,mapState,mapActions} from 'vuex'
import ChildComment from './ChildComment'
export default {
    name:'Comment',
    props:['commentInfo'],
    data:function(){
        return {
            showReply:false,
            comment:''
        }
    },
    methods:{
        ...mapActions('daily',['getDaily']),
        reply:function(){
            this.showReply=!this.showReply
        },
        publish:function(){
          if(!this.isLogin){
              alert('请先登录再评论')
              return 
          }
          if(this.comment.trim()===''){
              alert('请输入评论内容')
              return 
          }
          let vm = this;
          let year = new Date().getFullYear();
          let month = new Date().getMonth() + 1;
          let date = new Date().getDate();
          let commentTime =year+"-"+month+'-'+date
          let fd = this.fd({
              commentTime:commentTime,
              dailyId:this.commentInfo.dailyId,
              fromId:this.userId,
              toId:this.commentInfo.fromId,
              content:this.comment,
              parentId:this.commentInfo.commentId
          })
          this.fetch(ADD_COMMENTS,fd).then(function(data){
              vm.comment=''
              vm.getDaily(vm.dailyPage)
          })
      }
    },
    directives:{
        'focus':{
            inserted:function(el){
                el.focus()
            }
        }
    },
    computed:{
        ...mapState(['isLogin','userId']),
        ...mapState('daily',['dailyPage'])
    },
    components:{
        ChildComment
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
