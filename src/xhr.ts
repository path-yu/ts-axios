import { AxiosConfig } from "./type/dataInterface";


function xhrAdapter(config: AxiosConfig) {
    let { data = null, url, method = 'get' } = config;
    const request = new XMLHttpRequest();
    
    request.open(method.toUpperCase(), url,true);
    request.send(data);
}

export { xhrAdapter };
