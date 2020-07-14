<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form ref="formInline" label-position="right" :label-width="60" inline>
            <FormItem label="sku">
              <Input clearable v-model="filters.sku" />
            </FormItem>
            <FormItem>
              <Button @click="loadFilter()" class="search-btn" type="primary">
                <Icon type="search" />&nbsp;&nbsp;搜索
              </Button>
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
      height="700"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
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
import {
  getOutStockList as getList,
  exportOutStockList as exportList
} from "@/api/Analysis";
export default {
  data() {
    return {
      listColums: [
        {
          title: "sku",
          key: "sku"
        },
        {
          title: "outQty",
          key: "outQty"
        },
        {
          title: "qty",
          key: "qty"
        },
        {
          title: "saleQty",
          key: "saleQty"
        },
        {
          title: "shipBatchQty",
          key: "shipBatchQty"
        }
      ],
      listData: [],
      filters: {
        sku: ""
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      let filtersquery = [];
      Object.keys(_this.filters).forEach(keyItem => {
        if (_this.filters[keyItem] && _this.filters[keyItem] != "") {
          if (keyItem == "sku") {
            filtersquery.push({
              key: keyItem,
              binaryop: "like",
              value: _this.filters[keyItem],
              andorop: "and"
            });
          } else {
            filtersquery.push({
              key: keyItem,
              binaryop: "eq",
              value: _this.filters[keyItem],
              andorop: "and"
            });
          }
        }
      });
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersquery
      };
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          if (res.data.code == 200) {
            _this.listData = res.data.data;
            _this.pageTotal = res.data.totalCount;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    exportData() {
      let _this = this;
      let filtersquery = [];
      Object.keys(_this.filters).forEach(keyItem => {
        if (_this.filters[keyItem] && _this.filters[keyItem] != "") {
          if (keyItem == "sku") {
            filtersquery.push({
              key: keyItem,
              binaryop: "like",
              value: _this.filters[keyItem],
              andorop: "and"
            });
          } else {
            filtersquery.push({
              key: keyItem,
              binaryop: "eq",
              value: _this.filters[keyItem],
              andorop: "and"
            });
          }
        }
      });
      let data = {
        query: filtersquery
      };
      this.$Spin.show();
      exportList(data).then(res => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel"
        });
        const fileName = "美国仓剩余库存报表.xlsx";
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
        this.$Spin.hide();
      });
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="less"></style>
