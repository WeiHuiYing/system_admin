/*  物流到达情况表
2020 / 10 / 30
 weihuiying  */
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
            <FormItem prop="send_time" label="发货时间">
              <DatePicker
                v-model="filters.send_time"
                type="date"
                :options="dateOptions"
                placeholder="请选择"
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
import { LogisticsEfficiency as getList } from "@/api/Logistics";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          title: "运输方式",
          key: "ServerName",
        },
        {
          title: "发货量",
          key: "ShippingMethodPlatform",
        },
        {
          title: "发货时间",
          key: "order_num",
        },
        {
          title: "发货时间(周)",
          key: "order_num",
        },
        {
          title: "标准妥投时间",
          key: "re_delivered_time",
        },
        {
          title: "标准妥投时间(周)",
          key: "re_delivered_time2",
        },
        {
          title: "标准时间内妥投量",
          key: "order_transit",
        },
        {
          title: "标准时间内上网量",
          key: "order_delivered",
        },
        {
          title: "妥投率",
          key: "order_transit",
        },
        {
          title: "延迟一天到达量",
          key: "re_delivered_num_1",
        },
        {
          title: "延迟二天到达量",
          key: "re_delivered_num_2",
        },
        {
          title: "延迟三天到达量",
          key: "re_delivered_num_3",
        },
        {
          title: "延迟三天以上到达量",
          key: "re_delivered_num_4",
        },
        {
          title: "未到达量",
          key: "not_delivered_num",
        },
      ],
      listData: [],
      filters: {
        send_time: "",
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
        send_time: dayjs(data.send_time).format("YYYY-MM-DD"),
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          _this.listData = res.data.data;
        })
        .catch((err) => {
          _this.tableLoading = false;
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
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
