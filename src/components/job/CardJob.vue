<template>
  <div class="job-cards">
    <div class="job-cards-top">
      {{ job.jobTitle | truncateTitle }}
    </div>
    <div class="job-cards-center">
      <!-- カード スキルコンポーネント -->
      <card-job-skill :job="job"></card-job-skill>
    </div>
    <div class="job-cards-bottom">
      <div class="product-start-end">
        <div class="product-start-end-tag">
          開発期間:
        </div>
        <div class="product-start-end-time">
          {{ job.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ job.devEndDate | moment("YYYY年 M月 D日")}}
        </div>
      </div>
      <div class="post-user-area">
        <div class="post-user-image"></div>
        <div class="post-user-name-area">
          <div class="post-user-name">
            {{ job.user.userName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardJobSkill from '@/components/job/CardJobSkill'
import moment from "moment";
export default {
  props: {
    job: {}
  },
  data() {
    return {
      jobs: [] 
    }
  },
  filters: {
    // * date型を文字に変換
    moment(value, format) {
      return moment(value).format(format);
    },
    //* 案件タイトル 文字制限
    truncateTitle: function(value) {
      var length = 55;
      var ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  components: {
    CardJobSkill
  }
}
</script>

<style scoped>
  .job-cards {
    /* width: 425px; */
    width: 97%;
    /* height: 60%; */
    height: 292px;
    /* float: right; */
    /* float: left; */
    margin: 10px 0.5%;
    border: solid 1px #B9B9B9;
    background-color: #ffffff;
    border-radius: 8px;
    transition: .3s;
    color: #111111;
  }
  .job-cards-top {
    width: calc(100% - 60px);
    height: calc(30% - 60px);
    text-align: left;
    padding: 2rem 2rem 1rem 1.5rem;
    font-weight: bold;
    pointer-events: none;
    font-size: 17px;
    text-decoration: underline;
    /* background-color: yellow; */
  }
  .job-cards-center {
    width: calc(100% - 40px);
    height: calc(35% - 20px);
    padding: 10px 1.5rem;
    text-align: left;
    pointer-events: none;
  }
  .job-cards-bottom {
    width: calc(100% - 50px);
    height: calc(38% - 20px);
    padding: 10px 25px;
    pointer-events: none;
    margin-top: 0.2rem;
  }
  .job-cards-bottom .product-start-end {
    width: 100%;
    height: 40%;
    text-align: left;
    pointer-events: none;
    font-weight: bold;
  }
  .job-cards-bottom .product-start-end .product-start-end-tag {
    display: inline-block;
    pointer-events: none;
    font-size: 14px;
  }
  .job-cards-bottom .product-start-end .product-start-end-time {
    display: inline-block;
    padding: 0 20px;
    pointer-events: none;
    font-size: 14px;
  }
  .job-cards-bottom .post-user-area {
    width: 100%;
    height: 60%;
    text-align: left;
    pointer-events: none;
    font-weight: bold;
  }
  .job-cards-bottom .post-user-area .post-user-image {
    width: 55px;
    height: 100%;
    border-radius: 50%;
    background-color: #2196F3;
    display: inline-block;
    pointer-events: none;
  }
  .job-cards-bottom .post-user-area .post-user-name-area {
    display: inline-block;
    width: 50%;
    /* background-color: yellow; */
    height: 60%;
    padding: 0 20px;
    position: relative;
    pointer-events: none;
  }
  .job-cards-bottom .post-user-area .post-user-name-area .post-user-name {
    position: absolute;
    top: 0;
    pointer-events: none;
  }
</style>