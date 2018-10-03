<template>
    <div class="recordItem">
        <div class="avatar">
            <span class="iconfont icon-atom"></span>
        </div>
        <div class="content">
            <div class="message">
                <span class="name">小食蚁螂</span>
                <div class="voice">我于杀戮之中盛放，亦如黎明的花朵</div>
            </div>
            <div class="images">
                <img src="http://localhost:8090/static/image/test.jpg" alt="">
                <img src="http://localhost:8090/static/image/test.jpg" alt="">
            </div>
            <div class="time">
                2018年10月1日
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "RecordItem"
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
    }
    .images {
        margin: 16px 0;
      img {
        width: 200px;
      }
    }
    .time{
        color: #8c7e83;
        font-size: 12px
    }
  }
}
</style>

