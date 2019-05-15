<template>
  <div class="ev_content" v-show="show">
    <div class="notice_d" v-show="noResult">
        <img v-bind:src="infoImage" class="d_photo" />
        <div class="d_prompt">
            <p class="d_2">{{message2}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import Img from './img/points_icon_ku_nor.png'
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    noResult: {
      type: Boolean,
      default: true
    },
    infoImage: {
      default: Img
    },
    message2: {
      type: String,
      default: '没有相关内容'
    }
  }
};
</script>

<style scoped>
  .ev_content{
    width: 100%;
    height: 42%;
    z-index: 11;
    padding:40px;
    box-sizing: border-box;
    display: flex;
    justify-content:center;
  }

  .notice_d{
    width: 100%;
    height: auto;
    text-align: center;
  }

  .notice_d .d_photo{
    width: 140px;
    height: 140px;
    margin: 20px auto 30px;
  }

  .d_prompt p{
    margin: 0;
    font-size: 0;
  }

  .d_prompt .d_1{
    width: 40%;
    margin: 0 auto;
    height: auto;
    word-break: break-word;
    font-size: 16px;
    color: #666666;
    text-align: center;
  }

  .d_prompt .d_2{
    width: 60%;
    height: auto;
    margin: 0 auto;
    word-break: break-word;
    font-size: 13px;
    color: #999999;
    text-align: center;
    margin-top: 10px;
  }

</style>
