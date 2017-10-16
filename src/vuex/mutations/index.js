import state from '../state/index'
const mutations={
  changeImgUrl(state,imgUrlInputValue){
    state.imgUrl={...state.imgUrl,i:imgUrlInputValue}
  }
}
export default mutations;