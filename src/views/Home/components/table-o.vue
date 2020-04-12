<template>
  <div>
    <h3>
      <!-- 公司活动达<span @click="$router.push({ path: '/table-o' })">成率</span> -->
      公司活动达成率
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
            <th class="is-center" style="white-space: normal;">高职级总人数</th>
            <th class="is-center" style="white-space: normal;">品质宣讲人数</th>
            <th class="is-center" style="white-space: normal;">品质宣讲达成率</th>
            <th class="is-center" style="white-space: normal;">品质宣传人数</th>
            <th class="is-center" style="white-space: normal;">品质宣传达成率</th>
          </tr>
        </template>
        <template slot-scope="scope">
          <td class="is-center">{{ scope.row.branch }}</td>
          <td class="is-center">{{ scope.row.vocational }}</td>
          <td class="is-center">{{ scope.row.preach }}</td>
          <td class="is-center">{{ (scope.row.preachAmr * 100).toFixed(2) }}%</td>
          <td class="is-center">{{ scope.row.propaganda }}</td>
          <td class="is-center">{{ (scope.row.propAmr*100).toFixed(2) }}%</td>
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
        { title: '分公司', width: 50 * beCounted, name: 'branch' },
        {
          title: '高职级总人数',
          width: 57 * beCounted,
          name: 'vocational'
        },
        {
          title: '品质宣讲人数',
          name: 'preach',
          width: 57 * beCounted,
          align: 'center'
        },
        {
          title: '品质宣讲达成率',
          name: 'preachAmr',
          width: 57 * beCounted,
          align: 'center'
        },
        {
          title: '品质宣传人数',
          name: 'propaganda',
          width: 57 * beCounted,
          align: 'center'
        },
        {
          title: '品质宣传达成率',
          name: 'propAmr',
          width: 57 * beCounted,
          align: 'center'
        }
      ],
      list: []
    }
  },
  created() {
    this.getData()
  },
  computed: {},
  methods: {
    async getData() {
      const res = await api.getTableDataO()
      this.list = res.data
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  font-size: 0.32rem;
  height: .7rem;
  line-height: .7rem;
  background: #ce3846;
  text-align: center;
  color: #fff;
  border-radius: .3rem .3rem 0 0;
  margin: 0.2rem 0.4rem 0;
}
</style>
