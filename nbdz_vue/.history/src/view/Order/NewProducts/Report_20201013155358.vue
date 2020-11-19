/* 2020 / 10/ 07
weihuiying
新品追踪导入  */
<template>
  <div>
    <Row class="search-con search-con-top">
      <Col :span="24">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="sku">
            <Input
              clearable
              v-model="filters.sku"
              placeholder="请输入sku"
            ></Input>
          </FormItem>
          <FormItem prop="SDatePaidPlatform" label="付款开始时间">
            <DatePicker
              v-model="filters.SDatePaidPlatform"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
              clearable
            ></DatePicker>
          </FormItem>
          <FormItem prop="EDatePaidPlatform" label="付款结束时间">
            <DatePicker
              v-model="filters.EDatePaidPlatform"
              type="date"
              :options="dateOptions"
              placeholder="请选择结束时间"
              style="width: 200px"
              clearable
            ></DatePicker>
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
    </Row>
    <Table
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :border="true"
      height="670"
    >
    </Table>
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
import { NewProductReport as getList } from "@/api/Order";
import { filtersNewDate as filtersDate } from "@/libs/validator";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableLoading: false,
      listData: [],
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100,
      filters: {
        sku: "",
        SDatePaidPlatform: "",
        EDatePaidPlatform: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      selectionList: [],
      listColums: [
        {
          title: "sku",
          key: "sku",
          align: "center",
        },
        {
          title: "发网类型",
          key: "hairNetType",
          align: "center",
        },
        {
          title: "产品类型",
          key: "productType",
          align: "center",
        },
        {
          title: "上新时间",
          key: "launchDate",
          align: "center",
        },
        {
          title: "销量",
          key: "qty",
          align: "center",
        },
      ],
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      let filterQuery = [];
      let filterPay = filtersDate(
        "SDatePaidPlatform",
        _this.filters.SDatePaidPlatform,
        _this.filters.EDatePaidPlatform,
        "EDatePaidPlatform"
      );
      if (_this.filters.sku != "") {
        filterQuery.push({
          key: "sku",
          value: _this.filters.sku,
          option: "like",
          isAnd: "true",
        });
      }
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      if (filterPay) {
        if (filterPay.length > 0) {
          filterQuery = filterQuery.concat(filterPay);
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
          resData.data.forEach((item) => {
            item.importDate = dayjs(item.importDate).format("YYYY-MM-DD");
            item.launchDate = dayjs(item.launchDate).format("YYYY-MM-DD");
          });
          _this.tableLoading = false;
          _this.listData = resData.data;
          // _this.editVisible = true;
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err);
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
  mounted() {
    this.loadData();
  },
};
</script>