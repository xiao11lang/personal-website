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
import logo from '../../assets/avatar.jpg'
export default {
    name:"Hobby",
    props:['title','subTitle'],
    data:function(){
        return {
            details:[{
                subject:"Name",
                src:logo,
                des:'曹航',
                summary:'一个阳光宅男1'
            },{
                subject:"Home",
                src:logo,
                des:'曹航',
                summary:'一个阳光宅男2'
            },{
                subject:"School",
                src:logo,
                des:'曹航',
                summary:'一个阳光宅男3'
            },{
                subject:"Major",
                src:logo,
                des:'曹航',
                summary:'一个阳光宅男4'
            }]
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


