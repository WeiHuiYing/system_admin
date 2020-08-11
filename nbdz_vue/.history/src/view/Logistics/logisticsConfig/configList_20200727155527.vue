<template>
  <div class="content-main">
    <Table
      ref="tables"
      height="800"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      border
    ></Table>
  </div>
</template>

<script>
import { configLogistics as getList } from "@/api/Logistics";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          title: "预留参数",
          key: "name",
        },
        {
          title: "描述",
          key: "desc",
        },
        {
          title: "Value",
          key: "value",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.editDetils(params);
                    },
                  },
                },
                "编辑"
              ),
            ]);
          },
        },
      ],
      listData: [],
      filters: {},
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      _this.tableLoading = true;
      getList()
        .then((res) => {
          _this.tableLoading = false;
          _this.listData = res.data.results;
        })
        .catch((err) => {
          _this.tableLoading = false;
          //   const response = err.response.request;
          //   this.$Message.error({
          //     content: response.responseText,
          //     duration: 10,
          //     closable: true,
          //   });
        });
    },
    editDetils(params) {
      console.log(params);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
