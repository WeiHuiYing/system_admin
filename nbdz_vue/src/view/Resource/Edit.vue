<template>
  <div>
    <Form
      ref="formInline"
      label-position="right"
      :model="Row"
      :rules="ruleResource"
      :label-width="100"
    >
      <Row>
        <Col span="12">
          <FormItem label="类型名称" prop="typeName">
            <Input v-model="Row.typeName" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="中文名称" prop="cnName">
            <Input v-model="Row.cnName" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="英文名称" prop="enName">
            <Input v-model="Row.enName" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="编码" prop="resourceCode">
            <Input v-model="Row.resourceCode" clearable />
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
import { Add as addResource, Edit as editResource } from "@/api/ResResource";
export default {
  props: { editRow: Object, parent: Object },
  data() {
    return {
      Row: {},
      ruleResource: {
        typeName: [
          {
            required: true,
            message: "类型名称必填",
            trigger: "blur"
          }
        ],
        cnName: [
          {
            required: true,
            message: "中文名称必填",
            trigger: "blur"
          }
        ],
        enName: [
          {
            required: true,
            message: "英文名称必填",
            trigger: "blur"
          }
        ],
        resourceCode: [
          {
            required: true,
            message: "编码必填",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    editRow(newVal, oldVal) {
      this.handleReset();
      this.Row = Object.assign({}, newVal);
    }
  },
  methods: {
    save() {
      if (this.parent.isAdd) {
        this.saveAdd();
      } else {
        this.saveEdit();
      }
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
    },
    saveEdit() {
      let _this = this;
      _this.saveValidate().then(r => {
        if (r) {
          editResource(_this.Row)
            .then(res => {
              if (res.data.code === 200) {
                this.$Message.info("编辑成功");
                this.parent.modelEdit = false;
                this.parent.loadData();
              } else {
                this.$Message.error({
                  content: res.data.msg,
                  duration: 10,
                  closable: true
                });
              }
            })
            .catch(err => {});
        }
      });
    },
    saveAdd() {
      let _this = this;
      _this.saveValidate().then(r => {
        if (r) {
          addResource(_this.Row)
            .then(res => {
              if (res.data.code === 200) {
                this.$Message.info("编辑成功");
                this.parent.modelEdit = false;
                this.parent.loadData();
              } else {
                this.$Message.error({
                  content: res.data.msg,
                  duration: 10,
                  closable: true
                });
              }
            })
            .catch(err => {});
        }
      });
    }
  },
  mounted() {}
};
</script>