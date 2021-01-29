/* 20201 / 01/ 20
weihuiying
平均成本及重量查询  */
<template>
  <div>
    <Row style="margin-bottom: 10px">
      <Col :span="22">
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
          <FormItem :label-width="10">
            <Button
              style="margin-right: 5px"
              @click="loadData()"
              type="primary"
            >
              搜索
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col style="text-align: right" :span="2">
        <Button style="margin-right: 5px" @click="exportData()" type="primary">
          导出
        </Button>
      </Col>
    </Row>
    <Table
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColumns"
      stripe
      :border="true"
    >
    </Table>
  </div>
</template>

<script>
import { GetAvgCostList as getList } from "@/api/magento";
import dayjs from "dayjs";
import { filtersNewDateTime as filtersDateTime } from "@/libs/validator";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      tableLoading: false,
      listData: [],
      listColumns: [
        {
          title: "总成本",
          key: "totalCost",
          align: "center",
        },
        {
          title: "总重量",
          key: "totalWeight",
          align: "center",
        },
        {
          title: "总数量",
          key: "qty",
          align: "center",
        },
        {
          title: "平均成本",
          key: "avgCost",
          align: "center",
        },
        {
          title: "平均重量",
          key: "avgWeight",
          align: "center",
        },
      ],
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      filters: {
        sDate: "",
        eDate: "",
      },
    };
  },
  computed: {
    amazonStore() {
      return this.$store.state.amazonStore;
    },
  },
  methods: {
    loadData(type) {
      const _this = this;
      let filterQuery = [];
      let filterDate = filtersDateTime(
        "sDate",
        _this.filters.sDate,
        _this.filters.eDate,
        "eDate"
      );

      filterQuery = [...filterQuery, ...filterDate];
      let data = {
        query: filterQuery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          _this.listData = resData.data;
        })
        .catch((err) => {
          _this.tableLoading = false;
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
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    exportData() {
      const _this = this;
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      _this.listColumns
        .filter((item, index) => {
          return index != 0;
        })
        .forEach((item) => {
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
        filename: "平均成本及重量查询",
      };
      excel.export_array_to_excel(params);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>