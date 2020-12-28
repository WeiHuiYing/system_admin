<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="sku">
            <Input
              clearable
              v-model="filters.sku"
              placeholder="请输入搜索sku"
            ></Input>
          </FormItem>
          <FormItem label="商品大类">
            <Select
              clearable
              style="width: 200px"
              v-model="filters.productType"
              placeholder="请选择商品大类"
            >
              <Option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item"
                :value="item"
              ></Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 5px"
              @click="loadFilter()"
              type="primary"
              >搜索</Button
            >
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Button @click="exportExcel()" type="primary">导出</Button>
      </Col>
    </Row>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      :loading="tableLoading"
      v-bind:columns="listColums"
      stripe
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="totalCount"
          :current="currentPage"
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
  GetBaseList as getList,
  EditBaseDate as editData,
  UploadBaseMaterial,
} from "@/api/Factory";
import dayjs from "dayjs";
import { filtersNewDate as filtersDate } from "@/libs/validator";
export default {
  data() {
    return {
      listColums: [
        {
          title: "原料类型",
          key: "type",
          align: "center",
        },
        {
          title: "工厂sku",
          key: "factorySku",
          align: "center",
        },
        {
          title: "系统sku关键字",
          key: "skuKey",
          align: "center",
        },
        {
          title: "根据SKU匹配",
          key: "isFullMatching",
          align: "center",
        },
        {
          title: "8''",
          key: "m8",
          align: "center",
        },
        {
          title: "8-1''",
          key: "m8_1",
          align: "center",
        },
        {
          title: "8-2''",
          key: "m8_2",
          align: "center",
        },
        {
          title: "8-3''",
          key: "m8_3",
          align: "center",
        },
        {
          title: "10''",
          key: "m10",
          align: "center",
        },
        {
          title: "10''(手织)",
          key: "h10",
          align: "center",
        },
        {
          title: "12''",
          key: "m12",
          align: "center",
        },
        {
          title: "12''(手织)",
          key: "h12",
          align: "center",
        },
        {
          title: "14''",
          key: "m14",
          align: "center",
        },
        {
          title: "14''(手织)",
          key: "h14",
          align: "center",
        },
        {
          title: "16''",
          key: "m16",
          align: "center",
        },
        {
          title: "16''(手织)",
          key: "h16",
          align: "center",
        },
        {
          title: "16''",
          key: "m16",
          align: "center",
        },
        {
          title: "16''(手织)",
          key: "h16",
          align: "center",
        },
        {
          title: "18''",
          key: "m18",
          align: "center",
        },
        {
          title: "18''(手织)",
          key: "h18",
          align: "center",
        },
        {
          title: "20''",
          key: "m20",
          align: "center",
        },
        {
          title: "20''(手织)",
          key: "h20",
          align: "center",
        },
        {
          title: "24''",
          key: "m24",
          align: "center",
        },
        {
          title: "24''(手织)",
          key: "h24",
          align: "center",
        },
        {
          title: "26''",
          key: "m26",
          align: "center",
        },
        {
          title: "26''(手织)",
          key: "h26",
          align: "center",
        },
        {
          title: "28''",
          key: "m28",
          align: "center",
        },
        {
          title: "28''(手织)",
          key: "h28",
          align: "center",
        },
        {
          title: "30''",
          key: "m30",
          align: "center",
        },
        {
          title: "30''(手织)",
          key: "h30",
          align: "center",
        },
        {
          title: "导入日期",
          key: "enterDate",
          align: "center",
        },
        {
          title: "更新日期",
          key: "updateDate",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
        },
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        sku: "",
        productType: "",
      },
      tableLoading: false,
      typeList: [],
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        // pageNum: _this.currentPage,
        // pageSize: _this.pageSize,
        // query: filtersquery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          let resData = res.data;
          if (resData.code == "200") {
            _this.listData = resData.data;
            _this.totalCount = resData.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    exportExcel() {
      const _this = this;
      let filtersquery = [];
      if (_this.filters.sku && _this.filters.sku != "") {
        filtersquery.push({
          key: "sku",
          value: _this.filters.sku,
          option: "lk",
          andorop: "and",
        });
      }
      if (_this.filters.productType && _this.filters.productType != "") {
        filtersquery.push({
          key: "productType",
          value: _this.filters.productType,
          option: "eq",
          andorop: "and",
        });
      }
      let data = {
        query: filtersquery,
      };
      this.$Spin.show({
        render: (h) => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18,
              },
            }),
            h("div", "导出中"),
          ]);
        },
      });
      exportList(data)
        .then((res) => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "大货报备报表.xlsx";
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadFilter() {
      const _this = this;
      _this.currentPage = 1;
      _this.loadData();
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      const _this = this;
      _this.currentPage = val;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
