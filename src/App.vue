<template>
  <div id="main-app">
    <header><Header ></Header></header>
    <RouterView ></RouterView>
    <footer><Footer></Footer></footer>
  </div>
</template>

<script>
import { computed } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer';


export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data(){
    return {
      userName: "",
      isLogIn:false,
    }
  },
  provide(){
    return {
      ChangeUserName : this.ChangeUserName,
      isLogIn : computed(() => this.isLogIn),
    }
  }, 
  methods: {
    ChangeUserName(newUserName){
      this.userName = newUserName;
      this.isLogIn = true;
    },
  }
}
</script>

<style>
h1{
  text-wrap: nowrap;
}
#main-app{
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style scoped>

header {
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  margin-bottom: 20px;
}

footer {
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  margin-top: 20px;
  margin-bottom: 20px;
}

h1 {
  margin: 20px;
  display: '';
}

p {
  margin: 10px;
}

</style>
