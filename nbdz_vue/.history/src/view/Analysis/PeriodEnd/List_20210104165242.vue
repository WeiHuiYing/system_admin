/*  
  2021 / 01/ 04
  weihuiying
  期末库存 
*/
<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="24">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="发货开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="发货结束时间">
            <DatePicker
              v-model="filters.endTime"
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
import { execPeriodEnd as getList } from "@/api/Analysis";
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
        startTime: "",
        endTime: "",
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
