<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form ref="formInline" label-position="right" :label-width="60" inline>
            <FormItem prop="startTime" label="开始时间">
              <DatePicker
                v-model="filters.startTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="endTime" label="结束时间">
              <DatePicker
                v-model="filters.endTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
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
import { agingReport as getList } from "@/api/Logistics";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          title: "货代",
          key: "ServerName"
        },
        {
          title: "物流规则",
          key: "Shiping"
        },
        {
          title: "该订单状态下订单数",
          key: "so_num"
        },
        {
          title: "运输状态",
          key: "DeliveredStatus"
        },
        {
          title: "最大运输标准时间",
          key: "MaxStandardDate"
        },
        {
          title: "停留天数",
          key: "ResidenceTime"
        },
        {
          title: "运输天数",
          key: "TransportationTime"
        },
        {
          title: "妥投时间",
          key: "DeliveredTime"
        },
        {
          title: "超出数量",
          key: "exceed_num"
        },
        {
          title: "发货订单总计",
          key: "total_num"
        },
        {
          title: "状态占比",
          key: "StatusProportion"
        },
        {
          title: "妥投率",
          key: "DeliveredProportion"
        },
        {
          title: "超出标准时间占比",
          key: "exceedProportion"
        }
      ],
      listData: [],
      filters: {
        startTime: "",
        endTime: ""
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        }
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      repeatIndex: []
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let startTime = "",
        endTime = "";
      if (
        _this.filters.startTime &&
        _this.filters.endTime &&
        _this.filters.startTime != "" &&
        _this.filters.endTime != ""
      ) {
        startTime = _this.filters.startTime;
        endTime = dayjs(_this.filters.endTime).add(1, "day");
        if (dayjs(endTime).isBefore(dayjs(startTime))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        }
      } else {
        this.$Message.error({
          content: "请选择时间段",
          duration: 10,
          closable: true
        });
        return false;
      }
      let data = {
        date_gte: dayjs(startTime).format("YYYY-MM-DD"),
        date_lte: dayjs(endTime).format("YYYY-MM-DD")
      };
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          _this.listData = res.data.data;
          let columnName = [];
          res.data.data.forEach(item => {
            columnName.push(item.ServerName + "|" + item.Shiping);
          });
          _this.searchRepeat(columnName);
        })
        .catch(err => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    exportData() {
      let _this = this;
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      _this.listColums.forEach(item => {
        if (item.children) {
          item.children.forEach(child => {
            let children = {};
            children.title = item.title + "|" + child.title;
            children.key = child.key;
            columnsArr.push(children);
          });
        } else {
          columnsArr.push(item);
        }
      });
      titleArr = columnsArr.map(item => {
        return item.title;
      });
      keyArr = columnsArr.map(item => {
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
          dayjs(this.filters.endTime).format("YYYY-MM-DD")
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
      if (rowIndex == 2 && columnIndex == 0) {
        return {
          rowspan: 5,
          colspan: 1
        };
      } else if (rowIndex > 2 && rowIndex < 7 && columnIndex == 0) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
      // _this.repeatIndex.forEach(repeatArr => {
      //   if (rowIndex == repeatArr[0] && columnIndex == 0) {
      //     console.log(rowIndex, {
      //       rowspan: repeatArr.length,
      //       colspan: 1
      //     });
      //     return {
      //       rowspan: repeatArr.length,
      //       colspan: 1
      //     };
      //   } else if (
      //     rowIndex > repeatArr[0] &&
      //     rowIndex < repeatArr[repeatArr.length] &&
      //     columnIndex == 0
      //   ) {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // });
    }
  },
  mounted() {}
};
</script>

<style lang="less"></style>
