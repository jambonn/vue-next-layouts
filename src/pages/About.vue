<template>
  <h1>{{ msg }}</h1>
  <PageAbout />
</template>

<script>
export default {
  setup() {
    return {
      msg: 'About'
    }
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
