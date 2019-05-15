<template>
  <div class="home">
    <div class="home-bg"></div>
    <div class="home-con">
      <div class="home-tit">医疗信息共享平台</div>
      <el-input placeholder="搜索医生、医院、医疗器械" v-model="searchText" class="input-with-select" @keyup.enter.native="search">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      searchText: ''
    };
  },
  methods: {
    search() {
      this.$router.push({ name: 'search' })
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.home {
  position: relative;
  height: 100%;
  .home-bg{
    height: 100%;
    background: url("../assets/login_bg.jpg") 0 0 no-repeat;
    background-size: cover;
    filter: blur(12px);
  }
  .home-con {
    position: absolute;
    width: 40%;
    top: 36%;
    left: 50%;
    transform: translate(-50%, -50%);
    .home-tit{
      line-height: 80px;
      font-size: 40px;
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>
