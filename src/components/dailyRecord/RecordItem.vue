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
                <img :src="'http://localhost:8090/static/image/'+path" alt="" v-for="path in info.path" :key='path'>
            </div>
            <div class="time">
                {{parseTime(info.writeTime)}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "RecordItem",
  props:['info'],
  methods:{
      parseTime:function(time){
          let timeArr=time.split('-')
          return timeArr[0]+'年'+timeArr[1]+"月"+timeArr[2]+"日"
      }
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
        font-size: 12px
    }
  }
}
</style>

