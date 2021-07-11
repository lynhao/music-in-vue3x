import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'

export default function useFavorite() {
    const store = useStore()
    const maxLen = 100

    // 收藏交互状态
    const favoriteList = computed(() => store.state.favoriteList)

    function getFavoriteIcon(song) {
        return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    }

    function isFavorite(song) {
        return favoriteList.value.findIndex((item) => {
            return item.id === song.id
        }) > -1
    }
    // 点击逻辑
    function toggleFavorite(song) {
        let list
        if (isFavorite(song)) {
            // remove
            list = remove(FAVORITE_KEY, compare)
        } else {
            // save
            list = save(song, FAVORITE_KEY, compare, maxLen)
        }
        store.commit('setFavoriteList', list)

        function compare(item) {
            return item.id === song.id
        }
    }

    return {
        getFavoriteIcon,
        toggleFavorite
    }
}
