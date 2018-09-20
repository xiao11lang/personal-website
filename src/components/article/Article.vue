<template>
    <div class="article">
        <Summary></Summary>
    </div>
    
</template>
<script>
import Summary from './Summary'
export default {
    name:"Article",
    components:{
        Summary
    }
}
</script>
<style lang="scss" scoped>
    .article{
        margin: 30px 180px;
        padding: 0 20px;
        font-size: 14px;
        background-color: white;
    }
</style>
