<template>
  <div class="detail-wrapper">
    <div class="detail-post-user-area">
      <div class="detail-tag">投稿者</div>
      <div class="post-user-area">
        <div class="left-user-area">
          <div class="user-image"></div>
        </div>
        <div class="right-user-area">
          <div class="user-profile-area">
            <div class="user-name-are">
              <div class="user-name-tag">名前</div>
              <router-link :to="`/account/profile/${ job.userId }`"> 
                <div class="user-name">
                  {{ job.user.userName }}
                </div>
              </router-link>
            </div>
            <div class="user-introduce-area">
              <div class="introduce-tag">学習開始</div>
              <div class="introduce">
                {{ job.user.learningStartDate | moment("YYYY年 M月 D日") }}
              </div>
            </div>
          </div>
          <div class="user-url-area">
            <div class="user-github" @click="gitTab">
              <img class="img" src="@/assets/github.png" width="50" />
              </div>
            <div class="user-twtter" @click="twitterTab">
              Twiiter
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-post-skill-area">
      <div class="detail-tag">開発技術</div>
      <div class="skill-detail-area">
        <div class="lang-area">
          <label for="name" class="name-tag">開発言語</label>
          <div class="lang-box">
            <div class="skill-tag"  v-for="langage in job.programingLanguage" :key="langage.id">
              {{ langage.programingLanguageName }}
            </div>
          </div>
        </div>
        <div class="lang-area">
          <label for="name" class="name-tag">フレームワーク</label>
          <div class="lang-box">
            <div class="flame-tag" v-for="framework in job.programingFramework" :key="framework.programingFrameworkName">
              {{ framework.programingFrameworkName }}
            </div>
          </div>
        </div>
        <div class="lang-area">
          <label for="name" class="name-tag">その他関連スキル</label>
          <div class="lang-box">
            <div class="other-tag" v-for="skill in job.skill" :key="skill.skillName">
              {{ skill.skillName }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-post-detail-area">
      <div class="detail-area">
        <div class="detail-tag">開発詳細</div>
        <div class="dev-detail-area">
          <div class="detail-leff-area">
            <div class="detail-information">
              <div class="tag">タイトル</div>
              <div class="sub-area">{{ job.jobTitle }}</div>
            </div>
            <div class="detail-information">
              <div class="tag">募集人数</div>
              <div class="sub-area">{{ job.recruitmentNumbers }}人</div>
            </div>
            <div class="detail-information">
              <div class="tag">応募ケース</div>
              <div class="sub-area">新規開発</div>
            </div>
            <div class="detail-information">
              <div class="tag">開発期間</div>
              <div class="sub-area">{{ job.devStartDate | moment("YYYY年 M月 D日") }} ~ {{ job.devEndDate  | moment("YYYY年 M月 D日")}}</div>
            </div>
            <div class="detail-information">
              <div class="tag">応募ケース</div>
              <div class="sub-area">{{ job.jobDescription }}</div>
            </div>
          </div>
          <!-- <div class="detail-right-area">
            <div class="tag">募集内容詳細</div>
            <div class="description">
              {{ job.jobDescription }}
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="button-area">
      <button class="edit-btn" @click="openModal">編集する</button>
    </div>
      <!-- 編集 モーダル画面 -->
      <div class="example-modal-window">
        <edit-job-modal @close="closeModal" v-if="modal">
          <div class="job-create-title-area">
            <label for="name" class="label">案件タイトル</label><label for="name" class="label-required">必須</label>
            <input type="text" v-model="jobTitle">
          </div>
          <div class="job-create-time-area">
            <label for="name" class="label">開発開始</label><label for="name" class="label-required">必須</label>
            <input type="date" v-model="devStartDate">
          </div>
          <div class="job-create-time-area">
            <label for="name" class="label">開発終了</label><label for="name" class="label-required">必須</label>
            <input type="date" v-model="devEndDate">
          </div>
          <div class="job-create-detail-area">
            <label for="name" class="label">開発詳細</label>
            <textarea type="text" v-model="jobDescription"></textarea>
          </div>
          <br>
          <div class="job-create-area">
            <label for="name" class="label">開発言語</label><label for="name" class="label-required">必須</label>
            <label v-if="selectedLangErrors.length" class="error-label">
              <p v-for="selectedLangError in selectedLangErrors" :key="selectedLangError" class="error-message">
                {{ selectedLangError }}</p>
            </label>
            <v-select
              class="input-area"
              multiple
              :options="languages"
              label="programingLanguageName"
              v-model="selectlangNumber"
              :reduce="languages => languages.id"
            />
            <h1>Selected 言語:{{ selectlangNumber }}</h1>
          </div>
          <div class="job-create-area">
            <label for="name" class="label">フレームワーク</label><label for="name" class="label-required">必須</label>
            <label v-if="selectedFramworkErrors.length" class="error-label">
              <p v-for="selectedFramworkError in selectedFramworkErrors" :key="selectedFramworkError" class="error-message">
                {{ selectedFramworkError }}</p>
            </label>
            <v-select
                class="input-area"
                multiple
                :options="framworks"
                label="programingFrameworkName"
                v-model="selectedFramworkNumber"
                :reduce="framworks => framworks.id"
            />
            <h1>Selected フレームワーク: {{ selectedFramworkNumber }}</h1>
          </div>
          <div class="job-create-area">
            <label for="name" class="label">その他技術</label><label for="name" class="label-required">必須</label>
            <label v-if="selectedSkillErrors.length" class="error-label">
              <p v-for="selectedSkillError in selectedSkillErrors" :key="selectedSkillError" class="error-message">
                {{ selectedSkillError }}</p>
            </label>
            <v-select
                class="input-area"
                multiple
                :options="skills"
                label="skillName"
                v-model="selectedSkillNumber"
                :reduce="skills => skills.id"
            />
            <h1>Selected その他スキル: {{ selectedSkillNumber }}</h1>
          </div>
          <br>
          <div class="job-create-area">
            <label for="name" class="label">募集人数</label><label for="name" class="label-required">必須</label>
            <div class="job-create-radio">
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="0">未定</label>
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="1">1人</label>
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="2">2人</label>
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="3">3人</label>
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="4">4人</label>
            <!-- <p>Selected 開発メンバー {{ recruitNumber }} 人</p> -->
          </div>
          </div>
          <template slot="footer">
            <div class="edit-btn" @click="jobEdit">
              編集する
            </div>
          </template>
        </edit-job-modal >
      </div>
      <div class="modal-complite">
        <EditJobComplite @close="closeModal" v-if="modalEditComplite">
          <p>編集が完了しました</p>
          <template slot="footer">
          </template>
        </EditJobComplite>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from "moment";
import GithubImage from '@/assets/github.png'
import EditJobModal from '@/components/modal/EditJobModal'
import EditJobComplite from '@/components/modal/compliteModal/EditJobComplite'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  props: {
    id: Number,
  },
  data() {
    return {
      job: {},
      assetsImage: GithubImage,
      assetsImage_NG: '@/assets/github.png',
      staticImage: '@/assets/github.png',
      modal: false, //? 編集モーダル
      modalEditComplite: false,
      jobTitle: "", //? 案件タイトル
      devStartDate: null, //? 開発開始時期
      devEndDate: null, //? 開発終了時期
      jobDescription: null, //? 案件詳細
      selectedLang: [], //? プログラミング言語
      selectlangNumber: [], //? 開発言語 編集用 array[Number, Number...]
      languages: [], //? プログラミング言語全て
      selectedFramwork: [], //? フレームワーク
      selectedFramworkNumber: [], //? 開発フレームワーク 編集用 array[Number, Number...]
      framworks: [], //? フレームワーク全て
      selectedSkill: [], //? その他開発スキル
      selectedSkillNumber: [], 
      skills: [], //? その他スキル全て
      selectedLangErrors: [], //?言語入力エラー
      selectedFramworkErrors: [], //?フレームワーク入力エラー
      selectedSkillErrors: [], //?その他スキル入力エラー
      recruitNumber: 0, //? メンバー人数
    }
  },
  filters: {
    moment(value, format) {
      return moment(value).format(format);
    }
  },
  mounted() {
    // * 開発言語
    axios.get('http://localhost:8888/api/v1/programing_language')
      .then(response => {
          // const array = [];
          this.languages = response.data
      })
    // * フレームワーク
    axios.get('http://localhost:8888/api/v1/programing_framework')
      .then(response => {
          this.framworks = response.data
          // console.log(this.framworks)
      })
    // * その他スキル
    axios.get('http://localhost:8888/api/v1/skill')
      .then(response => {
          this.skills = response.data
          // console.log(this.skills)
      })
  },
  created() {
    // * 詳細画面情報を取得
    axios.get(`http://localhost:8888/api/v1/job/${this.id}/`)
      .then(response => {
          // this.loading = true;
          this.job = response.data //? 案件
          this.jobTitle = this.job.jobTitle //? 案件タイトル
          // this.devStartDate = this.job.devStartDate
          // * 開発開始 を 00-00-00 に変換
          var str1 = this.job.devStartDate 
          var startTime = str1.substring(0,str1.indexOf("T"));
          this.devStartDate = startTime;
          // * 開発終了 を 00-00-00 に変換
          var str2 = this.job.devEndDate
          var endTime = str2.substring(0,str2.indexOf("T"));
          this.devEndDate = endTime;
          this.jobDescription = this.job.jobDescription
          this.selectedLang = this.job.programingLanguage
          for(var w = 0; w < this.selectedLang.length; w++) {
            this.selectlangNumber.push(this.selectedLang[w].id) //? 開発言語 配列 [Number, Number...]
          }
          this.selectedFramwork = this.job.programingFramework
          for(var i = 0; i < this.selectedFramwork.length; i++) {
            this.selectedFramworkNumber.push(this.selectedFramwork[i].id) //? 開発フレームワーク 配列 [Number, Number...]
          }
          this.selectedSkill = this.job.skill
          for(var d = 0; d < this.selectedSkill.length; d++) {
            this.selectedSkillNumber.push(this.selectedSkill[d].id) //? 開発フレームワーク 配列 [Number, Number...]
          }
          this.recruitNumber = this.job.recruitmentNumbers
      })
  },
  methods: {
    // * Twitter をタブで開く
    twitterTab() {
      axios.get(`${this.$httpPosts}/${this.id}/`)
      .then(response => {
        this.job = response.data
        return window.open(this.job.user.twitterAccount)
      })
    },
    // * Github をタブで開く
    gitTab() {
      axios.get(`${this.$httpPosts}/${this.id}/`)
      .then(response => {
        this.job = response.data
        console.log(this.job)
        return window.open(this.job.user.githubAccount)
      })
    },
    // * 編集する
    jobEdit() {
      // * 応募者人数を文字列から数値に変換
      var recruitNum = Number(this.recruitNumber);
      // * 言語を {id: Number}に変換
      const languageArray = [];
      for(var i = 0; i < this.selectlangNumber.length; i++) {
        var langages = this.selectlangNumber[i];
        languageArray.push({id: langages})
      }
      // * フレームワークを{id: Number}に変換
      const framworksArray = [];
      for(var c = 0; c < this.selectedFramworkNumber.length; c++) {
        var framworks = this.selectedFramworkNumber[c];
        framworksArray.push({id: framworks})
      }
      // * その他スキルを {id: Number}に変換
      const skillArray = [];
      for(var d = 0; d < this.selectedSkillNumber.length; d++) {
        // console.log({id: this.selectedSkill[d]})
        var skills = this.selectedSkillNumber[d];
        skillArray.push({id: skills})
      }

      // * date型に変換のための data用意
      function toDate (str, delim) {
        var arr = str.split(delim)
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }

      // //* 開始日
      var devStart = this.devStartDate
      var devStartDate = toDate(devStart, '-');

      // *終了日
      var devEnd = this.devEndDate
      var devEndDate = toDate(devEnd, '-');

      const params = {
        jobTitle: this.jobTitle,
        devStartDate: devStartDate,
        devEndDate: devEndDate,
        jobDescription: this.jobDescription,
        programingLanguage: languageArray,
        programingFramework: framworksArray,
        skill: skillArray,
        recruitmentNumbers: recruitNum
      }
      console.log("putする開発言語ですよ！")
      axios.put(`http://localhost:8888/api/v1/job/${this.id}`, params)
      .then(response => {
        console.log("aaaaaaaaaaaaaaa")
        console.log(response.config.data)
        this.modal = false;
        this.modalEditComplite = true;
        // this.$emit('compliteAssgin', this.message)
      })
      .catch(error => {
        console.log(error)
      })
    },

    //* Editモーダル 
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
      this.modalEditComplite = false;
    },
  },
  components: {
    EditJobModal,
    vSelect,
    EditJobComplite
  }
}
</script>

