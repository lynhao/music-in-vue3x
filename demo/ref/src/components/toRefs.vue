<template>
    <div>
        <span> today is {{}} {{weather}}</span>,
        <span> my mood is {{mood}}</span>
    </div>
</template>

<script>
import { toRefs, reactive } from 'vue'

export default {
    name: 'Ref',
    setup() {
        // 1. 将响应式对象转为普通对象
        // 2. 生成的普通对象的每一个属性都是一个ref
        // 3. 直接解构reactive对象模板将失去响应式
        // 4. 直接解构toRefs继续保持响应式
        // 5. 在合成函数返回的对象是响应式

        // reactive
        const state = reactive({
            weather: 'sunny',
            mood: 'not bad'
        })
        const allRef = toRefs(state)

        setTimeout(() => {
            allRef.weather.value = 'windy'
            allRef.mood.value = 'well'
            // state.weather = 'windy'
            console.log(state, allRef)
        }, 2000);

        return {
            ...allRef
            // ...state
        }
    },
}
</script>