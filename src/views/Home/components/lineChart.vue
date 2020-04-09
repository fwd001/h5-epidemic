<template>
  <div class="lineCharts">
    <div id="lineCharts">line</div>
  </div>
</template>

<script>
let myChart = null

const dataJson = {
  xAxis: ['4.3', '4.10', '4.17', '4.24', '5.1', '5.8', '5.15', '5.22', '5.29'],
  data: [
    {
      name: '品质宣讲',
      data: [820, 932, 901, 934, 1290, 1330, 1320, 231, 434]
    },
    { name: '品质宣传', data: [1820, 1932, 1901, 1934, 11290, 11330, 11320, 321, 123] }
  ]
}

const legend = {
  icon: 'roundRect',
  itemHeight: 8,
  itemWidth: 8,
  right: 0,
  top: 20,
  textStyle: {
    // 图例文字的样式
    fontSize: 10
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
    fontSize: 10,
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
    fontSize: 10,
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
        color: 'red'
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
        color: 'gold'
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
      myChart = this.$echarts.init(document.getElementById('lineCharts'))
      // 指定图表的配置项和数据
      const option = {
        grid,
        title: {
          text: '全系统活动开展趋势图',
          top: 18,
          textStyle: {
            fontSize: 14
          }
        },
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
    getData() {
      // 加载
      myChart.showLoading({
        text: '加载中',
        color: 'rgb(255, 210, 0)'
      })
      xAxis.data = dataJson.xAxis
      series.forEach(v => {
        const item = dataJson.data.find(a => a.name === v.name)
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
  border: 0.5px solid #e7e9eb;
  box-sizing: border-box;
  border-radius: 0.16rem;
  margin-bottom: .6rem;
}
#lineCharts {
  user-select: none;
  position: relative;
  padding: 0 0.2rem;
  height: 5.33333333rem;
}
</style>
