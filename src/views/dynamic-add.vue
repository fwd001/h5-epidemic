<template>
  <div>
    <mu-container style="padding-top: 20px" class="button-wrapper">
      <mu-button color="primary" @click="$router.push({ path: '/' })" flat
        >首页</mu-button
      >
      <mu-button
        color="primary"
        @click="$router.push({ path: '/table-o' })"
        flat
        >达成率</mu-button
      >
      <mu-button
        color="primary"
        @click="$router.push({ path: '/table-t' })"
        flat
        >积分</mu-button
      >
    </mu-container>

    <h3>全国动态</h3>
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

    <mu-row style="margin: 0rem 0.45rem .2rem">
      <mu-col span="12" lg="4" sm="6">
        <div>
          本周品质宣讲: <span>{{ dynamic.preachSum }}</span>
        </div>

        <div>
          上周品质宣讲: <span>{{ dynamic.lastWeekpreach }}</span>
        </div>

        <div>
          本周品质宣传: <span>{{ dynamic.propagandaSum }}</span>
        </div>

        <div>上周品质宣传: <span>{{ dynamic.lastWeekPropaganda }}</span></div>

        <div>
          累计品质宣讲: <span>{{ dynamic.preachAmrSum }}</span>
        </div>

        <div>
          达成率: <span>{{ dynamic.lastWeekpreachAmr }}</span>
        </div>

        <div>
          累计品质宣传: <span>{{ dynamic.propAmrSum }}</span>
        </div>

        <div>
          达成率: <span>{{ dynamic.lastWeekpropAmr }}</span>
        </div>

        <div>
          品质宣讲人数TOP3: <span>{{ dynamic.preachT3 }}</span>
        </div>

        <div>
          品质宣传人数TOP3: <span>{{ dynamic.propagandaT3 }}</span>
        </div>

        <div>
          品质宣讲达成率TOP3: <span>{{ dynamic.preachAmrT3 }}</span>
        </div>

        <div>品质宣传达成率TOP3: <span>{{ dynamic.propAmrT3 }}</span></div>
      </mu-col>
    </mu-row>

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
        <mu-form-item label="本周品质宣讲" prop="preachSum">
          <mu-text-field
            type="number"
            v-model="validateForm.preachSum"
            prop="preachSum"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="上周品质宣讲" prop="lastWeekpreach">
          <mu-text-field
            v-model="validateForm.lastWeekpreach"
            prop="lastWeekpreach"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="本周品质宣传" prop="propagandaSum">
          <mu-text-field
            type="number"
            v-model="validateForm.propagandaSum"
            prop="propagandaSum"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="上周品质宣传" prop="lastWeekPropaganda">
          <mu-text-field
            v-model="validateForm.lastWeekPropaganda"
            prop="lastWeekPropaganda"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="累计品质宣讲" prop="preachAmrSum">
          <mu-text-field
            v-model="validateForm.preachAmrSum"
            prop="preachAmrSum"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="累计品质宣讲达成率" prop="lastWeekpreachAmr">
          <mu-text-field
            v-model="validateForm.lastWeekpreachAmr"
            prop="lastWeekpreachAmr"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="累计品质宣传" prop="propAmrSum">
          <mu-text-field
            v-model="validateForm.propAmrSum"
            prop="propAmrSum"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="累计品质宣传达成率" prop="lastWeekpropAmr">
          <mu-text-field
            v-model="validateForm.lastWeekpropAmr"
            prop="lastWeekpropAmr"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          help-text="请以中文逗号分割，示例‘北京，上海，新疆’"
          label="品质宣讲人数TOP3"
          prop="preachT3"
        >
          <mu-text-field v-model="validateForm.preachT3"></mu-text-field>
        </mu-form-item>
        <mu-form-item
          help-text="请以中文逗号分割，示例‘北京，上海，新疆’"
          label="品质宣传人数TOP3"
          prop="propagandaT3"
        >
          <mu-text-field
            v-model="validateForm.propagandaT3"
            prop="propagandaT3"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          help-text="请以中文逗号分割，示例‘北京，上海，新疆’"
          label="品质宣讲达成率TOP3"
          prop="preachAmrT3"
        >
          <mu-text-field
            v-model="validateForm.preachAmrT3"
            prop="preachAmrT3"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          help-text="请以中文逗号分割，示例‘北京，上海，新疆’"
          label="品质宣传达成率TOP3"
          prop="propAmrT3"
        >
          <mu-text-field
            v-model="validateForm.propAmrT3"
            prop="propAmrT3"
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
    return {
      date,
      openFullscreen: false,
      rules: [{ validate: val => !!val, message: '必须填写' }],
      validateForm: {
        preachSum: '', // 本周品质宣讲
        lastWeekpreach: '', // 上周品质宣讲
        propagandaSum: '', // 本周品质宣传
        lastWeekPropaganda: '', // 上周品质宣传
        preachAmrSum: '', // 累计品质宣讲
        lastWeekpreachAmr: '', // 达成率
        propAmrSum: '', // 累计品质宣传
        lastWeekpropAmr: '', // 达成率
        preachT3: '-，-，-', // 品质宣讲人数TOP3
        propagandaT3: '-，-，-', // 品质宣传人数TOP3
        preachAmrT3: '-，-，-', // 品质宣讲达成率TOP3
        propAmrT3: '-，-，-' // 品质宣传达成率TOP3
      },
      dynamic: {},
      loading: false
    }
  },
  created() {
    // 获取数据
    this.getData()
  },
  methods: {
    // 获取数据
    async getData() {
      const res = await api.getDynamic()
      this.dynamic = res.data
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
      this.$refs.form.validate().then(async result => {
        if (result) {
          this.loading = true
          console.log('form: ', this.validateForm)
          try {
            await api.addDynamic(this.validateForm)
            // console.log('res', res)
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
        preachSum: '', // 本周品质宣讲
        lastWeekpreach: '', // 上周品质宣讲
        propagandaSum: '', // 本周品质宣传
        lastWeekPropaganda: '', // 上周品质宣传
        preachAmrSum: '', // 累计品质宣讲
        lastWeekpreachAmr: '', // 达成率
        propAmrSum: '', // 累计品质宣传
        lastWeekpropAmr: '', // 达成率
        preachT3: '-，-，-', // 品质宣讲人数TOP3
        propagandaT3: '-，-，-', // 品质宣传人数TOP3
        preachAmrT3: '-，-，-', // 品质宣讲达成率TOP3
        propAmrT3: '-，-，-' // 品质宣传达成率TOP3
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
