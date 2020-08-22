<template>
  <div class="job-wrapper">
    <div class="top-search-area">
      <select v-model="selectedPosition" class="styled-select">
        <option disabled value="">担当</option>
        <option v-for="position in positions" v-bind:value="position.id" v-bind:key="position.id" class="dropdown-menu">
          {{ position.positionTagName }}
        </option>
      </select>
      <select v-model="selectedLang" class="styled-select">
        <option disabled value="" class="position">開発言語</option>
        <option v-for="lang in languages" v-bind:value="lang.id" v-bind:key="lang.id">
          {{ lang.programingLanguageName }}
        </option>
      </select>
      <input type="text" v-model="freeWord" placeholder="フリーワード" class="styled-select-freewrod">
      <div @click="getParams" class="serach-btn">
        検索する
      </div>
    </div>
    <div class="job-wrapper-center" v-show="!loading">
      <div class="job-wrapper-left">
        <router-link :to="`/jobs/${ job.id }`" v-for="job in jobs" class="router" :key="job.id">
        <!-- <div v-for="job in jobs" class="router" :key="job.id" @click="getJob"> -->
          <div class="job-cards">
            <div class="job-cards-top">
              {{ job.jobTitle }}
            </div>
            <div class="job-cards-center">
              <div class="langage" v-for="langage in job.programingLanguage" :key="langage.id">
                {{ langage.programingLanguageName }}
              </div>
              <div class="framework" v-for="framework in job.programingFramework" :key="framework.programingFrameworkName">
                {{ framework.programingFrameworkName }}
              </div>
              <div class="skill" v-for="skill in job.skill" :key="skill.skillName">
                {{ skill.skillName }}
              </div>
            </div>
            <div class="job-cards-bottom">
              <div class="product-start-end">
                <div class="product-start-end-tag">
                  開発期間:
                </div>
                <div class="product-start-end-time">
                  {{ job.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ job.devEndDate | moment("YYYY年 M月 D日")}}
                </div>
              </div>
              <div class="post-user-area">
                <div class="post-user-image"></div>
                <div class="post-user-name-area">
                  <div class="post-user-name">
                    {{ job.user.userName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!-- </div> -->
        </router-link>
      </div>
    </div>
    <Loading v-show="loading">
    </Loading>
  </div>
</template>

<script>
// import $ from 'jquery';
import axios from 'axios'
import moment from "moment";
import Loading from '@/components/Loading'
export default {
  data() {
    // const formats = [
    //   "YYYY年 M月 D日",
    // ];
    return {
      jobs: [],
      selectedPosition: [],
      positions: [],
      selectedLang: [],
      languages: [],
      freeWord: '',
      name: '',
      age: 0,
      loading: true,
    }
  },
  filters: {
    moment(value, format) {
      return moment(value).format(format);
    }
  },
  mounted() {
    // * 投稿一覧取得
    axios.get('http://localhost:8888/api/v1/job', {
      headers: {
        Authorization: `Bearer ${ localStorage.userId }`
      }
    })
    .then(response => {
      setTimeout(() => {
        this.loading = false;
        this.jobs = response.data
      }, 1500);
    })
    // * プログラミング言語 取得
    axios.get('http://localhost:8888/api/v1/programing_language')
      .then(response => {
          this.languages = response.data
      })
    // * 開発ポジション 取得
    axios.get('http://localhost:8888/api/v1/position_tag')
      .then(response => {
          this.positions = response.data
      })
    if(localStorage.LoginName) this.name = localStorage.LoginName;
    if(localStorage.LoginPassword) this.age = localStorage.LoginPassword;
  },
  methods: {
    // * 検索
    getParams(){
      const data = {
        position: this.selectedPosition,
        language: this.selectedLang,
        freeWord: this.freeWord
      }
      const URL = 'http://localhost:8888/api/v1/job/?'
      // * クエリパラメーター
      axios.get(`${ URL }position_tag_id=${ data.position }&programing_language_id=${ data.language }&keyword=${ data.freeWord }#/`)
      .then(response => {
        setTimeout(() => {
          this.loading = false;
          this.jobs = response.data
        }, 1000);
      })
    },
    getJob() {
      console.log()
    }
  },
  components: {
    Loading,
  },
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  /* 検索欄 */
  .job-wrapper .top-search-area .styled-select {
    /* 👇デフォルトのスタイルを解除 */
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    /* 👇スタイル */
    display: inline-block;
    width: 100%; /* 幅 */
    max-width: 26%; /* 最大幅 */
    margin: 1em 0; /* 前後の余白 */
    padding: 0.8em 1.5em 0.8em 0.5em; /* 文字周りの余白 */
    cursor: pointer; /* カーソルを指に */
    line-height: 1.4; /* 行高 */
    font-size: 0.95em; /* フォントサイズ */
    font-weight: 700; /* 太字に */
    color: #333; /* 文字色 */
    border-radius: 4px; /* 角丸 */
    background-color: #ffffff; /* 背景色 */
    border: solid 1px #e1e8ef; /* 枠線 */
    box-shadow: 0 3px 3px -2px rgba(3, 29, 41, 0.15); /* 影 */
    /* 👇三角マークを作る */
    background-image: linear-gradient(45deg, transparent 50%, rgba(0,0,0,0.4) 50%),  linear-gradient(135deg, rgba(0,0,0,0.4) 50%, transparent 50%);
    background-size: 5px 5px, 5px 5px;
    background-position: calc(100% - 15px) 50%, calc(100% - 10px) 50%;
    background-repeat: no-repeat;
  }
  .job-wrapper .top-search-area .styled-select-freewrod {
    /* 👇デフォルトのスタイルを解除 */
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    /* 👇スタイル */
    display: inline-block;
    width: 100%; /* 幅 */
    max-width: 27%; /* 最大幅 */
    margin: 1em 0; /* 前後の余白 */
    padding: 0.8em 1.5em 0.8em 0.5em; /* 文字周りの余白 */
    cursor: pointer; /* カーソルを指に */
    line-height: 1.4; /* 行高 */
    font-size: 0.95em; /* フォントサイズ */
    font-weight: 700; /* 太字に */
    color: #333; /* 文字色 */
    border-radius: 4px; /* 角丸 */
    background-color: #ffffff; /* 背景色 */
    border: solid 1px #e1e8ef; /* 枠線 */
    box-shadow: 0 3px 3px -2px rgba(3, 29, 41, 0.15); /* 影 */
  }
  /* フォーカス時 */
  .styled-select:focus {
    outline: 0;
    border-color: #b0c5ff; /* 枠線色を変更 */
  }
  /* IEでデフォルトの矢印を消す */
  .styled-select::-ms-expand {
    display: none;
  }
  .job-wrapper .top-search-area {
    width: 85%;
    margin: 0 auto;
    /* width: 20%;
    margin: 0 0 0 0;
    background-color: #ffffff;
    border: solid 1px #B9B9B9;
    border-radius: 4px;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 2.5rem;
    padding: 1.5rem 0; */
  }
  .job-wrapper .top-search-area .serach-btn {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    /* 👇スタイル */
    display: inline-block;
    margin: 1em 0; /* 前後の余白 */
    padding: 0.8rem 3rem; /* 文字周りの余白 */
    cursor: pointer; /* カーソルを指に */
    line-height: 1.4; /* 行高 */
    font-size: 1.1em; /* フォントサイズ */
    font-weight: 700; /* 太字に */
    color: #ffffff; /* 文字色 */
    border-radius: 4px; /* 角丸 */
    box-shadow: 0 3px 3px -2px rgba(3, 29, 41, 0.15); /* 影 */
    background: -moz-linear-gradient(top, #FF512F, #DD2476);
    background: -webkit-linear-gradient(top, #FF512F, #DD2476);
    background: linear-gradient(to bottom, #FF512F, #DD2476);
  }

  /* 全体 */
  .job-wrapper {
    width: 100%;
    /* position: absolute; */
    background-color: #F2F6F7;
    /* right: 0;
    top: 0; */
    margin: 0 auto;
    padding: 2rem 0 2rem 0;
    position: relative;
  }
  .job-wrapper .job-wrapper-center {
    width: 85%;
    /* height: ; */
    margin: 0 auto;
    /* float: right; */
    /* background-color: yellow; */
    position: relative;
  }
  .job-wrapper .job-wrapper-center .job-wrapper-left :hover {
    background-color: rgb(250, 248, 248);
    border: 1px solid #00A1D6;
    box-shadow: 0 15px 30px -5px rgba(0,0,0,.15), 0 0 5px rgba(0,0,0,.1);
    transform: translateY(-4px);
  }
  .job-wrapper-center .router {
    width: 100%;
    height: 100%;
  }
  .job-wrapper-left {
    width: 40%;
    /* pointer-events: none; */
    /* background-color: green; */
  }
  .job-cards {
    /* width: 425px; */
    width: 100%;
    /* height: 60%; */
    height: 292px;
    /* float: right; */
    /* float: left; */
    margin: 10px 0.5%;
    border: solid 1px #B9B9B9;
    background-color: #ffffff;
    border-radius: 10px / 10px;
    transition: .3s;
    color: #111111;

  }
  .job-cards-top {
    width: calc(100% - 60px);
    height: calc(25% - 60px);
    text-align: left;
    padding: 2rem 2rem 1rem 2rem;
    font-weight: bold;
    pointer-events: none;
  }
  .job-cards-center {
    width: calc(100% - 40px);
    height: calc(35% - 20px);
    padding: 10px 20px;
    text-align: left;
    pointer-events: none;
  }
  .job-cards-center .langage{
    margin: 5px 0px 0px 5px ;
    text-align: left;
    display: inline-block;
    color: #004098;
    font-size: 12px;
    border: solid 1px #004098;
    padding: 7px 23px;
    border-radius: 20px;
    font-weight: bold;
    pointer-events: none;
  }
  .job-cards-center .framework{
    margin: 5px 0px 0 5px ;
    text-align: left;
    display: inline-block;
    color: #00A7EA;
    font-size: 12px;
    border: solid 1px #00A7EA;
    padding: 7px 23px;
    border-radius: 20px;
    font-weight: bold;
    pointer-events: none;
  }
  .job-cards-center .skill{
    margin: 5px 0px 0 5px ;
    text-align: left;
    display: inline-block;
    color: #8D93C8;
    font-size: 12px;
    border: solid 1px #8D93C8;
    padding: 7px 23px;
    border-radius: 20px;
    font-weight: bold;
    pointer-events: none;
  }
  .job-cards-bottom {
    width: calc(100% - 50px);
    height: calc(38% - 20px);
    padding: 10px 25px;
    pointer-events: none;
    margin-top: 0.2rem;
  }
  .job-cards-bottom .product-start-end {
    width: 100%;
    height: 40%;
    text-align: left;
    pointer-events: none;
  }
  .job-cards-bottom .product-start-end .product-start-end-tag {
    display: inline-block;
    pointer-events: none;
  }
  .job-cards-bottom .product-start-end .product-start-end-time {
    display: inline-block;
    padding: 0 20px;
    pointer-events: none;
  }
  .job-cards-bottom .post-user-area {
    width: 100%;
    height: 60%;
    text-align: left;
    pointer-events: none;
    /* background-color: yellow; */
  }
  .job-cards-bottom .post-user-area .post-user-image {
    width: 60px;
    height: 100%;
    border-radius: 50%;
    background-color: #00A1D6;
    display: inline-block;
    pointer-events: none;
  }
  .job-cards-bottom .post-user-area .post-user-name-area {
    display: inline-block;
    /* width: calc(80% - 40px); */
    height: 60%;
    padding: 0 20px;
    position: relative;
    pointer-events: none;
  }
  .job-cards-bottom .post-user-area .post-user-name-area .post-user-name {
    position: absolute;
    top: 0;
    pointer-events: none;
  }
}

@media screen and (max-width: 1435px) {
  .job-wrapper .job-wrapper-center {
    /* width: 95%;
    height: 100vh;
    margin: 0 auto; */
  }
}

@media screen and (max-width: 1400px) {
  .job-wrapper .job-wrapper-center {
    width: 99%;
    height: 100vh;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1289px) {
  .job-wrapper .job-wrapper-center {
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    background-color: yellow;
  }
  .job-cards {
    width: 405px;
    /* width: 32%; */
    height: 40%;
    /* height: 292px; */
    /* float: right; */
    float: left;
    margin: 10px 2rem;
    border: solid 1px #B9B9B9;
    background-color: #ffffff;
    border-radius: 10px / 10px;
    transition: .3s;
    color: #111111;
  }
}

@media screen and (max-width: 1238px) {
  /* .job-cards {
    width: 100%;
    height: 280px;
    display: inline-block;
    margin: 5px;
    border: solid 1px #B9B9B9;
    background-color: #ffffff;
    border-radius: 10px / 10px;
  } */
  /* .job-wrapper .job-wrapper-center {
    width: 80%;
    height: 100vh;
    margin: 0 auto;
  } */
  /* .job-cards-bottom .post-user-area .post-user-image {
    width: 8%;
    height: 100%;
    border-radius: 50%;
    background-color: #00A1D6;
    display: inline-block;
  } */
}

</style>
