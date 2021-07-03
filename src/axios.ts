import Axios from "./core/Axios";
import defaults from "./defaults";
import { extend } from "./helpers/utils";
import { AxiosRequestConfig, AxiosStatic } from './types/index';

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);
  
  return instance as AxiosStatic;
}
const axios = createInstance(defaults);


export default axios;