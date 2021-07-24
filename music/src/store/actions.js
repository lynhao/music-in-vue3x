import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

export function selectPlay({ commit, state }, { list, index }) {
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', list)
    commit('setCurrentIndex', index)
}

export function randomPlay({ commit }, list) {
    commit('setPlayMode', PLAY_MODE.random)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlayList', shuffle(list))
    commit('setCurrentIndex', 0)
}

export function changeMode({ commit, state, getters }, mode) {
    const currentId = getters.currentSong.id
    if (mode === PLAY_MODE.random) {
        commit('setPlayList', shuffle(state.sequenceList))
    } else {
        commit('setPlayList', state.sequenceList)
    }
    // 找到当前正在播放歌曲的位置
    const index = state.playlist.findIndex((song) => song.id === currentId)
    commit('setCurrentIndex', index)

    commit('setPlayMode', mode)
}

export function removeSong({ commit, state }, song) {
    const sequenceList = state.sequenceList.slice()
    const playlist = state.playlist.slice()

    const sequenceIndex = findIndex(sequenceList, song)
    const playIndex = findIndex(playlist, song)

    if (playlist < 0 || sequenceIndex < 0) {
        return
    }

    let currentIndex = state.currentIndex
    // 删除的是当前播放歌曲前面的歌曲, 或者是最后一首歌
    if (playIndex < currentIndex || currentIndex === playlist.length - 1) {
        currentIndex--
    }

    sequenceList.splice(sequenceIndex, 1)
    playlist.splice(playIndex, 1)

    commit('setSequenceList', sequenceList)
    commit('setPlayList', playlist)
    commit('setCurrentIndex', currentIndex)

    // 清空播放列表后 不要播放
    if (!playlist.length) {
        commit('setPlayingState', false)
    }
}

export function clearSongList({ commit }) {
    commit('setSequenceList', [])
    commit('setPlayList', [])
    commit('setCurrentIndex', 0)
    commit('setPlayingState', false)
}

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}
