<template>
    <div id="choice-list">
      <img :src="require('@/assets/choice_list_icon.png')" alt="選單" class="choice-list-icon" @click="ChangeDropListDisplay">
      <DropDownList class="drop-down-list" :style="IsDropListDisplay" @ChangeDropListDisplay="ChangeDropListDisplay"></DropDownList>
    </div>
  </template>
  
  <script>
  import DropDownList from "./DropDownList.vue";
  export default {
    name: 'ChoiceList',
    components:{
      DropDownList
    },
    data(){
      return {
        DropListDisplay : false,
      }
    },
    props: {},
    computed:{
      IsDropListDisplay(){
        return {
          display : this.DropListDisplay ? 'block' : 'none',
        };
      }
    },
    methods:{
      ChangeDropListDisplay(){
        this.DropListDisplay = !this.DropListDisplay;
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #choice-list {
    position: absolute;
    top:20%;
    right:1%;
    height: 60%;
    width: auto;
  }
  .choice-list-icon{
    height: 100%;
    width: auto;
    opacity: 0.35;
  }

  </style>