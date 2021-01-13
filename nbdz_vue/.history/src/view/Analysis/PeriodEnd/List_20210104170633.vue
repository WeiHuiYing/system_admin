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
          <FormItem prop="month" label="月份">
            <DatePicker
              :options="dateOptions"
              type="month"
              v-model="filters.month"
              placeholder="请选择月份"
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
        month: "",
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
      if (_this.filters.month && _this.filters.month != "") {
        let params = {
          method: "GET",
          data: {
            pageNum: _this.currentPage,
            pageSize: _this.pageSize,
            month: dayjs(_this.filters.month).format("YYYY-MM"),
          },
        };
        getList(params)
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
      }
    },
  },
};
</script>

<style lang="less"></style>
