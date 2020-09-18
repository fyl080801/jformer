import vjform, { deepSet } from 'vjform'
import { getFunctionResult } from './expression'
import { cloneDeep, isArray } from 'lodash-es'

export const getOnFunction = function(options) {
  return function() {
    const { $key } = options
    const result = getFunctionResult.call({ ...this, arguments: [...arguments] }, options)
    const modelPath = $key.replace('@', '').trim()

    if (
      this.model !== undefined &&
      this.model !== null &&
      (typeof this.model === 'object' || isArray(this.model)) &&
      modelPath.length > 0
    ) {
      deepSet(this.model, modelPath, typeof result === 'object' ? cloneDeep(result) : result)
    } else {
      return result
    }
  }.bind(this)
}

const getter = function(key) {
  const keyArray = key.toString().split(':')

  if (keyArray.length <= 1) {
    return false
  }

  if (keyArray[0].indexOf('@') === 0) {
    return true
  }

  return false
}

const setter = function(key, owner) {
  const keyArray = key.toString().split(':')
  const expr = owner[key]

  if (keyArray.length <= 1) {
    return
  }

  const reKey = keyArray[1]
  const expKey = keyArray[0]

  owner[reKey] = undefined

  Object.defineProperty(owner, reKey, {
    get: () => {
      return getOnFunction.call(this, {
        $result: expr,
        $scope: ['model', 'params', 'datasource', 'arguments'],
        $key: expKey
      })
    }
  })

  delete owner[key]
}

vjform.feature.transform(getter, setter).isConvert()
