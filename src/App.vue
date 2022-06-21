<template>
  <div id = 'App'>
    <UpperBar/>
    <ul>
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/MainPage">Products</router-link></li>
    </ul>
     <router-view></router-view>
  </div>
</template>

<script>
import UpperBar from "@/components/UpperBar.vue"
import MainPage from "@/components/MainPage.vue"

export default{
  name:'App',
  components:
  {
     UpperBar,
     MainPage
  },
  
}




  
  

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
