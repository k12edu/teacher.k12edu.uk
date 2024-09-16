<template>
    <div id="header">
      <RouterLink :to="{name:'MainPage'}"><div><h1>教師題目上傳平台</h1></div></RouterLink>
      <Nav class="Nav"></Nav>
      <ChoiceList id="choice-list"></ChoiceList>
    </div>
  </template>
  
  <script>
  import Nav from "./Nav.vue";
  import ChoiceList from "./ChoiceList.vue";
  export default {
    name: 'MainHeader',
    components:{
      Nav,
      ChoiceList,
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
    position: relative;
    justify-content: space-around;
  }
  h1 {
    color: rgb(93, 153, 175);
  }
  a {
    text-decoration: none;
  }
  #choice-list{
    display: none;
  }
  @media (max-width: 1050px){
    .Nav{
      display: none;
    }
    #choice-list{
      display: block;
    }
  }
  </style>