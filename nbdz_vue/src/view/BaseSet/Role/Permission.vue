<template>
  <div>
    <Form ref="formInline" label-position="right" :model="Row" :label-width="100">
      <Row>
        <Col span="24">
          <div style="width:100%;height: 500px;overflow: auto;">
            <function-tree-check ref="functionTreeCheck" :parent="this"></function-tree-check>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div style="text-align:center;padding-top:10px;">
            <Button @click="parent.modelPermission = false">取消</Button>
            <Button style="margin-left:20px;" type="primary" @click="save()">保存</Button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import { edit, getFunctions, saveFunctions } from "@/api/ResRole";
import FunctionTreeCheck from "@/view/Permission/FunctionTreeCheck";
export default {
  props: { editRow: Object, parent: Object },
  components: { FunctionTreeCheck },
  data() {
    return {
      Row: {},
      modelDept: false
    };
  },
  methods: {
    loadData() {
      getFunctions(this.Row.id)
        .then(res => {
          const resData = res.data;
          const data = resData.data;
          const code = resData.code;
          const msg = resData.msg;
          if (code == 200) {
            this.$refs.functionTreeCheck.functionSelect(data);
          } else {
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {});
    },
    save() {
      this.saveFunctions();
    },
    saveFunctions() {
      let checkedNodes = this.$refs.functionTreeCheck.checkedCodes;
      let checkeds = checkedNodes
        .filter(item => {
          if (!item.children) {
            return item;
          }
        })
        .map(item => {
          return item.id;
        });
      saveFunctions(this.Row.id, checkeds)
        .then(res => {
          const resData = res.data;
          const data = resData.data;
          const code = resData.code;
          const msg = resData.msg;
          if (code == 200) {
            this.$Message.info("保存成功");
            this.parent.modelPermission = false;
            this.parent.loadData();
          } else {
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {});
    }
  },
  watch: {
    editRow(newVal, oldVal) {
      this.Row = Object.assign({}, newVal);
      if (this.Row.roleCode) {
        this.loadData();
      }
    }
  },
  mounted() {
    // this.getFunctions();
  }
};
</script>
