<template>
    <div class="user-list-body">
      <h1>{{Title}}</h1>
      <div class="user-list">
        <div class="user-item" v-for="item in items" :key="item.id"><p>{{ item.name }}</p></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserListBody',
    data(){
      return {
        items: [
          { id: 1, name: 'User1'},
          { id: 2, name: 'User2'},
          { id: 3, name: 'User3'},
          { id: 4, name: 'User4'},
          { id: 5, name: 'User5'},
          { id: 6, name: 'User6'},
          { id: 7, name: 'User7'},
          { id: 8, name: 'User8'},
          { id: 9, name: 'User9'},
          { id: 10, name: 'User10'},
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
  .user-list-body {
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
  .user-list {
    width: 85%;
  }
  .user-item {
    margin: 8px;
    border: 2px solid lightblue;
    border-radius :10px;
  }
  </style>
  