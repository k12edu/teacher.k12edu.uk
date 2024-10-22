<template>
    <div class="problem-edit-main">
      <div class="problem-edit-body">
        <div class="edit-div">
          <h3>題目編號: {{ item.problem_id }}</h3>
        </div>
        <div class="edit-div">
          <h3>題目名稱: {{ item.title }}</h3>
        </div>
        <div class="edit-div">
          <h3>科目: {{ showSuject }}</h3>
        </div>
        
        <div class="edit-div">
          <h3>題目敘述</h3>
          <div class="edit-item">
            <p>{{item.problem_description}}</p>
          </div>
        </div>
        
        <div class="edit-div">
          <h3>題目類型: {{ showProblemType }}</h3>
        </div>
        <div class="edit-div">
          <div class="edit-item">
            <h3 style="margin-top: 16px;">選項</h3>
          </div>
          
          <div class="edit-item2">
            <div v-for="(item,idx) in optionList" :key="idx" class="option-items">
             <p>{{ item.optionName }}</p>
            </div>
          </div>
        </div>
        
        <div class="edit-div">
          <h3>答案</h3>
          <div class="edit-item2" v-if="problemType=='single'">
            <p>{{ item.answer }}</p>
          </div>
          <div class="edit-item2" v-if="problemType=='multiple'">
            <p>{{ item.answer }}</p>
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
        item:'',
        showSuject:'none',
        showProblemType:'單選題',
        optionList:[],
      }
    },
    methods:{
      changeData(){
        const mapForSuject = new Map([
        ['program','程式'],
        ['math','數學'],
        ['natural','自然'],
        ]);
        const mapForProblemType = new Map([
          ['single','單選題'],
          ['multiple','多選題'],
        ])
        this.showSuject=mapForSuject.get(this.suject);
        this.showProblemType=mapForProblemType.get(this.item.problem_type);
      }
    },
    computed:{
    },
    props: {},
    inject:[],
    mounted(){
      this.item = this.$route.query.item;
      this.suject = this.$route.query.suject;
      this.changeData();
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
  