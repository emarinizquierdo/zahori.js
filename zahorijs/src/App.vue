<template>
  <div>
    <step></step>
  </div>
</template>

<script>

import Step from "@/components/step";

export default {
  name: 'App',
  components:{
    Step
  },
  created(){
  },
  ready(){
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
