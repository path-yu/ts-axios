export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  auth?: AxiosBasicCredentials
  cancelToken?: CancelToken
  baseURL?: string
  withCredentials?: boolean
  validateStatus?: (status: number) => boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosBasicCredentials {
  username: string
  password: string
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Cancel {
  message?: string
}
