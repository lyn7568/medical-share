<template>
  <div class="brow-content">
		<div class="split-bottom-20">
      <div class="list-item headcon-box">
        <div class="list-head list-pic-org"><!-- <img :src="companyInfo.logo"> --></div>
        <div class="list-info">
          <div class="list-tit">医院名称 科室名称</div>
          <div class="list-owner">医院级别 子级别 医院类型</div>
          <div class="list-desc">地址：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean.</div>
          <div class="list-desc">电话：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean.</div>
        </div>
      </div>
    </div>
    <div class="main-content split-bottom-20">
      <div class="wrapper-left">
        <el-tabs v-model="activeName">
          <el-tab-pane label="主页" name="first">
            <div class="content-wrapper split-bottom-20">
              <div class="content-title">
                <span>科室简介</span>
                <span class="content-more" @click="activeName='fourth'">更多</span>
              </div>
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibend
              </div>
            </div>
            <div class="content-wrapper split-bottom-20">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>医生列表</span>
                  <span class="content-more" @click="activeName='second'">更多</span>
                </div>
                <div class="content">
                  <base-doctor v-for="item in 3" :key="item.index"></base-doctor>
                </div>
              </div>
            </div>
            <div class="content-wrapper split-bottom-20">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>器械列表</span>
                  <span class="content-more" @click="activeName='third'">更多</span>
                </div>
                <div class="content">
                  <base-appliance v-for="item in 3" :key="item.index"></base-appliance>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'医生 ' + (serCount || '')" name="second">
            <div v-show="!ifDefault">
              <base-doctor></base-doctor>
              <pull-down></pull-down>
            </div>
            <default-tip v-show="ifDefault"></default-tip>
          </el-tab-pane>
          <el-tab-pane :label="'器械 ' + (patCount || '')" name="third">
            <div v-show="!ifDefault2">
              <base-appliance></base-appliance>
              <pull-down></pull-down>
            </div>
            <default-tip v-show="ifDefault2"></default-tip>
          </el-tab-pane>
          <el-tab-pane label="介绍" name="fourth">
            <div class="content-wrapper">
              <div class="inner-wrapper">
                <!-- <div class="content-title">
                  <span>项目经历</span>
                </div> -->
                <div class="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibend
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="wrapper-right">
        <div class="split-bottom-20">
          <base-hospital v-for="item in 1" :key="item.index" :min="true"></base-hospital>
        </div>
        <div class="split-bottom-20">
          <div class="content-title">其他科室</div>
          <base-department v-for="item in 5" :key="item.index" :min="true"></base-department>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import baseDoctor from '@/components/subTemplate/BaseDoctor';
  import baseAppliance from '@/components/subTemplate/BaseAppliance';
  import baseHospital from '@/components/subTemplate/BaseHospital';
  import baseDepartment from '@/components/subTemplate/BaseDepartment';
  export default {
    data() {
      return {
        activeIndex: '1',
        activeName: 'first',
        serCount: 0,
        patCount: 0,
        ifDefault: false,
        ifDefault2: false
      };
    },
    components: {
      baseDoctor,
      baseAppliance,
      baseHospital,
      baseDepartment
    }
  };
</script>
