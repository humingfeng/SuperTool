<template>
  <div>
  <section class="chart-container">
    <el-row>
      <el-col :span="24">
        <div id="chartBar" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="chartColumn" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartIP" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="chartLine" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartPie" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>
  </section>
<!--  <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-js>-->
  </div>
</template>

<script>
  import echarts from 'echarts'
  import returnCitySN from 'returnCitySN'
  export default {
    data() {
      return {
        chartColumn: null,
        chartBar: null,
        chartLine: null,
        chartPie: null,
        chartIP: null,
        message: "",
        IPPlace:""
      }
    },
   /* components:{
      'remote-js': {
        render(createElement) {
          return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
        },
        props: {
          src: { type: String, required: true },
        },
      }
    },*/
    methods: {
      drawColumnChart() {
        this.chartColumn = echarts.init(document.getElementById('chartColumn'));
        this.chartColumn.setOption({
            backgroundColor: 'rgba(202,247,255,0)',
            tooltip: {
              trigger: "item"
            },
            graphic: [{
              type: 'text',
              left: 'center',
              top: '40%',
              style: {
                text: this.message,
                fill: '#08A0E2',
                fontSize: 25
              }
            }, {
              type: 'text',
              left: 'center',
              top: '52%',
              style: {
                text: '当前宽带',
                fill: '#606261',
                font: 'normal 24px "Microsoft YaHei", sans-serif'
              }
            }],
            series: [
              {
                name: "",
                type: "gauge",
                radius: "50%",
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 359.9,
                splitNumber: 90,
                hoverAnimation: true,
                axisTick: {
                  show: false
                },
                splitLine: {
                  length: 50,
                  lineStyle: {
                    width: 5,
                    color: "#fff"
                  }
                },
                axisLabel: {
                  show: false
                },
                pointer: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    opacity: 0
                  }
                },
                detail: {
                  show: false
                },
                data: [{
                  value: 0,
                  name: ""
                }]
              },
              {
                name: "",
                type: "pie",
                radius: ["35%", "50%"],
                center: ['50%', '50%'],
                silent: true,
                z: 0,
                zlevel: 0,
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  }
                },
                data: [{
                  value: 60.5,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#08A0E2"
                    }
                  }
                },
                  {
                    value: 90.6,
                    name: "",
                    label: {
                      normal: {
                        show: false
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: "#999"
                      }
                    }
                  }
                ]
              }
            ]
          }
        );
      },
      drawBarChart() {

        //------------------------------------------------以下的变量为最终插入数据的变量------------------------------------------------------------
        //条形图x轴
        var xAxisBarChart = [];
        //条形图数据
        var dataBarChart = [];
        //开发工具一周点击（7个数）
        var dataBrownies = [];
        //站长工具一周点击（7个数）
        var dataMacarons = [];
        //极客工具一周点击（7个数）
        var dataTiramisu = [];
        //时间轴数据
        var timelineData = [];
        //数据插入图表
        var optionsData = [];

        //------------------------------------------------以下的变量为数据转换时的变量------------------------------------------------------------
        //极坐标轴显示星期几
        var weekDay = 0;
        //全数据数组
        var sourceArray = [];
        //判断是否排序
        var SortOrNot = false;
        //反序排序：从大到小
        var compare = function (x, y) {
          if (x.value < y.value) {
            return 1;
          } else if (x.value > y.value) {
            return -1;
          } else {
            return 0;
          }
        }
        //柱状图数据的映射集合，实现排序的转换
        var dataBarChartMap = new Map();
        //柱状图数据的寄存器，最后一步再导入到dataBarChart中
        var dataBarChartTemp = [];

        var myChart = echarts.init(document.getElementById('chartBar'));
        //图表加载
        var option = {
          baseOption: {
            timeline: {
              x: 0,
              axisType: 'category',
              orient: 'vertical',
              autoPlay: true,
              playInterval: 1000,
              data: timelineData,
              left: 10,
              right: null,
              top: 50,
              bottom: 0,
              width: 70,
              height: null,
              inverse: true,
              symbol: 'none',
              lineStyle: {
                color: '#555'
              },
              checkpointStyle: {
                color: '#bbb',
                borderColor: '#777',
                borderWidth: 2
              },
              label: {
                normal: {
                  textStyle: {
                    color: '#999',
                    fontSize: 15
                  }
                },
                emphasis: {
                  textStyle: {
                    color: '#999',
                    fontSize: 20
                  }
                }
              },
            },
            title: {
              text: '超级工具箱各模块使用程度',
              subtext: '点击极坐标系下即可与圆环图交互\n点击柱状图排序',
              textAlign: 'left'
            },
            tooltip: {
              trigger: 'item',
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              formatter: tooltipFormatter,

            },
            angleAxis: {
              type: 'category',
              data: [{
                value: '星期一',
                textStyle: {
                  fontSize: 25,
                }
              }, '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
              z: 10
            },
            grid: {
              left: '6%',
              right: '5%',
              top: '16%',
              bottom: '3%',
              containLabel: true
            },
            polar: {
              center: ['80%', '30%'],
              radius: 100,
            },
            xAxis: [{
              type: 'category',
              data: xAxisBarChart,
              axisLabel: {
                'interval': 0
              },
            }],
            yAxis: [{
              type: 'value',
              max: 600,
              show: false,
            }],
            radiusAxis: {},
            series: [{
              type: 'bar',
              data: dataBrownies,
              coordinateSystem: 'polar',
              name: '开发工具',
              center: ['80%', '30%'],
              stack: 'a',
              itemStyle: {
                normal: {
                  borderWidth: 4,
                  borderColor: '#ffffff',
                },
                emphasis: {
                  borderWidth: 0,
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }, {
              type: 'bar',
              data: dataMacarons,
              coordinateSystem: 'polar',
              name: '站长工具',
              center: ['80%', '30%'],
              stack: 'a',
              itemStyle: {
                normal: {
                  borderWidth: 4,
                  borderColor: '#ffffff',
                },
                emphasis: {
                  borderWidth: 0,
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }, {
              type: 'bar',
              data: dataTiramisu,
              coordinateSystem: 'polar',
              name: '极客工具',
              center: ['80%', '30%'],
              stack: 'a',
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  borderColor: '#ffffff',
                },
                emphasis: {
                  borderWidth: 3,
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }, {
              name: '每天点击',
              type: 'pie',
              center: ['80%', '30%'],
              radius: ['45%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  formatter: '{b} : {c} ({d}%)'

                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '15',
                    fontWeight: 'normal'
                  }
                },
                tooltip: {
                  trigger: 'item',
                  padding: 10,
                  backgroundColor: '#222',
                  borderColor: '#777',
                  borderWidth: 1,
                  formatter: tooltipFormatter,

                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              legend: {
                show: true,
                orient: 'vertical',
                x: 'left',
                y: 'bottom',
                data: ['开发工具', '站长工具', '极客工具']
              },
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  borderColor: '#ffffff',
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '15',
                    fontWeight: 'normal'
                  }
                }
              }
            }, {
              name: '半年点击',
              type: 'bar',
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  formatter: '{c}'

                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'normal'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  borderColor: '#ffffff',
                },
                emphasis: {
                  borderWidth: 3,
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          },
          options: optionsData,
        }


//全数据计算
        for (var week = 0; week < 26; week++) {
          var weekDataArray = [];
          for (var day = 0; day < 7; day++) {
            var productSales = [{
              'Brownies': parseInt(20 * Math.random()),
              'Macarons': parseInt(20 * Math.random()),
              'Tiramisu': parseInt(20 * Math.random())
            }];
            weekDataArray.push(productSales);
          }
          //一天的数据由3种蛋糕组成，一周由7天组成，半年由26周组成，所以写三个循环
          sourceArray.push(weekDataArray);
          timelineData.push('第' + (week + 1) + '周');
        }

        everyProductCalculate();

//现实情况下大多数都是根据数据源对数据进行切割和合并
        function everyProductCalculate() {
          //数组容器重置
          dataBarChartMap = new Map();
          dataBarChartTemp = [];
          xAxisBarChart = [];
          dataBrownies = [];
          dataMacarons = [];
          dataTiramisu = [];
          optionsData = [];

          //柱状图数据计算，就是一周合计的计算
          for (var i = 0; i < sourceArray.length; i++) {
            var weekSum = 0;
            for (var j = 0; j < sourceArray[i].length; j++) {
              var daySum = 0;
              daySum = sourceArray[i][j][0].Brownies +
                sourceArray[i][j][0].Macarons +
                sourceArray[i][j][0].Tiramisu;
              weekSum = weekSum + daySum;
            }
            dataBarChartTemp.push(weekSum);
          }
          //数据插入到map集合中，由星期和每周点击相互对应
          for (var i = 1; i < sourceArray.length + 1; i++) {
            dataBarChartMap.put(i, dataBarChartTemp[i - 1]);

          }
          //是否排序
          if (SortOrNot) {
            dataBarChartMap.elements.sort(compare);
            dataBarChartTemp = dataBarChartMap.elements;
          }
          //得到dataBarChart，柱状图数据
          dataBarChart = dataBarChartTemp;
          for (var i = 0; i < sourceArray.length; i++) {
            var xAxisBarChartTemp = [];
            for (var j = 0; j < sourceArray.length; j++) {
              if (i == dataBarChartMap.elements[j].key - 1) {
                xAxisBarChartTemp.push('\n>第' + dataBarChartMap.elements[j].key + '周<');
              } else {
                xAxisBarChartTemp.push(dataBarChartMap.elements[j].key + '周');
              }
            }
            //得到xAxisBarChart，柱状图x轴数据
            xAxisBarChart.push(xAxisBarChartTemp);
          }
          //
          //每个产品全部点击计算（一个产品包含7个值）
          for (var i = 0; i < sourceArray.length; i++) {
            let dataBrowniesTemp = [];
            let dataMacaronsTemp = [];
            let dataTiramisuTemp = [];
            for (var j = 0; j < sourceArray[i].length; j++) {
              dataBrowniesTemp.push(sourceArray[i][j][0].Brownies);
              dataMacaronsTemp.push(sourceArray[i][j][0].Macarons);
              dataTiramisuTemp.push(sourceArray[i][j][0].Tiramisu);
            }
            //得到蛋糕各自的数据
            dataBrownies.push(dataBrowniesTemp);
            dataMacarons.push(dataMacaronsTemp);
            dataTiramisu.push(dataTiramisuTemp);
          }
          for (var i = 0; i < sourceArray.length; i++) {
            optionsData.push({
              'series': [{
                'data': dataBrownies[i]
              }, {
                'data': dataMacarons[i]
              }, {
                'data': dataTiramisu[i]
              }, {
                'data': [{
                  value: dataBrownies[i][weekDay],
                  name: '开发工具'
                }, {
                  value: dataMacarons[i][weekDay],
                  name: '站长工具'
                }, {
                  value: dataTiramisu[i][weekDay],
                  name: '极客工具'
                }]
              }, {
                'data': dataBarChart
              },

              ],
              'xAxis': [{
                'data': xAxisBarChart[i],
              }]
            });
          }
          option.options = optionsData;

          myChart.setOption(option);
        }


        myChart.on('click', function (params) {
          //直接改变数据的内容
          if (params.componentSubType != 'pie' &&
            params.seriesName != '半年点击') {
            weekDay = params.dataIndex;
            for (var i = 0; i < option.baseOption.timeline.data.length; i++) {
              option.options[i].series[3].data[0].value = dataBrownies[i][weekDay];
              option.options[i].series[3].data[1].value = dataMacarons[i][weekDay];
              option.options[i].series[3].data[2].value = dataTiramisu[i][weekDay];
            }
            var weekDayData = ['星期一', '星期二', '星期三', '星期四', '星期五',
              '星期六', '星期日'
            ];
            weekDayData[weekDay] = {
              value: weekDayData[weekDay],
              textStyle: {
                fontSize: 25,
              }
            };
            option.baseOption.timeline.autoPlay = false;
            option.baseOption.angleAxis.data = weekDayData;
            myChart.setOption(option);
          }
          //重新执行数据转换过程
          else if (params.componentSubType == 'bar' &&
            params.seriesName == '半年点击') {
            if (SortOrNot == false) {
              SortOrNot = true;
            } else {
              SortOrNot = false;
            }
            everyProductCalculate();
            option.options = optionsData;
            myChart.setOption(option);
          }
        });

//提示框体
        function tooltipFormatter(params) {
          var valuesFormatter = [];
          if (params.componentSubType == 'pie') {
            valuesFormatter
              .push('<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                '本日点击' +
                '<br>' +
                '</div>' +
                '<span style="color:' +
                params.color +
                '">' + params.name + '</span>: ' + params.value);
          } else {
            valuesFormatter
              .push('<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                params.seriesName +
                '</div>' +
                '<span style="color:' +
                params.color +
                '">' +
                params.name +
                '</span>: ' +
                params.value + '<br>');
          }

          return valuesFormatter;
        }

//map集合,这里应该写在工具脚本中
        function Map() {
          this.elements = new Array();

          // 获取Map元素个数
          this.size = function () {
            return this.elements.length;
          },

            // 判断Map是否为空
            this.isEmpty = function () {
              return (this.elements.length < 1);
            },

            // 删除Map所有元素
            this.clear = function () {
              this.elements = new Array();
            },

            // 向Map中增加元素（key, value)
            this.put = function (_key, _value) {
              if (this.containsKey(_key) == true) {
                if (this.containsValue(_value)) {
                  if (this.remove(_key) == true) {
                    this.elements.push({
                      key: _key,
                      value: _value
                    });
                  }
                } else {
                  this.elements.push({
                    key: _key,
                    value: _value
                  });
                }
              } else {
                this.elements.push({
                  key: _key,
                  value: _value
                });
              }
            },

            // 删除指定key的元素，成功返回true，失败返回false
            this.remove = function (_key) {
              var bln = false;
              try {
                for (i = 0; i < this.elements.length; i++) {
                  if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                  }
                }
              } catch (e) {
                bln = false;
              }
              return bln;
            },

            // 获取指定key的元素值value，失败返回null
            this.get = function (_key) {
              try {
                for (i = 0; i < this.elements.length; i++) {
                  if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                  }
                }
              } catch (e) {
                return null;
              }
            },

            // 获取指定索引的元素（使用element.key，element.value获取key和value），失败返回null
            this.element = function (_index) {
              if (_index < 0 || _index >= this.elements.length) {
                return null;
              }
              return this.elements[_index];
            },

            // 判断Map中是否含有指定key的元素
            this.containsKey = function (_key) {
              var bln = false;
              try {
                for (i = 0; i < this.elements.length; i++) {
                  if (this.elements[i].key == _key) {
                    bln = true;
                  }
                }
              } catch (e) {
                bln = false;
              }
              return bln;
            },

            // 判断Map中是否含有指定value的元素
            this.containsValue = function (_value) {
              var bln = false;
              try {
                for (i = 0; i < this.elements.length; i++) {
                  if (this.elements[i].value == _value) {
                    bln = true;
                  }
                }
              } catch (e) {
                bln = false;
              }
              return bln;
            },

            // 获取Map中所有key的数组（array）
            this.keys = function () {
              var arr = new Array();
              for (i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i].key);
              }
              return arr;
            },

            // 获取Map中所有value的数组（array）
            this.values = function () {
              var arr = new Array();
              for (i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i].value);
              }
              return arr;
            };
        }

        this.chartBar = myChart;

      },
      drawLineChart() {
        this.chartLine = echarts.init(document.getElementById('chartLine'));
        this.chartLine.setOption({
          title: {
            text: '访问统计'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        });
      },
      drawPieChart() {
        this.chartPie = echarts.init(document.getElementById('chartPie'));
        this.chartPie.setOption({
          title: {
            text: '访问统计',
            subtext: '纯属虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      drawIPChart() {
        this.chartPie = echarts.init(document.getElementById('chartIP'));
        this.chartPie.setOption({
          backgroundColor: 'rgba(202,247,240,0)',
          graphic:[
            /*最外层圆线*/
            {
              type:'circle',
              left:'center',
              top:'middle',
              shape:{
                r:380
              },
              style:{
                fill:'rgba(40,15,16,0)'
              }
            },
            /*最底层圆*/
            {
              type:'ring',
              left:'center',
              top:'middle',
              shape:{
                r:390,
                r0:392
              },
              style:{
                fill:'#113048'
              }
            }
          ],
          series: [
            /*仪表盘图，做中间刻度线*/
            {
              type: 'gauge',
              name: '业务指标',
              radius:'60%',
              startAngle:'0',
              endAngle:'-359.99',
              splitNumber:'100',
              pointer:{
                show:false
              },
              title:{
                show:false
              },
              detail: {
                show:false
              },
              data: [{value: 95, name: '完成率'}],
              axisLine:{
                lineStyle: {
                  color:[[1,new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                    offset: 0,
                    color: 'rgba(4, 234,255, 1)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(74, 87,254, 1)'
                  }, {
                    offset:1,
                    color: 'rgba(59, 119,254, 1)'
                  }])]],
                  width: 20,
                  opacity: 1
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                length:20,
                lineStyle: {
                  color: 'rgba(255,255,255,1)',
                  width: 2,
                  type: 'solid',
                },
              },
              axisLabel: {
                show: false
              }
            },
            /*内心原型图，展示整体数据概览*/
            {
              name: 'pie',
              type: 'pie',
              clockWise: true,
              startAngle:-270,
              radius: ['48%', '50%'],
              hoverAnimation: false,
              center: ['50%', '50%'],
              data: [{
                value: 5,
                label: {
                  normal: {
                    formatter: this.IPPlace,
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: '15',
                      fontWeight: 'normal',
                      color: '#2724e3'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#f74369',
                    shadowColor: '#f74369',
                    shadowBlur: 10
                  }
                }
              }, {
                value: 5,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: 'rgba(247,67,105,0)', // 未完成的圆环的颜色
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
                  }
                }
              }]
            },
            /*外层环形图，展示详细占比*/
            {
              name: 'pie',
              type: 'pie',
              clockWise: true,
              startAngle:-270,
              radius: ['60%', '65%'],
              hoverAnimation: false,
              center: ['50%', '50%'],
              data: [{
                value: 5,
                name:'地区连接性',
                itemStyle:{
                  normal:{
                    color:'#e7b507'
                  }
                }
              },
                {
                  value: 25,
                  name:'本地连接性',
                  itemStyle:{
                    normal:{
                      color:'#009eff'
                    }
                  }
                },
                {
                  value: 15,
                  name:'服务连接性',
                  itemStyle:{
                    normal:{
                      color:'#f74369'
                    }
                  }
                }],
              itemStyle:{
                normal:{
                  borderWidth:3,
                  borderColor:'#00264d'
                }
              }
            }
          ]
        });
      },
      drawCharts() {
        this.drawColumnChart()
        this.drawBarChart()
        this.drawLineChart()
        this.drawPieChart()
        this.drawIPChart()
      },
      init() {
        this.message = navigator.connection.downlink + "M";
        // this.IPPlace = returnCitySN["cip"]+','+returnCitySN["cname"];;
        this.IPPlace = "访问网络\r\n" + returnCitySN["cip"] +"\r\n"+ returnCitySN["cname"];
      }
    },

    mounted: function () {
      this.init();
      this.drawCharts()
    },
    updated: function () {
      this.drawCharts()
    }
  }

</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }

  /*.chart div {
      height: 400px;
      float: left;
  }*/

  .el-col {
    padding: 30px 20px;
  }
</style>
