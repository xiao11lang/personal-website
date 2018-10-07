<template>
    <div class="barrageContainer">
        <BarrageItem v-for="(item,index) in barrageList" :key="index" :content='item.content' :index='index'></BarrageItem>
        <div v-for="(item,index) in newList" :key='index' class="newContainer">
            <BarrageItem v-for="(content,i) in item" :key="index+content+i" :content='content' :index='index'></BarrageItem>
        </div>
    </div>
</template>
<script>
import BarrageItem from './BarrageItem'
import {mapState} from 'vuex'
export default {
    name:"Barrage",
    components:{
        BarrageItem
    },
    props:['newList'],
    data:function(){
        return {
        }
    },
    computed:{
        ...mapState(['barrageList'])
    }
}
</script>
<style lang="scss">
    .barrageContainer{
        position: fixed;
        top: 64px;
        left: 0;
        background: rgba(0,0,0,.7);
        height: 150px;
        width: 100%;
    }
</style>
