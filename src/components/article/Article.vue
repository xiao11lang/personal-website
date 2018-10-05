<template>
    <div class="article">
        <div class="left">
            <div class="top">
                <div class="topItem">
                    <p>原创</p>
                    <p>{{totalInfo.original}}</p>
                </div>
                <div class="topItem">
                    <p>转载</p>
                    <p>{{totalInfo.reprint}}</p>
                </div>
                <div class="topItem">
                    <p>点赞</p>
                    <p>{{totalInfo.thumpUp}}</p>
                </div>
                <div class="topItem">
                    <p>阅读</p>
                    <p>{{totalInfo.readCount}}</p>
                </div>
            </div>
            <div class="classification">
                <h3 @click="setFilter('')">分类</h3>
                <p v-for="(item,key) of totalInfo.typeList" :key='key' @click="setFilter({type:'type',value:key})"><span>{{key}}</span><span>{{item}}篇</span></p>
            </div>
            <div class="file">
                <h3 @click="setFilter('')">时间线</h3>
                <p v-for="(item,key) of totalInfo.timeList" :key='key' @click="setFilter({type:'writeTime',value:key})"><span>{{key}}</span><span>{{item}}篇</span></p>

            </div>
            <div class="hot" >
                <h3>热门文章</h3>
                <p >React中组件通信的方式</p>
            </div>
        </div>
        <div class="right" v-if="showSummary">
            <div class="select">
                <div class="onlySelf" @click="watchOriginal()">
                    只看原创
                    <span :class="{active:onlySelf}"></span>
                </div>
                <div class="rules">
                    <span >排序:</span>
                    <span @click="changeRule('thump')" :class='{inSort:sortRule==="thump"}'>按点赞数</span>
                    <span @click="changeRule('count')" :class='{inSort:sortRule==="count"}'>按阅读数</span>
                    <span @click="changeRule('time')" :class='{inSort:sortRule==="time"}'>按时间</span>
                </div>
            </div>
            <div class="summaryCon" >
                <Summary :info='info' v-for="(info,index) in articleShow" :key='info.title+index' @show='showDetail({id:info._id,readCount:info.readCount+1})'></Summary>
            </div>
            <div class="newArticle" v-if="admin" @click="showNewArticle(true)">新建</div>
        </div>
        <Detail v-if="!showSummary" @hide='hideDetail'></Detail>
        <New v-if="showNew" @hide='showNewArticle'></New>
    </div>
    
</template>
<script>
import Summary from "./Summary";
import Detail from "./Detail";
import New from './New'
import { mapActions, mapState,mapMutations } from "vuex";
import { getInfo, timeStr } from "./getInfo.js";
export default {
  name: "Article",
  data: function() {
    return {
      onlySelf: false,
      showSummary: true,
      showNew:false,
      sortRule: "time",
      totalInfo: {},
      filter: ""
    };
  },
  components: {
    Summary,
    Detail,
    New
  },
  computed: {
    ...mapState(["article",'admin']),
    articleShow: function() {
      let onlySelfArticle = [];
      let filterArticle = [];
      let onlySelf = this.onlySelf;
      let vm = this;
      if (this.onlySelf) {
        onlySelfArticle = this.article.filter(function(article) {
          return article.isOriginal === onlySelf;
        });
      } else {
        onlySelfArticle = this.article;
      }
      if (this.filter != "") {
        if (vm.filter.type == "writeTime") {
          filterArticle = onlySelfArticle.filter(function(art) {
            return timeStr(art[vm.filter.type]) == vm.filter.value;
          });
        } else {
          filterArticle = onlySelfArticle.filter(function(art) {
            return art[vm.filter.type] == vm.filter.value;
          });
        }
      } else {
        filterArticle = onlySelfArticle;
      }
      switch (this.sortRule) {
        case "time":
          return filterArticle.sort(function(a1, a2) {
            return (
              a2.writeTime.split("-").join("") -
              a1.writeTime.split("-").join("")
            );
          });
        case "count":
          return filterArticle.sort(function(a1, a2) {
            return a2.readCount - a1.readCount;
          });
        case "thump":
          return filterArticle.sort(function(a1, a2) {
            return a2.thumpUp - a1.thumpUp;
          });
      }
    }
  },
  methods: {
    ...mapActions(["getArticle",'countAdd']),
    ...mapMutations(['readCountAdd']),
    changeRule: function(rule) {
      this.sortRule = rule;
    },
    showDetail: function(data) {
      this.showSummary = false;
      //this.readCountAdd(id)
      this.countAdd(data)
    },
    hideDetail: function(id) {
      this.showSummary = true;
    },
    showNewArticle: function(flag) {
      this.showNew = flag;
    },
    watchOriginal: function() {
      this.onlySelf = !this.onlySelf;
    },
    setFilter: function(filter) {
      this.filter = filter;
    }
  },
  mounted: function() {
    let vm = this;
    this.getArticle().then(function() {
      vm.totalInfo = getInfo(vm.article);
    });
  }
};
</script>
<style lang="scss" scoped>
.article {
  margin: 30px 180px;
  font-size: 14px;
  background-color: white;
  min-width: 750px;
  display: flex;
  .left {
    border-right: 1px solid #e1e4e8;
    min-width: 200px;
    max-width: 260px;
    .top {
      display: flex;
      height: 44px;
      padding: 16px 10px;
      align-items: center;
      border-bottom: 1px solid rgb(227, 227, 227);
      .topItem {
        width: 25%;
        text-align: center;
        p {
          color: rgb(51, 51, 51);
          font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
            "Hiragino Sans GB", "Microsoft YaHei";
        }
      }
    }
    .classification,
    .file,
    .hot {
      h3 {
        height: 38px;
        line-height: 38px;
        font-size: 12px;
        background-color: rgb(245, 245, 245);
        padding-left: 16px;
        margin-bottom: 8px;
      }
      p {
        padding: 0 16px;
        margin: 8px 0;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
        span {
          color: #ffa200;
          &:last-child {
            color: #858585;
          }
        }
      }
    }
    .hot {
      p {
        color: #ffa200;
      }
    }
  }
  .right {
    //max-width: 730px;
    min-width: 400px;
    flex-grow: 1;
    .select {
      display: flex;
      height: 48px;
      padding: 0 24px;
      margin-bottom: 20px;
      justify-content: space-between;
      border-bottom: 1px solid #e1e4e8;
      align-items: center;
      .onlySelf {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border: 1px solid #ccc;
          margin-left: 6px;
          background-color: transparent;
          background-clip: content-box;
          padding: 2px;
          &.active {
            background-color: rgb(92, 228, 0);
          }
        }
      }
      .rules {
        span {
          margin-left: 16px;
          &.inSort {
            color: #0366d6;
          }
        }
      }
    }
    .summaryCon {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
    .newArticle{
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
}
</style>
