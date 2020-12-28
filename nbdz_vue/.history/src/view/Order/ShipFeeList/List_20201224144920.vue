<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="订单编号">
            <Input v-model="filters.refNo" placeholder="请输入订单编号"></Input>
          </FormItem>
          <FormItem label="物流单号">
            <Input
              v-model="filters.shipNo"
              placeholder="请输入物流单号"
            ></Input>
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
        <Button @click="exportExcel()" type="primary">导出</Button>
      </Col>
    </Row>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      :loading="tableLoading"
      v-bind:columns="listColums"
      stripe
    >
    </Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="totalCount"
          :current="currentPage"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
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
  getShipFeeList as getList,
  exportShipFeeList as exportData,
} from "@/api/Order";
export default {
  data() {
    return {
      listColums: [
        {
          title: "平台单号（仓库单号）",
          key: "plateFormCode",
          align: "center",
          width: 100,
        },
        {
          title: "订单编号（参考号）",
          key: "refNo",
          align: "center",
          width: 100,
        },
        {
          title: "公司",
          key: "companyName",
          align: "center",
          width: 200,
        },
        {
          title: "平台",
          key: "platform",
          align: "center",
          width: 200,
        },
        {
          title: "店铺",
          key: "storeName",
          align: "center",
          width: 200,
        },
        {
          title: "发货仓库",
          key: "wareHouseDesc",
          align: "center",
          width: 120,
        },
        {
          title: "产品信息",
          key: "productSku",
          align: "center",
          width: 100,
        },
        {
          title: "产品重量(净重)",
          key: "productNetWeight",
          align: "center",
          width: 100,
        },
        {
          title: "产品重量(总重量净重)",
          key: "productNetWeightTotal",
          align: "center",
          width: 100,
        },
        {
          title: "产品条数产品条数",
          key: "orderQty",
          align: "center",
          width: 100,
        },
        {
          title: "订单总金额",
          key: "amountPaid",
          align: "center",
          width: 100,
        },
        {
          title: "称重机重量",
          key: "czWeight",
          align: "center",
          width: 100,
        },
        {
          title: "货代名称",
          key: "forwardName",
          align: "center",
          width: 100,
        },
        {
          title: "账单日期",
          key: "billingDate",
          align: "center",
          width: 100,
        },
        {
          title: "提货日期",
          key: "deliveryDate",
          align: "center",
          width: 100,
        },
        {
          title: "运输方式",
          key: "shipMethod",
          align: "center",
          width: 100,
        },
        {
          title: "追踪号",
          key: "shipNo",
          align: "center",
          width: 100,
        },
        {
          title: "出发地",
          key: "fromArea",
          align: "center",
          width: 100,
        },
        {
          title: "目的国家",
          key: "toArea",
          align: "center",
          width: 100,
        },
        {
          title: "件数",
          key: "qty",
          align: "center",
          width: 100,
        },
        {
          title: "货物品类",
          key: "style",
          align: "center",
          width: 100,
        },
        {
          title: "实重(KG)",
          key: "trueWeight",
          align: "center",
          width: 100,
        },
        {
          title: "材积重(KG)",
          key: "volumeWeight",
          align: "center",
          width: 100,
        },
        {
          title: "计费重量(KG)",
          key: "billingWeight",
          align: "center",
          width: 100,
        },
        {
          title: "应收费用",
          key: "receivableFee",
          align: "center",
          width: 100,
        },
        {
          title: "挂号费",
          key: "registrationFee",
          align: "center",
          width: 100,
        },
        {
          title: "偏远费",
          key: "longWayFee",
          align: "center",
          width: 100,
        },
        {
          title: "改址费",
          key: "changAddressFee",
          align: "center",
          width: 100,
        },
        {
          title: "燃油附加费",
          key: "fuelFee",
          align: "center",
          width: 100,
        },
        {
          title: "旺季附加费",
          key: "busyFee",
          align: "center",
          width: 100,
        },
        {
          title: "私人住址费",
          key: "personalAddressFee",
          align: "center",
          width: 100,
        },
        {
          title: "关税",
          key: "tariff",
          align: "center",
          width: 100,
        },
        {
          title: "补差价",
          key: "refund",
          align: "center",
          width: 100,
        },
        {
          title: "杂费",
          key: "otherFee",
          align: "center",
          width: 100,
        },
        {
          title: "总金额",
          key: "totalAmount",
          align: "center",
          width: 100,
        },
        {
          title: "币种",
          key: "currency",
          align: "center",
          width: 100,
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          width: 100,
        },
        {
          title: "电话",
          key: "phone",
          align: "center",
          width: 100,
        },
        {
          title: "国家",
          key: "countryName",
          align: "center",
          width: 100,
        },
        {
          title: "州",
          key: "state",
          align: "center",
          width: 100,
        },
        {
          title: "收货人",
          key: "name",
          align: "center",
          width: 100,
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          width: 100,
        },
        {
          title: "邮箱",
          key: "buyerMail",
          align: "center",
          width: 100,
        },
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        refNo: "",
        shipNo: "",
      },
      tableLoading: false,
    };
  },
  methods: {
    loadData(type) {
      let _this = this;
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let filtersquery = this.filtersObj();
      let data = {
        pageNum: _this.currentPage,
        pageSize: _this.pageSize,
        query: filtersquery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          let resData = res.data;
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
          _this.tableLoading = false;
          console.log(err);
        });
    },
    // 筛选条件字段拼接
    filtersObj() {
      const _this = this;
      let filterQuery = [];
      Object.keys(_this.filters).forEach((keyItem) => {
        if (_this.filters[keyItem] && _this.filters[keyItem] != "") {
          filterQuery.push({
            key: keyItem,
            option: "lk",
            value: _this.filters[keyItem],
            isAnd: "true",
          });
        }
      });
      return filterQuery;
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
    exportExcel() {
      const _this = this;
      let filtersquery = this.filtersObj();
      let data = {
        query: filtersquery,
      };
      _this.tableLoading = true;
      exportData(data).then((res) => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "运费对账分析报表.xlsx";
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
        _this.tableLoading = false;
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

