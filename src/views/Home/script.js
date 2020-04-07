import 'echarts/map/js/china'
// import * as api from '../../api/index'
import dataJson from './data'

let myChart = null

const tooltip = {
  triggerOn: 'click',
  formatter: function(e, t, n) {
    console.log(e)
    return `${e.name}
      <p> 宣讲人数:${e.value || 0} </p>
      <p> 达成率:${e.value || 0} </p>
      <p> 宣传人数:${e.value || 0} </p>
      <p> 达成率:${e.value || 0} </p>`
  }
}
const visualMap = {
  min: 0,
  max: 1000000,
  left: 2,
  bottom: 10,
  showLabel: !0,
  pieces: [
    {
      gt: 1000,
      label: '> 1000 人',
      color: '#b3261f'
    },
    {
      gte: 500,
      lte: 999,
      label: '500 - 999 人',
      color: '#d65328'
    },
    {
      gte: 100,
      lt: 499,
      label: '100 - 499 人',
      color: '#eb9637'
    },
    {
      gt: 10,
      lt: 99,
      label: '确诊10-99人',
      color: '#f0c644'
    },
    {
      gt: 0,
      lt: 9,
      label: '确诊1-9人',
      color: '#f8e850'
    }
  ],
  show: false
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
  components: {},
  data() {
    return {
      explanation: false
    }
  },
  created() {
    console.log(dataJson)
  },
  mounted() {
    this.mapInit()
  },
  methods: {
    mapInit() {
      // 初始化echarts实例
      myChart = this.$echarts.init(document.getElementById('myEcharts'))
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
          zoom: 1.22,
          top: 100,
          label: {
            normal: {
              show: !0,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#ffffff',
              shadowBlur: 5,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: '#e1c2c1'
            },
            emphasis: {
              areaColor: 'gold',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
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
    getData() {
      series[0].data = dataJson
      myChart.setOption({
        series
      })
      setTimeout(() => {
        myChart.dispatchAction({
          type: 'showTip',
          // 可选，系列 index，可以是一个数组指定多个系列
          seriesIndex: 0,
          // 可选，系列名称，可以是一个数组指定多个系列
          // seriesName: string|Array,
          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
          // dataIndex: number,
          // 可选，数据名称，在有 dataIndex 的时候忽略
          name: '北京'
        })
      }, 1000)
      // api.getData().then(data => {
      //   var res = data.data || ''
      //   res = JSON.parse(res)
      //   console.log(res)
      //   var newArr = []
      //   if (res) {
      //     // 获取到各个省份的数据
      //     var province = res.areaTree[0].children
      //     for (var i = 0; i < province.length; i++) {
      //       var json = {
      //         name: province[i].name,
      //         value: province[i].total.confirm
      //       }
      //       newArr.push(json)
      //     }
      //     console.log(newArr)
      //     console.log(JSON.stringify(newArr))
      //     // 使用指定的配置项和数据显示图表
      //     series[0].data = newArr
      //     myChart.setOption({
      //       series
      //     })
      //   }
      // })
    }
  }
}
