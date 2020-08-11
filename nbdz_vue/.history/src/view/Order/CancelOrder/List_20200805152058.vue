/* 2020 / 08 / 05
weihuiying
作废订单报表  */
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="60" inline>
            <FormItem label="店铺"></FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
          :page-size-opts="[100,200,300,400,500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { CancelOrderReport as getList } from "@/api/Order";

import store from "@/store";
export default {
  data() {
    return {
      listColums: [
        {
          title: "参考号",
          key: "refNo",
        },
        {
          title: "sku",
          key: "trueSku",
        },
        {
          title: "数量",
          key: "trueQty",
          sortable: true,
        },
        {
          title: "平台",
          key: "plateform",
          sortable: true,
        },
        {
          title: "店铺",
          key: "platformUserName",
        },
        {
          title: "国家",
          key: "countryCode",
        },
        {
          title: "备注",
          key: "orderDesc",
        },
      ],
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      shopList: [],
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        page: _this.pageCurrent,
        pageSize: _this.pageSize,
      };
      getList(data)
        .then((res) => {
          console.log(res);
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
