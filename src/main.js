import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import Switches from 'vue-switches'
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.component('v-select', vSelect)
Vue.component('v-switch', Switches)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
