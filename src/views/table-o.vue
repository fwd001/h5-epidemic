<template>
  <div>
    <h3>公司活动达成率</h3>

    <mu-button
      @click="openFullscreen = true"
      color="primary"
      style="margin: 0rem 0.45rem .2rem"
      >新增</mu-button
    >
    <div
      style="margin: 0rem 0.4rem 0; border: 1px solid rgba(204, 204, 204, 0.52);"
    >
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
          <td class="is-center">
            <mu-container class="button-wrapper">
              <mu-button small flat color="primary">编辑</mu-button>
              <mu-button small flat color="secondary" @click="onDelete"
                >删除</mu-button
              >
            </mu-container>
          </td>
        </template>
      </mu-data-table>
    </div>

    <mu-dialog
      width="360"
      transition="slide-bottom"
      fullscreen
      data-mu-loading-overlay-color="rgba(0, 0, 0, .7)"
      v-loading="loading"
      :open.sync="openFullscreen"
    >
      <mu-appbar color="primary" title="新增数据">
        <mu-button slot="left" icon @click="clear(); openFullscreen = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="submit">
          保存
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
          <mu-form-item label="分公司" prop="branch">
            <mu-text-field
              v-model="validateForm.branch"
              prop="branch"
            ></mu-text-field>
          </mu-form-item>

          <mu-form-item label="高职级总人数" prop="vocational">
            <mu-text-field
              v-model="validateForm.vocational"
              prop="vocational"
            ></mu-text-field>
          </mu-form-item>

          <mu-form-item label="品质宣讲人数" prop="preach">
            <mu-text-field
              v-model="validateForm.preach"
              prop="preach"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item label="品质宣讲达成率" prop="preachAmr">
            <mu-text-field
              v-model="validateForm.preachAmr"
              prop="preachAmr"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item label="品质宣传人数" prop="propaganda">
            <mu-text-field
              v-model="validateForm.propaganda"
              prop="propaganda"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item label="品质宣传达成率" prop="propAmr">
            <mu-text-field
              v-model="validateForm.propAmr"
              prop="propAmr"
            ></mu-text-field>
          </mu-form-item>
        </mu-form>
      </div>
    </mu-dialog>
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
        },
        {
          title: '操作',
          name: 'option',
          width: 280,
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
      ],
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
  methods: {
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
      this.$refs.form.validate().then(result => {
        if (result) {
          this.loading = true
          console.log('form: ', this.validateForm)
          setTimeout(() => {
            this.clear()
            this.loading = false

            this.openFullscreen = false
          }, 500)
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
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  font-size: 0.35rem;
  margin: 0.2rem 0.45rem;
}
.button-wrapper {
  text-align: center;
  .mu-button {
    margin-left: 4px;
  }
}
</style>
