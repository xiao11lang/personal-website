<template>
    <div class="messageBoard">
        <div class="mesTop">留言板</div>
        <div class="mesSendTitle">主人寄语</div>
        <div class="mesSendBody">
            无语
        </div>
        <div class="writeBoardCon">
            <div class="boardTitle">
                <span>发表您的留言</span>
            </div>
            <div class="board" contenteditable="true"></div>
            <div class="button">发表</div>
        </div>
        <div class="messageCon">
            <div class="mesCount">留言(7)</div>
        </div>
        <Message></Message>
    </div>
</template>
<script>
import Message from "./Message"
export default {
  name: "MessageBoard",
  components:{
      Message
  }
};
</script>
<style lang="scss" scoped>
.messageBoard {
  margin: 30px 180px;
  padding: 0 20px;
  font-size: 14px;
  background-color: white;
  .mesTop {
    height: 50px;
    line-height: 50px;
    color: #2595b7;
    border-bottom: 2px solid rgb(207, 235, 245);
  }
  .mesSendTitle {
    height: 36px;
    line-height: 36px;
    color: #444;
    font-weight: 700;
    font-family: Tahoma;
    border-bottom: 1px solid rgb(207, 235, 245);
  }
  .mesSendBody {
    padding-top: 16px;
    height: 150px;
    color: #444;
    font-size: 12px;
    font-family: Tahoma;
  }
  .writeBoardCon {
    .boardTitle {
      height: 36px;
      line-height: 36px;
      color: #444;
      font-weight: 700;
      font-family: Tahoma;
    }
    .board {
      height: 150px;
      padding-left: 10px;
      border: 1px solid #ccc;
    }
    .button {
      height: 28px;
      width: 72px;
      background-color: #6acdea;
      color: white;
      text-align: center;
      line-height: 28px;
      margin-top: 6px;
      border-radius: 2px;
    }
  }
  .messageCon {
    .mesCount {
      height: 36px;
      line-height: 36px;
      color: #444;
      font-weight: 700;
      font-family: Tahoma;
      border-bottom: 1px solid rgb(207, 235, 245);
    }
  }
}
</style>

