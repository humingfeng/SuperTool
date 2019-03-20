<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入需要查询的网址" v-model="input" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="http://" value="http://"></el-option>
        <el-option label="https://" value="https://"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
    </el-input>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      class="queryTable">
      <el-table-column
        property="domain"
        label="domain"
        width="120">
      </el-table-column>
      <el-table-column
        property="info"
        label="info"
        width="120">
      </el-table-column>
      <el-table-column
        property="status"
        label="status"
        width="120">
      </el-table-column>
      <el-table-column
        property="message"
        label="message"
        width="120">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
    export default {
      name: "whoisquery",
      data() {
        return {
          input: '',
          select: 'http://',
          tableData: []
        }
      },
      methods: {
        setCurrent(row) {
          this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
          this.currentRow = val;
        },
        query() {
          let param ={"sld" : this.select + this.input};
        }
      }
    }
</script>

<style scoped>
  .el-select {
    width: 100px;
  }
  .input-with-select {
    background-color: #fff;
    width: 50%;
    left: 200px;
    top: 50px;
  }
  .queryTable {
    top: 100px;
    width: 50%;
    left: 200px;
  }
</style>
