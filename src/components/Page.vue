<template>
    <div class="page">
        <span @click='first'>首页</span>
        <span @click="pre">上一页</span>
        <span v-for="i in pageCount" :key='i' :class="{active:i===currentIndex}">
            {{i}}
        </span>
        <span @click="next" v-if="pageCount>=2">下一页</span>
        <span @click="last">尾页</span>
    </div>
</template>
<script>
export default {
    name:"Page",
    props:['totalCount'],
    data:function(){
        return {
            currentIndex:1,
            pageCount:0,
        }
    },
    created:function(){
        this.pageCount=Math.ceil(this.totalCount/10);
    },
    methods:{
        pre:function(){
            if(this.currentIndex===1){
                return 
            }else{
                this.currentIndex--
            }
        },
        next:function(){
            if(this.currentIndex===this.pageCount){
                return
            }else{
                this.currentIndex++
            }
        },
        first:function(){
            this.currentIndex=1
        },
        last:function(){
            this.currentIndex=this.pageCount
        }
    }
}
</script>
<style lang="scss" scoped>
    .page{
        .active{
            color: blue
        }
    }
</style>
