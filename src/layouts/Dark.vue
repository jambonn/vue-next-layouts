<template>
  <div class="LayoutDefault dark">
    <main class="LayoutDefault__main">
      <slot/>
    </main>
    <nav class="LayoutDefault__nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <footer class="LayoutDefault__footer">
      &copy; Jambon
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LayoutDark',
};
</script>

<style>
.LayoutDefault.dark {
  background-color: #000000;
  color: #ffffff;
}
.LayoutDefault.dark a {
  color: #ffffff;
}
</style>

