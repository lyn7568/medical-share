<template>
  <div class="main-content">
    <div class="wrapper-left">
      <div class="split-bottom-20 search-wrapper">
        <el-input v-model="keyVal" @keyup.enter.native="keywordSearch" placeholder="请输入医生姓名、科室名称、疾病名称等关键词" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="keywordSearch" :disabled="searchBtnDisabled">搜索</el-button>
        </el-input>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="tab in navList" :key="tab.index" :name="tab.tab">
          <span slot="label">{{tab.name}}</span>
          <div class="pane-con">
            <div class="pane-filter split-bottom-20">
              <filter-tag :options="{label:'所在地区', list: cityList}"></filter-tag>
              <filter-tag v-if="activeName==='1'" :options="{label:'临床职称', list: titleList}"></filter-tag>
              <filter-tag v-if="activeName==='3'" :options="{label:'使用状态', list: stateList}"></filter-tag>
              <filter-tag :options="{label:'医院级别', list: levelList}"></filter-tag>
              <filter-tag v-if="activeName==='2'" :options="{label:'医院类型', list: typeList}"></filter-tag>
            </div>
            <div class="pane-res">
              <div :is="tab.tpl" v-for="item in 20" :key="item.index"></div>
              <pull-down></pull-down>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div class="wrapper-right" v-if="adinfo.length">
      <div class="split-bottom-20" v-for="item in adinfo" :key="item.index">
        <a class="ad-wrapper" :href="item.adUrl" target="_blank">
          <img :src="item.imgUrl" width="280" height="200">
        </a>
      </div>
    </div> -->
    <back-top></back-top>
  </div>
</template>

<script>
import baseDoctor from '@/components/subTemplate/BaseDoctor';
import baseHospital from '@/components/subTemplate/BaseHospital';
import baseAppliance from '@/components/subTemplate/BaseAppliance';
import filterTag from '@/components/FilterTag';
export default {
  data() {
    return {
      searchBtnDisabled: true,
      keyVal: '',
      activeName: '1',
      navList: [
        {
          tab: '1',
          name: '医生',
          tpl: 'base-doctor'
        },
        {
          tab: '2',
          name: '医院',
          tpl: 'base-hospital'
        },
        {
          tab: '3',
          name: '器械',
          tpl: 'base-appliance'
        }
      ],
      cityList: ['全国','北京','上海','深圳'],
      titleList: ['全部','主任医师','副主任医师','主治医师'],
      stateList: ['全部','空闲','适中','繁忙'],
      levelList: ['全部','三级','二级','一级'],
      typeList: ['全部','综合医院','心血管医院','妇产医院','儿童医院','口腔医院','肿瘤医院','传染病医院']
    }
  },
  components: {
    baseDoctor,
    baseHospital,
    baseAppliance,
    filterTag
  },
  methods: {
    keywordSearch() {
    }
  }
}
</script>

