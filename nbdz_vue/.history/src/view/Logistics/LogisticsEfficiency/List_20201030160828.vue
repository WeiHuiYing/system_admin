/*  物流到达情况表
2020 / 10 / 30
 weihuiying  */
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem prop="send_time" label="发货时间">
              <DatePicker
                v-model="filters.send_time"
                type="date"
                :options="dateOptions"
                placeholder="请选择"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="loadData()"
                style="margin-right: 15px"
                type="primary"
                >搜索</Button
              >
              <Button @click="exportData()" type="primary">导出</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      height="750"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      border
      @on-selection-change="tableSelect"
    ></Table>
  </div>
</template>

<script>
import { LogisticsEfficiency as getList } from "@/api/Logistics";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "运输方式",
          key: "shiping_method",
          width: 200,
          align: "center",
        },
        {
          title: "发货量",
          key: "shipping_num",
          width: 100,
          align: "center",
        },
        {
          title: "发货时间",
          key: "order_num",
          width: 200,
          align: "center",
        },
        {
          title: "发货时间(周)",
          key: "send_time",
          width: 100,
          align: "center",
        },
        {
          title: "标准妥投时间",
          key: "re_delivered_time",
          width: 200,
          align: "center",
        },
        {
          title: "标准妥投时间(周)",
          key: "re_delivered_time2",
          width: 100,
          align: "center",
        },
        {
          title: "标准时间内妥投量",
          key: "delivered_num",
          width: 100,
          align: "center",
        },
        {
          title: "标准时间内上网量",
          key: "re_delivered_num",
          width: 100,
          align: "center",
        },
        {
          title: "妥投率",
          key: "re_delivered_rate",
          width: 100,
          align: "center",
        },
        {
          title: "延迟一天到达量",
          key: "re_delivered_num_1",
          width: 100,
          align: "center",
        },
        {
          title: "延迟二天到达量",
          key: "re_delivered_num_2",
          width: 100,
          align: "center",
        },
        {
          title: "延迟三天到达量",
          key: "re_delivered_num_3",
          width: 100,
          align: "center",
        },
        {
          title: "延迟三天以上到达量",
          key: "re_delivered_num_4",
          width: 100,
          align: "center",
        },
        {
          title: "未到达量",
          key: "not_delivered_num",
          width: 100,
          align: "center",
        },
      ],
      listData: [],
      filters: {
        send_time: "",
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
      repeatIndex: [],
      selectionList: [],
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        send_time: dayjs(_this.filters.send_time).format("YYYY-MM-DD"),
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          _this.listData = res.data.data;
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
    tableSelect(selection) {
      this.selectionList = selection;
    },
    exportData() {
      let _this = this;
      if (_this.selectionList.length == 0) {
        this.$Message.error({
          content: "请选择需要导出的数据",
          duration: 10,
          closable: true,
        });
        return false;
      }
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      _this.listColums
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
        data: this.selectionList,
        autoWidth: true,
        filename: "财务汇总报表",
      };
      excel.export_array_to_excel(params);
    },
  },
  mounted() {},
};
</script>

<style lang="less"></style>
