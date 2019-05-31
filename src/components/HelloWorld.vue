<template>
    <div>
        <ul>
            <li>路由学习</li>
            <li><router-link  :to="{name:'A', params: {id: 123, name:'zhangsan'}}">点击跳到A1页面</router-link></li>
            <li><router-link  :to="{name: 'B', params: {id: 456}}">点击跳到B页面</router-link></li>
         </ul>
         <ul>
            <li>vuex学习</li>
            <li>{{ this.$store.state.count }}</li>
            <li>{{ count }}</li>
            <li><button @click="add1">点我+1</button></li>
            <li><button @click="add2">点我+10</button></li>
            <li><button @click="add3(5)">点我+5</button></li>
            <li><button @click="add4(2)">点我+2</button></li>
            <li>{{ this.$store.getters.name }}</li>
            <li>{{ name }}</li>
         </ul>
    </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    add1() {
        this.$store.commit('changeState', 1)
    },
    add2() {
        this.$store.dispatch('updateState', 10)
    },
    ...mapMutations({
        add3: 'changeState'
    }),
    ...mapActions({
        add4: 'updateState'
    })
  },
  computed: {
    ...mapState(['count']),
    ...mapState({
        counter: (state) => state.count
    }),
    ...mapGetters(['name']),
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
    margin-bottom: 50px;
}
a {
  color: #42b983;
}
</style>
