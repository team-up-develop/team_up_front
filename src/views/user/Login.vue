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
  width: 85%;
  margin: 0 auto;
  }
.login-container{
  width: calc(100% - 5rem);
  height: 90vh;
  margin: 2rem auto;
  border: solid 1px #B9B9B9;
  border-radius: 20px;
  }
.login-box{
  width: 500px;
  height: 400px; 
  margin: 0 auto;
  background-color:#fff;
  }
.login-title{
  color: #2ac1df;
  font-size: 50px;
  font-weight: bold;
  /* width: 120px; */
  height: 50px;
  padding: 30px 0;
  }
.name-form{
  width: 100%;
  height: 80px;
  margin: 3rem 0;
}
.input{
  background: #f4f8fa;
  border: none;
  border-radius: 0;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0 70px;
  border-radius: 4px;
  width: 300px;
  height: 100px;
  color: #818181;
}
.login-btn{
  display: block;
  padding: 30px 70px;
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
  margin: 40px 40px 0 40px;
  }
}
@media (max-width: 768px){
  .login-box{
  width: 100%;
  margin: 80px 0;
  padding: 0px;
  }
  .name-form{
  height: 80px;
  width: 100%;
  margin: 2rem 0;
  }
  .login-title{
    padding: 30px;
    font-size: 50px;
    }
  .input{
  width: 220px;
  padding: 0 ;
  height: 80px;
  margin: 0 10px;
  padding: 0 30px;
  }
}
@media (max-width: 479px){
  .login-box{
  width: 100%;
  margin: 10px 0;
  }
.name-form{
  height: 50px;
  width: 100%;
  margin: 1rem 0;
  }
.login-title{
    padding: 30px;
    font-size: 30px;
    }
.input{
  width: 100px;
  height: 50px;
  }

.login-btn{
  padding: 20px 30px;
  margin: 10px 40px 0 40px;
  }
}
</style>