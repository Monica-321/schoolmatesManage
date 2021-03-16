import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
interface IProps {
  chartOption?: any;
  chartStyle?: any;
} 

class ChartComp extends Component<IProps> {
  render(){
    const {chartOption, chartStyle} = this.props
    return (
      <ReactEcharts
        option={chartOption}
        notMerge={false}
        lazyUpdate={false}
        style={chartStyle}
        // onEvents={onEvents}
      />
    );
  }
}
export default ChartComp;
