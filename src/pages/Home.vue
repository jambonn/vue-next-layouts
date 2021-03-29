<template>
  <h1>Home</h1>
  <p>
    <img src="../assets/logo.png" alt="logo" />
  </p>
  <button @click="state.count++">count is: {{ state.count }}</button>
  <PageHome />
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Home',
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
