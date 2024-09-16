<template>
    <div id="main-body">
      <Body id="body" :Title="bodyTitle"></Body>
    </div>
  </template>
  
  <script>
  import Body from "./Body.vue"
  export default {
    name: 'MainBody6',
    components:{
      Body,
    },
    data(){
      return {
        bodyTitle: '聯絡我們',
      }
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
    margin: 20px;
    margin-right: 0px;
    border-right: 2px solid rgba(128, 128, 128, 0.2);
    width: 45%;
    }
  #right-sidebar {
    margin: 20px;
    width: 20%;
  }
  </style>