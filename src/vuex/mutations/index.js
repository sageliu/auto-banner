import state from '../state/index'
const mutations={
  changeImgUrl(state,imgUrlInputValue){
    state.imgUrl={...state.imgUrl,i:imgUrlInputValue}
  },
  addDragAbleBtn(state , {component='DragAbleBtn', text='这是一个新增的按钮',thisWidth='10rem',thisHeight='2rem',thisBorderRadius='1rem',thisLeft='0',thisTop='0',selected='default',isShow=false,thisSid=''}) {
    state.dragAbleBtnItems.push({
      key:{component},//由于删除的时候，数组会塌陷，所以在添加可拖拽的按钮的时候增加一个唯一的key，来处理每个新增可拖拽的按钮的唯一性
      info:{
        component,
        text,
        thisWidth,
        thisHeight,
        thisBorderRadius,
        thisLeft,
        thisTop,
        selected,
        thisSid,
        isShow
      }
    })
  },
  removeDragAbleBtn(state,item){
    const dragAbleBtnItems= state.dragAbleBtnItems.filter(it=>{

      // debugger
      return it.key!==item.key
    })
    // console.log('remove',dragAbleBtnItems);
    console.log('------成功删除了一个按钮，请记得将数据输出------')

    state.dragAbleBtnItems=[...dragAbleBtnItems];
  },
  changeShow(state,item){
    item.info.isShow=!item.info.isShow;
  },
  changeDragAbleBtnInfo(state,{item,it}){
    // console.log('----',it);
    state.dragAbleBtnItems.map((items,index)=>{

      if(items.key===item.key){
        let ary={...items.info,...it};
        // console.log('ary',state.dragAbleBtnItems[index]);
        state.dragAbleBtnItems[index].info={...items.info,...ary}
      }
    })
  },
  submitDragAbleInfo(state,{item,it}){
    let newIt={}
    for (let k in it){//因为it拿到的都是纯数字(px)，所以需要转换为rem,selected不需要转换
      if(k!=='thisSid'){//因为sid就是要的数字类型，
        newIt[k]=pxToRem(it[k]);
      }else{
        newIt[k]=it[k]
      }
    }
    // console.log('newIt--------',newIt);

    state.dragAbleBtnItems.map((items,index)=> {
      if(items.key===item.key) {
        // console.log(index);//这是第几个按钮
        let ary={...items.info,...newIt};
        state.dragAbleBtnItems[index].info={...items.info,...ary}
      }
    })
    console.log('------成功临时保存按钮的数据，请记得将数据最终提交------')

  },
  submitPageInfo(state,item){
    state.pageInfo={...state.pageInfo,...item}
  },
  resetState(state,item){
    // console.log(item);
    // state={...state,...item};
    state.pageInfo={...state.pageInfo,...item.pageInfo};
    state.dragAbleBtnItems=[...state.dragAbleBtnItems,...item.dragAbleBtnItems];
    // state.imgUrl={...state.imgUrl,...item.imgUrl}
    // console.log(state);
  },
  getPageInfo(state){
    return state.pageInfo;
  },
}
export default mutations;