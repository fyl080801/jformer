import Vue from 'vue'

export const App = Vue.extend({
  data() {
    return {
      params: { extra: 'hello!!' },
      model: {
        text: 'aaaa'
      },
      options: {
        fields: [
          { component: 'p', '$:text': 'params.extra' },
          {
            component: 'input',
            events: [{ name: 'input', '@text:handler': 'arguments[0].target.value' }],
            fieldOptions: { domProps: { '$:value': 'model.text' } }
          },
          { component: 'p', '$:text': 'model.text' },
          { component: 'p', '$:text': 'model.text.length' },
          { component: 'p', '#:text': '输入了 ${model.text}' },
          { component: 'p', '#:text': '输入了 ${model.text.length} 个字' },
          { component: 'p', text: 'model.text' },
          {
            component: 'button',
            text: 'click',
            fieldOptions: { on: { '@:click': 'alert(model.text)' } }
          }
        ]
      }
    }
  },
  render() {
    return (
      <div>
        <j-former v-model={this.model} options={this.options} params={this.params}></j-former>
      </div>
    )
  }
})
