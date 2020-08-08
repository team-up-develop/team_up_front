<template>
  <div>
    <div class="btn-box-save" @click="saveJob" v-if="flag">
      保存する
    </div>
    <div class="btn-box-save-false" @click="deleteJob" v-if="flag == false">
      削除する
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    jobId: Number
  },
  data() {
    return {
      flag: true,
    }
  },
  mounted() {
    axios.get('http://localhost:8888/api/v1/favorite_job/?user_id=1')
    .then(response => {
      const array = []
      for(let i = 0; i < response.data.length; i++){
        const likeData = response.data[i]
        array.push(likeData.job.id)
      }
      // console.log(array)
      if(array.includes(this.jobId)){
        this.flag = false
      }
      else{
        this.flag = true
      }
    })
  },
  methods: {
    saveJob(){
      const data = {
        jobId: this.jobId, //? 案件ID
        userId: 1 //? User_ID
      };
      axios.post('http://localhost:8888/api/v1/favorite_job/', data)
      .then(response => {
        // ? 案件削除判定
        this.flag = false
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    deleteJob() {
      const data = {
        jobId: this.jobId,
        userId: 1
      };
      axios.delete('http://localhost:8888/api/v1/favorite_job/',{data: {userId: 1, jobId: data.jobId}})
      .then(response => {
        // ? 案件削除判定
        this.flag = true
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>
.btn-box-save{
  display: block;
  padding: 18px 65px;
  background: linear-gradient(90deg,#1f5ae8,#2ac1df);
  border-radius: 25px;
  font-size: .875rem;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  display: inline-block;
  margin: 0 40px;
}
.btn-box-save-false{
  display: block;
  padding: 18px 65px;
  background: linear-gradient(90deg,#3d3d3d,#d4d4d4);
  border-radius: 25px;
  font-size: .875rem;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  display: inline-block;
  margin: 0 40px;
}
</style>