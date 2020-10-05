<template>
  <v-jform
    v-model="value"
    :params="params"
    :components="components"
    :fields="config.fields"
    :listeners="config.listeners"
    :datasource="config.datasource"
    :options="options"
  ></v-jform>
</template>

<script>
import VJForm from 'vjform/dist/vjform.common'

export default {
  name: 'j-former',
  props: {
    value: Object,
    params: Object,
    config: {
      type: Object,
      default: function() {
        return {}
      }
    },
    options: Object,
    components: Object
  },
  components: { 'v-jform': VJForm }
}
</script>
