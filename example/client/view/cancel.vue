<template>
  <div>
    cancel
  </div>
</template>

<script>
import axios from '../../../src/index';
export default {
  created() {
    const http = this.http;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    // http.get('/cancel/get', {
    //   cancelToken: source.token
    // }).catch(e => {
    //     console.log(e);
    //   if (axios.isCancel(e)) {
    //     console.log('Request canceled', e.message)
    //   }
    // }).then(res => {
    //     console.log(res);
    // })

    // setTimeout(() => {
    //   source.cancel('Operation canceled by the user.')

    //   setTimeout(() => {
    //     axios.post('/cancel/post', {
    //       a: 1
    //     }, {
    //       cancelToken: source.token
    //     }).catch(e => {
    //       if (axios.isCancel(e)) {
    //         console.log(e.message)
    //       }
    //     })
    //   }, 100)

    // }, 100)

    let cancel;

    http.get('/cancel/get', {
      cancelToken: new CancelToken(c => {
        cancel = c
      })
    }).catch(e => {
      if (axios.isCancel(e)) {
        console.log('Request canceled')
      }
    })

    setTimeout(() => {
      cancel()
    }, 500);
  }
}
</script>

<style>
</style>