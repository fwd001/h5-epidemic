<template>
  <div class="lineCharts">
    <div id="lineCharts">line</div>
    <div class="header">
      <h3>全系统活动开展趋势图</h3>
    </div>
  </div>
</template>

<script>
import echarts from '@/utils/echarts'
import dayjs from 'dayjs'
import * as api from '@/api/index'
let myChart = null
const beCounted = window.screen.width / 375

// const dataJson = {
//   xAxis: ['4.3', '4.10', '4.17', '4.24', '5.1', '5.8', '5.15', '5.22', '5.29'],
//   data: [
//     {
//       name: '品质宣讲',
//       data: [820, 932, 901, 934, 1290, 1330, 1320, 231, 434]
//     },
//     { name: '品质宣传', data: [1820, 1932, 1901, 1934, 11290, 11330, 11320, 321, 123] }
//   ]
// }

const legend = {
  icon: 'roundRect',
  itemHeight: 8 * beCounted,
  itemWidth: 8 * beCounted,
  right: 0,
  top: 20,
  textStyle: {
    // 图例文字的样式
    fontSize: 8 * beCounted
  },
  data: ['品质宣讲', '品质宣传']
}
const grid = {
  left: '1.5%',
  right: '4%',
  bottom: '5%',
  containLabel: true
}
const xAxis = {
  type: 'category',
  axisTick: {
    show: false
  },
  axisLine: {
    onZero: false,
    lineStyle: {
      color: '#eff0f1'
    }
  },
  axisLabel: {
    fontSize: 8 * beCounted,
    color: '#000'
  },
  boundaryGap: false,
  data: []
}
const yAxis = {
  axisTick: {
    show: false
  },
  axisLine: {
    onZero: false,
    lineStyle: {
      color: '#eff0f1'
    }
  },
  axisLabel: {
    fontSize: 8 * beCounted,
    color: '#000'
  },
  type: 'value'
}
const series = [
  {
    name: '品质宣讲',
    data: [],
    type: 'line',
    lineStyle: {
      normal: {
        color: '#ed414b'
      }
    },
    smooth: true
  },
  {
    name: '品质宣传',
    data: [],
    type: 'line',
    lineStyle: {
      normal: {
        color: '#fad247'
      }
    },
    smooth: true
  }
]

export default {
  name: 'lineChart',
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 初始化echarts实例
      myChart = echarts.init(document.getElementById('lineCharts'))
      // 指定图表的配置项和数据
      const option = {
        color: ['#ed414b', '#fad247'],
        grid,
        tooltip: {
          trigger: 'axis'
        },
        legend,
        xAxis,
        yAxis,
        series
      }

      // 使用指定的配置项和数据显示图表
      myChart.setOption(option)
      this.getData()
    },
    async getData() {
      // 加载
      myChart.showLoading({
        text: '加载中',
        color: 'rgb(255, 210, 0)'
      })
      const res = await api.getLineData()
      // console.log(res)

      xAxis.data = res.data.xAxis.map(v => dayjs(v).format('M.D'))
      series.forEach(v => {
        const item = res.data.data.find(a => a.name === v.name)
        v.data = item.data
      })
      myChart.setOption({
        xAxis,
        series
      })
      myChart.hideLoading()
    }
  }
}
</script>

<style lang="less" scoped>
.lineCharts {
  margin: 0.613333rem 0.4rem 0;
  box-shadow: 0 0.1rem 0.3rem 0 rgba(194, 200, 219, 0.6);
  box-sizing: border-box;
  border-radius: 0.16rem;
  margin-bottom: 0.6rem;
  position: relative;
 .header {
    position: absolute;
    z-index: 1;
    background-image: url('../../../assets/images/line.png');
    background-repeat: no-repeat;
    background-size: 106%;
    background-position: -0.11rem -0.06rem;
    // padding: 0.1rem 0.2rem;
    height: 0.6rem;
    width: 3.52rem;
    top: -.26rem;
    left: 0.3rem;
    color: #fff;
    h3 {
      font-size: 0.28rem;
      text-align: center;
      line-height: 2;
    }
  }
}
#lineCharts {
  user-select: none;
  position: relative;
  padding: 0 0.2rem;
  height: 5.33333333rem;
}
</style>
