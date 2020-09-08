<template>
  <div>
    <Form :rules="rules" style="width:60%;margin:0 auto" :model="rowInfo" :label-width="100">
      <FormItem label="海关编码" props="HsCode">
        <Input v-model="rowInfo.HsCode" placeholder="请输入海关编码"></Input>
      </FormItem>
      <FormItem label="申报中文名" props="ReportName">
        <Input v-model="rowInfo.ReportName" placeholder="请输入申报中文名"></Input>
      </FormItem>
      <FormItem label="申报英文名" props="ReportEnName">
        <Input v-model="rowInfo.ReportEnName" placeholder="请输入申报英文名"></Input>
      </FormItem>
      <FormItem label="申报单位" props="ReportUnit">
        <Input v-model="rowInfo.ReportUnit" placeholder="请输入申报英文名"></Input>
      </FormItem>
    </Form>
    <Table
      height="400"
      ref="tables"
      :loading="tableLoading"
      :data="rowInfo.GModels"
      :columns="listColumns"
      stripe
    >
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="editData(row)" style="margin-right: 5px">编辑</Button>
        <Button type="error" size="small" @click="removeData(row,index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      tableLoading: false,
      listColumns: [
        {
          title: "申报规格",
          key: "GModel",
          align: "center",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        },
      ],
      rules: {
        HsCode: [
          { required: true, message: "请输入海关编码", trigger: "blur" },
        ],
        ReportName: [
          { required: true, message: "请输入申报中文名", trigger: "blur" },
        ],
        ReportEnName: [
          { required: true, message: "请输入申报英文名", trigger: "blur" },
        ],
        ReportUnit: [
          { required: true, message: "请输入申报单位", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.loadData();
    },
  },
  methods: {
    loadData() {},
    editData(row) {},
    removeData(row, index) {},
  },
};
</script>

