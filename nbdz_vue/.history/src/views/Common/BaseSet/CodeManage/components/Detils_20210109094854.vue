<template>
  <div>
    <Form
      :rules="CodeRules"
      style="width: 60%; margin: 0 auto"
      ref="codeForms"
      :model="rowInfo"
      :label-width="100"
    >
      <FormItem label="海关编码" prop="HsCode">
        <Input v-model="rowInfo.HsCode" placeholder="请输入海关编码"></Input>
      </FormItem>
      <FormItem label="申报中文名" prop="ReportName">
        <Input
          v-model="rowInfo.ReportName"
          placeholder="请输入申报中文名"
        ></Input>
      </FormItem>
      <FormItem label="申报英文名" prop="ReportEnName">
        <Input
          v-model="rowInfo.ReportEnName"
          placeholder="请输入申报英文名"
        ></Input>
      </FormItem>
      <FormItem label="申报单位" prop="ReportUnit">
        <Input
          v-model="rowInfo.ReportUnit"
          placeholder="请输入申报英文名"
        ></Input>
      </FormItem>
    </Form>
    <Row style="margin-bottom: 10px">
      <Col span="24">
        <div style="text-align: right">
          <Button @click="addData()" type="primary">新增</Button>
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
        <Input
          placeholder="请输入申报规格"
          v-if="row.isEdit"
          v-model="row.GModel"
        ></Input>
        <span v-else>{{ row.GModel }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          v-if="row.isEdit"
          type="primary"
          size="small"
          @click="saveData(row, index)"
          style="margin-right: 5px"
          >保存</Button
        >
        <Button
          v-else
          type="primary"
          size="small"
          @click="editData(row, index)"
          style="margin-right: 5px"
          >编辑</Button
        >
        <Button type="error" size="small" @click="removeData(row, index)"
          >删除</Button
        >
      </template>
    </Table>
    <Row style="margin-top: 10px">
      <Col span="24">
        <div style="text-align: center">
          <Button @click="parent.modelDetils = false">取消</Button>
          <Button
            style="margin-left: 20px"
            type="primary"
            @click="save('codeForms')"
            >保存</Button
          >
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { hsCode as getList, hscodeModel as getModel } from "@/api/Customs";
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      tableLoading: false,
      GModelLoading: false,
      modelForm: {},
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
      if (this.detilsRow.id) {
        this.loadData();
      } else {
        this.rowInfo = {
          GModels: [],
        };
      }
    },
  },
  methods: {
    loadData() {
      const _this = this;
      let data = {};
      getList(data, "Get", _this.detilsRow.id)
        .then((res) => {
          _this.rowInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save(name) {
      const _this = this;
      this.saveValidate(name).then((valid) => {
        if (valid) {
          let request;
          if (_this.rowInfo.id) {
            request = getList(_this.rowInfo, "Patch");
          } else {
            request = getList(_this.rowInfo, "Post");
          }
          request.then((res) => {
            console.log(res);
            _this.$Message.success("操作成功");
            _this.$props.parent.loadData();
            _this.$props.parent.modelDetils = false;
          });
        }
      });
    },
    saveValidate(name) {
      return this.$refs[name].validate((valid) => {
        if (!valid) {
          this.$Message.warning("请检查表单数据！");
          return false;
        } else {
          return true;
        }
      });
    },
    // filterGModel(val){
    //   const _this = this;
    //   let data = {
    //     HsCode_id:_this.rowInfo.id || '',
    //     search:val
    //   }
    //   getModel(data,"Get").then(res=>{
    //     _this.ModelList = res.data.results
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // },
    editData(row, index) {
      const _this = this;
      row.isEdit = true;
      this.$set(this.rowInfo.GModels, index, row);
    },
    saveData(row, index) {
      const _this = this;
      row.isEdit = false;
      this.$set(this.rowInfo.GModels, index, row);
    },
    addData() {
      const _this = this;
      if (!_this.rowInfo.GModels) {
        _this.rowInfo.GModels = [];
      }
      let GList = _this.rowInfo.GModels;
      let item = {
        GModel: "",
        HsCode_id: _this.rowInfo.id || "",
        isEdit: true,
      };
      GList.push(item);
      this.$set(_this.rowInfo, "GModels", GList);
      console.log(_this.rowInfo);
    },
    removeData(row, index) {
      this.rowInfo.GModels.splice(index, 1);
    },
  },
  mounted() {},
};
</script>

