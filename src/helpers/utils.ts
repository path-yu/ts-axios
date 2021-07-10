//Utils是一个非特定于axios的泛型助手函数库
const toString = Object.prototype.toString

/**
 * 确认一个值是否类型是否为Date
 *
 * @param {Object} val 需要测试的值;
 * @returns {boolean} 如果value为Date则为true, 否者为false;
 */
export function isDate(val: any): val is Object {
  return toString.call(val) === '[object Date]'
}
/**
 * 确认一个值是否类型是否为Array
 *
 * @param {Object} val 需要测试的值;
 * @returns {boolean}  如果value为Array则为true, 否者为false;
 */
export function isArray(val: any): val is any[] {
  return toString.call(val) === '[object Array]'
}

/**
 * 确认一个值是否类型是否为Object
 *
 * @param {Object} val 需要测试的值;
 * @returns {boolean} 如果value为Object则为true, 否者为false;
 */

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
/**
 * 确定一个值是否为普通对象
 *
 * @param {Object} val 需要测试的值;
 * @return {boolean} 如果value是普通对象，则为True，否则为false
 */
export function isPlainObject(val: any): val is Object {
  if (toString.call(val) !== '[object Object]') {
    return false
  }
  const prototype = Object.getPrototypeOf(val)
  return prototype === null || prototype === Object.prototype
}
/**
 * 确定一个值是否为FormData
 *
 * @param {Object} val 需要测试的值;
 * @return {boolean} 如果value是FormData，则为True，否则为false
 */
export function isFormData(val: any): val is FormData {
  return typeof val !== undefined && val instanceof FormData
}

export function forEach(obj: any, fn: Function): void {
  //判断obj类型是否为null和undefined
  if (obj === null || typeof obj === 'undefined') {
    return
  }
  //强制一个数组,将其转换为可迭代的的数组类型[4,4,4];
  if (typeof obj !== 'object') {
    obj = [obj]
  }

  if (isArray(obj)) {
    // 遍历数组值
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    // 遍历对象键值对
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}
/**
 * 通过可变地向对象to添加对象form的属性来扩展对象a。
 *
 * @param {Object} to 要扩展的对象
 * @param {Object} form 要从中复制属性的对象
 * @return {Object} 返回新的对象 to
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 *  接受varargs，期望每个参数都是一个对象
 * 不变的合并每个对象的属性并返回结果
 *
 * 当包含多个对象包含相同的键时,后面的对象
 * 参数列表将优先
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
export function deepMerge(...objS: any[]): any {
  const result = Object.create(null)
  function assignValue(val: any, key: number) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = deepMerge(result[key], val)
    } else if (isPlainObject(val)) {
      result[key] = deepMerge({}, val)
    } else if (isArray(val)) {
      result[key] = val.slice()
    } else {
      result[key] = val
    }
  }
  for (var i = 0, l = objS.length; i < l; i++) {
    forEach(objS[i], assignValue)
  }
  return result
}
/**
 *  确认一个数是否为URLSearchParams对象类型
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个URLSearchParams对象，则为True，否则为false
 */
export function isURLSearchParams(val: any): val is URLSearchParams {
  return val !== undefined && val instanceof URLSearchParams
}
