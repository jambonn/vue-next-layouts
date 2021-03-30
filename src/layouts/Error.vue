<template>
  <div class="container">
    <h1 v-if="error.code === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <router-link to="/">
      Home page
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from '../store'
export default {
  setup() {
    const store = useStore()
    return { error: computed(() => store.state.error) }
  },
}
</script>

<style scoped>
.container {
  font-family: sans-serif;
  padding-top: 10%;
  text-align: center;
}
h1 {
  font-size: 20px;
}
</style>
