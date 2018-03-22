import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    steps: []
  },
  mutations:{
    addStep(state, step){
      state.steps.push(step);
    },
    editStep(state, data){
      state.steps.splice(data.index, 1, data.step);
    }
  }
});
