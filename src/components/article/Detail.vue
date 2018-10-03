<template>
    <div class="detail" >
        <div class="detailTop">
            <span class="iconfont icon-fanhui" @click="hide"></span>
            <div class="thumpUpCount" @click="thumpUpAdd({id:info.id,thumpUp:info.thumpUp+1})">
                <span class="iconfont icon-zan2"></span>
                <span >赞({{info.thumpUp}})</span>
            </div>
        </div>
        <iframe :src="info.path" frameborder="0" width="100%" height="1000"></iframe>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:"Detail",
    methods:{
        hide:function(){
            this.$emit('hide')
        },
        ...mapActions(['thumpAdd']),
        thumpUpAdd:function(data){
            if(!this.isLogin){
                alert('请登录后再点赞')
                return
            }
            if(this.thumpList.indexOf(data.id)>=0){
                alert('不可重复点赞')
                return 
            }
            this.thumpAdd(data)
        }
    },
    computed:{
        ...mapState(['currentArticle','thumpList','isLogin']),
        info:function(){
            let vm=this;
            return {
                path:'http://localhost:8090/static/'+vm.currentArticle.path,
                thumpUp:vm.currentArticle.thumpUp,
                id:vm.currentArticle._id
            }
        }
    }
}
</script>
<style lang='scss'>
    .detail{
        min-width: 400px;
        flex-grow: 1;
        .detailTop{
            display: flex;
            height: 48px;
            padding: 0 24px;
            justify-content: space-between;
            border-bottom: 1px solid #e1e4e8;
            align-items: center;
            div{
                color: #333;
            }
        }
    }
</style>
