/* 2020 / 12 / 01
weihuiying
亚马逊人员销售占比  */
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem label="发货开始时间">
              <DatePicker
                v-model="filters.fhStart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem label="发货结束时间">
              <DatePicker
                v-model="filters.fhEnd"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button @click="loadFilters()" class="search-btn" type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      height="700"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      border
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
import { AmazonSellerRate as getList } from "@/api/amazon";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "店铺",
          key: "storeName",
        },
        {
          title: "销售人员",
          key: "personSellerName",
        },
        {
          title: "占比",
          key: "rate",
        },
      ],
      listData: [],
      filters: {
        fhEnd: "",
        fhStart: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (_this.filters.fhEnd && _this.filters.fhEnd != "") {
        _this.filters.fhEnd = dayjs(_this.filters.fhEnd).format("YYYY-MM-DD");
      } else {
        _this.filters.fhEnd = dayjs().format("YYYY-MM-DD");
      }
      if (_this.filters.fhStart && _this.filters.fhStart != "") {
        if (
          !dayjs(_this.filters.fhEnd).isAfter(dayjs(_this.filters.fhStart)) &&
          dayjs(_this.filters.fhEnd).diff(
            dayjs(_this.filters.fhStart),
            "day"
          ) != "0"
        ) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true,
          });
          return false;
        }
        _this.filters.fhStart = dayjs(_this.filters.fhStart).format(
          "YYYY-MM-DD"
        );
      } else {
        _this.filters.fhStart = dayjs().subtract(7, "day").format("YYYY-MM-DD");
      }
      let data = {
        page: _this.pageCurrent,
        page_size: _this.pageSize,
      };
      data = Object.assign(data, _this.filters);
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          console.log(res);
          const resData = res.data;
          _this.tableLoading = false;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        })
        .catch((err) => {
          _this.tableLoading = false;
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    loadFilters() {
      this.pageCurrent = 1;
      this.loadData();
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      const _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    exportData() {
      let _this = this;
      let data = {};
      data = Object.assign(data, _this.filters);
      _this.tableLoading = true;
      exportList(data).then((res) => {
        console.log(res);
        _this.tableLoading = false;
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "亚马逊库存报表.xlsx";
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
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
