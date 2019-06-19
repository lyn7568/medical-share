import { qoHospital, qoDepart } from '@/api/api'
import request from '@/utils/request'
var objCache = {
  hospital: {},
  department: {}
}
var objHcache = {
  hospital: {},
  department: {}
}
var objCacheHandler = {
  hospital: function (id) {
    var hc = objHcache.hospital[id]
    request.get(qoHospital, {
      id: id
    }, function (data) {
      delete objHcache.hospital[id]
      if (data.success) {
        objCache.hospital[id] = data.data
        for (let i = 0; i < hc.length; ++i) {
          hc[i](true, data.data)
        }
      } else {
        for (let i = 0; i < hc.length; ++i) {
          hc[i](false)
        }
      }
    }, function () {
      for (let i = 0; i < hc.length; ++i) {
        hc[i](false)
      }
    })
  },
  department: function (id) {
    var hc = objHcache.department[id]
    request.get(qoDepart, {
      id: id
    }, function (data) {
      delete objHcache.department[id]
      if (data.success) {
        objCache.department[id] = data.data
        for (let i = 0; i < hc.length; ++i) {
          hc[i](true, data.data)
        }
      } else {
        for (let i = 0; i < hc.length; ++i) {
          hc[i](false)
        }
      }
    }, function () {
      for (let i = 0; i < hc.length; ++i) {
        hc[i](false)
      }
    })
  }
}
var cacheModel = {
  getHospital: function (id, handler) {
    var data = objCache.hospital[id]
    if (data) {
      handler(true, data)
    } else {
      if (objHcache.hospital[id]) {
        objHcache.hospital[id].push(handler)
      } else {
        objHcache.hospital[id] = []
        objHcache.hospital[id].push(handler)
        objCacheHandler.hospital(id)
      }
    }
  },
  getDepartment: function (id, handler) {
    var data = objCache.department[id]
    if (data) {
      handler(true, data)
    } else {
      if (objHcache.department[id]) {
        objHcache.department[id].push(handler)
      } else {
        objHcache.department[id] = []
        objHcache.department[id].push(handler)
        objCacheHandler.department(id)
      }
    }
  }
}
export default cacheModel