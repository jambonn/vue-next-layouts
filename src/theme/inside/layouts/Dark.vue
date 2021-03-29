<template>
  <div class="LayoutDefault dark">
    <main class="LayoutDefault__main">
      <slot/>
    </main>
    <nav class="LayoutDefault__nav">
      <router-link to="/">Home</router-link> |
      <router-link to="collections">Collections</router-link> |
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

<style scoped>
.LayoutDefault {
  max-width: 42em;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1em;
  padding-left: 1em;
}
.LayoutDefault .LayoutDefault__nav {
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #c0c0c0;
}
.LayoutDefault .LayoutDefault__user {
  float: right;
}
.LayoutDefault .LayoutDefault__main {
  padding-top: 1.5em;
  padding-bottom: 2em;
}
.LayoutDefault .LayoutDefault__footer {
  padding-top: 1em;
  padding-bottom: 1em;
  border-top: 1px solid #c0c0c0;
}
.LayoutDefault.dark {
  background-color: #000000;
  color: #ffffff;
}
.LayoutDefault.dark a {
  color: #ffffff;
}
</style>

