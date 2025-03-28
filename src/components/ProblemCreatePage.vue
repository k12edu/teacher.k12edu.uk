<template>
    <div class="problem-edit-main">
      <div class="problem-edit-body">
        <div class="edit-div">
          <h3>題目名稱</h3>
          <div class="edit-item"> 
            <input class="title-input" type="text" v-model="title">
          </div>
        </div>
        <div class="edit-div">
          <h3>科目</h3>
          <div class="edit-item">
            <label style="user-select: none;" v-for="option in sujectOptions" :key="option.value" class="radio-option" @change="fetchCourses">
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
        <div class="edit-div" v-if="this.suject!='program'">
          <label for="dropdown">選擇課程：</label>
          <select id="dropdown" v-model="SelectCourse" @change="fetchModules">
            <option v-for="item in courses" :key="item.course_id" :value="item">
              {{ item.name }}
            </option>
          </select>
          <p>當前選擇: {{ SelectCourse ? SelectCourse.name : "無" }}</p>
          
          <label v-if="SelectCourse" for="multi-select">選擇單元：</label>
          <CheckboxMultiSelect v-if="SelectCourse" v-model="SelectModule" :items="modules" />
          <p v-if="SelectCourse">當前選擇: {{ SelectModule.map(item => item.name).join(", ") || "無" }}</p>

  </div>
        <div class="edit-div">
          <h3>題目敘述</h3>
          <div class="edit-item">
            <textarea name="" class="problem-describe" v-model="describe"></textarea>
          </div>
        </div>
        
        <div v-if="this.suject!='program'" style="width: 100%;">
          <div class="edit-div" >
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
        
        <div v-if="this.suject=='program'" style="width: 100%;" class="problem-edit-body">
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
        <button class="btn" @click="uploadProblem">上傳題目</button>
        <button class="btn" style="margin-top: 20px;" @click="uploadProblem2">暫存為草稿</button>
      </div>
    </div>

    <div class="container">
      <h1>題目生成工具</h1>
      <p>提供AI扮演的角色與情境，根據範例題目生成相似的題型。</p>
      <div class="form-group">
        <label>情境:</label>
        <textarea v-model="situation" type="text" class="input" style="width: 70%; height: 100px;"></textarea>
      </div>
      <div class="form-group">
        <label>範例題目:</label>
        <textarea v-model="shot" type="text" class="input" style="width: 70%; height: 100px;"></textarea>
      </div>
      <div class="form-group">
        <label>語言:</label>
        <select v-model="language" class="input">
          <option value="en-us">英文</option>
          <option value="zh-tw">繁體中文</option>
          <option value="zh-cn">簡體中文</option>
        </select>
      </div>
      <div class="form-group">
        <label>題目類型:</label>
        <select v-model="type" class="input" @change="resetgeneratedQuestion">
          <option value="單選題">單選題</option>
          <option value="多選題">多選題</option>
          <option value="是非題">是非題</option>
          <option value="填空題">填空題</option>
          <option value="簡答題">簡答題</option>
        </select>
      </div>
      <div class="form-group">
        <label>工具:</label>
        <label>
          <input type="checkbox" value="calculator" v-model="selectedTools" /> 計算機
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="radio" :value="false" v-model="is_rag" /> 知識庫搜尋
        </label>
      </div>
      <div class="form-group">
        <label>搜尋工具:</label>
        <div style="display: flex;  justify-content: center; flex-direction: row;">
          <label>
            <input type="checkbox" value="web_search" v-model="selectedSearchTool" /> 網頁搜尋
          </label>
          <label>
            <input type="checkbox" value="news_search" v-model="selectedSearchTool" /> 新聞搜尋
          </label>
          <label>
            <input type="checkbox" value="science_search" v-model="selectedSearchTool" /> 論文搜尋
          </label>
          <label>
            <input type="checkbox" value="social_search" v-model="selectedSearchTool" /> 社群搜尋
          </label>
        </div>
      </div>
      <button @click="generateQuestion" class="btn" style="margin-top: 20px;">生成題目</button>
    
      <div v-if="generatedQuestion && (type=='是非題' || type=='填空題' || type=='簡答題')" class="question-container">
        <h2>生成題目列表</h2>
        <div v-for="(item, index) in generatedQuestion" :key="index" class="question-item">
          <p><strong>問題</strong></p>
          {{ item }}
        </div>
      </div>

      <div v-else-if="generatedQuestion && (type=='單選題' || type=='多選題')" class="question-container">
        <h2>生成題目列表</h2>
        <div v-for="(item, index) in generatedQuestion" :key="index" class="question-item">
          <p><strong>問題</strong></p>
          <p>{{ item.question }}</p>
          <div class="options">
            <p><strong>選項</strong></p>
            <div v-for="(option, i) in item.options" :key="i" class="option-item">
              {{ option }}
            </div>
          </div>
        </div>
      </div>
    </div>    
    <div class="container">
      <h1>解答生成工具</h1>
      <p>提供AI扮演的角色與情境，根據提供的題目生成思路與解答。</p>
      <div class="form-group">
        <label>情境:</label>
        <textarea v-model="situation_answer" type="text" class="input" style="width: 70%; height: 100px;"></textarea>
      </div>
      <div class="form-group">
        <label>題目:</label>
        <textarea v-model="shot_answer" type="text" class="input" style="width: 70%; height: 100px;"></textarea>
      </div>
      <div class="form-group">
        <label>語言:</label>
        <select v-model="language_answer" class="input">
          <option value="en-us">英文</option>
          <option value="zh-tw">繁體中文</option>
          <option value="zh-cn">簡體中文</option>
        </select>
      </div>
      <div class="form-group">
        <label>題目類型:</label>
        <select v-model="type_answer" class="input" @change="resetgeneratedAnswer">
          <option value="單選題">單選題</option>
          <option value="多選題">多選題</option>
          <option value="是非題">是非題</option>
          <option value="填空題">填空題</option>
          <option value="簡答題">簡答題</option>
        </select>
      </div>
      <button @click="generateAnswer" class="btn" style="margin-top: 20px;">生成解答</button>
    
      <div v-if="generatedAnswer && (type_answer=='是非題' || type_answer=='填空題' || type_answer=='簡答題' || type_answer=='單選題')" class="question-container">
        <h2>生成結果</h2>
        <p><strong>思路</strong></p>
        {{ generatedAnswer.thinking }}
        <h3 v-if="generatedAnswer.correct==false"><strong style="color: red;">此問題的正確性可能有疑慮</strong></h3>
        <p v-if="generatedAnswer.answer"><strong>答案</strong></p>
        {{ generatedAnswer.answer }}
      </div>

      <div v-else-if="generatedAnswer && (type_answer=='多選題')" class="question-container">
        <h2>生成結果</h2>
        <p><strong>思路</strong></p>
        {{ generatedAnswer.thinking }}
        <p v-if="generatedAnswer.correct==false"><strong style="color: red; margin-top: 20px;">此問題的正確性可能有疑慮</strong></p>
        <div class="options">
          <p v-if="generatedAnswer.answer"><strong>答案</strong></p>
          <div v-for="(option, i) in generatedAnswer.answer" :key="i" class="option-item">
            {{ option }}
          </div>
        </div>
      </div>
    </div>    
    
