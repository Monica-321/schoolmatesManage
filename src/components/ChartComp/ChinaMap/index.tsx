import React, { Component } from 'react';
import ChartComp from '@/components/ChartComp'
import echarts from 'echarts'
// import chinaJson from 'echarts/map/json/china.json';
import chinaJson from './china.json';

interface IProps {
  chartName?:string;
  mapData?: string;
  showCongestionData?: boolean; // 是否显示拥塞数据
} 
class ChinaMap extends Component<IProps> {
  componentDidMount() {
    echarts.registerMap('china', chinaJson);
  }
  render() {
    const {chartName,mapData, } = this.props
    let chartOption:any = {
      title:{
        text: chartName,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter(params: any) {
          let provinceName:string = ''
          let cityArr = ['北京', '天津', '上海', '重庆']
          if (cityArr.includes(params.name)) {
            provinceName = params.name + '市'
          } else if (params.name === '新疆') {
            provinceName = '新疆维吾尔自治区'
          } else if (params.name === '广西') {
            provinceName = '广西壮族自治区'
          } else if (params.name === '内蒙古') {
            provinceName = '内蒙古自治区'
          } else if (params.name === '西藏') {
            provinceName = '西藏自治区'
          } else if (params.name === '宁夏') {
            provinceName = '宁夏回族自治区'
          }else if (params.name === '香港') {
            provinceName = '香港特别行政区'
          }else if (params.name === '澳门') {
            provinceName = '澳门特别行政区'
          } else {
            provinceName = params.name + '省'
          }
          return `${provinceName}<br /> 校友数量：${params.value} `
        }
      },
      legend: {
        show: true,
        orient: 'vertical',
        left: 'right',
        y: 'bottom',
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'left',
        top: 'center',
        feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
        },
      },
      geo: {
          map: 'china',
          center:[104.97, 35.71], 
          geoIndex:0,
          roam: true,
          zoom:1.6,
          label: {
            normal: {
              show: false
            },
            emphasis:{
              show: false
            }
        },
        //隐藏echarts原本分出的南海诸岛区域
        regions: [
          {
            name: "南海诸岛",
            value: 0,
            itemStyle: {
              normal: {
                opacity: 0,
                label: {
                  show: false
                }
              }
            }
          }
        ],
        itemStyle: {
          normal:{
            borderColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis:{
            areaColor: '#fff48f',
            shadowOffsetX: 0,
            shadowOffsetY: 5,
            shadowBlur: 0,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          }
        }
      },
      
      series: [
        {
          type: "map",
          geoIndex: 0,
          // data:mapData
          data:
          [
            {
              name: "北京",
              value: 54
            },
            {
              name: "天津",
              value: 130
            },
            {
              name: "上海",
              value: 400
            },
            {
              name: "重庆",
              value: 75
            },
            {
              name: "河北",
              value: 130
            },
            {
              name: "河南",
              value: 83
            },
            {
              name: "云南",
              value: 110
            },
            {
              name: "辽宁",
              value: 19
            },
            {
              name: "黑龙江",
              value: 150
            },
            {
              name: "湖南",
              value: 9
            },
            {
              name: "安徽",
              value: 60
            },
            {
              name: "山东",
              value: 39
            },
            {
              name: "新疆",
              value: 4
            },
            {
              name: "江苏",
              value: 31
            },
            {
              name: "浙江",
              value: 4
            },
            {
              name: "江西",
              value: 36
            },
            {
              name: "湖北",
              value: 52
            },
            {
              name: "广西",
              value: 33
            },
            {
              name: "甘肃",
              value: 7
            },
            {
              name: "山西",
              value: 5
            },
            {
              name: "内蒙古",
              value: 77
            },
            {
              name: "陕西",
              value: 22
            },
            {
              name: "吉林",
              value: 4
            },
            {
              name: "福建",
              value: 18
            },
            {
              name: "贵州",
              value: 5
            },
            {
              name: "广东",
              value: 98
            },
            {
              name: "青海",
              value: 1
            },
            {
              name: "西藏",
              value: 0
            },
            {
              name: "四川",
              value: 44
            },
            {
              name: "宁夏",
              value: 4
            },
            {
              name: "海南",
              value: 22
            },
            {
              name: "台湾",
              value: 3
            },
            {
              name: "香港",
              value: 5
            },
            {
              name: "澳门",
              value: 0
            }
          ],
        },
      ],
      dataRange: {
        x: 'right',
        y: 'bottom',
        splitList: [
          { start: 0, end: 0, label: '无' },
          { start: 1, end: 49, label: '1-49' },
          { start: 50, end: 99, label: '50-99'},
          { start: 100, end: 9999, label: '100及以上'},
        ],
        // color: ['#276678', '#1687a7', '#d3e0ea', '#f6f5f5']
        color:['#7579e7','#9ab3f5','#d8edfd','#f6f5f5'] //配色暂定
      },

    }
    const chartProps = {
      chartStyle: {height: 400},
      chartOption
    }
    return (
      <ChartComp {...chartProps}/>
    )
  }
}
export default ChinaMap;