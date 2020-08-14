<template>
  <div class="btn-apply" @click="applyJob">
    応募する
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    jobId: Number
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
.btn-apply{
  display: block;
  padding: 1rem 3rem;
  background: -moz-linear-gradient(top, #FF512F, #DD2476);
  background: -webkit-linear-gradient(top, #FF512F, #DD2476);
  background: linear-gradient(to bottom, #FF512F, #DD2476);
  border-radius: 50px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
}
.btn-box-apply :hover{
  font-size: 100px;
}
</style>