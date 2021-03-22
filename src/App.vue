<template>
  <component :is="`layout-${layout}`">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </component>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import { useLayout } from './composables/useLayout'
export default {
  name: 'App',
  components: {
    'LayoutDefault': defineAsyncComponent(() => import('./layouts/Default.vue')),
    'LayoutDark': defineAsyncComponent(() => import('./layouts/Dark.vue'))
  },
  setup() {
    const { layout } = useLayout()
    return { layout }
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
