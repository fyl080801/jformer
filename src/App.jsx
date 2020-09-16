import Vue from 'vue'

export const App = Vue.extend({
  render() {
    return (
      <div>
        <router-link to="/">simple</router-link> | <router-link to="/remote">remote</router-link>
        <router-view></router-view>
      </div>
    )
  }
})
