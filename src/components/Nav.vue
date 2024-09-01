<template>
    <div class="nav">
      <ul>
        <li><p>選項一</p></li>
        <li><p>選項二</p></li>
        <li><p>選項三</p></li>
        <li><p>選項四</p></li>
        <li><p>選項五</p></li>
      </ul>
      <LoginButton></LoginButton>
    </div>
</template>
  
  <script>
import LoginButton from './LoginButton.vue';

  export default {
    name: 'MainNav',
    components:{
      LoginButton,
    },
    data(){
      return {}
    },
    props: {}
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .nav {
    display: flex;
    justify-content: center;
  } 
  h3 {
    margin: 40px 0 0;
  }
  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    padding: 0px;
    border: 2px solid lightblue;
    border-radius :20000px;
    overflow: hidden;
  }
  li {
    display: flex;
    align-items: center;
    height: 100%;
    color:rgb(93, 153, 175);
    font-weight: bold;
    display: inline-block;
    margin: 0 0;
    padding: 0 20px;
    cursor: pointer;
    user-select: none;
    transition: background-color;
    transition: color;
  }
  li:hover{
    background-color: rgb(156, 200, 216);
    color: white;
  }
  a {
    color: #42b983;
  }
  </style>
  