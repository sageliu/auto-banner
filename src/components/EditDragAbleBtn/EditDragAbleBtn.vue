<template>
  <div>
    <form id="" class="editInputWrap" >
      <label for="" class="submitFileLabel">
        按钮height:
      </label>
      <input class="editInput" type="number" name="" v-model="thisState.thisHeight" placeholder="请输入height(px)">

      <label for="" class="submitFileLabel">
      按钮width:
      </label>
      <input class="editInput" type="number" name="" v-model="thisState.thisWidth" placeholder="请输入width(px)">

      <label for="" class="submitFileLabel">
      按钮left:
      </label>
      <input class="editInput" type="number" name="" v-model="thisState.thisLeft" placeholder="请输入left(px)">

      <label for="" class="submitFileLabel">
      按钮top:
      </label>
      <input class="editInput" type="number" name="" v-model="thisState.thisTop" placeholder="请输入圆角(px)">
      <label for="" class="submitFileLabel">
      按钮圆角:
      </label>
      <input class="editInput" type="number" name="" v-model="thisState.thisBorderRadius" placeholder="请输入top(px)">
      <label for="" class="submitFileLabel">
        按钮功能选择:
      </label>
      <select v-model="thisState.selected">
        <option disabled value="default">请选择该按钮的功能</option>
        <option value="open">打开个人中心</option>
        <option value="twitter">跳转到twitter</option>
        <option value="line">跳转到line</option>
      </select>
        <label for="" v-show="thisState.selected==='open'" class="submitFileLabel">
          按钮SID:
        </label>
        <input class="editInput" v-show="thisState.selected==='open'" type="number" name="" v-model="thisState.thisSid" placeholder="请输入SID">

      <!--<span>Selected: {{ selected }}</span>-->

      <div class="closeBtn" @click="closeDragAbleInfo">&times;</div>
      <button type="button" class="submitDragAbleInfoBtn btn" @click="submitDragAbleInfo">确定</button>
    </form>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    props:['item'],
    data() {
      return {
        thisState: {
          thisHeight: '',
          thisWidth: '',
          thisLeft: '',
          thisTop: '',
          thisBorderRadius: '',
          selected: '',
          thisSid:''
        }
      }
    },
    beforeMount(){
      this.addOrMoveEndChangeData()
    },
    watch: {
      item:{
        handler(oldValue,newValue){//写成对象监听更加的方便，不然要写很多遍watch
          console.log('------按钮位置发生变化，请记得输出------')
          this.addOrMoveEndChangeData()
        },
        deep:true
      },
      'thisState.selected':{//监听对象的属性，需要用引号括起来
        handler(newValue,oldValue){
          if(newValue!=='open'){
            this.thisState.thisSid='';
            console.log(this.thisState);
          }
        }
      }
    },
    methods:{
      submitDragAbleInfo(){
        let formData= new FormData();
//        console.log(this.thisState);

//        formData.append('thisHeight')
        this.$store.commit('submitDragAbleInfo',{item:this.item,it:this.thisState});

        this.closeDragAbleInfo();
      },
      closeDragAbleInfo(){

        this.$store.commit('changeShow',this.item)
      },
      addOrMoveEndChangeData(){
        let obj={};
        for(let p in this.item.info){
          if(p==='thisSid'){
            obj[p]= this.item.info[p]//sid就是一个数字，没有单位
          }else{
            obj[p]= remToPx(this.item.info[p])
          }
        }
        this.thisState={...this.thisState,...obj}//将按钮的对应数据写到form中
      }
    },
    computed: {
      ...mapGetters(['getDragAbleBtnInfo'])
    }
  }

</script>
<style scoped lang="scss">

</style>