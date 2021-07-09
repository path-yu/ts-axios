import { Canceler, CancelExecutor, CancelTokenSource } from './../types/index';
import Cancel from './Cancel';
interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel


    /*
     实例化一个pending状态的Promise对象. 用一个resolvePromise变量指向resolve函数,
     接着执行executor函数,传入一个cancel函数.在cancel函数内部,会调用resolvePromise函数来
     将Promise状态改为resolved, 并传递相应的参数message,方便then链式调用
    */
  constructor(executor: CancelExecutor) {
      let resolvePromise: ResolvePromise;
   
      this.promise = new Promise<Cancel>(resolve => {
          resolvePromise = resolve;
      });

      executor(message => {
          if (this.reason) return;
          this.reason = new Cancel(message);
          resolvePromise(this.reason);
      })
    }
    //  如果存在token. 说明这个token已经被使用过了,直接报错
    throwIfRequested() {
        if (this.reason) {
            throw this.reason;
        }
    }
    /* 
        定义一个cancel变量,和一个CancelToken实例对象,并在
        executor函数中将cancel指向参数c这个取消函数, 并返回token和cancel
    */
    static source(): CancelTokenSource{
        let cancel!: Canceler;
        const token = new CancelToken(c => {
            cancel = c;
        });
        
        return {
            cancel,
            token
        }
    }
}