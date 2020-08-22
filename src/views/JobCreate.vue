<template>
  <div class="create-wrapper">
    <div class="job-create-wrapper" v-show="!loading">
      <div class="job-create-title-area">
        <label for="name" class="label">案件タイトル</label>
        <input type="text" v-model="jobTitle" placeholder="Go と Vue.js で 未経験エンジニアのためのサービスを作りたい">
      </div>
      <div class="job-create-time-area">
        <label for="name" class="label">開発開始時期</label>
        <input type="date" v-model="devStartDate">
      </div>
      <div class="job-create-time-area">
      <label for="name" class="label">開発終了時期</label>
      <input type="date" v-model="devEndDate">
      </div>
      <div class="job-create-detail-area">
        <label for="name" class="label">概要</label>
        <textarea type="text" name="" id="" v-model="jobDescription" placeholder="詳しい内容や現在の状況を記載してください"></textarea>
      </div>
      <div class="job-create-btn-area">
        <button class="next-btn">
          次へ 2/1
        </button>
      </div>
      <!-- <select v-model="selectedCommunication" class="">
        <option disabled value="" class="">コミュニケーションツール</option>
        <option v-for="communication in communicationToolId" v-bind:value="communication.id" v-bind:key="communication.id">
          {{ communication.name }}
        </option>
      </select>
      <span>コミュニケーションツール: {{ selectedCommunication }}</span>
      <label for="name">開発開始時期: </label>
      <input type="date" v-model="devStartDate">
      <label for="name">開発終了時期: </label>
      <input type="date" v-model="devEndDate">

        <select v-model="selectedLang" class="" multiple>
          <option disabled value="" class="">開発言語</option>
          <option v-for="lang in languages" v-bind:value="{ id:lang.id }" v-bind:key="lang.id">
            {{ lang.programingLanguageName }}
          </option>
        </select>
        <h1>Selected 言語:{{ selectedLang }}</h1>

        <select v-model="selectedPosition" class="position" multiple>
          <option disabled value="" class="position">担当</option>
          <option v-for="position in positions " v-bind:value="{ id:position.id }" v-bind:key="position.id">
            {{ position.positionTagName }}
          </option>
        </select>
        <h1>Selected ポジション:{{ selectedPosition }}</h1>

        <select v-model="selectedFramwork" class="position" multiple>
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

      <label for="name">概要: </label>
      <textarea type="text" name="" id="" v-model="jobDescription"></textarea>
      <br><br>
      <button @click="createJob">作成</button> -->
    </div>
  <Loading v-show="loading">
  </Loading>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/Loading'
