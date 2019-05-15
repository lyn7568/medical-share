<template>
  <a class="list-item" :class="min?'list-min-item':''" href="#/department">
    <div class="list-head list-pic-org">
      <!-- <img :src="companyInfo.logo"> -->
    </div>
    <div class="list-info">
      <div class="list-tit">科室名称</div>
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