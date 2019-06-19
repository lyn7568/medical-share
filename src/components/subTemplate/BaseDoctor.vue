<template>
  <a class="list-item" :class="min?'list-min-item':''" :href="'#/doctor?id=' + itemSingle.id">
    <div class="list-head list-pic-usr" :style="itemSingle.image ? { backgroundImage: 'url('+ itemSingle.image +')' } : ''"></div>
    <div class="list-info">
      <div class="list-tit">{{itemSingle.name}} <small>{{itemSingle.clinicalTitle | cTitle}}  {{itemSingle.teachTitle | tTitle}}</small></div>
      <div class="list-owner">{{itemSingle.creator | hosCur}} {{itemSingle.department | dCur}} {{itemSingle.position || ''}}</div>
      <div v-if="!min" class="list-desc">擅长：{{itemSingle.direction || '无'}} </div>
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