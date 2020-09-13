<template>
  <div class="create-wrapper">
    <div class="job-create-wrapper">
      <div class="job-create-area">
        <label for="name" class="label">開発言語</label><label for="name" class="label-required"> *</label>
        <label v-if="selectedLangErrors.length" class="error-label">
          <p v-for="selectedLangError in selectedLangErrors" :key="selectedLangError" class="error-message">
            {{ selectedLangError }}</p>
        </label>
        <v-select
          class="input-area"
          multiple
          :options="languages"
          label="programingLanguageName"
          v-model="selectedLang"
          :reduce="languages => languages.id"
        />
        <!-- <h1>Selected 言語:{{ selectedLang }}</h1> -->
      </div>
      <div class="job-create-area">
        <label for="name" class="label">開発フレームワーク</label><label for="name" class="label-required"> *</label>
        <label v-if="selectedFramworkErrors.length" class="error-label">
          <p v-for="selectedFramworkError in selectedFramworkErrors" :key="selectedFramworkError" class="error-message">
            {{ selectedFramworkError }}</p>
        </label>
        <v-select
            class="input-area"
            multiple
            :options="framworks"
            label="programingFrameworkName"
            v-model="selectedFramwork"
            :reduce="framworks => framworks.id"
        />
        <!-- <h1>Selected フレームワーク: {{ selectedFramwork }}</h1> -->
      </div>
      <div class="job-create-area">
        <label for="name" class="label">その他技術</label><label for="name" class="label-required"> *</label>
        <label v-if="selectedSkillErrors.length" class="error-label">
          <p v-for="selectedSkillError in selectedSkillErrors" :key="selectedSkillError" class="error-message">
            {{ selectedSkillError }}</p>
        </label>
        <v-select
            class="input-area"
            multiple
            :options="skills"
            label="skillName"
            v-model="selectedSkill"
            :reduce="skills => skills.id"
        />
        <!-- <h1>Selected フレームワーク: {{ selectedFramwork }}</h1> -->
      </div>
      <div class="job-create-area">
        <label for="name" class="label">募集人数</label><label for="name" class="label-required"> *</label>
        <!-- <label v-if="recruitNumberErrors.length" class="error-label">
          <p v-for="recruitNumberError in recruitNumberErrors" :key="recruitNumberError" class="error-message">
            {{ recruitNumberError }}</p>
        </label> -->
        <div class="job-create-radio">
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="0">未定</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="1">1人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="2">2人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="3">3人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="4">4人</label>
        <!-- <p>{{ recruitNumber }}</p> -->
      </div>
      </div>
      <!-- <select v-model="selectedCommunication" class="">
        <option disabled value="" class="">コミュニケーションツール</option>
        <option v-for="communication in communicationToolId" v-bind:value="communication.id" v-bind:key="communication.id">
          {{ communication.name }}
        </option>
      </select>
      <span>コミュニケーションツール: {{ selectedCommunication }}</span> -->

        <!-- <select v-model="selectedPosition" class="position" multiple>
          <option disabled value="" class="position">担当</option>
          <option v-for="position in positions " v-bind:value="{ id:position.id }" v-bind:key="position.id">
            {{ position.positionTagName }}
          </option>
        </select>
        <h1>Selected ポジション:{{ selectedPosition }}</h1> -->

        <!-- <select v-model="selectedFramwork" class="position" multiple>
          <option disabled value="" class="position">フレームワーク</option>
          <option v-for="framwork in framworks" v-bind:value="{ id: framwork.id }" v-bind:key="framwork.id">
            {{ framwork.programingFrameworkName }}
          </option>
        </select>
        <h1>Selected フレームワーク: {{ selectedFramwork }}</h1>

        <select v-model="selectedSkill" class="position" multiple>
          <option disabled value="" class="position">その他技術</option>
          <option v-for="skill in skills" v-bind:value="{id: skill.id}" v-bind:key="skill.id">
            {{ skill.skillName }}
          </option>
        </select>
        <h1>Selected その他スキル: {{ selectedSkill }}</h1>
      <br><br> -->
      <div class="button-are">
        <button @click="createJob" class="post-job-btn">案件投稿する</button>
        <router-link to='/jobcreate' class="post-job-back">
          戻る 1/2
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
export default {
  data() {
    return {
      selectedLang: [], //? プログラミング言語
      languages: [],
      selectedFramwork: [], //? フレームワーク
      framworks: [],
      selectedPosition: [], //? 開発ポジション
      // positionTag: [], //? 開発ポジション
      // positions: [],
      selectedSkill: [], //? その他開発スキル
      skills: [],
      selectedCommunication: 0, //? コミュニケーションツール
      communicationToolId: [
        { id: 1, name: 'Slack'},
        { id: 2, name: 'Skype' },
        { id: 3, name: 'ChatWork' }
      ],
      recruitNumber: 0,
      selectedLangErrors: [],
      selectedFramworkErrors: [],
      selectedSkillErrors: [],
      // recruitNumberErrors: []
    }
  },
  mounted() {
    // *開発言語
    axios.get(`${this.$baseURL}/programing_language`)
      .then(response => {
          this.loading = false;
          // const array = [];
          this.languages = response.data
      })
    // * フレームワーク
    axios.get(`${this.$baseURL}/programing_framework`)
      .then(response => {
          this.framworks = response.data
          // console.log(this.framworks)
      })
    // // * 開発ポジション
    // axios.get(`${this.$baseURL}/position_tag`)
    //   .then(response => {
    //       this.positions = response.data
    //       // console.log(this.positions)
    //   })
    // * その他スキル
    axios.get(`${this.$baseURL}/skill`)
      .then(response => {
          this.skills = response.data
          // console.log(this.skills)
      })
  },
  methods: {
    // * 案件投稿
    createJob(error) {
      //* エラーメッセージ
      if(this.selectedLang.length == 0 || this.selectedFramwork.length == 0 || this.selectedSkill.length == 0) {
        console.log('入力必須項目を入力してください')
        this.selectedLangErrors = [];
        this.selectedFramworkErrors = [];
        this.selectedSkillErrors = [];
        // this.recruitNumberErrors = [];
        if(this.selectedLang.length == 0){
          this.selectedLangErrors.push("開発言語を選択してください");
          this.selectedLang = [];
        } 
        if(this.selectedFramwork.length == 0){
          this.selectedFramworkErrors.push("開発フレームワークを選択してください");
          this.selectedFramwork = [];
        } 
        if(this.selectedSkill.length == 0){
          this.selectedSkillErrors.push("開発その他スキルを選択してください");
          this.selectedSkill = [];
        } 
        // if(!this.recruitNumber){
        //   console.log('aaaaaaaaaaaaaaaaaaaaa')
        //   this.recruitNumberErrors.push("募集人数を選択してください");
        //   this.recruitNumber = [];
        // } 
        return error;
      }

      // * 応募者人数を文字列から数値に変換
      var recruitNum = Number(this.recruitNumber);
      // * 言語を {id: Number}に変換
      const languageArray = [];
      for(var i = 0; i < this.selectedLang.length; i++) {
        // console.log({id: this.selectedLang[i]})
        languageArray.push({id: this.selectedLang[i]})
      }
      // * フレームワークを{id: Number}に変換
      const framworksArray = [];
      for(var c = 0; c < this.selectedFramwork.length; c++) {
        // console.log({id: this.selectedLang[i]})
        framworksArray.push({id: this.selectedFramwork[c]})
      }
      // * その他スキルを {id: Number}に変換
      const skillArray = [];
      for(var d = 0; d < this.selectedSkill.length; d++) {
        // console.log({id: this.selectedLang[i]})
        skillArray.push({id: this.selectedSkill[d]})
      }
      // * settion 1のデータを変数に格納する
      var jobTitle = sessionStorage.getItem('jobTitle');
      var jobDescription = sessionStorage.getItem('jobDescription');
      var devStartDateString = sessionStorage.getItem('devStartDateString');
      var devEndDateString = sessionStorage.getItem('devEndDateString');

      // * date型に変換のための data用意
      function toDate (str, delim) {
        var arr = str.split(delim)
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }

      // //* 開始日
      var devStart = devStartDateString
      var devStartDate = toDate(devStart, '-');
      // *終了日
      var devEnd = devEndDateString
      var devEndDate = toDate(devEnd, '-');

      const data = {
        userId: 4, //? 仮でUser_idを置いている
        jobTitle : jobTitle,  //? タイトル
        jobDescription: jobDescription, //? 詳細
        devStartDate: devStartDate,  //? 開始日
        devEndDate: devEndDate, //? 終了日
        // publicationPeriod: this.publicationPeriod,  //? 掲載終了
        // communicationToolId: this.selectedCommunication, //? コミュニケーションツール
        programingLanguage: languageArray,  //? プログラミング言語
        // positionTag: this.selectedPosition , //? 開発ポジション
        programingFramework: framworksArray , //? フレームワーク
        skill: skillArray, //? その他開発スキル,
        recruitmentNumbers: recruitNum //募集人数
      };
      console.log(data)
      axios.post(`${this.$baseURL}/job`, data)
      .then(response => {
        console.log(response);
        sessionStorage.removeItem('jobTitle');
        sessionStorage.removeItem('jobDescription');
        sessionStorage.removeItem('devStartDateString');
        sessionStorage.removeItem('devEndDateString');
        alert('案件を投稿しました')
      })
      .catch(error => {
        console.log(error);
      });
      this.selectedLang = "";
      this.selectedFramwork = "";
      this.selectedSkill = "";
      this.recruitNumber = "";
    }
  },
  components: {
    vSelect
  }
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  .create-wrapper {
    width: 85%;
    height: 90vh;
    margin: 0 auto;
    /* background-color: #3dc1e2; */
    position: relative;
  }
  .create-wrapper .job-create-wrapper {
    width: calc(100% - 5rem);
    border-radius: 20px;
    margin: 2rem 0rem;
    background-color: #ffffff;
    /* float: right; */
    border: solid 1px #B9B9B9;
    padding: 2.5rem;
    position: absolute;
    right: 0;
    height: 82%;
  }
  .create-wrapper .job-create-radio {
    width: 100%;
    height: 80px; 
    display: flex;
    flex-direction: row;
    text-align: left;
  }
  .label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0.7rem;
  }
  .label-required {
    color: red;
  }
  .error-label {
    display: inline-block;
    color: #DD2476;
    list-style: none;
    font-weight: bold;
  }
  .error-message {
    margin: 0;
    padding-left: 10px;
  }
  .job-create-area {
    width: 100%;
    height: 23%; 
    /* display: flex; */
    text-align: left;
  }
  .input-area {
    margin: 0.7rem 0rem;
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    width: 100%;
    transition: 0.3s;
    letter-spacing: 1px;
    color: #111111;
    border-radius: 4px;
    background-color: #ffffff;
    background-color: #EFEFEF;
  }
  .vs--searchable .vs__dropdown-toggle  {
    background-color: green;
    height: 10px;
    widows: 10px;
    display: none;
  }
  .radio-btn {
    margin: 0.7rem 0rem;
    margin-left: 0.5rem;
  }
  input[type='search']:focus {
    border: 1px solid #2196F3;
    outline: none;
    box-shadow: 0 0 5px 1px #2195f348;
  }
  .button-are {
    width: 100%;
    height: 10%;
    position: relative;
    margin: 0 auto;
  }
  .post-job-btn {
    position: absolute;
    right: 0;
    top: 0;
    text-align: left;
    display: block;
    padding: 1.1rem 3rem;
    /* background-color: #2196F3; */
    box-shadow:1px 1px 5px rgba(0, 0, 0, 0.363);
    background: linear-gradient(60deg,#1142e2,#19bde6);
    border-radius: 25px;
    border: none;
    font-size: .875rem;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    cursor: pointer;
    transition: .3s;
    /* position:absolute;
    right: 0; */
  }
  .post-job-btn:hover {
    box-shadow:1px 1px 5px rgba(0, 0, 0, 0.685)
  }
  .post-job-back {
    position: absolute;
    left: 0;
    top: 0;
    text-align: left;
    display: block;
    padding: 1.1rem 4rem;
    /* background-color: #2196F3; */
    box-shadow:1px 1px 5px rgba(0, 0, 0, 0.363);
    background: linear-gradient(60deg,#525252,#6e6e6e);
    border-radius: 25px;
    border: none;
    font-size: .875rem;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    cursor: pointer;
    transition: .3s;
    text-decoration: none;
    /* position:absolute;
    right: 0; */
  }
}
</style>