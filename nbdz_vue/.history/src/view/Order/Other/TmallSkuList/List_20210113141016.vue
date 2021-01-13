<template>
  <div>
    <Row>
      <Col :span="22">
        <Form label-position="right" :label-width="100" inline>
          <FormItem label="sku">
            <Input
              clearable
              v-model="filters.skuId"
              placeholder="请输入sku"
            ></Input>
          </FormItem>
          <FormItem label="开始时间">
            <DatePicker
              v-model="filters.sDate"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
              clearable
            >
            </DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker
              v-model="filters.eDate"
              type="date"
              :options="dateOptions"
              placeholder="请选择结束时间"
              style="width: 200px"
              clearable
            >
            </DatePicker>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 5px"
              @click="loadData('filter')"
              type="primary"
              >搜索</Button
            >
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Button
          style="margin-right: 5px"
          @click="loadData('filter')"
          type="primary"
          >导出</Button
        >
      </Col>
    </Row>
    <Table
      :loading="tableLoading"
      v-bind:columns="tableColumns"
      :data="tableData"
      stripe
      height="670"
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
import { ExportTmallSkuList, TmallSkuList } from "@/api/order";
import { filtersNewDate as filtersDate } from "@/libs/validator";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableLoading: false,
      tableColumns: [
        {
          title: "sku",
          key: "sku",
        },
        {
          title: "国际条形码",
          key: "skuCode",
        },
        {
          title: "销量",
          key: "saleQty",
        },
        {
          title: "库存量",
          key: "qty",
        },
      ],
      tableData: [],
      filters: {
        skuId: "",
        sDate: "",
        eDate: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100,
    };
  },
  methods: {
    loadData() {
      const _this = this;
      let filterQuery = [];
      let filterDate = filtersDate(
        "sDate",
        _this.filters.sDate,
        _this.filters.eDate,
        "eDate"
      );
      if (filterDate && filterDate.length > 0) {
        filterQuery = filterQuery.concat(filterDate);
      } else {
        this.$Message.error({
          content: "请选择时间",
          duration: 10,
          closable: true,
        });
        return false;
      }
      if (_this.filters.skuId && _this.filters.skuId != "") {
        filterQuery.push({
          key: "skuId",
          value: _this.filters.skuId,
          option: "lk",
          isAnd: "true",
        });
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      TmallSkuList(data).then((res) => {
        console.log(res);
      });
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
  },
};
</script>