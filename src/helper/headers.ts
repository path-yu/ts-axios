/**
 * 将请求头信息解析为对象
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
    if (!key) return
    const val = vals.join(':').trim()
    parsed[key] = val
  })
  return parsed
}
