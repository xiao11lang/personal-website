<template>
    <div class="dailyRecord">
        <div class="left">
            <RecordItem v-for="(item,index) in daily" :key='index' :info='item' :admin='admin'></RecordItem>
            <div class="newDaily" @click="showNew(true)" v-if='admin'>新建</div>
            <Page :totalCount='dailyCount' v-if="dailyCount>10" @onChange='change($event)'></Page>
        </div>
        <div class="right">
          <div class="top">
            <div class="bigAvatar iconfont icon-atom"></div>
            <div class="message">
              <p>小食蚁螂</p>
              <p>
                <span>{{dailyCount}}</span><span>条日志</span>
              </p>
            </div>
          </div>
          <div class="bottom">
            <p >最近访客</p>
            <p v-for="(commer,index) in sortCommers" :key='index' class="commer">{{commer}}</p>
          </div>
        </div>
        <New @hide='showNew(false)' v-if="showNewDaily"></New>
    </div>
</template>
<script>
import RecordItem from "./RecordItem";
import Page from '../Page'
import { mapActions, mapState, mapMutations } from "vuex";
import New from "./New";
export default {
  name: "DailyRecord",
  components: {
    RecordItem,
    New,
    Page
  },
  data: function() {
    return {
      showNewDaily: false,
      pageValue:1
    };
  },
  computed: {
    ...mapState(["admin",'commers']),
    ...mapState('daily',['daily','dailyCount']),
    
    sortCommers:function(){
      return [...new Set(this.commers.reverse().slice(0,10).map(function(com){
        return com.commerName
      }))]
    }
  },
  methods: {
    change:function(val){
      this.getDaily(val)
      this.setDailyPage(val)
    },
    showNew: function(flag) {
      this.showNewDaily = flag;
    },
    ...mapActions('daily',["getDaily"]),
    ...mapMutations('daily',['setDailyPage'])
  },
};
</script>
<style lang="scss" scoped>
.dailyRecord {
  margin: 30px 180px;
  font-size: 14px;
  background-color: white;
  min-width: 750px;
  display: flex;
  padding: 20px;
  .left {
    flex-grow: 1;
    .newDaily {
      width: 30%;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: white;
      background: #2ebc4f;
      margin: 0 auto;
      margin-bottom: 20px;
      &:hover {
        background: rgb(40, 167, 69);
      }
      border-radius: 3px;
    }
  }
  .right {
    min-width: 250px;
    padding-left: 40px;
    .top {
      display: flex;
      padding-bottom: 20px;
      border-bottom: 1px solid rgb(221, 237, 240);
      margin-bottom: 20px;

      .bigAvatar {
        border: 1px solid #ccc;
        width: 94px;
        height: 94px;
        text-align: center;
        border-radius: 8px;
        &::before {
          font-size: 80px;
        }
      }
      .message {
        margin-left: 10px;
        p:nth-child(1) {
          font-weight: 700;
          font-size: 14px;
        }
        p:nth-child(2) {
          span:nth-child(1) {
            font-size: 20px;
            color: #157c8c;
          }
        }
      }
    }
    .bottom{
      p{
        color:#157c8c
      }
      p.commer{
        color: black;
        margin-top: 4px
      }
    }
  }
}
</style>

