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
  import {getFieldType,getJavaFieldType,getJavaEntity,getJavaPropEntity} from '../../common/js/common.js';
  export default {
    name: "strPage",
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

          var array = this.textarea1.split(/,|，/);
          if (array != null && array.length > 0) {
            var cate = this.radio;
            var sb = "public class Root";
            sb += "\r\n{";
            var props = [];
            for (var i = 0; i < array.length; i++) {
              var item = array[i];
              var name = item;
              var type = "string";
              if (/(\w+)\((\w)+\)/.test(item)) {
                var t = /(\w+)\((\w)+\)/.exec(item);
                name = t[1]
                if (cate == "C#") {
                  type = getFieldType(t[2]);
                } else if (cate == "Java") {
                  type = getJavaFieldType(t[2]);
                }
              }
              if (cate == "C#") {
                sb += ((i > 0 ? "\r\n" : "") + "\r\n\tpublic " + type + " " + name + " { get; set; }");
              } else if (cate == "Java") {
                if (type == "string") {
                  type = "String";
                }
                sb += (i > 0 ? "\r\n" : "") + getJavaEntity(type, name);
                props.push({"type": type, "name": name});
              }
            }
            for (var p in props) {
              sb += getJavaPropEntity(props[p].type, props[p].name);
            }
            sb += "\r\n}";

            this.textarea2 = sb;
          }
        }else {
          this.textarea2 = "";
        }
      },
      changeRadio() {
        if(this.textarea1 != '') {
          var array = this.textarea1.split(/,|，/);
          if (array != null && array.length > 0) {
            var cate = this.radio;
            var sb = "public class Root";
            sb += "\r\n{";
            var props = [];
            for (var i = 0; i < array.length; i++) {
              var item = array[i];
              var name = item;
              var type = "string";
              if (/(\w+)\((\w)+\)/.test(item)) {
                var t = /(\w+)\((\w)+\)/.exec(item);
                name = t[1]
                if (cate == "C#") {
                  type = getFieldType(t[2]);
                } else if (cate == "Java") {
                  type = getJavaFieldType(t[2]);
                }
              }
              if (cate == "C#") {
                sb += ((i > 0 ? "\r\n" : "") + "\r\n\tpublic " + type + " " + name + " { get; set; }");
              } else if (cate == "Java") {
                if (type == "string") {
                  type = "String";
                }
                sb += (i > 0 ? "\r\n" : "") + getJavaEntity(type, name);
                props.push({"type": type, "name": name});
              }
            }
            for (var p in props) {
              sb += getJavaPropEntity(props[p].type, props[p].name);
            }
            sb += "\r\n}";

            this.textarea2 = sb;
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
