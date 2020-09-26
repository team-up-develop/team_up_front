<template>
  <div class="header-wrapper">
    <div class="header-wrapper-area">
      <div class="header-logo-area">
        <div class="header-logo">
          <!-- <div
            class="static"
            v-bind:class="{ active: isActive, 'text-danger': hasError }"
          ></div> -->
          <!-- <img class="img" src="../assets/logo.jpg" width="130" /> -->
        </div>
      </div>
      <div class="header-main-area">
        <div class="header-main-left" v-bind:class="{ active: isActive, 'text-danger': hasError }">
          <ul>
            <li class="menu-list">
              <div class="menu-list-icon-area">
                <!-- <font-awesome-icon icon="search" class="icon"/> -->
              </div>
              <router-link to="/jobs" class="router-link">案件を探す</router-link>
            </li>
            <li class="menu-list-about">
              <div class="menu-list-icon-area">
                <!-- <font-awesome-icon icon="comments" class="icon"/> -->
              </div>
              <router-link to="/manage" class="router-link-about">チームアップとは</router-link>
            </li>
            <li class="menu-list">
              <div class="menu-list-icon-area">
                <!-- <font-awesome-icon icon="comments" class="icon"/> -->
              </div>
              <router-link to="/login" class="router-link">ログイン</router-link>
            </li>
            <li class="menu-list">
              <div class="menu-list-icon-area">
                <!-- <font-awesome-icon icon="comments" class="icon"/> -->
              </div>
              <router-link to="/register" class="router-link">登録する</router-link>
            </li>
          </ul>
        </div>
        <div class="header-main-right">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import LogoImage from '.../assets/logo.jpg'

export default {
  props: {
    flag: Boolean
  },
  data() {
    return {
      // assetsImage: LogoImage,
      // assetsImage_NG: '.../assets/logo.jpg',
      // staticImage: '.../assets/logo.jpg',
      isActive: true,
      hasError: false,
      // userName: null,
      // message: ""
    }
  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1440px) {
  .router-link-active {
    border-bottom: 4px solid $primary-color;
    font-weight: bold;
  }

  .header-wrapper {
    width: 100%;
    height: 58px;
    box-shadow: 0px 4px 3px -3px rgba(216, 216, 216, 0.6);
    margin-bottom: 2px;
    top: 0px;
    left: 0px;
  }

  .header-wrapper-area {
    width: 100%;
    height: 76px;
    position: relative;
  }

  .header-wrapper {
    .header-logo-area {
      height: 100%;
      width: 10%;
      padding: 0 0 0rem 2rem;

      .header-logo {
        width: 60%;
        height: calc(100% - 2.8rem);
        background-color: rgba(94, 94, 94, 0.226);
        padding: 1.2rem 0;
      }
    }

    .header-main-area {
      height: 100%;
      width: 86%;
      position: absolute;
      right: 0;
      top: 0;

      .header-main-left {
        width: 60%;
        height: 100%;
      }
    }
  }

  ul {
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: left;

    .menu-list {
      height: 25px;
      list-style: none;
      width: 15%;
      padding: 1rem 0;
      font-size: 14px;
      margin: 6px 0;
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease 0s;
      display: inline-block;
      text-align: center;
    }

    li {
      .menu-list-icon-area {
        width: 25%;
        height: 100%;
        pointer-events: none;

        .icon {
          font-size: 20px;
          padding: 0.7rem 0;
          color: $primary-color;
          pointer-events: none;
        }
      }

      .router-link {
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        padding: 1rem  0;
        text-decoration: none;
        color: #666666;
        font-size: 14px;
        margin: 0 auto;
        font-weight: bold;
      }
    }

    .menu-list-about {
      height: 25px;
      list-style: none;
      width: 20%;
      padding: 1rem 0;
      font-size: 14px;
      margin: 6px 0;
      position: relative;
      cursor: pointer;
      color: #666666;
      transition: all 0.3s ease 0s;
      display: inline-block;
      text-align: center;
      margin-left: 1rem;
      font-weight: bold;
    }

    li .router-link-about {
      width: 105%;
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem  0;
      text-decoration: none;
      color: #666666;
      font-size: 14px;
      margin: 0 auto;
    }
  }

  .header-wrapper .header-main-area .header-main-right {
    width: 30%;
    height: calc(100% - 2rem);
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.8rem 0;

    .user-login-btn {
      @include blue-btn ;
      display: block;
      padding: 0.9rem 2rem;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.363);
      border-radius: 50px;
      font-weight: 600;
      color: $basic-white;
      line-height: 1;
      text-align: center;
      max-width: 280px;
      margin: auto;
      font-size: 1rem;
      display: inline-block;
      cursor: pointer;
      transition: .3s;
    }

    .user-register-btn {
      @include red-btn ;
      display: block;
      padding: 0.9rem 2rem;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.363);
      border-radius: 50px;
      font-weight: 600;
      color: $basic-white;
      line-height: 1;
      text-align: center;
      max-width: 280px;
      margin: auto;
      font-size: 1rem;
      display: inline-block;
      cursor: pointer;
      border: none;
      margin-left: 10px;
      transition: .3s;
    }
  }

  .user-rooter {
    text-decoration: none;
    color: $basic-white;
  }
}
</style>