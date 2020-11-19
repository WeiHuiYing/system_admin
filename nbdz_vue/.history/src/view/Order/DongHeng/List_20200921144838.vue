<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="20">
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            <FormItem label="产品SKU">
              <Input clearable class="search-input" v-model="filters.productSKU" />
            </FormItem>
            <FormItem>
              <Button @click="loadFilter()" class="search-btn" type="primary">搜索</Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="4">
          <Upload
            action="http://report.uniceextension.cn:8888/api/FinancialStatement/ImportDHCoust"
            name="excelFile"
            :headers="upHeaders"
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :on-success="handleSuccess"
          >
            <Button :loading="uploadLoading">导入东恒成本价</Button>
          </Upload>
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
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
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
import { GetDHCostList as getList } from "@/api/Order";
import store from "@/store";
export default {
  data() {
    return {
      filters: {
        productSKU: "",
      },
      listData: [],
      uploadLoading: false,
      upHeaders: {
        Authorization: "Bearer " + store.state.user.token,
      },
      listColumns: [
        {
          title: "月份",
          key: "month",
        },
        {
          title: "产品SKU",
          key: "productSKU",
        },
        {
          title: "价格",
          key: "price",
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let filtersQuery = [];
      if (_this.filters.productSKU && _this.filters.productSKU != "") {
        filtersQuery.push({
          key: "productSKU",
          binaryop: "like",
          value: _this.filters.productSKU,
          andorop: "and",
        });
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersQuery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          const resData = res.data;
          if (res.status == 200) {
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
          _this.tableLoading = false;
          console.log(err);
        });
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
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    handleSuccess(response, file, fileList) {
      let _this = this;
      if (response.code == 200) {
        _this.loadData();
        this.$Message.info({
          content: "上传成功",
          duration: 10,
          closable: true,
        });
      } else {
        this.$Message.error({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less">
</style>