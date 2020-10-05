import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      loading: false,
      model: {},
      config: {},
      params: {}
    }
  },
  methods: {
    async load() {
      try {
        this.loading = true
        const result = await fetch('/data/form.json', {
          method: 'GET'
        })
        const form = await result.json()

        this.model = form.model
        this.config.datasource = form.datasource
        this.config.listeners = form.listeners
        this.config.fields = form.fields
        this.params = form.params
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.load()
  },
  render() {
    return (
      <div>
        {!this.loading ? (
          <j-former v-model={this.model} config={this.config} params={this.params}></j-former>
        ) : null}
        <p>{JSON.stringify(this.model)}</p>
      </div>
    )
  }
})
