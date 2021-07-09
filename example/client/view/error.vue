<template>
  <div></div>
</template>

<script >
import axios from '../../../src'
export default {
  created() {
    const axios = this.http;
    axios({
      url: '/error/get1',
      method: 'get'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    axios({
      url: '/error/get',
      method: 'get'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    setTimeout(() => {
      axios({
        url: '/error/get',
        method: 'get'
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }, 5000)


    axios({
      url: '/error/timeout',
      method: 'get',
      timeout: 2000
    }).then(res => {
      console.log(res)
    }).catch((err) => {
      console.log(err.message)
      console.log(err.config)
      console.log(err.code)
      console.log(err.request)
      console.log(err.isAxiosError)
    })
  }
}
</script>

<style>
</style>