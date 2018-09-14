<template>
    <div class="loginContainer" @click="hide">
        <div class="loginMain">
            <div class="mainTop">
                <div @click="switchLogin" :class="{active:logining}">登陆</div>
                <div @click="switchRegister" :class="{active:!logining}">注册</div>
            </div>
            <div class="mainBottom login" v-if="logining">
                <div class="item">
                    <span>用户名</span>
                    <div :class="{focus:index==1}"><input type="text" placeholder="请输入用户名" @blur="blur"  @focus="focus(1)" v-model="login_userName"></div>
                </div>
                <div class="item">
                    <span>密码</span>
                    <div :class="{focus:index==2}"><input type="password" placeholder="请输入密码" @blur="blur" @focus="focus(2)" v-model="login_pass"></div>
                </div>
                <div class="item" @click="login">
                    登 陆
                </div>
            </div>
            <div class="mainBottom register" v-if="!logining">
                <div class="item">
                    <span>用户名</span>
                    <div :class="{focus:index==1}"><input type="text" placeholder="请输入用户名" @blur="blur"  @focus="focus(1)" v-model="reg_userName"></div>
                </div>
                <div class="item">
                    <span>密码</span>
                    <div :class="{focus:index==2}"><input type="password" placeholder="请输入密码" @blur="blur" @focus="focus(2)" v-model="reg_pass"></div>
                </div>
                <div class="item">
                    <span>确认密码</span>
                    <div :class="{focus:index==3}"><input type="password" placeholder="请确认密码" @blur="blur" @focus="focus(3)" v-model="reg_con_pass"></div>
                </div>
                <div class="item" @click="register">注 册</div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data: function() {
    return {
      index: "",
      login_userName: "",
      login_pass: "",
      reg_userName: "",
      reg_pass: "",
      reg_con_pass: "",
      logining: true
    };
  },
  props: ["loginFlag"],
  methods: {
    ...mapMutations(["setLoginState", "setUserInfo"]),
    switchLogin: function() {
      this.logining = true;
    },
    switchRegister: function() {
      this.logining = false;
    },
    login: function() {
      let vm = this;
      if (this.login_userName.trim().length === 0) {
        alert("请输入用户名");
        return;
      } else if (this.login_pass.trim().length === 0) {
        alert("请输入密码");
        return;
      } else {
        let fd = new FormData();
        fd.append("userName", this.login_userName.trim());
        fd.append("password", this.login_pass);
        axios.post("http://localhost:3000/login", fd).then(function(res) {
          switch (res.data) {
            case "not_exist":
              alert("用户名不存在");
              return;
            case "pass_error":
              alert("密码错误");
              return;
            case "success":
              vm.setLoginState(true);
              vm.setUserInfo({ userName: vm.login_userName, admin: false });
              vm.$emit("hide");
          }
        });
      }
    },
    register: function() {
      let nameReg = /^([\u4E00-\u9FA5]|[a-zA-Z0-9_]){2,10}$/;
      let passReg = /^([a-zA-Z0-9]){6,16}$/;
      let vm = this;
      if (this.reg_userName.trim().length === 0) {
        alert("用户名不可为空");
        return;
      }
      if (
        this.reg_pass.trim().length === 0 ||
        this.reg_con_pass.trim().length === 0
      ) {
        alert("密码不可为空");
        return;
      }
      if (this.reg_pass !== this.reg_con_pass) {
        alert("两次密码不一致");
        return;
      }
      if (!this.reg_userName.match(nameReg)) {
        alert("用户名仅可为2-10位的数字、字母和汉字");
        return;
      }
      if (!this.reg_pass.match(passReg)) {
        alert("密码格式有误，仅可为6-16位的字母或数字");
        return;
      } else {
        let fd = new FormData();
        fd.append("userName", this.reg_userName);
        fd.append("password", this.reg_pass);
        axios.post("http://localhost:3000/register", fd).then(function(res) {
          switch (res.data) {
            case "exist":
              alert("用户名已经存在");
              vm.reg_userName = "";
              return;
            case "success":
              vm.setLoginState(true);
              vm.setUserInfo({ userName: vm.reg_userName, admin: false });
              vm.$emit("hide");
          }
        });
      }
    },
    focus: function(index) {
      this.index = index;
    },
    blur: function() {
      this.index = "";
    },
    hide: function(e) {
      if (e.target != e.currentTarget) {
        return;
      } else {
        this.$emit("hide");
      }
    }
  },
  mounted: function() {
    if (this.loginFlag) {
      this.switchLogin();
    } else {
      this.switchRegister();
    }
  }
};
</script>
<style lang="scss" scoped>
.loginContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  .loginMain {
    position: absolute;
    top: 130px;
    right: 180px;
    width: 380px;
    background-color: white;
    border-radius: 6px;
    .mainTop {
      display: flex;
      div {
        width: 50%;
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #586069;
        &:first-child {
          border-top-left-radius: 6px;
        }
        &:last-child {
          border-top-right-radius: 6px;
        }
        &.active {
          background-color: #2ebc4f;
        }
      }
    }
    .mainBottom {
      padding: 20px;
      box-sizing: border-box;
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
}
</style>
