<template>
  <div>
    <el-radio-group v-model="radio" class="radio-change" v-on:change="changeRadio">
      <el-radio-button label="encode">编码</el-radio-button>
      <el-radio-button label="decode">解码</el-radio-button>
    </el-radio-group>
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
  </div>
</template>

<script>
  import {UnicodeEncode,UnicodeDecode} from '../../common/js/common.js';
  export default {
    name: "unicodePage",
    data() {
      return {
        restaurants: [],
        state1: '',
        textarea1: '',
        textarea2: '',
        radio: 'encode'
      };
    },
    methods: {
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      changeJson() {
        if(this.textarea1 != '') {
          if (this.radio == "encode") {
            this.textarea2 = UnicodeEncode(this.textarea1);
          }else if (this.radio == "decode") {
            this.textarea2 = UnicodeDecode(this.textarea1);
          }
        }else {
          this.textarea2 = "";
        }
      },
      changeRadio() {
        if(this.textarea1 != '') {
          if (this.radio == "encode") {
            this.textarea2 = UnicodeEncode(this.textarea1);
          }else if (this.radio == "decode") {
            this.textarea2 = UnicodeDecode(this.textarea1);
          }
        }else {
          this.textarea2 = "";
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

  .radio-change {
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
