<template>
  <div class="problem-edit-main">
    <div class="problem-edit-body">
      <div class="edit-div">
        <h3>題目編號 {{id}}</h3>
        <h3>題目名稱</h3>
        <div class="edit-item"> 
          <input class="title-input" type="text" v-model="title">
        </div>
        <h3>題目狀態 {{ publish_status }}</h3>
      </div>
      <div class="edit-div">
        <h3>科目 {{showSuject}}</h3>
      </div>

      <div class="edit-div">
        <h3>題目敘述</h3>
        <div class="edit-item">
          <textarea name="" class="problem-describe" v-model="describe"></textarea>
        </div>
      </div>
      
      <div v-if="this.suject!='program'" style="width: 100%;">
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
            <h3 style="margin-top: 16px;">選項(最多五項)</h3>
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
      
      <div v-if="this.suject=='program'" style="width: 100%;">
        <div class="edit-div">
          <div class="edit-item">
            <h3 style="margin-top: 16px;">標準輸入</h3>
            <button @click="addAnswerOption" style="margin-left: 10px"> <h3 style="margin: 0;">+</h3></button>
          </div>
          <div class="edit-item" v-for="(item, index) in testCaseInput" :key="index">
            <textarea v-model="testCaseInput[index]" class="problem-describe"></textarea>
          </div>
        </div>

        <div class="edit-div">
          <h3>標準輸出</h3>
          <div class="edit-item"  v-for="(item, index) in testCaseOutput" :key="index">
            <textarea  v-model="testCaseOutput[index]" class="problem-describe"></textarea>
            <button style="margin-left: 10px; width: 30px; height: 30px;" @click="removeTestcase(index)"><h3 style="margin: 0;">-</h3></button>
          </div>
        </div>
      </div>
      <button @click="uploadProblem">上傳題目</button>
      <button style="margin-top: 20px;" @click="uploadProblem2">暫存為草稿</button>
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
      showSuject:'',
      suject:'program',
      publish_status:'',
      itemId:-1,
      title:'',
      problemTypeOptions:[
        { value: 'single', text: '單選題' },
        { value: 'multiple', text: '多選題' },
      ],
      problemType:'single',
      describe:'',
      optionList:[],
      answerForSingle:'',
      answerForMutiple:[],
      testCaseInput:[],
      testCaseOutput:[],
      testCaseDataArray:[]
    }
  },
  methods:{
    changeData(){
      if(this.suject=='program'){
        this.title=this.item.title;
        this.describe=this.item.problem_description;
        this.getTestCaseData();
      }
      else{
        this.title=this.item.title;
        this.describe=this.item.problem_description;
        this.problemType=this.item.problem_type;
        let obj,ans_obj;
        if(typeof this.item.question_options === 'object'){
          obj = this.item.question_options;
          ans_obj = this.item.answer;
        }
        else{
          obj = JSON.parse(this.item.question_options);
          ans_obj = JSON.parse(this.item.answer);
        }
        let l=Object.keys(obj).length;
        for(let i=0;i<l;i++){
          this.optionList.push({optionName:obj[String.fromCharCode('A'.charCodeAt(0) + (i % 26))]});
        }
        if(this.problemType=='single'){
          this.answerForSingle=obj[ans_obj[0]]+'_'+(ans_obj[0].charCodeAt(0)-'A'.charCodeAt(0)).toString();
        }
        else{
          let new_arr=[]
          for(let i=0;i<ans_obj.length;i++){
            new_arr.push(obj[ans_obj[i]]+'_'+(ans_obj[i].charCodeAt(0)-'A'.charCodeAt(0)).toString());
          }
          this.answerForMutiple=new_arr;
          console.log(this.answerForMutiple);
        }
      }
    },
    async fetchData() {
        try {
          const queryParams = new URLSearchParams({
            request_id: this.$route.params.id,
          }).toString();
          const request_type = this.suject;
          const token=this.access_token;
          let keyword='problem';
          if(this.publish_status=='draft'){
            keyword='draft';
          }
          const response = await fetch(`http://127.0.0.1:60000/teacher-platform/${request_type}-${keyword}-info-list/?${queryParams}`, {
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
          this.item = result.problem_list; 
          this.changeData();
        } catch (error) {
          console.error('發送請求時出錯：', error);
        }
      },
      async getTestCaseData() {
        try {
          const queryParams = new URLSearchParams({
            request_id: this.$route.params.id,
          }).toString();
          const token=this.access_token;
          const response = await fetch(`http://127.0.0.1:60000/teacher-platform/program-problem-test-data/?${queryParams}`, {
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
          this.testCaseDataArray = result['data_list']; 
          for(let i=0;i<this.testCaseDataArray.length;i++){
          this.testCaseInput.push(this.testCaseDataArray[i]['stand_input']);
          this.testCaseOutput.push(this.testCaseDataArray[i]['stand_output']);
        }
        } catch (error) {
          console.error('發送請求時出錯：', error);
        }
      },
    addAnswerOption(){
      if(this.suject!='program' && this.optionList.length<5){
        this.optionList.push({optionName:'新選項 '+String(this.optionList.length+1)});
      }
      else{
        this.testCaseInput.push("新標準輸入");
        this.testCaseOutput.push("新標準輸出");
      }
    },
    removeTestcase(idx){
      this.testCaseInput.splice(idx,1);
      this.testCaseOutput.splice(idx,1);
    },
    removeAnswerOption(idx){
      this.optionList.splice(idx,1);
    },
    loadProblemData(){
      
    },
    uploadProblem(){
      console.log(this.suject);
      this.publish_status='publish';
      if(this.suject=='science'){
        this.uploadNaturalData();
      }
      else if(this.suject=='math'){
        this.uploadMathData();
      }
      else{
        this.uploadProgramData();
      }
      this.$router.push({ name: 'MainPage' });
    },
    uploadProblem2(){
      this.publish_status='draft';
      if(this.suject=='science'){
        this.uploadNaturalData();
      }
      else if(this.suject=='math'){
        this.uploadMathData();
      }
      else{
        this.uploadProgramData();
      }
      this.$router.push({ name: 'MainPage' });
    },
    async uploadNaturalData() {
      try {
        let answer="";
        if(this.problemType=='single'){
          answer=this.answerForSingle;
        }
        else{
          answer=this.answerForMutiple;
        }
        const data={
          'id':this.id,
          'problem_description':this.describe,
          'question_options':this.optionList,
          'answer':answer,
          'problem_type':this.problemType,
        }
        const token=this.access_token;
        let keyword='problem';
        if(this.publish_status=='draft'){
          keyword='draft';
        }
        const response = await fetch(`${this.api_url}/teacher-platform/science-${keyword}-info-list/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }, 
          body: JSON.stringify(data) 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('發送請求時出錯：', error);
      }
    },
    async uploadMathData() {
      try {
        let answer="";
        if(this.problemType=='single'){
          answer=this.answerForSingle;
        }
        else{
          answer=this.answerForMutiple;
        }
        const data={
          'id':this.id,
          'problem_description':this.describe,
          'question_options':this.optionList,
          'answer':answer,
          'problem_type':this.problemType,
        }
        const token=this.access_token;
        let keyword='problem';
        if(this.publish_status=='draft'){
          keyword='draft';
        }
        const response = await fetch(`${this.api_url}/teacher-platform/math-${keyword}-info-list/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }, 
          body: JSON.stringify(data) 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('發送請求時出錯：', error);
      }
    },
    async uploadProgramData() {
      try {
        const data={
          'id':this.id,
          'problem_description':this.describe,
          'title':this.title,
          'testcase_input':this.testCaseInput,
          'testcase_output':this.testCaseOutput,
        }
        const token=this.access_token;
        let keyword='problem';
        if(this.publish_status=='draft'){
          keyword='draft';
        }
        const response = await fetch(`${this.api_url}/teacher-platform/program-${keyword}-info-list/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }, 
          body: JSON.stringify(data) 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('發送請求時出錯：', error);
      }
    },
  },
  computed:{
    
  },
  props: ['id'],
  inject:['access_token','api_url'],
  mounted(){
    const mapForSuject = new Map([
      ['program','程式'],
      ['math','數學'],
      ['science','自然'],
    ]);
    this.publish_status=this.$route.query.publish_status;
    this.suject=this.$route.query.suject;
    this.showSuject=mapForSuject.get(this.suject);
    if (this.item == undefined) {
      this.fetchData();
    }
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
  width: 100%;
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
