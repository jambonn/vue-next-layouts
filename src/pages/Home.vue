<template>
  <h1>Home</h1>
  <p>
    <img src="../assets/logo.png" alt="logo" />
  </p>
  <button @click="state.count++">count is: {{ state.count }}</button>
  <Foo />
</template>

<script>
import { reactive, defineAsyncComponent } from 'vue'
export default {
  name: 'Home',
  components: {
    Foo: defineAsyncComponent(() => import('../components/Foo.vue'))
  },
  setup () {
    const state = reactive({ count: 0 })
    return { state }
  },
}
</script>

<style scoped>
h1,
a {
  color: green;
}
</style>
