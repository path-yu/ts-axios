<template >
  <div class="app">

    <div class="tabs">
      <router-link class="" tag="p" exact to="/interceptor">拦截器</router-link>
      <router-link tag="p" exact to="/simple">simple</router-link>
      <router-link tag="p" exact to="/base">base</router-link>
      <router-link tag="p" exact to="/cancel">cancel</router-link>
      <router-link tag="p" exact to="/config">config</router-link>
      <router-link tag="p" exact to="/error">error</router-link>
      <router-link tag="p" exact to="/extend">extend</router-link>
      <router-link tag="p" exact to="/more">more</router-link>
      <router-link tag="p" exact to="/upload-download">upload-download</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "../../src/axios"
export default {
  data() {
    return {
      bundler: '444',
    }
  },
  created() {

    // axios({
    //   url:'http://localhost:3000/index',
    //   method:'post',
    //   params:{
    //     age:434
    //   },

    // }).then(res => {
    //   console.log(res);
    // })

    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/profile',
    //   data: {
    //     name:'ddd'
    //   }
    // })
  },
}
</script>

<style scoped>
.container {
  color: green;
}
.tabs {
  width: 600px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.router-link-active {
  color: hotpink;
}
html, body {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif, 'Courier New', Courier, monospace;
  color: #2c3e50;
}

ul {
  line-height: 1.5em;
  padding-left: 1.5em;
}

a {
  color: #7f8c8d;
  text-decoration: none;
}
a:hover {
  color: #4fc08d;
}
</style>