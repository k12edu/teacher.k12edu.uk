<template>
    <div id="main-body">
      <AnnouncementListBody id="body" :Title="bodyTitle"></AnnouncementListBody>
    </div>
  </template>
  
  <script>
  import AnnouncementListBody from './AnnouncementListBody.vue';
  export default {
    name: 'MainBody7',
    components:{
      AnnouncementListBody,
    },
    data(){
      return {
        bodyTitle: '公告',
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
    width: 75%;
    }
  #right-sidebar {
    margin: 20px;
    width: 20%;
  }
  </style>