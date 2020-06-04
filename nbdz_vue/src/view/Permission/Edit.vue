<template>
  <div>
    <Form ref="formInline" label-position="right" :model="Row" :rules="rule" :label-width="100">
      
      <Row>
        <Col span="24">
          <FormItem label="中文名" prop="cnName">
            <Input v-model="Row.cnName" clearable />
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="英文名" prop="enName">
            <Input v-model="Row.enName" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="编码" prop="permissionCode">
            <Input v-model="Row.permissionCode" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div style="text-align:center;">
            <Button @click="parent.modelEdit=false">取消</Button>
            <Button style="margin-left:20px;" type="primary" @click="save('formInline')">保存</Button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import {Add as addFunction , Edit as editFunction  } from "@/api/pubFunction";
export default {
  props: { editRow: Object, parent: Object },
  computed: {},
  data() {
    return {
      Row: {},
      rule: {
        cnName: [
          {
            required: true,
            message: "中文名必填",
            trigger: "blur"
          }
        ],
        enName: [
          {
            required: true,
            message: "英文名必填",
            trigger: "blur"
          }
        ],
        permissionCode: [
          {
            required: true,
            message: "编码必填",
            trigger: "blur"
          }
        ],
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
          addFunction(this.Row).then(res => {
              const resData = res.data;
              const data = resData.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info("添加成功");
                this.parent.modelEdit = false;
                this.parent.loadData()
              } else {
                this.$Message.error({
                  content: msg,
                  duration: 10,
                  closable: true
                });
              }
            }).catch(err => {});
        }
      });
    },
    saveEdit() {
      this.saveValidate().then(r => {
        if (r) {
          editFunction(this.Row).then(res => {
              const resData = res.data;
              const data = resData.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info("编辑成功");
                this.parent.modelEdit = false;
                this.parent.loadData()
              } else {
                this.$Message.error({
                  content: msg,
                  duration: 10,
                  closable: true
                });
              }
            }).catch(err => {});
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
      this.handleReset()
      this.Row = Object.assign({}, newVal);
    }
  },
  mounted() {}
};
</script>

