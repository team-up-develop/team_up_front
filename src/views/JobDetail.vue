<template>
  <div class="wrapper">
    <div class="left-container">
      <!-- <Search></Search> -->
    </div>
    <div class="main-container">
      <div class="detail-wrapper" v-if="job" :key="product">
        <div class="tag-box">投稿者</div>
        <div class="user-detail-area">
          <div class="left-user">
            <div class="user-image"></div>
          </div>
          <div class="right-user">
            <div class="user-name">
              <!-- {{ job.user.userName }} -->
            </div>
            <div class="user-url">
              <div class="user-github">github</div>
              <div class="user-twtter">Twiter</div>
            </div>
            <div class="study-tag">学習開始</div>
            <div class="stydy-time">
              {{ job.user.learningStartDate | moment("YYYY年 M月 D日") }}
            </div>
          </div>
        </div>
        <div class="tag-box">開発技術</div>
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
        <div class="tag-box">開発詳細</div>
        <div class="dev-detail-area">
          <div class="member-area">
            <div class="sub-engenier">
              <div class="tag">募集人数</div>
              <div class="sub-area">2人</div>
            </div>
            <div class="sub-engenier">
              <div class="tag">連絡ツール</div>
              <div class="sub-area">{{ job.communicationTool.toolName }}</div>
            </div>
            <div class="sub-engenier">
              <div class="tag">応募ケース</div>
              <div class="sub-area">新規開発</div>
            </div>
            <div class="sub-engenier">
              <div class="tag">稼働時間</div>
              <div class="sub-area">4時間</div>
            </div>
          </div>
          <div class="content-area">
            <div class="tag-content">募集内容詳細</div>
            <div class="content-detail">
              {{ job.jobDescription }}
            </div>
          </div>
        </div>
        <div class="tag-box">開発カレンダー</div>
        <div class="calendar-area">
        </div>
        <div v-if="loginFlag === true">
          <div class="button-area" v-if="selfJobPost">
            <applybtn :jobId='id'></applybtn>
            <!-- <router-link to="/Register" class="register"> -->
            <!-- </router-link> -->
            <!-- <router-link to="/Register" class="register"> -->
            <div class="btn-box-save" @click="saveJob" v-if="flag">
              保存する
            </div>
            <div class="btn-box-save-false" @click="deleteJob" v-if="flag == false">
              削除する
            </div>
              <!-- <SaveBtn></SaveBtn> -->
            <!-- </router-link> -->
          </div>
          <div class="button-area" v-else>
            自分の案件です
          </div>
        </div>
      <div v-else>
        ログインが必要です！
      </div>
      </div>
      <div v-else class="load-box">
        <p>ローディング</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from "moment";
