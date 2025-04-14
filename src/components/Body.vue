<template>
    <div class="body">
      <Announcement></Announcement>
      <h1></h1>
      <h1></h1>
      <p>此網站提供使用者上傳程式、自然、數學題目作為遊戲"賽博學者"的題目抽取來源，並提供題目生成工具生成題目資訊與解答。且能瀏覽所有公開狀態的題目資訊。</p>
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