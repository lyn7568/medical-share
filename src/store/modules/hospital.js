import { pqHospital } from '@/api/api'
import request from '@/utils/request'

const hospital = {
  state: {
    hospitalArrs: []
  },
  mutations: {
    hospitalDicts: (state, value) => {
      state.hospitalArrs = value
    }
  },
  actions: {
    getDictHospital({ commit, state }) {
      return new Promise((resolve, reject) => {
        request.get(pqHospital, {
          active: 1,
          pageSize: 50,
          pageNo: 1
        }, function(response) {
          if (response.success) {
            if (response.data) {
              const dataS = response.data.data
              commit('hospitalDicts', dataS)
            }
          }
          resolve(response)
        }, function(error) {
          reject(error)
        })
      })
    }
  }
}

export default hospital