import Applybtn from '@/components/Applybtn'
export default {
  props: {
    id: Number,
    // id: {type: Number},
  },
  data() {
    // const formats = [
    //   "YYYY年 M月 D日",
    // ];
    return {
      job: null,
      flag: true,
      applyFlug: true,
      selfJobPost: true,
      loginFlag: false,
    }
  },
  filters: {
    moment(value, format) {
      return moment(value).format(format);
    }
  },
  created() {
    axios.get(`${this.$httpPosts}/${this.id}/`)
        .then(response => {
          this.job = response.data
        })
        .then(data => {
          console.log(data)
        })
    axios.get('http://localhost:8888/api/v1/job/?user_id=1')
    .then(response => {
      for(let i = 0; i < response.data.length; i++){
        console.log(response.data[i])
        const selfJob = response.data[i]
        console.log(selfJob.id)
        if(selfJob.id === this.id){
          console.log("一致")
          this.selfJobPost = false
        }
      }
    })
  },
  mounted() {
    // * 保存されているか否かを判断するための処理
    // ! ログインしている時だけ、ボタンを表示する
    if( localStorage.userId !== undefined) {
      this.loginFlag = true
      axios.get('http://localhost:8888/api/v1/favorite_job/?user_id=1')
      .then(response => {
        // console.log(response.data)
        const array = []
        for(let i = 0; i < response.data.length; i++){
          // console.log(response.data[i])
          const likeData = response.data[i]
          array.push(likeData.job.id)
        }
        // console.log(array)
        if(array.includes(this.job.id)){
          this.flag = false
        }
        else{
          this.flag = true
        }
      })
      .then(data => {
        console.log(data)
      })
    }
  },
  methods: {
    //* 案件保存
    saveJob(){
      const data = {
        jobId: this.job.id, //? 案件ID
        userId: 1 //? User_ID
      };
      axios.post('http://localhost:8888/api/v1/favorite_job/', data)
      .then(response => {
        // ? 案件削除判定
        this.flag = false
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
      // console.log(this.job.id)
    },
    // * 案件保存削除
    deleteJob() {
      const data = {
        jobId: this.job.id,
        userId: 1
      };
      axios.delete('http://localhost:8888/api/v1/favorite_job/',{data: {userId: 1, jobId: data.jobId}})
      .then(response => {
        // ? 案件削除判定
        this.flag = true
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  components: {
    Applybtn
  }
}
</script>

<style scoped>
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
.detail-wrapper{
  width: 90%;
  margin: 0 auto;
  /*
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
  padding: 30px;
  margin-bottom: 20px; */
}
.user-detail-area{
  width: 100%;
  /* height: 129px; */
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
  padding: 30px;
  margin-bottom: 40px;
  position: relative;
}

.skill-detail-area{
  width: 100%;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
  padding: 30px;
  margin-bottom: 40px;
}
.dev-detail-area{
  width: 100%;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
  padding: 30px;
  margin-bottom: 40px;
}

.tag-box{
  text-align: left;
  font-weight: bold;
  color: #00bfff;
  font-size: 20px;
  margin-bottom: 4px;
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

.user-image{
  width: 130px;
  height: 130px;
  background-color: grey;
  border-radius: 50%;
}
.user-name{
  width: 40%;
  font-size: 22px;
  color: #818181;
  display: inline-block;
  font-weight: bold;
}
.user-url{
  width: 54%;
  height: 40px;
  color: #818181;
  /* float: right; */
  display: inline-block;
}
.user-github{
  width: 120px;
  height: 20px;
  padding: 9px;
  background-color: #24292e;
  border-radius: 8px;
  margin-right: 10px;
  color: #FFFFFF;
  display: inline-block;
  text-align: center;
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
  text-align: center;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
}
.study-tag{
  color: #818181;
  margin-top: 33px;
  font-weight: bold;
  font-size: 20px;
}
.stydy-time{
  width: 80%;
  padding: 10px;
  color: #818181;
  font-size: 18px;
  font-weight: bold;
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
.button-area{
  width: 80%;
  height: 80px;
  margin: 0 auto;
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
.user-github{
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
}

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
.lang-box{
  width: 95%;
  text-align: left;
  /* height: 200px; */
  padding: 10px 20px 30px 20px;
  /* background-color: rgba(0, 128, 0, 0.479); */
}


.lang-area{
  width: 100%;
  position: relative;
}
.name-tag{
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  color: rgb(112, 113, 116);
  position: absolute;
  left: 0;
}
.skill-tag{
  width: 100px;
  padding: 9px;
  margin-top: 20px;
  background-color: #00bfff;
  border-radius: 4px;
  margin-right: 10px;
  color: #FFFFFF;
  display: inline-block;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(122, 122, 122, 0.705), 0 2px 3px 0 rgba(156, 156, 156, 0.993);
}
.flame-tag{
  width: 100px;
  padding: 9px;
  margin-top: 20px;
  background: #1e90ff;
  border-radius: 4px;
  margin-right: 10px;
  color: #FFFFFF;
  display: inline-block;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(122, 122, 122, 0.705), 0 2px 3px 0 rgba(156, 156, 156, 0.993);
}
.other-tag{
  width: 100px;
  padding: 9px;
  margin-top: 20px;
  background: #00ced1;
  border-radius: 4px;
  margin-right: 10px;
  color: #FFFFFF;
  display: inline-block;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(122, 122, 122, 0.705), 0 2px 3px 0 rgba(156, 156, 156, 0.993);
}

/* メンバー募集人員 */
.member-area{
  width: 100%;
  margin: 0 auto;
  height: 200px;
}
.sub-engenier{
  width: 49%;
  height: 100px;
  display: inline-block;
  position: relative;
}
.sub-area{
  text-align: left;
  margin-top: 30px;
  color: rgb(112, 113, 116);
  width: 200px;
  padding: 9px;
  background: rgba(255, 255, 255, 0.842);
  border-radius: 8px;
  margin-right: 10px;
  margin-left: 20px;
  box-shadow: 10px 5px 5px grey;
  box-shadow: 0 0 3px 0 rgba(122, 122, 122, 0.705), 0 2px 3px 0 rgba(156, 156, 156, 0.993);
}
.tag{
  position: absolute;
  left: 0;
  font-weight: bold;
  color: rgb(112, 113, 116);
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