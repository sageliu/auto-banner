<template>
  <div key="lp">
    <form id="imgInfoWrap" v-show="isShow">
      <div>
        <AddBtn isAddBtn="notAddBtn" contentText="+" method="">
          <input class="fileWrap" type="file" name="lp" @change="lpUrl" enctype="multipart/form-data" ref="inputFileLp">
          <!--<input class="fileWrap" type="file" name="ImgUrl" @change="changeImgUrl" enctype="multipart/form-data" ref="inputFile">-->
        </AddBtn>
        <label for="lp" class="submitFileLabel">
          点此上传LP背景图
        </label>
      </div>
      <div>
        <AddBtn isAddBtn="notAddBtn" contentText="+" method="">
          <input class="fileWrap" type="file" name="banner" @change="bannerUrl" enctype="multipart/form-data"
                 ref="inputFileBanner">
          <!--<input class="fileWrap" type="file" name="ImgUrl" @change="changeImgUrl" enctype="multipart/form-data" ref="inputFile">-->
        </AddBtn>
        <label for="banner" class="submitFileLabel">
          点此上传Banner图
        </label>
      </div>
      <div>
        <AddBtn isAddBtn="notAddBtn" contentText="+" method="">
          <input class="fileWrap" type="file" name="twitter" @change="twitterUrl" enctype="multipart/form-data"
                 ref="inputFileTwitter">
          <!--<input class="fileWrap" type="file" name="ImgUrl" @change="changeImgUrl" enctype="multipart/form-data" ref="inputFile">-->
        </AddBtn>
        <label for="twitter" class="submitFileLabel">
          点此上传twitter图
        </label>
      </div>

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
  import {mapMutations, mapActions} from 'vuex'
  //  import DragAbleBtn from '../DragAbleBtn/DragAbleBtn.vue'
  export default {
    data() {
      return {
        isShow: false,
        submitImgLpInfoUrl: url + '/submitLpImgInfo',
        submitImgBannerInfoUrl: url + '/submitBannerImgInfo',
        submitImgTwitterInfoUrl: url + '/submitTwitterImgInfo',
        isDisAbled: true,
        items: []
      }
    },
    methods: {
//      ...mapMutations({
//        changeImgUrl1:'changeImgUrl'
//      }),
      lpUrl() {
        this.isDisAbled = false;
//        this.isDisAbled===true?(void 0):!this.isDisAbled;
        this.$store.commit('changeImgUrl', URL.createObjectURL(this.$refs.inputFileLp.files[0]));
        let formData = new FormData();
        formData.append('lp', this.$refs.inputFileLp.files[0]);
        axios.post(this.submitImgLpInfoUrl, formData).then(data => {
          console.log('--------' + data.data + '--------');
        }).catch(err => {
          console.log(err);
        })
      },
      bannerUrl() {
        this.isDisAbled = false;
//        this.isDisAbled===true?(void 0):!this.isDisAbled;
        this.$store.commit('changeBannerImgUrl', URL.createObjectURL(this.$refs.inputFileBanner.files[0]))
        let formData = new FormData();
        formData.append('banner', this.$refs.inputFileBanner.files[0]);
        axios.post(this.submitImgBannerInfoUrl, formData).then(data => {
          console.log('--------' + data.data + '--------');
        }).catch(err => {
          console.log(err);
        })
      },
      twitterUrl() {
        this.isDisAbled = false;
//        this.isDisAbled===true?(void 0):!this.isDisAbled;
        this.$store.commit('changeTwitterImgUrl', URL.createObjectURL(this.$refs.inputFileTwitter.files[0]))
        let formData = new FormData();
        formData.append('twitter', this.$refs.inputFileTwitter.files[0]);
        axios.post(this.submitImgTwitterInfoUrl, formData).then(data => {
          console.log('--------' + data.data + '--------');
        }).catch(err => {
          console.log(err);
        })
      },
//      ...mapActions(['changeImgUrl']),
      submitImgInfo() {
        this.changeShow();
      },
      changeShow() {
        this.isShow = !this.isShow
      },
    },
    components: {
      AddBtn,
//      DragAbleBtn
    }
  }
</script>
<style scoped lang="scss">
  #imgInfoWrap {
    position: fixed;
    left: 0;
    right: 0;
    padding: 1rem;
    background: rgba(0, 0, 0, .7);
    color: lawngreen;
    z-index: 9;
    &>div {
      height: 2rem;
      margin-bottom: 2rem;
    }
  }

  .closeBtn {
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

  .submitFileLabel {
    /*margin-bottom: 2rem;*/
    display: block;
    line-height: 3rem;
    position: relative;
    left: 1rem;
    float: left;
  }

  #triangle {
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

  .submitFileBtn:disabled {
    background: #ccc;
    border: none;
    color: #fff;
  }

</style>