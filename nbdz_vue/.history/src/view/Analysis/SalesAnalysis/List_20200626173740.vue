<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Form ref="formInline" label-position="right" :label-width="60" inline>
        <FormItem label="时间">
          <DatePicker
            v-model="filters.datetimePoint"
            type="date"
            placeholder="请选择查询日期"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="sku">
          <Input class="search-input" clearable v-model="filters.singleSku" />
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
          <Button @click="loadFilter()" class="search-btn" type="primary">
            <Icon type="search" />&nbsp;&nbsp;搜索
          </Button>
        </FormItem>
      </Form>
    </div>
    <Table
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      height="700"
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
import { getSales } from "@/api/Analysis";
import { getList as getWareList } from "@/api/ECWarehouse";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "编码",
          key: "rowNumber"
        },
        {
          title: "仓库",
          key: "warehouseDesc"
        },
        {
          title: "sku",
          key: "singleSku"
        },
        {
          title: "近三天销售额",
          key: "threeDaysSales"
        },
        {
          title: "近七天销售额",
          key: "sevenDaysSales"
        },
        {
          title: "近十四天销售额",
          key: "forteenDaysSales"
        },
        {
          title: "近三十天销售额",
          key: "thirtyDaysSales"
        }
      ],

      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        }
      },
      listData: [],
      filters: {
        datetimePoint: "",
        singleSku: "",
        warehouseId: ""
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      warehouseList: [],
      tableLoading: false
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      if (_this.filters.datetimePoint == "") {
        _this.filters.datetimePoint = dayjs(new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        _this.filters.datetimePoint = dayjs(_this.filters.datetimePoint).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      let filtersquery = [];
      let filtersSku = {};
      let filtersWare = {};
      if (_this.filters.singleSku && !_this.filters.singleSku == "") {
        filtersSku = {
          key: "singleSku",
          binaryop: "like",
          value: _this.filters.singleSku,
          andorop: "and"
        };
        filtersquery.push(filtersSku);
      }
      if (_this.filters.warehouseId && !_this.filters.warehouseId == "") {
        filtersWare = {
          key: "warehouseId",
          binaryop: "eq",
          value: _this.filters.warehouseId,
          andorop: "and"
        };
        filtersquery.push(filtersWare);
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        datetimePoint: _this.filters.datetimePoint,
        order: {},
        query: filtersquery,
        navPropertyPaths: []
      };
      _this.tableLoading = true;
      getSales(data)
        .then(res => {
          _this.tableLoading = false;
          if (res.data.code == 200) {
            _this.listData = res.data.data;
            _this.pageTotal = res.data.count;
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
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
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
    }
  },
  mounted() {
    this.loadData();
    this.loadWare();
  }
};
</script>

<style lang="less"></style>
