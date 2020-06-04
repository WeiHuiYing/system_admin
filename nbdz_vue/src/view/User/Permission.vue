<template>
  <div>
    <Form ref="formInline" label-position="right" :model="Row" :label-width="100">
      <Row>
        <Col span="24">
          <div style="height: 500px;overflow: auto;">
            <function-tree-check ref="functionTreeCheck" :parent="this"></function-tree-check>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div style="text-align:center;padding-top:10px;">
            <Button @click="parent.modelPermission=false">取消</Button>
            <Button style="margin-left:20px;" type="primary" @click="save()">保存</Button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import FunctionTreeCheck from "@/view/Permission/FunctionTreeCheck";
import { getPermissions } from "@/api/ResUser";
export default {
  props: { editRow: Object, parent: Object },
  components: { FunctionTreeCheck },
  data() {
    return {
      Row: {}
    };
  },
  methods: {
    getFunctions() {
      let _this = this;
      getPermissions(_this.Row.id)
        .then(res => {
          const resData = res.data;
          const data = resData.data;
          const code = resData.code;
          const msg = resData.msg;
          if (code === 200) {
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
      let checkedNodes = this.$refs.functionTreeCheck.functionTreeItems;
      let checkeds = checkedNodes
        .filter(p => p.checked == true)
        .map(p => p.value);
      saveFunctions(this.Row.userCode, checkeds)
        .then(res => {
          const resData = res.data;
          const data = resData.data;
          const code = resData.code;
          const msg = resData.msg;
          if (code == 1) {
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
      if (this.Row.id) {
        this.getFunctions();
      }
    }
  },
  mounted() {}
};
</script>

