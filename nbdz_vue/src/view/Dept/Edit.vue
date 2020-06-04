<template>
  <div>
    <!-- Id, UserCode, UserName, RealName, UserPwd, Sex, IdentityNo, Birthday, DeptCode, ManagerFlag, Tel, EMail, QQ, Remark, StopFlag, Crid, Crdt, Lmid, Lmdt, LoginDate, ProvinceCode, CityCode, RegionCode, UserAddress, Wxcode, HeadUrl -->
    <Form ref="formInline" label-position="right" :model="Row" :rules="rule" :label-width="100">
      <Row>
        <Col span="24">
          <FormItem label="父级" prop="parentName" id="item-parentName">
            <Input search enter-button v-model="Row.parentName" readonly @on-search="deptSelect" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="名称" prop="deptName">
            <Input clearable v-model="Row.deptName" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="备注" prop="remark">
            <Input v-model="Row.remark" type="textarea" clearable :autosize="{minRows: 2,maxRows: 2}" />
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

    <Modal
      title="选择部门"
      :mask-closable="false"
      v-model="modelDept"
      width="300"
      scrollable
      footer-hide
    >
      <dept-tree :parent="this"></dept-tree>
    </Modal>
  </div>
</template>
<script>
import { getRoles } from "@/api/ResRole";
import { getList, Add as addDept, Edit as editDept } from "@/api/ResDept";
import DeptTree from "./DeptTree";
export default {
  props: { editRow: Object, parent: Object },
  computed: {},
  components: {
    DeptTree
  },
  data() {
    return {
      Row: {},
      Roles: [],
      Depts: [],
      DeptTree: [],
      DeptTreeItems: [],
      modelDept: false,
      rule: {
        deptName: [
          {
            required: true,
            message: "名称必填",
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
  watch: {
    editRow(newVal, oldVal) {
      this.Row = Object.assign({}, newVal);
      if (this.Row.parentId) {
        this.Row.parentName = this.Row.parentDept.deptName;
        this.Row.parentId = this.Row.parentDept.id;
      }
    }
  },
  methods: {
    deptSelect() {
      this.modelDept = true;
    },
    deptChange(data) {
      this.Row.parentCode = data.value;
      this.Row.parentName = data.title;
      this.Row.parentId = data.id;
      var itemParent = document.getElementById("item-parentName");
      itemParent.classList.remove("ivu-form-item-error");
      // itemParent.children[1].children[1].style.display = "none";
      this.modelDept = false;
    },
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
          addDept(this.Row)
            .then(res => {
              const resData = res.data;
              const data = resData.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info("添加成功");
                this.parent.modelEdit = false;
                this.parent.reloadAll(this.Row.parentId);
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
          editDept(this.Row)
            .then(res => {
              const resData = res.data;
              const data = resData.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info("编辑成功");
                this.parent.modelEdit = false;
                this.parent.reloadAll(this.Row);
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
  mounted() {}
};
</script>

