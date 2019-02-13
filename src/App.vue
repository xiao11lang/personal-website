<template>
  <div id="app" @click="hidePop">
    <header>
      <div class="top">
        <div class="topLeft">
          <span class="iconfont icon-atom" @click="toggleBarrage" title="点击开启弹幕"></span>
          <div class="search">
            <input type="text" placeholder="发弹幕" v-model="barrage" @keydown.enter="sendBarrage">
          </div>
          <div class="navTool">
            <router-link to='/dailyRecord' tag='span'>日志</router-link>
            <router-link to='/article' tag='span'>文章</router-link>
            <router-link to='/self' tag='span'>个人中心</router-link>
            <router-link to='/messageBoard' tag='span'>留言板</router-link>
          </div>
        </div>
        <div class="topRight">
          <div v-if="isLogin" class="avatar">
            <span :class="['iconfont',avatar]"></span>
            <span class="iconfont icon-xia" @click.stop="showPop"></span>
          </div>
          <div v-if="!isLogin" class="loginBtn" @click="showLogin">
            <span @click="setLogin(true)">登陆</span>
            <span @click="setLogin(false)">注册</span>
          </div>
        </div>
      </div>
    </header>
    <div class="middle">
      <p>小食蚁螂</p>
      <p>在网络世界穿梭的前端码农 http://www.11lang.cn</p>
    </div>
    <footer><a href="http://www.miitbeian.gov.cn/">皖ICP备17027274号</a></footer>
    <div class="pop" v-if="showpop">
      <p>{{userName}}</p>
      <p @click="showAvatar">修改头像</p>
      <p @click="setLoginState(false)">退出</p>
    </div>
    <div class="weather">
      <div class="info">
        <p>{{weatherInfo.city}}</p>
        <p>{{weatherInfo.date}}</p>
      </div>
      <div class="tem">{{weatherInfo.tem}}</div>
      <img src="./assets/weather.png" alt="">
    </div>
    <router-view></router-view>
    <Login v-if="showlogin" @hide="hideLogin" :loginFlag="loginFlag"></Login>
    <Loading v-if="showLoading" message='加载中'></Loading>
    <Barrage v-if="showBarrage" :newList='newList'></Barrage>
    <Avatar v-if="showavatar" @hide='hideAvatar'/>
  </div>
</template>

