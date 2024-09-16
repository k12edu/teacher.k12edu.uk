<template>
    <div id="main-body">
      <ProblemListBody id="body" :Title="bodyTitle"></ProblemListBody>
    </div>
  </template>
  
  <script>
  import ProblemListBody from "./ProblemListBody.vue";
  export default {
    name: 'MainBody2',
    components:{
      ProblemListBody,
    },
    data(){
      return {
        bodyTitle: '題目列表',
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