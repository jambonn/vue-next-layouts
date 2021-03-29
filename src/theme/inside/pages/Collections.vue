<template>
  <h2>Collection</h2>
</template>

<script>
export default {
  name: "Collections",
  layout (context) {
    console.log('context', context.store.state)
    return 'LayoutDefault'
  },
}
</script>
