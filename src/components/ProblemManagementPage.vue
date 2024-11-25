<template>
  <div class="problemList-list-main" v-if="isLogIn">
    <div class="problemList-list-body">
    <h1>{{Title}}</h1>
    <div class="radio-group">
      <label style="user-select: none;" v-for="option in sujectOptions" :key="option.value" class="radio-option">
        <input
        type="radio"
        :value="option.value"
        v-model="selectedOption"
        @change="fetchData"
        name="options"
      />
      {{ option.text }}
      </label>
    </div>
    <div class="switch-page-div" v-if="!isMobile">
      <label for="select" style="text-wrap: nowrap;">每頁資料筆數：</label>
      <select id="select" v-model="itemPerPage" @change="fetchData">
        <option  v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="problemList-list">
      <div class="problemList-item">
        <h3>題號</h3>
        <h3>題型</h3>
        <h3>標題</h3>
        <h3>作者</h3>
        <h3>答題次數</h3>
        <h3>正確次數</h3>
      </div>
      <div class="problemList-item" v-for="item in items" :key="item.id">
        <p v-if="selectedOption!='program'">{{ item.problem_id }}</p>
        <p v-if="selectedOption!='program'">{{ item.problem_type }}</p>
        <p v-if="selectedOption!='program'" class="title" @click="switchToShowPage(item)">{{ item.problem_id }}</p>
        <p v-if="selectedOption!='program'">{{ item.contributor_id }}</p>
        <p v-if="selectedOption!='program'">{{ item.submission_count }}</p>
        <p v-if="selectedOption!='program'">{{ item.correct_count }}</p>

        <p v-if="selectedOption=='program'">{{ item.problem_id }}</p>
        <p v-if="selectedOption=='program'">{{ item.problem_type }}</p>
        <p v-if="selectedOption=='program'" class="title" @click="switchToShowPage(item)">{{ item.title }}</p>
        <p v-if="selectedOption=='program'">{{ item.author }}</p>
        <p v-if="selectedOption=='program'">{{ item.submit_count }}</p>
        <p v-if="selectedOption=='program'">{{ item.AC_count }}</p>
      </div>
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
  <div class="problemList-list-body-phone" v-if="isMobile">
    <h1>{{Title}}</h1>
    <div class="radio-group">
      <label style="user-select: none;" v-for="option in sujectOptions" :key="option.value" class="radio-option">
        <input
        type="radio"
        :value="option.value"
        v-model="selectedOption"
        @change="fetchData"
        name="options"
      />
      {{ option.text }}
      </label>
    </div>
    <div class="switch-page-div">
      <label for="select" style="text-wrap: nowrap;">每頁資料筆數：</label>
      <select id="select" v-model="itemPerPage" @change="fetchData">
        <option  v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="problemList-list">
      <div class="problemList-item">
        <h3>題號</h3>
        <h3>題型</h3>
        <h3>標題</h3>
        <h3>作者</h3>
      </div>
      <div class="problemList-item" v-for="item in items" :key="item.id">
        <p>{{ item.problem_id }}</p>
        <p>{{ item.problem_type }}</p>
        <p class="title" @click="switchToShowPage(item)">{{ item.title }}</p>
        <p>{{ item.author }}</p>
      </div>
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
  </div>
  <div v-if="!isLogIn" class="no-data">
    <h3>請登入查看資料</h3>
  </div>
</template>
  
  <script>
  export default {
    name: 'ProblemManagementListBody',
    data(){
      return {
        items:[],
        itemsWithType:[],
        page:1,
        inputPage:1,
        itemPerPage:20,
        options: [
          { value: 10, text: '10' },
          { value: 20, text: '20' },
          { value: 30, text: '30' },
          { value: 50, text: '50' },
          { value: 100, text: '100' },
        ],
        sujectOptions: [
          { value: 'program', text: '程式' },
          { value: 'math', text: '數學' },
          { value: 'science', text: '自然' },
        ],
        requestBody: {
          'request_page': 1,
          'request_count': 10 
        },
        selectedOption: 'program',
        isMobile:false,
      }
    },
    props: {
      Title:{
        type:String,
        default:'Title',
      }
    },
    computed:{
      itemsOnPage(){
        const res_item = [];
        for(let i=0;this.itemPerPage;i++){
          if(this.itemsWithType[i]==undefined) break;
          if(this.itemsWithType[i].type==this.selectedOption || this.selectedOption=='all'){
            res_item.push(this.itemsWithType[i]);
          }
        }
        if(res_item[0] == undefined) return {};
        return res_item;
      },
    },
    methods:{
      async fetchData() {
        try {
          const queryParams = new URLSearchParams({
            request_page: this.page,
            request_count: this.itemPerPage,
          }).toString();
          const request_type = this.selectedOption;
          const token=this.access_token;
          const response = await fetch(`http://127.0.0.1:60000/teacher-platform/${request_type}-problem-info-list/?${queryParams}`, {
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
          this.items = result.problem_list; // 將獲取的問題列表存儲到 itemsWithType
        } catch (error) {
          console.error('發送請求時出錯：', error);
        }
      },
      updateItems(){
        this.fetchData();
      },
      getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      },
      applyInput(){
        this.page=this.inputPage;
        this.updateItems();
      },
      nextPage(){
        if(this.items.length>0){
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
      },
      switchToShowPage(item){
        if(this.selectedOption=='program'){
          this.$router.push({ name: 'ProgramProblemShow', params: { id:item.problem_id} ,query:{suject:this.selectedOption}});
        }
        else if(this.selectedOption=='math'){
          this.$router.push({ name: 'MathProblemShow', params: { id: item.problem_id} ,query:{suject:this.selectedOption}});
        }
        else if(this.selectedOption=='science'){
          this.$router.push({ name: 'NaturalProblemShow', params: { id: item.problem_id},query:{suject:this.selectedOption}});
        }
      },
      checkScreenSize() {
      // 根據螢幕寬度設定條件 (例如寬度小於 768px 視為手機裝置)
        this.isMobile = window.innerWidth <= 1050;
      }
    },
    inject:['access_token','isLogIn'],
    mounted() {
      
      if (this.items.length === 0) {
        this.fetchData();
      }
      this.checkScreenSize();
      window.addEventListener('resize', this.checkScreenSize);
    },
    beforeUnmount() {
    // 移除事件監聽
    window.removeEventListener('resize', this.checkScreenSize);
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
  .problemList-list-main{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80% !important;
  }
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
  .problemList-list-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .problemList-list-body-phone {
    display: none;
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
  .problemList-list {
    display: flex;
    flex-direction: column;
    width: 85%;
    padding: 10px;
  }
  .problemList-item {
    display: grid;
    grid-template-columns: 2fr 2fr 6fr 4fr 2fr 2fr;
    min-height: 40px;
    border-bottom: 1px solid rgb(175, 175, 175);
    align-items: center;
  }
  .title{
    padding: 8px;
    margin: 3px;
    border-radius: 10px;
  }
  .title:hover{
    background-color: rgba(149, 196, 211, 0.7);
    color: white;
  }
  label{
    font-weight: bold;
  }
  @media (max-width: 1050px){
    .problemList-list-main{
      width: 100% !important;
    }
    .problemList-list-body-phone{
      display: flex;
    }
    .problemList-list-body{
      display: none;
    }
    .problemList-item {
    display: grid;
    grid-template-columns: 2fr 2fr 6fr 3fr;
    min-height: 40px;
    border-bottom: 1px solid rgb(175, 175, 175);
    align-items: center;
    }
    h3{
      font-size: medium;
    }
    
  }
  </style>
  