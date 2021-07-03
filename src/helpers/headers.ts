import { isPlainObject } from "./utils";


/**
 * @description: 因为请求 header 属性是大小写不敏感的，所有我们需要将其大小写标准化
 * @param {any} headers 请求头数据
 * @param {string} normalizedName 标准化的名称
 */
function normalizeHeaderName(headers: any, normalizedName:string):void {
  if (!Headers) {
    return;
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * @description: 当我们传入的data为普通对象时,如果我们headers没有配置Context-type属性时
  需要我们自动设置请求的Context-type字段为 application/json,charset=utf-8
 * @param {any} headers 请求头
 * @param {any} data 请求数据data
 * @return {any} 返回新的请求头
 */
export function processHeaders(headers:any,data:any):any {
  normalizeHeaderName(Headers, 'Content-type');

  if (isPlainObject(data)) {
    if (headers && !headers['Content-type']) {
      headers['Content-type'] = 'application/json,charset=utf-8'
    } 
  }
  return headers
}


/**
 * 处理响应请求头信息, 因为我们通过XMLHttpRequest 对象的 getAllResponseHeaders方法获取的
 * 值是一段的字符串, 我们需要将其转换为对象的个数
 *
 * @param {String} headers 需要解析的头文件
 * @returns {Object} 返回解析后的的请求头对象
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    // 字符串可能存在多个 ":" 的情况
    let [key, ...vals] = line.split(':')
    key = key.trim().toLocaleLowerCase()
    if (!key) {
      return
    }
    const val = vals.join(':').trim()
    parsed[key] = val
  })
  return parsed
}
