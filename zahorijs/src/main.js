// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
window.zahorijs = new Vue({
  components: { App },
  template: '<App/>',
  created(){

    // añade el elemento creado y su contenido al DOM
      var newDiv = document.createElement("div");
    document.body.appendChild(newDiv);
    this.$mount(newDiv);
  }
})
