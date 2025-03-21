<template>
    <div id="main-body">
      <ProfilePageBody id="body" :Title="bodyTitle"></ProfilePageBody>
    </div>
  </template>
  
  <script>
  import ProfilePageBody from './ProfilePageBody.vue';
  export default {
    name: 'MainBody9',
    components:{
      ProfilePageBody,
    },
    data(){
      return {
        bodyTitle: '個人資料介面',
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
    width: 100%;
    }
  #right-sidebar {
    margin: 20px;
    width: 20%;
  }
  </style>