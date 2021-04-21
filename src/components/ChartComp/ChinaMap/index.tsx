import React, { Component } from 'react';
import ChartComp from '@/components/ChartComp'
import echarts from 'echarts'
// import chinaJson from 'echarts/map/json/china.json';
import chinaJson from './china.json';

interface IProps {
  chartName?:string;
  mapData?: any;
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
          } 
          // else if (params.name === '新疆') {
          //   provinceName = '新疆维吾尔自治区'
          // } else if (params.name === '广西') {
          //   provinceName = '广西壮族自治区'
          // } else if (params.name === '内蒙古') {
          //   provinceName = '内蒙古自治区'
          // } else if (params.name === '西藏') {
          //   provinceName = '西藏自治区'
          // } else if (params.name === '宁夏') {
          //   provinceName = '宁夏回族自治区'
          // }else if (params.name === '香港') {
          //   provinceName = '香港特别行政区'
          // }else if (params.name === '澳门') {
          //   provinceName = '澳门特别行政区'
          // } 
          // else {
          //   provinceName = params.name + '省'
          // }
          else {
            provinceName = params.name
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
          center:[104.97, 37.71], 
          geoIndex:0,
          roam: true,
          zoom:1.7,
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
          data:mapData
        },
      ],
      dataRange: {
        x: 'right',
        y: 'bottom',
        splitList: [
          { start: 0, end: 0, label: '无' },
          { start: 1, end: 29, label: '1-29' },
          { start: 30, end: 59, label: '30-59'},
          { start: 60, end: 9999, label: '60及以上'},
        ],
        // color: ['#276678', '#1687a7', '#d3e0ea', '#f6f5f5']
        color:['#7579e7','#9ab3f5','#d8edfd','#f6f5f5'] //配色暂定
      },

    }
    const chartProps = {
      chartStyle: {height: 500},
      chartOption
    }
    return (
      <ChartComp {...chartProps}/>
    )
  }
}
export default ChinaMap;