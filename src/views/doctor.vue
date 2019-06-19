<template>
  <div class="brow-content">
		<div class="split-bottom-20">
        <div class="list-item headcon-box">
          <div class="list-head list-pic-usr" :style="baseInfo.image ? { backgroundImage: 'url('+ baseInfo.image +')' } : ''"></div>
          <div class="list-info">
            <div class="list-tit">{{baseInfo.name}} <small>{{baseInfo.clinicalTitle | cTitle}}  {{baseInfo.teachTitle | tTitle}}</small></div>
            <div class="list-owner">{{baseInfo.creator | hosCur}} {{baseInfo.department | dCur }} {{baseInfo.position || ''}}</div>
          </div>
        </div>
    </div>
    <div class="main-content split-bottom-20">
      <div class="wrapper-left">
        <div class="content-wrapper">
          <div class="split-bottom-20" v-if="baseInfo.direction">
            <div class="content-title">
              <span>擅长方向</span>
            </div>
            <div class="content">
              <el-row class="tag-item">
                <el-tag v-for="sub in baseInfo.direction" :key="sub.index">{{sub}}</el-tag>
              </el-row>
            </div>
          </div>
          <div class="split-bottom-20" v-if="baseInfo.descp">
            <div class="content-title">
              <span>个人简介</span>
            </div>
            <div class="content" v-html="baseInfo.descp"></div>
          </div>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="split-bottom-20">
          <base-hospital v-for="item in HospitalInfo" :key="item.index" :min="true" :itemSingle="item"></base-hospital>
        </div>
        <div class="split-bottom-20" v-if="otherDoctors.length">
          <div class="content-title">其他医生</div>
          <base-doctor v-for="item in otherDoctors" :key="item.index" :min="true" :itemSingle="item"></base-doctor>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import baseDoctor from '@/components/subTemplate/BaseDoctor';
  import baseHospital from '@/components/subTemplate/BaseHospital';
  import { qoDoctor, pqDoctorByDepart } from '@/api/api'
  import queryBase from '@/utils/queryBase'
  import { urlParse, strToArr } from '@/utils'
  export default {
    data() {
      return {
        objId: '',
        baseInfo: {},
        HospitalInfo: [],
        otherDoctors: []
      }
    },
    components: {
      baseDoctor,
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
        this.$http.get(qoDoctor, {
          id: this.objId
        }, function(res){
          if (res.success) {
            if (res.data.direction) {
              res.data.direction = strToArr(res.data.direction)
            }
            queryBase.getHospital(res.data.creator, function(sc, value) {
              if (sc) {
                that.HospitalInfo.push(value)
              }
            })
            document.title = '医生-' + res.data.name
            that.baseInfo = res.data
            that.getOtherDoctor(res.data.creator, res.data.department)
          }
        })
      },
      getOtherDoctor(creator, department) {
        var that = this
        this.$http.get(pqDoctorByDepart, {
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
            that.otherDoctors = arr
          }
        })
      }
    }
  }
</script>
