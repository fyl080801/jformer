import JFormer from '../../lib/index'

JFormer.base.feature
  .datasource('fetchJson', function(getOptions) {
    const instance = {
      execute: () => {},
      loading: false,
      data: {}
    }

    const execute = async () => {
      const { url, method, onExecuted, onError } = getOptions()
      try {
        instance.loading = true
        const response = await fetch(url, { method })
        const result = await response.json()
        instance.data = result
        ;(onExecuted || (() => {}))(result)
      } catch {
        ;(onError || (() => {}))()
      } finally {
        instance.loading = false
      }
    }

    instance.execute = execute

    return instance
  })
  .withName('fetchJson')
