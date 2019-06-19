<template>
  <div class="brow-content">
		<div class="main-content split-bottom-20">
      <div class="wrapper-left">
        <div class="content-wrapper split-bottom-20">
          <div class="headcon-box hdetail-box">
            <div class="zoom-box">
              <preview-magnify v-if="baseInfo.image && baseInfo.image.length" :previewImg="baseInfo.image"></preview-magnify>
            </div>
            <div class="list-item reInfo-box">
              <div class="list-tit">{{baseInfo.name}}</div>
              <div class="list-desc" v-if="baseInfo.application">功能用途：{{baseInfo.application}}</div>
              <div class="list-operate" v-if="baseInfo.status">使用状态：{{baseInfo.status | aStatus}}</div>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content">
            <el-row :gutter="10" class="rel-detail">
              <el-col class="rel-item" :span="24">
                <div class="rel-tit">厂商型号：</div>
                <div>{{baseInfo.spec}}</div>
              </el-col>
              <el-col class="rel-item" :span="24">
                <div class="rel-tit">器械简介：</div>
                <div v-html="baseInfo.descp"></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="split-bottom-20">
          <base-hospital v-for="item in HospitalInfo" :key="item.index" :min="true" :itemSingle="item"></base-hospital>
        </div>
        <div class="split-bottom-20" v-if="otherApplys.length">
          <div class="content-title">其他器械</div>
          <base-appliance v-for="item in otherApplys" :key="item.index" :min="true" :itemSingle="item"></base-appliance>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import previewMagnify from '@/components/PreviewMagnify'
  import baseAppliance from '@/components/subTemplate/BaseAppliance';
  import baseHospital from '@/components/subTemplate/BaseHospital';
  import { qoApply, pqApplyByDepart } from '@/api/api'
  import queryBase from '@/utils/queryBase'
  import { urlParse, strToArr } from '@/utils'
  export default {
    data() {
      return {
        objId: '',
        baseInfo: {},
        HospitalInfo: [],
        otherApplys: []
      }
    },
    components: {
      previewMagnify,
      baseAppliance,
      baseHospital
    },
    created() {
      if (urlParse('id')) {
        this.objId = urlParse('id')
        this.getBaseInfo()
      }
    },
    methods: {
      getBaseInfo() {
        var that = this
        this.$http.get(qoApply, {
          id: this.objId
        }, function(res){
          if (res.success) {
            if (res.data.image) {
              res.data.image = strToArr(res.data.image);
            }
            queryBase.getHospital(res.data.creator, function(sc, value) {
              if (sc) {
                that.HospitalInfo.push(value)
              }
            })
            document.title = '器械-' + res.data.name
            that.baseInfo = res.data
            that.getOtherApply(res.data.creator, res.data.department)
          }
        })
      },
      getOtherApply(creator, department) {
        var that = this
        this.$http.get(pqApplyByDepart, {
          hospital: creator,
          department: department,
          active: 1,
          pageSize: 6,
          pageNo: 1
        }, function(res){
          if (res.success && res.data) {
            const obj = res.data.data
            var arr = []
            if (obj.length > 0) {
              for (let i = 0; i < obj.length; ++i) {
                if (obj[i].id !== that.objId) {
                  arr.push(obj[i])
                }
              }
            }
            if (arr.length > 5) {
              arr.splice(5)
            }
            that.otherApplys = arr
          }
        })
      }
    }
  }
</script>
