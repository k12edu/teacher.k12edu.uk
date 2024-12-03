<template>
  <div class="User-list-body" v-if="isLogIn">
    <h1>{{Title}}</h1>
    <div class="switch-page-div">
      <label for="select" style="text-wrap: nowrap;">每頁資料筆數：</label>
      <select id="select" v-model="itemPerPage" @change="handleChange">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="User-list">
      <div class="User-item" v-for="item in items" :key="item.id"><p>{{ item.user_name }}</p></div>
    </div>
    <div class="switch-page-div">
      <button class="button" @click="toFirstPage" id="applyButton"><p>第一頁</p></button>
      <button class="button" @click="previousPage" id="applyButton"><p>上一頁</p></button>
      <p style="color:rgb(93, 153, 175);">第</p>
      <input @change="applyInput" class="input-box" type="number" name="" id="" v-model="inputPage">
      <p style="color:rgb(93, 153, 175);">頁</p>
       <!-- <button class="button" style="margin :0px 6px;" @click="applyInput" id="applyButton"><p>前往</p></button> -->
      <button class="button" @click="nextPage" id="applyButton"><p>下一頁</p></button>
      <button class="button" @click="toLastPage" id="applyButton"><p>最後一頁</p></button>
    </div>
  </div>
  <div v-if="!isLogIn" class="no-data">
    <h3>請登入查看資料</h3>
  </div>
</template>

<script>
export default {
  name: 'UserListBody',
  data(){
    return {
      items:[],
      page:1,
      inputPage:1,
      itemPerPage:30,
      options: [
        { value: 10, text: '10' },
        { value: 20, text: '20' },
        { value: 30, text: '30' },
        { value: 50, text: '50' },
        { value: 100, text: '100' },
      ],
    }
  },
  props: {
    Title:{
      type:String,
      default:'Title',
    }
  },
  computed:{
  },
  methods:{
    async fetchData() {
        try {
          const queryParams = new URLSearchParams({
            request_page: this.page,
            request_count: this.itemPerPage,
          }).toString();
          const token=this.access_token;
          const response = await fetch(`${this.api_url}/teacher-platform/user-info-list/?${queryParams}`, {
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
          this.items = result.user_list; // 將獲取的問題列表存儲到 itemsWithType
        } catch (error) {
          console.error('發送請求時出錯：', error);
        }
      },
    applyInput(){
      this.page=this.inputPage;
      this.fetchData();
    },
    nextPage(){
      if(this.items.length>0)
      {
        this.inputPage+=1;
        this.applyInput();
      }
    },
    previousPage(){
      if(this.page>1)
      {
        this.inputPage-=1;
        this.applyInput();
      }
    },
    toFirstPage(){
      this.inputPage=1;
      this.applyInput();
    },
    toLastPage(){
      //暫時沒有功能，之後跟後端請求頁數

      this.applyInput();
    }
  },
  inject:['access_token','isLogIn','api_url'],
  mounted() {
    if (this.items.length === 0) {
      this.fetchData();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
  margin: 0px;
}
input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield;      /* Chrome, Safari, Edge */
  text-align: center;

}
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input-box{
  border: 2px solid rgba(93, 153, 175, 0);
  width: 40px;
  border-radius: 4px;
  color:rgb(93, 153, 175);
  font-size: medium;
}
input:focus {
  border-color: #007bff !important; /* 強制應用藍色邊框顏色 */
}
.button{
  border: 2px solid rgba(93, 153, 175, 0);
  background-color: rgb(213, 225, 230);
  margin :0px 4px;
  border-radius: 4px;
  font-weight: bold;
  color:rgb(93, 153, 175);
  white-space: nowrap;
}
.button:hover{
  background-color: rgb(156, 200, 216);
  color: white;
}
.button:active{
  background-color: rgb(175, 208, 221);
  transition: background-color 0.2s ease;
}
.no-data{
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.switch-page-div{
  display: flex;
  align-items: center;
  margin-top: 10px;
}
#applyButton{
  height: 30px;
  display: flex;
  align-items: center;
}
.User-list-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.User-list {
  width: 85%;
}
.User-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  margin: 8px;
  border: 2px solid lightblue;
  border-radius :10px;
}
</style>
