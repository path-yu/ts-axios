import { Method } from './../types/index';
import { deepMerge, isDate, isPlainObject, isURLSearchParams } from "./utils";

interface URLOrigin {
  protocol: string
  host: string
}
/**
 * @description: 检测当前请求url是否与当前位置相同 判断是否为同域请求
 * @param {string} requestURL 当前请求的url
 * @return {boolean}
 */
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href);
/**
 * @description: 解析一个url来发现它的信息
 * @param {string} url 需要解析的url
 * @return {URLOrigin}
 */
function resolveURL(url: string): URLOrigin {
  // 通过创建一个 <a> 标签并设置 href 属性可以快捷的拿到 protocol 和 host
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
// 将请求url进行编码
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') // 约定将 空格 号转为 +
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * @description: 处理请求url参数, 将params参数拼接到请求url上的工具函数
 * @param {*}
 * @return {*}
 */
export function buildURL(url: string,
  params?: any,
  paramsSerializer?: (params: any) => string) :string{
  if (!params) {
    return url;
  }
  let serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if(isURLSearchParams(params)){
    serializedParams = params.toString();
  } else {
    const parts: string[] = [];
    
    Object.keys(params).forEach(key => {
      const val = params[key];
      if (val === null || typeof val === 'undefined') {
        return 
      }
      let values = [];
      if (Array.isArray(val)) {
        values = val;
        key += '[]';
      } else {
        values = [val];
      }

      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString();
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val);
        }
        parts.push(`${encode(key)}=${encode(val)}`);
      })
    })
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url;
}
/**
 * 确定指定的url是否为绝对URL
 * @param {string} url 有测试的值
 * @returns {boolean} 如果指定的URL是绝对URL，则为True，否则为false
 */
export function isAbsoluteURL(url:string) :boolean{
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
/**
 * 通过组合指定的URL创建一个新的URL
 * @param {string} baseURL 基础的url
 * @param {string} relativeURL 相对的url
 * @returns {string} 组合的新url
 */
export function combineURLs(baseURL:string, relativeURL?:string):string {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}
/**
 * @description: 
 * @param {any} headers
 * @param {Method} method
 * @return {*}
 */
export function flattenHeaders(headers: any, method:Method):any {
  if (!headers) return
  
  headers = deepMerge(headers.common, headers[method], headers);

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common'];

  methodsToDelete.forEach(method => {
    delete headers[method];
  })
  return headers;
}