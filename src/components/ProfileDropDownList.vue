<template>
  <div id="drop-down-list">
    <ul>
      <RouterLink to="/Page9" class="no-style" @click="ChangeDropListDisplay"><li><p>個人資料</p></li></RouterLink>
      <RouterLink to="/Page8" class="no-style" @click="ChangeDropListDisplay"><li><p>題目管理</p></li></RouterLink>
      <li @click="logout"><p>登出</p></li>
      <LoginButton v-if="!isLogIn"></LoginButton>
    </ul>
    <div class="close-list-div" @click="ChangeDropListDisplay"></div>
  </div>
</template>

<script>
import LoginButton from './LoginButton.vue';
export default {
  name: 'DropDownList',
  components:{
    LoginButton,
  },
  data(){
    return {}
  },
  props: {},
  methods:{
    ChangeDropListDisplay(){
      this.$emit("ChangeDropListDisplay")
    }
  },
  inject:['isLogIn','logout']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.close-list-div{
  top:0;
  left: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 1;
}
.drop-down-list{
  position: absolute;
  right: 0.5rem;
  background-color: rgb(247, 247, 247);
  width: 200px;
  border-radius: 10px;
  overflow: hidden;
}
.no-style
{
  position: relative;
}
ul {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-content: center;
  list-style-type: none;
  padding: 0px;
  margin: 0;
  width: 100%;
}
li {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  color:rgb(93, 153, 175);
  font-weight: bold;
  display: inline-block;
  margin: 0 0;
  cursor: pointer;
  user-select: none;
  transition: background-color;
  transition: color;
}
li:hover{
  background-color: rgb(209, 209, 209);
  color: white;
}
.drop-down-list >>> .login-area {
  display: flex;
  justify-content: center;
  margin-left: 0px;
  margin-bottom: 1rem;
}
</style>