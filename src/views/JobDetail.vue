<template>
<div>
  <div class="detail-wrapper" v-show="loading">
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
            <div class="user-github">Github</div>
            <div class="user-twtter">Twiter</div>
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
              <div class="tag">募集人数</div>
              <div class="sub-area">2人</div>
            </div>
            <div class="detail-information">
              <div class="tag">連絡ツール</div>
              <div class="sub-area">{{ job.communicationTool.toolName }}</div>
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
            <applybtn :jobId='id' class="btn"></applybtn>
            <save-btn :jobId='id' class="btn"></save-btn>
          </div>
        </div>
        <div v-else>
          ログインが必要です！
        </div>
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
        setTimeout(() => {
          this.loading = true;
          this.job = response.data
        }, 100);
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
    }
  },
  components: {
    Applybtn,
    SaveBtn,
    Loading
  }
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  .detail-wrapper {
    width: 82.75%;
    position: absolute;
    right: 0;
    top: 0;
    /* background-color: #F2F6F7; */
    background-color: #F2F6F7;
    padding: 3.5rem 0;
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
    background-color: red;
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
  .lang-area{
    width: 100%;
    position: relative;
  }
  .lang-box{
    width: 95%;
    text-align: left;
    /* height: 200px; */
    padding: 10px 20px 30px 0;
  }
  .name-tag{
    font-weight: bold;
    text-align: left;
    position: absolute;
    left: 0;
  }
  .skill-tag{
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
  .flame-tag{
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
  .other-tag{
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
  .detail-wrapper .detail-post-detail-area {
    width: 90%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto;
  }
  .dev-detail-area{
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    border: 1px solid #B9B9B9;
    padding: 1rem 4rem;
    margin-bottom: 2rem;
    position: relative;
  }
  .detail-leff-area {
    display: inline-block;
    width: 50%;
  }
  .detail-information {
    margin-top: 1px;
    padding: 2rem 0;
    position: relative;
  }
  .tag{
    font-weight: bold;
    display: inline-block;
  }
  .sub-area{
    width: 75%;
    position: absolute;
    right: 0;
    display: inline-block;
  }
  .detail-right-area {
    line-height: 1.8;
    width: calc(50% - 5rem);
    display: inline-block;
    position: absolute;
    top: 0;
    padding: 2.5rem 5rem 0 0 ;
  }
  .button-area{
    width: 100%;
  }
  .button-action-area {
    margin: 2rem auto 1rem auto;
    width: 80%;
  }
  .btn {
    width: 50%;
    display: inline-block;
  }
}

.wrapper {
  width: 90%;
  margin: 0 auto;
  height: 100%;
  /* background-color: #ffffff; */
  /* position: relative; */
}
.left-container{
  width: 25%;
  height: 500px;
  /* display: inline-block; */
  /* top: 0;
  left: 0; */
  float: left;
}
.main-container{
  width: 75%;
  height: 100%;
  margin-top: 20px;
  /* position: absolute; */
  display: inline-block;
}








.left-user{
  width: 20%;
  height: 100%;
  /* display: inline-block; */
}
.right-user{
  width: 70%;
  /* display: inline-block; */
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px 30px 20px 20px;
  text-align: left;
  
}



.calendar-area{
  width: 100%;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
  padding: 30px;
  margin-bottom: 40px;
}
.btn-box-save{
  display: block;
  padding: 18px 65px;
  background: linear-gradient(90deg,#1f5ae8,#2ac1df);
  border-radius: 25px;
  font-size: .875rem;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  display: inline-block;
  margin: 0 40px;
}
.btn-box-save-false{
  display: block;
  padding: 18px 65px;
  background: linear-gradient(90deg,#3d3d3d,#d4d4d4);
  border-radius: 25px;
  font-size: .875rem;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  display: inline-block;
  margin: 0 40px;
}
.register{
  color: #fff;
  text-decoration: none;
}
.btn-box-apply{
  display: block;
  padding: 18px 65px;
  background: linear-gradient(90deg,#ef6443,#f09819);
  border-radius: 25px;
  font-size: .875rem;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  display: inline-block;
  margin: 0 40px;
}







.top-area{
  width: 100%;
  height: 70px;
  /* background-color: rgba(0, 92, 128, 0.459); */
  position: relative;
}
.top-left{
  width: 200px;
  height: 60%;
  /* background-color: aqua; */
  text-align: left;
}
/* .user-image{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(136, 136, 136);
  display: inline-block;
  margin-top: 10px;
} */
.top-right{
  width: 400px;
  height: 60%;
  position: absolute;
  top: 0;
  margin-top: 10px;
  right: 0;
}
/* .user-github{
  width: 120px;
  height: 20px;
  padding: 9px;
  background-color: #24292e;
  border-radius: 8px;
  margin-right: 10px;
  color: #FFFFFF;
  display: inline-block;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(122, 122, 122, 0.705), 0 2px 3px 0 rgba(156, 156, 156, 0.993);
}
.user-twtter{
  width: 120px;
  height: 18px;
  padding: 10px;
  background-color: #1DA1F2;
  border-radius: 8px;
  color: #FFFFFF;
  display: inline-block;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
} */

/* タイトル */
.title-area{
  width: 95%;
  margin: 15px auto;
  text-align: left;
  font-size: 20px;
}

/* スキル欄 */
.skill-area{
  width: 93%;
  /* height: 400px; */
  /* background-color: rgba(255, 255, 0, 0.685); */
  text-align: left;
  padding: 30px 10px 10px 10px;
  margin: 0 auto;
  position: relative;
}


/* メンバー募集人員 */
.member-area{
  width: 100%;
  margin: 0 auto;
  height: 200px;
}

.content-area{
  width: 100%;
  margin: 0 auto;
  /* height: 100px; */
  /* background-color: green; */
  position: relative;
}
.tag-content{
  position: absolute;
  left: 0;
  color: rgb(112, 113, 116);
  font-weight: bold;
}
.content-detail{
  /* height: 50%; */
  /* background-color: rgba(29, 160, 242, 0.685); */
  padding: 25px 30px 50px 30px;
  /* position: absolute;
  bottom: 0; */
  text-align: left;
}


</style>