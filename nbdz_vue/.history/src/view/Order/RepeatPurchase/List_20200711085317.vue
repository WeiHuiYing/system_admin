<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            <FormItem label="平台">
              <Select
                v-model="filters.plateform"
                @on-change="changePlate"
                style="width:200px"
                clearable
              >
                <Option v-for="(item,index) in plateList" :value="item" :key="index">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="storeName" label="店铺">
              <Select
                :disabled="filters.plateform == ''? true : false"
                v-model="filters.storeName"
                clearable
                style="width:200px"
              >
                <Option
                  v-for="(item,index) in shopList"
                  :key="index"
                  :label="item"
                  :value="item"
                >{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem prop="dealMonth" label="处理月份">
              <DatePicker type="month" multiple placeholder="请选择处理月份" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem>
              <Button @click="loadFilter()" class="search-btn" type="primary">搜索</Button>
            </FormItem>
          </Form>
        </Col>
        <!-- <Col :span="2">
          <Upload
            action="http://8000.bitcoding.top:8888/api/FinancialStatement/ImportRepeatCust"
            name="excelFile"
            :headers="upHeaders"
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :on-success="handleSuccess"
          >
            <Button :loading="uploadLoading">导入</Button>
          </Upload>
        </Col>-->
        <Col :span="2">
          <Button @click="exprotData()" type="primary">导出</Button>
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
import {
  GetRepeatCustList as getList,
  GetShop,
  GetPlateform as getPlateform,
  ExportRepeatCust
} from "@/api/Order";
import store from "@/store";
export default {
  data() {
    return {
      filters: {
        plateform: "",
        storeName: ""
      },
      listData: [],
      plateList: [],
      shopList: [],
      uploadLoading: false,
      upHeaders: {
        Authorization: "Bearer " + store.state.user.token
      },
      listColumns: [
        {
          title: "平台",
          key: "plateForm"
        },
        {
          title: "店铺",
          key: "storeName"
        },
        {
          title: "处理月份",
          key: "dealMonth"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "平台编码",
          key: "plateFormCode"
        },
        {
          title: "金额",
          key: "amount"
        },
        {
          title: "付款时间",
          key: "fkDate",
          sortable: true
        },
        {
          title: "付款类型",
          key: "fkType"
        }
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let filtersQuery = _this.filtersObj();
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersQuery
      };
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          const resData = res.data;
          if (res.status == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    filtersObj() {
      let _this = this;
      let filtersQuery = [];
      if (_this.filters.plateform && _this.filters.plateform != "") {
        filtersQuery.push({
          key: "plateform",
          binaryop: "eq",
          value: _this.filters.plateform,
          andorop: "and"
        });
      }
      if (_this.filters.storeName && _this.filters.storeName != "") {
        filtersQuery.push({
          key: "storeName",
          binaryop: "eq",
          value: _this.filters.storeName,
          andorop: "and"
        });
      }
      return filtersQuery;
    },
    plateLoad() {
      let _this = this;
      getPlateform()
        .then(res => {
          if (res.status == 200) {
            _this.plateList = res.data;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePlate() {
      let _this = this;
      GetShop(_this.filters.plateform)
        .then(res => {
          _this.shopList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
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
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    handleSuccess(response, file, fileList) {
      let _this = this;
      if (response.code == 200) {
        _this.loadData();
        this.$Message.info({
          content: response.msg,
          duration: 10,
          closable: true
        });
      } else {
        this.$Message.error({
          content: response.msg,
          duration: 10,
          closable: true
        });
      }
    },
    // 导出复购数据
    exprotData() {
      let data = {};
      let _this = this;
      this.$Spin.show();
      let filterQuery = _this.filtersObj();
      data = {
        query: filterQuery
      };
      ExportRepeatCust(data).then(res => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel"
        });
        const fileName = "复购客户.xlsx";
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
    }
  },
  mounted() {
    this.loadData();
    this.plateLoad();
  }
};
</script>

<style lang="less">
</style>