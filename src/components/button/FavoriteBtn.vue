<template>
  <div>
    <font-awesome-icon icon="heart" class="icon" @click="saveJob" v-if="flag"/>
    <font-awesome-icon icon="heart" class="save-icon" @click="deleteJob" v-if="flag == false"/>
    <!-- <div class="btn-box-save-false" @click="deleteJob" v-if="flag == false">
      削除する
    </div> -->
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
    // * ログインユーザーが保存済みか応募済みではないかを判定する
    axios.get(`${this.$baseURL}/favorite_job/?user_id=1`)
    .then(response => {
      const array = []
      for(let i = 0; i < response.data.length; i++){
        const likeData = response.data[i]
        array.push(likeData.job.id)
      }
      if(array.includes(this.jobId)){
        this.flag = false
      }
      else{
        this.flag = true
      }
    })
  },
  methods: {
    // * 案件を保存する
    saveJob(){
      const params = {
        jobId: this.jobId, 
        userId: 1 
      };
      axios.post('http://localhost:8888/api/v1/favorite_job/', params)
      .then(response => {
        this.flag = false
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * 案件を削除する
    deleteJob() {
      const params = {
        jobId: this.jobId,
        userId: 1
      };
      axios.delete('http://localhost:8888/api/v1/favorite_job/', {data: params })
      .then(response => {
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

<style lang="scss" scoped>
.btn-box-save {
  display: block;
  padding: 1.4rem 5rem;
  background: -moz-linear-gradient(top, #1f5ae8, #2ac1df);
  background: -webkit-linear-gradient(top, #1f5ae8, #2ac1df);
  background: linear-gradient(to bottom, #1f5ae8, #2ac1df);
  border-radius: 50px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.3rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  :hover {
    background-color: red;
    font-size: 100px;
  }
}

.btn-box-save-false {
  display: block;
  padding: 1.4rem 5rem;
  background: -moz-linear-gradient(top, #3d3d3d, #d4d4d4);
  background: -webkit-linear-gradient(top, #3d3d3d, #d4d4d4);
  background: linear-gradient(to bottom, #3d3d3d, #d4d4d4);
  border-radius: 50px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.3rem;
  display: inline-block;
  cursor: pointer;
  border: none;
}

.icon {
  font-size: 30px;
  padding: 10px;
  width: 20px;
  height: 20px;
  color: #ffffff;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

.save-icon {
  font-size: 30px;
  padding: 10px;
  width: 20px;
  height: 20px;
  color: red;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}
</style>