</template>
  
  <script>
  import CheckboxMultiSelect from "./CheckboxMultiSelect.vue";
  export default {
    name: 'ProblemEditPage',
    components:{
      CheckboxMultiSelect
    },
    data(){
      return {
        situation: '',
        shot: '',
        language: 'zh-tw',
        type: '單選題',
        generatedQuestion: null,
        situation_answer: '',
        shot_answer: '',
        language_answer: 'zh-tw',
        type_answer: '單選題',
        generatedAnswer: null,
        selectedSearchTool:[],
        selectedSearchTool_answer:[],
        selectedTools:[],
        selectedTools_answer:[],
        is_rag:false,
        is_rag_answer:false,
        modules:[],
        courses:[],
        SelectModule:[],
        SelectCourse:null,
        publish_status:'',
        itemId:-1,
        title:'',
        suject:'program',
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
        testCaseInput:[],
        testCaseOutput:[],
      }
    },
    methods:{
      resetgeneratedQuestion(){
        this.generatedQuestion=null;
      },
      resetgeneratedAnswer(){
        this.generatedAnswer=null;
      },
      async generateQuestion() {
      const requestData = {
        situation: this.situation,
        shot: this.shot,
        language: this.language,
        type: this.type,
        tools: this.selectedTools,
        is_rag: this.is_rag!="false",
        search_tool:this.selectedSearchTool
      };
      
      try {
        const response = await fetch(`${this.api_url}/ai/generate_question/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate question');
        }
        
        const data = await response.json();
        this.generatedQuestion = data.generate_question;
        console.log(this.generatedQuestion);
      } catch (error) {
        console.error(error);
      }
    },
    async generateAnswer() {
      const requestData = {
        situation: this.situation_answer,
        shot: '',
        question: this.shot_answer,
        language: this.language_answer,
        type: this.type_answer,
      };
      
      try {
        const response = await fetch(`${this.api_url}/ai/generate_answer/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate answer');
        }
        
        const data = await response.json();
        this.generatedAnswer = data.generate_answer;
        console.log(this.generatedAnswer);
      } catch (error) {
        console.error(error);
      }
    },
      async fetchCourses() {
        try {
          let sj='';
          if(this.suject=='math'){
            sj='math';
          }
          else{
            sj='science';
          }
          const token=this.access_token;
          const response = await fetch(`${this.api_url}/k12/subject_courses/${sj}`, {
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
          this.courses=result;
          console.log('course:'+result);
        } catch (error) {
          console.error('發送請求時出錯：', error);
        }
      },
      async fetchModules() {
        try {
          let sj='';
          if(this.suject=='math'){
            sj='math';
          }
          else{
            sj='science';
          }
          let id=this.SelectCourse.course_id;
          const queryParams = new URLSearchParams({
            // request_page: this.page,
            // request_count: this.itemPerPage,
          }).toString();
          const token=this.access_token;
          const response = await fetch(`${this.api_url}/k12/course_modules/${sj}/${id}/?${queryParams}`, {
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
          this.modules=result;
          console.log('module:'+result);
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
      uploadProblem(){
        this.publish_status='publish';
        if(this.suject=='natural'){
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
        if(this.suject=='natural'){
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
          const moduleIds = this.SelectModule.map(item => item.module_id);
          
          const data={
            'problem_description':this.describe,
            'question_options':this.optionList,
            'answer':answer,
            'problem_type':this.problemType,
            'module_id':moduleIds,
          }
          const token=this.access_token;
          let keyword='problem';
          if(this.publish_status=='draft'){
            keyword='draft';
          }
          const response = await fetch(`${this.api_url}/teacher-platform/science-${keyword}-info-list/`, {
            method: 'POST',
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
          const moduleIds = this.SelectModule.map(item => item.module_id);
          const data={
            'problem_description':this.describe,
            'question_options':this.optionList,
            'answer':answer,
            'problem_type':this.problemType,
            'module_id':moduleIds,
          }
          const token=this.access_token;
          let keyword='problem';
          if(this.publish_status=='draft'){
            keyword='draft';
          }
          const response = await fetch(`${this.api_url}/teacher-platform/math-${keyword}-info-list/`, {
            method: 'POST', 
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
            method: 'POST',
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
    props: {},
    inject:['access_token','api_url'],
    mounted(){
      if(this.suject!='program') this.fetchCourses();
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
    width: 90%;
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
    align-items: center;
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
    height: 50vh;
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
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  max-width: 100%;
  width: 55%;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 8px;
  border-color: rgb(146, 198, 215);
  border-width: 3px;
  border-style: solid;
}

h1 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input {
  width: 50%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: block;
  width: 50%;
  padding: 10px;
  background: rgb(146, 198, 215);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background: rgb(119, 170, 187);
}

.question-container {
  margin: 50px 20px 10px 20px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
}

.question-item {
  background: rgb(153, 204, 223);
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.options {
  margin-top: 10px;
}

.option-item {
  background: white;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

  </style>
  
