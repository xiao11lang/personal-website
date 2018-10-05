<template>
    <div class="dailyRecord">
        <div class="left">
            <RecordItem v-for="(item,index) in daily" :key='index' :info='item'></RecordItem>
            <div class="newDaily" @click="showNew(true)" v-if='admin'>新建</div>
        </div>
        <div class="right"></div>
        <New @hide='showNew(false)' v-if="showNewDaily"></New>
    </div>
</template>
<script>
import RecordItem from "./RecordItem";
import { mapActions, mapState,mapMutations } from "vuex";
import New from './New'
export default {
  name: "DailyRecord",
  components: {
    RecordItem,New
  },
  data:function(){
    return {
      showNewDaily:false
    }
  },
  computed:{
    ...mapState(['daily','admin']),

  },
  methods:{
    showNew:function(flag){
      this.showNewDaily=flag
    },
    ...mapActions(['getDaily'])
  },
  mounted:function(){
    this.getDaily()
  }
};
</script>
<style lang="scss" scoped>
.dailyRecord {
  margin: 30px 180px;
  font-size: 14px;
  background-color: white;
  min-width: 750px;
  display: flex;
  padding: 20px;
  .left {
    flex-grow: 1;
    .newDaily {
      width: 30%;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: white;
      background: #2ebc4f;
      margin: 0 auto;
      margin-bottom: 20px;
      &:hover {
        background: rgb(40, 167, 69);
      }
      border-radius: 3px;
    }
  }
  .right {
    min-width: 250px;
  }
}
</style>

