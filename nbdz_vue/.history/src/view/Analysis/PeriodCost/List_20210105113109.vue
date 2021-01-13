/*  
2020 / 01/ 04
weihuiying
期间成本
 */
<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="24">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem prop="month" label="月份">
            <DatePicker
              :options="dateOptions"
              type="month"
              v-model="filters.month"
              placeholder="请选择月份"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button style="margin-right: 5px" @click="loadData()" type="primary"
              >搜索</Button
            >
            <Button
              style="margin-right: 5px"
              @click="exportList()"
              type="primary"
              >导出</Button
            >
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Table
      ref="tables"
      border
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :loading="tableLoading"
      height="700"
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="totalCount"
          :current="pageCurrent"
          :page-size="pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
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
  getPeriodCostList as getList,
  exportPeriodCostList as exportList,
} from "@/api/Analysis";
import excel from "@/libs/excel";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "sku",
          key: "sku",
          align: "center",
          width: 200,
        },
        {
          title: "品类",
          key: "productCategoryName",
          align: "center",
          width: 200,
        },
        {
          title: "期末成本",
          key: "endCost",
          align: "center",
          width: 200,
        },
        {
          title: "期末成本单价",
          key: "endPrice",
          align: "center",
          width: 200,
        },
        {
          title: "期末库存数量",
          key: "endQty",
          align: "center",
          width: 200,
        },
        {
          title: "期间入库成本",
          key: "inCost",
          align: "center",
          width: 200,
        },
        {
          title: "期间入库单价",
          key: "inPrice",
          align: "center",
          width: 200,
        },
        {
          title: "期间入库数量",
          key: "inQty",
          align: "center",
          width: 200,
        },
        {
          title: "期初成本",
          key: "openCost",
          align: "center",
          width: 200,
        },
        {
          title: "期初成本单价",
          key: "openPrice",
          align: "center",
          width: 200,
        },
        {
          title: "期初库存数量",
          key: "openQty",
          align: "center",
          width: 200,
        },
        {
          title: "期间出库成本",
          key: "outCost",
          align: "center",
          width: 200,
        },
        {
          title: "期间出库单价",
          key: "outPrice",
          align: "center",
          width: 200,
        },
        {
          title: "期间出库数量",
          key: "outQty",
          align: "center",
          width: 200,
        },
        {
          title: "期间退件入库成本",
          key: "reCost",
          align: "center",
          width: 200,
        },
        {
          title: "期间退件入库单价",
          key: "rePrice",
          align: "center",
          width: 200,
        },
        {
          title: "期间退件入库数量",
          key: "reQty",
          align: "center",
          width: 200,
        },
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        month: "",
      },
      tableLoading: false,
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.currentPage) _this.currentPage = 1;
      if (_this.filters.month && _this.filters.month != "") {
        let filtersquery = [
          {
            key: "month",
            isAnd: "true",
            option: "eq",
            value: dayjs(_this.filters.month).format("YYYY-MM"),
          },
        ];
        let params = {
          method: "POST",
          data: {
            pageNum: _this.currentPage,
            pageSize: _this.pageSize,
            query: filtersquery,
          },
        };
        this.tableLoading = true;
        getList(params)
          .then((res) => {
            let resData = res.data;
            this.tableLoading = false;
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
            console.log(err.response);
          });
      } else {
        this.$Message.error({
          content: "请选择月份",
          duration: 10,
          closable: true,
        });
      }
    },
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    // 导出功能
    exportList() {
      let _this = this;
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      _this.listColums.forEach((item) => {
        if (item.children) {
          item.children.forEach((child) => {
            let children = {};
            children.title = item.title + "|" + child.title;
            children.key = child.key;
            columnsArr.push(children);
          });
        } else {
          columnsArr.push(item);
        }
      });
      titleArr = columnsArr.map((item) => {
        return item.title;
      });
      keyArr = columnsArr.map((item) => {
        return item.key;
      });
      const params = {
        title: titleArr,
        key: keyArr,
        data: this.listData,
        autoWidth: true,
        filename: "国内海外仓发货占比报表",
      };
      excel.export_array_to_excel(params);
    },
  },
  mounted() {},
};
</script>

<style lang="less"></style>
