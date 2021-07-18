<template>
    <p>watch vs watchEffect</p>
    <p>{{numberRef}}</p>
    <p>{{name}} {{age}}</p>
    <p>{{ageRef}}</p>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import watchCompletion from './watch'

export default {
  name: 'Watch',
  setup () {
    const numberRef = ref(100)
    const state = reactive({
      name: 'badguy',
      age: 20
    })

    watchEffect(() => {
      // 初始化时，一定会执行一次（收集要监听的数据）
      console.log('hello watchEffect')
    })
    // watchEffect(() => {
    //   console.log('state.name', state.name)
    // })
    // watchEffect(() => {
    //   console.log('state.age', state.age)
    // })
    // watchEffect(() => {
    //   console.log('state.age', state.age)
    //   console.log('state.name', state.name)
    // })
    setTimeout(() => {
      state.age = 26
    }, 1500)
    setTimeout(() => {
      state.name = 'badman'
    }, 3000)

    // ----------------
    const { myReactive, myWatchEffect } = watchCompletion()
    const p1 = myReactive({ name: 'badguy', age: 18 })
    // const p2 = reactive({ name: 'badguy', age: 18 })
    const ageRef = ref(p1.age)

    myWatchEffect(() => {
      console.log(p1.age)
    })

    setTimeout(() => {
      ageRef.value = 26
      p1.age = 26
    }, 3000)

    // watch(numberRef, (newNumber, oldNumber) => {
    //     console.log('ref watch', newNumber, oldNumber)
    // }
    // // , {
    // //     immediate: true // 初始化之前就监听，可选
    // // }
    // )

    // setTimeout(() => {
    //     numberRef.value = 200
    // }, 1500)

    // watch(
    //     // 第一个参数，确定要监听哪个属性
    //     () => state.age,

    //     // 第二个参数，回调函数
    //     (newAge, oldAge) => {
    //         console.log('state watch', newAge, oldAge)
    //     },

    //     // 第三个参数，配置项
    //     {
    //         immediate: true, // 初始化之前就监听，可选
    //         // deep: true // 深度监听
    //     }
    // )

    // setTimeout(() => {
    //     state.age = 25
    // }, 1500)
    // setTimeout(() => {
    //     state.name = '双越A'
    // }, 3000)

    return {
      numberRef,
      ageRef,
      ...toRefs(state)

    }
  }
}
</script>
