<template>
    <div class="message">
        <div class="mesLeft">
            <span class="iconfont icon-Git"></span>
        </div>
        <div class="mesRight">
            <div class="mesTop">
                <span class="userName">{{info.userName}}</span>
                <span class="number">第{{index}}楼</span>
            </div>
            <div class="mesMiddle" v-html="info.content">
                
            </div>
            <div class="mesBottom">
                {{info.time}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Message",
  props:['info','index']
};
</script>
<style lang="scss" scoped>
.message {
    display: flex;
    padding: 20px 12px;
    border-bottom: 1px solid rgb(207, 235, 245);
  .mesLeft {
      margin-right: 16px;
    span {
      &::before {
        font-size: 50px;
      }
    }
  }
  .mesRight{
      flex-grow: 1;
      .mesTop{
          .userName{
              color: #2595b7
          }
          .number{
              color: #9B9B9B;
              font-size: 12px;
          }
      }
      .mesMiddle{
          margin-top: 12px;
          min-height: 100px;
      }
      .mesBottom{
          color: #9B9B9B;
          font-size: 12px;
      }
  }
}
</style>
