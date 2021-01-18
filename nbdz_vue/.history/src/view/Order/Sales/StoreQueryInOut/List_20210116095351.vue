/*  2020 / 10/ 06
weihuiying
国内海外仓发货占比 */
<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="24">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="发货开始时间">
            <DatePicker
              v-model="filters.sDate"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 150px"
            ></DatePicker>
          </FormItem>
          <FormItem label="发货结束时间">
            <DatePicker
              v-model="filters.eDate"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 150px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="platform" label="平台">
            <Select
              v-model="filters.platform"
              @on-change="changePlate"
              clearable
              style="width: 150px"
            >
              <Option
                v-for="(item, index) in plateList"
                :key="index"
                :label="item"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
          </FormItem>
          <FormItem prop="storeName" label="店铺">
            <Select
              :disabled="
                !filters.platform || filters.platform == '' ? true : false
              "
              v-model="filters.storeName"
              clearable
              style="width: 150px"
              multiple
            >
              <Option
                v-for="(item, index) in shopList"
                :key="index"
                :label="item"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
          </FormItem>
          <FormItem :label-width="10">
            <Button style="margin-right: 5px" @click="loadData()" type="primary"
              >搜索</Button
            >
            <Button
              style="margin-right: 5px"
              @click="exportList()"
              type="primary"
              >导出</Button
            >
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Table
      ref="tables"
      border
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :loading="tableLoading"
    ></Table>
  </div>
</template>

<script>
import { storeQueryInOut as getList } from "@/api/order";
import { filtersNewDateTime as filtersDateTime } from "@/libs/validator";
import { GetPlateform, GetShop } from "@/api/public";
import excel from "@/libs/excel";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "项目",
          key: "item",
          align: "center",
        },
        {
          title: "平台",
          key: "platform",
          align: "center",
        },
        {
          title: "店铺",
          key: "storeName",
          align: "center",
        },
        {
          title: "销量",
          key: "saleQty",
          align: "center",
        },
        {
          title: "占比",
          key: "rate",
          align: "center",
        },
      ],
      listData: [],
      filters: {
        sDate: "",
        eDate: "",
        platform: "",
        storeName: [],
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      tableLoading: false,
      plateList: [],
      shopList: [],
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.currentPage) _this.currentPage = 1;
      let filterQuery = _this.filtersObj();
      _this.filters.sDate =
        _this.filters.sDate && _this.filters.sDate !== ""
          ? _this.filters.sDate
          : dayjs().subtract(7, "day").format("YYYY-MM-DD");
      _this.filters.eDate =
        _this.filters.eDate && _this.filters.eDate !== ""
          ? _this.filters.eDate
          : dayjs().format("YYYY-MM-DD");
      let filterDate = filtersDateTime(
        "sDate",
        _this.filters.sDate,
        _this.filters.eDate,
        "eDate"
      );
      filterQuery = [...filterQuery, ...filterDate];
      let data = {
        pageNum: _this.currentPage,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          let resData = res.data;
          if (resData.code == "200") {
            _this.listData = resData.data;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
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
    },

    filtersObj() {
      let _this = this;
      let filterQuery = [];
      Object.keys(_this.filters).forEach((keyItem) => {
        if (keyItem == "platform" && _this.filters[keyItem] != "") {
          filterQuery.push({
            key: keyItem,
            value: _this.filters[keyItem],
            option: "eq",
            isAnd: "true",
          });
        } else if (keyItem == "storeName" && _this.filters[keyItem] != []) {
          filterQuery.push({
            key: keyItem,
            value: _this.filters[keyItem],
            option: "in",
            isAnd: "true",
          });
        }
      });
      return filterQuery;
    },
    // 导出功能
    exportList() {
      let _this = this;
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      _this.listColums.forEach((item) => {
        if (item.children) {
          item.children.forEach((child) => {
            let children = {};
            children.title = item.title + "|" + child.title;
            children.key = child.key;
            columnsArr.push(children);
          });
        } else {
          columnsArr.push(item);
        }
      });
      titleArr = columnsArr.map((item) => {
        return item.title;
      });
      keyArr = columnsArr.map((item) => {
        return item.key;
      });
      const params = {
        title: titleArr,
        key: keyArr,
        data: this.listData,
        autoWidth: true,
        filename: "国内海外仓发货占比报表(店铺)",
      };
      excel.export_array_to_excel(params);
    },
    selectLoad() {
      let _this = this;
      let data = {};
      GetPlateform().then((res) => {
        _this.plateList = res.data;
      });
    },
    changePlate() {
      let _this = this;
      GetShop(_this.filters.platform)
        .then((res) => {
          _this.shopList = res.data;
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
  },
  mounted() {
    this.loadData();
    this.selectLoad();
  },
};
</script>

<style lang="less"></style>
