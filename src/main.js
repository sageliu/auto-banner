import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
var vv=new Vue({
  router,store,
  el: '#app',
  render: h => h(App)
})

window.vv=vv
