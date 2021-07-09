<template>
  <div>
    simple
  </div>
</template>

<script>
export default {
  created() {
    this.http({
      method: 'get',
      url: '/simple/get',
      params: {
        a: 1,
        b: 2
      }
    })
  }
}
</script>

<style>
</style>