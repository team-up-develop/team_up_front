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
            <li class="menu-list">
              <div class="menu-list-icon-area">
                <!-- <font-awesome-icon icon="user-plus" class="icon"/> -->
              </div>
              <router-link to="/jobcreate" class="router-link">募集する</router-link>
            </li>
            <li class="menu-list">
              <div class="menu-list-icon-area">
                <!-- <font-awesome-icon icon="comments" class="icon"/> -->
              </div>
              <router-link to="/chat" class="router-link">連絡する</router-link>
            </li>
            <li class="menu-list">
              <div class="menu-list-icon-area">
                <!-- <font-awesome-icon icon="address-card" class="icon"/> -->
              </div>
              <router-link to="/manage" class="router-link">管理する</router-link>
            </li>
            <!-- <li class="menu-list">
              <div class="menu-list-icon-area">
              </div>
              <router-link to="/manage/ManageRejectDetail" class="router-link">pagination</router-link>
            </li> -->
          </ul>
        </div>
        <div class="header-main-right">
          <router-link :to="`/account/profile/${ this.userId }`">
            <div class="user-image"></div>
          </router-link>
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
      userId: null,
      // assetsImage: LogoImage,
      // assetsImage_NG: '.../assets/logo.jpg',
      // staticImage: '.../assets/logo.jpg',
      isActive: true,
      hasError: false,
      // userName: null,
      // message: ""
    }
  },
  created() {
    if( localStorage.userId !== undefined) {
      this.userId = localStorage.userId;
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1440px) {
  .router-link-active {
    /* color: #00A1D6; */
    /* background-color: #00A1D6; */
    border-bottom: 4px solid #2196F3;
    font-weight: bold;
  }

  .header-wrapper {
    width: 100%;
    height: 58px;
    box-shadow: 0px 4px 3px -3px rgba(216, 216, 216, 0.6);
    margin-bottom: 2px;
    /* position: fixed; */
    top: 0px;
    left: 0px;

    /* background-color: #2196F3; */
    /* border: 1px solid #B9B9B9; */
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
      /* background-color: red; */

      .header-main-left {
        width: 60%;
        height: 100%;
        /* background-color: yellow; */
      }
    }
  }

  ul {
    width: 100%;
    /* background-color: rgba(255, 255, 0, 0.404); */
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

      /* background-color: yellow; */
    }

    li {
      .menu-list-icon-area {
        width: 25%;
        height: 100%;

        /* margin-left: 10px; */
        pointer-events: none;

        .icon {
          font-size: 20px;
          padding: 0.7rem 0;
          color: #00A1D6;
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

        /* color: #00A1D6; */
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
      transition: all 0.3s ease 0s;
      display: inline-block;
      text-align: center;
      margin-left: 1rem;
      color: #444444;
      font-weight: bold;
    }

    li .router-link-about {
      width: 105%;
      position: absolute;
      top: 0;
      right: 0;
      padding: 1.3rem  0;
      text-decoration: none;

      /* color: #00A1D6; */
      color: #111111;
      font-size: 14px;
      margin: 0 auto;
    }
  }

  .header-wrapper .header-main-area .header-main-right {
    width: 5%;
    height: calc(100% - 0.4rem);
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.5rem 3rem 0.4rem 3rem;

    /* background-color: #8700d61f; */

    .user-image {
      background-color: #ffffff;
      -moz-border-radius: 60px;
      -webkit-border-radius: 60px;
      border-radius: 60px;
      box-shadow: 0 0 0 3px #2196F3;
      -webkit-box-shadow: 0 0 0 3px #2196F3;
      -moz-box-shadow: 0 0 0 3px #2196F3;
      width: 2.8rem;
      height: 2.6rem;
      border-radius: 50%;
      float: right;
      cursor: pointer;
    }

    .user-login-btn {
      display: block;
      padding: 0.9rem 2rem;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.363);
      background: -moz-linear-gradient(top, #3C8CE7, #00EAFF);
      background: -webkit-linear-gradient(top, #3C8CE7, #00EAFF);
      background: linear-gradient(to bottom, #3C8CE7, #00EAFF);
      border-radius: 50px;
      font-weight: 600;
      color: #fff;
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
      display: block;
      padding: 0.9rem 2rem;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.363);
      background: -moz-linear-gradient(top, #E91E63, #EC407A);
      background: -webkit-linear-gradient(top, #E91E63, #EC407A);
      background: linear-gradient(to bottom, #E91E63, #EC407A);
      border-radius: 50px;
      font-weight: 600;
      color: #fff;
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
    color: #fff;
  }
}
</style>