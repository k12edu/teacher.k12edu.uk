<template>
    <div class="problemManagement-list-main">
      <div class="problemManagement-list-body">
      <h1>{{Title}}</h1>
      <div class="radio-group">
        <label style="user-select: none;" v-for="option in sujectOptions" :key="option.value" class="radio-option">
          <input
          type="radio"
          :value="option.value"
          v-model="selectedOption"
          @change="updateItems"
          name="options"
        />
        {{ option.text }}
        </label>
      </div>
      <div class="switch-page-div" v-if="!isMobile">
        <label for="select" style="text-wrap: nowrap;">每頁資料筆數：</label>
        <select id="select" v-model="itemPerPage" >
          <option  v-for="option in options" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="problemManagement-list">
        <div class="problemManagement-item">
          <h3>科目</h3>
          <h3>題號</h3>
          <h3>標題</h3>
          <h3>作者</h3>
          <h3>狀態</h3>
          <h3>上傳時間</h3>
          <h3>最後編輯</h3>
        </div>
        <div class="problemManagement-item" v-for="item in itemsOnPage" :key="item.id">
          <p>{{ item.chineseType }}</p>
          <p>{{ item.id }}</p>
          <p class="title" @click="switchToEditPage(item)">{{ item.title }}</p>
          <p>{{ item.author }}</p>
          <p>{{ item.state }}</p>
          <p>{{ item.createDate }}</p>
          <p>{{ item.lastEditDate }}</p>
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
    <div class="problemManagement-list-body-phone" v-if="isMobile">
      <h1>{{Title}}</h1>
      <div class="radio-group">
        <label style="user-select: none;" v-for="option in sujectOptions" :key="option.value" class="radio-option">
          <input
          type="radio"
          :value="option.value"
          v-model="selectedOption"
          @change="updateItems"
          name="options"
        />
        {{ option.text }}
        </label>
      </div>
      <div class="switch-page-div">
        <label for="select" style="text-wrap: nowrap;">每頁資料筆數：</label>
        <select id="select" v-model="itemPerPage" >
          <option  v-for="option in options" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="problemManagement-list">
        <div class="problemManagement-item">
          <h3>科目</h3>
          <h3>題號</h3>
          <h3>標題</h3>
          <h3>狀態</h3>
        </div>
        <div class="problemManagement-item" v-for="item in itemsOnPage" :key="item.id">
          <p>{{ item.chineseType }}</p>
          <p>{{ item.id }}</p>
          <p class="title" @click="switchToEditPage(item)">{{ item.title }}</p>
          <p>{{ item.state }}</p>
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
  </template>
  
  <script>
  export default {
    name: 'AnnouncementListBody',
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
          { value: 'all', text: '全部顯示' },
          { value: 'program', text: '程式' },
          { value: 'math', text: '數學' },
          { value: 'natural', text: '自然' },
        ],
        selectedOption: 'all',
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
        for(let i=this.page*this.itemPerPage-this.itemPerPage;i<this.page*this.itemPerPage;i++){
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
      updateItems(){
        const res_item = [];
        for(let i=0;i<this.items.length;i++){
          if(this.items[i]==undefined) break;
          if(this.items[i].type==this.selectedOption || this.selectedOption=='all'){
            res_item.push(this.items[i]);
          }
        }
        this.itemsWithType=res_item;
        this.page=1;
      },
      getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      },
      generateItems() {
        const items = [];
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份從0開始，所以需要加1
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        for (let i = 1; i <= 10000; i++) {
          const idx=this.getRandomInt(0,3);
          const sujectArray=["program","math","natural"];
          const ChinesesujectArray=["程式","數學","自然"];
          items.push({
            id: i,
            title: `Title ${i}`,
            author: `Author ${i}`,
            lastEditDate: dateString,
            createDate: dateString,
            state:'編輯中',
            type: sujectArray[idx],
            chineseType: ChinesesujectArray[idx],
          });
        }
        return items;
      },
      applyInput(){
        this.page=this.inputPage;
        if(this.page<=0)
        {
          this.page=1;
          this.inputPage=this.page;
        }
        else if(this.page>Math.ceil(this.itemsWithType.length/this.itemPerPage))
        {
          this.page=Math.ceil(this.itemsWithType.length/this.itemPerPage);
          this.inputPage=this.page;
        }
      },
      nextPage(){
        if(this.page<Math.ceil(this.itemsWithType.length/this.itemPerPage))
        {
          this.page+=1;
          this.inputPage=this.page;
        }
      },
      previousPage(){
        if(this.page>1)
        {
          this.page-=1;
          this.inputPage=this.page;
        }
      },
      toFirstPage(){
        this.inputPage=1;
        this.applyInput();
      },
      toLastPage(){
        this.inputPage=Math.ceil(this.itemsWithType.length/this.itemPerPage);
        this.applyInput();
      },
      switchToEditPage(item){
        if(item.type=='program'){
          this.$router.push({ name: 'ProgramProblemEdit', params: { id:item.id} ,query:{title:item.title,suject:item.type}});
        }
        else if(item.type=='math'){
          this.$router.push({ name: 'MathProblemEdit', params: { id: item.id} ,query:{title:item.title,suject:item.type}});
        }
        else if(item.type=='natural'){
          this.$router.push({ name: 'NaturalProblemEdit', params: { id: item.id},query:{title:item.title,suject:item.type} });
        }
      },
      checkScreenSize() {
      // 根據螢幕寬度設定條件 (例如寬度小於 768px 視為手機裝置)
        this.isMobile = window.innerWidth <= 1050;
      }
    },
    mounted() {
      if (this.items.length === 0) {
        this.items = this.generateItems();
        this.updateItems();
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
  .problemManagement-list-main{
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
  .problemManagement-list-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .problemManagement-list-body-phone {
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
  .problemManagement-list {
    display: flex;
    flex-direction: column;
    width: 85%;
    padding: 10px;
  }
  .problemManagement-item {
    display: grid;
    grid-template-columns: 2fr 2fr 6fr 4fr 3fr 4fr 4fr;
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
    .problemManagement-list-main{
      width: 100% !important;
    }
    .problemManagement-list-body-phone{
      display: flex;
    }
    .problemManagement-list-body{
      display: none;
    }
    .problemManagement-item {
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
  