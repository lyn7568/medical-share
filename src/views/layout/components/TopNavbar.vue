<template>
  <div class="topnavbar">
    <div class="logo-container">
      <div class="logo-wrapper" @click="toHome">医疗信息共享平台</div>
    </div>
    <div class="serach-con" v-show="showTopSearch">
      <el-input placeholder="搜索医生、医院、医疗器械" v-model="searchText" @keyup.enter.native="search" class="input-with-select"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      showTopSearch: false
    }
  },
  watch: {
    $route(to,from) {
      this.showTopSearch = to.path === '/search' ? false : true
    }
  },
  beforeCreate() {
    this.$nextTick(function () {
      this.showTopSearch = this.$route.path === '/search' ? false : true
    })
  },
  methods: {
    toHome() {
      this.$router.replace({ path: '/' })
    },
    search() {
      this.$router.push({ name: 'search', query: { key: this.searchText} })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.topnavbar {
  position: relative;
  overflow: hidden;
  height: 60px;
  .logo-container {
    position: absolute;
    font-size: 22px;
    line-height: 60px;
    font-weight: bold;
    display: inline-block;
    overflow: hidden;
    color: #00837e;
    .logo-wrapper{
      cursor: pointer;
    }
  }
  .serach-con{
    width: 320px;
    margin: 10px auto;
  }
}
</style>

