<template>
  <div class="left-side-bar-wrapper">
    <div class="user-area">
      <div class="user-area-left">

      </div>
      <div class="user-area-right">
        坂本 一弥
      </div>
    </div>
    <div class="left-menu-bar">
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
          <router-link to="/jobcreate" class="router-link">メンバー募集</router-link>
        </li>
        <li class="menu-list">
          <div class="menu-list-icon-area">
            <font-awesome-icon icon="bookmark" class="icon"/>
          </div>
          <router-link to="/favorite_job" class="router-link">保存済み</router-link>
        </li>
        <li class="menu-list">
          <div class="menu-list-icon-area">
            <font-awesome-icon icon="comments" class="icon"/>
          </div>
          <router-link to="/chat" class="router-link">チャット</router-link>
        </li>
        <li class="menu-list">
          <div class="menu-list-icon-area">
            <font-awesome-icon icon="archive" class="icon"/>
          </div>
          <router-link to="/apply_job" class="router-link">応募済み</router-link>
        </li>
        <li class="menu-list">
          <div class="menu-list-icon-area">
            <font-awesome-icon icon="address-card" class="icon"/>
          </div>
          <router-link to="/manage" class="router-link">管理画面</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  /* 全体 */
  .left-side-bar-wrapper {
    width: 17%;
    height: 100%;
    background-color: #ffffff;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    position: fixed;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.288);
  }
  /* ユーザー画像 / 名前 */
  .user-area {
    width: 100%;
    height: 100px;
    position: relative;
  }
  .user-area-left {
    width: 40%;
    height: 100%;
  }
  .user-area-right {
    width: 52%;
    height: 20%;
    padding: 40px 10px;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    text-align: left;
  }
  /* メニューバー */
  .left-menu-bar {
    width: 100%;
    height: 100%;
  }
  ul {
    padding: 0;
  }
  /* メニュー１つ１つ */
  ul .menu-list {
    height: 35px;
    list-style: none;
    width: 100%;
    padding: 20px 0;
    font-size: 14px;
    margin: 2px 0;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
  ul li .menu-list-icon-area {
    width: 25%;
    height: 100%;
    margin-left: 5px;
  }
  ul li .menu-list-icon-area .icon {
    font-size: 25px;
    padding: 5px 0;
    color: #6d6c6c;
  }
  ul li .router-link {
    width: 70%;
    position: absolute;
    top: 0;
    right: 0;
    text-align: left;
    padding: 30px 0;
  }
}
@media screen and (max-width: 959px) {
  .user-area {
    background-color: blue;
  }
}
</style>