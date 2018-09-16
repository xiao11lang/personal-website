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
import js from '../../assets/js.jpg'
import css from '../../assets/css.jpg'
import node from '../../assets/node.png'
import react from '../../assets/react.png'
import vue from '../../assets/logo.png'
export default {
    name:"Skill",
    props:['title','subTitle'],
    data:function(){
        return {
            details:[{
                subject:"JS",
                src:js,
                des:'JavaScript',
                summary:'异步的脚本语言'
            },{
                subject:"React",
                src:react,
                des:'React',
                summary:'声明式的js框架'
            },{
                subject:"Vue",
                src:vue,
                des:'Vue',
                summary:'渐进式的mvvm框架'
            },{
                subject:"Node",
                src:node,
                des:'Node',
                summary:'基于v8的服务端js实现'
            },{
                subject:"CSS",
                src:css,
                des:'CSS',
                summary:'层叠样式表'
            }]
        }
    },
    components:{
        Item
    }
}
</script>
<style lang="scss" scoped>
    .skill{}
</style>


