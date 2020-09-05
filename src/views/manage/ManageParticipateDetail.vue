<template>
  <div class="manage-detail-wrapper">
    <div class="job-manage-detail-wrapper">
      <div class="status-area-left">
        <router-link :to="`/manage/apply/${ id }`" class="router">
          <div class="status-box-click">
            <div class="status-logo">
              <font-awesome-icon icon="user" class="icon"/>
            </div>
            <div class="status-tag">応募者</div>
            <div class="status-number">{{ applyUsersNum }}人</div>
          </div>
        </router-link>
      </div>
      <div class="status-area-participate">
        <div class="status-box-participate">
          <div class="status-logo">
            <font-awesome-icon icon="users" class="icon"/>
          </div>
          <div class="status-tag">参加者</div>
          <div class="status-number">{{ assginUsersNum }}人</div>
        </div>
      </div>
      <div class="status-area">
        <div class="status-box">
          <div class="status-logo">
            <font-awesome-icon icon="user-alt-slash" class="icon"/>
          </div>
          <div class="status-tag">拒否者</div>
          <div class="status-number">{{ rejectUsersNum }}人</div>
        </div>
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
      <div 
        v-for="assginUser in assginUsers" 
        :key="assginUser.id" 
        class="router-user-area"
      >
        <div class="user-area">
          <div class="user-area-box">
            {{ assginUser.user.userName }}
          </div>
          <div class="user-area-box">
          {{ assginUser.user.learningStartDate | moment("YYYY年 M月 D日") }}
          </div>
          <div class="user-area-skill">
            {{ assginUser.user.userName }}
          </div>
        </div>
      </div>
      <!-- <router-link :to="`/manage/participate/${ jobs.id }`" 
        v-for="jobs in manageJobs" 
        :key="jobs.id" 
        class="router-user-area"
      >
        {{ jobs.jobTitle }}
      </router-link> -->



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
    </div>
    <h2>応募者を参加させる</h2>
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
    // id: { type: Number }
  },
  data() {
    return {
      applyUsers: [], //? 応募者
      applyUsersNum: 0,//? 応募者人数
      assginUsers: [], //? 参加者
      assginUsersNum: 0, //? 参加者人数
      rejectUsers: [], //? 拒否者
      rejectUsersNum: 0, //? 拒否者人数
      applyUser: [], //? 参加させる
      refusalUser: [], //? 拒否する
      manageJobs: [], //? 管理
      assginUsersId: null
    }
  },
  filters: {
    moment(value, format) {
      return moment(value).format(format);
    }
  },
  created() {
    //* 応募者を一覧で取り出す。
    const URL = 'http://localhost:8888/api/v1/apply_job/?'
    axios.get(`${ URL }job_id=${ this.id }`)
    .then(response => {
      for(let i = 0; i < response.data.length; i++){
        const applyData = response.data[i];
        if(applyData.applyStatusId === 1){
          this.applyUsers.push(applyData)
          this.applyUsersNum = this.applyUsers.length;
        }
        else if(applyData.applyStatusId === 2){
          this.assginUsers.push(applyData)
          this.assginUsersNum = this.assginUsers.length;
        }
        else {
          this.rejectUsers.push(applyData)
          this.rejectUsersNum = this.rejectUsers.length;
        }
      }
    })
  },
  methods: {
    // * 参加させる
    applyUserPut() {
      const data = {
        jobId: 1,
        userId: this.applyUser,
        applyStatusId: 2
      };
      axios.put('http://localhost:8888/api/v1/apply_job/', data)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * 拒否する
    applyUserRefusal() {
      const data = {
        jobId: 1,
        userId: this.refusalUser,
        applyStatusId: 3
      };
      axios.put('http://localhost:8888/api/v1/apply_job/', data)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    // if( localStorage.userId !== undefined) {
    //   this.loginFlag = true
    //   axios.get('http://localhost:8888/api/v1/job/?user_id=1')
    //   .then(response => {
    //     this.manageJobs = response.data
    //   })
    // }
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
  height: calc(90vh - 5rem);
  border-radius: 20px;
  margin: 2rem 2rem;
  background-color: #ffffff;
  float: right;
  border: solid 1px #B9B9B9;
  position: relative;
}
.status-area-participate {
  width: 24.8%;
  height: 20%;
  display: inline-block;
  border: solid 1px #B9B9B9;
}
.job-manage-detail-wrapper .status-area {
  width: 24.8%;
  height: 20%;
  display: inline-block;
  border: solid 1px #B9B9B9;
  /* background-color: #3700B3; */
}
.router {
  text-decoration: none;
}
.job-manage-detail-wrapper .status-area-left {
  width: 24.8%;
  height: 20%;
  display: inline-block;
  border: solid 1px #B9B9B9;
  border-radius: 25px 0 0 0 ;
}
.job-manage-detail-wrapper .status-area-left :hover {
  opacity: 0.8;
}
.job-manage-detail-wrapper .status-area-right {
  width: 24.8%;
  height: 20%;
  background-color: rgb(0, 102, 128);
  display: inline-block;
  border: solid 1px #B9B9B9;
  border-radius: 0 25px 0 0 ;
}
.status-box-click {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  border-radius: 25px 0 0 0;
  background-color: #606060;
  /* pointer-events: none; */
}
.status-box-right {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #606060;
  border-radius: 0 25px 0 0;
  pointer-events: none;
}
.status-box-participate {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #3700B3;
  color: #ffffff;
  pointer-events: none;
}
.status-box {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #606060;
  color: #ffffff;
  pointer-events: none;
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
  font-size: 2em;
  pointer-events: none;
}
.status-tag {
  width: 100%;
  padding: 0.5rem 0;
  /* height: 40%; */
  /* margin: 0 auto; */
  color: #ffffff;
  font-weight: bold;
}
.status-number {
  width: 100%;
  padding: 0.5rem 0 0 0;
  font-size: 1.8em;
  color: #ffffff;
  font-weight: bold;
}
/* ユーザー一覧のタグ */
.job-manage-detail-wrapper .status-tag-area {
  width: 100%;
  height: 6%;
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
</style>