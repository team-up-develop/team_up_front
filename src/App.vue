<template>
  <div id="app">
    <Header v-if="$store.state.auth.userId || this.loginFlag == true"/>
    <header-login-false v-else />
    <div class="container">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/common/entire/Header'
import Footer from '@/components/common/entire/Footer'
import HeaderLoginFalse from '@/components/common/entire/HeaderLoginFalse'
// import LeftSideBar from '@/components/LeftSideBar'
export default {
  name: 'App',
  data() {
    return {
      loginFlag: false
    }
  },
  components: {
    // LeftSideBar
    Header,
    Footer,
    HeaderLoginFalse,
    // login
  },
  mounted() {
  // console.log(this.$store.state.auth.userId)
    if(this.$store.state.auth.userId) {
      this.loginFlag = true;
      console.log("ログイン中です")
    }
    else {
      console.log("ログアウト中")
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Arial',YuGothic,'Yu Gothic','Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3','メイリオ', Meiryo,'MS ゴシック',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111111;
  position: relative;
  width: 100%;
  height: 100vh;
}
.container {
  width: 100%;
  margin-top: 3.7rem;
  /* height: 100%; */
  /* background-color: #F2F6F7; */
  /* background-color: #FAFAFA; */
  /* right: 0; */
  display: inline-block;
  position: relative;
}
</style>
