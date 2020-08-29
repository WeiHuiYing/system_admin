/* 2020 / 08/ 14
weihuiying
营销订单统计报表  */
<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="80" inline>
            <FormItem label="上传时间">
              <DatePicker
                v-model="filters.CreateTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择上传时间"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem label="运单号">
              <Input clearable v-model="filters.ShippingNo" />
            </FormItem>
            <FormItem label="上传类型">
              <Input clearable v-model="filters.UploadType" />
            </FormItem>
            <FormItem label="仓库单号">
              <Select v-model="filters.WarehourseCode" style="width:200px" clearable>
                <Option
                  v-for="(item,index) in warehouseList"
                  :label="item.warehouseDesc"
                  :value="item.warehouseDesc"
                  :key="index"
                >{{ item.warehouseDesc }}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button
                @click="loadFilter()"
                style="margin-right:5px"
                class="search-btn"
                type="primary"
              >搜索</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColumns"
      stripe
    ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          :page-size="pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
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
import { GetUploadSheepFeeLog as getList } from "@/api/Order";
import { getList as getWare } from "@/api/ECWarehouse";
import { GetPlateform, GetShop } from "@/api/Order";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        CreateTime: "",
        WarehourseCode: "",
        ShippingNo: "",
        UploadType: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      listColumns: [
        {
          title: "上传时间",
          key: "createTime",
          width: "200",
        },
        {
          title: "仓库单号",
          key: "warehourseCode",
          width: "200",
        },
        {
          title: "运单号",
          key: "shippingNo",
          width: "200",
        },
        {
          title: "运费",
          key: "shippingFee",
          width: "200",
        },
        {
          title: "上传类型",
          key: "uploadType",
          width: "100",
        },
        {
          title: "币种",
          key: "currency",
          width: "200",
        },
        {
          title: "备注",
          key: "message",
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      warehouseList: [],
    };
  },
  computed: {
    statusList() {
      return this.$store.state.orderStatus;
    },
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj();
      data = {
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
        });
    },
    // 筛选条件字段拼接
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      if (_this.filters.CreateTime && _this.filters.CreateTime != "") {
        filterQuery.push({
          key: "CreateTime",
          binaryop: "eq",
          value: dayjs(_this.filters.CreateTime).format("YYYY-MM-DD"),
          andorop: "and",
        });
      }
      if (_this.filters.WarehourseCode && _this.filters.WarehourseCode != "") {
        filterQuery.push({
          key: "WarehourseCode",
          binaryop: "eq",
          value: _this.filters.WarehourseCode,
          andorop: "and",
        });
      }
      if (_this.filters.ShippingNo && _this.filters.ShippingNo != "") {
        filterQuery.push({
          key: "ShippingNo",
          binaryop: "like",
          value: _this.filters.ShippingNo,
          andorop: "and",
        });
      }
      if (_this.filters.UploadType && _this.filters.UploadType != "") {
        filterQuery.push({
          key: "UploadType",
          binaryop: "eq",
          value: _this.filters.UploadType,
          andorop: "and",
        });
      }
      return filterQuery;
    },
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    loadWare() {
      const _this = this;
      let data = {};
      getWare(data).then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          _this.warehouseList = resData.data;
        } else {
          this.$Message.error(resData.msg);
        }
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
    this.loadWare();
  },
};
</script>

<style lang="less" scoped>
</style>