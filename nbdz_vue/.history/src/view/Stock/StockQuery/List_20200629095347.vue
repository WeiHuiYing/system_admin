<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="搜索内容">
            <Input clearable v-model="filters.search" placeholder="请输入搜索内容"></Input>
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
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "sku",
          key: "sku",
          align: "center",
          width: 150
        },
        {
          title: "数量",
          key: "qty",
          align: "center",
          width: 150
        },

        {
          title: "仓库编码",
          key: "warehouseCode",
          align: "center",
          width: 130
        }
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        search: ""
      }
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        pageNum: _this.currentPage,
        pageSize: _this.pageSize
      };
      getList(data)
        .then(res => {
          _this.listData = res.data.results;
          _this.totalCount = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    exportExcel() {
      const _this = this;
      let data = {
        page: _this.currentPage,
        page_size: _this.pageSize,
        search: _this.filters.search,
        OrderId: _this.filters.OrderId,
        RefNo: _this.filters.RefNo,
        Plateform: _this.filters.Plateform,
        OrderType: _this.filters.OrderType,
        PlatformUserName: _this.filters.PlatformUserName
      };
      if (_this.filters.startTime != "" && _this.filters.endTime != "") {
        if (
          !dayjs(_this.filters.endTime).isAfter(dayjs(_this.filters.startTime))
        ) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        } else {
          data.paid_data_gte = dayjs(_this.filters.startTime).format(
            "YYYY-MM-DD "
          );
          data.paid_data_lte = dayjs(_this.filters.endTime).format(
            "YYYY-MM-DD "
          );
        }
      }
      this.$Spin.show();
      exportList(data)
        .then(res => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel"
          });
          const fileName = "订单物流查询报表.xlsx";
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
    },
    filtersData() {
      const _this = this;
      _this.modelFilters = true;
    },
    filtersLoad() {
      const _this = this;
      _this.modelFilters = false;
      _this.loadData();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="less"></style>
