<template>
  <div>
    this is A <br>
    <router-link :to="{name:'C'}">点击跳转到C</router-link><br>
    <router-link :to="{name:'A', params: {id: 123, name:'lisi'}}">点击跳到A2页面</router-link><br>
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
      console.log('执行watch');
    }
  },
  beforeRouteEnter(to, from, next) {
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      next();
  },
  beforeRouteUpdate (to, from, next) {
    console.log('执行update');
    next();
  },
  mounted() {
    console.log(this.$route);
    console.log(this.$router);
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
