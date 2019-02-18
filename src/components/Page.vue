<template>
    <div class="page" :style='styleInfo'>
        <span @click='first' class="nan">首页</span>
        <span @click="pre" v-if="currentIndex>=2" class="nan">上一页</span>
        <span v-for="i in pageCount" :key='i' :class="{active:i===currentIndex}" @click="jump(i)">
            {{i}}
        </span>
        <span @click="next" v-if="pageCount>=2&&currentIndex<pageCount" class="nan">下一页</span>
        <span @click="last" v-if="pageCount>=5" class="nan">尾页</span>
    </div>
</template>
<script>
export default {
    name:"Page",
    props:['totalCount','styleInfo'],
    data:function(){
        return {
            currentIndex:1,
        }
    },
    computed:{
        pageCount:function(){
            return Math.ceil(this.totalCount/10);
        }
    },
    watch:{
        "currentIndex":function(val){
            this.$emit('onChange',val)
        }
    },
    methods:{
        pre:function(){
            this.currentIndex--
        },
        next:function(){
            this.currentIndex++
        },
        first:function(){
            this.currentIndex=1
        },
        last:function(){
            this.currentIndex=this.pageCount
        },
        jump:function(index){
            this.currentIndex=index
        }
    }
}
</script>
<style lang="scss" scoped>
    .page{
        margin: 10px 0;
        span{
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            margin-right: 6px;
            line-height: 30px;
            display: inline-block;
            height: 30px;
            width: 30px;
            text-align: center;
        }
        span.nan{
            padding: 0 8px;
            width: auto
        }
        span.active{
            color: #1890ff;
            border-color: #1890ff;
        }
        span:hover{
            color: #1890ff;
            border-color: #1890ff;
        }
    }
</style>
