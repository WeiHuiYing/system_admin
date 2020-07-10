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
              type="datetime"
              v-model="Row.startTime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择开始时间"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="结束时间" prop="endTime">
            <DatePicker
              type="datetime"
              v-model="Row.endTime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择运行时间"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="24">
          <div style="text-align:center;">
            <Button @click="parent.modelDetils = false">取消</Button>
            <Button style="margin-left:20px;" type="primary" @click="save('formCurrency')">保存</Button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { editCurrency, addCurrency } from "@/api/ResCurrency";
import dayjs from "dayjs";
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
      if (this.Row.currencyRate2RMB) {
        this.Row.currencyRate2RMB = JSON.stringify(this.Row.currencyRate2RMB);
      }

      if (this.Row.currencyRate2USD) {
        this.Row.currencyRate2USD = JSON.stringify(this.Row.currencyRate2USD);
      }
    }
  },
  methods: {
    save(name) {
      if (this.parent.isAdd) {
        this.saveAdd(name);
      } else {
        this.saveEdit(name);
      }
    },
    saveAdd(name) {
      const _this = this;
      _this.saveValidate(name).then(valid => {
        if (valid) {
          if (
            dayjs(_this.Row.startTime).isAfter(
              dayjs(_this.Row.endTime) &&
                dayjs(_this.Row.endTime).diff(
                  dayjs(_this.Row.startTime),
                  "day"
                ) != "0"
            )
          ) {
            this.$Message.warning("开始时间在结束时间之前！");
            return false;
          }
          let data = {
            currencyCode: _this.Row.currencyCode,
            currencyName: _this.Row.currencyName,
            currencyRate2RMB: _this.Row.currencyRate2RMB,
            currencyRate2USD: _this.Row.currencyRate2USD,
            startTime: dayjs(_this.Row.startTime).format("YYYY-MM-DD HH:mm:ss"),
            endTime: dayjs(_this.Row.endTime).format("YYYY-MM-DD HH:mm:ss")
          };
          addCurrency(data).then(res => {
            const resData = res.data;
            if (resData.code == 200) {
              this.$Message.info(resData.msg);
              this.parent.modelDetils = false;
              this.parent.loadData();
            } else {
              this.$Message.error({
                content: resData.msg,
                duration: 10,
                closable: true
              });
            }
          });
        }
      });
    },
    saveEdit(name) {
      const _this = this;
      _this.saveValidate(name).then(valid => {
        if (valid) {
          if (
            dayjs(_this.Row.startTime).isAfter(
              dayjs(_this.Row.endTime) &&
                dayjs(_this.Row.endTime).diff(
                  dayjs(_this.Row.startTime),
                  "day"
                ) != "0"
            )
          ) {
            this.$Message.warning("开始时间在结束时间之前！");
            return false;
          }
          let data = {
            id: _this.Row.id,
            currencyCode: _this.Row.currencyCode,
            currencyName: _this.Row.currencyName,
            currencyRate2RMB: _this.Row.currencyRate2RMB,
            currencyRate2USD: _this.Row.currencyRate2USD,
            startTime: dayjs(_this.Row.startTime).format("YYYY-MM-DD HH:mm:ss"),
            endTime: dayjs(_this.Row.endTime).format("YYYY-MM-DD HH:mm:ss")
          };
          editCurrency(data).then(res => {
            const resData = res.data;
            if (resData.code == 200) {
              this.$Message.info(resData.msg);
              this.parent.modelDetils = false;
              this.parent.loadData();
            } else {
              this.$Message.error({
                content: resData.msg,
                duration: 10,
                closable: true
              });
            }
          });
        }
      });
    },
    saveValidate(name) {
      const _this = this;
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