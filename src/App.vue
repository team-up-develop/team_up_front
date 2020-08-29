<template>
  <div id="app">
    <Header></Header>
    <!-- <left-side-bar></left-side-bar> -->
    <div class="container">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from '@/components/Footer'
// import LeftSideBar from '@/components/LeftSideBar'
export default {
  name: 'App',
  components: {
    // LeftSideBar
    Header,
    Footer
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
  /* height: 100%; */
  /* background-color: #F2F6F7; */
  /* background-color: #FAFAFA; */
  /* right: 0; */
  display: inline-block;
  position: relative;
}
</style>
