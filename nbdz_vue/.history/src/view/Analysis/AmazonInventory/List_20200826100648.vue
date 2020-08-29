/* 2020 / 08 / 26
weihuiying
亚马逊库存报表  */
<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="18">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem prop="startTime" label="下单开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="endTime" label="下单结束时间">
            <DatePicker
              v-model="filters.endTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="商品款式">
            <Select
              @on-change="filtersStyle"
              v-model="filters.type"
              multiple
              clearable
              style="width:200px"
            >
              <Option v-for="(item,index) in styleList" :key="index" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button @click="loadData()" class="search-btn" type="primary">
              <Icon type="search" />&nbsp;&nbsp;搜索
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="6">
        <Dropdown v-if="selectionList.length > 0" placement="bottom-start" @on-click="handleMenu">
          <Button type="primary">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="export">导出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
    <Table
      ref="tables"
      height="700"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :span-method="handleSpan"
      :border="true"
      show-summary
      :summary-method="handleSummary"
      @on-selection-change="tableSelect"
    ></Table>
  </div>
</template>

<script>
import {
  GetDensity as getList,
  GetDensityStyle as getStyle,
} from "@/api/Analysis";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        startTime: "",
        endTime: "",
        type: [],
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      tableLoading: false,
      totalData: [],
      listData: [],
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "商品款式",
          key: "style",
          width: 100,
        },
        {
          title: "总销量",
          key: "total",
          width: 100,
          sortable: true,
        },
        {
          title: "13*4",
          align: "center",
          children: [
            {
              title: "130%销量",
              key: "density134130Total",
              align: "center",
              width: 150,
            },
            {
              title: "150%销量",
              key: "density134150Total",
              align: "center",
              width: 150,
            },
            {
              title: "180%销量",
              key: "density134180Total",
              align: "center",
              width: 150,
            },
          ],
        },
        {
          title: "13*6",
          align: "center",
          children: [
            {
              title: "130%销量",
              key: "density136130Total",
              align: "center",
              width: 150,
            },
            {
              title: "150%销量",
              key: "density136150Total",
              align: "center",
              width: 150,
            },
            {
              title: "180%销量",
              key: "density136180Total",
              align: "center",
              width: 150,
            },
            {
              title: "250%销量",
              key: "density136250Total",
              align: "center",
              width: 150,
            },
          ],
        },
        {
          title: "360",
          align: "center",
          children: [
            {
              title: "130%销量",
              key: "density360130Total",
              align: "center",
              width: 150,
            },
            {
              title: "150%销量",
              key: "density360150Total",
              align: "center",
              width: 150,
            },
            {
              title: "180%销量",
              key: "density360180Total",
              align: "center",
              width: 150,
            },
            {
              title: "250%销量",
              key: "density360250Total",
              align: "center",
              width: 150,
            },
          ],
        },
        {
          title: "全手织",
          align: "center",
          children: [
            {
              title: "130%销量",
              key: "densityHand130Total",
              align: "center",
              width: 150,
            },
            {
              title: "150%销量",
              key: "densityHand150Total",
              align: "center",
              width: 150,
            },
            {
              title: "180%销量",
              key: "densityHand180Total",
              align: "center",
              width: 150,
            },
          ],
        },
        {
          title: "4*4",
          align: "center",
          children: [
            {
              title: "130%销量",
              key: "density44130Total",
              align: "center",
              width: 150,
            },
            {
              title: "150%销量",
              key: "density44150Total",
              align: "center",
              width: 150,
            },
            {
              title: "180%销量",
              key: "density44180Total",
              align: "center",
              width: 150,
            },
          ],
        },
        {
          title: "机制",
          align: "center",
          children: [
            {
              title: "销量",
              key: "densityMachineTotal",
              align: "center",
              width: 150,
            },
            {
              title: "130%销量",
              key: "densityMachine130Total",
              align: "center",
              width: 150,
            },
          ],
        },
      ],
      selectionList: [],
      styleList: [],
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      if (_this.filters.startTime !== "") {
        data.startTime = dayjs(_this.filters.startTime).format("YYYY-MM-DD");
      } else {
        data.startTime = dayjs().subtract(7, "day").format("YYYY-MM-DD");
        _this.filters.startTime = dayjs()
          .subtract(7, "day")
          .format("YYYY-MM-DD");
      }
      if (_this.filters.endTime !== "") {
        data.endTime = dayjs(_this.filters.endTime).format("YYYY-MM-DD");
      } else {
        data.endTime = dayjs().format("YYYY-MM-DD");
        _this.filters.endTime = dayjs().format("YYYY-MM-DD");
      }
      if (
        !dayjs(data.endTime).isAfter(dayjs(data.startTime)) &&
        dayjs(data.endTime).diff(dayjs(data.startTime), "day") != "0"
      ) {
        this.$Message.error({
          content: "结束时间在开始时间之后",
          duration: 10,
          closable: true,
        });
        return false;
      }
      _this.tableLoading = true;
      data.endTime = dayjs(data.endTime).add(1, "day").format("YYYY-MM-DD");
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          const resData = res.data;
          if (resData.code == 200) {
            _this.totalData = resData.data;
            _this.listData = _this.totalData;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    styleLoad() {
      let _this = this;
      getStyle()
        .then((res) => {
          if (res.status == 200) {
            _this.styleList = res.data;
          } else {
            this.$Message.error({
              content: res.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filtersStyle() {
      let _this = this;
      if (_this.totalData.length > 0) {
        if (_this.filters.type.length > 0) {
          _this.listData = _this.totalData.filter((item) => {
            for (let i = 0; i < _this.filters.type.length; i++) {
              if (item.style == _this.filters.type[i]) {
                return item;
              }
            }
          });
        } else {
          _this.listData = _this.totalData;
        }
      }
    },
    // 合并单元格
    handleSpan({ row, column, rowIndex, columnIndex }) {
      //   console.log({ row, column, rowIndex, columnIndex });
      if (columnIndex === 2) {
        return {
          rowspan: 1,
          colspan: 1,
        };
      }
    },
    // 合计
    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: "总计",
          };
          return;
        } else if (index === 1) {
          sums[key] = {
            key,
            value: "/",
          };
          return;
        }
        const values = data.map((item) => {
          return Number(item[key]);
        });
        let totalVal;
        if (!values.every((value) => isNaN(value))) {
          let val = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (key === "total") {
            sums[key] = {
              key,
              value: val,
            };
          } else {
            totalVal = sums["total"].value;
            sums[key] = {
              key,
              value:
                val +
                "（" +
                parseFloat((val / totalVal) * 100).toFixed(2) +
                "%）",
            };
          }
        } else {
          sums[key] = {
            key,
            value: "/",
          };
        }
      });
      return sums;
    },
    tableSelect(selection) {
      this.selectionList = selection;
    },
    handleMenu(name) {
      if (name == "export") {
        this.exportList();
      }
    },
    exportList() {
      let _this = this;
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
        filename: "头套产品销售明细",
      };
      excel.export_array_to_excel(params);
    },
  },
  mounted() {
    this.loadData();
    this.styleLoad();
  },
};
</script>
