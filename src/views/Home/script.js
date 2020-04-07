import 'echarts/map/js/china'
import * as api from '../../api/index'

let myChart = null

export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.mapInit()
  },
  methods: {
    mapInit() {
      // 初始化echarts实例
      myChart = this.$echarts.init(document.getElementById('myEcharts'))
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['中国疫情图']
        },
        // visualMap: {
        //   type: 'piecewise',
        //   pieces: [
        //     {
        //       min: 1000,
        //       max: 1000000,
        //       label: '大于等于1000人'
        //     },
        //     { min: 500, max: 999, label: '确诊500-999人' },
        //     { min: 100, max: 499, label: '确诊100-499人' },
        //     { min: 10, max: 99, label: '确诊10-99人' },
        //     { min: 1, max: 9, label: '确诊1-9人' }
        //   ],
        //   realtime: false,
        //   calculable: true,
        //   color: ['lightskyblue', 'yellow', 'orangered']
        // },
        visualMap: {
          min: 800,
          max: 50000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        roamController: {
          show: true,
          left: 'right',
          mapTypeControl: {
            china: true
          }
        },
        series: [
          {
            name: '确诊数',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
              show: true,
              color: 'rgb(249, 249, 249)'
            },
            data: []
          }
        ]
      }

      // 使用指定的配置项和数据显示图表
      myChart.setOption(option)
      this.getData()
    },
    getData() {
      api.getData().then(data => {
        var res = data.data || ''
        res = JSON.parse(res)
        var newArr = []
        if (res) {
          // 获取到各个省份的数据
          var province = res.areaTree[0].children
          for (var i = 0; i < province.length; i++) {
            var json = {
              name: province[i].name,
              value: province[i].total.confirm
            }
            newArr.push(json)
          }
          console.log(newArr)
          console.log(JSON.stringify(newArr))
          // 使用指定的配置项和数据显示图表
          myChart.setOption({
            series: [
              {
                name: '确诊数',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                  show: true,
                  color: 'rgb(249, 249, 249)'
                },
                data: newArr
              }
            ]
          })
        }
      })
    }
  }
}
