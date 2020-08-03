<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-title">REGISTER</div>
      <div class="login-box">
        <div class="name-form">
          <input type="text" class="input" v-model="LoginName" placeholder="ログイン名">
        </div>
        <div class="name-form">
          <input type="password" class="input" v-model="LoginPassword" placeholder="パスワード">
        </div>
        <div @click="register" class="login-btn">新規登録</div>
      </div>
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
      axios.post('http://localhost:8888/api/v1/signup', data)
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
.login-wrapper{
  width: 100%;
  height: 100%;
}
.login-container{
  width: 80%;
  height: calc(100vh - 240px);
  margin: 0 auto;
}
.login-box{
  width: 600px;
  height: 320px;
  margin: 0 auto;
  padding: 60px;
  background-color: #fff;
}
.login-title{
  color: #2ac1df;
  font-size: 22px;
  font-weight: bold;
  /* width: 120px; */
  height: 30px;
  padding: 20px 0;
}
.name-form{
  width: 400px;
  height: 100px;
  margin: 0 auto;
}
.input{
  background: #f4f8fa;
  border: none;
  border-radius: 0;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 20px;
  border-radius: 4px;
  width: 300px;
  margin: 0 0 20px;
  color: #818181;
}
.login-btn{
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
  margin: 20px 40px 0 40px;
}

</style>