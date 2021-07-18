<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <watch></watch>
</template>

<script>
import Watch from './components/watch.vue'

export default {
  name: 'App',
  components: {
    Watch
  }
}
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
