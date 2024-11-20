<template>
    <div id="announcement" v-if="isLogIn">
      <h1>公告</h1>
      <div id="announcement-list">
        <div class="problem-list">
          <div class="problem-item title" @click="switchToShowPage(item)" v-for="item in items" :key="item.id"><h4>{{ item.title }}</h4></div>
        </div>
        <div class="switch-button">
          <RouterLink to="/Page7" class="no-style"><p>更多公告</p></RouterLink>
        </div>
      </div>
    </div>
    <div v-if="!isLogIn" class="no-data">
      <h3>請登入查看資料</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AnnouncementComponents',
    components:{
    },
    data(){
      return {
        items:[],
      }
    },
    props: {},
    methods:{
      switchToShowPage(item){
        this.$router.push({ name: 'AnnouncementShow', params: { id:item.announcement_id}});
      },
      async fetchData() {
        try {
          const queryParams = new URLSearchParams({
            request_page: 1,
            request_count: 5,
          }).toString();
          const token = this.access_token;
          const response = await fetch(`http://127.0.0.1:60000/teacher-platform/announcement/?${queryParams}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }, 
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          this.items = result.announcement_list;
        } catch (error) {
          console.error('發送請求時出錯：', error);
        }
      },
    },
    inject:['access_token','isLogIn'],
    mounted() {
      
      if (this.items.length === 0) {
        this.fetchData();
      }
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .no-data{
    height: 80%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
  .title{
    padding: 3px;
    margin: 3px;
    border-radius: 10px;
  }
  .title:hover{
    background-color: rgba(149, 196, 211, 0.7);
    color: white;
  }
  </style>