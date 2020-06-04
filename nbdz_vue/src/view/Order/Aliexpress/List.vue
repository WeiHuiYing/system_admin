<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="60" inline>
            <FormItem label="店铺">
              <Select v-model="upData.shopName" style="width:200px" clearable>
                <Option v-for="(item,index) in shopList" :value="item" :key="index">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Upload
                :action="'http://8000.bitcoding.top:8888/api/FinancialStatement/ImportAliLoan?shopName='+upData.shopName"
                name="excelFile"
                :headers="upHeaders"
                accept=".xls, .xlsx"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :before-upload="handleUpload"
              >
                <Button :loading="uploadLoading">导入速卖通放款信息</Button>
              </Upload>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
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
import { GetShop as getShopList } from "@/api/Order";

import store from "@/store";
export default {
  data() {
    return {
      listColums: [
        {
          title: "平台单号",
          key: "plateformCode"
        },
        {
          title: "店铺",
          key: "storeName"
        },
        {
          title: "放款时间",
          key: "fkDATE",
          sortable: true
        },
        {
          title: "业务类型",
          key: "fkType"
        },
        {
          title: "币种",
          key: "currency"
        },
        {
          title: "放款金额",
          key: "fkAmount"
        }
      ],
      listData: [],
      upData: {
        shopName: ""
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      shopList: [],
      uploadLoading: false,
      upHeaders: {
        Authorization: "Bearer " + store.state.user.token
      }
    };
  },
  methods: {
    loadShop() {
      let _this = this;
      getShopList()
        .then(res => {
          if (res.status == 200) {
            _this.shopList = res.data;
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
    handleUpload() {
      let _this = this;
      if (_this.upData.shopName == "") {
        this.$Message.error({
          content: "请选择店铺",
          duration: 10,
          closable: true
        });
        return false;
      } else {
        return true;
      }
    },
    handleSuccess(response, file, fileList) {
      let _this = this;
      if (response.code == 200) {
        _this.listData = response.data;
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
    }
  },
  mounted() {
    this.loadShop();
  }
};
</script>

<style lang="less"></style>
