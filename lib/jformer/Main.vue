<template>
  <v-jform
    v-model="value"
    :components="components"
    :fields="options.fields"
    :listeners="options.listeners"
    :datasource="options.datasource"
    :params="params"
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
    options: Object,
    components: Object
  },
  components: { 'v-jform': VJForm }
}
</script>
