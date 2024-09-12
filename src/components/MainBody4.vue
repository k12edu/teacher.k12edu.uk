<template>
    <div id="main-body">
      <UserListBody id="body" :Title="bodyTitle"></UserListBody>
    </div>
  </template>
  
  <script>
  import UserListBody from './UserListBody.vue';
  export default {
    name: 'MainBody4',
    components:{
      UserListBody,
    },
    data(){
      return {
        bodyTitle: '使用者列表',
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
    border-left: 2px solid rgba(128, 128, 128, 0.2);
    border-right: 2px solid rgba(128, 128, 128, 0.2);
    width: 70%;
    }
  </style>