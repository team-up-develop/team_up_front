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

<style lang="scss" scoped>
.manage-detail-wrapper {
  width: 92%;
  height: 89.5vh;
  margin: 0 auto;

  /* background-color: #F2F6F7; */

  .job-manage-detail-wrapper {
    @include card-border-color;
    width: 95%;
    height: 68%;
    border-radius: 20px;
    margin: 0rem 2rem;
    background-color: $basic-white;
    float: right;

    position: relative;
  }
}

.job-manage-detail-wrapper {
  .status-area-reject, .status-area-participate, .status-area {
    @include card-border-color;
    width: 24.8%;
    /* height: 20%; */
    display: inline-block;
  }

  .status-area-participate :hover, .status-area :hover {
    opacity: 0.8;
  }
}

.router {
  text-decoration: none;
}

/* 応募者ボックス */
.job-manage-detail-wrapper {
  .status-area-left {
    width: 24.8%;
    display: inline-block;
    border-left: solid 1px $card-border-color;
    border-radius: 20px 0 0 0;
  }

  .status-area-right {
    width: 24.8%;

    /* height: 20%; */
    /* background-color: rgb(0, 102, 128); */
    display: inline-block;
    border: solid 1px $card-border-color;
    border-radius: 0 25px 0 0;
  }
}

.status-box-click {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  border-radius: 15px 0 0 0;
  background-color: #606060;
}

.status-box-right {
  @include  box-shadow-manage;
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: $secondary-color;
  border-radius: 0 15px 0 0;
}

.status-box-participate {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #606060;
  color: $basic-white;
}

.status-box-reject {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #606060;
  color: $basic-white;

  &:hover {
    opacity: 0.8;
  }
}

.status-box {
  width: calc(100% - 8rem);
  height: 100%;
  padding: 0 4rem;
  background-color: #606060;
  color: $basic-white;
}

.status-logo {
  width: 100%;
  height: calc(40% - 1.3rem);
  padding: 1rem 0 0 0;

  /* margin: 0 auto; */
  color: $basic-white;
  pointer-events: none;
}

.icon {
  font-size: 1.2em;
  pointer-events: none;
}

.status-tag {
  width: 100%;
  padding: 0.5rem 0;

  font-size: 14px;
  color: $basic-white;
  font-weight: bold;
  pointer-events: none;
}

.status-number {
  width: 100%;
  padding: 0.5rem 0 0.3em 0;
  font-size: 1.4em;
  color: $basic-white;
  font-weight: bold;
  pointer-events: none;
}

/* ユーザー一覧のタグ */
.job-manage-detail-wrapper .status-tag-area {
  width: 100%;
  height: 8%;
  color: $basic-white;
  font-weight: bold;
  background-color: $secondary-color;

  .status-tag-name {
    width: 24.8%;
    height: 10%;
    display: inline-block;
    padding: 0.6rem 0;
  }

  .status-tag-study {
    width: 24.8%;
    height: calc(34px - 1rem);
    display: inline-block;
    padding: 0.6rem 0;
  }

  .status-tag-skill {
    width: calc(100% - 50%);
    height: calc(34px - 1rem);
    display: inline-block;
    padding: 0.6rem 0;
  }
}

.user-list-area {
  overflow: scroll;
}

.user-area {
  border-bottom: 1px solid  #9c9c9c;
}

.router-user-area :hover {
  background-color: $manage-hover-color;
}

.user-area {
  .user-area-box {
    width: 25%;
    padding: 0.8rem 0;
    color: $text-main-color;
    display: inline-block;
    pointer-events: none;
  }

  .user-area-skill {
    width: 50%;
    padding: 0.8rem 0;
    color: $text-main-color;
    display: inline-block;
    pointer-events: none;
  }
}
</style>