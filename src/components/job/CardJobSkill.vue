<template>
  <div>
    <div class="langage" 
      v-for="langage in job.programingLanguage.slice(0,3)" 
      :key="langage.id">
      {{ langage.programingLanguageName }}
    </div>
    <div class="framework" 
    v-for="framework in job.programingFramework.slice(0,3)" 
    :key="framework.programingFrameworkName">
      {{ framework.programingFrameworkName }}
    </div>
    <div class="skill" 
    v-for="skill in job.skill.slice(0,4)" 
    :key="skill.skillName">
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
  }
}
</script>

<style scoped>
  .langage{
    margin: 5px 0px 0px 5px ;
    text-align: left;
    display: inline-block;
    color: #3F51B5;
    font-size: 12px;
    border: solid 1px #3F51B5;
    padding: 7px 23px;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }
  .framework{
    margin: 5px 0px 0 5px ;
    text-align: left;
    display: inline-block;
    color: #2196F3;
    font-size: 12px;
    border: solid 1px #2196F3;
    padding: 7px 23px;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }
  .skill{
    margin: 5px 0px 0 5px ;
    text-align: left;
    display: inline-block;
    color: #00BCD4;
    font-size: 12px;
    border: solid 1px #00BCD4;
    padding: 7px 23px;
    border-radius: 5px / 5px;
    font-weight: bold;
    pointer-events: none;
  }
</style>