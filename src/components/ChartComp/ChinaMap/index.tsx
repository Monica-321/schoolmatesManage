import React, { Component } from 'react';
import ChartComp from '@/components/ChartComp'
import echarts from 'echarts'
import china from '@/assets/json/china.json' 
// import chinaJson from 'echarts/map/json/china.json';
// import echarts from 'echarts';
// import 'echarts/map/js/china.js';

interface IProps {
  chartName?:string;
  mapData?: string;
  showCongestionData?: boolean; // 是否显示拥塞数据
} 
class ChinaMap extends Component<IProps> {
  componentDidMount() {
    // echarts.registerMap('china', china);
  }
  render() {
    const {chartName,mapData, showCongestionData} = this.props
    let chartOption:any = {
      title:{
        text: chartName,
        subtext: '纯属虚构',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        
      },
      legend: {
        show: true,
        orient: 'vertical',
        left: 'right',
        y: 'bottom',
        // data: ['iphone3', 'iphone4', 'iphone5'], 
      },
      visualMap: {           //地图图例
        show:true,
        left: 0,
        bottom: 0,
        showLabel:true,
        pieces: [        //根据数据大小，各省显示不同颜色
          {
            gte: 100,
            label: ">= 1000",
            color: "#1f307b"
          },
          {
            gte: 500,
            lt: 999,
            label: "500 - 999",
            color: "#3c57ce"
          },
          {
            gte: 100,
            lt:499,
            label: "100 - 499",
            color: "#6f83db"
          },
          {
            gte: 10,
            lt: 99,
            label: "10 - 99",
            color: "#9face7"
          },
          {
            lt:10,
            label:'<10',
            color: "#bcc5ee"
          }
        ]
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
        },
      },
      geo: {
        map: 'china',
        roam: true,
        scaleLimit: {
          min: 1,
          max: 2
        },
        zoom:1,
        label: {
          normal: {
            show:true,
            fontSize: "14",
            color: "rgba(0,0,0,0.7)"
          }
        },
        itemStyle: {
          normal:{
            borderColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis:{
            areaColor: '#f2d5ad',
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
          // name: "生源地",
          type: "map",
          // geoIndex: 0,
          mapType: 'china',
          label: {
            normal: {
                show: true,
            },
            emphasis: {
                show: true,
            },
          },
          data: [
            {
              name: "南海诸岛",
              value: 100,
            },
            {
              name: "北京",
              value: 540
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
              value: 750
            },
            {
              name: "河北",
              value: 130
            },
            {
              name: "河南",
              value: 830
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
              value: 690
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
              value: 104
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
              value: 778
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
              value: 555
            }
          ],
        },
      ],

    }
    const chartProps = {
      chartStyle: {height: 300},
      chartOption
    }
    return (
      <ChartComp {...chartProps}/>
    )
  }
}
export default ChinaMap;