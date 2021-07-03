
import { AxiosRequestConfig, AxiosResponse } from './../types/index'


//使用指定的配置来创建一个处理请求或者响应异常的实体类 
export class AxiosError extends Error {
  isAxiosError: boolean //
  config: AxiosRequestConfig
  code?: string | number | null
  request?: any
  response?: AxiosResponse;

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code: string | null | number,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response

    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
/**
 * 使用指定的消息、配置、错误代码、请求和响应创建一个错误。
 * @param {string} message 错误信息
 * @param {Object} config 配置
 * @param {string} [code] 错误代码
 * @param {Object} [request] 请求信息
 * @param {Object} [response] 响应信息
 * @returns {Error} 创建的异常对象
 */
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code: string | null | number,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
