import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '123456',
    openedTab: ['index'],
    activeTab: '',
    name:'xlf'
  },
  getters:{ //获取state中数据
    getName(state){
         return state.name;
      }
  },
  //同步方法
  mutations: {
    addTab (state, componentName) {
      state.openedTab.push(componentName)
    },
    changeTab (state, componentName) {
      state.activeTab = componentName
    },
    deductTab (state, componentName) {
      let index = state.openedTab.indexOf(componentName)
      state.openedTab.splice(index, 1)
    },
    show(state){
       state.name='许栏芳';
    },
    show2(state){
      state.name='丁奇峰';
   }
  },
    //异步方法
  actions:{
    setName({commit,state}){
        commit('show'); //触发mutations中的方法
    },
    setName2({commit,state}){
      commit('show2'); //触发mutations中的方法
  }
  }
})
