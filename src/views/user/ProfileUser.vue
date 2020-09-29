<template>
  <div class="profile-wrapper">
    <div class="profile-wrapper-card">
      <div class="profile-top-area">
        <div class="profile-top-area-left">
          <div class="user-image"></div>
          <div class="user-name-area">
            <label for="name">名前</label>
            <p>{{ userInfo.userName }}</p>
          </div>
        </div>
        <button @click="openModal">編集する</button>
      </div>
      <div class="tab-area">
        <div class="profile-tab-left" @click="change('1')"  v-bind:class="{ active: isActive, 'text-danger': hasError }">
          <p>スキル</p>
        </div>
        <div class="profile-tab-right" @click="change('2')"  v-bind:class="{ active: isActive, 'text-danger': hasError }">
          <p>詳細情報</p>
        </div>
      </div>
      <div v-if="activeTab === '1'">
        <p>{{ userInfo.userName }}</p>
        <p>{{ userInfo.learningStartDate | moment("YYYY年 M月 D日")}}</p>
        <p>{{ userInfo.githubAccount }}</p>
        <p>{{ userInfo.twitterAccount }}</p>
        <p>{{ userInfo.bio }}</p>
      </div>
      <div v-else-if="activeTab === '2'">プロフィールの詳細とポートフォリオを載せるよ</div>
      <br>
      <!-- 編集 モーダル画面 -->
      <div class="example-modal-window">
        <profile-edit-modal @close="closeModal" v-if="modal">
          <p class="label-lang">プロフィール編集</p>
          <label for="name">名前</label>
          <input type="text" v-model="userName">
          <br>
          <label for="name">学習開発開始時期</label>
          <input type="date" v-model="learningStartDate">
          <br>
          <label for="name">自己紹介</label>
          <textarea type="text" v-model="bio"></textarea>
          <br>
          <label for="name">GitHub</label>
          <input type="url" v-model="githubAccount">
          <br>
          <label for="name">Twitter</label>
          <input type="url" v-model="githubAccount">
          <br>
          <template slot="footer">
            <div class="serach-btn" @click="profileEdit">
              編集
            </div>
          </template>
        </profile-edit-modal>
      </div>
      <Logout/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from "moment";
import ProfileEditModal from '@/components/modal/ProfileEditModal'
import Logout from '@/components/button/Logout'
export default {
  props: {
    id: Number
  },
  data() {
    return {
      userInfo: {},
      activeTab: '1',
      isActive: true,
      hasError: false,
      modal: false,
      userName: "",
      learningStartDate: Date,
      bio: "",
      githubAccount: "",
      twitterAccount: "",
    }
  },
  filters: {
    // * date型を文字に変換
    moment(value, format) {
      return moment(value).format(format);
    },
  },
  created() {
    // * ユーザー情報取得
    axios.get(`http://localhost:8888/api/v1/user/${this.id}`)
    .then(response => {
      this.userInfo = response.data;
      this.userName = this.userInfo.userName; //? ユーザー名前モーダル
      this.learningStartDate = this.userInfo.learningStartDate;
      this.bio = this.userInfo.bio;
      this.githubAccount = this.userInfo.githubAccount;
      this.twitterAccount = this.userInfo.twitterAccount;
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    // * 編集する
    profileEdit() {
      const params = {
        userName: this.userName,
        learningStartDate: this.learningStartDate,
        bio: this.bio,
        githubAccount: this.githubAccount,
        twitterAccount: this.twitterAccount,
      }
      axios.put(`http://localhost:8888/api/v1/user/${this.id}`, params)
      .then(response => {
        console.log(response.data)
        // this.$emit('compliteAssgin', this.message)
      })
      .catch(error => {
        console.log(error)
      })
    },
    change: function(num){
      this.isActive = !this.isActive ;
      this.activeTab = num
    },
    // * モーダル
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
        this.closeModal()
    },
  },
  components: {
    ProfileEditModal,
    Logout
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1440px) {
  .profile-wrapper {
    width: 85%;
    height: 90vh;
    margin: 0 auto;

    /* background-color: #3dc1e2; */
    position: relative;

    .profile-wrapper-card {
      width: 100%;
      height: 82vh;
      border-radius: 20px;
      margin: 2rem 0rem;
      background-color: #ffffff;

      /* float: right; */
      border: solid 1px #B9B9B9;
      padding: 0;
      position: absolute;
      right: 0;
    }
  }

  .profile-top-area {
    width: 85%;
    height: 8%;
    padding: 2rem 4rem;

    /* background-color: yellow; */
    flex-direction: column;
  }

  .profile-top-area-left {
    width: 13%;
    height: 100%;
    position: relative;

    /* background-color: goldenrod; */
  }

  .user-image {
    background-color: #ffffff;
    -moz-border-radius: 60px;
    -webkit-border-radius: 60px;
    border-radius: 60px;
    box-shadow: 0 0 0 3px #2196F3;
    -webkit-box-shadow: 0 0 0 3px #2196F3;
    -moz-box-shadow: 0 0 0 3px #2196F3;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  // * ユーザー名前
  .user-name-area {
    margin-top: 0.8rem;
    width: 30%;
    height: 30%;
    position: absolute;
    right: 0;
    top: 0;
    text-align: left;

    label {
      font-weight: bold;
    }

    p {
      width: 20rem;
      margin: 0;
    }
  }
  // * タブエリア
  .tab-area {
    width: 90%;
    height: 8%;
    margin: 0 auto;
    background-color: #CBCBCB;
    z-index: -1;
    border-radius: 1rem 1rem 0 0 ;

    // ? タブ 左側
    .profile-tab-left {
      width: 49.8%;
      height: 99%;
      display: inline-block;
      text-align: center;
      background-color: #CBCBCB;
      border-radius: 1rem 1rem 0 0 ;
      cursor: pointer;

      p {
        color: #111111;
        font-weight: bold;
      }
    }
    .profile-tab-left.active {
      width: 49.8%;
      height: 98%;
      border: #c2c2c2 1px solid;
      display: inline-block;
      text-align: center;
      background-color: #ffffff;
      border-radius: 1rem 1rem 0 0 ;
    }

    // ? タブ 右側
    .profile-tab-right {
      width: 49.8%;
      height: 98%;
      border: #c2c2c2 1px solid;
      display: inline-block;
      text-align: center;
      background-color: #ffffff;
      border-radius: 1rem 1rem 0 0 ;

      p {
        color: #111111;
        font-weight: bold;
      }
    }

    .profile-tab-right.active {
      width: 49.8%;
      height: 99%;
      display: inline-block;
      text-align: center;
      background-color: #CBCBCB;
      border-radius: 1rem 1rem 0 0 ;
      border: none;
      cursor: pointer;
    }
  }
}
</style>