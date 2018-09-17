<template>
    <div class="item" @click="toggle" :class='{active:active}'>
        <div class="front" v-if="!showDetail" >
            <p class="subject"><span>{{detail.subject}}</span></p>
            <p class="img">
                <img :src="detail.src" alt="">
            </p>
            <p class="des">{{detail.des}}</p>
            <p class="summary">{{detail.summary}}</p>
        </div>
        <div class="back" v-if="showDetail">
            <div class="backItem" v-for="item of detail.itemLists" :key="item.key">
                <span class="key">{{item.key}}</span>
                <span class="value">{{item.value}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Item",
  props: ["detail"],
  data: function() {
    return {
      active: false,
      showDetail: false
    };
  },
  methods: {
    toggle: function() {
      let vm = this;
      this.active = true;
      setTimeout(function() {
        vm.showDetail = !vm.showDetail;
        vm.active=false
      }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  width: 230px;
  height: 170px;
  margin: 12px 0;
  background-color: white;
  color: rgb(44, 65, 62);
  text-align: center;
  font-family: punctuation;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:hover {
    box-shadow: 3px 3px 10px 3px #ccc;
  }
   &.active {
      transform: rotateY(180deg);
      backface-visibility: hidden;
      transition: transform 1s;
    }
  .front {
   

    .subject {
      text-align: left;
      padding-top: 12px;
      padding-left: 12px;
      span {
        display: inline-block;
        border: 1px solid #ccc;
        font-size: 12px;
        padding: 6px 20px;
        border-radius: 15px;
        background-color: rgb(245, 244, 249);
      }
    }
    .img {
      img {
        width: 50px;
        height: 50px;
        width: inherit;
        border-radius: 50%;
      }
    }
    .des {
      font-weight: bold;
      margin: 16px 0 6px 0;
    }
    .summary {
      font-size: 12px;
      color: rgb(187, 191, 192);
    }
  }
  .back{
      overflow: hidden;
      .backItem{
          overflow: hidden;
          display: flex;
          width: 200%;
          height: 36px;
          line-height: 36px;
          box-sizing: border-box;
          border-bottom: 1px solid #ccc;
          justify-content: space-between;
          &:hover{
              transform: translateX(-50%);
              transition: transform 1s
          }
          span{
              text-align: center;
              width: 50%;
          }
          span:first-child{
              color: #2595b7;
          }
          span:last-child{
              color: #ccc;
          }
      }
  }
}
</style>


