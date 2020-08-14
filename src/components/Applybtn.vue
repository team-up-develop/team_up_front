<template>
  <div class="modal-apply-area">
    <div class="btn-apply" @click="applyJob">
      応募する
    </div>
    <complite-modal @close="closeCompliteModal" v-if="compliteModal">
      <p>応募が完了しました。</p>
      <template slot="footer">
      </template>
    </complite-modal>
  </div>
</template>

<script>
import axios from 'axios'
import CompliteModal from '@/components/CompliteModal'
export default {
  props: {
    jobId: Number,
  },
  data() {
    return {
      compliteModal: false
    }
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
        this.compliteModal = true
      })
      .catch(error =>{
        console.log(error)
      })
    },
    openCompliteModal() {
      this.compliteModal = true
    },
    closeCompliteModal() {
      this.compliteModal = false
    }
  },
  components: {
    CompliteModal
  }
}
</script>

<style scoped>
.modal-apply-area {
  width: 47%;
}
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
/* モーダル内のキャンセルボタン */
.modal-btn {
  padding: 1rem 2.4rem;
  background: -moz-linear-gradient(top, #1f5ae8, #2ac1df);
  background: -webkit-linear-gradient(top, #1f5ae8, #2ac1df);
  background: linear-gradient(to bottom, #1f5ae8, #2ac1df);
  border-radius: 50px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin-left: 1.2rem;
  font-size: 1rem;
  float: right;
  cursor: pointer;
  border: none;
}
</style>