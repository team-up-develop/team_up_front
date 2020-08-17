<template>
  <div class="manage-wrapper">
    <div v-if="loginFlag === true" class="job-manage-wrapper">
      <router-link to="/manage" class="router-no-link">
        <div class="manage-job-area">
          <p>管理案件</p> 
        </div>
      </router-link>
      <router-link to="/apply_job" class="router-link">
        <div class="apply-job-area">
          <p>応募案件</p>
        </div>
      </router-link>
      <router-link to="/favorite_job" class="router-link">
        <div class="save-job-area">
          <p>保存案件</p> 
        </div>
      </router-link>
      <div class="title-area">案件タイトル</div>
      <div class="time-area">開発期間</div>
      <div class="skill-area">開発言語</div>
        <router-link :to="`/manage/apply/${ jobs.id }`" v-for="jobs in manageJobs" :key="jobs.id" class="router">
          <div class="job-area">
            <div class="job-area-box">
              {{ jobs.jobTitle }}
            </div>
            <div class="job-area-box">
              {{ jobs.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ jobs.devEndDate | moment("YYYY年 M月 D日")}}
            </div>
            <div class="job-area-box">
              <div class="lang" v-for="langage in jobs.programingLanguage" :key="langage.id">
                {{ langage.programingLanguageName }}  ,
              </div>
            </div>
          </div>
        </router-link>
    </div>
    <div v-else>
      ログインが必要です！
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from "moment";
export default {
  data() {
    return {
      manageJobs: [],
      loginFlag: false
    }
  },
  filters: {
    moment(value, format) {
      return moment(value).format(format);
    }
  },
  mounted() {
    if( localStorage.userId !== undefined) {
      this.loginFlag = true
      axios.get('http://localhost:8888/api/v1/job/?user_id=1')
      .then(response => {
        this.manageJobs = response.data
      })
    }
  }
}
</script>

<style scoped>
.router-link :hover{
  opacity: 0.8;
}
.router-no-link {
  text-decoration: none;
  color: #ffffff;
}
.router-link {
  text-decoration: none;
  color: #ffffff;
}
.manage-wrapper {
  width: 92%;
  height: 89.5vh;
  margin: 0 auto;
  background-color: #F2F6F7;
}
.manage-wrapper .job-manage-wrapper {
  width: 95%;
  height: calc(90vh - 5rem);
  border-radius: 20px;
  margin: 2rem 2rem;
  background-color: #ffffff;
  float: right;
  border: solid 1px #B9B9B9;
  position: relative;
  /* padding: 0rem 4rem; */
}
.manage-wrapper .job-manage-wrapper .manage-job-area {
  width: 33.3%;
  height: calc(68px - 1.6rem);
  padding: 0.8rem 0;
  border-radius: 20px 0 0 0 ;
  background: -moz-linear-gradient(top, #1f5ae8, #2ac1df);
  background: -webkit-linear-gradient(top, #1f5ae8, #2ac1df);
  background: linear-gradient(to bottom, #1f5ae8, #2ac1df);
  display: inline-block;
  color: #ffffff;
  font-weight: bold;
}
.manage-wrapper .job-manage-wrapper .apply-job-area {
  width: 33.23%;
  height: calc(68px - 1.6rem);
  padding: 0.8rem 0;
  /* border-radius: 20px 0 0 0 ; */
  background-color: #606060;
  display: inline-block;
  color: #ffffff;
  border: 0.5px solid #ffffff;
  font-weight: bold;
}
.manage-wrapper .job-manage-wrapper .save-job-area {
  width: 33.3%;
  height: calc(68px - 1.6rem);
  padding: 0.8rem 0;
  border-radius: 0 20px 0 0 ;
  background-color: #606060;
  display: inline-block;
  color: #ffffff;
  font-weight: bold;
}
.title-area {
  width: 33.3%;
  height: calc(48px - 1.8rem);
  padding: 0.8rem 0;
  background: -moz-linear-gradient(top, #1f5ae8, #2ac1df);
  background: -webkit-linear-gradient(top, #1f5ae8, #2ac1df);
  background: linear-gradient(to bottom, #1f5ae8, #2ac1df);
  display: inline-block;
  color: #ffffff;
  font-weight: bold;
}
.time-area {
  width: 33.2%;
  height: calc(48px - 1.8rem);
  padding: 0.8rem 0;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
  background: -moz-linear-gradient(top, #1f5ae8, #2ac1df);
  background: -webkit-linear-gradient(top, #1f5ae8, #2ac1df);
  background: linear-gradient(to bottom, #1f5ae8, #2ac1df);
  display: inline-block;
  color: #ffffff;
  font-weight: bold;
}
.skill-area {
  width: 33.3%;
  height: calc(48px - 1.8rem);
  padding: 0.8rem 0;
  background: -moz-linear-gradient(top, #1f5ae8, #2ac1df);
  background: -webkit-linear-gradient(top, #1f5ae8, #2ac1df);
  background: linear-gradient(to bottom, #1f5ae8, #2ac1df);
  display: inline-block;
  color: #ffffff;
  font-weight: bold;
}

.job-title-area {
  width: 33.3%;
  height: 70%;
  display: inline-block;
  /* background-color: yellow; */
}
.router :hover{
  background-color: rgba(238, 255, 0, 0.74);
}
.job-area .job-area-box {
  width: 33.25%;
  border-bottom: 1px solid #9c9c9c;
  border-right: 1px solid #9c9c9c;
  height: calc(48px - 1.6rem);
  padding: 0.8rem 0;
  color: #111111;
  font-weight: bold;
  display: inline-block;
  pointer-events: none;
}
.lang {
  display: inline-block;
}
</style>