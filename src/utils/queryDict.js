/**
 * Created by luyanan on 19/6/13.
 * 'XZQH'----'城市级联'
 */
/* eslint-disable one-var */
import request from '@/utils/request'

var cacheDict = {
    bool: [
      { code: '0', caption: '否', enabled: true },
      { code: '1', caption: '是', enabled: true }
    ]
  },
  handCache = {},
  uri = '../../../static/addr.json',
  setDict = function(code, items) {
    cacheDict[code] = items
    var hs = handCache[code]
    if (hs && hs.length) {
      hs.forEach(h => h(items))
      delete handCache[code]
    }
  },
  loadDict = function(code) {
    request.get(uri, {
      dict: code
    }, function(res) {
      setDict(code, res)
    })
  },
  applyDict = function(code, hander) {
    var dict = cacheDict[code]
    if (!dict) {
      var hs = handCache[code]
      if (!hs) {
        handCache[code] = hs = []
        loadDict(code)
      }
      hs.push(hander)
    } else {
      hander(dict)
    }
  },
  ret = {
    applyDict: applyDict
  }

export default ret
