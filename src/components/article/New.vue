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
import axios from "axios";
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
      let fd = new FormData();
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let date = new Date().getDate();
      let writeTime =
        year +
        "-" +
        (month >= 10 ? month : "0" + month) +
        "-" +
        (date >= 10 ? date : "0" + date);
      fd.append("title", this.title);
      fd.append("content", this.content);
      fd.append("type", this.type);
      fd.append("isOriginal", this.$refs.isOriginal.checked);
      fd.append("path", this.path);
      fd.append("writeTime", writeTime);
      axios.post("api/newArticle", fd).then(function(res) {
        if (res.data === "success") {
          vm.hide();
        }
      });
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
