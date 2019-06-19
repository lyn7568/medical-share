/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
  }
/**
 * String与Array之间的转换
 */
export function strToArr(str, fh = ',') {
    var subs = []
    if (str) {
      if (str.indexOf(fh)) {
        subs = str.split(fh)
      } else {
        subs[0] = str
      }
      return subs
    } else {
      return subs
    }
  }
  export function arrToStr(arr, fh = ',') {
    var strs = ''
    if (arr) {
      strs = arr.join(fh)
      return strs
    } else {
      return strs
    }
  }