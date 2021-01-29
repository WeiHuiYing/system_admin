/* 20201 / 01/ 20
weihuiying
综合站报表_发货及拆分单量查询  */
<template>
  <div>
    <Row style="margin-bottom: 10px">
      <Col style="text-align: right" :span="24"
        ><Button style="margin-right: 5px" @click="exportData()" type="primary"
          >导出</Button
        ></Col
      >
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
import { GetCountShip as getList } from "@/api/magento";
import dayjs from "dayjs";
import { filtersLogDate as filtersDate } from "@/libs/validator";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      tableLoading: false,
      listData: [],
      listColumns: [
        {
          title: "月份",
          key: "month",
          align: "center",
        },
        {
          title: "发货单量",
          key: "shipCount",
          align: "center",
        },
        {
          title: "拆分单量",
          key: "splitCount",
          align: "center",
        },
      ],
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
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
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
      _this.listColumns.forEach((item) => {
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
        filename: "发货及拆分单量查询",
      };
      excel.export_array_to_excel(params);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>