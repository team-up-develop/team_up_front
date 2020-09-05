<template>
  <div>
    <div v-if="chats" key="">
      <h3>メンバー</h3>
      <div v-for="chatMembar in chatMembers" :key="chatMembar.id">
      <p>{{ chatMembar.user.userName }}</p>
      </div>
      <br>
      <hr>
      <br><br>
      <!-- <div v-for="chat in chats" :key="chat.id">
        {{ chat.user.userName }}
        {{ chat.message }}
      </div> -->
      <input type="text" v-model="chatMessage">
      {{ chatMessage }}
      <div class="btn-box-save" @click="chatCreate">
        送信する
      </div>
    </div>
    <div v-else>
      ローディング
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    // * job.idを受け取る
    id: Number,
    // id: { type: Number },
  },
  data() {
    return {
      chats: null,
      chatMessage: "",
      chatMembers: [],
      postUser: null
    }
  },
  created() {
    // * チャット詳細画面実装
    // const URL = 'http://localhost:8888/api/v1/chat_message/?'
    axios.get(`${this.$baseURL}/chat_message/?job_id=${this.id}`)
    .then(response => {
      setTimeout(() => {
        this.chats = response.data
      }, 1000)
    })
    // * 案件参加者 & 投稿者を取り出す
    axios.get(`${this.$baseURL}/apply_job/?job_id=${ this.id }&apply_status_id=2`)
    .then(response => {
      console.log(response.data)
      this.chatMembers = response.data
    })
  },
  methods: {
    chatCreate() {
      const data = {
          "message": this.chatMessage,
          "userID": 3,
          "jobID": this.id
      }
      axios.post(`${this.$baseURL}/chat_message`, data)
      .then(response => {
        console.log(response.data)
      })
      this.chatMessage = "";
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
</style>