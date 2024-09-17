<template>
    <div id="announcement">
      <h1>公告</h1>
      <div id="announcement-list"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AnnouncementComponents',
    components:{
    },
    data(){
      return {}
    },
    props: {}
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #announcement{
    display: flex;
    flex-direction: column;
    width: 80%;
    border: 2px solid rgb(156, 200, 216);
    border-radius: 20px;
  }
  </style>