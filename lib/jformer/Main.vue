<template>
  <v-jform
    :tag="tag"
    v-model="value"
    :params="params"
    :components="components"
    :fields="config.fields"
    :listeners="config.listeners"
    :datasource="config.datasource"
    :options="options"
    :initialling="initialling"
  ></v-jform>
</template>

<script>
import VJForm from 'vjform'

export default {
  name: 'j-former',
  props: {
    tag: String,
    value: Object,
    params: Object,
    config: {
      type: Object,
      default: () => ({ datasource: {}, listeners: [], fields: [] })
    },
    options: Object,
    components: Object,
    initialling: Function
  },
  components: { 'v-jform': VJForm }
}
</script>
