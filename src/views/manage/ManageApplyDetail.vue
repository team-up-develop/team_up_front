<template>
  <div class="manage-detail-wrapper">
    <div class="job-status-change-area">
      <div class="status-change-top">
        {{ jobTitle | truncateDetailTitle }}
      </div>
      <div class="status-change-left">
        <label for="" class="label">応募者選択</label>
        <div class="cp_ipselect cp_sl02">
          <select required v-model="statusChangeUser">
            <option v-for="user in applyUsers" v-bind:value="user.user.id " v-bind:key="user.user.id">
              {{ user.user.userName }}
            </option>
          </select>
        </div>
      </div>
      <div class="status-change-right">
        <button class="permit-btn" @click="applyUserPut">参加させる</button>
        <button class="reject-btn" @click="applyUserRefusal">落選させる</button>
      </div>
    </div>
    <div class="job-manage-detail-wrapper">
      <div class="status-area-left">
        <div class="status-box-click">
          <div class="status-logo">
            <font-awesome-icon icon="user" class="icon"/>
          </div>
          <div class="status-tag">応募者</div>
          <div class="status-number">{{ applyUsersNum }}人</div>
        </div>
      </div>
      <div class="status-area-participate">
      <router-link :to="`/manage/participate/${ id }`" class="router">
        <div class="status-box-participate">
          <div class="status-logo">
            <font-awesome-icon icon="users" class="icon"/>
          </div>
          <div class="status-tag">参加者</div>
          <div class="status-number">{{ assginUsersNum }}人</div>
        </div>
      </router-link>
      </div>
      <div class="status-area-reject">
        <router-link :to="`/manage/reject/${ id }`" class="router">
        <div class="status-box-reject">
          <div class="status-logo">
            <font-awesome-icon icon="user-alt-slash" class="icon"/>
          </div>
          <div class="status-tag">拒否者</div>
          <div class="status-number">{{ rejectUsersNum }}人</div>
        </div>
        </router-link>
      </div>
      <!-- <div class="status-area">
        <div class="status-box">
          <div class="status-logo">
            <font-awesome-icon icon="eye" class="icon"/>
          </div>
          <div class="status-tag">閲覧数</div>
          <div class="status-number">1000</div>
        </div>
      </div> -->
      <div class="status-area-right">
        <div class="status-box-right">
          <div class="status-logo">
            <font-awesome-icon icon="thumbs-up" class="icon"/>
          </div>
          <div class="status-tag">いいね</div>
          <div class="status-number">10</div>
        </div>
      </div>
      <div class="status-tag-area">
        <div class="status-tag-name">名前</div>
        <div class="status-tag-study">学習開始</div>
        <div class="status-tag-skill">スキル</div>
      </div>
      <div class="user-list-area">
        <div 
          v-for="applyUser in applyUsers" 
          :key="applyUser.id" 
          class="router-user-area"
        >
          <div class="user-area">
            <div class="user-area-box">
              {{ applyUser.user.userName }}
            </div>
            <div class="user-area-box">
            {{ applyUser.user.learningStartDate | moment("YYYY年 M月 D日") }}
            </div>
            <div class="user-area-skill">
              {{ applyUser.user.userName }}
            </div>
          </div>
        </div>
      </div>


      <!-- <div v-for="applyUser in applyUsers" :key="applyUser.id">
        <p>ID {{ applyUser.userId }} 名前 {{ applyUser.user.userName }}</p>
      </div> -->
    </div>
    <!-- <h3>応募者一覧</h3>
    <div v-for="applyUser in applyUsers" :key="applyUser.id">
      <p>ID {{ applyUser.userId }} 名前 {{ applyUser.user.userName }}</p>
    </div>
    <h3>参加者一覧</h3>
    <div v-for="assginUser in assginUsers" :key="assginUser.id">
      <p>ID {{ assginUser.userId }} 名前 {{ assginUser.user.userName }}</p>
    </div>
    <h3>参加者拒否一覧</h3>
    <div v-for="rejectUser in rejectUsers" :key="rejectUser.id">
      <p>ID {{ rejectUser.userId }} 名前 {{ rejectUser.user.userName }}</p>
    </div> -->
    <!-- <h2>応募者を参加させる</h2>
    <select v-model="applyUser" class="">
      <option disabled value="" class="">応募者</option>
      <option v-for="user in applyUsers" v-bind:value="user.user.id " v-bind:key="user.user.id">
        {{ user.user.userName  }}
      </option>
    </select>
    <h3>Selected User{{ applyUser }}</h3>
    <div @click="applyUserPut" class="btn-box-save">
      参加させる
    </div>

    <h2>応募者を拒否する</h2>
    <select v-model="refusalUser" class="">
      <option disabled value="" class="">応募者</option>
      <option v-for="user in applyUsers" v-bind:value="user.user.id " v-bind:key="user.user.id">
        {{ user.user.userName  }}
      </option>
    </select>
    <h3>Selected User{{ refusalUser }}</h3>
    <div @click="applyUserRefusal" class="btn-box-save-false">
      拒否する
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
import moment from "moment";
export default {
  props: {
    // * job.idを受け取る
    id: Number,
  },
  data() {
    return {
      statusChangeUser: [], //? ステータスの変更ユーザー
      applyUsers: [], //? 応募者
      applyUsersNum: 0,//? 応募者人数
      assginUsers: [], //? 参加者
      assginUsersNum: 0, //? 参加者人数
      rejectUsers: [], //? 拒否者
      rejectUsersNum: 0, //? 拒否者人数
      applyUser: [], //? 参加させる
      refusalUser: [], //? 拒否する
      manageJobs: [], //? 管理
      assginUsersId: null,
      jobTitle: "" //? 案件タイトル
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
    //* 案件タイトルを取得する
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${this.id}`)
    .then(response => {
      var job = response.data[0];
      // console.log(job.job.jobTitle)
      this.jobTitle = job.job.jobTitle;
      console.log(this.jobTitle)
    })
    // * 参加者をステータスごとに取り出す
    axios.get(`${this.$baseURL}/apply_job/?job_id=${ this.id }&apply_status_id=1`)
    .then(response => {
      this.applyUsers = response.data
      this.applyUsersNum = response.data.length
    })
    axios.get(`${this.$baseURL}/apply_job/?job_id=${ this.id }&apply_status_id=2`)
    .then(response => {
      this.assginUsers = response.data
      this.assginUsersNum = response.data.length
    })
    axios.get(`${this.$baseURL}/apply_job/?job_id=${ this.id }&apply_status_id=3`)
    .then(response => {
      this.rejectUsers = response.data
      this.rejectUsersNum = response.data.length
    })
      // for(let i = 0; i < response.data.length; i++){
      //   const applyData = response.data[i];
      //   // console.log(applyData)
      //   if(applyData.applyStatusId === 1){
      //     this.applyUsers.push(applyData)
      //     this.applyUsersNum = this.applyUsers.length;
      //   }
      //   else if(applyData.applyStatusId === 2){
      //     this.assginUsers.push(applyData)
      //     this.assginUsersNum = this.assginUsers.length;
      //   }
      //   else {
      //     this.rejectUsers.push(applyData)
      //     this.rejectUsersNum = this.rejectUsers.length;
      //   }
    //   }
    // })
    
  },
  methods: {
    // * 参加させる
    applyUserPut() {
      const params = {
        jobId: 1,
        userId: this.statusChangeUser,
        applyStatusId: 2
      };
      axios.put(`${this.$baseURL}/apply_job/`, params)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * 拒否する
    applyUserRefusal() {
      const params = {
        jobId: 1,
        userId: this.statusChangeUser,
        applyStatusId: 3
      };
      axios.put(`${this.$baseURL}/apply_job/`, params)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    if( localStorage.userId !== undefined) {
      this.loginFlag = true
      axios.get(`${this.$baseURL}/job/?user_id=1`)
      .then(response => {
        this.manageJobs = response.data
      })
    }
  }
}
</script>

<style scoped>
.manage-detail-wrapper {
  width: 92%;
  height: 89.5vh;
  margin: 0 auto;
  /* background-color: #F2F6F7; */
}
.manage-detail-wrapper .job-manage-detail-wrapper {
  width: 95%;
  height: 68%;
  border-radius: 20px;
  margin: 0rem 2rem;
  background-color: #ffffff;
  float: right;
  border: solid 1px #B9B9B9;
  position: relative;
}
.job-manage-detail-wrapper .status-area-reject {
  width: 24.8%;
  /* height: 20%; */
  display: inline-block;
  border: solid 1px #B9B9B9;
}
.job-manage-detail-wrapper .status-area-participate {
  width: 24.8%;
  /* height: 20%; */
  display: inline-block;
  border: solid 1px #B9B9B9;
}
.job-manage-detail-wrapper .status-area {
  width: 24.8%;
  /* height: 20%; */
  display: inline-block;
  border: solid 1px #B9B9B9;
}
.job-manage-detail-wrapper .status-area-participate :hover {
  opacity: 0.8;
}
.job-manage-detail-wrapper .status-area  :hover {
  opacity: 0.8;
}
.router {
  text-decoration: none;
}
/* 応募者ボックス */
.job-manage-detail-wrapper .status-area-left {
  width: 24.8%;
  /* height: 20%; */
  display: inline-block;
  border-left: solid 1px #B9B9B9;
  border-radius: 20px 0 0 0 ;
}
.job-manage-detail-wrapper .status-area-right {
  width: 24.8%;
  /* height: 20%; */
  /* background-color: rgb(0, 102, 128); */
  display: inline-block;
  border: solid 1px #B9B9B9;
  border-radius: 0 25px 0 0 ;
}
.status-box-click {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  border-radius: 25px 0 0 0;
  background-color: #3700B3;
}
.status-box-right {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #606060;
  border-radius: 0 25px 0 0;
}
.status-box-participate {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #606060;
  color: #ffffff;
}
.status-box-reject {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #606060;
  color: #ffffff;
}
.status-box-reject:hover {
  opacity: 0.8;
}
.status-box {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #606060;
  color: #ffffff;
}
.status-logo {
  width: 100%;
  height: calc(40% - 1.3rem);
  padding: 1rem 0 0 0 ;
  /* margin: 0 auto; */
  color: #ffffff;
  pointer-events: none;
}
.icon {
  font-size: 1.2em;
  pointer-events: none;
}
.status-tag {
  width: 100%;
  padding: 0.5rem 0;
  /* height: 40%; */
  /* margin: 0 auto; */
  font-size: 14px;
  color: #ffffff;
  font-weight: bold;
  pointer-events: none;
}
.status-number {
  width: 100%;
  padding: 0.5rem 0 0.3em 0;
  font-size: 1.4em;
  color: #ffffff;
  font-weight: bold;
  pointer-events: none;
}
/* ユーザー一覧のタグ */
.job-manage-detail-wrapper .status-tag-area {
  width: 100%;
  height: 8%;
  /* background-color: rgba(0, 255, 234, 0.596); */
  color: #ffffff;
  font-weight: bold;
  background-color: #3700B3;
}
.job-manage-detail-wrapper .status-tag-area .status-tag-name {
  width: 24.8%;
  height: 10%;
  display: inline-block;
  /* border: 1px solid #B9B9B9; */
  /* border-right: 1px solid #9c9c9c; */
  padding: 0.6rem 0;
}
.job-manage-detail-wrapper .status-tag-area .status-tag-study {
  width: 24.8%;
  height: calc(34px - 1rem);
  display: inline-block;
  /* border-right: 1px solid #9c9c9c; */
  padding: 0.6rem 0;
} 
.job-manage-detail-wrapper .status-tag-area .status-tag-skill {
  width: calc(100% - 50%);
  height: calc(34px - 1rem);
  display: inline-block;
  /* border-bottom: 1px solid #9c9c9c; */
  padding: 0.6rem 0;
} 
.user-list-area {
  overflow: scroll;
}
.user-area {
  border-bottom: 1px solid  #9c9c9c;
}
.router-user-area :hover {
  background-color: rgba(199, 199, 199, 0.281);
}
.user-area .user-area-box {
  width: 25%;
  padding: 0.8rem 0;
  color: #111111;
  display: inline-block;
  pointer-events: none;
}
.user-area  .user-area-skill {
  width: 50%;
  padding: 0.8rem 0;
  color: #111111;
  display: inline-block;
  pointer-events: none;
}

/* ステータス変更 */
.job-status-change-area {
  width: 95%;
  height: 20%;
  border-radius: 20px;
  margin: 2rem 2rem 2rem 2rem;
  background-color: #ffffff;
  float: right;
  border: solid 1px #B9B9B9;
  position: relative;
}
.status-change-top {
  width: 100%;
  height: 10%;
  padding: 0.8rem 0;
  border-radius: 20px 20px 0px 0;
  background-color: #3700B3;
  color: #ffffff;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.status-change-left {
  width: 30%;
  height: 40%;
  padding: 1rem 2rem;
  text-align: left;
}
.label {
  font-weight: bold;
}
.status-change-right {
  width: 30%;
  height: 40%;
  padding-top: 4.6rem;
  padding-right: 2rem;
  /* background-color: yellow; */
  position: absolute;
  right: 0;
  top: 0;
}
.permit-btn {
  /* display: block; */
  padding: 1rem 2.4rem;
  background-color: #E91E63;
  border-radius: 50px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
  border: none;
}
.reject-btn {
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
  float: right;
  cursor: pointer;
  border: none;
}

/* セレクトボックス */
.cp_ipselect {
	overflow: hidden;
	width: 90%;
	margin: 0.2em 0;
	text-align: center;
}
.cp_ipselect select {
	width: 100%;
	padding-right: 1em;
	cursor: pointer;
	text-indent: 0.01px;
	text-overflow: ellipsis;
	border: none;
	outline: none;
	background: transparent;
	background-image: none;
	box-shadow: none;
	-webkit-appearance: none;
	appearance: none;
}
.cp_ipselect select::-ms-expand {
    display: none;
}
.cp_ipselect.cp_sl02 {
	position: relative;
	border: 1px solid #bbbbbb;
	border-radius: 2px;
	background: #ffffff;
}
.cp_ipselect.cp_sl02::before {
	position: absolute;
	top: 0.8em;
	right: 0.9em;
	width: 0;
	height: 0;
	padding: 0;
	content: '';
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 6px solid #666666;
	pointer-events: none;
}
.cp_ipselect.cp_sl02:after {
	position: absolute;
	top: 0;
	right: 2.5em;
	bottom: 0;
	width: 1px;
	content: '';
	border-left: 1px solid #bbbbbb;
}
.cp_ipselect.cp_sl02 select {
	padding: 8px 38px 8px 8px;
	color: #666666;
}
</style>