/* 2020 / 09 / 09
weihuiying
三方订单明细报表  */
<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form ref="formInline" label-position="right" :label-width="120" inline>
            <FormItem label="产品信息（sku）">
              <Input clearable v-model="filters.ProductSku" />
            </FormItem>
            <FormItem label="发货仓库">
              <Select v-model="filters.wareHouseDesc" style="width:200px" clearable>
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
              <Button @click="filtersData()" class="search-btn" type="primary">更多筛选</Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="2">
          <Button @click="exportAll()" class="search-btn" type="primary">导出</Button>
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
    <Modal
      title="筛选"
      :mask-closable="false"
      v-model="modelFilters"
      width="90%"
      scrollable
      footer-hide
    >
      <Form ref="formInline" label-position="right" :label-width="150" inline>
        <FormItem label="参考单号">
          <Input clearable v-model="filters.RefNo" />
        </FormItem>
        <FormItem label="发货仓库">
          <Select v-model="filters.wareHouseDesc" style="width:200px" clearable>
            <Option
              v-for="(item,index) in warehouseList"
              :label="item.warehouseDesc"
              :value="item.warehouseDesc"
              :key="index"
            >{{ item.warehouseDesc }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="plateform" label="平台">
          <Select
            v-model="filters.plateform"
            @on-change="changePlate"
            clearable
            style="width:200px"
          >
            <Option
              v-for="(item,index) in plateList"
              :key="index"
              :label="item"
              :value="item"
            >{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="storeName" label="店铺">
          <Select
            :disabled="filters.plateform == ''? true : false"
            v-model="filters.storeName"
            clearable
            style="width:200px"
            multiple
          >
            <Option
              v-for="(item,index) in shopList"
              :key="index"
              :label="item"
              :value="item"
            >{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="FkStart" label="付款开始时间">
          <DatePicker
            v-model="filters.FkStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="FkEnd" label="付款结束时间">
          <DatePicker
            v-model="filters.FkEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="FhStart" label="发货开始时间">
          <DatePicker
            v-model="filters.FhStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="FhEnd" label="发货结束时间">
          <DatePicker
            v-model="filters.FhEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <div style="text-align:right;">
          <Button @click="filtersLoad()" class="search-btn" type="primary">搜索</Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  AmaOrderQuery as getList,
  AmaOrderQueryExport as exportReport,
} from "@/api/Order";
import { getList as getWare } from "@/api/ECWarehouse";
import { GetPlateform, GetShop } from "@/api/Order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      filters: {
        RefNo: "",
        plateform: "",
        storeName: "",
        wareHouseDesc: "",
        FkStart: "",
        FkEnd: "",
        FhStart: "",
        FhEnd: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      listColumns: [
        {
          title: "销售单号",
          key: "saleOrderCode",
          width: "200",
        },
        {
          title: "参考单号",
          key: "refNo",
          width: "200",
        },
        {
          title: "仓库单号",
          key: "qty",
          width: "80",
        },
        {
          title: "平台",
          key: "plateform",
          width: "200",
        },
        {
          title: "店铺",
          key: "storeName",
          width: "200",
        },
        {
          title: "付款时间",
          key: "spUnitPrice",
          width: "100",
        },
        {
          title: "发货时间",
          key: "status",
          width: "200",
        },
        {
          title: "最晚发货时间",
          key: "wareHouseDesc",
          width: "200",
        },
        {
          title: "订单状态",
          key: "warehouseOrderCode",
          width: "200",
        },
        {
          title: "仓库代码",
          key: "zSpUnitPrice",
          width: "100",
        },
        {
          title: "仓库名称",
          key: "zproductNetWeight",
          width: "150",
        },
        {
          title: "仓库运输方式代码",
          key: "countryName",
          width: "200",
        },
        {
          title: "跟踪号",
          key: "state",
          width: "200",
        },
        {
          title: "平台运输方式代码",
          key: "amountpaid",
          width: "80",
          sortable: true,
        },
        {
          title: "买家ID",
          key: "company",
          width: "200",
          sortable: true,
        },
        {
          title: "买家名称",
          key: "finalvaluefeeTotal",
          width: "200",
        },
        {
          title: "买家邮箱",
          key: "orderType",
          width: "200",
        },
        {
          title: "收件人国家二字码",
          key: "paypalTransactionId",
          width: "200",
        },
        {
          title: "地址",
          key: "procutCategoryName1",
          width: "200",
        },
        {
          title: "买家留言",
          key: "procutCategoryName2",
          width: "200",
        },
        {
          title: "paypal交易号",
          key: "procutCategoryName3",
          width: "200",
        },
        {
          title: "客服备注",
          key: "productNetWeight",
          width: "200",
        },
        {
          title: "订单总金额",
          key: "productNetWeight",
          width: "200",
        },
        {
          title: "订单SKU",
          key: "productNetWeight",
          width: "200",
        },
        {
          title: "子SKU",
          key: "productNetWeight",
          width: "200",
        },
        {
          title: "数量",
          key: "productNetWeight",
          width: "200",
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      modelFilters: false,
      warehouseList: [],
      plateList: [],
      shopList: [],
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
      let filterFk = _this.filtersDate(
        "FkStart",
        "FkEnd",
        _this.filters.FkStart,
        _this.filters.FkEnd
      );
      let filterFh = _this.filtersDate(
        "FhStart",
        "FhEnd",
        _this.filters.FhStart,
        _this.filters.FhEnd
      );
      if (filterFk && filterFh) {
        if (filterFk.length > 0) {
          filterQuery = filterQuery.concat(filterFk);
        }
        if (filterFh.length > 0) {
          filterQuery = filterQuery.concat(filterFh);
        }
      } else {
        return false;
      }
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
      if (_this.filters.RefNo && _this.filters.RefNo != "") {
        let RefNoObj = {
          key: "RefNo",
          binaryop: "like",
          value: _this.filters.RefNo,
          andorop: "and",
        };
        filterQuery.push(RefNoObj);
      }
      if (_this.filters.plateform && _this.filters.plateform != "") {
        let plateObj = {
          key: "plateform",
          binaryop: "eq",
          value: _this.filters.plateform,
          andorop: "and",
        };
        filterQuery.push(plateObj);
      }
      if (_this.filters.wareHouseDesc && _this.filters.wareHouseDesc != "") {
        let wareObj = {
          key: "wareHouseDesc",
          binaryop: "eq",
          value: _this.filters.wareHouseDesc,
          andorop: "and",
        };
        filterQuery.push(wareObj);
      }
      if (_this.filters.storeName && _this.filters.storeName != "") {
        let storeObj = {
          key: "storeName",
          binaryop: "eq",
          value: _this.filters.storeName,
          andorop: "and",
        };
        filterQuery.push(storeObj);
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
    loadPlate() {
      let _this = this;
      let data = {};
      GetPlateform().then((res) => {
        _this.plateList = res.data;
      });
    },
    changePlate() {
      let _this = this;
      GetShop(_this.filters.plateform)
        .then((res) => {
          _this.shopList = res.data;
        })
        .catch((err) => {
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
    exportAll() {
      let data = {};
      let _this = this;
      let filterQuery = _this.filtersObj();
      let filterFk = _this.filtersDate(
        "FkStart",
        "FkEnd",
        _this.filters.FkStart,
        _this.filters.FkEnd
      );
      let filterFh = _this.filtersDate(
        "FhStart",
        "FhEnd",
        _this.filters.FhStart,
        _this.filters.FhEnd
      );
      if (filterFk && filterFh) {
        if (filterFk.length > 0) {
          filterQuery = filterQuery.concat(filterFk);
        }
        if (filterFh.length > 0) {
          filterQuery = filterQuery.concat(filterFh);
        }
      } else {
        return false;
      }
      data = {
        query: filterQuery,
      };
      this.$Spin.show();
      exportReport(data).then((res) => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "三方仓库外部SKU成本计算报表.xlsx";
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
    filtersData() {
      let _this = this;
      _this.modelFilters = true;
    },
    filtersLoad() {
      let _this = this;
      _this.modelFilters = false;
      _this.pageCurrent = 1;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
    this.loadWare();
    this.loadPlate();
  },
};
</script>

<style lang="less" scoped>
</style>