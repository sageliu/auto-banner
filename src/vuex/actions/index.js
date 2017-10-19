import mutations from '../mutations/index'
const actions={
  changeImgUrl({commit}){
    commit('changeImgUrl')
  },
  addDragAbleBtn({commit}){
    commit('addDragAbleBtn');
  },
  resetState({commit},it){
    console.log('actions');
    commit('resetState',it);
  }
}
export default actions;