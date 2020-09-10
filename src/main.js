import { App } from './App'
import Vue from 'vue'
import jformer from '../lib'

Vue.config.productionTip = false

Vue.use(jformer)

new Vue({
  render: h => h(App)
}).$mount('#app')
