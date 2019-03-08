<template>
  <div>
    <el-row>
      <el-col :span="12" class="button-change">
        <el-button type="primary">Java</el-button>
        <el-button type="info" disabled>待续</el-button>
      </el-col>
    </el-row>
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 30}"
          placeholder="请输入内容，自动转换！"
          v-model="textarea1"
          class="inputQuery">
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 30}"
          placeholder="结果"
          v-model="textarea2"
          class="inputResult">
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "jsonPage",
    data() {
      return {
        restaurants: [],
        state1: '',
        textarea1: '',
        textarea2: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>

<style scoped>

  .button-change {
    position:relative;
    top:20px;
    left: 20px;
    width: 90%;
  }

  .inputResult {
    position:relative;
    top:50px;
    right: 20px;
    width: 90%;
  }
  .inputQuery {
    position:relative;
    top:50px;
    left: 20px;
    width: 90%;
  }
</style>
