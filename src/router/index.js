import Vue from 'vue'
import Router from 'vue-router'
import MessageBoard from '../components/message/MessageBoard'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/messageBoard",
      component:MessageBoard
    }
  ]
})
