// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import store from './store'

Vue.use(Vuex);

Vue.config.productionTip = false

/* eslint-disable no-new */
window.zahorijseditor = new Vue({
  components: { App },
  template: '<App/>',
  store,
  created(){
    // añade el elemento creado y su contenido al DOM
    var newDiv = document.createElement("div");
    document.body.appendChild(newDiv);
    this.$mount(newDiv);
  }
})
