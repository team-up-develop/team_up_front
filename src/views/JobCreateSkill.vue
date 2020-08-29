<template>
  <div>
    <select v-model="selectedCommunication" class="">
      <option disabled value="" class="">コミュニケーションツール</option>
      <option v-for="communication in communicationToolId" v-bind:value="communication.id" v-bind:key="communication.id">
        {{ communication.name }}
      </option>
    </select>
    <span>コミュニケーションツール: {{ selectedCommunication }}</span>
    <!-- <label for="name">開発開始時期: </label>
    <input type="date" v-model="devStartDate">
    <label for="name">開発終了時期: </label>
    <input type="date" v-model="devEndDate"> -->

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
    <br><br>
    <button @click="createJob">作成</button>
    <router-link to='/jobcreate' class="job-create-btn-area">
    戻る
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
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
      })
      .catch(error => {
        console.log(error);
      });
      this.jobTitle = "";
      this.jobDescription = "";
      this.devStartDate = "";
      this.devEndDate = "";
    }
  }
}
</script>

<style>

</style>