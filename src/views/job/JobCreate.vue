<template>
  <div class="create-wrapper">
    <div class="job-create-wrapper" v-show="!loading">
      <div class="job-create-title-area">
        <label for="name" class="label">案件タイトル</label><label for="name" class="label-required">必須</label>
          <label v-if="errors.length" class="error-label">
            <p v-for="error in errors" :key="error" class="error-message">{{ error }}</p>
          </label>
        <input type="text" v-model="jobTitle" @input="onInputTitle" placeholder="Go と Vue.js で 未経験エンジニアのためのサービスを作りたい(60文字以内で入力してください)" maxlength="60" >
          <small id="rem">残り{{60 - titleLimit }}文字</small>
      </div>
      <div class="job-create-time-area">
        <label for="name" class="label">開発開始時期</label><label for="name" class="label-required">必須</label>
          <label v-if="errorsDevStartDates.length" class="error-label">
            <p v-for="errorsDevStartDate in errorsDevStartDates" :key="errorsDevStartDate" class="error-message">{{ errorsDevStartDate }}</p>
          </label>
        <input type="date" v-model="devStartDate">
      </div>
      <div class="job-create-time-area">
      <label for="name" class="label">開発終了時期</label><label for="name" class="label-required">必須</label>
        <label v-if="errorDevEndDates.length" class="error-label">
          <p v-for="errorDevEndDate in errorDevEndDates" :key="errorDevEndDate" class="error-message">{{ errorDevEndDate }}</p>
        </label>
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
import Loading from '@/components/common/loading/Loading'
export default {
  data() {
    return{
      loading: true,
      jobTitle: "", //? タイトル
      jobDescription: "", //? 詳細
      devStartDate: null, //? 開始日
      devEndDate: null, //? 終了日
      titleLimit: null, //? タイトル文字制限
      jobDescriptionLimit: null, //? 詳細文字制限
      errors: [], //? タイトルエラー格納先
      errorsDevStartDates: [], //? 開発開始時期エラー格納先
      errorDevEndDates: [] //? 開発終了時期エラー格納先
    }
  },
  mounted() {
    // *開発言語
    axios.get(`${this.$baseURL}/programing_language`)
      .then(response => {
        setTimeout(() => {
          this.loading = false;
          this.languages = response.data
          // console.log(this.languages)
        }, 500);
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
    // * セッションストレージの値をフォームに格納する
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
    nextCreateBtn(e) {
      //* エラーメッセージ
      if(!this.jobTitle || !this.devStartDate || !this.devEndDate) {
        this.errors = [];
        this.errorsDevStartDates = [];
        this.errorDevEndDates = [];
        if(this.jobTitle == null || !this.jobTitle ) this.errors.push("案件タイトルを入力してください");
        if(this.devStartDate == null) this.errorsDevStartDates.push("開発終了時期を入力してください");
        if(this.devEndDate == null) this.errorDevEndDates.push("開発終了時期を入力してください");
        e.preventDefault();
      }
      // * PostData
      if(this.jobTitle && this.devStartDate && this.devEndDate) {
        const params = {
          jobTitle : this.jobTitle,  //? タイトル
          jobDescription: this.jobDescription, //? 詳細
          devStartDate: this.devStartDate, //? 開発開始
          devEndDate: this.devEndDate, //? 開発終了
        };
        sessionStorage.setItem('jobTitle', params.jobTitle);
        sessionStorage.setItem('jobDescription', params.jobDescription);
        sessionStorage.setItem('devStartDateString', params.devStartDate);
        sessionStorage.setItem('devEndDateString', params.devEndDate);
        var jobTitle = sessionStorage.getItem('jobTitle');
        this.jobTitle = jobTitle;
      }
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

<style lang="scss" scoped>
/* 文字制限 */
#rem {
  color: #7c7c7c;
  margin-top: 2px;
}

/* Wrapper */
.create-wrapper {
  width: 85%;
  height: 90vh;
  margin: 0 auto;
  position: relative;

  .job-create-wrapper {
    @include card-border-color;
    width: calc(100% - 5rem);
    border-radius: 20px;
    margin: 2rem 0rem;
    background-color: $basic-white;
    padding: 2.5rem;
    position: absolute;
    right: 0;
    height: 80%;
  }
}

.label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.7rem;
  display: inline-block;
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

/* 案件タイトル入力欄 start*/
.job-create-wrapper {
  .job-create-title-area {
    width: 100%;
    height: 18%;
    text-align: left;

    input[type='text'] {
      @include input-border-color;
      background-color: $sub-white;
      color: $text-main-color;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 100%;
      padding: 0.3em;
      transition: 0.3s;
      letter-spacing: 1px;
      border-radius: 4px;
      padding: 0.5rem;

      &:focus {
        @include form-hover;
      }
    }
  }

  .job-create-time-area {
    width: 100%;
    height: 18%;
    text-align: left;

    input[type='date'] {
      @include input-border-color;
      background-color: $sub-white;
      color: $text-main-color;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 40%;
      display: flex;
      padding: 0.3em;
      transition: 0.3s;
      letter-spacing: 1px;
      border-radius: 4px;
      padding: 0.5rem;

      &:focus {
        @include form-hover;
      }
    }
  }

  .job-create-detail-area {
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    text-align: left;

    textarea[type='text'] {
      @include input-border-color;
      background-color: $sub-white;
      color: $text-main-color;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0.3em;
      transition: 0.3s;
      letter-spacing: 1px;
      border-radius: 4px;
      padding: 0.5rem;

      &:focus {
        @include form-hover;
      }
    }
  }

  .job-create-btn-area {
    width: 100px;
    height: 100px;
    text-align: left;
    margin-top: 1.5rem;

    .next-btn {
      @include box-shadow-btn;
      @include blue-btn;
      color: $basic-white;
      text-align: left;
      display: block;
      padding: 1.1rem 4rem;
      border-radius: 25px;
      border: none;
      font-size: .875rem;
      font-weight: 600;
      line-height: 1;
      text-align: center;
      max-width: 280px;
      margin: auto;
      font-size: 1rem;
      float: right;
      margin-top: 1.5rem;
      cursor: pointer;
      transition: .3s;
      outline: none;

      &:hover {
        @include box-shadow-btn;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .create-wrapper .job-create-wrapper {
    width: calc(100% - 4rem);
    margin: 2rem 0rem;
    padding: 2rem;
    position: absolute;
    right: 0rem;
    }
  }

/* タブレット */
@media screen and (max-width: 900px) {
  .create-wrapper .job-create-wrapper {
    width: calc(100% - 3rem);
    border-radius: 20px;
    margin: 2rem 0rem;
    background-color: $basic-white;
    padding: 1.5rem;
    position: absolute;
    right: 0;
  }
}

@media (max-width: 768px) {
  .job-create-wrapper .job-create-time-area {
    input[type='date'] {
    width: 60%;
    }
  }
}

/* スマホ */
@media (max-width: 500px){
  .create-wrapper .job-create-wrapper {
    width: calc(100% - 2rem);
    padding: 2rem 1rem;
    margin: 2rem auto 2rem auto;
  }
  .job-create-wrapper .job-create-time-area{
    input[type='date'] {
        width: 100%;
  }
  }
  .job-create-wrapper .job-create-btn-area {
    .next-btn {
      padding: 1.1rem 3.4rem;
    }
  }
}

@media (max-width: 420px) {
  .create-wrapper {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    position: relative;
  }
  .create-wrapper .job-create-wrapper {
    width: calc(97% - 2rem);
    margin: 2rem auto;
    position: relative;
    padding: 2rem 1rem 1rem 1rem;

    .next-btn {
      width: 49%;
      padding: 1.1rem 2.3rem;
    }
  }
  .job-create-wrapper .job-create-time-area{
    input[type='date'] {
        width: 100%;
    }
  }
}
</style>