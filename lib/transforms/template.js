import vjform from 'vjform'
import { getFunctionResult } from './expression'

const getter = function(key) {
  const keyArray = key.toString().split(':')

  if (keyArray.length <= 1) {
    return false
  }

  if (keyArray[0] === '#') {
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

  owner[reKey] = undefined

  Object.defineProperty(owner, reKey, {
    get: () => {
      return getFunctionResult.call(this, {
        $result: '`' + expr + '`',
        $scope: ['model', 'params', 'datasource', 'sourcedata']
      })
    }
  })

  delete owner[key]
}

vjform.feature.transform(getter, setter)
