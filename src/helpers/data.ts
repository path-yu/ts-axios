import { isPlainObject } from "./utils";


/**
 * @description: 将请求配置中的data参数做一层转换, 因为当我们通过执行XMLHttpRequest对象方法的send方法来发送请求
 该方法的参数请求设置body数据,默认是不支持直接传递对象类型的数据的
 * @param {any} data
 * @return {any} 返回序列化后的h数据
 */
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data;
} 

/**
 * @description: 将响应数据做一层转换, 当服务端返回给我们的是字符串类型,
    我们可以尝试将其转换为JSON对象格式
 * @param {any} data
 * @return {any} 返回经过转换后的新数据
 */
export function transformResponse(data: any): any {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (error) {
            // console.error(error);
        }
    }
    return data;
}