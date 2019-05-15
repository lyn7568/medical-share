import MyLoading from './pullDown';

const pullDown = {
  install: function(Vue) {
    Vue.component('PullDown', MyLoading);
  }
};

// 导出组件
export default pullDown;
