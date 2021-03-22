<template>
  <h1>Home</h1>
  <p>
    <img src="../assets/logo.png" alt="logo" />
  </p>
  <button @click="state.count++">count is: {{ state.count }}</button>
  <Foo @layout="updateLayout" />
</template>

<script>
import { reactive, defineAsyncComponent } from 'vue'
export default {
  name: 'Home',
  components: {
    Foo: defineAsyncComponent(() => import('../components/Foo.vue'))
  },
  setup (props, context) {
    const state = reactive({ count: 0 })
    const updateLayout = (layout) => {
      context.emit('update:layout', layout)
    }
    return { state, updateLayout }
  },
}
</script>

<style scoped>
h1,
a {
  color: green;
}
</style>
