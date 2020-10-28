import { JFormer } from './jformer'
import VJForm from 'vjform'
import modern from 'jpresent-transform-modern'
import expression from 'jpresent-transform-expression'
import design from 'jpresent-transform-design'

VJForm.use(modern)
VJForm.use(expression)
VJForm.use(design)

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
