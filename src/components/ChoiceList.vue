<template>
    <div id="choice-list">
      <img :src="require('@/assets/choice_list_icon.png')" alt="選單" class="choice-list-icon">
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainHeader',
    components:{
    },
    data(){
      return {}
    },
    props: {}
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #choice-list {
    position: absolute;
    top:20%;
    right:3%;
    height: 60%;
    width: auto;
  }
  .choice-list-icon{
    height:100%;
    width: 100%;
    opacity: 0.35;
  }
  </style>