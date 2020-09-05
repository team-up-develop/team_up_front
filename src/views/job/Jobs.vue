<template>
  <div class="job-wrapper">
    <div class="search-area">
    </div>
    <div class="top-search-area">
      <select v-model="selectedPosition" class="styled-select">
        <option disabled value="">担当</option>
        <option 
          v-for="position in positions" 
          v-bind:value="position.id" 
          v-bind:key="position.id" 
          class="dropdown-menu"
        >
          {{ position.positionTagName }}
        </option>
      </select>
      <select v-model="selectedLang" class="styled-select">
        <option disabled value="" class="position">開発言語</option>
        <option 
        v-for="lang in languages" 
        v-bind:value="lang.id" 
        v-bind:key="lang.id"
        >
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
        <!-- <router-link :to="`/jobs/${ job.id }`" v-for="job in jobs" class="router" :key="job.id"> -->
        <div 
          v-for="job in jobs" 
          class="router" 
          :key="job.id"  
          :value="job.id"
          @click="getJob(job)" 
          :jobId='job'
        >
          <div class="job-cards">
            <div class="job-cards-top">
              {{ job.jobTitle | truncateTitle }}
            </div>
            <div class="job-cards-center">
              <div class="langage" 
                v-for="langage in job.programingLanguage.slice(0,3)" 
                :key="langage.id">
                {{ langage.programingLanguageName }}
              </div>
              <div class="framework" 
              v-for="framework in job.programingFramework.slice(0,3)" 
              :key="framework.programingFrameworkName">
                {{ framework.programingFrameworkName }}
              </div>
              <div class="skill" 
              v-for="skill in job.skill.slice(0,4)" 
              :key="skill.skillName">
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
        </div>
        <!-- </router-link> -->
      </div>
      <div class="job-wrapper-right" v-if="detailFlag === true">
        <div class="top-job-detail-area">
          <div class="top-job-detail-top">
            {{ jobDetail.jobTitle | truncateDetailTitle }}
          </div>
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
                  <applybtn :jobId='id'></applybtn>
                  <button @click="doSend" class="modal-btn">キャンセル</button>
                </template>
              </ApplyModal>
            </div>
          </div>
          <div v-else>
            自分の案件です
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
        <div class="false-user-login">
        </div>
        <div class="false-user-Advertisement">

        </div>
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
// import SaveBtn from '@/components/button/SaveBtn'
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
      jobDetail: null,
      detailFlag: false,
      selfJobPost: false, //? 自分の案件かを判定
      selfJob: null,  //? 自分の案件を格納する
      applyFlug: true, //?応募済みかの判定フラグ
      id: Number, //? clickした案件のIdを取得
      modal: false, //?モーダルを開いてるか否か
      saveFlag: true, //? 案件保存しているかを判定
      limitationList:1,
      isActive: false,
      hasError: true
    }
  },
  filters: {
    // * date型を文字に変換
    moment(value, format) {
      return moment(value).format(format);
    },
    //* 案件タイトル 文字制限
    truncateTitle: function(value) {
      var length = 60;
      var ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
    //* 案件タイトル 詳細 文字制限
    truncateDetailTitle: function(value) {
      var length = 70;
      var ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  mounted() {
    // * 投稿一覧取得
    axios.get(`${this.$baseURL}/job`, {
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
    .catch(error => {
      console.log(error)
    })
    // * プログラミング言語 取得
    axios.get(`${this.$baseURL}/programing_language`)
      .then(response => {
          this.languages = response.data
      })
    // * 開発ポジション 取得
    axios.get(`${this.$baseURL}/position_tag`)
      .then(response => {
          this.positions = response.data
      })
    if(localStorage.LoginName) this.name = localStorage.LoginName;
    if(localStorage.LoginPassword) this.age = localStorage.LoginPassword;
  },
  methods: {
    // * 検索する
    getParams(){
      const data = {
        position: this.selectedPosition,
        language: this.selectedLang,
        freeWord: this.freeWord
      }
      // const URL = 'http://localhost:8888/api/v1/job/?'
      // * クエリパラメーター
      axios.get(`${this.$baseURL}/job/?position_tag_id=${ data.position }&programing_language_id=${ data.language }&keyword=${ data.freeWord }#/`)
      .then(response => {
        setTimeout(() => {
          this.loading = false;
          this.jobs = response.data
        }, 1000);
      })
    },
    // * 案件を保存する
    saveJob(){
      const data = {
        jobId: this.jobDetail.id, 
        userId: 1 
      };
      axios.post(`${this.$baseURL}/favorite_job/`, data)
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
      const data = {
        jobId: this.jobDetail.id,
        userId: 1
      };
      axios.delete(`${this.$baseURL}/favorite_job/`,{data: {userId: 1, jobId: data.jobId}})
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
      // * 自分の案件かを判定
      axios.get(`${this.$baseURL}/job/?user_id=1`)
      .then(response => {
        for(let i = 0; i < response.data.length; i++) {
          this.selfJob = response.data[i]
          if(this.selfJob.id === this.id) {
            this.selfJobPost = true
          }
        }
      })

      // * 応募済みか応募済みでないかを判断
      axios.get(`${this.$baseURL}/apply_job/?user_id=1`)
      .then(response => {
        const arrayApply = []
        for(let c = 0; c < response.data.length; c++){
          const applyData = response.data[c];
          arrayApply.push(applyData.job.id)
        }
        if (arrayApply.includes(this.jobDetail.id)) {
          this.applyFlug = false
        } else {
          console.log("まだ応募していません")
        }
      })

    // * 保存済みか保存済みではないかを判定する
      axios.get(`${this.$baseURL}/favorite_job/?user_id=1`)
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
  },
  components: {
    Loading,
    Applybtn,
    ApplyModal,
    // SaveBtn
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
    display: none;
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

  /* 詳細検索 */
  .search-area {
    width: 100%;
    height: 52px;
    background-color: #ffffff;
    border-bottom: 1px solid #B9B9B9;
    position: absolute;
    top: 0;
    position: sticky;
    z-index: 10;
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
    box-shadow: 0 15px 30px -5px #2195f357, 0 0 5px #2195f357;
    transform: translateY(-4px);
    cursor: pointer;
  }
  .job-wrapper-center .router {
    /* width: 75%;
    height: 55%;
    background-color: yellow; */
    /* pointer-events: none; */
  }
  .job-wrapper-left {
    width: 43%;
    flex: 1 0 auto;
    align-items: center;
    justify-content: center;
    display: inline-block;
  }

  /* 案件詳細画面 */
  .job-wrapper-right {
    width: 52%;
    height: 88vh;
    margin-left: 2rem;
    background-color: #ffffff;
    /* display: inline-block; */
    /* position: absolute; */
    position: sticky;
    display: inline-block;
    /* margin-left: 1rem; */
    margin-bottom: 0.2rem;
    bottom: 0;
    border-radius: 5px / 5px;
    color: #111111;
    border: solid 1px #B9B9B9;
    text-align: left;
  }
  .job-wrapper-right .top-job-detail-area {
    width: calc(100% - 4rem);
    height: calc(17.5% - 2.5rem);
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
    height: calc(80% - 1rem);
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
    padding: 3px 23px;
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
    padding: 3px 23px;
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
    padding: 3px 23px;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }

  /* 応募するボタン */
  .btn-box-apply{
    background-color: #E91E63;
    padding: 0.75rem 2rem;
    /* background: -moz-linear-gradient(top, #E91E63, #e91e62ce);
    background: -webkit-linear-gradient(top, #E91E63, #e91e62ce);
    background: linear-gradient(to bottom, #E91E63, #e91e62ce); */
    border-radius: 6px;
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
    box-shadow:1px 1px 5px rgba(0, 0, 0, 0.363);
  }
  .btn-box-apply:hover {
    background: -moz-linear-gradient(top, #8C1BAB, #F761A1);
    background: -webkit-linear-gradient(top, #8C1BAB, #F761A1);
    background: linear-gradient(to bottom, #8C1BAB, #F761A1);
    transition: .3s;
    box-shadow:1px 1px 5px rgba(0, 0, 0, 0.685);
  }
  /* 応募済みボタン */
  .btn-box-apply-false{
    display: block;
    padding: 0.75rem 2rem;
    background: -moz-linear-gradient(top, #636363, #afafaf);
    background: -webkit-linear-gradient(top, #636363, #afafaf);
    background: linear-gradient(to bottom, #636363, #afafaf);
    border-radius: 6px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    margin-top: 4px;
    font-size: 1.1em;
    display: inline-block;
    cursor: pointer;
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
    height: 88vh;
    /* display: inline-block; */
    /* position: absolute; */
    position: sticky;
    display: inline-block;
    margin-left: 2rem;
    margin-bottom: 0.2rem;
    bottom: 0;
    border-radius: 5px / 5px;
    color: #111111;
    text-align: left;
  }
  .false-user-login {
    width: 100%;
    height: 50%;
    background-color: #ffffff;
    border: solid 1px #B9B9B9;
    border-radius: 5px / 5px;
    margin-bottom: 1rem;
  }
  .false-user-Advertisement {
    width: 100%;
    height: 50%;
    background-color: #ffffff;
    border: solid 1px #B9B9B9;
    border-radius: 5px / 5px;
    margin-bottom: 1rem;
  }

  /* 案件のカード */
  .job-cards.active {
    background-color: red;
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
    border-radius: 5px / 5px;
    transition: .3s;
    color: #111111;
  }
  .job-cards-top {
    width: calc(100% - 60px);
    height: calc(30% - 60px);
    text-align: left;
    padding: 2rem 2rem 1rem 1.5rem;
    font-weight: bold;
    pointer-events: none;
    font-size: 17px;
    text-decoration: underline;
    /* background-color: yellow; */
  }
  .job-cards-center {
    width: calc(100% - 40px);
    height: calc(35% - 20px);
    padding: 10px 1.5rem;
    text-align: left;
    pointer-events: none;
  }
  .job-cards-center .langage{
    margin: 5px 0px 0px 5px ;
    text-align: left;
    display: inline-block;
    color: #3F51B5;
    font-size: 12px;
    border: solid 1px #3F51B5;
    padding: 7px 23px;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }
  .job-cards-center .framework{
    margin: 5px 0px 0 5px ;
    text-align: left;
    display: inline-block;
    color: #2196F3;
    font-size: 12px;
    border: solid 1px #2196F3;
    padding: 7px 23px;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }
  .job-cards-center .skill{
    margin: 5px 0px 0 5px ;
    text-align: left;
    display: inline-block;
    color: #00BCD4;
    font-size: 12px;
    border: solid 1px #00BCD4;
    padding: 7px 23px;
    border-radius: 5px / 5px;
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
    font-weight: bold;
  }
  .job-cards-bottom .product-start-end .product-start-end-tag {
    display: inline-block;
    pointer-events: none;
    font-size: 14px;
  }
  .job-cards-bottom .product-start-end .product-start-end-time {
    display: inline-block;
    padding: 0 20px;
    pointer-events: none;
    font-size: 14px;
  }
  .job-cards-bottom .post-user-area {
    width: 100%;
    height: 60%;
    text-align: left;
    pointer-events: none;
    font-weight: bold;
    /* background-color: yellow; */
  }
  .job-cards-bottom .post-user-area .post-user-image {
    width: 55px;
    height: 100%;
    border-radius: 50%;
    background-color: #2196F3;
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
