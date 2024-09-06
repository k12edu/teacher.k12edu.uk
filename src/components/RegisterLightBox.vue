<template>
    <div id="register-light-box" @click.self="$emit('ChangeLightBox2Display')">
      <div id="register-lightbox-content">
        <h1 style="margin-bottom: 15px; margin-top: 25px;">註冊帳號</h1>
        <div class="input-content">
          <input placeholder="帳號" v-model="userName">
        </div>
        <div class="input-content">
          <input type="password" placeholder="密碼" v-model="userPassword">
        </div>
        <div class="input-content">
          <input type="password" placeholder="重複密碼" v-model="userRepeatedPassword">
        </div>
        <div class="input-content">
          <input type="email" placeholder="電子信箱" v-model="userEmail">
        </div>
        <button id="register-button" @click="UpdateUserName"><h2>註冊</h2></button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterLightBox',
    components:{
    },
    data(){
      return {
        userName: "",
        userEmail: "",
        userPassword: "",
        userRepeatedPassword: "",
      }
    },
    props: {},
    computed: {
      
    },
    methods: {
      ateUserName(){
        this.ChangeUserName(this.userName);
      }
    },
    inject:[],
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #register-light-box {
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
  #register-lightbox-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 52%;
    width: 18%;
    background-color: rgb(255, 255, 255);
    border-radius: 30px;
  }
  #register-button {
    width: 30%;
    height: 36px;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 10px;
    border: 2px solid rgb(93, 153, 175);
    margin-top: 40px;
    color: rgb(93, 153, 175);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  #register-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  #register-button:active {
    background-color: rgba(0, 0, 0, 0.15);
  }
  .input-content {
    position: relative;
    display: flex;
    width: 80%;
  }
  h1 {
    color: rgb(93, 153, 175);
    margin: 5px;
  }
  h2 {
    margin: 0px;
  }
  input {
    width: 100%;
    height: 36px;
    border-radius: 10px;
    margin-top: 30px;
    font-size: 18px;
    border: 2px solid rgb(93, 153, 175);
    padding-left: 10px;
    color: rgb(104, 104, 104);
    user-select: none;
    
  }
  input::placeholder {
    padding-left: 2px;
  }
  input:focus {
    border-color: rgb(93, 153, 175);
    outline: none;  
  }

  </style>