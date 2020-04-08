<template>
  <div>
    <h3 >公司活动达<span @click="$router.push({path: '/table-o'})">成率</span></h3>
    <div style="margin: 0rem 0.4rem 0; border: 1px solid rgba(204, 204, 204, 0.52);">
      <mu-data-table
        no-data-text="暂无数据"
        stripe
        :columns="columns"
        :data="list"
      >
        <template slot-scope="scope">
          <td>{{ scope.row.branch }}</td>
          <td class="is-right">{{ scope.row.vocational }}</td>
          <td class="is-right">{{ scope.row.preach }}</td>
          <td class="is-right">{{ scope.row.preachAmr }}</td>
          <td class="is-right">{{ scope.row.propaganda }}</td>
          <td class="is-center">{{ scope.row.propAmr }}%</td>
        </template>
      </mu-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-o',
  data() {
    return {
      columns: [
        { title: '分公司', width: 90, name: 'branch' },
        {
          title: '高职级总人数',
          width: 115,
          name: 'vocational'
        },
        {
          title: '品质宣讲人数',
          name: 'preach',
          width: 115,
          align: 'center'
        },
        {
          title: '品质宣讲达成率',
          name: 'preachAmr',
          width: 130,
          align: 'center'
        },
        {
          title: '品质宣传人数',
          name: 'propaganda',
          width: 120,
          align: 'center'
        },
        {
          title: '品质宣传达成率',
          name: 'propAmr',
          align: 'center'
        }
      ],
      list: [
        {
          branch: '北京',
          vocational: 159,
          preach: 6.0,
          preachAmr: 24,
          propaganda: 4.0,
          propAmr: 1
        },
        {
          branch: '北京',
          vocational: 237,
          preach: 9.0,
          preachAmr: 37,
          propaganda: 4.3,
          propAmr: 1
        },
        {
          branch: '北京',
          vocational: 262,
          preach: 16.0,
          preachAmr: 23,
          propaganda: 6.0,
          propAmr: 7
        },
        {
          branch: '北京',
          vocational: 305,
          preach: 3.7,
          preachAmr: 67,
          propaganda: 4.3,
          propAmr: 8
        },
        {
          branch: '北京',
          vocational: 356,
          preach: 16.0,
          preachAmr: 49,
          propaganda: 3.9,
          propAmr: 16
        },
        {
          branch: '北京',
          vocational: 375,
          preach: 0.0,
          preachAmr: 94,
          propaganda: 0.0,
          propAmr: 0
        },
        {
          branch: '北京',
          vocational: 392,
          preach: 0.2,
          preachAmr: 98,
          propaganda: 0,
          propAmr: 2
        },
        {
          branch: '北京',
          vocational: 408,
          preach: 3.2,
          preachAmr: 87,
          propaganda: 6.5,
          propAmr: 45
        },
        {
          branch: '北京',
          vocational: 452,
          preach: 25.0,
          preachAmr: 51,
          propaganda: 4.9,
          propAmr: 22
        },
        {
          branch: '北京',
          vocational: 518,
          preach: 26.0,
          preachAmr: 65,
          propaganda: 7,
          propAmr: 6
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
h3 {
  font-size: 0.35rem;
  margin: 0.2rem 0.45rem;
}
</style>
