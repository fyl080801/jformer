import { JFormer } from './jformer'
import VJForm from 'vjform'
import modern from 'jpresent-transform-modern'

VJForm.use(modern)

const install = function(Vue) {
  Vue.component('j-former', JFormer)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  ...JFormer,
  install,
  use: VJForm.use
}
