<template>
  <div>
    <h1>file download</h1>
    <div>
      <button @click="handleDownloadClick" id="download">Download button</button>
    </div>
    <h1>
      file upload
    </h1>
    <form role="form" onsubmit="return false">
      <input ref="fileEl" id="file" type="file">
      <button @click="handleUploadClick" id="upload">Upload button</button>
    </form>
  </div>
</template>

<script>
import axios from '../../../src'
import NProgress from 'nprogress';
export default {
  created() {
    const instance = axios.create();
    this.instance = instance;
    this.downloadFileURL = 'https://img.mukewang.com/5cc01a7b0001a33718720632.gif';
    this.loadProgressBar();
  },
  methods: {
    calculatePercentage(loaded, total) {
      return Math.floor(loaded * 10) / total
    },
    handleDownloadClick(e) {
      this.instance.get(this.downloadFileURL)
        .then(res => {
          console.log(`download file success, data.length: ${res.data.length}, data.url: ${res.config.url}`)
        })
    },
    handleUploadClick() {
      const data = new FormData()
      const fileEl = this.$refs.fileEl;
      if (fileEl.files) {
        data.append('file', fileEl.files[0])
        this.instance.post('http://localhost:3000/upload-download/upload', data)
          .then(() => {
            console.log('upload file success, you can see it on ./exapmles/accept-upload-file')
          })
      }
    },
    loadProgressBar() {
      const setupStartProgress = () => {
        this.instance.interceptors.request.use(config => {
          NProgress.start()
          return config
        })
      }

      const setupUpdateProgress = () => {
        const update = (e) => {
          console.log(e)
          NProgress.set(calculatePercentage(e.loaded, e.total))
        }
        this.instance.defaults.onDownloadProgress = update
        this.instance.defaults.onUploadProgress = update
      }

      const setupStopProgress = () => {
        this.instance.interceptors.response.use(response => {
          NProgress.done()
          return response
        }, error => {
          NProgress.done()
          return Promise.reject(error)
        })
      }

      setupStartProgress()
      setupUpdateProgress()
      setupStopProgress()
    }
  }
}
</script>

<style>
</style>