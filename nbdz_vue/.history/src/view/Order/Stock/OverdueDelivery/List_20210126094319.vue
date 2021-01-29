<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="20">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="60"
            inline
          >
            <FormItem label="sku">
              <Input
                clearable
                class="search-input"
                v-model="filters.productSku"
              />
            </FormItem>
            <FormItem>
              <Button @click="loadFilter()" type="primary">搜索</Button>
              <Button @click="loadFilter()" type="primary">导出</Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="4">
          <Upload
            action=""
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :before-upload="importData"
          >
            <Button :loading="uploadLoading">导入库存表</Button>
          </Upload>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
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
import {
  getProductExpiryList as getList,
  exportProductExpiryList as exportList,
  importProductionSku as importList,
} from "@/api/order";
import { getWareList } from "@/api/public";
import store from "@/store";
export default {
  data() {
    return {
      listColums: [
        {
          title: "生产编号",
          key: "productionCode",
        },
        {
          title: "SKU",
          key: "sku",
        },
        {
          title: "品类",
          key: "productType",
        },
        {
          title: "生产日期",
          key: "productionDate",
        },
        {
          title: "逾期天数",
          key: "expiryDays",
        },
        {
          title: "未入库数量",
          key: "notInStorage",
        },
        {
          title: "是否逾期",
          key: "isExpiry",
        },
      ],
      listData: [],
      filters: {},
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      uploadLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      let filtersquery = [];
      let filtersSku = {};
      let filtersWare = {};
      if (_this.filters.productSku && _this.filters.productSku != "") {
        filtersSku = {
          key: "productSku",
          binaryop: "like",
          value: _this.filters.productSku,
          andorop: "and",
        };
        filtersquery.push(filtersSku);
      }
      if (_this.filters.warehouseId && _this.filters.warehouseId != "") {
        filtersWare = {
          key: "warehouseId",
          binaryop: "eq",
          value: _this.filters.warehouseId,
          andorop: "and",
        };
        filtersquery.push(filtersWare);
      }
      let data = {
        query: filtersquery,
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
      };
      getList(data)
        .then((res) => {
          if (res.data.code == 200) {
            _this.listData = res.data.data;
            _this.pageTotal = res.data.count;
          } else {
            this.$Message.error({
              content: res.data.msg,
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
    importData(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.uploadLoading = true;
      importList(formData)
        .then((res) => {
          _this.uploadLoading = false;
          _this.loadData();
          _this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
        })
        .catch((err) => {
          _this.uploadLoading = false;
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

<style lang="less"></style>
