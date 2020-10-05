import { getFunctionResult } from './expression'
import { cloneDeep, isArray } from 'lodash-es'

export const getOnFunction = (value, options) => {
  return (...args) => {
    const { $key } = value
    const { context, emitter } = options
    const result = getFunctionResult(value, { ...context, arguments: [...args] })
    const modelPath = $key.replace('@', '').trim()

    if (
      context.model !== undefined &&
      context.model !== null &&
      (typeof context.model === 'object' || isArray(context.model)) &&
      modelPath.length > 0
    ) {
      emitter.emit('update', {
        path: modelPath,
        value: typeof result === 'object' ? cloneDeep(result) : result
      })
    } else {
      return result
    }
  }
}

export const getter = prop => {
  const keyArray = prop.toString().split(':')

  if (keyArray.length <= 1) {
    return false
  }

  if (keyArray[0].indexOf('@') === 0) {
    return true
  }

  return false
}

export const deal = (prop, owner, options) => {
  const keyArray = prop.toString().split(':')
  const expr = owner[prop]

  if (keyArray.length <= 1) {
    return
  }

  const reKey = keyArray[1]
  const expKey = keyArray[0]

  owner[reKey] = undefined

  Object.defineProperty(owner, reKey, {
    get: () =>
      getOnFunction(
        {
          $result: expr,
          $scope: ['model', 'params', 'datasource', 'arguments'],
          $key: expKey
        },
        options
      )
  })

  delete owner[prop]

  return false
}
