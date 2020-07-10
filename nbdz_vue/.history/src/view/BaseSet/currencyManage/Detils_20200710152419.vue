<template>
  <div>
    <Form ref="formCurrency" label-position="right" :model="Row" :rules="rule" :label-width="200">
      <Row>
        <Col span="12">
          <FormItem label="货币代码" prop="currencyCode">
            <Input v-model="Row.currencyCode" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="货币名称" prop="currencyName">
            <Input v-model="Row.currencyName" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="对RMB汇率" prop="currencyRate2RMB">
            <Input v-model="Row.currencyRate2RMB" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="对USD汇率" prop="currencyRate2USD">
            <Input v-model="Row.currencyRate2USD" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="开始时间" prop="startTime">
            <DatePicker
              type="date"
              v-model="Row.startTime"
              format="yyyy-MM-dd"
              placeholder="请选择开始时间"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="结束时间" prop="endTime">
            <DatePicker
              type="date"
              v-model="Row.endTime"
              format="yyyy-MM-dd"
              placeholder="请选择运行时间"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="24">
          <div style="text-align:center;">
            <Button @click="parent.modelEdit = false">取消</Button>
            <Button style="margin-left:20px;" type="primary" @click="save('formCurrency')">保存</Button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { editCurrency, addCurrency } from "@/api/ResCurrency";
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      Row: {},
      rule: {
        currencyCode: [
          {
            required: true,
            message: "请输入货币代码",
            trigger: "blur"
          }
        ],
        currencyName: [
          {
            required: true,
            message: "请输入货币名称",
            trigger: "blur"
          }
        ],
        currencyRate2RMB: [
          {
            required: true,
            message: "请输入对RMB汇率",
            trigger: "blur"
          }
        ],
        currencyRate2USD: [
          {
            required: true,
            message: "请输入对USD汇率",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.Row = Object.assign({}, newVal);
    }
  },
  methods: {
    save(name) {
      const _this = this;
      console.log(this.props.parent);
      // if (_this.$props.parent.data.isAdd == true) {
      //   saveAdd(name);
      // } else {
      //   saveEdit(name);
      // }
    },
    saveAdd(name) {
      const _this = this;
      _this.saveValidate(name).then(valid => {
        if (valid) {
          addCurrency(_this.Row).then(res => {
            console.log(res);
          });
        }
      });
    },
    saveEdit(name) {
      const _this = this;
      _this.saveValidate(name).then(valid => {
        if (valid) {
          editCurrency(_this.Row).then(res => {
            console.log(res);
          });
        }
      });
    },
    saveValidate(name) {
      return this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.warning("请检查表单数据！");
          return false;
        } else {
          return true;
        }
      });
    }
  }
};
</script>