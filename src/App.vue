<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </component>
</template>
<script>
import { defineAsyncComponent, computed } from 'vue'
import { useStore } from './store'

export default {
  name: 'App',
  components: {
    'LayoutDefault': defineAsyncComponent(() => import('./layouts/Default.vue')),
  },
  setup() {
    const store = useStore()
    return { layout: computed(() => store.state.layout) }
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
