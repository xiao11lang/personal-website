<template>
    <div class="detail" >
        <div class="detailTop">
            <span class="iconfont icon-fanhui" @click="hide"></span>
            <div class="thumpUpCount">
                <span class="iconfont icon-zan2"></span>
                <span>赞(0)</span>
            </div>
        </div>
        <iframe src="http://localhost:80/test2.html" frameborder="0" width="100%" height="100%"></iframe>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:"Detail",
    methods:{
        hide:function(){
            this.$emit('hide')
        }
    },
    computed:{
        ...mapState(['currentArticlePath']),
        path:function(){
            console.log(''+this.currentArticlePath)
            return 'http://localhost:80/'+this.currentArticlePath
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
            margin-bottom: 20px;
            justify-content: space-between;
            border-bottom: 1px solid #e1e4e8;
            align-items: center;
            div{
                color: #333;
            }
        }
    }
</style>
