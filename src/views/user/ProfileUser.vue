<template>
  <div>
    <p>{{ userInfo.userName }}</p>
    <p>{{ userInfo.learningStartDate | moment("YYYY年 M月 D日")}}</p>
    <p>{{ userInfo.githubAccount }}</p>
    <p>{{ userInfo.twitterAccount }}</p>
    <p>{{ userInfo.bio }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import moment from "moment";
export default {
  props: {
    id: Number
  },
  data() {
    return {
      userInfo: {}
    }
  },
  filters: {
    // * date型を文字に変換
    moment(value, format) {
      return moment(value).format(format);
    },
  },
  created() {
    // * ユーザー情報取得
    axios.get(`http://localhost:8888/api/v1/user/${this.id}`)
    .then(response => {
      this.userInfo = response.data;
    })
    .catch(error => {
      console.log(error)
    })
  },
}
</script>

<style scoped>

</style>