<template>
  <div class="detail-wrapper" v-show="loading">
  <div class="job-wrapper-left">
    <!-- <div v-for="job in jobs" class="router" :key="job.id"> -->
    <router-link :to="`/jobs/${ job.id }`" v-for="job in jobs" class="router" :key="job.id">
      <div class="job-cards" @click="getJob">
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
    <div class="detail-post-user-area">
      <div class="detail-tag">投稿者</div>
      <div class="post-user-area">
        <div class="left-user-area">
          <div class="user-image"></div>
        </div>
        <div class="right-user-area">
          <div class="user-profile-area">
            <div class="user-name-are">
              <div class="user-name-tag">名前</div>
              <div class="user-name">
                {{ job.user.userName }}
              </div>
            </div>
            <div class="user-study-area">
              <div class="study-tag">学習開始</div>
              <div class="stydy-time">
                {{ job.user.learningStartDate | moment("YYYY年 M月 D日") }}
              </div>
            </div>
            <div class="user-introduce-area">
              <div class="introduce-tag">自己紹介</div>
              <div class="introduce">
                {{ job.user.bio }}
              </div>
            </div>
          </div>
          <div class="user-url-area">
            <div class="user-github"><a v-bind:href="job.user.githubAccount" class="router">GitHub</a></div>
            <div class="user-twtter"><a v-bind:href="job.user.twitterAccount" class="router">Twiiter</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-post-skill-area">
      <div class="detail-tag">開発技術</div>
      <div class="skill-detail-area">
        <div class="lang-area">
          <label for="name" class="name-tag">開発言語</label>
          <div class="lang-box">
            <div class="skill-tag"  v-for="langage in job.programingLanguage" :key="langage.id">
              {{ langage.programingLanguageName }}
            </div>
          </div>
        </div>
        <div class="lang-area">
          <label for="name" class="name-tag">フレームワーク</label>
          <div class="lang-box">
            <div class="flame-tag" v-for="framework in job.programingFramework" :key="framework.programingFrameworkName">
              {{ framework.programingFrameworkName }}
            </div>
          </div>
        </div>
        <div class="lang-area">
          <label for="name" class="name-tag">その他関連スキル</label>
          <div class="lang-box">
            <div class="other-tag" v-for="skill in job.skill" :key="skill.skillName">
              {{ skill.skillName }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-post-detail-area">
      <div class="detail-area">
        <div class="detail-tag">開発詳細</div>
        <div class="dev-detail-area">
          <div class="detail-leff-area">
            <div class="detail-information">
              <div class="tag">タイトル</div>
              <div class="sub-area">{{ job.jobTitle }}</div>
            </div>
            <div class="detail-information">
              <div class="tag">募集人数</div>
              <div class="sub-area">{{ job.recruitmentNumbers }}人</div>
            </div>
            <div class="detail-information">
              <div class="tag">応募ケース</div>
              <div class="sub-area">新規開発</div>
            </div>
            <div class="detail-information">
              <div class="tag">開発期間</div>
              <div class="sub-area">{{ job.devStartDate | moment("YYYY年 M月 D日") }} ~ {{ job.devEndDate  | moment("YYYY年 M月 D日")}}</div>
            </div>
          </div>
          <div class="detail-right-area">
            <div class="tag">募集内容詳細</div>
            <div class="description">
              {{ job.jobDescription }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-area">
        <div v-if="loginFlag === true" class="button-action-area">
          <div class="" v-if="selfJobPost">
            案件管理画面へ遷移先を作成する
          </div>
          <div v-else>
            <button @click="openModal" class="btn-box-apply" v-if="applyFlug">応募する</button>
            <div class="btn-box-apply-false" v-if="applyFlug == false">
              応募済み
            </div>
            <save-btn :jobId='id' class="btn"></save-btn>
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
        </div>
        <div v-else>
          ログインが必要です！
        </div>
    </div>
  <Loading v-show="!loading">
  </Loading>
  </div>
</template>

<script>
import axios from 'axios'
import moment from "moment";
import Applybtn from '@/components/Applybtn'
import SaveBtn from '@/components/SaveBtn'
import Loading from '@/components/Loading'
import ApplyModal from '@/components/ApplyModal'
export default {
  props: {
    id: Number,
  },
  data() {
    // const formats = [
    //   "YYYY年 M月 D日",
    // ];
    return {
      job: null,
      selfJobPost: false, //? 自分の案件かを判定
      loginFlag: false, //? ログインしているかを判定
      loading: false,
      applyFlug: true,
      modal: false,
      jobs: []
    }
  },
  filters: {
    moment(value, format) {
      return moment(value).format(format);
    }
  },
  created() {
    // * 詳細画面情報を取得
    axios.get(`${this.$httpPosts}/${this.id}/`)
      .then(response => {
          this.loading = true;
          this.job = response.data
      })
    // * 自分の案件かを判定
    axios.get('http://localhost:8888/api/v1/job/?user_id=1')
    .then(response => {
      for(let i = 0; i < response.data.length; i++){
        const selfJob = response.data[i]
        if(selfJob.id === this.id){
          this.selfJobPost = true
        }
      }
    })
  },
  mounted() {
    //* ログインしている時だけ、ボタンを表示する
    if( localStorage.userId !== undefined) {
      this.loginFlag = true
    // * ログインユーザーが応募済みか応募済みではないかを判定する
      axios.get('http://localhost:8888/api/v1/apply_job/?user_id=1')
      .then(response => {
        const arrayApply = []
        for(let c = 0; c < response.data.length; c++){
          const applyData = response.data[c];
          arrayApply.push(applyData.job.id)
        }
        if (arrayApply.includes(this.id)) {
          this.applyFlug = false
        } else {
          console.log("まだ応募していません")
        }
      })
    }
    // * 投稿一覧取得
    axios.get('http://localhost:8888/api/v1/job', {
      headers: {
        Authorization: `Bearer ${ localStorage.userId }`
      }
    })
    .then(response => {
      this.jobs = response.data
    })
  },
  methods: {
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
        this.closeModal()
      },
    getJob() {
      console.log(this.id)
      axios.get(`${this.$httpPosts}/${this.id}/`)
        .then(response => {
          this.loading = true;
          this.job = response.data
          console.log(this.job)
        })
    }
  },
  components: {
    Applybtn,
    SaveBtn,
    Loading,
    ApplyModal,
  }
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  .router {
    text-decoration: none;
    color: #FFFFFF;
  }
  .detail-wrapper {
    width: 85%;
    /* background-color: #F2F6F7; */
    background-color: #F2F6F7;
    padding: 3.5rem 7rem;
    margin: 0 auto;
  }
  .detail-wrapper .detail-post-user-area {
    width: 90%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto;
  }
  .detail-tag {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0.7rem;
    color: #00A1D6;
  }
  /* 投稿者 カード中身 */
  .detail-wrapper .detail-post-user-area  .post-user-area {
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    border: 1px solid #B9B9B9;
    padding: 2rem 4rem;
    margin-bottom: 2rem;
    position: relative;
  }
  /* ユーザー画像 start*/
  .post-user-area .left-user-area {
    width: 20%;
    height: 100%;
  }
  .post-user-area .left-user-area .user-image {
    width: 130px;
    height: 130px;
    background-color: #00A1D6;
    border-radius: 50%;
  }
  /* ユーザー画像  end*/
  /* ユーザー 詳細情報 start */
  .post-user-area .right-user-area {
    width: 70%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 2rem 4rem 2rem 2rem;
    text-align: left;
  }
  .post-user-area .right-user-area .user-profile-area {
    width: 65%;
    height: 100%;
    display: inline-block;
  }
  .user-profile-area .user-name-are {
    width: 45%;
    display: inline-block;
  }
  .user-profile-area .user-name-are .user-name-tag {
    font-weight: bold;
  }
  .user-profile-area .user-name-are .user-name{
    margin-top: 0.2rem;
  }
  .user-profile-area .user-study-area {
    width: 45%;
    display: inline-block;
  }
  .user-profile-area .user-study-area .study-tag {
    font-weight: bold;
    width: 45%;
  }
  .user-profile-area .user-study-area .stydy-time {
    margin-top: 0.2rem;
  }
  .user-profile-area .user-introduce-area {
    margin-top: 3.2rem;
  }
  .user-profile-area .user-introduce-area .introduce-tag {
    font-weight: bold;
  }
  .user-profile-area .user-introduce-area .introduce {
    margin-top: 0.2rem;
  }
  .post-user-area .right-user-area .user-url-area {
    display: inline-block;
    width: 30%;
    position: absolute;
    top: 0;
    padding: 2.2rem 0 0 0 ;
  }
  .post-user-area .right-user-area .user-url-area .user-github {
    width: 55%;
    padding: 0.8rem 1.8rem;
    background-color: #24292e;
    border-radius: 8px;
    margin-right: 10px;
    color: #FFFFFF;
    text-align: center;
    box-shadow: 10px 5px 5px grey;
    box-shadow: 0 0 3px 0 rgba(122, 122, 122, 0.705), 0 2px 3px 0 rgba(156, 156, 156, 0.993);
    font-weight: bold;
    cursor: pointer;
  }
  .post-user-area .right-user-area .user-url-area .user-github :hover {
    opacity: 0.8;
  }
  .post-user-area .right-user-area .user-url-area .user-twtter {
    margin-top: 2rem;
    width: 68%;
    padding: 0.8rem;
    background-color: #1DA1F2;
    border-radius: 8px;
    color: #FFFFFF;
    text-align: center;
    box-shadow: 10px 5px 5px grey;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
    font-weight: bold;
    cursor: pointer;
  }
  .post-user-area .right-user-area .user-url-area .user-twtter :hover {
    opacity: 0.8;
  }
  /* スキル カード */
  .detail-wrapper .detail-post-skill-area {
    width: 90%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto 2rem auto;
  }
  .detail-wrapper .detail-post-skill-area .skill-detail-area{
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    border: 1px solid #B9B9B9;
    padding: 2rem 4rem 1rem 4rem;
    margin-bottom: 2rem;
    position: relative;
  }
  .skill-detail-area .lang-area {
    width: 100%;
    position: relative;
  }
  .skill-detail-area .lang-area .name-tag{
    font-weight: bold;
    text-align: left;
    position: absolute;
    left: 0;
  }
  .skill-detail-area .lang-area .lang-box{
    width: 95%;
    text-align: left;
    /* height: 200px; */
    padding: 10px 20px 30px 0;
  }
  .skill-detail-area .lang-area .lang-box .skill-tag{
    margin-top: 1rem;
    width: 100px;
    padding: 0.5rem 0.8rem;
    border-radius: 20px;
    margin-right: 10px;
    color: #004098;
    display: inline-block;
    border: 1px solid #004098;
    text-align: center;
  }
  .skill-detail-area .lang-area .lang-box .flame-tag{
    margin-top: 1rem;
    width: 100px;
    padding: 0.5rem 0.8rem;
    border-radius: 20px;
    margin-right: 10px;
    color: #00A7EA;
    display: inline-block;
    border: 1px solid #00A7EA;
    text-align: center;
  }
  .skill-detail-area .lang-area .lang-box .other-tag{
    margin-top: 1rem;
    width: 100px;
    padding: 0.5rem 0.8rem;
    border-radius: 20px;
    margin-right: 10px;
    color: #8D93C8;
    display: inline-block;
    border: 1px solid #8D93C8;
    text-align: center;
  }
  /* 開発詳細 カード */
  .detail-wrapper .detail-post-detail-area {
    width: 90%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto;
  }
  .detail-wrapper .detail-post-detail-area .dev-detail-area {
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    border: 1px solid #B9B9B9;
    padding: 1rem 4rem;
    margin-bottom: 2rem;
    position: relative;
  }
  .dev-detail-area .detail-leff-area {
    display: inline-block;
    width: 50%;
  }
  .dev-detail-area .detail-leff-area .detail-information {
    margin-top: 1px;
    padding: 2rem 0;
    position: relative;
  }
  .tag{
    font-weight: bold;
    display: inline-block;
  }
  .detail-information .sub-area{
    width: 75%;
    position: absolute;
    right: 0;
    display: inline-block;
  }
  .dev-detail-area .detail-right-area {
    line-height: 1.8;
    width: calc(50% - 5rem);
    display: inline-block;
    position: absolute;
    top: 0;
    padding: 2.5rem 5rem 0 0 ;
  }
  /* ボタン エリア */
  .button-area {
    width: 100%;
  }
  .button-area .button-action-area {
    margin: 2rem auto 1rem auto;
    width: 70%;
    /* background-color: yellow; */
  }
  .btn {
    width: 45%;
    margin-left: 7rem;
    display: inline-block;
  }
  /* 応募するボタン */
  .btn-box-apply{
    padding: 1.4rem 5rem;
    background: -moz-linear-gradient(top, #FF512F, #DD2476);
    background: -webkit-linear-gradient(top, #FF512F, #DD2476);
    background: linear-gradient(to bottom, #FF512F, #DD2476);
    border-radius: 50px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1.3rem;
    display: inline-block;
    cursor: pointer;
    border: none;
  }
  /* 応募済みボタン */
  .btn-box-apply-false{
    display: block;
    padding: 1.4rem 5rem;
    background: -moz-linear-gradient(top, #3d3d3d, #d4d4d4);
    background: -webkit-linear-gradient(top, #3d3d3d, #d4d4d4);
    background: linear-gradient(to bottom, #3d3d3d, #d4d4d4);
    border-radius: 50px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1.3rem;
    display: inline-block;
    cursor: pointer;
  }
  /* モーダル内のキャンセルボタン */
  .modal-btn {
    padding: 1rem 2.4rem;
    background: -moz-linear-gradient(top, #1f5ae8, #2ac1df);
    background: -webkit-linear-gradient(top, #1f5ae8, #2ac1df);
    background: linear-gradient(to bottom, #1f5ae8, #2ac1df);
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

</style>