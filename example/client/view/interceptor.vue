<template>
  <div>
    interceptor
    <code>
      43
    </code>
  </div>
</template>

<script>

import axios from '../../../src/index';
export default {
  created() {
    axios.interceptors.request.use(config => {
      config.headers.test += '1';
      console.log('请求响应前')
      return config
    },err => {
        console.log(err,434);
    })

    axios.interceptors.request.use(config => {
      config.headers.test += '2'
      return config
    })

    axios.interceptors.request.use(config => {
      config.headers.test += '3'
      return config
    })

    axios.interceptors.response.use(res => {
      res.data += '1'
      return res
    })

    const interceptorId = axios.interceptors.response.use(res => {
      res.data += '2'
      return res
    })

    axios.interceptors.response.use(res => {
      res.data += '3'
      return res
    })

    axios.interceptors.response.eject(interceptorId)
    axios({
      url: 'http://localhost:3000/interceptor/get',
      method: 'get',
      headers: {
        test: ''
      }
    }).then(res => {
      console.log('axios res: ', res)
      console.log('axios res.data: ', res.data)
    })

  }
}
</script>

<style>
</style>