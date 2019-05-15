<template>
  <transition name="el-fade-in">
    <div class="page-up" @click="scrollToTop" v-show="toTopShow">
      <i class="el-icon-caret-top"></i>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    step: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      toTopShow: false
    };
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('scroll', this.handleScroll, true);
    });
  },
  destroyed() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let dom = document.getElementsByClassName('el-main')[0];
      this.scrollTop = dom.scrollTop;
      if (this.scrollTop > 100) {
        this.toTopShow = true;
      } else {
        this.toTopShow = false;
      }
    },
    scrollToTop() {
      let timer = null;
      let _this = this;
      var dom = document.getElementsByClassName('el-main')[0];
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_this.scrollTop > 5000) {
          _this.scrollTop -= 1000;
          dom.scrollTop =
            _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else if (_this.scrollTop > 1000 && _this.scrollTop <= 5000) {
          _this.scrollTop -= 500;
          dom.scrollTop =
            _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else if (_this.scrollTop > 200 && _this.scrollTop <= 1000) {
          _this.scrollTop -= 100;
          dom.scrollTop =
            _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else if (_this.scrollTop > 50 && _this.scrollTop <= 200) {
          _this.scrollTop -= 10;
          dom.scrollTop =
            _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else if (_this.scrollTop > 0 && _this.scrollTop <= 50) {
          _this.scrollTop -= 5;
          dom.scrollTop =
            _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _this.toTopShow = false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.page-up {
  background-color: #00837e;
  position: fixed;
  right: 50px;
  bottom: 30px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 100;
  .el-icon-caret-top {
    color: #fff;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
  p {
    display: none;
    text-align: center;
    color: #fff;
  }
  &:hover {
    opacity: 1;
  }
}
</style>
