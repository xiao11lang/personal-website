<template>
    <div class="recordItem">
        <div class="avatar">
            <span class="iconfont icon-atom"></span>
        </div>
        <div class="content">
            <div class="message">
                <span class="name">小食蚁螂</span>
                <div class="voice">{{info.content}}</div>
            </div>
            <div class="images">
                <img :src="path" alt="" v-for="path in JSON.parse(info.path)" :key='path'>
            </div>
            <div class="time">
                <span>{{parseTime(info.writeTime)}}</span>
                <span v-if="admin" @click="deleteDaily(info.id)" class="delete">删除</span>
            </div>
            <div class="comment">
                <input type="text" placeholder="我也说点什么" v-model="comment" @focus="onFocus">
                <span @click="publish" >评论</span>
            </div>
            <div class="showComment" v-if='info.commentList.length>0' @click="toggleComment">
                <span class="iconfont icon-pinglun" ></span>
                <span>{{commentCount+' 条评论'}}</span>
            </div>
            <div class="commentContainer" v-if="showComment">
                <Comment v-for='comment in info.commentList' :key='comment.commentId' :commentInfo='comment'></Comment>
            </div>
        </div>
    </div>
</template>
<script>
import { DELETE_DAILY} from '../../until/constant.js'
import {mapMutations,mapState,mapActions} from 'vuex'
import Comment from './Comment'
export default {
  name: "RecordItem",
  props:['info','admin'],
  data:function(){
      return {
          comment:'',
          showComment:false
      }
  },
  methods:{
      ...mapMutations(['deleteDailys']),
      ...mapActions(['getDaily']),
      parseTime:function(time){
          let timeArr=time.split('-')
          return timeArr[0]+'年'+timeArr[1]+"月"+timeArr[2]+"日"
      },
      deleteDaily:function(id){
          let that=this;
          let fd=this.fd({
              id:id
          })
          this.fetch(DELETE_DAILY,fd).then(function(data){
              if(data==='success'){
                  that.deleteDailys(id)
              }
          })
          /* axios.post('http://www.11lang.cn/api/deleteDaily',fd).then(function(res){
              if(res.data==='success'){
                  that.deleteDailys(id)
              }
          }) */
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
          fd.append('dailyId',this.info.id)
          fd.append('fromId',this.userId)
          fd.append('toId',1)
          fd.append('content',this.comment)
          fd.append('parentId',0) */
          let fd = this.fd({
              commentTime:commentTime,
              dailyId:this.info.id,
              fromId:this.userId,
              toId:1,
              content:this.comment,
              parentId:0
          })
          axios.post('http://www.11lang.cn/api/addComments',fd).then(function(res){
              vm.comment=''
              vm.getDaily(vm.dailyPage)
          })
      },
      onFocus:function(){
          this.comment=''
      },
      toggleComment:function(){
          this.showComment=!this.showComment
      }
  },
  computed:{
      ...mapState(['isLogin','userId']),
      ...mapState('daily',['dailyPage']),
      commentCount:function(){
          let count=this.info.commentList.length;
          this.info.commentList.forEach(function(comm){
              count+=comm.childList.length
          })
        return count
      }
  },
  components:{
      Comment
  }

};
</script>
<style lang="scss" scoped>
.recordItem {
    display: flex;
    margin-bottom: 20px;
  .avatar {
    span {
      display: inline-block;
      width: 50px;
      height: 54px;
      border: 1px solid #ccc;
      border-radius: 3px;
      line-height: 50px
    }
    span::before {
      font-size: 50px;
    }
  }
  .content {
      margin-left: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
      flex-grow: 1;
      padding: 16px;
    .message {
        display: flex;
        .name{
            margin-right: 12px;
            color: #2595b7
        }
        .voice{
            word-wrap: break-word
        }
    }
    .images {
        margin: 16px 0;
      img {
        width: 200px;
        margin-right: 16px
      }
    }
    .time{
        color: #8c7e83;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        span.delete{
            color: #d6035b
        }
    }
    .comment{
        display: flex;
        margin-top: 10px;
        justify-content: space-between;
        align-items: center;
        input{
            flex-grow: 1;
            margin-right: 20px;
            border: 1px solid rgb(231, 231, 231);
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
        }
    }
    .showComment{
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;
        span:first-child{
            margin-right: 10px
        }
        .iconfont::before{
            font-size: 20px
        }
    }
  }
}
</style>

