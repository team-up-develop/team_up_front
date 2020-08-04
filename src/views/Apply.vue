<template>
  <div>
    <div class="main-container">
      <div class="job-wrapper" v-if="loginFlag === true">
        <router-link :to="`/jobs/${ job.jobId }`" v-for="job in applyJobs" :key="job.jobId" class="router">
        <div class="job-box">
          <div class="left-box">
              <div class="user-profile-image"></div>
          </div>
          <div class="btn-area">
            <div class="save-btn">保存する</div>
          </div>
          <div class="right-box">
            <div class="username-area">
              <!-- {{ job.user.userName }} -->
            </div>
            <div class="title-area">
              {{ job.job.jobTitle }}
            </div>
            <div class="bottom-area">
              <div class="bottom-left">
                <!-- <font-awesome-icon icon="laptop" class="icon" /> -->
                <div class="sub-langage" v-for="langage in job.job.programingLanguage" :key="langage.id">
                  {{ langage.programingLanguageName }}
                </div>
                <div class="sub-framework" v-for="framework in job.job.programingFramework" :key="framework.programingFrameworkName">
                  {{ framework.programingFrameworkName }}
                </div>
                <div class="sub-skill" v-for="skill in job.job.skill" :key="skill.skillName">
                  {{ skill.skillName }}
                </div>
              </div>
              <div class="bottom-right">
                <font-awesome-icon icon="history" class="icon" />
                <div class="sub-times">
                  {{ job.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ job.devEndDate | moment("YYYY年 M月 D日")}}
                </div>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <div v-else>
        ログインが必要です！
      </div>
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
      loginFlag: false
    }
  },
  filters: {
    moment(value, format) {
      return moment(value).format(format);
    }
  },
  mounted() {
    // * 現時点はuser_id を指定して入れている
    if( localStorage.userId !== undefined) {
      this.loginFlag = true
      axios.get('http://localhost:8888/api/v1/apply_job/?user_id=1')
      .then(response => {
        // setTimeout(() => {
          this.applyJobs = response.data
          console.log(this.applyJobs)
        // }, 1000);
      })
      .then(data => {
        console.log(data)
      })
    }
  },
}
</script>

<style scoped>
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
.sub-skill{
  margin: 0 0px 0 5px ;
  text-align: left;
  display: inline-block;
  color: #ffffff;
  font-size: 12px;
  background-color: #00ced1;
  padding: 7px 10px;
  border-radius: 5%;
  font-weight: bold;
}
.sub-langage{
  margin: 0 0px 0 5px ;
  text-align: left;
  display: inline-block;
  color: #ffffff;
  font-size: 12px;
  background-color: #00bfff;
  padding: 7px 10px;
  border-radius: 5%;
  font-weight: bold;
}
.sub-framework{
  margin: 0 0px 0 5px ;
  text-align: left;
  display: inline-block;
  color: #ffffff;
  font-size: 12px;
  background-color: #1e90ff;
  padding: 7px 10px;
  border-radius: 5%;
  font-weight: bold;
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