export const getFunctionResult = (value, context) => {
  const { $result, $scope = [] } = value
  const args = []

  if (typeof $result !== 'string') {
    return $result
  }

  $scope.forEach(key => {
    args.push({ key, value: context[key] })
  })

  const funcArgs = args
    .sort((a, b) => a.key.charCodeAt() - b.key.charCodeAt())
    .concat(context.functional.map(fx => ({ key: fx.name, value: fx.fx })))
  // 加上函数引用

  try {
    return new Function(...funcArgs.map(a => a.key).concat([`return ${$result}`]))(
      ...funcArgs.map(a => a.value)
    )
  } catch {
    //
  }
}

export const getter = prop => {
  const keyArray = prop.toString().split(':')

  if (keyArray.length <= 1) {
    return false
  }

  if (keyArray[0] === '$') {
    return true
  }

  return false
}

export const deal = (prop, owner, options) => {
  const keyArray = prop.toString().split(':')
  const expr = owner[prop]
  const { context } = options

  if (keyArray.length <= 1) {
    return
  }

  const reKey = keyArray[1]

  owner[reKey] = undefined

  Object.defineProperty(owner, reKey, {
    get: () =>
      getFunctionResult(
        {
          $result: expr,
          $scope: ['model', 'params', 'datasource']
        },
        context
      )
  })

  delete owner[prop]
}
