<template>
  <div class="login-area">
    <ul>
      <li id="login-button" @click="ChangeDropListDisplay"><p>個人選單</p></li>
    </ul>
    <ProfileDropDownList id="profile-drop-list" @ChangeDropListDisplay="ChangeDropListDisplay" :style="dropListDisplayState"></ProfileDropDownList>
  </div>
</template>

<script>
import ProfileDropDownList from './ProfileDropDownList.vue';
export default {
  name: 'UserProfileButton',
  components:{
    ProfileDropDownList,
  },
  data(){
    return {
      dropListDisplay: false,
    }
  },
  props: {},
  computed:{
    dropListDisplayState(){
      return {
        display: this.dropListDisplay ? "" : "none"
      };
    }
  },
  methods:{
    ChangeDropListDisplay(){
      this.dropListDisplay=!this.dropListDisplay;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#profile-drop-list{
  width: 200px;
  background-color: rgb(244, 244, 244);
  border-radius: 20px;
  position: absolute;
  top : 90%;
  display: flex;
  overflow: hidden;
}
.login-area {
  display: flex;
  position: relative;
  justify-content: center;
  margin-left: 30px;
}
ul {
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 0px;
  overflow: hidden;
}
li {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  color:rgb(93, 153, 175); 
  font-weight: bold;
  display: inline-block;
  margin: 0 0;
  padding: 0 5px;
  cursor: pointer;
  user-select: none;
  width: 90px;
  transition: background-color;
  transition: color;
}
#login-button {
  color: white;
  background-color: rgb(126, 191, 214);
  z-index: 1;
  border-radius :20000px;
}
#login-button:hover {
  background-color: rgb(103, 178, 206); 
}
#register-button:hover{
  background-color: rgb(103, 178, 206);
  color: white;
}
</style>