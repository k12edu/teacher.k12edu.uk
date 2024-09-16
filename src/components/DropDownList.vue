<template>
    <div id="drop-down-list">
      <ul>
        <RouterLink to="/Page2" class="no-style" @click="ChangeDropListDisplay"><li><p>題目列表</p></li></RouterLink>
        <RouterLink to="/Page3" class="no-style" @click="ChangeDropListDisplay"><li><p>課程內容</p></li></RouterLink>
        <RouterLink to="/Page4" class="no-style" @click="ChangeDropListDisplay"><li><p>使用者列表</p></li></RouterLink>
        <RouterLink to="/Page5" class="no-style" @click="ChangeDropListDisplay"><li><p>常見問題</p></li></RouterLink>
        <RouterLink to="/Page6" class="no-style" @click="ChangeDropListDisplay"><li><p>聯絡我們</p></li></RouterLink>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DropDownList',
    components:{
    },
    data(){
      return {}
    },
    props: {},
    methods:{
      ChangeDropListDisplay(){
        this.$emit("ChangeDropListDisplay")
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .drop-down-list{
    position: absolute;
    right: 0.5rem;
    background-color: rgb(236, 236, 236);
    width: 200px;
    border-radius: 10px;
    overflow: hidden;
  }
  .no-style
  {
    position: relative;
  }
  ul {
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
  </style>