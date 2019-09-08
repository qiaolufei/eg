// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import '../node_modules/_bootstrap@3.4.1@bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/_bootstrap@3.4.1@bootstrap/dist/js/bootstrap.min.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,
  components: { App },
  template: '<App/>'
})