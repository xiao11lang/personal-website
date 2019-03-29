<template>
    <div class="newContainer" @click="hide($event)">
        <div class="new">
            <div class="item">
                <span>标题</span>
                <div><input type="text" placeholder="标题" v-model="title"></div>
            </div>
            <div class="item">
                <span>概要</span>
                <div><input type="text" placeholder="概要" v-model="content"></div>
            </div>
            <div class="item">
                <span>类型</span>
                <div><input type="text" placeholder="类型" v-model="type"></div>
            </div>
            <div class="item">
                <span>路径</span>
                <div><input type="text" placeholder="路径" v-model="path"></div>
            </div>
            <div class="item">
                <span>转载</span>
                <input type="checkbox" ref="isOriginal">
            </div>
            <div class="item" @click="newArticle">新建</div>
        </div>
    </div>
    
</template>
<script>
import {mapMutations,mapActions} from 'vuex'
import {ADD_ARTICLE} from '../../until/constant.js'
export default {
  name: "New",
  data: function() {
    return {
      title: "",
      content: "",
      type: "",
      path: "",
      isOriginal: true
    };
  },
  methods: {
    ...mapMutations('article',['addArticle']),
    ...mapActions('article',['getArticle']),
    hide: function(e) {
      if (e) {
        if (e.target != e.currentTarget) {
          return;
        } else {
          this.$emit("hide", false);
        }
      } else {
        this.$emit("hide", false);
      }
    },
    newArticle: function() {
      let vm = this;
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let date = new Date().getDate();
      let writeTime =
        year +
        "-" +
        (month >= 10 ? month : "0" + month) +
        "-" +
        (date >= 10 ? date : "0" + date);
      let fd = vm.fd({
        title:this.title,
        content:this.content,
        type:this.type,
        isOriginal:this.$refs.isOriginal.checked?0:1,
        path:this.path,
        writeTime:writeTime
      })     
      this.fetch(ADD_ARTICLE,fd).then(function(data){
        if (data === "success") {
          vm.getArticle(1)
          vm.hide();
        }
      })
    }
  }
};
</script>
<style lang="scss">
.newContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  .new {
    position: absolute;
    top: 130px;
    right: 50%;
    transform: translateX(50%);
    width: 380px;
    background-color: white;
    border-radius: 6px;
    padding: 20px;
    .item {
      span {
        color: #586069;
      }
      div {
        height: 44px;
        border: 1px solid #ccc;
        margin: 8px 0;
        line-height: 44px;
        &.focus {
          border-color: rgb(33, 166, 255);
        }
        input {
          border: none;
          display: inline-block;
          width: 100%;
          padding-left: 10px;
          box-sizing: border-box;
          color: #586069;
        }
      }
    }
    .item:last-child {
      background: #2ebc4f;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
      border-radius: 4px;
      color: white;
      margin-top: 20px;
      &:hover {
        background: rgb(40, 167, 69);
      }
    }
  }
}
</style>
