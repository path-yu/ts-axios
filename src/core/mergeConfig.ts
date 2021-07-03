
// 利用对象全局储存每个字段对应的合并策略方法;
const strats = Object.create(null)

import { deepMerge, isPlainObject } from "../helpers/utils";
import { AxiosRequestConfig } from "../types/";

/*
   默认合并策略 这是大部分属性的合并策略 如果有val2则返回val2, 否者返回val1吗也就是说
    如果自定义配置中定义了某个属性,就采用自定义的,否者就使用默认配置
*/

function defaultStrat(val1: any, val2: any): any {
    return typeof val2 !== 'undefined' ? val2 : val1
}
/*
 只接受自定义配置合并策略, 对应属性url,params,data 合并策略如下,
 对应url, params, data这些属性, 它们都是和请求强相关的,所以我们只能从自定义配置中读取
*/

function fromVal2Strat(val1: any, val2: any): any {
    if (typeof val2 !== 'undefined') {
        return val2
    }
}

const stratKeysFromVal2 = ['url', 'params', 'data'];
// 将每个字段的配置策略方法通过键值对注入到strats中
stratKeysFromVal2.forEach(key => strats[key] = fromVal2Strat);

// 复杂对象合并策略
function deepMergeStrat(val1: any, val2: any): any {
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
        return val2
    } else if (isPlainObject(val1)) {
        return deepMerge(val1)
    } else if (typeof val1 === 'undefined') {
        return val1
    }
}



const stratKeysFromDeepMerge = ['headers', 'auth']
stratKeysFromDeepMerge.forEach(key => strats[key] = deepMergeStrat);
/**
 * 特定与配置的合并函数, 它创建一个新的配置对象
 * 通过合并两个配置对象。
 *
 * @param {Object} config1 默认配置
 * @param {Object} config2 自定义配置
 * @returns {Object}  将config2合并为config1产生的新对象
 */
export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
    if (!config2) {
        config2 = {}
    }

    const config = Object.create(null)

    //遍历自定义配置
    for (let key in config2) {
        mergeField(key)
    }

    //遍历默认配置, 如果自定义配置不存在对应的默认配置 则进行合并
    for (let key in config1) {
        if (!config2[key]) {
            mergeField(key)
        }
    }

    function mergeField(key: string): void {
        const strat: Function = strats[key] || defaultStrat;
        config[key] = strat(config1[key], config2![key])
    }

    return config
}
