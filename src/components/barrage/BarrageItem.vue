<template>
    <div class="barrage" ref="el" :style='{top:top}'>{{content}}</div>
</template>
<script>
export default {
    name:"BarrageItem",
    data:function(){
        return{
            top:Math.random()*120+'px'
        }
    },
    props:['content','index'],
    methods:{
        animation:function(el){
            let vm=this;
            let width=document.documentElement.clientWidth;
            let elWidth=el.clientWidth;
            el.style.left=(parseFloat(window.getComputedStyle(el)['left'])-(width+elWidth)/960)+'px'
            if(parseFloat(window.getComputedStyle(el)['left'])>=(-elWidth)){
                requestAnimationFrame(vm.animation.bind(vm,vm.$refs.el))
            }
        }
    },
    mounted:function(){
        let vm=this;
         setTimeout(function(){
            vm.animation(vm.$refs.el)
        },1000*vm.index) 
    }
}
</script>
<style lang="scss">
    @keyframes barrage {
        form{
            left: 100%
        }
        to{
            left: 0
        }
    }
    .barrage{
        position:absolute;
        color: white;
        left: 100%;
        font-size: 20px;
        white-space: nowrap;
    }
</style>
