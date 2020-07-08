<template>
  <div>
    <Form ref="formTask" label-position="right" :model="Row" :rules="rule" :label-width="200">
      <Row>
        <Col span="12">
          <FormItem label="任务名称" prop="jobName">
            <Input v-model="Row.jobName" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="任务组" prop="jobGroup">
            <Input v-model="Row.jobGroup" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="Corn表达式" prop="cron">
            <Input v-model="Row.cron" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="任务所在DLL对应的程序集名称" prop="assemblyName">
            <Input v-model="Row.assemblyName" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="任务所在类" prop="className">
            <Input v-model="Row.className" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="开始运行时间" prop="beginTime">
            <DatePicker
              type="datetime"
              v-model="Row.beginTime"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择开始运行时间"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="结束运行时间" prop="endTime">
            <DatePicker
              type="datetime"
              v-model="Row.endTime"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择开始运行时间"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="触发器类型" prop="triggerType">
            <Select v-model="Row.triggerType" style="width:200px">
              <Option value="0">simple</Option>
              <Option value="1">cron</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="执行间隔时间(s)" prop="intervalSecond">
            <Input v-model="Row.intervalSecond" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="外部url" prop="url">
            <Input v-model="Row.url" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div style="text-align:center;">
            <Button @click="parent.modelEdit = false">取消</Button>
            <Button style="margin-left:20px;" type="primary" @click="save('formTask')">保存</Button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import { Add, Edit } from "@/api/ResSchedule";
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
      rule: {
        jobName: [
          {
            required: true,
            message: "请输入任务名称",
            trigger: "blur"
          }
        ],
        jobGroup: [
          {
            required: true,
            message: "请输入任务组",
            trigger: "blur"
          }
        ],
        cron: [
          {
            required: true,
            message: "请输入cron表达式",
            trigger: "blur"
          }
        ],
        assemblyName: [
          {
            required: true,
            message: "请输入任务所在DLL对应的程序集名称",
            trigger: "blur"
          }
        ],
        className: [
          {
            required: true,
            message: "请输入任务所在类",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save() {
      if (this.Row.id) {
        this.saveEdit();
      } else {
        this.saveAdd();
      }
    },
    saveAdd() {
      this.saveValidate().then(r => {
        if (r) {
          Add(this.Row)
            .then(res => {
              const resData = res.data;
              const data = resData.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code === 200) {
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
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    saveEdit() {
      this.saveValidate().then(r => {
        if (r) {
          Edit(this.Row)
            .then(res => {
              const resData = res.data;
              const data = resData.data;
              const code = resData.code;
              const msg = resData.msg;
              if (code === 200) {
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
    saveValidate(name = "formTask") {
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
  watch: {
    editRow(newVal, oldVal) {
      this.Row = Object.assign({}, newVal);
    }
  },
  mounted() {}
};
</script>
