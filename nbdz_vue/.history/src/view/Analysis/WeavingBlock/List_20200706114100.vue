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
            <Select v-model="filters.type" style="width:200px">
              <Option value="发帘">发帘</Option>
              <Option value="发块">发块</Option>
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
import { GetWeavingBlock as getList } from "@/api/Analysis";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        startTime: "",
        endTime: "",
        type: "发帘"
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        }
      },
      tableLoading: false,
      listData: [],
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "尺寸",
          width: 100,
          key: "size",
          align: "center"
        },
        {
          title: "总销量",
          width: 100,
          align: "center",
          key: "total"
        },
        {
          title: "单尺寸销量",
          width: 100,
          align: "center",
          key: "sizeTotal"
        },
        {
          title: "尺寸总占比",
          width: 100,
          align: "center",
          key: "sizeTotalRatio"
        },
        {
          title: "速卖通",
          width: 200,
          align: "center",
          children: [
            {
              title: "销量",
              width: 100,
              align: "center",
              key: "aliSizeTotal"
            },
            {
              title: "占比",
              width: 100,
              align: "center",
              key: "aliSizeTotalRatio"
            }
          ]
        },
        {
          title: "亚马逊",
          width: 200,
          align: "center",
          children: [
            {
              title: "销量",
              width: 100,
              align: "center",
              key: "amazSizeTotal"
            },
            {
              title: "占比",
              width: 100,
              align: "center",
              key: "amazSizeTotalRatio"
            }
          ]
        },
        {
          title: "自营站",
          width: 200,
          align: "center",
          children: [
            {
              title: "销量",
              width: 100,
              align: "center",
              key: "magentoSizeTotal"
            },
            {
              title: "占比",
              width: 100,
              align: "center",
              key: "magentoSizeTotalRatio"
            }
          ]
        },
        {
          title: "SHOPIFY",
          width: 200,
          align: "center",
          children: [
            {
              title: "销量",
              width: 100,
              align: "center",
              key: "shopifySizeTotal"
            },
            {
              title: "占比",
              width: 100,
              align: "center",
              key: "shopifySizeTotalRatio"
            }
          ]
        },
        {
          title: "ebay平台",
          width: 200,
          align: "center",
          children: [
            {
              title: "销量",
              width: 100,
              align: "center",
              key: "ebaySizeTotal"
            },
            {
              title: "占比",
              width: 100,
              align: "center",
              key: "ebaySizeTotalRatio"
            }
          ]
        }
      ],
      selectionList: []
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        type: _this.filters.type
      };
      if (_this.filters.startTime !== "") {
        data.startTime = dayjs(_this.filters.startTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        data.startTime = dayjs()
          .subtract(7, "day")
          .format("YYYY-MM-DD HH:mm:ss");
        _this.filters.startTime = dayjs()
          .subtract(7, "day")
          .format("YYYY-MM-DD HH:mm:ss");
      }
      if (_this.filters.endTime !== "") {
        data.endTime = dayjs(_this.filters.endTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        data.endTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
        _this.filters.endTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      }
      if (
        !dayjs(data.endTime).isAfter(dayjs(data.startTime)) &&
        dayjs(data.endTime).diff(dayjs(data.startTime), "day") != "0"
      ) {
        this.$Message.error({
          content: "结束时间在开始时间之后",
          duration: 10,
          closable: true
        });
        return false;
      }
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 合并单元格
    handleSpan({ row, column, rowIndex, columnIndex }) {
      //   console.log({ row, column, rowIndex, columnIndex });
      if (columnIndex === 2) {
        return {
          rowspan: 1,
          colspan: 1
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
            value: "总计"
          };
          return;
        } else if (index === 1) {
          sums[key] = {
            key,
            value: "/"
          };
          return;
        } else if (index === 2) {
          sums[key] = {
            key,
            value: "/"
          };
          return;
        }
        let stringType = false;
        const values = data.map(item => {
          let value = JSON.stringify(item[key]);
          stringType = value.indexOf("%") != -1;
          value = value.replace("%", "");
          value = JSON.parse(value);
          return Number(value);
        });
        if (!values.every(value => isNaN(value))) {
          let val = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (stringType) {
            val = parseFloat(val).toFixed(2) + "%";
          }
          sums[key] = {
            key,
            value: val
          };
        } else {
          sums[key] = {
            key,
            value: "/"
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
    // 导出功能
    exportList() {
      let _this = this;
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      _this.listColums
        .filter((item, index) => {
          return index != 0;
        })
        .forEach(item => {
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
        data: this.selectionList,
        autoWidth: true,
        filename: "发帘发块分产品尺寸销售占比报表"
      };
      excel.export_array_to_excel(params);
    }
  },
  mounted() {
    let _this = this;
    this.loadData();
  }
};
</script>
