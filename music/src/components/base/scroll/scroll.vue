<template>
    <!--表示是一个ref对象-->
    <div ref="rootRef">
        <slot></slot>
    </div>
</template>

<script>
import useScroll from './use-scroll'
import { ref } from 'vue'

export default {
    name: 'scroll',
    props: {
        click: {
            type: Boolean,
            default: true
        },
        probeType: {
            type: Number,
            default: 0
        }
    },
    emits: ['scroll'],
    setup(props, { emit }) {
        console.log(props)
        const rootRef = ref(null)
        useScroll(rootRef, props, emit)

        return {
            rootRef
        }
    }
}
</script>
