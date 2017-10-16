<template>
  <div id="pageInfoWrap">
    <label for="ImgUrl" id="fileWrap">
      点此上传LP背景图
        <input type="file" name="ImgUrl" @change="imgUrl"   enctype="multipart/form-data" ref="inputFile">
    </label>

  </div>
</template>

<script>
  import store from '../../vuex/store'
  import {mapMutations,mapActions} from 'vuex'
  export default {
    store,
    data(){
      return {
        asd:''
      }
    },
    methods:{
      imgUrl(){
        store.commit('changeImgUrl',URL.createObjectURL(this.$refs.inputFile.files[0]))
      },
      ...mapActions(['changeImgUrl'])
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