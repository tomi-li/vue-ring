<template>
  <div id="app">
    <dcircle :current="current" :maximum="maximum" :showText="false" :radius="20" :lineWidth="2"></dcircle>
    <dcircle :current="current" :maximum="maximum"></dcircle>
    <dcircle :current="current" :maximum="maximum" :showText="false" :radius="80" :lineWidth="12"></dcircle>
  </div>
</template>

<script>
  export default {
    data: () => ({
      current: 0,
      maximum: 0,
    }),
    mounted(){

      setInterval(() => {
        this.current = parseInt(Math.random() * 6);
        this.maximum = parseInt(Math.random() * 6 + 6);
      }, 1500)

    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
