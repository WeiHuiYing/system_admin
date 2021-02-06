/* 2021 / 02/ 06
weihuiying
产品邮件发送
  */
<template>
  <div>
    <Row style="margin-bottom: 10px">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="平台单号">
            <Input
              v-model="filters.saleOrderCode"
              placeholder="请输入平台单号"
              style="width: 150px"
            />
          </FormItem>
          <FormItem label="客户姓名">
            <Input
              v-model="filters.buyerName"
              placeholder="请输入客户姓名"
              style="width: 150px"
            />
          </FormItem>
          <FormItem :label-width="10">
            <Button
              style="margin-right: 10px"
              @click="loadData('filter')"
              type="primary"
            >
              搜索
            </Button>
            <Button
              @click="
                () => {
                  this.codeVisible = true;
                }
              "
              type="primary"
            >
              邮件发送
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Upload
          action=""
          accept=".xls, .xlsx"
          :show-upload-list="false"
          :before-upload="importExcel"
        >
          <Button :loading="importLoading" type="primary">导入</Button>
        </Upload>
      </Col>
    </Row>
    <Table
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :border="true"
      height="700"
    >
      <template slot-scope="{ row }" slot="isSend">
        <span v-show="row.isSend == 1">是</span>
        <span v-show="row.isSend == 0">否</span>
      </template>
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
    <Modal @on-ok="handleSend()" v-model="codeVisible" title="邮件编号">
      <Form label-position="right" :label-width="120">
        <FormItem label="默认邮件编号">
          <RadioGroup v-model="codeObj.isDefault">
            <Radio :label="1">是</Radio>
            <Radio :label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem v-if="codeObj.isDefault == 0" label="邮件编号">
          <Input v-model="codeObj.tempId" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { GetUndelivered as getList, UploadSku, SendMail } from "@/api/magento";
export default {
  data() {
    return {
      tableLoading: false,
      codeVisible: false,
      codeObj: {
        isDefault: "",
        tempId: "",
      },
      listData: [],
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100,
      selectionList: [],
      listColums: [
        {
          title: "平台单号",
          key: "saleOrderCode",
          align: "center",
          width: 200,
        },
        {
          title: "跟踪号",
          key: "refNo",
          align: "center",
          width: 200,
        },
        {
          title: "付款日期",
          key: "datePaidPlatform",
          align: "center",
          width: 200,
        },
        {
          title: "客户姓名",
          key: "buyerName",
          align: "center",
          width: 200,
        },
        {
          title: "客户邮箱",
          key: "buyerMail",
          align: "center",
          width: 200,
        },
        {
          title: "客户地址",
          key: "address",
          align: "center",
          width: 200,
        },
        {
          title: "客户电话",
          key: "address",
          align: "center",
          width: 200,
        },
        {
          title: "SKU",
          key: "sku",
          align: "center",
          width: 200,
        },
        {
          title: "商品名称",
          key: "title",
          align: "center",
          width: 200,
        },
        {
          title: "是否已发送",
          key: "isSend",
          align: "center",
          slot: "isSend",
          width: 200,
        },
      ],
      importLoading: false,
      filters: {
        buyerName: "",
        saleOrderCode: "",
      },
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      let filterQuery = _this.filtersObj();
      if (type && type == "filter") {
        _this.pageCurrent = 1;
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
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        })
        .catch((err) => {
          _this.tableLoading = false;
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
    handleSend() {
      const _this = this;
      let filterQuery = _this.filtersObj();
      let params = {
        data: {
          query: filterQuery,
        },
      };
      if (_this.codeObj.isDefault == 0) {
        params.tempId = _this.codeObj.tempId;
      }
      _this.tableLoading = true;
      _this.codeVisible = false;
      SendMail(data)
        .then((res) => {
          this.$Message.success({
            content: "成功",
            duration: 10,
            closable: true,
          });
          _this.loadData();
        })
        .catch((err) => {
          _this.tableLoading = false;
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
      Object.keys(_this.filters).forEach((key) => {
        if (_this.filters[key] && _this.filters[key] != "") {
          filterQuery.push({
            key,
            binaryop: "lk",
            value: _this.filters[key],
            andorop: "and",
          });
        }
      });
      return filterQuery;
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
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.importLoading = true;
      UploadSku(formData)
        .then((res) => {
          _this.importLoading = false;
          this.$Message.success({
            content: "成功",
            duration: 10,
            closable: true,
          });
          _this.loadData();
        })
        .catch((err) => {
          _this.importLoading = false;
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