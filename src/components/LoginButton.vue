  <template>
    <LoginLightBox :style="LightBoxDisplayState" @ChangeLightBoxDisplay="ChangeLightBoxDisplay()"></LoginLightBox>
    <RegisterLightBox :style="LightBox2DisplayState" @ChangeLightBox2Display="ChangeLightBox2Display()"></RegisterLightBox>
    <div class="login-area">
      <ul>
        <li id="login-button" @click="ChangeLightBoxDisplay"><p>登入</p></li>
        <li id="register-button" @click="ChangeLightBox2Display"><p>註冊</p></li>    
      </ul>
    </div>
  </template>
  
  <script>
  import LoginLightBox from './LoginLightBox.vue'
  import RegisterLightBox from './RegisterLightBox.vue';
  
  export default {
    name: 'LoginButton',
    components:{
      LoginLightBox,
      RegisterLightBox
    },
    data(){
      return {
        lightBoxDisplay: false,
        lightBox2Display: false,
      }
    },
    props: {},
    computed:{
      LightBoxDisplayState(){
        return {
          display: this.lightBoxDisplay ? "" : "none"
        };
      },
      LightBox2DisplayState(){
        return {
          display: this.lightBox2Display ? "" : "none"
        };
      },
    },
    methods:{
      ChangeLightBoxDisplay(){
        this.lightBoxDisplay=!this.lightBoxDisplay;
      },
      ChangeLightBox2Display(){
        this.lightBox2Display=!this.lightBox2Display;
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .login-area {
    display: flex;
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
    left: 13px;
    z-index: 1;
    border-radius :20000px;
  }
  #register-button {
    background-color: rgb(189, 230, 245);
    border-radius :0px 2000px 2000px 0px;
    right:13px
  }
  #login-button:hover {
    background-color: rgb(103, 178, 206); 
  }
  #register-button:hover{
    background-color: rgb(103, 178, 206);
    color: white;
  }
  </style>