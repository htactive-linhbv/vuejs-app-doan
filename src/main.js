import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal'



Vue.use(VModal);

axios.defaults.baseURL = 'http://52.149.155.107/api/'; //'http://localhost:3000/api/';
axios.defaults.headers.common['authorization-chutro'] = `Bearer ${localStorage.getItem('chutro-token')}`;
axios.defaults.headers.common['authorization-admin'] = `Bearer ${localStorage.getItem('admin-token')}`;
Vue.use(Vuelidate)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
