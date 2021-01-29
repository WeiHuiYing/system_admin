<template>
  <div>
    <Table
      :loading="tableLoading"
      v-bind:columns="tableColumns"
      :data="tableData"
      stripe
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
        ></DatePicker>
        <span v-else>{{ row.dealTime }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          v-if="row.isEdit"
          type="primary"
          size="small"
          @click="saveData(row, index)"
          style="margin-right: 5px"
          >保存</Button
        >
        <Button
          v-else
          type="primary"
          size="small"
          @click="editData(row, index)"
          style="margin-right: 5px"
          >编辑</Button
        >
      </template>
    </Table>
  </div>
</template>

<script>
import { ProductForDays, EditProductForDays } from "@/api/order";
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
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let filterQuery = [];
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      ProductForDays(data)
        .then((res) => {
          console.log(res);
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
    saveData() {},
    editData() {},
  },
  mounted() {
    this.loadData();
  },
};
</script>