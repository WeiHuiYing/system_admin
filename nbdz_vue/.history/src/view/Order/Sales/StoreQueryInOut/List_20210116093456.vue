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
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="发货结束时间">
            <DatePicker
              v-model="filters.eDate"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem>
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
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
  </div>
</template>

<script>
import { storeQueryInOut as getList } from "@/api/order";
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
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        sDate: "",
        eDate: "",
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
      if (!_this.currentPage) _this.currentPage = 1;
      let filtersquery = [];
      _this.filters.sDate =
        _this.filters.sDate && _this.filters.sDate !== ""
          ? _this.filters.sDate
          : dayjs().subtract(7, "day").format("YYYY-MM-DD");
      _this.filters.eDate =
        _this.filters.eDate && _this.filters.eDate !== ""
          ? _this.filters.eDate
          : dayjs().format("YYYY-MM-DD");

      if (
        !dayjs(_this.filters.eDate).isAfter(dayjs(_this.filters.sDate)) &&
        dayjs(_this.filters.eDate).diff(dayjs(_this.filters.sDate), "day") !=
          "0"
      ) {
        this.$Message.error({
          content: "结束时间在开始时间之后",
          duration: 10,
          closable: true,
        });
        return false;
      } else {
        filtersquery.push({
          key: "sDate",
          option: "eq",
          value: dayjs(_this.filters.startTime).format("YYYY-MM-DD"),
          isAnd: "true",
        });
        filtersquery.push({
          key: "sDate",
          option: "eq",
          value: dayjs(_this.filters.endTime).format("YYYY-MM-DD"),
          isAnd: "true",
        });
      }
      let data = {
        pageNum: _this.currentPage,
        pageSize: _this.pageSize,
        query: filtersquery,
      };
      getList(data)
        .then((res) => {
          let resData = res.data;
          if (resData.code == "200") {
            _this.listData = resData.data;
            _this.totalCount = resData.totalCount;
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
        filename: "国内海外仓发货占比报表",
      };
      excel.export_array_to_excel(params);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