<style lang="scss" scoped>
.router {
  text-decoration: none;
  color: $basic-white;
}

.detail-wrapper {
  width: 85%;
  padding: 3.5rem 0rem;
  margin: 0 auto;

  .detail-post-user-area {
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto;
  }
}

.detail-tag {
  text-align: left;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 0.7rem;
  color: $primary-color;
}

/* 投稿者 カード中身 */
.detail-wrapper 
.detail-post-user-area 
.post-user-area {
  @include card-border-color;
  border-radius: 4px;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;

  /* ユーザー画像 start*/
  .left-user-area {
    width: 20%;
    height: 100%;

    .user-image {
      @include user-image;
      width: 130px;
      height: 130px;
    }
  }

  .right-user-area {
    width: 70%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 2rem 4rem 2rem 2rem;
    text-align: left;

    .user-profile-area {
      width: 65%;
      height: 100%;
      display: inline-block;
    }
  }
}


/* ユーザー 詳細情報 start */
.user-profile-area {
  .user-name-are {
    width: 45%;
    display: inline-block;

    .user-name-tag {
      font-weight: bold;
    }

    .user-name {
      margin-top: 0.2rem;
      font-size: 14px;
    }
  }

  .user-study-area {
    width: 45%;
    display: inline-block;

    .study-tag {
      font-weight: bold;
      width: 45%;
    }

    .stydy-time {
      margin-top: 0.2rem;
    }
  }

  .user-introduce-area {
    margin-top: 3.2rem;

    .introduce-tag {
      font-weight: bold;
    }

    .introduce {
      margin-top: 0.2rem;
      font-size: 14px;
    }
  }
}

