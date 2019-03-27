import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/messageBoard",
      component:()=>import('../components/message/MessageBoard')
    },
    {
      path:"/self",
      component:()=>import('../components/self/Self')
    },
    {
      path:"/article",
      component:()=>import('../components/article/Article')
    },
    {
      path:"/dailyRecord",
      component:()=>import('../components/dailyRecord/DailyRecord')
    }
  ]
})
