// 全国动态
const dynamic = {
  preachSum: 15285, // 本周品质宣讲
  LastWeekpreach: -36, // 上周品质宣讲
  propagandaSum: 2281, // 本周品质宣传
  LastWeekPropaganda: -36, // 上周品质宣传
  preachAmrSum: 2281, // 本周品质宣讲达成率
  LastWeekpreachAmr: 0.26, // 上周品质宣讲达成率
  propAmrSum: 2281, // 本周品质宣传达成率
  LastWeekpropAmr: 0.26, // 上周品质宣传达成率
  preachT3: '北京、上海、乌鲁木齐', // 品质宣讲人数TOP3
  propagandaT3: '北京、上海、宁波', // 品质宣传人数TOP3
  preachAmrT3: '北京、上海、宁波', // 品质宣讲达成率TOP3
  propAmrT3: '北京、上海、宁波' // 品质宣传达成率TOP3
}
// 地图数据
const mapData = [
  {
    id: 1,
    name: '香港',
    value: 0.45,
    preach: 45, // 品质宣讲人数
    preachAmr: 0.45, // 品质宣讲达成率
    propaganda: 55, // 品质宣传人数
    propAmr: 0.55 // 品质宣传达成率
  },
  {
    id: 3,
    name: '湖北',
    value: 1,
    preach: 100, // 品质宣讲人数
    preachAmr: 1, // 品质宣讲达成率
    propaganda: 0, // 品质宣传人数
    propAmr: 0 // 品质宣传达成率
  }
]

// 折线数据
const lineData = {
  xAxis: ['4.3', '4.10', '4.17', '4.24', '5.1', '5.8', '5.15', '5.22', '5.29'],
  data: [
    {
      name: '品质宣讲',
      data: [820, 932, 901, 934, 1290, 1330, 1320, 231, 434]
    },
    {
      name: '品质宣传',
      data: [1820, 1932, 1901, 1934, 11290, 11330, 11320, 321, 123]
    }
  ]
}

/**
 * 表1 表单数据字段相同，部分字段是计算获得
 * 时间纬度 周5
 * 数据表单提交 后端获取提交时间 以每周5为分割 记录为同一数据范围
*/
const table1 = [
  {
    id: 0,
    branch: '北京', // 分公司
    vocational: 100, // 高职级总人数
    preach: 10, // 品质宣讲人数
    preachAmr: 0.1, // 品质宣讲达成率 =preach/vocational
    propaganda: 90, // 品质宣传人数
    propAmr: 0.9 // 品质宣传达成率 =propaganda/vocational
  },
  {
    id: 1,
    branch: '湖北',
    vocational: 100, // 高职级总人数
    preach: 20, // 品质宣讲人数
    preachAmr: 0.2, // 品质宣讲达成率
    propaganda: 80, // 品质宣传人数
    propAmr: 0.8 // 品质宣传达成率
  }
]

/**
 * 表2 表单数据字段相同，部分字段是计算获得
 * 数据表单提交 后端获取提交时间
 * 此表不确定有没有时间纬度
*/
const table2 = [
  {
    id: 1,
    branch: '北京', // 分公司
    preach: 10, // 品质宣讲得分(48)
    propaganda: 10, // 品质宣传得分(22)
    style: 10, // 风采展示得分(15)
    media: 10, // 媒体宣传得分(10)
    baise: 5, // 基础工作得分(5)
    sum: 45 // 总分 =preach+propaganda+style+media+baise
  },
  {
    id: 2,
    branch: '湖北',
    preach: 10, // 品质宣讲得分(48)
    propaganda: 10, // 品质宣传得分(22)
    style: 10, // 风采展示得分(15)
    media: 10, // 媒体宣传得分(10)
    baise: 5, // 基础工作得分(5)
    sum: 45 // 总分 =preach+propaganda+style+media+baise
  }
]
