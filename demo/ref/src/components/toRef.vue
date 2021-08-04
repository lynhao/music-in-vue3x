<template>
    <div>
        <span> today is {{weatherRef}} {{state.weather}}</span>,
        <span> my mood is {{state.mood}}</span>
    </div>
</template>

<script>
import { toRef, reactive } from 'vue'

export default {
    name: 'Ref',
    setup() {
        // not reactive
        // const state = {
        //     weather: 'sunny',
        //     mood: 'not bad'
        // }

        // reactive
        const state = reactive({
            weather: 'sunny',
            mood: 'not bad'
        })
        const weatherRef = toRef(state, 'weather')

        setTimeout(() => {
            // weatherRef.value = 'windy'
            state.weather = 'cloudy'
        }, 2000);

        return {
            weatherRef,
            state
        }
    },
}
</script>