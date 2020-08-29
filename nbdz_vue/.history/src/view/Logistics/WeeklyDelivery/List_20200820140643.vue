<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            <FormItem prop="store_name" label="店铺">
              <Select v-model="filters.store_name">
                <Option value="juliahair">juliahair</Option>
                <Option value="bfmall">bfmall</Option>
                <Option value="unicemall">unicemall</Option>
                <Option value="nadulamall">nadulamall</Option>
                <Option value="unicefr">unicefr</Option>
                <Option value="Jurllyshe">Jurllyshe</Option>
                <Option value="hurela">hurela</Option>
              </Select>
            </FormItem>
            <FormItem prop="send_date_gte" label="发货开始时间">
              <DatePicker
                v-model="filters.send_date_gte"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 120px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="send_date_lte" label="发货结束时间">
              <DatePicker
                v-model="filters.send_date_lte"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 120px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="pay_date_gte" label="付款开始时间">
              <DatePicker
                v-model="filters.pay_date_gte"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 120px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="pay_date_lte" label="付款结束时间">
              <DatePicker
                v-model="filters.pay_date_lte"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 120px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button @click="loadData()" class="search-btn" type="primary">搜索</Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="2">
          <Button @click="exportData()" type="primary">导出</Button>
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
      :span-method="handleSpan"
      border
    ></Table>
  </div>
</template>

<script>
import { weeklyDelivery as getList } from "@/api/Logistics";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          title: "总订单数",
          key: "ServerName",
        },
        {
          title: "delivered(总)",
          key: "so_num",
        },
        {
          title: "transit(总)",
          key: "DeliveredStatus",
        },
        {
          title: "pickup(总)",
          key: "MaxStandardDate",
        },
        {
          title: "其他(总)",
          key: "ResidenceTime",
        },
        {
          title: "delivered状态 ",
          children: [
            {
              title: "11-15天订单数",
              key: "TransportationTime",
            },
            {
              title: "16-20天订单数",
              key: "DeliveredTime",
            },
            {
              title: "超过20天订单数",
              key: "exceed_num",
            },
          ],
        },
        {
          title: "transit状态",
          children: [
            {
              title: "16-20天",
              key: "Shiping",
            },
            {
              title: "超过20天",
              key: "Shiping",
            },
          ],
        },
        {},
        {
          title: "状态占比",
          key: "StatusProportion",
        },
        {
          title: "妥投率",
          key: "DeliveredProportion",
        },
        {
          title: "超出标准时间占比",
          key: "exceedProportion",
        },
      ],
      listData: [],
      filters: {
        store_name: "juliahair",
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
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        store_name: _this.filters.store_name,
        pay_date_gte: "",
        pay_date_lte: "",
        send_date_gte: "",
        send_date_lte: "",
      };
      if (
        _this.filters.pay_date_gte &&
        _this.filters.pay_date_lte &&
        _this.filters.pay_date_gte != "" &&
        _this.filters.pay_date_lte != ""
      ) {
        data.pay_date_gte = _this.filters.pay_date_gte;
        data.pay_date_lte = dayjs(_this.filters.pay_date_lte).add(1, "day");
        if (dayjs(data.pay_date_lte).isBefore(dayjs(data.pay_date_gte))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true,
          });
          return false;
        }
      } else {
        this.$Message.error({
          content: "请选择时间段",
          duration: 10,
          closable: true,
        });
        return false;
      }
      if (
        _this.filters.send_date_gte &&
        _this.filters.send_date_lte &&
        _this.filters.send_date_gte != "" &&
        _this.filters.send_date_lte != ""
      ) {
        data.send_date_gte = _this.filters.send_date_gte;
        data.send_date_lte = dayjs(_this.filters.send_date_lte).add(1, "day");
        if (dayjs(data.send_date_lte).isBefore(dayjs(data.send_date_gte))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true,
          });
          return false;
        }
      } else {
        this.$Message.error({
          content: "请选择时间段",
          duration: 10,
          closable: true,
        });
        return false;
      }
      _this.tableLoading = true;
      data.pay_date_gte = dayjs(data.pay_date_gte).format("YYYY-MM-DD");
      data.pay_date_lte = dayjs(data.pay_date_lte).format("YYYY-MM-DD");
      data.send_date_gte = dayjs(data.send_date_gte).format("YYYY-MM-DD");
      data.send_date_lte = dayjs(data.send_date_lte).format("YYYY-MM-DD");
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          _this.listData = res.data.data;
          let columnName = [];
          res.data.data.forEach((item) => {
            columnName.push(item.ServerName + "|" + item.Shiping);
          });
          _this.searchRepeat(columnName);
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
    exportData() {
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
        filename:
          "物流时效报表" +
          dayjs(this.filters.startTime).format("YYYY-MM-DD") +
          "-" +
          dayjs(this.filters.endTime).format("YYYY-MM-DD"),
      };
      excel.export_array_to_excel(params);
    },
    searchRepeat(arr) {
      let _this = this;
      let list = [];
      for (let i = 0; i < arr.length; i++) {
        let isRead = false;
        for (let j = 0; j < list.length; j++) {
          if (arr[i] == list[j]) {
            isRead = true;
          }
        }
        if (!isRead) {
          let isRepeat = false;
          let indexRepeat = [i];
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
              isRepeat = true;
              indexRepeat.push(j);
            }
          }
          if (isRepeat) {
            list.push(arr[i]);
            _this.repeatIndex.push(indexRepeat);
          }
        }
      }
    },
    handleSpan({ row, column, rowIndex, columnIndex }) {
      let _this = this;
      _this.repeatIndex.forEach((item) => {
        return _this.handleRow(rowIndex, columnIndex, item);
      });
    },
    handleRow(rowIndex, columnIndex, arr) {
      if (rowIndex == arr[0] && columnIndex == 0) {
        return {
          rowspan: arr.length,
          colspan: 1,
        };
      } else if (
        rowIndex > arr[0] &&
        rowIndex <= arr[arr.length - 1] &&
        columnIndex == 0
      ) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less"></style>
