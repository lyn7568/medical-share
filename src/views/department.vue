<template>
  <div class="brow-content">
		<div class="split-bottom-20">
      <div class="list-item headcon-box" v-if="HospitalInfo.length">
        <div class="list-head list-pic-org" :style="HospitalInfo[0].image?'background: none':''">
          <img v-if="HospitalInfo[0].image" :src="HospitalInfo[0].image">
        </div>
        <div class="list-info">
          <div class="list-tit">{{HospitalInfo[0].name}} {{baseInfo.name}}</div>
          <div class="list-owner">{{HospitalInfo[0].level | hLevel}} {{HospitalInfo[0].subLevel | hSubLevel}} {{HospitalInfo[0].type | hType}}</div>
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
              <div class="content-title">科室简介</div>
              <show-more :showHeight="60" :content="baseInfo.descp"></show-more>
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
            <pull-down :allLoaded="loadDoctorComplete" @upup="getDoctorByDepart"></pull-down>
          </el-tab-pane>
          <el-tab-pane :label="'器械 ' + (patCount || '')" name="third">
            <base-appliance v-for="item in platApplys" :key="item.index" :itemSingle="item"></base-appliance>
            <pull-down :allLoaded="loadApplyComplete" @upup="getApplyByDepart"></pull-down>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="wrapper-right">
        <div class="split-bottom-20">
          <base-hospital v-for="item in HospitalInfo" :key="item.index" :min="true" :itemSingle="item"></base-hospital>
        </div>
        <div class="split-bottom-20" v-if="otherDeparts.length">
          <div class="content-title">其他科室</div>
          <a class="list-item" v-for="item in otherDeparts" :key="item.index" :href="'#/department?id=' + item.id + '&hid=' + objHId">{{item.name}}</a>
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
  import showMore from '@/components/ShowMore';
  import { qoDepart, pqDepartByHospital, pqDoctorByDepart, pqApplyByDepart } from '@/api/api'
  import queryBase from '@/utils/queryBase'
  import { urlParse } from '@/utils'
  export default {
    data() {
      return {
        activeName: 'first',
        ksList: [],
        objId: '',
        objHId: '',
        baseInfo: {},
        pageSize: 10,
        pageFNo: 1,
        pageTNo: 1,
        platApplys: [],
        platDoctors: [],
        serCount: 0,
        patCount: 0,
        loadDoctorComplete: false,
        loadApplyComplete: false,
        HospitalInfo: [],
        otherDeparts: []
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
      baseHospital,
      showMore
    },
    created() {
      if (urlParse('id')) {
        this.objId = urlParse('id')
        this.getBaseInfo()
        if (urlParse('hid')) {
          this.objHId = urlParse('hid')
          this.getOtherDeaprt()
          this.getDoctorByDepart()
          this.getApplyByDepart()
        }
      }
    },
    methods: {
      getBaseInfo() {
        var that = this
        this.$http.get(qoDepart, {
          id: this.objId
        }, function(res){
          if (res.success) {
            queryBase.getHospital(res.data.creator, function(sc, value) {
              if (sc) {
                that.HospitalInfo.push(value)
              }
            })
            document.title = '科室-' + res.data.name
            that.baseInfo = res.data            
          }
        })
      },
      getOtherDeaprt() {
        var that = this
        this.$http.get(pqDepartByHospital, {
          hospital: that.objHId,
          active: 1
        }, res => {
          if (res.success && res.data) {
            var obj = res.data
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
            that.otherDeparts = arr
          }
        })
      },
      getDoctorByDepart() {
        this.$http.get(pqDoctorByDepart, {
          hospital: this.objHId,
          department: this.objId,
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
      getApplyByDepart() {
        this.$http.get(pqApplyByDepart, {
          hospital: this.objHId,
          department: this.objId,
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
  };
</script>
