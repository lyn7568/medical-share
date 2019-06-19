import queryDict from '@/utils/queryDict'

const city = {
  state: {
    citydata: {}
  },
  mutations: {
    citydata: (state, value) => {
      state.citydata = value
    }
  },
  actions: {
    getCityData({ commit, state }) {
      return new Promise((resolve, reject) => {
        queryDict.applyDict('XZQH', (dictData) => {
          if (dictData && dictData.length > 0) {
            var sortData = dictData.sort((obj1, obj2) => {
              return obj1.code - obj2.code
            })
            var arr = {}
            sortData.map(item => {
              if (item.code.match(/0000$/)) {
                arr[item.code] = { id: item.code, value: item.caption, children: {}}
              } else if (item.code.match(/00$/)) {
                var p = arr[item.code.slice(0, 2) + '0000']
                if (p) {
                  p.children[item.code] = { id: item.code, value: item.caption, children: {}}
                  if (!p.defaultChild) {
                    p.defaultChild = p.children[item.code]
                  }
                } else {
                  arr[item.code.slice(0, 2) + '0000'] = { id: item.code.slice(0, 2) + '0000', value: item.caption, children: {}}
                  var pr = arr[item.code.slice(0, 2) + '0000']
                  pr.children[item.code] = { id: item.code, value: item.caption, children: {}}
                  if (!pr.defaultChild) {
                    pr.defaultChild = pr.children[item.code]
                  }
                }
              } else {
                var pp = arr[item.code.slice(0, 2) + '0000'].children[item.code.slice(0, 4) + '00']
                if (pp) {
                  pp.children[item.code] = { id: item.code, value: item.caption }
                  if (!pp.defaultChild) {
                    pp.defaultChild = pp.children[item.code]
                  }
                } else {
                  arr[item.code.slice(0, 2) + '0000'].children[item.code.slice(0, 4) + '00'] = { id: item.code, value: item.caption }
                  var pw = arr[item.code.slice(0, 2) + '0000'].children[item.code.slice(0, 4) + '00']
                  pw.children[item.code] = { id: item.code, value: item.caption }
                  if (!pw.defaultChild) {
                    pw.defaultChild = pw.children[item.code]
                  }
                }
              }
            })
            commit('citydata', arr)
          }
          resolve(dictData)
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}

export default city
