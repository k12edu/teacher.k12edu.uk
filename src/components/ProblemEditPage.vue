<template>
    <div class="problem-edit-main">
      <div class="problem-edit-body">
        <div class="edit-div">
          <h3>題目編號: {{ itemId }}</h3>
        </div>

        <div class="edit-div">
          <h3>題目名稱</h3>
          <div class="edit-item"> 
            <input class="title-input" type="text" v-model="title">
          </div>
        </div>
        <div class="edit-div">
          <h3>科目</h3>
          <div class="edit-item">
            <label style="user-select: none;" v-for="option in sujectOptions" :key="option.value" class="radio-option">
            <input
            type="radio"
            :value="option.value"
            v-model="suject"
            name="options"
            />
            {{ option.text }}
            </label>
          </div>
        </div>
        
        <div class="edit-div">
          <h3>題目敘述</h3>
          <div class="edit-item">
            <textarea name="" class="problem-describe" v-model="describe"></textarea>
          </div>
        </div>
        
        <div class="edit-div">
          <h3>題目類型</h3>
          <div class="edit-item">
            <label style="user-select: none;" v-for="option in problemTypeOptions" :key="option.value" class="radio-option">
            <input
            type="radio"
            :value="option.value"
            v-model="problemType"
            name="problemTypeOptions"
            />
            {{ option.text }}
            </label>
          </div>
        </div>
        
        <div class="edit-div">
          <div class="edit-item">
            <h3 style="margin-top: 16px;">選項</h3>
            <button @click="addAnswerOption" style="margin-left: 10px"> <h3 style="margin: 0;">+</h3></button>
          </div>
          
          <div class="edit-item2">
            <div v-for="(item,idx) in optionList" :key="idx" class="option-items">
             <input type="text" v-model="item.optionName">
             <button style="margin-left: 10px; width: 30px; height: 30px;" @click="removeAnswerOption(idx)"><h3 style="margin: 0;">-</h3></button>
            </div>
          </div>
        </div>
        
        <div class="edit-div">
          <h3>答案</h3>
          <div class="edit-item2" v-if="problemType=='single'">
            <label v-for="(item,idx) in optionList" :key="idx" class="option-items">
            <input 
              type="radio" 
              :value="item.optionName+'_'+idx" 
              v-model="answerForSingle" 
            />
            {{ item.optionName }}
            </label>
          </div>
          <div class="edit-item2" v-if="problemType=='multiple'">
            <label v-for="(item,idx) in optionList" :key="idx" class="option-items">
            <input 
              type="checkbox" 
              :value="item.optionName+'_'+idx" 
              v-model="answerForMutiple" 
            />
            {{ item.optionName }}
            </label>
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
        itemId:-1,
        title:'',
        suject:'none',
        sujectOptions: [
          { value: 'program', text: '程式' },
          { value: 'math', text: '數學' },
          { value: 'natural', text: '自然' },
        ],
        problemTypeOptions:[
          { value: 'single', text: '單選題' },
          { value: 'multiple', text: '多選題' },
        ],
        problemType:'single',
        describe:'',
        optionList:[],
        answerForSingle:'',
        answerForMutiple:[],
      }
    },
    methods:{
      addAnswerOption(){
        this.optionList.push({optionName:'新選項 '+String(this.optionList.length+1)});
      },
      removeAnswerOption(idx){
        this.optionList.splice(idx,1);
        
      }

    },
    computed:{
      
    },
    props: {},
    inject:[],
    mounted(){
      console.log(this.$route.params);
      this.itemId = this.$route.params.id;
      this.title = this.$route.query.title;
      this.suject = this.$route.query.suject;
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
  