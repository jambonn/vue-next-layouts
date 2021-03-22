<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { useLayout } from '../composables/useLayout'
export default {
  setup() {
    const { updateLayout } = useLayout()
    updateLayout('default')
    return {
      msg: 'About'
    }
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
