<template >  
    <div>
    .container Hello {{bundler}}
    
    </div>
</template>

<script>
import axios from "../../src/axios"
export default {
  data() {
    return {
      bundler: '444'
    }
  },
  created(){
    // axios({
    //   url:'http://localhost:3000/index',
    //   method:'post',
    //   params:{
    //     age:434
    //   },
    
    // }).then(res => {
    //   console.log(res);
    // })

  axios({
    method: 'post',
    url: '/profile',
    data: {
      name:'ddd'
    }
  })
  },
}
</script>

<style scoped>
.container {
  color: green;
}
</style>