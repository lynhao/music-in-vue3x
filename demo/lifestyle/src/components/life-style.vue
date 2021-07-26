<template>
  <h1>Hello {{ name }}, {{time}}</h1>
</template>

<script>
import { getCurrentInstance, ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

export default {
    data() {
        return {
            name: 'myfriend'
        }
    },
    setup() {
        let time = ref(0)
        console.log(getCurrentInstance().data.name)
        console.log('setup')

        onBeforeMount(() => {
            console.log('onBeforeMount')
        })
        onMounted(() => {
            console.log('onMounted')
        })
        onBeforeUpdate(() => {
            console.log('onBeforeUpdate')
        })
        onUpdated(() => {
            console.log('onUpdated')
        })
        onBeforeUnmount(() => {
            console.log('onBeforeUnmount')
        })
        onUnmounted(() => {
            console.log('onUnmounted')
        })
        setTimeout(() => {
            time.value = Date.now()
        }, 1000);
        return {
            time
        }
    },
    beforeCreate() {
        console.log('beforeCreate')
    },
    created() {
        console.log('created')
    },
    beforeMount() {
        console.log('beforeMount')
    },
    mounted() {
        console.log('mounted') 
    },
    beforeUpdate() {
        console.log('beforeUpdate') 
    },
    updated() {
        console.log('updated') 
    },
    beforeUnmount() {
        console.log('beforeUnmount')
    },
    unmounted() {
        console.log('unmounted')
    }
}
</script>