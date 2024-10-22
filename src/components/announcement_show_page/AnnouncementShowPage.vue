<template>
    <div class="problem-edit-main">
      <div class="problem-edit-body" v-if="item">
        <div class="edit-div">
          <h3>標題: {{ item.title }}</h3>
        </div>
        <div class="edit-div">
          <h3>發布時間: {{ item.create_time }}</h3>
        </div>
        <div class="edit-div">
          <h3>作者: {{ item.author }}</h3>
        </div>
        
        <div class="edit-div">
          <h3>內容</h3>
          <div class="edit-item">
            <p>{{item.announcement_description}}</p>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script>
  
  export default {
    name: 'ProblemEditPage',
    components:{
      
    },
    data(){
      return {
        item:undefined,
      }
    },
    methods:{
      async fetchData() {
        try {
          const queryParams = new URLSearchParams({
            request_id: this.$route.params.id,
          }).toString();
          const response = await fetch(`http://127.0.0.1:60000/teacher-platform/announcement/?${queryParams}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }, 
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          this.item = result.problem_list; // 將獲取的問題列表存儲到 itemsWithType
        } catch (error) {
          console.error('發送請求時出錯：', error);
        }
      },
    },
    computed:{
    },
    props: {},
    inject:[],
    mounted(){
      if (this.items == undefined) {
        this.fetchData();
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .title-input{
    width: 35%;
  }
  .option-items{
    margin-bottom: 10px;
  }
  .edit-div{
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    border: 3px solid rgb(147, 192, 207);
    border-radius: 5px;
    margin: 0px 0px 20px 0px;
    padding: 20px;
  }
  .problem-edit-main{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .problem-edit-body{
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 65%;
  }
  .edit-item{
    display: flex;
    align-items: center;
    width: 100%;
  }
  .edit-item2{
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
  }
  .problem-describe{
    width: 70%;
    height: 40vh;
    font-size: 18px;
  }
  input{
    border: 3px solid rgb(146, 198, 215);
    border-radius: 5px;
    padding: 5px;
  }
  label{
    font-weight: bold;
  }
  button{
    font-weight: bold;
    border: 3px solid rgb(146, 198, 215);
    border-radius: 5px;
  }
  h3{
    margin-top: 0px;
  }
  button:hover{
    border-color: rgb(41, 152, 154);
  }
  @media(max-width: 1050px){
    .title-input{
      width: 80%;
    }
  }
  </style>
  