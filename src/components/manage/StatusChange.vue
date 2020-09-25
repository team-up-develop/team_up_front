<template>
  <div class="job-status-change-area">
    <div class="status-change-top">
      <router-link :to="`/manage/job/${ this.id }`" class="router">
      {{ jobTitle | truncateDetailTitle }}
      </router-link>
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
      <button class="reject-btn" @click="applyUserReject">落選させる</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    applyUsers: null,
    id: Number
  },
  data() {
    return {
      statusChangeUser: [], //? ステータスの変更ユーザー
      jobTitle: "", //? 案件タイトル
      message: "Emit"
    }
  },
  filters: {
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
    this.applyUsersNum = this.applyUsers.length
    //* 案件タイトルを取得する
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${this.id}`)
    .then(response => {
      var job = response.data[0];
      // console.log(job.job.jobTitle)
      this.jobTitle = job.job.jobTitle;
    })
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
        this.$emit('compliteAssgin', this.message)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * 拒否する
    applyUserReject() {
      const params = {
        jobId: 1,
        userId: this.statusChangeUser,
        applyStatusId: 3
      };
      axios.put(`${this.$baseURL}/apply_job/`, params)
      .then(response => {
        console.log(response.data)
        this.$emit('compliteReject', this.message)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.router {
  text-decoration: none;
  color: #ffffff;
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
  border-radius: 15px 15px 0px 0;
  background-color: #4A148C;
  box-shadow: 0 0 10px #02020278;
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
  box-shadow: 0 0px 5px 2px #d4d4d4;
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
  background: linear-gradient(60deg, #1142e2, #19bde6);
  box-shadow: 0 0px 5px 2px #d4d4d4;
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

  select {
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

    &::-ms-expand {
      display: none;
    }
  }

  &.cp_sl02 {
    position: relative;
    border: 1px solid #bbbbbb;
    border-radius: 2px;
    background: #ffffff;

    &::before {
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

    &:after {
      position: absolute;
      top: 0;
      right: 2.5em;
      bottom: 0;
      width: 1px;
      content: '';
      border-left: 1px solid #bbbbbb;
    }

    select {
      padding: 8px 38px 8px 8px;
      color: #666666;
    }
  }
}
</style>