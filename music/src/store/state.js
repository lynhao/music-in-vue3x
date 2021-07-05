import { PLAY_MODE } from '@/assets/js/constant'

const state = {
    sequenceList: [], // 顺序播放
    playlist: [], // 播放列表
    playing: false, // 状态
    playMode: PLAY_MODE.sequence, // 播放模式
    currentIndex: 0, // 播放索引
    fullScreen: false // 是否全屏播放
}

export default state
