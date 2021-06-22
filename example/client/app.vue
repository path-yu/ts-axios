<template >  
    <div>
    .container Hello {{bundler}}
    </div>
</template>

<script>
import Vue from 'vue';
import {axios} from "../../src/ts-axios";
export default Vue.extend({
  data() {
    return {
      bundler: 'Parcel'
    }
  },
  created(){
    axios({
      url:'http://localhost:3000/index',
      data:{
        age:434,
      },
      method:'get',
    }).then(res => {
      console.log(res);
    })
  }
})
</script>

<style scoped>
.container {
  color: green;
}
</style>