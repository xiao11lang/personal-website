<template>
    <div class="message">
        <div class="mesLeft">
            <span :class="['iconfont',info.avatar]"></span>
        </div>
        <div class="mesRight">
            <div class="mesTop">
                <span class="userName">{{info.userName}}</span>
                <span class="number">第{{index}}楼</span>
            </div>
            <div class="mesMiddle" v-html="info.content">
                
            </div>
            <div class="mesBottom">
                <span>{{info.time}}</span>
                <span v-if='showDelete' class="delete" @click="deleteMes(info.id)">删除</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {DELETE_MESSAGE} from '../../until/constant.js'
import {deleteMessage} from '../../api/message.js'
export default {
  name: "Message",
  props:['info','index'],
  computed:{
      ...mapState(['userName']),
      ...mapState('message',['messagePage','mesList']),
      showDelete:function(){
          return this.info.userName===this.userName
      }
  },
  methods:{
      deleteMes:function(id){
          let vm=this
          let fd=this.fd({
              id:id
          })
          deleteMessage(fd).then(function(data){
              let page=vm.messagePage;
              if(vm.mesList.length===1){
                  page--
                  vm.setMessagePage(page)
              }
              vm.getMes(page)
          })
          /* this.fetch(DELETE_MESSAGE,fd).then(function(data){
              let page=vm.messagePage;
              if(vm.mesList.length===1){
                  page--
                  vm.setMessagePage(page)
              }
              vm.getMes(page)
          }) */
      },
      ...mapActions('message',['getMes']),
      ...mapMutations('message',["setMessagePage"])
  }
};
</script>
<style lang="scss" scoped>
.message {
    display: flex;
    padding: 20px 12px;
    border-bottom: 1px solid rgb(207, 235, 245);
  .mesLeft {
      margin-right: 16px;
    span {
      &::before {
        font-size: 50px;
      }
    }
  }
  .mesRight{
      flex-grow: 1;
      .mesTop{
          .userName{
              color: #2595b7
          }
          .number{
              color: #9B9B9B;
              font-size: 12px;
          }
      }
      .mesMiddle{
          margin-top: 12px;
          min-height: 100px;
      }
      .mesBottom{
          color: #9B9B9B;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
          span.delete{
              color:#d6035b
          }
      }
  }
}
</style>
