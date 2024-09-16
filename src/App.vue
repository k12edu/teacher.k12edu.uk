<template>
  <header><Header ></Header></header>
  <RouterView ></RouterView>
  <footer><Footer></Footer></footer>
</template>

<script>
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
      userName: "Hank",
    }
  },
  provide(){
    return {
      ChangeUserName : this.ChangeUserName,
    }
  }, 
  methods: {
    ChangeUserName(newUserName){
      this.userName = newUserName;
    },
  }
}
</script>

<style>
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
