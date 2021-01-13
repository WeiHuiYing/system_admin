<template>
  <div>
    <Form
      ref="formCurrency"
      label-position="right"
      :model="Row"
      :rules="rule"
      :label-width="200"
    >
      <Row>
        <Col span="12">
          <FormItem prop="plateform" label="平台">
            <Select
              v-model="Row.plateform"
              @on-change="loadShop"
              clearable
              style="width: 200px"
            >
              <Option
                v-for="(item, index) in parent.plateList"
                :key="index"
                :label="item"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="storename" label="店铺">
            <Select
              :disabled="Row.plateform == '' ? true : false"
              v-model="Row.storename"
              clearable
              style="width: 200px"
            >
              <Option
                v-for="(item, index) in shopList"
                :key="index"
                :label="item"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="对外店铺名称" prop="outStorename">
            <Input v-model="Row.outStorename" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="公司" prop="company">
            <Input v-model="Row.company" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="付款方式" prop="acountType">
            <Input v-model="Row.acountType" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="bankNo" prop="bankNo">
            <Input v-model="Row.bankNo" clearable />
          </FormItem>
        </Col>
        <Col span="24">
          <div style="text-align: center">
            <Button @click="parent.modelDetils = false">取消</Button>
            <Button
              style="margin-left: 20px"
              type="primary"
              @click="save('formCurrency')"
              >保存</Button
            >
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { editCurrency, addCurrency } from "@/api/ResManage";
import { GetPlateform, GetShop } from "@/api/order";
import dayjs from "dayjs";
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      Row: {},
      shopList: [],
      rule: {
        storename: [
          {
            required: true,
            message: "请输入店铺名称",
            trigger: "blur",
          },
        ],
        plateform: [
          {
            required: true,
            message: "请输入平台",
            trigger: "blur",
          },
        ],
        outStorename: [
          {
            required: true,
            message: "请输入对外店铺名称",
            trigger: "blur",
          },
        ],
        company: [
          {
            required: true,
            message: "请输入公司",
            trigger: "blur",
          },
        ],
      },
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
    },
  },
  methods: {
    save(name) {
      if (this.parent.isAdd) {
        this.saveAdd(name);
      } else {
        this.saveEdit(name);
      }
    },
    loadShop() {
      let _this = this;
      GetShop(_this.Row.plateform)
        .then((res) => {
          _this.shopList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveAdd(name) {
      const _this = this;
      _this.saveValidate(name).then((valid) => {
        if (valid) {
          let data = {
            currencyCode: _this.Row.currencyCode,
            currencyName: _this.Row.currencyName,
            currencyRate2RMB: _this.Row.currencyRate2RMB,
            currencyRate2USD: _this.Row.currencyRate2USD,
            month: dayjs(_this.Row.month).format("YYYY-MM"),
          };
          addCurrency(data).then((res) => {
            const resData = res.data;
            if (resData.code == 200) {
              this.$Message.info(resData.message);
              this.parent.modelDetils = false;
              this.parent.loadData();
            } else {
              this.$Message.error({
                content: resData.message,
                duration: 10,
                closable: true,
              });
            }
          });
        }
      });
    },
    saveEdit(name) {
      const _this = this;
      _this.saveValidate(name).then((valid) => {
        if (valid) {
          let data = {
            id: _this.Row.id,
            currencyCode: _this.Row.currencyCode,
            currencyName: _this.Row.currencyName,
            currencyRate2RMB: _this.Row.currencyRate2RMB,
            currencyRate2USD: _this.Row.currencyRate2USD,
            month: dayjs(_this.Row.month).format("YYYY-MM"),
          };
          editCurrency(data).then((res) => {
            const resData = res.data;
            if (resData.code == 200) {
              this.$Message.info(resData.message);
              this.parent.modelDetils = false;
              this.parent.loadData();
            } else {
              this.$Message.error({
                content: resData.message,
                duration: 10,
                closable: true,
              });
            }
          });
        }
      });
    },
    saveValidate(name) {
      const _this = this;
      return this.$refs[name].validate((valid) => {
        if (!valid) {
          this.$Message.warning("请检查表单数据！");
          return false;
        } else {
          return true;
        }
      });
    },
  },
};
</script>