<template>
    <div class="body">
      <h1>{{Title}}</h1>
      <p>email: tsukisama9292@gmail.com</p>
      <a href="https://www.instagram.com/taiwan_k12edu/"><p>IG</p></a>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactUsBody',
    data(){
      return {}
    },
    components:{
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
  