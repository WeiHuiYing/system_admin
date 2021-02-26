<template>
  <div class="content-main">
    <div style="margin-bottom: 10px">
      <Row>
        <Col :span="24">
          <Upload
            action=""
            accept=".xls, .xlsx"
            :before-upload="importExcel"
            :show-upload-list="false"
          >
            <Button type="primary">导入</Button>
          </Upload>
        </Col>
      </Row>
    </div>
    <Table
      :loading="tableLoading"
      :data="listData"
      :columns="listColumns"
      height="700"
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
  GetAmazonTransaction as getList,
  ImportAmazonTransaction,
} from "@/api/finance";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listData: [],
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listColumns: [
        {
          title: "订单编号",
          key: "orderID",
        },
        {
          title: "金额",
          key: "amount",
        },
        {
          title: "日期",
          key: "date",
        },
        {
          title: "付款详情",
          key: "paymentDetail",
        },
        {
          title: "付款类型",
          key: "paymentType",
        },
        {
          title: "商品名称",
          key: "productTitle",
        },
        {
          title: "数量",
          key: "quantity",
        },
        {
          title: "SKU",
          key: "sku",
        },
        {
          title: "交易类型",
          key: "transactionType",
        },
      ],
      tableLoading: false,
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
    };
  },
  methods: {
    loadData() {
      const _this = this;
      let filterQuery = [];
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      getList(data)
        .then((res) => {
          const resData = res.data;
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
    changePage(val) {
      const _this = this;
      _this.pageCurrent = val;
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
    },
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.tableLoading = true;
      ImportAmazonTransaction(formData)
        .then((res) => {
          _this.tableLoading = false;
          _this.loadData();
          _this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err.response);
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
      return false;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>