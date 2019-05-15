import mydefaultPage from './default';

const defaultTip = {
  install: function(Vue) {
    Vue.component('DefaultTip', mydefaultPage);
  }
};

// 导出组件
export default defaultTip;
