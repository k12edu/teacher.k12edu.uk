<template>
    <div class="problem-list-body">
      <h1>{{Title}}</h1>
      <div class="problem-list">
        <div class="problem-item" v-for="item in items" :key="item.id"><p>{{ item.title }}</p></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProblemListBody',
    data(){
      return {
        items:[],
      }
    },
    props: {
      Title:{
        type:String,
        default:'Title',
      }
    },
    methods:{
      generateItems() {
        const items = [];
        for (let i = 1; i <= 30; i++) {
          items.push({
            id: i,
            title: `Item ${i}`
          });
        }
        // 將生成的陣列轉換為 JSON 字串並回傳
        return items;
      }
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
  