<template>
    <div class="messageBoard">
        <div class="mesTop">留言板</div>
        <div class="mesSendTitle">主人寄语</div>
        <div class="mesSendBody">
          有朋自远方来，不亦说乎
        </div>
        <div class="writeBoardCon">
            <div class="boardTitle">
                <span>发表您的留言</span>
            </div>
            <div class="board" contenteditable="true" ref="content"></div>
            <div class="button" @click="publish">发表</div>
        </div>
        <div class="messageCon">
            <div class="mesCount">留言({{mesList.length}})</div>
        </div>
        <Message v-for="(mes,index) of mesListOrder" :key="mes.time+index" :info="mes" :index='mesList.length-index'></Message>
        <Loading v-if="showLoading" message='发表中'></Loading>
    </div>
</template>
<script>
import Message from "./Message";
import Loading from '../Loading'
import axios from "axios";
import { mapState,mapActions,mapMutations } from "vuex";
export default {
  name: "MessageBoard",
  data: function() {
    return {
      showLoading:false
    };
  },
  components: {
    Message,Loading
  },
  computed: {
    ...mapState(["isLogin", "userName",'mesList']),
    mesListOrder: function() {
      let vm = this;
      /* return this.mesList.sort(function(a, b) {
        return -vm.toNumber(a.time) + vm.toNumber(b.time);
      }); */
      return this.mesList.reverse()
    }
  },
  methods: {
    ...mapActions(['getMes']),
    ...mapMutations(['mesAdd']),
    publish: function() {
      if (!this.isLogin) {
        alert("请先登录");
        return;
      }
      if (this.$refs.content.innerHTML.trim() === "") {
        alert("请输入留言内容");
        return;
      } else {
        let fd = new FormData();
        let vm = this;
        let time=new Date()
        fd.append("userName", vm.userName);
        fd.append("content", vm.$refs.content.innerHTML);
        fd.append("time", vm.parse(time));
        vm.showLoading=true
        axios.post("api/message", fd).then(function(res) {
          vm.mesAdd({
            userName: vm.userName,
            content: vm.$refs.content.innerHTML,
            time: vm.parse(time)
          });
          vm.$refs.content.innerHTML=''
          vm.showLoading=false
        });
      }
    },
    parse: function(time) {
      let dateArr=time.toLocaleDateString().split('/')
      let dateStr = dateArr[0]+'-'+this.withZero(dateArr[1])+'-'+this.withZero(dateArr[2])
      let timeStr =this.withZero(time.getHours()) + ":" + this.withZero(time.getMinutes());
      return dateStr + " " + timeStr;
    },
    withZero: function(str) {
      if (str >= 10) {
        return str;
      } else {
        return "0" +""+ str;
      }
    },
    toNumber: function(str) {
      return parseInt(
        str
          .split(" ")[0]
          .split("-")
          .join("") +''+
          str
            .split(" ")[1]
            .split(":")
            .join("")
      );
    }
  },
  
};
</script>
<style lang="scss" scoped>
.messageBoard {
  margin: 30px 180px;
  padding: 0 20px;
  font-size: 14px;
  background-color: white;
  .mesTop {
    height: 50px;
    line-height: 50px;
    color: #2595b7;
    border-bottom: 2px solid rgb(207, 235, 245);
  }
  .mesSendTitle {
    height: 36px;
    line-height: 36px;
    color: #444;
    font-weight: 700;
    font-family: Tahoma;
    border-bottom: 1px solid rgb(207, 235, 245);
  }
  .mesSendBody {
    padding-top: 16px;
    height: 150px;
    color: #444;
    font-size: 12px;
    font-family: Tahoma;
  }
  .writeBoardCon {
    .boardTitle {
      height: 36px;
      line-height: 36px;
      color: #444;
      font-weight: 700;
      font-family: Tahoma;
    }
    .board {
      height: 150px;
      padding-left: 10px;
      border: 1px solid #ccc;
    }
    .button {
      height: 28px;
      width: 72px;
      background-color: #6acdea;
      color: white;
      text-align: center;
      line-height: 28px;
      margin-top: 6px;
      border-radius: 2px;
    }
  }
  .messageCon {
    .mesCount {
      height: 36px;
      line-height: 36px;
      color: #444;
      font-weight: 700;
      font-family: Tahoma;
      border-bottom: 1px solid rgb(207, 235, 245);
    }
  }
}
</style>

