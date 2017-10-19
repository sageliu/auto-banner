<template>
  <div>
    <form id="" class="pageInfoWrap" >
      <label for="" class="submitFileLabel">
        页面的title:
      </label>
      <input class="editInput" type="number" name="" v-model="pageInfo.thisTitle" placeholder="请输入页面title">

      <label for="" class="submitFileLabel">
        页面的urlTp:
      </label>
      <input class="editInput" type="text" name="" v-model="pageInfo.thisUrlTp" placeholder="请输入urlTp">
      <label for="" class="submitFileLabel">
        页面的urlLp:
      </label>
      <input class="editInput" type="text" name="" v-model="pageInfo.thisUrlLp" placeholder="请输入urlLp">
      <!--<label for="" class="submitFileLabel">-->
        <!--按钮功能选择:-->
      <!--</label>-->
      <!--<select v-model="">-->
        <!--<option disabled value="default">请选择该按钮的功能</option>-->
        <!--<option value="open">打开个人中心</option>-->
        <!--<option value="twitter">跳转到twitter</option>-->
        <!--<option value="line">跳转到line</option>-->
      <!--</select>-->

      <div class="closeBtn" @click="methodRun">&times;</div>
      <button type="button" class="submitDragAbleInfoBtn btn" @click="submitPageInfo">确定</button>
    </form>
  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  export default {
    props:[
      'method'
    ],
    data(){
      return{
        pageInfo:{
          thisTitle:'',
          thisUrlTp:'',
          thisUrlLp:''
        }
      }
    },
    beforeMount(){
      let _this=this
//      console.log('----------------',...this.getPageInfo);
      setTimeout(function () {
        let obj=_this.$store.getters.getPageInfo
        _this.pageInfo={..._this.pageInfo,...obj}
      })


    },
    computed:{
      ...mapGetters(['getPageInfo'])
    },
    watch:{
      pageInfo:{
        handler(){
          //this.pageInfo={...this.pageInfo,...this.getPageInfo}
        },
        deep:true
      }
    },
    methods:{
      methodRun(){
        this.method();
      },

      submitPageInfo(){
        this.$store.commit('submitPageInfo',this.pageInfo);
        console.log('------成功临时保存页面数据------')
        this.method();
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>