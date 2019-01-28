<template>
    <div class="self">
        <div class="selfTop">个人中心</div>
        <div class="selfMain">
            <div class="mainLeft">
                <div class="avatar">
                    <span class="iconfont icon-atom"></span>
                </div>
                <div class="itemCount">
                    <div class="log">
                        <p>{{daily.length}}</p>
                        <p>日志</p>
                    </div>
                    <div class="article">
                        <p>{{article.length}}</p>
                        <p>文章</p>
                    </div>
                    <div class="message">
                        <p>{{mesList.length}}</p>
                        <p>留言</p>
                    </div>
                </div>
                <div class="nav">
                    <div :class="{active:activeIndex===index}" @click="switchIndex(index)" v-for="(item,index) of infoList" :key='item.details[0].infoType'>
                      <span class="iconfont" :class="item.class"></span>
                      {{item.title}}
                    </div>
                    <!-- <div :class="{active:activeIndex===0}" @click="switchIndex(0)"><span class="iconfont icon-jibenziliao"></span>基本资料</div>
                    <div :class="{active:activeIndex===1}" @click="switchIndex(1)"><span class="iconfont icon-xingquaihao"></span>兴趣爱好</div>
                    <div :class="{active:activeIndex===2}" @click="switchIndex(2)"><span class="iconfont icon-jishu"></span>技能经验</div> -->
                </div>
            </div>
            <div class="mainRight">
              <ItemCon  :title='info.title' :subTitle='info.subTitle' :details='info.details'></ItemCon>
            </div>
        </div>
        <div class="selfBottom">
            <span class="iconfont icon-qq1" title="扫描二维码添加我的QQ"></span>
            <span class="iconfont icon-weixin" title="扫描二维码添加我的微信"></span>
            <a class="iconfont icon-Git" href="https://github.com/xiao11lang" target="_blank" title="单击查看我的git"></a>
            <a class="iconfont icon-npm" href="https://www.npmjs.com/~xiao11lang" target="_blank" title="单击查看我的npm"></a>
        </div>
    </div>
</template>
<script>
import ItemCon from './ItemCon'
import { mapState } from "vuex";
export default {
  name: "Self",
  data: function() {
    return {
      activeIndex: 0
    };
  },
  computed:{
    ...mapState(['article','daily','mesList','selfInfo']),
    infoList:function(){
      return Object.values(this.selfInfo)
    },
    info:function(){
      return Object.values(this.selfInfo)[this.activeIndex]
    }
  },
  methods: {
    switchIndex(index) {
      this.activeIndex = index;
    }
  },
  components: {
    ItemCon
  }
};
</script>
<style lang="scss" >
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
      min-width: 128px;
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
      .nav {
        div {
          height: 36px;
          border-bottom: 1px solid rgb(225, 228, 232);
          border-left: 2px solid transparent;
          color: #2595b7;
          line-height: 36px;
          padding-left: 10px;
          .iconfont {
            margin-right: 6px;
          }
          &.active {
            border-left-color: orange;
          }
          &:hover {
            background-color: #f3f5f8;
          }
        }
      }
    }
    .mainRight {
      padding-left: 60px;
      flex-grow: 1;
      background-color: rgb(245, 244, 249);
      .base {
        color: #3d464a;
        .title {
          margin: 20px 0;
          font-size: 20px;
        }
        .subTitle {
          margin-top: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #ccc;
        }
        .itemCon {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      }
    }
  }
  .selfBottom {
    text-align: center;
    padding: 20px 0;
    span,a {
        position: relative;
        margin-right: 20px;
        &::before {
          font-size: 24px;
        }
        &:hover:nth-child(1)::after{
          content: url('../../assets/qq.jpg');
          position: absolute;
          bottom: 25px;
          left: -38px;
        }
        &:hover:nth-child(2)::after{
          content: url('../../assets/wx.png');
          position: absolute;
          bottom: 25px;
          left: -38px;
        }
        
    }
    a{
      color: black;
      text-decoration: none
    }
  }
}
</style>

