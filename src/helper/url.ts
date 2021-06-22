interface URLOrigin {
  protocol: string
  host: string
}
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
function resolveURL(url: string): URLOrigin {
  // 通过创建一个 <a> 标签并设置 href 属性可以快捷的拿到 protocol 和 host
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
