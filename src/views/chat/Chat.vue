<template>
<div>
  <div class="chat-wrapper" v-if="loginFlag === true">
    <router-link :to="`/chat/${ chatGroup.job.id }`" v-for="chatGroup in chatGroups" :key="chatGroup.job.id" class="router">
    <p>ID: {{ chatGroup.job.id }}タイトル: {{ chatGroup.job.jobTitle }}</p>
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
      chatGroups: [],
      loginFlag: false
    }
  },
  mounted() {
    this.$store.dispatch('clearLocalStorage', {
    })
    // * 参加案件のみを取得する
    if( localStorage.userId !== undefined) {
      this.loginFlag = true
      axios.get(`${this.$baseURL}/apply_job/?user_id=1`)
      .then(response => {
        const array = [];
        for(let i = 0; i < response.data.length; i++){
          const applyData = response.data[i]
          console.log(applyData)
          if(applyData.applyStatusId === 2){
            array.push(applyData)
            this.chatGroups = array
          }
          else {
            console.log("Not Found")
          }
        }
      })
    }
    // console.log(this.chatGroups)
  }
}
</script>

<style>
.chat-wrapper{
  width: 80%;
  height: 100%;
  margin: 0 auto;
}

</style>