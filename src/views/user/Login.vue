<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-title">LOGIN</div>
      <div class="login-box">
        <div class="name-form">
          <input type="text" class="input" v-model="LoginName" placeholder="ログイン名">
        </div>
        <div class="name-form">
          <input type="password" class="input" v-model="LoginPassword" placeholder="パスワード">
        </div>
        <div @click="login" class="login-btn">ログイン</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LoginName: '',
      LoginPassword: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        LoginName: this.LoginName,
        LoginPassword: this.LoginPassword,
      })
      this.LoginName = "";
      this.LoginPassword = "";
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
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
  border: solid 1px #B9B9B9;
  border-radius: 20px;
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
}
@media (max-width: 768px){
  .login-box{
  width: 100%;
  height: 400px;
  padding: 0px;
  }
  .name-form{
  height: 50px;
  margin-top:50px;
  width: 100%;
  }
  .input{
  width: 200px;
  }
  .login-btn{
    margin-top: 80px;
  }
}
</style>