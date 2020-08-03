<template>
  <div>
    <div v-if="loginFlag === true">
      <router-link :to="`/manage/${ jobs.id }`" v-for="jobs in manageJobs" :key="jobs.id" class="router">
        <p>ID: {{ jobs.id }}タイトル: {{ jobs.jobTitle }}</p>
      </router-link>
    </div>
    <div v-else>
      ログインが必要です！
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      manageJobs: [],
      loginFlag: false
    }
  },
  mounted() {
    if( localStorage.userId !== undefined) {
      this.loginFlag = true
      axios.get('http://localhost:8888/api/v1/job/?user_id=1')
      .then(response => {
        this.manageJobs = response.data
        console.log(this.manageJobs)
      })
      .then(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style>

</style>