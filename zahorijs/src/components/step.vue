<template>
  <div class="step">
    <h1>test</h1>
    <h2>Essential Links</h2>
    <button>left</button>
    <button>right</button>
  </div>
</template>

<script>
export default {
  name: 'step',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .step{
    width: 300px;
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
    position: absolute;
    top:0;
    left:0;
  }
</style>
