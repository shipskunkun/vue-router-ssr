<template>
    <div>
        <ul>
            <li>路由应用</li>
            <li><router-link  :to="{name:'A', params: {id: 123, name:'zhangsan'}}">点击跳到A1页面</router-link></li>
            <li><router-link  :to="{name: 'B', params: {id: 456}}">点击跳到B页面</router-link></li>
            <li>state.count</li>
            <li>{{ this.$store.state.count }}</li>
            <li>{{ count }}</li>
            <li><button @click="add">点我+2</button></li>
            <li>{{ this.$store.getters.name }}</li>
            <li>{{ name }}</li>
         </ul>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    add() {
        this.$store.commit('changeState', 2)
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['name'])
  },
  mounted() {
    console.log(this.$store.getters.name)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    list-style-type: none;
}
a {
  color: #42b983;
}
</style>
