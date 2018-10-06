<template>
    <div class="loading">
        <div>{{message}}...</div>
    </div>
</template>
<script>
export default {
    name:"Loading",
    props:['message']
}
</script>
<style lang="scss">
    .loading{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        div{
            position: absolute;
            top: 50%;
            left: 50%;
            color: black
        }
    }
</style>
