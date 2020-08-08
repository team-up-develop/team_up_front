<template>
  <div>
    <div class="btn-box-apply" @click="applyJob" v-if="applyFlug">
      応募する
    </div>
    <div class="btn-box-save-false" v-if="applyFlug == false">
      応募する
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
      applyFlug: true,
    }
  },
  mounted() {
    // * ログインユーザーが応募済みか応募済みではないかを判定する
    axios.get('http://localhost:8888/api/v1/apply_job/?user_id=1')
    .then(response => {
      const arrayApply = []
      for(let c = 0; c < response.data.length; c++){
        const applyData = response.data[c];
        arrayApply.push(applyData.job.id)
      }
      // console.log(this.jobId)
      if (arrayApply.includes(this.jobId)) {
        this.applyFlug = false
      } else {
        this.applyFlug = true
      }
    })
  },
  methods: {
    // * 応募する
    applyJob() {
      const applyData = {
        jobId: this.jobId,
        userId: 1,
        applyStatusId: 1
      };
      axios.post('http://localhost:8888/api/v1/apply_job/', applyData)
      .then(response => {
        this.applyFlug = false
        console.log(response.data)
      })
      .catch(error =>{
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.btn-box-apply{
  display: block;
  padding: 18px 65px;
  background: linear-gradient(90deg,#ef6443,#f09819);
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