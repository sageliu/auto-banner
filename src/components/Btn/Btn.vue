<template>
  <div>
    124
  </div>
</template>

<script>
  export default {
    data(){
      return {

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