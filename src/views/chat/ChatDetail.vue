<template>
  <div class="chat-wrapper">
    <div class="chat-wrapper-card">
      <div class="card-left">
        <!-- <router-link :to="`/chat/${ chatGroup.job.id }`" v-for="chatGroup in chatGroups" :key="chatGroup.job.id" class="router">
          <div class="chat-group-area">
            <p>{{ chatGroup.job.jobTitle | truncateDetailTitle }}</p>
            <div v-for="myselfUser in myselfUser" :key="myselfUser.id" class="chat-member-name">
            <div v-for="chatMembar in chatMembers" :key="chatMembar.id" class="chat-member-name">
              <p>{{ myselfUser.user.userName }}  {{ chatMembar.user.userName }}</p>
            </div>
            </div>
          </div>
        </router-link> -->
        <div @click="chatGroupChange(chatGroup.job.id)" v-for="chatGroup in chatGroups" :key="chatGroup.job.id" class="router">
          <div class="chat-group-area">
            <p>{{ chatGroup.job.jobTitle | truncateDetailTitle }}</p>
            <div v-for="myselfUser in myselfUser" :key="myselfUser.id" class="chat-member-name">
            <div v-for="chatMembar in chatMembers" :key="chatMembar.id" class="chat-member-name">
              <p>{{ myselfUser.user.userName }}  {{ chatMembar.user.userName }}</p>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-right">
        <div class="card-right-main" ref="target">
            <div class="balloon" v-for="chat in chats" :key="chat.id">
              <div class="balloon-image-left">
                <div class="balloon-img"></div>
              </div>
              <div class="balloon-text-right">
                <p>{{ chat.message }}</p>
              </div>
            </div>
          </div>
        <div class="card-right-bottom">
          <textarea type="text" class="chat-form" v-model="chatMessage" name="" maxlength="250"></textarea>
          <div class="send-btn-area">
            <span @click="chatCreate">
              <font-awesome-icon icon="paper-plane" class="icon"/>
            </span>
          </div>
        </div>
      </div>
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
      chatGroups: [],
      chats: null,
      chatMessage: "",
      chatMembers: [],
      myselfUser: {},
      postUser: null,
      userId: this.$store.state.auth.userId,
      f: null
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
    setInterval(() => {
      axios.get(`http://localhost:8888/api/v1/chat_message/?job_id=${this.id}`)
      .then(response => {
        this.chats = response.data
        // ! Getしたデータに変更点があったら下までスクロールするような作りにする
        // ! 初期Getしたら下までスクロールするようにする
      })
    }, 1000)
    // ! チャットのタイトルごとに案件参加者を取得できるようにする
    // * 案件参加者を取得
    axios.get(`${this.$baseURL}/apply_job/?job_id=${ this.id }&apply_status_id=2`)
    .then(response => {
      // console.log(response.data)
      this.chatMembers = response.data
    })
    // * 投稿者を取得
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
    // * メッセージの送信
    chatCreate() {
      const params = {
          message: this.chatMessage,
          userID: 3,
          jobID: this.id
      }
      // ? 空のメッセージは送信させない
      if(params.message == "") {
        console.log("空のメッセージは送信させない")
        return
      }
      // ? 投稿
      axios.post(`${this.$baseURL}/chat_message`, params)
      .then(response => {
        console.log(response.data)
        axios.get(`http://localhost:8888/api/v1/chat_message/?job_id=${this.id}`)
        .then(response => {
          this.chats = response.data
          // ! Postされた内容がDOMに反映される前にスクロールされるため、最新投稿までスクロールされていない
          // ? 一番下にスクロール
          const chatLog = this.$refs.target
          if (!chatLog) return 
          chatLog.scrollTop = chatLog.scrollHeight
        })
      })
      this.chatMessage = "";
    },
    // * チャット選択を変更する
    chatGroupChange(id) {
        axios.get(`http://localhost:8888/api/v1/chat_message/?job_id=${id}`)
      .then(response => {
        this.chats = response.data
      })
      const chatLog = this.$refs.target
      console.log(chatLog)
      // ! チャットを選択したら最新内容からチャット内容が見れるようにする
    },
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
          cursor: pointer;
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
          margin-top: 0.5rem;
          height: 85%;
          width: 92%;
          padding: 1rem 2rem;
          overflow: scroll;
          display: flex;
          flex-direction: column;
          // align-items: center;
            .balloon {
              margin-bottom: 2em;
              position: relative;
            }
            .balloon:before,.balloon:after {
              clear: both;
              content: "";
              display: block;
            }
            .balloon-image-left,.balloon-image-right {
              width: 68px;
              height: 68px;
            }
            .balloon-image-left {
              float: left;
                // margin-right: 20px;
            }
            .balloon-image-right {
              float: right;
                // margin-left: 20px;
            }
            .balloon-img {
              @include user-image;
              width: 70%;
              height: 70%;
              border-radius: 50%;
              margin: 0;
              background-color: #ffffff;
            }
            .balloon-image-description {
                padding: 5px 0 0;
                font-size: 10px;
                text-align: center;
                background-color: #ffffff;
            }
            .balloon-text-right,.balloon-text-left {
                position: relative;
                padding: 0.8rem 1.4rem;
                border: 1px solid #aaa;
                border-radius: 10px;
                max-width: -webkit-calc(100% - 120px);
                max-width: calc(100% - 120px);
                display: inline-block;
                background-color: #ffffff;
                text-align: left;
            }
            .balloon-text-right {
                float: left;
            }
            .balloon p {
                margin: 0 0 20px;
            }
            .balloon p:last-child {
                margin-bottom: 0;
            }
            /* 三角部分 */
            .balloon-text-right:before {
                position: absolute;
                content: '';
                border: 10px solid transparent;
                border-right: 10px solid #aaa;
                top: 15px;
                left: -20px;
            }
            .balloon-text-right:after {
                position: absolute;
                content: '';
                border: 10px solid transparent;
                border-right: 10px solid #ffffff;
                top: 15px;
                left: -19px;
            }
            .balloon-text-left:before {
                position: absolute;
                content: '';
                background-color: #ffffff;
                border: 10px solid transparent;
                border-left: 10px solid #aaa;
                top: 15px;
                right: -20px;
            }
            .balloon-text-left:after {
                position: absolute;
                content: '';
                border: 10px solid transparent;
                border-left: 10px solid #f2f2f2;
                top: 15px;
                right: -19px;
                background-color: #ffffff;
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
            height: 80%;
            padding: 0.5rem;
            background-color: #DDDDDD;
            border: none;
            float: left;
            resize: none;
            outline: none;
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