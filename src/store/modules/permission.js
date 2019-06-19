import { asyncAdminRouterMap, asyncHospRouterMap, constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = [...constantRouterMap, ...routers]
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('1') >= 0) {
          accessedRouters = asyncAdminRouterMap
        } else {
          accessedRouters = asyncHospRouterMap
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
