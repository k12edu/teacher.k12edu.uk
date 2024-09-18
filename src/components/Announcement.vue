<template>
    <div id="announcement">
      <h1>公告</h1>
      <div id="announcement-list">
        <div class="problem-list">
          <div class="problem-item" v-for="item in items" :key="item.id"><p>{{ item.title }}</p></div>
        </div>
        <div class="switch-button">
          <RouterLink to="/Page7" class="no-style"><p>更多公告</p></RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AnnouncementComponents',
    components:{
    },
    data(){
      return {
        items:[
          {
            id:1,
            title:'Title 1',
          },
          {
            id:2,
            title:'Title 2',
          },
          {
            id:3,
            title:'Title 3',
          },
          {
            id:4,
            title:'Title 4',
          },
          {
            id:5,
            title:'Title 5',
          },
        ],
      }
    },
    props: {}
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #announcement{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    border: 2px solid rgb(156, 200, 216);
    border-radius: 20px;
    padding-bottom: 20px;
  }
  .switch-button{
    border: 2px solid rgba(93, 153, 175, 0);
    color: rgb(213, 225, 230);
    background-color : rgb(175, 208, 221);
    margin :0px 10px;
    border-radius: 4px;
    font-weight: bold;
    color:rgb(93, 153, 175);
    white-space: nowrap;
    margin-top: 20px;
  }
  .switch-button:hover{
    background-color: rgb(156, 200, 216);
    color: white;
  }
  .no-style {
    color: inherit;
    text-decoration: none;
  }
  p{
    margin: 10px;
  }
  </style>