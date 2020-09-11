import Vue from 'vue'

export const Select = Vue.extend({
  props: {
    items: Array,
    value: [Object, String, Number],
    labelProp: { type: String, default: 'label' },
    valueProp: { type: String, default: 'value' }
  },
  render() {
    return (
      <select value={this.value} onInput={evt => this.$emit('input', evt.target.value)}>
        {(this.items || []).map(item => (
          <option value={item[this.valueProp]}>{item[this.labelProp]}</option>
        ))}
      </select>
    )
  }
})
