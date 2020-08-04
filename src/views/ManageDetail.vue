<template>
  <div>
    <h3>応募者一覧</h3>
    <div v-for="applyUser in applyUsers" :key="applyUser.id">
      <p>ID: {{ applyUser.userId }} 名前: {{ applyUser.user.userName }}</p>
    </div>
    <h3>参加者一覧</h3>
    <div v-for="assginUser in assginUsers" :key="assginUser.id">
      <p>ID: {{ assginUser.userId }} 名前: {{ assginUser.user.userName }}</p>
    </div>
    <h3>参加者拒否一覧</h3>
    <div v-for="rejectUser in rejectUsers" :key="rejectUser.id">
      <p>ID: {{ rejectUser.userId }} 名前: {{ rejectUser.user.userName }}</p>
    </div>
    <h2>応募者を参加させる</h2>
    <select v-model="applyUser" class="">
      <option disabled value="" class="">応募者</option>
      <option v-for="user in applyUsers" v-bind:value="user.user.id " v-bind:key="user.user.id">
        {{ user.user.userName  }}
      </option>
    </select>
    <h3>Selected User:{{ applyUser }}</h3>
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
    <h3>Selected User:{{ refusalUser }}</h3>
    <div @click="applyUserRefusal" class="btn-box-save-false">
      拒否する
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    // * job.idを受け取る
    id: Number,
    // id: { type: Number }
  },
  data() {
    return {
      applyUsers: [], //? applyStatusId === 1 のUserを取り出す
      assginUsers: [], //? applyStatusId === 2 のUserを取り出す
      rejectUsers: [], //? applyStatusId === 3 のUserを取り出す
      applyUser: [], //? 参加させる
      refusalUser: [], //? 拒否する
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
          console.log(this.applyUsers)
        }
        else if(applyData.applyStatusId === 2){
          console.log(applyData)
          this.assginUsers.push(applyData)
          console.log(this.assginUser)
        }
        else {
          this.rejectUsers.push(applyData)
        }
      }
    })
    .then(data => {
      console.log(data)
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
  }
}
</script>

<style scoped>
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
</style>