export default {
  data() {
    return{
      selectedLang: [], //? プログラミング言語
      languages: [],
      selectedFramwork: [], //? フレームワーク
      framworks: [],
      selectedPosition: [], //? 開発ポジション
      positionTag: [], //? 開発ポジション
      positions: [],
      selectedSkill: [], //? その他開発スキル
      skills: [],
      jobTitle: "", //? タイトル
      jobDescription: "", //? 詳細
      devStartDate: null, //? 開始日
      devEndDate: null, //? 終了日
      // publicationPeriod: "", //? 掲載終了
      selectedCommunication: 0, //? コミュニケーションツール
      communicationToolId: [
        { id: 1, name: 'Slack'},
        { id: 2, name: 'Skype' },
        { id: 3, name: 'ChatWork' }
      ],
      loading: true,
    }
  },
  mounted() {
    // *開発言語
    axios.get('http://localhost:8888/api/v1/programing_language')
      .then(response => {
        setTimeout(() => {
          this.loading = false;
          this.languages = response.data
          // console.log(this.languages)
        }, 1500);
      })
    // * フレームワーク
    axios.get('http://localhost:8888/api/v1/programing_framework')
      .then(response => {
          this.framworks = response.data
          // console.log(this.framworks)
      })
    // * 開発ポジション
    axios.get('http://localhost:8888/api/v1/position_tag')
      .then(response => {
          this.positions = response.data
          // console.log(this.positions)
      })
    // * その他スキル
    axios.get('http://localhost:8888/api/v1/skill')
      .then(response => {
          this.skills = response.data
          // console.log(this.skills)
      })
  },
  methods: {
    createJob() {
      // * date型に変換のための data用意
      const dateConversion = {
        devStartDate: this.devStartDate,
        devEndDate: this.devEndDate,
      };
      // * date型変換 関数
      function toDate (str, delim) {
        var arr = str.split(delim)
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }
      //* 開始日
      var devStart = dateConversion.devStartDate
      var devStartDate = toDate(devStart, '-');
      // *終了日
      var devEnd = dateConversion.devEndDate
      var devEndDate = toDate(devEnd, '-');
      // * PostData
      const data = {
        jobTitle : this.jobTitle,  //? タイトル
        jobDescription: this.jobDescription, //? 詳細
        devStartDate: devStartDate,  //? 開始日
        devEndDate: devEndDate, //? 終了日
        // publicationPeriod: this.publicationPeriod,  //? 掲載終了
        communicationToolId: this.selectedCommunication, //? コミュニケーションツール
        programingLanguage: this.selectedLang,  //? プログラミング言語
        positionTag: this.selectedPosition , //? 開発ポジション
        programingFramework: this.selectedFramwork , //? フレームワーク
        skill: this.selectedSkill //? その他開発スキル
      };
      console.log(data)
      axios.post('http://localhost:8888/api/v1/job', data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      this.jobTitle = "";
      this.jobDescription = "";
      this.devStartDate = "";
      this.devEndDate = "";
    }
  },
  components: {
    Loading,
  },
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
  }
  .label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0.7rem;
  }
  /* 案件タイトル入力欄 start*/
  .job-create-wrapper .job-create-title-area {
    width: 100%;
    height: 100px; 
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .job-create-wrapper .job-create-title-area input[type='text'] {
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    width: 100%;
    padding: 0.3em;
    transition: 0.3s;
    letter-spacing: 1px;
    color: #111111;
    border: 1px solid #A3A1A1;
    border-radius: 4px;
    padding: 0.5rem;
    background-color: #EFEFEF;
  }
  .job-create-wrapper .job-create-title-area input[type='text']:focus {
    border: 1px solid #00A1D6;
    outline: none;
    box-shadow: 0 0 5px 1px #00a0d64b;
  }
  /* 案件タイトル入力欄 end */
  /* 案件開始・終了時間 start */
  .job-create-wrapper .job-create-time-area {
    width: 100%;
    height: 100px; 
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .job-create-wrapper .job-create-time-area input[type='date'] {
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    width: 40%;
    padding: 0.3em;
    transition: 0.3s;
    letter-spacing: 1px;
    color: #111111;
    border: 1px solid #A3A1A1;
    border-radius: 4px;
    padding: 0.5rem;
    background-color: #EFEFEF;
  }
  .job-create-wrapper .job-create-time-area input[type='date']:focus {
    border: 1px solid #00A1D6;
    outline: none;
    box-shadow: 0 0 5px 1px #00a0d64b;
  }
  /* 案件開始時間 end */
  /* 案件詳細入力欄 start */
  .job-create-wrapper .job-create-detail-area {
    width: 100%;
    height: 200px; 
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .job-create-wrapper .job-create-detail-area textarea[type='text'] {
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0.3em;
    transition: 0.3s;
    letter-spacing: 1px;
    color: #111111;
    border: 1px solid #A3A1A1;
    border-radius: 4px;
    padding: 0.5rem;
    background-color: #EFEFEF;
  }
  .job-create-wrapper .job-create-detail-area textarea[type='text']:focus {
    border: 1px solid #00A1D6;
    outline: none;
    box-shadow: 0 0 5px 1px #00a0d64b;
  }
  /* 案件詳細入力欄 end */
  .job-create-wrapper .job-create-btn-area {
    width: 100%;
    height: 56px; 
    text-align: left;
    margin-top: 1.5rem;
    position: relative;
  }
  .job-create-wrapper .job-create-btn-area .next-btn {
    display: block;
    padding: 1rem 2.5rem;
    background: -moz-linear-gradient(top, #1f5ae8, #2ac1df);
    background: -webkit-linear-gradient(top, #1f5ae8, #2ac1df);
    background: linear-gradient(to bottom, #1f5ae8, #2ac1df);
    border-radius: 25px;
    border: 1px solid #ffffff;
    font-size: .875rem;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    position:absolute;
    right: 0;
  }
}
</style>