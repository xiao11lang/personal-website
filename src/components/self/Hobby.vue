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
import novel from '../../assets/novel.png'
import comic from '../../assets/comic.jpg'
import game from '../../assets/game.jpg'
import music from '../../assets/music.jpg'
export default {
    name:"Hobby",
    props:['title','subTitle'],
    data:function(){
        return {
            details:[{
                subject:"Novel",
                src:novel,
                des:'趣味',
                summary:'玄幻、武侠、推理'
            },{
                subject:"Music",
                src:music,
                des:'雅俗共赏',
                summary:'Vae、Eason'
            },{
                subject:"Game",
                src:game,
                des:'静',
                summary:'英雄联盟'
            },{
                subject:"Comic",
                src:comic,
                des:'海贼王',
                summary:'成为海贼王的男人'
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


