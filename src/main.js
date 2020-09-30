import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';


import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueJwtDecode from "vue-jwt-decode";
Vue.prototype.$VueJwtDecode = VueJwtDecode; 

import VueCookie from "vue-cookie";
Vue.prototype.$VueCookie = VueCookie; 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')