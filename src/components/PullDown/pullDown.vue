<template>
  <div class="loadSty">
    <el-button v-if="!allLoaded" type="primary" @click="loadMore">点击加载更多</el-button>
    <el-button v-if="allLoaded" type="text" disabled>没有更多了</el-button>
  </div>
</template>

<script>
  export default {
    props: {
      allLoaded: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      loadMore() {
        this.$emit('upup', event.target);
      }
    }
  };
</script>

<style scoped>
  .loadSty{
    width: 100%;
    display:flex;
    justify-content: center;
    padding:20px 0;
  }
</style>
