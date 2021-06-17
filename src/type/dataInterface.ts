interface AxiosConfig{
    url: string,
    method?: Method
    data?: any,
    params?: any;
}


type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD'
    | 'post' | 'POST'
    | 'PUT' | 'PUT'
    | 'patch' | 'PATCH';

export { AxiosConfig };

