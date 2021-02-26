<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem label="交易号">
              <Input
                v-model="filters.transId"
                placeholder="请输入要搜索的交易号"
              ></Input>
            </FormItem>
            <FormItem label="账单号">
              <Input
                v-model="filters.transCode"
                placeholder="请输入要搜索的账单号"
              ></Input>
            </FormItem>
            <FormItem label="开始时间">
              <DatePicker
                v-model="filters.sDate"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 150px"
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
                style="width: 150px"
                clearable
              >
              </DatePicker>
            </FormItem>
            <FormItem :label-width="10">
              <Button
                style="margin-right: 10px"
                @click="loadFilter()"
                type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      :loading="tableLoading"
      stripe
    >
      <template slot-scope="{ row }" slot="isExpiry">
        <span v-if="row.isExpiry == 1">是</span>
        <span v-if="row.isExpiry == 0">否</span>
      </template>
    </Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
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
import { GetPaypalInfo as getList } from "@/api/finance";
import { filtersNewDate as filtersDate, fileToJson } from "@/libs/validator";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "交易号",
          key: "transId",
          width: "200",
        },
        {
          title: "账单号",
          key: "transCode",
          width: "200",
        },
        {
          title: "物品名称",
          key: "skuTitle",
          width: "200",
        },
        {
          title: "物品号",
          key: "sku",
          width: "200",
        },
        {
          title: "总额",
          key: "totalAmount",
          width: "200",
        },
        {
          title: "主题",
          key: "subject",
          width: "200",
        },
        {
          title: "状态",
          key: "status",
          width: "200",
        },
        {
          title: "运费和手续费金额",
          key: "shipFee",
          width: "200",
        },
        {
          title: "营业税",
          key: "salesFee",
          width: "200",
        },
        {
          title: "参考交易号",
          key: "refNo",
          width: "200",
        },
        {
          title: "paypal验证",
          key: "receiveStatus",
          width: "200",
        },
        {
          title: "收据号",
          key: "recNum",
          width: "200",
        },
        {
          title: "邮政编码",
          key: "postCode",
          width: "200",
        },
        {
          title: "联系电话号码",
          key: "phone",
          width: "200",
        },
        {
          title: "名称",
          key: "name",
          width: "200",
        },
        {
          title: "备注",
          key: "memo",
          width: "200",
        },
        {
          title: "保险金额",
          key: "insuranceFee",
          width: "200",
        },
        {
          title: "费用",
          key: "fee",
          width: "200",
        },
        {
          title: "名称",
          key: "eventType",
          width: "200",
        },
        {
          title: "时区",
          key: "dateArea",
          width: "200",
        },
        {
          title: "日期",
          key: "date",
          width: "200",
        },
        {
          title: "币种",
          key: "currency",
          width: "200",
        },
        {
          title: "收件人邮箱地址",
          key: "salerEmail",
          width: "200",
        },
        {
          title: "国家/地区",
          key: "country",
          width: "200",
        },
        {
          title: "城镇/城市",
          key: "city",
          width: "200",
        },
        {
          title: "洲",
          key: "state",
          width: "200",
        },
        {
          title: "发件人邮箱地址",
          key: "buyerEmail",
          width: "200",
        },
        {
          title: "余额",
          key: "balance",
          width: "200",
        },
        {
          title: "净额",
          key: "amount",
          width: "200",
        },
        {
          title: "地址状态",
          key: "addressStatus",
          width: "200",
        },
        {
          title: "收货地址",
          key: "address",
          width: "200",
        },
        {
          title: "地址第1行",
          key: "addressLine1",
          width: "200",
        },
        {
          title: "地址第2行/区/临近地区",
          key: "addressLine2",
          width: "200",
        },
      ],
      listData: [],
      filters: {
        transCode: "",
        transId: "",
        sDate: "",
        eDate: "",
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      uploadLoading: false,
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      let filtersquery = _this.filtersObj();
      let filterDate = filtersDate(
        "date",
        _this.filters.sDate,
        _this.filters.eDate,
        "date"
      );
      if (filterDate && filterDate.length > 0) {
        filtersquery = filtersquery.concat(filterDate);
      }
      let data = {
        query: filtersquery,
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          if (res.data.code == 200) {
            _this.listData = res.data.data;
            _this.pageTotal = res.data.totalCount;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          _this.tableLoading = false;
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
      Object.keys(_this.filters).forEach((keyItem) => {
        if (
          _this.filters[keyItem] &&
          _this.filters[keyItem] != "" &&
          keyItem != "sDate" &&
          keyItem != "eDate"
        ) {
          filterQuery.push({
            key: keyItem,
            value: _this.filters[keyItem],
            option: "lk",
            isAnd: "true",
          });
        }
      });
      return filterQuery;
    },
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
