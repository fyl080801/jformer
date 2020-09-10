# jformer

根据 vjform 的设计思路，设计一个简化版的 json 解析方式  

## 前缀定义

| 前缀 | 说明 |
|--|--|
| $ | 表达式 |
| # | 文本模板 |
| @ | 事件 |
| @<model属性> | 更新 `model` 属性的事件 |

## 示例

```json
{
  "datasource": {
    "list": {
      "type": "request",
      "options": {
        "method": "GET",
        "url": "http://localhost:8080/paths/data.json",
        "params": {}
      }
    },
    "detail": {
      "type": "request",
      "options": {
        "method": "GET",
        "url": "http://localhost:8080/paths/data.json",
        "params": {}
      },
      "on": {}
    }
  },
  "listeners": [
    {
      "watch": "model.text",
      "deep": false,
      "actions": [
        { "@:handle": "datasource.load()", "$:condition": "model.text.length >= 4" },
        { "@:handle": "detail.load()" },
        { "@text2:handle": "model.text + 'xxx'" }
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
        "props": {
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
          "#:innerText": "input ${model.text}"
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
