<template>
    <div class="problem-edit-page">
      <p>hi</p>
      {{ itemId }}
    </div>
</template>
  
  <script>
  
  export default {
    name: 'ProblemEditPage',
    components:{
      
    },
    data(){
      return {
        itemId:-1,
      }
    },
    computed:{
      
    },
    props: {},
    inject:[],
    mounted(){
      this.itemId = this.$route.params.id;
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .problem-edit-page{
    height: 100%;
    background-color: red;
  }
  
  </style>
  