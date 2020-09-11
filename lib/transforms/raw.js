import vjform from 'vjform'

const getter = function(key) {
  const keyArray = key.toString().split(':')

  if (keyArray.length <= 1) {
    return false
  }

  if (keyArray[0] === '^') {
    return true
  }

  return false
}

const setter = function(key, owner) {
  const keyArray = key.toString().split(':')
  const value = owner[key]

  if (keyArray.length <= 1) {
    return
  }

  const reKey = keyArray[1]

  owner[reKey] = undefined

  Object.defineProperty(owner, reKey, {
    get: () => value
  })

  delete owner[key]

  // 返回 false 表示属性的值无论是什么都不做转换
  return false
}

vjform.feature.transform(getter, setter)
