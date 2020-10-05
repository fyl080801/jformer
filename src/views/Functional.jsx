import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      model: { value1: 0, value2: 0, value3: 0, value4: 0, nvalue: 0 },
      params: {},
      config: {
        fields: [
          {
            component: 'p',
            text:
              '内置函数看 vjform 的代码吧，平时工作都忙不完哪有时间写文档，理论上 window 上的所有函数都支持'
          },
          {
            component: 'div',
            children: [
              { component: 'span', text: '相加：' },
              {
                component: 'input',
                model: 'value1',
                fieldOptions: { domProps: { type: 'number' } }
              },
              {
                component: 'span',
                text: '+'
              },
              {
                component: 'input',
                model: 'value2',
                fieldOptions: { domProps: { type: 'number' } }
              },
              {
                component: 'span',
                '#:text': '= ${ADDITION(model.value1, model.value2)}'
              }
            ]
          },
          {
            component: 'div',
            children: [
              { component: 'span', text: '相乘：' },
              {
                component: 'input',
                model: 'value3',
                fieldOptions: { domProps: { type: 'number' } }
              },
              {
                component: 'span',
                text: 'x'
              },
              {
                component: 'input',
                model: 'value4',
                fieldOptions: { domProps: { type: 'number' } }
              },
              {
                component: 'span',
                '#:text': '= ${MULTIPLY(model.value3, model.value4)}'
              }
            ]
          },
          {
            component: 'div',
            children: [
              { component: 'h1', text: '自定义函数求n项相加的和' },
              {
                component: 'p',
                text: 'n(n+1)/2 看 lib 里 customFunction 的实现'
              },
              { component: 'span', text: '自定义函数：' },
              {
                component: 'input',
                model: 'nvalue',
                fieldOptions: { domProps: { type: 'number' } }
              },
              {
                component: 'span',
                '#:text': ' ${model.nvalue} 项相加后等于 ${N项之和(model.nvalue)}'
              }
            ]
          }
        ]
      }
    }
  },
  render() {
    return (
      <div>
        <h1>函数示例</h1>
        <j-former v-model={this.model} config={this.config} params={this.params}></j-former>
        <p>{JSON.stringify(this.model)}</p>
      </div>
    )
  }
})
