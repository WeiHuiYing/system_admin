<template>
  <div>
    <Form ref="formInline" label-position="right" :model="Row" :rules="ruleUser" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem label="用户名" prop="userName">
            <Input v-model="Row.userName" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="密码" prop="salt">
            <Input type="password" v-model="Row.salt" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="电话">
            <Input v-model="Row.phone" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="部门">
            <Input search enter-button v-model="Row.deptName" readonly @on-search="deptSelect" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="姓名">
            <Input v-model="Row.realName" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="头像url">
            <Input v-model="Row.headUrl" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="角色">
            <Select v-model="Row.UserRoles" filterable multiple clearable @on-change="rolesSelect">
              <Option v-for="item in Roles" :value="item.id" :key="item.id">{{ item.roleName }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="邮箱地址">
            <Input v-model="Row.email" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="备注">
            <Input v-model="Row.remark" clearable />
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
      <Tree :data="DeptTree" @on-select-change="deptTreeChange"></Tree>
    </Modal>
  </div>
</template>

<script>
import { Add as addUser, Edit as editUser } from "@/api/ResUser";
import { getList as getRoles } from "@/api/ResRole";
import { getList as getDepts } from "@/api/ResDept";
export default {
  props: { editRow: Object, parent: Object },
  computed: {},
  data() {
    return {
      Row: {},
      Roles: [],
      Depts: [],
      DeptTree: [],
      DeptTreeItems: [],
      modelDept: false,
      ruleUser: {
        userName: [
          {
            required: true,
            message: "用户名必填",
            trigger: "blur"
          }
        ],
        userPwd: [
          {
            required: true,
            message: "密码必填",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度≥6",
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
      if (this.Row.resUserRoles && this.Row.resUserRoles.length > 0) {
        this.Row.UserRoles = this.Row.resUserRoles.map(item => {
          return item.id;
        });
      }
    }
  },
  methods: {
    getRoles() {
      let data = {};
      getRoles(data)
        .then(res => {
          const resData = res.data;
          const data = resData.data;
          this.Roles = data;
        })
        .catch(err => {});
    },
    // 部门选择
    deptSelect() {
      if (!this.Depts || this.Depts.length <= 0) {
        this.getDepts();
      }
      this.modelDept = true;
    },
    getDepts() {
      let data = {};
      getDepts(data)
        .then(res => {
          const resData = res.data;
          const data = resData.data;
          this.Depts = data;
          this.loadDeptTree();
        })
        .catch(err => {});
    },
    loadDeptTree() {
      var treeRoot = this.Depts.filter(
        p => !p.parentCode || p.parentCode == ""
      );
      this.loadDeptTreeChild(treeRoot);
    },
    loadDeptTreeChild(treeData) {
      for (let index = 0; index < treeData.length; index++) {
        const element = treeData[index];
        this.loadDeptTreeItem(element);
        const child = this.Depts.filter(p => p.parentCode == element.deptCode);
        if (child && child.length > 0) {
          this.loadDeptTreeChild(child);
        }
      }
    },
    loadDeptTreeItem(treeItemData) {
      var treeItem = {
        title: treeItemData.deptName,
        expand: true,
        value: treeItemData.deptCode,
        id: treeItemData.id
      };
      this.DeptTreeItems.push(treeItem);
      if (treeItemData.parentCode) {
        //foreach 无法终止循环
        this.DeptTreeItems.every(element => {
          if (element.value == treeItemData.parentCode) {
            if (!element.children) {
              element.children = [];
            }
            element.children.push(treeItem);
            return false;
          }
          return true;
        });
      } else {
        this.DeptTree.push(treeItem);
      }
    },
    // 部门操作
    deptTreeChange(data) {
      var item0 = data[0];
      this.Row.deptName = item0.title;
      this.Row.deptId = item0.id;
      this.modelDept = false;
    },
    rolesSelect() {
      this.Row.resUserRoles = this.Row.UserRoles.map(item => {
        let obj = {
          roleId: item
        };
        return obj;
      });
    },
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
          delete _this.Row.UserRoles;
          editUser(_this.Row)
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
          delete _this.Row.UserRoles;
          addUser(_this.Row)
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
    handleReset(name = "formInline") {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    this.getRoles();
  }
};
</script>

<style lang="less" scoped>
</style>