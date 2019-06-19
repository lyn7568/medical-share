<template>
  <a class="list-item" :class="min?'list-min-item':''" :href="'#/hospital?id=' + itemSingle.id">
    <div class="list-head list-pic-org" :style="itemSingle.image?'background: none':''">
      <img v-if="itemSingle.image" :src="itemSingle.image">
    </div>
    <div class="list-info">
      <div class="list-tit">{{itemSingle.name}}</div>
      <div class="list-owner">{{itemSingle.level | hLevel}} {{itemSingle.subLevel | hSubLevel}} {{itemSingle.type | hType}}</div>
      <div v-if="!min" v-show="itemSingle.addr || itemSingle.location" class="list-desc">地址：{{ itemSingle.addr | cityCur }} {{ itemSingle.location }}</div>
    </div>
  </a>
</template>
<script>
export default {
  props: {
    min: {
      type: Boolean,
      default: false
    },
    itemSingle: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>