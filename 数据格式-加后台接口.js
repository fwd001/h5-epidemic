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

// 接口说明：
// http://47.101.174.148/statis/total/findall
// method:GET
// 出参：
// ret:0 表示成功；非0表示失败
// {
// 	"ret": 0,
// 	"msg": "SUCCESS",
// 	"data": {
// 		"id": 2,
// 		"preachSum": 50111,
// 		"preachT3": "宁波,sh,bj",
// 		"preachAmrT3": "北京,宁波,上海",
// 		"propagandaSum": 10001,
// 		"propagandaT3": "天津,北京,上海",
// 		"propAmrT3": "天津,北京,上海",
// 		"createdTime": "2020-04-08 12:47:40",
// 		"lastUpdatedTime": "2020-04-08 12:47:40",
// 		"lastWeekpreach": 100,
// 		"lastWeekpreachAmr": "10%",
// 		"lastWeekPropaganda": 20,
// 		"lastWeekpropAmr": "16%"
// 	}
// }

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

// 接口说明：
// http://47.101.174.148/statis/metadata/findall
// method:GET
// 出参：
// ret:0 表示成功；非0表示失败
// {
// 	"ret": 0,
// 	"msg": "SUCCESS",
// 	"data": [{
// 		"id": 6,
// 		"branch": "上海",
// 		"vocational": 1002,
// 		"propaganda": 50,
// 		"propAmr": 10.0,
// 		"preach": 502,
// 		"preachAmr": 25.0,
// 		"createdTime": "2020-04-09 14:24:28",
// 		"lastUpdatedTime": "2020-04-09 14:53:26"
// 	},
// 	{
// 		"id": 7,
// 		"branch": "北京",
// 		"vocational": 1002,
// 		"propaganda": 50,
// 		"propAmr": 10.0,
// 		"preach": 502,
// 		"preachAmr": 25.0,
// 		"createdTime": "2020-04-09 14:24:28",
// 		"lastUpdatedTime": "2020-04-09 14:53:26"
// 	}
// 	]
// }

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

// 接口说明：
// http://47.101.174.148/statis/history/findall
// method:GET
// 出参：
// ret:0 表示成功；非0表示失败
// {
// 	"ret": 0,
// 	"msg": "SUCCESS",
// 	"data": {
// 		"xAxis": ["2020-04-10", "2020-04-03"],
// 		"data": [{
// 			"data": [552, 51],
// 			"name": "品质宣讲"
// 		}, {
// 			"data": [100, 51],
// 			"name": "品质宣传"
// 		}]
// 	}
// }

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

// 接口说明：
// http://47.101.174.148/statis/metadata/findall
// method:GET
// 出参：
// ret:0 表示成功；非0表示失败
// {
// 	"ret": 0,
// 	"msg": "SUCCESS",
// 	"data": [{
// 		"id": 6,
// 		"branch": "上海",
// 		"vocational": 1002,
// 		"propaganda": 50,
// 		"propAmr": 10.0,
// 		"preach": 502,
// 		"preachAmr": 25.0,
// 		"createdTime": "2020-04-09 14:24:28",
// 		"lastUpdatedTime": "2020-04-09 14:53:26"
// 	},
// 	{
// 		"id": 7,
// 		"branch": "北京",
// 		"vocational": 1002,
// 		"propaganda": 50,
// 		"propAmr": 10.0,
// 		"preach": 502,
// 		"preachAmr": 25.0,
// 		"createdTime": "2020-04-09 14:24:28",
// 		"lastUpdatedTime": "2020-04-09 14:53:26"
// 	}
// 	]
// }

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

// 接口说明：
// http://47.101.174.148/statis/score/findall
// method:GET
// 出参：
// ret:0 表示成功；非0表示失败
// {
// 	"ret": 0,
// 	"msg": "SUCCESS",
// 	"data": [{
// 		"id": 7,
// 		"branch": "北京",
// 		"preach": 101,
// 		"propaganda": 301,
// 		"style": 210,
// 		"media": 15,
// 		"baise": 20,
// 		"sum": 95,
// 		"createdTime": "2020-04-09 14:33:56",
// 		"lastUpdatedTime": "2020-04-09 14:48:34"
// 	}, {
// 		"id": 8,
// 		"branch": "深圳",
// 		"preach": 101,
// 		"propaganda": 301,
// 		"style": 210,
// 		"media": 15,
// 		"baise": 20,
// 		"sum": 95,
// 		"createdTime": "2020-04-09 14:47:12",
// 		"lastUpdatedTime": "2020-04-09 14:48:16"
// 	}]
// }

// 新增接口
// 1.全国总数据录入：
// http://47.101.174.148/statis/total/saveorupdate
// method:post
// Content type:application/json;charset=UTF-8
// 入参：
// {
// 	"LastWeekpreach": 100,  // 上周宣讲增加数量
// 	"preachSum": 50111, // 本周宣讲数量
// 	"LastWeekpreachAmr": "10%",	   // 宣讲达成率
// 	"preachAmrSum": 600000,	   // 累计宣讲数量
// 	"preachT3": "宁波,sh,bj",  // 宣讲人数top3
// 	"preachAmrT3": "北京,宁波,上海", // 宣讲达成率top3
// 	"LastWeekPropaganda": 20,  // 上周宣传增加数量
// 	"propagandaSum": 10001, // 本周宣传数量
// 	"LastWeekpropAmr": "16%",  // 宣传达成率
// 	"propAmrSum": 600000,	   // 累计宣传数量
// 	"propagandaT3": "天津,北京,上海", // 宣传人数top3
// 	"propAmrT3": "天津,北京,上海" // 宣传达成率top3
// }
// 出参：
// 成功：
// {
// 	"ret":0,
// 	"msg":"success",
// 	"data":{}
// }
// 失败：
// {
// 	"ret":-1,
// 	"msg":"错误提示",
// 	"data":{}
// }

// 2.各省份宣讲，宣传数据录入（新增，修改同一个接口，新增时不传id）
// http://47.101.174.148/statis/metadata/saveorupdate
// method:post
// Content type:application/json;charset=UTF-8
// 入参：
// {
// 	"id":1,
// 	"branch": "上海",
// 	"vocational": 1001,
// 	"preach": 501,
// 	"preachAmr": 25,
// 	"propaganda": 50,
// 	"propAmr": 10
// }
// 出参：
// 成功：
// {
// 	"ret":0,
// 	"msg":"success",
// 	"data":{}
// }
// 失败：
// {
// 	"ret":-1,
// 	"msg":"错误提示",
// 	"data":{}
// }

// 3.各省份积分录入（新增，修改同一个接口，新增时不传id）：
// http://47.101.174.148/statis/score/saveorupdate
// method:post
// Content type:application/json;charset=UTF-8
// 入参：
// {
// 	"id":1,
// 	"branch": "天津",
// 	"preach": 101,
// 	"propaganda": 301,
// 	"style": 210,
// 	"media": 15,
// 	"baise": 20,
// 	"sum": 95
// }
// 出参：
// 成功：
// {
// 	"ret":0,
// 	"msg":"success",
// 	"data":{}
// }
// 失败：
// {
// 	"ret":-1,
// 	"msg":"错误提示",
// 	"data":{}
// }
