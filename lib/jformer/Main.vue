<template>
  <v-jform
    v-model="value"
    :params="params"
    :components="components"
    :fields="options.fields"
    :listeners="options.listeners"
    :datasource="options.datasource"
    :options="options.config"
  ></v-jform>
</template>

<script>
import VJForm from 'vjform'
import '../transforms'

export default {
  name: 'j-former',
  props: {
    value: Object,
    params: Object,
    options: {
      type: Object,
      default: function() {
        return {}
      }
    },
    components: Object
  },
  components: { 'v-jform': VJForm }
}
</script>
