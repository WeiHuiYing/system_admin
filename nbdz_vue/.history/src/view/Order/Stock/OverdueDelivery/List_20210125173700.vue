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
            <FormItem label="仓库">
              <Select
                v-model="filters.warehouseId"
                style="width: 200px"
                clearable
              >
                <Option
                  v-for="item in warehouseList"
                  :value="item.warehouseId"
                  :key="item.warehouseId"
                  >{{ item.warehouseDesc }}</Option
                >
              </Select>
            </FormItem>
            <FormItem>
              <Button @click="loadFilter()" class="search-btn" type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
        </Col>
        <Col :span="4">
          <Upload
            action="http://report.uniceextension.cn:8888/api/BnsUsBaseInventory/import/"
            name="excelFile"
            :headers="upHeaders"
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :on-success="handleSuccess"
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
          title: "数量",
          key: "qty",
        },
        {
          title: "标签",
          key: "tagType",
        },
        {
          title: "sku",
          key: "productSku",
        },
      ],
      listData: [],
      filters: {
        productSku: "",
        warehouseId: "",
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      warehouseList: [],
      uploadLoading: false,
      upHeaders: {
        Authorization: "Bearer " + store.state.user.token,
      },
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
    loadWare() {
      let _this = this;
      let data = {};
      getWareList(data)
        .then((res) => {
          if (res.data.code == 200) {
            _this.warehouseList = res.data.data;
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
    handleSuccess(response, file, fileList) {
      if (response.code == 200) {
        this.loadData();
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
    this.loadWare();
  },
};
</script>

<style lang="less"></style>
