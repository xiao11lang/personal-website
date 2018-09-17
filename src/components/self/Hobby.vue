<template>
    <div class="base ">
        <div class="title">{{title}}</div>
        <div class="subTitle">{{subTitle}}</div>
        <div class="itemCon">
            <Item :detail='detail' v-for="detail of details" :key='detail.summary'></Item>
        </div>
    </div>
</template>
<script>
import Item from './Item'

import SelfInfo from "./selfInfo.js"
export default {
    name:"Hobby",
    props:['title','subTitle'],
    data:function(){
        return {
            details:SelfInfo.hobby
        }
    },
    components:{
        Item
    }
}
</script>
<style lang="scss" scoped>
    .hobby{}
</style>


