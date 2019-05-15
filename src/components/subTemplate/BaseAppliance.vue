<template>
  <a class="list-item" :class="min?'list-min-item':''" href="#/appliance">
    <div class="list-head list-pic-res"></div>
    <div class="list-info">
      <div class="list-tit">器械名称 <small>使用状态：使用状态</small></div>
      <div class="list-owner">所在医院 所在科室</div>
      <div v-if="!min" class="list-desc">功能用途：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</div>
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