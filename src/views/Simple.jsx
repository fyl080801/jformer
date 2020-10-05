import Vue from 'vue'
import { Select } from '../components/Select'
import Repeat from '../components/Repeat.vue'

export default Vue.extend({
  data() {
    return {
      params: { extra: 'hello!!' },
      model: {
        text: 'aaaa',
        select: 1,
        obj: { select: 1 },
        listData: []
      },
      config: {
        datasource: {
          selects: {
            type: 'request',
            method: 'GET',
            url: '/data/testdata.json',
            autoload: true
          }
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
                '$:items': 'datasource.selects.data'
              },
              on: { '@select:input': 'arguments[0]' }
            }
          },
          {
            component: 'v-select',
            fieldOptions: {
              props: {
                '$:value': 'model.obj.select',
                '$:items': 'datasource.selects.data'
              },
              on: { '@obj.select:input': 'arguments[0]' }
            }
          },
          { component: 'h2', text: '- 事件' },
          {
            component: 'button',
            text: 'click',
            fieldOptions: { on: { '@:click': 'alert(model.text)' } }
          },
          { component: 'h2', text: '- 动态组件嵌套' },
          {
            component: 'v-repeat',
            fieldOptions: {
              props: {
                '$:data': 'model.listData',
                params: {
                  '$:listData': 'model.listData'
                },
                '^:config': {
                  fields: [
                    {
                      component: 'div',
                      fieldOptions: {
                        style: { border: '1px solid black', margin: '10px', padding: '5px' }
                      },
                      children: [
                        { component: 'p', '#:text': '第 ${params.$index} 项' },
                        { component: 'input', model: ['text'] },
                        {
                          component: 'button',
                          text: '删除',
                          fieldOptions: {
                            on: { '@:click': 'params.listData.splice(params.$index ,1)' }
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            }
          },
          {
            component: 'button',
            text: '添加项',
            fieldOptions: { on: { '@:click': 'model.listData.push({})' } }
          }
        ]
      }
    }
  },
  render() {
    return (
      <div>
        <h1>简单示例</h1>
        <j-former
          v-model={this.model}
          config={this.config}
          params={this.params}
          components={{ 'v-select': Select, 'v-repeat': Repeat }}
        ></j-former>
        <p>{JSON.stringify(this.model)}</p>
      </div>
    )
  }
})
