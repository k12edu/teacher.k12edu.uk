<template>
    <div class="course-content_body">
      <h1>{{Title}}</h1>
      <div class="course-list">
        <div class="course-item" v-for="item in items" :key="item.id"><p>{{ item.title }}</p></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CourseContentBody',
    data(){
      return {
        items: [
          { id: 1, title: 'Title1'},
          { id: 2, title: 'Title2'},
          { id: 3, title: 'Title3'},
          { id: 4, title: 'Title4'},
          { id: 5, title: 'Title5'},
          { id: 6, title: 'Title6'},
          { id: 7, title: 'Title7'},
          { id: 8, title: 'Title8'},
          { id: 9, title: 'Title9'},
          { id: 10, title: 'Title10'},
        ]
      }
    },
    props: {
      Title:{
        type:String,
        default:'Title',
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .course-content_body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .course-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 85%;
  }
  .course-item {
    margin: 8px;
    border: 2px solid lightblue;
    border-radius :10px;
    width: 40%;
    height: 10rem;
  }
  </style>
  