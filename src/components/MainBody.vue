<template>
    <div id="main-body">
        <Body id="body" :Title="bodyTitle"></Body>
    </div>
  </template>
  
  <script>
  import Body from "./Body.vue"
  export default {
    name: 'MainBody',
    components:{
      Body
    },
    data(){
      return {
        bodyTitle: 'Home Page',
      }
    },
    props: {

    }
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
    
    margin: 20px;
    width: 65%;
    }
  </style>