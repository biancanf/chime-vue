import Vue from 'vue'
import App from './App.vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css';
import BootstrapVue from 'bootstrap-vue'// BOOTSTRAP _ VUE IMPORT 
import 'bootstrap/dist/css/bootstrap.css' 
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)

Vue.use(Vuesax, {
  // options here
})

Vue.use(VueSidebarMenu)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
