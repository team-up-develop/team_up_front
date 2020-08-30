<template>
  <div class="container" v-show="loading">
      <div class="fullview">
        <div class="loading-spacer"></div>
        <vue-loading 
          type="bubbles"
          color="#3700B3"
          :size="{ width: '200px', height: '105px' }"
          >
        </vue-loading>
      </div>
    </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'loading',
  components: {
    VueLoading,
  },

}
</script>

<style scoped>
.container {
  width: 90%;
  height: 68vh;
  /* right: 0; */
  position: relative;
  /* background-color: rgb(0, 83, 250); */
}
.fullview {
  width: 80%;
  height: 120%;
  /* height: 100vh; */
  position: fixed;
  top: 0;
  right: 0;
  position: absolute;
}
.loading-spacer {
  height: 30%;
}
</style>