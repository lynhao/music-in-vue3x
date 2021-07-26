<template>
  <h1>{{ msg }}</h1>
  <lifestyle></lifestyle>
</template>

<script>
import Lifestyle from './life-style.vue'

export default {
  components: {
    Lifestyle
  }
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
