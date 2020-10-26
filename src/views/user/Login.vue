<template>
  <div class="login-wrapper">
    <div class="login-title">LOGIN</div>
    <div class="login-container">
      <div class="login-box">
        <div class="name-form">
          <label for="name">ログイン名</label>
          <input type="text" class="input" v-model="LoginName" placeholder="ログイン名">
        </div>
        <div class="name-form">
          <label for="name">パスワード</label>
          <input type="password" class="input" v-model="LoginPassword" placeholder="パスワード">
        </div>
        <div class="btn-area">
          <p>登録してない方は<router-link to="/register" class="router-link"><span>こちら</span></router-link></p>
          <div @click="login" class="login-btn">ログイン</div>
        </div>
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

<style lang="scss" scoped>
.router-link {
  text-decoration: none;
}

.login-wrapper {
  width: 45%;
  margin: 0 auto;

  .login-container {
    width: calc(100% - 12rem);
    height: 66vh;
    margin: 0rem auto 3rem auto;
    border: solid 1px #B9B9B9;
    border-radius: 20px;
    padding: 2rem;
  }
}

/* 登録カード */
.login-title {
  color: $primary-color;
  font-size: 1.8rem;
  font-weight: bold;
  height: 50px;
  padding: 1rem 2rem;
  margin-top: 1rem;
}

/* フォーム & ボタン ボックス */
.login-container .login-box {
  width: 90%;
  height: 90%;
  margin: 0 auto;
  position: relative;
}

.login-box {
  .btn-area {
    padding: 20% 0 0 0;
    height: 30%;
  }

  span {
    cursor: pointer;
    color: $primary-color;
  }

  .name-form {
    width: 100%;
    height: 80px;
    margin: 10% 0rem 14% 0;
    transition: 0.3s;
    text-align: left;

    .input {
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 100%;
      height: 65%;
      padding: 0.3em;
      transition: 0.3s;
      color: #111111;
      letter-spacing: 1px;
      border: 1px solid #A3A1A1;
      border-radius: 4px;
      padding: 0.5rem 0.5rem;
      background-color: #EFEFEF;
    }

    input {
      &[type='text']:focus, &[type='password']:focus {
        @include primary-border_color;
        outline: none;
        box-shadow: 0 0 5px 1px #2195f348;
      }
    }
  }

  .btn-area .login-btn {
    @include blue-btn;
    display: block;
    padding: 1.2rem 5rem;
    border-radius: 50px;
    font-size: .875rem;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1.3rem;
    display: inline-block;
    cursor: pointer;
    border: none;
    margin: 0 auto;
    transition: .3s;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.685);
    outline: none;
  }
}
@media (max-width: 1200px) {
  .login-wrapper .login-container {
    width: 80%;
    height: 60vh;
    margin: 0rem auto 3rem auto;
    border: solid 1px $card-border-color;
    border-radius: 20px;
    padding: 2rem;
  }
}

/* タブレット */
@media (max-width: 900px) {
  .login-wrapper {
    width: 75%;
  }
  .login-container .login-box {
    width: 100%;
    height: 70%;
    margin: 0 auto;
    position: relative;
  }

  .login-box {
    span {
      cursor: pointer;
    }

    .name-form {
      width: 100%;
      height: 80px;
      margin: 3rem 0;
    }
  }
}

@media (max-width: 768px) {
  .login-wrapper {
    width: 100%;
  }
  .login-container .login-box {
    width: 100%;
    height: 70%;
    margin: 0 auto;
    position: relative;
  }

  .login-box .name-form {
    width: 100%;
    height: 80px;
    margin: 3rem 0;

    .input {
      width: 95%;
    }
  }
}

/* スマホではだいたいこのピクセルから */
@media (max-width: 500px) {
  .login-wrapper {
    width: 100%;

    .login-container {
      margin: 0 auto 2rem auto;
      width: calc(100% - 5rem);
    }
  }
}

@media (max-width: 420px) {
  .login-btn {
    padding: 1.4rem 3rem;
  }

  .login-wrapper .login-container {
    width: calc(97% - 2rem);
    height: 70%;
    margin: 0rem auto 3rem auto;
    border: solid 1px $card-border-color;
    border-radius: 20px;
    padding: 2rem 1rem;
  }

  .login-box .name-form {
    .input {
      width: 100%;
    }
    font-size: 14px;
  }
}
</style>