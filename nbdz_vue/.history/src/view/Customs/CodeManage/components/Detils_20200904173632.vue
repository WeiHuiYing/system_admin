<template>
  <div>
    <Form :rules="CodeRules" style="width:60%;margin:0 auto" ref="codeForms" :model="rowInfo" :label-width="100">
      <FormItem label="海关编码" prop="HsCode">
        <Input v-model="rowInfo.HsCode" placeholder="请输入海关编码"></Input>
      </FormItem>
      <FormItem label="申报中文名" prop="ReportName">
        <Input v-model="rowInfo.ReportName" placeholder="请输入申报中文名"></Input>
      </FormItem>
      <FormItem label="申报英文名" prop="ReportEnName">
        <Input v-model="rowInfo.ReportEnName" placeholder="请输入申报英文名"></Input>
      </FormItem>
      <FormItem label="申报单位" prop="ReportUnit">
        <Input v-model="rowInfo.ReportUnit" placeholder="请输入申报英文名"></Input>
      </FormItem>
    </Form>
    <Row style="margin-bottom:10px">
        <Col span="24">
          <div style="text-align:right;">
            <Button  type="primary" >新增</Button>
          </div>
        </Col>
    </Row>
    <Table
      height="400"
      ref="tables"
      :loading="tableLoading"
      :data="rowInfo.GModels"
      :columns="listColumns"
      stripe
    >
      <template slot-scope="{ row }" slot="GModel">
        <Select v-if="row.isEdit" clearable style="width:200px" v-model="row.GModel">
            <Option value="aliexpress" key="aliexpress">速卖通</Option>
            <Option value="aliexpresscn" key="aliexpresscn">aliexpresscn</Option>
            <Option value="amazon" key="amazon">亚马逊</Option>
            <Option value="ebay" key="ebay">ebay</Option>
            <Option value="magento" key="magento">magento</Option>
            <Option value="magento2" key="magento2">magento2</Option>
            <Option value="shopify" key="shopify">shopify</Option>
          </Select>
        <span v-else>{{row.GModel}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="editData(row)" style="margin-right: 5px">编辑</Button>
        <Button type="error" size="small" @click="removeData(row,index)">删除</Button>
      </template>
    </Table>
    <Row style="margin-bottom:10px">
        <Col span="24">
          <div style="text-align:center;">
            <Button @click="parent.modelDetils = false">取消</Button>
            <Button style="margin-left:20px;" type="primary" @click="save('codeForms')">保存</Button>
          </div>
        </Col>
    </Row>
  </div>
</template>

<script>
import { hsCode as getList,hscodeModel as getModel } from "@/api/Customs";
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      tableLoading: false,
      listColumns: [
        {
          title: "申报规格",
          slot: "GModel",
          align: "center",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        },
      ],
      CodeRules: {
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
    loadData() {
      const _this =this;
      let data = {}
      getList(data,"Get",_this.detilsRow.id).then(res=>{
        _this.rowInfo = res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
    save(name){
      const _this = this;
      _this.saveValidate(name).then(valid => {
        if (valid) {
         
        }
      });
    },
    editData(row) {},
    removeData(row, index) {},
  },
};
</script>

