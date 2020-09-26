<template>
  <div>
    <div class="langage" 
      v-for="(langage, index) in job.programingLanguage.slice(0,3)" 
      :key="`language-${index}`">
      {{ langage.programingLanguageName }}
    </div>
    <!-- レスポンシブ 言語 -->
    <div class="langage-responsive" 
      v-for="(langage, index) in job.programingLanguage.slice(0,2)" 
      :key="`language-responsive-${index}`">
      {{ langage.programingLanguageName }}
    </div>
    <div class="framework" 
    v-for="(framework, index) in job.programingFramework.slice(0,3)" 
    :key="`framework-${index}`">
      {{ framework.programingFrameworkName }}
    </div>
    <!-- レスポンシブ フレームワーク -->
    <div class="framework-responsive" 
    v-for="(framework, index)  in job.programingFramework.slice(0,2)" 
    :key="`framework-responsive-${index}`">
      {{ framework.programingFrameworkName }}
    </div>
    <div class="skill" 
    v-for="(skill, index) in job.skill.slice(0,4)" 
    :key="`skill-${index}`">
      {{ skill.skillName }}
    </div>
    <!-- レスポンシブ その他スキル -->
    <div class="skill-responsive" 
    v-for="(skill, index) in job.skill.slice(0,2)" 
    :key="`skill-responsive-${index}`">
      {{ skill.skillName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    job: {}
  },
  data() {
    return {
      jobs: []
    }
  },
}
</script>

<style lang="scss" scoped>
.langage {
  @include border_language;
  color: $language-color;
  margin: 5px 0px 0px 5px;
  text-align: left;
  display: inline-block;
  font-size: 12px;
  padding: 7px 1.2rem;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}

.framework {
  @include border_framework;
  margin: 5px 0px 0 5px;
  text-align: left;
  display: inline-block;
  color: $framework-color;
  font-size: 12px;
  padding: 7px 1.2rem;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}

.skill {
  @include border-skill;
  color: $skill-color;
  margin: 5px 0px 0 5px;
  text-align: left;
  display: inline-block;
  font-size: 12px;
  padding: 7px 1.2rem;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}

.langage-responsive, .framework-responsive, .skill-responsive {
  display: none;
}

@media screen and (max-width: 390px) {
  .job-cards {
    height: 45vh;
    background-color: rgba(0, 255, 238, 0.163);
  }

  .job-cards-bottom .post-user-area {
    width: 100%;
    height: 60%;
  }

  .langage {
    display: none;
  }

  .langage-responsive {
    @include border_language; 
    color: $language-color;   
    margin: 5px 0px 0px 5px;
    text-align: left;
    display: inline-block;
    font-size: 12px;
    padding: 7px 1.2rem;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }

  .framework {
    display: none;
  }

  .framework-responsive {
    @include border_framework;
    color: $framework-color;
    margin: 5px 0px 0 5px;
    text-align: left;
    display: inline-block;
    font-size: 12px;
    padding: 7px 1.2rem;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }

  .skill {
    display: none;
  }

  .skill-responsive {
    @include border-skill;
    color: $skill-color;
    margin: 5px 0px 0 5px;
    text-align: left;
    display: inline-block;
    font-size: 12px;
    padding: 7px 1.2rem;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }
}
</style>