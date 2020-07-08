<template>
  <div>
    <Form ref="formInline" label-position="right" :model="Row" :rules="ruleMenu" :label-width="100">
      <Row>
        <Col v-if="Row.component" span="12">
          <FormItem label="组件" prop="component">
            <Input v-model="Row.component" readonly />
          </FormItem>
        </Col>
        <Col v-else span="12">
          <FormItem label="组件" prop="component">
            <Select v-model="Row.component" clearable style="width:300px">
              <Option v-for="(item,index) in componentList" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="名称" prop="name">
            <Select v-model="Row.name" clearable style="width:300px">
              <Option v-for="(item,index) in nameList" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="路由地址" prop="path">
            <Input v-model="Row.path" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="标题" prop="title">
            <Input v-model="Row.title" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="图标" prop="icon">
            <Select v-model="Row.icon" clearable style="width:200px">
              <Option v-for="(item,index) in iconList" :label="item" :value="item" :key="index">
                <Icon :type="item" />
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="面包屑可见" prop="hideInBread">
            <Select v-model="Row.hideInBread" clearable style="width:200px">
              <Option label="是" value="false"></Option>
              <Option label="否" value="true"></Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="菜单栏可见" prop="hideInMenu">
            <Select v-model="Row.hideInMenu" clearable style="width:200px">
              <Option label="是" value="false"></Option>
              <Option label="否" value="true"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="缓存" prop="notCache">
            <Select v-model="Row.notCache" clearable style="width:200px">
              <Option label="是" value="false"></Option>
              <Option label="否" value="true"></Option>
            </Select>
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
import { componentList as sourceList } from "@/libs/componentsList.js";
import { iconList as sourceIcon } from "@/libs/componentsList.js";
import { addMenus, editMenus } from "@/api/ResMenus";
export default {
  props: { editRow: Object, parent: Object },
  computed: {},
  components: {},
  data() {
    return {
      Row: {},
      ruleMenu: {
        component: [{ required: true, message: "组件必选", trigger: "change" }],
        name: [{ required: true, message: "名称必选", trigger: "change" }],
        path: [{ required: true, message: "路由地址必填", trigger: "blur" }],
        title: [{ required: true, message: "标题必填", trigger: "blur" }]
      },
      componentList: [],
      nameList: [],
      iconList: []
    };
  },
  watch: {
    editRow(newVal, oldVal) {
      this.Row = Object.assign({}, newVal);
      if (this.Row.meta) {
        this.Row.title = this.Row.meta.title;
        this.Row.icon = this.Row.meta.icon;
      }
    }
  },
  methods: {
    loadData() {
      let _this = this;
      sourceList.forEach(item => {
        if (item.component) {
          _this.componentList.push(item.component);
        }
        if (item.name) {
          _this.nameList.push(item.name);
        }
      });
      _this.iconList = sourceIcon;
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
          let data = JSON.parse(JSON.stringify(this.Row));
          delete data.meta;
          addMenus(data)
            .then(res => {
              const resData = res.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info(msg);
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
          let data = JSON.parse(JSON.stringify(this.Row));
          delete data.meta;
          editMenus(data)
            .then(res => {
              const resData = res.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code == 200) {
                this.$Message.info(msg);
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
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

