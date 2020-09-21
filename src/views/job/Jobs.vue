<template>
  <div class="job-wrapper">
    <div class="search-area">
      <button @click="langSearchModal" class="search-modal-btn">開発言語</button>
      <button class="search-modal-btn">フレームワーク</button>
      <button class="search-modal-btn">その他技術</button>
      <input
        type="text" 
        v-model="freeWord" 
        placeholder="フリーワード" 
        class="search-freewrod-box"
      >
        <!-- 言語検索 モーダル画面 -->
        <div class="example-modal-window">
          <LanguageSearchModal @close="closeLangSearchModal" v-if="searchModal">
            <p class="label-lang">開発言語 選択</p>
              <div class="round" v-for="lang in languages" v-bind:key="lang.id">
              <input type="checkbox"  id="checkbox" v-model="selectedLang" v-bind:value="lang.id">
                <label for="" class="checkbox">{{ lang.programingLanguageName }}</label>
              </div>
            <template slot="footer">
              <div @click="getParams" class="serach-btn">
                検索する
              </div>
            </template>
          </LanguageSearchModal>
        </div>
      </div>
    <div class="job-wrapper-center" v-show="!loading">
      <div class="job-wrapper-left">
        <div 
          v-for="job in jobs" 
          class="router" 
          :key="job.id"  
          :value="job.id"
          @click="getJob(job)" 
          :jobId='job'
        >
          <!-- 案件カード コンポーネント -->
          <card-job :job="job"></card-job>
        </div>
      </div>
      <div class="job-wrapper-right" v-if="detailFlag === true">
        <div class="top-job-detail-area">
          <div class="top-job-detail-top">
            {{ jobDetail.jobTitle | truncateDetailTitle }}
          </div>
          <div v-if="entryRedirect == false">
            <div class="top-job-detail-bottom" v-if="selfJobPost === false">
              <button @click="openModal" class="btn-box-apply" v-if="applyFlug">エントリーする</button>
              <div class="btn-box-apply-false" v-if="applyFlug === false">
                エントリー済み
              </div>
              <div class="btn-box-save">
                <!-- <save-btn :jobId='id' class="btn"></save-btn> -->
                <font-awesome-icon icon="heart" class="save-icon" @click="saveJob" v-if="saveFlag"/>
                <font-awesome-icon icon="heart" class="save-end-icon" @click="deleteJob" v-if="saveFlag == false"/>
              </div>
              <!-- 応募する モーダル画面 -->
              <div class="example-modal-window">
                <ApplyModal @close="closeModal" v-if="modal">
                  <p>応募を完了してよろしいですか？</p>
                  <template slot="footer">
                    <applybtn @compliteEntry="compliteEntry" :jobId='id' ></applybtn>
                    <button @click="doSend" class="modal-btn">キャンセル</button>
                  </template>
                </ApplyModal>
              </div>
            </div>
            <div v-else>
              <div class="top-job-detail-bottom">
                <router-link :to="`/manage/apply/${ jobDetail.id }`">
                  <button class="btn-box-manage">管理画面へ</button>
                </router-link>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="top-job-detail-bottom">
              <button class="btn-box-apply" @click="registerRedirect">エントリーする</button>
              <div class="btn-box-save">
                <font-awesome-icon icon="heart" class="save-icon" @click="registerRedirect"/>
              </div>
            </div>
          </div>
        </div>
        <div class="main-job-detail-area">
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 投稿者
          </div>
          <div class="post-user-name-area">
            {{ jobDetail.user.userName }}
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 開発言語
          </div>
          <div class="post-user-area">
            <div 
              class="detail-langage" 
              v-for="langage in jobDetail.programingLanguage.slice(0,5)" 
              :key="langage.id">
              {{ langage.programingLanguageName }}
            </div>
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> フレームワーク
          </div>
          <div class="post-user-area">
            <div class="detail-framework" 
              v-for="framework in jobDetail.programingFramework.slice(0,5)" 
              :key="framework.programingFrameworkName">
              {{ framework.programingFrameworkName }}
            </div>
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> その他スキル
          </div>
          <div class="post-user-area">
            <div class="detail-skill" 
              v-for="skill in jobDetail.skill.slice(0,5)" 
              :key="skill.skillName"
            >
              {{ skill.skillName }}
            </div>
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 開発期間
          </div>
          <div class="post-user-area">
            {{ jobDetail.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ jobDetail.devEndDate | moment("YYYY年 M月 D日")}}
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 募集人数
          </div>
          <div class="post-user-area">
            {{ jobDetail.recruitmentNumbers }} 人
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 開発詳細
          </div>
          <div class="post-user-area">
            {{ jobDetail.jobDescription }}
          </div>
          <div class="jobDetail-time-area">
            投稿期日   {{ jobDetail.createdAt | moment("YYYY年 M月 D日") }}
          </div>
        </div>
      </div>
      <div class="job-wrapper-right-false" v-else>
        <!-- 右側の登録コンポーネント -->
        <job-register-false/>
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
import Loading from '@/components/common/Loading'
import ApplyModal from '@/components/modal/ApplyModal'
import Applybtn from '@/components/button/Applybtn'
import JobRegisterFalse from '@/components/job/JobRegisterFalse'
import CardJob from '@/components/job/CardJob'
import LanguageSearchModal from '@/components/modal/LanguageSearchModal'

