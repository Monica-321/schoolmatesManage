import React, { Component } from 'react';
import ChartComp from '@/components/ChartComp'

interface IProps {
  chartName?: string;
  chartColor?: any[];
  chartData?: any[];
  isRing?: boolean;
  showCenterText?: boolean;
  centerText?: string;
  isLegendScroll?: boolean;
} 
class PieChart extends Component<IProps> {
  render() {
    const {chartName, chartColor, chartData, isRing, showCenterText, centerText, isLegendScroll } = this.props
    let chartOption:any = {
      title: {
        text: chartName,
        left: 'center'
      },
      color: chartColor || ['#ff7b00', '#ef2c0c','#8081ea', '#12a9ec', ],
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.name}:${parseFloat(params.percent).toFixed(2)}%`
        }
      },
      legend: {
          y: 'bottom'
      },
      series: [
          {
            type: 'pie',
            data: chartData,
            radius: ['0', '60%'],
            label: {
              show: true,
              formatter: (params: any) => {
                return `${params.name}:\n${parseFloat(params.percent).toFixed(2)}%`
              },
              textStyle: {
                color: '#333'
              }
            },
            labelLine: {
              lineStyle: {
                color: '#333'
              }
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.3)'
            },
            avoidLabelOverlap: true,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
      ]
    }
    if (isRing) {
      chartOption.series[0].radius = ['35%', '60%']
      if (showCenterText) {
        chartOption.graphic = [{
          type: 'text',
          left: 'center',
          top: 'center',
          z: 10,
          style: {
            fill: '#333',
            text: centerText,
            font: '16px Microsoft YaHei'
          }
        }]
      }
    }
    if (isLegendScroll) {
      chartOption.legend.type = 'scroll'
    }
    const chartProps = {
      chartStyle: {height: 350},
      chartOption
    }
    return (
      <ChartComp {...chartProps}/>
    )
  }
}
export default PieChart;