<template>
    <div class="body">
      <Announcement></Announcement>
      <h1>{{Title}}</h1>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
      <p>測試內容</p>
    </div>
  </template>
  
  <script>
  import Announcement from './Announcement.vue'
  export default {
    name: 'MainBody',
    data(){
      return {}
    },
    components:{
      Announcement,
    },
    computed:{
      
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
  #body{
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
  </style>
  