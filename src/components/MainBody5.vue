<template>
    <div id="main-body">
      <FrequentlyAskedQuestionsBody id="body" :Title="bodyTitle"></FrequentlyAskedQuestionsBody>
    </div>
  </template>
  
  <script>
  import FrequentlyAskedQuestionsBody from './FrequentlyAskedQuestionsBody.vue';
  export default {
    name: 'MainBody5',
    components:{
      FrequentlyAskedQuestionsBody,
    },
    data(){
      return {
        bodyTitle: '常見問題',
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