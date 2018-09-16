<template>
    <div class="item" @click="toggle" :class='{active:showDetail}'>
        <p class="subject"><span>{{detail.subject}}</span></p>
        <p class="img">
            <img :src="detail.src" alt="">
        </p>
        <p class="des">{{detail.des}}</p>
        <p class="summary">{{detail.summary}}</p>
    </div>
</template>
<script>
export default {
    name:"Item",
    props:['detail'],
    data:function(){
        return {
            showDetail:false
        }
    },
    methods:{
        toggle:function(){
            this.showDetail=!this.showDetail;
            setTimeout(function(){
                alert('1')
            },1000)
        }
    }
}
</script>
<style lang="scss" scoped>
    .item{
        width: 230px;
        height: 170px;
        margin: 12px 0;
        background-color: white;
        color: rgb(44, 65, 62);
        text-align: center;
        font-family: punctuation;
        border: 1px solid #ccc;
        border-radius: 4px;
        &.active{
            transform: rotateY(180deg);
            transition: transform 1s
        }
        &:hover{
            box-shadow: 3px 3px 10px 3px #ccc;
        }

        .subject{
            text-align: left;
            padding-top: 12px;
            padding-left: 12px;
            span{
                display: inline-block;
                border: 1px solid #ccc;
                font-size: 12px;
                padding: 6px 20px;
                border-radius: 15px;
                background-color: rgb(245, 244, 249)
            }
        }
        .img{
            img{
                width: 50px;
                height: 50px;
                width: inherit;
                border-radius: 50%;
            }
        }
        .des{
            font-weight: bold;
            margin: 16px 0 6px 0
        }
        .summary{
            font-size: 12px;
            color: rgb(187, 191, 192)
        }
    }
</style>