export default {
  data() {
    return {
      jobs: [],
      // selectedPosition: [],
      // positions: [],
      selectedLang: [],
      languages: [],
      freeWord: '',
      name: '',
      age: 0,
      loading: true,
      jobDetail: null,
      detailFlag: false,
      selfJobPost: false, //? 自分の案件かを判定
      selfJob: null,  //? 自分の案件を格納する
      applyFlug: true, //?応募済みかの判定フラグ
      id: Number, //? clickした案件のIdを取得
      modal: false, //?モーダルを開いてるか否か
      saveFlag: true, //? 案件保存しているかを判定
      limitationList:1,
      userId: 0, //? ローカルストレージの値を保存する
      entryRedirect: false, //? 非ログイン時にエントリー押下後 登録にリダイレクトするためのフラグ
      searchModal: false //? 検索用モーダル
    }
  },
  filters: {
    // * date型を文字に変換
    moment(value, format) {
      return moment(value).format(format);
    },
    //* 案件タイトル 詳細 文字制限
    truncateDetailTitle: function(value) {
      var length = 60;
      var ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  created() {
    // * 投稿一覧取得
    axios.get('http://localhost:8888/api/v1/job', {
      // headers: {
      //   Authorization: `Bearer ${ localStorage.userId }`
      // }
    })
    .then(response => {
      setTimeout(() => {
        this.loading = false;
        this.jobs = response.data
      }, 500);
    })
    .catch(error => {
      console.log(error)
    })
    // * プログラミング言語 取得
    axios.get('http://localhost:8888/api/v1/programing_language')
      .then(response => {
          this.languages = response.data
      })
    // * ローカルストレージの値をログイン判定できるように格納
    this.userId = localStorage.userId
    if(!this.userId) {
      this.entryRedirect = true //* 非ログイン時表示に
    }
  },
  methods: {
    // * 非ログイン時 登録リダイレクト
    registerRedirect() {
      alert("登録が必要です");
      this.$router.push('/register');
    },
    // * 開発言語検索
    getParams(){
      var array = [];
      const data = {
        language: this.selectedLang,
      }
      for(var i =0; i < data.language.length; i++) {
        var languageParams = data.language[i];
        var queryParams =  'programing_language_id' + '[' + Number(languageParams - 1) + ']' + '=' + languageParams + '&';
        array.push(queryParams)
      }
      var result = array.join('');
      console.log( result );
        axios.get(`http://localhost:8888/api/v1/job/?${result}`)
        .then(response => {
          this.jobs = response.data
          this.searchModal = false
        })
      // console.log(languageParams);
      // console.log(programing_language_id[data.language]=data.language)
      // const URL = 'http://localhost:8888/api/v1/job/?'
      // * クエリパラメーター
      // axios.get(`${this.$baseURL}/job/?programing_language_id=${ data.language }&keyword=${ data.freeWord }#/`)
      // axios.get(`http://localhost:8888/api/v1/job/?programing_language_id[0]=${data.language}&programing_language_id[1]=2`)
      // .then(response => {
      //   this.loading = false;
      //   this.jobs = response.data
      // })
    },
    // * 案件を保存する
    saveJob(){
      const params = {
        jobId: this.jobDetail.id, 
        userId: 1 
      };
      axios.post(`${this.$baseURL}/favorite_job/`, params)
      .then(response => {
        this.saveFlag = false
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * 案件保存を削除する
    deleteJob() {
      const params = {
        jobId: this.jobDetail.id,
        userId: 1
      };
      axios.delete(`${this.$baseURL}/favorite_job/`,{data: params})
      .then(response => {
        this.saveFlag = true
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * click して案件を取得 === 詳細
    getJob(job) {
      this.jobDetail = job; //? clickした案件を取得
      this.detailFlag = true; //? 詳細画面を表示するか否かを判定する
      this.id = job.id;  //? clickしたIdを this.idに格納する
      this.selfJobPost = false; //? clickする度に 自分の案件では無くする
      this.applyFlug = true; //? clickする度に 応募済み案件にする

      // * ログインしていれば以下の処理が走る
      if(this.userId) {
        // * 自分の案件かを判定
        axios.get(`http://localhost:8888/api/v1//job/?user_id=${ this.userId }`)
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.selfJob = response.data[i]
            if(this.selfJob.id === this.id) {
              this.selfJobPost = true
            }
          }
        })
          // * 応募済みか応募済みでないかを判断
        axios.get(`http://localhost:8888/api/v1/apply_job/?user_id=${ this.userId }`)
        .then(response => {
          const arrayApply = []
          for(let c = 0; c < response.data.length; c++){
            const applyData = response.data[c];
            arrayApply.push(applyData.id)
          }
          if(arrayApply.includes(this.jobDetail.id)) {
            this.applyFlug = false
          } 
        })
          // * 保存済みか保存済みではないかを判定する
        axios.get(`http://localhost:8888/api/v1/favorite_job/?user_id=${ this.userId }`)
        .then(response => {
          const array = []
          for(let i = 0; i < response.data.length; i++){
            const likeData = response.data[i]
            array.push(likeData.job.id)
            // console.log(array)
          }
          if(array.includes(this.jobDetail.id)){
            this.saveFlag = false
          }
          else{
            this.saveFlag = true
          }
        })
      } else {
        console.log("登録してからご利用いただけます")
      }
    },

    // * エントリーが完了したら応募済みにする
    compliteEntry(){
      this.applyFlug = false;
    },

    // * モーダル
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
        this.closeModal()
      },
      // *検索
    langSearchModal() {
      console.log("検索用モーダルを開く")
      this.searchModal = true;
    },
    closeLangSearchModal() {
      this.searchModal = false;
    }
  },
  components: {
    Loading,
    Applybtn,
    ApplyModal,
    JobRegisterFalse,
    CardJob,
    LanguageSearchModal
  },
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
    .job-cards.sample-active {
    /* color: #00A1D6; */
    /* background-color: #00A1D6; */
    border-bottom: 4px solid #ff0800;
    font-weight: bold;
  }
  .className {
    background-color: red;
  }

  /* 詳細検索 */
  .search-area {
    width: calc(100% - 6rem);
    height: 48px;
    background-color: #ffffff;
    /* border-bottom: 1px solid #B9B9B9; */
    position: absolute;
    top: 0;
    position: sticky;
    z-index: 10;
    box-shadow: 0 2px 3px 0px rgb(197, 197, 197);
    text-align: left;
    padding: 0 3rem;
    display: inline-block;
  }
  .search-area .search-modal-btn {
    margin-top: 0.4rem;
    padding: 0.5rem 2rem;
    /* border: none; */
    border: solid 1px #BDC7C5;;
    color:#666666;
    background-color: #ffffff;
    /* background: linear-gradient(60deg,#1142e2,#19bde6); */
    border-radius: 50rem;
    cursor: pointer;
    font-weight: bold;
    margin-left: 0.7rem;
  }
  .search-area .search-freewrod-box {
    width: 28%;
    margin-top: 0.25rem;
    border: solid 1px #E0E0E0;
    background-color: #E0E0E0;
    border-radius: 50rem;
    padding: 0.6rem 1rem;
    position: absolute;
    right: 0;
    margin-right: 4rem;
  }

  /* 全体 */
  .job-wrapper {
    width: 100%;
    /* position: absolute; */
    /* background-color: #FAFAFA; */
    /* right: 0;
    top: 0; */
    margin: 0 auto;
    padding: 0rem 0 2rem 0;
    position: relative;
  }
  .job-wrapper .job-wrapper-center {
    width: 90%;
    /* height: ; */
    margin: 0 auto;
    /* float: right; */
    position: relative;
  }
  .job-wrapper .job-wrapper-center .router :hover {
    background-color: #2195f310;
    border: 1px solid #2196F3;
    box-shadow: 0 15px 30px -5px #2195f32d, 0 0 5px #2195f357;
    transform: translateY(-2px);
    cursor: pointer;
  }
  /* 案件詳細画面 */
  .job-wrapper-right {
    width: 52%;
    height: 88vh;
    margin-left: 2rem;
    margin-top: 1rem;
    background-color: #ffffff;
    /* display: inline-block; */
    /* position: absolute; */
    position: sticky;
    display: inline-block;
    /* margin-left: 1rem; */
    margin-bottom: 0.2rem;
    bottom: 0;
    border-radius: 8px;
    color: #111111;
    border: solid 1px #B9B9B9;
    text-align: left;
  }
  .job-wrapper-right .top-job-detail-area {
    width: calc(100% - 4rem);
    /* height: calc(17.5% - 2.5rem); */
    border-bottom: solid 1px #B9B9B9;
    font-weight: bold;
    padding: 1.5rem 2rem 1rem 2rem;
    box-shadow: 0 3px 3px -2px rgba(3, 29, 41, 0.15); /* 影 */
  }
  .job-wrapper-right .top-job-detail-area .top-job-detail-top {
    width: 100%;
    height: 50%;
    font-size: 1.2em;
    /* text-decoration: underline; */
  }
  .job-wrapper-right .top-job-detail-area .top-job-detail-bottom {
    width: 100%;
    height: 65%;
    display: inline-block;
    position: relative;
    margin-top: 0.8rem;
  }
  .btn-box-save {
    display: inline-block;
    height:calc(100% - 1rem);
    padding: 0.3rem 0 0 1.2rem;
    position: absolute;
    top: 0;
  }
  .job-wrapper-right .main-job-detail-area {
    width: calc(100% - 4rem);
    height: calc(75% - 1rem);
    /* background-color: yellow; */
    overflow: scroll;
    padding: 0 2rem 1rem 2rem ;
    position: relative;
  }
  .job-wrapper-right .main-job-detail-area .tag-area {
    font-weight: bold;
    margin: 1rem 0 0.5rem 0;
    font-size: 1em;
  }
  .job-wrapper-right .main-job-detail-area .tag-area .icon {
    color: #2196F3;
  }
  .post-user-area {
    line-height: 1.8;
    font-size: 14px;
  }
  .jobDetail-time-area {
    margin-top: 1rem;
    font-size: 12px;
    color: #7c7c7c;
    float: right;
  }
  .post-user-name-area {
    line-height: 1.8;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 0.3rem;
  }
  .post-user-name-area:hover {
    color: #2196F3;
    transition: .3s;
  }
  .detail-langage {
    margin:0 0px 0px 5px ;
    text-align: left;
    display: inline-block;
    color: #3F51B5;
    font-size: 14px;
    border: solid 1px #3F51B5;
    padding: 2px 23px;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }
  .detail-framework {
    margin: 0px 0px 0 5px ;
    text-align: left;
    display: inline-block;
    color: #2196F3;
    font-size: 14px;
    border: solid 1px #2196F3;
    padding: 2px 23px;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }
  .detail-skill {
    margin: 0px 0px 0 5px ;
    text-align: left;
    display: inline-block;
    color: #00BCD4;
    font-size: 14px;
    border: solid 1px #00BCD4;
    padding: 2px 23px;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }
  .btn-box-manage {
    padding: 0.75rem 3rem;
    /* background: -moz-linear-gradient(top, #E91E63, #e91e62ce);
    background: -webkit-linear-gradient(top, #E91E63, #e91e62ce);
    background: linear-gradient(to bottom, #E91E63, #e91e62ce); */
    border-radius: 8px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1.1em;
    display: inline-block;
    cursor: pointer;
    border: none;
    margin-top: 4px;
    background-image: -webkit-gradient(linear, right top, left top, from(#19bde6), to(#1142e2));
    background-image: -webkit-linear-gradient(right, #19bde6 0%, #1142e2 100%);
    background-image: linear-gradient(to left, #19bde6 0%, #1142e2 100%);
    color: #F8FAFF;
    appearance: none;
    border: none;
    box-shadow: 0 0px 5px 2px #d4d4d4;
  }
  /* 応募するボタン */
  .btn-box-apply{
    padding: 0.75rem 2rem;
    /* background: -moz-linear-gradient(top, #E91E63, #e91e62ce);
    background: -webkit-linear-gradient(top, #E91E63, #e91e62ce);
    background: linear-gradient(to bottom, #E91E63, #e91e62ce); */
    border-radius: 8px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1.1em;
    display: inline-block;
    cursor: pointer;
    border: none;
    margin-top: 4px;
    background: linear-gradient(60deg,#D81B60,#EC407A);
    color: #F8FAFF;
    appearance: none;
    border: none;
    box-shadow: 0 0px 5px 2px #d4d4d4;
    transition: .3s;
  }
  .btn-box-apply:hover {
    background: linear-gradient(60deg,#D81B60,#EC407A);
    color: #F8FAFF;
    appearance: none;
    border: none;
    box-shadow: 0 5px 20px -3px #CD106E;
    /* background: -moz-linear-gradient(top, #8C1BAB, #F761A1); */
    /* background: -webkit-linear-gradient(top, #8C1BAB, #F761A1); */
    /* background: linear-gradient(to bottom, #8C1BAB, #F761A1); */
    transition: .3s;
    /* box-shadow:1px 1px 5px rgba(0, 0, 0, 0.685); */
  }
  /* 応募済みボタン */
  .btn-box-apply-false{
    display: block;
    padding: 0.75rem 2rem;
    background: -moz-linear-gradient(top, #636363, #afafaf);
    background: -webkit-linear-gradient(top, #636363, #afafaf);
    background: linear-gradient(to bottom, #636363, #afafaf);
    border-radius: 8px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    margin-top: 4px;
    font-size: 1.1em;
    display: inline-block;
  }

  /* モーダル内のキャンセルボタン */
  .modal-btn {
    padding: 1rem 2.4rem;
    background: -moz-linear-gradient(top, #2196F3, #4FC3F7);
    background: -webkit-linear-gradient(top, #2196F3, #4FC3F7);
    background: linear-gradient(to bottom, #2196F3, #4FC3F7);
    border-radius: 50px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin-left: 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
  }

  /* 保存アイコン */
  .save-icon {
    font-size: 30px;
    padding: 10px;
    width: 20px;
    height: 20px;
    color: #ffffff;
    cursor: pointer;
    background-color: #d8d6d6;
    border-radius: 5px / 5px;
  }
  .save-end-icon {
    font-size: 30px;
    padding: 10px;
    width: 20px;
    height: 20px;
    color: red;
    cursor: pointer;
    background-color: #d8d6d6;
    border-radius: 5px / 5px;
  }


/* 右側 詳細を表示しない際に */
  .job-wrapper-right-false{
    width: 52%;
    /* height: 60vh; */
    /* display: inline-block; */
    /* position: absolute; */
    position: sticky;
    display: inline-block;
    margin-left: 2rem;
    margin-bottom: 0.2rem;
    bottom: 0;
    border-radius: 8px;
    color: #111111;
    text-align: left;
  }
  /* 案件カード側 */
  .job-wrapper-left {
    width: 43%;
    flex: 1 0 auto;
    align-items: center;
    justify-content: center;
    display: inline-block;
    margin-top: 1rem;
  }

  .label-lang {
    font-weight: bold;
    font-size: 2em;
    color: #666666;
  }
  .round {
    text-align: left;
    width: 24%;
    /* background-color: rebeccapurple; */
    margin-right: 1px;
    display: inline-block;
    position: relative;
    margin-bottom: 2rem;
  }
  input[type="checkbox"] {  
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 80%;
    cursor: pointer;
    height: 28px;
    width: 22px;
  }
  label.checkbox {
    position: absolute;
    top: 0;
    font-size: 16px;
    margin-top: 0.3rem;
    color: #666666;
    margin-left: 0.4rem;
    font-size: 16px;
  }
  .serach-btn {
    display: block;
    width: 77%;
    padding: 1rem 2rem;
    background: linear-gradient(60deg,#1142e2,#19bde6);
    /* background: linear-gradient(60deg,#BA68C8,#673AB7); */
    border-radius: 8px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    /* max-width: 280px; */
    margin: auto;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 0px 5px 2px #d4d4d4;
    transition: .3s;
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
  /* .job-wrapper .job-wrapper-center {
    width: 99%;
    height: 100vh;
    margin: 0 auto;
  } */
}

@media screen and (max-width: 1289px) {
  /* .job-wrapper .job-wrapper-center {
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    background-color: yellow;
  }
  .job-cards {
    width: 405px;
    height: 40%;
    float: left;
    margin: 10px 2rem;
    border: solid 1px #B9B9B9;
    background-color: #ffffff;
    border-radius: 10px / 10px;
    transition: .3s;
    color: #111111;
  } */
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
