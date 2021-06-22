import { xhrAdapter } from './adapters/xhr'
import { AxiosRequestConfig } from './types'
import { AxiosPromise } from './types/index'

function axios(config: AxiosRequestConfig): AxiosPromise {
  xhrAdapter(config)
}
export { axios }
