export * from './animate'
export * from './date'
export * from './file'

/**
 * @description: 判断是否为纯对象
 * @param {any} target
 * @return {boolean}
 */
export function isPlainObject(target: any) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

/**
 * @description: 限定数值范围
 * @param {number} n 被限定的值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number} 限定后的值
 */
export function minmax(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n
}

/**
 * @description: 获取小数位数
 * @param {number | string} n 要操作的数值
 * @return {number}
 */
export function getDecimalsLength(n: number | string) {
  n = n.toString().split('.')[1]
  return n ? n.length : 0
}

/**
 * @description: 把一个数四舍五入到指定位数小数
 * @param {number} n 要操作的数值
 * @param {number} precision 精准度，即小数个数
 * @return {number}
 */
export function round(n: number, precision = 0) {
  return Math.round(+(n + 'e' + precision)) / Math.pow(10, precision)
}

/**
 * @description: 把一个数舍入到指定数的倍数
 * @param {number} n 要舍入的数值
 * @param {number} m 结果值的因数
 * @return {number}
 */
export function mround(n: number, m: number) {
  return round(n - (n % m) + Math.round((n % m) / m) * m, getDecimalsLength(m))
}

/**
 * @description: 深拷贝
 * @param {any} target
 * @return {any}
 */
export function deepClone(target: any): any {
  if (Array.isArray(target)) {
    return target.map((item) => {
      return deepClone(item)
    })
  }
  if (isPlainObject(target)) {
    const obj: { [propName: string]: any } = {}
    Object.keys(target).forEach((k) => {
      obj[k] = deepClone(target[k])
    })
    return obj
  }
  return target
}

/**
 * @description: 生成唯一ID，用于设置元素的ID，以便获取
 * @param {string} prefix
 * @return {string}
 */
export function uniqid(prefix = 's_') {
  return prefix + (~~(Math.random() * 10e8)).toString(36)
}

/**
 * @description: 回流
 * @param {HTMLElement} el
 * @return {void}
 */
export function reflow(el: HTMLElement) {
  el.offsetHeight
}

/**
 * @description: 判断一个对象是否为非 ReactNode 类型
 * @param {any} target
 * @return {boolean}
 */
export function isNotReactNode(target: any) {
  return isPlainObject(target) && !('$$typeof' in target)
}

/**
 * @description: 获取阻尼值
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @param {number} damping
 * @return {number}
 */
export function getDampingValue(
  value: number,
  min: number,
  max: number,
  damping: number,
) {
  if (value < min) {
    return min + (value - min) * damping
  }
  if (value > max) {
    return max + (value - max) * damping
  }
  return value
}

/**
 * @description: 获取矩形阻尼值
 * @param {number} offset 当前的偏移量
 * @param {number} areaSize 范围值
 * @param {number} viewSize 范围内某个视图尺寸值
 * @param {number} damping 阻尼系数
 * @return {number}
 */
export function getRectDampingValue(
  offset: number,
  areaSize: number,
  viewSize: number,
  damping: number,
) {
  const diff = areaSize - viewSize
  let min, max
  if (diff < 0) {
    min = diff
    max = 0
  } else {
    min = 0
    max = diff
  }
  return getDampingValue(offset, min, max, damping)
}
/**
 * @description: 获取范围值
 * @param {number} offset 当前的偏移量
 * @param {number} areaSize 范围值
 * @param {number} viewSize 范围内某个视图尺寸值
 * @return {number}
 */
export function getInBoundValue(
  offset: number,
  areaSize: number,
  viewSize: number,
) {
  const diff = areaSize - viewSize
  const [min, max] = [0, diff].sort((a, b) => a - b)
  return minmax(offset, min, max)
}

/**
 * @description: 获取溢出值范围
 * @param {number} overflow 最大溢出值
 * @param {number} areaSize 范围值
 * @param {number} viewSize 范围内某个视图尺寸值
 * @return {*}
 */
