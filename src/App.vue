<template>
  <div id="app">
    <!-- <Header></Header> -->
    <left-side-bar></left-side-bar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
// import Header from './components/Header.vue'
import LeftSideBar from '@/components/LeftSideBar'
export default {
  name: 'App',
  components: {
    LeftSideBar
    // Header,
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
  height: 100%;
}
.container {
  width: 80%;
  height: 100%;
  background-color: #F2F6F7;
  /* right: 0; */
  display: inline-block;
  /* background-color: rgb(0, 83, 250); */
}
</style>
