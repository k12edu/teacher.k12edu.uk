<template>
    <div class="problem-edit-main">
      <div class="problem-edit-body" v-if="item">
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
        <div v-if="suject!='program'">
          <div class="edit-div">
            <h3>題目類型: {{ item.problem_type }}</h3>
          </div>
          <div class="edit-div">
            <div class="edit-item">
              <h3 style="margin-top: 16px;">選項</h3>
            </div>
            
            <div class="edit-item2">
              <div class="option-items">
              <p>{{ item.question_options }}</p>
              </div>
            </div>
          </div>
          
          <div class="edit-div">
            <h3>答案</h3>
            <div class="edit-item2">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>

        <div v-if="this.suject=='program'">
          <div class="edit-div">
            <div class="edit-item">
              <h3 style="margin-top: 16px;">標準輸入</h3>
            </div>
            <div contenteditable="false" class="edit-item" v-for="(item, index) in testCaseInput" :key="index">
              <p class="problem-describe">{{ testCaseInput[index] }}</p>
            </div>
          </div>

          <div class="edit-div">
            <h3>標準輸出</h3>
            <div contenteditable="false" class="edit-item"  v-for="(item, index) in testCaseOutput" :key="index">
              <p class="problem-describe">{{ testCaseOutput[index] }}</p>
            </div>
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
        item:undefined,
        showSuject:'none',
        showProblemType:'單選題',
        optionList:[],
        testCaseInput:[],
        testCaseOutput:[],
      }
    },
    methods:{
      async fetchData() {
        try {
          const queryParams = new URLSearchParams({
            request_id: this.$route.params.id,
          }).toString();
          const request_type = this.suject;
          const token=this.access_token;
          const response = await fetch(`http://127.0.0.1:60000/teacher-platform/${request_type}-problem-info-list/?${queryParams}`, {
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
          this.item = result.problem_list; // 將獲取的問題列表存儲到 itemsWithType
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
      changeData(){
        const mapForSuject = new Map([
        ['program','程式'],
        ['math','數學'],
        ['science','自然'],
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
    inject:['access_token'],
    mounted(){
      this.suject = this.$route.query.suject;
      if (this.item == undefined) {
        this.fetchData();
        this.getTestCaseData();
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
  