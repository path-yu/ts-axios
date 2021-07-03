import { AxiosTransformer } from "../types";

/**
 * 转换请求或响应的数据
 * @param {Object|String} data 要转换的数据
 * @param {Array} headers 请求或响应的请求头
 * @param {Array|Function} fns 单个函数或者函数数组
 * @returns {*} 转换后的数据
 */
export function transform(data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]): any {
    if (!fns) return data
    
    if (!Array.isArray(fns)) {
        fns = [fns]
    }
    
    fns.forEach(fn => data = fn(data, headers));
    
    return data
}