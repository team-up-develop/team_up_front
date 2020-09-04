<template>
  <div class="create-wrapper">
    <div class="job-create-wrapper">
      <div class="job-create-area">
        <label for="name" class="label">開発言語</label>
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
        <label for="name" class="label">開発フレームワーク</label>
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
        <label for="name" class="label">その他技術</label>
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
        <label for="name" class="label">募集人数</label>
        <div class="job-create-radio">
        <label class="radio-btn"><input type="radio" v-model="checkWeather" value="0">未定</label>
        <label class="radio-btn"><input type="radio" v-model="checkWeather" value="1">1人</label>
        <label class="radio-btn"><input type="radio" v-model="checkWeather" value="2">2人</label>
        <label class="radio-btn"><input type="radio" v-model="checkWeather" value="3">3人</label>
        <label class="radio-btn"><input type="radio" v-model="checkWeather" value="4">4人</label>
        <!-- <p>{{ checkWeather }}</p> -->
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
        <h1>Selected フレームワーク: {{ selectedFramwork }}</h1> -->

        <!-- <select v-model="selectedSkill" class="position" multiple>
          <option disabled value="" class="position">その他技術</option>
          <option v-for="skill in skills" v-bind:value="{id: skill.id}" v-bind:key="skill.id">
            {{ skill.skillName }}
          </option>
        </select>
        <h1>Selected その他スキル: {{ selectedSkill }}</h1>
      <br><br> -->
      <router-link to='/jobcreate' class="job-create-btn-area">
      戻る
      </router-link>
      <button @click="createJob">作成</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
// import VueSimpleSuggest from "vue-simple-suggest";
// import "vue-simple-suggest/dist/styles.css";
export default {
  data() {
    return {
      selectedLang: [], //? プログラミング言語
      languages: [],
      selectedFramwork: [], //? フレームワーク
      framworks: [],
      selectedPosition: [], //? 開発ポジション
      positionTag: [], //? 開発ポジション
      positions: [],
      selectedSkill: [], //? その他開発スキル
      skills: [],
      selectedCommunication: 0, //? コミュニケーションツール
      communicationToolId: [
        { id: 1, name: 'Slack'},
        { id: 2, name: 'Skype' },
        { id: 3, name: 'ChatWork' }
      ],
      checkWeather: '晴れ',
    }
  },
  mounted() {
    // *開発言語
    axios.get('http://localhost:8888/api/v1/programing_language')
      .then(response => {
          this.loading = false;
          // const array = [];
          this.languages = response.data
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
      // * PostData
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
        communicationToolId: this.selectedCommunication, //? コミュニケーションツール
        programingLanguage: this.selectedLang,  //? プログラミング言語
        positionTag: this.selectedPosition , //? 開発ポジション
        programingFramework: this.selectedFramwork , //? フレームワーク
        skill: this.selectedSkill //? その他開発スキル
      };
      axios.post('http://localhost:8888/api/v1/job', data)
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
      this.jobTitle = "";
      this.jobDescription = "";
      this.devStartDate = "";
      this.devEndDate = "";
    }
  },
  components: {
    // VueSimpleSuggest
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
    height: 120px; 
    display: flex;
    flex-direction: row;
    text-align: left;
  }
  .label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0.7rem;
  }
  .job-create-area {
    width: 100%;
    height: 120px; 
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .input-area {
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
  .radio-btn {
    margin-left: 0.5rem;
  }
  input[type='serach'] {
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
}
</style>