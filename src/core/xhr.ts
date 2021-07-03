import cookie from '../helpers/cookie'
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { isURLSameOrigin } from '../helpers/url'
import { deepMerge, isFormData } from '../helpers/utils'
import { AxiosRequestConfig } from '../types'
import { AxiosPromise, AxiosResponse } from '../types/index'
function xhrAdapter(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data= null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      params,
      baseURL,
      withCredentials,
      validateStatus,
      xsrfCookieName,
      xsrfHeaderName,
      auth,
      cancelToken
    } = config;
    
    const request = new XMLHttpRequest();

    // 第三个参数为 async 是否是异步请求
    //!.的意思是断言，这里可以保证运行 时 url 是有值的
    request.open(method.toUpperCase(), url!, true)
    var result = deepMerge({ foo: 123, age: 434 }, { foo: 456 })

    configureRequest()
    addEvents()
    processHeaders()
    processCancel()

    request.send(data)

    function configureRequest(): void {
      // 设置响应数据类型
      if (responseType) {
        request.responseType = responseType
      }
      // 设置请求超时时间
      if (timeout) {
        request.timeout = timeout
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }
    // 监听请求的事件
    function addEvents(): void {
      request.onreadystatechange = () => {
        if (request.readyState !== 4 || request.status === 0) return
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        //根据传递的responseType 来决定返回的数据
        const responseData = responseType === 'text' ? request.responseText : request.response
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }
      // 处理网络异常错误
      request.onerror = () => {
        reject(new Error('Network Error'));
      }
      // 处理请求超时错误
      request.ontimeout = () => {
        reject(new Error(`Timeout of ${timeout} ms exceeded`))
      };

    }
    // 处理请求头数据
    function processHeaders(): void {
      /*
       * 如果请求是个FormData类型, 则山headers[content-type]
       */
      if (isFormData(data)) {
        delete headers['content-type']
      }
      /*
       * 跨站请求伪造 xsrf 防御
       * 当请求开启了 withCredentials 或者是同源请求时
       * 如果存在 xsrfCookieName 则为请求 headers 带上它的值
       */
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = `Basic ${btoa(`${auth.username} : ${auth.password}`)}`
      }
      
      headers && Object.keys(headers).forEach(name => {
        // 如果 data 为 null headers 的 content-type 属性没有意义
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }
    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }
    /*
     * 处理响应数据
     */
    function handleResponse(response: AxiosResponse) {
      const { status } = response;
      if (!validateStatus || validateStatus(status)) {
        resolve(response);
        
      } else {
        reject(
          createError(`Request failed with status code ${status}`, config, null, request, response)
        )
      }
    }
  })
}

export { xhrAdapter }

