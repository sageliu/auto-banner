<template>
    <div key="1">
      <form id="imgInfoWrap" v-show="isShow">
          <AddBtn isAddBtn="notAddBtn" contentText="+" method="">
            <input class="fileWrap" type="file" name="ImgUrl" @change="imgUrl"  enctype="multipart/form-data" ref="inputFile">
            <!--<input class="fileWrap" type="file" name="ImgUrl" @change="changeImgUrl" enctype="multipart/form-data" ref="inputFile">-->
          </AddBtn>
        <label for="ImgUrl" class="submitFileLabel">
          点此上传LP背景图
        </label>
        <div @click="changeShow" class="closeBtn">&times;</div>
        <button type="button" @click="submitImgInfo" :disabled="isDisAbled" class="submitFileBtn">上传</button>
      </form>
      <div id="triangle" @click="changeShow" v-show="!isShow"></div>
    </div>
</template>

<script>
  import AddBtn from '../AddBtn/AddBtn.vue'
  import axios from 'axios'
  import store from '../../vuex/store'
  import {mapMutations,mapActions} from 'vuex'
//  import DragAbleBtn from '../DragAbleBtn/DragAbleBtn.vue'
  export default {
    store,
    data(){
      return {
        isShow:false,
        submitImgInfoUrl:url+'/submitImgInfo',
        isDisAbled:true,
        items:[]
      }
    },
    methods:{
//      ...mapMutations({
//        changeImgUrl1:'changeImgUrl'
//      }),
      imgUrl(){
        this.isDisAbled=false;
//        this.isDisAbled===true?(void 0):!this.isDisAbled;
        store.commit('changeImgUrl',URL.createObjectURL(this.$refs.inputFile.files[0]))
      },
//      ...mapActions(['changeImgUrl']),
      submitImgInfo(){
        let formData = new FormData();
        formData.append('ImgUrl', this.$refs.inputFile.files[0]);
//        if(formData.imgUrl===undefined)return;
        axios.post(this.submitImgInfoUrl,formData).then(data=>{
          console.log('--------'+data.data+'--------');
          this.changeShow();
        }).catch(err=>{
          console.log(err);
        })
      },
      changeShow(){
        this.isShow=!this.isShow
      },
    },
    components:{
      AddBtn,
//      DragAbleBtn
    }
  }
</script>
<style scoped lang="scss">
  #imgInfoWrap{
    position: fixed;
    left: 0;
    right: 0;
    padding: 1rem;
    background: rgba(0,0,0,.7);
    color:lawngreen;
    z-index: 9;

  }
  .closeBtn{
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 99;
    font-size: 2rem;
    width: 2rem;
    height: 2rem;
    line-height: 1.4rem;
    text-align: center;
    border: 2px solid;
    border-radius: 50%;
  }
  .submitFileLabel{
    margin-bottom: 2rem;
    display: block;
    line-height: 3rem;
    position: relative;
    left: 1rem;
    float: left;
  }
  #triangle{
    border-top: 2rem solid lime;
    border-left: 1.2rem solid transparent;
    border-right: 1.2rem solid transparent;
    width: 0;
    height: 0;
    position: fixed;
    right: 4.5rem;
    top: 0;
    z-index: 9;
  }
  .submitFileBtn:disabled{
    background: #ccc;
    border: none;
    color: #fff;
  }

</style>