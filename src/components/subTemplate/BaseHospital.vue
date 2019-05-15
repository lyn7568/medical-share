<template>
  <a class="list-item" :class="min?'list-min-item':''" href="#/hospital">
    <div class="list-head list-pic-org">
      <!-- <img :src="companyInfo.logo"> -->
    </div>
    <div class="list-info">
      <div class="list-tit">医院名称</div>
      <div class="list-owner">医院级别 子级别 医院类型</div>
      <div v-if="!min" class="list-desc">地址：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean.</div>
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