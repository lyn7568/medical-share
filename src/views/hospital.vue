<template>
  <div class="brow-content">
		<div class="split-bottom-20">
      <div class="list-item headcon-box">
        <div class="list-head list-pic-org" :style="baseInfo.image?'background: none':''">
          <img v-if="baseInfo.image" :src="baseInfo.image">
        </div>
        <div class="list-info">
          <div class="list-tit">{{baseInfo.name}}</div>
          <div class="list-owner">{{baseInfo.level | hLevel}} {{baseInfo.subLevel | hSubLevel}} {{baseInfo.type | hType}}</div>
          <div class="list-desc" v-if="baseInfo.location">地址：{{baseInfo.location}}</div>
          <div class="list-desc" v-if="baseInfo.phone">电话：{{baseInfo.phone}}</div>
        </div>
      </div>
    </div>
    <div class="main-content split-bottom-20">
      <div class="wrapper-left">
        <el-tabs v-model="activeName">
          <el-tab-pane label="主页" name="first">
            <div class="content-wrapper split-bottom-20" v-if="baseInfo.descp">
              <div class="content-title">医院简介</div>
              <show-more :showHeight="60" :content="baseInfo.descp"></show-more>
            </div>
            <div class="content-wrapper split-bottom-20" v-if="ksList.length">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>科室列表</span>
                </div>
                <div class="content">
                  <div class="dep-list-item" v-for="ks in ksList" :key="ks.index" v-show="ks.detail.length">
                    <div class="tag-label">{{ks.label}}</div>
                    <div class="tag-ul" v-if="ks.detail">
                      <div class="tag-li" v-for="item in ks.detail" :key="item.index">
                        <a :href="'#/department?id='+ item.id + '&hid=' + baseInfo.id">{{item.name}}</a>
                        <span>({{item.num}}人)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-wrapper split-bottom-20" v-if="platThreeDoctors.length">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>医生列表</span>
                  <span class="content-more" @click="activeName='second'">更多</span>
                </div>
                <div class="content">
                  <base-doctor v-for="item in platThreeDoctors" :key="item.index" :itemSingle="item"></base-doctor>
                </div>
              </div>
            </div>
            <div class="content-wrapper split-bottom-20" v-if="platThreeApplys.length">
              <div class="inner-wrapper">
                <div class="content-title">
                  <span>器械列表</span>
                  <span class="content-more" @click="activeName='third'">更多</span>
                </div>
                <div class="content">
                  <base-appliance v-for="item in platThreeApplys" :key="item.index" :itemSingle="item"></base-appliance>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'医生 ' + (serCount || '')" name="second">
            <base-doctor v-for="item in platDoctors" :key="item.index" :itemSingle="item"></base-doctor>
            <pull-down :allLoaded="loadDoctorComplete" @upup="getDoctorByHospital"></pull-down>
          </el-tab-pane>
          <el-tab-pane :label="'器械 ' + (patCount || '')" name="third">
            <base-appliance v-for="item in platApplys" :key="item.index" :itemSingle="item"></base-appliance>
            <pull-down :allLoaded="loadApplyComplete" @upup="getApplyByHospital"></pull-down>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="wrapper-right">
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import baseDoctor from '@/components/subTemplate/BaseDoctor';
  import baseAppliance from '@/components/subTemplate/BaseAppliance';
  import showMore from '@/components/ShowMore';
  import { qoHospital, pqDoctorByHospital, pqApplyByHospital, departClassify } from '@/api/api'
  import queryBase from '@/utils/queryBase'
  import { urlParse } from '@/utils'
  import { slelectDepartType } from '@/utils/dict.js'

  export default {
    data() {
      return {
        activeName: 'first',
        ksList: [],
        objId: '',
        baseInfo: {},
        pageSize: 10,
        pageFNo: 1,
        pageTNo: 1,
        platApplys: [],
        platDoctors: [],
        serCount: 0,
        patCount: 0,
        loadDoctorComplete: false,
        loadApplyComplete: false
      };
    },
    computed: {
      platThreeDoctors() {
        var pt = this.platDoctors
        var str = []
        if (pt.length > 3) {
          for (let i = 0; i < 3; ++i) {
            str[i] = pt[i]
          }
        } else {
          str = pt
        }
        return str
      },
      platThreeApplys() {
        var pt = this.platApplys
        var str = []
        if (pt.length > 3) {
          for (let i = 0; i < 3; ++i) {
            str[i] = pt[i]
          }
        } else {
          str = pt
        }
        return str
      }
    },
    components: {
      baseDoctor,
      baseAppliance,
      showMore
    },
    created() {
      if (urlParse('id')) {
        this.objId = urlParse('id')
        this.getBaseInfo()
        this.getDepartList()
        this.getDoctorByHospital()
        this.getApplyByHospital()
      }
    },
    methods: {
      getBaseInfo() {
        var that = this
        this.$http.get(qoHospital, {
          id: this.objId
        }, function(res){
          if (res.success) {
            document.title = '医院-' + res.data.name
            that.baseInfo = res.data
          }
        })
      },
      getDepartList() {
        var that = this
        this.$http.get(departClassify, {
          active: '1',
          hospital: this.objId
        }, function(res){
          if (res.success) {
            const obj = res.data
            if (obj.length) {
              var ll = slelectDepartType
              for (let j = 0; j < ll.length; ++j) {
                ll[j].detail = []
                for (let i = 0; i < obj.length; ++i) {
                  if (obj[i].type === ll[j].value) {
                    ll[j].detail.push(obj[i])
                  }
                }
              }
              that.ksList = ll
            }
          }
        })
      },
      getDoctorByHospital() {
        this.$http.get(pqDoctorByHospital, {
          hospital: this.objId,
          active: '1',
          pageSize: this.pageSize,
          pageNo: this.pageFNo
        }, res => {
          if (res.success && res.data) {
            var $info = res.data;
            this.serCount = $info.total
            if($info.data.length === 0) {
              this.loadDoctorComplete = true
              return
            }
            if ($info.pageSize < this.pageSize) {
              this.loadDoctorComplete = true
              this.platDoctors = $info.data
            } else {
              this.platDoctors =  this.platDoctors.concat($info.data)
            }
            if (Math.ceil($info.total / this.pageSize) === $info.pageNo) {
              this.loadDoctorComplete = true
            } else {
              this.pageFNo++
            }
          } else {
            this.loadDoctorComplete = true
          }
        })
      },
      getApplyByHospital() {
        this.$http.get(pqApplyByHospital, {
          hospital: this.objId,
          active: '1',
          pageSize: this.pageSize,
          pageNo: this.pageTNo
        }, res => {
          if (res.success && res.data) {
            var $info = res.data;
            this.patCount = $info.total
            if($info.data.length === 0) {
              this.loadApplyComplete = true
              return
            }
            if ($info.pageSize < this.pageSize) {
              this.loadApplyComplete = true
              this.platApplys = $info.data
            } else {
              this.platApplys =  this.platApplys.concat($info.data)
            }
            if (Math.ceil($info.total / this.pageSize) === $info.pageNo) {
              this.loadApplyComplete = true
            } else {
              this.pageTNo++
            }
          } else {
            this.loadDoctorComplete = true
          }
        })
      }
    }
  }
</script>