.post-user-area .right-user-area .user-url-area {
  display: inline-block;
  width: 30%;
  position: absolute;
  top: 0;
  padding: 2.2rem 0 0 0;

  .user-github {
    /* width: 35%;
    padding: 0.8rem 1rem;
    background-color: #24292e;
    border-radius: 5px / 5px;
    margin-right: 10px;
    color: #FFFFFF;
    text-align: center;
    box-shadow: 10px 5px 5px grey;
    box-shadow: 0 0 3px 0 rgba(122, 122, 122, 0.705), 0 2px 3px 0 rgba(156, 156, 156, 0.993);
    font-weight: bold; */
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }

  .user-twtter {
    margin-top: 2rem;
    width: 68%;
    padding: 0.8rem;
    background-color: #1DA1F2;
    border-radius: 5px / 5px;
    color: #FFFFFF;
    text-align: center;
    box-shadow: 10px 5px 5px grey;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12), 0 2px 3px 0 rgba(0, 0, 0, 0.22);
    font-weight: bold;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
}

/* スキル カード */
.detail-wrapper .detail-post-skill-area {
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 auto 2rem auto;

  .skill-detail-area {
    @include card-border-color ;
    border-radius: 4px;
    padding: 1.5rem 4rem 1rem 4rem;
    margin-bottom: 2rem;
    position: relative;
  }
}

