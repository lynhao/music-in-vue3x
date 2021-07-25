import Scroll from '@/components/base/scroll/scroll'
import { h, mergeProps, withCtx, renderSlot, ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'wrap-scroll',
    props: Scroll.props,
    emits: Scroll.emits,
    render(ctx) {
        return h(Scroll, mergeProps(
            { ref: 'scrollRef' },
            ctx.$props,
            {
                onScroll: (e) => {
                    ctx.$emit('scroll', e)
                }
            }
        ), {
            default: withCtx(() => {
                return [renderSlot(ctx.$slots, 'default')]
            })
        })
    },
    setup() {
        const scrollRef = ref(null)

        // 确保scrollRef已经渲染了
        const scroll = computed(() => {
            return scrollRef.value.scroll
        })
        const store = useStore()
        const playlist = computed(() => store.state.playlist)

        watch(playlist, async () => {
            await nextTick()
            scroll.value.refresh()
        })

        return {
            scrollRef,
            scroll
        }
    }
}
