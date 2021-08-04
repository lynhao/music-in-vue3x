<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <ref></ref> -->
  <!-- <to-ref></to-ref> -->
  <to-refs></to-refs>
</template>

<script setup>
import Ref from './components/ref.vue'
import ToRef from './components/toRef.vue'
import ToRefs from './components/toRefs.vue'

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
