import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import Slider from '@better-scroll/slide'

BScroll.use(Slider)

export default function useMiniSlider() {
    const sliderWrapperRef = ref(null)
    const slider = ref(null)
    const store = useStore()

    const fullScreen = computed(() => store.state.fullScreen)
    const playlist = computed(() => store.state.playlist)
    const currentIndex = computed(() => store.state.currentIndex)

    const sliderShow = computed(() => {
        return !fullScreen.value && !!playlist.value
    })

    onMounted(() => {
        let sliderVal
        watch(sliderShow, async (newSliderShow) => {
            if (newSliderShow) {
                await nextTick()
                if (!sliderVal) {
                    sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        momentum: false,
                        bounce: false,
                        probeType: 2,
                        slide: {
                            autoplay: false,
                            loop: true
                        }
                    })

                    sliderVal.on('slidePageChanged', ({ pageX }) => {
                        store.commit('setCurrentIndex', pageX)
                    })
                } else {
                    sliderVal.refresh()
                }
                sliderVal.goToPage(currentIndex.value, 0, 0)
            }
        })

        watch(currentIndex, (newCurrentIndex) => {
            if (sliderVal && sliderShow.value) {
                sliderVal.goToPage(newCurrentIndex, 0, 0)
            }
        })

        watch(playlist, async (newList) => {
            if (sliderVal && sliderShow.value && newList.length) {
                await nextTick()
                sliderVal.refresh()
            }
        })
    })

    onUnmounted(() => {
        if (slider.value) {
            slider.value.destroy()
        }
    })

    return {
        slider,
        sliderWrapperRef
    }
}
