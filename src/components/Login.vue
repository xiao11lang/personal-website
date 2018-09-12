<template>
    <div class="loginContainer">
        <div class="loginMain">
            <div class="mainTop">
                <div @click="login" :class="{active:logining}">登陆</div>
                <div @click="register" :class="{active:!logining}">注册</div>
            </div>
            <div class="mainBottom login" v-if="logining">
                <div class="item">
                    <span>用户名</span>
                    <div><input type="text" placeholder="请输入用户名"></div>
                </div>
                <div class="item">
                    <span>密码</span>
                    <div><input type="text" placeholder="请输入密码"></div>
                </div>
                <div class="item">
                    登 陆
                </div>
            </div>
            <div class="mainBottom register" v-if="!logining">
                <div class="item">
                    <span>用户名</span>
                    <div><input type="text" placeholder="请输入用户名"></div>
                </div>
                <div class="item">
                    <span>密码</span>
                    <div><input type="password" placeholder="请输入密码"></div>
                </div>
                <div class="item">
                    <span>确认密码</span>
                    <div><input type="password" placeholder="请输入密码"></div>
                </div>
                <div class="item">注 册</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Login",
    data:function(){
        return {
            logining:true
        }
    },
    methods:{
        login:function(){
            this.logining=true
        },
        register:function(){
            this.logining=false
        }
    }
}
</script>
<style lang="scss" scoped>
    .loginContainer{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.2);
        .loginMain{
            position: absolute;
            top: 130px;
            right: 180px;
            width: 380px;
            background-color: white;
            border-radius: 6px;
            .mainTop{
                display: flex;
                div{
                    width: 50%;
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    color: #586069;
                    &:first-child{
                        border-top-left-radius: 6px;
                    }
                    &:last-child{
                        border-top-right-radius: 6px;
                    }
                    &.active{
                        background-color: #2ebc4f
                    }
                }
            }
            .mainBottom{
                padding: 20px;
                box-sizing: border-box;
                .item{
                    span{
                        color: #586069
                    }
                    div{
                        height: 44px;
                        border: 1px solid #ccc;
                        margin: 8px 0;
                        line-height: 44px;
                        input{
                            border: none;
                            display: inline-block;
                            width: 100%;
                            padding-left: 10px;
                            box-sizing: border-box;
                            color: #586069
                        }
                    }
                }
                .item:last-child{
                    background:  #2ebc4f;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    font-size: 20px;
                    border-radius: 4px;
                    color: white;
                    margin-top: 20px;
                    &:hover{
                        background: rgb(40, 167, 69)
                    }
                }
            }
        }
    }
</style>
