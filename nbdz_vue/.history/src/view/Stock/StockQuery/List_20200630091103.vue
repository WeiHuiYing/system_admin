<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="sku:">
            <Input clearable v-model="filters.sku" placeholder="请输入搜索sku"></Input>
          </FormItem>
          <FormItem label="仓库">
            <Select v-model="filters.warehouseId" style="width:200px" clearable>
              <Option
                v-for="item in warehouseList"
                :value="item.warehouseId"
                :key="item.warehouseId"
              >{{ item.warehouseDesc }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button style="margin-right:5px" @click="loadFilter()" type="primary">搜索</Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Button @click="exportExcel()" type="primary">导出</Button>
      </Col>
    </Row>
    <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="totalCount"
          :current="currentPage"
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
  GetInventorySku as getList,
  ExportInventorySku as exportList
} from "@/api/Analysis";
import { getList as getWareList } from "@/api/ECWarehouse";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "sku",
          key: "sku",
          align: "center"
        },
        {
          title: "数量",
          key: "qty",
          align: "center"
        },

        {
          title: "仓库编码",
          key: "warehouseCode",
          align: "center"
        }
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      warehouseList: [],
      filters: {
        sku: "",
        warehouseId: ""
      }
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.currentPage) _this.currentPage = 1;
      let filtersquery = [];
      let filtersSku = {};
      let filtersWare = {};
      if (_this.filters.sku && _this.filters.sku != "") {
        filtersSku = {
          key: "sku",
          binaryop: "eq",
          value: _this.filters.sku,
          andorop: "and"
        };
        filtersquery.push(filtersSku);
      }
      if (_this.filters.warehouseId && _this.filters.warehouseId != "") {
        filtersWare = {
          key: "warehouseId",
          binaryop: "eq",
          value: _this.filters.warehouseId,
          andorop: "and"
        };
        filtersquery.push(filtersWare);
      }
      let data = {};
      let data = {
        pageNum: _this.currentPage,
        pageSize: _this.pageSize,
        query: filtersquery
      };
      getList(data)
        .then(res => {
          let resData = res.data;
          if (resData.code == "200") {
            _this.listData = res.data;
            _this.totalCount = res.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadWare() {
      let _this = this;
      let data = {};
      getWareList(data)
        .then(res => {
          if (res.data.code == 200) {
            _this.warehouseList = res.data.data;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    exportExcel() {
      const _this = this;
      let data = {};
      this.$Spin.show();
      exportList(data)
        .then(res => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel"
          });
          const fileName = "库存查询报表.xlsx";
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
        .catch(err => {
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
    }
  },
  mounted() {
    this.loadData();
    this.loadWare();
  }
};
</script>

<style lang="less"></style>