.skill-detail-area .lang-area {
  width: 100%;
  position: relative;

  .name-tag {
    font-weight: bold;
    text-align: left;
    position: absolute;
    left: 0;
  }

  .lang-box {
    width: 95%;
    text-align: left;
    padding: 10px 20px 30px 0;

    .skill-tag {
      @include detail-language;
    }

    .flame-tag {
      @include detail-framework;
    }

    .other-tag {
      @include detail-skill;
    }
  }
}

/* 開発詳細 カード */
.detail-wrapper .detail-post-detail-area {
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 auto;

  .dev-detail-area {
    @include card-border-color;
    border-radius: 4px;
    padding: 1rem 4rem 1rem 4rem;
    margin-bottom: 2rem;
    position: relative;
    line-height: 1.8;
  }
}

.dev-detail-area .detail-leff-area {
  display: inline-block;
  width: 100%;
  height: 100%;

  .detail-information {
    margin-top: 1px;
    padding: 1rem 0;
    position: relative;
    flex-direction: column;
  }
}

.tag {
  font-weight: bold;
}

.detail-information .sub-area {
  right: 0;
  font-size: 14px;
}

.dev-detail-area .detail-right-area {
  line-height: 1.8;
  width: calc(50% - 5rem);
  display: inline-block;
  top: 0;
  padding: 2.5rem 5rem 0 0;
}

