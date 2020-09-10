import Vue from 'vue'
import VJForm from 'vjform'
import '../transforms'

export const Main = Vue.extend({
  props: {
    value: Object,
    params: Object,
    options: Object,
    components: Object
  },
  render() {
    return (
      <VJForm
        value={this.value}
        onInput={value => this.$emit('input', value)}
        components={this.components}
        fields={this.options.fields}
        listeners={this.options.listeners}
        datasource={this.options.datasource}
        params={this.params}
      ></VJForm>
    )
  }
})
