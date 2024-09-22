<template>
    <div class="nav">
      <ul>
        <RouterLink to="/Page2" class="no-style"><li><p>題目列表</p></li></RouterLink>
        <RouterLink to="/Page3" class="no-style"><li><p>課程內容</p></li></RouterLink>
        <RouterLink to="/Page4" class="no-style"><li><p>使用者列表</p></li></RouterLink>
        <RouterLink to="/Page5" class="no-style"><li><p>常見問題</p></li></RouterLink>
        <RouterLink to="/Page6" class="no-style"><li><p>聯絡我們</p></li></RouterLink>
      </ul>
      <LoginButton v-if="showLoginButton"></LoginButton>
      <UserProfileButton v-if="!showLoginButton"></UserProfileButton>
    </div>
</template>
  
  <script>
  import LoginButton from './LoginButton.vue';
  import UserProfileButton from './UserProfileButton.vue';
  export default {
    name: 'MainNav',
    components:{
      LoginButton,
      UserProfileButton,
    },
    data(){
      return {
      }
    },
    computed:{
      showLoginButton(){
        return this.isLogIn ? false : true;
      },
    },
    props: {},
    inject:['isLogIn']
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .nav {
    display: flex;
    justify-content: center;
  } 
  .no-style {
    color: inherit;
    text-decoration: none;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    position: relative;
    z-index: 2;
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
  }
  li:hover{
    background-color: rgb(156, 200, 216);
    color: white;
  }
  a {
    color: #42b983;
  }
  
  </style>
  