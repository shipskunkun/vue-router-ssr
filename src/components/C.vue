<template>
  <div class="hello">
    this is C
  </div>
</template>

<script>
export default {
  name: 'C',
  data () {
    return {

    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to, from);
    next();
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
