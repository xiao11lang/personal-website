<template>
    <div class="childItem">
        <span :class="['iconfont', childInfo.fromAvatar]"></span>
        <div class="childInfo">
            <div>
                <span class="commentName">{{childInfo.fromName}}<span class="nameDivider">回复</span>{{childInfo.toName}}</span>
                <div class="commentContent">{{childInfo.content}}</div>
            </div>
            <div>
                <span class="commentTime">{{childInfo.commentTime}}</span>
                <input type="text" v-if="showReply" v-focus v-model="comment" @keyup.enter="publish">
                <span class="reply" @click="reply">{{showReply?'取消':'回复'}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import {ADD_COMMENTS} from '../../until/constant.js'
import {mapMutations,mapState,mapActions} from 'vuex'
export default {
    name:'ChildComment',
    props:['childInfo','parentId'],
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
          /* fd.append('commentTime',commentTime)
          fd.append('dailyId',this.childInfo.dailyId)
          fd.append('fromId',this.userId)
          fd.append('toId',this.childInfo.fromId)
          fd.append('content',this.comment)
          fd.append('parentId',this.parentId) */
          let fd = this.fd({
              commentTime:commentTime,
              dailyId:this.childInfo.dailyId,
              fromId:this.userId,
              toId:this.childInfo.fromId,
              content:this.comment,
              parentId:this.parentId
          });
          this.fetch(ADD_COMMENTS,fd).then(function(data){
              vm.comment=''
              vm.getDaily(vm.dailyPage)
          })
          /* axios.post('http://www.11lang.cn/api/addComments',fd).then(function(res){
              vm.comment=''
              vm.getDaily(vm.dailyPage)
          }) */
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
}
</script>
<style lang="scss" scoped>
    .childItem{
        display: flex;
        margin-top: 10px;
        margin-left: 20px;
        border-bottom: 1px solid rgb(231, 231, 231);
        .iconfont::before{
            font-size: 24px
        }
        .childInfo{
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
                display: flex;
                .nameDivider{
                    color: #8c7e83;
                    margin: 0 10px
                }
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
