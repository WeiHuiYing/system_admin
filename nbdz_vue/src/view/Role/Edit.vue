<template>
  <div>
    <Form
      ref="formInline"
      label-position="right"
      :model="Row"
      :rules="rule"
      :label-width="100"
    >
      <Row>
        <Col span="24">
          <FormItem label="角色名" prop="roleName">
            <Input v-model="Row.roleName" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="备注" prop="remark">
            <Input v-model="Row.remark" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div style="text-align:center;">
            <Button @click="parent.modelEdit = false">取消</Button>
            <Button
              style="margin-left:20px;"
              type="primary"
              @click="save('formInline')"
              >保存</Button
            >
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import { Add as addRole, Edit as editRole } from "@/api/ResRole";
export default {
  props: { editRow: Object, parent: Object },
  computed: {},
  data() {
    return {
      Row: {},
      rule: {
        roleName: [
          {
            required: true,
            message: "角色名必填",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "备注必填",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save() {
      if (this.parent.isAdd) {
        this.saveAdd();
      } else {
        this.saveEdit();
      }
    },
    saveAdd() {
      this.saveValidate().then(r => {
        if (r) {
          addRole(this.Row)
            .then(res => {
              const resData = res.data;
              const data = resData.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info("添加成功");
                this.parent.modelEdit = false;
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
      });
    },
    saveEdit() {
      this.saveValidate().then(r => {
        if (r) {
          editRole(this.Row)
            .then(res => {
              const resData = res.data;
              const data = resData.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info("编辑成功");
                this.parent.modelEdit = false;
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
      });
    },
    saveValidate(name = "formInline") {
      return this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.warning("请检查表单数据！");
          return false;
        } else {
          return true;
        }
      });
    },
    handleReset(name = "formInline") {
      this.$refs[name].resetFields();
    }
  },
  watch: {
    editRow(newVal, oldVal) {
      this.handleReset();
      this.Row = Object.assign({}, newVal);
    }
  },
  mounted() {}
};
</script>
