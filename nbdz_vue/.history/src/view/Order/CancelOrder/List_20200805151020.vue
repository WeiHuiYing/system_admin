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
          title: "平台单号",
          key: "plateformCode",
        },
        {
          title: "店铺",
          key: "storeName",
        },
        {
          title: "放款时间",
          key: "fkDATE",
          sortable: true,
        },
        {
          title: "业务类型",
          key: "fkType",
        },
        {
          title: "币种",
          key: "currency",
        },
        {
          title: "放款金额",
          key: "fkAmount",
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
      let data = {};
      getList(data)
        .then((res) => {
          if (res.status == 200) {
            _this.shopList = res.data;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true,
            });
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