export function getOverflowRangeInArea(
  overflow: number,
  areaSize: number,
  viewSize: number,
): [number, number] {
  if (areaSize > viewSize) {
    return [-overflow, areaSize + overflow]
  } else {
    return [areaSize - viewSize - overflow, overflow]
  }
}

/**
 * @description: 扩散性遍历
 * @param {any[]} array 要遍历的数组
 * @param {(el: any, spreadIndex: number, index: number) => any} callback 回调函数，接收当前元素、扩散性下标、迭代下标作为参数，
 *  如果返回true，则中止遍历
 * @param {number} currIndex 遍历开始的下标
 * @param {number} direction 开始遍历的方向
 * @return {number} 扩散性下标、或开始下标
 */
export function spreadEach(
  array: any[],
  callback: (el: any, spreadIndex: number, index: number) => any,
  startIndex = 0,
  direction = -1,
) {
  const len = array.length
  let spreadIndex = startIndex
  let edge = 0
  direction = -direction
  for (let i = 0; i < len; i++) {
    if (edge < 0) {
      spreadIndex = len - 1 - i
    } else if (edge > 0) {
      spreadIndex = i
    } else {
      spreadIndex = spreadIndex + direction * i
      edge = spreadIndex === 0 ? 1 : spreadIndex === len - 1 ? -1 : 0
      direction = -direction
    }

    if (typeof callback === 'function') {
      if (callback(array[spreadIndex], spreadIndex, i)) {
        return spreadIndex
      }
    }
  }
  return startIndex
}

/**
 * @description: 深拷贝其他对象到第一个对象
 * @param {any[]} args
 * @return {any} 第一个对象
 */
export function extend(...args: any[]) {
  const target = args[0],
    l = args.length

  let i = 1,
    options,
    name,
    src,
    copy,
    copyIsArray,
    clone

  for (; i < l; i++) {
    // 不处理null和undefined
    if ((options = args[i]) != null) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止有环
        if (target === copy) {
          continue
        }

        // 深复制
        if (
          copy &&
          (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
        ) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = isPlainObject(src) ? src : {}
          }

          // 只克隆对象，不移动
          target[name] = extend(clone, copy)

          // 不添加未定义的值
        } else if (copy !== void 0) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

/**
 * @description: 判断两数组是否相等，浅比较
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @return {boolean}
 */
export function arrayEqual(arr1: any[], arr2: any[]) {
  return arr1.length === arr1.length && arr1.every((el, i) => el === arr2[i])
}

/**
 * @description: 判断一个对象是否为看得到的空
 * @param {any} target
 * @return {*}
 */
export function isVisibleEmpty(target: any) {
  return (
    target === null ||
    target === void 0 ||
    (typeof target === 'string' && target.trim() === '')
  )
}

export interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}
export function debounce(
  func: (...args: any[]) => any,
  wait: any,
  options: DebounceOptions = {},
) {
  let lastArgs: any[] | undefined,
    lastThis: any | undefined,
    maxWait: number | undefined,
    result: any,
    timerId: number | undefined,
    lastCallTime: number | undefined

  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF =
    !wait && wait !== 0 && typeof requestAnimationFrame === 'function'

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isPlainObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing
      ? Math.max(+(options.maxWait as number) || 0, wait)
      : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time: number) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function startTimer(pendingFunc: FrameRequestCallback, wait: any) {
    if (useRAF) {
      cancelAnimationFrame(timerId as number)
      return requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }

  function cancelTimer(id: number) {
    if (useRAF) {
      return cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number)
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, (maxWait as number) - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number)
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait as number))
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  function trailingEdge(time: number) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== undefined
  }

  function debounced(this: any, ...args: any[]) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

export function throttle(
  func: (...args: any[]) => any,
  wait: any,
  options: DebounceOptions = {},
) {
  let leading = true
  let trailing = true

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  if (isPlainObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  })
}

