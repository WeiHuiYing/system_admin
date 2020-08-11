/* 2020 / 08 / 05
weihuiying
作废订单报表  */
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="20">
          <Form ref="formInline" label-position="right" :label-width="90" inline>
            <FormItem prop="plateform" label="平台">
              <Select
                v-model="filters.plateform"
                @on-change="changePlate"
                clearable
                style="width:200px"
              >
                <Option
                  v-for="(item,index) in plateList"
                  :key="index"
                  :label="item"
                  :value="item"
                >{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem prop="platformUserName" label="店铺">
              <Select
                :disabled="filters.plateform == ''? true : false"
                v-model="filters.platformUserName"
                clearable
                style="width:150px"
                multiple
              >
                <Option
                  v-for="(item,index) in shopList"
                  :key="index"
                  :label="item"
                  :value="item"
                >{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem prop="refNo" label="参考单号">
              <Input v-model="filters.refNo" placeholder="请输入参考单号"></Input>
            </FormItem>
            <FormItem prop="FkStart" label="付款开始时间">
              <DatePicker
                v-model="filters.FkStart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="FkEnd" label="付款结束时间">
              <DatePicker
                v-model="filters.FkEnd"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 150px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="loadFilter()"
                style="margin-right:5px"
                class="search-btn"
                type="primary"
              >搜索</Button>
              <Button @click="filtersData()" class="search-btn" type="primary">导出</Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="4"></Col>
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
import {
  CancelOrderReport as getList,
  GetPlateform,
  GetShop,
} from "@/api/Order";

import store from "@/store";
export default {
  data() {
    return {
      listColums: [
        {
          title: "参考号",
          key: "refNo",
        },
        {
          title: "sku",
          key: "trueSku",
        },
        {
          title: "数量",
          key: "trueQty",
          sortable: true,
        },
        {
          title: "平台",
          key: "plateform",
          sortable: true,
        },
        {
          title: "店铺",
          key: "platformUserName",
        },
        {
          title: "国家",
          key: "countryCode",
        },
        {
          title: "备注",
          key: "orderDesc",
        },
      ],
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      plateList: [],
      shopList: [],
      filters: {
        plateform: "",
        platformUserName: "",
        FkStart: "",
        FkEnd: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        page: _this.pageCurrent,
        pageSize: _this.pageSize,
      };
      getList(data)
        .then((res) => {
          console.log(res);
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadPlate() {
      let _this = this;
      let data = {};
      GetPlateform().then((res) => {
        _this.plateList = res.data;
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
    this.loadPlate();
  },
};
</script>

<style lang="less"></style>
