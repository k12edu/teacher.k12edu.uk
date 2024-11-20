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
    width: 70%;
    }
  </style>