
import { RejectedFn, ResolvedFn } from './../types/index';


interface Interceptor<T> {
    resolved: ResolvedFn<T>,
    rejected:RejectedFn
}
// 拦截器管理类
export default class InterceptorManager<T>{
    // 储存拦截器
    private interceptors: Array<Interceptor<T> | null>;

    constructor() {
        this.interceptors = [];
    }
    /**
     * @description: 向堆栈中添加一个拦截器
     * @param {RejectedFn} resolved 为promise处理 'then' 函数
     * @param {RejectedFn} rejected 处理' Promise '的' reject '函数
     * @return {*}
     */    
    use(resolved: RejectedFn, rejected: RejectedFn) {
        
        this.interceptors.push({
            resolved,
            rejected,
        });
        return this.interceptors.length - 1;
    }
    /**
     * @description: 迭达所有注册的拦截器
     * 这个方法会跳过拦截器可能为null的情况
     * @param {function} fn 每个拦截器要调用的函数
     */    
    forEach(fn: (interceptor: Interceptor<T>) => void): void{
        this.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                fn(interceptor);
            }
        });
    }
    /**
     * @description: 根据id从堆栈中移除拦截器
     * @param {number} 由use方法返回的id
     */    
    eject(id: number) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}