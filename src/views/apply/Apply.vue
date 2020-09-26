<template>
  <div class="manage-wrapper">
    <div v-if="loginFlag === true" class="job-manage-wrapper">
      <router-link to="/manage" class="router-link">
        <div class="manage-job-area">
          <p>管理案件</p> 
        </div>
      </router-link>
      <div class="apply-job-area">
        <p>応募案件</p>
      </div>
      <router-link to="/manage/favorite_job" class="router-link">
      <div class="save-job-area">
        <p>保存案件</p> 
      </div>
      </router-link>
      <div class="title-area">案件タイトル</div>
      <div class="time-area">開発期間</div>
      <div class="skill-area">開発言語</div>
      <div class="job-wrapper-area">
        <router-link :to="`/manage/apply_job/${ applyJob.jobId }`" v-for="applyJob in applyJobArray" :key="applyJob.id" class="router">
          <div class="job-area">
            <div class="job-area-box">
              {{ applyJob.job.jobTitle | truncateTitle }}
            </div>
            <div class="job-area-box">
              {{ applyJob.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ applyJob.devEndDate | moment("YYYY年 M月 D日")}}
            </div>
            <div class="job-area-box">
              <div class="lang"
                v-for="(langage, index) in applyJob.job.programingLanguage.slice(0,3)" 
                :key="`langage-${index}`"
              >
                {{ langage.programingLanguageName }}  ,
              </div>
              <div class="lang" 
                v-for="(framework, index) in applyJob.job.programingFramework.slice(0,3)" 
                :key="`framework-${index}`"
              >
                {{ framework.programingFrameworkName }}  ,
              </div>
            </div>
          </div>
        </router-link>
      </div>
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
    // const formats = [
    //   "YYYY年 M月 D日",
    // ];
    return {
      applyJobs: [],
      loginFlag: false,
      applyJobArray: [],
      userId: this.$store.state.auth.userId
    }
  },
  filters: {
    moment(value, format) {
      return moment(value).format(format);
    },
    truncateTitle: function(value) {
      var length = 23;
      var ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  mounted() {
    // * 応募 or 参加案件を取得
    this.loginFlag = true
    axios.get(`${this.$baseURL}/apply_job/?user_id=${this.userId}`)
    .then(response => {
      this.applyJobs = response.data
      for(var i = 0; i < this.applyJobs.length; i++) {
        var applyJobCorrect = this.applyJobs[i];
        if(applyJobCorrect.applyStatusId === 1 || applyJobCorrect.applyStatusId === 2) {
          this.applyJobArray.push(applyJobCorrect)
        }
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.router-link {
  :hover {
    opacity: 0.8;
  }

  text-decoration: none;
  color: $basic-white;
}

.manage-wrapper {
  width: 92%;
  height: 89.5vh;
  margin: 0 auto;

  .job-manage-wrapper {
    @include card-border-color;
    width: 95%;
    height: calc(90vh - 5rem);
    border-radius: 20px;
    margin: 2rem 2rem;
    background-color: $basic-white;
    float: right;
    position: relative;
    font-size: 14px;


    .manage-job-area {
      width: 33.2%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
      border-radius: 20px 0 0 0;
      background-color: #606060;
      display: inline-block;
      color: $basic-white;
      font-weight: bold;
      transition: .3s;
    }

    .apply-job-area {
      @include box-shadow-manage ;
      width: 33.2%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
      background-color: #606060;
      display: inline-block;
      background-color: $secondary-color;
      color: $basic-white;
      border: 0.5px solid $basic-white;
      font-weight: bold;
      transition: .3s;
    }

    .save-job-area {
      width: 33.2%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
      border-radius: 0 20px 0 0;
      background-color: #606060;
      display: inline-block;
      color: $basic-white;
      font-weight: bold;
    }
  }
}

.title-area {
  width: 33.2%;
  height: calc(48px - 1.8rem);
  padding: 0.8rem 0;
  background-color: $secondary-color;
  display: inline-block;
  color: $basic-white;
  font-weight: bold;
}

.time-area {
  width: 33.2%;
  height: calc(48px - 1.8rem);
  padding: 0.8rem 0;
  border-left: 1px solid $basic-white;
  border-right: 1px solid $basic-white;
  background-color: $secondary-color;
  display: inline-block;
  color: $basic-white;
  font-weight: bold;
}

.skill-area {
  width: 33.2%;
  height: calc(48px - 1.8rem);
  padding: 0.8rem 0;
  background-color: $secondary-color;
  display: inline-block;
  color: $basic-white;
  font-weight: bold;
}

.job-title-area {
  width: 33.2%;
  height: 70%;
  display: inline-block;
}

.router :hover {
  background-color: $manage-hover-color;
}

.job-wrapper-area {
  width: 100%;
  height: 81%;
  overflow: scroll;
}

.job-area {
  transition: .2s;

  .job-area-box {
    width: 33%;
    border-bottom: 1px solid #9c9c9c;
    height: calc(48px - 1.6rem);
    padding: 0.8rem 0;
    color: $text-main-color;
    display: inline-block;
    pointer-events: none;
  }
}

.lang {
  display: inline-block;
}
</style>