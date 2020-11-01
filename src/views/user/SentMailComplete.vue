<template>
  <section>
    <div class="wrapper">
        <div class="card-title">登録確認メール送信完了</div>
      <div class="container">
        <div class="card">
          <img class="img" src="@/assets/images/mail-comp.jpg" />
          <div>
            <span>
              チームアップに登録ありがとうございます。<br>
              メールを確認してください。 <br>
              <span>まだ登録は完了しておりません。<br></span>
            </span>
          </div>
          <div class="btn-area">
            <button class="btn-top" @click="topRedirect">TOPへ</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MailComp from '@/assets/images/mail-comp.jpg'
export default {
  data() {
    return {
      assetsImage: MailComp,
      assetsImage_NG: '@/assets/images/mail-comp.jpg',
      staticImage: '@/assets/images/mail-comp.jpg',
    }
  },
  methods: {
    topRedirect() {
      return this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 42%; 
  margin: 2rem auto 0 auto;

  .card-title {
    color: #673AB7;
    font-size: 1.4rem;
    font-weight: bold;
    height: 50px;
    padding: 1rem 2rem;
    margin-top: 1rem;
  }

  .container {
    width: 80%;
    max-width: 500px;
    height: 66vh;
    margin: 0rem auto 3rem auto;
    border: solid 1px #B9B9B9;
    border-radius: 20px;
    padding: 0 2rem 2rem 2rem;
  }

  .card {
    width: 85%; 
    height: 90%;
    margin: 0 auto;
    position: relative;

    img {
      width: 90%;
      max-width: 450px;
    }

    span {
      line-height: 1.8;
      margin: 1rem 0;
      text-align: center;
      font-weight: bold;

      span {
        line-height: 3;
        color: rgb(177, 14, 136);
      }
    }

    .btn-area {
      padding: 20% 0 0 0;

      .btn-top {
        display: block;
        padding: 1.2rem 5rem;
        border: #673AB7 1px solid;
        background-color: #ffffff;
        border-radius: 50px;
        font-size: .875rem;
        font-weight: 600;
        color: #673AB7;
        line-height: 1;
        text-align: center;
        max-width: 280px;
        margin: auto;
        font-size: 1.3rem;
        display: inline-block;
        cursor: pointer;
        margin: 0 auto;
        transition: .3s;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.685);
        outline: none;
      }
    }
  }
}

@media (max-width: 1440px) {
  .wrapper
  .container {
    width: 75%;

    .card 
    .btn-area {
      padding: 15% 0 0 0;
    }
  }
}

@media (max-width: 1100px) {
  .wrapper {
    width: 50%;
  }
  .container 
  .card {
    width: 100%;
    height: 70%;
    margin: 0 auto;
    position: relative;
  }
}

/* タブレット */
@media (max-width: 900px) {
  .wrapper {
    width: 75%;
  }
  .container 
  .card {
    width: 100%;
    height: 70%;
    margin: 0 auto;
    position: relative;

    img {
      width: 80%;
      max-width: 450px;
    }
  }
}

@media (max-width: 768px) {
  .wrapper {
    width: 100%;
  }
  .container 
  .card {
    width: 100%;
    height: 70%;
    margin: 0 auto;
    position: relative;
  }
}

/* スマホではだいたいこのピクセルから */
@media (max-width: 500px) {
  .wrapper {
    width: 100%;

    .container {
      margin: 0 auto 2rem auto;
      width: calc(100% - 5rem);
    }
  }
}

@media (max-width: 420px) {
  .wrapper 
  .container {
    width: calc(97% - 2rem);
    height: 70%;
    margin: 0rem auto 3rem auto;
    border: solid 1px $card-border-color;
    border-radius: 20px;
    padding: 2rem 1rem;
  }
}
</style>