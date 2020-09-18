# jformer

根据 [vjform](https://gitee.com/fyl080801_admin/vjform) 的设计思路，扩展一个简化版的 json 定义方式

基于 vjform 二次开发，简化了 json 定义方式且支持 vjform 全部功能

## 起步

安装包

```bash
npm i jformer
```

项目运行

```bash
npm i
npm run dev
```

## 特性

支持 vjform 全部原有功能，除此之外加入属性名前缀转换解析，可以直接在属性名上加入特定前缀，实现绑定、计算、事件的转换

整合了组件部分属性，让组件使用更清晰简便

## 组件属性

整合了部分属性到 `options` 中

| 前缀       | 说明                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| v-model    | 值                                                                                                          |
| params     | 输入的参数值，只会由组件外部更新                                                                            |
| options    | 包含 `fields` `datasource` `listeners`，对应 vjform 相应属性                                                |
| components | 单独引用的组件，理论上 jformer 支持 vue 项目中引用的任何组件, 如果未在项目中 use 则可以传到这里实现组件支持 |

## fields 组件定义规则

fields 属性定义内部组件，一个内部组件具有如下属性

| 属性         | 说明                                                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| component    | 组件名称，支持所有 html 标签和 vue 项目中引用的组件具有的名称                                                                                                                                                                         |
| fieldOptions | 组件的属性，是 vue 的 render 方法中 createElement 的第二个参数，具体参考 [Vue 官方定义](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1), 自定义组件 props 定义的属性均支持 |
| children     | 组件的下级组件                                                                                                                                                                                                                        |

json 定义示例

```json
{
  "component": "div",
  "fieldOptions": {
    "class": "",
    "style": {
      "margin": "10px"
    },
    "domProps": {}
  },
  "children": []
}
```

组件支持属性的快捷定义，使用 `vjform` 注册的快捷定义均可支持，常用快捷定义如下

| 属性      | 说明                                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| text      | 相当于 `fieldOptions.domProps.innerText` 属性                                                                     |
| condition | 根据条件决定组件是否存在，可配合 `$` 前缀实现表达式和关联                                                         |
| events    | 定义组件的事件行为                                                                                                |
| model     | 具有交互行为的组件可将值关联到`model`里的某个属性，组件的交互行为会改变 model 里的属性值，例如：`input`、`select` |

```json
[
  {
    "component": "p",
    "$:condition": "model.text.length > 4", // 条件显示
    "text": "文本"
  },
  {
    "component": "button",
    "events": [{ "name": "click", "@:handler": "alert('点击事件')" }]
  },
  {
    "component": "input",
    "model": "text" // 关联 model.text 属性
  }
]
```

fieldOptions 里的属性和组件的快捷定义均可以通过前缀定义实现程序逻辑

## 前缀定义

前缀定义实际上是简化了原来的转换定义，在属性名上加上相应前缀实现转换功能

| 前缀            | 说明                    |
| --------------- | ----------------------- |
| \$              | 表达式                  |
| #               | 文本模板                |
| @               | 事件                    |
| @<`model` 属性> | 更新 `model` 属性的事件 |
| ^               | 禁止转换                |

### 表达式

在属性前面加上 `$` 前缀，实现将表达式的结果关联到属性上，直接支持 js 语法对属性进行处理

```json
{
  "component": "div",
  "fieldOptions": {
    "props": {},
    "domProps": {
      "$:innerText": "model.text.length + 1" // 这里支持直接取 model，params，datasource 的属性进行计算关联到属性
    }
  }
}
```

### 文本模板

在属性前面加上 `#` 前缀，实现直接用 `es6` 的模板字符串输出内容

```json
{
  "component": "div",
  "fieldOptions": {
    "props": {},
    "domProps": {
      "#:innerText": "输入了 ${model.text}"
    }
  }
}
```

### 事件

在属性前面加上 `@` 前缀，可将表达式生成一个 `function` 关联到组件事件上

```json
{
  "component": "button",
  // 同样支持 vjform 的快速定义事件
  "events": [
    {
      "name": "click",
      "@:handler": "alert('clicked!')"
    }
  ]
}
```

如果在 `@` 后面加上 `model` 里的属性名，则可以实现触发事件后将表达式的结果直接更新到 `model` 属性上

```json
{
  "component": "input",
  "fieldOptions": {
    "domProps": {
      "$:value": "model.text"
    },
    "on": {
      "@text:input": "arguments[0].target.value" // 将输入结果更新到 model.text
    }
  }
}
```

## 禁止转换

在属性上加入 `^` 前缀，则属性的值不做转换，保持原有的值

当出现 jformer 嵌套 jformer 或者自定义组件里使用了 jformer 的时候，嵌套的 jformer 属性需要在内部进行处理而不是由外层统一转换处理的时候，可以在组件相应属性上加入 `^` 标识

实现一个 Repeat 组件，内部使用 jformer 呈现动态视图

```html
<template>
  <div v-if="!updating">
    <j-former
      :key="index"
      v-for="(item, index) in data"
      :value="item"
      :params="{ ...params, $index: index }"
      :options="options"
    ></j-former>
  </div>
</template>

<script>
  export default {
    props: {
      data: Array,
      params: Object,
      options: Object
    },
    watch: {
      'data.length': {
        handler() {
          this.updating = true
          this.$nextTick(() => {
            this.updating = false
          })
        }
      }
    },
    data() {
      return {
        updating: false
      }
    }
  }
</script>
```

在 jformer 中使用 Repeat 组件

```json
{
  "fields": [
    {
      "component": "v-repeat", // 自定义组件，实现根据数组数据遍历生成界面，内部使用 jformer 呈现界面
      "fieldOptions": {
        "props": {
          "$:data": "model.listData",
          "params": {
            "$:listData": "model.listData" // 为了在组件内部实现删除功能，以 params 方式将原数组传递给内部
          },
          // 使用 ^ 前缀，外层 jformer 不对属性值进行转换，而是由内部处理
          "^:options": {
            "fields": [
              {
                "component": "div",
                "fieldOptions": {
                  "style": { "border": "1px solid black", "margin": "10px", "padding": "5px" }
                },
                "children": [
                  { "component": "p", "#:text": "第 ${params.$index + 1} 项" },
                  { "component": "input", "model": ["text"] },
                  {
                    "component": "button",
                    "text": "delete",
                    "fieldOptions": {
                      "on": { "@:click": "params.listData.splice(params.$index ,1)" }
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
      "component": "button",
      "text": "add item",
      "fieldOptions": { "on": { "@:click": "model.listData.push({})" } }
    }
  ]
}
```

## JSON 定义完整示例

```json
{
  "datasource": {
    "list": {
      "type": "request",
      "method": "GET",
      "url": "http://localhost:8080/paths/data.json",
      "params": {}
    },
    "detail": {
      "type": "request",
      "method": "GET",
      "url": "http://localhost:8080/paths/detail.json",
      "params": {}
    }
  },
  "listeners": [
    {
      "watch": "model.text",
      "deep": false,
      "actions": [
        { "@:handler": "datasource.load()", "$:condition": "model.text.length >= 4" },
        { "@:handler": "detail.load()" },
        { "@text2:handler": "model.text + 'xxx'" }
      ]
    }
  ],
  "model": {
    "text": "",
    "text2": ""
  },
  "fields": [
    {
      "component": "input",
      "fieldOptions": {
        "domProps": {
          "$:value": "model.text"
        },
        "on": {
          "@text:input": "arguments[0].target.value"
        }
      }
    },
    {
      "component": "input",
      "model": "text2"
    },
    {
      "component": "div",
      "fieldOptions": {
        "props": {},
        "domProps": {
          "$:innerText": "model.text.length + 1"
        }
      }
    },
    {
      "component": "div",
      "fieldOptions": {
        "props": {},
        "domProps": {
          "#:innerText": "输入了 ${model.text}"
        }
      }
    },
    {
      "component": "button",
      "fieldOptions": {
        "props": {},
        "on": {
          "@:click": "datasource.load()"
        }
      }
    }
  ]
}
```
