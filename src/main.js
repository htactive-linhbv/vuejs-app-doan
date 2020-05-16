import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal'



Vue.use(VModal);
axios.defaults.baseURL ='http://40.117.90.230/api/';
axios.defaults.headers.common['authorization-chutro'] = `Bearer ${localStorage.getItem('chutro-token')}`
Vue.use(Vuelidate)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
