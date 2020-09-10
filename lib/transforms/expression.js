import vjform, { getFunctionals } from 'vjform'

export const getFunctionResult = function(option) {
  const { $result, $scope = [] } = option
  const args = []

  if (typeof $result !== 'string') {
    return $result
  }

  $scope.forEach(key => {
    args.push({ key, value: this[key] })
  })

  const funcArgs = args
    .sort((a, b) => a.key.charCodeAt() - b.key.charCodeAt())
    .concat(getFunctionals().map(fx => ({ key: fx.name, value: fx.fx })))
  // 加上函数引用

  try {
    const result = new Function(
      funcArgs.map(a => a.key),
      'return ' + $result
    ).apply(
      this,
      funcArgs.map(a => a.value)
    )

    return result
  } catch {
    //
  }
}

const getter = function(key) {
  const keyArray = key.toString().split(':')

  if (keyArray.length <= 1) {
    return false
  }

  if (keyArray[0] === '$') {
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
        $result: expr,
        $scope: ['model', 'params', 'datasource', 'sourcedata']
      })
    }
  })

  delete owner[key]
}

vjform.feature.transform(getter, setter)
