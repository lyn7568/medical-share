<template>
  <div class="el-filter-item">
    <div class="tag-label">{{options.label}}:</div>
    <div class="tag-ul">
      <!-- <template v-if="options.city">
        <el-tag
          :type="(active===index)?'primary':'info'"
          class="tag-li"
          v-for="(item,index) in options.list"
          :key="item.index"
          @click="handelTag(item, index)"
        >{{item.name}}</el-tag>
      </template> -->
      <el-tag
        :type="(active===index)?'primary':'info'"
        class="tag-li"
        v-for="(item,index) in options.list"
        :key="item.index"
        @click="handelTag(item, index)"
      >{{item.label}}</el-tag>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Object
    }
  },
  watch: {
    options: {
      deep: true,
      handler(val) {}
    }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    handelTag(val, index) {
      this.active = index;
      if (this.options.city) {
        this.$emit('selectedNow', val.city.substr(0,4));
      } else {
        this.$emit('selectedNow', val.value);
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../styles/mixins.scss";
.el-filter-item {
  position: relative;
  margin-bottom: 25px;
  min-height: 26px;
  &::after {
    content: "";
    background: #dfdfdf;
    position: absolute;
    height: 1px;
    width: 92%;
    left: 10%;
    bottom: -8px;
  }
  &:last-child {
    margin-bottom: 0;
    &::after {
      background: transparent;
    }
  }
  .tag-label {
    position: absolute;
    left: 0;
    line-height: 28px;
  }
  .tag-ul {
    padding-left: 80px;
    margin: 0 -10px -6px 0;
    .tag-li {
      border-radius: 15px;
      margin: 0 10px 6px 0;
      height: auto;
      line-height: 22px;
      cursor: pointer;
      &:hover {
        color: $--color-primary;
        border-color: $--color-primary;
        background-color: rgba(0, 131, 126, 0.1);
      }
    }
  }
}
</style>
