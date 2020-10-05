<template>
  <div v-if="!updating">
    <j-former
      :key="index"
      v-for="(item, index) in data"
      :value="item"
      :params="{ ...params, $index: index }"
      :config="config"
    ></j-former>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    params: Object,
    config: Object
  },
  watch: {
    'data.length': {
      handler() {
        this.updating = true
        this.$nextTick(() => {
          this.updating = false
        })
      }
    }
  },
  data() {
    return {
      updating: false
    }
  }
}
</script>
