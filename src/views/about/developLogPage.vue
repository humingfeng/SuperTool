<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item timestamp="2018/3/15" placement="top">
        <el-card>
          <h4>增加开发日志</h4>
          <p>胡铭锋 提交于 2018/3/15 18:30</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/3/13" placement="top">
        <el-card>
          <h4>Unicode的编码解码</h4>
          <p>胡铭锋 提交于 2018/3/13 21:30</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/3/10" placement="top">
        <el-card>
          <h4>ASCII的编码解码</h4>
          <p>胡铭锋 提交于 2018/3/10 19:58</p>
        </el-card>
      </el-timeline-item>
    <el-timeline-item timestamp="2018/3/9" placement="top">
      <el-card>
        <h4>HTML的编码解码</h4>
        <p>胡铭锋 提交于 2018/3/9 00:05</p>
      </el-card>
    </el-timeline-item>
      <el-timeline-item timestamp="2018/3/7" placement="top">
        <el-card>
          <h4>URL的编码解码</h4>
          <p>胡铭锋 提交于 2018/3/7 20:35</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/3/5" placement="top">
        <el-card>
          <h4>String生成实体</h4>
          <p>胡铭锋 提交于 2018/3/5 23:40</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/3/4" placement="top">
        <el-card>
          <h4>JSON生成实体</h4>
          <p>胡铭锋 提交于 2018/3/4 23:22</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/2/28" placement="top">
        <el-card>
          <h4>页面布局优化</h4>
          <p>胡铭锋 提交于 2018/2/28 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/2/18" placement="top">
        <el-card>
          <h4>项目引入element-ui</h4>
          <p>胡铭锋 提交于 2018/2/18 21:50</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/2/16" placement="top">
        <el-card>
          <h4>创建项目并提交到Github</h4>
          <p>胡铭锋 提交于 2018/2/16 20:06</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  export default {
    name: "developLogPage",
    data() {
      return {
        restaurants: [],
        state1: '',
        textarea1: '',
        textarea2: ''
      };
    }
  }
</script>

<style scoped>

  .block {
    padding-top: 30px;
  }

</style>
