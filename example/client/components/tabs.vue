<template>
  <div>
      <div v-for="(item,index) in tabsList" :key="index" @click="handleClick(index)">
        
        <div>{{item.name}}</div>
        <component :is="item.component"></component>
      </div>
  </div>
</template>

<script>
export default {
    name:'tabs',
    props:{
        tabsList:{
            type:Array,
            default:[]
        },
    },
    data () {
        return {
            currentIndex:0
        }
    },
    methods:{
        handleClick(index){

        }
    }
}
</script>

<style>
.active{
    color:red
}
</style>