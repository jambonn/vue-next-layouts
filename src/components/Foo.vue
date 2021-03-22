<template>
  <p>Footer</p>
</template>

<script>
import LayoutDefault from '../layouts/Default.vue'
export default {
  name: 'Foo',
  setup(props, context) {
    context.emit('layout', LayoutDefault);
  }
}
</script>
