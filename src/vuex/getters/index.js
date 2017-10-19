import state from '../state'
const getters={
  getDragAbleBtnInfo(state){
    return state.dragAbleBtnItems
  },
  getPageInfo(state){
    return state.pageInfo
  },
  getState(state){
    return state
  }
}
export default getters;