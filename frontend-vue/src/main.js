import Vue from 'vue'
import VueCookie from 'vue-cookie'
// import VeeValidate from 'vee-validate'

import App from './App.vue'
import store from './store'
import router from './plugins/router'
import vuetify from './plugins/vuetify'
// eslint-disable-next-line no-unused-vars
import base from './plugins/base'

import '@mdi/font/css/materialdesignicons.css'
import moment from 'moment'

Vue.prototype.moment = moment

Vue.config.productionTip = false

// Vue.use(VeeValidate)
Vue.use(VueCookie)
const app = new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')

window.App = app
