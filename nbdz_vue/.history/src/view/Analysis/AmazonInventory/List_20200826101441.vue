/* 2020 / 08 / 26
weihuiying
亚马逊库存报表  */
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="60" inline>
            <FormItem prop="startTime" label="开始时间">
              <DatePicker
                v-model="filters.startTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="endTime" label="结束时间">
              <DatePicker
                v-model="filters.endTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button @click="loadData()" class="search-btn" type="primary">搜索</Button>
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
import { amazonInventory as getList } from "@/api/Analysis";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          title: "货代",
          key: "ServerName",
        },
        {
          title: "该订单状态下订单数",
          key: "so_num",
        },
        {
          title: "运输状态",
          key: "DeliveredStatus",
        },
        {
          title: "最大运输标准时间",
          key: "MaxStandardDate",
        },
        {
          title: "停留天数",
          key: "ResidenceTime",
        },
        {
          title: "运输天数",
          key: "TransportationTime",
        },
        {
          title: "妥投时间",
          key: "DeliveredTime",
        },
        {
          title: "超出数量",
          key: "exceed_num",
        },
        {
          title: "发货订单总计",
          key: "total_num",
        },
        {
          title: "物流规则",
          key: "Shiping",
        },
        {
          title: "状态占比",
          key: "StatusProportion",
        },
        {
          title: "妥投率",
          key: "DeliveredProportion",
        },
        {
          title: "超出标准时间占比",
          key: "exceedProportion",
        },
      ],
      listData: [],
      filters: {
        startTime: "",
        endTime: "",
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
      let data = {};
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
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
