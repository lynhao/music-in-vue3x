export default function watchCompletion () {
  const handlerMap = new Map()
  const reactiveties = new Map()
  const collectReactiveties = []

  const reactiveHandle = {
    get (target, prop) {
      collectReactiveties.push([target, prop])
      if (typeof target[prop] === 'object') {
        myReactive(target[prop])
      }
      return target[prop]
    },
    set (target, prop, val) {
      target[prop] = val

      // 这块是watchEffect的关键实现
      if (handlerMap.get(target)) {
        const array = handlerMap.get(target).get(prop)
        if (array) {
          for (const handle of array) {
            handle()
          }
        }
      }
      return target[prop]
    }
  }
  function myReactive (target) {
    if (reactiveties.has(target)) {
      return reactiveties.get(target)
    }
    const proxy = new Proxy(target, reactiveHandle)
    reactiveties.set(target, proxy)
    return proxy
  }
  function myWatchEffect (onHandle) {
    collectReactiveties.length = 0
    // 这里就是初始化为什么会执行一次
    onHandle()
    for (const item of collectReactiveties) {
      const [target, prop] = item
      if (!handlerMap.has(target)) {
        handlerMap.set(target, new Map())
      }
      if (!handlerMap.get(target).has(prop)) {
        handlerMap.get(target).set(prop, [])
      }
      handlerMap.get(target).get(prop).push(onHandle)
    }
  }
  return {
    myReactive,
    myWatchEffect
  }
}
