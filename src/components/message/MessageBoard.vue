<template>
    <div class="messageBoard">
        <div class="mesTop">留言板</div>
        <div class="mesSendTitle">主人寄语</div>
        <div class="mesSendBody">
            无语
        </div>
    </div>
</template>
<script>
export default {
    name:"MessageBoard"
}
</script>
<style lang="scss" scoped>
    .messageBoard{
        margin: 30px 180px;
        padding: 0 20px;
        height: 300px;
        font-size: 14px;
        background-color: white;
        .mesTop{
            height: 50px;
            line-height: 50px;
            color: #2595B7;
            border-bottom: 2px solid rgb(207, 235, 245)
        }
        .mesSendTitle{
            height: 36px;
            line-height: 36px;
            color: #444;
            font-weight: 700;
            font-family: Tahoma;
            border-bottom: 1px solid rgb(207, 235, 245)
        }
        .mesSendBody{
            padding-top: 16px;
            height: 150px;
            color: #444;
            font-size: 12px;
            font-family: Tahoma;
        }
    }
</style>

