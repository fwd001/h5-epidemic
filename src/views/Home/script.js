import echarts from '@/utils/echarts'

import * as api from '../../api/index'
// import dataJson from './mapdata'
import TableO from './components/table-o'
import TableT from './components/table-t'
import lineChart from './components/lineChart'
import dayjs from 'dayjs'

let myChart = null
const beCounted = window.screen.width / 375
const tooltip = {
  triggerOn: 'click',
  formatter: function(e, t, n) {
    if (e.data) {
      return `${e.name}<ul>
        <li> 宣讲人数：${e.data.preach || 0}</li>
        <li> 达成率：${e.data.preachAmr || 0}%</li>
        <li> 宣传人数：${e.data.propaganda || 0}</li>
        <li> 达成率：${e.data.propAmr || 0}%</li></ul>`
    }
  }
}
const visualMap = {
  min: 0,
  max: 1,
  left: 2,
  bottom: 10,
  showLabel: !0,
  show: false,
  pieces: [
    {
      gte: 100,
      label: '100%',
      color: 'rgb(255, 210, 0)'
    },
    {
      gte: 70,
      lte: 99,
      label: '70%-99%',
      color: 'rgb(215, 33, 57)'
    },
    {
      gte: 50,
      lte: 69,
      label: '50%-69%',
      color: 'rgb(255, 24, 68)'
    },
    {
      gte: 30,
      lte: 49,
      label: '30%-49%',
      color: 'rgb(254, 81, 119)'
    },
    {
      gte: 10,
      lte: 29,
      label: '10%-29%',
      color: '#ef8094'
    },
    {
      gte: 0,
      lte: 9,
      label: '1%-9%',
      color: '#f7cdd0'
    }
  ]
}

const series = [
  {
    name: '确诊数',
    label: {
      normal: {
        show: true
      }
    },
    type: 'map',
    mapType: 'china',
    geoIndex: 0,
    data: []
  }
]

export default {
  name: 'Home',
  components: {
    'table-o': TableO,
    'table-t': TableT,
    'line-chart': lineChart
  },
  data() {
    const date = dayjs().format('YYYY-MM-DD')
    return {
      explanation: false,
      chartIndex: 0,
      openScroll: false,
      tipShow: false,
      dataJson: [],
      // 全国动态
      dynamic: {
        preachSum: '-', // 本周品质宣讲
        lastWeekpreach: '-', // 上周品质宣讲
        propagandaSum: '-', // 本周品质宣传
        lastWeekPropaganda: '-', // 上周品质宣传
        preachAmrSum: '-', // 本周品质宣讲达成率
        lastWeekpreachAmr: '-', // 上周品质宣讲达成率
        propAmrSum: '-', // 本周品质宣传达成率
        lastWeekpropAmr: '-', // 上周品质宣传达成率
        preachT3: '-', // 品质宣讲人数TOP3
        propagandaT3: '-', // 品质宣传人数TOP3
        preachAmrT3: '-', // 品质宣讲达成率TOP3
        propAmrT3: '-' // 品质宣传达成率TOP3
      },
      tipData: {
        name: '-',
        value: '-',
        preach: '-', // 品质宣讲人数
        preachAmr: '-', // 品质宣讲达成率
        propaganda: '-', // 品质宣传人数
        propAmr: '-' // 品质宣传达成率
      },
      date
    }
  },
  watch: {
    // 切换地图数据
    chartIndex(val, old) {
      this.dataJson.forEach(ele => {
        if (val === 0) {
          ele.value = ele.preachAmr
        } else {
          ele.value = ele.propAmr
        }
      })
      // 重新渲染数据
      series[0].data = this.dataJson
      myChart.setOption({
        series
      })
    }
  },
  created() {
    this.listenInit()
    this.getDynamic()
  },
  mounted() {
    this.mapInit()
  },
  methods: {
    mapInit() {
      // 初始化echarts实例
      myChart = echarts.init(document.getElementById('myEcharts'))
      // 指定图表的配置项和数据
      const option = {
        tooltip,
        visualMap,
        geo: {
          map: 'china',
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.2,
          top: '10%',
          label: {
            normal: {
              show: !0,
              fontSize: 8 * beCounted,
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#ffffff',
              shadowBlur: 0,
              // shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: '#e1c2c1'
            },
            emphasis: {
              areaColor: 'rgb(255, 172, 0)',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series
      }

      // 使用指定的配置项和数据显示图表
      myChart.setOption(option)
      this.getData()
    },
    async getDynamic() {
      const res = await api.getDynamic()
      this.dynamic = res.data
      // console.log(res)
    },
    async getData() {
      // 显示加载
      myChart.showLoading({
        text: '加载中',
        color: 'rgb(255, 210, 0)'
      })
      const res = await api.getMapData()
      // console.log(res)
      this.dataJson = res.data.map(v => ({
        ...v,
        name: v.branch,
        value: v.preachAmr
      }))
      series[0].data = this.dataJson
      myChart.setOption({
        series
      })
      myChart.hideLoading()
      setTimeout(() => {}, 500)
    },
    listenInit() {
      document.addEventListener('click', e => {
        if (![].includes.call(e.target.classList, 'btn')) {
          this.tipShow = false
        }
      })
    },
    showTip(name) {
      // 隐藏地图显示
      myChart.dispatchAction({
        type: 'hidTip',
        // 可选，系列 index，可以是一个数组指定多个系列
        seriesIndex: 0
      })
      myChart.dispatchAction({
        type: 'hidTip',
        // 可选，系列 index，可以是一个数组指定多个系列
        seriesIndex: 0,
        name: '北京'
      })
      const tipData = this.dataJson.find(v => v.name === name)
      if (tipData) {
        this.tipData = tipData
        this.tipShow = true
      } else {
        this.tipShow = false
      }
    }
  }
}
