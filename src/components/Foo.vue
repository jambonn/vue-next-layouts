<template>
  <p>Footer</p>
</template>

<script>
import { useLayout } from '../composables/useLayout'
export default {
  name: 'Foo',
  setup() {
    const { updateLayout } = useLayout()
    updateLayout('dark')
  }
}
</script>
