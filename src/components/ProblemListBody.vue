<template>
    <div class="problem-list-body">
      <h1>{{Title}}</h1>
      <div class="problem-list">
        <div class="problem-item" v-for="item in itemsOnPage" :key="item.id"><p>{{ item.title }}</p></div>
      </div>
      <div class="switch-page-div">
        <input type="number" name="" id="" v-model="inputPage">
        <button @click="applyInput" id="applyButton"><p>前往</p></button>
      </div>
      <p>{{ page }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProblemListBody',
    data(){
      return {
        items:[],
        page:1,
        inputPage:0,
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
        for(let i=this.page*20-20;i<this.page*20;i++){
          res_item.push(this.items[i]);
        }
        if(res_item[0] == undefined) return {};
        return res_item;
      },
    },
    methods:{
      generateItems() {
        const items = [];
        for (let i = 1; i <= 100; i++) {
          items.push({
            id: i,
            title: `Item ${i}`
          });
        }
        return items;
      },
      applyInput(){
        this.page=this.inputPage;
      },
      
    },
    mounted() {
      if (this.items.length === 0) {
        this.items = this.generateItems();
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield;      /* Chrome, Safari, Edge */
}
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
  .switch-page-div{
    display: flex;
  }
  #applyButton{
    height: 30px;
    display: flex;
    align-items: center;
  }
  .problem-list-body {
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
  .problem-list {
    width: 85%;
  }
  .problem-item {
    margin: 8px;
    border: 2px solid lightblue;
    border-radius :10px;
  }
  </style>
  