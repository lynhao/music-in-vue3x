import { ref, watch, nextTick, computed } from 'vue'

export default function useFixed(props) {
    const groupRef = ref(null)
    const listHeights = ref([])
    const scrollY = ref(0)
    const distanceTitle = ref(0)
    const TITLE_HEIGHT = 30
    // 当前渲染组的索引
    const currentIndex = ref(0)

    // 当前组的文本
    const fixedTitle = computed(() => {
        if (scrollY.value < 0) return ''
        const currentGroup = props.data[currentIndex.value]
        return currentGroup ? currentGroup.title : ''
    })

    const fixedStyle = computed(() => {
        const distanceVal = distanceTitle.value
        const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
        return {
            transform: `translate3d(0, ${diff}px, 0)`
        }
    })
    watch(() => props.data, async() => {
        await nextTick()
        calculate()
    })

    watch(scrollY, (newY) => {
        const listHeightsVal = listHeights.value
        for (let i = 0; i < listHeightsVal.length - 1; i++) {
            const heightTop = listHeightsVal[i]
            const heightBottom = listHeightsVal[i + 1]
            if (newY >= heightTop && newY <= heightBottom) {
                currentIndex.value = i
                distanceTitle.value = heightBottom - newY
            }
        }
    })
    function calculate() {
        // 获取列表高度
        const list = groupRef.value.children
        const listHeightsVal = listHeights.value
        // 获取高度区间
        // 初始化操作,第一个区间
        listHeightsVal.length = 0

        let height = 0
        listHeightsVal.push(height)

        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeightsVal.push(height)
        }
    }

    function onScroll(pos) {
        scrollY.value = -pos.y
    }

    return {
        groupRef,
        onScroll,
        fixedTitle,
        fixedStyle,
        currentIndex
    }
}
