<template>
  <a class="list-item" :class="min?'list-min-item':''" href="#/doctor">
    <div class="list-head list-pic-usr"></div>
    <div class="list-info">
      <div class="list-tit">医生姓名 <small>临床职称  教学职称</small></div>
      <div class="list-owner">所在医院 所在科室 行政职务</div>
      <div v-if="!min" class="list-desc">擅长：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et </div>
    </div>
  </a>
</template>
<script>
export default {
  props: {
    min: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>