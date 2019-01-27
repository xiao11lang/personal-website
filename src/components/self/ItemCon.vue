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
export default {
    name:"ItemCon",
    props:['title','subTitle','details'],
    components:{
        Item
    }
}
</script>

