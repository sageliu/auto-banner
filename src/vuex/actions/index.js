import mutations from '../mutations/index'
const actions={
  changeImgUrl({commit}){
    commit('changeImgUrl')
  },
  addDragAbleBtn({commit}){
    commit('addDragAbleBtn');
  }
}
export default actions;