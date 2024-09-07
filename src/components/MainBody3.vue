<template>
    <div id="main-body">
      <Body id="body" :Title="bodyTitle"></Body>
      <RightSidebar id="right-sidebar"></RightSidebar>
    </div>
  </template>
  
  <script>
  import Body from "./Body.vue"
  import RightSidebar from "./RightSidebar.vue"
  export default {
    name: 'MainBody3',
    components:{
      Body,
      RightSidebar
    },
    data(){
      return {
        bodyTitle: '課程內容',
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