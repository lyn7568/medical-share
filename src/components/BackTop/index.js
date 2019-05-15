import myBackTop from './backTop';

const BackTop = {
  install: function(Vue) {
    Vue.component('BackTop', myBackTop);
  }
};

export default BackTop;
