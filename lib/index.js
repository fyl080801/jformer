import { JFormer } from './jformer'
import VJForm from 'vjform'

const install = function(Vue) {
  Vue.component('j-former', JFormer)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  ...JFormer,
  install,
  base: VJForm
}
