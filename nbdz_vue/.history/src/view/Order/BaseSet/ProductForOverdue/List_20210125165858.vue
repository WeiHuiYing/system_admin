<template>
  <div>
    <Table
      :loading="tableLoading"
      v-bind:columns="tableColumns"
      :data="tableData"
      stripe
      height="700"
    >
      <template slot-scope="{ row }" slot="expiryDays">
        <Input v-if="row.isEdit" v-model="row.expiryDays" clearable></Input>
        <span v-else>{{ row.expiryDays }}</span>
      </template>
      <template slot-scope="{ row }" slot="dealTime">
        <DatePicker
          v-if="row.isEdit"
          v-model="row.dealTime"
          type="datetime"
          :options="dateOptions"
          placeholder="请选择开始时间"
          style="width: 200px"
          clearable
          format="yyyy-MM-dd HH:mm:ss"
        ></DatePicker>
        <span v-else>{{ row.dealTime }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          v-if="row.isEdit"
          type="primary"
          size="small"
          @click="saveRow(row, index)"
          style="margin-right: 5px"
          >保存</Button
        >
        <Button
          v-else
          type="primary"
          size="small"
          @click="editRow(row, index)"
          style="margin-right: 5px"
          >编辑</Button
        >
      </template>
    </Table>
  </div>
</template>

<script>
import { ProductForDays, EditProductForDays } from "@/api/order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableLoading: false,
      tableColumns: [
        {
          title: "产品品类",
          key: "type",
        },
        {
          title: "逾期天数",
          key: "expiryDays",
          slot: "expiryDays",
        },
        {
          title: "处理日期",
          key: "dealTime",
          slot: "dealTime",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      tableData: [],
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      let filterQuery = [];
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      ProductForDays(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          _this.tableData = resData.data;
        })
        .catch((err) => {
          _this.tableLoading = false;
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
    saveRow(row) {
      const _this = this;
      row.dealTime = dayjs(row.dealTime).format("YYYY-MM-DD HH:mm:ss");
      EditProductForDays(row).then((res) => {
        _this.$Message.success({
          content: "操作成功",
          duration: 10,
          closable: true,
        });
        this.$set(row, "isEdit", false);
      });
    },
    editRow(row) {
      this.$set(row, "isEdit", true);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>