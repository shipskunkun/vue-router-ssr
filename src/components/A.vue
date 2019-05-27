<template>
  <div>
    this is A <br>
    <router-link :to="{name:'C'}">点击跳转到C</router-link>
    <button @click="back">点击返回</button>
    <transition>
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'A',
  props: ['id', 'name'],
  data () {
    return {
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to, from);
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to, from);
    next();
  },
  mounted() {
    console.log(this.$route);
    console.log('this.id=', this.id, 'this.name=', this.name);
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-enter-active, .v-leave-active {
    transition: opacity 2s
  }
  .v-enter, .v-leave-to {
    opacity: 0
  }
</style>
