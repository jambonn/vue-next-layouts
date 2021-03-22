import { ref, computed } from 'vue'

const layout = ref('default')

export const useLayout = () => {
  const updateLayout = (name) => {
    layout.value = name
  }
  return {
    layout: computed(() => layout.value),
    updateLayout,
  }
}
