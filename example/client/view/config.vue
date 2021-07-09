<template>
  <div>

  </div>
</template>

<script>
import axios from '../../../src/';
import qs from 'qs';
export default {
 
  created() {
    axios.defaults.headers.common['test2'] = 123;
    // axios({
    //   url: 'http://localhost:3000/config/post',
    //   method: 'post',
    //   data: qs.stringify({ a: 1 }),
    //   headers: {
    //     test: '321'
    //   }
    // }).then(res => {
    //   console.log(res.data)
    // });

    // 请求和响应配置化 demo
    axios({
      transformRequest: [
        (function (data) {
          return qs.stringify(data)
        }),
      ],
      transformResponse: [
        function (data) {
          if (typeof data === 'object') {
            data.b = 'transform respone mark'
          }
          return qs.parse(data);
        }
      ],
     url: 'http://localhost:3000/config/post',
      method: 'post',
      data: {
        a: 1
      }
    }).then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style>
</style>