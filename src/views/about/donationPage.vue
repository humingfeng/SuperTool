<template>
  <!--<el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="img in list" :key="img">
      <img :src="img">
    </el-carousel-item>
  </el-carousel>-->
  <el-carousel indicator-position="outside" :height="bannerHeight + 'px'">
    <el-carousel-item v-for="img in list" :key="img">
      <img :src="img"  class="bannerImg" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "donationPage",
    data() {
      return {
        bannerHeight:"",
        list:[
          "static/WeChat.jpg",
          "static/wechatpay.jpg",
          "static/zhifubaopay.jpg"
        ]
      }
    },
    methods:{
      setSize: function () {
        this.bannerHeight = 740 / 2560 * this.screenWidth
        if(this.bannerHeight > 740) this.bannerHeight = 740
        if(this.bannerHeight < 360) this.bannerHeight = 360
      }
    },
    mounted () {
      this.setSize();
      const that = this;
      window.addEventListener('resize', function() {
        that.screenWidth = $(window).width();
        that.setSize();
      }, false);
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .bannerImg{
    width: 100%;
    height: inherit;
    min-height: 360px;
    min-width: 1400px;
  }
</style>
