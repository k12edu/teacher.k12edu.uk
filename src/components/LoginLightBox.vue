<template>
    <div id="login-light-box" @click.self="$emit('changeLightBoxDisplay')">
      <div id="login-lightbox-content">
        <h1 style="margin-bottom: 15px; margin-top: 25px;">登入帳號</h1>
        <input placeholder="帳號">
        <input placeholder="密碼">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginLightBox',
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
  #login-light-box {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(138, 138, 138, 0.39);
    z-index: 2;
    top: 0;
    left: 0;
  }
  #login-lightbox-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 40%;
    width: 20%;
    background-color: rgb(255, 255, 255);
    border-radius: 30px;
  }
  h1 {
    color: rgb(93, 153, 175);
    margin: 5px;
  }
  input {
    width: 80%;
    height: 36px;
    border-radius: 10px;
    margin-top: 30px;
    font-size: 20px;
    border: 2px solid rgb(93, 153, 175);
    padding-left: 10px;
    color: rgb(104, 104, 104);
  }
  input::placeholder {
    padding-left: 2px;
  }
  input:focus {
    border-color: rgb(93, 153, 175);
    outline: none;  
  }

  </style>