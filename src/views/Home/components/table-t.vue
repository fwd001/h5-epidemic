<template>
  <div>
    <h3>
      分公司活动积分<span @click="$router.push({ path: '/table-t' })"
        >情况</span
      >
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
            <th class="is-center" style="white-space: normal;">分公司</th>
            <th class="is-center" style="white-space: normal;">品质宣讲得分<br />(48)</th>
            <th class="is-center" style="white-space: normal;">品质宣讲得分<br />(22)</th>
            <th class="is-center" style="white-space: normal;">风采展示得分<br />(15)</th>
            <th class="is-center" style="white-space: normal;">媒体宣传得分<br />(10)</th>
            <th class="is-center" style="white-space: normal;">基础工作得分<br />(5)</th>
            <th class="is-center" style="white-space: normal;">总得分</th>
          </tr>
        </template>
        <template slot-scope="scope">
          <td class="is-center">{{ scope.row.branch }}</td>
          <td class="is-center">{{ scope.row.preach }}</td>
          <td class="is-center">{{ scope.row.propaganda }}</td>
          <td class="is-center">{{ scope.row.style }}</td>
          <td class="is-center">{{ scope.row.media }}</td>
          <td class="is-center">{{ scope.row.baise }}</td>
          <td class="is-center">{{ scope.row.sum }}</td>
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
    const beCounted = window.screen.width / 375
    return {
      columns: [
        { title: '分公司', width: 44 * beCounted, name: 'branch' },
        {
          title: '品质宣讲得分(48)',
          width: 50 * beCounted,
          name: 'preach'
        },
        {
          title: '品质宣传得分(22)',
          width: 50 * beCounted,
          name: 'propaganda',
          align: 'center'
        },
        {
          title: '风采展示得分(15)',
          width: 48 * beCounted,
          name: 'style',
          align: 'center'
        },
        {
          title: '媒体宣传得分(10)',
          width: 46 * beCounted,
          name: 'media',
          align: 'center'
        },
        {
          title: '基础工作得分(5)',
          width: 46 * beCounted,
          name: 'baise',
          align: 'center'
        },
        {
          title: '总得分',
          width: 50 * beCounted,
          name: 'sum',
          align: 'center'
        }
      ],
      list: [
        // {
        //   branch: '北京',
        //   preach: 159,
        //   propaganda: 6.0,
        //   style: 24,
        //   media: 4.0,
        //   baise: 1,
        //   sum: 1
        // }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await api.getTableDataT()
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
