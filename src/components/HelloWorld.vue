<template>
    <div>
        <router-link :to="{name:'A', params: {id: 123, name:'zhangsan'}, query: {age:30}}">点击跳到A页面</router-link>
        <router-link :to="{name: 'B'}">点击跳到B页面</router-link>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
