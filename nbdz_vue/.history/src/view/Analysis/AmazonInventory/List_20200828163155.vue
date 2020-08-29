/* 2020 / 08 / 26
weihuiying
亚马逊库存报表  */
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="80" inline>
            <FormItem prop="in_sku" label="内部sku">
              <Input v-model="filters.in_sku" placeholder="请输入内部sku"></Input>
            </FormItem>
            <FormItem prop="out_sku" label="外部sku">
              <Input v-model="filters.out_sku" placeholder="请输入外部sku"></Input>
            </FormItem>
            <FormItem prop="store_name" label="店铺">
              <Input v-model="filters.store_name" placeholder="请输入店铺"></Input>
            </FormItem>
            <FormItem prop="asin" label="asin">
              <Input v-model="filters.asin" placeholder="请输入asin"></Input>
            </FormItem>
            <FormItem>
              <Button @click="loadFilters()" class="search-btn" type="primary">搜索</Button>
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
import { amazonInventory as getList } from "@/api/Analysis";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          title: "内部sku",
          width: "200",
          key: "in_sku",
        },
        {
          title: "外部sku",
          width: "200",
          key: "out_sku",
        },
        {
          title: "店铺",
          width: "200",
          key: "store_name",
        },
        {
          title: "亚马逊库存",
          key: "amazon_qty",
        },
        {
          title: "子商品",
          key: "child_sn",
        },
      ],
      listData: [],
      filters: {
        search: "",
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
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        page: _this.pageCurrent,
        page_size: _this.pageSize,
      };
      data = Object.assign(data, _this.filters);
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          _this.listData = resData.results;
          _this.pageTotal = resData.count;
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
    loadFilters() {
      this.pageCurrent = 1;
      this.loadData();
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      const _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
