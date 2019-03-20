<template>
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 20}"
          placeholder="请输入内容，自动转换！"
          v-model="textarea1"
          class="inputQuery"
          v-on:input="changeJson">
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 20}"
          placeholder="结果"
          v-model="textarea2"
          class="inputResult">
        </el-input>
      </el-col>
    </el-row>
</template>

<script>
    import {translate} from '../../common/js/morsecode.js';
    export default {
      name: "morse",
      data() {
        return {
          restaurants: [],
          state1: '',
          textarea1: '',
          textarea2: ''
        };
      },
      methods: {
        changeJson() {
          if (this.textarea1 != '') {

            this.textarea2 = translate(this.textarea1);

          } else {
            this.textarea2 = "";
          }
        }
      }
    }
</script>

<style scoped>
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
