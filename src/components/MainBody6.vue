<template>
    <div id="main-body">
      <p>Page6</p>
      <Body id="body"></Body>
      <RightSidebar id="right-sidebar"></RightSidebar>
    </div>
  </template>
  
  <script>
  import Body from "./Body.vue"
  import RightSidebar from "./RightSidebar.vue"
  export default {
    name: 'MainBody6',
    components:{
      Body,
      RightSidebar
    },
    data(){
      return {}
    },
    props: {}
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #main-body {
    display: flex;
    align-items: start;
    justify-content: center;
    margin: 20px;
  }
  #body {
    border: 2px solid black;
    border-radius: 50px;
    margin: 20px;
    width: 40%;
    }
  #right-sidebar {
    border: 2px solid black;
    border-radius: 30px;
    margin: 20px;
    width: 20%;
  }
  </style>