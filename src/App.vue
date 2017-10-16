<template>
  <div id="app">
    <img :src="imgUrl.i">
    <Btn></Btn>
    <PageInfo></PageInfo>
  </div>
</template>

<script>
  import Btn from './components/Btn/Btn.vue'
  import PageInfo from './components/PageInfo/PageInfo.vue'
  import store from './vuex/store'
  import {mapState} from 'vuex'
export default {
  store,
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    ...mapState(['imgUrl'])
  },
  components:{
    Btn,PageInfo
  }
}
</script>

<style lang="scss">
img {
  width: 20rem;
  position: absolute;
  z-index: -1;
}

</style>
