/* 2020 / 08 / 26
weihuiying
亚马逊库存报表  */
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="80"
            inline
          >
            <FormItem prop="in_sku" label="内部sku">
              <Input
                v-model="filters.in_sku"
                placeholder="请输入内部sku"
              ></Input>
            </FormItem>
            <FormItem prop="out_sku" label="外部sku">
              <Input
                v-model="filters.out_sku"
                placeholder="请输入外部sku"
              ></Input>
            </FormItem>
            <FormItem label="店铺">
              <Select
                clearable
                placeholder="请选择店铺"
                v-model="filters.store__name"
              >
                <Option
                  v-for="(item, index) in amazonStore"
                  :key="index"
                  :value="item"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="asin" label="编号">
              <Input
                v-model="filters.asin"
                placeholder="请输入唯一编号"
              ></Input>
            </FormItem>
            <FormItem>
              <Button @click="loadFilters()" class="search-btn" type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
        </Col>
        <Col :span="2">
          <Button @click="exportData()" type="primary">导出</Button>
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
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
          :page-size-opts="[100, 200, 300, 400, 500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import {
  amazonInventory as getList,
  exportAmazonInventory as exportList,
} from "@/api/Analysis";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          title: "唯一编码",
          width: "200",
          key: "asin",
        },
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
          type: "html",
          key: "child_sn",
        },
      ],
      listData: [],
      filters: {
        store__name: "",
        in_sku: "",
        asin: "",
        out_sku: "",
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
  computed: {
    amazonStore() {
      return this.$store.state.amazonStore;
    },
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
          console.log(res);
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
    exportData() {
      let _this = this;
      let data = {};
      data = Object.assign(data, _this.filters);
      _this.tableLoading = true;
      exportList(data).then((res) => {
        console.log(res);
        _this.tableLoading = false;
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "亚马逊库存报表.xlsx";
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放 URL对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
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
