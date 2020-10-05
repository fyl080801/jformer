import { JFormer } from './jformer'
import VJForm from 'vjform/dist/vjform.common'
import * as expression from './transforms/expression'
import * as raw from './transforms/raw'
import * as template from './transforms/template'
import * as on from './transforms/on'

VJForm.use(({ transform }) => {
  transform(expression.getter, expression.deal)
  transform(raw.getter, raw.deal)
  transform(template.getter, template.deal)
  transform(on.getter, on.deal)
})

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