<script>
import axios from "axios";
import Login from "./components/Login";
import Loading from './components/Loading'
import Barrage from './components/barrage/Barrage'
import Avatar from './components/Avatar'
import { mapState, mapMutations,mapActions } from "vuex";
export default {
  name: "App",
  data: function() {
    return {
      showpop: false,
      showlogin:false,
      showLoading:true,
      showBarrage:false,
      showavatar:false,
      loginFlag:true,//登陆组件默认展示登陆或注册
      weatherInfo: {
        city: "",
        tem: "",
        date: new Date().getMonth() + 1 + "月" + new Date().getDate() + "日"
      },
      barrage:"",
      newList:[]
    };
  },
  computed: {
    ...mapState(["isLogin",'userName','admin','avatar'])
  },
  methods: {
    showPop: function() {
      this.showpop = true;
    },
    hidePop: function() {
      this.showpop = false;
    },
    showAvatar: function() {
      this.showavatar = true;
    },
    hideAvatar: function() {
      this.showavatar = false;
    },
    showLogin:function(){
      this.showlogin=true
    },
    hideLogin:function(){
      this.showlogin=false
    },
    setLogin:function(flag){
      this.loginFlag=flag
    },
    toggleBarrage:function(){
      let vm=this;
      if(vm.showBarrage===false){
        vm.getBarrage().then(function(){
        vm.showBarrage=true
      })
      }else{
        vm.showBarrage=false
      }
      
      vm.newList=[]
    },
    sendBarrage:function(){
      let vm=this;
      if(this.barrage.trim()!==''){
        let fd=new FormData();
        fd.append('content',this.barrage)
        axios.post('http://www.11lang.cn/api/addBarrage',fd).then(function(res){
          if(res.data==='success'){
            vm.newList.push([vm.barrage])
            /*直接push字符串将导致数组索引增大，弹幕发送的延迟会
            增大，这里用数组嵌套使得每次新增的弹幕无延迟发送*/
            vm.barrage=''
          }
        })
      }
    },
    ...mapMutations(['setLoginState']),
    ...mapActions(['getDaily','getArticle','getMes','getCommer','getBarrage','getSelfInfo'])
  },
  components: {
    Login,Loading,Barrage,Avatar
  },
  mounted: function() {
    var vm = this;
       axios
      .get("http://wthrcdn.etouch.cn/weather_mini?city=%E4%B8%8A%E6%B5%B7")
      .then(function(res) {
        vm.weatherInfo.city = res.data.data.city;
        vm.weatherInfo.tem = res.data.data.wendu;
      },function(err){
        console.log(err)
      });  
       Promise.all([vm.getDaily(),vm.getArticle(),vm.getMes(1),vm.getCommer(),vm.getSelfInfo()]).then(function(){
        vm.showLoading=false;
        vm.$router.push('/dailyRecord')
      }) 
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
  cursor: pointer;
  input{
    cursor: auto
  }
}
body {
  position: relative;
  background-image: url("./assets/bg.png");
  background-size: cover;
  margin-top: 60px;
  padding-bottom: 30px;
}
#app {
  header {
    overflow: hidden;
    position: fixed;
    top: 0;
    height: 60px;
    width: 100%;
    background-color: rgb(36, 41, 46);
    z-index: 10;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      margin: 12px 180px;
      .topLeft {
        display: flex;
        height: 36px;
        .iconfont {
          height: 100%;
          width: 36px;
          border-radius: 50%;
          background-color: white;
          text-align: center;
          &::before {
            font-size: 30px;
          }
        }
        .search {
          width: 300px;
          height: 30px;
          margin: 0 12px;
          input {
            display: inline-block;
            width: 100%;
            height: 100%;
            padding: 0 12px;
            border: none;
            box-sizing: border-box;
            background-color: rgb(64, 68, 72);
            border-radius: 4px;
            color: #ccc;
          }
        }
        .navTool {
          height: 30px;
          color: white;
          line-height: 30px;
          span {
            margin-right: 8px;
          }
        }
      }
      .topRight {
        color: white;
        div {
          height: 36px;
          display: flex;
          align-items: center;
          &.avatar {
            span:first-child {
              margin-right: 8px;
              &::before {
                font-size: 20px;
              }
            }
            span:last-child {
              transform: scale(0.6);
              &::before {
                font-size: 12px;
              }
            }
          }
          &.loginBtn{
            span{
              margin-right: 8px
            }
          }
        }
      }
    }
  }
  .middle {
    margin: 20px 220px;
    color: rgb(38, 112, 154);
    p:first-child {
      font-size: 24px;
      margin-bottom: 12px;
    }
    p:last-child {
      font-size: 12px;
    }
  }
  footer {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    a {
      color: rgb(38, 112, 154);
    }
  }
  .pop {
    position: fixed;
    top: 65px;
    right: 180px;
    width: 150px;
    border: 1px solid #ccc;
    border-bottom: none;
    border-radius: 3px;
    background-color: white;
    z-index: 10;
    p {
      height: 30px;
      line-height: 30px;
      color: #24292e;
      padding-left: 16px;
      border-bottom: 1px solid rgb(231, 231, 231);
    }
  }
  .weather {
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
    padding-right: 180px;
    color: rgb(38, 112, 154);
    .tem {
      font-size: 40px;
      &::after {
        content: "。";
        position: relative;
        display: inline-block;
        top: -26px;
        width: 8px;
      }
    }
    .info {
      font-size: 12px;
      align-self: center;
      margin-left: 10px;
      p {
        margin: 5px;
      }
    }
  }
}
</style>
