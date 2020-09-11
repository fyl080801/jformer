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

## 前缀定义

前缀定义实际上是简化了原来的转换定义，在属性名上加上相应前缀实现转换功能

| 前缀            | 说明                    |
| --------------- | ----------------------- |
| \$              | 表达式                  |
| #               | 文本模板                |
| @               | 事件                    |
| @<`model` 属性> | 更新 `model` 属性的事件 |

### 表达式

在属性前面加上 `$` 前缀，实现将表达式的结果关联到属性上，直接支持 js 语法对属性进行处理

```json
{
  "component": "div",
  "fieldOptions": {
    "props": {},
    "domProps": {
      "$:innerText": "model.text.length + 1" // 这里支持直接取 model，params，datasource，sourcedata 的属性进行计算关联到属性
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

## 完整示例

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
