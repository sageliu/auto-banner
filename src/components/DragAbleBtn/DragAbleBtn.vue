<template>
  <div :key="item.info.text" v-bind:style={width:item.info.thisWidth,height:item.info.thisHeight,borderRadius:item.info.thisBorderRadius,left:item.info.thisLeft,top:item.info.thisTop} @touchstart="dragStart" style="position: absolute;">
    <span class="sidInfo">{{item.info.thisSid}}</span>
    <span class="editThis" @click.stop="editThis">&iquest;</span>
    <span class="removeThis" @click.stop="removeThis">-</span>
    <EditDragAbleBtn v-show="item.info.isShow" :item="item"></EditDragAbleBtn>

  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import EditDragAbleBtn from '../EditDragAbleBtn/EditDragAbleBtn.vue'
  export default {
//    props:['thisWidth','thisHeight','thisBorderRadius','item','dragAbleBtnWrap'],
    props:['item','dragAbleBtnWrap'],
    data(){
      return {
        it:''
      }
    },
    methods:{
//      ...mapMutations(['removeDragAbleBtn']),
      dragStart(e){
        const target=e.target;
        if(!target.classList.contains('dragBtn'))return;//如果点击是的删除或者修改信息的按钮，则不触发拖拽
        const touches = e.touches[0]
        const startPageX = touches.pageX  ;
        const startPageY = touches.pageY  ;
        let l=getComputedStyle(target, false).left;
        let t=getComputedStyle(target, false).top;
//        console.log(target.offsetLeft);
//        console.log(target.offsetTop);
//        target.style.position='absolute'//让按钮每次添加都出现在当前页面的左上角
//        target.style.left=l
//        target.style.top=t

        target.startX=startPageX-parseFloat(l);
        target.startY=startPageY-parseFloat(t);
        target.addEventListener('touchmove', this.dragMove);
      },
      dragMove(e) {
        e.preventDefault();
        const target=e.target;
        const touches = e.touches[0]
        const targetX = touches.pageX - target.startX;
        const targetY = touches.pageY - target.startY;
        target.style.zIndex=999;
        target.style.left = targetX + 'px'
        target.style.top = targetY + 'px';
        target.style.bottom = 'inherit';
        target.addEventListener('touchend', this.dragEnd);//不能绑定到元素上，也不能绑定在touchstart上，单击也会触发的，所以要在开始拖动之后绑定

      },
      dragEnd(e){
        const target=e.target;
        let w=target.style.width;
        let h=target.style.height;
        let l=pxToRem(target.style.left);
        let t=pxToRem(target.style.top);
        let r=target.style.borderRadius;
        target.style.zIndex=1;

        this.it={
          ...this.item.info,
          thisBorderRadius:r,
          thisHeight:h,
          thisLeft:l,
          thisTop:t,
          thisWidth:w
        }
//        console.log('it',this.it);
        console.log('item',this.item);
        this.$store.commit('changeDragAbleBtnInfo',{item:this.item,it:this.it})
        target.removeEventListener('touchmove', this.dragMove);
        target.removeEventListener('touchend', this.dragEnd);
      },
      editThis(){
//        item.isShow=!item.isShow;
        this.$store.commit('changeShow',this.item)

      },
      removeThis(){
//        console.log(this.$props);
        this.$store.commit( 'removeDragAbleBtn',this.$props.item)
//        remove的时候，会每次都是删除最后一个新增的按钮，目测是删除导致数组塌陷造成的
      }
    },
    components:{
      EditDragAbleBtn
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
  .editThis,.removeThis{
    position: absolute;
    display: block;
    background: red;
    border-radius: 50%;
    width: 1.2em;
    height: 1.2em;
    line-height: 1.2em;
    color: #fff;
  }
  .sidInfo{
    top: -2.2rem;
    left: .3rem;
    position: absolute;
    background: rgba(0,0,0,.7);
  }
  .editThis{
    right: 1em;
    top: -.5em;
    line-height: .7em;
  }
  .removeThis{
    right: -.5em;
    top: -.5em;
  }
</style>