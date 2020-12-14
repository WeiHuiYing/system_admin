<template>
  <div class="content-main">
    <div style="margin: 10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="20">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem prop="plateform" label="平台">
              <Select
                v-model="filters.plateform"
                @on-change="changePlate"
                clearable
                style="width: 200px"
              >
                <Option
                  v-for="(item, index) in plateList"
                  :key="index"
                  :label="item"
                  :value="item"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="storename" label="店铺">
              <Select
                :disabled="
                  !filters.plateform || filters.plateform == '' ? true : false
                "
                v-model="filters.storename"
                clearable
                style="width: 200px"
              >
                <Option
                  v-for="(item, index) in shopList"
                  :key="index"
                  :label="item"
                  :value="item"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="refno" label="参考单号">
              <Input clearable class="search-input" v-model="filters.refno" />
            </FormItem>
            <FormItem>
              <Button
                @click="loadData()"
                style="margin-right: 5px"
                class="search-btn"
                type="primary"
              >
                <Icon type="search" />&nbsp;&nbsp;搜索
              </Button>
              <Button @click="filtersData()" class="search-btn" type="primary">
                <Icon type="search" />&nbsp;&nbsp;更多筛选
              </Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="4">
          <Dropdown placement="bottom-start" @on-click="handleMenu">
            <Button type="primary">
              操作
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="exportAll">导出全部数据</DropdownItem>
              <DropdownItem name="exportPart">导出选中数据</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
      @on-selection-change="tableSelect"
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
    <Modal
      title="筛选"
      :mask-closable="false"
      v-model="modelFilters"
      width="90%"
      scrollable
      footer-hide
    >
      <Form ref="formInline" label-position="right" :label-width="100" inline>
        <FormItem prop="plateform" label="平台">
          <Select
            v-model="filters.plateform"
            @on-change="changePlate"
            clearable
            style="width: 150px"
          >
            <Option
              v-for="(item, index) in plateList"
              :key="index"
              :label="item"
              :value="item"
              >{{ item }}</Option
            >
          </Select>
        </FormItem>
        <FormItem prop="storename" label="店铺">
          <Select
            :disabled="
              !filters.plateform || filters.plateform == '' ? true : false
            "
            v-model="filters.storename"
            clearable
            style="width: 150px"
          >
            <Option
              v-for="(item, index) in shopList"
              :key="index"
              :label="item"
              :value="item"
              >{{ item }}</Option
            >
          </Select>
        </FormItem>
        <FormItem prop="warehousedesc" label="发货仓库">
          <Select
            v-model="filters.warehousedesc"
            clearable
            style="width: 150px"
          >
            <Option
              v-for="(item, index) in wareList"
              :key="index"
              :label="item.warehouseDesc"
              :value="item.warehouseDesc"
              >{{ item.warehouseDesc }}</Option
            >
          </Select>
        </FormItem>
        <FormItem prop="productsku" label="产品信息(sku)">
          <Input clearable class="search-input" v-model="filters.productsku" />
        </FormItem>
        <FormItem prop="procutcategoryname1" label="一级品类">
          <Select
            v-model="filters.procutcategoryname1"
            clearable
            style="width: 150px"
          >
            <Option value="假发">假发</Option>
            <Option value="服装">服装</Option>
          </Select>
        </FormItem>
        <FormItem prop="procutcategoryname2" label="二级品类">
          <Input
            clearable
            class="search-input"
            v-model="filters.procutcategoryname2"
          />
        </FormItem>
        <FormItem prop="ordertype" label="订单类型">
          <Select v-model="filters.ordertype" clearable style="width: 150px">
            <Option value>全部</Option>
            <Option value="正常销售订单">正常销售订单</Option>
            <Option value="重发订单">重发订单</Option>
            <Option value="线下订单">线下订单</Option>
            <Option value="营销订单">营销订单</Option>
            <Option value="补发订单">补发订单</Option>
          </Select>
        </FormItem>
        <FormItem prop="status" label="订单状态">
          <Select v-model="filters.status" clearable style="width: 150px">
            <Option value>全部</Option>
            <Option value="已废弃">已废弃</Option>
            <Option value="付款未完成">付款未完成</Option>
            <Option value="待发货审核">待发货审核</Option>
            <Option value="待发货">待发货</Option>
            <Option value="已发货">已发货</Option>
            <Option value="冻结中">冻结中</Option>
            <Option value="缺货">缺货</Option>
            <Option value="问题件">问题件</Option>
            <Option value="未付款">未付款</Option>
          </Select>
        </FormItem>
        <FormItem prop="refno" label="参考单号">
          <Input clearable class="search-input" v-model="filters.refno" />
        </FormItem>
        <FormItem prop="shippingstart" label="发货开始时间">
          <DatePicker
            v-model="filters.shippingstart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="shippingend" label="发货结束时间">
          <DatePicker
            v-model="filters.shippingend"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="paidstart" label="付款开始时间">
          <DatePicker
            v-model="filters.paidstart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="paidend" label="付款结束时间">
          <DatePicker
            v-model="filters.paidend"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="loandatestart" label="放款开始时间">
          <DatePicker
            v-model="filters.loandatestart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="loandateend" label="放款结束时间">
          <DatePicker
            v-model="filters.loandateend"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <div style="text-align: right">
          <Button @click="filtersLoad()" class="search-btn" type="primary"
            >搜索</Button
          >
        </div>
      </Form>
    </Modal>
    <Modal
      title="导出"
      :mask-closable="false"
      v-model="modelExport"
      width="90%"
      scrollable
      footer-hide
    >
      <exportModal
        @export="exportAll()"
        :keyList="listColumns"
        :parent="this"
      ></exportModal>
    </Modal>
  </div>
