<template>
  <div class="manage-detail-wrapper">
    <status-change :applyUsers="applyUsers" :id="id" @compliteAssgin="compliteAssgin" @compliteReject="compliteReject"/>
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
      <div class="status-area-right">
        <router-link :to="`/manage/favorite/${ id }`" class="router">
          <div class="status-box-right">
            <div class="status-logo">
              <font-awesome-icon icon="thumbs-up" class="icon"/>
            </div>
            <div class="status-tag">いいね</div>
            <div class="status-number">{{ favoriteUsersNum }}人</div>
          </div>
        </router-link>
      </div>
      <div class="status-tag-area">
        <div class="status-tag-name">名前</div>
        <div class="status-tag-study">学習開始</div>
        <div class="status-tag-skill">スキル</div>
      </div>
      <div class="user-list-area">
        <div 
          v-for="favoriteUser in favoriteUsers" 
          :key="favoriteUser.id" 
          class="router-user-area"
        >
        <router-link :to="`/account/profile/${ favoriteUser.userId }`"> 
          <div class="user-area">
            <div class="user-area-box">
              {{ favoriteUser.user.userName }}
            </div>
            <div class="user-area-box">
            {{ favoriteUser.user.learningStartDate | moment("YYYY年 M月 D日") }}
            </div>
            <div class="user-area-skill">
              {{ favoriteUser.user.userName }}
            </div>
          </div>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from "moment";
import StatusChange from '@/components/manage/StatusChange'
export default {
  props: {
    // * job.idを受け取る
    id: Number,
  },
  data() {
    return {
      applyUsers: [], //? 応募者
      applyUsersNum: 0,//? 応募者人数
      assginUsers: [], //? 参加者
      assginUsersNum: 0, //? 参加者人数
      rejectUsers: [], //? 拒否者
      rejectUsersNum: 0, //? 拒否者人数
      favoriteUsers: [], //? お気に入りしているユーザー一覧
      favoriteUsersNum: 0, //? お気に入りしているユーザー 人数
      applyUser: [], //? 参加させる
      refusalUser: [], //? 拒否する
      manageJobs: [], //? 管理
      assginUsersId: null,
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
    axios.get(`http://localhost:8888/api/v1/favorite_job/?job_id=${ this.id }`)
    .then(response => {
      this.favoriteUsers = response.data
      this.favoriteUsersNum = this.favoriteUsers.length
    })
  },
  mounted() {
    if( localStorage.userId !== undefined) {
      this.loginFlag = true
      axios.get(`${this.$baseURL}/job/?user_id=1`)
      .then(response => {
        this.manageJobs = response.data
      })
    }
  },
  methods: {
    // * 参加者 リアルタイムで変更する
    compliteAssgin(){
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
    },
    // *拒否者 リアルタイムで取得
    compliteReject() {
      // * 参加者をステータスごとに取り出す
      axios.get(`${this.$baseURL}/apply_job/?job_id=${ this.id }&apply_status_id=1`)
      .then(response => {
        this.applyUsers = response.data
        this.applyUsersNum = response.data.length
      })
      axios.get(`${this.$baseURL}/apply_job/?job_id=${ this.id }&apply_status_id=3`)
      .then(response => {
        this.rejectUsers = response.data
        this.rejectUsersNum = response.data.length
      })
    }
  },
  components: {
    StatusChange
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
  border-radius: 15px 0 0 0;
  /* background-color: #3700B3; */
  background-color: #606060;
}
.status-box-right {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #3700B3;
  box-shadow: 0 0 10px #02020278;
  border-radius: 0 15px 0 0;
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
  box-shadow: 0 0 10px #02020278;
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
</style>