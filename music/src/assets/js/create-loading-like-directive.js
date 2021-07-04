import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

export default function createLoadingLikeDirective(component) {
    return {
        mounted(el, binding, vnode) {
            const app = createApp(component)
            const instance = app.mount(document.createElement('div'))
            const name = component.name
            if (!el[name]) {
                el[name] = {}
            }
            el[name].instance = instance
            const title = binding.arg
            if (typeof title !== 'undefined') {
                instance.setTitle(title)
            }

            if (binding.value) {
                append(el)
            }
        },
        updated(el, binding, vnode) {
            const title = binding.arg
            const name = component.name

            if (typeof title !== 'undefined') {
                el[name].instance.setTitle(title)
            }
            if (binding.value !== binding.oldValue) {
                binding.value ? append(el) : remove(el)
            }
        }
    }
    function append(el) {
        const style = getComputedStyle(el)
        const name = component.name

        if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
            addClass(el, relativeCls)
        }
        el.appendChild(el[name].instance.$el)
    }

    function remove(el) {
        const name = component.name

        removeClass(el, relativeCls)
        el.removeChild(el[name].instance.$el)
    }
}
