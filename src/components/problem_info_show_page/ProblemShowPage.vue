<template>
  <div class="problem-edit-main">
    <div class="problem-edit-body" v-if="item">
      <div class="edit-div">
        <h3>題目編號: {{ item.problem_id }}</h3>
      </div>
      <div v-if="suject=='program'" class="edit-div">
        <h3>題目名稱: {{ item.title }}</h3>
      </div>
      <div class="edit-div">
        <h3>科目: {{ showSuject }}</h3>
      </div>
      <div v-if="suject=='program'" class="edit-div">
        <h3>標籤: {{ module_list }}</h3>
      </div>
      <div v-else class="edit-div">
        <h3>單元: {{ module_list }}</h3>
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
            <p>{{ item.answer.correct }}</p>
          </div>
        </div>
      </div>

      <div v-if="suject=='program'">
        <div class="edit-div">
          <div class="edit-item">
            <h3 style="margin-top: 16px;">標準輸入</h3>
          </div>
          <div contenteditable="false" class="edit-item" v-for="(item, index) in testCaseInput" :key="index">
            <textarea readonly v-model="testCaseInput[index]" class="problem-describe"></textarea>
          </div>
        </div>

        <div class="edit-div">
          <h3>標準輸出</h3>
          <div contenteditable="false" class="edit-item"  v-for="(item, index) in testCaseOutput" :key="index">
            <textarea readonly v-model="testCaseOutput[index]" class="problem-describe"></textarea>
          </div>
        </div>
        
      </div>
			<div v-if="isSuperAccount" class="edit-div">
				<button @click="deleteProblem">刪除題目</button>
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
      module_list:'',
      item:undefined,
      showSuject:'none',
      showProblemType:'單選題',
      optionList:[],
      testCaseInput:[],
      testCaseOutput:[],
    }
  },
  methods:{
    async deleteProblem() {
	// 確認是否真的要刪除題目
	if (!confirm("確定要刪除這個題目嗎？")) return;

	try {
		const token = this.access_token; // 獲取存儲在 localStorage 中的 token
		const request_type = this.suject; // 題目類型，根據 suject 決定（如 program、math 等）
		const queryParams = new URLSearchParams({
		request_id: this.$route.params.id, // 取得當前問題的 ID
		}).toString();

		// 發送 DELETE 請求
		const response = await fetch(`${this.api_url}/teacher-platform/${request_type}-problem-info-list/?${queryParams}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		});

		// 檢查是否刪除成功
		if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
		}

		// 顯示刪除成功的提示
		alert("題目刪除成功！");

		// 刪除成功後跳轉到選單頁面
		this.$router.push({ name: 'MainPage2' }); // 跳轉到 MainPage2

	} catch (error) {
		console.error('刪除題目時發生錯誤：', error);
		alert("刪除失敗，請稍後再試！");
	}
	},
    async fetchData() {
      try {
        const queryParams = new URLSearchParams({
          request_id: this.$route.params.id,
        }).toString();
        const request_type = this.suject;
        const token=this.access_token;
        const response = await fetch(`${this.api_url}/teacher-platform/${request_type}-problem-info-list/?${queryParams}`, {
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
        if(result.module_list) this.module_list=result.module_list.join(", ");
        if(result.tag_list) this.module_list=result.tag_list.join(", ");
        console.log('module: '+result.module_list);
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
        const response = await fetch(`${this.api_url}/teacher-platform/program-problem-test-data/?${queryParams}`, {
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
  inject:['access_token','api_url','isSuperAccount'],
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
