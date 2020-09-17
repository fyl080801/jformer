import { App } from './App'
import Vue from 'vue'
import VueRouter from 'vue-router'
import jformer from '../lib'

import './lib/fetchJson'
import './lib/customFunction'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(jformer)

new Vue({
  router: new VueRouter({
    mode: 'history',
    routes: [
      { path: '/simple', component: () => import('./views/Simple') },
      { path: '/remote', component: () => import('./views/Remote') },
      { path: '/functional', component: () => import('./views/Functional') },
      { path: '/', redirect: '/simple' }
    ]
  }),
  render: h => h(App)
}).$mount('#app')
