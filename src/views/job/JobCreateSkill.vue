<template>
  <div class="create-wrapper">
    <div class="job-create-wrapper">
      <div class="job-create-area">
        <label for="name" class="label">開発言語</label><label for="name" class="label-required">必須</label>
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
        <label for="name" class="label">フレームワーク</label><label for="name" class="label-required">必須</label>
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
        <label for="name" class="label">その他技術</label><label for="name" class="label-required">必須</label>
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
        <label for="name" class="label">募集人数</label><label for="name" class="label-required">必須</label>
        <div class="job-create-radio">
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="0">未定</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="1">1人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="2">2人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="3">3人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="4">4人</label>
        <!-- <p>Selected 開発メンバー {{ recruitNumber }} 人</p> -->
      </div>
      </div>
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
      selectedSkill: [], //? その他開発スキル
      skills: [],
      selectedCommunication: 0, //? コミュニケーションツール
      communicationToolId: [
        { id: 1, name: 'Slack'},
        { id: 2, name: 'Skype' },
        { id: 3, name: 'ChatWork' }
      ],
      recruitNumber: 0, //? メンバー人数
      selectedLangErrors: [], //?言語入力エラー
      selectedFramworkErrors: [], //?フレームワーク入力エラー
      selectedSkillErrors: [], //?その他スキル入力エラー
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

      const params = {
        userId: this.$store.state.auth.userId, //? ログインUserId
        jobTitle : jobTitle,  //? タイトル
        jobDescription: jobDescription, //? 詳細
        devStartDate: devStartDate,  //? 開始日
        devEndDate: devEndDate, //? 終了日
        programingLanguage: languageArray,  //? プログラミング言語
        programingFramework: framworksArray , //? フレームワーク
        skill: skillArray, //? その他開発スキル,
        recruitmentNumbers: recruitNum //?募集人数
      };
      console.log(params)
      axios.post(`${this.$baseURL}/job`, params)
      .then(response => {
        console.log(response);
        sessionStorage.removeItem('jobTitle');
        sessionStorage.removeItem('jobDescription');
        sessionStorage.removeItem('devStartDateString');
        sessionStorage.removeItem('devEndDateString');
        alert('案件を投稿しました')
        this.$router.push('/manage');
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

<style lang="scss" scoped>
@media screen and (max-width: 1440px) {
  .create-wrapper {
    width: 85%;
    height: 90vh;
    margin: 0 auto;
    position: relative;

    .job-create-wrapper {
      @include card-border-color;
      background-color: $basic-white;
      width: calc(100% - 5rem);
      border-radius: 20px;
      margin: 2rem 0rem;
      padding: 2.5rem;
      position: absolute;
      right: 0;
      height: 82%;
    }

    .job-create-radio {
      width: 100%;
      height: 80px;
      display: flex;
      flex-direction: row;
      text-align: left;
    }
  }

  .label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0.7rem;
  }

  .label-required {
    color: $basic-white;
    background-color: $error-message-color;
    font-size: 12px;
    font-weight: bold;
    border-radius: 25px;
    padding: 0.25rem 0.9rem;
    text-align: center;
    margin-left: 10px;
  }

  .error-label {
    display: inline-block;
    color: $error-message-color;
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
    text-align: left;
  }

  .input-area {
    margin: 0.7rem 0rem;
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    width: 100%;
    transition: 0.3s;
    letter-spacing: 1px;
    color: $text-main-color;
    border-radius: 4px;
    background-color: $basic-white;
    background-color: $sub-white;
  }

  .radio-btn {
    margin: 0.7rem 0rem;
    margin-left: 0.5rem;
  }

  .button-are {
    width: 100%;
    height: 10%;
    position: relative;
    margin: 0 auto;
  }

  .post-job-btn {
    @include box-shadow-btn;
    @include blue-btn;
    position: absolute;
    right: 0;
    top: 0;
    text-align: left;
    display: block;
    padding: 1.1rem 3rem;
    border-radius: 25px;
    border: none;
    font-size: .875rem;
    font-weight: 600;
    color: $basic-white;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    cursor: pointer;
    transition: .3s;
    outline: none;

    &:hover {
      @include btn-hover;
    }
  }

  .post-job-back {
    @include box-shadow-btn;
    @include grey-btn;
    position: absolute;
    left: 0;
    top: 0;
    text-align: left;
    display: block;
    padding: 1.1rem 4rem;
    border-radius: 25px;
    border: none;
    font-size: .875rem;
    font-weight: 600;
    color: $basic-white;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    cursor: pointer;
    transition: .3s;
    text-decoration: none;
    outline: none;
  }
}
</style>