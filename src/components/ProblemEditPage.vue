<template>
    <div class="problem-edit-main">
      <div class="problem-edit-body">
        <h3>題目編號: {{ itemId }}</h3>

        <h3>題目名稱</h3>
        <div class="edit-item"> 
          <input type="text" v-model="title">
        </div>

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
        
        <h3>題目敘述</h3>
        <div class="edit-item">
          <textarea name="" class="problem-describe" v-model="describe"></textarea>
        </div>

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

        <h3>選項</h3>
        <div class="edit-item2">
          <div v-for="(item,idx) in optionList" :key="idx">
            <input type="text" v-model="item.optionName">
          </div>
        </div>
        <button @click="addAnswerOption" style="margin-top: 20px"> <h3 style="margin: 0;">+</h3></button>
        <h3>答案</h3>
        <div class="edit-item2" v-if="problemType=='single'">
          <label v-for="(item,idx) in optionList" :key="idx">
          <input 
            type="radio" 
            :value="item.optionName+'_'+idx" 
            v-model="answerForSingle" 
          />
          {{ item.optionName }}
          </label>
        </div>
        <div class="edit-item2" v-if="problemType=='multiple'">
          <label v-for="(item,idx) in optionList" :key="idx">
          <input 
            type="checkbox" 
            :value="item.optionName" 
            v-model="answerForMutiple" 
          />
          {{ item.optionName }}
          </label>
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
        answerForSingle:'TWT',
        answerForMutiple:[],
      }
    },
    methods:{
      addAnswerOption(){
        this.optionList.push({optionName:'新選項 '+String(this.optionList.length+1)})
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
  </style>
  