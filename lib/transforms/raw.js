export const getter = prop => {
  const keyArray = prop.toString().split(':')

  if (keyArray.length <= 1) {
    return false
  }

  if (keyArray[0] === '^') {
    return true
  }

  return false
}

export const deal = (prop, owner) => {
  const keyArray = prop.toString().split(':')
  const value = owner[prop]

  if (keyArray.length <= 1) {
    return
  }

  const reKey = keyArray[1]

  owner[reKey] = undefined

  Object.defineProperty(owner, reKey, {
    get: () => value
  })

  delete owner[prop]

  // 返回 false 表示属性的值无论是什么都不做转换
  return false
}
