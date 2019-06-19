<template>
  <a class="list-item" :class="min?'list-min-item':''" :href="'#/appliance?id=' + itemSingle.id">
    <div class="list-head list-pic-res" :style="applyImage(itemSingle.image) ? { backgroundImage: 'url('+ applyImage(itemSingle.image) +')' } : ''"></div>
    <div class="list-info">
      <div class="list-tit">{{itemSingle.name}} <small v-if="itemSingle.status">使用状态：{{itemSingle.status | aStatus}}</small></div>
      <div class="list-owner">{{itemSingle.creator | hosCur}} {{itemSingle.department | dCur}}</div>
      <div v-if="!min" v-show="itemSingle.application" class="list-desc">功能用途：{{itemSingle.application}}</div>
    </div>
  </a>
</template>
<script>
import { strToArr } from '@/utils'
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
  },
  methods: {
    applyImage(val) {
      var arr = strToArr(val)
      return arr[0]
    }
  }
}
</script>