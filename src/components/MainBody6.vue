<template>
    <div id="main-body">
      <ContactUsBody id="body" :Title="bodyTitle"></ContactUsBody>
    </div>
  </template>
  
  <script>
  import ContactUsBody from './ContactUsBody.vue';
  export default {
    name: 'MainBody6',
    components:{
      ContactUsBody,
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
    width: 45%;
    }
  #right-sidebar {
    margin: 20px;
    width: 20%;
  }
  </style>