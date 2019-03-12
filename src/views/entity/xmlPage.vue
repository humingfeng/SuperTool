<template>
  <div>
    <div>
      <el-radio-group v-model="radio" class="radio-change" v-on:change="changeRadio">
        <el-radio-button label="Java"></el-radio-button>
        <el-radio-button label="C#"></el-radio-button>
        <el-radio-button label="待续" :disabled="true"></el-radio-button>
      </el-radio-group>
    </div>
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
  import {extractJson ,extractJavaJson,jsonChilds} from '../../common/js/common.js';
  export default {
    name: "xmlPage",
    data() {
      return {
        restaurants: [],
        state1: '',
        textarea1: '',
        textarea2: '',
        radio: 'Java'
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
          var obj = eval("(" + this.textarea1 + ")");
          if (this.radio == "C#") {
            var sb = extractJson("Root", obj);
            while (jsonChilds != null && jsonChilds.length > 0) {
              var item = jsonChilds.pop();
              sb += "\r\n\r\n" + extractJson(item.name, item.value);
            }
          }else if (this.radio == "Java") {
            var sb = extractJavaJson("Root", obj);
            while (jsonChilds != null && jsonChilds.length > 0) {
              var item = jsonChilds.pop();
              sb += "\r\n\r\n" + extractJavaJson(item.name, item.value);
            };
          }
          this.textarea2 = sb;
        }else {
          this.textarea2 = "";
        }
      },
      changeRadio() {
        if(this.textarea1 != '') {
          var obj = eval("(" + this.textarea1 + ")");
          if (this.radio == "C#") {
            var sb = extractJson("Root", obj);
            while (jsonChilds != null && jsonChilds.length > 0) {
              var item = jsonChilds.pop();
              sb += "\r\n\r\n" + extractJson(item.name, item.value);
            }
          }else if (this.radio == "Java") {
            var sb = extractJavaJson("Root", obj);
            while (jsonChilds != null && jsonChilds.length > 0) {
              var item = jsonChilds.pop();
              sb += "\r\n\r\n" + extractJavaJson(item.name, item.value);
            };
          }
          this.textarea2 = sb;
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
