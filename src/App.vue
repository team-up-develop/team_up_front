<template>
  <div id="app">
    <Header></Header>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style scoped>
#app {
  font-family: 'Arial',YuGothic,'Yu Gothic','Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3','メイリオ', Meiryo,'MS ゴシック',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  width: 100%;
  /* margin: 25px auto; */
  height: 100%;
  background-color: #f5f5f5;
  /* background-color: #FFFFFF; */
  position: relative;
  /* background-color: rgb(0, 83, 250); */
}
</style>
