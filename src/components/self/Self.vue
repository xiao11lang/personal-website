<template>
    <div class="self">
        <div class="selfTop">个人中心</div>
        <div class="selfMain">
            <div class="mainLeft">
                <div class="avatar">
                    <span class="iconfont icon-atom"></span>
                    <p class="modify">修改头像</p>
                </div>
                <div class="itemCount">
                    <div class="log">
                        <p>1</p>
                        <p>日志</p>
                    </div>
                    <div class="article">
                        <p>1</p>
                        <p>文章</p>
                    </div>
                    <div class="message">
                        <p>3</p>
                        <p>留言</p>
                    </div>
                </div>
                <div class="nav">
                    <div :class="{active:activeIndex===0}" @click="switchIndex(0)">基本资料</div>
                    <div :class="{active:activeIndex===1}" @click="switchIndex(1)">兴趣爱好</div>
                    <div :class="{active:activeIndex===2}" @click="switchIndex(2)">技能经验</div>
                </div>
            </div>
            <div class="mainRight"></div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Self",
  data:function(){
      return {
          activeIndex:0
      }
  },
  methods:{
      switchIndex(index){
          this.activeIndex=index
      }
  }
};
</script>
<style lang="scss" scoped>
.self {
  margin: 30px 180px;
  padding: 0 20px;
  font-size: 14px;
  background-color: white;
  .selfTop {
    height: 50px;
    line-height: 50px;
    color: #2595b7;
    border-bottom: 2px solid rgb(207, 235, 245);
  }
  .selfMain {
    display: flex;
    .mainLeft {
      width: 155px;
      border-right: 1px solid #ccc;
      .avatar {
        text-align: center;
        p {
          text-align: center;
          color: #2595b7;
          margin: 16px 0;
        }
        .iconfont {
          color: rgb(207, 235, 245);
          &::before {
            font-size: 100px;
          }
        }
      }
      .itemCount {
        display: flex;
        margin-right: 20px;
        padding-bottom: 20px;
        div {
          width: 33.3%;
          border-right: 1px solid #ccc;
          &:last-child {
            border-right: none;
          }
          p {
            text-align: center;
            font-family: punctuation;
            &:first-child {
              color: #2595b7;
              font-size: 18px;
            }
            &:last-child {
              font-size: 12px;
              color: #444;
            }
          }
        }
      }
      .nav{
          div{
              height: 36px;
              border-bottom: 1px solid rgb(225, 228, 232);
              border-left: 2px solid transparent;
              color: #2595b7;
              line-height: 36px;
              padding-left: 10px;
              &.active{
                  border-left-color: orange
              }
              &:hover{
                  background-color: #f3f5f8
              }
          }
      }
    }
  }
}
</style>

