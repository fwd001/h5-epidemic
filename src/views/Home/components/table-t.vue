<template>
  <div>
    <h3>分公司活动积分情况</h3>
    <div style="margin: 0rem 0.4rem 0; border: 1px solid rgba(204, 204, 204, 0.52);">
        <mu-data-table
          no-data-text="暂无数据"
          stripe
          :columns="columns"
          :data="list"
        >
          <template slot-scope="scope">
            <td>{{ scope.row.branch }}</td>
            <td class="is-right">{{ scope.row.preach }}</td>
            <td class="is-right">{{ scope.row.propaganda }}</td>
            <td class="is-right">{{ scope.row.style }}</td>
            <td class="is-right">{{ scope.row.media }}</td>
            <td class="is-right">{{ scope.row.baise }}%</td>
            <td class="is-right">{{ scope.row.sum }}%</td>
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
          title: '品质宣讲得分(48)',
          name: 'preach'
        },
        {
          title: '品质宣传得分(22)',
          name: 'propaganda',
          align: 'center'
        },
        {
          title: '风采展示得分(15)',
          name: 'style',
          align: 'center'
        },
        {
          title: '媒体宣传得分(10)',
          name: 'media',
          align: 'center'
        },
        {
          title: '基础工作得分(5)',
          name: 'baise',
          align: 'center'
        },
        {
          title: '总得分',
          width: 86,
          name: 'sum',
          align: 'center'
        }
      ],
      list: [
        {
          branch: '北京',
          preach: 159,
          propaganda: 6.0,
          style: 24,
          media: 4.0,
          baise: 1,
          sum: 1
        },
        {
          branch: '北京',
          preach: 237,
          propaganda: 9.0,
          style: 37,
          media: 4.3,
          sum: 1
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
