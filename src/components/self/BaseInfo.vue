<template>
    <div class="base">
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
import home from '../../assets/home.jpg'
import school from '../../assets/school.jpg'
import atom from '../../assets/atom.jpg'
export default {
    name:"BaseInfo",
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
                src:home,
                des:'安徽',
                summary:'安徽六安'
            },{
                subject:"School",
                src:school,
                des:'NUAA',
                summary:'南京航空航天大学'
            },{
                subject:"Major",
                src:atom,
                des:'核工程',
                summary:'核工程与核技术'
            }]
        }
    },
    components:{
        Item
    }
}
</script>
<style lang="scss" scoped>
    .baseInfo{
        
    }
</style>


