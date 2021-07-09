import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectedFn, ResolvedFn } from './../types/index';
import dispatchRequest, { transformURL } from './dispatchRequest';
import InterceptorManager from "./InterceptorManager";
import mergeConfig from './mergeConfig';
interface Interceptors{
    request:InterceptorManager<AxiosRequestConfig>
    response:InterceptorManager<AxiosResponse>
};

interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectedFn
}


export default class {
    defaults: AxiosRequestConfig
    interceptors: Interceptors
    
    constructor(initConfig:AxiosRequestConfig) {
        this.defaults = initConfig;
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response:new InterceptorManager<AxiosResponse>()
        }
    }

    request(url: any, config?: any):AxiosPromise {
        // 实现函数重载, 兼容传与不传 config
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url;
        } else {
            config = url;
        }
        config = mergeConfig(this.defaults, config);
        
        const chain: PromiseChain<any>[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }];
        // 将请求拦截器遍历到chain的前面
        this.interceptors.request.forEach(interceptor => {
            //request 拦截器先添加的后执行 即后进先出原则
            chain.unshift(interceptor);
        });
        // 将响应拦截器遍历到chain的前面
        this.interceptors.response.forEach(interceptor => {
            // response 拦截器先添加的先执行 即先进先出原则
            chain.push(interceptor);
        });
        // 循环这个chain, 拿到每个拦截器对象, 把它们的resolved函数和rejected函数添加
        // 到promise.then从参数中,利用promise的链式调用,实现了拦截器一层层链式调用的效果
        let promise = Promise.resolve(config);
        
        while (chain.length) {
            const { resolved, rejected } = chain.shift()!;
            
            promise = promise.then(resolved, rejected);
        }
        return promise
    }
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }
    getUri(config?: AxiosRequestConfig): string {
        config = mergeConfig(this.defaults, config)
        return transformURL(config);
    }
    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
        return this.request(
            Object.assign(config || {}, {
                method,
                url
            })
        )
    }

    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request(
            Object.assign(config || {}, {
                method,
                url,
                data
            })
        )
    }
}