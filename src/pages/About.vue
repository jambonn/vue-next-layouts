<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import LayoutDark from '../layouts/Dark.vue'
export default {
  setup(props, context) {
    const updateLayout = (layout) => {
      context.emit('update:layout', layout)
    }
    updateLayout(LayoutDark)
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
