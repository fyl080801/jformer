import Vue from 'vue'
import { Select } from './components/Select'

export const App = Vue.extend({
  data() {
    return {
      params: { extra: 'hello!!' },
      model: {
        text: 'aaaa',
        select: 1
      },
      options: {
        datasource: {
          selects: { type: 'request', method: 'GET', url: '/data/testdata.json', autoload: true }
        },
        listeners: [
          { watch: 'model.select', actions: [{ '@:handler': 'alert("选择了" + model.select)' }] }
        ],
        fields: [
          { component: 'p', '$:text': 'params.extra' },
          { component: 'h2', text: '- 输入' },
          {
            component: 'input',
            events: [{ name: 'input', '@text:handler': 'arguments[0].target.value' }],
            fieldOptions: { domProps: { '$:value': 'model.text' } }
          },
          { component: 'h2', text: '- 数据关联' },
          { component: 'p', '$:text': 'model.text' },
          { component: 'p', '$:text': 'model.text.length' },
          { component: 'p', '#:text': '输入了 ${model.text}' },
          { component: 'p', '#:text': '输入了 ${model.text.length} 个字' },
          { component: 'p', text: 'model.text' },
          { component: 'h2', text: '- 选项支持' },
          {
            component: 'v-select',
            fieldOptions: {
              props: {
                '$:value': 'model.select',
                '$:items': 'sourcedata.selects'
              },
              on: { '@select:input': 'arguments[0]' }
            }
          },
          {
            component: 'v-select',
            model: ['select2'],
            fieldOptions: {
              props: { '$:items': 'sourcedata.selects' }
            }
          },
          { component: 'h2', text: '- 事件' },
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
        <j-former
          v-model={this.model}
          options={this.options}
          params={this.params}
          components={{ 'v-select': Select }}
        ></j-former>
        <p>{JSON.stringify(this.model)}</p>
      </div>
    )
  }
})
