<template>
  <el-container style="height:100%">
    <el-header><TopNavbar></TopNavbar></el-header>
    <el-main><app-main></app-main></el-main>
    <!-- <el-footer></el-footer> -->
  </el-container>
</template>

<script>
import { TopNavbar, AppMain } from './components'

export default {
  name: 'layout',
  components: {
    TopNavbar,
    AppMain
  },
  computed: {

  },
  methods: {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .el-header{
    background: #ffffff;
    border-bottom: 1px solid #dfdfdf;
    z-index: 10;
  }
</style>
