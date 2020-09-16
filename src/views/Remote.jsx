import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      loading: false,
      model: {},
      options: {},
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
        this.options.datasource = form.datasource
        this.options.listeners = form.listeners
        this.options.fields = form.fields
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
          <j-former v-model={this.model} options={this.options} params={this.params}></j-former>
        ) : null}
        <p>{JSON.stringify(this.model)}</p>
      </div>
    )
  }
})
