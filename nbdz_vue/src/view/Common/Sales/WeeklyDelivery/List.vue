<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem prop="store_name" label="店铺">
              <Select style="width: 150px" v-model="filters.store_name">
                <Option value="juliahair">juliahair</Option>
                <Option value="bfmall">bfmall</Option>
                <Option value="unicemall">unicemall</Option>
                <Option value="nadulamall">nadulamall</Option>
                <Option value="unicefr">unicefr</Option>
                <Option value="Jurllyshe">Jurllyshe</Option>
                <Option value="hurela">hurela</Option>
              </Select>
            </FormItem>
            <FormItem prop="send_date_gte" label="发货开始时间">
              <DatePicker
                v-model="filters.send_date_gte"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 150px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="send_date_lte" label="发货结束时间">
              <DatePicker
                v-model="filters.send_date_lte"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 150px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="pay_date_gte" label="付款开始时间">
              <DatePicker
                v-model="filters.pay_date_gte"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 150px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="pay_date_lte" label="付款结束时间">
              <DatePicker
                v-model="filters.pay_date_lte"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 150px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button @click="loadData()" class="search-btn" type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      height="750"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      border
    ></Table>
  </div>
</template>

<script>
import { weeklyDelivery as getList } from "@/api/common";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          title: "物流",
          key: "ServerName",
        },
        {
          title: "物流方式",
          key: "ShippingMethodPlatform",
        },
        {
          title: "总订单数",
          key: "order_num",
        },
        {
          title: "delivered(总)",
          key: "order_delivered",
        },
        {
          title: "transit(总)",
          key: "order_transit",
        },
        {
          title: "pickup(总)",
          key: "order_pickup",
        },
        {
          title: "其他(总)",
          key: "order_other",
        },
        {
          title: "delivered状态 ",
          align: "center",
          children: [
            {
              title: "11-15天订单数",
              key: "delivered_1",
            },
            {
              title: "16-20天订单数",
              key: "delivered_2",
            },
            {
              title: "超过20天订单数",
              key: "delivered_3",
            },
          ],
        },
        {
          title: "transit状态",
          align: "center",
          children: [
            {
              title: "11-15天订单数",
              key: "transit_1",
            },
            {
              title: "16-20天",
              key: "transit_2",
            },
            {
              title: "超过20天",
              key: "transit_3",
            },
          ],
        },
      ],
      listData: [],
      filters: {
        store_name: "juliahair",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      repeatIndex: [],
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        store_name: _this.filters.store_name,
        pay_date_gte: "",
        pay_date_lte: "",
        send_date_gte: "",
        send_date_lte: "",
      };
      data.pay_date_gte = _this.filters.pay_date_gte || "";
      data.pay_date_lte =
        _this.filters.pay_date_lte && _this.filters.pay_date_lte != ""
          ? dayjs(_this.filters.pay_date_lte).add(1, "day")
          : "";
      if (data.pay_date_gte != "" && data.pay_date_lte != "") {
        if (dayjs(data.pay_date_lte).isBefore(dayjs(data.pay_date_gte))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true,
          });
          return false;
        }
      }
      data.send_date_gte = _this.filters.send_date_gte || "";
      data.send_date_lte =
        _this.filters.send_date_lte && _this.filters.send_date_lte != ""
          ? dayjs(_this.filters.send_date_lte).add(1, "day")
          : "";
      if (data.pay_date_gte != "" && data.pay_date_lte != "") {
        if (dayjs(data.send_date_gte).isBefore(dayjs(data.send_date_lte))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true,
          });
          return false;
        }
      }
      _this.tableLoading = true;
      data.pay_date_gte =
        data.pay_date_gte && data.pay_date_gte != ""
          ? dayjs(data.pay_date_gte).format("YYYY-MM-DD")
          : "";
      data.pay_date_lte =
        data.pay_date_lte && data.pay_date_lte != ""
          ? dayjs(data.pay_date_lte).format("YYYY-MM-DD")
          : "";
      data.send_date_gte =
        data.send_date_gte && data.send_date_gte != ""
          ? dayjs(data.send_date_gte).format("YYYY-MM-DD")
          : "";
      data.send_date_lte =
        data.send_date_lte && data.send_date_lte != ""
          ? dayjs(data.send_date_lte).format("YYYY-MM-DD")
          : "";
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          _this.listData = res.data.data;
        })
        .catch((err) => {
          _this.tableLoading = false;
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          } else if (response.data) {
            let msg = "";
            Object.keys(response.data).forEach((key) => {
              msg += key + ":" + response.data[key];
            });
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true,
            });
          }
        });
    },
  },
  mounted() {},
};
</script>

<style lang="less"></style>
