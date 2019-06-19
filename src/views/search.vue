<template>
  <div class="main-content">
    <div class="wrapper-left">
      <div class="split-bottom-20 search-wrapper">
        <el-input v-model="keyVal" @keyup.enter.native="clearFiterFun" placeholder="请输入医生姓名、科室名称、擅长方向等关键词" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="clearFiterFun" :disabled="searchBtnDisabled">搜索</el-button>
        </el-input>
      </div>
      <el-tabs v-model="activeName" @tab-click="turnActiveTabFun">
        <el-tab-pane v-for="tab in navList" :key="tab.index" :name="tab.tab">
          <span slot="label">{{tab.name}}</span>
          <div class="pane-con">
            <div class="pane-filter split-bottom-20">
              <filter-tag v-if="cityArr" :options="{label:'所在地区', list: cityArr, city: true}" @selectedNow="curCity"></filter-tag>
              <filter-tag v-if="activeName==='1'" :options="{label:'临床职称', list: titleList}" @selectedNow="curCTitle"></filter-tag>
              <filter-tag v-if="activeName==='3'" :options="{label:'使用状态', list: stateList}" @selectedNow="curAStatus"></filter-tag>
              <filter-tag :options="{label:'医院级别', list: levelList}" @selectedNow="curHLevel"></filter-tag>
              <filter-tag v-if="activeName==='2'" :options="{label:'医院类型', list: typeList}" @selectedNow="curHType"></filter-tag>
            </div>
            <div class="pane-res" v-loading="tabConLoading">
              <component :is="tab.tpl" v-for="item in searchData" :key="item.index" :itemSingle="item"></component>
              <pull-down :allLoaded="loadComplete" @upup="keywordSearch"></pull-down>
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
import queryDict from '@/utils/queryDict';
import { selectHospitalLevel, selectHospitalType, slelectUseStatus, slelectClinicalTitle } from '@/utils/dict';
import { cityList, pqHospital, pqDoctor, pqApply } from '@/api/api';
import { urlParse, arrToStr, strToArr } from '@/utils'
export default {
  data() {
    return {
      keyVal: '',
      pageSize: 10,
      pageNo: 1,
      searchData: [],
      loadComplete: false,
      activeName: '1',
      tabConLoading: false,
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
      cityArr: [],
      titleList: [],
      stateList: [{label: '全部', value: ''}, ...slelectUseStatus],
      levelList: [{label: '全部', value: ''}, ...selectHospitalLevel],
      typeList: [{label: '全部', value: ''}, ...selectHospitalType],
      level: '',
      type: '',
      addr: '',
      clinicalTitle: '',
      status: ''
    }
  },
  computed: {
    searchBtnDisabled() {
      return !this.keyVal
    }
  },
  components: {
    baseDoctor,
    baseHospital,
    baseAppliance,
    filterTag
  },
  created() {
    if (urlParse('key')) {
      this.keyVal = urlParse('key')
    }
    this.keywordSearch()
    this.queryTitleList()
    this.queryCityList()
  },
  methods: {
    queryCityList() {
      var that = this
      this.$http.get(cityList, {}, function(res) {
        if (res.success && res.data) {
          var arr = [{label: '全部', city: ''}]
          res.data.forEach(cc => {
            cc.city = cc.city + '00'
            queryDict.applyDict('XZQH', (dictData) => {
              if (dictData && dictData.length > 0) {
                const w = dictData.find(item => {
                  return item.code === cc.city
                })
                cc.label = w.caption
              }
            })
          })
          that.cityArr = arr.concat(res.data)
        }
      })
    },
    queryTitleList() {
      var arr = [{label: '全部', value: ''}]
      slelectClinicalTitle.map(item => {
        if (item.children) {
          arr = arr.concat(item.children)
        }
      })
      this.titleList = arr
    },
    clearFiterFun() {
      this.pageNo = 1
      this.loadComplete = false
      this.searchData = []
      this.keywordSearch()
    },
    turnActiveTabFun() {
      this.level = ''
      this.type = ''
      this.addr = ''
      this.clinicalTitle = ''
      this.status = ''
      this.clearFiterFun()
    },
    keywordSearch() {
      var that = this
      var tab = this.activeName
      var url = ''
      var objparams = {}
      var params = {
        active: 1,
        key: this.keyVal,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }
      if (tab === '1') {
        url = pqDoctor
        objparams = Object.assign(params, {
          addr: that.addr,
          clinicalTitle: that.clinicalTitle,
          level: that.level
        })
      } else if (tab === '2') {
        url = pqHospital
        objparams = Object.assign(params, {
          addr: that.addr,
          type: that.type,
          level: that.level
        })
      } else if (tab === '3') {
        url = pqApply
        objparams = Object.assign(params, {
          addr: that.addr,
          status: that.status,
          level: that.level
        })
      }
      that.tabConLoading = true
      this.$http.get(url, objparams, function(res) {
        that.tabConLoading = false
        if (res.success && res.data) {
          const $info = res.data
          if (that.pageNo !== $info.pageNo || $info.data.length === 0) {
            that.loadComplete = true
            return
          }
          var pnum = $info.total
          if (tab === '2') {
            $info.data.find((item, index) => {
              if (item.id === '2319F311BE294CB9A8FBF05F267ED77A') {
                $info.data.splice(index, 1)
                $info.total -= 1
              }
            })
            pnum = $info.total - 1
          }
          if (Math.ceil(pnum / that.pageSize) === $info.pageNo) {
            that.loadComplete = true
          } else {
            that.pageNo++
          }
          if ($info.pageSize < that.pageSize || $info.pageSize === $info.total) {
            that.loadComplete = true
            that.searchData = $info.data
          } else {
            that.searchData =  that.searchData.concat($info.data)
          }
        } else {
          that.loadComplete = true
        }
      })
    },
    curCity(val) {
      this.addr = val
      this.clearFiterFun()
    },
    curCTitle(val) {
      var arr = strToArr(val, '-')
      var arr2 = []
      if (arr.length) {
        arr2 = [arr[0], val]
      }
      this.clinicalTitle = arrToStr(arr2)
      this.clearFiterFun()
    },
    curAStatus(val) {
      this.status = val
      this.clearFiterFun()
    },
    curHLevel(val) {
      this.level = val
      this.clearFiterFun()
    },
    curHType(val) {
      this.type = val
      this.clearFiterFun()
    }
  }
}
</script>

