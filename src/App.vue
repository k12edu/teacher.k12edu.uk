<template>
  <div id="main-app">
    <header><Header ></Header></header>
    <RouterView style="min-height: 100vh;"></RouterView>
    <footer><Footer></Footer></footer>
  </div>
</template>

<script>
/* global google */
import { computed } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer';


export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data(){
    return {
      userName: "",
      isLogIn:false,
      access_token:"",
    }
  },
  provide(){
    return {
      isLogIn : computed(() => this.isLogIn),
      googleLogin : this.googleLogin,
      access_token:computed(() => this.access_token),
      logout: this.logout,
    }
  }, 
  methods: {
    logout(){
      if(this.isLogIn==false) return;
      localStorage.removeItem('jwt');
      localStorage.removeItem('refresh');
      this.access_token="";
      this.isLogIn=false;
      this.$router.push({ name: 'MainPage' });
      window.location.reload(); 
    },
    ChangeUserName(newUserName){
      this.userName = newUserName;
      this.isLogIn = true;
      window.location.reload(); 
    },
    loadGoogleAPI() {
      window.google = window.google || {};
      if (!window.google.accounts) {
        console.error('Google accounts API not loaded');
        return;
      }
    },
    googleLogin() {
      this.loadGoogleAPI();
      const client = google.accounts.oauth2.initTokenClient({
        client_id: '63473080805-na5r3r5d4m3ibnk1f7kvjgp7n1grnaoe.apps.googleusercontent.com', // 替換成你的 Google OAuth 2.0 用戶端 ID
        redirect_uri: 'http://localhost:8080/',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        callback: (response) => {
          if (response.access_token) {
            // 將 access_token 傳送到 Django 後端進行驗證
            this.sendAccessTokenToBackend(response.access_token);
          } else {
            console.error('Failed to obtain access token');
          }
        }
      });

      // 開始 Google 登入流程
      client.requestAccessToken();
    },

    sendAccessTokenToBackend(accessToken) {
      fetch('http://127.0.0.1:60000/accounts/api/google-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
      })
        .then(response => response.json())
        .then(data => {
          // 處理 Django 回傳的 JWT
          if (data.access) {
            this.$router.push({ name: 'MainPage' });
            this.ChangeUserName('已登入帳號');
            this.access_token=data.access;
            localStorage.setItem('jwt', data.access);
            localStorage.setItem('refresh', data.refresh);
            console.log('JWT token received and stored:', data);
          } else {
            console.error('JWT not received:', data);
          }
        })
        .catch(error => console.error('Error sending access token to backend:', error));
    },
  },
  mounted(){
    this.access_token = localStorage.getItem('jwt');
    if(this.access_token == undefined) this.access_token="";
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}
</script>

<style>
h1{
  text-wrap: nowrap;
}
#main-app{
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style scoped>

header {
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  margin-bottom: 20px;
}

footer {
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  margin-top: 20px;
  margin-bottom: 20px;
}

h1 {
  margin: 20px;
  display: '';
}

p {
  margin: 10px;
}

</style>
