<template>
  <form id="pageInfoWrap" :action="submitPageInfoUrl" method="post">
    <label for="ImgUrl" id="fileWrap">
      点此上传LP背景图
        <input type="file" name="ImgUrl" @change="imgUrl" enctype="multipart/form-data" ref="inputFile">
    </label>
    <div @click="submitPageInfo">上传</div>
  </form>
</template>

<script>

  import axios from 'axios'
  import store from '../../vuex/store'
  import {mapMutations,mapActions} from 'vuex'
  export default {
    store,
    data(){
      return {
        submitPageInfoUrl:'http://127.0.0.1:9001/submitPageInfo'
      }
    },
    methods:{
      imgUrl(){
        store.commit('changeImgUrl',URL.createObjectURL(this.$refs.inputFile.files[0]))
      },
      ...mapActions(['changeImgUrl']),
      submitPageInfo(){
        let formData = new FormData();
//        formData.end('name', this.name);
//        formData.append('age', this.age);
        formData.append('ImgUrl', this.$refs.inputFile.files[0]);
        axios.post(this.submitPageInfoUrl,formData).then(data=>{
          console.log(data);
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  #pageInfoWrap{
    background: rgba(0,0,0,.7);
    color:lawngreen;
  }
  #fileWrap{
    position: relative;

    input[name=ImgUrl]{
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

</style>