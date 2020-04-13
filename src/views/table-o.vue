<template>
  <div>
    <mu-container class="button-wrapper" style="padding-top: 20px">
      <mu-button color="primary" @click="$router.push({ path: '/' })" flat
        >首页</mu-button
      >
      <mu-button
        color="primary"
        @click="$router.push({ path: '/dynamic-add' })"
        flat
        >全国动态</mu-button
      >
      <mu-button
        color="primary"
        @click="$router.push({ path: '/table-t' })"
        flat
        >积分</mu-button
      >
    </mu-container>

    <h3>分公司活动达成率</h3>
    <mu-row style="margin: 0rem 0.45rem .2rem">
      <mu-col span="12" lg="4" sm="6">
        <mu-button @click="openFullscreen = true" color="#cb3044"
          >新增</mu-button
        >
      </mu-col>
      <!-- <mu-col span="12" lg="4" sm="6">
        <mu-date-input
          v-model="date"
          label="选择日期"
          format="YYYY 年 MM 月 DD 日"
          value-format="YYYY-MM-DD"
          label-float
          full-width
          @change="onDateChange"
        ></mu-date-input>
      </mu-col> -->
    </mu-row>
    <div
      style="margin: 0rem 0.4rem .4rem; border: 1px solid rgba(204, 204, 204, 0.52);"
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
            <th class="is-center" style="white-space: normal;">高职级总人数</th>
            <th class="is-center" style="white-space: normal;">品质宣讲人数</th>
            <th class="is-center" style="white-space: normal;">
              品质宣讲达成率
            </th>
            <th class="is-center" style="white-space: normal;">品质宣传人数</th>
            <th class="is-center" style="white-space: normal;">
              品质宣传达成率
            </th>
             <th class="is-center" style="white-space: normal;">
              编辑
            </th>
          </tr>
        </template>
        <template slot-scope="scope">
          <td class="is-center">{{ scope.row.branch }}</td>
          <td class="is-center">{{ scope.row.vocational }}</td>
          <td class="is-center">{{ scope.row.preach }}</td>
          <td class="is-center">
            {{ (scope.row.preachAmr * 100).toFixed(2) }}%
          </td>
          <td class="is-center">{{ scope.row.propaganda }}</td>
          <td class="is-center">{{ (scope.row.propAmr * 100).toFixed(2) }}%</td>
          <td class="is-center">
            <mu-container class="button-wrapper">
              <a href="javascript:;" @click="onEdit(scope.row)">编辑</a>
              <!-- <mu-button small flat color="secondary" @click="onDelete"
                >删除</mu-button
              > -->
            </mu-container>
          </td>
        </template>
      </mu-data-table>
    </div>

    <mu-dialog
      title="新增数据"
      width="600"
      max-width="80%"
      scrollable
      data-mu-loading-overlay-color="rgba(0, 0, 0, .7)"
      v-loading="loading"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openFullscreen"
    >
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="分公司" prop="branch" :rules="rules">
          <mu-text-field
            v-model="validateForm.branch"
            prop="branch"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="高职级总人数" prop="vocational">
          <mu-text-field
            type="number"
            v-model="validateForm.vocational"
            prop="vocational"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="品质宣讲人数" prop="preach">
          <mu-text-field
            type="number"
            @blur="onBlur('vocational', 'preach', 'preachAmr')"
            v-model="validateForm.preach"
            prop="preach"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          help-text=""
          label="品质宣讲达成率（自动计算 {$0}%）"
          prop="preachAmr"
        >
          <mu-text-field
            v-model="validateForm.preachAmr"
            prop="preachAmr"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="品质宣传人数" prop="propaganda">
          <mu-text-field
            type="number"
            @blur="onBlur('vocational', 'propaganda', 'propAmr')"
            v-model="validateForm.propaganda"
            prop="propaganda"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="品质宣传达成率（自动计算 {$0}%）" prop="propAmr">
          <mu-text-field
            v-model="validateForm.propAmr"
            prop="propAmr"
          ></mu-text-field>
        </mu-form-item>
      </mu-form>
      <mu-button
        slot="actions"
        flat
        color="#cb3044"
        @click="
          clear()
          openFullscreen = false
        "
        >关闭</mu-button
      >
      <mu-button slot="actions" flat color="#cb3044" @click="submit"
        >保存</mu-button
      >
    </mu-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import * as api from '@/api/index'

export default {
  name: 'table-o',
  data() {
    const date = dayjs().format('YYYY-MM-DD')
    const beCounted = window.screen.width / 375
    return {
      date,
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
        },
        {
          title: '编辑',
          name: 'option',
          width: 57 * beCounted,
          align: 'center'
        }
      ],
      list: [],
      openFullscreen: false,
      rules: [{ validate: val => !!val, message: '必须填写' }],
      validateForm: {
        branch: '', // 分公司
        vocational: '', // 高职级总人数
        preach: '', // 品质宣讲人数
        preachAmr: '', // 品质宣讲达成率
        propaganda: '', // 品质宣传人数
        propAmr: '' // 品质宣传达成率
      },
      loading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData() {
      const res = await api.getTableDataO()
      this.list = res.data
    },
    // 编辑
    onEdit(row) {
      console.log('编辑', row)
      for (const k in this.validateForm) {
        this.validateForm[k] = row[k]
      }
      this.openFullscreen = true
    },
    onDelete() {
      this.$confirm('确定要删除？', '提示', {
        type: 'warning'
      }).then(({ result }) => {
        if (result) {
          console.log('点击了确定')
        } else {
          console.log('点击了取消')
        }
      })
    },
    submit() {
      this.$refs.form.validate().then(async result => {
        if (result) {
          this.loading = true
          console.log('form: ', this.validateForm)
          try {
            await api.addTableDataO(this.validateForm)
            // console.log(res)
            this.getData()
            this.clear()
            this.loading = false
            this.openFullscreen = false
          } catch (error) {
            this.loading = false
            console.log(error, this.$toast)
            this.$toast.error('保存失败')
          }
        }
      })
    },
    clear() {
      this.$refs.form.clear()
      this.validateForm = {
        branch: '', // 分公司
        vocational: '', // 高职级总人数
        preach: '', // 品质宣讲人数
        preachAmr: '', // 品质宣讲达成率
        propaganda: '', // 品质宣传人数
        propAmr: '' // 品质宣传达成率
      }
    },
    onBlur(a, b, c) {
      if (this.validateForm[a] && this.validateForm[b]) {
        this.validateForm[c] = (
          this.validateForm[b] / this.validateForm[a]
        ).toFixed(4)
      }
    },
    onDateChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  font-size: 0.32rem;
  margin: 0.2rem 0.45rem;
}
.button-wrapper {
  text-align: center;
  .mu-button {
    margin-left: 4px;
  }
}
</style>
