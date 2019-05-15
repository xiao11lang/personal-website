<template>
    <div class="newContainer" @click="hide($event)">
        <div class="new">
            <div class="item">
                <span>内容</span>
                <div><input type="text" placeholder="内容" v-model="content"></div>
            </div>
            <div class="item upload">
                <span>图片</span>
                <div>
                  <img :src="src" alt="" v-for="(src,index) in photoSrc" :key='index'>
                  <span class="iconfont icon-shangchuan">
                    <input type="file" multiple @change="selectPhoto">
                  </span>
                </div>
            </div>
            <div class="item" @click="newDaily">新建</div>
        </div>
    </div>
    
</template>
<script>
import {addDaily} from '../../api/daily.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  name: "New",
  data: function() {
    return {
      title: "",
      content: "",
      type: "",
      path: [],
      isOriginal: true,
      photoList:[],
      photoSrc:[]
    };
  },
  methods: {
    ...mapMutations('daily',['addDaily']),
    ...mapActions('daily',['getDaily']),
    hide: function(e) {
      if (e) {
        if (e.target != e.currentTarget) {
          return;
        } else {
          this.$emit("hide", false);
        }
      } else {
        this.$emit("hide", false);
      }
    },
    selectPhoto:function(e){
      let that=this;
      Array.from(e.target.files).forEach(function(file,index){
        that.photoList.push(file)
        that.path.push(`http://www.11lang.cn/static/img/${file.name}`)
        let fr=new FileReader()
        fr.readAsDataURL(file)
        fr.onload=function(){
          that.photoSrc.push(this.result)
        }
      })
      
    },
    newDaily: function() {
      let vm = this;
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let date = new Date().getDate();
      let writeTime =year+"-"+month+'-'+date
      if(this.content.trim()===''){
        return 
      } 
      let fd = this.fd({
        content:this.content,
        paths:JSON.stringify(this.path),
        writeTime:writeTime
      })
      this.photoList.forEach(function(photo,index){
        fd.append(`img${index}`,photo)
      })
      addDaily(fd).then(function(data){
        if (data === "success") {
          vm.photoList=[];
          vm.photoSrc=[];
          vm.getDaily(vm.dailyPage).then(function(){
            vm.$emit('hide')
          })
        }
      })
    }
  },
  computed:{
    ...mapState('daily',['daily','dailyPage'])
  }
};
</script>
<style lang="scss">
.newContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  .new {
    position: absolute;
    top: 130px;
    right: 50%;
    transform: translateX(50%);
    width: 380px;
    background-color: white;
    border-radius: 6px;
    padding: 20px;
    .item {
      span {
        color: #586069;
      }
      div {
        height: 44px;
        border: 1px solid #ccc;
        margin: 8px 0;
        line-height: 44px;
        &.focus {
          border-color: rgb(33, 166, 255);
        }
        input {
          border: none;
          display: inline-block;
          width: 100%;
          padding-left: 10px;
          box-sizing: border-box;
          color: #586069;
        }
      }
    }
    .item.upload{
      div{
        display: flex;
        flex-wrap: wrap;
        max-width:100%;
        align-items: center; 
        border: none;
        height: auto;
        span::before{
          font-size: 30px;
        }
        span{
          position: relative;
          display: inline-block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          padding: 0;
          input{
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 100%;
            height: 100%;
            padding: 0;
            opacity: 0
          }
        }
        img{
          width: 100px;
          border: 1px solid #ccc;
          margin: 5px
        }
      }

    }
    .item:last-child {
      background: #2ebc4f;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
      border-radius: 4px;
      color: white;
      margin-top: 20px;
      &:hover {
        background: rgb(40, 167, 69);
      }
    }
  }
}
</style>
