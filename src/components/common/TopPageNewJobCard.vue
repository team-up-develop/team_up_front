<template>
  <div class="card-box">
    <div class="card-top">
      <span>GO を使用して開発していフロントエンド募集</span>
    </div>
    <div class="card-center">
      <div class="langage">
        GO
      </div> 
      <div class="langage">
        Ruby
      </div> 
      <div class="framework">
        React
      </div>
      <div class="framework">
        Rails
      </div>
      <div class="skill">
        Docker
      </div>
      <div class="skill">
        AWS
      </div>
    </div>
    <div class="card-bottom">
      <div class="product-start-end">
        <div class="product-start-end-tag">
          開発期間:
        </div>
        <div class="product-start-end-time">
          2020年 4月1日 ~ 2020年 8月1日
        </div>
      </div>
      <div class="post-user-area">
        <div class="post-user-image"></div>
        <div class="post-user-name-area">
          <div class="post-user-name">
            玉城 ひろし
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .card-box {
    width: 32%;
    height: 232px;
    margin: 1rem 0.5%;
    border: solid 1px $card-border-color;
    background-color: $basic-white;
    border-radius: 8px;
    transition: .3s;
    color: $text-main-color;
    display: inline-block;

    .card-top {
      width: calc(100% - 3.5rem);
      height: calc(38% - 60px);
      text-align: left;
      padding: 1.2rem 2rem 1rem 1.5rem;
      font-weight: bold;
      pointer-events: none;
      font-size: 16px;
      text-decoration: underline;
      // background-color: yellow;
    }

    .card-center {
      width: calc(100% - 3rem);
      height: calc(40% - 20px);
      padding: 10px 1.5rem 0 1.5rem;
      text-align: left;
      pointer-events: none;
      // background-color: blue;

      .langage {
        @include border_language;
        color: $language-color;
        text-align: left;
        display: inline-block;
        font-size: 12px;
        padding: 5px 0.8rem;
        border-radius: 5px / 5px;
        font-weight: bold;
        pointer-events: none;
        margin: 0 2px 4px 0;
      }

      .framework {
        @include border_framework;
        text-align: left;
        display: inline-block;
        color: $framework-color;
        font-size: 12px;
        padding: 5px 0.8rem;
        border-radius: 5px / 5px;
        font-weight: bold;
        pointer-events: none;
        margin: 0 2px 4px 0;
      }

      .skill {
        @include border-skill;
        color: $skill-color;
        margin: 0 2px 4px 0;
        text-align: left;
        display: inline-block;
        font-size: 12px;
        padding: 5px 0.8rem;
        border-radius: 5px / 5px;
        font-weight: bold;
        pointer-events: none;
      }
    }


    .card-bottom {
      width: calc(100% - 50px);
      height: calc(38% - 20px);
      padding: 0px 25px 10px 25px;
      pointer-events: none;
      margin-top: 0.2rem;
      // background-color: rgba(0, 128, 0, 0.544);

      .product-start-end {
        width: 100%;
        height: 40%;
        text-align: left;
        pointer-events: none;

        .product-start-end-tag {
          display: inline-block;
          pointer-events: none;
          font-size: 14px;
        }

        .product-start-end-time {
          display: inline-block;
          padding: 0 20px;
          pointer-events: none;
          font-size: 14px;
        }
      }

      .post-user-area {
        width: 100%;
        height: 100%;
        text-align: left;
        pointer-events: none;
        position: relative;

        .post-user-image {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          -moz-border-radius: 60px;
          -webkit-border-radius: 60px;
          border-radius: 60px;
          box-shadow: 0 0 0 3px $primary-color;
          -webkit-box-shadow: 0 0 0 3px $primary-color;
          -moz-box-shadow: 0 0 0 3px $primary-color;
          display: inline-block;
          pointer-events: none;
        }

        .post-user-name-area {
          display: inline-block;
          width: 50%;
          height: 60%;
          padding: 0.1rem 1rem;
          pointer-events: none;
          font-size: 14px;

          .post-user-name {
            position: absolute;
            top: 0;
            pointer-events: none;
            margin-top: 1rem;
          }
        }
      }
    }
  }
</style>