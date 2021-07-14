import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'

export default function useLyric({ songReady, currentTime }) {
    const currentLyric = ref(null)
    const currentLineNum = ref(0)
    const pureMusicLyric = ref('')
    const lyricScrollRef = ref('')
    const lyricListRef = ref(null)
    const playingLyric = ref(null)

    const store = useStore()
    const currentSong = computed(() => store.getters.currentSong)

    watch(currentSong, async (newSong) => {
        if (!newSong.url || !newSong.id) {
            return
        }
        // 切歌的时候停止歌词
        // 因为歌词跟加载歌曲是两个异步过程, 需要把当前的currentLyric和currentLineNum 清空
        stopLyric()
        currentLyric.value = null
        currentLineNum.value = 0
        pureMusicLyric.value = ''
        playingLyric.value = ''

        const lyric = await getLyric(newSong)
        store.commit('addSongLyric', {
            song: newSong,
            lyric
        })

        // 执行完毕后 如果这个时候我已经切换了另外一首歌,
        // currentsong.lyric跟刚刚请求的lyric就不对应了
        if (currentSong.value.lyric !== lyric) return

        currentLyric.value = new Lyric(lyric, handleLyric)
        const hasLyric = currentLyric.value.lines.length
        if (hasLyric) {
            if (songReady.value) {
                playLyric()
            }
        } else {
            playingLyric.value = pureMusicLyric.value = lyric.replace(/\[\d{2}:\d{2}:\d{2}\]/g, '')
            console.log(playingLyric.value)
        }
    })
    function playLyric() {
        const currentLyricVal = currentLyric.value
        if (currentLyricVal) {
            currentLyricVal.seek(currentTime.value * 1000)
        }
    }
    function stopLyric() {
        const currentLyricVal = currentLyric.value
        if (currentLyricVal) {
            currentLyricVal.stop()
        }
    }

    function handleLyric({ lineNum, txt }) {
        currentLineNum.value = lineNum
        playingLyric.value = txt
        const scrollComp = lyricScrollRef.value
        const listEl = lyricListRef.value
        if (!listEl) {
            return
        }
        if (lineNum > 5) {
            const lineEl = listEl.children[lineNum - 5]
            scrollComp.scroll.scrollToElement(lineEl, 1000)
        } else {
            scrollComp.scroll.scrollTo(0, 0, 1000)
        }
    }
    return {
        currentLyric,
        pureMusicLyric,
        playingLyric,
        currentLineNum,
        playLyric,
        stopLyric,
        lyricScrollRef,
        lyricListRef
    }
}