</template>

<script>
import exportModal from "@/components/exportModal/exportModal";
import {
  GetFinancialStatement as getList,
  GetPlateform,
  GetShop,
  ExportFinancialStatement as exportStatement,
} from "@/api/Order";
import { getList as getWare } from "@/api/ECWarehouse";
import { filtersNewDate as filtersDate } from "@/libs/validator";

import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  components: {
    exportModal,
  },
  data() {
    return {
      filters: {
        plateform: "",
        storename: "",
        warehousedesc: "",
        productsku: "",
        procutcategoryname1: "",
        procutcategoryname2: "",
        ordertype: "",
        status: "",
        shippingstart: "",
        shippingend: "",
        paidstart: "",
        paidend: "",
        loandatestart: "",
        loandateend: "",
        refno: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      listColumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "参考单号",
          key: "refno",
          width: "200",
        },
        {
          title: "订单状态",
          key: "status",
          width: "200",
        },
        {
          title: "销售单号",
          key: "saleordercode",
          width: "200",
        },
        {
          title: "订单类型",
          key: "ordertype",
          width: "200",
        },
        {
          title: "仓库位置",
          key: "warecountryname",
          width: "200",
        },
        {
          title: "发货仓库",
          key: "warehousedesc",
          width: "200",
        },
        {
          title: "产品信息",
          key: "productsku",
          width: "200",
        },
        {
          title: "产品类型",
          key: "productcategory",
          width: "200",
        },
        {
          title: "公司",
          key: "company",
          width: "200",
        },
        {
          title: "平台",
          key: "plateform",
          width: "200",
        },
        {
          title: "店铺",
          key: "storename",
          width: "200",
        },
        {
          title: "备注",
          key: "orderdesc",
          width: "200",
        },
        {
          title: "付款时间",
          key: "datepaidplatform",
          width: "200",
          sortable: true,
        },
        {
          title: "付款方式",
          key: "fkway",
          width: "200",
        },
        {
          title: "发货时间",
          key: "datewarehouseshipping",
          width: "200",
          sortable: true,
        },
        {
          title: "收货时间",
          key: "shdate",
          width: "200",
        },
        {
          title: "亚马逊商品sku",
          key: "amazonsku",
          width: "200",
        },
        {
          title: "商品成本",
          key: "spunitprice",
          width: "200",
        },
        {
          title: "商品总成本",
          key: "zspunitprice",
          width: "200",
        },
        {
          title: "仓库单号",
          key: "warehouseordercode",
          width: "200",
        },
        {
          title: "东恒成本价",
          key: "dhcost",
          width: "200",
        },
        {
          title: "产品重量(净重)",
          key: "productnetweight",
          width: "200",
        },
        {
          title: "产品重量(总重量净重)",
          key: "zproductnetweight",
          width: "200",
        },
        {
          title: "产品条数",
          key: "qty",
          width: "200",
        },
        {
          title: "交易id",
          key: "paypaltransactionid",
          width: "200",
        },
        {
          title: "币种",
          key: "currency",
          width: "200",
        },
        {
          title: "放款状态",
          key: "loantype",
          width: "200",
        },
        {
          title: "放款时间",
          key: "loandate",
          width: "200",
          sortable: true,
        },
        {
          title: "paypal状态",
          key: "paypaltype",
          width: "200",
        },
        {
          title: "订单总金额",
          key: "amountpaid",
          width: "200",
          sortable: true,
        },
        {
          title: "单价",
          key: "unitprice",
          width: "200",
          sortable: true,
        },
        {
          title: "订单美元金额",
          key: "amountpaidUSD",
          width: "200",
          sortable: true,
        },
        {
          title: "订单人民币金额",
          key: "amountpaidRMB",
          width: "200",
          sortable: true,
        },

        {
          title: "订单总金额拆分",
          key: "amountpaiditem",
          width: "200",
        },
        {
          title: "价格(公司未折扣前价格)",
          key: "companyamount",
          width: "200",
        },
        {
          title: "折扣金额",
          key: "discountamount",
          width: "200",
        },
        {
          title: "店铺佣金/手续费",
          key: "finalvaluefeetotal",
          width: "200",
        },
        {
          title: "店铺佣金/手续费(拆分)",
          key: "finalvaluefeetotalitem",
          width: "200",
        },
        {
          title: "联盟佣金",
          key: "alliancecommission",
          width: "200",
        },
        {
          title: "联盟佣金(拆分)",
          key: "alliancecommissionitem",
          width: "200",
        },
        {
          title: "税",
          key: "tax",
          width: "200",
        },
        {
          title: "实收物流费用",
          key: "shipfee",
          width: "200",
        },
        {
          title: "paypal手续费",
          key: "platformfeetotal",
          width: "200",
        },
        {
          title: "paypal手续费拆分",
          key: "platformfee",
          width: "200",
        },
        {
          title: "productsales",
          key: "productsales",
          width: "200",
        },
        {
          title: "shippingcredits",
          key: "shippingcredits",
          width: "200",
        },
        {
          title: "shippingCreditsTax",
          key: "shippingCreditsTax",
          width: "200",
        },
        {
          title: "sellingfees",
          key: "sellingfees",
          width: "200",
        },
        {
          title: "promotionalrebates",
          key: "promotionalrebates",
          width: "200",
        },
        {
          title: "fbafees",
          key: "fbafees",
          width: "200",
        },
        {
          title: "salestaxcollected",
          key: "salestaxcollected",
          width: "200",
        },
        {
          title: "othertransactionfees",
          key: "othertransactionfees",
          width: "200",
        },
        {
          title: "giftwrapcredits",
          key: "giftwrapcredits",
          width: "200",
        },
        {
          title: "marketplacefacilitatortax",
          key: "marketplacefacilitatortax",
          width: "200",
        },
        {
          title: "other",
          key: "other",
          width: "200",
        },
        {
          title: "收款金额",
          key: "receamount",
          width: "200",
        },
        {
          title: "收款金额拆分",
          key: "receamountitem",
          width: "200",
        },
        {
          title: "退款金额",
          key: "amountrefund",
          width: "200",
        },
        {
          title: "补偿金额",
          key: "makeamount",
          width: "200",
        },
        {
          title: "物流方式",
          key: "shipchannel",
          width: "200",
        },
        {
          title: "物流费用",
          key: "costshipfee",
          width: "200",
        },
        {
          title: "物流费用币种",
          key: "shipcurrency",
          width: "200",
        },
        {
          title: "快递单号",
          key: "shippingmethodno",
          width: "200",
        },
        {
          title: "购买人",
          key: "buyername",
          width: "200",
        },
        {
          title: "手机号",
          key: "phone",
          width: "200",
        },
        {
          title: "国家",
          key: "countryname",
          width: "200",
        },
        {
          title: "地区",
          key: "state",
          width: "200",
        },
        {
          title: "姓名",
          key: "name",
          width: "200",
        },
        {
          title: "地址",
          key: "adress",
          width: "200",
        },
        {
          title: "购买人邮箱",
          key: "buyermail",
          width: "200",
        },
        {
          title: "是否为9610数据",
          key: "ise",
          width: "200",
        },
        {
          title: "设计师",
          key: "persondevelopname",
          width: "200",
        },
        {
          title: "采购员",
          key: "personopratername",
          width: "200",
        },
        {
          title: "销售员",
          key: "personsellername",
          width: "200",
        },
        {
          title: "是否为复购客户",
          key: "isfg",
          width: "200",
        },
        {
          title: "是否对应上汇款信息",
          key: "ishk",
          width: "200",
        },
        {
          title: "是否是外购产品",
          key: "iswg",
          width: "200",
        },
        {
          title: "是否成本占比异常",
          key: "iscb",
          width: "200",
        },
        {
          title: "头程关税",
          key: "headtariff",
          width: "200",
        },
        {
          title: "补发类型",
          key: "bftype",
          width: "200",
        },
        {
          title: "补发原因",
          key: "bfmemo",
          width: "200",
        },
        {
          title: "小产品是否单独销售",
          key: "issm",
          width: "200",
        },
        {
          title: "亚马逊索赔收入",
          key: "amazonclaim",
          width: "200",
        },
        {
          title: "亚马逊索赔成本",
          key: "amazonclaimcost",
          width: "200",
        },
        {
          title: "亚马逊索赔编号",
          key: "amazonclaimno",
          width: "200",
        },
        {
          title: "成本占比",
          key: "costratio",
          width: "200",
        },
        {
          title: "订单成本占比",
          key: "ordercostratio",
          width: "200",
        },
        {
          title: "运费占比",
          key: "shipratio",
          width: "200",
        },
        {
          title: "净重占比",
          key: "netweightratio",
          width: "200",
        },
        {
          title: "paypal是否争议",
          key: "paypalargue",
          width: "200",
        },
        {
          title: "补差价",
          key: "bcamount",
          width: "200",
        },
        {
          title: "退差价",
          key: "tcamount",
          width: "200",
        },
        {
          title: "补运费",
          key: "byaamount",
          width: "200",
        },
        {
          title: "退运费",
          key: "tyaamount",
          width: "200",
        },
        {
          title: "销售类型",
          key: "saletype",
          width: "200",
        },
        {
          title: "是否发货",
          key: "isfh",
          width: "200",
        },
        {
          title: "品类",
          key: "procutcategoryname",
          width: "200",
        },
        {
          title: "品类1",
          key: "procutcategoryname1",
          width: "200",
        },
        {
          title: "品类2",
          key: "procutcategoryname2",
          width: "200",
        },
        {
          title: "品类3",
          key: "procutcategoryname3",
          width: "200",
        },
        {
          title: "毛利",
          key: "gross",
          width: "200",
        },
        {
          title: "毛利率",
          key: "grossrate",
          width: "200",
        },
        {
          title: "真实运费",
          key: "uploadshippingfee",
          width: "200",
        },
        {
          title: "真实运费币种",
          key: "uploadshippingcurrency",
          width: "200",
        },
        {
          title: "速卖通平台付款金额",
          key: "aliexpressamount",
          width: "200",
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      modelFilters: false,
      selectionList: [],
      plateList: [],
      wareList: [],
      shopList: [],
      modelExport: false,
      exportKey: {},
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj();
      let filterLoandate = filtersDate(
        "loandate",
        _this.filters.loandatestart,
        _this.filters.loandateend
      );
      let filterShipping = filtersDate(
        "datewarehouseshipping",
        _this.filters.shippingstart,
        _this.filters.shippingend
      );
      let filterPaid = filtersDate(
        "datepaidplatform",
        _this.filters.paidstart,
        _this.filters.paidend
      );
      if (filterLoandate && filterShipping && filterPaid) {
        if (filterLoandate.length > 0) {
          filterQuery = filterQuery.concat(filterLoandate);
        }
        if (filterShipping.length > 0) {
          filterQuery = filterQuery.concat(filterShipping);
        }
        if (filterPaid.length > 0) {
          filterQuery = filterQuery.concat(filterPaid);
        }
      } else {
        return false;
      }

      data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
        order: [
          {
            by: "saleordercode",
            order: "desc",
          },
          {
            by: "amountpaid",
            order: "desc",
          },
        ],
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
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      Object.keys(_this.filters).forEach((keyItem) => {
        if (
          _this.filters[keyItem] &&
          _this.filters[keyItem] != "" &&
          keyItem != "shippingstart" &&
          keyItem != "shippingend" &&
          keyItem != "paidstart" &&
          keyItem != "paidend" &&
          keyItem != "loandatestart" &&
          keyItem != "loandateend"
        ) {
          if (keyItem == "productsku" || keyItem == "procutcategoryname2") {
            filterQuery.push({
              key: keyItem,
              value: _this.filters[keyItem],
              option: "lk",
              isAnd: "true",
            });
          } else {
            filterQuery.push({
              key: keyItem,
              option: "eq",
              value: _this.filters[keyItem],
              isAnd: "true",
            });
          }
        }
      });
      return filterQuery;
    },
    selectLoad() {
      let _this = this;
      let data = {};
      GetPlateform().then((res) => {
        _this.plateList = res.data;
      });
      getWare(data).then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          _this.wareList = resData.data;
        } else {
          this.$Message.error(resData.msg);
        }
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
    filtersData() {
      let _this = this;
      _this.modelFilters = true;
    },
    filtersLoad() {
      let _this = this;
      _this.modelFilters = false;
      _this.loadData();
    },
    tableSelect(selection) {
      this.selectionList = selection;
    },
    handleMenu(name) {
      // 导出全部数据
      if (name == "exportAll") {
        this.modelExport = true;
        // this.exportAll();
        // 导出部分数据
      } else if (name == "exportPart") {
        this.exportPart();
      }
    },
    exportAll() {
      let data = {};
      let _this = this;
      let filterQuery = _this.filtersObj();
      let filterLoandate = filtersDate(
        "loandate",
        _this.filters.loandatestart,
        _this.filters.loandateend
      );
      let filterShipping = filtersDate(
        "datewarehouseshipping",
        _this.filters.shippingstart,
        _this.filters.shippingend
      );
      let filterPaid = filtersDate(
        "datepaidplatform",
        _this.filters.paidstart,
        _this.filters.paidend
      );
      if (filterLoandate && filterShipping && filterPaid) {
        if (filterLoandate.length > 0) {
          filterQuery = filterQuery.concat(filterLoandate);
        }
        if (filterShipping.length > 0) {
          filterQuery = filterQuery.concat(filterShipping);
        }
        if (filterPaid.length > 0) {
          filterQuery = filterQuery.concat(filterPaid);
        }
      } else {
        return false;
      }
      data = {
        query: filterQuery,
        export: _this.exportKey,
        order: [
          {
            by: "saleordercode",
            order: "desc",
          },
          {
            by: "amountpaid",
            order: "desc",
          },
        ],
      };
      this.$Spin.show();
      exportStatement(data)
        .then((res) => {
          _this.modelExport = false;
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "财务汇总报表.xlsx";
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
          this.$Spin.hide();
        });
    },
    exportPart() {
      let _this = this;
      if (_this.selectionList.length == 0) {
        this.$Message.error({
          content: "请选择需要导出的数据",
          duration: 10,
          closable: true,
        });
        return false;
      }
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      _this.listColumns
        .filter((item, index) => {
          return index != 0;
        })
        .forEach((item) => {
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
        data: this.selectionList,
        autoWidth: true,
        filename: "财务汇总报表",
      };
      excel.export_array_to_excel(params);
    },
  },
  mounted() {
    this.selectLoad();
  },
};
</script>

<style lang="less" scoped>
</style>