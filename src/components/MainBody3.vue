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
    border-left: 2px solid rgba(128, 128, 128, 0.2);
    border-right: 2px solid rgba(128, 128, 128, 0.2);
    width: 70%;
    }
  </style>