<template>
    <div id="main-body">
      <CourseContentBody id="body" :Title="bodyTitle"></CourseContentBody>
      <RightSidebar id="right-sidebar"></RightSidebar>
    </div>
  </template>
  
  <script>
  import CourseContentBody from "./CourseContentBody.vue";
  export default {
    name: 'MainBody3',
    components:{
      CourseContentBody,
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
    width: 100%;
    }
  </style>