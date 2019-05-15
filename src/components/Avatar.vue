<template>
    <div class="changeAvatar" @click="hide">
        <div class="main">
            <div class="avatarCon">
                <span v-for='(avatar,index) in avatarList' :key='avatar' 
                :class="['iconfont',avatar,index==selectIndex?'select':'']" @click="select(index)"></span>
            </div>
            <div class="button" @click="modifyAvatar">更换</div>
        </div>
        
    </div>
</template>
<script>
import {modifyAvatar} from '../api/avatar.js'
import {mapState,mapMutations} from 'vuex'
export default {
    name:"Avatar",
    data:function(){
        return {
            avatarList:['icon-shu','icon-niu','icon-hu','icon-tuzi','icon-long','icon-she',
            'icon-1','icon-yang','icon-houzi','icon-ji','icon-gou','icon-zhu','icon-mao',
            'icon-kaola','icon-hippo','icon-weibiaoti-','icon-xiongmao','icon-dongman'],
            selectIndex:null
        }
    },
    methods:{
        select:function(index){
            this.selectIndex=index
        },
        hide:function(e){
            if(e.target==e.currentTarget){
                this.$emit('hide')
            }
        },
        modifyAvatar:function(){
            if(this.selectIndex!=null){
                let avatar=this.avatarList[this.selectIndex]
                let fd=this.fd({
                    userName:this.userName,
                    avatar:avatar
                })
                modifyAvatar(fd).then(()=>{
                    this.setAvatar(avatar)
                    this.$emit('hide')
                })
                
            }
            
        },
        ...mapMutations(['setAvatar'])
    },
    computed:{
        ...mapState(['userName'])
    }
}
</script>
<style lang="scss" scoped>
    .changeAvatar{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        .main{
            position: absolute;
            top: 30%;
            left: 50%;
            width: 30%;
            transform: translate(-50%);
            min-width: 410px;
            background-color: white;
            .avatarCon{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                color: black;
                span{
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                }
                span:hover{
                    background-color: #ccc;
                }
                span.select{
                    background-color: #ccc;
                }
                span::before{
                    font-size: 40px
                }
            }
            .button{
                text-align: center;
                background: #2ebc4f;
                margin: 10px 20px;
                border-radius: 4px;
                height: 30px;
                line-height: 30px;
                color: white;
                &:hover{
                    background: rgb(40, 167, 69)
                }
            }
        }
    }
</style>
