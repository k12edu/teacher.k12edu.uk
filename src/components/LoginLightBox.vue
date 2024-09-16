<template>
    <div id="login-light-box" @click.self="$emit('ChangeLightBoxDisplay')">
      <div id="login-lightbox-content">
        <h1 style="margin-bottom: 15px; margin-top: 25px;">登入帳號</h1>
        <div class="input-content">
          <input placeholder="帳號" v-model="userName">
        </div>
        <div class="input-content">
          <input :type="passwordType()" placeholder="密碼" v-model="userPassword">
          <div id="eye-icon-div">
            <img :src="require(`@/assets/${eyeIconPath}`)" alt="" @click="ChangePasswordDisplay()" id="eye-icon">
          </div>
        </div>
        <button id="log-in-button" @click="UpdateUserName"><h2>登入</h2></button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginLightBox',
    components:{
    },
    data(){
      return {
        passwordDisplay: false,
        eyeIconPath : 'eye2.png',
        userName: "",
        userPassword: "",
      }
    },
    props: {},
    computed: {
      
    },
    methods: {
      ChangePasswordDisplay(){
        this.passwordDisplay=!this.passwordDisplay;
        this.eyeIconPath = this.passwordDisplay ? 'eye1.png' :'eye2.png';
      },
      passwordType(){
        return this.passwordDisplay ? 'text' : 'password';
      },
      UpdateUserName(){
        this.ChangeUserName(this.userName);
      }
    },
    inject:['ChangeUserName'],
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
    height: 350px;
    width: 250px;
    background-color: rgb(255, 255, 255);
    border-radius: 30px;
  }
  #eye-icon-div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top:1.5rem;
    margin-left: 85%;
    cursor: pointer;
  }
  #eye-icon {
    width: 1.5rem;
    height:1.5rem;
  }
  #log-in-button {
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
  #log-in-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  #log-in-button:active {
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
    margin-top: 1rem;
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