<template>
  <div>
    <mu-button
      @click="$router.push({ path: '/' })"
      color="green"
      style="margin: .2rem 0.4rem 0"
    >
      <mu-icon value="arrow_back" left></mu-icon>
    </mu-button>
    <h3>分公司活动积分情况</h3>
    <mu-row style="margin: 0rem 0.45rem .2rem">
      <mu-col span="12" lg="4" sm="6">
        <mu-button @click="openFullscreen = true" color="primary"
          >新增</mu-button
        >
      </mu-col>
      <mu-col span="12" lg="4" sm="6">
        <mu-date-input
          v-model="date"
          label="选择日期"
          format="YYYY 年 MM 月 DD 日"
          value-format="YYYY-MM-DD"
          label-float
          full-width
          @change="onDateChange"
        ></mu-date-input>
      </mu-col>
    </mu-row>
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
          <td class="is-right">{{ scope.row.preach }}</td>
          <td class="is-right">{{ scope.row.propaganda }}</td>
          <td class="is-right">{{ scope.row.style }}</td>
          <td class="is-right">{{ scope.row.media }}</td>
          <td class="is-right">{{ scope.row.baise }}%</td>
          <td class="is-right">{{ scope.row.sum }}%</td>
          <td class="is-center">
            <mu-container class="button-wrapper">
              <mu-button small flat color="primary" @click="onEdit(scope.row.id)">编辑</mu-button>
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
        <mu-button
          slot="left"
          icon
          @click="
            clear()
            openFullscreen = false
          "
        >
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

          <mu-form-item label="品质宣讲得分(48)" prop="preach">
            <mu-text-field
              type="number"
              :min="0"
              :max="48"
              v-model="validateForm.preach"
              prop="preach"
            ></mu-text-field>
          </mu-form-item>

          <mu-form-item label="品质宣传得分(22)" prop="propaganda">
            <mu-text-field
              type="number"
              :min="0"
              :max="22"
              v-model="validateForm.propaganda"
              prop="propaganda"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item label="风采展示得分(15)" prop="style">
            <mu-text-field
              type="number"
              :min="0"
              :max="15"
              v-model="validateForm.style"
              prop="style"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item label="媒体宣传得分(10)" prop="media">
            <mu-text-field
              type="number"
              :min="0"
              :max="10"
              v-model="validateForm.media"
              prop="media"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item label="基础工作得分(5)" prop="baise">
            <mu-text-field
              type="number"
              :min="0"
              :max="5"
              v-model="validateForm.baise"
              prop="baise"
            ></mu-text-field>
          </mu-form-item>
        </mu-form>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'table-o',
  data() {
    const date = dayjs().format('YYYY-MM-DD')
    return {
      date,
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
          id: 1,
          branch: '北京',
          preach: 159,
          propaganda: 6.0,
          style: 24,
          media: 4.0,
          baise: 1,
          sum: 1
        },
        {
          id: 2,
          branch: '北京',
          preach: 237,
          propaganda: 9.0,
          style: 37,
          media: 4.3,
          sum: 1
        }
      ],
      openFullscreen: false,
      rules: [{ validate: val => !!val, message: '必须填写' }],
      validateForm: {
        branch: '', // 分公司
        preach: '', // 品质宣讲得分(48)
        propaganda: '', // 品质宣传得分(22)
        style: '', // 风采展示得分(15)
        media: '', // 媒体宣传得分(10)
        baise: '' // 基础工作得分(5)
      },
      loading: false
    }
  },
  created() {
    // 获取数据
    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      const params = {
        date: this.date
      }
      console.log({ params })
    },
    onEdit() {
      console.log('编辑')
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
        preach: '', // 品质宣讲得分(48)
        propaganda: '', // 品质宣传得分(22)
        style: '', // 风采展示得分(15)
        media: '', // 媒体宣传得分(10)
        baise: '' // 基础工作得分(5)
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
