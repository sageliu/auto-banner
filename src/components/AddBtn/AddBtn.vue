<template>
  <div class="fileWrap odiv" @click="methodRun">
    <span>{{contentText}}</span>
    <slot></slot>
  </div>
</template>

<script>
  import store from '../../vuex/store'
  import {mapMutations} from 'vuex'
  export default {
    store,
    props:[
      'contentText',
      'isAddBtn',
      'method'
    ],
    data(){
      return {

      }
    },
    methods:{
      methodRun(){
        if(typeof this.method ==='function'){
          this.method()
        }else{
          this[this.method]()
        }
      },
      addDragAbleBtn(){
        if(this.isAddBtn==='AddBtn'){
          console.log(this.isAddBtn);
          this.$store.commit('addDragAbleBtn',{
            component: 'DragAbleBtn',
            text: '这是一个新增的按钮',
            thisWidth: '10rem',
            thisHeight: '2rem',
            thisLeft: '0',
            thisTop: '5rem',
            borderRadius:'1rem',
            selected:'default',
            thisSid:'',
            isShow:false
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss">

  .fileWrap{
    width: 3rem;
    height: 3rem;
    display: block;
    border: 2px solid;
    position: relative;
    text-align: center;
    line-height: 2.8rem;
    font-size: 2.5rem;
    float: left;
  &:after{
     clear: both;
     content: '';
     display: block;
   }
  input{
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  }
</style>