<template>
  <div id="app">
    <div>
      <img :src="imgUrl.i">
    </div>
    <ImgInfo></ImgInfo>
    <AddBtn id="addBtn" isAddBtn="AddBtn" contentText="+" method="addDragAbleBtn"></AddBtn>
    <AddBtn id="infoBtn" isAddBtn="notAddBtn" contentText="i" :method="pageInfoChangeShow"></AddBtn>
    <AddBtn id="outPutBtn" isAddBtn="notAddBtn" contentText="->" :method="outPutHtml"></AddBtn>
    <div id="dragAbleBtnWrap" ref="dragAbleBtnWrap">
      <div :is="item.info.component" :item="item" :text="item.info.text" :thisWidth="item.info.thisWidth"
           :thisHeight='item.info.thisHeight' :thisBorderRadius="item.info.thisBorderRadius"
           v-for="item in dragAbleBtnItems" class="btn dragBtn"></div>
    </div>
    <PageInfo v-show="pageInfoShow" :method="pageInfoChangeShow"></PageInfo>
  </div>
</template>

<script>
  import DragAbleBtn from './components/DragAbleBtn/DragAbleBtn.vue'
  import ImgInfo from './components/ImgInfo/ImgInfo.vue'
  import AddBtn from './components/AddBtn/AddBtn.vue'
  import PageInfo from './components/PageInfo/PageInfo.vue'
  import store from './vuex/store'
  import {mapState,mapGetters,mapActions} from 'vuex'
  import axios from 'axios'
  export default {
    store,
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        addBtn: 'addBtn',
        pageInfoShow: false
      }
    },
    beforeMount() {
      //获取回来数据
      axios.get(url+'/getState')
        .then(data => {
//          this.resetState(data.data);
          this.$store.commit('resetState', data.data)//修改state
          console.log('------成功加载页面数据为上次数据------')
        })
        .catch(err => {
          console.log(err);
        })
    },
    methods: {
//      ...mapActions(['resetState']),
      pageInfoChangeShow() {
        this.pageInfoShow = !this.pageInfoShow;
      },
      outPutHtml() {
        let stateJson = this.$store.getters.getState;//getters获得的数据就是json了。不要再进行JSON.stringify转换成json格式
        axios.post(url+'/postState', stateJson)
          .then(data => {
//            console.log(data);
            console.log('------成功保存页面数据------')
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    computed: {
//      ...mapGetters(['getState']),
      ...mapState(['imgUrl']),
      ...mapState(['dragAbleBtnItems'])
    },
    components: {
      ImgInfo, AddBtn, DragAbleBtn, PageInfo
    }
  }
</script>

<style lang="scss">
  html, body, #app {
    width: 20rem;
    height: 100%;
    position: relative;
  }

  body, div, img, ul, li, button，form, input, label {
    margin: 0;
    padding: 0;
  }

  ul, li {
    list-style: none;
  }

  *:focus {
    outline: none;
  }

  img {
    width: 20rem;
    position: absolute;
    z-index: -1;
  }

  #addBtn, #infoBtn, #outPutBtn {
    position: fixed;
    right: .5rem;
    top: 0;
    color: #fff;
    background: green;
    z-index: 8;
  }

  #infoBtn {
    right: 7.8rem;
  }

  #outPutBtn {
    right: 12rem;
    white-space: nowrap;
  }

  #dragAbleBtnWrap {
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .btn, .submitFileBtn {
    display: block;
    height: 2.3rem;
    line-height: 2rem;
    text-align: center;
    border: none;
    width: 100%;
    font-size: 1.2em;
    background: rgba(0, 0, 0, 0.7);
    color: lawngreen;
    box-shadow: 0 0 0 2px green;
  }

  .editInputWrap, .pageInfoWrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: .3rem;
    background: rgba(0, 0, 0, .7);
    color: lawngreen;
    z-index: 9;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    flex-direction: row;
    select {
      background: #fff;
      width: 51%;
      height: 1.3rem;
      line-height: 1.3rem;
      border-radius: 0;
      margin-bottom: .4rem;
      font-size: .8em;
    }
    .closeBtn {
      position: absolute;
      right: 0;
      top: -.5em;
      display: block;
      background: red;
      border-radius: 50%;
      width: 1.2em;
      height: 1.2em;
      line-height: 1.2em;
      color: #fff;
      text-align: center;
    }
    label {
      display: block;
      margin-bottom: .2rem;
      font-size: .8em;
      line-height: 1.2rem;
      width: 37%;
      text-align: end;
      margin-right: 5%;
    }
    .editInput {
      width: 50%;
      margin-bottom: .5rem;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: .8em;
    }
    .btn {
      margin-top: .3rem;
    }
  }

</style>
