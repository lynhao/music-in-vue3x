<template>
    <div>
        <span> today is {{weatherRef}} </span>,
        <span> my mood is {{moodRef}}</span>,
        <span> drink {{state.food.join('')}}</span>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
    name: 'Ref',
    setup() {
        // 1. 生成值类型的响应式数据
        // 2. 可用于模板和reactive
        // 3. reactive对象与对应的ref保持引用关系

        // ref
        const weatherRef = ref('sunny')
        const moodRef = ref('good')
        const foodRef = ref([])

        // reactive
        const state = reactive({
            mood: moodRef,
            food: foodRef
        })

        setTimeout(() => {
            weatherRef.value = 'windy'
        }, 1000);

        setTimeout(() => {
            state.mood = 'pretty good' 
            foodRef.value = ['water']
        }, 2000);

        return {
            weatherRef,
            moodRef,
            state
        }
    },
}
</script>