// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import fetch from './until/fetch'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
Vue.prototype.fd=function(data){
  let fd=new FormData()
  Object.keys(data).forEach(function(key){
    fd.append(key,data[key])
  })
  return fd
}
Vue.prototype.fetch=fetch
