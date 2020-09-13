<template>
  <div>
    <div class="false-user-login">
      <div class="top-login-title">
        簡単登録
      </div>
      <div class="register-form-area">
        <label for="name" class="label">ログイン名</label>
        <input type="text" class="input" v-model="LoginName" placeholder="ログイン名">
        <label for="name" class="label">パスワード</label>
        <input type="password" class="input" v-model="LoginPassword" placeholder="パスワード">
      </div>
      <div @click="register" class="register-btn">新規登録</div>
    </div>
    <div class="false-user-Advertisement">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      LoginName: '',
      LoginPassword: '',
    }
  },
  methods: {
    register() {
      const data = {
        LoginName: this.LoginName,
        LoginPassword: this.LoginPassword,
      }
      axios.post(`${this.$baseURL}/signup`, data)
      .then(response => {
        console.log(response)
      });
      this.LoginName = "";
      this.LoginPassword = "";
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  .false-user-login {
    width: calc(75% - 4rem);
    height: calc(44vh - 4rem);
    background-color: #ffffff;
    border: solid 1px #B9B9B9;
    border-radius: 8px;
    margin-bottom: 1rem;
    margin-top: 1rem;
    padding: 0 2rem 2rem 2rem;
    /* position: sticky;
    top: 0; */
  }
  .top-login-title {
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    position: relative;
    color: #2196F3;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0.5rem;
  }
  .top-login-title:after {
    content: "";
    display: block;
    height: 4px;
    /* background: -webkit-linear-gradient(to right, #1142e2, transparent);
    background: linear-gradient(to right, #19bde6, transparent); */
  }
  .top-login-title:after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    content: '';
    border-radius: 3px;
    background-image: -webkit-gradient(linear, right top, left top, from(#19bde6), to(#1142e2));
    background-image: -webkit-linear-gradient(right, #19bde6 0%, #1142e2 100%);
    background-image: linear-gradient(to left, #19bde6 0%, #1142e2 100%);
  }
  .register-form-area {
    width: 100%;
    height: 65%;
    margin-top: 0.5rem;
    /* background-color: yellow; */
  }
  .input {
    width: calc(100% - 2rem);
    background: #f4f8fa;
    border: none;
    border-radius: 0;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 1rem;
    border-radius: 4px;
    /* width: 300px; */
    margin: 0 0 20px;
    color: #818181;
  }
  .label {
    color: #444444;
    font-size: 14px;
  }
  .false-user-Advertisement {
    width: 75%;
    height: 40vh;
    background-color: #ffffff;
    /* border: solid 1px #B9B9B9; */
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  .register-btn{
    display: block;
    padding: 1rem 2rem;
    background: linear-gradient(60deg,#1142e2,#19bde6);
    /* background: linear-gradient(60deg,#BA68C8,#673AB7); */
    border-radius: 25px;
    font-size: .875rem;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 0px 5px 2px #d4d4d4;
    transition: .3s;
  }
  .register-btn:hover {
    background: linear-gradient(60deg,#1142e2,#19bde6);
    color: #F8FAFF;
    appearance: none;
    border: none;
    box-shadow: 0 5px 20px -3px #1142e2;
    /* background: -moz-linear-gradient(top, #8C1BAB, #F761A1); */
    /* background: -webkit-linear-gradient(top, #8C1BAB, #F761A1); */
    /* background: linear-gradient(to bottom, #8C1BAB, #F761A1); */
    transition: .3s;
    /* box-shadow:1px 1px 5px rgba(0, 0, 0, 0.685); */
  }
}
</style>