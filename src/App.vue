<template>
  <component :is="layout">
    <router-view v-slot="{ Component }" v-model:layout="layout">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </component>
</template>
<script>
import { shallowRef } from 'vue'
export default {
  name: 'App',
  setup() {
    const layout = shallowRef('div')
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
