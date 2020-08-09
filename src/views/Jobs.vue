<template>
  <div class="wrapper">
    <router-link :to="`/jobs/${ job.id }`" v-for="job in jobs" class="router" :key="job.id">
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
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import moment from "moment";
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
      age: 0
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
          this.jobs = response.data
        }, 1000);
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
        this.jobs = response.data
      })
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  .wrapper {
    width: 82%;
    /* background-color: #00ff227e; */
    position: absolute;
    right: 0;
  }
  .job-cards {
    width: 42%;
    height: 280px;
    display: inline-block;
    margin: 5px;
    border: solid 1px #B9B9B9;
    background-color: #ffffff;
    border-radius: 10px / 10px;
  }
  .job-cards-top {
    width: calc(100% - 60px);
    height: calc(25% - 60px);
    text-align: left;
    padding: 30px;
    font-weight: bold;
  }
  .job-cards-center {
    width: calc(100% - 40px);
    height: calc(35% - 20px);
    padding: 10px 20px;
    /* background-color: rgba(128, 128, 128, 0.733); */
    text-align: left;
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
  }
  .job-cards-bottom {
    width: calc(100% - 50px);
    height: calc(38% - 20px);
    padding: 10px 25px;
  }
  .job-cards-bottom .product-start-end {
    width: 100%;
    height: 40%;
    text-align: left;
  }
  .job-cards-bottom .product-start-end .product-start-end-tag {
    display: inline-block;
  }
  .job-cards-bottom .product-start-end .product-start-end-time {
    display: inline-block;
    padding: 0 20px;
  }
  .job-cards-bottom .post-user-area {
    width: 100%;
    height: 60%;
    text-align: left;
  }
  .job-cards-bottom .post-user-area .post-user-image {
    width: 12%;
    height: 100%;
    border-radius: 50%;
    background-color: #00A1D6;
    display: inline-block;
  }
  .job-cards-bottom .post-user-area .post-user-name-area {
    display: inline-block;
    width: calc(80% - 40px);
    height: 60%;
    padding: 0 20px;
    position: relative;
  }
  .job-cards-bottom .post-user-area .post-user-name-area .post-user-name {
    position: absolute;
    top: 0;
  }
}

.job-wrapper{
  width: 90%;
  margin: 0 auto;
  height: 100%;
}

.left-container{
  width: 20%;
  height: 500px;
  float: left;
}
.main-container{
  width: 80%;
  height: 100%;
  margin-top: 20px;
  display: inline-block;
  margin-bottom: 70px;
}
.router{
  text-decoration: none;
  color: rgb(73, 73, 73);
}

.job-box{
  background-color: #FFFFFF;
  width: 90%;
  float: right;       
  box-shadow: 0px 0px 0px grey;
  box-shadow: 0 0 0px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22);
  margin: 7px;
  padding: 20px;
	transition: .3s;
  position: relative;
}

.left-box{
  width: 10%;
  /* height: 120px; */
  /* display: inline-block; */
  float: left;
}
.user-profile-image{
  width: 80px;
  height: 80px;
  background-color: grey;
  border-radius: 50%;
}

.right-box{
  width: 66.6%;
  padding: 10px;
  /* height: 120px; */
  /* display: inline-block; */
  float: right;
  text-align: left;
}
.username-area{
  width: 100%;
  height: 30px;
  font-size: 14px;
  color: #818181;
  font-weight: bold;
}
.title-area{
  width: 100%;
  color: #506690;
  font-size: 16px;
  font-weight: bold;
  /* height: 100%; */
}
.bottom-area{
  width: 100%;
  margin-top: 20px;
  /* height: 70px; */
}
.bottom-left{
  width: 100%;
  /* display: inline-block; */
}
.bottom-right{
  width: 100%;
  /* display: inline-block; */
}

.icon{
  display: inline-block;
  color: #2AC1DF;
  font-size: 20px;
}


.sub-times{
  margin: 20px 0px 0 5px ;
  text-align: left;
  display: inline-block;
  font-size: 16px;
  padding: 7px;
  border-radius: 5%;
  font-weight: bold;
  color: #818181;
}



.btn-area{
  width: 21%;
  /* height: 100px; */
  float: right;
  /* background-color: #bae35b9f; */
}
.save-btn{
  width: 62%;
  /* background:linear-gradient(#bae35b, #0bbe78); */
  border-radius: 12px;
  padding: 6px;
  font-size: 12px;
  /* color: #FFFFFF; */
  display: inline-block;
  text-align: center;
  margin: 0 6%;
  font-weight: bold;
  background-color: #ffffff;
  color: #1f5abc;
  border-radius: 12px;
  padding: 5px 12px;
  font-size: 12px;
  text-align: center;
  border: solid 1px #1f5abc;
}


.job-box:hover{
  opacity: 0.8;
  box-shadow: 0 15px 30px -5px rgba(0,0,0,.15), 0 0 5px rgba(0,0,0,.1);
	transform: translateY(-4px);
}

</style>
