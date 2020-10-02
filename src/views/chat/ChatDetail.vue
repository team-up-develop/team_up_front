<template>
<div class="chat-wrapper">
  <div class="chat-wrapper-card">
    <div class="card-left">
      <router-link :to="`/chat/${ chatGroup.job.id }`" v-for="chatGroup in chatGroups" :key="chatGroup.job.id" class="router">
        <div class="chat-group-area">
          <p>{{ chatGroup.job.jobTitle | truncateDetailTitle }}</p>
          <!-- <div v-for="myselfUser in myselfUser" :key="myselfUser.id" class="chat-member-name">
          <div v-for="chatMembar in chatMembers" :key="chatMembar.id" class="chat-member-name">
            <p>{{ myselfUser.user.userName }}  {{ chatMembar.user.userName }}</p>
          </div>
          </div> -->
        </div>
      </router-link>
    </div>
    <div class="card-right">
      <div class="card-right-main" v-for="chat in chats" :key="chat.id">
        <div class="message-area">
          {{ chat.message }}
        </div>
      </div>
      <div class="card-right-bottom">
        <textarea type="text" class="chat-form" name="" maxlength="250"></textarea>
        <div class="send-btn-area">
          <font-awesome-icon icon="paper-plane" class="icon"/>
        </div>
      </div>
    </div>
  </div>
</div>
    <!-- <div v-if="chats" key="">
      <h3>メンバー</h3>
      <div v-for="chatMembar in chatMembers" :key="chatMembar.id">
      <p>{{ chatMembar.user.userName }}</p>
      </div>
      <br>
      <hr>
      <br><br>
      <input type="text" v-model="chatMessage">
      {{ chatMessage }}
      <div class="btn-box-save" @click="chatCreate">
        送信する
      </div>
    </div>
    <div v-else>
      ローディング
    </div>
  </div> -->
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
      chatGroups: [],
      chats: null,
      chatMessage: "",
      chatMembers: [],
      myselfUser: {},
      postUser: null,
      userId: this.$store.state.auth.userId
    }
  },
  filters: {
    //* 案件タイトル 詳細 文字制限
    truncateDetailTitle: function(value) {
      var length = 36;
      var ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  created() {
    // * チャット詳細画面実装
    // const URL = 'http://localhost:8888/api/v1/chat_message/?'
    axios.get(`http://localhost:8888/api/v1/chat_message/?job_id=${this.id}`)
    .then(response => {
      this.chats = response.data
      // console.log(this.chats)
    })
    // * 案件参加者 & 投稿者を取り出す
    axios.get(`${this.$baseURL}/apply_job/?job_id=${ this.id }&apply_status_id=2`)
    .then(response => {
      // console.log(response.data)
      this.chatMembers = response.data
    })
    axios.get(`${this.$baseURL}/apply_job/?job_id=${ this.id }&apply_status_id=4`)
    .then(response => {
      // console.log(response.data)
      this.myselfUser= response.data
    })
      axios.get(`${this.$baseURL}/apply_job/?user_id=${ this.userId }`)
      .then(response => {
        const array = [];
        for(let i = 0; i < response.data.length; i++){
          const applyData = response.data[i]
          if(applyData.applyStatusId === 2 || applyData.applyStatusId === 4 ){
            array.push(applyData)
            this.chatGroups = array
          }
          else {
            console.log("Not Found")
          }
        }
      })
  },
  methods: {
    chatCreate() {
      const params = {
          "message": this.chatMessage,
          "userID": 3,
          "jobID": this.id
      }
      axios.post(`${this.$baseURL}/chat_message`, params)
      .then(response => {
        console.log(response.data)
      })
      this.chatMessage = "";
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1440px) {
  .chat-wrapper{
    width: 85%;
    height: 90vh;
    margin: 0 auto;
    position: relative;

    .chat-wrapper-card {
        @include card-border-color;
        background-color: $basic-white;
        width: 100%;
        border-radius: 20px;
        margin: 2rem 0rem;
        padding: 0 0rem;
        position: absolute;
        right: 0;
        height: 93%;
        background-color: $sub-white;
        position: relative;

      .card-left {
        width: 24%;
        height: calc(100% - 4rem);
        padding: 2rem 0;
        box-shadow: 1px 0px 2.5px gray;
        border-radius: 20px 0 0px 20px;
        font-size: 14px;
        background-color: $basic-white;
        overflow: scroll;

        .router {
          text-decoration: none;
        }

        .chat-group-area {
          border-bottom: 0.5px solid grey;
          width: 90%;
          margin: 0 auto;
          padding: 0.3rem 0;

          p {
            text-align: left;
            color: $text-main-color;
          }

          .chat-member-name {
            font-size: 12px;
            color: $text-sub-color;
          }
        }
      }

      .card-right {
        width: 76%;
        height: 100%;
        // background-color: rgba(255, 255, 0, 0.367);
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 0 20px 20px 0;

        .card-right-main {
          width: calc(100% - 1rem);
          height: 90%;
          // background-color: yellow;
          padding: 1rem 2rem;
          text-align: left;
          overflow: scroll;

          .message-area {
            width: 10%;
            padding: 1rem 4rem;
            border-radius: 12px;
            background-color: $basic-white;
          }
        }

        .card-right-bottom {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 98%;
          height: 8%;
          border-radius: 0 0px 20px 0;
          background-color: rgb(255, 255, 255);
          padding: 1rem 0 1rem 1rem;

          .chat-form {
            width: 89%;
            border-radius: 8px;
            height: 100%;
            background-color: #DDDDDD;
            border: none;
            float: left;
            resize: none;
          }

          .send-btn-area {
            font-size: 2rem;
            margin-top: 0.6rem;
            color: $primary-color;
            cursor: pointer;
          }
        }
      }
    }
  }
}

</style>