import React, { Component } from 'react';
import ChartComp from '@/components/ChartComp'

interface IProps {
  isLine?: boolean;
  chartName?: string;
  chartColor?: any[];
  chartLegend?: any[];
  chartXAxis?: any[];
  chartData?: any[];
  isLegendScroll?: boolean;
  hideLegend?: boolean;
} 
class BarChart extends Component<IProps> {
  render() {
    const {isLine,chartName, chartColor, chartLegend, chartXAxis, chartData, isLegendScroll, hideLegend} = this.props
    // const series:any = (chartData || []).map(item => {
    //   item.type = 'bar'
    //   if (isLine) {
    //     item.type = 'line'
    //   }
    //   return item
    // })
    let chartOption:any = {
      title: {
        text: chartName,
        left: 'center'
      },
      color: chartColor || ['#8081ea', '#12a9ec', '#ff7b00', '#ef2c0c'],
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: { readOnly: false },
            // restore: {},
            saveAsImage: {},
        },
      },
      legend: {
          data: chartLegend,
          y: 'bottom'
      },
      grid: {
        top: '30',
        left: '3%',
        right: '3%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        data: chartXAxis,
      },
      yAxis: {},
      series:[
        {
          type:'bar',
          data:chartData
        }
      ]
    }
    if (isLine) {
      chartOption.xAxis.boundaryGap = false
    } 
    if (isLegendScroll) {
      chartOption.legend.type = 'scroll'
    }
    if (hideLegend) {
      chartOption.legend.show = false
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
export default BarChart;