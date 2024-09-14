<template>
    <div id="header">
      <RouterLink :to="{name:'MainPage'}"><div><h1>教師題目上傳平台</h1></div></RouterLink>
      <Nav class="Nav"></Nav>
    </div>
  </template>
  
  <script>
  import Nav from "./Nav.vue"
  export default {
    name: 'MainHeader',
    components:{
      Nav,
    },
    data(){
      return {}
    },
    props: {}
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #header {
    display: flex;
    justify-content: space-around;
  }
  h1 {
    color: rgb(93, 153, 175);
  }
  a {
    text-decoration: none;
  }
  @media (max-width: 1050px){
    .Nav{
      display: none;
    }
  }
  </style>