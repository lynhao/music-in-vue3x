import { createApp } from 'vue'
import Loading from './loading'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

const loadingDirective = {
    mounted(el, binding, vnode) {
        console.log(vnode)
        const app = createApp(Loading)
        const instance = app.mount(document.createElement('div'))
        el.instance = instance

        if (binding.value) {
            append(el)
        }
    },
    updated(el, binding, vnode) {
        if (binding.value !== binding.oldValue) {
            binding.value ? append(el) : remove(el)
        }
    }
}

function append(el) {
    const style = getComputedStyle(el)
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
        addClass(el, relativeCls)
    }
    el.appendChild(el.instance.$el)
}

function remove(el) {
    removeClass(el, relativeCls)
    el.removeChild(el.instance.$el)
}

export default loadingDirective
