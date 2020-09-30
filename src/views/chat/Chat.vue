<template>
<div class="chat-wrapper">
  <div class="chat-wrapper-card" v-if="loginFlag === true">
    <div class="card-left">
      <router-link :to="`/chat/${ chatGroup.job.id }`" v-for="chatGroup in chatGroups" :key="chatGroup.job.id" class="router">
        <div class="chat-group-area">
          <p>{{ chatGroup.job.jobTitle | truncateDetailTitle }}</p>
        </div>
      </router-link>
    </div>
    <div class="card-right">
      <div class="card-right-bottom">
        <input type="text" class="chat-form" name="" maxlength="250">
      </div>
    </div>
  <section class="container">
    <input
      v-model="message"
      type="text"
      @keyup.enter="say">
  </section>
  </div>
    <div v-else>
      ログインが必要です！
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      chatGroups: [],
      loginFlag: false,
      userId: this.$store.state.auth.userId,
      message: '',
      canMessageSubmit: false
    }
  },
  filters: {
    //* 案件タイトル 詳細 文字制限
    truncateDetailTitle: function(value) {
      var length = 18;
      var ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  mounted() {
    // * 参加案件のみを取得する
    if(this.$store.state.auth.userId !== undefined) {
      this.loginFlag = true
      axios.get(`${this.$baseURL}/apply_job/?user_id=${ this.userId }`)
      .then(response => {
        const array = [];
        for(let i = 0; i < response.data.length; i++){
          const applyData = response.data[i]
          console.log(applyData)
          if(applyData.applyStatusId === 2 || applyData.applyStatusId === 4 ){
            array.push(applyData)
            this.chatGroups = array
          }
          else {
            console.log("Not Found")
          }
        }
      })
    }
  },
  methods: {
    say: function() {
      console.log("aaaaaaaaaaa")
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

        .router {
          text-decoration: none;
        }

        .chat-group-area {
          width: 90%;
          margin: 0 auto;
          padding: 0.3rem 0;

          p {
            text-align: left;
            color: $text-main-color;
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
        .card-right-bottom {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 99.9%;
          height: 7%;
          border-radius: 0 0px 20px 0;
          background-color: rgb(255, 255, 255);
          padding: 1rem 0;

          .chat-form {
            width: 85%;
            border-radius: 8px;
            height: 100%;
            background-color: #DDDDDD;
            border: none;
          }
        }
      }
    }
  }
}

</style>