/**
 * @description: 获取页面范围
 * @param {number} current 当前页码
 * @param {number} pageCount 总页数
 * @param {number} pageItemCount 要展示的页数
 * @return {[number, number]}
 */
export function getPageRange(
  current: number,
  pageCount: number,
  pageItemCount: number,
) {
  let min = current - Math.ceil((pageItemCount - 1) / 2)
  let max = current + Math.floor((pageItemCount - 1) / 2)
  const minLack = 1 - min
  const maxLack = max - pageCount
  if (maxLack > 0) {
    min -= maxLack
  }
  if (min < 1) {
    min = 1
  }
  if (minLack > 0) {
    max += minLack
  }
  if (max > pageCount) {
    max = pageCount
  }

  return [min, max]
}

/**
 * @description: 匹配元素列表中第一个位于滚动盒子可视区域的元素
 * @param {HTMLElement} elements 元素列表
 * @param {function} callback 匹配成功时回调
 * @param {number} offset 距离滚动盒子顶部的偏移量
 * @param {HTMLElement} scrollBox 指定滚动盒子，默认window
 * @return {void}
 */
export function matchScrollVisible(
  elements: HTMLElement[] | HTMLCollection,
  callback: (index: number, item: any) => any,
  offset = 0,
  scrollBox?: HTMLElement,
) {
  if (scrollBox instanceof HTMLElement) {
    offset += scrollBox.getBoundingClientRect().top
  }

  for (let i = 0, l = elements.length; i < l; i++) {
    const el = elements[i]
    if (el) {
      const { top, bottom } = el.getBoundingClientRect()
      if (
        (i === 0 && top > offset) ||
        (top <= offset && bottom > offset) ||
        i === l - 1
      ) {
        return callback(i, el)
      }
    }
  }
}

interface AnyObject {
  [p: string]: any
}

export function treeToMap(
  tree: AnyObject[],
  keyName: string,
  childrenName: string,
  parentName: string,
) {
  const map: {
    [p: string]: AnyObject
  } = {}

  function recurse(children: AnyObject[], parent: AnyObject | null) {
    children.forEach((node) => {
      map[node[keyName]] = node
      node[parentName] = parent
      if (Array.isArray(node[childrenName])) {
        recurse(node[childrenName], node)
      }
    })
  }
  recurse(tree, null)
  return map
}

export function pickNullish(
  target1: { [p: string]: any },
  target2: { [p: string]: any },
  properties: string[],
) {
  return properties.reduce((result, prop) => {
    result[prop] = target1[prop] ?? target2[prop]
    return result
  }, {} as { [p: string]: any })
}

/**
 * @description: 打乱数组
 * @param {any[]} arr 要打乱的数组
 * @param {boolean} inPlace 是否改变原数组
 * @return {any[]}
 */
export function shuffle(arr: any[], inPlace = false) {
  if (!inPlace) {
    arr = arr.slice()
  }
  const len = arr.length
  for (let i = len - 1; i >= 0; i--) {
    const randomIndex = ~~(Math.random() * (i + 1))
    const temp = arr[randomIndex]
    arr[randomIndex] = arr[i]
    arr[i] = temp
  }
  return arr
}

interface Rect {
  x: number
  y: number
  width: number
  height: number
}
/**
 * @description: 根据原始坐标尺寸和缩放后的坐标尺寸算出转换的原点
 * @param {Rect} rect
 * @param {Rect} scaleRect
 * @return {[number, number]}
 */
export function getTransformOrigin(rect: Rect, scaleRect: Rect) {
  const ratio = scaleRect.width / rect.width
  const originX =
    (rect.x + rect.width / 2 - scaleRect.x - scaleRect.width / 2) /
      (ratio - 1) +
    rect.width / 2
  const originY =
    (rect.y + rect.height / 2 - scaleRect.y - scaleRect.height / 2) /
      (ratio - 1) +
    rect.height / 2
  return [originX, originY]
}
