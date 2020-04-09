<template>
  <div>
    <h3>
      公司活动达<span @click="$router.push({ path: '/table-o' })">成率</span>
    </h3>
    <div
      style="margin: 0rem 0.4rem 0; border: 1px solid rgba(204, 204, 204, 0.52);"
    >
      <mu-data-table
        no-data-text="暂无数据"
        stripe
        :columns="columns"
        :data="list"
      >
        <template slot="header">
          <tr>
            <th class="is-center">分公司</th>
            <th class="is-center">品质宣<br />讲人数</th>
            <th class="is-center">品质宣<br />讲人数</th>
            <th class="is-center">品质宣讲<br />达成率</th>
            <th class="is-center">品质宣<br />传人数</th>
            <th class="is-center">品质宣传<br />达成率</th>
          </tr>
        </template>
        <template slot-scope="scope">
          <td class="is-center">{{ scope.row.branch }}</td>
          <td class="is-center">{{ scope.row.vocational }}</td>
          <td class="is-center">{{ scope.row.preach }}</td>
          <td class="is-center">{{ scope.row.preachAmr }}%</td>
          <td class="is-center">{{ scope.row.propaganda }}</td>
          <td class="is-center">{{ scope.row.propAmr }}%</td>
        </template>
      </mu-data-table>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/index'

export default {
  name: 'table-o',
  data() {
    return {
      columns: [
        { title: '分公司', width: 55, name: 'branch' },
        {
          title: '高职级总人数',
          width: 55,
          name: 'vocational'
        },
        {
          title: '品质宣讲人数',
          name: 'preach',
          width: 55,
          align: 'center'
        },
        {
          title: '品质宣讲达成率',
          name: 'preachAmr',
          width: 60,
          align: 'center'
        },
        {
          title: '品质宣传人数',
          name: 'propaganda',
          width: 55,
          align: 'center'
        },
        {
          title: '品质宣传达成率',
          name: 'propAmr',
          width: 60,
          align: 'center'
        }
      ],
      list: [
        // {
        //   branch: '北京',
        //   vocational: 159,
        //   preach: 6.0,
        //   preachAmr: 24,
        //   propaganda: 4.0,
        //   propAmr: 1
        // }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await api.getTableDataO()
      console.log(res)
      this.list = res.data
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  font-size: 0.3rem;
  margin: 0.2rem 0.45rem;
}
</style>
