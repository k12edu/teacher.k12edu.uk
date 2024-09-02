  <template>
    <LoginLightBox :style="LightBoxDisplayState" @changeLightBoxDisplay="changeLightBoxDisplay"></LoginLightBox>
    <div class="login-area">
      <ul>
        <li id="login-button" @click="changeLightBoxDisplay"><p>登入</p></li>
        <li id="register-button"><p>註冊</p></li>    
      </ul>
    </div>
  </template>
  
  <script>
  import LoginLightBox from './LoginLightBox.vue'
  export default {
    name: 'LoginButton',
    components:{
      LoginLightBox
    },
    data(){
      return {
        lightBoxDisplay: false,
      }
    },
    props: {},
    computed:{
      LightBoxDisplayState(){
        return {
          display: this.lightBoxDisplay ? "" : "none"
        };
      },
    },
    methods:{
      changeLightBoxDisplay(){
        this.lightBoxDisplay=!this.lightBoxDisplay;
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
    left: 25px;
    z-index: 1;
    border-radius :20000px;
  }
  #register-button {
    background-color: rgb(189, 230, 245);
    border-radius :0px 2000px 2000px 0px;
  }
  #login-button:hover {
    background-color: rgb(103, 178, 206); 
  }
  #register-button:hover{
    background-color: rgb(103, 178, 206);
    color: white;
  }
  </style>