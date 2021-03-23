<template>
  <p>Footer</p>
</template>

<script>
export default {
  name: 'Foo',
  setup(props, context) {
    context.emit('layout', 'dark')
  }
}
</script>
