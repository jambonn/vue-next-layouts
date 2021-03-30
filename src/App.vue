<template>
  <component :is="layout">
    <component :is="page" />
  </component>
</template>
<script>
import { defineAsyncComponent, computed } from 'vue'
import { useStore } from './store'

export default {
  name: 'App',
  components: {
    'LayoutDefault': defineAsyncComponent(() => import('./layouts/Default.vue')),
    'LayoutError': defineAsyncComponent(() => import('./layouts/Error.vue')),
  },
  setup() {
    const store = useStore()
    const page = computed(() => {
      if (store.state.error) {
        return 'LayoutError'
      }
      return 'RouterView'
    })
    return { layout: computed(() => store.state.layout), page }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
