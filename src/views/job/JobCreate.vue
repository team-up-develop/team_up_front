<template>
  <div class="create-wrapper">
    <div class="job-create-wrapper" v-show="!loading">
      <div class="job-create-title-area">
        <label for="name" class="label">案件タイトル</label>
        <input type="text" v-model="jobTitle" @input="onInputTitle" placeholder="Go と Vue.js で 未経験エンジニアのためのサービスを作りたい(60文字以内で入力してください)" maxlength="60" >
          <small id="rem">残り{{60 - titleLimit }}文字</small>
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
        <textarea type="text" name="" @input="onTextJobDescription" v-model="jobDescription" placeholder="詳しい内容や現在の状況を記載してください(250文字以内)" maxlength="250"></textarea>
        <small id="rem">残り{{250 - jobDescriptionLimit }}文字</small>
      </div>
      <router-link to='/jobcreate/session2' class="job-create-btn-area">
        <button class="next-btn" @click="nextCreateBtn">
          次へ 1/2
        </button>
      </router-link>
    </div>
  <Loading v-show="loading">
  </Loading>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/common/Loading'
export default {
  data() {
    return{
      jobTitle: "", //? タイトル
      jobDescription: "", //? 詳細
      devStartDate: null, //? 開始日
      devEndDate: null, //? 終了日
      // publicationPeriod: "", //? 掲載終了
      loading: true,
      titleLimit: null,
      jobDescriptionLimit: null
    }
  },
  mounted() {
    // *開発言語
    axios.get(`${this.$baseURL}programing_language`)
      .then(response => {
        setTimeout(() => {
          this.loading = false;
          this.languages = response.data
          // console.log(this.languages)
        }, 1500);
      })
    // * フレームワーク
    axios.get(`${this.$baseURL}programing_framework`)
      .then(response => {
          this.framworks = response.data
          // console.log(this.framworks)
      })
    // * 開発ポジション
    axios.get(`${this.$baseURL}position_tag`)
      .then(response => {
          this.positions = response.data
          // console.log(this.positions)
      })
    // * その他スキル
    axios.get(`${this.$baseURL}skill`)
      .then(response => {
          this.skills = response.data
          // console.log(this.skills)
      })
    // * ローカルストレージの値をフォームに格納する
    var jobTitle = sessionStorage.getItem('jobTitle');
    var jobDescription = sessionStorage.getItem('jobDescription');
    var devStartDateString = sessionStorage.getItem('devStartDateString');
    var devEndDateString = sessionStorage.getItem('devEndDateString');
    this.jobTitle = jobTitle;
    this.devStartDate = devStartDateString;
    this.devEndDate = devEndDateString;
    this.jobDescription = jobDescription;
  },
  // computed: {

  // },
  methods: {
    nextCreateBtn() {
      // * PostData
      const data = {
        jobTitle : this.jobTitle,  //? タイトル
        jobDescription: this.jobDescription, //? 詳細
        devStartDate: this.devStartDate, //? 開発開始
        devEndDate: this.devEndDate, //? 開発終了
      };
      sessionStorage.setItem('jobTitle', data.jobTitle);
      sessionStorage.setItem('jobDescription', data.jobDescription);
      sessionStorage.setItem('devStartDateString', data.devStartDate);
      sessionStorage.setItem('devEndDateString', data.devEndDate);
      var jobTitle = sessionStorage.getItem('jobTitle');
      this.jobTitle = jobTitle;
      // console.log(this.jobTitle)
    },
    // * タイトル文字制限
    onInputTitle: function() {
      this.titleLimit = this.jobTitle.length;
    },
    // * 詳細文字制限
    onTextJobDescription: function() {
      this.jobDescriptionLimit = this.jobDescription.length
    }
  },
  components: {
    Loading,
  },
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  #rem {
    color: #7c7c7c;
    margin-top: 2px;
  }
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
    border: 1px solid #2196F3;
    outline: none;
    box-shadow: 0 0 5px 1px #2195f348;
  }
  /* 案件タイトル入力欄 end */
  /* 案件開始・終了時間 start */
  .job-create-wrapper .job-create-time-area {
    width: 100%;
    height: 100px; 
    display: flex;
    flex-direction: column;
    text-align: left;
    /* display: inline-block; */
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
    border: 1px solid #2196F3;
    outline: none;
    box-shadow: 0 0 5px 1px #2195f348;
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
    border: 1px solid #2196F3;
    outline: none;
    box-shadow: 0 0 5px 1px #2195f348;
  }
  /* 案件詳細入力欄 end */
  .job-create-wrapper .job-create-btn-area {
    width: 1000px;
    height: 56px; 
    text-align: left;
    margin-top: 1.5rem;
    /* position: relative; */
    background-color: yellow;
  }
  .job-create-wrapper .job-create-btn-area .next-btn {
    text-align: left;
    display: block;
    padding: 1.1rem 4rem;
    /* background-color: #2196F3; */
    box-shadow:1px 1px 5px rgba(0, 0, 0, 0.363);
    background: -moz-linear-gradient(top, #3C8CE7, #00EAFF);
    background: -webkit-linear-gradient(top, #3C8CE7, #00EAFF);
    background: linear-gradient(to bottom, #3C8CE7, #00EAFF);
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
    margin-top: 1.5rem;
    cursor: pointer;
    transition: .3s;
    /* position:absolute;
    right: 0; */
  }
    .job-create-wrapper .job-create-btn-area .next-btn:hover {
      box-shadow:1px 1px 5px rgba(0, 0, 0, 0.685)
    }
}
</style>