// *ボタン エリア 
.button-area {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  bottom: 0;

  .button-action-area {
    margin: 0em auto 4rem auto;
    width: 50%;
    position: relative;
  }
}

// * 応募するボタン 
.btn-box-apply {
  @include red-btn;
  @include box-shadow-btn;
  position: absolute;
  left: 0;
  top: 0;
  width: 60%;
  padding: 1.2rem 4rem;
  transition: .3s;
  border-radius: 50px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1.3rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  &:hover {
    @include red-btn-hover
  }
}

// * 応募済みボタン 
.btn-box-apply-false {
  @include grey-btn;
  @include box-shadow-btn;
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  padding: 1.2rem 4rem;
  border-radius: 50px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  width: 40%;
  margin: auto;
  font-size: 1.3rem;
  display: inline-block;
}

.favorite-btn-area {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
}

// * モーダル内のキャンセルボタン 
.modal-btn {
  @include blue-btn;
  padding: 1rem 2.4rem;
  border-radius: 50px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin-left: 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
}

.edit-btn {
  @include blue-btn ;
  display: block;
  padding: 1.4rem 9rem;
  box-shadow: 0 0px 5px 2px #d4d4d4;
  border-radius: 50px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 800px;
  // margin: auto;
  font-size: 1.1rem;
  display: inline-block;
  cursor: pointer;
  border: none;
  margin: 0.5rem;
}

// * モーダル
.label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.7rem;
  display: inline-block;
}

.label-required {
  color: $basic-white;
  background-color: $error-message-color;
  font-size: 12px;
  font-weight: bold;
  border-radius: 25px;
  padding: 0.25rem 0.9rem;
  text-align: center;
  margin-left: 10px;
}

.job-create-title-area {
  width: 100%;
  height: 100px;
  text-align: left;

  input[type='text'] {
    @include input-border-color;
    background-color: $sub-white;
    color: $text-main-color;
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    width: 100%;
    padding: 0.3em;
    transition: 0.3s;
    letter-spacing: 1px;
    border-radius: 4px;
    padding: 0.5rem;

    &:focus {
      @include form-hover;
    }
  }
}

.job-create-time-area {
  width: 100%;
  height: 100px;
  text-align: left;

  input[type='date'] {
    @include input-border-color;
    background-color: $sub-white;
    color: $text-main-color;
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    width: 40%;
    display: flex;
    padding: 0.3em;
    transition: 0.3s;
    letter-spacing: 1px;
    border-radius: 4px;
    padding: 0.5rem;

    &:focus {
      @include form-hover;
    }
  }
}

  .job-create-detail-area {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    text-align: left;

    textarea[type='text'] {
      @include input-border-color;
      background-color: $sub-white;
      color: $text-main-color;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0.3em;
      transition: 0.3s;
      letter-spacing: 1px;
      border-radius: 4px;
      padding: 0.5rem;

      &:focus {
        @include form-hover;
      }
    }
  }
  // * 言語 フレームワーク その他スキル
.job-create-area {
  width: 100%;
  text-align: left;

  .input-area {
    margin: 0.7rem 0rem;
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    width: 100%;
    transition: 0.3s;
    letter-spacing: 1px;
    color: $text-main-color;
    border-radius: 4px;
    background-color: $basic-white;
    background-color: $sub-white;
  }

  .radio-btn {
    margin: 0.7rem 0rem;
    margin-left: 0.5rem;
  }
}
.modal-complite {
  p {
    color: $text-main-color;
    font-weight: bold;
  }
}

</style>