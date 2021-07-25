import { ref } from 'vue'

export default function useSingerDetail(props, emit, currentIndex) {
    const singerRef = ref(null)

    function onItemClick(e) {
        let el = e.target
        while (el.tagName !== 'LI') {
            el = e.target.parentElement
        }
        const singerIndex = el.dataset.index | 0
        console.log(singerIndex)
        emit('select', props.data[currentIndex.value].list[singerIndex])
    }

    return {
        singerRef,
        onItemClick
    }
}
