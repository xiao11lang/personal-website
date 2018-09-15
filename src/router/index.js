import Vue from 'vue'
import Router from 'vue-router'
import MessageBoard from '../components/message/MessageBoard'
import Self from '../components/self/Self'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/messageBoard",
      component:MessageBoard
    },
    {
      path:"/self",
      component:Self
    }
  ]
})
