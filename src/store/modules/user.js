import request from '@/utils/request'
import { login, logout, getInfo } from '@/api/api'

const user = {
  state: {
    userid: sessionStorage.getItem('user_auth') || '',
    name: '',
    roles: []
  },
  mutations: {
    SET_USERID: (state, userid) => {
      state.userid = userid
      sessionStorage.setItem('user_auth', userid)
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const account = userInfo.username.trim()
      const pw = userInfo.password
      return new Promise((resolve, reject) => {
        request.post(login, { account, pw }, function(response) {
          if (response.success) {
            if (response.data) {
              const dataS = response.data
              if (dataS.active) {
                if (dataS.id === '2319F311BE294CB9A8FBF05F267ED77A') {
                  commit('SET_ROLES', ['1'])
                } else {
                  commit('SET_ROLES', ['0'])
                }
                commit('SET_USERID', dataS.id)
                commit('SET_NAME', dataS.name)
              }
            }
          }
          resolve(response)
        }, function(error) {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        request.get(getInfo, { }, function(response) {
          if (response.success) {
            if (response.data) {
              const dataS = response.data
              if (dataS.active) {
                if (dataS.id === '2319F311BE294CB9A8FBF05F267ED77A') {
                  commit('SET_ROLES', ['1'])
                } else {
                  commit('SET_ROLES', ['0'])
                }
                commit('SET_USERID', dataS.id)
                commit('SET_NAME', dataS.name)
              }
            }
          }
          resolve(response)
        }, function(error) {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        request.get(logout, { }, function(response) {
          commit('SET_ROLES', [])
          commit('SET_USERID', '')
          commit('SET_NAME', '')
          resolve(response)
        }, function(error) {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROLES', [])
        commit('SET_USERID', '')
        commit('SET_NAME', '')
        resolve()
      })
    }
  }
}

export default user
