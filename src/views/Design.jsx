import Vue from 'vue'
import { Select } from '../components/Select'
import Repeat from '../components/Repeat.vue'

export default Vue.extend({
  data() {
    return {
      params: {
        extra: 'xxx'
      },
      model: {
        select: 1,
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
          {
            watch: 'model.select',
            actions: [{ handler: { $type: 'design', $value: '@:alert("选择了" + model.select)' } }]
          }
        ],
        fields: [
          { component: 'p', text: { $type: 'design', $value: '$:params.extra' } },
          { component: 'h2', text: '- 输入' },
          {
            component: 'input',
            events: [
              {
                name: 'input',
                handler: { $type: 'design', $value: '@text:arguments[0].target.value' }
              }
            ],
            fieldOptions: { domProps: { value: { $type: 'design', $value: '$:model.text' } } }
          },
          {
            component: 'v-select',
            fieldOptions: {
              props: {
                value: { $type: 'design', $value: '$:model.select' },
                items: { $type: 'design', $value: '$:datasource.selects.data' }
              },
              on: { input: { $type: 'design', $value: '@select:arguments[0]' } }
            }
          },
          {
            component: 'v-repeat',
            fieldOptions: {
              props: {
                data: { $type: 'design', $value: '$:model.listData' },
                params: {
                  listData: { $type: 'design', $value: '$:model.listData' }
                },
                '^:config': {
                  fields: [
                    {
                      component: 'div',
                      fieldOptions: {
                        style: { border: '1px solid black', margin: '10px', padding: '5px' }
                      },
                      children: [
                        {
                          component: 'p',
                          text: { $type: 'design', $value: '#:第 ${params.$index} 项' }
                        },
                        { component: 'input', model: ['text'] },
                        {
                          component: 'button',
                          text: '删除',
                          fieldOptions: {
                            on: {
                              click: {
                                $type: 'design',
                                $value: '@:params.listData.splice(params.$index ,1)'
                              }
                            }
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
        <h1>设计器转换支持</h1>
        <p>
          vjdesign
          设计器编辑属性需要标识属性是用哪种编辑器来设置的值，在实际使用中忽略编辑器标识，直接将值作为输出结果
        </p>
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
