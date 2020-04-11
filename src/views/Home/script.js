import echarts from '@/utils/echarts'

import * as api from '../../api/index'
// import dataJson from './mapdata'
import TableO from './components/table-o'
import TableT from './components/table-t'
import lineChart from './components/lineChart'
import dayjs from 'dayjs'

const COLOR = [
  {
    gte: 1,
    color: 'rgb(255, 210, 0)'
  },
  {
    gte: 0.7,
    lte: 1,
    color: 'rgb(215, 33, 57)'
  },
  {
    gte: 0.5,
    lte: 0.7,
    color: 'rgb(255, 24, 68)'
  },
  {
    gte: 0.3,
    lte: 0.5,
    color: 'rgb(254, 81, 119)'
  },
  {
    gte: 0.1,
    lte: 0.3,
    color: '#ef8094'
  },
  {
    gte: 0.0,
    lte: 0.1,
    color: '#f7cdd0'
  }
]
console.log(COLOR)

let myChart = null
const beCounted = window.screen.width / 375
const tooltip = {
  triggerOn: 'click',
  formatter: function(e, t, n) {
    if (e.data) {
      return `${e.name}<ul>
        <li> 宣讲人数：${e.data.preach || 0}</li>
        <li> 达成率：${(e.data.preachAmr * 100).toFixed(2) || 0}%</li>
        <li> 宣传人数：${e.data.propaganda || 0}</li>
        <li> 达成率：${(e.data.propAmr * 100).toFixed(2) || 0}%</li></ul>`
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
      gte: 1,
      label: '100%',
      color: 'rgb(255, 210, 0)'
    },
    {
      gte: 0.7,
      lt: 1,
      label: '70%-99%',
      color: 'rgb(215, 33, 57)'
    },
    {
      gte: 0.5,
      lt: 0.7,
      label: '50%-69%',
      color: 'rgb(255, 24, 68)'
    },
    {
      gte: 0.3,
      lt: 0.5,
      label: '30%-49%',
      color: 'rgb(254, 81, 119)'
    },
    {
      gte: 0.1,
      lt: 0.3,
      label: '10%-29%',
      color: '#ef8094'
    },
    {
      gt: 0.0,
      lt: 0.1,
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
      color: {
        ningbo: '#fff',
        shenzheng: '#fff',
        qingdao: '#fff',
        dalian: '#fff',
        fuoshan: '#fff',
        suzhou: '#fff'
      },
      // 全国动态
      dynamic: {
        preachSum: '-', // 本周品质宣讲
        lastWeekpreach: '-', // 上周品质宣讲
        propagandaSum: '-', // 本周品质宣传
        lastWeekPropaganda: '-', // 上周品质宣传
        preachAmrSum: '-', // 累计品质宣讲
        lastWeekpreachAmr: '-', // 达成率
        propAmrSum: '-', // 累计品质宣传
        lastWeekpropAmr: '-', // 达成率
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
      date,
      // 点击记录城市
      btnIndex: ''
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
      this.setColor(this.dataJson)
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
      this.setColor(this.dataJson)
      series[0].data = this.dataJson
      myChart.setOption({
        series
      })
      myChart.hideLoading()
    },
    setColor(dataJson) {
      for (const k in this.color) {
        let item = {}
        if (k === 'ningbo') {
          item = dataJson.find(v => v.name === '宁波')
          this.color[k] = this.getColor(item.value)
        } else if (k === 'shenzheng') {
          item = dataJson.find(v => v.name === '深圳')
          this.color[k] = this.getColor(item.value)
        } else if (k === 'qingdao') {
          item = dataJson.find(v => v.name === '青岛')
          this.color[k] = this.getColor(item.value)
        } else if (k === 'dalian') {
          item = dataJson.find(v => v.name === '大连')
          this.color[k] = this.getColor(item.value)
        } else if (k === 'fuoshan') {
          item = dataJson.find(v => v.name === '佛山')
          this.color[k] = this.getColor(item.value)
        } else if (k === 'suzhou') {
          item = dataJson.find(v => v.name === '苏州')
          this.color[k] = this.getColor(item.value)
        }
      }
    },
    getColor(val) {
      let color = '#fff'
      if (val === 0) {
        return color
      }
      if (val >= 1) {
        return COLOR[0].color
      }
      COLOR.forEach(v => {
        if (v.gte && v.lte && val >= v.gte && val < v.lte) {
          color = v.color
        }
      })
      return color
    },
    listenInit() {
      document.addEventListener('click', e => {
        if (![].includes.call(e.target.classList, 'btn')) {
          this.tipShow = false
          this.btnIndex = ''
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
      this.btnIndex = name
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
