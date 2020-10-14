<template>
  <dir class="top-wrapper">
    <div class="container">
      <div class="top-ad-area">
        <div class="top-ad-left">
          <div class="ad-title-area">
            チーム開発をすぐに始めれる
          </div>
          <div class="ad-subtitle-area">
            本気でキャリアを変えようと努力している未経験エンジニア同士が
            オンラインでの「チーム開発」を通じて相互に成長し、
            エンジニアとしてスタートを切る。
          </div>
        </div>
        <div class="top-ad-right">
          <div class="btn-area">
            <button class="register-btn">登録する</button>
            <button class="login-btn">ログインする</button>
          </div>
        </div>
      </div>
      <div class="center-ad-area">
        <input type="text" class="serach-freeword" placeholder="フリーワードを入力してください">
        <button class="search-freeword-btn">検索する</button>
      </div>
      <div class="bottom-ad-area">
        <label for="name" class="keyword-tag">おすすめキーワード</label>
        <div class="language-area">
          <label for="name" class="language-tag">開発言語</label>
          <div class="langage">
            <div class="language-box">
              JavaScript
            </div>
            <div class="language-box">
              Go
            </div>
            <div class="language-box">
              Ruby
            </div>
            <div class="language-box">
              JavaScript
            </div>
            <div class="language-box">
              Go
            </div>
            <div class="language-box">
              Ruby
            </div>
            <div class="language-box">
              JavaScript
            </div>
            <div class="language-box">
              Go
            </div>
            <div class="language-box">
              Ruby
            </div>
            <div class="language-box">
              Go
            </div>
            <div class="language-box">
              Ruby
            </div>
            <div class="language-box">
              Go
            </div>
            <div class="language-box">
              Ruby
            </div>
          </div>
        </div>
        <div class="framework-area">
          <label for="name" class="framework-tag">フレームワーク</label>
          <div class="framework">
            <div class="framework-box">
              React
            </div>
            <div class="framework-box">
              Vue.js
            </div>
            <div class="framework-box">
              Nuxt.js
            </div>
            <div class="framework-box">
              React
            </div>
            <div class="framework-box">
              Vue.js
            </div>
            <div class="framework-box">
              Nuxt.js
            </div>
            <div class="framework-box">
              React
            </div>
            <div class="framework-box">
              Vue.js
            </div>
            <div class="framework-box">
              Nuxt.js
            </div>
            <div class="framework-box">
              Vue.js
            </div>
            <div class="framework-box">
              Nuxt.js
            </div>
          </div>
        </div>
        <div class="skill-area">
          <label for="name" class="skill-tag">その他スキル</label>
          <div class="skill">
            <div class="skill-box">
              Adobe XD
            </div>
            <div class="skill-box">
              Docker
            </div>
            <div class="skill-box">
              AWS
            </div>
            <div class="skill-box">
              Adobe XD
            </div>
            <div class="skill-box">
              Docker
            </div>
            <div class="skill-box">
              AWS
            </div>
            <div class="skill-box">
              Adobe XD
            </div>
            <div class="skill-box">
              Docker
            </div>
            <div class="skill-box">
              AWS
            </div>
            <div class="skill-box">
              Docker
            </div>
            <div class="skill-box">
              AWS
            </div>
          </div>
        </div>
      </div>
    </div>
  </dir>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1440px) {
  .top-wrapper {
    width: 85%;
    height: 90vh;
    margin: 0 auto;
    position: relative;

    .container {
      width: calc(100% - 5rem);
      border-radius: 20px;
      margin: 2rem 0rem;
      padding: 2.5rem;
      position: absolute;
      right: 0;
      height: 82%;
      // background-color: rgb(204, 204, 204);

      // * トップ 広告エリア
      .top-ad-area {
        width: 100%;
        height: 20vh;
        // background-color: yellow;
        position: relative;

        .top-ad-left {
          width: 50%;
          height: 100%;
          // background-color: rgb(155, 155, 218);
          position: absolute;
          left: 0;
          top: 0;
          text-align: left;

          .ad-title-area {
            color: #1142e2;
            background: -webkit-linear-gradient(0deg, #1142e2, #19bde6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 2.3em;
          }
          .ad-subtitle-area {
            width: 80%;
            padding: 1.5rem 0;
            font-weight: bold;
            line-height: 1.4;
            // background-color: rgb(207, 87, 87);
          }
        }

        .top-ad-right {
          width: 50%;
          height: 50%;
          // background-color: rgb(92, 202, 198);
          position: absolute;
          right: 0;
          bottom: 0;

          .btn-area {
            width: 57%;
            height: 100%;
            // background-color: green;
            float: right;
            position: relative;

            .register-btn {
              @include purple-btn;
              text-align: left;
              display: block;
              padding: 1.1rem 3rem;
              border-radius: 8px;
              border: none;
              font-size: .875rem;
              font-weight: 600;
              color: $basic-white;
              line-height: 1;
              text-align: center;
              max-width: 280px;
              margin: auto;
              font-size: 1rem;
              float: right;
              cursor: pointer;
              transition: .3s;
              outline: none;
              position: absolute;
              left: 0;
            }

            .login-btn {
              border: solid 1px #673AB7;
              color: #673AB7;
              background-color: #ffffff;
              text-align: left;
              display: block;
              padding: 1.1rem 2rem;
              border-radius: 8px;
              font-size: .875rem;
              font-weight: 600;
              line-height: 1;
              text-align: center;
              max-width: 280px;
              margin: auto;
              font-size: 1rem;
              float: right;
              cursor: pointer;
              transition: .3s;
              outline: none;
              position: absolute;
              right: 0;
            }
          }
        }
      }

      // * 中央 フリーワード 
      .center-ad-area {
        padding: 2rem 0;
        width: 100%;
        height: 12vh;
        position: relative;

        .serach-freeword {
          @include input-border-color;
          height: 52px;
          width: 75%;
          position: absolute;
          left: 0;
          border-radius: 32px;
          font-size: 2rem;
          padding: 0.2rem 2rem;
          outline: none;
        }

        .search-freeword-btn {
          @include blue-btn ;
          text-align: left;
          display: block;
          padding: 1.3rem 3.5rem;
          border-radius: 32px;
          border: none;
          font-size: .875rem;
          font-weight: 600;
          color: $basic-white;
          line-height: 1;
          text-align: center;
          max-width: 280px;
          margin: auto;
          font-size: 1rem;
          float: right;
          cursor: pointer;
          transition: .3s;
          outline: none;
          position: absolute;
          right: 0;
        }
      }

      // * おすすめキーワード
      .bottom-ad-area {
        width: 100%;
        height: 40%;
        text-align: left;
        display: flex;
        flex-direction: column;

        .keyword-tag {
          font-size: 1.1em;
          font-weight: bold;
        }

        .language-area {
          margin-top: 1rem;
          display: inline-block;

          .language-tag {
            font-size: 1em;
            font-weight: bold;
          }

          .langage {
            width: 100%;
            display: flex;
          
            .language-box {
              background-color: $basic-white;
              color: $language-color;
              border: 1px solid $language-color;
              padding: 0.5rem 1rem;
              border-radius: 8px;
              font-size: .875rem;
              font-weight: 600;
              line-height: 1;
              text-align: center;
              max-width: 130px;
              font-size: 1rem;
              cursor: pointer;
              transition: .3s;
              outline: none;
              margin-right: 0.8rem;
              margin-top: 0.4rem;
            }
          }
        }

        .framework-area {
          margin-top: 1rem;
          display: inline-block;

          .framework-tag {
            font-size: 1em;
            font-weight: bold;
          }

          .framework {
            width: 100%;
            display: flex;

            .framework-box {
              background-color: $basic-white;
              color: $framework-color;
              border: 1px solid $framework-color;
              padding: 0.5rem 1rem;
              border-radius: 8px;
              font-size: .875rem;
              font-weight: 600;
              line-height: 1;
              text-align: center;
              max-width: 130px;
              font-size: 1rem;
              cursor: pointer;
              transition: .3s;
              outline: none;
              margin-right: 0.8rem;
              margin-top: 0.4rem;
            }
          }
        }

        .skill-area {
          margin-top: 1rem;
          display: inline-block;

          .skill-tag {
            font-size: 1em;
            font-weight: bold;
          }

          .skill {
            width: 100%;
            display: flex;

            .skill-box {
              background-color: $basic-white;
              color: $skill-color;
              border: 1px solid $skill-color;
              padding: 0.5rem 1rem;
              border-radius: 8px;
              font-size: .875rem;
              font-weight: 600;
              line-height: 1;
              text-align: center;
              max-width: 130px;
              font-size: 1rem;
              cursor: pointer;
              transition: .3s;
              outline: none;
              margin-right: 0.8rem;
              margin-top: 0.4rem;
            }
          }
        }

      }
    }
  }
}
</style>