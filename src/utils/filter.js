import Vue from 'vue'
import { strToArr, arrToStr } from '@/utils'
import store from '@/store'
import queryDict from '@/utils/queryDict'
import queryBase from '@/utils/queryBase'
import { selectHospitalLevel, selectHospitalSubLevel, selectHospitalType, slelectUseStatus, slelectTeachTitle, slelectClinicalTitle } from './dict.js'

Vue.filter('hLevel', function(val) {
  if (val){
    const w = selectHospitalLevel.find(item => {
      return item.value === val
    })
    return w.label
  }
})
Vue.filter('hSubLevel', function(val) {
  if (val){
    const w = selectHospitalSubLevel.find(item => {
      return item.value === val
    })
    return w.label
  }
})
Vue.filter('hType', function(val) {
  if (val){
    const w = selectHospitalType.find(item => {
      return item.value === val
    })
    return w.label
  }
})
Vue.filter('aStatus', function(val) {
  if (val){
    const w = slelectUseStatus.find(item => {
      return item.value === val
    })
    return w.label
  }
})
Vue.filter('tTitle', function(val) {
  if (val){
    const w = slelectTeachTitle.find(item => {
      return item.value === val
    })
    return w.label
  }
})
Vue.filter('cTitle', function(val) {
  var labV = []
  if (val) {
    const arr = strToArr(val)
    slelectClinicalTitle.find(item => {
      if (item.value === arr[0]) {
        labV.push(item.label)
        item.children.find(tt => {
          if (tt.value === arr[1]) {
            labV.push(tt.label)
          }
        })
      }
    })
  }
  return arrToStr(labV, '/')
})

Vue.filter('hosCur', function(val) {
  if (val){
    const w = store.getters.hospitalArrs.find(item => {
      return item.id === val
    })
    return w.name
  }
})
Vue.filter('dCur', function(val) {
  if (val){
    var departName = ''
    queryBase.getDepartment(val, function(sc, value) {
      if (sc) {
        departName = value.name
      }
    })
    return departName
  }
})
Vue.filter('cityCur', function(val) {
  if (val){
    var cityName = ''
    queryDict.applyDict('XZQH', (dictData) => {
      if (dictData && dictData.length > 0) {
        const w = dictData.find(item => {
          return item.code === val
        })
        cityName = w.full_caption
      }
    })
    return cityName
  }
})
