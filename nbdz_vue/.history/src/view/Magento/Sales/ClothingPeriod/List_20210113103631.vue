/* 2020 / 09 / 17
weihuiying
服装期间库存查询  */
<template>
  <div class="content-main">
    <div class="content-header" style="margin-bottom: 15px">
      <Row>
        <Col :span="22">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="80"
            inline
          >
            <FormItem prop="sku" label="sku">
              <Input v-model="filters.sku" placeholder="请输入sku"></Input>
            </FormItem>
            <FormItem prop="starttime" label="开始时间">
              <DatePicker
                v-model="filters.starttime"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="endtime" label="结束时间">
              <DatePicker
                v-model="filters.endtime"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button @click="loadFilters()" class="search-btn" type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
        </Col>
        <Col style="text-align: right" :span="2">
          <Button type="primary" @click="exportAll()">导出</Button>
        </Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColumns"
      border
      stripe
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
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
  ClothingPeriodQuery as getList,
  ClothingPeriodQueryExport as exportReport,
} from "@/api/magento";
import { filtersDate } from "@/libs/validator";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listData: [],
      listColumns: [
        {
          title: "商品",
          key: "sku",
        },
        {
          title: "销售数量",
          key: "saleQty",
        },
        {
          title: "入库数量",
          key: "inQty",
        },
        {
          title: "销售额",
          key: "saleAmount",
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      filters: {
        starttime: "",
        endtime: "",
        sku: "",
      },
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
      let filterQuery = _this.filtersObj();
      let filterTime = filtersDate(
        "starttime",
        _this.filters.starttime,
        _this.filters.endtime,
        "endtime"
      );
      if (filterTime) {
        if (filterTime.length > 0) {
          filterQuery = filterQuery.concat(filterTime);
        }
      } else {
        return false;
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          } else if (response.data) {
            let msg = "";
            Object.keys(response.data).forEach((key) => {
              msg += key + ":" + response.data[key];
            });
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      if (_this.filters.sku && _this.filters.sku != "") {
        let skuObj = {
          key: "sku",
          binaryop: "eq",
          value: _this.filters.sku,
          andorop: "and",
        };
        filterQuery.push(skuObj);
      }
      return filterQuery;
    },
    filtersDate(startString, endString, startTime, endTime) {
      const _this = this;
      let filterQuery = [];
      if (startTime != "" && endTime != "") {
        endTime = dayjs(endTime).add(1, "day");
        if (!dayjs(endTime).isAfter(dayjs(startTime))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true,
          });
          return false;
        } else {
          let Start = {
            key: startString,
            binaryop: "gte",
            value: dayjs(startTime).format("YYYY-MM-DD"),
            andorop: "and",
          };
          let End = {
            key: endString,
            binaryop: "lt",
            value: dayjs(endTime).format("YYYY-MM-DD"),
            andorop: "and",
          };
          filterQuery.push(Start);
          filterQuery.push(End);
        }
      }
      return filterQuery;
    },
    loadFilters() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
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
    exportAll() {
      let _this = this;
      let filterQuery = _this.filtersObj();
      let filterTime = filtersDate(
        "starttime",
        _this.filters.starttime,
        _this.filters.endtime,
        "endtime"
      );
      if (filterTime) {
        if (filterTime.length > 0) {
          filterQuery = filterQuery.concat(filterTime);
        }
      } else {
        return false;
      }
      let data = {
        query: filterQuery,
      };
      this.$Spin.show();
      exportReport(data).then((res) => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "服装期间库存查询.xlsx";
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
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>