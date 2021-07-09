import 'nprogress/nprogress.css';
import Vue from 'vue';
import App from './app.vue';
import http from './http';
import router from './router';
Vue.prototype.http = http;
 new Vue({
  el: '#app',
  render: h => h(App),
  router,
})