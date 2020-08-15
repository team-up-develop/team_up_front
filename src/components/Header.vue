<template>
  <div class="header-wrapper">
    <div class="header-logo-area">
      <div class="header-logo">
        <img class="img" src="../assets/logo.jpg" width="150" />
      </div>
    </div>
    <div class="header-main-area">
      <div class="header-main-left">
        <ul>
          <li class="menu-list">
            <div class="menu-list-icon-area">
              <font-awesome-icon icon="bars" class="icon"/>
            </div>
            <router-link to="/jobs" class="router-link">開発一覧</router-link>
          </li>
          <li class="menu-list">
            <div class="menu-list-icon-area">
              <font-awesome-icon icon="user-plus" class="icon"/>
            </div>
            <router-link to="/jobcreate" class="router-link">募集する</router-link>
          </li>
          <li class="menu-list">
            <div class="menu-list-icon-area">
              <font-awesome-icon icon="comments" class="icon"/>
            </div>
            <router-link to="/chat" class="router-link">連絡する</router-link>
          </li>
          <li class="menu-list">
            <div class="menu-list-icon-area">
              <font-awesome-icon icon="address-card" class="icon"/>
            </div>
            <router-link to="/manage" class="router-link">管理する</router-link>
          </li>
        </ul>
      </div>
      <div class="header-main-right">
        <div class="user-login-btn">
          <router-link to="/login" class="user-rooter">ログイン</router-link>
        </div>
        <div class="user-register-btn">
          <router-link to="/register" class="user-rooter">登録する</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoImage from '../assets/logo.jpg'
export default {
  data() {
    return {
      assetsImage: LogoImage,
      assetsImage_NG: '../assets/logo.jpg',
      staticImage: '../assets/logo.jpg'
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  .header-wrapper {
    width: 100%;
    height: 76px;
    /* box-shadow: 0px 4px 3px -3px rgba(139, 139, 139, 0.6); */
    margin-bottom:2px;
    /* background: linear-gradient(#1f5ae8, #2ac1df); */
    position: relative;
  }
  .header-wrapper .header-logo-area {
    height: 100%;
    width: 20%;
    /* background-color: rgba(0, 68, 255, 0.527); */
  }
  .header-wrapper .header-logo-area .header-logo {
    width: 60%;
    height: 100%;
    margin-left: 4rem;
    padding: 1.5rem 0;

  }
  .header-wrapper .header-main-area {
    height: 100%;
    width: 80%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .header-wrapper .header-main-area .header-main-left {
    width: 60%;
    height: 100%;
    /* background-color: yellow; */
  }

  ul {
    width: 100%;
    /* background-color: rgba(255, 255, 0, 0.404); */
    padding: 0;
    margin: 0;
  }
  ul :hover {
    transform: translateY(-2px);
  }
  ul .menu-list {
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
    /* background-color: yellow; */
  }
  ul li .menu-list-icon-area {
    width: 25%;
    height: 100%;
    margin-left: 5px;
    pointer-events: none;
  }
  ul li .menu-list-icon-area .icon {
    font-size: 18px;
    padding: 0.7rem 0;
    color: #00A1D6;
    pointer-events: none;
  }
  ul li .router-link {
    width: 70%;
    position: absolute;
    top: 0;
    right: 0; 
    text-align: left;
    padding: 1.7rem 0;
    text-decoration: none;
    color: #00A1D6;
    font-size: 17px;
    font-weight: bold;
  }
  .header-wrapper .header-main-area .header-main-right {
    width: 30%;
    height: calc(100% - 2rem);
    position: absolute;
    right: 0;
    top: 0;
    padding: 1rem 0;
  }
  .header-wrapper .header-main-area .header-main-right .user-login-btn {
    display: block;
    padding: 1rem 2rem;
    background: -moz-linear-gradient(top, #1f5ae8, #2ac1df);
    background: -webkit-linear-gradient(top, #1f5ae8, #2ac1df);
    background: linear-gradient(to bottom, #1f5ae8, #2ac1df);
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
  }
  .header-wrapper .header-main-area .header-main-right  .user-register-btn {
    display: block;
    padding: 1rem 2rem;
    background: -moz-linear-gradient(top, #914BE2, #4F5BC6);
    background: -webkit-linear-gradient(top, #914BE2, #4F5BC6);
    background: linear-gradient(to bottom, #914BE2, #4F5BC6);
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
  }
  .user-rooter {
    text-decoration: none;
    color: #fff;
  }
}
</style>