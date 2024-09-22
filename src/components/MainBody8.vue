<template>
    <div id="main-body">
      <ProblemManagementPage id="body" :Title="bodyTitle"></ProblemManagementPage>
    </div>
  </template>
  
  <script>
  import ProblemManagementPage from './ProblemManagementPage.vue';
  export default {
    name: 'MainBody8',
    components:{
      ProblemManagementPage,
    },
    data(){
      return {
        bodyTitle: '題目管理頁面',
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
    width: 65%;
    }
  #right-sidebar {
    margin: 20px;
    width: 20%;
  }
  </style>