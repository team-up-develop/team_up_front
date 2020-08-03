<template>
  <div class="header-wrapper">
    <div class="header-left">
      <div class="left-logo"></div>
      <div class="left-navbar">
        <div class="navbar-menu">
          <router-link to="/jobs" class="router-menu">開発一覧</router-link>
        </div>
        <div class="navbar-menu">
          <router-link to="/jobcreate" class="router-menu">メンバー募集</router-link>
        </div>
        <div class="navbar-menu">
          <router-link to="/apply_job" class="router-menu">応募済み</router-link>
        </div>
        <div class="navbar-menu">
          <router-link to="/favorite_job" class="router-menu">保存済み</router-link>
        </div>
        <div class="navbar-menu">
          <router-link to="/chat" class="router-menu">チャット</router-link>
        </div>
        <div class="navbar-menu">
          <router-link to="/manage" class="router-menu">管理画面</router-link>
        </div>
        <!-- <div class="navbar-menu">
          <router-link to="" class="router-menu">メンター</router-link>
        </div> -->
      </div>
    </div>
    <div class="header-right">
      <router-link to="/login">
        <div class="login-btn">ログイン</div>
        <!-- <font-awesome-icon icon="bell" class="icon" /> -->
      </router-link>
      <router-link to="/Register">
        <div class="register-btn">新規登録</div>
        <!-- <font-awesome-icon icon="user" class="icon" /> -->
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header-wrapper{
  width: 100%;
  height: 68px;
  box-shadow: 0px 4px 3px -3px rgba(139, 139, 139, 0.6);
  margin-bottom:2px;
  /* background: linear-gradient(#1f5ae8, #2ac1df); */
  position: relative;
}
.header-left{
  height: 100%;
  width: 95%;
  /* display: inline-block; */
  /* position:absolute;
  left: 0; */
  /* position: relative; */
  /* background-color: black; */
}
.header-right{
  width: 250px;
  /* display: inline-block; */
  position: absolute;
  right: 0;
  top: 0;
  height: 23px;
  padding: 20px;
}
.left-logo{
  width: 200px;
  height: 100%;
  display: inline-block;
  /* background-color: rgb(66, 194, 66); */
  margin-left: 20px;
}
.left-navbar{
  width: 80%;
  height: 100%;
  float: right;
}
.navbar-menu{
  width: 79px;
  display: inline-block;
  padding: 15px 10px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
	transition: .3s;
}
.router-menu{
  text-decoration: none;
  font-size: 13px;
  transition: .3s;
  font-weight: bolder;
  color: #5C6171;
}

.router-menu:hover{
  color: #00bfff;
}


.icon {
  font-size: 23px;
  color: #777;
  margin-right: 15px;
}

.login-btn{
  font-size: 13px;
  color: #777;
  margin-right: 5px;
  display: inline-block;
  font-weight: bold;
  background-color: #ffffff;
  color: #00bfff;
  border-radius: 18px;
  padding: 10px 24px;
  text-align: center;
  border: solid 1px #00bfff;
}
.register-btn{
  font-size: 13px;
  margin-right: 5px;
  display: inline-block;
  font-weight: bold;
  background-color: #00bfff;
  color: #fff;
  border-radius: 18px;
  padding: 10px 24px;
  text-align: center;
  border: solid 1px #00bfff;
}
</style>